// Regression (Topic #2): POST /api/report bewahrt das answersSecret-Verhalten.
//
// Kritisch: Wird eine Frage MITTEN in der Pruefung gemeldet, hat der Client
// korrekte_antwort bereits geleert ("") - der Server darf sie NIE rekonstruieren,
// sondern uebernimmt exakt, was geschickt wurde. Ausserdem: keine IP wird gespeichert,
// und ein D1-Fehler/fehlende Tabelle darf nie etwas brechen (immer 202).
//
// Kein Netzwerk: In-Memory-Fakes fuer env.DB (zeichnet die gebundenen Params auf).
// Start: node worker/test/report-secret.mjs

import worker from "../src/index.js";

let failures = 0;
function assert(cond, msg) {
  if (cond) { console.log("  ok:", msg); return; }
  failures++;
  console.error("  FAIL:", msg);
}
function eq(a, b, msg) { assert(a === b, `${msg} (erwartet ${JSON.stringify(b)}, war ${JSON.stringify(a)})`); }

// Faked D1: merkt sich die gebundenen Parameter des letzten INSERT.
function makeDB() {
  const db = { lastBind: null, throwOnRun: false };
  db.prepare = () => ({
    bind(...params) { db.lastBind = params; return this; },
    async run() { if (db.throwOnRun) throw new Error("no such table"); return { meta: { changes: 1 } }; },
    async first() { return null; },
  });
  return db;
}

function makeEnv(over = {}) {
  return { ALLOWED_ORIGINS: "https://jobreif.de", DB: makeDB(), ...over };
}

function reportReq(body) {
  return new Request("https://api.jobreif.de/api/report", {
    method: "POST",
    headers: { "Content-Type": "application/json", "CF-Connecting-IP": "203.0.113.7", Origin: "https://jobreif.de" },
    body: JSON.stringify(body),
  });
}

const ctx = { waitUntil() {} };

async function run() {
  console.log("Test 1: answersSecret -> leere korrekte_antwort bleibt leer, keine IP gespeichert");
  {
    const env = makeEnv();
    const res = await worker.fetch(reportReq({
      fragenKey: "fk1", frage: "Was ist die Hauptstadt?", typ: "offen",
      kategorie_fachlich: "Geo", korrekte_antwort: "", // mitten in der Pruefung geleert
      optionen: [], gruende: ["fachlich_falsch"], notiz: "unklar",
      jobKey: "j123", stellenTitel: "Tester", provider: "hosted", tier: "standard", model: null,
    }), env, ctx);
    eq(res.status, 202, "Report-POST antwortet 202");
    const b = env.DB.lastBind;
    assert(Array.isArray(b), "INSERT wurde mit Parametern gebunden");
    // Reihenfolge: id, created_at, fragen_key, frage, typ, kategorie, korrekte_antwort, ...
    eq(b[6], "", "korrekte_antwort bleibt leer (Server rekonstruiert nichts)");
    eq(b[2], "fk1", "fragen_key korrekt gebunden");
    assert(!b.includes("203.0.113.7"), "keine IP in den gebundenen Werten");
  }

  console.log("Test 2: nach dem Aufloesen darf die korrekte_antwort durchgereicht werden");
  {
    const env = makeEnv();
    await worker.fetch(reportReq({
      fragenKey: "fk2", frage: "2+2?", typ: "multiple_choice",
      korrekte_antwort: "4", optionen: ["3", "4"], gruende: [], notiz: "",
    }), env, ctx);
    eq(env.DB.lastBind[6], "4", "korrekte_antwort wird unveraendert uebernommen");
  }

  console.log("Test 3: Pflichtfelder leer -> verworfen, kein INSERT, trotzdem 202");
  {
    const env = makeEnv();
    const res = await worker.fetch(reportReq({ fragenKey: "", frage: "", typ: "offen" }), env, ctx);
    eq(res.status, 202, "verworfener Report antwortet trotzdem 202");
    assert(env.DB.lastBind === null, "kein INSERT bei fehlenden Pflichtfeldern");
  }

  console.log("Test 4: D1-Fehler (fehlende Tabelle) -> 202, nichts bricht");
  {
    const env = makeEnv();
    env.DB.throwOnRun = true;
    const res = await worker.fetch(reportReq({ fragenKey: "fk", frage: "x", typ: "offen", gruende: ["sonstiges"] }), env, ctx);
    eq(res.status, 202, "D1-Fehler bleibt fuer den Client unsichtbar (202)");
  }

  console.log("Test 5: /api/event ohne AE-Binding -> 204 No-op, kein Wurf");
  {
    const env = makeEnv();
    const res = await worker.fetch(new Request("https://api.jobreif.de/api/event", {
      method: "POST", headers: { "Content-Type": "application/json", Origin: "https://jobreif.de" },
      body: JSON.stringify({ flow: "exam-start", provider: "hosted", tier: "standard" }),
    }), env, ctx);
    eq(res.status, 204, "Event ohne AE-Binding antwortet 204");
  }

  console.log("Test 6: /api/event schreibt nur Allowlist-Werte, kein PII");
  {
    let written = null;
    const env = makeEnv({ AE: { writeDataPoint(p) { written = p; } } });
    await worker.fetch(new Request("https://api.jobreif.de/api/event", {
      method: "POST",
      headers: { "Content-Type": "application/json", "CF-Connecting-IP": "203.0.113.7", Origin: "https://jobreif.de" },
      body: JSON.stringify({ flow: "learn-start", provider: "hosted", tier: "guenstig", email: "a@b.de", jobText: "geheim" }),
    }), env, ctx);
    assert(written && Array.isArray(written.blobs), "writeDataPoint mit blobs aufgerufen");
    eq(written.blobs[0], "learn-start", "flow als blob");
    eq(written.blobs[1], "hosted", "provider als blob");
    eq(written.blobs[2], "guenstig", "tier als blob");
    const flat = JSON.stringify(written);
    assert(!flat.includes("203.0.113.7") && !flat.includes("a@b.de") && !flat.includes("geheim"),
      "kein IP/E-Mail/Text im Datenpunkt");
  }

  console.log("Test 7: /api/event mit unbekanntem Flow -> nichts geschrieben");
  {
    let called = false;
    const env = makeEnv({ AE: { writeDataPoint() { called = true; } } });
    const res = await worker.fetch(new Request("https://api.jobreif.de/api/event", {
      method: "POST", headers: { "Content-Type": "application/json", Origin: "https://jobreif.de" },
      body: JSON.stringify({ flow: "haxx", provider: "hosted" }),
    }), env, ctx);
    eq(res.status, 204, "unbekannter Flow trotzdem 204");
    assert(!called, "kein writeDataPoint bei unbekanntem Flow");
  }

  if (failures) { console.error(`\n${failures} Assertion(s) fehlgeschlagen.`); process.exit(1); }
  console.log("\nAlle Report/Event-Asserts gruen.");
}

run().catch((e) => { console.error(e); process.exit(1); });
