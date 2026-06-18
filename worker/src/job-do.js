// Hintergrund-Generierung als Durable Object (Async-Job, Plan A.5+).
// Ein DO pro Quiz (idFromName(jobId)). Der Worker startet den Job (start); das DO
// erzeugt das Quiz im alarm()-Handler SERVERSEITIG zu Ende — unabhaengig vom
// Client-Tab (Backgrounding/Sperre/Verlassen brechen nichts ab) — und legt das
// Ergebnis ab. Der Client pollt status(). Alarm-Wall-Limit 15 min >> ~1-2 min Gen.
//
// Bewusst NICHT gestreamt: das DO holt die volle OpenRouter-Antwort auf einmal und
// speichert sie; der Client braucht keinen offenen Stream zu halten.

import { buildQuizMessages, QUESTIONS_SCHEMA } from "./prompts.js";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

// Wie lange das fertige Ergebnis serverseitig vorgehalten wird, bevor das DO sich
// selbst raeumt. Der Client hat das Quiz nach dem ersten erfolgreichen Poll lokal
// (activeJob.quiz), daher reicht ein kurzes Fenster fuer "spaeter zurueckkehren";
// danach wird jobText/Ergebnis serverseitig geloescht (keine unbegrenzte Haltung).
const RESULT_TTL_MS = 60 * 60 * 1000; // 1 h

// Eigen-Timeout des Generierungs-Calls: bricht einen haengenden Upstream ab, lange
// bevor das Alarm-Wall-Limit (15 min) greift. Bewusst ueber der real beobachteten
// Maximaldauer (reasoning ~150 s), damit echte Laeufe nicht abgeschnitten werden.
const GEN_TIMEOUT_MS = 4 * 60 * 1000; // 4 min
// Server-seitiger Backstop: ein noch "pending" Job, der aelter ist als das Alarm-
// Wall-Limit, kann nicht mehr laufen (Plattform hat die Alarm-Invocation laengst
// beendet) → beim naechsten Poll terminal als Timeout markieren. Die Staleness ist
// damit server-eigen, der Client raeumt nicht spekulativ (Codex-Review Runde 2).
const JOB_TIMEOUT_MS = 16 * 60 * 1000; // 16 min (> 15-min-Alarm-Wall)

export class GenerationJobDO {
  constructor(state, env) {
    this.state = state;
    this.env = env;
  }

