"use strict";

/* ---------- Einstellungen (localStorage) ---------- */

const DEFAULT_MODELS = {
  anthropic: "claude-opus-4-8",
  openai: "gpt-4o",
};

function loadSettings() {
  try {
    return JSON.parse(localStorage.getItem("bewerbungstool.settings")) || {};
  } catch {
    return {};
  }
}

function saveSettings(s) {
  localStorage.setItem("bewerbungstool.settings", JSON.stringify(s));
}

let settings = loadSettings();

/* ---------- App-Zustand ---------- */

let quiz = null;      // { titel, fragen: [...] }
let answers = [];     // index-paralleles Array mit Antworttexten
let current = 0;

/* ---------- DOM-Helfer ---------- */

const $ = (id) => document.getElementById(id);

const views = ["view-settings", "view-input", "view-quiz", "view-result"];

function showView(id) {
  views.forEach((v) => $(v).classList.toggle("hidden", v !== id));
}

function showLoading(text) {
  $("loading-text").textContent = text;
  $("loading").classList.remove("hidden");
}

function hideLoading() {
  $("loading").classList.add("hidden");
}

function showError(msg) {
  $("error-text").textContent = msg;
  $("error-box").classList.remove("hidden");
}

/* ---------- JSON-Schemata ---------- */

const QUESTIONS_SCHEMA = {
  type: "object",
  properties: {
    titel: { type: "string", description: "Kurzer Titel der Stelle" },
    fragen: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "integer" },
          typ: { type: "string", enum: ["multiple_choice", "offen"] },
          kategorie: { type: "string", description: "z. B. Fachwissen, Soft Skills, Situativ" },
          frage: { type: "string" },
          optionen: {
            type: "array",
            items: { type: "string" },
            description: "Antwortoptionen bei multiple_choice, sonst leeres Array",
          },
        },
        required: ["id", "typ", "kategorie", "frage", "optionen"],
        additionalProperties: false,
      },
    },
  },
  required: ["titel", "fragen"],
  additionalProperties: false,
};

const EVAL_SCHEMA = {
  type: "object",
  properties: {
    ergebnisse: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "integer" },
          punkte: { type: "integer", description: "0 bis 10" },
          feedback: { type: "string" },
          musterantwort: { type: "string", description: "Kurze ideale Antwort" },
        },
        required: ["id", "punkte", "feedback", "musterantwort"],
        additionalProperties: false,
      },
    },
    gesamt: {
      type: "object",
      properties: {
        prozent: { type: "integer", description: "Gesamtergebnis in Prozent, 0 bis 100" },
        zusammenfassung: { type: "string" },
        staerken: { type: "array", items: { type: "string" } },
        verbesserungen: { type: "array", items: { type: "string" } },
      },
      required: ["prozent", "zusammenfassung", "staerken", "verbesserungen"],
      additionalProperties: false,
    },
  },
  required: ["ergebnisse", "gesamt"],
  additionalProperties: false,
};

/* ---------- LLM-Aufruf (Anthropic / OpenAI) ---------- */

async function callLLM(systemPrompt, userPrompt, schema) {
  if (!settings.apiKey) {
    throw new Error("Kein API-Key hinterlegt. Bitte zuerst die Einstellungen ausfüllen.");
  }
  const provider = settings.provider || "anthropic";
  const model = settings.model || DEFAULT_MODELS[provider];

  if (provider === "anthropic") {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": settings.apiKey,
        "anthropic-version": "2023-06-01",
        // Erlaubt CORS-Aufrufe direkt aus dem Browser (Key bleibt beim Nutzer)
        "anthropic-dangerous-direct-browser-access": "true",
      },
      body: JSON.stringify({
        model,
        max_tokens: 16000,
        thinking: { type: "adaptive" },
        system: systemPrompt,
        messages: [{ role: "user", content: userPrompt }],
        output_config: { format: { type: "json_schema", schema } },
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => null);
      throw new Error(apiErrorMessage(res.status, err?.error?.message));
    }

    const data = await res.json();
    if (data.stop_reason === "refusal") {
      throw new Error("Die Anfrage wurde vom Modell abgelehnt. Bitte Stellenbeschreibung prüfen.");
    }
    const textBlock = data.content.find((b) => b.type === "text");
    if (!textBlock) throw new Error("Leere Antwort vom Modell erhalten.");
    return JSON.parse(textBlock.text);
  }

  // OpenAI
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${settings.apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: {
        type: "json_schema",
        json_schema: { name: "ergebnis", strict: true, schema },
      },
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(apiErrorMessage(res.status, err?.error?.message));
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("Leere Antwort vom Modell erhalten.");
  return JSON.parse(content);
}

