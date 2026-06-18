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

// Standard: jede Anfrage von einer anderen IP (testet die BUDGET-Decke). SAME_IP=1
// schickt alles von einer IP (testet die Pro-IP/Pro-Subjekt-Drosselung aus A.7).
const sameIp = process.env.SAME_IP === "1";

async function oneCall(i) {
  try {
    const headers = { "Content-Type": "application/json" };
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

  const results = await Promise.all(Array.from({ length: N }, (_, i) => oneCall(i)));
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
  const ok = committed <= budget + 1e-6;
  console.log(`committed=${committed} vs dayBudget=${budget} → Überschuss ${overshoot.toFixed(6)}`);
  console.log(ok
    ? "PASS: Budget wurde unter paralleler Last NICHT überschritten."
    : "FAIL: Budget überschritten — Gate-Atomarität prüfen.");
  process.exit(ok ? 0 : 1);
})();
