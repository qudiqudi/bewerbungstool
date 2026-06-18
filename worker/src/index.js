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

    // Nur in Dev (MOCK_UPSTREAM) freigegebener Status-Endpunkt für den Last-Test.
    if (path === "/debug/stats" && env.MOCK_UPSTREAM === "1") {
      const stub = budgetStub(env);
      const stats = await stub.fetch("https://do/stats").then((r) => r.json());
      return json(stats, 200, env, origin);
    }

    // Async-Generierung (Hintergrund-Job, Punkt 1): Start + Poll.
    if (path === "/api/jobs" && req.method === "POST") return await startJob(req, env, ctx, origin);
    if (path.startsWith("/api/jobs/") && req.method === "GET") {
      return await pollJob(path.slice("/api/jobs/".length), env, origin);
    }

    const route = ROUTES[path];
    if (req.method !== "POST" || !route) return json({ error: "not-found" }, 404, env, origin);
    const ip = req.headers.get("CF-Connecting-IP") || "0.0.0.0";

    // 1) Turnstile (Dev-Bypass via SKIP_TURNSTILE=1)
    if (env.SKIP_TURNSTILE !== "1") {
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
    const gate = await doCall(stub, "reserve", { amount: reserve, subject: ip, ip, exclusive });
    if (!gate.ok) {
      const status = gate.reason === "budget" ? 503 : 429; // active-job/inflight/subject/ip → 429
      return json({ error: gate.reason }, status, env, origin);
    }
    const reserveId = gate.reserveId;

    // 5) Upstream
    try {
      const messages = route.build(body);

      const res = env.MOCK_UPSTREAM === "1"
        ? mockUpstream(env, route.action)
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

  if (env.SKIP_TURNSTILE !== "1") {
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
  const gate = await doCall(stub, "reserve", { amount: reserve, subject: ip, ip, exclusive: true });
  if (!gate.ok) {
    const status = gate.reason === "budget" ? 503 : 429; // active-job/inflight/subject/ip → 429
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
      body: JSON.stringify({ params, tier, subject: ip, reserveId: gate.reserveId, reserveAmount: reserve }),
    });
  } catch {
    await doCall(stub, "release", { reserveId: gate.reserveId }); // Slot wieder freigeben
    return json({ error: "start-failed" }, 502, env, origin);
  }
  return json({ jobId }, 202, env, origin);
}

// Pollt den Status/Result eines Jobs (jobId ist eine nicht erratbare UUID).
async function pollJob(jobId, env, origin) {
  if (!jobId || jobId.length > 64) return json({ error: "bad-job" }, 400, env, origin);
  const jobStub = env.GENJOB_DO.get(env.GENJOB_DO.idFromName(jobId));
  let st;
  try { st = await jobStub.fetch("https://do/status").then((r) => r.json()); }
  catch { return json({ error: "poll-failed" }, 502, env, origin); }
  if (st.status === "done") return json({ status: "done", quiz: st.result }, 200, env, origin);
  if (st.status === "error") return json({ status: "error", code: st.errorCode || null }, 200, env, origin);
  if (st.status === "unknown") return json({ status: "unknown" }, 404, env, origin);
  return json({ status: "pending" }, 200, env, origin);
}

// --- Helfer ---------------------------------------------------------------

function budgetStub(env) {
  return env.BUDGET_DO.get(env.BUDGET_DO.idFromName("global"));
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
function mockUpstream(env, action) {
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
