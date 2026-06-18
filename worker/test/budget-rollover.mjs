// Regression: Budget-DO ueber UTC-Mitternacht (rolloverIfNeeded).
//
// Deckt das Cross-Midnight-Accounting ab, das vorher still kaputt war:
//  - perSubject und dayReserved werden aus den ueberlebenden Reserven neu aufgebaut,
//    weil settle/release/reconcile sie spaeter wieder abbuchen (sonst Clamp-auf-0 →
//    Pro-Subjekt-Anteil ginge verloren).
//  - perIp wird beim Rollover geleert (Pro-Tag-Nutzungszaehler, nur release dekrementiert
//    ihn; settle/reconcile lassen ihn stehen). Wuerde er aus den Reserven neu aufgebaut,
//    bliebe der Eintrag nach settle den ganzen neuen Tag stehen und der Call zaehlte gegen
//    alten UND neuen Tag → faelschlich erschoepftes Pro-IP-Tageslimit.
//
// Kein Netzwerk, keine Abhaengigkeiten: In-Memory-Fakes fuer state.storage + env,
// mit kontrolliertem "heute" ueber Date-Stubbing.
//
// Start: node worker/test/budget-rollover.mjs

import { BudgetDO } from "../src/budget-do.js";

let failures = 0;
function assert(cond, msg) {
  if (cond) { console.log("  ok:", msg); return; }
  failures++;
  console.error("  FAIL:", msg);
}
function eq(a, b, msg) { assert(a === b, `${msg} (erwartet ${b}, war ${a})`); }

// Date so stubben, dass today() (new Date().toISOString().slice(0,10)) deterministisch ist.
const RealDate = Date;
let FAKE_NOW = RealDate.parse("2026-06-19T23:59:00.000Z");
globalThis.Date = class extends RealDate {
  constructor(...args) { if (args.length === 0) { super(FAKE_NOW); } else { super(...args); } }
  static now() { return FAKE_NOW; }
};

function makeEnv(overrides = {}) {
  return {
    DAY_BUDGET_USD: "10",
    MAX_INFLIGHT: "100",
    PER_SUBJECT_SHARE: "0.5",   // subjectShare = 5
    PER_IP_DAY: "8",
    RESERVE_TTL_S: "120",
    ALERT_AT: "0.8",
    ...overrides,
  };
}

function makeState() {
  const map = new Map();
  return {
    storage: {
      async get(k) { return map.get(k); },
      async put(obj) { for (const [k, v] of Object.entries(obj)) map.set(k, v); },
    },
  };
}