  async fetch(req) {
    const op = new URL(req.url).pathname.replace(/^\//, "");
    if (op === "start") {
      const body = await req.json();
      await this.state.storage.put({
        status: "pending",
        params: body.params,     // { jobText, numQuestions, difficulty, vertiefung }
        tier: body.tier,         // aufgeloestes Tier-Objekt (model/reasoning/strictSchema)
        subject: body.subject,
        reserveId: body.reserveId,
        reserveAmount: body.reserveAmount, // Worst-Case-Reserve → konservativer Settle-Estimate
        createdAt: Date.now(),
      });
      await this.state.storage.setAlarm(Date.now()); // sofort generieren
      return jsonResponse({ ok: true });
    }
    if (op === "status") {
      const status = (await this.state.storage.get("status")) || "unknown";
      // Server-eigener Timeout: ein zu lange "pending" Job gilt als tot (Alarm vom
      // Plattform-Wall-Limit beendet) → terminal markieren, Reserve freigeben, Input
      // loeschen. Erst danach antworten, damit der Client eine echte Terminal-Aussage
      // bekommt und nicht selbst spekulativ raeumen muss.
      if (status === "pending") {
        const createdAt = (await this.state.storage.get("createdAt")) || 0;
        const alarmStartedAt = (await this.state.storage.get("alarmStartedAt")) || 0;
        // Nur timeouten, wenn KEIN Generierungs-Versuch mehr laufen kann: entweder hat
        // der Alarm nie begonnen (Zustellung ausgeblieben) ODER ein begonnener Versuch
        // liegt sicher jenseits seines Eigen-Timeouts (haengende/abgestuerzte Invocation).
        // So kann der Status-Timeout niemals einen noch laufenden Alarm wegraeumen und
        // dessen echtes Settle verlieren (Codex-Review R3, Race).
        const attemptDead = !alarmStartedAt || (Date.now() - alarmStartedAt > GEN_TIMEOUT_MS + 60 * 1000);
        if (Date.now() - createdAt > JOB_TIMEOUT_MS && attemptDead) {
          const reserveId = await this.state.storage.get("reserveId");
          // Wurde der Upstream-Call schon abgeschickt (durabler Marker, vor dem fetch
          // gesetzt), der Alarm starb aber vor dem Abschluss → Kosten unbekannt:
          // konservativ Worst-Case settlen statt freigeben (Codex-Review R5). Nur ohne
          // abgeschickten Call wirklich freigeben.
          const callStarted = await this.state.storage.get("callStarted");
          const reserveAmount = await this.state.storage.get("reserveAmount");
          const timeoutCost = callStarted ? (reserveAmount ?? null) : null;
          const leave = callStarted && timeoutCost == null;
          await this.finish("error", null, "timeout", reserveId, timeoutCost, leave);
          return jsonResponse({ status: "error", errorCode: "timeout" });
        }
      }
      const result = await this.state.storage.get("result");
      const errorCode = await this.state.storage.get("errorCode");
      return jsonResponse({ status, result: result || undefined, errorCode: errorCode || undefined });
    }
    return new Response("not-found", { status: 404 });
  }

  async alarm() {
    const status = await this.state.storage.get("status");
    // Zweck-2 des Alarms: nach Ablauf der Ergebnis-TTL raeumt sich ein bereits
    // terminaler Job selbst (loescht jobText + Ergebnis serverseitig vollstaendig).
    if (status !== "pending") { await this.state.storage.deleteAll(); return; }

    const params = await this.state.storage.get("params");
    const tier = await this.state.storage.get("tier");
    const reserveId = await this.state.storage.get("reserveId");
    const reserveAmount = await this.state.storage.get("reserveAmount");
    const hardCap = Number(this.env.HARD_CAP_TOKENS || 24000);

    // Alarm-Idempotenz gegen Plattform-Retries: Cloudflare stellt einen abgebrochenen
    // Alarm (Eviction/Kill mitten im fetch) erneut zu. Wurde der Upstream-Call beim
    // ersten Versuch schon abgeschickt (durabler callStarted-Marker), den Call NICHT
    // erneut absetzen (sonst doppelte Abrechnung) — terminal als Fehler markieren und
    // konservativ den Worst-Case settlen. Das raeumt zugleich einen sonst verwaisten
    // (nie gepollten) Job auf und loescht den jobText (Datenhaltung).
    if (await this.state.storage.get("callStarted")) {
      await this.finish("error", null, "timeout", reserveId, reserveAmount ?? null, reserveAmount == null);
      return;
    }

    // Beginn des Versuchs markieren → der Status-Timeout weiss, dass gerade ein Lauf
    // aktiv ist und raeumt ihn nicht weg (s. status-Handler).
    await this.state.storage.put("alarmStartedAt", Date.now());

    let result = null;
    let errorCode = null;
    let cost = null;
    // Wurde eine 200-Antwort (potenziell kostenpflichtig) erreicht? Dann darf ein
    // anschliessender Lese-/Parse-Fehler die Reserve NICHT freigeben, sonst liesse sich
    // ueber wiederholte degradierte 200-Antworten das Budget umgehen (Codex-Review R2).
    // charged = ein potenziell kostenpflichtiger Upstream-Call wurde ABGESCHICKT. Wird
    // VOR dem await gesetzt: ein Abbruch/Netzfehler nach dem Absenden (AbortSignal-
    // Timeout, Verbindungsabbruch) kann bereits Kosten verursacht haben → dann nie
    // freigeben, sondern konservativ den Worst-Case settlen (Codex-Review R3).
    let charged = false;
    try {
      if (this.env.MOCK_UPSTREAM === "1") {
        // Dev: gültiges Mock-Quiz ohne echten OpenRouter-Call (Last-/Flow-Test).
        result = {
          titel: "Mock-Test", arbeitgeber: "Mock GmbH", arbeitsort: "Berlin", empfohlene_zeit_minuten: 10,
          fragen: [{ id: 1, typ: "offen", kategorie: "Allgemein", schwierigkeit: "mittel", frage: "Mock-Frage: Nenne eine Stärke.", optionen: [], korrekte_antwort: "Teamfähigkeit, belegt.", erklaerungen: [], lerninfo: "Soft Skills belegen.", quellen: [] }],
        };
        cost = Number(this.env.MOCK_COST || 0.08);
        await this.finish("done", result, null, reserveId, cost);
        return;
      }
      const body = {
        model: tier.model,
        messages: buildQuizMessages(params),
        max_tokens: hardCap,
        usage: { include: true },
        ...(tier.reasoning === false
          ? { reasoning: { enabled: false } }
          : tier.reasoning ? { reasoning: tier.reasoning } : {}),
        ...(tier.strictSchema
          ? { response_format: { type: "json_schema", json_schema: { name: "ergebnis", strict: true, schema: QUESTIONS_SCHEMA } } }
          : {}),
      };
      charged = true; // Call wird jetzt abgeschickt — ab hier Kosten moeglich.
      // Durabler Marker VOR dem Dispatch: stirbt die Alarm-Invocation nach dem
      // Absenden, weiss der Status-Timeout-Pfad (eigene Invocation, sieht das
      // in-memory charged NICHT), dass Kosten entstanden sein koennen, und settlet
      // konservativ statt freizugeben (Codex-Review R5).
      await this.state.storage.put("callStarted", true);
      const res = await fetch(OPENROUTER_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.env.OPENROUTER_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://jobreif.de",
          "X-Title": "jobreif",
        },
        body: JSON.stringify(body),
        // Haengenden Upstream selbst abbrechen (vor dem Alarm-Wall-Limit). Ein Abbruch
        // NACH dem Absenden gilt als kostenunbekannt (charged bleibt true).
        signal: AbortSignal.timeout(GEN_TIMEOUT_MS),
      });
      if (!res.ok) {
        // HTTP-Fehlerantwort von OpenRouter → nicht abgerechnet, Reserve freigeben.
        charged = false;
        errorCode = "upstream";
      } else {
        const json = await res.json();
        cost = typeof json.usage?.cost === "number" ? json.usage.cost : null;
        result = parseLoose(json.choices?.[0]?.message?.content ?? "");
        if (!result || !Array.isArray(result.fragen)) { result = null; errorCode = "parse"; }
      }
    } catch {
      // KEIN Alarm-Retry: der Upstream-Call kann bereits Kosten verursacht haben, ein
      // erneuter Lauf wuerde doppelt abrechnen. Terminal als Fehler markieren.
      errorCode = errorCode || "exception";
    }

