"use strict";

/* ---------- Version und Changelog ---------- */

// Muss mit der VERSION-Datei im Repo übereinstimmen (der CI-Check erzwingt
// das). Bei jedem Release: VERSION hochzählen und hier einen Eintrag ergänzen.
const APP_VERSION = "1.0.18";

const CHANGELOG = [
  {
    version: "1.0.18",
    date: "13.06.2026",
    items: [
      "Der zuletzt geladene Stand des Eingabe-Bildschirms (Stellen-URL, eingelesener Text und der aktive Tab) bleibt jetzt über ein App-Update oder das Neuladen hinweg erhalten. Bisher war nach einer neuen Version die URL weg, sodass die Anzeige neu geladen werden musste – dabei legte das Tool die Stelle als neuen Eintrag in der Historie an, statt die Versuche bei der bestehenden Stelle fortzuschreiben. Jetzt wird dieselbe Stelle zuverlässig wiedererkannt. Zusätzlich übernimmt „Weiter üben“ in der Historie die Stellen-URL, damit ein dort erstellter Test ebenfalls bei der richtigen Stelle landet.",
    ],
  },
  {
    version: "1.0.17",
    date: "13.06.2026",
    items: [
      "Historie: Bei lokalen Modellen wird statt der Kosten (die es dort nicht gibt) jetzt der Token-Verbrauch je Versuch angezeigt – als Orientierung, wie viel ein Test das lokale Modell gekostet hat. Für die Cloud-Anbieter bleibt die gewohnte Kostenanzeige in Dollar.",
    ],
  },
  {
    version: "1.0.16",
    date: "13.06.2026",
    items: [
      "Lokales Modell: Wird die Antwort des Modells abgeschnitten, weil die Kontextlänge nicht für alle Fragen reicht, erscheint jetzt eine klare Meldung (weniger Fragen wählen oder Modell mit größerem Kontext laden) statt eines kryptischen Fehlers.",
      "Lokales Modell: Für die Fragengenerierung wird bei LM Studio jetzt ein striktes JSON-Schema erzwungen – das liefert zuverlässiger gültiges JSON. Versteht der lokale Server das nicht, wird automatisch ohne diese Vorgabe wiederholt, sodass auch ältere Server und Ollama weiter funktionieren.",
      "Einstellungen: Beim lokalen Anbieter wird nach „Modelle laden“ die geladene Kontextlänge des Modells angezeigt (sofern LM Studio sie meldet) – als Orientierung, ob der Kontext für die gewünschte Fragenzahl reicht.",
    ],
  },
  {
    version: "1.0.15",
    date: "13.06.2026",
    items: [
      "Lokales Modell: Fragebogen-Erstellung schlug bei neueren LM-Studio-Versionen mit „HTTP 400“ fehl. Ursache war der angeforderte JSON-Modus (response_format „json_object“), den aktuelle LM-Studio-Versionen nicht mehr akzeptieren. Für lokale Server wird er jetzt weggelassen – das JSON-Schema liegt ohnehin schon im Prompt. DeepSeek bleibt unverändert.",
      "Lokales Modell (LM Studio / Ollama): Der Einrichtungshinweis erklärt jetzt, dass der lokale Server Cross-Origin-Zugriffe erlauben muss – in LM Studio die Option „Enable CORS“, bei Ollama OLLAMA_ORIGINS. Ohne das blockt der Browser die Verbindung von dieser Seite. Zusätzlich der Tipp, bei Verbindungsproblemen 127.0.0.1 statt localhost zu verwenden.",
    ],
  },
  {
    version: "1.0.14",
    date: "13.06.2026",
    items: [
      "Leistungsabzeichen (Bestanden, Souverän, Spitzenreiter, Aufwärtstrend) gibt es jetzt nur noch für Ergebnisse im Prüfungsmodus. Im Lernmodus lässt sich durch Auflösen leicht ein hoher Wert erreichen – deshalb zählen für diese Abzeichen nur echte Prüfungen. Die Fleiß-Abzeichen (Erster Schritt, Drei am Stück, Hartnäckig) bleiben in beiden Modi.",
      "Das Abzeichen „Ernstfall“ gibt es jetzt schon fürs Antreten zu einer Prüfung (vorher erst ab 70 %), damit es sich nicht mehr mit „Souverän“ überschneidet.",
      "Wer im Lernmodus mehrmals hintereinander gut abschneidet, bekommt am Ende der Auswertung einen Hinweis, es als Nächstes mit einer Prüfung zu versuchen.",
    ],
  },
  {
    version: "1.0.13",
    date: "13.06.2026",
    items: [
      "Lernmodus: Eine Frage, die man auflöst, ohne sie vorher zu beantworten, lässt sich jetzt noch beantworten. Bisher war sie dauerhaft gesperrt – wer am Ende übersprungene Fragen über „Zurück“ nachholen wollte, kam nicht mehr hinein. Eine bereits gegebene Antwort bleibt nach dem Auflösen weiterhin eingefroren.",
    ],
  },
  {
    version: "1.0.12",
    date: "13.06.2026",
    items: [
      "Links aus der Jobsuche der Arbeitsagentur funktionieren jetzt zuverlässig: Bisher wurde beim Laden eines aus der Trefferliste kopierten Links die gesamte Ergebnisliste mit hunderten anderen Stellen eingelesen statt der gewählten Anzeige. Jetzt wird gezielt die Detailseite zur Stelle geladen.",
    ],
  },
  {
    version: "1.0.11",
    date: "13.06.2026",
    items: [
      "Lokaler Anbieter wieder nutzbar: Die Sicherheitsrichtlinie der Seite blockierte bisher jede Verbindung zum lokal laufenden Modell (Ollama oder LM Studio). Verbindungen zu localhost sind jetzt erlaubt, sodass „Verbindung testen und Modelle laden“ funktioniert.",
      "Onboarding einsteigerfreundlicher: verständlichere Erklärung, wozu der API-Schlüssel dient, eine klare Empfehlung bei der Anbieterwahl und ausführlichere, vollständigere Schritte fürs lokale Modell (LM Studio und Ollama) inklusive der häufigen Stolpersteine.",
    ],
  },
  {
    version: "1.0.10",
    date: "13.06.2026",
    items: [
      "Robustheit und Barrierefreiheit: Antworten von Modellen ohne striktes Schema werden vor Anzeige und Speicherung auf ihre Form geprüft, der Import verträgt unvollständige Sicherungsdateien besser, der Timer bleibt nach Zeitablauf nicht mehr hängen, die Stellenanzeige lässt sich per Enter laden, Auswahlgruppen und das Schlüsselfeld sind sauber beschriftet, der Kopfzeilen-Kontrast erfüllt jetzt die AA-Vorgaben, und die Offline-Nutzung wurde gehärtet.",
    ],
  },
  {
    version: "1.0.9",
    date: "13.06.2026",
    items: [
      "Neu: Spielerischer Fortschritt je Stelle. Aus deinen Versuchen ergeben sich Erfahrungspunkte und Stufen, eine Übungsserie über mehrere Tage und Abzeichen für Meilensteine (z. B. erster Test, 90 % erreicht, Prüfung bestanden). Sichtbar in der Auswertung und in der Historie – frisch freigeschaltete Abzeichen und Stufenaufstiege werden direkt nach dem Test hervorgehoben.",
    ],
  },
  {
    version: "1.0.8",
    date: "13.06.2026",
    items: [
      "Historie: Versuche zur selben per URL geladenen Stelle landen jetzt zuverlässig in einer Historie, auch wenn die Anzeige beim erneuten Laden leicht abweichenden Text liefert.",
    ],
  },
  {
    version: "1.0.7",
    date: "13.06.2026",
    items: [
      "Neuer Anbieter „Lokales Modell“: Tests lassen sich jetzt kostenlos und datenschutzfreundlich mit einem lokal laufenden Modell (Ollama oder LM Studio) erstellen und auswerten – die installierten Modelle werden direkt aus dem lokalen Server geladen. Hinweis: Kleine lokale Modelle liefern oberflächlichere Fragen und Bewertungen als die Cloud-Modelle.",
    ],
  },
  {
    version: "1.0.6",
    date: "13.06.2026",
    items: [
      "Die Rückfrage vor dem Auswerten bei unbeantworteten Fragen erscheint jetzt als Fenster in der App statt als blockierender Browser-Dialog.",
    ],
  },
  {
    version: "1.0.5",
    date: "13.06.2026",
    items: [
      "Bessere Bedienbarkeit mit Tastatur und Screenreader: Dialoge sind als solche ausgezeichnet und erhalten den Fokus, der Fokus geht beim Beantworten und Auflösen nicht mehr verloren, Auswahlzustände und Fehlermeldungen werden angesagt, und der Tastaturfokus beim Schwierigkeitsgrad ist sichtbar.",
      "Das Changelog-Fenster lässt sich mit Escape schließen.",
    ],
  },
  {
    version: "1.0.4",
    date: "13.06.2026",
    items: [
      "Robustheit: Punktwerte aus der KI-Auswertung und aus importierten Sicherungen werden vor der Anzeige strikt als Zahl behandelt.",
      "Offline-Modus: Fehlerseiten (z. B. während eines Deployments) überschreiben nicht mehr den funktionierenden Offline-Speicher.",
    ],
  },
  {
    version: "1.0.3",
    date: "13.06.2026",
    items: [
      "Historie und Einstellungen führen zurück zum laufenden Test bzw. zur offenen Auswertung statt zur Startseite – ein angefangener Test geht dadurch nicht mehr verloren.",
    ],
  },
  {
    version: "1.0.2",
    date: "13.06.2026",
    items: [
      "Test erstellen, Auswerten und URL-Laden lassen sich während des Ladens nicht mehr versehentlich doppelt auslösen (z. B. per Enter-Taste) – keine doppelten API-Kosten und Historie-Einträge mehr.",
    ],
  },
  {
    version: "1.0.1",
    date: "13.06.2026",
    items: [
      "Gespeicherte Versuche aus älteren Versionen lassen sich wieder zuverlässig ansehen – fehlende Felder in der Auswertung oder im Fragebogen führen nicht mehr zu einer leeren Seite.",
    ],
  },
  {
    version: "1.0.0",
    date: "13.06.2026",
    items: [
      "Erste versionierte Ausgabe – ab jetzt sind Änderungen hier im Überblick nachlesbar.",
      "Simulierter Einstellungstest aus einer Stellenanzeige (per URL oder eingefügtem Text), mit wählbarer Fragenzahl und Schwierigkeitsgrad.",
      "Lernmodus mit direkter Auflösung samt Erklärungen und Quellen sowie Prüfungsmodus mit Zeitlimit.",
      "Auswertung mit Punkten, Stärken und Verbesserungspotenzial; Ergebnisse landen in der Historie je Stelle.",
      "Unterstützung für Claude (Anthropic), OpenAI und DeepSeek mit Kostenschätzung je Modell.",
      "Installierbar als App (PWA), mit hellem und dunklem Farbschema sowie Datenexport und -import.",
    ],
  },
];

/* ---------- Modellkatalog ---------- */

// Bewusst nur große Modelle: Das Erstellen eines stimmigen Fragenkatalogs und
// die differenzierte Bewertung freier Antworten überfordern kleine Modelle.
//
// preis: Richtpreis des Anbieters in USD je 1 Mio. Tokens (Stand 2026). Dient
// nur der Kostenanzeige und -schätzung im Tool; abgerechnet wird immer direkt
// beim Anbieter. Bei den Anthropic-Modellen sind die Denk-Tokens ("thinking")
// in den Output-Tokens enthalten und damit bereits eingepreist.
const MODELS = {
  anthropic: [
    {
      id: "claude-opus-4-8",
      label: "Claude Opus 4.8 (empfohlen)",
      desc: "Stärkstes reguläres Claude-Modell. Sehr gute, stellenspezifische Fragen und differenziertes, faires Feedback - der beste Standard für dieses Tool.",
      preis: { in: 5, out: 25 },
    },
    {
      id: "claude-fable-5",
      label: "Claude Fable 5",
      desc: "Anthropics fähigstes Modell. Noch gründlichere Auswertung, aber deutlich teurer und mit längeren Antwortzeiten - lohnt sich vor allem für anspruchsvolle Fach-Stellen.",
      preis: { in: 10, out: 50 },
    },
    {
      id: "claude-sonnet-4-6",
      label: "Claude Sonnet 4.6 (günstig)",
      desc: "Günstiger als Opus. Läuft hier mit mittlerer Gründlichkeit (effort medium), weil es sonst vor der Ausgabe minutenlang nachdenkt - leichte Qualitätsabstriche gegenüber Opus sind möglich.",
      effort: "medium",
      preis: { in: 3, out: 15 },
    },
  ],
  openai: [
    {
      id: "gpt-5.1",
      label: "GPT-5.1 (empfohlen)",
      desc: "Aktuelles Spitzenmodell von OpenAI. Sehr gute Fragenqualität und zuverlässige strukturierte Ausgabe.",
      preis: { in: 1.25, out: 10 },
    },
    {
      id: "gpt-5",
      label: "GPT-5",
      desc: "Sehr leistungsfähig und etwas günstiger als GPT-5.1. Solide Wahl für Generierung und Auswertung.",
      preis: { in: 1.25, out: 10 },
    },
    {
      id: "gpt-4.1",
      label: "GPT-4.1",
      desc: "Bewährtes großes Modell mit gutem Preis-Leistungs-Verhältnis. Für Standard-Stellen völlig ausreichend.",
      preis: { in: 2, out: 8 },
    },
  ],
  deepseek: [
    {
      id: "deepseek-chat",
      label: "DeepSeek V3 (empfohlen)",
      desc: "Großes, sehr günstiges Modell. Gute Fragenqualität bei einem Bruchteil der Kosten - kleinere Abstriche bei Feinheiten im Deutschen.",
      preis: { in: 0.27, out: 1.1 },
    },
    {
      id: "deepseek-reasoner",
      label: "DeepSeek R1 (Reasoning)",
      desc: "Denkt vor der Antwort ausführlich nach: besonders gründliche Bewertung, dafür spürbar langsamer.",
      preis: { in: 0.55, out: 2.19 },
    },
  ],
};

// Lokale Modelle (Ollama / LM Studio) haben keinen festen Katalog: Welche
// Modelle bereitstehen, haengt davon ab, was der Nutzer lokal installiert hat.
// Sie werden daher zur Laufzeit vom Server abgefragt (fetchLocalModels).
MODELS.local = [];

function modelsFor(provider) {
  return MODELS[provider] || MODELS.anthropic;
}

/* ---------- Lokaler Anbieter (Ollama / LM Studio) ---------- */

// OpenAI-kompatible Standardadresse von Ollama. LM Studio nutzt :1234/v1.
const LOCAL_BASE_DEFAULT = "http://localhost:11434/v1";

// Vereinheitlicht eine eingegebene Server-Adresse: Leerwert -> Standard,
// abschliessende Schraegstriche weg (sonst entstehen doppelte Slashes).
function normalizeBaseUrl(raw) {
  const base = (raw || "").trim() || LOCAL_BASE_DEFAULT;
  return base.replace(/\/+$/, "");
}

// Aktuell gespeicherte Server-Adresse des lokalen Anbieters.
function localBaseUrl() {
  return normalizeBaseUrl(settings.baseUrl);
}

