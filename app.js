"use strict";

/* ---------- Modellkatalog ---------- */

// Bewusst nur große Modelle: Das Erstellen eines stimmigen Fragenkatalogs und
// die differenzierte Bewertung freier Antworten überfordern kleine Modelle.
const MODELS = {
  anthropic: [
    {
      id: "claude-opus-4-8",
      label: "Claude Opus 4.8 (empfohlen)",
      desc: "Stärkstes reguläres Claude-Modell. Sehr gute, stellenspezifische Fragen und differenziertes, faires Feedback - der beste Standard für dieses Tool.",
    },
    {
      id: "claude-fable-5",
      label: "Claude Fable 5",
      desc: "Anthropics fähigstes Modell. Noch gründlichere Auswertung, aber deutlich teurer und mit längeren Antwortzeiten - lohnt sich vor allem für anspruchsvolle Fach-Stellen.",
    },
    {
      id: "claude-sonnet-4-6",
      label: "Claude Sonnet 4.6",
      desc: "Schnell und günstig bei weiterhin hoher Qualität. Gute Wahl, wenn man viele Tests hintereinander durchspielen will.",
    },
  ],
  openai: [
    {
      id: "gpt-5.1",
      label: "GPT-5.1 (empfohlen)",
      desc: "Aktuelles Spitzenmodell von OpenAI. Sehr gute Fragenqualität und zuverlässige strukturierte Ausgabe.",
    },
    {
      id: "gpt-5",
      label: "GPT-5",
      desc: "Sehr leistungsfähig und etwas günstiger als GPT-5.1. Solide Wahl für Generierung und Auswertung.",
    },
    {
      id: "gpt-4.1",
      label: "GPT-4.1",
      desc: "Bewährtes großes Modell mit gutem Preis-Leistungs-Verhältnis. Für Standard-Stellen völlig ausreichend.",
    },
  ],
  deepseek: [
    {
      id: "deepseek-chat",
      label: "DeepSeek V3 (empfohlen)",
      desc: "Großes, sehr günstiges Modell. Gute Fragenqualität bei einem Bruchteil der Kosten - kleinere Abstriche bei Feinheiten im Deutschen.",
    },
    {
      id: "deepseek-reasoner",
      label: "DeepSeek R1 (Reasoning)",
      desc: "Denkt vor der Antwort ausführlich nach: besonders gründliche Bewertung, dafür spürbar langsamer.",
    },
  ],
};

function modelsFor(provider) {
  return MODELS[provider] || MODELS.anthropic;
}

