// Globales, atomares Budget-Gate (Plan A.2.6 + A.7). EIN einziges Durable Object
// (idFromName("global")), NICHT per User — Cloudflare serialisiert alle Requests an
// dieselbe Instanz, dadurch sind Read-modify-write-Schritte atomar.
//
// Tragende, schnelle Kostenkontrolle: Vorab-Reserve (Worst-Case) gegen das Tagesbudget
// + In-flight-Cap. Nach Stream-Ende settle auf Ist. Fehlt der usage-Block, bleibt die
// Reserve stehen und wird per TTL reconciled (konservativ runtergebucht statt auf
// Worst-Case eingefroren — verhindert Selbst-DoS, Plan A.2.6/Codex-Finding #11).
//
// Verfügbarkeits-Budget (Plan A.7): Pro-Subjekt-Anteil (kein IP/ASN/Device > X % des
// Tagesbudgets) + hartes Pro-IP-Tageslimit. Kein stilles Modell-Downgrade; bei 100 %
// Hard-Stop (Reason "budget" → der Worker liefert 503).

const today = () => new Date().toISOString().slice(0, 10); // UTC-Tag

export class BudgetDO {
  constructor(state, env) {
    this.state = state;
    this.env = env;
    this.loaded = false;
  }

  async load() {
    if (this.loaded) return;
    const s = this.state.storage;
    this.day = (await s.get("day")) || today();
    this.dayReserved = (await s.get("dayReserved")) || 0;
    this.daySpent = (await s.get("daySpent")) || 0;
    this.inflight = (await s.get("inflight")) || 0;
    this.reservations = (await s.get("reservations")) || {};
    this.perSubject = (await s.get("perSubject")) || {};
    this.perIp = (await s.get("perIp")) || {};
    this.loaded = true;
  }

  async persist() {
    await this.state.storage.put({
      day: this.day,
      dayReserved: this.dayReserved,
      daySpent: this.daySpent,
      inflight: this.inflight,
      reservations: this.reservations,
      perSubject: this.perSubject,
      perIp: this.perIp,
    });
  }

  rolloverIfNeeded() {
    const d = today();
    if (d === this.day) return;
    this.day = d;
    // Echte Tageswerte zuruecksetzen: Ausgaben starten bei 0.
    this.daySpent = 0;
    // ABER offene Reservierungen NICHT verwerfen: ein Stream, der ueber Mitternacht
    // laeuft, muss seine Reserve behalten, sonst findet sein settle die Reservierung
    // nicht mehr und der echte usage.cost ginge verloren — und der In-flight-Zaehler
    // wuerde mitten im Stream auf 0 gesetzt (kurzzeitige Ueber-Concurrency). Deshalb
    // perSubject/perIp NICHT leeren, sondern aus den ueberlebenden Reserven NEU AUFBAUEN:
    // settle/release/reconcile buchen spaeter r.amount bzw. 1 wieder ab — leerten wir die
    // Buckets, ginge der Pro-Subjekt-/Pro-IP-Anteil dieses Calls am neuen Tag still
    // verloren (Math.max-Clamp auf 0). dayReserved konsistent als Summe der offenen
    // Reserven; inflight bleibt unveraendert.
    this.perSubject = {};
    this.perIp = {};
    this.dayReserved = 0;
    for (const r of Object.values(this.reservations)) {
      this.perSubject[r.subject] = (this.perSubject[r.subject] || 0) + r.amount;
      this.perIp[r.ip] = (this.perIp[r.ip] || 0) + 1;
      this.dayReserved += r.amount;
    }
  }

  // Abgelaufene Reserven ohne Settle konservativ runterbuchen (Hälfte des Worst-Case)
  // statt sie voll geparkt zu lassen → Geldgrenze bleibt konservativ, Verfügbarkeit
  // wird nicht still aufgefressen.
  reconcile() {
    const ttl = Number(this.env.RESERVE_TTL_S || 120) * 1000;
    const now = Date.now();
    for (const [rid, r] of Object.entries(this.reservations)) {
      if (now - r.ts <= ttl) continue;
      const est = r.amount / 2;
      this.dayReserved = Math.max(0, this.dayReserved - r.amount);
      this.daySpent += est;
      this.perSubject[r.subject] = Math.max(0, (this.perSubject[r.subject] || 0) - r.amount + est);
      this.inflight = Math.max(0, this.inflight - 1);
      delete this.reservations[rid];
    }
  }