// Fragt die installierten Modelle am OpenAI-kompatiblen /models-Endpunkt ab.
// Gibt ein Array von Modell-IDs zurueck, oder null, wenn keine Verbindung
// zustande kommt (Server aus, falsche Adresse, CORS geblockt).
async function fetchLocalModels(rawBaseUrl) {
  let res;
  try {
    res = await fetch(normalizeBaseUrl(rawBaseUrl) + "/models");
  } catch {
    return null;
  }
  if (!res.ok) return null;
  const data = await res.json().catch(() => null);
  const list = data && Array.isArray(data.data) ? data.data : [];
  return list.map((m) => m && m.id).filter(Boolean);
}

// Geladene Kontextlaenge je Modell, aus LM Studios nativer API. Wird nach dem
// Modell-Laden befuellt und in updateModelDesc angezeigt. Ollama kennt diesen
// Endpunkt nicht - dann bleibt die Map leer und es wird nichts angezeigt.
let localModelContexts = {};
async function loadLocalModelContexts(rawBaseUrl) {
  localModelContexts = {};
  // Native LM-Studio-API liegt neben /v1, nicht darunter.
  const root = normalizeBaseUrl(rawBaseUrl).replace(/\/v1$/, "");
  let res;
  try {
    res = await fetch(root + "/api/v0/models");
  } catch {
    return;
  }
  if (!res.ok) return;
  const data = await res.json().catch(() => null);
  const list = data && Array.isArray(data.data) ? data.data : [];
  list.forEach((m) => {
    if (m && m.id && m.state === "loaded" && m.loaded_context_length) {
      localModelContexts[m.id] = {
        loaded: m.loaded_context_length,
        max: m.max_context_length || null,
      };
    }
  });
}

/* ---------- Kosten (US-Dollar) ---------- */

// Grobe Annahme fuer den Token-Verbrauch eines kompletten Tests mit etwa
// 10 Fragen (Fragen erstellen inkl. Stellenanzeige + Antworten auswerten),
// inklusive der modellinternen Denk-Tokens. Nur fuer die ungefaehre
// Kostenorientierung im Modell-Picker.
const COST_ESTIMATE_TOKENS = { input: 4000, output: 9000 };

// Preis eines Modells aus dem Katalog; null fuer unbekannte Modelle oder
// Eintraege ohne Preis — die Anzeige laesst die Kosten dann stillschweigend weg.
function pricingFor(modelId) {
  for (const list of Object.values(MODELS)) {
    const m = list.find((e) => e.id === modelId);
    if (m) return m.preis || null;
  }
  return null;
}

// Errechnet die Kosten in USD aus Token-Verbrauch und Modellpreis; null, wenn
// fuer das Modell kein Preis hinterlegt ist.
function costForUsage(modelId, inputTokens, outputTokens) {
  const p = pricingFor(modelId);
  if (!p) return null;
  return ((inputTokens || 0) * p.in + (outputTokens || 0) * p.out) / 1e6;
}

// Kosten eines einzelnen API-Aufrufs; null bei unbekanntem Preis oder wenn der
// Stream keine Verbrauchsdaten geliefert hat (manche OpenAI-kompatible
// Endpunkte ignorieren stream_options) — sonst wuerden faelschlich 0 $
// gespeichert und angezeigt.
function callCost(modelId, inputTokens, outputTokens) {
  if (!inputTokens && !outputTokens) return null;
  return costForUsage(modelId, inputTokens, outputTokens);
}

// Ungefaehre Kosten eines Standard-Tests fuer den Modell-Picker; null bei
// unbekanntem Preis.
function estimatedQueryCost(modelId) {
  return costForUsage(modelId, COST_ESTIMATE_TOKENS.input, COST_ESTIMATE_TOKENS.output);
}

// USD-Betrag deutsch formatiert ("0,25 $"); kleine Betraege mit mehr
// Nachkommastellen, damit Cent-Bruchteile nicht zu 0 gerundet verschwinden.
function formatUsd(usd) {
  if (typeof usd !== "number" || !isFinite(usd) || usd < 0) return "";
  const v = usd >= 0.1 ? usd.toFixed(2) : usd.toFixed(3);
  return v.replace(".", ",") + " $";
}

// Token-Anzahl kompakt ("12k Tokens"); ab 1000 auf Tausender gerundet, darunter
// exakt. Fuer lokale Modelle, die keinen Preis haben, aber Verbrauch melden.
function formatTokens(n) {
  if (typeof n !== "number" || !isFinite(n) || n <= 0) return "";
  const label = n >= 1000 ? `${Math.round(n / 1000)}k` : `${Math.round(n)}`;
  return `${label} Tokens`;
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

/* ---------- Farbschema (Auto / Hell / Dunkel) ---------- */
// Eigener, additiver Key - die Einstellungen (settings) bleiben unberuehrt.
// Kein/ungueltiger Wert => "auto" (folgt dem System per prefers-color-scheme).
// Das Attribut data-theme wird bereits per Inline-Skript im <head> gesetzt
// (kein Farbsprung beim Laden); hier nur Umschalten, Persistenz und das Icon.
const THEME_KEY = "bewerbungstool.theme";
const THEME_CYCLE = ["auto", "light", "dark"];
const THEME_LABEL = { auto: "Auto", light: "Hell", dark: "Dunkel" };
const THEME_ICON = {
  auto: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 3a9 9 0 0 0 0 18z" fill="currentColor"/></svg>',
  light: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"/></svg>',
  dark: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
};

function loadTheme() {
  try {
    const t = localStorage.getItem(THEME_KEY);
    return t === "light" || t === "dark" ? t : "auto";
  } catch {
    return "auto";
  }
}

function applyTheme(t) {
  if (t === "light" || t === "dark") {
    document.documentElement.dataset.theme = t;
    try { localStorage.setItem(THEME_KEY, t); } catch {}
  } else {
    delete document.documentElement.dataset.theme;
    try { localStorage.removeItem(THEME_KEY); } catch {}
  }
  syncThemeButton(t);
  syncThemeColorMeta(t);
}

function syncThemeButton(t) {
  const btn = $("btn-theme");
  if (!btn) return;
  btn.innerHTML = THEME_ICON[t] || THEME_ICON.auto;
  const label = THEME_LABEL[t] || THEME_LABEL.auto;
  btn.setAttribute("aria-label", `Farbschema: ${label}`);
  btn.title = `Farbschema: ${label} (klicken zum Wechseln)`;
}

// Adressleisten-Farbe an das erzwungene Schema anpassen. Bei "auto" uebernehmen
// wieder die statischen <meta media>-Tags (das Override-Tag wird entfernt).
function syncThemeColorMeta(t) {
  const id = "tc-override";
  let m = document.getElementById(id);
  if (t !== "light" && t !== "dark") {
    if (m) m.remove();
    return;
  }
  if (!m) {
    m = document.createElement("meta");
    m.name = "theme-color";
    m.id = id;
    document.head.appendChild(m);
  }
  m.setAttribute("content", t === "dark" ? "#3a2a25" : "#c5543a");
}

/* ---------- App-Zustand ---------- */

let quiz = null;      // { titel, fragen: [...] }
let answers = [];     // index-paralleles Array mit Antworttexten
let current = 0;
let mode = "lernen";  // "lernen" | "pruefung"
let reviewing = false; // Durchgehen eines bereits bewerteten Fragebogens (keine erneute Auswertung)
let revealed = [];    // Lernmodus: welche Fragen bereits aufgeloest wurden
let startTime = 0;
const timer = { intervalId: null, deadline: 0, overtime: false, limitMin: 0 };

/* ---------- DOM-Helfer ---------- */

const $ = (id) => document.getElementById(id);

const views = ["view-onboarding", "view-settings", "view-input", "view-quiz", "view-result", "view-history"];

function showView(id) {
  views.forEach((v) => $(v).classList.toggle("hidden", v !== id));
}

function currentView() {
  return views.find((v) => !$(v).classList.contains("hidden")) || "view-input";
}

// Merkt sich beim Oeffnen von Historie/Einstellungen, wohin Zurueck/Abbrechen/
// Speichern fuehren sollen: zurueck zu einem laufenden Test (view-quiz) bzw.
// einer offenen Auswertung (view-result) statt immer zur Eingabe - sonst waere
// ein angefangener Test ueber die Kopfzeilen-Buttons unwiederbringlich weg.
let returnView = "view-input";

function rememberReturnView() {
  const cv = currentView();
  if (cv === "view-quiz" || cv === "view-result") {
    returnView = cv;
  } else if (cv !== "view-history" && cv !== "view-settings") {
    // Wechsel zwischen Historie und Einstellungen erbt das Ziel; alles
    // andere (Eingabe, Onboarding) setzt es zurueck
    returnView = "view-input";
  }
}

let loadingTicker = null;

function showLoading(text) {
  $("loading-text").textContent = text;
  $("loading-progress").classList.add("hidden");
  $("loading-fill").style.width = "0%";
  $("loading").classList.remove("hidden");

  const started = Date.now();
  $("loading-elapsed").textContent = "";
  clearInterval(loadingTicker);
  loadingTicker = setInterval(() => {
    $("loading-elapsed").textContent = Math.round((Date.now() - started) / 1000) + " s";
  }, 1000);
}

function setLoadingProgress(done, total, label) {
  $("loading-progress").classList.remove("hidden");
  $("loading-fill").style.width = Math.min(100, Math.round((done / total) * 100)) + "%";
  if (label) $("loading-text").textContent = label;
}

function hideLoading() {
  clearInterval(loadingTicker);
  loadingTicker = null;
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
          schwierigkeit: {
            type: "string",
            enum: ["leicht", "mittel", "schwer"],
            description: "schwer = Frage, wie sie im echten Auswahlverfahren fuer diese Stelle am wahrscheinlichsten gestellt wird",
          },
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
            items: {
              type: "object",
              properties: {
                titel: { type: "string", description: "Name der Quelle, z. B. Gesetz, Norm, Standardwerk oder Dokumentation" },
                url: { type: "string", description: "URL der Quelle, nur wenn sicher bekannt; sonst leerer String" },
              },
              required: ["titel", "url"],
              additionalProperties: false,
            },
            description: "1 bis 3 real existierende Quellen zur Vertiefung",
          },
        },
        required: ["id", "typ", "kategorie", "schwierigkeit", "frage", "optionen", "korrekte_antwort", "erklaerungen", "lerninfo", "quellen"],
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

/* ---------- Shape-Validierung der Modellantworten ---------- */
// Anthropic und OpenAI erzwingen das JSON-Schema serverseitig. DeepSeek und
// lokale Modelle bekommen es nur als Prompt-Hinweis und koennen Felder
// weglassen oder den Typ verfehlen. Diese Helfer machen die Antwort robust
// nutzbar (harmlose Luecken auffuellen) und werfen nur, wenn das Ergebnis
// grundsaetzlich unbrauchbar ist.

function normalizeQuizData(result) {
  if (!result || typeof result !== "object" || !Array.isArray(result.fragen)) {
    throw new Error("Die Modellantwort hatte nicht die erwartete Form (keine Fragenliste).");
  }
  const validTyp = (t) => (t === "multiple_choice" || t === "offen" ? t : "offen");
  const validDiff = (d) => (d === "leicht" || d === "mittel" || d === "schwer" ? d : "");
  const fragen = [];
  result.fragen.forEach((q, i) => {
    if (!q || typeof q !== "object") return;
    const frage = typeof q.frage === "string" ? q.frage.trim() : "";
    if (!frage) return; // ohne Fragetext nicht darstellbar
    let typ = validTyp(q.typ);
    let optionen = Array.isArray(q.optionen) ? q.optionen.filter((o) => typeof o === "string") : [];
    // Multiple-Choice ohne brauchbare Optionen ist nicht bedienbar -> offene Frage
    if (typ === "multiple_choice" && optionen.length < 2) { typ = "offen"; optionen = []; }
    const quellen = Array.isArray(q.quellen)
      ? q.quellen
          .filter((s) => s && typeof s === "object")
          .map((s) => ({
            titel: typeof s.titel === "string" ? s.titel : "",
            url: typeof s.url === "string" ? s.url : "",
          }))
          .filter((s) => s.titel || s.url)
      : [];
    fragen.push({
      id: Number.isFinite(Number(q.id)) ? Number(q.id) : i + 1,
      typ,
      kategorie: typeof q.kategorie === "string" ? q.kategorie : "",
      schwierigkeit: validDiff(q.schwierigkeit),
      frage,
      optionen,
      korrekte_antwort: typeof q.korrekte_antwort === "string" ? q.korrekte_antwort : "",
      erklaerungen: Array.isArray(q.erklaerungen) ? q.erklaerungen.filter((e) => typeof e === "string") : [],
      lerninfo: typeof q.lerninfo === "string" ? q.lerninfo : "",
      quellen,
    });
  });
  if (!fragen.length) {
    throw new Error("Die Modellantwort enthielt keine verwertbaren Fragen.");
  }
  const zeit = Math.round(Number(result.empfohlene_zeit_minuten));
  return {
    titel: typeof result.titel === "string" && result.titel.trim() ? result.titel.trim() : "Einstellungstest",
    empfohlene_zeit_minuten: Number.isFinite(zeit) && zeit > 0 ? zeit : 0,
    fragen,
  };
}

function normalizeEvalData(result) {
  if (!result || typeof result !== "object") {
    throw new Error("Die Auswertung des Modells hatte nicht die erwartete Form.");
  }
  const g = result.gesamt && typeof result.gesamt === "object" ? result.gesamt : {};
  let prozent = Math.round(Number(g.prozent));
  if (!Number.isFinite(prozent)) prozent = 0;
  prozent = Math.max(0, Math.min(100, prozent));
  const strArr = (v) => (Array.isArray(v) ? v.filter((x) => typeof x === "string") : []);
  return {
    ergebnisse: Array.isArray(result.ergebnisse)
      ? result.ergebnisse.filter((e) => e && typeof e === "object")
      : [],
    gesamt: {
      prozent,
      zusammenfassung: typeof g.zusammenfassung === "string" ? g.zusammenfassung : "",
      staerken: strArr(g.staerken),
      verbesserungen: strArr(g.verbesserungen),
    },
  };
}

/* ---------- LLM-Aufruf (Anthropic / OpenAI) ---------- */

// Liest einen SSE-Stream und sammelt die per extractDelta gelieferten
// Textstuecke; onChunk bekommt nach jedem Stueck den bisherigen Gesamttext
async function readSSEText(res, extractDelta, onChunk) {
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buf = "";
  let acc = "";

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });
    const lines = buf.split("\n");
    buf = lines.pop();
    for (const line of lines) {
      if (!line.startsWith("data:")) continue;
      const payload = line.slice(5).trim();
      if (!payload || payload === "[DONE]") continue;
      let data;
      try {
        data = JSON.parse(payload);
      } catch {
        continue;
      }
      const delta = extractDelta(data);
      if (delta) {
        acc += delta;
        if (onChunk) onChunk(acc);
      }
    }
  }
  return acc;
}