function apiErrorMessage(status, detail) {
  const base = {
    401: "API-Key ungültig oder abgelaufen.",
    403: "Zugriff verweigert. Berechtigung des API-Keys prüfen.",
    404: "Modell nicht gefunden. Modellnamen in den Einstellungen prüfen.",
    429: "Rate-Limit erreicht. Bitte kurz warten und erneut versuchen.",
    529: "Anbieter überlastet. Bitte erneut versuchen.",
  }[status] || `API-Fehler (HTTP ${status}).`;
  return detail ? `${base} Details: ${detail}` : base;
}

/* ---------- Stellenanzeige per URL laden ---------- */

async function fetchJobFromUrl(url) {
  // r.jina.ai liefert beliebige Webseiten als Markdown-Text mit offenen CORS-Headern
  const res = await fetch("https://r.jina.ai/" + url);
  if (!res.ok) {
    throw new Error("Die Seite konnte nicht geladen werden (HTTP " + res.status + "). Bitte Text manuell einfügen.");
  }
  return res.text();
}

/* ---------- Fragen generieren ---------- */

async function generateQuiz() {
  const jobText = $("job-text").value.trim();
  if (jobText.length < 50) {
    showError("Bitte zuerst eine Stellenbeschreibung einfügen (mindestens ein paar Sätze).");
    return;
  }
  const numQuestions = $("num-questions").value;

  showLoading("Fragenkatalog wird erstellt...");
  try {
    const system =
      "Du bist ein erfahrener Recruiter und erstellst realistische Einstellungstests. " +
      "Erstelle präzise, anspruchsvolle Fragen, die exakt auf die gegebene Stelle zugeschnitten sind. " +
      "Mische Fachfragen, situative Fragen und Soft-Skill-Fragen. " +
      "Etwa die Hälfte der Fragen soll Multiple-Choice sein (4 plausible Optionen, genau eine ist die beste), " +
      "der Rest offene Fragen. Antworte auf Deutsch.";

    const user =
      `Erstelle einen Einstellungstest mit genau ${numQuestions} Fragen zu dieser Stellenausschreibung:\n\n` +
      jobText.slice(0, 30000);

    const result = await callLLM(system, user, QUESTIONS_SCHEMA);
    if (!result.fragen || result.fragen.length === 0) {
      throw new Error("Es konnten keine Fragen erstellt werden.");
    }

    quiz = result;
    quiz.jobText = jobText;
    answers = new Array(quiz.fragen.length).fill("");
    current = 0;
    renderQuestion();
    showView("view-quiz");
  } catch (e) {
    showError(e.message);
  } finally {
    hideLoading();
  }
}

/* ---------- Quiz-Anzeige ---------- */

function renderQuestion() {
  const q = quiz.fragen[current];
  const total = quiz.fragen.length;

  $("quiz-title").textContent = quiz.titel;
  $("quiz-progress").textContent = `Frage ${current + 1} von ${total}`;
  $("progress-fill").style.width = `${(current / total) * 100}%`;
  $("question-category").textContent = q.kategorie;
  $("question-text").textContent = q.frage;

  const area = $("answer-area");
  area.innerHTML = "";

  if (q.typ === "multiple_choice") {
    q.optionen.forEach((opt) => {
      const btn = document.createElement("button");
      btn.className = "option" + (answers[current] === opt ? " selected" : "");
      btn.textContent = opt;
      btn.addEventListener("click", () => {
        answers[current] = opt;
        renderQuestion();
      });
      area.appendChild(btn);
    });
  } else {
    const ta = document.createElement("textarea");
    ta.rows = 6;
    ta.placeholder = "Deine Antwort...";
    ta.value = answers[current];
    ta.addEventListener("input", () => (answers[current] = ta.value));
    area.appendChild(ta);
  }

  $("btn-prev").disabled = current === 0;
  $("btn-next").textContent = current === total - 1 ? "Auswerten" : "Weiter";
}

function nextQuestion() {
  if (current < quiz.fragen.length - 1) {
    current++;
    renderQuestion();
  } else {
    evaluateQuiz();
  }
}

function prevQuestion() {
  if (current > 0) {
    current--;
    renderQuestion();
  }
}

/* ---------- Auswertung ---------- */