async function run() {
  console.log("Test 1: Cross-Midnight settle bucht echten cost, perIp zaehlt nicht doppelt");
  {
    // WICHTIG: Uhr VOR dem Konstruieren/Laden setzen — load() initialisiert this.day
    // aus today(), sonst startet das DO faelschlich schon am neuen Tag.
    FAKE_NOW = RealDate.parse("2026-06-19T23:59:00.000Z");
    const bd = new BudgetDO(makeState(), makeEnv());
    await bd.load();
    // Reserve am 19.06. (vor Mitternacht).
    const res = bd.reserve({ amount: 2, subject: "subjA", ip: "1.2.3.4", exclusive: true });
    assert(res.ok, "reserve am Vortag akzeptiert");
    eq(bd.perSubject["subjA"], 2, "perSubject am Vortag");
    eq(bd.perIp["1.2.3.4"], 1, "perIp am Vortag");

    // Mitternacht ueberschreiten und rollover ausloesen.
    FAKE_NOW = RealDate.parse("2026-06-20T00:01:00.000Z");
    bd.rolloverIfNeeded();
    eq(bd.day, "2026-06-20", "Tag gewechselt");
    eq(bd.daySpent, 0, "daySpent zurueckgesetzt");
    eq(bd.perSubject["subjA"], 2, "perSubject aus offener Reserve neu aufgebaut");
    eq(bd.dayReserved, 2, "dayReserved aus offener Reserve neu aufgebaut");
    assert(!("1.2.3.4" in bd.perIp), "perIp am neuen Tag geleert (Tagesreset)");

    // settle mit echtem cost.
    bd.settle({ reserveId: res.reserveId, cost: 0.7 });
    eq(Math.round(bd.daySpent * 100), 70, "settle bucht echten cost (0.70) auf neuen Tag");
    eq(bd.perSubject["subjA"], 0.7, "perSubject nettet auf +cost (kein verlorener Anteil)");
    eq(bd.dayReserved, 0, "dayReserved nach settle wieder 0");
    // perIp wurde von settle NICHT angefasst → bleibt leer, also kein Doppel-Zaehlen.
    assert(!("1.2.3.4" in bd.perIp) || bd.perIp["1.2.3.4"] === 0,
      "perIp zaehlt cross-midnight Call NICHT erneut gegen neuen Tag");
  }

  console.log("Test 2: Acht Streams ueber Mitternacht erschoepfen NICHT das neue Pro-IP-Limit");
  {
    FAKE_NOW = RealDate.parse("2026-06-19T23:59:00.000Z");
    const bd = new BudgetDO(makeState(), makeEnv());
    await bd.load();
    const ids = [];
    for (let i = 0; i < 8; i++) {
      const r = bd.reserve({ amount: 0.1, subject: "s" + i, ip: "9.9.9.9", exclusive: false });
      assert(r.ok, `Vortag-Reserve ${i} akzeptiert`);
      ids.push(r.reserveId);
    }
    eq(bd.perIp["9.9.9.9"], 8, "perIp am Vortag am Limit");

    FAKE_NOW = RealDate.parse("2026-06-20T00:01:00.000Z");
    bd.rolloverIfNeeded();
    for (const id of ids) bd.settle({ reserveId: id, cost: 0.05 });

    // Nach settle muss am neuen Tag wieder Platz fuer Pro-IP-Aufrufe sein.
    const fresh = bd.reserve({ amount: 0.1, subject: "neu", ip: "9.9.9.9", exclusive: false });
    assert(fresh.ok, "neuer Aufruf derselben IP am neuen Tag NICHT durch 'ip' geblockt");
  }

  console.log("Test 3: Cross-Midnight release refundet Reserve, perIp clampt sauber");
  {
    FAKE_NOW = RealDate.parse("2026-06-19T23:59:00.000Z");
    const bd = new BudgetDO(makeState(), makeEnv());
    await bd.load();
    const r = bd.reserve({ amount: 3, subject: "subjB", ip: "5.5.5.5", exclusive: true });
    assert(r.ok, "Vortag-Reserve akzeptiert");

    FAKE_NOW = RealDate.parse("2026-06-20T00:01:00.000Z");
    bd.rolloverIfNeeded();
    eq(bd.perSubject["subjB"], 3, "perSubject neu aufgebaut vor release");
    eq(bd.dayReserved, 3, "dayReserved neu aufgebaut vor release");

    bd.release({ reserveId: r.reserveId });
    eq(bd.perSubject["subjB"], 0, "release nettet perSubject auf 0 (kein verlorener Anteil)");
    eq(bd.dayReserved, 0, "release gibt Reserve voll zurueck");
    eq(bd.daySpent, 0, "release bucht nichts auf daySpent");
    // perIp war am neuen Tag leer; release clampt auf 0 (kein Negativwert).
    assert((bd.perIp["5.5.5.5"] || 0) === 0, "perIp bleibt bei 0 (Math.max-Clamp)");
  }

  globalThis.Date = RealDate;
  if (failures) { console.error(`\n${failures} Assertion(s) fehlgeschlagen.`); process.exit(1); }
  console.log("\nAlle Cross-Midnight-Budget-Asserts gruen.");
}

run().catch((e) => { globalThis.Date = RealDate; console.error(e); process.exit(1); });