async function callLLM(systemPrompt, userPrompt, schema, onProgress) {
  const provider = settings.provider || "anthropic";
  // Lokale Modelle brauchen keinen Key (laufen ohne Anbieter-Konto).
  if (provider !== "local" && !settings.apiKey) {
    throw new Error("Kein API-Key hinterlegt. Bitte zuerst die Einstellungen ausfüllen.");
  }

  let model;
  if (provider === "local") {
    model = (settings.model || "").trim();
    if (!model) {
      throw new Error("Kein lokales Modell ausgewählt. Bitte in den Einstellungen ein Modell laden und auswählen.");
    }
  } else {
    const catalog = modelsFor(provider);
    model = catalog.some((m) => m.id === settings.model) ? settings.model : catalog[0].id;
  }

  if (provider === "anthropic") {
    const catalog = modelsFor(provider);
    // Per-Modell-Tuning: Sonnet denkt bei dieser Aufgabe sonst minutenlang
    // (gemessen ~148s vor dem ersten Token); Opus bleibt auf dem
    // Qualitaets-Default
    const outputConfig = { format: { type: "json_schema", schema } };
    const entry = catalog.find((m) => m.id === model);
    if (entry && entry.effort) outputConfig.effort = entry.effort;

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
        stream: true,
        thinking: { type: "adaptive" },
        system: systemPrompt,
        messages: [{ role: "user", content: userPrompt }],
        output_config: outputConfig,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => null);
      throw new Error(apiErrorMessage(res.status, err?.error?.message));
    }

    let stopReason = null;
    // input_tokens kommt im message_start, die finalen output_tokens (inkl.
    // Denk-Tokens) im message_delta; Cache-Tokens zaehlen wir zum Input
    let inputTokens = 0;
    let outputTokens = 0;
    const text = await readSSEText(
      res,
      (d) => {
        if (d.type === "message_start" && d.message?.usage) {
          const u = d.message.usage;
          inputTokens = (u.input_tokens || 0) +
            (u.cache_creation_input_tokens || 0) + (u.cache_read_input_tokens || 0);
          outputTokens = u.output_tokens || 0;
        }
        if (d.type === "message_delta") {
          if (d.delta?.stop_reason) stopReason = d.delta.stop_reason;
          if (d.usage?.output_tokens != null) outputTokens = d.usage.output_tokens;
        }
        if (d.type === "content_block_delta" && d.delta?.type === "text_delta") return d.delta.text;
        return "";
      },
      onProgress
    );

    if (stopReason === "refusal") {
      throw new Error("Die Anfrage wurde vom Modell abgelehnt. Bitte Stellenbeschreibung prüfen.");
    }
    if (!text) throw new Error("Leere Antwort vom Modell erhalten.");
    return {
      data: parseJsonLoose(text),
      cost: callCost(model, inputTokens, outputTokens),
      tokens: { input: inputTokens, output: outputTokens },
    };
  }

  // OpenAI, DeepSeek und lokale Modelle (Ollama / LM Studio) sprechen alle
  // dieselbe OpenAI-kompatible Chat-Completions-API.
  const isDeepseek = provider === "deepseek";
  const isLocal = provider === "local";
  // Weder DeepSeek noch die meisten lokalen Modelle beherrschen striktes
  // JSON-Schema zuverlaessig - dort wird das Schema in den Prompt gelegt.
  const embedSchema = isDeepseek || isLocal;
  const endpoint = isLocal
    ? localBaseUrl() + "/chat/completions"
    : isDeepseek
    ? "https://api.deepseek.com/chat/completions"
    : "https://api.openai.com/v1/chat/completions";

  const body = {
    model,
    stream: true,
    // Liefert am Stream-Ende einen Usage-Block (prompt_/completion_tokens)
    stream_options: { include_usage: true },
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  };

  if (embedSchema) {
    // Schema zusaetzlich in den Prompt geben: dient als Fallback, wenn der
    // Server kein striktes response_format unterstuetzt (DeepSeek, aeltere
    // lokale Server). parseJsonLoose toleriert dann Beiwerk.
    body.messages[0].content +=
      "\n\nAntworte ausschliesslich mit einem JSON-Objekt, das exakt diesem JSON-Schema entspricht (keine Erklaerungen, kein Markdown):\n" +
      JSON.stringify(schema);
    if (model === "deepseek-chat") {
      // DeepSeek-Chat kennt nur den JSON-Modus, kein striktes json_schema.
      body.response_format = { type: "json_object" };
    } else if (isLocal) {
      // LM Studio (und neuere Ollama) erzwingen mit json_schema ueber eine
      // Grammatik garantiert valides, schema-konformes JSON. Aeltere Server
      // lehnen es mit HTTP 400 ab; das faengt der Fallback unten ab.
      body.response_format = {
        type: "json_schema",
        json_schema: { name: "ergebnis", strict: true, schema },
      };
    }
  } else {
    body.response_format = {
      type: "json_schema",
      json_schema: { name: "ergebnis", strict: true, schema },
    };
  }

  const headers = { "Content-Type": "application/json" };
  // Lokale Server brauchen keinen Key; ist trotzdem einer gesetzt (manche
  // LM-Studio-Konfigurationen), wird er mitgeschickt.
  if (settings.apiKey) headers.Authorization = `Bearer ${settings.apiKey}`;

  const localConnError = "Keine Verbindung zum lokalen Modellserver. Läuft Ollama bzw. LM Studio, und ist die Adresse in den Einstellungen korrekt? Bei Aufruf über https muss der Server zudem Cross-Origin-Anfragen dieser Seite erlauben (z. B. OLLAMA_ORIGINS).";
  const doPost = () => fetch(endpoint, { method: "POST", headers, body: JSON.stringify(body) });

  let res;
  try {
    res = await doPost();
  } catch (e) {
    if (isLocal) throw new Error(localConnError);
    throw e;
  }

  // Fallback: Aeltere lokale Server kennen response_format (json_schema) nicht
  // und antworten mit HTTP 400. Dann einmal ohne response_format wiederholen -
  // das Schema steckt ohnehin im Prompt. Der 400 kommt vor der Generierung,
  // der Retry kostet also praktisch nichts.
  if (!res.ok && res.status === 400 && isLocal && body.response_format) {
    delete body.response_format;
    try {
      res = await doPost();
    } catch (e) {
      throw new Error(localConnError);
    }
  }

  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(apiErrorMessage(res.status, err?.error?.message));
  }

  // Der Usage-Block kommt als letzter Chunk (choices ist dann leer)
  let inputTokens = 0;
  let outputTokens = 0;
  // "length" => Antwort wurde am Token-/Kontextlimit abgeschnitten und ist
  // unvollstaendig; das JSON liesse sich dann nicht sauber parsen.
  let finishReason = null;
  const text = await readSSEText(
    res,
    (d) => {
      if (d.usage) {
        if (d.usage.prompt_tokens != null) inputTokens = d.usage.prompt_tokens;
        if (d.usage.completion_tokens != null) outputTokens = d.usage.completion_tokens;
      }
      if (d.choices?.[0]?.finish_reason) finishReason = d.choices[0].finish_reason;
      return d.choices?.[0]?.delta?.content || "";
    },
    onProgress
  );

  // Abgeschnitten zuerst pruefen: klare Meldung statt eines kryptischen
  // JSON-Parse-Fehlers - und auch dann, wenn ein Reasoning-Modell die Tokens
  // ganz im Denkteil verbraucht hat und der sichtbare Text leer blieb.
  if (finishReason === "length") {
    throw new Error(isLocal
      ? "Die Antwort wurde abgeschnitten - die Kontextlänge des lokalen Modells reicht für so viele Fragen nicht. Wähle weniger Fragen oder lade das Modell mit größerer Kontextlänge (in LM Studio beim Laden des Modells einstellbar)."
      : "Die Antwort wurde abgeschnitten, weil das Token-Limit erreicht wurde. Bitte mit weniger Fragen erneut versuchen.");
  }
  if (!text) throw new Error("Leere Antwort vom Modell erhalten.");
  return {
    data: parseJsonLoose(text),
    cost: callCost(model, inputTokens, outputTokens),
    tokens: { input: inputTokens, output: outputTokens },
  };
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

// LinkedIn-Jobseiten (/jobs/view/<id>, ?currentJobId=<id>) sind hinter einer
// Login-/Verwandte-Jobs-Hülle versteckt - der Reader liefert dort viel
// Navigations-Rauschen. Die Job-ID erlaubt den Zugriff auf den serverseitig
// gerenderten Gast-Endpunkt, der nur die reine Stellenbeschreibung enthält.
function linkedinJobId(u) {
  const q = u.searchParams.get("currentJobId");
  if (q && /^\d+$/.test(q)) return q;
  const m = u.pathname.match(/\/jobs\/view\/(?:[^/]*-)?(\d{6,})/);
  return m ? m[1] : null;
}

// Indeed-URLs enthalten den Job-Key als jk (Detailseite) oder vjk (aus der
// Trefferliste). Die kanonische viewjob-URL ist die sauberste Variante.
function indeedJobKey(u) {
  const jk = u.searchParams.get("jk") || u.searchParams.get("vjk");
  return jk && /^[0-9a-f]+$/i.test(jk) ? jk : null;
}

// Arbeitsagentur-Jobsuche: Aus der Trefferliste kopierte Links zeigen auf
// /jobsuche/suche?...&id=<Referenznummer> - der Reader liefert dort die ganze
// Liste mit hunderten Treffern als Rauschen statt der gewählten Anzeige. Die
// Referenznummer (id-Parameter oder /jobsuche/jobdetail/<refnr>) identifiziert
// die einzelne, serverseitig gerenderte Detailseite mit nur diesem Inserat.
function arbeitsagenturRef(u) {
  const m = u.pathname.match(/\/jobsuche\/jobdetail\/([\w-]+)/i);
  if (m) return m[1];
  const id = u.searchParams.get("id");
  return id && /^[\w-]+$/.test(id) ? id : null;
}

// Manche Jobportale sind reine JavaScript-Apps, deren Inhalt der Reader nicht
// sieht. Für bekannte Portale gibt es serverseitig gerenderte Alternativ-URLs,
// die zuerst versucht werden.
function candidateUrls(url) {
  const list = [url];
  try {
    const u = new URL(url);
    // Onlyfy (Prescreen): Print-Version enthält die volle Anzeige
    const m = u.pathname.match(/\/job\/([a-z0-9]+)/i);
    if (/(^|\.)onlyfy\.jobs$/i.test(u.hostname) && m) {
      list.unshift(u.origin + "/candidate/job/print/" + m[1] + "?mode=print");
    }
    // LinkedIn: Gast-Endpunkt mit der reinen Beschreibung zuerst versuchen
    if (/(^|\.)linkedin\.com$/i.test(u.hostname)) {
      const id = linkedinJobId(u);
      if (id) {
        list.unshift("https://www.linkedin.com/jobs-guest/jobs/api/jobPosting/" + id);
      }
    }
    // Indeed: auf die kanonische viewjob-URL ohne Tracking-Parameter normalisieren
    if (/(^|\.)indeed\.com$/i.test(u.hostname)) {
      const jk = indeedJobKey(u);
      if (jk) {
        list.unshift(u.origin + "/viewjob?jk=" + jk);
      }
    }
    // StepStone: die normale Anzeige lädt den Beschreibungstext per JavaScript
    // nach; die -inline-Variante ist serverseitig gerendert und vollständig.
    if (/(^|\.)stepstone\.de$/i.test(u.hostname)) {
      const m = u.pathname.match(/--(\d+)\.html$/);
      if (m) {
        list.unshift(u.origin + u.pathname.replace(/--(\d+)\.html$/, "--$1-inline.html"));
      }
    }
    // Arbeitsagentur: statt der Trefferliste die Detailseite zur Referenznummer laden
    if (/(^|\.)arbeitsagentur\.de$/i.test(u.hostname)) {
      const ref = arbeitsagenturRef(u);
      const detail = "https://www.arbeitsagentur.de/jobsuche/jobdetail/" + ref;
      if (ref && detail !== url) {
        list.unshift(detail);
      }
    }
  } catch {
    // ungültige URL: unverändert versuchen, Fehler kommt dann vom fetch
  }
  return list;
}

