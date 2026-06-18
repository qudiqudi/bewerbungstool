// Golden-Set-Regression (Plan A.6): prüft, dass der HOSTED-Pfad mit den echten
// Worker-Prompts (../src/prompts.js) über eine Reihe von Eingaben schema-konforme und
// strukturell saubere Ausgaben liefert — BEVOR Hosted scharfgeschaltet wird.
//
// Nutzt die EXACTEN Worker-Prompts (kein Reconstruct), also fängt der Test auch
// Prompt-/Schema-Drift gegen den App-Pfad ab, solange prompts.js die Quelle ist.
//
// Was hier NICHT getestet wird: inhaltliche Qualität GPT-5.1 vs. Claude — das ist der
// menschliche Qualitätsvergleich (.local/benchmark/quality/).
//
// Start (echte OpenRouter-Calls, kostet ein paar $):
//   OPENROUTER_KEY=sk-or-... node worker/test/golden-set.mjs

import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import {
  QUESTIONS_SCHEMA, EVAL_SCHEMA, THEMENFELDER_SCHEMA,
  buildQuizMessages, buildEvalMessages, buildThemenfelderMessages,
} from "../src/prompts.js";

const KEY = process.env.OPENROUTER_KEY;
if (!KEY) { console.error("Fehlt: OPENROUTER_KEY env var. Abbruch."); process.exit(1); }

const MAX_TOKENS = Number(process.env.MAX_TOKENS || 18000);
const HERE = dirname(fileURLToPath(import.meta.url));
// Golden-Korpus: bestehende Stellen aus dem Qualitäts-Harness wiederverwenden.
const JOBS_DIR = join(HERE, "..", "..", ".local", "benchmark", "quality", "jobs");

const TIERS = {
  standard: { model: "openai/gpt-5.1", reasoning: { effort: "medium" }, strict: true },
  guenstig: { model: "deepseek/deepseek-v3.2", reasoning: false, strict: false },
};

// ---- Mini-Validator (required-Keys + grobe Typen), wie im Benchmark-Harness ----
function checkRequired(obj, schema) {
  if (schema.type === "object") {
    if (typeof obj !== "object" || obj === null) return false;
    for (const k of schema.required || []) {
      if (!(k in obj)) return false;
      if (!checkRequired(obj[k], schema.properties[k])) return false;
    }
    return true;
  }
  if (schema.type === "array") return Array.isArray(obj) && obj.every((e) => checkRequired(e, schema.items));
  if (schema.type === "integer") return Number.isInteger(obj);
  if (schema.type === "string") return typeof obj === "string";
  if (schema.type === "boolean") return typeof obj === "boolean";
  return true;
}
function parseLoose(text) {
  try { return JSON.parse(text); } catch {}
  const a = text.indexOf("{"), b = text.lastIndexOf("}");
  if (a >= 0 && b > a) { try { return JSON.parse(text.slice(a, b + 1)); } catch {} }
  return null;
}

async function call(tier, messages, schema) {
  const body = {
    model: tier.model, messages, max_tokens: MAX_TOKENS, usage: { include: true },
  };
  if (tier.reasoning === false) body.reasoning = { enabled: false };
  else if (tier.reasoning) body.reasoning = tier.reasoning;
  if (tier.strict) body.response_format = { type: "json_schema", json_schema: { name: "ergebnis", strict: true, schema } };
  else messages[0].content += "\n\nAntworte ausschliesslich mit JSON nach diesem Schema:\n" + JSON.stringify(schema);

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json", "HTTP-Referer": "https://jobreif.de", "X-Title": "jobreif-golden" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const json = await res.json();
  return { data: parseLoose(json.choices?.[0]?.message?.content ?? ""), cost: json.usage?.cost ?? null };
}

// ---- Strukturelle Zusatzchecks über die reine Schemaform hinaus ----
function checkQuiz(d, want) {
  const issues = [];
  if (!d || !Array.isArray(d.fragen)) return ["keine fragen[]"];
  if (d.fragen.length !== want) issues.push(`fragen=${d.fragen.length}, erwartet ${want}`);
  d.fragen.forEach((f, i) => {
    if (!f.frage) issues.push(`#${i}: leere frage`);
    if (!["multiple_choice", "offen"].includes(f.typ)) issues.push(`#${i}: typ ${f.typ}`);
    if (!["leicht", "mittel", "schwer"].includes(f.schwierigkeit)) issues.push(`#${i}: schwierigkeit ${f.schwierigkeit}`);
    if (f.typ === "multiple_choice") {
      if (!Array.isArray(f.optionen) || f.optionen.length < 2) issues.push(`#${i}: <2 optionen`);
      else if (!f.optionen.includes(f.korrekte_antwort)) issues.push(`#${i}: korrekte_antwort nicht in optionen`);
    }
  });
  return issues;
}
function checkEval(d, ids) {
  const issues = [];
  if (!d || !Array.isArray(d.ergebnisse)) return ["keine ergebnisse[]"];
  const gotIds = new Set(d.ergebnisse.map((e) => e.id));
  for (const id of ids) if (!gotIds.has(id)) issues.push(`fehlende Bewertung id=${id}`);
  d.ergebnisse.forEach((e) => { if (!(Number.isInteger(e.punkte) && e.punkte >= 0 && e.punkte <= 10)) issues.push(`id=${e.id}: punkte ${e.punkte}`); });
  if (!d.gesamt || !Number.isInteger(d.gesamt.prozent)) issues.push("gesamt.prozent fehlt/ungültig");
  return issues;
}
function checkThemen(d) {
  const issues = [];
  if (!d || !Array.isArray(d.themenfelder)) return ["keine themenfelder[]"];
  if (d.themenfelder.length < 4 || d.themenfelder.length > 6) issues.push(`themenfelder=${d.themenfelder.length} (erwartet 4-6)`);
  d.themenfelder.forEach((t, i) => { if (!t.label) issues.push(`#${i}: leeres label`); });
  return issues;
}