    // Settle-Betrag bestimmen: bei erreichter Antwort den ECHTEN usage.cost, sonst
    // (Kosten unbekannt trotz 200, z. B. Lese-/Parse-Fehler) konservativ den Worst-Case
    // der Reserve buchen — niemals freigeben. Nur ohne erreichte Antwort freigeben.
    const settleCost = charged ? (cost != null ? cost : (reserveAmount ?? null)) : null;
    // Eine erreichte Antwort ohne jegliche Kostenangabe (auch kein Worst-Case bekannt)
    // NICHT freigeben — die Reserve stehen lassen, das BudgetDO-TTL-Reconcile bucht sie
    // konservativ runter. Nur ohne erreichte Antwort wird wirklich freigegeben.
    const leaveReserve = charged && settleCost == null;
    if (result) await this.finish("done", result, null, reserveId, settleCost, leaveReserve);
    else await this.finish("error", null, errorCode || "unknown", reserveId, settleCost, leaveReserve);
  }

  // Terminalen Zustand festschreiben: Status/Ergebnis ablegen, Budget abschliessen
  // (settle auf Ist/Estimate ODER release ODER — bei charged-ohne-Kosten — stehen
  // lassen), sensiblen Input (jobText) + interne Felder sofort loeschen und einen
  // Raeum-Alarm setzen, der das Ergebnis nach der TTL entfernt.
  //
  // Idempotent per Compare-and-Set auf "pending": kommen Alarm-Abschluss und Status-
  // Timeout knapp nacheinander, gewinnt der erste; der zweite ist ein No-op und kann
  // weder doppelt settlen/releasen noch den Terminalzustand ueberschreiben
  // (Codex-Review R3). DO-Handler laufen serialisiert, daher ist get→put hier atomar.
  async finish(status, result, errorCode, reserveId, cost, leaveReserve = false) {
    if ((await this.state.storage.get("status")) !== "pending") return;
    await this.state.storage.put({ status, result: result || null, errorCode: errorCode || null });
    if (!leaveReserve) await settleBudget(this.env, reserveId, cost);
    await this.state.storage.delete(["params", "tier", "reserveId", "reserveAmount", "alarmStartedAt", "callStarted"]);
    await this.state.storage.setAlarm(Date.now() + RESULT_TTL_MS);
  }
}

// Budget abschliessen: settle auf den ECHTEN usage.cost, sobald dieser bekannt ist —
// auch bei Parse-Fehler nach erfolgreichem (kostenpflichtigem) Upstream-Call, sonst
// liesse sich ueber wiederholte Parse-Fehler das Budget/Pro-IP-Limit umgehen. Nur wenn
// gar keine Kosten entstanden sind (Upstream-Fehler vor Generierung, Exception), die
// Reserve freigeben. Beides gibt im Budget-DO den Pro-Nutzer-Slot frei → naechster Job
// moeglich. Fehlt das Budget-DO, fängt dessen TTL-Reconcile die Reserve später ab.
async function settleBudget(env, reserveId, cost) {
  if (!reserveId) return;
  try {
    const budget = env.BUDGET_DO.get(env.BUDGET_DO.idFromName("global"));
    if (cost != null) {
      await budget.fetch("https://do/settle", { method: "POST", body: JSON.stringify({ reserveId, cost }) });
    } else {
      await budget.fetch("https://do/release", { method: "POST", body: JSON.stringify({ reserveId }) });
    }
  } catch {
    /* Reconcile fängt es ab */
  }
}

function jsonResponse(obj) {
  return new Response(JSON.stringify(obj), { headers: { "Content-Type": "application/json" } });
}

function parseLoose(text) {
  try { return JSON.parse(text); } catch {}
  const a = text.indexOf("{"), b = text.lastIndexOf("}");
  if (a >= 0 && b > a) { try { return JSON.parse(text.slice(a, b + 1)); } catch {} }
  return null;
}