// Entfernt offensichtliches Webseiten-Rauschen aus dem extrahierten Markdown
// (Bilder, Link-Syntax, Trennlinien) - Jobportale wie Stepstone liefern sonst
// viel Navigation und Logos mit
function cleanPageText(text) {
  return text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")      // Bilder
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")   // Links -> nur Linktext
    .replace(/^[ \t]*\*( \*)+[ \t]*$/gm, "")   // Trennlinien (* * *)
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// Bot-Schutz (z. B. Cloudflare bei Indeed) liefert eine Challenge- oder
// Fehlerseite, die der Reader als kurzen Text durchreicht. Solche Seiten dürfen
// nie als Stellenbeschreibung durchgehen - sonst entstehen Fragen aus Müll.
function looksBlocked(text) {
  return /Just a moment\.\.\.|Attention Required|Enable JavaScript and cookies to continue|cf-browser-verification|challenge-platform|Warning: Target URL returned error (4|5)\d\d/i.test(text);
}

// Heuristik: App-Hüllen sind kurz oder tragen Jina-Warnungen zu iframes/Shadow DOM
function looksLikeRealContent(text) {
  // Fehlgeschlagene Zielabrufe ("Warning: Target URL returned error <code>")
  // und Bot-Schutz-Seiten fängt looksBlocked ab - sonst rutscht eine plausibel
  // lange 404-/Challenge-Seite ungewarnt als Stellentext durch.
  return text.length > 1200 && !looksBlocked(text) && !/contains (iframe|shadow DOM)/i.test(text);
}

// LinkedIn-Anzeigen kommen mit enormem Rauschen (wiederholte Sign-in-Blöcke,
// "Similar jobs", "People also viewed", Footer, Sprachliste). Diese Funktion
// schneidet auf den eigentlichen Anzeigentext zu. Wird nur für linkedin.com
// angewandt, damit andere Portale unberührt bleiben.
function cleanLinkedIn(text) {
  let t = text;
  // Sign-in-/Join-Blöcke (Überschrift bis zur "By clicking Continue..."-Zeile)
  t = t.replace(
    /^#{1,6}\s*(?:Join or sign in|Sign in to)[\s\S]*?By clicking Continue to join or sign in[^\n]*\n?/gim,
    ""
  );
  // Alles ab dem Empfehlungs-/Footer-Bereich abschneiden (kommt nach dem Text).
  // Seniority/Employment/Job function/Industries bleiben so erhalten.
  const cut = t.search(
    /Referrals increase your chances|^##\s*Similar jobs|^##\s*People also viewed/im
  );
  if (cut > 0) t = t.slice(0, cut);
  return t;
}

async function fetchJobFromUrl(url) {
  // r.jina.ai liefert beliebige Webseiten als Markdown-Text mit offenen CORS-Headern
  let isLinkedIn = false;
  try {
    isLinkedIn = new URL(url).hostname.endsWith("linkedin.com");
  } catch {
    // ungültige URL: keine Sonderbehandlung
  }
  let best = "";
  let lastStatus = 0;
  let blocked = false;
  for (const u of candidateUrls(url)) {
    const res = await fetch("https://r.jina.ai/" + u);
    if (!res.ok) {
      lastStatus = res.status;
      continue;
    }
    let text = await res.text();
    if (isLinkedIn) text = cleanLinkedIn(text);
    if (looksLikeRealContent(text)) return text;
    if (looksBlocked(text)) {
      blocked = true;
      continue; // Challenge-/Fehlerseite nie als "best" merken
    }
    if (text.length > best.length) best = text;
  }
  if (!best) {
    if (blocked) {
      throw new Error("Die Seite ist durch einen Bot-Schutz gesichert und lässt sich nicht automatisch auslesen (häufig bei Indeed). Bitte die Stellenbeschreibung manuell einfügen.");
    }
    throw new Error("Die Seite konnte nicht geladen werden (HTTP " + lastStatus + "). Bitte Text manuell einfügen.");
  }
  return best;
}

/* ---------- Fragen generieren ---------- */

// Schuetzt laufende Lade-/LLM-Aktionen vor doppeltem Ausloesen: Das
// Lade-Overlay blockt nur Zeiger-Eingaben, der ausloesende Button behaelt
// aber den Fokus - erneutes Enter wuerde sonst einen zweiten, parallelen
// (und bei LLM-Aufrufen kostenpflichtigen) Request starten.
let actionRunning = false;

// Zuletzt per URL geladene Anzeige (URL und der daraus erzeugte Text). Dient
// dazu, einer Stelle eine stabile, von der URL abgeleitete Identität (urlKey)
// zu geben - aber nur solange der geladene Text nicht manuell ersetzt wurde.
let lastFetch = { url: "", text: "" };

/* ---------- Eingabe-Entwurf (localStorage) ---------- */

// Hält den zuletzt geladenen/eingegebenen Stand des Eingabe-Bildschirms über
// Reloads und Versions-Updates hinweg fest: URL-Feld, Anzeigentext, aktiver
// Tab und vor allem lastFetch. Letzteres ist die Brücke, über die eine per URL
// geladene Stelle ihre stabile Identität (urlKey) an den erzeugten Fragebogen
// weitergibt. Ginge der Stand beim Update verloren, bekäme dieselbe Stelle beim
// erneuten Laden einen anderen Text-Hash und damit einen neuen Eintrag in der
// Historie, statt die Versuche bei der bestehenden Stelle fortzuschreiben.
// Neuer, optionaler Storage-Key - bestehende Daten bleiben unberührt.
const DRAFT_KEY = "bewerbungstool.draft";

function saveDraft() {
  try {
    localStorage.setItem(
      DRAFT_KEY,
      JSON.stringify({
        url: $("job-url").value,
        text: $("job-text").value,
        // Aktiver Tab: source-url ist sichtbar -> URL-Tab, sonst Text-Tab
        tab: $("source-url").classList.contains("hidden") ? "text" : "url",
        lastFetch,
      }),
    );
  } catch {
    // localStorage voll oder gesperrt: Entwurf ist nur Komfort, nicht kritisch
  }
}

// Entwurf verzoegert sichern, damit nicht jeder Tastendruck schreibt
let draftSaveTimer = 0;
function scheduleDraftSave() {
  clearTimeout(draftSaveTimer);
  draftSaveTimer = setTimeout(saveDraft, 400);
}

function restoreDraft() {
  let draft;
  try {
    draft = JSON.parse(localStorage.getItem(DRAFT_KEY));
  } catch {
    return;
  }
  if (!draft || typeof draft !== "object") return;
  // Defensiv lesen - jedes Feld kann fehlen (aelterer/teilweiser Entwurf)
  if (typeof draft.url === "string") $("job-url").value = draft.url;
  if (typeof draft.text === "string") $("job-text").value = draft.text;
  if (
    draft.lastFetch &&
    typeof draft.lastFetch.url === "string" &&
    typeof draft.lastFetch.text === "string"
  ) {
    lastFetch = { url: draft.lastFetch.url, text: draft.lastFetch.text };
  }
  // Nur auf den URL-Tab schalten, wenn dort wirklich etwas steht - sonst beim
  // Text-Tab bleiben, damit kein leeres URL-Feld den Einstieg verdeckt.
  if (draft.tab === "url" && $("job-url").value.trim()) {
    setSourceTab("url");
  } else if ($("job-text").value.trim()) {
    setSourceTab("text");
  }
}

async function generateQuiz() {
  if (actionRunning) return;
  const jobText = $("job-text").value.trim();
  if (jobText.length < 50) {
    showError("Bitte zuerst eine Stellenanzeige per URL laden oder den Text unter „Text einfügen“ einfügen.");
    return;
  }
  const numQuestions = $("num-questions").value;
  mode = document.querySelector('input[name="mode"]:checked').value;
  const difficulty = document.querySelector('input[name="difficulty"]:checked').value;

  // "schwer" sind die Fragen, die im echten Auswahlverfahren am
  // wahrscheinlichsten drankommen; die Stufe steuert deren Anteil
  const DIFFICULTY_MIX = {
    leicht: "etwa 60% leichte, 30% mittlere und 10% schwere Fragen",
    mittel: "etwa 25% leichte, 45% mittlere und 30% schwere Fragen",
    schwer: "etwa 10% leichte, 30% mittlere und 60% schwere Fragen",
  };

  actionRunning = true;
  showLoading("Fragenkatalog wird erstellt...");
  try {
    const system =
      "Du bist ein erfahrener Recruiter und erstellst realistische Einstellungstests. " +
      "Erstelle präzise, anspruchsvolle Fragen, die exakt auf die gegebene Stelle zugeschnitten sind. " +
      "Mische Fachfragen, situative Fragen und Soft-Skill-Fragen. " +
      "Etwa die Hälfte der Fragen soll Multiple-Choice sein (4 plausible Optionen, genau eine ist die beste), " +
      "der Rest offene Fragen. " +
      "Ordne jeder Frage eine Schwierigkeit zu: 'schwer' sind Fragen, wie sie im echten Auswahlverfahren " +
      "oder Vorstellungsgespräch für genau diese Stelle am wahrscheinlichsten gestellt werden - realistisch, " +
      "spezifisch und anspruchsvoll. 'mittel' sind solide Fachfragen, 'leicht' sind Grundlagen- und Einstiegsfragen. " +
      `Stelle die Mischung so zusammen: ${DIFFICULTY_MIX[difficulty]}. ` +
      "Gib zu jeder Frage die korrekte Antwort an (bei Multiple-Choice exakt den Wortlaut der besten Option, " +
      "bei offenen Fragen eine knappe Musterantwort), bei Multiple-Choice zu jeder Option eine kurze Erklärung, " +
      "warum sie richtig oder falsch ist, einen lernrelevanten Hintergrund (lerninfo) sowie 1 bis 3 Quellen zur Vertiefung. " +
      "Nenne nur real existierende Quellen (Gesetze, Normen, Standardwerke, offizielle Dokumentation, etablierte Fachseiten). " +
      "Gib die URL einer Quelle nur an, wenn du dir sicher bist, dass sie existiert - bevorzugt Startseiten oder bekannte, " +
      "stabile Adressen, keine tief verschachtelten Links. Sonst lasse die URL leer und waehle einen praegnanten Titel, " +
      "der sich gut als Suchbegriff eignet. " +
      "Schätze ausserdem ein realistisches Zeitlimit in Minuten für den gesamten Test. " +
      "Der folgende Text stammt oft von einer Jobportal-Seite und kann Navigation, Cookie-Hinweise, " +
      "Unternehmens-Werbung, Fusszeilen und Teaser zu ähnlichen Stellen enthalten. Ignoriere all das " +
      "und beziehe dich ausschliesslich auf die eigentliche Stellenanzeige. Enthält der Text mehrere " +
      "Stellen, nimm die mit Abstand am ausführlichsten beschriebene. Antworte auf Deutsch.";

    const user =
      `Erstelle einen Einstellungstest mit genau ${numQuestions} Fragen zu dieser Stellenausschreibung:\n\n` +
      jobText.slice(0, 30000);

    const total = Number(numQuestions);
    setLoadingProgress(0, total, "Das Modell liest die Stellenanzeige...");
    const { data: result, cost: genCost, tokens: genTokens } = await callLLM(system, user, QUESTIONS_SCHEMA, (acc) => {
      // Jede fertige Frage hat im gestreamten JSON genau einen "frage"-Schluessel
      const seen = (acc.match(/"frage"\s*:/g) || []).length;
      setLoadingProgress(seen, total, seen > 0
        ? `Frage ${Math.min(seen, total)} von ${total} wird erstellt...`
        : "Fragenkatalog wird erstellt...");
    });
    // Defensiv gegen Modelle ohne striktes Schema (DeepSeek, lokale Modelle):
    // Form pruefen und harmlose Luecken auffuellen, statt spaeter beim Rendern
    // an einem fehlenden Feld zu scheitern
    quiz = normalizeQuizData(result);
    quiz.jobText = jobText;
    // Stabile Stellen-Identität aus der Quell-URL mitführen, solange der geladene
    // Text seit dem Laden nicht von Hand verändert wurde - sonst kann die URL
    // nicht mehr für diesen Text bürgen (z. B. anderer Job manuell eingefügt).
    if (lastFetch.url && jobText === lastFetch.text) {
      const uk = urlKeyOf(lastFetch.url);
      if (uk) {
        quiz.urlKey = uk;
        quiz.jobUrl = lastFetch.url;
      }
    }
    quiz.schwierigkeitsgrad = difficulty;
    // Kosten der Fragenerstellung (inkl. Verarbeitung der Stellenanzeige) bis
    // zur Auswertung am Quiz mitfuehren, damit der Gesamtpreis je Fragebogen
    // gespeichert werden kann
    quiz.genCost = genCost;
    // Token-Verbrauch der Erstellung mitfuehren - bei lokalen Modellen gibt es
    // keinen Preis, dort dient die Token-Zahl als Verbrauchsanzeige
    quiz.genTokens = genTokens;
    answers = new Array(quiz.fragen.length).fill("");
    revealed = new Array(quiz.fragen.length).fill(false);
    current = 0;
    reviewing = false;
    startTime = Date.now();

    if (mode === "pruefung") {
      startTimer(computeTimeLimitMin(quiz));
    } else {
      // Lernmodus hat kein Zeitlimit - Timerzustand vollstaendig zuruecksetzen,
      // damit kein „ueberzogen“ oder altes Limit aus einer frueheren Pruefung
      // am Lern-Versuch haengen bleibt
      stopTimer();
      timer.overtime = false;
      timer.limitMin = 0;
      timer.deadline = 0;
      $("quiz-timer").classList.add("hidden");
    }

    renderQuestion();
    showView("view-quiz");
  } catch (e) {
    showError(e.message);
  } finally {
    actionRunning = false;
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

// Ueberzieh-Modus: der Timer laeuft weiter und zaehlt hoch, der Versuch gilt
// als ueberzogen. Idempotent, damit kein zweites Intervall entsteht.
function enterOvertime() {
  timer.overtime = true;
  if (!timer.intervalId) timer.intervalId = setInterval(updateTimerDisplay, 1000);
  updateTimerDisplay();
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
    // Fokus in den Dialog setzen, damit Tastatur-/Screenreader-Nutzer ihn
    // mitbekommen und nicht die Seite dahinter weiterbedienen
    $("btn-timeout-submit").focus();
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

  // Schwierigkeit nur im Lernmodus sichtbar
  const diffEl = $("question-difficulty");
  if (mode === "lernen" && q.schwierigkeit) {
    diffEl.textContent = difficultyLabel(q.schwierigkeit);
    diffEl.className = "diff-badge " + q.schwierigkeit;
  } else {
    diffEl.className = "diff-badge hidden";
  }

  const area = $("answer-area");
  area.innerHTML = "";

  // Beim Durchgehen eines bewerteten Fragebogens sind Antworten gesperrt.
  // Eine im Lernmodus aufgeloeste Frage friert ihre Antwort ein - aber nur,
  // wenn schon eine gegeben wurde. Sonst bliebe eine ohne Antwort aufgeloeste
  // Frage fuer immer unbeantwortbar (man kommt per Zurueck nicht mehr rein).
  const hasAnswer = (answers[current] || "").trim() !== "";
  const locked = (isRevealed && hasAnswer) || reviewing;

  if (q.typ === "multiple_choice") {
    q.optionen.forEach((opt, idx) => {
      const btn = document.createElement("button");
      let cls = "option";
      if (answers[current] === opt) cls += " selected";
      if (isRevealed) {
        // Versuche aus aelteren Versionen koennen Felder wie korrekte_antwort
        // noch nicht haben - Anzeige darf daran nie scheitern
        if (opt.trim() === (q.korrekte_antwort || "").trim()) cls += " correct";
        else if (answers[current] === opt) cls += " wrong";
      }
      btn.className = cls;
      btn.textContent = opt;
      // Auswahlzustand auch fuer Screenreader, nicht nur als CSS-Klasse
      btn.setAttribute("aria-pressed", answers[current] === opt ? "true" : "false");
      if (!locked) {
        btn.addEventListener("click", () => {
          answers[current] = opt;
          renderQuestion();
          // Das Neuzeichnen ersetzt alle Buttons - den Fokus auf die gewaehlte
          // Option zurueckgeben, sonst landet er auf <body> (Tastaturbedienung)
          const fresh = $("answer-area").children[idx];
          if (fresh) fresh.focus();
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
    ta.readOnly = locked;
    ta.addEventListener("input", () => (answers[current] = ta.value));
    area.appendChild(ta);
  }

  renderLearnArea(q, isRevealed);

  $("btn-prev").disabled = current === 0;
  $("btn-next").textContent =
    current === total - 1 ? (reviewing ? "Zur Auswertung" : "Auswerten") : "Weiter";
}

// Quelle als klickbarer Link: direkte URL, wenn das Modell sich sicher war,
// sonst eine Websuche nach dem Quellentitel (vermeidet erfundene, tote Links)
function sourceAnchor(src) {
  const titel = (typeof src === "string" ? src : src.titel || src.url || "").trim();
  let url = (typeof src === "string" ? "" : src.url || "").trim();
  const isSearch = !/^https?:\/\//i.test(url);
  if (isSearch) {
    url = "https://duckduckgo.com/?q=" + encodeURIComponent(titel);
  }
  const a = document.createElement("a");
  a.href = url;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.textContent = titel + (isSearch ? " (Suche)" : "");
  return a;
}

function difficultyLabel(value) {
  return { leicht: "Leicht", mittel: "Mittel", schwer: "Schwer" }[value] || value;
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
      // Fokus in die neue Erklaerungsbox setzen, damit Tastatur- und
      // Screenreader-Nutzer direkt bei der Aufloesung weiterlesen
      const box = $("learn-area").querySelector(".learn-box");
      if (box) {
        box.setAttribute("tabindex", "-1");
        box.focus();
      }
    });
    area.appendChild(btn);
    return;
  }

  const box = document.createElement("div");
  box.className = "learn-box";

  const answerLine = document.createElement("p");
  answerLine.className = "learn-answer";
  answerLine.textContent =
    (q.typ === "multiple_choice" ? "Richtige Antwort: " : "Musterantwort: ") + (q.korrekte_antwort || "");
  box.appendChild(answerLine);

  const erklaerungen = Array.isArray(q.erklaerungen) ? q.erklaerungen : [];
  if (q.typ === "multiple_choice" && erklaerungen.length) {
    const ul = document.createElement("ul");
    ul.className = "option-explanations";
    q.optionen.forEach((opt, i) => {
      if (!erklaerungen[i]) return;
      const li = document.createElement("li");
      const isCorrect = opt.trim() === (q.korrekte_antwort || "").trim();
      li.className = isCorrect ? "exp-correct" : "exp-wrong";
      li.textContent = `${opt} – ${erklaerungen[i]}`;
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
      li.appendChild(sourceAnchor(src));
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
  } else if (reviewing) {
    // Bereits bewertet: zurueck zur gespeicherten Auswertung, keine neue Bewertung
    showView("view-result");
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
  if (actionRunning) return;
  const unanswered = answers.filter((a) => !a.trim()).length;
  // Bei unbeantworteten Fragen erst im UI-Modal rueckfragen (kein blockierendes
  // natives confirm()). runEvaluation() laeuft erst nach Bestaetigung; das
  // Abbrechen erledigt closeConfirmEval (inkl. Rueckkehr in den Ueberzieh-Modus).
  if (unanswered > 0) {
    openConfirmEval(unanswered);
    return;
  }
  runEvaluation();
}

async function runEvaluation() {
  if (actionRunning) return;
  stopTimer();
  $("timeout-modal").classList.add("hidden");
  const durationMs = Date.now() - startTime;

  actionRunning = true;
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

    const total = quiz.fragen.length;
    setLoadingProgress(0, total, "Das Modell prüft deine Antworten...");
    const { data: rawResult, cost: evalCost, tokens: evalTokens } = await callLLM(system, user, EVAL_SCHEMA, (acc) => {
      const seen = (acc.match(/"feedback"\s*:/g) || []).length;
      setLoadingProgress(seen, total, seen > 0
        ? `Antwort ${Math.min(seen, total)} von ${total} wird bewertet...`
        : "Antworten werden ausgewertet...");
    });
    // Form absichern, bevor gespeichert/gerendert wird: ohne striktes Schema
    // (DeepSeek, lokale Modelle) koennte z. B. das gesamt-Objekt fehlen, was
    // beim Speichern (result.gesamt.prozent) sonst einen Absturz ausloest
    const result = normalizeEvalData(rawResult);
    saveAttempt(result, durationMs, evalCost, evalTokens);
    renderResult(result, durationMs);
    // Spielfortschritt dieser Stelle; frisch freigeschaltete Abzeichen und ein
    // Levelaufstieg werden gegen den Stand vor diesem Versuch hervorgehoben.
    const job = loadHistory().jobs.find((j) => j.key === jobKey(quiz.jobText));
    if (job) {
      const after = computeJobProgress(job);
      const before = computeJobProgress({ attempts: job.attempts.slice(0, -1) });
      const earnedBefore = new Set(before.badges.filter((b) => b.earned).map((b) => b.id));
      const newBadges = after.badges.filter((b) => b.earned && !earnedBefore.has(b.id)).map((b) => b.id);
      // Im Lernmodus zur Prüfung ermutigen, sobald mehrere gute Läufe in Folge
      // sitzen – dort gibt es die Leistungsabzeichen und das echte Zeitgefühl.
      const suggestExam = mode === "lernen" && lernGoodStreak(job.attempts) >= LERN_HINT_STREAK;
      renderResultGami(job, { leveledUp: after.level > before.level, highlightBadges: newBadges, suggestExam });
    }
    showView("view-result");
  } catch (e) {
    showError(e.message);
  } finally {
    actionRunning = false;
    hideLoading();
  }
}

// Score-Ring (SVG) in #result-score zeichnen. Liest defensiv: Prozent ist
// immer vorhanden; die Punkte-Unterzeile wird nur gezeigt, wenn ergebnisse da
// sind (alte Historie-Eintraege bleiben damit kompatibel).
function renderScoreRing(prozent, ergebnisse) {
  const el = $("result-score");
  const pct = Math.max(0, Math.min(100, Math.round(Number(prozent) || 0)));
  const C = 364.42; // Umfang bei r=58
  const target = C * (1 - pct / 100);

  let sub = "";
  if (Array.isArray(ergebnisse) && ergebnisse.length) {
    const sum = ergebnisse.reduce((a, e) => a + (e && typeof e.punkte === "number" ? e.punkte : 0), 0);
    sub = `${sum} / ${ergebnisse.length * 10} Punkte`;
  }

  el.setAttribute("role", "img");
  el.setAttribute("aria-label", `Ergebnis ${pct} Prozent`);
  el.innerHTML = `
    <svg class="score-ring-svg" width="152" height="152" viewBox="0 0 152 152" aria-hidden="true">
      <circle class="score-ring-track" cx="76" cy="76" r="58"></circle>
      <circle class="score-ring-progress" cx="76" cy="76" r="58" stroke-dasharray="${C}" stroke-dashoffset="${C}"></circle>
    </svg>
    <div class="score-ring-center">
      <span class="score-ring-pct">${pct}<i>%</i></span>
      ${sub ? `<span class="score-ring-sub">${sub}</span>` : ""}
    </div>`;

  const prog = el.querySelector(".score-ring-progress");
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    prog.style.strokeDashoffset = String(target);
  } else {
    // zwei Frames warten, damit der Browser den Startzustand (voller Offset)
    // uebernimmt und dann zum Ziel animiert
    requestAnimationFrame(() => requestAnimationFrame(() => {
      prog.style.strokeDashoffset = String(target);
    }));
  }
}

function renderResult(result, durationMs) {
  // Versuche aus aelteren Versionen koennen Teile der Auswertung nicht haben
  // (z. B. ergebnisse/staerken) - alles hier liest deshalb defensiv
  const g = result.gesamt || {};
  renderScoreRing(g.prozent, result.ergebnisse);
  $("result-summary").textContent = g.zusammenfassung || "";
  // Gamification-Panel wird vom jeweiligen Aufrufer (frische Auswertung bzw.
  // Review) befuellt; hier nur leeren, damit kein Stand stehen bleibt.
  $("result-gami").innerHTML = "";

  const modeLabel = mode === "pruefung" ? "Prüfungsmodus" : "Lernmodus";
  let meta = `${modeLabel} · ${quiz.fragen.length} Fragen · Dauer ${formatMinSec(durationMs)} min`;
  if (mode === "pruefung") {
    meta += ` · Zeitlimit ${timer.limitMin} min` + (timer.overtime ? " (überschritten)" : "");
  }
  if (mode === "lernen" && quiz.schwierigkeitsgrad) {
    meta += ` · Schwierigkeitsgrad ${difficultyLabel(quiz.schwierigkeitsgrad)}`;
  }
  $("result-meta").textContent = meta;

  const fill = (id, items) => {
    const ul = $(id);
    ul.innerHTML = "";
    (Array.isArray(items) ? items : []).forEach((s) => {
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
    const r = (result.ergebnisse || []).find((e) => e && e.id === q.id) || {};
    const div = document.createElement("div");
    div.className = "detail-item";

    // punkte stammt aus der Modellantwort bzw. aus importierten Dateien und
    // landet per innerHTML im DOM - deshalb hart auf eine Zahl zwingen
    // (DeepSeek erzwingt kein Schema, Importe sind beliebig)
    const pts = Number.isFinite(Number(r.punkte))
      ? Math.max(0, Math.min(10, Math.round(Number(r.punkte))))
      : 0;
    const cls = pts >= 7 ? "good" : pts >= 4 ? "mid" : "bad";

    div.innerHTML = `
      <span class="points ${cls}">${pts}/10</span>
      <p class="q"></p>
      <p class="a"></p>
      <p class="fb"></p>
      <p class="fb"></p>
      <p class="fb src"></p>`;
    div.querySelector(".q").textContent = q.frage;
    if (mode === "lernen" && q.schwierigkeit) {
      const badge = document.createElement("span");
      badge.className = "diff-badge " + q.schwierigkeit;
      badge.textContent = difficultyLabel(q.schwierigkeit);
      div.querySelector(".q").appendChild(badge);
    }
    div.querySelector(".a").textContent = "Deine Antwort: " + (answers[i] || "(keine Antwort)");
    div.querySelectorAll(".fb")[0].textContent = r.feedback || "";
    div.querySelectorAll(".fb")[1].textContent = r.musterantwort ? "Musterantwort: " + r.musterantwort : "";
    const srcEl = div.querySelector(".src");
    if (q.quellen && q.quellen.length) {
      srcEl.appendChild(document.createTextNode("Quellen: "));
      q.quellen.forEach((src, n) => {
        if (n > 0) srcEl.appendChild(document.createTextNode(" · "));
        srcEl.appendChild(sourceAnchor(src));
      });
    }
    details.appendChild(div);
  });
}

/* ---------- Gamification (pro Stelle) ---------- */
// Bewusst rein abgeleitet aus den vorhandenen Versuchen einer Stelle: kein
// neuer localStorage-Key, keine Formataenderung. Alles laesst sich jederzeit
// aus job.attempts neu berechnen und bleibt damit abwaertskompatibel. Spielt
// absichtlich nur je Stelle, nicht stellenuebergreifend.

// XP eines Versuchs: das erreichte Prozentergebnis (0-100), strikt als Zahl
// behandelt (alte/importierte Versuche koennen krumme oder fehlende Werte haben).
function attemptXp(att) {
  const p = Math.round(Number(att && att.prozent));
  return Number.isFinite(p) ? Math.max(0, Math.min(100, p)) : 0;
}

// Stufentitel (ohne Emoji, nuechtern-motivierend).
const LEVEL_TITLES = [
  "Einsteiger", "Azubi", "Bewerber", "Routinier", "Profi",
  "Experte", "Ass", "Meister", "Koryphäe", "Legende",
];
function levelTitle(level) {
  return LEVEL_TITLES[Math.min(level, LEVEL_TITLES.length) - 1] || "Legende";
}

// Aus der Gesamt-XP die Stufe ableiten. Jede Stufe kostet 50 XP mehr als die
// davor: Stufe 2 ab 100, 3 ab 250, 4 ab 450 ... (Einstieg leicht, dann
// zunehmend mehr Uebung noetig).
function levelForXp(totalXp) {
  const xp = Math.max(0, Math.round(totalXp) || 0);
  let level = 1, floor = 0, span = 100;
  while (xp >= floor + span) { floor += span; level++; span += 50; }
  return { level, floor, span, xpInLevel: xp - floor, xpForNext: span };
}

// Tagesordinalzahl (lokaler Kalendertag) ueber UTC der lokalen Y/M/D, damit
// Sommer-/Winterzeit die Differenz zwischen zwei Tagen nicht verfaelscht.
function dayOrdinal(ts) {
  const d = new Date(ts);
  return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000);
}

// Aktuelle (am letzten Uebungstag endende) und laengste Serie aufeinander-
// folgender Uebungstage.
function computeStreaks(attempts) {
  const days = [...new Set(attempts.map((a) => dayOrdinal(a.date)))].sort((a, b) => a - b);
  if (!days.length) return { current: 0, best: 0 };
  let best = 1, run = 1;
  for (let i = 1; i < days.length; i++) {
    run = days[i] - days[i - 1] === 1 ? run + 1 : 1;
    if (run > best) best = run;
  }
  let current = 1;
  for (let i = days.length - 1; i > 0; i--) {
    if (days[i] - days[i - 1] === 1) current++; else break;
  }
  return { current, best };
}

// Abzeichen-Katalog. test(s) entscheidet aus den aggregierten Werten einer
// Stelle, ob das Abzeichen verdient ist.
// Leistungs-Abzeichen (Score/Aufwärtstrend) zählen bewusst nur aus dem
// Prüfungsmodus: im Lernmodus lässt sich durch Auflösen leicht ein hoher Wert
// erreichen. Fleiß-Abzeichen (erster Test, Serie, Hartnäckigkeit) bleiben
// modusunabhängig.
const BADGES = [
  { id: "erster-test", label: "Erster Schritt", desc: "Ersten Test zu dieser Stelle gemacht", test: (s) => s.count >= 1 },
  { id: "bestanden", label: "Bestanden", desc: "Im Prüfungsmodus mindestens 50 % erreicht", test: (s) => s.bestExamPct >= 50 },
  { id: "souveraen", label: "Souverän", desc: "Im Prüfungsmodus mindestens 70 % erreicht", test: (s) => s.bestExamPct >= 70 },
  { id: "spitze", label: "Spitzenreiter", desc: "Im Prüfungsmodus mindestens 90 % erreicht", test: (s) => s.bestExamPct >= 90 },
  { id: "aufwaerts", label: "Aufwärtstrend", desc: "Im Prüfungsmodus vom ersten zum letzten Versuch verbessert", test: (s) => s.examImproved },
  { id: "drei-serie", label: "Drei am Stück", desc: "An 3 Tagen in Folge geübt", test: (s) => s.bestStreak >= 3 },
  { id: "hartnaeckig", label: "Hartnäckig", desc: "10 Versuche zu dieser Stelle", test: (s) => s.count >= 10 },
  { id: "ernstfall", label: "Ernstfall", desc: "Sich an eine echte Prüfung gewagt", test: (s) => s.examCount >= 1 },
];

// Aggregiert alle spielrelevanten Werte einer Stelle aus ihren Versuchen.
function computeJobProgress(job) {
  const attempts = (job && Array.isArray(job.attempts) ? job.attempts : []).filter(Boolean);
  const totalXp = attempts.reduce((sum, a) => sum + attemptXp(a), 0);
  const lvl = levelForXp(totalXp);
  const pcts = attempts.map(attemptXp);
  const bestPct = pcts.length ? Math.max(...pcts) : 0;
  const byDate = attempts.slice().sort((a, b) => (a.date || 0) - (b.date || 0));
  const improved = byDate.length >= 2 && attemptXp(byDate[byDate.length - 1]) > attemptXp(byDate[0]);
  // Leistungs-Abzeichen zählen nur Prüfungsversuche (siehe BADGES).
  const examByDate = byDate.filter((a) => a.mode === "pruefung");
  const examPcts = examByDate.map(attemptXp);
  const bestExamPct = examPcts.length ? Math.max(...examPcts) : 0;
  const examImproved = examByDate.length >= 2 && attemptXp(examByDate[examByDate.length - 1]) > attemptXp(examByDate[0]);
  const streak = computeStreaks(attempts);
  const stats = {
    count: attempts.length, bestPct, improved,
    examCount: examByDate.length, bestExamPct, examImproved,
    currentStreak: streak.current, bestStreak: streak.best,
  };
  const badges = BADGES.map((b) => ({ id: b.id, label: b.label, desc: b.desc, earned: !!b.test(stats) }));
  return {
    totalXp, level: lvl.level, title: levelTitle(lvl.level),
    xpInLevel: lvl.xpInLevel, xpForNext: lvl.xpForNext,
    progressPct: lvl.xpForNext ? Math.round((lvl.xpInLevel / lvl.xpForNext) * 100) : 0,
    bestPct, count: attempts.length,
    currentStreak: streak.current, bestStreak: streak.best,
    badges, earnedCount: badges.filter((b) => b.earned).length,
  };
}

// Ab wann ein Lernmodus-Versuch als "gut" gilt und wie viele davon nacheinander
// nötig sind, bevor der Hinweis kommt, es mal mit einer Prüfung zu versuchen.
const LERN_GOOD_PCT = 70;
const LERN_HINT_STREAK = 3;

// Zahl der zuletzt nacheinander gut (>= LERN_GOOD_PCT) im Lernmodus abge-
// schlossenen Versuche, endend beim jüngsten. Ein Prüfungsversuch oder ein
// schwacher Lernversuch unterbricht die Serie. So baut sich der Hinweis nur auf,
// wenn jemand ausschließlich im Lernmodus übt und dort gut ist.
function lernGoodStreak(attempts) {
  const list = (Array.isArray(attempts) ? attempts : []).filter(Boolean)
    .slice().sort((a, b) => (a.date || 0) - (b.date || 0));
  let run = 0;
  for (let i = list.length - 1; i >= 0; i--) {
    const a = list[i];
    if (a.mode === "lernen" && attemptXp(a) >= LERN_GOOD_PCT) run++;
    else break;
  }
  return run;
}

const BADGE_ICON_EARNED =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.1 20.4l1.1-6.5L2.5 8.8l6.5-.9z"/></svg>';
const BADGE_ICON_LOCKED =
  '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';

function buildXpBar(progress) {
  const wrap = document.createElement("div");
  wrap.className = "xp-bar";
  wrap.setAttribute("role", "img");
  wrap.setAttribute("aria-label", `${progress.xpInLevel} von ${progress.xpForNext} XP bis zur nächsten Stufe`);
  const fill = document.createElement("div");
  fill.className = "xp-fill";
  fill.style.width = Math.max(0, Math.min(100, progress.progressPct)) + "%";
  wrap.appendChild(fill);
  return wrap;
}

function buildBadges(progress, highlightIds) {
  const hi = new Set(highlightIds || []);
  const row = document.createElement("div");
  row.className = "badges";
  progress.badges.forEach((b) => {
    const pill = document.createElement("span");
    pill.className = "badge " + (b.earned ? "earned" : "locked") + (hi.has(b.id) ? " new" : "");
    const icon = document.createElement("span");
    icon.className = "badge-icon";
    icon.innerHTML = b.earned ? BADGE_ICON_EARNED : BADGE_ICON_LOCKED;
    const lab = document.createElement("span");
    lab.textContent = b.label + (hi.has(b.id) ? " · neu" : "");
    pill.appendChild(icon);
    pill.appendChild(lab);
    pill.title = b.desc + (b.earned ? "" : " (noch nicht erreicht)");
    row.appendChild(pill);
  });
  return row;
}

// Kompaktes Fortschrittspanel fuer eine Stelle (Historie und Auswertung).
function buildJobProgressPanel(progress, opts) {
  opts = opts || {};
  const panel = document.createElement("div");
  panel.className = "gami";

  const lvl = document.createElement("div");
  lvl.className = "gami-level";
  const chip = document.createElement("span");
  chip.className = "level-chip";
  chip.textContent = "Level " + progress.level;
  const title = document.createElement("strong");
  title.textContent = progress.title;
  lvl.appendChild(chip);
  lvl.appendChild(title);
  if (opts.leveledUp) {
    const up = document.createElement("span");
    up.className = "level-up";
    up.textContent = "aufgestiegen!";
    lvl.appendChild(up);
  }
  panel.appendChild(lvl);

  panel.appendChild(buildXpBar(progress));
  const xpText = document.createElement("p");
  xpText.className = "hint gami-xp";
  xpText.textContent = `${progress.xpInLevel} / ${progress.xpForNext} XP bis Level ${progress.level + 1}`;
  panel.appendChild(xpText);

  const meta = document.createElement("p");
  meta.className = "hint gami-meta";
  const parts = [];
  if (progress.currentStreak >= 2) parts.push(`Serie: ${progress.currentStreak} Tage in Folge`);
  if (progress.bestStreak >= 2) parts.push(`Beste Serie: ${progress.bestStreak} Tage`);
  parts.push(`${progress.earnedCount} von ${progress.badges.length} Abzeichen`);
  meta.textContent = parts.join(" · ");
  panel.appendChild(meta);

  panel.appendChild(buildBadges(progress, opts.highlightBadges));
  return panel;
}

// Fortschrittspanel in der Auswertung; opts hebt frisch freigeschaltete
// Level/Abzeichen hervor und sagt sie fuer Screenreader an.
function renderResultGami(job, opts) {
  const container = $("result-gami");
  if (!container) return;
  container.innerHTML = "";
  if (!job) return;
  opts = opts || {};
  const progress = computeJobProgress(job);

  const heading = document.createElement("h3");
  heading.className = "gami-heading";
  heading.textContent = "Dein Fortschritt bei dieser Stelle";
  container.appendChild(heading);
  container.appendChild(buildJobProgressPanel(progress, opts));

  const fresh = (opts.highlightBadges || []);
  if (opts.leveledUp || fresh.length) {
    const say = [];
    if (opts.leveledUp) say.push(`Neue Stufe erreicht: Level ${progress.level}, ${progress.title}.`);
    if (fresh.length) {
      const names = progress.badges.filter((b) => fresh.includes(b.id)).map((b) => b.label);
      say.push(`Neues Abzeichen: ${names.join(", ")}.`);
    }
    const live = document.createElement("p");
    live.className = "gami-announce";
    live.setAttribute("role", "status");
    live.textContent = say.join(" ");
    container.appendChild(live);
  }

  // Sanfter Anstoß zum Prüfungsmodus nach mehreren guten Lernläufen in Folge.
  if (opts.suggestExam) {
    const tip = document.createElement("p");
    tip.className = "gami-exam-tip";
    tip.setAttribute("role", "status");
    tip.textContent =
      "Stark – mehrere gute Lernläufe hintereinander. Trau dich an eine Prüfung: " +
      "mit Zeitlimit und ohne Auflösen. Die Leistungsabzeichen gibt es nur dort.";
    container.appendChild(tip);
  }
}

/* ---------- Historie (localStorage, pro Stelle gruppiert) ---------- */

// Obergrenzen, damit die Historie (und localStorage) nicht unbegrenzt waechst.
// Gelten beim normalen Speichern und beim Import gleichermassen.
const HISTORY_MAX_JOBS = 20;
const HISTORY_MAX_ATTEMPTS = 20;

function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem("bewerbungstool.history")) || { jobs: [] };
  } catch {
    return { jobs: [] };
  }
}

function saveHistory(h) {
  // Bei vollem Speicher aelteste Versuche verwerfen und erneut versuchen
  for (let i = 0; i < 5; i++) {
    try {
      localStorage.setItem("bewerbungstool.history", JSON.stringify(h));
      return;
    } catch {
      let oldest = null;
      let oldestJob = null;
      h.jobs.forEach((j) => j.attempts.forEach((a) => {
        if (!oldest || a.date < oldest.date) { oldest = a; oldestJob = j; }
      }));
      if (!oldest) return;
      oldestJob.attempts = oldestJob.attempts.filter((a) => a !== oldest);
      h.jobs = h.jobs.filter((j) => j.attempts.length > 0);
    }
  }
}

// Dieselbe Anzeige (gleicher Text) landet immer bei derselben Stelle
// djb2 -> vorzeichenlose Base36-Zeichenkette
function hashStr(s) {
  let hash = 5381;
  for (let i = 0; i < s.length; i++) {
    hash = ((hash << 5) + hash + s.charCodeAt(i)) | 0;
  }
  return (hash >>> 0).toString(36);
}

function jobKey(text) {
  const norm = text.replace(/\s+/g, " ").trim().toLowerCase();
  return "j" + hashStr(norm);
}

// Stabile Identität einer per URL geladenen Stelle: bevorzugt die Job-ID des
// Portals (überlebt wechselnde Tracking-Parameter und leicht abweichenden
// Anzeigentext beim erneuten Laden), sonst die auf Host und Pfad normalisierte
// URL. Liefert null bei leerer oder ungültiger URL.
function canonicalJobUrl(url) {
  let u;
  try {
    u = new URL(url);
  } catch {
    return null;
  }
  if (/(^|\.)linkedin\.com$/i.test(u.hostname)) {
    const id = linkedinJobId(u);
    if (id) return "linkedin:" + id;
  }
  if (/(^|\.)indeed\.com$/i.test(u.hostname)) {
    const jk = indeedJobKey(u);
    if (jk) return "indeed:" + jk.toLowerCase();
  }
  if (/(^|\.)onlyfy\.jobs$/i.test(u.hostname)) {
    const m = u.pathname.match(/\/job\/([a-z0-9]+)/i);
    if (m) return "onlyfy:" + m[1].toLowerCase();
  }
  if (/(^|\.)stepstone\.de$/i.test(u.hostname)) {
    const m = u.pathname.match(/--(\d+)\.html$/);
    if (m) return "stepstone:" + m[1];
  }
  if (/(^|\.)arbeitsagentur\.de$/i.test(u.hostname)) {
    const ref = arbeitsagenturRef(u);
    if (ref) return "arbeitsagentur:" + ref.toLowerCase();
  }
  // Unbekanntes Portal: Host (ohne www) und Pfad ohne Query/Hash/Trailing-Slash
  const host = u.hostname.replace(/^www\./i, "").toLowerCase();
  return host + u.pathname.replace(/\/+$/, "");
}

function urlKeyOf(url) {
  const canon = canonicalJobUrl(url);
  return canon ? "u" + hashStr(canon) : null;
}

// Gesamtkosten eines Fragebogens aus Erstellung und Auswertung; null, wenn
// fuer keinen der beiden Aufrufe Kosten bekannt sind (z. B. eigenes Modell)
function buildCost(genCost, evalCost) {
  const gen = typeof genCost === "number" ? genCost : null;
  const ev = typeof evalCost === "number" ? evalCost : null;
  if (gen === null && ev === null) return null;
  return { gen, eval: ev, total: (gen || 0) + (ev || 0) };
}

// Summe der verbrauchten Tokens (Ein- und Ausgabe) eines callLLM-Aufrufs; 0,
// wenn der Stream keine Verbrauchsdaten geliefert hat.
function tokenSum(t) {
  if (!t || typeof t !== "object") return 0;
  return (t.input || 0) + (t.output || 0);
}

// Gesamter Token-Verbrauch eines Fragebogens (Erstellung + Auswertung); null,
// wenn fuer keinen der beiden Aufrufe Verbrauchsdaten vorliegen. Dient bei
// lokalen Modellen als Anzeige anstelle der nicht vorhandenen Kosten.
function buildTokens(genTokens, evalTokens) {
  const gen = tokenSum(genTokens);
  const ev = tokenSum(evalTokens);
  if (gen === 0 && ev === 0) return null;
  return { gen, eval: ev, total: gen + ev };
}

function saveAttempt(result, durationMs, evalCost, evalTokens) {
  const h = loadHistory();
  const key = jobKey(quiz.jobText);
  const uKey = quiz.urlKey || null;
  // Bei per URL geladenen Stellen zuerst über die stabile URL-Identität suchen:
  // erneutes Laden derselben Anzeige liefert oft leicht abweichenden Text und
  // damit einen anderen Text-key - der urlKey hält die Versuche trotzdem in
  // einer Historie zusammen. Sonst (und für ältere Stellen) der Text-key.
  let job =
    (uKey && h.jobs.find((j) => j.urlKey === uKey)) ||
    h.jobs.find((j) => j.key === key);
  if (!job) {
    job = { key, titel: quiz.titel, jobText: quiz.jobText, attempts: [] };
    h.jobs.unshift(job);
  }
  // urlKey und Quelle nachtragen, sobald bekannt - auch bei Stellen, die früher
  // per Text angelegt wurden. Ab dem nächsten Laden greift dann die
  // URL-Zusammenführung statt des brüchigen Text-keys.
  if (uKey && !job.urlKey) {
    job.urlKey = uKey;
    if (quiz.jobUrl) job.url = quiz.jobUrl;
  }
  job.titel = quiz.titel;

  const cost = buildCost(quiz.genCost, evalCost);
  const tokens = buildTokens(quiz.genTokens, evalTokens);

  const quizCopy = JSON.parse(JSON.stringify(quiz));
  delete quizCopy.jobText; // liegt schon auf dem Job, spart Speicher
  delete quizCopy.genCost; // liegt als cost am Versuch, nicht doppelt sichern
  delete quizCopy.genTokens; // liegt als tokens am Versuch, nicht doppelt sichern
  delete quizCopy.urlKey;  // liegt am Job
  delete quizCopy.jobUrl;  // liegt am Job

  job.attempts.push({
    date: Date.now(),
    mode,
    schwierigkeitsgrad: quiz.schwierigkeitsgrad || "",
    prozent: result.gesamt.prozent,
    durationMs,
    timerLimitMin: timer.limitMin,
    overtime: timer.overtime,
    cost, // { gen, eval, total } in USD; fehlt bei aelteren Versuchen
    tokens, // { gen, eval, total } Token-Verbrauch; v. a. fuer lokale Modelle
    quiz: quizCopy,
    answers: answers.slice(),
    revealed: revealed.slice(),
    result,
  });

  if (job.attempts.length > HISTORY_MAX_ATTEMPTS) job.attempts = job.attempts.slice(-HISTORY_MAX_ATTEMPTS);
  if (h.jobs.length > HISTORY_MAX_JOBS) h.jobs.length = HISTORY_MAX_JOBS;
  saveHistory(h);
}

function formatDate(ts) {
  return new Date(ts).toLocaleDateString("de-DE", {
    day: "2-digit", month: "2-digit", year: "2-digit",
    hour: "2-digit", minute: "2-digit",
  });
}

function scoreClass(p) {
  return p >= 70 ? "good" : p >= 40 ? "mid" : "bad";
}

function renderHistory() {
  const h = loadHistory();
  const list = $("history-list");
  list.innerHTML = "";
  $("history-empty").classList.toggle("hidden", h.jobs.length > 0);

  h.jobs.forEach((job) => {
    // Eine Stelle ohne Versuche (z. B. aus einer manipulierten Importdatei)
    // wuerde best/last unten zum Absturz bringen - solche Eintraege ueberspringen
    if (!job || !Array.isArray(job.attempts) || job.attempts.length === 0) return;

    const block = document.createElement("div");
    block.className = "job-block";

    const best = Math.max(...job.attempts.map((a) => a.prozent));
    const last = job.attempts[job.attempts.length - 1].prozent;

    const head = document.createElement("div");
    head.className = "job-head";
    const title = document.createElement("div");
    const strong = document.createElement("strong");
    strong.textContent = job.titel;
    const sub = document.createElement("p");
    sub.className = "hint";
    sub.textContent = `${job.attempts.length} Versuch${job.attempts.length === 1 ? "" : "e"} · Bester: ${best} % · Letzter: ${last} %`;
    title.appendChild(strong);
    title.appendChild(sub);
    const practiceBtn = document.createElement("button");
    practiceBtn.textContent = "Weiter üben";
    practiceBtn.title = "Neuen Test zu dieser Stelle erstellen";
    practiceBtn.addEventListener("click", () => {
      $("job-text").value = job.jobText;
      // URL der Stelle wieder ins Feld holen und als lastFetch hinterlegen, damit
      // ein frisch erstellter Test wieder denselben urlKey traegt und bei dieser
      // Stelle landet - nicht als neue Stelle ueber den Text-Hash.
      if (job.url) {
        $("job-url").value = job.url;
        lastFetch = { url: job.url, text: job.jobText };
      }
      setSourceTab("text");
      saveDraft();
      showView("view-input");
    });
    head.appendChild(title);
    head.appendChild(practiceBtn);
    block.appendChild(head);

    // Verlauf als Balken (chronologisch, max. die letzten 12)
    const trend = document.createElement("div");
    trend.className = "trend";
    job.attempts.slice(-12).forEach((a) => {
      const bar = document.createElement("div");
      bar.className = "trend-bar " + scoreClass(a.prozent);
      bar.style.height = Math.max(4, Math.round(a.prozent * 0.44)) + "px";
      bar.title = `${formatDate(a.date)}: ${a.prozent} %`;
      trend.appendChild(bar);
    });
    block.appendChild(trend);

    // Spielfortschritt dieser Stelle (Level, XP, Serie, Abzeichen)
    block.appendChild(buildJobProgressPanel(computeJobProgress(job)));

    // Versuche, neueste zuerst
    const ul = document.createElement("ul");
    ul.className = "attempt-list";
    job.attempts.slice().reverse().forEach((att) => {
      const li = document.createElement("li");
      const info = document.createElement("span");
      info.textContent = `${formatDate(att.date)} · ${att.mode === "pruefung" ? "Prüfung" : "Lernen"}` +
        (att.schwierigkeitsgrad ? ` · ${difficultyLabel(att.schwierigkeitsgrad)}` : "") +
        ` · ${att.quiz.fragen.length} Fragen` +
        // Kosten zeigen, wenn fuer diesen Versuch erfasst (Cloud-Anbieter mit
        // Preis); sonst bei lokalen Modellen ersatzweise den Token-Verbrauch.
        // Aeltere Versuche haben keins von beidem - dann bleibt der Slot leer.
        (att.cost && typeof att.cost.total === "number"
          ? ` · ca. ${formatUsd(att.cost.total)}`
          : att.tokens && typeof att.tokens.total === "number" && att.tokens.total > 0
          ? ` · ${formatTokens(att.tokens.total)}`
          : "");
      const score = document.createElement("span");
      score.className = "attempt-score " + scoreClass(att.prozent);
      score.textContent = att.prozent + " %";
      const openBtn = document.createElement("button");
      openBtn.textContent = "Ansehen";
      openBtn.addEventListener("click", () => openAttempt(job, att));
      li.appendChild(info);
      li.appendChild(score);
      li.appendChild(openBtn);
      ul.appendChild(li);
    });
    block.appendChild(ul);

    list.appendChild(block);
  });
}

// Gespeicherten Versuch wieder oeffnen: Auswertung anzeigen, Fragebogen
// laesst sich von dort im Lernmodus erneut durchgehen
function openAttempt(job, att) {
  quiz = JSON.parse(JSON.stringify(att.quiz));
  quiz.jobText = job.jobText;
  // urlKey/Quelle aus der Stelle übernehmen, damit ein erneutes Auswerten aus
  // der Review heraus wieder zur selben Stelle gespeichert wird
  if (job.urlKey) quiz.urlKey = job.urlKey;
  if (job.url) quiz.jobUrl = job.url;
  answers = att.answers.slice();
  revealed = (att.revealed || []).slice();
  while (revealed.length < quiz.fragen.length) revealed.push(false);
  current = 0;
  startTime = Date.now();
  stopTimer();
  $("quiz-timer").classList.add("hidden");

  // Meta-Zeile der historischen Auswertung korrekt reproduzieren
  mode = att.mode;
  timer.limitMin = att.timerLimitMin || 0;
  timer.overtime = !!att.overtime;
  renderResult(att.result, att.durationMs);
  // Beim Ansehen eines alten Versuchs den aktuellen Stand der Stelle zeigen,
  // aber ohne Feier (nichts wurde gerade frisch freigeschaltet).
  renderResultGami(job, {});
  showView("view-result");
}

/* ---------- Onboarding ---------- */

const ONBOARDING_STEPS = {
  anthropic: [
    { text: "Lege ein kostenloses Konto an auf", link: "https://console.anthropic.com", label: "console.anthropic.com" },
    { text: "Lade links unter „Billing“ etwas Guthaben auf – 5 $ reichen für viele Tests (eine Kreditkarte wird gebraucht)" },
    { text: "Klicke links unter „API Keys“ auf „Create Key“ und gib einen beliebigen Namen ein (z. B. „Bewerbungstool“)" },
    { text: "Kopiere den angezeigten Schlüssel (beginnt mit sk-ant-). Wichtig: Er wird nur dieses eine Mal gezeigt – kopiere ihn gleich und füge ihn unten ein" },
  ],
  openai: [
    { text: "Lege ein kostenloses Konto an auf", link: "https://platform.openai.com", label: "platform.openai.com" },
    { text: "Lade unter „Settings“ → „Billing“ etwas Guthaben auf (z. B. 5 $)" },
    { text: "Klicke unter „API Keys“ auf „Create new secret key“" },
    { text: "Kopiere den Schlüssel (beginnt mit sk-). Wichtig: Er wird nur dieses eine Mal gezeigt – kopiere ihn gleich und füge ihn unten ein" },
  ],
  deepseek: [
    { text: "Lege ein kostenloses Konto an auf", link: "https://platform.deepseek.com", label: "platform.deepseek.com" },
    { text: "Lade unter „Top up“ ein kleines Guthaben auf – schon 2 $ reichen lange" },
    { text: "Erstelle unter „API Keys“ einen neuen Schlüssel" },
    { text: "Kopiere den Schlüssel (beginnt mit sk-). Wichtig: Er wird nur dieses eine Mal gezeigt – kopiere ihn gleich und füge ihn unten ein" },
  ],
  local: [
    { text: "Lade die kostenlose App „LM Studio“ herunter, installiere sie und öffne sie:", link: "https://lmstudio.ai", label: "lmstudio.ai", note: "für Windows, Mac und Linux – kein Fachwissen nötig" },
    { text: "Hol dir ein Modell auf den Rechner: Klicke links auf die Lupe (Suche), tippe „Llama 3.1 8B“ ein und klicke bei einem Treffer auf „Download“. Der Download ist einige Gigabyte groß und passiert nur einmal. Tipp: Modelle ab etwa 8B liefern brauchbare Ergebnisse, größere sind besser – sie brauchen aber mehr Arbeitsspeicher (etwa 8 GB frei sind empfehlenswert)." },
    { text: "Schalte den lokalen Server an: Klicke links auf „Developer“ (in älteren Versionen „Local Server“) und stelle den Schalter oben auf „Running“. Wichtig: Setze das Häkchen bei „Enable CORS“ – nur damit darf diese Seite mit dem Modell sprechen. Ohne dieses Häkchen schlägt der Test gleich fehl." },
    { text: "Fast geschafft: Die Adresse unten passt schon für LM Studio. Klicke auf „Verbindung testen und Modelle laden“ – wenn dein Modell in der Liste auftaucht, bist du fertig." },
  ],
};

// Texte und Felder des Onboardings je nach Anbieter (lokal hat keinen Key,
// dafuer eine Server-Adresse).
const ONBOARDING_UI = {
  local: {
    step2: "Modell auf deinen Rechner holen",
    step3: "Mit dem lokalen Modell verbinden",
    button: "Verbindung testen und Modelle laden",
  },
  default: {
    step2: "API-Schlüssel erstellen",
    step3: "Schlüssel einfügen und testen",
    button: "Verbindung testen und loslegen",
  },
};

function renderOnboardingSteps(provider) {
  const ol = $("ob-steps");
  ol.innerHTML = "";
  ONBOARDING_STEPS[provider].forEach((step) => {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(step.text + (step.link ? " " : "")));
    if (step.link) {
      const a = document.createElement("a");
      a.href = step.link;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = step.label;
      li.appendChild(a);
    }
    if (step.note) {
      li.appendChild(document.createTextNode(" (" + step.note + ")"));
    }
    if (step.code) {
      const code = document.createElement("code");
      code.className = "ob-code";
      code.textContent = step.code;
      li.appendChild(code);
    }
    ol.appendChild(li);
  });

  const ui = ONBOARDING_UI[provider] || ONBOARDING_UI.default;
  $("ob-step2-title").textContent = ui.step2;
  $("ob-step3-title").textContent = ui.step3;
  $("btn-ob-test").textContent = ui.button;
  const isLocal = provider === "local";
  $("ob-key-wrap").classList.toggle("hidden", isLocal);
  $("ob-baseurl-wrap").classList.toggle("hidden", !isLocal);
  if (isLocal) {
    // Empfohlener (non-techy) Weg ist LM Studio -> Adresse vorbefuellen
    if (!$("ob-base-url").value.trim()) $("ob-base-url").value = "http://localhost:1234/v1";
    // Ollama-Befehl mit der tatsaechlichen Adresse dieser Seite
    $("ob-ollama-cmd").textContent = "OLLAMA_ORIGINS=" + location.origin + " ollama serve";
  }
}

// Kostenloser Verbindungstest ueber den Models-Endpoint des Anbieters
async function validateKey(provider, key) {
  let res;
  if (provider === "anthropic") {
    res = await fetch("https://api.anthropic.com/v1/models", {
      headers: {
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true",
      },
    });
  } else {
    const base = provider === "deepseek" ? "https://api.deepseek.com" : "https://api.openai.com/v1";
    res = await fetch(base + "/models", {
      headers: { Authorization: `Bearer ${key}` },
    });
  }
  return res.ok;
}

$("ob-provider").addEventListener("change", () => renderOnboardingSteps($("ob-provider").value));

$("btn-ob-test").addEventListener("click", async () => {
  const provider = $("ob-provider").value;
  const status = $("ob-status");
  $("btn-ob-test").disabled = true;
  try {
    if (provider === "local") {
      const baseUrl = $("ob-base-url").value.trim();
      status.textContent = "Verbindung zum lokalen Server wird getestet...";
      const models = await fetchLocalModels(baseUrl);
      if (models === null) {
        status.textContent = "Keine Verbindung zum lokalen Server. Läuft Ollama bzw. LM Studio, stimmt die Adresse, und erlaubt der Server Anfragen dieser Seite (OLLAMA_ORIGINS bzw. CORS)?";
        return;
      }
      if (models.length === 0) {
        status.textContent = "Verbindung steht, aber es ist noch kein Modell installiert. Bitte zuerst eines laden, z. B. „ollama pull llama3.1:8b“.";
        return;
      }
      settings = { provider, apiKey: "", baseUrl: normalizeBaseUrl(baseUrl), model: models[0] };
      saveSettings(settings);
      status.textContent = "";
      showView("view-input");
      return;
    }

    const key = $("ob-key").value.trim();
    if (!key) {
      status.textContent = "Bitte zuerst den API-Schlüssel einfügen.";
      return;
    }
    status.textContent = "Verbindung wird getestet...";
    const ok = await validateKey(provider, key);
    if (ok) {
      settings = { provider, apiKey: key, model: modelsFor(provider)[0].id };
      saveSettings(settings);
      status.textContent = "";
      showView("view-input");
    } else {
      status.textContent = "Der Schlüssel wurde vom Anbieter abgelehnt. Bitte prüfen, ob er vollständig kopiert wurde und Guthaben vorhanden ist.";
    }
  } catch {
    status.textContent = "Verbindung fehlgeschlagen. Bitte Internetverbindung prüfen und erneut versuchen.";
  } finally {
    $("btn-ob-test").disabled = false;
  }
});

$("btn-ob-skip").addEventListener("click", () => {
  initSettingsForm();
  showView("view-settings");
});

$("link-onboarding").addEventListener("click", (e) => {
  e.preventDefault();
  renderOnboardingSteps($("ob-provider").value);
  showView("view-onboarding");
});

/* ---------- Event-Verkabelung ---------- */

function populateModelSelect(provider, selectedId) {
  const select = $("model");
  const catalog = modelsFor(provider);
  select.innerHTML = "";
  catalog.forEach((m) => {
    const opt = document.createElement("option");
    opt.value = m.id;
    // Ungefaehre Kosten je Test direkt im Picker, sofern ein Preis bekannt ist
    const est = estimatedQueryCost(m.id);
    opt.textContent = est !== null ? `${m.label} · ca. ${formatUsd(est)}/Test` : m.label;
    select.appendChild(opt);
  });
  select.value = catalog.some((m) => m.id === selectedId) ? selectedId : catalog[0].id;
  updateModelDesc();
}

// Fuellt die Modellauswahl fuer den lokalen Anbieter aus einer Liste von
// Modell-IDs. Das aktuell gewaehlte Modell bleibt erhalten, auch wenn es
// gerade nicht in der Liste steht (z. B. weil der Server gerade aus ist).
function populateLocalModelSelect(models, selectedId) {
  const select = $("model");
  select.innerHTML = "";
  const ids = Array.isArray(models) ? models.slice() : [];
  if (selectedId && !ids.includes(selectedId)) ids.unshift(selectedId);
  ids.forEach((id) => {
    const opt = document.createElement("option");
    opt.value = id;
    opt.textContent = id;
    select.appendChild(opt);
  });
  if (selectedId && ids.includes(selectedId)) select.value = selectedId;
  updateModelDesc();
}

function updateModelDesc() {
  const provider = $("provider").value;
  if (provider === "local") {
    if (!$("model").value) {
      $("model-desc").textContent = "Noch kein Modell ausgewählt – auf „Modelle laden“ klicken.";
      return;
    }
    let desc = "Lokales Modell – kostenlos, läuft auf deinem Rechner.";
    const ctx = localModelContexts[$("model").value];
    if (ctx) {
      desc += ` Geladen mit ${ctx.loaded.toLocaleString("de-DE")} Token Kontext`;
      if (ctx.max && ctx.max > ctx.loaded) {
        desc += ` (möglich bis ${ctx.max.toLocaleString("de-DE")})`;
      }
      desc += ". Reicht der Kontext für die gewünschte Fragenzahl nicht, das Modell in LM Studio mit größerem Kontext laden.";
    }
    $("model-desc").textContent = desc;
    return;
  }
  const m = modelsFor(provider).find((x) => x.id === $("model").value);
  $("model-desc").textContent = m ? m.desc : "";
}

// Blendet je nach Anbieter die passenden Felder ein (lokal: keine Key-Eingabe,
// dafuer Server-Adresse, „Modelle laden“ und der Hinweis zu kleinen Modellen).
function updateSettingsProviderUI() {
  const isLocal = $("provider").value === "local";
  $("row-api-key").classList.toggle("hidden", isLocal);
  $("row-base-url").classList.toggle("hidden", !isLocal);
  $("row-local-models").classList.toggle("hidden", !isLocal);
  $("row-cloud-hints").classList.toggle("hidden", isLocal);
  $("hint-local").classList.toggle("hidden", !isLocal);
}

function initSettingsForm() {
  $("provider").value = settings.provider || "anthropic";
  $("api-key").value = settings.apiKey || "";
  $("base-url").value = settings.baseUrl || "";
  updateSettingsProviderUI();
  if ($("provider").value === "local") {
    populateLocalModelSelect([], settings.model);
    $("local-models-status").textContent = "";
  } else {
    populateModelSelect($("provider").value, settings.model);
  }
}

$("btn-settings").addEventListener("click", () => {
  rememberReturnView();
  initSettingsForm();
  showView("view-settings");
});

$("provider").addEventListener("change", () => {
  updateSettingsProviderUI();
  if ($("provider").value === "local") {
    // Modell-ID nur uebernehmen, wenn vorher schon lokal gewaehlt war
    const keep = settings.provider === "local" ? settings.model : "";
    populateLocalModelSelect([], keep);
    $("local-models-status").textContent = "Auf „Modelle laden“ klicken, um die installierten Modelle anzuzeigen.";
  } else {
    populateModelSelect($("provider").value, settings.model);
  }
});

$("model").addEventListener("change", updateModelDesc);

$("btn-load-models").addEventListener("click", async () => {
  const status = $("local-models-status");
  const baseUrl = $("base-url").value.trim();
  $("btn-load-models").disabled = true;
  status.textContent = "Modelle werden geladen...";
  try {
    const models = await fetchLocalModels(baseUrl);
    if (models === null) {
      status.textContent = "Keine Verbindung. Läuft der Server, stimmt die Adresse, und erlaubt er Anfragen dieser Seite (OLLAMA_ORIGINS bzw. CORS)?";
    } else if (models.length === 0) {
      status.textContent = "Verbindung steht, aber es ist kein Modell installiert (z. B. „ollama pull llama3.1:8b“).";
    } else {
      const keep = $("model").value;
      populateLocalModelSelect(models, models.includes(keep) ? keep : models[0]);
      status.textContent = models.length + (models.length === 1 ? " Modell" : " Modelle") + " gefunden.";
      // Geladene Kontextlaengen nachladen (nur LM Studio) und Beschreibung
      // aktualisieren - degradiert lautlos, wenn der Endpunkt fehlt (Ollama).
      await loadLocalModelContexts(baseUrl);
      updateModelDesc();
    }
  } finally {
    $("btn-load-models").disabled = false;
  }
});

$("btn-save-settings").addEventListener("click", () => {
  const provider = $("provider").value;
  settings = {
    provider,
    apiKey: $("api-key").value.trim(),
    model: $("model").value.trim(),
  };
  // Server-Adresse nur fuer den lokalen Anbieter sichern (optionales Feld)
  if (provider === "local") settings.baseUrl = normalizeBaseUrl($("base-url").value);
  saveSettings(settings);
  showView(returnView);
});

$("btn-cancel-settings").addEventListener("click", () => showView(returnView));

/* ---------- Daten-Export / -Import (Umzug zwischen Adressen/Browsern) ---------- */

// Sichert beide localStorage-Bestaende in eine versionierte JSON-Datei
function exportData() {
  const data = {
    app: "bewerbungstool",
    version: 1,
    exportedAt: new Date().toISOString(),
    settings: loadSettings(),
    history: loadHistory(),
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "jobreif-backup-" + new Date().toISOString().slice(0, 10) + ".json";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// Fuehrt eine Sicherung wieder ein. Bewusst nicht-destruktiv: Einstellungen
// werden feldweise ergaenzt, Stellen per key und Versuche per Datum
// zusammengefuehrt - vorhandene Daten gehen nie verloren.
function importData(text) {
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("Die Datei ist kein gültiges JSON.");
  }
  if (!data || typeof data !== "object" || (!data.settings && !data.history)) {
    throw new Error("Die Datei enthält keine erkennbaren Bewerbungstool-Daten.");
  }

  let settingsImported = false;
  if (data.settings && typeof data.settings === "object") {
    settings = { ...loadSettings(), ...data.settings };
    saveSettings(settings);
    settingsImported = true;
  }

  let newJobs = 0;
  let newAttempts = 0;
  if (data.history && Array.isArray(data.history.jobs)) {
    const h = loadHistory();
    data.history.jobs.forEach((impJob) => {
      if (!impJob || !impJob.key || !Array.isArray(impJob.attempts)) return;
      // Nur Versuche mit verwertbarem Zeitstempel uebernehmen (date traegt die
      // Identitaet beim Zusammenfuehren und die Sortierung). Eine Stelle ohne
      // brauchbare Versuche wird uebersprungen - ein leeres attempts-Array wuerde
      // die Historie sonst beim Rendern zum Absturz bringen.
      const incoming = impJob.attempts.filter((a) => a && typeof a === "object" && Number.isFinite(a.date));
      if (!incoming.length) return;
      // Stelle zuerst über die stabile URL-Identität zusammenführen, sonst über
      // den Text-key (wie bisher)
      const existing =
        (impJob.urlKey && h.jobs.find((j) => j.urlKey === impJob.urlKey)) ||
        h.jobs.find((j) => j.key === impJob.key);
      if (!existing) {
        h.jobs.push({ ...impJob, attempts: incoming });
        newJobs++;
        newAttempts += incoming.length;
        return;
      }
      // urlKey/Quelle aus dem Import übernehmen, falls lokal noch nicht gesetzt
      if (impJob.urlKey && !existing.urlKey) {
        existing.urlKey = impJob.urlKey;
        if (impJob.url) existing.url = impJob.url;
      }
      const seen = new Set(existing.attempts.map((a) => a.date));
      incoming.forEach((a) => {
        if (!seen.has(a.date)) {
          existing.attempts.push(a);
          newAttempts++;
        }
      });
      existing.attempts.sort((a, b) => a.date - b.date);
    });
    // Neueste Stelle zuerst, wie beim normalen Speichern
    h.jobs.sort((j1, j2) => {
      const last = (j) => Math.max(0, ...j.attempts.map((a) => a.date || 0));
      return last(j2) - last(j1);
    });
    // Dieselben Obergrenzen wie beim normalen Speichern anwenden, damit ein
    // grosser Import die Historie (und localStorage) nicht unbegrenzt aufblaeht
    h.jobs.forEach((j) => {
      if (j.attempts.length > HISTORY_MAX_ATTEMPTS) j.attempts = j.attempts.slice(-HISTORY_MAX_ATTEMPTS);
    });
    if (h.jobs.length > HISTORY_MAX_JOBS) h.jobs.length = HISTORY_MAX_JOBS;
    saveHistory(h);
  }

  const parts = [];
  if (settingsImported) parts.push("Einstellungen übernommen");
  parts.push(
    (newJobs === 1 ? "1 neue Stelle" : newJobs + " neue Stellen") +
      ", " +
      (newAttempts === 1 ? "1 neuer Versuch" : newAttempts + " neue Versuche")
  );
  return parts.join("; ") + ".";
}

$("btn-export").addEventListener("click", exportData);
$("btn-import").addEventListener("click", () => $("import-file").click());
$("import-file").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  e.target.value = ""; // erlaubt erneuten Import derselben Datei
  if (!file) return;
  const status = $("data-status");
  status.textContent = "Datei wird gelesen...";
  try {
    const summary = importData(await file.text());
    status.textContent = "Import erfolgreich: " + summary + " Die Seite wird neu geladen...";
    setTimeout(() => location.reload(), 1500);
  } catch (err) {
    status.textContent = "Import fehlgeschlagen: " + err.message;
  }
});

// Quelle der Stellenbeschreibung: entweder URL oder manuell eingefuegter Text
function setSourceTab(which) {
  $("tab-url").classList.toggle("active", which === "url");
  $("tab-text").classList.toggle("active", which === "text");
  // Aktiven Tab auch fuer Screenreader kennzeichnen
  $("tab-url").setAttribute("aria-pressed", which === "url" ? "true" : "false");
  $("tab-text").setAttribute("aria-pressed", which === "text" ? "true" : "false");
  $("source-url").classList.toggle("hidden", which !== "url");
  $("source-text").classList.toggle("hidden", which !== "text");
}

$("tab-url").addEventListener("click", () => { setSourceTab("url"); saveDraft(); });
$("tab-text").addEventListener("click", () => { setSourceTab("text"); saveDraft(); });

// Eingaben in URL- und Textfeld in den Entwurf uebernehmen, damit sie ein
// Reload/Update ueberleben (verzoegert, nicht bei jedem Tastendruck)
$("job-url").addEventListener("input", scheduleDraftSave);
$("job-text").addEventListener("input", scheduleDraftSave);

$("btn-fetch-url").addEventListener("click", async () => {
  if (actionRunning) return;
  const url = $("job-url").value.trim();
  if (!url) return;
  actionRunning = true;
  showLoading("Stellenanzeige wird geladen...");
  try {
    const text = cleanPageText(await fetchJobFromUrl(url));
    $("job-text").value = text;
    lastFetch = { url, text: text.trim() };
    setSourceTab("text");
    saveDraft();
    if (!looksLikeRealContent(text)) {
      showError("Die Seite konnte nur unvollständig ausgelesen werden (vermutlich eine JavaScript-Anwendung). Bitte prüfen und die Stellenbeschreibung ggf. manuell einfügen.");
    }
  } catch (e) {
    showError(e.message);
  } finally {
    actionRunning = false;
    hideLoading();
  }
});

// Enter im URL-Feld loest das Laden aus, wie der Klick auf „Laden“. Der
// actionRunning-Schutz im Klick-Handler verhindert doppeltes Ausloesen.
$("job-url").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    $("btn-fetch-url").click();
  }
});