async function evaluateQuiz() {
  const unanswered = answers.filter((a) => !a.trim()).length;
  if (unanswered > 0 && !confirm(`${unanswered} Frage(n) sind unbeantwortet. Trotzdem auswerten?`)) {
    return;
  }

  showLoading("Antworten werden ausgewertet...");
  try {
    const system =
      "Du bist ein fairer, aber kritischer Prüfer für Einstellungstests. " +
      "Bewerte jede Antwort mit 0 bis 10 Punkten, gib kurzes konkretes Feedback und eine knappe Musterantwort. " +
      "Unbeantwortete Fragen erhalten 0 Punkte. Antworte auf Deutsch.";

    const payload = quiz.fragen.map((q, i) => ({
      id: q.id,
      frage: q.frage,
      typ: q.typ,
      optionen: q.optionen,
      antwort: answers[i] || "(keine Antwort)",
    }));

    const user =
      "Stellenausschreibung:\n" + quiz.jobText.slice(0, 15000) +
      "\n\nBewerte diese Antworten des Kandidaten:\n" + JSON.stringify(payload, null, 2);

    const result = await callLLM(system, user, EVAL_SCHEMA);
    renderResult(result);
    showView("view-result");
  } catch (e) {
    showError(e.message);
  } finally {
    hideLoading();
  }
}

function renderResult(result) {
  const g = result.gesamt;
  $("result-score").textContent = `${g.prozent}%`;
  $("result-summary").textContent = g.zusammenfassung;

  const fill = (id, items) => {
    const ul = $(id);
    ul.innerHTML = "";
    items.forEach((s) => {
      const li = document.createElement("li");
      li.textContent = s;
      ul.appendChild(li);
    });
  };
  fill("result-strengths", g.staerken);
  fill("result-improvements", g.verbesserungen);

  const details = $("result-details");
  details.innerHTML = "";
  quiz.fragen.forEach((q, i) => {
    const r = result.ergebnisse.find((e) => e.id === q.id) || {};
    const div = document.createElement("div");
    div.className = "detail-item";

    const pts = r.punkte ?? 0;
    const cls = pts >= 7 ? "good" : pts >= 4 ? "mid" : "bad";

    div.innerHTML = `
      <span class="points ${cls}">${pts}/10</span>
      <p class="q"></p>
      <p class="a"></p>
      <p class="fb"></p>
      <p class="fb"></p>`;
    div.querySelector(".q").textContent = q.frage;
    div.querySelector(".a").textContent = "Deine Antwort: " + (answers[i] || "(keine Antwort)");
    div.querySelectorAll(".fb")[0].textContent = r.feedback || "";
    div.querySelectorAll(".fb")[1].textContent = r.musterantwort ? "Musterantwort: " + r.musterantwort : "";
    details.appendChild(div);
  });
}

/* ---------- Event-Verkabelung ---------- */

function initSettingsForm() {
  $("provider").value = settings.provider || "anthropic";
  $("api-key").value = settings.apiKey || "";
  $("model").value = settings.model || "";
  $("model").placeholder = DEFAULT_MODELS[$("provider").value];
}

$("btn-settings").addEventListener("click", () => {
  initSettingsForm();
  showView("view-settings");
});

$("provider").addEventListener("change", () => {
  $("model").placeholder = DEFAULT_MODELS[$("provider").value];
  $("model").value = "";
});

$("btn-save-settings").addEventListener("click", () => {
  settings = {
    provider: $("provider").value,
    apiKey: $("api-key").value.trim(),
    model: $("model").value.trim(),
  };
  saveSettings(settings);
  showView("view-input");
});

$("btn-cancel-settings").addEventListener("click", () => showView("view-input"));

$("btn-fetch-url").addEventListener("click", async () => {
  const url = $("job-url").value.trim();
  if (!url) return;
  showLoading("Stellenanzeige wird geladen...");
  try {
    $("job-text").value = await fetchJobFromUrl(url);
  } catch (e) {
    showError(e.message);
  } finally {
    hideLoading();
  }
});

$("btn-generate").addEventListener("click", generateQuiz);
$("btn-next").addEventListener("click", nextQuestion);
$("btn-prev").addEventListener("click", prevQuestion);
$("btn-restart").addEventListener("click", () => {
  quiz = null;
  answers = [];
  showView("view-input");
});

$("btn-error-close").addEventListener("click", () => $("error-box").classList.add("hidden"));

// Beim ersten Start direkt zu den Einstellungen
if (!settings.apiKey) {
  initSettingsForm();
  showView("view-settings");
}

/* ---------- Service Worker (PWA) ---------- */

if ("serviceWorker" in navigator && location.protocol === "https:") {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