/* ---------- Einstellungen (localStorage) ---------- */

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
let mode = "lernen";  // "lernen" | "pruefung"
let revealed = [];    // Lernmodus: welche Fragen bereits aufgeloest wurden
let startTime = 0;
const timer = { intervalId: null, deadline: 0, overtime: false, limitMin: 0 };

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
    empfohlene_zeit_minuten: {
      type: "integer",
      description: "Realistisches Zeitlimit fuer den gesamten Test in Minuten, abhaengig von Anzahl und Umfang der Fragen",
    },
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
          korrekte_antwort: {
            type: "string",
            description: "Bei multiple_choice exakt der Wortlaut der besten Option; bei offenen Fragen eine knappe Musterantwort",
          },
          erklaerungen: {
            type: "array",
            items: { type: "string" },
            description: "Bei multiple_choice parallel zu optionen: je Option ein Satz, warum sie richtig oder falsch ist; bei offenen Fragen leeres Array",
          },
          lerninfo: {
            type: "string",
            description: "Lernrelevanter Hintergrund zum Thema der Frage, 2 bis 4 Saetze",
          },
          quellen: {
            type: "array",
            items: { type: "string" },
            description: "1 bis 3 real existierende Quellen zur Vertiefung",
          },
        },
        required: ["id", "typ", "kategorie", "frage", "optionen", "korrekte_antwort", "erklaerungen", "lerninfo", "quellen"],
        additionalProperties: false,
      },
    },
  },
  required: ["titel", "empfohlene_zeit_minuten", "fragen"],
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
  const catalog = modelsFor(provider);
  const model = catalog.some((m) => m.id === settings.model)
    ? settings.model
    : catalog[0].id;

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

  // OpenAI und DeepSeek (OpenAI-kompatible API)
  const isDeepseek = provider === "deepseek";
  const endpoint = isDeepseek
    ? "https://api.deepseek.com/chat/completions"
    : "https://api.openai.com/v1/chat/completions";

  const body = {
    model,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  };

  if (isDeepseek) {
    // DeepSeek kennt kein striktes JSON-Schema, nur einen JSON-Modus.
    // Das Schema wird daher im Prompt mitgegeben.
    body.messages[0].content +=
      "\n\nAntworte ausschliesslich mit einem JSON-Objekt, das exakt diesem JSON-Schema entspricht (keine Erklaerungen, kein Markdown):\n" +
      JSON.stringify(schema);
    if (model === "deepseek-chat") {
      body.response_format = { type: "json_object" };
    }
  } else {
    body.response_format = {
      type: "json_schema",
      json_schema: { name: "ergebnis", strict: true, schema },
    };
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${settings.apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(apiErrorMessage(res.status, err?.error?.message));
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("Leere Antwort vom Modell erhalten.");
  return parseJsonLoose(content);
}

// Toleriert Markdown-Zaeune und Text um das JSON herum (noetig fuer DeepSeek)
function parseJsonLoose(text) {
  try {
    return JSON.parse(text);
  } catch {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start === -1 || end <= start) {
      throw new Error("Die Modellantwort enthielt kein gültiges JSON.");
    }
    return JSON.parse(text.slice(start, end + 1));
  }
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

// Manche Jobportale sind reine JavaScript-Apps, deren Inhalt der Reader nicht
// sieht. Für bekannte Portale gibt es serverseitig gerenderte Alternativ-URLs,
// die zuerst versucht werden.
function candidateUrls(url) {
  const list = [url];
  try {
    const u = new URL(url);
    // Onlyfy (Prescreen): Print-Version enthält die volle Anzeige
    const m = u.pathname.match(/\/job\/([a-z0-9]+)/i);
    if (u.hostname.endsWith("onlyfy.jobs") && m) {
      list.unshift(u.origin + "/candidate/job/print/" + m[1] + "?mode=print");
    }
  } catch {
    // ungültige URL: unverändert versuchen, Fehler kommt dann vom fetch
  }
  return list;
}

// Heuristik: App-Hüllen sind kurz oder tragen Jina-Warnungen zu iframes/Shadow DOM
function looksLikeRealContent(text) {
  return text.length > 1200 && !/contains (iframe|shadow DOM)/i.test(text);
}

async function fetchJobFromUrl(url) {
  // r.jina.ai liefert beliebige Webseiten als Markdown-Text mit offenen CORS-Headern
  let best = "";
  let lastStatus = 0;
  for (const u of candidateUrls(url)) {
    const res = await fetch("https://r.jina.ai/" + u);
    if (!res.ok) {
      lastStatus = res.status;
      continue;
    }
    const text = await res.text();
    if (looksLikeRealContent(text)) return text;
    if (text.length > best.length) best = text;
  }
  if (!best) {
    throw new Error("Die Seite konnte nicht geladen werden (HTTP " + lastStatus + "). Bitte Text manuell einfügen.");
  }
  return best;
}

/* ---------- Fragen generieren ---------- */

async function generateQuiz() {
  const jobText = $("job-text").value.trim();
  if (jobText.length < 50) {
    showError("Bitte zuerst eine Stellenbeschreibung einfügen (mindestens ein paar Sätze).");
    return;
  }
  const numQuestions = $("num-questions").value;
  mode = document.querySelector('input[name="mode"]:checked').value;

  showLoading("Fragenkatalog wird erstellt...");
  try {
    const system =
      "Du bist ein erfahrener Recruiter und erstellst realistische Einstellungstests. " +
      "Erstelle präzise, anspruchsvolle Fragen, die exakt auf die gegebene Stelle zugeschnitten sind. " +
      "Mische Fachfragen, situative Fragen und Soft-Skill-Fragen. " +
      "Etwa die Hälfte der Fragen soll Multiple-Choice sein (4 plausible Optionen, genau eine ist die beste), " +
      "der Rest offene Fragen. " +
      "Gib zu jeder Frage die korrekte Antwort an (bei Multiple-Choice exakt den Wortlaut der besten Option, " +
      "bei offenen Fragen eine knappe Musterantwort), bei Multiple-Choice zu jeder Option eine kurze Erklärung, " +
      "warum sie richtig oder falsch ist, einen lernrelevanten Hintergrund (lerninfo) sowie 1 bis 3 Quellen zur Vertiefung. " +
      "Nenne nur real existierende Quellen (Gesetze, Normen, Standardwerke, offizielle Dokumentation, etablierte Fachseiten). " +
      "Wenn du dir bei einer URL nicht sicher bist, nenne stattdessen den Namen der Quelle und einen passenden Suchbegriff. " +
      "Schätze ausserdem ein realistisches Zeitlimit in Minuten für den gesamten Test. Antworte auf Deutsch.";

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
    revealed = new Array(quiz.fragen.length).fill(false);
    current = 0;
    startTime = Date.now();

    if (mode === "pruefung") {
      startTimer(computeTimeLimitMin(quiz));
    } else {
      stopTimer();
      $("quiz-timer").classList.add("hidden");
    }

    renderQuestion();
    showView("view-quiz");
  } catch (e) {
    showError(e.message);
  } finally {
    hideLoading();
  }
}

/* ---------- Timer (Prüfungsmodus) ---------- */

function computeTimeLimitMin(q) {
  // Faustregel als Absicherung: 1,5 min je Multiple-Choice, 4 min je offene Frage
  const fallback = Math.ceil(
    q.fragen.reduce((sum, f) => sum + (f.typ === "offen" ? 4 : 1.5), 0)
  );
  const suggested = q.empfohlene_zeit_minuten;
  if (Number.isFinite(suggested) && suggested >= fallback * 0.5 && suggested <= fallback * 3) {
    return suggested;
  }
  return fallback;
}

function startTimer(limitMin) {
  stopTimer();
  timer.limitMin = limitMin;
  timer.deadline = Date.now() + limitMin * 60000;
  timer.overtime = false;
  $("quiz-timer").classList.remove("hidden");
  updateTimerDisplay();
  timer.intervalId = setInterval(updateTimerDisplay, 1000);
}

function stopTimer() {
  if (timer.intervalId) {
    clearInterval(timer.intervalId);
    timer.intervalId = null;
  }
}

function formatMinSec(ms) {
  const total = Math.max(0, Math.round(ms / 1000));
  const m = Math.floor(total / 60);
  const s = String(total % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function updateTimerDisplay() {
  const el = $("quiz-timer");
  const remaining = timer.deadline - Date.now();

  if (remaining >= 0) {
    el.textContent = formatMinSec(remaining);
    el.classList.toggle("warning", remaining < 60000);
    el.classList.remove("overtime");
    return;
  }

  if (!timer.overtime) {
    // Zeit gerade abgelaufen: Timer anhalten und Nutzer entscheiden lassen
    stopTimer();
    el.textContent = "0:00";
    $("timeout-modal").classList.remove("hidden");
    return;
  }

  el.textContent = "+" + formatMinSec(-remaining);
  el.classList.add("overtime");
}

/* ---------- Quiz-Anzeige ---------- */

function renderQuestion() {
  const q = quiz.fragen[current];
  const total = quiz.fragen.length;
  const isRevealed = mode === "lernen" && revealed[current];

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
      let cls = "option";
      if (answers[current] === opt) cls += " selected";
      if (isRevealed) {
        if (opt.trim() === q.korrekte_antwort.trim()) cls += " correct";
        else if (answers[current] === opt) cls += " wrong";
      }
      btn.className = cls;
      btn.textContent = opt;
      if (!isRevealed) {
        btn.addEventListener("click", () => {
          answers[current] = opt;
          renderQuestion();
        });
      } else {
        btn.disabled = true;
      }
      area.appendChild(btn);
    });
  } else {
    const ta = document.createElement("textarea");
    ta.rows = 6;
    ta.placeholder = "Deine Antwort...";
    ta.value = answers[current];
    ta.readOnly = isRevealed;
    ta.addEventListener("input", () => (answers[current] = ta.value));
    area.appendChild(ta);
  }

  renderLearnArea(q, isRevealed);

  $("btn-prev").disabled = current === 0;
  $("btn-next").textContent = current === total - 1 ? "Auswerten" : "Weiter";
}