$("btn-generate").addEventListener("click", generateQuiz);
$("btn-next").addEventListener("click", nextQuestion);
$("btn-prev").addEventListener("click", prevQuestion);
$("btn-restart").addEventListener("click", () => {
  quiz = null;
  answers = [];
  revealed = [];
  reviewing = false;
  stopTimer();
  $("quiz-timer").classList.add("hidden");
  showView("view-input");
});

$("btn-print").addEventListener("click", () => window.print());

// Beantworteten Fragebogen erneut durchgehen (Lernmodus, ohne Timer,
// ohne erneute Bewertung - die Auswertung existiert ja bereits)
$("btn-review-questions").addEventListener("click", () => {
  if (!quiz) return;
  mode = "lernen";
  reviewing = true;
  stopTimer();
  $("quiz-timer").classList.add("hidden");
  current = 0;
  renderQuestion();
  showView("view-quiz");
});

$("btn-history").addEventListener("click", () => {
  rememberReturnView();
  renderHistory();
  showView("view-history");
});

$("btn-history-back").addEventListener("click", () => showView(returnView));

// Farbschema-Schalter (Auto -> Hell -> Dunkel -> Auto)
syncThemeButton(loadTheme());
syncThemeColorMeta(loadTheme());
$("btn-theme").addEventListener("click", () => {
  const cur = loadTheme();
  applyTheme(THEME_CYCLE[(THEME_CYCLE.indexOf(cur) + 1) % THEME_CYCLE.length]);
});