  reserve({ amount, subject, ip, exclusive }) {
    const dayBudget = Number(this.env.DAY_BUDGET_USD);
    const maxInflight = Number(this.env.MAX_INFLIGHT);
    const subjectShare = Number(this.env.PER_SUBJECT_SHARE) * dayBudget;
    const perIpDay = Number(this.env.PER_IP_DAY);

    // Pro-Nutzer-Gate für Generierungen: nur EIN offener Generierungs-Job je Subjekt
    // gleichzeitig (verhindert Parallel-Generierung und deckelt Kosten). Es zaehlen NUR
    // andere exclusive-Reserven (Generierung) — kurze nicht-exklusive Aufrufe (Auswertung,
    // Themenfelder) duerfen waehrend einer Generierung laufen und blockieren sie nicht.
    if (exclusive && Object.values(this.reservations).some((r) => r.subject === subject && r.exclusive)) {
      return { ok: false, reason: "active-job" };
    }

    const committed = this.dayReserved + this.daySpent;
    if (committed + amount > dayBudget) return { ok: false, reason: "budget" };
    if (this.inflight >= maxInflight) return { ok: false, reason: "inflight" };
    if ((this.perSubject[subject] || 0) + amount > subjectShare) return { ok: false, reason: "subject" };
    if ((this.perIp[ip] || 0) >= perIpDay) return { ok: false, reason: "ip" };

    const reserveId = crypto.randomUUID();
    this.dayReserved += amount;
    this.inflight += 1;
    this.perSubject[subject] = (this.perSubject[subject] || 0) + amount;
    this.perIp[ip] = (this.perIp[ip] || 0) + 1;
    this.reservations[reserveId] = { amount, subject, ip, ts: Date.now(), exclusive: !!exclusive };
    return { ok: true, reserveId };
  }

  settle({ reserveId, cost }) {
    const r = this.reservations[reserveId];
    if (!r) return { ok: true, note: "unknown-or-reconciled" };
    this.dayReserved = Math.max(0, this.dayReserved - r.amount);
    this.daySpent += cost;
    this.perSubject[r.subject] = Math.max(0, (this.perSubject[r.subject] || 0) - r.amount + cost);
    this.inflight = Math.max(0, this.inflight - 1);
    delete this.reservations[reserveId];
    return { ok: true };
  }

  // Vor-Generierungs-Fehler: Reserve voll zurück, gescheiterter Call zählt NICHT gegen
  // das Pro-IP-Tageslimit.
  release({ reserveId }) {
    const r = this.reservations[reserveId];
    if (!r) return { ok: true };
    this.dayReserved = Math.max(0, this.dayReserved - r.amount);
    this.perSubject[r.subject] = Math.max(0, (this.perSubject[r.subject] || 0) - r.amount);
    this.perIp[r.ip] = Math.max(0, (this.perIp[r.ip] || 0) - 1);
    this.inflight = Math.max(0, this.inflight - 1);
    delete this.reservations[reserveId];
    return { ok: true };
  }

  stats() {
    return {
      day: this.day,
      dayBudget: Number(this.env.DAY_BUDGET_USD),
      dayReserved: round(this.dayReserved),
      daySpent: round(this.daySpent),
      committed: round(this.dayReserved + this.daySpent),
      inflight: this.inflight,
      openReservations: Object.keys(this.reservations).length,
      alert: this.dayReserved + this.daySpent >= Number(this.env.ALERT_AT) * Number(this.env.DAY_BUDGET_USD),
    };
  }

  async fetch(req) {
    await this.load();
    this.rolloverIfNeeded();

    const op = new URL(req.url).pathname.replace(/^\//, "");
    let result;
    if (op === "stats") {
      this.reconcile();
      result = this.stats();
    } else {
      const body = await req.json().catch(() => ({}));
      if (op === "reserve") {
        // Vor dem Reservieren wirklich verwaiste Reserven aufräumen → Platz schaffen.
        this.reconcile();
        result = this.reserve(body);
      } else if (op === "settle" || op === "release") {
        // WICHTIG (Codex-Review): settle/release ZUERST gegen die echte Reservierung
        // auflösen, DANN reconcile. Sonst würde reconcile() einen langen Stream
        // (> RESERVE_TTL_S) auf der eigenen settle-Anfrage vorab verwerfen und der
        // echte usage.cost ginge verloren. RESERVE_TTL_S liegt zudem deutlich über
        // jeder realistischen Stream-Dauer, damit auch parallele Fremd-Requests keine
        // noch laufende Reservierung wegräumen.
        result = op === "settle" ? this.settle(body) : this.release(body);
        this.reconcile();
      } else {
        result = { ok: false, reason: "unknown-op" };
      }
    }

    await this.persist();
    return new Response(JSON.stringify(result), { headers: { "Content-Type": "application/json" } });
  }
}

const round = (n) => Math.round(n * 1e6) / 1e6;