// Lernmodus: Auflösen-Button bzw. Erklärungsbox unter der Frage
function renderLearnArea(q, isRevealed) {
  const area = $("learn-area");
  area.innerHTML = "";
  if (mode !== "lernen") return;

  if (!isRevealed) {
    const btn = document.createElement("button");
    btn.id = "btn-reveal";
    btn.textContent = "Auflösen und erklären";
    btn.addEventListener("click", () => {
      revealed[current] = true;
      renderQuestion();
    });
    area.appendChild(btn);
    return;
  }

  const box = document.createElement("div");
  box.className = "learn-box";

  const answerLine = document.createElement("p");
  answerLine.className = "learn-answer";
  answerLine.textContent =
    (q.typ === "multiple_choice" ? "Richtige Antwort: " : "Musterantwort: ") + q.korrekte_antwort;
  box.appendChild(answerLine);

  if (q.typ === "multiple_choice" && q.erklaerungen.length) {
    const ul = document.createElement("ul");
    ul.className = "option-explanations";
    q.optionen.forEach((opt, i) => {
      if (!q.erklaerungen[i]) return;
      const li = document.createElement("li");
      const isCorrect = opt.trim() === q.korrekte_antwort.trim();
      li.className = isCorrect ? "exp-correct" : "exp-wrong";
      li.textContent = `${opt} – ${q.erklaerungen[i]}`;
      ul.appendChild(li);
    });
    box.appendChild(ul);
  }

  if (q.lerninfo) {
    const info = document.createElement("p");
    info.textContent = q.lerninfo;
    box.appendChild(info);
  }

  if (q.quellen && q.quellen.length) {
    const head = document.createElement("p");
    head.className = "learn-sources-head";
    head.textContent = "Quellen zur Vertiefung:";
    box.appendChild(head);
    const ul = document.createElement("ul");
    q.quellen.forEach((src) => {
      const li = document.createElement("li");
      li.textContent = src;
      ul.appendChild(li);
    });
    box.appendChild(ul);
  }

  area.appendChild(box);
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

  stopTimer();
  $("timeout-modal").classList.add("hidden");
  const durationMs = Date.now() - startTime;

  showLoading("Antworten werden ausgewertet...");
  try {
    const system =
      "Du bist ein fairer, aber kritischer Prüfer für Einstellungstests. " +
      "Bewerte jede Antwort mit 0 bis 10 Punkten, gib kurzes konkretes Feedback und eine knappe Musterantwort. " +
      "Unbeantwortete Fragen erhalten 0 Punkte. " +
      "Fragen, die im Lernmodus vor dem Antworten aufgelöst wurden (aufgeloest: true), bewerte normal, " +
      "erwähne den Umstand aber kurz im Feedback. Antworte auf Deutsch.";

    const payload = quiz.fragen.map((q, i) => ({
      id: q.id,
      frage: q.frage,
      typ: q.typ,
      optionen: q.optionen,
      korrekte_antwort: q.korrekte_antwort,
      antwort: answers[i] || "(keine Antwort)",
      aufgeloest: mode === "lernen" ? revealed[i] : false,
    }));

    const minutesUsed = Math.max(1, Math.round(durationMs / 60000));
    const kontext =
      mode === "pruefung"
        ? `Prüfungsmodus mit Zeitlimit ${timer.limitMin} Minuten, benötigt wurden ca. ${minutesUsed} Minuten` +
          (timer.overtime ? " (Limit wurde überschritten)." : ".")
        : "Lernmodus ohne Zeitlimit.";

    const user =
      "Stellenausschreibung:\n" + quiz.jobText.slice(0, 15000) +
      "\n\nRahmen: " + kontext +
      "\n\nBewerte diese Antworten des Kandidaten:\n" + JSON.stringify(payload, null, 2);

    const result = await callLLM(system, user, EVAL_SCHEMA);
    renderResult(result, durationMs);
    showView("view-result");
  } catch (e) {
    showError(e.message);
  } finally {
    hideLoading();
  }
}