// Zeit abgelaufen: auswerten oder bewusst überziehen
$("btn-timeout-submit").addEventListener("click", () => {
  $("timeout-modal").classList.add("hidden");
  evaluateQuiz();
});

$("btn-timeout-continue").addEventListener("click", () => {
  $("timeout-modal").classList.add("hidden");
  enterOvertime();
});

$("btn-error-close").addEventListener("click", () => $("error-box").classList.add("hidden"));

// Rueckfrage vor dem Auswerten bei unbeantworteten Fragen (ersetzt das
// blockierende native confirm()). Fokus wird gesetzt und nach dem Schliessen
// auf das ausloesende Element zurueckgegeben.
let confirmEvalReturnFocus = null;
function openConfirmEval(unanswered) {
  $("confirm-eval-text").textContent =
    `${unanswered} Frage(n) sind unbeantwortet. Trotzdem auswerten?`;
  confirmEvalReturnFocus = document.activeElement;
  $("confirm-eval-modal").classList.remove("hidden");
  $("btn-confirm-eval").focus();
}
function closeConfirmEval() {
  $("confirm-eval-modal").classList.add("hidden");
  if (confirmEvalReturnFocus && typeof confirmEvalReturnFocus.focus === "function") {
    confirmEvalReturnFocus.focus();
  }
  confirmEvalReturnFocus = null;
}
// Abbruch der Rueckfrage (Zurueck/Escape): wurde die Auswertung nach Zeitablauf
// angestossen, nicht im eingefrorenen 0:00-Zustand haengen bleiben, sondern in
// den Ueberzieh-Modus zurueck - der Timer laeuft weiter und das overtime-Flag
// stimmt mit der Realitaet ueberein.
function cancelConfirmEval() {
  closeConfirmEval();
  if (mode === "pruefung" && timer.limitMin && Date.now() > timer.deadline) {
    enterOvertime();
  }
}
$("btn-confirm-eval").addEventListener("click", () => {
  closeConfirmEval();
  runEvaluation();
});
$("btn-confirm-eval-cancel").addEventListener("click", cancelConfirmEval);

