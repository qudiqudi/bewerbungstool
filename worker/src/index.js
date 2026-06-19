// Hosted-Worker (Plan A.1/A.2.7). App-spezifische Endpoints, serverseitige Prompts +
// Schema, atomares DO-Budget-Gate, Turnstile, SSE-Durchreichung mit usage-Settle.
//
// Datenfluss je Call:
//   Turnstile prüfen → Input validieren → Stufe mappen → DO-Reserve (Worst-Case)
//   → Prompt bauen → OpenRouter (stream) → Stream an Client tee'n, usage lesen → settle.

import { BudgetDO } from "./budget-do.js";
import { GenerationJobDO } from "./job-do.js";
import { resolveTier, worstCaseCost } from "./tiers.js";
import { corsHeaders, preflight } from "./cors.js";
import { verifyTurnstile } from "./turnstile.js";
import { validateQuiz, validateEval, validateThemenfelder } from "./validate.js";
import { handleAuth, getSessionUser, devMintSession } from "./auth.js";
import { devEnabled } from "./env.js";
import {
  QUESTIONS_SCHEMA, EVAL_SCHEMA, THEMENFELDER_SCHEMA,
  buildQuizMessages, buildEvalMessages, buildThemenfelderMessages,
} from "./prompts.js";

export { BudgetDO, GenerationJobDO };

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const ROUTES = {
  "/api/generate-quiz": { action: "generate-quiz", schema: QUESTIONS_SCHEMA, validate: validateQuiz, build: buildQuizMessages },
  "/api/evaluate": { action: "evaluate", schema: EVAL_SCHEMA, validate: validateEval, build: buildEvalMessages },
  "/api/themenfelder": { action: "themenfelder", schema: THEMENFELDER_SCHEMA, validate: validateThemenfelder, build: buildThemenfelderMessages },
};