function renderResult(result, durationMs) {
  const g = result.gesamt;
  $("result-score").textContent = `${g.prozent}%`;
  $("result-summary").textContent = g.zusammenfassung;

  const modeLabel = mode === "pruefung" ? "Prüfungsmodus" : "Lernmodus";
  let meta = `${modeLabel} · ${quiz.fragen.length} Fragen · Dauer ${formatMinSec(durationMs)} min`;
  if (mode === "pruefung") {
    meta += ` · Zeitlimit ${timer.limitMin} min` + (timer.overtime ? " (überschritten)" : "");
  }
  $("result-meta").textContent = meta;

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
      <p class="fb"></p>
      <p class="fb src"></p>`;
    div.querySelector(".q").textContent = q.frage;
    div.querySelector(".a").textContent = "Deine Antwort: " + (answers[i] || "(keine Antwort)");
    div.querySelectorAll(".fb")[0].textContent = r.feedback || "";
    div.querySelectorAll(".fb")[1].textContent = r.musterantwort ? "Musterantwort: " + r.musterantwort : "";
    div.querySelector(".src").textContent =
      q.quellen && q.quellen.length ? "Quellen: " + q.quellen.join(" · ") : "";
    details.appendChild(div);
  });
}

/* ---------- Event-Verkabelung ---------- */

function populateModelSelect(provider, selectedId) {
  const select = $("model");
  const catalog = modelsFor(provider);
  select.innerHTML = "";
  catalog.forEach((m) => {
    const opt = document.createElement("option");
    opt.value = m.id;
    opt.textContent = m.label;
    select.appendChild(opt);
  });
  select.value = catalog.some((m) => m.id === selectedId) ? selectedId : catalog[0].id;
  updateModelDesc();
}

function updateModelDesc() {
  const m = modelsFor($("provider").value).find((x) => x.id === $("model").value);
  $("model-desc").textContent = m ? m.desc : "";
}

function initSettingsForm() {
  $("provider").value = settings.provider || "anthropic";
  $("api-key").value = settings.apiKey || "";
  populateModelSelect($("provider").value, settings.model);
}

$("btn-settings").addEventListener("click", () => {
  initSettingsForm();
  showView("view-settings");
});

$("provider").addEventListener("change", () => {
  populateModelSelect($("provider").value);
});

$("model").addEventListener("change", updateModelDesc);

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
    const text = await fetchJobFromUrl(url);
    $("job-text").value = text;
    if (!looksLikeRealContent(text)) {
      showError("Die Seite konnte nur unvollständig ausgelesen werden (vermutlich eine JavaScript-Anwendung). Bitte prüfen und die Stellenbeschreibung ggf. manuell einfügen.");
    }
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
  revealed = [];
  stopTimer();
  $("quiz-timer").classList.add("hidden");
  showView("view-input");
});

$("btn-print").addEventListener("click", () => window.print());

// Zeit abgelaufen: auswerten oder bewusst überziehen
$("btn-timeout-submit").addEventListener("click", () => {
  $("timeout-modal").classList.add("hidden");
  evaluateQuiz();
});

$("btn-timeout-continue").addEventListener("click", () => {
  $("timeout-modal").classList.add("hidden");
  timer.overtime = true;
  timer.intervalId = setInterval(updateTimerDisplay, 1000);
  updateTimerDisplay();
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