// Versionsanzeige im Footer und Changelog-Fenster
function renderChangelog() {
  const list = $("changelog-list");
  list.innerHTML = "";
  CHANGELOG.forEach((entry) => {
    const div = document.createElement("div");
    div.className = "changelog-entry";

    const h = document.createElement("h3");
    h.textContent = `Version ${entry.version}`;
    const date = document.createElement("span");
    date.className = "changelog-date";
    date.textContent = entry.date;
    h.appendChild(date);

    const ul = document.createElement("ul");
    (entry.items || []).forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      ul.appendChild(li);
    });

    div.appendChild(h);
    div.appendChild(ul);
    list.appendChild(div);
  });
}

$("link-changelog").textContent = `Version ${APP_VERSION}`;
$("link-changelog").addEventListener("click", (e) => {
  e.preventDefault();
  renderChangelog();
  $("changelog-modal").classList.remove("hidden");
  $("btn-changelog-close").focus();
});

function closeChangelog() {
  $("changelog-modal").classList.add("hidden");
  $("link-changelog").focus();
}

$("btn-changelog-close").addEventListener("click", closeChangelog);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !$("changelog-modal").classList.contains("hidden")) {
    closeChangelog();
  } else if (e.key === "Escape" && !$("confirm-eval-modal").classList.contains("hidden")) {
    cancelConfirmEval();
  }
});