export default {
  async fetch(req, env, ctx) {
    const origin = req.headers.get("Origin") || "";
    if (req.method === "OPTIONS") return preflight(env, origin);

    const path = new URL(req.url).pathname;

    // Fail-closed: Dev-Bypässe werden NUR honoriert, wenn ENV EXPLIZIT eine Dev-Umgebung
    // markiert. Absent/getippt-falsch/"production" → dev=false → Bypässe AUS. Ein
    // versehentlich in Prod gesetztes SKIP_TURNSTILE/MOCK_UPSTREAM würde den Worker sonst
    // zu einem offenen, kostenpflichtigen LLM-Proxy machen. In Prod ist ENV bewusst NICHT
    // gesetzt (wrangler.toml); lokal setzt .dev.vars ENV=development.
    const dev = devEnabled(env);
    const skipTurnstile = dev && env.SKIP_TURNSTILE === "1";
    const mockUpstream = dev && env.MOCK_UPSTREAM === "1";

    // Nur in Dev (MOCK_UPSTREAM) freigegebener Status-Endpunkt für den Last-Test.
    if (path === "/debug/stats" && mockUpstream) {
      const stub = budgetStub(env);
      const stats = await stub.fetch("https://do/stats").then((r) => r.json());
      return json(stats, 200, env, origin);
    }
    // Nur in Dev: mintet eine Session, damit der Lasttest den Auth-Pflicht-Pfad echt
    // durchlaeuft. Fail-closed an dev gekoppelt (mockUpstream) - ein versehentlich in Prod
    // gesetztes MOCK_UPSTREAM darf hier keine Sessions ausgeben. In Produktion NIE erreichbar.
    if (path === "/debug/session" && mockUpstream) {
      const token = await devMintSession(env, new URL(req.url).searchParams.get("email"));
      if (!token) return json({ error: "dev-email-only" }, 403, env, origin); // nur @dev.local
      return json({ token }, 200, env, origin);
    }

    // Auth-Gerüst (Phase B, Schritt 1): optionale Konten, eigener Zweig vor /api.
    if (path.startsWith("/auth/")) return await handleAuth(req, env, ctx, path, origin);

    // Async-Generierung (Hintergrund-Job, Punkt 1): Start + Poll.
    if (path === "/api/jobs" && req.method === "POST") return await startJob(req, env, ctx, origin);
    if (path.startsWith("/api/jobs/") && req.method === "GET") {
      return await pollJob(path.slice("/api/jobs/".length), req, env, origin);
    }

    // Anonyme Produkt-Nutzungsstatistik (Topic #2): nur nicht-personenbezogene
    // Diskriminatoren, kein LLM/Budget, kein Auth/Turnstile. Immer 204.
    if (path === "/api/event" && req.method === "POST") return await handleEvent(req, env, origin);

    // "Fragen melden" an den Betreiber (Topic #2): zusaetzlich zum lokalen Save.
    if (path === "/api/report" && req.method === "POST") return await handleReport(req, env, origin);

    const route = ROUTES[path];
    if (req.method !== "POST" || !route) return json({ error: "not-found" }, 404, env, origin);
    const ip = req.headers.get("CF-Connecting-IP") || "0.0.0.0";
    // Rate-Limit-Schlüssel: IPv6 auf das /64-Präfix kürzen. Eine übliche Endkunden-
    // Allokation IST ein /64 (2^64 Adressen) — ohne Bucketing umgeht ein einzelner
    // Nutzer durch Adressrotation PER_IP_DAY UND PER_SUBJECT_SHARE und leert das
    // Tagesbudget. Turnstile bekommt weiter die volle IP (siteverify braucht sie).
    const ipKey = rateLimitKey(ip);

    // 0) Anmeldung Pflicht (Phase B): jeder gehostete Call haengt an einem Konto.
    // Zuerst pruefen, damit unauth schnell und ohne Turnstile-Kosten abprallt.
    const g = await gateUser(req, env, origin);
    if (g.resp) return g.resp;
    const user = g.user;

    // 1) Turnstile (Dev-Bypass via SKIP_TURNSTILE=1, nur außerhalb Prod)
    if (!skipTurnstile) {
      const token = req.headers.get("CF-Turnstile-Token") || "";
      const tv = await verifyTurnstile(token, { action: route.action, secret: env.TURNSTILE_SECRET, ip });
      if (!tv.ok) return json({ error: "turnstile", reason: tv.reason }, 403, env, origin);
    }

    // 2) Body + Input-Validierung
    let body;
    try { body = await req.json(); } catch { return json({ error: "bad-json" }, 400, env, origin); }
    const vErr = route.validate(body);
    if (vErr) return json({ error: "validation", field: vErr }, 400, env, origin);

    // 3) Stufe mappen (Gratis-Tier: "beste" → 402)
    const rt = resolveTier(body.tier, { allowPaid: env.ALLOW_PAID === "1" });
    if (rt.error === 400) return json({ error: "unknown-tier" }, 400, env, origin);
    if (rt.error === 402) return json({ error: "tier-locked" }, 402, env, origin);
    const tier = rt.tier;

    // 4) Atomare Reserve im Budget-DO
    const hardCap = Number(env.HARD_CAP_TOKENS || 18000);
    const reserve = worstCaseCost(tier, hardCap);
    const stub = budgetStub(env);
    // Auch der (von aelteren, gecachten Clients noch genutzte) synchrone Generierungs-
    // pfad nimmt am Pro-Nutzer-exclusive-Gate teil, sonst liesse sich die "nur ein Test
    // gleichzeitig"-Regel durch Direktaufruf umgehen (Codex-Finding). evaluate/themenfelder
    // bleiben nicht-exklusiv (kurze Aufrufe, kein Generierungs-Slot).
    const exclusive = route.action === "generate-quiz";
    // Subjekt = Konto, wenn angemeldet (Per-Subjekt-Share + exclusive-Gate pro Nutzer);
    // im Cutover-Fenster (anonym erlaubt) faellt es auf den /64-gebucketeten IP-Schluessel
    // zurueck. ipKey (IPv6 → /64) dient auch dem Tagescap PER_IP_DAY, damit Adressrotation
    // innerhalb einer Endkunden-Allokation die Pro-IP-Limits nicht aushebelt.
    const gate = await doCall(stub, "reserve", { amount: reserve, subject: user ? user.id : ipKey, ip: ipKey, exclusive });
    if (!gate.ok) {
      const status = gate.reason === "budget" ? 503 : 429; // active-job/inflight/subject/ip → 429
      // Gate-Ablehnung in Workers Logs festhalten, damit der Grund im Dashboard/per
      // API sichtbar ist - ohne rohe IP (Datenschutz). action nennt den Endpoint.
      console.log(JSON.stringify({ ev: "gate-deny", action: route.action, reason: gate.reason, status }));
      return json({ error: gate.reason }, status, env, origin);
    }
    const reserveId = gate.reserveId;

    // 5) Upstream
    try {
      const messages = route.build(body);

      const res = mockUpstream
        ? mockUpstreamResponse(env, route.action)
        : await fetch(OPENROUTER_URL, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${env.OPENROUTER_KEY}`,
              "Content-Type": "application/json",
              "HTTP-Referer": "https://jobreif.de",
              "X-Title": "jobreif",
            },
            body: JSON.stringify({
              model: tier.model,
              messages,
              max_tokens: hardCap,
              ...(tier.reasoning === false
                ? { reasoning: { enabled: false } }
                : tier.reasoning
                ? { reasoning: tier.reasoning }
                : {}),
              ...(tier.strictSchema
                ? { response_format: { type: "json_schema", json_schema: { name: "ergebnis", strict: true, schema: route.schema } } }
                : {}),
              stream: true,
              stream_options: { include_usage: true },
              usage: { include: true },
            }),
          });

      // Upstream-Fehlerpfade EXPLIZIT (keine Buchung für Pre-Generation-Fehler)
      if (!res.ok || !isSSE(res)) {
        await doCall(stub, "release", { reserveId });
        return mapUpstreamError(res, env, origin);
      }

      // Stream an den Client durchreichen UND parallel usage.cost lesen → settle.
      const [clientStream, usageStream] = res.body.tee();
      ctx.waitUntil((async () => {
        const cost = await readUsageCost(usageStream);
        if (cost != null) await doCall(stub, "settle", { reserveId, cost });
        // kein usage → Reservierung bleibt, TTL-Reconcile im DO bucht sie später runter.
      })());

      return new Response(clientStream, {
        status: 200,
        headers: { ...corsHeaders(env, origin), "Content-Type": "text/event-stream; charset=utf-8", "Cache-Control": "no-cache" },
      });
    } catch (e) {
      await doCall(stub, "release", { reserveId });
      // KEINE Exception-Details an den Client (CodeQL: Information exposure via stack trace).
      // Stabiler, generischer Fehler; Diagnose bei Bedarf ueber `wrangler tail`.
      return json({ error: "upstream" }, 502, env, origin);
    }
  },
};

// --- Async-Generierung (Punkt 1) ------------------------------------------

// Startet einen Hintergrund-Generierungsjob: Turnstile (einmal) → validieren → Stufe
// → Budget reservieren (mit Pro-Nutzer-Gate exclusive) → Job-DO anstossen → jobId zurück.
async function startJob(req, env, ctx, origin) {
  const ip = req.headers.get("CF-Connecting-IP") || "0.0.0.0";
  // IPv6 auf /64 bucketen wie im synchronen Pfad (rateLimitKey), sonst bliebe die
  // Pro-IP-Begrenzung auf dem PRIMAEREN (asynchronen) Generierungspfad per Adress-
  // rotation umgehbar.
  const ipKey = rateLimitKey(ip);

  // Anmeldung Pflicht (Phase B) – zuerst, vor Turnstile.
  const g = await gateUser(req, env, origin);
  if (g.resp) return g.resp;
  const user = g.user;

  // Turnstile-Dev-Bypass fail-closed an dev gekoppelt (wie im fetch-Handler): ein in Prod
  // gesetztes SKIP_TURNSTILE darf den Job-Start nicht ungeschuetzt lassen.
  const skipTurnstile = devEnabled(env) && env.SKIP_TURNSTILE === "1";
  if (!skipTurnstile) {
    const token = req.headers.get("CF-Turnstile-Token") || "";
    const tv = await verifyTurnstile(token, { action: "generate-quiz", secret: env.TURNSTILE_SECRET, ip });
    if (!tv.ok) return json({ error: "turnstile", reason: tv.reason }, 403, env, origin);
  }

  let body;
  try { body = await req.json(); } catch { return json({ error: "bad-json" }, 400, env, origin); }
  const vErr = validateQuiz(body);
  if (vErr) return json({ error: "validation", field: vErr }, 400, env, origin);

  const rt = resolveTier(body.tier, { allowPaid: env.ALLOW_PAID === "1" });
  if (rt.error === 400) return json({ error: "unknown-tier" }, 400, env, origin);
  if (rt.error === 402) return json({ error: "tier-locked" }, 402, env, origin);
  const tier = rt.tier;

  const reserve = worstCaseCost(tier, Number(env.HARD_CAP_TOKENS || 24000));
  const stub = budgetStub(env);
  // Subjekt = Konto, wenn angemeldet; im Cutover-Fenster anonym → /64-gebucketeter IP-
  // Schluessel (ipKey). ipKey separat fuer den Tagescap PER_IP_DAY.
  const subject = user ? user.id : ipKey;
  const subjectKind = user ? "user" : null; // nur User-Jobs unterliegen der Ownership-Pruefung
  const gate = await doCall(stub, "reserve", { amount: reserve, subject, ip: ipKey, exclusive: true });
  if (!gate.ok) {
    const status = gate.reason === "budget" ? 503 : 429; // active-job/inflight/subject/ip → 429
    console.log(JSON.stringify({ ev: "gate-deny", action: "jobs", reason: gate.reason, status }));
    return json({ error: gate.reason }, status, env, origin);
  }

  const jobId = crypto.randomUUID();
  const params = {
    jobText: body.jobText,
    numQuestions: body.numQuestions,
    difficulty: body.difficulty,
    vertiefung: body.vertiefung,
  };
  const jobStub = env.GENJOB_DO.get(env.GENJOB_DO.idFromName(jobId));
  try {
    await jobStub.fetch("https://do/start", {
      method: "POST",
      body: JSON.stringify({ params, tier, subject, subjectKind, reserveId: gate.reserveId, reserveAmount: reserve }),
    });
  } catch {
    await doCall(stub, "release", { reserveId: gate.reserveId }); // Slot wieder freigeben
    return json({ error: "start-failed" }, 502, env, origin);
  }
  return json({ jobId }, 202, env, origin);
}

// Pollt den Status/Result eines Jobs (jobId ist eine nicht erratbare UUID).
// Anmeldung Pflicht; touch:false, damit das haeufige Poll nicht jedes Mal last_seen schreibt.
async function pollJob(jobId, req, env, origin) {
  const g = await gateUser(req, env, origin, { touch: false });
  if (g.resp) return g.resp;
  const user = g.user;
  if (!jobId || jobId.length > 64) return json({ error: "bad-job" }, 400, env, origin);
  const jobStub = env.GENJOB_DO.get(env.GENJOB_DO.idFromName(jobId));
  let st;
  try {
    // user.id als X-Subject durchreichen → das DO prueft die Job-Ownership (nur fuer
    // User-Jobs, subjectKind="user"). Im Cutover-Fenster (anonym) ohne X-Subject.
    const headers = user ? { "X-Subject": user.id } : {};
    st = await jobStub.fetch("https://do/status", { headers }).then((r) => r.json());
  }
  catch { return json({ error: "poll-failed" }, 502, env, origin); }
  if (st.status === "forbidden") return json({ error: "forbidden" }, 403, env, origin);
  if (st.status === "done") return json({ status: "done", quiz: st.result }, 200, env, origin);
  if (st.status === "error") return json({ status: "error", code: st.errorCode || null }, 200, env, origin);
  if (st.status === "unknown") return json({ status: "unknown" }, 404, env, origin);
  return json({ status: "pending" }, 200, env, origin);
}

// --- Analytics (Topic #2) -------------------------------------------------

// Erlaubte, nicht-personenbezogene Diskriminatoren. Unbekannte Werte werden NICHT
// gespeichert (auf "other"/"unknown" geklemmt), damit ein gespooftes oder zukuenftiges
// Feld die Auswertung nicht aufblaeht. Bewusst klein und geschlossen.
const EVENT_FLOWS = new Set([
  "exam-start", "learn-start", "quiz-generate", "resolve", "history-open", "report",
]);
const EVENT_PROVIDERS = new Set(["hosted", "byok", "local"]);
const EVENT_TIERS = new Set(["standard", "guenstig", "beste"]);

// POST /api/event: schreibt EINEN anonymen Datenpunkt (Flow/Anbieter/Stufe) in die
// Analytics Engine. KEINE IP, kein Text, keine E-Mail, kein Identifier. Kein Auth,
// kein Turnstile (kostenneutral, kein LLM, kein Budget). Antwort IMMER 204 — kein
// Info-Leak, kein Retry-Sog. Fehlt das AE-Binding, ist es ein No-op (z. B. lokal).
async function handleEvent(req, env, origin) {
  try {
    if (!env.AE || typeof env.AE.writeDataPoint !== "function") return noContent(env, origin);
    const body = await req.json().catch(() => ({}));
    const flow = EVENT_FLOWS.has(body && body.flow) ? body.flow : null;
    if (!flow) return noContent(env, origin); // ohne gueltigen Flow nichts schreiben
    const provider = EVENT_PROVIDERS.has(body && body.provider) ? body.provider : "other";
    const tier = EVENT_TIERS.has(body && body.tier) ? body.tier : "none";
    env.AE.writeDataPoint({ blobs: [flow, provider, tier], indexes: [flow] });
  } catch {
    /* Analytics darf nie etwas brechen */
  }
  return noContent(env, origin);
}

// --- Report-Routing (Topic #2) --------------------------------------------

const REPORT_HOURLY_CAP = 500; // reiner D1-Write-Volumen-Schutz, kein Fairness-Limit
const REPORT_TYPES = new Set(["multiple_choice", "offen"]);

function clip(v, max) {
  return typeof v === "string" ? (v.length > max ? v.slice(0, max) : v) : "";
}
function clipOrNull(v, max) {
  return typeof v === "string" && v ? clip(v, max) : null;
}

// POST /api/report: nimmt einen vom Client bereits sanitisierten Report entgegen und
// legt ihn in D1 (question_reports) ab — zusaetzlich zum lokalen Save im Browser.
// user_id nur, wenn der Melder angemeldet war (sonst NULL), NIE eine IP. korrekte_antwort
// kommt 1:1 vom Client: bei answersSecret (Pruefung) ist sie bereits leer, der Server
// rekonstruiert NICHTS. Kein Budget-Reserve. Leichtes Stundencap als bedingter INSERT.
// Antwort IMMER 202 (auch bei Muell/fehlender Tabelle) — Report ist fire-and-forget und
// darf die Client-UX nie beeinflussen.
async function handleReport(req, env, origin) {
  try {
    if (!env.DB) return accepted(env, origin);
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") return accepted(env, origin);

    const fragenKey = clip(body.fragenKey, 2000);
    const frage = clip(body.frage, 600);
    const typ = REPORT_TYPES.has(body.typ) ? body.typ : "offen";
    if (!fragenKey || !frage) return accepted(env, origin); // Pflichtfelder leer → verwerfen

    const optionen = Array.isArray(body.optionen)
      ? JSON.stringify(body.optionen.slice(0, 8).map((o) => clip(o, 200)))
      : null;
    const gruende = Array.isArray(body.gruende)
      ? JSON.stringify(body.gruende.slice(0, 10).map((g) => clip(g, 40)).filter(Boolean))
      : null;

    // user_id nur bei gueltiger Session; haeufiger Pfad nicht touchen.
    let userId = null;
    try {
      const u = await getSessionUser(req, env, { touch: false });
      if (u) userId = u.id;
    } catch { /* Schema-Drift o. ae.: anonym weiter */ }

    const id = crypto.randomUUID();
    const t = Math.floor(Date.now() / 1000);
    const since = t - 3600;
    // Bedingter INSERT: nur schreiben, wenn der globale Stundencap nicht erreicht ist
    // (atomar unter SQLite-Schreibsperre). Kein IP noetig → keine PII fuers Limit.
    await env.DB.prepare(
      `INSERT INTO question_reports
         (id, created_at, fragen_key, frage, typ, kategorie, korrekte_antwort,
          optionen, gruende, notiz, job_key, stellen_titel, provider, tier, model, user_id)
       SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
       WHERE (SELECT COUNT(*) FROM question_reports WHERE created_at > ?) < ?`
    ).bind(
      id, t, fragenKey, frage, typ,
      clipOrNull(body.kategorie_fachlich, 200),
      clip(body.korrekte_antwort, 300), // bei answersSecret bereits "" → bleibt ""
      optionen, gruende,
      clipOrNull(body.notiz, 500),
      clipOrNull(body.jobKey, 200),
      clipOrNull(body.stellenTitel, 200),
      clipOrNull(body.provider, 40),
      clipOrNull(body.tier, 40),
      clipOrNull(body.model, 80),
      userId,
      since, REPORT_HOURLY_CAP,
    ).run();
  } catch {
    /* fehlende Tabelle / D1-Fehler → still ignorieren, Client merkt nichts */
  }
  return accepted(env, origin);
}

// --- Helfer ---------------------------------------------------------------

function noContent(env, origin) {
  return new Response(null, { status: 204, headers: corsHeaders(env, origin) });
}
function accepted(env, origin) {
  return new Response(null, { status: 202, headers: corsHeaders(env, origin) });
}

function budgetStub(env) {
  return env.BUDGET_DO.get(env.BUDGET_DO.idFromName("global"));
}

// Auth-Gate mit kontrolliertem Fehlerpfad UND fail-closed-Default (Codex-Review R2/R9/R11):
// - getSessionUser kann bei Schema-Drift werfen → 503 (auth-unavailable) statt 500-Outage.
// - FAIL CLOSED IM CODE: kein User → 401. Anonyme Hosted-Calls NUR im expliziten, temporaeren
//   Cutover-Fenster (env.ALLOW_ANON_CUTOVER === "1"), das beim Auslaufen alter App-Shells
//   wieder entfernt wird. So bleibt jede fehlende/falsch geschriebene/preview-/rollback-
//   skew-Var gesperrt — Config-Drift wird KEIN Auth-Bypass. Der offene Zustand wird geloggt.
async function gateUser(req, env, origin, opts) {
  let user = null;
  try { user = await getSessionUser(req, env, opts); }
  catch { return { resp: json({ error: "auth-unavailable" }, 503, env, origin) }; }
  if (!user) {
    if (env.ALLOW_ANON_CUTOVER === "1") {
      console.log(JSON.stringify({ ev: "anon-allowed" })); // sichtbar, dass das Fenster offen ist
      return { user: null };
    }
    return { resp: json({ error: "auth-required" }, 401, env, origin) };
  }
  return { user };
}

// Bucketet die Rate-Limit-IP. IPv4 → unverändert. IPv6 → /64 (erste 4 Hextets), damit
// Adressrotation innerhalb einer Endkunden-Allokation die Pro-IP-Limits nicht aushebelt.
// Eingabe ist die kanonische CF-Connecting-IP (von Cloudflare gesetzt, vertrauenswürdig).
function rateLimitKey(ip) {
  if (!ip || !ip.includes(":")) return ip || "0.0.0.0"; // IPv4 oder leer
  // Kanonische IPv4-mapped Form (::ffff:1.2.3.4) als IPv4 behandeln.
  const mapped = ip.match(/^::ffff:((?:\d{1,3}\.){3}\d{1,3})$/i);
  if (mapped) return mapped[1];

  // Ein sonstiger eingebetteter Dotted-Quad (…:a.b.c.d) belegt ZWEI Hextets — abspalten
  // und in zwei Hex-Gruppen umrechnen, sonst stimmt die Hextet-Zählung beim Expandieren
  // der "::"-Kompression nicht.
  let core = ip;
  let v4Tail = [];
  const m = ip.match(/^(.*:)((?:\d{1,3}\.){3}\d{1,3})$/);
  if (m) {
    core = m[1].slice(0, -1); // ":" am Ende entfernen
    const o = m[2].split(".").map((n) => Number(n) & 0xff);
    v4Tail = [((o[0] << 8) | o[1]).toString(16), ((o[2] << 8) | o[3]).toString(16)];
  }

  // "::" zu 8 Hextets expandieren, dann die ersten 4 (= /64) nehmen.
  const [head, tail] = core.split("::");
  const headParts = head ? head.split(":").filter(Boolean) : [];
  const tailParts = tail !== undefined ? (tail ? tail.split(":").filter(Boolean) : []) : null;
  let groups;
  if (tailParts === null) {
    groups = [...headParts, ...v4Tail]; // keine Kompression
  } else {
    const fill = Math.max(0, 8 - headParts.length - tailParts.length - v4Tail.length);
    groups = [...headParts, ...Array(fill).fill("0"), ...tailParts, ...v4Tail];
  }
  // Jedes Hextet kanonisieren (führende Nullen weg), damit 2001:0db8:… und 2001:db8:…
  // auf denselben /64-Schlüssel fallen. Take /64 = erste 4 Gruppen.
  const prefix = [0, 1, 2, 3].map((i) => parseInt(groups[i] || "0", 16).toString(16));
  return "v6/64:" + prefix.join(":");
}

async function doCall(stub, op, payload) {
  const r = await stub.fetch(`https://do/${op}`, { method: "POST", body: JSON.stringify(payload) });
  return r.json();
}

function json(obj, status, env, origin) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { ...corsHeaders(env, origin), "Content-Type": "application/json" },
  });
}

