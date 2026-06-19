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
    // Alert-Latch (Budget-Webhook): an welchem UTC-Tag wurde die ALERT_AT-Schwelle
    // schon einmal gemeldet (max. eine Benachrichtigung pro Tag). alertPending +
    // alertTries bilden eine kleine durable Outbox: die Zustellung laeuft ueber den
    // DO-Alarm (at-least-once mit Backoff), nicht ueber einen fire-and-forget-fetch.
    this.alertedDay = (await s.get("alertedDay")) || null;
    this.alertPending = (await s.get("alertPending")) || false;
    this.alertTries = (await s.get("alertTries")) || 0;
    // Snapshot (Tag + committed) vom Zeitpunkt der Schwellen-Ueberschreitung, damit die
    // (ggf. nach Mitternacht zugestellte) Meldung den korrekten Tag/Betrag nennt.
    this.alertSnapshot = (await s.get("alertSnapshot")) || null;
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
      alertedDay: this.alertedDay,
      alertPending: this.alertPending,
      alertTries: this.alertTries,
      alertSnapshot: this.alertSnapshot,
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
    // wuerde mitten im Stream auf 0 gesetzt (kurzzeitige Ueber-Concurrency).
    //
    // perSubject und dayReserved werden von settle/release/reconcile spaeter wieder
    // abgebucht (Netto: settle +cost, release 0, reconcile +est). Deshalb sie NICHT
    // leeren, sondern aus den ueberlebenden Reserven NEU AUFBAUEN — sonst clampt die
    // spaetere Abbuchung gegen den genullten Bucket auf 0 und der Pro-Subjekt-Anteil
    // dieses Calls ginge am neuen Tag still verloren.
    //
    // perIp ist ANDERS: ein Pro-Tag-Nutzungszaehler, den NUR release (Vor-Generierungs-
    // Fehler) dekrementiert; settle/reconcile lassen ihn stehen, weil ein erfolgreicher
    // Call dauerhaft gegen das Tageslimit zaehlen soll. Wuerden wir ihn aus den
    // ueberlebenden Reserven neu aufbauen, bliebe der Eintrag nach dem settle den
    // ganzen neuen Tag stehen (settle entfernt ihn nicht) — der ueber Mitternacht
    // laufende Call zaehlte dann gegen alten UND neuen Tag und koennte das Pro-IP-
    // Tageslimit faelschlich erschoepfen. Also bewusst leeren. Damit ein spaeteres
    // release einer Vortags-Reserve nicht den neu belegten perIp-Eintrag des heutigen
    // Tages herunterreisst, traegt jede Reserve ihren Belegungs-Tag (r.day); release
    // dekrementiert perIp nur fuer Reserven des aktuellen Tages (siehe release()).
    this.perSubject = {};
    this.perIp = {};
    this.dayReserved = 0;
    for (const r of Object.values(this.reservations)) {
      this.perSubject[r.subject] = (this.perSubject[r.subject] || 0) + r.amount;
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
    // day = Tag, dessen perIp-Zaehler diese Reserve belegt hat. release darf perIp nur
    // dann dekrementieren, wenn die Reserve noch zum aktuellen Zaehler-Tag gehoert — sonst
    // wuerde eine ueber Mitternacht laufende Reserve beim release den (geleerten und
    // moeglicherweise schon neu belegten) perIp-Zaehler des NEUEN Tages verfaelschen.
    this.reservations[reserveId] = { amount, subject, ip, day: this.day, ts: Date.now(), exclusive: !!exclusive };
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
    // perIp nur dekrementieren, wenn die Reserve zum aktuellen Zaehler-Tag gehoert.
    // Eine ueber Mitternacht laufende Reserve hat ihren IP-Slot am Vortag belegt (der
    // beim Rollover geleert wurde) — wuerde sie hier dekrementieren, riss sie den
    // perIp-Eintrag eines inzwischen neu eingebuchten Calls vom heutigen Tag faelschlich
    // herunter und das Pro-IP-Tageslimit liesse sich umgehen.
    //
    // Legacy-Reserven aus dem alten Storage (von main, vor diesem Feld) haben kein r.day.
    // Sie als "aktueller Tag" zu behandeln, riss exakt diese Luecke wieder auf: eine alte
    // Reserve, die ueber Mitternacht laeuft, wuerde beim release den frisch belegten
    // perIp-Zaehler des neuen Tages herunterreissen (Pro-IP-Limit umgehbar). Deshalb den
    // Belegungs-Tag aus r.ts ableiten (gleiches UTC-Format wie today()); fehlt auch ts,
    // konservativ NICHT dekrementieren (Limit bleibt hart).
    const occupancyDay = r.day ?? (typeof r.ts === "number" ? new Date(r.ts).toISOString().slice(0, 10) : null);
    if (occupancyDay === this.day) {
      this.perIp[r.ip] = Math.max(0, (this.perIp[r.ip] || 0) - 1);
    }
    this.inflight = Math.max(0, this.inflight - 1);
    delete this.reservations[reserveId];
    return { ok: true };
  }

  // NaN-safe: fehlt/vermurkst ALERT_AT oder DAY_BUDGET_USD, liefert dies Infinity,
  // sodass committed < Infinity immer true bleibt und NIEMALS faelschlich alarmiert
  // (eine fehlkonfigurierte Schwelle darf keinen Dauer-Alert ausloesen).
  alertThreshold() {
    const at = Number(this.env.ALERT_AT);
    const budget = Number(this.env.DAY_BUDGET_USD);
    if (!Number.isFinite(at) || !Number.isFinite(budget)) return Infinity;
    return at * budget;
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
      alert: this.dayReserved + this.daySpent >= this.alertThreshold(),
    };
  }

  // Prueft nach jeder Buchung, ob committed (Reserven + Ist) erstmals an diesem UTC-Tag
  // die ALERT_AT-Schwelle erreicht hat. Wenn ja: Latch setzen (max. EINE Meldung/Tag)
  // und die Zustellung ueber den DO-Alarm anstossen (durable Outbox, kein verlierbarer
  // fire-and-forget-fetch). Eine Reserve, die committed kurzzeitig ueber die Schwelle
  // treibt und sich spaeter wieder aufloest, erzeugt bewusst eine Fruehwarnung (kein
  // verpasster Alert, da daySpent monoton waechst). Ohne Webhook-Secret: No-op.
  async maybeArmAlert() {
    if (!this.env.BUDGET_ALERT_WEBHOOK) return;
    if (this.alertedDay === this.day) return;
    if (this.dayReserved + this.daySpent < this.alertThreshold()) return;
    // ZUERST den Alarm scharf schalten, DANN den Latch setzen: schlaegt setAlarm fehl,
    // bleibt der Latch ungesetzt und die naechste Buchung versucht es erneut (statt den
    // Tag still ohne geplante Zustellung zu verbrennen). Snapshot von committed/Tag zum
    // Ueberschreitungs-Zeitpunkt festhalten, damit eine nach Mitternacht zugestellte
    // Meldung den richtigen Tag/Betrag nennt (alarm() rollt sonst auf den neuen Tag).
    try { await this.state.storage.setAlarm(Date.now() + 1000); }
    catch { return; } // Alarm nicht planbar → NICHT latchen, spaeter erneut versuchen
    this.alertedDay = this.day;
    this.alertPending = true;
    this.alertTries = 0;
    this.alertSnapshot = { day: this.day, committed: round(this.dayReserved + this.daySpent) };
  }

  // Durable Zustellung des Budget-Alerts. Sendet awaited an den generischen Webhook
  // (Discord: content / Slack & Telegram-Bridge: text — beide Felder im selben Body,
  // jede Seite nimmt ihr Feld). Nur aggregierte Zahlen, KEINE PII. Erfolg → Latch
  // aufloesen; Fehler → erneuter Alarm mit Backoff, bounded auf 5 Versuche.
  async alarm() {
    await this.load();
    this.rolloverIfNeeded();
    if (!this.alertPending || !this.env.BUDGET_ALERT_WEBHOOK) {
      this.alertPending = false;
      await this.persist();
      return;
    }
    // Aus dem Snapshot melden (Tag/Betrag zur Ueberschreitung), NICHT aus den nach einem
    // moeglichen Rollover veraenderten Live-Werten — sonst nennt eine um 00:01 zugestellte
    // Meldung faelschlich den neuen Tag mit fast-Null-committed.
    const snap = this.alertSnapshot || { day: this.day, committed: this.dayReserved + this.daySpent };
    const budget = Number(this.env.DAY_BUDGET_USD);
    const committed = snap.committed;
    const pct = Number.isFinite(budget) && budget > 0 ? Math.round((committed / budget) * 100) : 0;
    const msg =
      `jobreif Budget-Warnung: Tagesbudget zu ${pct}% ausgeschoepft ` +
      `(${round(committed)} von ${budget} USD, UTC-Tag ${snap.day}). ` +
      `Bei 100% liefert der Hosted-Modus 503, bis das Budget um UTC-Mitternacht zuruecksetzt.`;
    let ok = false;
    try {
      const r = await fetch(this.env.BUDGET_ALERT_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: msg, text: msg }),
      });
      ok = r.ok;
    } catch { ok = false; }
    if (ok) {
      this.alertPending = false;
      this.alertSnapshot = null;
    } else {
      this.alertTries = (this.alertTries || 0) + 1;
      if (this.alertTries >= 5) {
        // Aufgeben: Latch bleibt fuer den Tag gesetzt (kein Dauer-Retry-Sturm), aber
        // die Outbox wird geleert. Der naechste Tag meldet wieder frisch.
        this.alertPending = false;
        this.alertSnapshot = null;
      } else {
        const backoff = Math.min(60000 * this.alertTries, 300000); // 1..5 min
        try { await this.state.storage.setAlarm(Date.now() + backoff); } catch { /* best-effort */ }
      }
    }
    await this.persist();
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

    // Nach jeder Buchung pruefen, ob die Alert-Schwelle erstmals erreicht ist (eine
    // Codestelle deckt reserve/settle/release/reconcile ab). persist() danach.
    await this.maybeArmAlert();
    await this.persist();
    return new Response(JSON.stringify(result), { headers: { "Content-Type": "application/json" } });
  }
}

const round = (n) => Math.round(n * 1e6) / 1e6;