// Zuletzt geladenen Eingabe-Stand wiederherstellen, damit URL und Anzeige ein
// Update/Reload ueberleben (und die Stelle ueber lastFetch wiedererkannt wird)
restoreDraft();

// Beim ersten Start zum Onboarding
if (!settings.apiKey) {
  renderOnboardingSteps($("ob-provider").value);
  showView("view-onboarding");
}

/* ---------- Service Worker (PWA) ---------- */

if ("serviceWorker" in navigator && location.protocol === "https:") {
  navigator.serviceWorker
    .register("sw.js")
    .then((reg) => {
      // Installierte PWAs laufen auf Smartphones oft tagelang im Hintergrund
      // ohne echten Neustart - beim Zurueckkehren aktiv nach Updates suchen
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
          reg.update().catch(() => {});
        }
      });
    })
    .catch(() => {});

  // Eine neue Version hat uebernommen: dezent zum Neuladen einladen,
  // nie automatisch neu laden (koennte einen laufenden Test zerstoeren)
  const hadController = !!navigator.serviceWorker.controller;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (!hadController) return; // Erstinstallation, kein Update
    $("update-banner").classList.remove("hidden");
  });
}

$("btn-update-reload").addEventListener("click", () => location.reload());
$("btn-update-later").addEventListener("click", () => {
  $("update-banner").classList.add("hidden");
});
