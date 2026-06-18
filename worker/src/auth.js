// Phase B – Schritt 1: Auth-Gerüst (optionale Konten). Magic-Link (E-Mail über Resend)
// + Google-OAuth-Komfort-Login. Sessions als opakes Bearer-Token, in D1 nur als Hash.
// NOCH KEINE Credits/Zahlung – /auth/me liefert credits:0 fix. Anonyme Hosted-Nutzung
// bleibt unberührt; dieser Code läuft nur unter /auth/* und attachiert sonst nichts.
//
// Sicherheit: Tokens nie im Klartext speichern; Magic-Token einmalig + kurzlebig;
// OAuth-state einmalig (CSRF); konstante 202 bei magic/start (keine Account-Enumeration);
// Google-Code-Tausch + userinfo nur serverseitig; keine Fehlerdetails an den Client.

import { corsHeaders } from "./cors.js";
import { verifyTurnstile } from "./turnstile.js";

const MAGIC_TTL_DEFAULT = 900;       // 15 min
const SESSION_TTL_DEFAULT = 2592000; // 30 Tage
const STATE_TTL = 600;               // 10 min
const MAGIC_RATE_MAX = 5;            // max offene Magic-Tokens je E-Mail/Stunde
const MAGIC_GLOBAL_MAX = 300;        // globaler Stundencap fuer ausgehende Magic-Mails
const EMAIL_MAX = 254;

// --- kleine Helfer ---------------------------------------------------------

function now() { return Math.floor(Date.now() / 1000); }

function json(obj, status, env, origin) {
  return new Response(obj == null ? null : JSON.stringify(obj), {
    status,
    headers: { ...corsHeaders(env, origin), "Content-Type": "application/json" },
  });
}

function redirect(url, env, origin) {
  return new Response(null, { status: 302, headers: { ...corsHeaders(env, origin), Location: url } });
}