function isSSE(res) {
  return (res.headers.get("Content-Type") || "").includes("text/event-stream");
}

// OpenRouter-Fehler → stabile Client-Codes (Plan A.2.7). Der Fehlerbody wird BEWUSST
// NICHT gelesen: (1) der Client mappt ohnehin per Status, nicht per Body; (2) Body-Lesen
// auf dem Fehlerpfad ist eine unnoetige Angriffsflaeche (grosse/langsame Bodies, kein
// harter Peak-Memory-Bound bei runtime-materialisierten Chunks, Inhalts-Leak-Risiko).
// Diagnose bei Bedarf ueber `wrangler tail`. Status-Mapping: 400→400, 408→504, 429→429,
// alles andere (inkl. nicht-SSE-200, 401/403/5xx) → 502. reason unterscheidet einen
// echten HTTP-Fehler von einer unerwartet nicht-gestreamten 200-Antwort, damit
// "upstream: 200" nicht mehr irrefuehrend nach Erfolg aussieht.
function mapUpstreamError(res, env, origin) {
  const s = (res && res.status) || null;
  const statusMap = { 400: 400, 408: 504, 429: 429 };
  const out = statusMap[s] || 502;
  const reason = res && res.ok ? "non-sse" : "http";
  return json({ error: "upstream", upstream: s, reason }, out, env, origin);
}

