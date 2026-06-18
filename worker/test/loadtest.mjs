// Concurrency-Last-Test des Budget-Gates (Plan A.6 Verifikations-Blocker):
// „viele parallele Calls dürfen DAY_BUDGET_USD NICHT nennenswert überschießen".
//
// Voraussetzung: `wrangler dev` läuft mit .dev.vars (MOCK_UPSTREAM=1, SKIP_TURNSTILE=1),
// damit KEINE echten OpenRouter-Kosten entstehen.
//
// Start:
//   BASE=http://127.0.0.1:8787 N=80 node test/loadtest.mjs

const BASE = process.env.BASE || "http://127.0.0.1:8787";
const N = Number(process.env.N || 80);

const body = JSON.stringify({
  jobText: "Wir suchen eine Fachkraft (m/w/d). Aufgaben: Beispiel. Profil: Beispiel.",
  numQuestions: 8,
  tier: "standard",
});

// Standard: jede Anfrage von einer anderen IP UND einem anderen Konto (testet die
// BUDGET-Decke; das Pro-Konto-exclusive-Gate wuerde sonst gleichkontige Parallel-Calls
// drosseln). SAME_IP=1 schickt alles von EINER IP und EINEM Konto (testet die Pro-IP/
// Pro-Subjekt-Drosselung aus A.7, Subjekt ist seit der Login-Pflicht user.id).
const sameIp = process.env.SAME_IP === "1";

// Seit der Anmeldepflicht (Phase B) braucht jeder Hosted-Call eine gueltige Session, sonst
// 401 VOR dem Budget-Gate → der Test liefe sonst leer (Codex-Review R5). Im Dev mintet
// /debug/session echte Sessions (nur bei MOCK_UPSTREAM erreichbar).
async function mintSession(email) {
  const r = await fetch(`${BASE}/debug/session?email=${encodeURIComponent(email)}`);
  if (!r.ok) throw new Error(`/debug/session ${r.status} — laeuft wrangler dev mit MOCK_UPSTREAM=1 und D1-Migrationen?`);
  return (await r.json()).token;
}

async function oneCall(i, token) {
  try {
    const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
    headers["CF-Connecting-IP"] = sameIp ? "203.0.113.1" : `10.0.${(i >> 8) & 255}.${i & 255}`;
    const res = await fetch(`${BASE}/api/generate-quiz`, {
      method: "POST",
      headers,
      body,
    });
    // Stream/JSON vollständig konsumieren, damit der Call serverseitig abschließt.
    await res.text();
    return res.status;
  } catch (e) {
    return "ERR";
  }
}

async function stats() {
  try {
    const r = await fetch(`${BASE}/debug/stats`);
    return await r.json();
  } catch {
    return null;
  }
}

(async () => {
  console.log(`Last-Test: ${N} parallele Calls gegen ${BASE}\n`);
  const before = await stats();
  if (!before) {
    console.error("Konnte /debug/stats nicht lesen. Läuft `wrangler dev` mit MOCK_UPSTREAM=1?");
    process.exit(1);
  }
  console.log("Vorher:", JSON.stringify(before));

  // Sessions vorbereiten: SAME_IP → ein Konto fuer alle; sonst ein eigenes Konto je Call.
  let tokens;
  try {
    if (sameIp) {
      const t = await mintSession("loadtest-shared@dev.local");
      tokens = Array.from({ length: N }, () => t);
    } else {
      tokens = await Promise.all(Array.from({ length: N }, (_, i) => mintSession(`loadtest-${i}@dev.local`)));
    }
  } catch (e) {
    console.error(String(e.message || e));
    process.exit(1);
  }

  const results = await Promise.all(Array.from({ length: N }, (_, i) => oneCall(i, tokens[i])));
  const tally = {};
  for (const s of results) tally[s] = (tally[s] || 0) + 1;

  // kurz warten, bis die letzten waitUntil-Settles durch sind
  let after = await stats();
  for (let i = 0; i < 20 && after && (after.inflight > 0 || after.openReservations > 0); i++) {
    await new Promise((r) => setTimeout(r, 200));
    after = await stats();
  }

  console.log("\nStatus-Verteilung:", JSON.stringify(tally));
  console.log("Nachher:", JSON.stringify(after));

  const budget = after.dayBudget;
  const committed = after.committed;
  const accepted = tally["200"] || 0;
  console.log(`\nAkzeptiert (200): ${accepted}, abgelehnt 503(Budget)/429(Limit): ${(tally["503"] || 0)}/${(tally["429"] || 0)}`);

  const overshoot = committed - budget;
  const budgetOk = committed <= budget + 1e-6;
  // Seit der Login-Pflicht muss der Test den geschuetzten Pfad WIRKLICH durchlaufen:
  // mit gueltiger Session darf es keine 401 geben, und es muss tatsaechlich akzeptierte
  // Calls geben — sonst liefe der Test leer und der Budget-PASS waere vacuous (Codex R5).
  const unexpected401 = tally["401"] || 0;
  // SAME_IP testet die Drosselung (wenig/kein 200 ist dort erwartet); im Budget-Modus
  // muss mindestens ein Call akzeptiert worden sein.
  const acceptedOk = sameIp || accepted > 0;
  const ok = budgetOk && acceptedOk && unexpected401 === 0;
  console.log(`committed=${committed} vs dayBudget=${budget} → Überschuss ${overshoot.toFixed(6)}`);
  if (unexpected401 > 0) console.log(`FAIL: ${unexpected401}x 401 trotz gueltiger Session — Auth-Pfad/Session-Mint pruefen.`);
  if (!acceptedOk) console.log("FAIL: 0 akzeptierte Calls — der Budget-Pfad wurde nicht ausgeuebt (vacuous).");
  if (!budgetOk) console.log("FAIL: Budget überschritten — Gate-Atomarität prüfen.");
  if (ok) console.log("PASS: Budget unter paralleler Last NICHT überschritten, Auth-Pfad ausgeuebt.");
  process.exit(ok ? 0 : 1);
})();