function b64url(bytes) {
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function randomToken(bytes = 32) {
  const a = new Uint8Array(bytes);
  crypto.getRandomValues(a);
  return b64url(a);
}

async function sha256hex(str) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function normEmail(raw) {
  if (typeof raw !== "string") return null;
  const e = raw.trim().toLowerCase();
  if (e.length < 3 || e.length > EMAIL_MAX) return null;
  // bewusst simpel: ein @ mit Punkt dahinter, keine Leerzeichen. Echte Zustellbarkeit
  // entscheidet ohnehin der Mailversand, nicht eine strenge Regex.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) return null;
  return e;
}

function bearer(req) {
  const h = req.headers.get("Authorization") || "";
  return h.startsWith("Bearer ") ? h.slice(7).trim() : "";
}

// --- D1-Zugriffe -----------------------------------------------------------

async function upsertUser(env, email) {
  const id = crypto.randomUUID();
  // INSERT OR IGNORE + SELECT: lockfrei und race-sicher (email ist UNIQUE).
  await env.DB.prepare("INSERT OR IGNORE INTO users (id, email, created_at) VALUES (?, ?, ?)")
    .bind(id, email, now()).run();
  return env.DB.prepare("SELECT id, email, created_at FROM users WHERE email = ?").bind(email).first();
}

async function ensureIdentity(env, userId, provider, subject) {
  await env.DB.prepare(
    "INSERT OR IGNORE INTO identities (id, user_id, provider, subject, created_at) VALUES (?, ?, ?, ?, ?)"
  ).bind(crypto.randomUUID(), userId, provider, subject, now()).run();
}

async function createSession(env, userId) {
  const raw = randomToken();
  const hash = await sha256hex(raw);
  const ttl = Number(env.SESSION_TTL_S || SESSION_TTL_DEFAULT);
  const t = now();
  await env.DB.prepare(
    "INSERT INTO sessions (token_hash, user_id, created_at, expires_at, last_seen) VALUES (?, ?, ?, ?, ?)"
  ).bind(hash, userId, t, t + ttl, t).run();
  return raw;
}

// Bearer → User oder null. Aktualisiert last_seen best-effort (touch). Beim häufigen
// Job-Polling touch:false setzen, sonst schreibt jeder Poll in D1 (Write-Verstärkung).
export async function getSessionUser(req, env, { touch = true } = {}) {
  const tok = bearer(req);
  if (!tok || !env.DB) return null;
  const hash = await sha256hex(tok);
  const row = await env.DB.prepare(
    `SELECT u.id AS id, u.email AS email, u.created_at AS created_at, s.expires_at AS expires_at
       FROM sessions s JOIN users u ON u.id = s.user_id
      WHERE s.token_hash = ?`
  ).bind(hash).first();
  if (!row || row.expires_at <= now()) return null;
  if (touch) await env.DB.prepare("UPDATE sessions SET last_seen = ? WHERE token_hash = ?").bind(now(), hash).run();
  return { id: row.id, email: row.email, created_at: row.created_at };
}

// --- Mailversand (Resend) --------------------------------------------------

async function sendMagicMail(env, email, link) {
  if (!env.RESEND_KEY) {
    // Dev ohne Versanddienst: Link in die Worker-Konsole (wrangler tail / dashboard).
    console.log(JSON.stringify({ ev: "magic-link-dev", email, link }));
    return;
  }
  const body = {
    from: env.MAGIC_FROM || "login@jobreif.de",
    to: [email],
    subject: "Dein Anmeldelink für jobreif.de",
    text: `Hier anmelden:\n${link}\n\nDer Link gilt 15 Minuten und nur einmal. Wenn du das nicht warst, ignoriere diese E-Mail.`,
    html: `<p>Hier anmelden:</p><p><a href="${link}">Bei jobreif.de anmelden</a></p>`
      + `<p style="color:#666;font-size:13px">Der Link gilt 15 Minuten und nur einmal. Wenn du das nicht warst, ignoriere diese E-Mail.</p>`,
  };
  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.RESEND_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!r.ok) console.log(JSON.stringify({ ev: "magic-send-fail", status: r.status }));
  } catch {
    console.log(JSON.stringify({ ev: "magic-send-error" }));
  }
}

// --- Endpoints -------------------------------------------------------------