function loadJobs() {
  if (!existsSync(JOBS_DIR)) { console.error(`Kein Korpus: ${JOBS_DIR}`); process.exit(1); }
  return readdirSync(JOBS_DIR).filter((f) => f.endsWith(".txt")).sort()
    .map((f) => ({ id: basename(f, ".txt"), text: readFileSync(join(JOBS_DIR, f), "utf8").trim() }));
}

(async () => {
  const jobs = loadJobs();
  const N = 8;
  const results = [];
  const record = (name, schema, data, structFn, cost) => {
    const schemaOk = data ? checkRequired(data, schema) : false;
    const issues = data ? structFn(data) : ["leere/ungültige Antwort"];
    const pass = schemaOk && issues.length === 0;
    results.push({ fall: name, schemaOk, struktur: issues.length ? issues.join("; ") : "ok", cost: cost == null ? "?" : `$${cost.toFixed(3)}`, PASS: pass });
    process.stdout.write(`  ${pass ? "PASS" : "FAIL"}  ${name}\n`);
    if (!pass) process.stdout.write(`        schemaOk=${schemaOk} struktur: ${issues.join("; ") || "ok"}\n`);
  };

  console.log(`Golden-Set: ${jobs.length} Stellen, Worker-Prompts, echte Modelle.\n`);

  // 1) Quiz Standard (mittel) je Stelle
  for (const job of jobs) {
    try {
      const r = await call(TIERS.standard, buildQuizMessages({ jobText: job.text, numQuestions: N, difficulty: "mittel" }), QUESTIONS_SCHEMA);
      record(`quiz/standard/mittel/${job.id}`, QUESTIONS_SCHEMA, r.data, (d) => checkQuiz(d, N), r.cost);
    } catch (e) { record(`quiz/standard/mittel/${job.id}`, QUESTIONS_SCHEMA, null, () => [e.message]); }
  }

  // 2) Quiz Standard mit Vertiefung (schwer + niveau) — die komplexe Prompt-Variante
  const vJob = jobs[0];
  try {
    const r = await call(TIERS.standard, buildQuizMessages({
      jobText: vJob.text, numQuestions: N, difficulty: "schwer",
      vertiefung: { felder: [{ label: "Fachvertiefung A" }, { label: "Fachvertiefung B" }], niveau: { level: 4, bestPct: 70 } },
    }), QUESTIONS_SCHEMA);
    record(`quiz/standard/vertiefung/${vJob.id}`, QUESTIONS_SCHEMA, r.data, (d) => checkQuiz(d, N), r.cost);
  } catch (e) { record(`quiz/standard/vertiefung/${vJob.id}`, QUESTIONS_SCHEMA, null, () => [e.message]); }

  // 3) Quiz Günstig (DeepSeek, Embed-Schema)
  try {
    const r = await call(TIERS.guenstig, buildQuizMessages({ jobText: jobs[0].text, numQuestions: N, difficulty: "mittel" }), QUESTIONS_SCHEMA);
    record(`quiz/guenstig/mittel/${jobs[0].id}`, QUESTIONS_SCHEMA, r.data, (d) => checkQuiz(d, N), r.cost);
  } catch (e) { record(`quiz/guenstig/mittel/${jobs[0].id}`, QUESTIONS_SCHEMA, null, () => [e.message]); }

  // 4) Eval Standard — gegen ein frisch erzeugtes Quiz + synthetische Antworten
  try {
    const q = await call(TIERS.standard, buildQuizMessages({ jobText: jobs[1].text, numQuestions: 5, difficulty: "mittel" }), QUESTIONS_SCHEMA);
    const fragen = (q.data && q.data.fragen) || [];
    const payload = fragen.map((f, i) => ({ id: f.id, frage: f.frage, typ: f.typ, optionen: f.optionen, korrekte_antwort: f.korrekte_antwort, antwort: i % 2 ? (f.korrekte_antwort || "Beispiel") : "", aufgeloest: false }));
    const r = await call(TIERS.standard, buildEvalMessages({ jobText: jobs[1].text, payload, kontext: { mode: "pruefung", limitMin: 20, minutesUsed: 12, overtime: false } }), EVAL_SCHEMA);
    record(`eval/standard/${jobs[1].id}`, EVAL_SCHEMA, r.data, (d) => checkEval(d, fragen.map((f) => f.id)), r.cost);
  } catch (e) { record(`eval/standard/${jobs[1].id}`, EVAL_SCHEMA, null, () => [e.message]); }

  // 5) Themenfelder Standard
  try {
    const r = await call(TIERS.standard, buildThemenfelderMessages({ jobText: jobs[2].text, schwaechen: "- [2/10] Hygiene\n- [3/10] Dokumentation" }), THEMENFELDER_SCHEMA);
    record(`themenfelder/standard/${jobs[2].id}`, THEMENFELDER_SCHEMA, r.data, checkThemen, r.cost);
  } catch (e) { record(`themenfelder/standard/${jobs[2].id}`, THEMENFELDER_SCHEMA, null, () => [e.message]); }

  console.log("\n=== Golden-Set-Ergebnis ===");
  console.table(results);
  const failed = results.filter((r) => !r.PASS);
  console.log(failed.length ? `\n${failed.length} Fall/Fälle FAILED — vor Go-Live klären.` : "\nAlle Fälle bestanden.");
  process.exit(failed.length ? 1 : 0);
})();
