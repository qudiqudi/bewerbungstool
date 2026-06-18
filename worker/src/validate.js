// Strikte Input-Validierung VOR jedem Upstream-Call (Plan A.2.5): erlaubte Felder,
// harte Größenlimits, Typen. Alles andere → 400. Gibt null bei OK, sonst den
// Feldnamen des ersten Verstoßes. Der Client schickt nur strukturierte Parameter,
// keine freien Prompts — die baut der Worker (prompts.js).

const MAX_JOBTEXT = 30000;
const MAX_QUESTIONS = 40;
const MAX_EVAL_ITEMS = 60;
const MAX_PAYLOAD_JSON = 200000;
const DIFFICULTIES = ["leicht", "mittel", "schwer"];

export function validateQuiz(data) {
  if (typeof data !== "object" || data === null) return "body";
  if (typeof data.jobText !== "string" || data.jobText.trim().length < 50) return "jobText";
  if (data.jobText.length > MAX_JOBTEXT) return "jobText-zu-lang";
  if (data.numQuestions != null &&
      (!Number.isInteger(data.numQuestions) || data.numQuestions < 1 || data.numQuestions > MAX_QUESTIONS))
    return "numQuestions";
  if (data.difficulty != null && !DIFFICULTIES.includes(data.difficulty)) return "difficulty";
  if (data.vertiefung != null) {
    const v = data.vertiefung;
    if (typeof v !== "object") return "vertiefung";
    if (!Array.isArray(v.felder) || v.felder.length === 0 || v.felder.length > 6) return "vertiefung.felder";
    for (const f of v.felder) if (!f || typeof f.label !== "string" || f.label.length > 200) return "vertiefung.felder.label";
  }
  return null;
}

// Reihenfolge-Aufgaben (typ='reihenfolge') werden clientseitig deterministisch
// gescort und VOR dem Eval-Call aus der Payload entfernt (app.js runEvaluation),
// daher enthaelt data.payload nie Reihenfolge-Items -> validateEval braucht keine
// Reihenfolge-spezifische Pruefung. Ein Quiz NUR aus Reihenfolge-Fragen loest gar
// keinen Eval-Call aus (Client baut gesamt lokal), kollidiert also nicht mit der
// leere-Payload-Abweisung unten.
export function validateEval(data) {
  if (typeof data !== "object" || data === null) return "body";
  if (typeof data.jobText !== "string") return "jobText";
  if (data.jobText.length > MAX_JOBTEXT) return "jobText-zu-lang";
  if (!Array.isArray(data.payload) || data.payload.length === 0) return "payload";
  if (data.payload.length > MAX_EVAL_ITEMS) return "payload-zu-gross";
  // kontext ist frei strukturiert, aber kontext.mcLokal wird serverseitig in den
  // Prompt injiziert (prompts.js buildEvalMessages). Daher hart begrenzen, damit
  // ein direkter Aufrufer nicht ueber einen winzigen payload + riesiges mcLokal
  // das Groessenlimit umgeht und Budget/Upstream-Prompt aufblaeht.
  if (data.kontext != null) {
    if (typeof data.kontext !== "object" || Array.isArray(data.kontext)) return "kontext";
    const m = data.kontext.mcLokal;
    if (m != null) {
      if (!Array.isArray(m)) return "kontext.mcLokal";
      if (m.length > MAX_EVAL_ITEMS) return "kontext.mcLokal-zu-gross";
      for (const e of m) {
        if (!e || typeof e !== "object") return "kontext.mcLokal.eintrag";
        if (e.frage != null && (typeof e.frage !== "string" || e.frage.length > 400)) return "kontext.mcLokal.frage";
        if (e.punkte != null && typeof e.punkte !== "number") return "kontext.mcLokal.punkte";
      }
    }
  }
  // Gesamtgroesse inkl. kontext begrenzen (nicht nur payload), da kontext jetzt
  // ebenfalls in den Prompt fliesst.
  if (JSON.stringify([data.payload, data.kontext || null]).length > MAX_PAYLOAD_JSON) return "payload-json-zu-gross";
  return null;
}

export function validateThemenfelder(data) {
  if (typeof data !== "object" || data === null) return "body";
  if (typeof data.jobText !== "string" || data.jobText.trim().length < 50) return "jobText";
  if (data.jobText.length > MAX_JOBTEXT) return "jobText-zu-lang";
  if (data.schwaechen != null && (typeof data.schwaechen !== "string" || data.schwaechen.length > 8000)) return "schwaechen";
  return null;
}