async function magicStart(req, env, ctx, origin) {
  // Anti-Bot: Magic-Link liegt seit der Login-Pflicht auf dem kritischen Pfad. Ohne
  // Bot-Schutz koennte ein Skript beliebige Adressen durchiterieren (Mail-Bombing, Resend-
  // Kontingent/Reputation, Spam mit Login-Links — Codex-Review R5). Turnstile wie /api/*,
  // an die Aktion gebunden. Dev-Bypass via SKIP_TURNSTILE.
  if (env.SKIP_TURNSTILE !== "1") {
    const ip = req.headers.get("CF-Connecting-IP") || "0.0.0.0";
    const token = req.headers.get("CF-Turnstile-Token") || "";
    const tv = await verifyTurnstile(token, { action: "magic-link", secret: env.TURNSTILE_SECRET, ip });
    if (!tv.ok) return json({ error: "turnstile", reason: tv.reason }, 403, env, origin);
  }

  let body;
  try { body = await req.json(); } catch { return json({ error: "bad-json" }, 400, env, origin); }
  const email = normEmail(body && body.email);
  if (!email) return json({ error: "email" }, 400, env, origin);

  // Throttle gegen Mail-Bombing: pro Empfaenger UND global. ATOMAR als bedingter INSERT
  // (Codex-Review R6) — ein reines read-then-insert liesse parallele Requests alle unter
  // dem Cap sehen und dann alle senden. SQLite serialisiert Schreib-Transaktionen, daher
  // wertet dieses eine Statement COUNT + INSERT unter Schreibsperre aus: nur einfuegen,
  // wenn UNTER beiden Caps. Gemailt wird NUR, wenn der INSERT tatsaechlich griff.
  const since = now() - 3600;
  // Opportunistisches Raeumen: Zeilen ausserhalb des Zaehlfensters (1 h) sind laengst
  // abgelaufen (TTL 15 min) und werden nie mitgezaehlt → loeschen haelt die Tabelle klein,
  // damit der COUNT (mit den neuen Indizes, Migration 0003) auf dem Login-Pfad schnell
  // bleibt und nicht ueber eine append-only wachsende Historie scannt (Codex-Review R7).
  await env.DB.prepare("DELETE FROM magic_tokens WHERE created_at < ?").bind(since).run();
  const raw = randomToken();
  const hash = await sha256hex(raw);
  const ttl = Number(env.MAGIC_TTL_S || MAGIC_TTL_DEFAULT);
  const ins = await env.DB.prepare(
    `INSERT INTO magic_tokens (token_hash, email, created_at, expires_at, consumed)
     SELECT ?, ?, ?, ?, 0
     WHERE (SELECT COUNT(*) FROM magic_tokens WHERE email = ? AND created_at > ?) < ?
       AND (SELECT COUNT(*) FROM magic_tokens WHERE created_at > ?) < ?`
  ).bind(hash, email, now(), now() + ttl, email, since, MAGIC_RATE_MAX, since, MAGIC_GLOBAL_MAX).run();
  if (ins.meta && ins.meta.changes === 1) {
    const link = `${env.APP_ORIGIN || "https://jobreif.de"}/?auth=${raw}`;
    ctx.waitUntil(sendMagicMail(env, email, link));
  } else {
    console.log(JSON.stringify({ ev: "magic-suppressed" }));
  }
  // IMMER 202 – verrät nicht, ob die Adresse existiert/zugestellt wurde.
  return json({ ok: true }, 202, env, origin);
}

async function magicVerify(req, env, origin) {
  let body;
  try { body = await req.json(); } catch { return json({ error: "bad-json" }, 400, env, origin); }
  const raw = body && typeof body.token === "string" ? body.token : "";
  if (!raw) return json({ error: "invalid" }, 400, env, origin);
  const hash = await sha256hex(raw);
  const row = await env.DB.prepare(
    "SELECT email, expires_at, consumed FROM magic_tokens WHERE token_hash = ?"
  ).bind(hash).first();
  if (!row || row.consumed || row.expires_at <= now()) return json({ error: "invalid" }, 400, env, origin);
  // Einmalig: sofort als verbraucht markieren (idempotent gegen Doppel-Submit).
  const upd = await env.DB.prepare(
    "UPDATE magic_tokens SET consumed = 1 WHERE token_hash = ? AND consumed = 0"
  ).bind(hash).run();
  if (!upd.meta || upd.meta.changes !== 1) return json({ error: "invalid" }, 400, env, origin);

  const user = await upsertUser(env, row.email);
  await ensureIdentity(env, user.id, "magic", row.email);
  const token = await createSession(env, user.id);
  return json({ token, user: { email: user.email, created_at: user.created_at } }, 200, env, origin);
}

