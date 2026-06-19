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
    _alarm: null,
    storage: {
      async get(k) { return map.get(k); },
      async put(obj) { for (const [k, v] of Object.entries(obj)) map.set(k, v); },
      // Alarm-Stub fuer den Budget-Alert-Outbox-Pfad.
      async setAlarm(ts) { this._ts = ts; },
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

  console.log("Test 4: Vortags-release nach neuer Reserve derselben IP verfaelscht perIp NICHT");
  {
    FAKE_NOW = RealDate.parse("2026-06-19T23:59:00.000Z");
    const bd = new BudgetDO(makeState(), makeEnv());
    await bd.load();
    // Vortags-Reserve, die ueber Mitternacht offen bleibt.
    const old = bd.reserve({ amount: 1, subject: "alt", ip: "7.7.7.7", exclusive: true });
    assert(old.ok, "Vortags-Reserve akzeptiert");

    // Rollover: perIp wird geleert.
    FAKE_NOW = RealDate.parse("2026-06-20T00:01:00.000Z");
    bd.rolloverIfNeeded();
    assert(!("7.7.7.7" in bd.perIp), "perIp am neuen Tag geleert");

    // Neue, erfolgreiche Reserve derselben IP am neuen Tag.
    const fresh = bd.reserve({ amount: 0.5, subject: "neu", ip: "7.7.7.7", exclusive: false });
    assert(fresh.ok, "neue Reserve derselben IP akzeptiert");
    eq(bd.perIp["7.7.7.7"], 1, "perIp am neuen Tag = 1 (nur der neue Call)");

    // Jetzt loest sich die ALTE (Vortags-)Reserve per release auf — darf den perIp des
    // neuen Tages NICHT herunterziehen.
    bd.release({ reserveId: old.reserveId });
    eq(bd.perIp["7.7.7.7"], 1, "Vortags-release laesst perIp des neuen Tages unveraendert");

    // Harte Pruefung: das Pro-IP-Tageslimit (8) bleibt scharf — nach diesem 1 Call
    // duerfen genau 7 weitere durch, der 9. wird geblockt.
    for (let i = 0; i < 7; i++) {
      const r = bd.reserve({ amount: 0.1, subject: "x" + i, ip: "7.7.7.7", exclusive: false });
      assert(r.ok, `Folge-Reserve ${i} akzeptiert (innerhalb des Limits)`);
    }
    const over = bd.reserve({ amount: 0.1, subject: "zuviel", ip: "7.7.7.7", exclusive: false });
    eq(over.reason, "ip", "9. Call derselben IP korrekt durch 'ip' geblockt");
  }

  console.log("Test 5: Legacy-Reserve ohne r.day (alter Storage) verfaelscht perIp nach Mitternacht NICHT");
  {
    FAKE_NOW = RealDate.parse("2026-06-19T23:59:00.000Z");
    const bd = new BudgetDO(makeState(), makeEnv());
    await bd.load();
    // Reserve simulieren, wie sie aus altem Storage (main, vor dem day-Feld) stammt:
    // KEIN day-Feld, aber ts vom Vortag. Direkt einschleusen und perIp wie am Vortag belegt.
    const legacyId = "legacy-1";
    bd.reservations[legacyId] = {
      amount: 1, subject: "alt", ip: "8.8.8.8",
      ts: RealDate.parse("2026-06-19T23:50:00.000Z"), exclusive: true,
    };
    bd.perIp["8.8.8.8"] = 1;
    bd.dayReserved = 1;
    bd.perSubject["alt"] = 1;

    // Rollover: perIp wird geleert.
    FAKE_NOW = RealDate.parse("2026-06-20T00:01:00.000Z");
    bd.rolloverIfNeeded();
    assert(!("8.8.8.8" in bd.perIp), "perIp am neuen Tag geleert (Legacy-Fall)");

    // Neue, erfolgreiche Reserve derselben IP am neuen Tag.
    const fresh = bd.reserve({ amount: 0.5, subject: "neu", ip: "8.8.8.8", exclusive: false });
    assert(fresh.ok, "neue Reserve derselben IP akzeptiert (Legacy-Fall)");
    eq(bd.perIp["8.8.8.8"], 1, "perIp am neuen Tag = 1 (nur der neue Call)");

    // Legacy-Reserve (ohne day) loest sich per release auf — der Belegungs-Tag wird aus ts
    // abgeleitet (19.06.) und stimmt NICHT mit dem aktuellen Tag ueberein → perIp bleibt
    // unveraendert (vorher wurde r.day===undefined als aktueller Tag behandelt → Bypass).
    bd.release({ reserveId: legacyId });
    eq(bd.perIp["8.8.8.8"], 1, "Legacy-release (Tag aus ts) laesst perIp des neuen Tages unveraendert");

    // Pro-IP-Tageslimit (8) bleibt scharf: nach diesem 1 Call genau 7 weitere, der 9. blockt.
    for (let i = 0; i < 7; i++) {
      const r = bd.reserve({ amount: 0.1, subject: "y" + i, ip: "8.8.8.8", exclusive: false });
      assert(r.ok, `Folge-Reserve ${i} akzeptiert (innerhalb des Limits)`);
    }
    const over = bd.reserve({ amount: 0.1, subject: "zuviel", ip: "8.8.8.8", exclusive: false });
    eq(over.reason, "ip", "9. Call derselben IP korrekt durch 'ip' geblockt (Legacy-Fall)");
  }

  console.log("Test 6: Budget-Alert feuert genau einmal pro UTC-Tag, durable, reset bei Rollover");
  {
    const realFetch = globalThis.fetch;
    let sends = [];
    let failNext = false;
    globalThis.fetch = async (url, opts) => {
      sends.push({ url, body: JSON.parse(opts.body) });
      return { ok: !failNext };
    };
    try {
      FAKE_NOW = RealDate.parse("2026-06-19T12:00:00.000Z");
      // ALERT_AT 0.8 * DAY_BUDGET 10 = Schwelle 8.
      const bd = new BudgetDO(makeState(), makeEnv({ BUDGET_ALERT_WEBHOOK: "https://hook.example/x" }));
      await bd.load();

      // Unter der Schwelle: kein Alarm scharf.
      bd.reserve({ amount: 5, subject: "s1", ip: "1.1.1.1", exclusive: false });
      await bd.maybeArmAlert();
      assert(!bd.alertPending, "unter 80% kein Alert scharf");

      // Schwelle ueberschreiten (committed 5+4=9 >= 8): Latch + Outbox scharf.
      bd.reserve({ amount: 4, subject: "s2", ip: "2.2.2.2", exclusive: false });
      await bd.maybeArmAlert();
      assert(bd.alertPending, "ueber 80% Outbox scharf");
      eq(bd.alertedDay, "2026-06-19", "Latch traegt aktuellen UTC-Tag");

      // Alarm liefert zu -> Webhook EINMAL, beide Felder, nur aggregierte Zahlen.
      await bd.alarm();
      eq(sends.length, 1, "Alarm sendet genau einen Webhook");
      assert(sends[0].body.content && sends[0].body.text, "Body hat content UND text");
      assert(!/@|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(sends[0].body.text), "Body enthaelt keine E-Mail/IP");
      assert(!bd.alertPending, "Outbox nach Erfolg geleert");

      // Weitere Buchungen am selben Tag: KEIN zweiter Alert.
      bd.settle({ reserveId: bd.reserve({ amount: 0.5, subject: "s3", ip: "3.3.3.3", exclusive: false }).reserveId, cost: 0.5 });
      await bd.maybeArmAlert();
      assert(!bd.alertPending, "kein erneutes Scharfschalten am selben Tag");
      eq(sends.length, 1, "kein zweiter Webhook am selben Tag");

      // Rollover: neuer Tag meldet wieder frisch.
      FAKE_NOW = RealDate.parse("2026-06-20T00:01:00.000Z");
      bd.rolloverIfNeeded();
      // Am neuen Tag wieder ueber die Schwelle bringen (offene Reserven leben weiter).
      bd.reserve({ amount: 8, subject: "s4", ip: "4.4.4.4", exclusive: false });
      await bd.maybeArmAlert();
      assert(bd.alertPending, "neuer Tag schaltet erneut scharf");
      eq(bd.alertedDay, "2026-06-20", "Latch auf neuen Tag aktualisiert");

      // Ohne Secret: kompletter No-op.
      sends = [];
      const bd2 = new BudgetDO(makeState(), makeEnv()); // kein BUDGET_ALERT_WEBHOOK
      await bd2.load();
      bd2.reserve({ amount: 5, subject: "a", ip: "1.2.3.4", exclusive: false });
      bd2.reserve({ amount: 4, subject: "b", ip: "1.2.3.5", exclusive: false });
      await bd2.maybeArmAlert();
      assert(!bd2.alertPending, "ohne Secret kein Alert (fail-safe)");
      eq(sends.length, 0, "ohne Secret kein Webhook");

      // Zustellfehler: Outbox bleibt scharf, Retry-Zaehler steigt (kein stiller Verlust).
      sends = [];
      failNext = true;
      const bd3 = new BudgetDO(makeState(), makeEnv({ BUDGET_ALERT_WEBHOOK: "https://hook.example/x" }));
      await bd3.load();
      bd3.reserve({ amount: 5, subject: "a", ip: "1.2.3.4", exclusive: false });
      bd3.reserve({ amount: 4, subject: "b", ip: "1.2.3.5", exclusive: false });
      await bd3.maybeArmAlert();
      await bd3.alarm();
      eq(sends.length, 1, "Fehlversuch hat gesendet");
      assert(bd3.alertPending, "nach Fehlschlag Outbox weiter scharf (Retry geplant)");
      eq(bd3.alertTries, 1, "Retry-Zaehler erhoeht");
    } finally {
      globalThis.fetch = realFetch;
    }
  }

  globalThis.Date = RealDate;
  if (failures) { console.error(`\n${failures} Assertion(s) fehlgeschlagen.`); process.exit(1); }
  console.log("\nAlle Cross-Midnight-Budget-Asserts gruen.");
}

run().catch((e) => { globalThis.Date = RealDate; console.error(e); process.exit(1); });
