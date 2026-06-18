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
        createdAt: Date.now(),
      });
      await this.state.storage.setAlarm(Date.now()); // sofort generieren
      return jsonResponse({ ok: true });
    }
    if (op === "status") {
      const status = (await this.state.storage.get("status")) || "unknown";
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
    const hardCap = Number(this.env.HARD_CAP_TOKENS || 24000);

    let result = null;
    let errorCode = null;
    let cost = null;
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
      const res = await fetch(OPENROUTER_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.env.OPENROUTER_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://jobreif.de",
          "X-Title": "jobreif",
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
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
      errorCode = "exception";
    }

    if (result) await this.finish("done", result, null, reserveId, cost);
    else await this.finish("error", null, errorCode || "unknown", reserveId, cost);
  }

  // Terminalen Zustand festschreiben: Status/Ergebnis ablegen, Budget abschliessen
  // (settle auf Ist ODER release), sensiblen Input (jobText) + interne Felder sofort
  // loeschen und einen Raeum-Alarm setzen, der das Ergebnis nach der TTL entfernt.
  async finish(status, result, errorCode, reserveId, cost) {
    await this.state.storage.put({ status, result: result || null, errorCode: errorCode || null });
    await settleBudget(this.env, reserveId, cost);
    await this.state.storage.delete(["params", "tier", "reserveId"]);
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