async function googleStart(req, env, origin) {
  if (!env.GOOGLE_CLIENT_ID) return json({ error: "oauth-unconfigured" }, 503, env, origin);
  // PKCE-artige Browser-Bindung: der Client haelt einen Verifier in sessionStorage und
  // schickt hier nur dessen Hash. Der spaetere /auth/exchange verlangt den Verifier zurueck;
  // so kann ein per Login-CSRF untergeschobener Callback von einem fremden Browser nicht
  // eingeloest werden (Codex-Review R3).
  const vh = new URL(req.url).searchParams.get("vh") || "";
  if (!/^[0-9a-f]{64}$/.test(vh)) return json({ error: "bad-verifier" }, 400, env, origin);
  const state = randomToken(24);
  const redirectUri = new URL(req.url).origin + "/auth/google/callback";
  // Abgelaufene states opportunistisch raeumen (abgebrochene Logins haeufen sich sonst an).
  await env.DB.prepare("DELETE FROM oauth_states WHERE expires_at < ?").bind(now()).run();
  // state-Insert vor dem Redirect (CSRF). waitUntil reicht nicht – muss persistiert sein.
  await env.DB.prepare(
    "INSERT INTO oauth_states (state, created_at, expires_at, verifier_hash) VALUES (?, ?, ?, ?)"
  ).bind(state, now(), now() + STATE_TTL, vh).run();
  const u = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  u.searchParams.set("client_id", env.GOOGLE_CLIENT_ID);
  u.searchParams.set("redirect_uri", redirectUri);
  u.searchParams.set("response_type", "code");
  u.searchParams.set("scope", "openid email");
  u.searchParams.set("state", state);
  u.searchParams.set("access_type", "online");
  u.searchParams.set("prompt", "select_account");
  return json({ url: u.toString() }, 200, env, origin);
}

async function googleCallback(req, env, origin) {
  const appOrigin = env.APP_ORIGIN || "https://jobreif.de";
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const fail = () => redirect(`${appOrigin}/?auth_error=1`, env, origin);
  if (!code || !state) return fail();

  // state einmalig prüfen + verbrauchen; den gebundenen Verifier-Hash uebernehmen.
  const st = await env.DB.prepare("SELECT expires_at, verifier_hash FROM oauth_states WHERE state = ?").bind(state).first();
  await env.DB.prepare("DELETE FROM oauth_states WHERE state = ?").bind(state).run();
  if (!st || st.expires_at <= now() || !st.verifier_hash) return fail();

  if (!env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET) return fail();
  const redirectUri = url.origin + "/auth/google/callback";
  try {
    const tokRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code, client_id: env.GOOGLE_CLIENT_ID, client_secret: env.GOOGLE_CLIENT_SECRET,
        redirect_uri: redirectUri, grant_type: "authorization_code",
      }),
    });
    if (!tokRes.ok) return fail();
    const tok = await tokRes.json();
    const infoRes = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
      headers: { Authorization: `Bearer ${tok.access_token}` },
    });
    if (!infoRes.ok) return fail();
    const info = await infoRes.json();
    const email = normEmail(info.email);
    if (!email || info.email_verified === false || !info.sub) return fail();

    const user = await upsertUser(env, email);
    await ensureIdentity(env, user.id, "google", String(info.sub));
    // KEIN durables Session-Token in die URL (Codex-Review R3): stattdessen einen
    // kurzlebigen Einmal-Code, an den Verifier-Hash gebunden. Die SPA tauscht ihn per
    // POST /auth/exchange (mit dem Verifier) gegen die Session.
    const handoff = randomToken();
    // Abgelaufene/alte Handoff-Codes opportunistisch raeumen (kurze TTL, haeufen sich sonst).
    await env.DB.prepare("DELETE FROM handoff_codes WHERE expires_at < ?").bind(now()).run();
    await env.DB.prepare(
      "INSERT INTO handoff_codes (code_hash, user_id, verifier_hash, created_at, expires_at, consumed) VALUES (?, ?, ?, ?, ?, 0)"
    ).bind(await sha256hex(handoff), user.id, st.verifier_hash, now(), now() + 120).run();
    return redirect(`${appOrigin}/?code=${handoff}`, env, origin);
  } catch {
    return fail();
  }
}