// Liest den getee'ten SSE-Stream serverseitig und extrahiert usage.cost (letzter Wert gewinnt).
async function readUsageCost(stream) {
  const reader = stream.getReader();
  const dec = new TextDecoder();
  let buf = "";
  let cost = null;
  try {
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      let nl;
      while ((nl = buf.indexOf("\n")) >= 0) {
        const line = buf.slice(0, nl).trim();
        buf = buf.slice(nl + 1);
        if (!line.startsWith("data:")) continue;
        const payload = line.slice(5).trim();
        if (!payload || payload === "[DONE]") continue;
        try {
          const j = JSON.parse(payload);
          if (j.usage && typeof j.usage.cost === "number") cost = j.usage.cost;
        } catch { /* unvollständiger Chunk, ignorieren */ }
      }
    }
  } catch { /* Stream-Abbruch → cost bleibt null → TTL-Reconcile greift */ }
  return cost;
}

// Dev-Mock: gefälschter SSE-Stream mit gültigem, schema-geformtem JSON je Aktion +
// synthetischem usage.cost. Erlaubt den Last-Test (Gate ohne echte Kosten) UND einen
// End-to-End-Test des Clients (rendert echte Mock-Fragen/Bewertung).
function mockUpstreamResponse(env, action) {
  const cost = Number(env.MOCK_COST || 0.08);
  const payloads = {
    "generate-quiz": {
      titel: "Mock-Test", arbeitgeber: "Mock GmbH", arbeitsort: "Berlin", empfohlene_zeit_minuten: 10,
      fragen: [
        { id: 1, typ: "multiple_choice", kategorie: "Allgemein", schwierigkeit: "mittel", frage: "Mock-Frage 1: Was ist 2+2?", optionen: ["3", "4", "5", "6"], korrekte_antwort: "4", erklaerungen: ["zu klein", "richtig", "zu gross", "zu gross"], lerninfo: "Grundrechenart.", quellen: [] },
        { id: 2, typ: "offen", kategorie: "Allgemein", schwierigkeit: "leicht", frage: "Mock-Frage 2: Nenne eine Stärke.", optionen: [], korrekte_antwort: "Teamfähigkeit, mit Beispiel belegt.", erklaerungen: [], lerninfo: "Soft Skills konkret belegen.", quellen: [] },
      ],
    },
    "evaluate": {
      ergebnisse: [
        { id: 1, punkte: 8, feedback: "Mock-Feedback: gut begründet.", musterantwort: "Mock-Musterantwort." },
        { id: 2, punkte: 5, feedback: "Mock-Feedback: zu allgemein.", musterantwort: "Mock-Musterantwort." },
      ],
      gesamt: { prozent: 65, zusammenfassung: "Mock-Zusammenfassung.", staerken: ["Struktur"], verbesserungen: ["Konkreter werden"] },
    },
    "themenfelder": {
      themenfelder: [
        { label: "Mock-Feld A", kurzbeschreibung: "Beschreibung A.", schwerpunkt: true },
        { label: "Mock-Feld B", kurzbeschreibung: "Beschreibung B.", schwerpunkt: false },
      ],
    },
  };
  const content = JSON.stringify(payloads[action] || { mock: true });
  const enc = new TextEncoder();
  const chunk = JSON.stringify({ choices: [{ delta: { content } }] });
  const usage = JSON.stringify({ choices: [{ delta: {} }], usage: { cost, total_tokens: 1000 } });
  const stream = new ReadableStream({
    start(c) {
      c.enqueue(enc.encode("data: " + chunk + "\n\n"));
      c.enqueue(enc.encode("data: " + usage + "\n\n"));
      c.enqueue(enc.encode("data: [DONE]\n\n"));
      c.close();
    },
  });
  return new Response(stream, { status: 200, headers: { "Content-Type": "text/event-stream" } });
}