// Tauscht den kurzlebigen Handoff-Code (aus dem Google-Redirect) gegen ein Session-Token.
// Verlangt den Verifier zurueck (Browser-Bindung): nur der Browser, der den Login gestartet
// hat, kann einloesen. Einmalig + kurzlebig.
async function exchange(req, env, origin) {
  let body;
  try { body = await req.json(); } catch { return json({ error: "bad-json" }, 400, env, origin); }
  const rawCode = body && typeof body.code === "string" ? body.code : "";
  const verifier = body && typeof body.verifier === "string" ? body.verifier : "";
  if (!rawCode || !verifier) return json({ error: "invalid" }, 400, env, origin);
  const codeHash = await sha256hex(rawCode);
  const row = await env.DB.prepare(
    "SELECT user_id, verifier_hash, expires_at, consumed FROM handoff_codes WHERE code_hash = ?"
  ).bind(codeHash).first();
  if (!row || row.consumed || row.expires_at <= now()) return json({ error: "invalid" }, 400, env, origin);
  // Verifier-Bindung pruefen: sha256(verifier) muss zum gespeicherten Hash passen.
  if ((await sha256hex(verifier)) !== row.verifier_hash) return json({ error: "invalid" }, 400, env, origin);
  // Einmalig: atomar als verbraucht markieren.
  const upd = await env.DB.prepare(
    "UPDATE handoff_codes SET consumed = 1 WHERE code_hash = ? AND consumed = 0"
  ).bind(codeHash).run();
  if (!upd.meta || upd.meta.changes !== 1) return json({ error: "invalid" }, 400, env, origin);
  const u = await env.DB.prepare("SELECT id, email, created_at FROM users WHERE id = ?").bind(row.user_id).first();
  if (!u) return json({ error: "invalid" }, 400, env, origin);
  const token = await createSession(env, u.id);
  return json({ token, user: { email: u.email, created_at: u.created_at } }, 200, env, origin);
}

async function me(req, env, origin) {
  const user = await getSessionUser(req, env);
  if (!user) return json({ error: "unauthenticated" }, 401, env, origin);
  // credits fix 0 bis Phase B (Verkaufslogik); Feld jetzt schon stabil im Vertrag.
  return json({ user: { email: user.email, created_at: user.created_at }, credits: 0 }, 200, env, origin);
}

async function logout(req, env, origin) {
  const tok = bearer(req);
  if (tok && env.DB) {
    const hash = await sha256hex(tok);
    await env.DB.prepare("DELETE FROM sessions WHERE token_hash = ?").bind(hash).run();
  }
  return json(null, 204, env, origin);
}

// Dev-Helfer (nur ueber den MOCK-gegateten /debug/session-Endpoint erreichbar): mintet
// eine echte Session fuer eine Test-E-Mail, damit der Lasttest den Auth-Pflicht-Pfad
// (Budget/Concurrency je user.id) tatsaechlich durchlaeuft (Codex-Review R5).
export async function devMintSession(env, email) {
  const e = normEmail(email) || "loadtest@dev.local";
  const user = await upsertUser(env, e);
  await ensureIdentity(env, user.id, "magic", e);
  return createSession(env, user.id);
}

// --- Router ----------------------------------------------------------------
// Gibt eine Response für jeden /auth/*-Pfad zurück (auch 404/405/503), damit der
// Aufrufer in index.js den /api-Zweig nicht mehr anfasst.
export async function handleAuth(req, env, ctx, path, origin) {
  if (!env.DB) return json({ error: "auth-unconfigured" }, 503, env, origin);
  const m = req.method;
  if (path === "/auth/magic/start" && m === "POST") return magicStart(req, env, ctx, origin);
  if (path === "/auth/magic/verify" && m === "POST") return magicVerify(req, env, origin);
  if (path === "/auth/google/start" && m === "GET") return googleStart(req, env, origin);
  if (path === "/auth/google/callback" && m === "GET") return googleCallback(req, env, origin);
  if (path === "/auth/exchange" && m === "POST") return exchange(req, env, origin);
  if (path === "/auth/me" && m === "GET") return me(req, env, origin);
  if (path === "/auth/logout" && m === "POST") return logout(req, env, origin);
  return json({ error: "not-found" }, 404, env, origin);
}
