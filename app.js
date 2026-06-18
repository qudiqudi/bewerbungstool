"use strict";

/* ---------- Version und Changelog ---------- */

// Muss mit der VERSION-Datei im Repo übereinstimmen (der CI-Check erzwingt
// das). Bei jedem Release: VERSION hochzählen und hier einen Eintrag ergänzen.
const APP_VERSION = "1.5.0";

const CHANGELOG = [
  {
    version: "1.5.0",
    date: "18.06.2026",
    items: [
      "Neuer Aufgabentyp: Reihenfolge-Aufgaben. Bei Abläufen und Prozessen bringst du jetzt Elemente per Ziehen am Griff oder über Hoch-/Runter-Pfeile in die richtige Reihenfolge – auch am Handy. Die Bewertung erfolgt automatisch mit Teilpunkten.",
    ],
  },
  {
    version: "1.4.0",
    date: "18.06.2026",
    items: [
      "Neu: Multiple-Choice-Fragen können jetzt mehrere richtige Antworten haben. Solche Fragen erkennst du an den eckigen Auswahlkästchen und dem Hinweis „Mehrere Antworten möglich“. Du bekommst Teilpunkte für richtig markierte Optionen; falsch Angekreuztes mindert die Punkte, damit blosses Ankreuzen aller Optionen nichts bringt.",
      "Die Antwortoptionen bei Multiple-Choice werden jetzt zufällig angeordnet. So liegt die richtige Antwort nicht mehr auffällig oft auf demselben Platz und lässt sich nicht erraten.",
    ],
  },
  {
    version: "1.3.0",
    date: "18.06.2026",
    items: [
      "Im Lernmodus kannst du einen Test jetzt verlassen und später fortsetzen: Deine Antworten und aufgelösten Fragen bleiben erhalten. Auf der Startseite erscheint dazu „Test fortsetzen“.",
    ],
  },
  {
    version: "1.2.0",
    date: "18.06.2026",
    items: [
      "Im gehosteten Modus wird dein Test jetzt im Hintergrund erstellt: Du kannst die Seite verlassen, das Handy sperren oder wegklicken – die Erstellung läuft weiter. Sobald der Test fertig ist, erscheint er oben auf der Startseite und du startest ihn mit „Loslegen“.",
    ],
  },
  {
    version: "1.1.1",
    date: "18.06.2026",
    items: [
      "Kleiner Fix: Im gehosteten Modus blendet sich das Sicherheits-Widget (Bot-Schutz) nach der Prüfung wieder aus und verdeckt keine Hinweise oder Fehlermeldungen mehr.",
    ],
  },
  {
    version: "1.1.0",
    date: "17.06.2026",
    items: [
      "Neu: gehosteter Modus. Du kannst das Tool jetzt ohne eigenen API-Schlüssel sofort nutzen – Stellenanzeige einfügen und loslegen. Die Nutzung ist kostenlos, mit einem fairen Tageskontingent.",
      "Einen eigenen API-Schlüssel oder ein lokales Modell kannst du weiterhin verwenden: in den Einstellungen unter „Anbieter“. Damit laufen deine Daten nicht über unseren Dienst.",
      "Neuer Datenschutzhinweis (Link unten in der Fußzeile und in den Einstellungen): erklärt, welche Daten im gehosteten Modus wohin fließen.",
    ],
  },
  {
    version: "1.0.40",
    date: "15.06.2026",
    items: [
      "Das „Was ist neu“-Fenster zeigt jetzt die wichtigsten Neuerungen übersichtlich, statt jede kleine technische Änderung aufzulisten. Den vollständigen Verlauf aller Versionen findest du über den Link unten im Fenster auf GitHub.",
    ],
  },
  {
    version: "1.0.39",
    date: "15.06.2026",
    items: [
      "Fehler behoben: Beim Durchsehen eines älteren Versuchs konnte bei offenen Fragen das Wort „undefined“ im Antwortfeld stehen, wenn der Versuch aus einer früheren Version stammte. Das Feld bleibt jetzt korrekt leer.",
      "Datensicherung: Beim Import werden beschädigte oder unvollständige Versuche jetzt aussortiert, statt die Historie zu stören. Außerdem überschreibt ein importierter Datensatz einen bereits hinterlegten API-Schlüssel nicht mehr mit einem leeren Wert.",
    ],
  },
  {
    version: "1.0.38",
    date: "14.06.2026",
    items: [
      "Fehler behoben: Nach einem Vertiefungsbogen änderte sich der Titel der Stelle in der Übersicht (z. B. „… – Vertiefungsbogen Sicherheit & Service“). Ein Vertiefungsbogen überschreibt den Stellentitel jetzt nicht mehr. Ein bereits verfälschter Titel stellt sich beim nächsten normalen Lern- oder Prüfungstest von selbst wieder richtig.",
    ],
  },
  {
    version: "1.0.37",
    date: "14.06.2026",
    items: [
      "Vertiefungen liefern jetzt anspruchsvollere Fragen: Sie zielen auf das Niveau eines Fachgesprächs für die Rolle, verlangen Anwenden, Analysieren und Begründen statt reines Faktenwissen, docken an konkrete Normen, Verfahren oder Szenarien an und decken ein Themenfeld in verschiedenen Facetten ab. Es überwiegen offene Fragen; bei Multiple-Choice sind die falschen Optionen bewusst plausibel gehalten. Die Fragen werden zudem etwas über deinem bisherigen Stand bei der Stelle angesetzt.",
    ],
  },
  {
    version: "1.0.36",
    date: "14.06.2026",
    items: [
      "Vertiefungen sind da: Ab Stufe 3 kannst du zu einer Stelle thematisch fokussierte Fragebögen erstellen. Das Tool leitet beim ersten Mal passende Themenfelder aus der Anzeige ab – mit Schwerpunkt auf den Themen, in denen du bisher schwächer warst. Du wählst bis zu 3 Felder aus; die Mindest-Fragenzahl passt sich an (1 Feld ab 4, 2 ab 8, 3 ab 10 Fragen). Vertiefungen sind bewusst immer „schwer“. Nur mit Cloud-Anbieter, nicht mit lokalen Modellen.",
    ],
  },
  {
    version: "1.0.31",
    date: "14.06.2026",
    items: [
      "Die Fragenanzahl wählst du jetzt über einen kompakten Stepper (− Wert +) statt über ein Dropdown – sowohl im Eingabe-Bildschirm als auch auf der Stellenseite. Standard bleibt 10, frei justierbar von 4 bis 30. Gleiche Optik wie die Schwierigkeit-Auswahl, größere Touch-Flächen fürs Handy.",
    ],
  },
  {
    version: "1.0.29",
    date: "14.06.2026",
    items: [
      "Stufenaufstieg wird jetzt gefeiert: Steigst du nach einem Test in eine neue Stufe auf, erscheint eine kurze Animation mit Medaille, Titel und Konfetti. Sie wird mit jeder Stufe aufwendiger – ab Stufe 4 ein Strahlenkranz, ab 6 Funkeln und ein Lichtschimmer, ab 8 ein Aufleuchten, ab 9 eine Krone und „Legende“ (Stufe 10) in Gold. Antippen oder „Weiter“ schließt sie; reduzierte Bewegung wird respektiert.",
    ],
  },
  {
    version: "1.0.28",
    date: "14.06.2026",
    items: [
      "Stellen lassen sich jetzt löschen: In der Historie und auf der Stellenseite gibt es einen „Löschen“-Knopf, der die Stelle mit allen Versuchen nach einer Sicherheitsabfrage entfernt. Praktisch zum Aufräumen alter oder versehentlich angelegter Einträge.",
    ],
  },
  {
    version: "1.0.26",
    date: "14.06.2026",
    items: [
      "Stellenseite: Schwierigkeitsgrad und Fragenzahl stehen jetzt direkt über den Startknöpfen, statt hinter „Optionen“ versteckt zu sein. Du siehst und änderst die Einstellungen mit einem Blick, bevor du einen Test startest.",
    ],
  },
  {
    version: "1.0.24",
    date: "14.06.2026",
    items: [
      "Lernmodus: Fragen, die du aufgelöst hast, lösen vor dem Auswerten nicht mehr die Rückfrage „Unbeantwortete Fragen“ aus. Bisher galt eine nur aufgelöste Multiple-Choice-Frage als unbeantwortet, obwohl die Lösung schon eingeblendet war. In der Auswertung gehen solche Fragen weiterhin als aufgelöst ohne eigene Antwort ein.",
    ],
  },
  {
    version: "1.0.21",
    date: "14.06.2026",
    items: [
      "Die Abzeichen haben jetzt je ein eigenes Symbol im jobreif-Stil: kleine Korall-Sticker mit weißem Rand statt des einen generischen Sterns – Fahne, Stoppuhr, Haken, Schild, Pokal, Trendpfeil, Flamme und Gipfel. Frisch freigeschaltete Abzeichen ploppen kurz auf (Animation respektiert reduzierte Bewegung). Freischaltbedingungen und Beschriftungen bleiben unverändert.",
      "Ein Tipp auf ein Abzeichen öffnet es jetzt groß und zeigt Gruppe, Status (freigeschaltet oder noch nicht erreicht), Bedingung und Ziel.",
    ],
  },
  {
    version: "1.0.20",
    date: "13.06.2026",
    items: [
      "Dieselbe Stelle wird jetzt zuverlässiger wiedererkannt: Wird eine Anzeige ohne URL erneut eingefügt – etwa mit leicht abweichendem Text –, ordnet das Tool die Versuche anhand von Bezeichnung, Arbeitgeber und Arbeitsort wieder der bestehenden Stelle zu, statt einen zweiten Eintrag anzulegen. Verschiedene Stellen mit gleicher Bezeichnung bei unterschiedlichen Arbeitgebern bleiben getrennt.",
    ],
  },
  {
    version: "1.0.19",
    date: "13.06.2026",
    items: [
      "Neue Startseite „Meine Stellen“: Beim Öffnen erscheint zuerst eine Liste deiner Stellen mit Bestwert und Fortschritt. Ein Tipp öffnet die Stelle, von dort lässt sich ein neuer Test im Lern- oder Prüfungsmodus mit den zuletzt genutzten Einstellungen per Klick starten. Stellen werden jetzt mit Arbeitgeber und Arbeitsort angezeigt, damit sich ähnliche Bezeichnungen (z. B. dieselbe Position bei verschiedenen Unternehmen) klar unterscheiden lassen. „Neue Stelle“ führt wie bisher zum Laden per URL oder Einfügen des Textes.",
    ],
  },
  {
    version: "1.0.18",
    date: "13.06.2026",
    items: [
      "Der zuletzt geladene Stand des Eingabe-Bildschirms (Stellen-URL, eingelesener Text und der aktive Tab) bleibt jetzt über ein App-Update oder das Neuladen hinweg erhalten. Bisher war nach einer neuen Version die URL weg, sodass die Anzeige neu geladen werden musste – dabei legte das Tool die Stelle als neuen Eintrag in der Historie an, statt die Versuche bei der bestehenden Stelle fortzuschreiben. Jetzt wird dieselbe Stelle zuverlässig wiedererkannt. Zusätzlich übernimmt „Weiter üben“ in der Historie die Stellen-URL, damit ein dort erstellter Test ebenfalls bei der richtigen Stelle landet.",
    ],
  },
  {
    version: "1.0.14",
    date: "13.06.2026",
    items: [
      "Leistungsabzeichen (Bestanden, Souverän, Spitzenreiter, Aufwärtstrend) gibt es jetzt nur noch für Ergebnisse im Prüfungsmodus. Im Lernmodus lässt sich durch Auflösen leicht ein hoher Wert erreichen – deshalb zählen für diese Abzeichen nur echte Prüfungen. Die Fleiß-Abzeichen (Erster Schritt, Drei am Stück, Hartnäckig) bleiben in beiden Modi.",
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
    version: "1.0.9",
    date: "13.06.2026",
    items: [
      "Neu: Spielerischer Fortschritt je Stelle. Aus deinen Versuchen ergeben sich Erfahrungspunkte und Stufen, eine Übungsserie über mehrere Tage und Abzeichen für Meilensteine (z. B. erster Test, 90 % erreicht, Prüfung bestanden). Sichtbar in der Auswertung und in der Historie – frisch freigeschaltete Abzeichen und Stufenaufstiege werden direkt nach dem Test hervorgehoben.",
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
// Reihenfolge-Aufgaben: ephemere Anzeige-Reihenfolge je Frageindex (Map index ->
// number[] der elemente-Indizes). NICHT persistiert (analog revealed). Beim
// ersten Anzeigen einer Reihenfolge-Frage mit einer gemischten Startpermutation
// gefuellt; bleibt ueber Re-Renders/Navigation in der Sitzung stabil. Die
// Antwort-Absicht liegt getrennt in answers[i] und bleibt leer, bis der Nutzer
// das erste Mal umsortiert.
let sortDisplay = {};
// Lokaler Lernmodus: lerninfo/quellen werden erst beim Aufloesen nachgeladen.
// enrichingIdx = Index der Frage, die gerade angereichert wird (-1 = keine);
// enrichTried merkt sich versuchte Indizes, damit ein Fehlschlag nicht in einer
// Schleife endlos neu anfragt. Bewusst Modul-Zustand statt Felder am Frage-
// Objekt, damit nichts davon in den gespeicherten Versuch wandert.
let enrichingIdx = -1;
let enrichTried = new Set();
let startTime = 0;
const timer = { intervalId: null, deadline: 0, overtime: false, limitMin: 0 };

/* ---------- DOM-Helfer ---------- */

const $ = (id) => document.getElementById(id);

const views = ["view-onboarding", "view-settings", "view-home", "view-input", "view-job", "view-quiz", "view-result", "view-history"];

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
let returnView = "view-home";

function rememberReturnView() {
  const cv = currentView();
  if (cv === "view-quiz" || cv === "view-result") {
    returnView = cv;
  } else if (cv === "view-home" || cv === "view-job" || cv === "view-input") {
    // Von Startliste, Stellen-Subpage oder Eingabe dorthin zurueckkehren
    returnView = cv;
  } else if (cv !== "view-history" && cv !== "view-settings") {
    // Wechsel zwischen Historie und Einstellungen erbt das Ziel; Onboarding
    // u. ae. setzt auf die Startliste zurueck
    returnView = "view-home";
  }
}

// Zurueck-Ziel ansteuern: Startliste und Stellen-Subpage muessen neu gerendert
// werden (Subpage haengt an der zuletzt geoeffneten Stelle).
function goReturn() {
  if (returnView === "view-job" && activeJob) {
    openJob(activeJob);
  } else if (returnView === "view-home") {
    goHome();
  } else {
    showView(returnView);
  }
}

let loadingTicker = null;

function showLoading(text) {
  $("loading-text").textContent = text;
  $("loading-progress").classList.add("hidden");
  $("loading-fill").style.width = "0%";
  hideAbortButton();
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
  hideAbortButton();
  $("loading").classList.add("hidden");
}

// Abbruch-Knopf im Lade-Overlay (nur bei der lokalen Generierung sichtbar).
// Von Anfang an klickbar als "Abbrechen": der Normalfall ist ein einzelner
// Aufruf, den der Nutzer auch ohne fertige Fragen stoppen koennen muss (er
// wird dann verworfen). Sobald fertige Fragen vorliegen (mehrere Runden bei
// vielen Fragen), zeigt markAbortKeepsResults(), dass ein Stopp die bereits
// erzeugten Fragen uebernimmt.
function showAbortButton(onAbort) {
  const btn = $("loading-abort");
  btn.textContent = "Abbrechen";
  btn.disabled = false;
  btn.classList.remove("hidden");
  btn.onclick = () => {
    btn.disabled = true;
    btn.textContent = "Wird gestoppt...";
    onAbort();
  };
}

// Wechselt die Beschriftung, sobald es fertige Fragen gibt - dann uebernimmt
// ein Stopp diese statt alles zu verwerfen. Nicht anfassen, wenn der Nutzer
// gerade schon gestoppt hat (Knopf deaktiviert, zeigt "Wird gestoppt...").
function markAbortKeepsResults() {
  const btn = $("loading-abort");
  if (btn && !btn.classList.contains("hidden") && !btn.disabled) {
    btn.textContent = "Stoppen & verwenden";
  }
}

function hideAbortButton() {
  const btn = $("loading-abort");
  if (!btn) return;
  btn.classList.add("hidden");
  btn.onclick = null;
  btn.disabled = false;
  btn.textContent = "Abbrechen";
}

function showError(msg) {
  $("error-text").textContent = msg;
  $("error-box").classList.remove("hidden");
}

// Hinweisleiste oben im Fragebogen (z. B. wenn ein lokales Modell weniger
// Fragen geliefert hat als gewuenscht). Leerer Text blendet sie aus.
function setQuizNotice(msg) {
  const el = $("quiz-notice");
  if (!el) return;
  if (msg) {
    el.textContent = msg;
    el.classList.remove("hidden");
  } else {
    el.textContent = "";
    el.classList.add("hidden");
  }
}

/* ---------- JSON-Schemata ---------- */

const QUESTIONS_SCHEMA = {
  type: "object",
  properties: {
    titel: { type: "string", description: "Kurzer Titel der Stelle" },
    arbeitgeber: {
      type: "string",
      description: "Name des ausschreibenden Unternehmens/Arbeitgebers, leerer String wenn nicht erkennbar",
    },
    arbeitsort: {
      type: "string",
      description: "Arbeitsort (Stadt bzw. Region) der Stelle, leerer String wenn nicht genannt oder rein remote",
    },
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
          typ: { type: "string", enum: ["multiple_choice", "offen", "reihenfolge"] },
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
            description: "Bei multiple_choice der Wortlaut EINER richtigen Option (bei Mehrfachauswahl der ersten); siehe korrekte_indizes fuer alle richtigen Optionen. Bei offenen Fragen eine knappe Musterantwort",
          },
          korrekte_indizes: {
            type: "array",
            items: { type: "integer" },
            description:
              "0-basierte Indizes ALLER richtigen Optionen in 'optionen'. " +
              "Bei multiple_choice genau ein Index => eine richtige Antwort (Standard); " +
              "mehrere Indizes => Mehrfachauswahl. Bei offenen Fragen leeres Array [].",
          },
          erklaerungen: {
            type: "array",
            items: { type: "string" },
            description: "Bei multiple_choice parallel zu optionen: je Option ein Satz, warum sie richtig oder falsch ist; bei offenen Fragen leeres Array",
          },
          elemente: {
            type: "array",
            items: { type: "string" },
            description: "Nur bei typ='reihenfolge': die zu ordnenden Elemente, bereits zufaellig gemischt (NICHT in korrekter Reihenfolge). Sonst leeres Array.",
          },
          korrekte_reihenfolge: {
            type: "array",
            items: { type: "integer" },
            description: "Nur bei typ='reihenfolge': Permutation der Indizes von elemente. Erster Eintrag = Index des Elements, das an Position 1 gehoert. Sonst leeres Array.",
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
        required: ["id", "typ", "kategorie", "schwierigkeit", "frage", "optionen", "korrekte_antwort", "korrekte_indizes", "erklaerungen", "elemente", "korrekte_reihenfolge", "lerninfo", "quellen"],
        additionalProperties: false,
      },
    },
  },
  required: ["titel", "arbeitgeber", "arbeitsort", "empfohlene_zeit_minuten", "fragen"],
  additionalProperties: false,
};

// Schlanke Variante fuer lokale Modelle (Ollama/LM Studio): ohne lerninfo und
// quellen. Diese beiden Felder sind beim Generieren am teuersten (viel Text,
// und "echte" Quellen kosten das Modell zusaetzlich Denkarbeit). Kleine
// Modelle auf dem eigenen Rechner muessen so pro Frage deutlich weniger
// erzeugen - das beugt dem Abschneiden am Kontextlimit vor und ist schneller.
// Beides wird erst beim Aufloesen einer Frage einzeln nachgeladen
// (enrichQuestionLocal), und nur wenn der Nutzer die Frage wirklich aufdeckt.
const QUESTIONS_SCHEMA_LOCAL = (() => {
  const s = JSON.parse(JSON.stringify(QUESTIONS_SCHEMA));
  const item = s.properties.fragen.items;
  delete item.properties.lerninfo;
  delete item.properties.quellen;
  item.required = item.required.filter((k) => k !== "lerninfo" && k !== "quellen");
  return s;
})();

// Nur die beim Aufloesen nachgeladenen Felder (lokaler Lernmodus)
const ENRICH_SCHEMA = {
  type: "object",
  properties: {
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
  required: ["lerninfo", "quellen"],
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
  const validTyp = (t) => (t === "multiple_choice" || t === "offen" || t === "reihenfolge" ? t : "offen");
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
    // korrekte_indizes defensiv normalisieren: nur gueltige Optionsindizes,
    // ohne Duplikate. Additiv - alte Daten ohne das Feld bleiben [].
    let korrekte_antwort = typeof q.korrekte_antwort === "string" ? q.korrekte_antwort : "";
    let korrekte_indizes = [];
    let erklaerungen = Array.isArray(q.erklaerungen) ? q.erklaerungen.filter((e) => typeof e === "string") : [];
    if (typ === "multiple_choice") {
      korrekte_indizes = Array.isArray(q.korrekte_indizes)
        ? q.korrekte_indizes
            .map((n) => Number(n))
            .filter((n) => Number.isInteger(n) && n >= 0 && n < optionen.length)
        : [];
      korrekte_indizes = [...new Set(korrekte_indizes)];
      // Konsistenz mit korrekte_antwort (defensiv, niemals werfen):
      // - kein Index, aber korrekte_antwort matcht eine Option => Index heilen.
      if (!korrekte_indizes.length && korrekte_antwort.trim()) {
        const m = optionen.findIndex((o) => o.trim() === korrekte_antwort.trim());
        if (m >= 0) korrekte_indizes = [m];
      }
      // - Sind gueltige Indizes vorhanden, sind SIE die einzige Wahrheit:
      //   korrekte_antwort IMMER an den ersten richtigen Index angleichen. Sonst
      //   koennte das Modell korrekte_indizes:[2] und korrekte_antwort=Option 1
      //   liefern - dann markiert mcCorrectIndices() Option 2 als richtig,
      //   waehrend Single-Choice-Render, Dedup und Eval-Payload Option 1 nutzen.
      //   Ein solcher Widerspruch wuerde den Nutzer gegen eine andere Option
      //   bewerten als angezeigt. Das Angleichen schliesst das aus.
      if (korrekte_indizes.length && optionen[korrekte_indizes[0]]) {
        korrekte_antwort = optionen[korrekte_indizes[0]];
      }

      // Antwortoptionen unsichtbar mischen (clientseitig, einmalig beim Laden):
      // manche Modelle legen die richtige Option auffaellig oft auf denselben
      // Platz (meist die erste). Optionen und die parallel laufenden erklaerungen
      // gemeinsam permutieren und korrekte_indizes auf die neuen Positionen
      // umrechnen, damit die Zuordnung exakt erhalten bleibt. Laeuft in
      // normalizeQuizData (einmal pro Quiz, alle Provider); das Ergebnis wird
      // gespeichert, sodass sich die Reihenfolge bei Re-Render/Review nicht aendert.
      if (optionen.length >= 2) {
        const perm = optionen.map((_, idx) => idx);
        for (let p = perm.length - 1; p > 0; p--) {
          const r = Math.floor(Math.random() * (p + 1));
          [perm[p], perm[r]] = [perm[r], perm[p]];
        }
        // perm[neu] = alterIndex; inv[alterIndex] = neu.
        const inv = [];
        perm.forEach((alt, neu) => { inv[alt] = neu; });
        optionen = perm.map((alt) => optionen[alt]);
        if (erklaerungen.length) erklaerungen = perm.map((alt) => erklaerungen[alt] || "");
        korrekte_indizes = korrekte_indizes
          .map((alt) => inv[alt])
          .filter((n) => Number.isInteger(n))
          .sort((a, b) => a - b);
        if (korrekte_indizes.length && optionen[korrekte_indizes[0]]) {
          korrekte_antwort = optionen[korrekte_indizes[0]];
        }
      }
    }

    // Reihenfolge-Aufgabe: nur gueltig, wenn elemente + korrekte_reihenfolge
    // eine echte Permutation bilden. Sonst auf offene Frage zurueckfallen
    // (immer bedienbar). Felder werden unten IMMER mitgeschrieben (leer bei
    // Nicht-Reihenfolge), damit das interne Quiz-Objekt formstabil ist.
    let elemente = [];
    let korrekte_reihenfolge = [];
    if (typ === "reihenfolge") {
      elemente = Array.isArray(q.elemente) ? q.elemente.filter((e) => typeof e === "string" && e.trim()) : [];
      const roh = Array.isArray(q.korrekte_reihenfolge) ? q.korrekte_reihenfolge.map(Number) : [];
      const istPermutation =
        elemente.length >= 2 &&
        roh.length === elemente.length &&
        roh.every((x) => Number.isInteger(x) && x >= 0 && x < elemente.length) &&
        new Set(roh).size === elemente.length;
      if (istPermutation) {
        korrekte_reihenfolge = roh;
      } else {
        typ = "offen";
        elemente = [];
        korrekte_reihenfolge = [];
      }
    }

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
      // Eigene, garantiert eindeutige id (Position) statt der modellgelieferten:
      // Modelle vergeben ids nicht zwingend eindeutig (und bei Batch-Generierung
      // wiederholen sie sich ueber Batches hinweg als 1..n). Da Auswertung und
      // Anzeige Ergebnisse per id den Fragen zuordnen (runEvaluation-Merge,
      // renderResult), wuerde eine doppelte id ein fremdes Ergebnis auf die
      // falsche Frage schreiben - inkl. Historie/Prozent/Abzeichen. Eindeutige
      // 1..n-ids schliessen das aus. (Der lokale Batch-Pfad renummeriert ohnehin.)
      id: i + 1,
      typ,
      kategorie: typeof q.kategorie === "string" ? q.kategorie : "",
      schwierigkeit: validDiff(q.schwierigkeit),
      frage,
      optionen,
      korrekte_antwort,
      korrekte_indizes,
      erklaerungen,
      elemente,
      korrekte_reihenfolge,
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
    arbeitgeber: typeof result.arbeitgeber === "string" ? result.arbeitgeber.trim() : "",
    arbeitsort: typeof result.arbeitsort === "string" ? result.arbeitsort.trim() : "",
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
      ? result.ergebnisse
          .filter((e) => e && typeof e === "object")
          // id auf Zahl normalisieren: nicht-strikte Provider (Hosted guenstig,
          // DeepSeek, lokal) liefern id teils als String ("1"). Sonst scheitert
          // der id-basierte Abgleich (runEvaluation-Merge, renderResult) und
          // gueltige Bewertungen wuerden faelschlich als 0 gespeichert.
          .map((e) => ({ ...e, id: Number(e.id) }))
      : [],
    gesamt: {
      prozent,
      zusammenfassung: typeof g.zusammenfassung === "string" ? g.zusammenfassung : "",
      staerken: strArr(g.staerken),
      verbesserungen: strArr(g.verbesserungen),
    },
  };
}

/* ---------- Reihenfolge-Aufgaben: Helfer ---------- */

// Liefert eine gemischte Startpermutation [0..n-1]. Fisher-Yates. Faengt den
// Sonderfall ab, dass die zufaellige Mischung exakt der korrekten Reihenfolge
// entspricht (waere als Startzustand unfair einfach): in dem Fall einmal
// rotieren. correctOrder ist optional und dient nur diesem Abgleich.
function shuffleOrder(n, correctOrder) {
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  if (n >= 2 && Array.isArray(correctOrder) && correctOrder.length === n) {
    const gleich = a.every((x, i) => x === correctOrder[i]);
    if (gleich) {
      // rotieren, damit der Start nicht zufaellig schon die Loesung ist
      a.push(a.shift());
    }
  }
  return a;
}

// Parst eine gespeicherte Nutzerreihenfolge (JSON-Index-Array). Gibt nur eine
// gueltige Permutation von 0..n-1 zurueck, sonst null (-> als unbeantwortet /
// 0 Punkte behandeln, nie crashen).
function parseOrder(str, n) {
  try {
    const a = JSON.parse(str);
    if (
      Array.isArray(a) &&
      a.length === n &&
      a.every((x) => Number.isInteger(x) && x >= 0 && x < n) &&
      new Set(a).size === n
    ) {
      return a;
    }
  } catch {}
  return null;
}

// Deterministisches Partial-Credit-Scoring fuer Reihenfolge-Aufgaben:
// Kendall-Tau-basierter Anteil korrekt geordneter Paare (0..10, ganzzahlig).
// Verzeiht kleine Verschiebungen, voll umgekehrt -> 0, exakt richtig -> 10.
function scoreReihenfolge(userOrder, correctOrder) {
  const n = correctOrder.length;
  if (n < 2) return 10;
  const rank = new Array(n);
  correctOrder.forEach((el, pos) => { rank[el] = pos; });
  let concordant = 0;
  let total = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      total++;
      if (rank[userOrder[i]] < rank[userOrder[j]]) concordant++;
    }
  }
  const frac = total ? concordant / total : 1;
  return Math.round(frac * 10);
}

/* ---------- LLM-Aufruf (Anthropic / OpenAI) ---------- */

// Liest einen SSE-Stream und sammelt die per extractDelta gelieferten
// Textstuecke; onChunk bekommt nach jedem Stueck den bisherigen Gesamttext
async function readSSEText(res, extractDelta, onChunk) {
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buf = "";
  let acc = "";

  const handleLine = (line) => {
    if (!line.startsWith("data:")) return;
    const payload = line.slice(5).trim();
    if (!payload || payload === "[DONE]") return;
    let data;
    try {
      data = JSON.parse(payload);
    } catch {
      return;
    }
    const delta = extractDelta(data);
    if (delta) {
      acc += delta;
      if (onChunk) onChunk(acc);
    }
  };

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });
    const lines = buf.split("\n");
    buf = lines.pop();
    for (const line of lines) handleLine(line);
  }
  // Decoder leeren (evtl. halbes Multi-Byte-Zeichen am Stream-Ende) und eine
  // letzte, nicht mit \n abgeschlossene data:-Zeile noch verarbeiten - sonst
  // geht beim OpenAI-Pfad z. B. der abschliessende usage-Chunk verloren.
  buf += decoder.decode();
  if (buf) handleLine(buf);
  return acc;
}

/* ---------- Hosted-Modus (gehosteter Worker, kein Nutzer-Key) ---------- */

// Basis-URL des Hosted-Workers. Override per localStorage nur fuer lokale Tests
// (z. B. gegen `wrangler dev`), Default ist die Produktions-Subdomain.
function hostedBase() {
  try {
    return localStorage.getItem("bewerbungstool.hostedBase") || "https://api.jobreif.de";
  } catch {
    return "https://api.jobreif.de";
  }
}

// Turnstile (Bot-/Missbrauchsschutz im Hosted-Modus). PRODUKTION: echten Sitekey hier
// eintragen (Cloudflare-Dashboard → Turnstile). Override per localStorage nur fuer Tests
// (z. B. Cloudflare-Testkey "1x00000000000000000000BB" = unsichtbar, immer ok). Ohne
// Sitekey liefert getTurnstileToken "" → nur sinnvoll, wenn der Worker SKIP_TURNSTILE
// gesetzt hat. BYOK/lokal brauchen kein Turnstile.
const TURNSTILE_SITEKEY = "0x4AAAAAADmmEQ6MVc83TvmX";
function turnstileSitekey() {
  try {
    return localStorage.getItem("bewerbungstool.turnstileSitekey") || TURNSTILE_SITEKEY;
  } catch {
    return TURNSTILE_SITEKEY;
  }
}

let _tsWidgetId = null;
let _tsPending = null;

// Das Widget nur WÄHREND des Lösens einblenden; danach ausblenden, damit der kurze
// Challenge-/Erfolgs-Status keine App-Meldung (z. B. die Fehlerkarte) verdeckt.
function setTurnstileVisible(v) {
  const el = document.getElementById("turnstile-container");
  if (el) el.style.display = v ? "block" : "none";
}

// Wartet, bis das (async geladene) Turnstile-Script bereit ist.
async function turnstileReady(ms = 4000) {
  const start = Date.now();
  while (typeof window.turnstile === "undefined" && Date.now() - start < ms) {
    await new Promise((r) => setTimeout(r, 100));
  }
  return typeof window.turnstile !== "undefined";
}

// Rendert das Widget einmalig (execution:"execute" → laeuft erst bei execute();
// interaction-only → meist unsichtbar). Gibt true zurueck, wenn ein Widget bereitsteht.
function ensureTurnstileWidget() {
  const key = turnstileSitekey();
  if (!key || typeof window.turnstile === "undefined") return false;
  if (_tsWidgetId !== null) return true;
  try {
    _tsWidgetId = window.turnstile.render("#turnstile-container", {
      sitekey: key,
      execution: "execute",
      appearance: "interaction-only",
      callback: (token) => { if (_tsPending) { const f = _tsPending; _tsPending = null; f(token); } },
      "error-callback": () => { if (_tsPending) { const f = _tsPending; _tsPending = null; f(""); } },
      "timeout-callback": () => { if (_tsPending) { const f = _tsPending; _tsPending = null; f(""); } },
    });
    return _tsWidgetId != null;
  } catch {
    _tsWidgetId = null;
    return false;
  }
}

// Frisches, einmaliges Token fuer genau diese Aktion. Leerer String, wenn Turnstile
// nicht konfiguriert/bereit ist (dann muss der Worker SKIP_TURNSTILE gesetzt haben).
async function getTurnstileToken(action) {
  if (!turnstileSitekey()) return "";
  if (!(await turnstileReady())) return "";
  setTurnstileVisible(true); // VOR render/execute einblenden (Render braucht sichtbaren Host)
  if (!ensureTurnstileWidget()) { setTurnstileVisible(false); return ""; }
  return new Promise((resolve) => {
    let done = false;
    const finish = (t) => { if (!done) { done = true; setTurnstileVisible(false); resolve(t || ""); } };
    _tsPending = finish;
    try {
      window.turnstile.reset(_tsWidgetId); // vorheriges Token verwerfen → frisches erzwingen
      window.turnstile.execute(_tsWidgetId, { action });
    } catch {
      if (_tsPending === finish) _tsPending = null;
      finish("");
      return;
    }
    // Haengt das Widget, den Aufruf nicht ewig blockieren.
    setTimeout(() => { if (_tsPending === finish) _tsPending = null; finish(""); }, 20000);
  });
}

// Stabile, nutzerfreundliche Meldungen fuer die Hosted-Fehlercodes (Plan A.3.5).
function hostedErrorMessage(status) {
  switch (status) {
    case 403:
      return "Sicherheitsprüfung fehlgeschlagen. Bitte die Seite neu laden und erneut versuchen.";
    case 429:
      return "Gerade sind viele Anfragen unterwegs (oder dein Tageskontingent ist erreicht). Bitte kurz warten und erneut versuchen.";
    case 503:
      return "Das kostenlose Tageskontingent ist für heute erschöpft – morgen ist es wieder verfügbar. Wenn du sofort weitermachen möchtest, kannst du in den Einstellungen unter „Anbieter“ einen eigenen API-Schlüssel hinterlegen.";
    case 402:
      return "Diese Qualitätsstufe ist im kostenlosen Modus nicht verfügbar.";
    case 400:
      return "Die Anfrage war ungültig. Bitte die Stellenanzeige prüfen.";
    default:
      return "Der Dienst ist momentan nicht erreichbar. Bitte später erneut versuchen.";
  }
}

// Hosted-Aufruf: schickt strukturierte DATEN (keine Prompts) an den app-spezifischen
// Worker-Endpoint; der Worker baut Prompt + Schema und streamt im OpenAI-SSE-Format
// zurueck, sodass readSSEText/parseJsonLoose unveraendert greifen. Kosten bleiben im
// Hosted-Modus verborgen (fuer den Nutzer gratis) → cost/tokens null.
async function callHosted(hosted, onProgress, opts = {}) {
  if (!hosted || !hosted.action) {
    throw new Error("Interner Fehler: Hosted-Aufruf ohne Aktion.");
  }
  const tier = settings.tier || "standard";
  const body = JSON.stringify({ ...hosted.payload, tier });
  const headers = { "Content-Type": "application/json" };
  const token = await getTurnstileToken(hosted.action);
  if (token) headers["CF-Turnstile-Token"] = token;

  let res;
  try {
    res = await fetch(hostedBase() + "/api/" + hosted.action, {
      method: "POST",
      headers,
      body,
      signal: opts.signal,
    });
  } catch (e) {
    if (e && e.name === "AbortError") throw e;
    throw new Error("Keine Verbindung zum Dienst. Bitte Internetverbindung prüfen und erneut versuchen.");
  }

  if (!res.ok) throw new Error(hostedErrorMessage(res.status));

  let finishReason = null;
  const text = await readSSEText(
    res,
    (d) => {
      if (d.choices?.[0]?.finish_reason) finishReason = d.choices[0].finish_reason;
      return d.choices?.[0]?.delta?.content || "";
    },
    onProgress
  );

  if (finishReason === "length") {
    throw new Error("Die Antwort wurde abgeschnitten. Bitte mit weniger Fragen erneut versuchen.");
  }
  if (!text) throw new Error("Leere Antwort vom Dienst erhalten.");
  // Kosten/Token im Hosted-Modus bewusst nicht ausweisen (gratis fuer den Nutzer).
  return { data: parseJsonLoose(text), cost: null, tokens: null };
}

async function callLLM(systemPrompt, userPrompt, schema, onProgress, opts = {}) {
  const provider = settings.provider || "hosted";
  // Hosted ist der Default: strukturierte Daten an den Worker, kein Nutzer-Key.
  if (provider === "hosted") {
    return callHosted(opts.hosted, onProgress, opts);
  }
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
      signal: opts.signal,
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
  const doPost = () => fetch(endpoint, { method: "POST", headers, body: JSON.stringify(body), signal: opts.signal });

  let res;
  try {
    res = await doPost();
  } catch (e) {
    // Abbruch durch den Nutzer (AbortController) unveraendert weiterreichen,
    // damit die Batch-Schleife ihn als Abbruch und nicht als Verbindungsfehler
    // behandelt.
    if (e && e.name === "AbortError") throw e;
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
      if (e && e.name === "AbortError") throw e;
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
    const host = new URL(url).hostname;
    isLinkedIn = host === "linkedin.com" || host.endsWith(".linkedin.com");
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

// Lokale Modelle bekommen einen kuerzeren Jobtext (kleinerer Kontext).
const LOCAL_JOBTEXT_CAP = 8000;
// Wie viele Fragen pro Aufruf hoechstens angefordert werden. Bewusst gross:
// Messungen mit qwen3-8b zeigen, dass ein einzelner Aufruf bis ~20 Fragen
// zuverlaessig und ohne Wiederholungen liefert, weil das Modell beim Schreiben
// die schon erzeugten Fragen sieht und von selbst variiert. Blockweises
// Nachfragen (frueher 3 pro Aufruf) war die Ursache der Dubletten: kleine
// Modelle ignorierten die Bitte "stelle etwas anderes" und erzeugten den
// ersten Block greedy immer wieder neu. Nur wenn ein Modell bei sehr vielen
// Fragen zu wenige liefert, wird in weiteren Runden aufgefuellt.
const LOCAL_BATCH_SIZE = 15;

// Vergleichsschluessel zum Erkennen doppelter Fragen. Kleine lokale Modelle
// ignorieren die Bitte "keine Wiederholungen" mitunter und liefern dieselbe
// Frage in einem spaeteren Block erneut - die fangen wir hier im Code ab.
// Der Schluessel umfasst bewusst auch Optionen und Musterantwort: zwei
// Multiple-Choice-Fragen mit gleichem Stamm ("Welche Aussage ist korrekt?"),
// aber unterschiedlichen Antworten sind verschiedene Fragen und sollen nicht
// faelschlich als Dublette verworfen werden.
function normText(t) {
  return String(t || "")
    .toLowerCase()
    .replace(/[^\wäöüß ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
function fragenKey(q) {
  const optionen = Array.isArray(q.optionen) ? q.optionen : [];
  // Optionen SORTIERT (und normalisiert) einbeziehen, damit der Schluessel
  // unabhaengig von der Anzeige-Reihenfolge ist. normalizeQuizData mischt die
  // Optionen jetzt zufaellig; ohne Sortierung bekaeme dieselbe MC-Frage aus zwei
  // lokalen Batches unterschiedliche Schluessel und wuerde nicht mehr als
  // Dublette erkannt.
  const optsNorm = optionen.map(normText).sort();
  // Korrektheit als SORTIERTE MENGE der richtigen Optionstexte (shuffle-
  // invariant). NICHT korrekte_antwort verwenden: das ist bei Mehrfach-MC
  // optionen[korrekte_indizes[0]] und haengt damit von der gemischten
  // Reihenfolge ab - dieselbe Frage bekaeme sonst je Shuffle einen anderen
  // Schluessel. Bei offenen Fragen (keine Optionen) bleibt die Musterantwort
  // (korrekte_antwort) der Korrektheitsteil wie bisher.
  const correctNorm = [...mcCorrectIndices(q)]
    .map((i) => optionen[i])
    .filter((o) => typeof o === "string")
    .map(normText)
    .sort();
  const answerPart = optionen.length ? correctNorm : [normText(q.korrekte_antwort)];
  return [normText(q.frage), ...answerPart, "|opt|", ...optsNorm].join(" | ");
}

/* ---------- Multiple-Choice: ein vs. mehrere richtige Antworten ---------- */
// Mehrfach-MC wird ueber das additive Feld korrekte_indizes signalisiert (Anzahl
// richtiger Optionen > 1). Alle Helfer lesen defensiv, damit alt-generierte
// Quizze und gespeicherte Versuche ohne korrekte_indizes wie bisher als
// Single-Choice laufen (Rueckfall auf korrekte_antwort).

// Liefert die Menge der richtigen Options-Indizes einer MC-Frage, defensiv.
// Mehrfach-MC: aus korrekte_indizes (gefiltert auf gueltige Optionsindizes).
// Single-Choice / alte Fragen: Index der Option, die korrekte_antwort entspricht.
function mcCorrectIndices(q) {
  const optionen = Array.isArray(q.optionen) ? q.optionen : [];
  if (Array.isArray(q.korrekte_indizes) && q.korrekte_indizes.length) {
    const set = new Set(
      q.korrekte_indizes
        .map((n) => Number(n))
        .filter((n) => Number.isInteger(n) && n >= 0 && n < optionen.length),
    );
    if (set.size) return set;
  }
  // Fallback: Single-Choice ueber Wortlaut
  const ka = (q.korrekte_antwort || "").trim();
  const idx = optionen.findIndex((o) => typeof o === "string" && o.trim() === ka);
  return new Set(idx >= 0 ? [idx] : []);
}

// true, wenn die Frage als Mehrfachauswahl behandelt werden soll. Haengt an der
// Zahl der RICHTIGEN Optionen, nicht an einem Schema-Flag: liefert das Modell
// faelschlich nur eine richtige Option, faellt die Frage automatisch auf
// sauberes Single-Choice zurueck.
function mcIsMulti(q) {
  return q.typ === "multiple_choice" && mcCorrectIndices(q).size > 1;
}

// Mehrfach-MC-Auswahl <-> answers-String. Format: JSON-Array der ausgewaehlten
// Optionsindizes, z. B. "[0,2]". answers ist bereits string[]; ein JSON-Array
// bleibt ein String und bricht beim Speichern/Wiederherstellen nichts.
function parseMultiSelection(answerStr) {
  try {
    const arr = JSON.parse(answerStr);
    return new Set(Array.isArray(arr) ? arr.map(Number).filter(Number.isInteger) : []);
  } catch {
    return new Set();
  }
}
function serializeMultiSelection(set) {
  return JSON.stringify([...set].sort((a, b) => a - b));
}

// Lokales, deterministisches Partial-Credit-Scoring fuer Mehrfach-MC (0-10, keine
// echten Negativpunkte). Liefert einen Eintrag im EVAL_SCHEMA-Format
// (id/punkte/feedback/musterantwort), damit er sich mit den Modell-Ergebnissen
// mergen laesst.
function scoreMultiMc(q, answerStr) {
  const correct = mcCorrectIndices(q);
  const sel = parseMultiSelection(answerStr || "");
  const c = correct.size;
  const optionen = Array.isArray(q.optionen) ? q.optionen : [];
  const w = optionen.length - c;
  let tp = 0;
  let fp = 0;
  sel.forEach((i) => (correct.has(i) ? tp++ : fp++));
  const score = Math.max(0, (c ? tp / c : 0) - (w > 0 ? fp / w : 0));
  const punkte = Math.round(score * 10);
  const richtige = [...correct].sort((a, b) => a - b).map((i) => optionen[i]).filter((t) => t);
  return {
    id: q.id,
    punkte,
    feedback:
      sel.size === 0
        ? "Keine Option ausgewählt."
        : `${tp} von ${c} richtigen Optionen getroffen` +
          (fp ? `, ${fp} falsch gewählt.` : "."),
    musterantwort: "Richtig: " + richtige.join(", "),
  };
}

// Der exakte Schluessel oben faengt nur wortgleiche Wiederholungen. Schwache
// Modelle stellen aber auch dieselbe Frage leicht umformuliert ("zum
// Tagesgeschaeft gehoert..." vs. "primaer im Tagesgeschaeft enthalten...").
// Solche Fast-Dubletten erkennen wir ueber die Aehnlichkeit der Inhaltswoerter.

// Deutsche Stoppwoerter und Frage-Floskeln, die fuer den Vergleich nichts
// beitragen. Bewusst knapp: es geht nur darum, das Frame ("Welche der
// folgenden ...") herauszufiltern, damit die Inhaltswoerter vergleichbar werden.
const STOPWORDS = new Set((
  "der die das des dem den ein eine einer eines einem einen und oder aber " +
  "ist sind war waren wird werden kann koennen soll sollte sollen muss muessen " +
  "im in an auf zu zur zum von vom bei mit nach aus fuer ueber unter durch um " +
  "welche welcher welches welchen welchem wie was warum wann wo wer wen wem " +
  "folgende folgenden folgender man sich nicht auch nur als wenn dass ihre ihren"
).split(" "));

// Inhaltswoerter einer Frage als Menge: klein, ohne Satzzeichen, ohne
// Stoppwoerter, mindestens drei Zeichen.
function contentWords(frage) {
  return new Set(
    normText(frage).split(" ").filter((w) => w.length > 2 && !STOPWORDS.has(w))
  );
}

// Jaccard-Aehnlichkeit zweier Wortmengen (Schnitt / Vereinigung).
function jaccard(a, b) {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  for (const w of a) if (b.has(w)) inter++;
  return inter / (a.size + b.size - inter);
}

// Ab dieser Aehnlichkeit gelten zwei inhaltsreiche Fragen als inhaltlich gleich.
const FRAGE_AEHNLICH_SCHWELLE = 0.5;
// Erst ab so vielen Inhaltswoertern wird unscharf verglichen. Kurze, generische
// Staemme ("Welche Aussage ist korrekt?") haben zu wenige Inhaltswoerter; sie
// unscharf zu vergleichen wuerde verschiedene Fragen mit gleichem Stamm, aber
// anderen Antworten faelschlich verwerfen - die deckt nur fragenKey() ab.
const FRAGE_MIN_INHALTSWOERTER = 4;

// Lokale Generierung. Im Normalfall (bis LOCAL_BATCH_SIZE Fragen) ist das ein
// einziger Aufruf - das vermeidet die Dubletten, die beim blockweisen
// Nachfragen entstanden. Liefert ein Modell bei sehr vielen Fragen zu wenige,
// wird in weiteren Runden aufgefuellt; dabei verworfene Dubletten fangen wir
// zusaetzlich im Code ab. Der Nutzer kann jederzeit abbrechen; schon fertige
// Runden bleiben erhalten. Liefert dieselbe Form wie callLLM: { data, cost, tokens }.
async function generateLocalBatches(system, jobText, total, onProgress) {
  const collected = [];
  // Schon vergebene Fragen-Schluessel, um Dubletten ueber Bloecke hinweg zu
  // verwerfen.
  const seenFragen = new Set();
  // Inhaltswort-Mengen der schon uebernommenen Fragen, fuer die unscharfe
  // Dublettenpruefung (gleiches Thema, nur anders formuliert).
  const acceptedWords = [];
  let meta = null;
  let cost = 0, input = 0, output = 0;
  let aborted = false;

  const controller = new AbortController();
  // Knopf im Lade-Overlay: bricht den laufenden Block ab; die schon fertigen
  // Bloecke bleiben erhalten.
  showAbortButton(() => { aborted = true; controller.abort(); });

  try {
    // Es wird so lange nachgefordert, wie das Modell noch neue Fragen liefert -
    // nicht bis zu einer festen, aus der Wunschzahl abgeleiteten Rundenzahl.
    // Sonst kappt ein langsam, aber stetig lieferndes Modell den Katalog
    // vorzeitig: Bei z. B. 30 angeforderten Fragen und nur wenigen neuen Fragen
    // pro Antwort waere frueher nach der festen Rundenzahl stillschweigend ein
    // unvollstaendiger Fragebogen herausgekommen. Abgebrochen wird jetzt nur,
    // wenn genug Fragen da sind, der Nutzer stoppt, oder das Modell zwei Runden
    // in Folge gar nichts Neues mehr liefert (Stillstand). maxRounds bleibt nur
    // als harter Notnagel gegen Endlosschleifen, falls ein Modell unbegrenzt je
    // eine neue Frage nachschiebt.
    const maxRounds = total + 4;
    let round = 0;
    // Zwei Runden in Folge ohne neue Frage -> aufgeben (nur noch Dubletten).
    let leerlauf = 0;
    // Hat das Modell schon einmal weniger geliefert als angefordert, fordern wir
    // von da an kleinere Bloecke an - darauf antworten kleine Modelle oft
    // zuverlaessiger als auf einen grossen Block.
    let unterliefert = false;
    while (collected.length < total && round < maxRounds && !aborted) {
      round++;
      const cap = unterliefert ? Math.max(3, Math.ceil(LOCAL_BATCH_SIZE / 2)) : LOCAL_BATCH_SIZE;
      const n = Math.min(cap, total - collected.length);
      const asked = collected.map((q) => "- " + q.frage).join("\n");
      const user =
        `Erstelle genau ${n} Fragen eines Einstellungstests zu dieser Stellenausschreibung:\n\n` +
        jobText +
        (asked
          ? `\n\nDiese Fragen wurden bereits gestellt - stelle inhaltlich andere, ohne Wiederholungen:\n${asked}`
          : "");

      let out;
      try {
        out = await callLLM(system, user, QUESTIONS_SCHEMA_LOCAL, (acc) => {
          const seen = (acc.match(/"frage"\s*:/g) || []).length;
          onProgress(collected.length + seen);
        }, { signal: controller.signal });
      } catch (e) {
        if (e && e.name === "AbortError") { aborted = true; break; }
        // Spaeterer Block scheitert, aber es gibt schon brauchbare Fragen ->
        // diese behalten statt den ganzen Lauf zu verwerfen.
        if (collected.length) break;
        throw e;
      }

      let norm;
      try {
        norm = normalizeQuizData(out.data);
      } catch (e) {
        if (collected.length) break;
        throw e;
      }
      if (!meta) meta = norm;
      // Nur inhaltlich neue Fragen uebernehmen; bereits gestellte verwerfen.
      let neu = 0;
      for (const q of norm.fragen) {
        // Fragen ohne Fragetext sind unbrauchbar und werden uebersprungen.
        if (!normText(q.frage)) continue;
        const key = fragenKey(q);
        if (seenFragen.has(key)) continue;
        // Unscharfe Dublette: inhaltsreiche Frage, die einer schon vorhandenen
        // sehr aehnlich ist (gleiches Thema, nur umformuliert) -> verwerfen.
        const words = contentWords(q.frage);
        if (
          words.size >= FRAGE_MIN_INHALTSWOERTER &&
          acceptedWords.some(
            (w) => w.size >= FRAGE_MIN_INHALTSWOERTER && jaccard(words, w) >= FRAGE_AEHNLICH_SCHWELLE
          )
        ) {
          continue;
        }
        seenFragen.add(key);
        collected.push(q);
        acceptedWords.push(words);
        neu++;
      }
      cost += out.cost || 0;
      input += out.tokens?.input || 0;
      output += out.tokens?.output || 0;
      onProgress(collected.length);
      // Ab jetzt gibt es fertige Fragen -> Stopp uebernimmt sie statt zu verwerfen.
      if (collected.length) markAbortKeepsResults();
      // Hat das Modell weniger als angefordert geliefert, kuenftig kleinere
      // Bloecke anfordern.
      if (neu < n) unterliefert = true;
      // Kam diesmal gar nichts Neues, nicht endlos weiterprobieren.
      if (neu === 0) {
        if (++leerlauf >= 2) break;
      } else {
        leerlauf = 0;
      }
    }
  } finally {
    hideAbortButton();
  }

  if (!collected.length) {
    throw new Error(aborted
      ? "Abgebrochen, bevor die erste Frage fertig war."
      : "Die Modellantwort enthielt keine verwertbaren Fragen.");
  }

  // Fragen fortlaufend neu nummerieren (jeder Block zaehlt bei 1 los) und auf
  // die gewuenschte Zahl kappen, falls der letzte Block ueberliefert hat.
  const fragen = collected.slice(0, total).map((q, i) => ({ ...q, id: i + 1 }));
  // Die Zeitschaetzung kommt aus dem ersten Block (nur wenige Fragen) und wird
  // auf die Gesamtzahl hochgerechnet; computeTimeLimitMin faengt Ausreisser
  // ohnehin mit einer Faustregel ab.
  const zeitProFrage = meta.empfohlene_zeit_minuten / Math.max(1, meta.fragen.length);
  const zeit = Math.round(zeitProFrage * fragen.length);

  return {
    data: {
      titel: meta.titel,
      arbeitgeber: meta.arbeitgeber,
      arbeitsort: meta.arbeitsort,
      empfohlene_zeit_minuten: Number.isFinite(zeit) && zeit > 0 ? zeit : 0,
      fragen,
    },
    cost,
    tokens: { input, output },
    // true, wenn der Nutzer selbst gestoppt hat - dann ist eine kleinere
    // Fragenzahl gewollt und kein Hinweis auf Unterlieferung noetig.
    aborted,
  };
}

// Laedt fuer eine einzelne Frage Lernhintergrund und Quellen nach. Wird nur im
// lokalen Lernmodus beim Aufloesen aufgerufen (kleiner, billiger Aufruf statt
// alles bei der Generierung mitzuerzeugen).
async function enrichQuestionLocal(q) {
  const system =
    "Du bist ein erfahrener Recruiter und Fachexperte. Liefere zu einer Pruefungsfrage einen kurzen, " +
    "lernrelevanten Hintergrund (2 bis 4 Saetze) und 1 bis 3 reale Quellen zur Vertiefung. " +
    "Nenne nur real existierende Quellen (Gesetze, Normen, Standardwerke, offizielle Dokumentation, etablierte Fachseiten). " +
    "Gib die URL einer Quelle nur an, wenn du dir sicher bist, dass sie existiert - bevorzugt stabile Startseiten oder " +
    "bekannte Adressen. Sonst lasse die URL leer und waehle einen praegnanten Titel, der sich als Suchbegriff eignet. " +
    "Antworte auf Deutsch.";
  const user =
    `Frage: ${q.frage}\n` +
    (q.optionen && q.optionen.length ? `Antwortoptionen: ${q.optionen.join(" | ")}\n` : "") +
    `Korrekte Antwort: ${q.korrekte_antwort || ""}`;
  const { data } = await callLLM(system, user, ENRICH_SCHEMA);
  const lerninfo = data && typeof data.lerninfo === "string" ? data.lerninfo.trim() : "";
  const quellen = data && Array.isArray(data.quellen)
    ? data.quellen
        .filter((s) => s && typeof s === "object")
        .map((s) => ({
          titel: typeof s.titel === "string" ? s.titel : "",
          url: typeof s.url === "string" ? s.url : "",
        }))
        .filter((s) => s.titel || s.url)
    : [];
  return { lerninfo, quellen };
}

// Reichert die gerade aufgeloeste Frage nach, sofern noetig und erlaubt: nur bei
// lokalem Anbieter, nicht beim Durchsehen eines alten Versuchs, nicht wenn die
// Felder schon da sind (z. B. aus der Cloud-Generierung oder bereits geladen),
// und je Frage nur einmal versucht. Kostet bei lokalen Modellen nichts.
function maybeEnrichRevealed(idx) {
  if ((settings.provider || "anthropic") !== "local" || reviewing) return;
  const q = quiz && quiz.fragen && quiz.fragen[idx];
  if (!q || enrichTried.has(idx)) return;
  if (q.lerninfo || (q.quellen && q.quellen.length)) return;
  enrichTried.add(idx);
  enrichingIdx = idx;
  renderQuestion();
  enrichQuestionLocal(q)
    .then((res) => {
      if (res.lerninfo) q.lerninfo = res.lerninfo;
      if (res.quellen && res.quellen.length) q.quellen = res.quellen;
    })
    .catch(() => {
      // Fehlschlag bleibt still: die Aufloesung zeigt dann nur die Erklaerungen.
    })
    .finally(() => {
      if (enrichingIdx === idx) enrichingIdx = -1;
      // Nur neu zeichnen, wenn der Nutzer noch bei dieser aufgeloesten Frage ist.
      if (current === idx && revealed[idx] && !reviewing) renderQuestion();
    });
}

// Schema fuer die Themenfeld-Ableitung der Vertiefungen. Bewusst klein und
// fokussiert: nur Label, ein Beschreibungssatz und ein Schwerpunkt-Flag. Die
// stabile id vergeben wir im Code (index-basiert), nicht das Modell.
const THEMENFELDER_SCHEMA = {
  type: "object",
  properties: {
    themenfelder: {
      type: "array",
      items: {
        type: "object",
        properties: {
          label: { type: "string", description: "Kurzer, praegnanter Name des Themenfelds" },
          kurzbeschreibung: { type: "string", description: "Ein Satz, was dieses Feld umfasst" },
          schwerpunkt: { type: "boolean", description: "true, wenn der Bewerber laut Schwachstellen-Liste hier bisher schwach war" },
        },
        required: ["label", "kurzbeschreibung", "schwerpunkt"],
        additionalProperties: false,
      },
      description: "4 bis 6 trennscharfe, stellenspezifische Themenfelder",
    },
  },
  required: ["themenfelder"],
  additionalProperties: false,
};

// Kompakte Schwachstellen-Liste aus den bisherigen Versuchen: je bewerteter
// Frage die erreichten Punkte (0-10), schwaechste zuerst. Defensiv gegen alte
// Versuche ohne ergebnisse/quiz. Dient als Input fuer die Themenfeld-Ableitung,
// damit das Modell Schwerpunkte dort setzt, wo der Bewerber schlecht war.
function buildSchwaechenSummary(job) {
  const rows = [];
  (job && Array.isArray(job.attempts) ? job.attempts : []).filter(Boolean).forEach((att) => {
    const fragen = att.quiz && Array.isArray(att.quiz.fragen) ? att.quiz.fragen : [];
    const erg = att.result && Array.isArray(att.result.ergebnisse) ? att.result.ergebnisse : [];
    fragen.forEach((f, i) => {
      const e = erg[i] || erg.find((x) => x && Number(x.id) === Number(f.id));
      const p = e && Number.isFinite(Number(e.punkte)) ? Number(e.punkte) : null;
      if (p !== null) rows.push({ kategorie: f.kategorie || "", frage: f.frage || "", punkte: p });
    });
  });
  rows.sort((a, b) => a.punkte - b.punkte);
  const worst = rows.slice(0, 12);
  if (!worst.length) return "Keine bewerteten Einzelfragen vorhanden.";
  return worst.map((r) => `- [${r.punkte}/10] ${r.kategorie ? r.kategorie + ": " : ""}${r.frage}`).join("\n");
}

// Leitet aus Stellentext + Schwachstellen 4-6 Themenfelder ab. Ein Cloud-Aufruf,
// nur per ausdruecklichem Klick (Kostenregel). Gibt Felder samt Kosten/Token
// zurueck; das Persistieren uebernimmt saveThemenfelder.
async function deriveThemenfelder(job) {
  const system =
    "Du bist ein erfahrener Recruiter und Fachexperte. Leite aus einer Stellenausschreibung " +
    "4 bis 6 trennscharfe, stellenspezifische Themenfelder ab, in denen sich ein Bewerber gezielt " +
    "vertiefen kann. Die Felder muessen sich klar voneinander abgrenzen und konkret zur Stelle passen " +
    "- keine generischen Floskeln. Markiere ein Feld als Schwerpunkt (schwerpunkt=true), wenn der " +
    "Bewerber laut der Schwachstellen-Liste dort bisher schwach war. Antworte auf Deutsch.";
  const user =
    `Stellenausschreibung:\n\n${(job.jobText || "").slice(0, 30000)}\n\n` +
    `Bisherige Schwachstellen des Bewerbers (Punkte je Frage, 0-10, schwaechste zuerst):\n${buildSchwaechenSummary(job)}`;
  const { data, cost, tokens } = await callLLM(system, user, THEMENFELDER_SCHEMA, undefined, {
    hosted: { action: "themenfelder", payload: { jobText: job.jobText || "", schwaechen: buildSchwaechenSummary(job) } },
  });
  const fields = (data && Array.isArray(data.themenfelder) ? data.themenfelder : [])
    .filter((f) => f && typeof f.label === "string" && f.label.trim())
    .slice(0, 6)
    .map((f, i) => ({
      id: "tf" + (i + 1),
      label: f.label.trim(),
      kurzbeschreibung: typeof f.kurzbeschreibung === "string" ? f.kurzbeschreibung.trim() : "",
      schwerpunkt: !!f.schwerpunkt,
    }));
  if (!fields.length) throw new Error("Es konnten keine Themenfelder abgeleitet werden. Bitte erneut versuchen.");
  return { fields, cost, tokens };
}

// Themenfelder am Job speichern - race-arm wie jeder History-Write der App:
// frisch lesen, Ziel-Job ueber stabile Keys finden, NUR dieses Feld setzen,
// sofort schreiben. Zwischen loadHistory und saveHistory steht bewusst kein
// await (synchron = atomar je Tab). Nicht ueberschreiben, falls inzwischen ein
// neuerer Stand da ist. Aktualisiert zusaetzlich das in-memory job-Objekt.
function saveThemenfelder(job, derived, level) {
  const themenfelder = {
    v: 1,
    generatedAt: Date.now(),
    generatedAtLevel: level,
    fields: derived.fields,
    cost: derived.cost,
    tokens: derived.tokens,
  };
  const h = loadHistory();
  const target =
    (job.urlKey && h.jobs.find((j) => j.urlKey === job.urlKey)) ||
    (job.key && h.jobs.find((j) => j.key === job.key)) ||
    (job.identityKey && h.jobs.find((j) => j.identityKey === job.identityKey));
  if (target && !(target.themenfelder && target.themenfelder.generatedAt > themenfelder.generatedAt)) {
    target.themenfelder = themenfelder;
    saveHistory(h);
  }
  job.themenfelder = themenfelder;
  return themenfelder;
}

async function generateQuiz(opts = {}) {
  if (actionRunning) return;
  const vertiefung = opts && opts.vertiefung ? opts.vertiefung : null;
  const jobText = $("job-text").value.trim();
  if (jobText.length < 50) {
    showError("Bitte zuerst eine Stellenanzeige per URL laden oder den Text unter „Text einfügen“ einfügen.");
    return;
  }
  const numQuestions = $("num-questions").value;
  mode = document.querySelector('input[name="mode"]:checked').value;
  let difficulty = document.querySelector('input[name="difficulty"]:checked').value;

  // Vertiefungsbogen: ohne Themenfeld kein Aufruf (Schutz auch hier im Einstieg,
  // nicht nur im UI). Schwierigkeit wird bewusst auf "schwer" erzwungen.
  if (vertiefung) {
    if (!vertiefung.felder || !vertiefung.felder.length) {
      showError("Bitte mindestens ein Themenfeld auswählen.");
      return;
    }
    difficulty = "schwer";
  }

  // Punkt 3: einen offenen, noch nicht ausgewerteten Lerntest nicht stillschweigend
  // ueberschreiben. Nur im Lernmodus relevant; bei Bestaetigung wird die alte Sitzung
  // verworfen und die Generierung mit gesetztem Flag erneut angestossen.
  if (mode === "lernen" && !opts._replaceConfirmed && loadLearnSession()) {
    openConfirmReplaceLearn(() => {
      clearLearnSession();
      renderHome();
      generateQuiz({ ...opts, _replaceConfirmed: true });
    });
    return;
  }

  // "schwer" sind die Fragen, die im echten Auswahlverfahren am
  // wahrscheinlichsten drankommen; die Stufe steuert deren Anteil
  const DIFFICULTY_MIX = {
    leicht: "etwa 60% leichte, 30% mittlere und 10% schwere Fragen",
    mittel: "etwa 25% leichte, 45% mittlere und 30% schwere Fragen",
    schwer: "etwa 10% leichte, 30% mittlere und 60% schwere Fragen",
  };

  // Lokale Modelle bekommen ein schlankeres Schema (ohne lerninfo/quellen) und
  // entsprechend einen Prompt ohne die teuren Quellen-Anweisungen - beides wird
  // erst beim Aufloesen einer Frage nachgeladen.
  const isLocal = (settings.provider || "anthropic") === "local";
  const isHosted = (settings.provider || "hosted") === "hosted";

  // Stabile URL-Identitaet jetzt festhalten (lastFetch kann sich bis zur
  // Fertigstellung aendern, v. a. im asynchronen Hosted-Flow).
  let urlKey = null, jobUrl = null;
  if (lastFetch.url && jobText === lastFetch.text) {
    const uk = urlKeyOf(lastFetch.url);
    if (uk) { urlKey = uk; jobUrl = lastFetch.url; }
  }
  const vertiefungFelder = vertiefung ? vertiefung.felder.map((f) => ({ id: f.id, label: f.label })) : null;

  // Hosted (Punkt 1): Generierung laeuft serverseitig als Hintergrund-Job. Der Client
  // startet den Job und pollt; der Test bricht NICHT ab, wenn der Tab in den Hintergrund
  // geht, das Handy sperrt oder man die Seite verlaesst und spaeter zurueckkehrt.
  if (isHosted) {
    return startHostedGeneration({
      jobText, difficulty, mode, urlKey, jobUrl, vertiefungFelder,
      numQuestions: Number(numQuestions),
      vertiefung: vertiefung
        ? { felder: vertiefung.felder.map((f) => ({ label: f.label })), niveau: vertiefung.niveau || undefined }
        : undefined,
    });
  }

  actionRunning = true;
  showLoading("Fragenkatalog wird erstellt...");
  try {
    // Reihenfolge-Aufgaben werden nur im NICHT-lokalen Pfad angeregt: kleine
    // lokale Modelle liefern Permutationen oft inkonsistent (der Normalizer
    // faengt das zwar ab, aber dann waeren es nutzlose Fragen). Im Hosted-
    // Default baut ohnehin der Worker den Prompt (siehe worker/src/prompts.js).
    const reihenfolgeHinweis = isLocal
      ? ""
      : "Wenn sich ein Thema natuerlich als Abfolge, Ablauf, Verfahren, Prozesskette, " +
        "Rangfolge oder Hierarchie darstellen laesst (z. B. Schritte eines Vorgangs, " +
        "Eskalationsstufen, Phasen eines Projekts), erstelle gelegentlich statt einer " +
        "Multiple-Choice- oder offenen Frage eine Reihenfolge-Aufgabe (typ='reihenfolge'): " +
        "Gib 3 bis 6 Elemente in 'elemente' an und in 'korrekte_reihenfolge' die Indizes " +
        "dieser Elemente in der fachlich korrekten Reihenfolge. Hoechstens etwa jede " +
        "sechste Frage soll eine Reihenfolge-Aufgabe sein, und nur wenn es fachlich " +
        "wirklich eine eindeutige korrekte Reihenfolge gibt. Bei allen anderen Fragen " +
        "bleiben 'elemente' und 'korrekte_reihenfolge' leere Arrays. ";

    const reihenfolgeAntwort =
      "Bei Reihenfolge-Aufgaben enthaelt korrekte_antwort die korrekte Reihenfolge als " +
      "lesbaren Text (Elemente durch ' -> ' getrennt). ";

    const antwortHinweis = isLocal
      ? "Gib zu jeder Frage die korrekte Antwort an (bei Multiple-Choice den Wortlaut mindestens einer richtigen Option, " +
        "bei offenen Fragen eine knappe Musterantwort). Gib bei Multiple-Choice zusätzlich in korrekte_indizes alle " +
        "richtigen Options-Indizes (0-basiert) an; bei offenen Fragen ein leeres Array. Gib bei Multiple-Choice zu JEDER " +
        "Option (richtig wie falsch) eine kurze Erklärung, warum sie richtig oder falsch ist - bei mehreren richtigen " +
        "Optionen ist entsprechend jede davon als richtig zu begründen. "
      : "Gib zu jeder Frage die korrekte Antwort an (bei Multiple-Choice den Wortlaut mindestens einer richtigen Option, " +
        "bei offenen Fragen eine knappe Musterantwort). Gib bei Multiple-Choice zusätzlich in korrekte_indizes alle " +
        "richtigen Options-Indizes (0-basiert) an; bei offenen Fragen ein leeres Array. Gib bei Multiple-Choice zu JEDER " +
        "Option (richtig wie falsch) eine kurze Erklärung, warum sie richtig oder falsch ist - bei mehreren richtigen " +
        "Optionen ist entsprechend jede davon als richtig zu begründen. Liefere ausserdem " +
        "einen lernrelevanten Hintergrund (lerninfo) sowie 1 bis 3 Quellen zur Vertiefung. " +
        reihenfolgeAntwort +
        "Nenne nur real existierende Quellen (Gesetze, Normen, Standardwerke, offizielle Dokumentation, etablierte Fachseiten). " +
        "Gib die URL einer Quelle nur an, wenn du dir sicher bist, dass sie existiert - bevorzugt Startseiten oder bekannte, " +
        "stabile Adressen, keine tief verschachtelten Links. Sonst lasse die URL leer und waehle einen praegnanten Titel, " +
        "der sich gut als Suchbegriff eignet. ";

    // Vertiefungen tragen Tiefe ueber offene Fragen besser als ueber MC, und die
    // Distraktoren muessen anspruchsvoll sein. Normale Tests behalten exakt die
    // bisherige Mischung (Verzweigung nur, wenn vertiefung gesetzt ist).
    const mcMix = vertiefung
      ? "Etwa ein Drittel der Fragen soll Multiple-Choice sein (4 Optionen, genau eine ist die beste; " +
        "alle uebrigen Optionen muessen plausibel sein - typische Fehlannahmen oder haeufige Verwechslungen, " +
        "keine offensichtlich falschen Optionen), der Rest offene Fragen. " +
        "Markiere bei jeder Multiple-Choice-Frage die richtigen Optionen ueber korrekte_indizes (0-basiert). "
      : "Etwa die Hälfte der Fragen soll Multiple-Choice sein (4 plausible Optionen). " +
        "Die meisten Multiple-Choice-Fragen haben genau eine richtige Option. Bei einigen wenigen " +
        "(hoechstens etwa ein Drittel der Multiple-Choice-Fragen) duerfen mehrere Optionen gleichzeitig richtig sein - " +
        "dann gib in korrekte_indizes alle richtigen Indizes an. Markiere bei jeder Multiple-Choice-Frage die richtigen " +
        "Optionen ueber korrekte_indizes (0-basiert). Der Rest sind offene Fragen. ";

    // Tiefe-Block fuer Vertiefungen: zwingt Anspruch/Niveau statt es nur zu
    // erhoffen. Leer bei normalen Tests.
    const vertiefungTiefe = vertiefung
      ? "Dies ist ein Vertiefungsbogen: Die Fragen muessen deutlich tiefer gehen als in einem Standardtest. " +
        "Ziel-Niveau ist die Endrunde eines Fachgespraechs fuer genau diese Rolle, auf dem Stand einer erfahrenen Fachkraft. " +
        "Stelle ueberwiegend Anwendungs-, Analyse- und Bewertungsfragen: jede Frage soll mehrschrittiges Denken, eine " +
        "fachliche Begruendung oder das Abwaegen eines Trade-offs verlangen und an etwas Konkretes andocken (Norm, Verfahren, " +
        "Kennzahl, realistisches Szenario mit Randbedingungen). Vermeide reine Definitions- und Faktenfragen sowie alles, " +
        "was sich durch blosses Auswendiglernen loesen laesst. Decke innerhalb eines Themenfelds verschiedene Teilaspekte " +
        "mit steigender Tiefe ab, statt dieselbe Teilfrage umzuformulieren. "
      : "";

    const system =
      "Du bist ein erfahrener Recruiter und erstellst realistische Einstellungstests. " +
      "Erstelle präzise, anspruchsvolle Fragen, die exakt auf die gegebene Stelle zugeschnitten sind. " +
      "Jede Frage muss einen anderen Aspekt der Stelle abdecken - vermeide inhaltliche Wiederholungen " +
      "und stelle nicht mehrfach dieselbe Frage in anderer Formulierung. " +
      "Mische Fachfragen, situative Fragen und Soft-Skill-Fragen. " +
      mcMix +
      reihenfolgeHinweis +
      "Ordne jeder Frage eine Schwierigkeit zu: 'schwer' sind Fragen, wie sie im echten Auswahlverfahren " +
      "oder Vorstellungsgespräch für genau diese Stelle am wahrscheinlichsten gestellt werden - realistisch, " +
      "spezifisch und anspruchsvoll. 'mittel' sind solide Fachfragen, 'leicht' sind Grundlagen- und Einstiegsfragen. " +
      `Stelle die Mischung so zusammen: ${DIFFICULTY_MIX[difficulty]}. ` +
      vertiefungTiefe +
      antwortHinweis +
      "Schätze ausserdem ein realistisches Zeitlimit in Minuten für den gesamten Test. " +
      "Lies zusätzlich den ausschreibenden Arbeitgeber (Unternehmensname) und den Arbeitsort (Stadt bzw. Region) " +
      "aus der Anzeige aus. Ist eines davon nicht erkennbar oder die Stelle rein remote, gib dafür einen leeren String zurück. " +
      "Der folgende Text stammt oft von einer Jobportal-Seite und kann Navigation, Cookie-Hinweise, " +
      "Unternehmens-Werbung, Fusszeilen und Teaser zu ähnlichen Stellen enthalten. Ignoriere all das " +
      "und beziehe dich ausschliesslich auf die eigentliche Stellenanzeige. Enthält der Text mehrere " +
      "Stellen, nimm die mit Abstand am ausführlichsten beschriebene. Antworte auf Deutsch.";

    const total = Number(numQuestions);
    setLoadingProgress(0, total, "Das Modell liest die Stellenanzeige...");
    const progress = (done) => setLoadingProgress(Math.min(done, total), total, done > 0
      ? `Frage ${Math.min(done, total)} von ${total} wird erstellt...`
      : "Fragenkatalog wird erstellt...");

    let result, genCost, genTokens, localAborted = false;
    if (isLocal) {
      // Lokal: in kleinen Bloecken erzeugen (abbrechbar). Zustand der
      // Nach-dem-Aufloesen-Anreicherung fuer den neuen Fragebogen zuruecksetzen.
      enrichTried = new Set();
      enrichingIdx = -1;
      const out = await generateLocalBatches(system, jobText.slice(0, LOCAL_JOBTEXT_CAP), total, progress);
      result = out.data; genCost = out.cost; genTokens = out.tokens; localAborted = out.aborted;
    } else {
      // Niveau-Anker: Fragen bewusst etwas ueber dem bisherigen Stand des
      // Bewerbers ansetzen (macht es zur echten Vertiefung). niveau wird von
      // startVertiefungForJob mitgegeben; defensiv, falls es fehlt.
      const niveau = vertiefung && vertiefung.niveau ? vertiefung.niveau : null;
      const niveauHinweis = niveau
        ? `Der Bewerber uebt diese Stelle bereits laenger (Stufe ${niveau.level} von 10` +
          (Number.isFinite(niveau.bestPct) ? `, bisher bis zu ${niveau.bestPct}% erreicht` : "") +
          `). Setze die Fragen bewusst etwas ueber diesem Stand an, ohne unrealistisch oder fachfremd zu werden. `
        : "";
      const vertiefungHinweis = vertiefung
        ? `Dies ist ein Vertiefungsbogen. Stelle ALLE Fragen ausschliesslich zu diesen Themenfeldern: ` +
          `${vertiefung.felder.map((f) => f.label).join("; ")}. Verteile die ${numQuestions} Fragen ` +
          `moeglichst gleichmaessig auf die ${vertiefung.felder.length} Felder und decke jedes Feld mehrfach ab. ` +
          `Stelle keine Fragen ausserhalb dieser Felder. ` + niveauHinweis + `\n\n`
        : "";
      const user =
        vertiefungHinweis +
        `Erstelle einen Einstellungstest mit genau ${numQuestions} Fragen zu dieser Stellenausschreibung:\n\n` +
        jobText.slice(0, 30000);
      // Hosted: strukturierte Parameter statt Prompt - der Worker baut den Prompt.
      const hostedPayload = {
        jobText,
        numQuestions: Number(numQuestions),
        difficulty,
        vertiefung: vertiefung
          ? { felder: vertiefung.felder.map((f) => ({ label: f.label })), niveau: vertiefung.niveau || undefined }
          : undefined,
      };
      const out = await callLLM(system, user, QUESTIONS_SCHEMA, (acc) => {
        // Jede fertige Frage hat im gestreamten JSON genau einen "frage"-Schluessel
        const seen = (acc.match(/"frage"\s*:/g) || []).length;
        progress(seen);
      }, { hosted: { action: "generate-quiz", payload: hostedPayload } });
      result = out.data; genCost = out.cost; genTokens = out.tokens;
    }
    // Quiz-Session aus dem Ergebnis aufbauen (gemeinsam mit dem Hosted-Async-Pfad).
    finalizeQuiz(result, {
      jobText, difficulty, urlKey, jobUrl, vertiefungFelder, mode,
      genCost, genTokens, isLocal, localAborted, total,
    });
  } catch (e) {
    showError(e.message);
  } finally {
    actionRunning = false;
    hideLoading();
  }
}

// Baut die Quiz-Session aus dem Generierungsergebnis auf — gemeinsam genutzt vom
// synchronen (BYOK/lokal) und vom asynchronen Hosted-Pfad. ctx traegt den zur
// Fertigstellung noetigen Kontext (zur Startzeit festgehalten).
function finalizeQuiz(result, ctx) {
  quiz = normalizeQuizData(result);
  quiz.jobText = ctx.jobText;
  if (ctx.urlKey) { quiz.urlKey = ctx.urlKey; quiz.jobUrl = ctx.jobUrl; }
  quiz.schwierigkeitsgrad = ctx.difficulty;
  if (ctx.vertiefungFelder) quiz.vertiefungFelder = ctx.vertiefungFelder;
  quiz.genCost = ctx.genCost ?? null;
  quiz.genTokens = ctx.genTokens ?? null;
  answers = new Array(quiz.fragen.length).fill("");
  revealed = new Array(quiz.fragen.length).fill(false);
  sortDisplay = {};
  current = 0;
  reviewing = false;
  startTime = Date.now();
  mode = ctx.mode || mode;
  if (mode === "pruefung") {
    startTimer(computeTimeLimitMin(quiz));
  } else {
    stopTimer();
    timer.overtime = false;
    timer.limitMin = 0;
    timer.deadline = 0;
    $("quiz-timer").classList.add("hidden");
  }
  setQuizNotice(ctx.isLocal && !ctx.localAborted && Number.isFinite(ctx.total) && quiz.fragen.length < ctx.total
    ? `Das lokale Modell konnte nur ${quiz.fragen.length} von ${ctx.total} gewünschten Fragen erzeugen. Für mehr Fragen ein größeres Modell verwenden oder erneut starten.`
    : "");
  // Neuer Lerntest: als fortsetzbar markieren und sofort sichern; ein evtl. zuvor
  // offener Lerntest wird durch den neuen ersetzt. Pruefungsmodus ist nicht fortsetzbar.
  if (mode === "lernen") { learnSessionActive = true; saveLearnSession(); }
  else { clearLearnSession(); }
  renderQuestion();
  showView("view-quiz");
}

/* ---------- Hosted-Hintergrund-Generierung (Punkt 1) ---------- */

const ACTIVE_JOB_KEY = "bewerbungstool.activeJob";
// In-Memory-Spiegel: faellt localStorage aus (voll/blockiert), geht der einzige Zeiger
// auf den bereits serverseitig laufenden (ggf. kostenpflichtigen) Job nicht verloren —
// Polling/Loslegen funktioniert dann zumindest im aktuellen Tab weiter.
let _activeJobMem = null;
function loadActiveJob() {
  try { const raw = localStorage.getItem(ACTIVE_JOB_KEY); if (raw) return JSON.parse(raw); } catch {}
  return _activeJobMem;
}
function saveActiveJob(j) {
  _activeJobMem = j;
  try { localStorage.setItem(ACTIVE_JOB_KEY, JSON.stringify(j)); return true; } catch { return false; }
}
function clearActiveJob() {
  _activeJobMem = null;
  try { localStorage.removeItem(ACTIVE_JOB_KEY); } catch {}
}

let _jobPollTimer = null;
function scheduleJobPoll(delayMs) {
  clearTimeout(_jobPollTimer);
  _jobPollTimer = setTimeout(pollActiveJob, delayMs);
}

// Startet einen serverseitigen Generierungsjob (Turnstile einmal beim Start) und kehrt
// sofort zurueck; die Erstellung laeuft im Hintergrund (Worker-DO), tab-unabhaengig.
async function startHostedGeneration(ctx) {
  if (actionRunning) return;
  // Nur EIN Test in Erstellung zugleich (deckt sich mit dem serverseitigen
  // exclusive-Gate). Ein bereits fertiger Job ("ready") blockiert nicht — er wird
  // durch den neuen Start ersetzt (saveActiveJob ueberschreibt ihn).
  const existing = loadActiveJob();
  if (existing && existing.status !== "ready") {
    showError("Es wird gerade schon ein Test erstellt. Bitte warte, bis er fertig ist.");
    return;
  }
  actionRunning = true;
  showLoading("Test wird gestartet...");
  try {
    const token = await getTurnstileToken("generate-quiz");
    const headers = { "Content-Type": "application/json" };
    if (token) headers["CF-Turnstile-Token"] = token;
    const res = await fetch(hostedBase() + "/api/jobs", {
      method: "POST",
      headers,
      body: JSON.stringify({
        jobText: ctx.jobText,
        numQuestions: ctx.numQuestions,
        difficulty: ctx.difficulty,
        vertiefung: ctx.vertiefung,
        tier: settings.tier || "standard",
      }),
    });
    if (!res.ok) throw new Error(hostedErrorMessage(res.status));
    const data = await res.json();
    if (!data.jobId) throw new Error("Der Test konnte nicht gestartet werden. Bitte erneut versuchen.");
    // Nur den fuer die Fertigstellung noetigen Kontext sichern (keine Prompts/Tokens).
    const persisted = saveActiveJob({
      jobId: data.jobId,
      status: "pending",
      createdAt: Date.now(),
      ctx: {
        jobText: ctx.jobText, difficulty: ctx.difficulty, mode: ctx.mode,
        urlKey: ctx.urlKey, jobUrl: ctx.jobUrl, vertiefungFelder: ctx.vertiefungFelder,
      },
    });
    hideLoading();
    showView("view-home");
    renderActiveJobCard("pending");
    // Konnte der Zeiger nicht dauerhaft gespeichert werden (Speicher voll/blockiert),
    // laeuft der Job dank In-Memory-Spiegel im aktuellen Tab weiter — ein Reload oder
    // Tabwechsel wuerde ihn aber verlieren. Den Nutzer darauf hinweisen.
    if (!persisted) {
      showError("Dein Test wird erstellt, kann aber nicht dauerhaft gesichert werden (Browser-Speicher voll?). Bitte diesen Tab geöffnet lassen, bis der Test fertig ist.");
    }
    scheduleJobPoll(0);
  } catch (e) {
    showError(e.message);
  } finally {
    actionRunning = false;
    hideLoading();
  }
}

async function pollActiveJob() {
  const job = loadActiveJob();
  if (!job || job.status === "ready") return; // fertig: wartet auf "Loslegen"

  // WICHTIG: der Client raeumt einen Job nie nach lokal verstrichener Zeit weg — das
  // koennte einen serverseitig noch laufenden (ggf. bezahlten) Job verwerfen und einen
  // Doppellauf ausloesen (Codex-Review). Die Staleness ist server-eigen: der Status-
  // Endpunkt markiert einen zu lange "pending" Job selbst terminal (status "timeout")
  // und gibt die Reserve frei. Der Client wartet auf genau diese Server-Aussage (bzw.
  // 404, wenn der Job nicht mehr existiert) und pollt bei Netzfehlern nur weiter.
  let r;
  try {
    r = await fetch(hostedBase() + "/api/jobs/" + encodeURIComponent(job.jobId));
  } catch {
    scheduleJobPoll(5000); // Netzfehler/Offline: spaeter erneut versuchen, Job behalten
    return;
  }
  if (r.status === 404) {
    clearActiveJob();
    renderActiveJobCard(null);
    showError("Der erstellte Test ist nicht mehr verfügbar. Bitte starte ihn neu.");
    return;
  }
  if (!r.ok) {
    // Server-/Gateway-Fehler (5xx/403/…): voruebergehend, mit Abstand erneut versuchen.
    scheduleJobPoll(5000);
    return;
  }
  let data;
  try { data = await r.json(); } catch { scheduleJobPoll(5000); return; }

  if (data.status === "done" && data.quiz) {
    // Ergebnis sichern und ruhen lassen — der Nutzer startet selbst (kein Wegreissen).
    saveActiveJob({ ...job, status: "ready", quiz: data.quiz });
    renderActiveJobCard("ready");
  } else if (data.status === "done") {
    // Defensiv: "done" ohne Quiz ist ein Serverfehler — nicht endlos weiter pollen.
    clearActiveJob();
    renderActiveJobCard("error");
    showError(jobErrorMessage("unknown"));
  } else if (data.status === "error") {
    clearActiveJob();
    renderActiveJobCard("error");
    showError(jobErrorMessage(data.code));
  } else {
    renderActiveJobCard("pending");
    scheduleJobPoll(3000);
  }
}

function jobErrorMessage(code) {
  if (code === "parse" || code === "upstream") {
    return "Bei der Erstellung ist ein Fehler aufgetreten. Bitte erneut versuchen, ggf. mit weniger Fragen.";
  }
  if (code === "timeout") {
    return "Die Erstellung hat zu lange gedauert und wurde abgebrochen. Bitte starte den Test neu.";
  }
  return "Der Test konnte nicht erstellt werden. Bitte erneut versuchen.";
}

// Beim App-Start einen offenen/fertigen Job wieder aufnehmen (Punkt 1: zurueckkehren).
function resumeActiveJob() {
  // Nur im Hosted-Modus aufnehmen: ein Hintergrund-Job gehoert zu api.jobreif.de. Hat
  // der Nutzer auf BYOK/lokal umgestellt, den Zeiger ruhen lassen (kein Hosted-Poll,
  // keine Karte), bis wieder hosted aktiv ist.
  if ((settings.provider || "hosted") !== "hosted") return;
  const job = loadActiveJob();
  if (!job) return;
  if (job.status === "ready" && job.quiz) { renderActiveJobCard("ready"); return; }
  renderActiveJobCard("pending");
  scheduleJobPoll(0);
}

function startReadyJob() {
  const job = loadActiveJob();
  if (!job || !job.quiz) return;
  clearActiveJob();
  renderActiveJobCard(null);
  finalizeQuiz(job.quiz, { ...job.ctx, genCost: null, genTokens: null, isLocal: false });
}

// Status-Karte fuer den Hintergrund-Job auf der Startliste. state: "pending"|"ready"|"error"|null.
function renderActiveJobCard(state) {
  const card = $("active-job-card");
  if (!card) return;
  if (!state) {
    card.classList.add("hidden");
    renderHome(); // Empty-Hinweis/Liste wieder korrekt herstellen
    return;
  }
  // Solange ein Job laeuft/fertig ist, den "Noch keine Stelle"-Hinweis nicht zeigen
  // (er wuerde dem Karten-Status widersprechen).
  $("home-empty").classList.add("hidden");
  const textEl = $("active-job-text");
  const spin = $("active-job-spinner");
  const startBtn = $("active-job-start");
  const ready = state === "ready";
  if (textEl) {
    textEl.textContent = state === "error"
      ? "Die Erstellung ist fehlgeschlagen. Bitte erneut starten."
      : ready
      ? "Dein Test ist fertig."
      : "Dein Test wird erstellt … du kannst die Seite verlassen und später zurückkehren.";
  }
  if (spin) spin.classList.toggle("hidden", state !== "pending");
  if (startBtn) startBtn.classList.toggle("hidden", !ready);
  card.classList.remove("hidden");
}

/* ---------- Lernmodus: Test verlassen und spaeter fortsetzen (Punkt 3) ---------- */

// Ein im Lernmodus begonnener, noch nicht ausgewerteter Fragebogen wird lokal
// gesichert, damit man die Seite verlassen und spaeter zurueckkehren kann. Nur
// Lernmodus (im Pruefungsmodus laeuft ein Zeitlimit, das ein Pausieren ausschliesst).
const LEARN_SESSION_KEY = "bewerbungstool.learnSession";
// Markiert, dass der aktuelle Quiz-Zustand ein speicherbarer, laufender Lerntest ist.
// Verhindert, dass ein bereits ausgewerteter oder nur durchgesehener (reviewing)
// Fragebogen versehentlich (z. B. via visibilitychange) wieder gespeichert wird.
let learnSessionActive = false;

function loadLearnSession() {
  try { const raw = localStorage.getItem(LEARN_SESSION_KEY); if (raw) return JSON.parse(raw); } catch {}
  return null;
}
let _learnSaveWarned = false;
function saveLearnSession() {
  if (!learnSessionActive || mode !== "lernen" || !quiz || reviewing) return false;
  try {
    localStorage.setItem(LEARN_SESSION_KEY, JSON.stringify({
      quiz, answers, revealed, current, savedAt: Date.now(),
    }));
    _learnSaveWarned = false; // wieder ok → kuenftige Fehler duerfen erneut warnen
    return true;
  } catch {
    // Nicht stumm schlucken: das Feature verspricht "spaeter fortsetzen". Einmal
    // sichtbar warnen, damit der Nutzer nicht ahnungslos die Seite schliesst.
    if (!_learnSaveWarned) {
      _learnSaveWarned = true;
      showError("Dein Lernfortschritt kann gerade nicht gespeichert werden (Browser-Speicher voll?). Wenn du die Seite jetzt verlässt, lässt sich der Test eventuell nicht fortsetzen.");
    }
    return false;
  }
}
function clearLearnSession() {
  learnSessionActive = false;
  try { localStorage.removeItem(LEARN_SESSION_KEY); } catch {}
}
// Beim Tippen nicht bei jedem Anschlag das ganze Quiz serialisieren — kurz buendeln.
let _learnSaveTimer = null;
function saveLearnSessionDebounced() {
  clearTimeout(_learnSaveTimer);
  _learnSaveTimer = setTimeout(saveLearnSession, 800);
}

// Gesicherten Lerntest wiederherstellen und in die Frageansicht springen.
function resumeLearnSession() {
  const s = loadLearnSession();
  if (!s || !s.quiz || !Array.isArray(s.quiz.fragen) || !s.quiz.fragen.length) { clearLearnSession(); renderHome(); return; }
  quiz = s.quiz;
  // Defensiv gegen unvollstaendige/aeltere Staende: Laengen an die Fragen angleichen.
  const n = quiz.fragen.length;
  answers = Array.isArray(s.answers) ? s.answers.slice(0, n) : [];
  while (answers.length < n) answers.push("");
  revealed = Array.isArray(s.revealed) ? s.revealed.slice(0, n) : [];
  while (revealed.length < n) revealed.push(false);
  current = Number.isInteger(s.current) ? Math.min(Math.max(0, s.current), n - 1) : 0;
  mode = "lernen";
  reviewing = false;
  startTime = Date.now();
  learnSessionActive = true;
  stopTimer();
  timer.overtime = false; timer.limitMin = 0; timer.deadline = 0;
  $("quiz-timer").classList.add("hidden");
  setQuizNotice("");
  renderQuestion();
  showView("view-quiz");
}

function discardLearnSession() {
  clearLearnSession();
  renderHome(); // Karte ausblenden und Leer-Hinweis/Liste korrekt wiederherstellen
}

// "Test fortsetzen"-Karte auf der Startliste, wenn ein offener Lerntest existiert.
function renderResumeCard() {
  const card = $("resume-card");
  if (!card) return;
  const s = loadLearnSession();
  if (!s || !s.quiz || !Array.isArray(s.quiz.fragen) || !s.quiz.fragen.length) {
    card.classList.add("hidden");
    return;
  }
  const total = s.quiz.fragen.length;
  const pos = Math.min((Number.isInteger(s.current) ? s.current : 0) + 1, total);
  const titel = (s.quiz.titel || "Lerntest").trim();
  $("resume-text").textContent = `Offener Lerntest „${titel}“ – Frage ${pos} von ${total}. Du kannst hier fortsetzen.`;
  // Widerspricht dem Leer-Hinweis; diesen ausblenden, solange die Karte sichtbar ist.
  $("home-empty").classList.add("hidden");
  card.classList.remove("hidden");
}

/* ---------- Timer (Prüfungsmodus) ---------- */

function computeTimeLimitMin(q) {
  // Faustregel als Absicherung: 1,5 min je Multiple-Choice, 4 min je offene
  // Frage, 2 min je Reihenfolge-Aufgabe.
  const fallback = Math.ceil(
    q.fragen.reduce((sum, f) => sum + (f.typ === "offen" ? 4 : f.typ === "reihenfolge" ? 2 : 1.5), 0)
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

  if (q.typ === "multiple_choice" && mcIsMulti(q)) {
    // Mehrfach-MC: Checkbox-Logik (Klick toggelt), Auswahl als Index-Menge.
    // Die Hinweiszeile liegt in einem eigenen Container (nicht als Geschwister
    // der Options-Buttons), damit die nth-child-Animationsstaffelung und der
    // children[idx]-Fokuspfad stimmen.
    const correct = mcCorrectIndices(q);
    const hint = document.createElement("div");
    hint.className = "mc-multi-hint-wrap";
    const hintP = document.createElement("p");
    hintP.className = "mc-multi-hint";
    hintP.textContent = "Mehrere Antworten möglich";
    hint.appendChild(hintP);
    area.appendChild(hint);

    const optWrap = document.createElement("div");
    optWrap.className = "mc-options";
    q.optionen.forEach((opt, idx) => {
      const sel = parseMultiSelection(answers[current] || "");
      const btn = document.createElement("button");
      let cls = "option option-checkbox";
      if (sel.has(idx)) cls += " selected";
      if (isRevealed) {
        // Richtige Optionen gruen (auch nicht gewaehlte, damit der Nutzer sieht,
        // was er verpasst hat), faelschlich gewaehlte rot.
        if (correct.has(idx)) cls += " correct";
        else if (sel.has(idx)) cls += " wrong";
      }
      btn.className = cls;
      btn.textContent = opt;
      btn.setAttribute("aria-pressed", sel.has(idx) ? "true" : "false");
      if (!locked) {
        btn.addEventListener("click", () => {
          const s = parseMultiSelection(answers[current] || "");
          if (s.has(idx)) s.delete(idx);
          else s.add(idx);
          answers[current] = s.size ? serializeMultiSelection(s) : "";
          renderQuestion();
          // Fokus auf die geklickte Option zurueck. Die Options liegen in
          // einem eigenen Container, daher dort indexieren.
          const wrap = $("answer-area").querySelector(".mc-options");
          const fresh = wrap && wrap.children[idx];
          if (fresh) fresh.focus();
        });
      } else {
        btn.disabled = true;
      }
      optWrap.appendChild(btn);
    });
    area.appendChild(optWrap);
  } else if (q.typ === "multiple_choice") {
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
          saveLearnSession();
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
  } else if (q.typ === "reihenfolge" && Array.isArray(q.elemente) && q.elemente.length >= 2) {
    renderReihenfolge(q, area, locked, isRevealed);
  } else {
    // Catch-all: offene Frage UND jeder unbekannte/zukuenftige typ -> Textarea,
    // damit ein Versuch aus einer neueren Version nie crasht.
    const ta = document.createElement("textarea");
    ta.rows = 6;
    ta.placeholder = "Deine Antwort...";
    ta.value = answers[current] || "";
    ta.readOnly = locked;
    ta.addEventListener("input", () => { answers[current] = ta.value; saveLearnSessionDebounced(); });
    // Beim Verlassen des Feldes (z. B. vor dem Wegklicken) sofort sichern.
    ta.addEventListener("blur", saveLearnSession);
    area.appendChild(ta);
  }

  renderLearnArea(q, isRevealed);

  $("btn-prev").disabled = current === 0;
  $("btn-next").textContent =
    current === total - 1 ? (reviewing ? "Zur Auswertung" : "Auswerten") : "Weiter";
}

// Rendert eine Reihenfolge-Aufgabe in #answer-area: eine sortierbare Liste mit
// Drag-Griff (Pointer Events) UND immer sichtbaren Hoch/Runter-Buttons als
// gleichwertigem, barrierefreiem Pfad. Die Anzeige-Reihenfolge liegt aktiv in
// sortDisplay[current]; answers[current] bleibt leer, bis der Nutzer das erste
// Mal umsortiert. Im gesperrten Zustand (Review / aufgeloest) wird die finale
// Nutzerreihenfolge aus answers[current] gezeigt (nicht neu gemischt).
function renderReihenfolge(q, area, locked, isRevealed) {
  const n = q.elemente.length;
  const korrekt = Array.isArray(q.korrekte_reihenfolge) && q.korrekte_reihenfolge.length === n
    ? q.korrekte_reihenfolge
    : null;

  // Aktuelle Anzeige-Reihenfolge bestimmen.
  let order;
  const gespeichert = parseOrder(answers[current] || "", n);
  if (locked) {
    // Gesperrt: gespeicherte Nutzerreihenfolge zeigen; unbeantwortet -> natuerlich.
    order = gespeichert || Array.from({ length: n }, (_, i) => i);
  } else {
    // Aktiv: hat der Nutzer schon sortiert, diese Reihenfolge weiterfuehren;
    // sonst die einmal gemischte ephemere Startreihenfolge aus sortDisplay.
    if (gespeichert) {
      order = gespeichert;
      sortDisplay[current] = gespeichert.slice();
    } else {
      if (!Array.isArray(sortDisplay[current]) || sortDisplay[current].length !== n) {
        sortDisplay[current] = shuffleOrder(n, korrekt);
      }
      order = sortDisplay[current];
    }
  }

  const unbeantwortet = !gespeichert;

  const ol = document.createElement("ol");
  ol.className = "sortable";
  if (locked) ol.classList.add("locked");

  // aria-live-Region fuer Verschiebe-Ansagen (Screenreader)
  const live = document.createElement("div");
  live.className = "sort-live sr-only";
  live.setAttribute("aria-live", "polite");

  // Schreibt die aktuelle order nach answers (= beantwortet) und sortDisplay,
  // und zeichnet die Frage neu. fokusIdx = Position, deren Button danach Fokus
  // bekommen soll; fokusSel = Klasse des Buttons (".sort-up"/".sort-down").
  const commit = (newOrder, fokusIdx, fokusSel) => {
    sortDisplay[current] = newOrder.slice();
    answers[current] = JSON.stringify(newOrder);
    renderQuestion();
    if (fokusIdx != null && fokusSel) {
      const items = $("answer-area").querySelectorAll(".sort-item");
      const li = items[fokusIdx];
      if (li) {
        const b = li.querySelector(fokusSel);
        if (b && !b.disabled) b.focus();
        else if (li.querySelector(".sort-grip")) li.querySelector(".sort-grip").focus();
      }
    }
  };

  order.forEach((elIdx, pos) => {
    const li = document.createElement("li");
    li.className = "sort-item";
    li.dataset.idx = String(elIdx);

    // Korrektheits-Markierung nur im aufgeloesten Lernmodus
    if (isRevealed && korrekt && !unbeantwortet) {
      if (korrekt[pos] === elIdx) li.classList.add("correct");
      else li.classList.add("wrong");
    }

    const grip = document.createElement("button");
    grip.type = "button";
    grip.className = "sort-grip";
    grip.setAttribute("aria-label", "Zum Verschieben ziehen");
    grip.textContent = "≡"; // ≡
    if (locked) grip.disabled = true;

    const posEl = document.createElement("span");
    posEl.className = "sort-pos";
    posEl.textContent = `${pos + 1}.`;

    const txt = document.createElement("span");
    txt.className = "sort-text";
    txt.textContent = q.elemente[elIdx] != null ? String(q.elemente[elIdx]) : "";

    const moves = document.createElement("div");
    moves.className = "sort-moves";

    const up = document.createElement("button");
    up.type = "button";
    up.className = "sort-up";
    up.setAttribute("aria-label", "Nach oben");
    up.textContent = "▲"; // ▲
    up.disabled = locked || pos === 0;
    up.addEventListener("click", () => {
      const o = order.slice();
      [o[pos - 1], o[pos]] = [o[pos], o[pos - 1]];
      live.textContent = `Element an Position ${pos}.`;
      commit(o, pos - 1, ".sort-up");
    });

    const down = document.createElement("button");
    down.type = "button";
    down.className = "sort-down";
    down.setAttribute("aria-label", "Nach unten");
    down.textContent = "▼"; // ▼
    down.disabled = locked || pos === n - 1;
    down.addEventListener("click", () => {
      const o = order.slice();
      [o[pos + 1], o[pos]] = [o[pos], o[pos + 1]];
      live.textContent = `Element an Position ${pos + 2}.`;
      commit(o, pos + 1, ".sort-down");
    });

    moves.appendChild(up);
    moves.appendChild(down);

    li.appendChild(grip);
    li.appendChild(posEl);
    li.appendChild(txt);
    li.appendChild(moves);
    ol.appendChild(li);

    if (!locked) attachSortDrag(grip, li, ol, order, commit);
  });

  area.appendChild(ol);
  area.appendChild(live);

  if (unbeantwortet && locked) {
    const note = document.createElement("p");
    note.className = "sort-note";
    note.textContent = "Nicht beantwortet.";
    area.appendChild(note);
  }
}

// Pointer-Events-Drag am Griff. setPointerCapture macht das Ziehen robust, auch
// wenn der Finger das Element verlaesst. Beim Ablegen wird die neue Reihenfolge
// ueber commit() festgeschrieben. Nur am Griff aktiv (touch-action:none via
// CSS), damit der Rest der Liste vertikal scrollbar bleibt.
function attachSortDrag(grip, li, ol, order, commit) {
  grip.addEventListener("pointerdown", (e) => {
    if (e.button != null && e.button !== 0) return;
    e.preventDefault();
    const items = Array.from(ol.querySelectorAll(".sort-item"));
    const startIdx = items.indexOf(li);
    if (startIdx < 0) return;

    const startY = e.clientY;
    const liRect = li.getBoundingClientRect();
    const liH = liRect.height;

    // Platzhalter an der urspruenglichen Stelle
    const placeholder = document.createElement("li");
    placeholder.className = "sort-placeholder";
    placeholder.style.height = `${liH}px`;

    li.classList.add("dragging");
    ol.classList.add("is-dragging");
    li.parentNode.insertBefore(placeholder, li);

    try { grip.setPointerCapture(e.pointerId); } catch {}

    let targetIdx = startIdx;

    const onMove = (ev) => {
      const dy = ev.clientY - startY;
      li.style.transform = `translateY(${dy}px)`;
      // Einfuegeposition aus der Y-Mitte der uebrigen Items bestimmen
      const others = Array.from(ol.querySelectorAll(".sort-item")).filter((x) => x !== li);
      let idx = others.length;
      for (let k = 0; k < others.length; k++) {
        const r = others[k].getBoundingClientRect();
        if (ev.clientY < r.top + r.height / 2) { idx = k; break; }
      }
      targetIdx = idx;
      const ref = others[idx] || null;
      ol.insertBefore(placeholder, ref);
    };

    const finish = () => {
      grip.removeEventListener("pointermove", onMove);
      grip.removeEventListener("pointerup", onUp);
      grip.removeEventListener("pointercancel", onUp);
      li.classList.remove("dragging");
      ol.classList.remove("is-dragging");
      li.style.transform = "";
      try { grip.releasePointerCapture(e.pointerId); } catch {}

      const o = order.slice();
      const [moved] = o.splice(startIdx, 1);
      let insertAt = targetIdx;
      if (insertAt > startIdx) insertAt -= 1; // Korrektur, weil moved entfernt wurde
      if (insertAt < 0) insertAt = 0;
      if (insertAt > o.length) insertAt = o.length;
      o.splice(insertAt, 0, moved);
      // Auch ohne Positionsaenderung als Interaktion werten (Nutzer hat bewusst
      // gegriffen) - konsistent zu den Hoch/Runter-Buttons.
      commit(o, null, null);
    };

    const onUp = () => finish();

    grip.addEventListener("pointermove", onMove);
    grip.addEventListener("pointerup", onUp);
    grip.addEventListener("pointercancel", onUp);
  });
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
      saveLearnSession();
      renderQuestion();
      // Lokaler Lernmodus: Lernhintergrund und Quellen jetzt einzeln nachladen
      // (zeichnet die Box bei Erfolg neu). Bei Cloud-Fragen ist beides schon da.
      maybeEnrichRevealed(current);
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

  const korrektReihenfolge =
    q.typ === "reihenfolge" &&
    Array.isArray(q.elemente) &&
    Array.isArray(q.korrekte_reihenfolge) &&
    q.korrekte_reihenfolge.length === q.elemente.length &&
    q.elemente.length >= 2;

  if (korrektReihenfolge) {
    // Korrekte Reihenfolge als nummerierte Liste (robuster als der Klartext).
    const label = document.createElement("p");
    label.className = "learn-answer";
    label.textContent = "Korrekte Reihenfolge:";
    box.appendChild(label);
    const ol = document.createElement("ol");
    ol.className = "sort-solution";
    q.korrekte_reihenfolge.forEach((elIdx) => {
      const li = document.createElement("li");
      li.textContent = q.elemente[elIdx] != null ? String(q.elemente[elIdx]) : "";
      ol.appendChild(li);
    });
    box.appendChild(ol);
  } else {
    const correct = mcCorrectIndices(q);
    const answerLine = document.createElement("p");
    answerLine.className = "learn-answer";
    if (mcIsMulti(q)) {
      answerLine.textContent =
        "Richtige Antworten: " +
        [...correct].sort((a, b) => a - b).map((i) => q.optionen[i]).filter((t) => t).join(", ");
    } else {
      answerLine.textContent =
        (q.typ === "multiple_choice" ? "Richtige Antwort: " : "Musterantwort: ") + (q.korrekte_antwort || "");
    }
    box.appendChild(answerLine);
  }

  const erklaerungen = Array.isArray(q.erklaerungen) ? q.erklaerungen : [];
  if (q.typ === "multiple_choice" && erklaerungen.length) {
    const ul = document.createElement("ul");
    ul.className = "option-explanations";
    q.optionen.forEach((opt, i) => {
      if (!erklaerungen[i]) return;
      const li = document.createElement("li");
      // isCorrect ueber Index-Zugehoerigkeit (mcCorrectIndices nutzt fuer
      // Single-Choice den Wortlaut-Fallback - alte Versuche laufen weiter).
      const isCorrect = correct.has(i);
      li.className = isCorrect ? "exp-correct" : "exp-wrong";
      li.textContent = `${opt} – ${erklaerungen[i]}`;
      ul.appendChild(li);
    });
    box.appendChild(ul);
  }

  // Lokaler Lernmodus: Lernhintergrund/Quellen werden gerade nachgeladen
  if (enrichingIdx === current) {
    const p = document.createElement("p");
    p.className = "learn-loading";
    p.textContent = "Lernhintergrund und Quellen werden geladen...";
    box.appendChild(p);
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
    saveLearnSession();
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
    saveLearnSession();
    renderQuestion();
  }
}

/* ---------- Auswertung ---------- */

async function evaluateQuiz() {
  if (actionRunning) return;
  // Aufgeloeste Fragen im Lernmodus zaehlen nicht als unbeantwortet: wer die
  // Loesung bewusst angesehen hat, hat die Frage nicht versehentlich
  // uebersprungen. Sie gehen in der Auswertung als aufgeloest ohne eigene
  // Antwort ein (siehe payload.aufgeloest), loesen aber keine Rueckfrage aus.
  const unanswered = answers.filter(
    (a, i) => !a.trim() && !(mode === "lernen" && revealed[i]),
  ).length;
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

    // Reihenfolge- und Mehrfach-MC-Fragen werden LOKAL/deterministisch gescort
    // (Partial Credit) und NICHT ans Modell geschickt: spart Tokens, ist
    // reproduzierbar und kostet im Hosted-Modus keinen Extra-Worker-Call.
    // Single-Choice-MC und offene Fragen bleiben bewusst beim Modell (Verhalten
    // bestehender Tests unveraendert). Erkennung defensiv: alte Versuche kennen
    // die Typen nicht.
    const istReihenfolge = (q) =>
      q && q.typ === "reihenfolge" && Array.isArray(q.elemente) && q.elemente.length >= 2 &&
      Array.isArray(q.korrekte_reihenfolge) && q.korrekte_reihenfolge.length === q.elemente.length;

    // Lokale Ergebniszeilen (Reihenfolge + Mehrfach-MC, auch unbeantwortete) und
    // kompakte Zusammenfassung fuer die Gesamteinschaetzung des Modells. modelFragen
    // behaelt den Original-Index, damit answers[i]/revealed[i] korrekt bleiben.
    const localResults = [];
    const localSummary = [];
    const modelFragen = [];
    quiz.fragen.forEach((q, i) => {
      if (istReihenfolge(q)) {
        const musterantwort = q.korrekte_reihenfolge.map((idx) => q.elemente[idx]).join(" -> ");
        const userOrder = parseOrder(answers[i] || "", q.elemente.length);
        if (!userOrder) {
          // nie sortiert / korrupt -> 0 Punkte wie eine uebersprungene Frage
          localResults.push({
            id: q.id,
            punkte: 0,
            feedback: "Nicht beantwortet: die Reihenfolge wurde nicht angeordnet.",
            musterantwort,
          });
          localSummary.push({ frage: (q.frage || "").slice(0, 160), punkte: 0 });
          return;
        }
        const punkte = scoreReihenfolge(userOrder, q.korrekte_reihenfolge);
        const richtig = userOrder.reduce((acc, el, pos) => acc + (q.korrekte_reihenfolge[pos] === el ? 1 : 0), 0);
        const prozentGeordnet = Math.round((punkte / 10) * 100);
        localResults.push({
          id: q.id,
          punkte,
          feedback: `${richtig} von ${q.elemente.length} Elementen an der richtigen Position; Reihenfolge zu ${prozentGeordnet}% korrekt geordnet.`,
          musterantwort,
        });
        localSummary.push({ frage: (q.frage || "").slice(0, 160), punkte });
      } else if (mcIsMulti(q)) {
        const res = scoreMultiMc(q, answers[i]);
        if (mode === "lernen" && revealed[i]) res.feedback += " (im Lernmodus aufgelöst)";
        localResults.push(res);
        localSummary.push({ frage: (q.frage || "").slice(0, 160), punkte: res.punkte });
      } else {
        modelFragen.push({ q, i });
      }
    });

    // Hinweis-Block (gleicher Wortlaut wie im Worker, buildEvalMessages): nennt
    // dem Modell die bereits bewerteten Fragen samt Punkten, mit der Anweisung,
    // sie NICHT erneut als eigene Eintraege auszugeben.
    const mcLokalHinweis = localSummary.length
      ? "\n\nZusätzlich wurden " + localSummary.length + " Fragen (Mehrfachauswahl bzw. Reihenfolge) " +
        "bereits separat und deterministisch bewertet. Bewerte sie NICHT erneut und gib fuer sie KEINE " +
        "eigenen Ergebnis-Eintraege aus; beziehe ihre Ergebnisse aber in die Gesamteinschätzung " +
        "(Zusammenfassung, Stärken, Verbesserungen) mit ein:\n" +
        localSummary.map((m) => `- ${m.frage}: ${m.punkte}/10`).join("\n")
      : "";

    const payload = modelFragen.map(({ q, i }) => ({
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
      "\n\nBewerte diese Antworten des Kandidaten:\n" + JSON.stringify(payload, null, 2) +
      mcLokalHinweis;

    let result;
    let evalCost = 0;
    let evalTokens;

    if (payload.length === 0) {
      // Sonderfall: das Quiz besteht nur aus lokal gescorten Fragen (Mehrfach-MC
      // und/oder Reihenfolge). Kein Modell-/Worker-Call (eine leere Eval-Payload
      // wuerde der Worker mit 400 ablehnen) - Auswertung komplett lokal. Der
      // gesamt-Block wird unten aus den reconcileten Zeilen befuellt.
      result = normalizeEvalData({
        ergebnisse: localResults,
        gesamt: { prozent: 0, zusammenfassung: "", staerken: [], verbesserungen: [] },
      });
    } else {
      // Progress zaehlt nur die Modell-Fragen (lokal gescorte laufen nicht ueber
      // den Stream) - sonst bliebe der Balken haengen.
      const total = payload.length;
      setLoadingProgress(0, total, "Das Modell prüft deine Antworten...");
      const evalHostedPayload = {
        jobText: quiz.jobText,
        payload,
        kontext: { mode, limitMin: timer.limitMin, minutesUsed, overtime: timer.overtime, mcLokal: localSummary },
      };
      const { data: rawResult, cost, tokens } = await callLLM(system, user, EVAL_SCHEMA, (acc) => {
        const seen = (acc.match(/"feedback"\s*:/g) || []).length;
        setLoadingProgress(seen, total, seen > 0
          ? `Antwort ${Math.min(seen, total)} von ${total} wird bewertet...`
          : "Antworten werden ausgewertet...");
      }, { hosted: { action: "evaluate", payload: evalHostedPayload } });
      evalCost = cost;
      evalTokens = tokens;
      // Form absichern, bevor gespeichert/gerendert wird: ohne striktes Schema
      // (DeepSeek, lokale Modelle) koennte z. B. das gesamt-Objekt fehlen, was
      // beim Speichern (result.gesamt.prozent) sonst einen Absturz ausloest
      result = normalizeEvalData(rawResult);
      // Lokale Ergebnisse (Mehrfach-MC + Reihenfolge) einmischen (das Modell hat
      // sie nicht gesehen). Modell-Ergebnisse vorher auf die tatsaechlich gestellten
      // (Payload-)IDs filtern: Erfindet das Modell trotz Anweisung einen Eintrag
      // fuer eine lokal gescorte Frage, gewinnt sonst beim id-Lookup in renderResult
      // ggf. der falsche (Modell-)Eintrag. Reihenfolge ist egal (Suche per id).
      const modelIds = new Set(payload.map((p) => Number(p.id)));
      result.ergebnisse = result.ergebnisse.filter((e) => modelIds.has(Number(e.id))).concat(localResults);
    }

    // Ergebnisse gegen ALLE Quizfragen abgleichen: pro Frage genau eine Zeile, in
    // Quiz-Reihenfolge. Fehlt eine Zeile (Modell laesst unter Truncation/Drift eine
    // schwere/offene Frage weg, oder DeepSeek/lokal liefert unvollstaendig), zaehlt
    // sie als 0 Punkte statt aus dem Nenner zu verschwinden - sonst wuerde der
    // Score (und damit Historie/Abzeichen/Fortschritt) faelschlich geschoent.
    {
      const byId = new Map(
        result.ergebnisse
          .filter((e) => e && Number.isFinite(Number(e.id)))
          .map((e) => [Number(e.id), e]),
      );
      // punkte pro Zeile hart auf eine Ganzzahl 0..10 klemmen und ZURUECK-
      // schreiben: nicht-strikte Provider (DeepSeek/lokal) sind nicht schema-
      // erzwungen und koennen z. B. 100 oder -5 liefern. Ohne Klemmen wuerde die
      // Summe unten unmoegliche Gesamtprozente (>100 / negativ) in die Historie
      // speichern (die Detail-Anzeige klemmt nur fuers Rendern, nicht den Stand).
      const clampPunkte = (p) => {
        const n = Math.round(Number(p));
        return Number.isFinite(n) ? Math.max(0, Math.min(10, n)) : 0;
      };
      result.ergebnisse = quiz.fragen.map((q) => {
        const e = byId.get(q.id);
        if (!e) return { id: q.id, punkte: 0, feedback: "Keine Bewertung erhalten.", musterantwort: "" };
        e.punkte = clampPunkte(e.punkte);
        return e;
      });
    }

    // gesamt.prozent NEU aus ALLEN Fragen berechnen (Nenner = quiz.fragen.length,
    // nicht die Zahl zurueckgelieferter Zeilen): das Modell kennt nur seine
    // Teilmenge, sein prozent ist nicht mehr repraesentativ. Deckt sich mit der
    // Punkte-Summe im Score-Ring (Summe Punkte / n*10).
    {
      const sum = result.ergebnisse.reduce((a, e) => a + (Number(e.punkte) || 0), 0);
      const max = quiz.fragen.length * 10;
      const prozent = max ? Math.round((sum / max) * 100) : 0;
      result.gesamt.prozent = Math.max(0, Math.min(100, prozent));
    }
    if (payload.length === 0) {
      // Rein lokal gescortes Quiz (nur Mehrfach-MC und/oder Reihenfolge): gesamt
      // lokal mit generischem Text fuellen, da kein Modell eine Zusammenfassung lieferte.
      result.gesamt.zusammenfassung = result.gesamt.zusammenfassung ||
        `Du hast ${result.gesamt.prozent}% der automatisch bewerteten Aufgaben erreicht.`;
    }

    const saved = saveAttempt(result, durationMs, evalCost, evalTokens);
    // Den fortsetzbaren Lerntest erst verwerfen, wenn der Versuch WIRKLICH gespeichert
    // wurde — sonst koennten bei vollem/blockiertem Speicher beide verloren gehen.
    if (saved) clearLearnSession();
    else showError("Dein Ergebnis konnte nicht dauerhaft gespeichert werden (Browser-Speicher voll?). Der offene Lerntest bleibt erhalten, du kannst es später erneut auswerten.");
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
  let meta = `${modeLabel} · ${quiz.fragen.length} Fragen · Dauer ${formatMinSec(durationMs)}`;
  if (mode === "pruefung") {
    meta += ` · Zeitlimit ${timer.limitMin} min` + (timer.overtime ? " (überschritten)" : "");
  }
  if (mode === "lernen" && quiz.schwierigkeitsgrad) {
    meta += ` · Schwierigkeitsgrad ${difficultyLabel(quiz.schwierigkeitsgrad)}`;
  }
  if (Array.isArray(quiz.vertiefungFelder) && quiz.vertiefungFelder.length) {
    meta += ` · Vertiefung: ${quiz.vertiefungFelder.map((f) => f.label).join(", ")}`;
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
    const r = (result.ergebnisse || []).find((e) => e && Number(e.id) === Number(q.id)) || {};
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
    // Reihenfolge-Antworten sind ein JSON-Index-Array, Mehrfach-MC eine Index-
    // Auswahl ("[0,2]") - beide fuer die Anzeige in lesbare Texte aufloesen. Alte
    // Versuche ohne diese Typen fallen auf den rohen String zurueck (bei
    // Single-Choice ohnehin der Optionstext). Keine Regression.
    let antwortText = answers[i] || "(keine Antwort)";
    if (q.typ === "reihenfolge" && Array.isArray(q.elemente)) {
      const uo = parseOrder(answers[i] || "", q.elemente.length);
      antwortText = uo ? uo.map((idx) => q.elemente[idx]).join(" -> ") : "(keine Antwort)";
    } else if (mcIsMulti(q)) {
      const sel = parseMultiSelection(answers[i] || "");
      antwortText = sel.size
        ? [...sel].sort((a, b) => a - b).map((k) => q.optionen[k]).filter((t) => t).join(", ")
        : "(keine Antwort)";
    }
    div.querySelector(".a").textContent = "Deine Antwort: " + antwortText;
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

// Gesamt-XP, ab der eine Stufe erreicht ist - dieselbe Progression wie
// levelForXp (Stufe 1 ab 0, jede weitere kostet 50 XP mehr). Anders als
// levelForXp, das die Schwellen der aktuellen Stufe liefert, beantwortet das die
// Frage "wie viel XP bis Stufe N" fuer beliebiges N. xpThresholdForLevel(3) = 250.
function xpThresholdForLevel(target) {
  let floor = 0, span = 100;
  for (let level = 1; level < target; level++) { floor += span; span += 50; }
  return floor;
}

// Ab welcher Stufe je Stelle die Vertiefungen freigeschaltet sind. Bewusst erst
// ab Stufe 3 (250 XP, grob 4 Versuche): die thematisch vertieften Frageboegen
// verursachen zusaetzliche Kosten und ergeben erst Sinn, wenn schon ein
// Grundverstaendnis der Stelle da ist.
const VERTIEFUNG_MIN_LEVEL = 3;

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
  '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12 2l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.1 20.4l1.1-6.5L2.5 8.8l6.5-.9z"/></svg>';
const BADGE_ICON_LOCKED =
  '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';

// Eigenes Sticker-Glyph je Abzeichen (statt des einen generischen Sterns).
// Aus dem jobreif-Design "Abzeichen". Alle nutzen currentColor und erben so
// Farbe/Groesse aus den .badge-icon-Regeln. Unbekannte ids fallen auf den
// Stern (BADGE_ICON_EARNED) zurueck, der BADGES-Katalog bleibt unveraendert.
const BADGE_ICONS = {
  // Erster Schritt — Fahne
  "erster-test": '<svg viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 7 V41"/><path d="M15 9 H35 L30 16 L35 23 H15"/></svg>',
  // Ernstfall — Stoppuhr
  "ernstfall": '<svg viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="28" r="12"/><path d="M24 28 V20"/><path d="M20 7 H28"/><path d="M24 7 V12"/><path d="M35 18 L37.5 15.5"/></svg>',
  // Bestanden — Haken
  "bestanden": '<svg viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="4.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="12 25 20 34 36 14"/></svg>',
  // Souverän — Schild mit Haken
  "souveraen": '<svg viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M24 7 L37 12 V22 C37 30 31 37 24 41 C17 37 11 30 11 22 V12 Z"/><polyline points="18 23 22 28 30 18"/></svg>',
  // Spitzenreiter — Pokal
  "spitze": '<svg viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 9 H33 V17 a9 9 0 0 1 -18 0 Z"/><path d="M15 11 H10 a3.5 3.5 0 0 0 4.5 6.5"/><path d="M33 11 H38 a3.5 3.5 0 0 1 -4.5 6.5"/><path d="M24 26 V31"/><path d="M19 39 H29"/><path d="M20.5 39 L22 31 H26 L27.5 39"/></svg>',
  // Aufwärtstrend — Trendpfeil
  "aufwaerts": '<svg viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="10 32 19 23 26 29 38 15"/><polyline points="30 15 38 15 38 23"/></svg>',
  // Drei am Stück — Flamme
  "drei-serie": '<svg viewBox="0 0 48 48" aria-hidden="true" fill="currentColor"><path d="M25 7 c4 6 8 9 8 16 a9 9 0 0 1 -18 0 c0 -4 2 -7 4 -9 c0 3 1 5 3 6 c2 -4 -2 -8 3 -13 z"/></svg>',
  // Hartnäckig — Gipfel
  "hartnaeckig": '<svg viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 36 L19 15 L27 27 L32 19 L40 36 Z"/><path d="M15.5 21 L19 15 L22.5 21"/></svg>',
};

// Gruppen der Abzeichen (fuer die Detailansicht). Aus dem jobreif-Abzeichen-
// Design. Reine Anzeige-Metadaten - der BADGES-Katalog bleibt unveraendert.
const BADGE_GROUPS = {
  fleiss: { label: "Fleiß", note: "Fürs Dranbleiben" },
  leistung: { label: "Leistung", note: "Nur im Prüfungsmodus — echtes Können" },
};

// Zusatz-Infos je Abzeichen-id fuer die Detailansicht: Gruppe, optionales
// Ziel (Zahl/Schwelle als Sticker-Pille) und Prestige-Glow. Additiv und
// defensiv - unbekannte ids haben einfach keine Metadaten.
const BADGE_META = {
  "erster-test": { group: "fleiss" },
  "drei-serie": { group: "fleiss", goal: "3" },
  "hartnaeckig": { group: "fleiss", goal: "10" },
  "ernstfall": { group: "leistung" },
  "bestanden": { group: "leistung", goal: "50%" },
  "souveraen": { group: "leistung", goal: "70%" },
  "spitze": { group: "leistung", goal: "90%", prestige: true },
  "aufwaerts": { group: "leistung" },
};

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
    icon.innerHTML = b.earned ? (BADGE_ICONS[b.id] || BADGE_ICON_EARNED) : BADGE_ICON_LOCKED;
    const lab = document.createElement("span");
    lab.textContent = b.label + (hi.has(b.id) ? " · neu" : "");
    pill.appendChild(icon);
    pill.appendChild(lab);
    pill.title = b.desc + (b.earned ? "" : " (noch nicht erreicht)");
    // Tippen/Klicken oeffnet die Detailansicht (grosser Sticker + Bedingung).
    pill.setAttribute("role", "button");
    pill.setAttribute("tabindex", "0");
    pill.setAttribute("aria-haspopup", "dialog");
    pill.setAttribute("aria-label",
      `${b.label}, ${b.earned ? "freigeschaltet" : "noch nicht erreicht"}. Details öffnen`);
    pill.addEventListener("click", () => openBadgeModal(b));
    pill.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openBadgeModal(b); }
    });
    row.appendChild(pill);
  });
  return row;
}

// Grosser Abzeichen-Sticker fuer die Detailansicht: getiltetes Squircle mit
// weissem Die-Cut-Rand, Strahlenkranz, Ordensband, Funkeln und optionaler
// Ziel-Pille. Gesperrt = gedaempfte graue Variante mit Schloss.
function buildBadgeSticker(badge) {
  const meta = BADGE_META[badge.id] || {};
  const el = document.createElement("div");
  el.className = "sticker" + (badge.earned ? "" : " locked")
    + (badge.earned && meta.prestige ? " prestige" : "");
  const glyph = badge.earned ? (BADGE_ICONS[badge.id] || BADGE_ICON_EARNED) : BADGE_ICON_LOCKED;
  let html = '<div class="sticker-rays"></div>'
    + '<div class="sticker-ribbon left"></div><div class="sticker-ribbon right"></div>'
    + '<div class="sticker-squircle">' + glyph + '</div>';
  if (badge.earned) {
    html += '<div class="sticker-spark a"></div><div class="sticker-spark b"></div>';
    if (meta.goal) html += '<div class="sticker-goal">' + meta.goal + '</div>';
  }
  el.innerHTML = html;
  return el;
}

// Merkt sich das ausloesende Abzeichen-Pill, um den Fokus beim Schliessen
// wieder dorthin zurueckzugeben.
let lastBadgeTrigger = null;

function openBadgeModal(badge) {
  const body = $("badge-modal-body");
  if (!body) return;
  lastBadgeTrigger = document.activeElement;
  body.innerHTML = "";
  body.appendChild(buildBadgeSticker(badge));

  const meta = BADGE_META[badge.id] || {};
  const grp = BADGE_GROUPS[meta.group];
  if (grp) {
    const g = document.createElement("div");
    g.className = "badge-detail-group";
    g.textContent = `${grp.label} · ${grp.note}`;
    body.appendChild(g);
  }

  const h = document.createElement("h2");
  h.id = "badge-modal-title";
  h.className = "badge-detail-title";
  h.textContent = badge.label;
  body.appendChild(h);

  const st = document.createElement("span");
  st.className = "badge-status " + (badge.earned ? "earned" : "locked");
  st.textContent = badge.earned ? "Freigeschaltet" : "Noch nicht erreicht";
  body.appendChild(st);

  const d = document.createElement("p");
  d.className = "badge-detail-desc";
  d.textContent = badge.desc;
  body.appendChild(d);

  $("badge-modal").classList.remove("hidden");
  $("btn-badge-close").focus();
}

function closeBadgeModal() {
  $("badge-modal").classList.add("hidden");
  if (lastBadgeTrigger && typeof lastBadgeTrigger.focus === "function") lastBadgeTrigger.focus();
  lastBadgeTrigger = null;
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

  // Echter Stufenaufstieg: eskalierende Feier als Overlay. Nur bei frischer
  // Auswertung (opts.leveledUp) - die Review-Ansicht ruft renderResultGami ohne
  // opts auf und loest deshalb nie eine Feier (oder Kosten) aus.
  // Es gibt nur zehn benannte Stufen (LEVEL_TITLES, "Legende" = 10). XP zaehlt
  // darueber hinaus weiter, also feiern wir nur bis einschliesslich Stufe 10 -
  // sonst zeigte jeder Aufstieg ab Stufe 11 erneut eine "Stufe 10"-Feier
  // (geklemmt), obwohl der Fortschritt schon Level 11+ anzeigt. Der textliche
  // Hinweis oben nennt weiterhin die echte Stufe.
  if (opts.leveledUp && progress.level <= 10) playLevelUp(progress.level);
}

/* ---------- Stufenaufstieg-Feier (Overlay) ----------
   Eskalierende Level-Up-Animation aus dem jobreif-Design "Level-Up". Rein
   visuell: kein API-Aufruf, kein gespeicherter Zustand. Wird nur bei einem
   echten Aufstieg getriggert (after.level > before.level). Respektiert
   prefers-reduced-motion (zeigt dann nur den Endzustand, ohne Bewegung). */

// Eskalationsstufen je Level (1-10). Identisch zur Design-Vorlage.
function levelUpTier(l) {
  return {
    over: 1.05 + l * 0.013,
    rays: l >= 4,
    rayOpacity: Math.min(0.55, 0.2 + l * 0.04),
    glow: l >= 4,
    shimmer: l >= 6,
    spark: l >= 5,
    sparkCount: Math.max(0, l - 4) * 4,
    flash: l >= 8,
    crown: l >= 9,
    gold: l === 10,
    count: Math.round(8 + l * 7),
  };
}

// Token entwertet ausstehende Timeouts (verzoegerte Sweeps/Spawns), wenn die
// Feier vorher geschlossen oder erneut gestartet wird.
let levelUpToken = 0;
let levelUpReturnFocus = null;

// Einziger Zugriff auf die Buehnen-Elemente ueber ihr data-role - playLevelUp
// und closeLevelUp teilen sich diesen Selektor, statt ihn mehrfach auszuschreiben.
function luRole(name) {
  const stage = $("levelup-stage");
  return stage && stage.querySelector('[data-role="' + name + '"]');
}

function playLevelUp(level) {
  const overlay = $("levelup-overlay");
  const stage = $("levelup-stage");
  if (!overlay || !stage) return;
  const l = Math.max(1, Math.min(10, Math.round(level) || 1));
  const token = ++levelUpToken;
  const alive = () => levelUpToken === token;
  const q = luRole;
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const t = levelUpTier(l);

  const disc = q("disc"), rays = q("rays"), glow = q("glow"), crown = q("crown"),
    shimmer = q("shimmer"), num = q("num"), title = q("title"), sub = q("sub"),
    xp = q("xp"), flash = q("flash"), conf = q("confetti"), spark = q("sparkle");

  num.textContent = String(l);
  title.textContent = levelTitle(l);
  sub.textContent = "Stufe " + l + " erreicht";

  const GOLD = "radial-gradient(circle at 38% 28%, oklch(0.88 0.13 84), oklch(0.74 0.15 62) 55%, oklch(0.60 0.16 46))";
  const CORAL = "radial-gradient(circle at 38% 30%, oklch(0.74 0.15 42), oklch(0.56 0.17 35) 62%, oklch(0.47 0.17 33))";

  disc.style.background = t.gold ? GOLD : CORAL;
  disc.style.boxShadow = "inset 0 3px 8px oklch(1 0 0 / 0.4), inset 0 -8px 16px oklch(0.40 0.12 30 / 0.5), inset 0 0 0 6px oklch(1 0 0 / 0.16), 0 16px 30px -14px oklch(0.55 0.17 35 / 0.6)" +
    (t.gold ? ", 0 0 34px oklch(0.80 0.14 70 / 0.7)" : (l >= 7 ? ", 0 0 26px oklch(0.65 0.16 40 / 0.5)" : ""));
  crown.style.background = t.gold ? "linear-gradient(180deg, oklch(0.90 0.13 86), oklch(0.76 0.15 62))" : "linear-gradient(180deg, oklch(0.86 0.12 60), oklch(0.66 0.16 44))";

  // Laufende Animationen zuruecksetzen (Partikel werden weiter unten ueberblendet)
  rays.style.animation = "none"; shimmer.style.animation = "none"; glow.style.animation = "none";
  if (rays.getAnimations) rays.getAnimations().forEach((a) => a.cancel());

  rays.style.opacity = t.rays ? String(t.rayOpacity) : "0";
  glow.style.opacity = t.glow ? "1" : "0";
  crown.style.opacity = t.crown ? "1" : "0";
  shimmer.style.opacity = "0";

  levelUpReturnFocus = document.activeElement;
  // Sichtbar starten (entfernt einen evtl. haengengebliebenen Pausenzustand aus
  // einer frueheren, im Hintergrund geschlossenen Feier).
  stage.classList.toggle("lu-paused", !!document.hidden);
  overlay.classList.remove("hidden");
  const closeBtn = $("levelup-close");
  if (closeBtn) closeBtn.focus();

  if (reduce) {
    disc.style.transform = "none";
    title.style.opacity = "1"; title.style.transform = "none";
    sub.style.opacity = "1"; xp.style.transform = "scaleX(1)";
    if (t.rays) rays.style.transform = "translate(-50%,-50%) scale(1)";
    if (t.glow) glow.style.opacity = "0.6";
    conf.innerHTML = ""; spark.innerHTML = "";
    return;
  }

  disc.animate(
    [{ transform: "scale(0.2) rotate(-16deg)" },
     { transform: "scale(" + t.over + ") rotate(7deg)", offset: 0.58 },
     { transform: "scale(0.97) rotate(-2deg)", offset: 0.78 },
     { transform: "scale(1) rotate(0)" }],
    { duration: 760, easing: "cubic-bezier(.2,.8,.2,1)" });

  if (t.glow) {
    glow.style.animation = "lu-glow " + (2.6 - l * 0.08) + "s ease-in-out 0.6s infinite";
  }
  if (t.rays) {
    rays.animate([{ transform: "translate(-50%,-50%) scale(0.4) rotate(-40deg)" },
                  { transform: "translate(-50%,-50%) scale(1) rotate(0)" }],
      { duration: 780, easing: "cubic-bezier(.2,.8,.2,1)" });
    setTimeout(() => { if (alive()) rays.style.animation = "lu-raySpin " + (52 - l * 2.5) + "s linear infinite"; }, 800);
  }
  if (t.crown) {
    crown.animate([{ transform: "translateX(-50%) translateY(-22px) scale(0.4)" },
                   { transform: "translateX(-50%) translateY(4px) scale(1.08)", offset: 0.7 },
                   { transform: "translateX(-50%) translateY(0) scale(1)" }],
      { duration: 640, delay: 340, easing: "cubic-bezier(.2,1.5,.4,1)" });
  }
  if (t.shimmer) {
    // Unsichtbar halten bis der Sweep wirklich startet, sonst klebt ein
    // statischer Lichtstreifen am Disc-Rand. Start erst nach dem Medaillen-Pop.
    shimmer.style.willChange = "transform";
    shimmer.style.opacity = "0";
    shimmer.style.animation = "none";
    setTimeout(() => {
      if (!alive()) return;
      void shimmer.offsetWidth;
      shimmer.style.opacity = "1";
      shimmer.style.animation = "lu-shimmer 3s cubic-bezier(.45,0,.2,1) 0s infinite";
    }, 950);
  }

  title.animate([{ transform: "translateY(16px)", opacity: 0 }, { transform: "none", opacity: 1 }],
    { duration: 520, delay: 130, easing: "cubic-bezier(.2,.8,.2,1)", fill: "both" });
  xp.animate([{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
    { duration: 950, delay: 280, easing: "cubic-bezier(.3,.9,.2,1)" });

  if (t.flash) {
    flash.animate([{ opacity: 0 }, { opacity: t.gold ? 0.75 : 0.5, offset: 0.12 }, { opacity: 0 }],
      { duration: 620, easing: "ease-out" });
  }

  // Partikel sanft ueberblenden: altes Konfetti/Funkeln ausfaden, dann neu spawnen.
  const hadOld = conf.children.length > 0 || spark.children.length > 0;
  conf.style.transition = "opacity .22s ease"; spark.style.transition = "opacity .22s ease";
  conf.style.opacity = "0"; spark.style.opacity = "0";
  const spawn = () => {
    if (!alive()) return;
    conf.innerHTML = ""; spark.innerHTML = "";
    conf.style.opacity = "1"; spark.style.opacity = "1";
    levelUpConfetti(conf, t);
    if (t.spark) levelUpSparkles(spark, t.sparkCount);
  };
  setTimeout(spawn, hadOld ? 220 : 0);
}

function levelUpConfetti(container, t) {
  const H = container.clientHeight || 540;
  const cols = ["oklch(0.62 0.17 37)", "oklch(0.55 0.17 35)", "oklch(0.72 0.15 41)", "oklch(0.92 0.04 60)"];
  if (t.flash || t.gold) cols.push("oklch(0.82 0.13 78)", "oklch(0.88 0.12 84)");
  for (let i = 0; i < t.count; i++) {
    const p = document.createElement("div");
    const sz = 6 + Math.random() * 7;
    const round = Math.random() > 0.55;
    p.style.cssText = "position:absolute;top:-16px;left:" + (Math.random() * 100) + "%;width:" + sz + "px;height:" + (round ? sz : sz * 1.6) + "px;background:" + cols[(Math.random() * cols.length) | 0] + ";border-radius:" + (round ? "50%" : "2px") + ";opacity:0;will-change:transform;";
    container.appendChild(p);
    const driftX = (Math.random() * 2 - 1) * 90;
    const rot = (Math.random() * 2 - 1) * 540;
    const dur = 1400 + Math.random() * 1300;
    const delay = Math.random() * 260;
    p.animate(
      [{ transform: "translate(0,0) rotate(0)", opacity: 1 },
       { transform: "translate(" + driftX + "px," + (H + 40) + "px) rotate(" + rot + "deg)", opacity: 1, offset: 0.85 },
       { transform: "translate(" + (driftX * 1.1) + "px," + (H + 80) + "px) rotate(" + rot + "deg)", opacity: 0 }],
      { duration: dur, delay: delay, easing: "cubic-bezier(.25,.6,.5,1)", fill: "both" });
  }
}

function levelUpSparkles(container, n) {
  for (let i = 0; i < n; i++) {
    const s = document.createElement("div");
    const sz = 5 + Math.random() * 8;
    const x = 12 + Math.random() * 76, y = 8 + Math.random() * 52;
    s.style.cssText = "position:absolute;left:" + x + "%;top:" + y + "%;width:" + sz + "px;height:" + sz + "px;background:oklch(0.84 0.13 80);opacity:0;clip-path:polygon(50% 0,61% 39%,100% 50%,61% 61%,50% 100%,39% 61%,0 50%,39% 39%);box-shadow:0 0 7px oklch(0.88 0.12 78 / 0.9);animation:lu-twinkle " + (1 + Math.random() * 0.8) + "s ease-in-out " + (0.4 + Math.random() * 1.1) + "s infinite;";
    container.appendChild(s);
  }
}

// Feier schliessen: laufende Endlos-Animationen und Partikel stoppen, damit im
// Hintergrund keine CPU mehr verbraucht wird; Token entwertet offene Timeouts.
function closeLevelUp() {
  const overlay = $("levelup-overlay");
  if (!overlay || overlay.classList.contains("hidden")) return;
  levelUpToken++;
  overlay.classList.add("hidden");
  const stage = $("levelup-stage");
  if (stage) {
    stage.classList.remove("lu-paused");
    ["confetti", "sparkle"].forEach((r) => { const el = luRole(r); if (el) el.innerHTML = ""; });
    ["rays", "glow", "shimmer"].forEach((r) => { const el = luRole(r); if (el) el.style.animation = "none"; });
  }
  restoreLevelUpFocus();
}

// Fokus nach dem Schliessen zurueckgeben. Das vor der Feier fokussierte Element
// kann inzwischen ausgeblendet sein: playLevelUp laeuft noch in der Quiz-Ansicht,
// danach blendet die Auswertung diese aus (display:none). focus() auf ein
// unsichtbares Element schlaegt still fehl und der Fokus faellt auf <body>.
// Darum nur zuruecksetzen, wenn das Element noch sichtbar ist, sonst auf die
// jetzt sichtbare Ansicht ausweichen.
function restoreLevelUpFocus() {
  const prev = levelUpReturnFocus;
  levelUpReturnFocus = null;
  if (prev && prev.isConnected && prev.offsetParent !== null && typeof prev.focus === "function") {
    prev.focus();
    return;
  }
  // Ausweich-Ziel: die jetzt sichtbare Ansicht selbst fokussierbar machen und
  // den Fokus dorthin holen. tabindex=-1 haelt sie aus der Tab-Reihenfolge
  // heraus (nur per Skript fokussierbar) und bleibt unsichtbar (kein Fokus-
  // Rahmen auf der Karte) - ein etabliertes Muster fuer Ansichtswechsel.
  const view = $(currentView());
  if (!view) return;
  view.setAttribute("tabindex", "-1");
  view.focus();
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

// Gibt true zurueck, wenn der Verlauf wirklich geschrieben wurde, sonst false
// (Speicher voll/blockiert, nichts mehr zum Verwerfen). Aufrufer, die etwas davon
// abhaengig machen (z. B. eine offene Lern-Sitzung erst danach verwerfen), muessen
// das Ergebnis pruefen.
function saveHistory(h) {
  // Bei vollem Speicher aelteste Versuche verwerfen und erneut versuchen
  for (let i = 0; i < 5; i++) {
    try {
      localStorage.setItem("bewerbungstool.history", JSON.stringify(h));
      return true;
    } catch {
      let oldest = null;
      let oldestJob = null;
      h.jobs.forEach((j) => j.attempts.forEach((a) => {
        if (!oldest || (a.date || 0) < (oldest.date || 0)) { oldest = a; oldestJob = j; }
      }));
      if (!oldest) return false;
      oldestJob.attempts = oldestJob.attempts.filter((a) => a !== oldest);
      h.jobs = h.jobs.filter((j) => j.attempts.length > 0);
    }
  }
  return false;
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

// Identität einer Stelle aus dem, was sie für den Nutzer ausmacht: Bezeichnung
// + Arbeitgeber + Arbeitsort ("Fachinformatiker bei IBM in Bonn"). Damit wird
// dieselbe ohne URL erneut eingefügte Anzeige - die einen leicht abweichenden
// Text und damit einen anderen jobKey hätte - wieder derselben Stelle zugeordnet.
// Bewusst nur gebildet, wenn Arbeitgeber UND Arbeitsort bekannt sind: ohne sie
// wäre der Schlüssel zu grob (zwei generische "Fachinformatiker" verschiedener
// Firmen würden fälschlich verschmelzen). Liefert sonst null. Hinweis: greift
// als Fallback erst nach dem urlKey und nur bei abweichendem Text - zwei echte
// verschiedene Stellen mit identischem Titel/Arbeitgeber/Ort würden dabei
// zusammengeführt; das ist gegenüber dem Aufsplitten der selteneren Fehler.
function identityKeyOf(titel, arbeitgeber, arbeitsort) {
  const ag = (typeof arbeitgeber === "string" ? arbeitgeber : "").trim();
  const ao = (typeof arbeitsort === "string" ? arbeitsort : "").trim();
  if (!ag || !ao) return null;
  const norm = (s) => s.replace(/\s+/g, " ").trim().toLowerCase();
  return "i" + hashStr(`${norm(titel || "")}|${norm(ag)}|${norm(ao)}`);
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
  const iKey = identityKeyOf(quiz.titel, quiz.arbeitgeber, quiz.arbeitsort);
  // Suchreihenfolge: zuerst die stabile URL-Identität (urlKey), dann die
  // Stellen-Identität aus Titel+Arbeitgeber+Ort (identityKey), zuletzt der
  // Text-key. So landen Versuche derselben Anzeige zusammen, auch wenn sie ohne
  // URL und mit leicht abweichendem Text erneut eingefügt wurde. Die identityKey-
  // Zusammenführung wird nur unterdrückt, wenn beide Seiten eine URL-Identität
  // haben und diese sich unterscheiden - dann sind es nachweislich zwei
  // verschiedene Anzeigen und bleiben getrennt.
  let job =
    (uKey && h.jobs.find((j) => j.urlKey === uKey)) ||
    (iKey && h.jobs.find((j) => j.identityKey === iKey && !(uKey && j.urlKey && j.urlKey !== uKey))) ||
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
  // Stellen-Identitaet (Titel, Arbeitgeber, Arbeitsort) nur aus normalen Tests
  // uebernehmen. Ein Vertiefungsbogen ist ein abgeleiteter Uebungstest ueber
  // Teilthemen; sein quiz.titel traegt die Themenfelder (z. B. "Busfahrer:in -
  // Vertiefungsbogen Sicherheit & Service") und darf den Stellentitel nicht
  // ueberschreiben. Normale Tests leiten den Titel weiterhin sauber neu ab und
  // heilen so einen zuvor verschmutzten Titel von selbst.
  const istVertiefung = Array.isArray(quiz.vertiefungFelder) && quiz.vertiefungFelder.length;
  if (!istVertiefung) {
    job.titel = quiz.titel;
    // Arbeitgeber und Arbeitsort auffrischen, sobald erkannt - sie machen zwei
    // gleichnamige Stellen (z. B. "Fachinformatiker") in der Liste unterscheidbar.
    // Additiv: aeltere Stellen ohne diese Felder bleiben gueltig, Anzeige faellt
    // dann auf den Titel allein zurueck. Leere Werte ueberschreiben nichts.
    if (typeof quiz.arbeitgeber === "string" && quiz.arbeitgeber.trim()) job.arbeitgeber = quiz.arbeitgeber.trim();
    if (typeof quiz.arbeitsort === "string" && quiz.arbeitsort.trim()) job.arbeitsort = quiz.arbeitsort.trim();
  }
  // identityKey aus den aktuellen Feldern der Stelle ableiten (nicht aus dem
  // einzelnen Versuch), damit er zur Stelle passt und ältere, vor diesem Feld
  // angelegte Stellen ihn beim nächsten Versuch nachtragen. Null (Arbeitgeber
  // oder Ort fehlt) lässt einen evtl. vorhandenen Wert unangetastet.
  const jobIKey = identityKeyOf(job.titel, job.arbeitgeber, job.arbeitsort);
  if (jobIKey) job.identityKey = jobIKey;
  // Zuletzt genutzte Test-Einstellungen merken, damit die Stellen-Subpage einen
  // Test mit denselben Optionen per Tipp wiederholen kann (One-Tap-Repeat).
  job.lastTestConfig = {
    mode,
    difficulty: quiz.schwierigkeitsgrad || "",
    num: quiz.fragen.length,
  };

  // Vertiefung: die Themenfeld-Ableitung war ein eigener bezahlter Aufruf. Ihre
  // Kosten/Tokens genau EINMAL in den ersten Vertiefungs-Versuch einrechnen, der
  // die Felder tatsaechlich nutzt (costCounted-Flag) - sonst fielen sie aus der
  // Kostenanzeige der Historie heraus oder wuerden bei jedem Versuch erneut
  // gezaehlt. Bleibt undefiniert/aus, wenn keine Ableitung im Spiel war.
  let genCost = quiz.genCost;
  let genTokens = quiz.genTokens;
  if (Array.isArray(quiz.vertiefungFelder) && quiz.vertiefungFelder.length &&
      job.themenfelder && !job.themenfelder.costCounted) {
    const dc = job.themenfelder.cost;
    if (typeof dc === "number") genCost = (typeof genCost === "number" ? genCost : 0) + dc;
    const dt = job.themenfelder.tokens;
    if (dt && typeof dt === "object") {
      genTokens = {
        input: ((genTokens && genTokens.input) || 0) + (dt.input || 0),
        output: ((genTokens && genTokens.output) || 0) + (dt.output || 0),
      };
    }
    job.themenfelder.costCounted = true;
  }

  const cost = buildCost(genCost, evalCost);
  const tokens = buildTokens(genTokens, evalTokens);

  const quizCopy = JSON.parse(JSON.stringify(quiz));
  delete quizCopy.jobText; // liegt schon auf dem Job, spart Speicher
  delete quizCopy.genCost; // liegt als cost am Versuch, nicht doppelt sichern
  delete quizCopy.genTokens; // liegt als tokens am Versuch, nicht doppelt sichern
  delete quizCopy.urlKey;  // liegt am Job
  delete quizCopy.jobUrl;  // liegt am Job
  delete quizCopy.vertiefungFelder; // liegt als attempt.vertiefung am Versuch

  const attempt = {
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
  };
  // Vertiefungs-Versuche tragen die genutzten Felder; normale Versuche haben das
  // Feld nicht (Anzeige liest defensiv).
  if (Array.isArray(quiz.vertiefungFelder) && quiz.vertiefungFelder.length) {
    attempt.vertiefung = { felder: quiz.vertiefungFelder };
  }
  job.attempts.push(attempt);

  if (job.attempts.length > HISTORY_MAX_ATTEMPTS) job.attempts = job.attempts.slice(-HISTORY_MAX_ATTEMPTS);
  if (h.jobs.length > HISTORY_MAX_JOBS) h.jobs.length = HISTORY_MAX_JOBS;
  return saveHistory(h); // true, wenn der Versuch wirklich gespeichert wurde
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

// Arbeitgeber und Arbeitsort als eine Zeile zur Unterscheidung gleichnamiger
// Stellen ("Fachinformatiker bei IBM in Bonn" vs. "... bei Stadtwerke Halle").
// Leer, wenn beide Felder fehlen (aeltere Stellen) - dann traegt nur der Titel.
function jobSubtitle(job) {
  const parts = [];
  if (job && typeof job.arbeitgeber === "string" && job.arbeitgeber.trim()) parts.push(job.arbeitgeber.trim());
  if (job && typeof job.arbeitsort === "string" && job.arbeitsort.trim()) parts.push(job.arbeitsort.trim());
  return parts.join(" · ");
}

// Eine Stelle samt aller Versuche aus der Historie entfernen. Identifikation
// ueber den stabilen key (Hash des Stellentexts, liegt auf jedem gespeicherten
// Eintrag), zusaetzlich der urlKey als Rueckfall. Eine Referenzgleichheit
// hilft nicht: loadHistory parst frisch, das uebergebene job-Objekt ist nie
// dasselbe wie ein geladenes. Destruktiv und unwiderruflich.
function deleteJob(job) {
  const h = loadHistory();
  h.jobs = h.jobs.filter((j) =>
    !(job.key && j.key === job.key) &&
    !(job.urlKey && j.urlKey === job.urlKey));
  saveHistory(h);
  // Verweist activeJob noch auf die geloeschte Stelle, Bezug aufloesen, damit
  // Zurueck-Navigation nicht auf einen verwaisten Eintrag springt.
  if (activeJob && activeJob.key === job.key) activeJob = null;
}

// Loesch-Knopf mit Sicherheitsabfrage (eigenes Modal statt blockierendem
// nativen confirm(), wie beim Auswerten). afterDelete rendert die gerade
// sichtbare Ansicht neu (Historie bzw. zurueck zur Startseite, wenn die offene
// Stelle selbst geloescht wurde).
function buildDeleteButton(job, afterDelete) {
  const btn = document.createElement("button");
  btn.className = "danger";
  btn.textContent = "Löschen";
  btn.title = "Diese Stelle mit allen Versuchen aus der Historie entfernen";
  btn.addEventListener("click", () => openConfirmDelete(job, afterDelete));
  return btn;
}

// Detaillierter Block einer Stelle: Kopf (Titel, Arbeitgeber/Ort, Statistik),
// Trend, Spielfortschritt und Versuchsliste. Wird in der Vollansicht (Historie)
// und auf der Stellen-Subpage genutzt. Auf der Subpage entfaellt der Oeffnen-
// Knopf, weil das Start-Panel dort schon oben sitzt.
function renderJobBlock(job, opts) {
  const subpage = !!(opts && opts.subpage);
  const block = document.createElement("div");
  block.className = "job-block";

  const best = Math.max(...job.attempts.map((a) => a.prozent || 0));
  const last = job.attempts[job.attempts.length - 1].prozent || 0;

  const head = document.createElement("div");
  head.className = "job-head";
  const title = document.createElement("div");
  const strong = document.createElement("strong");
  strong.textContent = job.titel;
  title.appendChild(strong);
  const subt = jobSubtitle(job);
  if (subt) {
    const emp = document.createElement("p");
    emp.className = "job-employer";
    emp.textContent = subt;
    title.appendChild(emp);
  }
  const sub = document.createElement("p");
  sub.className = "hint";
  sub.textContent = `${job.attempts.length} Versuch${job.attempts.length === 1 ? "" : "e"} · Bester: ${best} % · Letzter: ${last} %`;
  title.appendChild(sub);
  head.appendChild(title);
  const actions = document.createElement("div");
  actions.className = "job-head-actions";
  if (!subpage) {
    const openBtn = document.createElement("button");
    openBtn.textContent = "Öffnen";
    openBtn.title = "Stelle öffnen: Tests starten und Fortschritt ansehen";
    openBtn.addEventListener("click", () => openJob(job));
    actions.appendChild(openBtn);
  }
  // Auf der Subpage zurueck zur Startseite (die offene Stelle verschwindet),
  // in der Historie nur die Liste neu aufbauen.
  actions.appendChild(buildDeleteButton(job, subpage ? goHome : renderHistory));
  head.appendChild(actions);
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
      // Vertiefungs-Versuche kennzeichnen; aeltere/normale Versuche haben kein
      // vertiefung-Feld (defensiv).
      (att.vertiefung && Array.isArray(att.vertiefung.felder) && att.vertiefung.felder.length
        ? ` · Vertiefung: ${att.vertiefung.felder.map((f) => f.label).join(", ")}`
        : "") +
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

  return block;
}

function renderHistory() {
  const h = loadHistory();
  const list = $("history-list");
  list.innerHTML = "";
  const jobs = h.jobs.filter((j) => j && Array.isArray(j.attempts) && j.attempts.length > 0);
  $("history-empty").classList.toggle("hidden", jobs.length > 0);
  jobs.forEach((job) => list.appendChild(renderJobBlock(job)));
}

/* ---------- Startliste (Home) und Stellen-Subpage ---------- */

// Wie viele Stellen die Startliste direkt zeigt; der Rest ist ueber "Alle
// Stellen ansehen" (Vollansicht/Historie) erreichbar.
const HOME_MAX = 5;

// Kompakte Karte einer Stelle fuer die Startliste: Titel, Arbeitgeber/Ort,
// kurze Kennzahlen, Bestwert und ein Mini-Trend. Tippen oeffnet die Subpage.
function buildHomeCard(job) {
  const best = Math.max(...job.attempts.map((a) => a.prozent || 0));
  const prog = computeJobProgress(job);
  // Bewusst ein div mit role/tabindex statt <button>: die Karte enthaelt
  // Block-Inhalte (Titel, Untertitel, Kennzahlen, Mini-Trend), die im
  // Button-Inhaltsmodell nicht zulaessig waeren. Tastaturbedienung (Enter/Leer)
  // wird unten nachgebildet.
  const card = document.createElement("div");
  card.className = "home-card";
  card.setAttribute("role", "button");
  card.tabIndex = 0;

  const main = document.createElement("div");
  main.className = "home-card-main";
  const strong = document.createElement("strong");
  strong.textContent = job.titel;
  main.appendChild(strong);
  const subt = jobSubtitle(job);
  if (subt) {
    const emp = document.createElement("p");
    emp.className = "home-card-sub";
    emp.textContent = subt;
    main.appendChild(emp);
  }
  const meta = document.createElement("p");
  meta.className = "hint";
  meta.textContent = `${job.attempts.length} Versuch${job.attempts.length === 1 ? "" : "e"} · Level ${prog.level}`;
  main.appendChild(meta);

  const side = document.createElement("div");
  side.className = "home-card-side";
  const score = document.createElement("span");
  score.className = "home-card-score " + scoreClass(best);
  score.textContent = best + " %";
  side.appendChild(score);
  const trend = document.createElement("div");
  trend.className = "trend mini";
  job.attempts.slice(-8).forEach((a) => {
    const bar = document.createElement("div");
    bar.className = "trend-bar " + scoreClass(a.prozent);
    bar.style.height = Math.max(3, Math.round(a.prozent * 0.28)) + "px";
    trend.appendChild(bar);
  });
  side.appendChild(trend);

  card.appendChild(main);
  card.appendChild(side);
  card.addEventListener("click", () => openJob(job));
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openJob(job);
    }
  });
  return card;
}

function renderHome() {
  const h = loadHistory();
  const jobs = h.jobs.filter((j) => j && Array.isArray(j.attempts) && j.attempts.length > 0);
  const list = $("home-list");
  list.innerHTML = "";
  $("home-empty").classList.toggle("hidden", jobs.length > 0);
  $("home-all-row").classList.toggle("hidden", jobs.length === 0);
  jobs.slice(0, HOME_MAX).forEach((job) => list.appendChild(buildHomeCard(job)));
  // Laeuft/wartet ein Hintergrund-Job, dessen Karte nach der Navigation wieder
  // herstellen (sie blendet den widerspruechlichen "Noch keine Stelle"-Hinweis aus).
  const aj = loadActiveJob();
  if (aj) renderActiveJobCard(aj.status === "ready" ? "ready" : "pending");
  // Offenen Lerntest anbieten (blendet bei Bedarf den Leer-Hinweis aus).
  renderResumeCard();
}

// Gueltiger Fragenzahl-Bereich - identisch zum Stepper im Eingabe-Bildschirm
// (#num-questions). Eine Stelle.
const NUM_MIN = 4, NUM_MAX = 30;

// Test-Einstellungen defensiv lesen: aeltere Stellen haben kein lastTestConfig,
// dann Standard (Lernmodus, mittel, 10 Fragen). Die gespeicherte Fragenzahl ist
// die tatsaechlich erzeugte (quiz.fragen.length) und kann daneben liegen, wenn
// ein Modell mehr/weniger Fragen liefert - auf den gueltigen Bereich (4-30)
// klemmen, damit Stepper und Eingabe-Bildschirm nicht auseinander laufen.
function clampNum(n) {
  return Math.min(NUM_MAX, Math.max(NUM_MIN, Math.round(n)));
}

function normalizeTestConfig(c) {
  const valid = (d) => (d === "leicht" || d === "mittel" || d === "schwer" ? d : "mittel");
  const c2 = c && typeof c === "object" ? c : {};
  let num = Number(c2.num);
  if (!Number.isFinite(num) || num < 1) num = 10;
  return { mode: c2.mode === "pruefung" ? "pruefung" : "lernen", difficulty: valid(c2.difficulty), num: clampNum(num) };
}

// Wie viele Themenfelder eine Vertiefung mit so vielen Fragen sinnvoll abdecken
// kann - bzw. umgekehrt das Stepper-Minimum bei so vielen gewaehlten Feldern:
// 3 Felder ab 10 Fragen, 2 ab 8, 1 (oder 0) ab 4. Sorgt fuer genug Fragen je Feld.
function vertiefungMinFragen(count) {
  return count >= 3 ? 10 : count === 2 ? 8 : NUM_MIN;
}

// Fragen-Stepper fuer dynamisch erzeugte Panels (Subpage). Gleiche Optik und
// gleiches Verhalten (Bereich 4-30) wie der statische Stepper im Eingabe-
// Bildschirm; onChange meldet jeden gueltigen Wert zurueck. opts.min hebt die
// Untergrenze an (fuer die Vertiefung, deren Minimum mit der Feldauswahl
// floatet); ohne opts bleibt es bei NUM_MIN. setMin(n) verschiebt die Grenze
// live und zieht den Wert bei Bedarf hoch; getValue() liefert den Stand.
function buildNumStepper(initial, onChange, opts = {}) {
  const clampMin = (m) => Math.min(NUM_MAX, Math.max(NUM_MIN, Math.round(Number(m) || NUM_MIN)));
  let min = clampMin(opts.min);
  let value = Math.max(min, clampNum(Number(initial) || 10));
  const wrap = document.createElement("div");
  wrap.className = "stepper";
  wrap.setAttribute("role", "group");
  wrap.setAttribute("aria-label", "Anzahl Fragen");
  const dec = document.createElement("button");
  dec.type = "button";
  dec.className = "stepper-btn";
  dec.setAttribute("aria-label", "Eine Frage weniger");
  dec.innerHTML = "&minus;";
  const disp = document.createElement("span");
  disp.className = "stepper-value";
  disp.setAttribute("aria-live", "polite");
  const inc = document.createElement("button");
  inc.type = "button";
  inc.className = "stepper-btn";
  inc.setAttribute("aria-label", "Eine Frage mehr");
  inc.textContent = "+";
  const render = () => {
    disp.textContent = String(value);
    dec.disabled = value <= min;
    inc.disabled = value >= NUM_MAX;
  };
  const setValue = (n, notify) => {
    value = Math.min(NUM_MAX, Math.max(min, clampNum(n)));
    render();
    if (notify && onChange) onChange(value);
  };
  const step = (d) => setValue(value + d, true);
  dec.addEventListener("click", () => step(-1));
  inc.addEventListener("click", () => step(1));
  wrap.appendChild(dec);
  wrap.appendChild(disp);
  wrap.appendChild(inc);
  render();
  wrap.setMin = (m) => {
    min = clampMin(m);
    if (value < min) setValue(min, true);
    else render();
  };
  wrap.getValue = () => value;
  return wrap;
}

// Start-Panel der Subpage: Schwierigkeit und Fragenzahl stehen direkt sichtbar
// ueber zwei Startknoepfen (Lern-/Pruefungsmodus) - kein aufklappbarer Bereich
// mehr. Generiert wird erst beim ausdruecklichen Klick auf einen Startknopf,
// damit nichts versehentlich Kosten ausloest.
function buildStartPanel(job) {
  const state = normalizeTestConfig(job.lastTestConfig);
  const panel = document.createElement("div");
  panel.className = "start-panel";

  const controls = document.createElement("div");
  controls.className = "start-controls";

  // Schwierigkeit
  const diffWrap = document.createElement("div");
  diffWrap.className = "start-opt-row";
  const diffLabel = document.createElement("span");
  diffLabel.className = "start-opt-label";
  diffLabel.textContent = "Schwierigkeit";
  diffWrap.appendChild(diffLabel);
  const diffBtns = document.createElement("div");
  diffBtns.className = "start-opt-choices";
  [["leicht", "Leicht"], ["mittel", "Mittel"], ["schwer", "Schwer"]].forEach(([val, label]) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "chip" + (state.difficulty === val ? " active" : "");
    b.textContent = label;
    b.addEventListener("click", () => {
      state.difficulty = val;
      diffBtns.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
      b.classList.add("active");
    });
    diffBtns.appendChild(b);
  });
  diffWrap.appendChild(diffBtns);
  controls.appendChild(diffWrap);

  // Anzahl Fragen (Stepper 4-30, ersetzt das frühere Dropdown)
  const numWrap = document.createElement("div");
  numWrap.className = "start-opt-row";
  const numLabel = document.createElement("span");
  numLabel.className = "start-opt-label";
  numLabel.id = "start-num-label";
  numLabel.textContent = "Fragen";
  numWrap.appendChild(numLabel);
  const numStepper = buildNumStepper(state.num, (n) => { state.num = n; });
  numStepper.setAttribute("aria-labelledby", "start-num-label");
  numStepper.removeAttribute("aria-label");
  numWrap.appendChild(numStepper);
  controls.appendChild(numWrap);

  panel.appendChild(controls);

  const btnRow = document.createElement("div");
  btnRow.className = "start-buttons";
  const lernBtn = document.createElement("button");
  lernBtn.className = "primary";
  lernBtn.textContent = "Lernmodus starten";
  const pruefBtn = document.createElement("button");
  pruefBtn.className = "primary";
  pruefBtn.textContent = "Prüfungsmodus starten";
  lernBtn.addEventListener("click", () => startTestForJob(job, "lernen", state));
  pruefBtn.addEventListener("click", () => startTestForJob(job, "pruefung", state));
  btnRow.appendChild(lernBtn);
  btnRow.appendChild(pruefBtn);
  panel.appendChild(btnRow);

  // Vertiefungen: gesperrter Teaser (Stufe < 3 bzw. lokaler Anbieter) oder die
  // Auswahl, sobald freigeschaltet. Eigene Funktion, damit das Panel kompakt
  // bleibt.
  panel.appendChild(buildVertiefungSection(job));

  return panel;
}

// Gesperrter Vertiefungen-Hinweis (Schloss + zwei Textzeilen). Wiederverwendet
// fuer "ab Stufe 3" und "nur mit Cloud-Anbieter".
function buildVertiefungTeaser(title, sub) {
  const teaser = document.createElement("div");
  teaser.className = "vertiefung-teaser locked";
  const icon = document.createElement("span");
  icon.className = "vertiefung-teaser-icon";
  icon.innerHTML = BADGE_ICON_LOCKED;
  const txt = document.createElement("div");
  txt.className = "vertiefung-teaser-text";
  const t = document.createElement("span");
  t.className = "vertiefung-teaser-title";
  t.textContent = title;
  const s = document.createElement("span");
  s.className = "vertiefung-teaser-sub";
  s.textContent = sub;
  txt.appendChild(t);
  txt.appendChild(s);
  teaser.appendChild(icon);
  teaser.appendChild(txt);
  return teaser;
}

// Vertiefungen-Bereich einer Stelle: gesperrt (lokaler Anbieter oder Stufe noch
// nicht erreicht) zeigt nur den Teaser; freigeschaltet einen Knopf, der die
// Themenfeld-Auswahl oeffnet. Die Erst-Ableitung der Themenfelder passiert erst
// beim Klick (ein Cloud-Aufruf, ausdruecklich ausgeloest).
function buildVertiefungSection(job) {
  const wrap = document.createElement("div");
  wrap.className = "vertiefung-section";
  const provider = settings.provider || "anthropic";
  const prog = computeJobProgress(job);

  if (provider === "local") {
    wrap.appendChild(buildVertiefungTeaser("Vertiefungen", "nur mit Cloud-Anbieter verfügbar"));
    return wrap;
  }
  if (prog.level < VERTIEFUNG_MIN_LEVEL) {
    const need = Math.max(0, xpThresholdForLevel(VERTIEFUNG_MIN_LEVEL) - prog.totalXp);
    wrap.appendChild(buildVertiefungTeaser("Vertiefungen", `ab Stufe ${VERTIEFUNG_MIN_LEVEL} · noch ${need} XP`));
    return wrap;
  }

  const unlockBtn = document.createElement("button");
  unlockBtn.type = "button";
  unlockBtn.className = "vertiefung-unlock";
  unlockBtn.textContent = "Vertiefung starten";
  unlockBtn.addEventListener("click", async () => {
    if (actionRunning) return;
    const hasFields = job.themenfelder && Array.isArray(job.themenfelder.fields) && job.themenfelder.fields.length;
    if (!hasFields) {
      actionRunning = true;
      unlockBtn.disabled = true;
      showLoading("Themenfelder werden abgeleitet...");
      try {
        const derived = await deriveThemenfelder(job);
        saveThemenfelder(job, derived, prog.level);
      } catch (e) {
        showError(e.message);
        actionRunning = false;
        hideLoading();
        unlockBtn.disabled = false;
        return;
      }
      actionRunning = false;
      hideLoading();
    }
    wrap.replaceChild(buildVertiefungPicker(job), unlockBtn);
  });
  wrap.appendChild(unlockBtn);
  return wrap;
}

// Themenfeld-Auswahl: Chips (1-3), Stepper mit mitfloatendem Minimum, zwei
// Startknoepfe (ohne Schwierigkeit - Vertiefung ist immer "schwer"). Ist der
// Themenfeld-Stand veraltet (>= +2 Stufen), oben ein expliziter Neu-Ableiten-
// Knopf (kostet einen Aufruf).
function buildVertiefungPicker(job) {
  const box = document.createElement("div");
  box.className = "vertiefung-picker";
  const tf = job.themenfelder || { fields: [] };
  const prog = computeJobProgress(job);

  if (tf && Number.isFinite(tf.generatedAtLevel) && prog.level >= tf.generatedAtLevel + 2) {
    const stale = document.createElement("div");
    stale.className = "vertiefung-stale";
    const note = document.createElement("span");
    note.textContent = "Deine Themenfelder sind älter. ";
    const refresh = document.createElement("button");
    refresh.type = "button";
    refresh.className = "vertiefung-refresh";
    refresh.textContent = "Neu ableiten (kostet einen Aufruf)";
    refresh.addEventListener("click", async () => {
      if (actionRunning) return;
      actionRunning = true;
      refresh.disabled = true;
      showLoading("Themenfelder werden neu abgeleitet...");
      try {
        const derived = await deriveThemenfelder(job);
        saveThemenfelder(job, derived, prog.level);
      } catch (e) {
        showError(e.message);
        actionRunning = false;
        hideLoading();
        refresh.disabled = false;
        return;
      }
      actionRunning = false;
      hideLoading();
      box.replaceWith(buildVertiefungPicker(job));
    });
    stale.appendChild(note);
    stale.appendChild(refresh);
    box.appendChild(stale);
  }

  const selected = new Set();
  const chipsRow = document.createElement("div");
  chipsRow.className = "vertiefung-chips";
  const chipEls = [];
  (tf.fields || []).forEach((f) => {
    const c = document.createElement("button");
    c.type = "button";
    c.className = "chip vertiefung-chip" + (f.schwerpunkt ? " schwerpunkt" : "");
    c.textContent = f.label;
    c.title = (f.kurzbeschreibung || "") + (f.schwerpunkt ? " (Schwerpunkt: hier warst du bisher schwächer)" : "");
    c.addEventListener("click", () => {
      if (selected.has(f.id)) {
        selected.delete(f.id);
        c.classList.remove("active");
      } else {
        if (selected.size >= 3) return;
        selected.add(f.id);
        c.classList.add("active");
      }
      updateState();
    });
    chipEls.push({ f, el: c });
    chipsRow.appendChild(c);
  });
  box.appendChild(chipsRow);

  const numRow = document.createElement("div");
  numRow.className = "start-opt-row";
  const numLabel = document.createElement("span");
  numLabel.className = "start-opt-label";
  numLabel.id = "vert-num-label";
  numLabel.textContent = "Fragen";
  numRow.appendChild(numLabel);
  const stepper = buildNumStepper(10, null, { min: vertiefungMinFragen(0) });
  stepper.setAttribute("aria-labelledby", "vert-num-label");
  stepper.removeAttribute("aria-label");
  numRow.appendChild(stepper);
  box.appendChild(numRow);

  const btnRow = document.createElement("div");
  btnRow.className = "start-buttons";
  const lernBtn = document.createElement("button");
  lernBtn.className = "primary";
  lernBtn.textContent = "Vertiefung · Lernmodus starten";
  const pruefBtn = document.createElement("button");
  pruefBtn.className = "primary";
  pruefBtn.textContent = "Vertiefung · Prüfungsmodus starten";
  btnRow.appendChild(lernBtn);
  btnRow.appendChild(pruefBtn);
  box.appendChild(btnRow);

  function updateState() {
    const n = selected.size;
    stepper.setMin(vertiefungMinFragen(n));
    chipEls.forEach(({ f, el }) => { el.disabled = n >= 3 && !selected.has(f.id); });
    lernBtn.disabled = pruefBtn.disabled = n === 0;
  }
  updateState();

  const start = (testMode) => {
    const felder = (tf.fields || []).filter((f) => selected.has(f.id)).map((f) => ({ id: f.id, label: f.label }));
    if (!felder.length) return;
    startVertiefungForJob(job, testMode, stepper.getValue(), felder);
  };
  lernBtn.addEventListener("click", () => start("lernen"));
  pruefBtn.addEventListener("click", () => start("pruefung"));

  return box;
}

// Vertiefung starten: wie startTestForJob die Eingabe-Steuerelemente fuellen,
// die generateQuiz liest, Schwierigkeit auf "schwer" (in generateQuiz ohnehin
// erzwungen) und die gewaehlten Felder als expliziten Parameter uebergeben.
function startVertiefungForJob(job, testMode, num, felder) {
  if (actionRunning) return;
  $("job-text").value = job.jobText;
  if (job.url) {
    $("job-url").value = job.url;
    lastFetch = { url: job.url, text: job.jobText };
  } else {
    lastFetch = { url: "", text: "" };
  }
  setSourceTab("text");
  const mEl = document.querySelector(`input[name="mode"][value="${testMode}"]`);
  if (mEl) mEl.checked = true;
  const dEl = document.querySelector('input[name="difficulty"][value="schwer"]');
  if (dEl) dEl.checked = true;
  const numInput = $("num-questions");
  if (Number.isFinite(num)) {
    if (numInput.setValue) numInput.setValue(num);
    else numInput.value = String(num);
  }
  saveDraft();
  // Bisherigen Stand der Stelle mitgeben, damit der Prompt die Fragen bewusst
  // ueber dem aktuellen Niveau ansetzt (echte Vertiefung statt nur "schwer").
  const prog = computeJobProgress(job);
  const niveau = { level: prog.level, bestPct: prog.bestPct };
  generateQuiz({ vertiefung: { felder, niveau } });
}

let activeJob = null;

function renderJob(job) {
  activeJob = job;
  const block = renderJobBlock(job, { subpage: true });
  // Start-Panel direkt unter den Kopf (vor den Trend) setzen, damit der Titel
  // zuerst kommt und die Startknoepfe gleich darunter sichtbar sind.
  block.insertBefore(buildStartPanel(job), block.children[1] || null);
  const wrap = $("job-detail");
  wrap.innerHTML = "";
  wrap.appendChild(block);
}

function openJob(job) {
  renderJob(job);
  showView("view-job");
}

function goHome() {
  renderHome();
  showView("view-home");
}

// Einen Test fuer eine bestehende Stelle starten (One-Tap-Repeat): die Eingabe-
// Steuerelemente, die generateQuiz liest, mit Stellentext, URL und Konfiguration
// fuellen und dann normal generieren. lastFetch wie beim Laden setzen, damit der
// frische Test wieder denselben urlKey traegt und bei dieser Stelle landet.
function startTestForJob(job, testMode, cfg) {
  if (actionRunning) return;
  $("job-text").value = job.jobText;
  if (job.url) {
    $("job-url").value = job.url;
    lastFetch = { url: job.url, text: job.jobText };
  } else {
    // Kein verlaesslicher URL-Bezug: ueber den Text-key wird die Stelle erkannt.
    lastFetch = { url: "", text: "" };
  }
  setSourceTab("text");
  const mEl = document.querySelector(`input[name="mode"][value="${testMode}"]`);
  if (mEl) mEl.checked = true;
  const dEl = document.querySelector(`input[name="difficulty"][value="${cfg.difficulty}"]`);
  if (dEl) dEl.checked = true;
  const numInput = $("num-questions");
  // Stepper setzt den Wert geklemmt (4-30) und zieht Anzeige/Buttons mit; aeltere
  // Eintraege mit abweichendem cfg.num werden so defensiv in den Bereich gebracht.
  if (Number.isFinite(cfg.num)) {
    if (numInput.setValue) numInput.setValue(cfg.num);
    else numInput.value = String(cfg.num);
  }
  saveDraft();
  generateQuiz();
}

// Gespeicherten Versuch wieder oeffnen: Auswertung anzeigen, Fragebogen
// laesst sich von dort im Lernmodus erneut durchgehen
function openAttempt(job, att) {
  // Ein historischer Versuch ist NICHT die laufende Lern-Sitzung: das Auto-Speichern
  // deaktivieren, sonst wuerde ein visibilitychange/pagehide den (ggf. noch offenen)
  // echten Lerntest mit den Daten dieses alten Versuchs ueberschreiben.
  learnSessionActive = false;
  reviewing = true;
  quiz = JSON.parse(JSON.stringify(att.quiz));
  enrichTried = new Set();
  enrichingIdx = -1;
  quiz.jobText = job.jobText;
  // Vertiefungs-Felder liegen am Versuch (nicht im gespeicherten Quiz) - fuer die
  // Auswertungs-Meta zuruecklegen. Fehlt bei normalen Versuchen.
  if (att.vertiefung && Array.isArray(att.vertiefung.felder)) quiz.vertiefungFelder = att.vertiefung.felder;
  // urlKey/Quelle aus der Stelle übernehmen, damit ein erneutes Auswerten aus
  // der Review heraus wieder zur selben Stelle gespeichert wird
  if (job.urlKey) quiz.urlKey = job.urlKey;
  if (job.url) quiz.jobUrl = job.url;
  if (job.arbeitgeber) quiz.arbeitgeber = job.arbeitgeber;
  if (job.arbeitsort) quiz.arbeitsort = job.arbeitsort;
  answers = (att.answers || []).slice();
  while (answers.length < quiz.fragen.length) answers.push("");
  revealed = (att.revealed || []).slice();
  while (revealed.length < quiz.fragen.length) revealed.push(false);
  // In der Review nicht neu mischen: die gespeicherte answers[i] ist die finale
  // Nutzerreihenfolge und wird im gesperrten Zustand exakt so angezeigt.
  sortDisplay = {};
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
  const provider = $("provider").value;
  const isLocal = provider === "local";
  const isHosted = provider === "hosted";
  // Hosted: kein Key, kein Modell-/Lokal-Block; stattdessen die Qualitaetsstufe.
  $("row-tier").classList.toggle("hidden", !isHosted);
  $("row-model").classList.toggle("hidden", isHosted);
  $("model-desc").classList.toggle("hidden", isHosted);
  $("row-api-key").classList.toggle("hidden", isLocal || isHosted);
  $("row-base-url").classList.toggle("hidden", !isLocal);
  $("row-local-models").classList.toggle("hidden", !isLocal);
  $("row-cloud-hints").classList.toggle("hidden", isLocal || isHosted);
  $("hint-local").classList.toggle("hidden", !isLocal);
}

function initSettingsForm() {
  $("provider").value = settings.provider || "hosted";
  $("api-key").value = settings.apiKey || "";
  $("base-url").value = settings.baseUrl || "";
  $("tier").value = settings.tier || "standard";
  updateSettingsProviderUI();
  if ($("provider").value === "local") {
    populateLocalModelSelect([], settings.model);
    $("local-models-status").textContent = "";
  } else if ($("provider").value !== "hosted") {
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
  } else if ($("provider").value !== "hosted") {
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
  if (provider === "hosted") {
    // Hosted: nur Provider + Stufe setzen. Vorhandene BYOK-Felder (apiKey/baseUrl/
    // model) BLEIBEN als Fallback erhalten - nie verwerfen (Leitplanke).
    settings = { ...settings, provider: "hosted", tier: $("tier").value || "standard" };
  } else {
    settings = {
      ...settings,
      provider,
      apiKey: $("api-key").value.trim(),
      model: $("model").value.trim(),
    };
    // Server-Adresse nur fuer den lokalen Anbieter sichern (optionales Feld)
    if (provider === "local") settings.baseUrl = normalizeBaseUrl($("base-url").value);
  }
  saveSettings(settings);
  goReturn();
});

$("btn-cancel-settings").addEventListener("click", goReturn);

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
    // Pro Feld additiv zusammenfuehren: ein leerer importierter Wert (z. B.
    // apiKey: "" aus einem Backup ohne Schluessel) darf bei GLEICHEM Anbieter
    // einen vorhandenen, funktionierenden Wert nicht ueberschreiben. Wechselt
    // der Import dagegen den Anbieter, gehoeren Schluessel/Modell/Adresse zum
    // alten Anbieter und duerfen NICHT mitgeschleppt werden - sonst ginge z. B.
    // ein vorhandener Cloud-Key an einen frisch importierten lokalen Server
    // (callLLM haengt den Key als Authorization-Header an, auch lokal).
    const cur = loadSettings();
    const inc = data.settings;
    const merged = { ...cur };
    const incProvider = typeof inc.provider === "string" && inc.provider.trim() ? inc.provider : null;
    const providerChanged = incProvider !== null && incProvider !== cur.provider;
    if (incProvider) merged.provider = incProvider;
    for (const k of ["apiKey", "model", "baseUrl"]) {
      const v = inc[k];
      if (typeof v === "string" && v.trim()) merged[k] = v;        // expliziter Importwert gewinnt
      else if (providerChanged) delete merged[k];                   // fremder Altwert faellt weg
      // sonst (gleicher Anbieter, leerer Importwert): vorhandenen Wert behalten
    }
    // Hosted-Qualitaetsstufe ist nicht anbietergebunden: vorhandenen Importwert
    // additiv uebernehmen, statt ihn beim Umzug stillschweigend zu verlieren. Nur
    // bekannte Stufen (wie im Settings-Menue angeboten) akzeptieren - ein korruptes
    // oder handgeschriebenes Backup soll keine ungueltige Stufe persistieren, die
    // Hosted-Calls bis zum naechsten Speichern scheitern liesse (defensiv lesen).
    const tierImp = typeof inc.tier === "string" ? inc.tier.trim() : "";
    if (tierImp === "standard" || tierImp === "guenstig") merged.tier = tierImp;
    settings = merged;
    saveSettings(settings);
    settingsImported = true;
  }

  let newJobs = 0;
  let newAttempts = 0;
  if (data.history && Array.isArray(data.history.jobs)) {
    const h = loadHistory();
    data.history.jobs.forEach((impJob) => {
      if (!impJob || !impJob.key || !Array.isArray(impJob.attempts)) return;
      // Nur Versuche mit verwertbarem Zeitstempel UND den tragenden Feldern
      // uebernehmen. Es reicht nicht, dass quiz/result irgendein Objekt sind:
      // der Verlauf liest att.quiz.fragen.length und att.prozent, die Detail-/
      // Review-Ansicht iteriert ueber quiz.fragen. Ein Versuch mit gueltigem
      // date, aber leerem quiz ({}) oder fehlendem prozent wuerde die Historie
      // vergiften und Verlauf/openAttempt/Rendern zum Absturz bringen. result
      // selbst wird ueberall defensiv gelesen (gesamt/ergebnisse optional),
      // muss also nur ein Objekt sein. Stellen ohne brauchbare Versuche werden
      // uebersprungen - ein leeres attempts-Array wuerde sonst beim Rendern
      // abstuerzen.
      const incoming = impJob.attempts.filter(
        (a) =>
          a && typeof a === "object" && Number.isFinite(a.date) && Number.isFinite(a.prozent) &&
          a.quiz && typeof a.quiz === "object" && Array.isArray(a.quiz.fragen) && a.quiz.fragen.length &&
          a.result && typeof a.result === "object"
      );
      if (!incoming.length) return;
      // Stelle zusammenführen wie beim normalen Speichern: zuerst über die
      // stabile URL-Identität, dann über die Stellen-Identität (Titel+Arbeit-
      // geber+Ort), zuletzt über den Text-key.
      const impIKey = impJob.identityKey || identityKeyOf(impJob.titel, impJob.arbeitgeber, impJob.arbeitsort);
      const existing =
        (impJob.urlKey && h.jobs.find((j) => j.urlKey === impJob.urlKey)) ||
        (impIKey && h.jobs.find((j) => j.identityKey === impIKey && !(impJob.urlKey && j.urlKey && j.urlKey !== impJob.urlKey))) ||
        h.jobs.find((j) => j.key === impJob.key);
      if (!existing) {
        // identityKey direkt mitschreiben, falls er aus den Feldern abgeleitet
        // wurde, aber im Alt-Export noch fehlte - sonst greift die Identitaets-
        // Zusammenfuehrung erst nach dem naechsten Versuch/Import.
        h.jobs.push({ ...impJob, attempts: incoming, ...(impIKey ? { identityKey: impIKey } : {}) });
        newJobs++;
        newAttempts += incoming.length;
        return;
      }
      // urlKey/Quelle aus dem Import übernehmen, falls lokal noch nicht gesetzt
      if (impJob.urlKey && !existing.urlKey) {
        existing.urlKey = impJob.urlKey;
        if (impJob.url) existing.url = impJob.url;
      }
      // identityKey und Arbeitgeber/Ort nachtragen, falls lokal noch nicht gesetzt
      if (impJob.arbeitgeber && !existing.arbeitgeber) existing.arbeitgeber = impJob.arbeitgeber;
      if (impJob.arbeitsort && !existing.arbeitsort) existing.arbeitsort = impJob.arbeitsort;
      if (impIKey && !existing.identityKey) existing.identityKey = impIKey;
      // Vertiefungs-Themenfelder aus dem Import uebernehmen: fehlt lokal eins
      // oder ist das importierte neuer (generatedAt), das importierte behalten -
      // sonst geht eine schon bezahlte Ableitung beim Restore/Sync verloren.
      // Defensiv: nur eine plausible Form (fields-Array) akzeptieren.
      const impTf = impJob.themenfelder;
      if (impTf && typeof impTf === "object" && Array.isArray(impTf.fields) && impTf.fields.length) {
        const curTf = existing.themenfelder;
        if (!curTf || !(Number(curTf.generatedAt) >= Number(impTf.generatedAt))) {
          existing.themenfelder = impTf;
        }
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

// Fragen-Stepper: loest das fruehere <select id="num-questions"> ab. Gleiche id
// und gleiche .value-Schnittstelle (Zahl als String), nur +/- statt Dropdown.
// Keine Persistenz - wie zuvor ist der Standard bei jedem Laden 10. Der Bereich
// 4-30 erhaelt die bisherige Obergrenze (vorheriger Dropdown ging bis 30).
function initNumStepper() {
  const NUM_DEFAULT = 10;
  const input = $("num-questions");
  const display = $("num-display");
  const dec = $("num-dec");
  const inc = $("num-inc");
  if (!input || !display || !dec || !inc) return;

  const clamp = (n) => Math.min(NUM_MAX, Math.max(NUM_MIN, n));
  const render = () => {
    const n = clamp(Number(input.value) || NUM_DEFAULT);
    input.value = String(n);
    display.textContent = String(n);
    dec.disabled = n <= NUM_MIN;
    inc.disabled = n >= NUM_MAX;
  };
  const step = (delta) => {
    input.value = String(clamp((Number(input.value) || NUM_DEFAULT) + delta));
    render();
  };
  // Erlaubt es anderen Stellen (z. B. "Weiter ueben"), den Wert programmatisch
  // zu setzen und die Anzeige/Buttons mitzuziehen.
  input.setValue = (n) => { input.value = String(n); render(); };

  dec.addEventListener("click", () => step(-1));
  inc.addEventListener("click", () => step(1));
  render();
}
initNumStepper();

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
  sortDisplay = {};
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
  setQuizNotice("");
  current = 0;
  renderQuestion();
  showView("view-quiz");
});

$("btn-history").addEventListener("click", () => {
  rememberReturnView();
  renderHistory();
  showView("view-history");
});

$("btn-history-back").addEventListener("click", goReturn);

// Startliste und Stellen-Subpage
$("btn-new-job").addEventListener("click", () => showView("view-input"));
$("active-job-start").addEventListener("click", startReadyJob);
$("resume-continue").addEventListener("click", resumeLearnSession);
$("resume-discard").addEventListener("click", discardLearnSession);

// Lerntest sichern, wenn der Tab in den Hintergrund geht oder geschlossen wird —
// auf Mobilgeraeten der zuverlaessigste Zeitpunkt (pagehide feuert dort nicht immer).
document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") saveLearnSession(); });
window.addEventListener("pagehide", saveLearnSession);
$("btn-input-back").addEventListener("click", goHome);
$("btn-job-back").addEventListener("click", goHome);
$("btn-all-jobs").addEventListener("click", () => {
  rememberReturnView();
  renderHistory();
  showView("view-history");
});

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

// Rueckfrage vor dem Ueberschreiben eines offenen Lerntests (Punkt 3). Merkt sich
// die Aktion, die bei Bestaetigung laufen soll, und gibt den Fokus sauber zurueck.
let confirmReplaceLearnAction = null;
let confirmReplaceLearnReturnFocus = null;
function openConfirmReplaceLearn(onConfirm) {
  confirmReplaceLearnAction = onConfirm;
  confirmReplaceLearnReturnFocus = document.activeElement;
  $("confirm-replace-learn-modal").classList.remove("hidden");
  $("btn-confirm-replace-learn").focus();
}
function closeConfirmReplaceLearn() {
  $("confirm-replace-learn-modal").classList.add("hidden");
  confirmReplaceLearnAction = null;
  if (confirmReplaceLearnReturnFocus && typeof confirmReplaceLearnReturnFocus.focus === "function") {
    confirmReplaceLearnReturnFocus.focus();
  }
  confirmReplaceLearnReturnFocus = null;
}
$("btn-confirm-replace-learn").addEventListener("click", () => {
  const action = confirmReplaceLearnAction;
  closeConfirmReplaceLearn();
  if (action) action();
});
$("btn-confirm-replace-learn-cancel").addEventListener("click", closeConfirmReplaceLearn);

// Rueckfrage vor dem Loeschen einer Stelle (ersetzt das blockierende native
// confirm()). Merkt sich die betroffene Stelle und was nach dem Loeschen
// neu gerendert wird; Fokus wird gesetzt und nach dem Schliessen zurueckgegeben.
let confirmDeleteJob = null;
let confirmDeleteAfter = null;
let confirmDeleteReturnFocus = null;
function openConfirmDelete(job, afterDelete) {
  confirmDeleteJob = job;
  confirmDeleteAfter = afterDelete;
  const n = job.attempts.length;
  $("confirm-delete-text").textContent =
    `„${job.titel}“ mit ${n} Versuch${n === 1 ? "" : "en"} endgültig aus der Historie löschen? Das lässt sich nicht rückgängig machen.`;
  confirmDeleteReturnFocus = document.activeElement;
  $("confirm-delete-modal").classList.remove("hidden");
  $("btn-confirm-delete-cancel").focus();
}
function closeConfirmDelete() {
  $("confirm-delete-modal").classList.add("hidden");
  confirmDeleteJob = null;
  confirmDeleteAfter = null;
  if (confirmDeleteReturnFocus && typeof confirmDeleteReturnFocus.focus === "function") {
    confirmDeleteReturnFocus.focus();
  }
  confirmDeleteReturnFocus = null;
}
$("btn-confirm-delete").addEventListener("click", () => {
  const job = confirmDeleteJob;
  const after = confirmDeleteAfter;
  // Beim Loeschen wird der ausloesende Knopf gleich aus dem DOM entfernt
  // (afterDelete baut die Ansicht neu auf). Den Fokus daher nicht dorthin
  // zuruecklegen - sonst landet er nach dem Neuaufbau am <body>. Stattdessen
  // unten gezielt auf die Ueberschrift der nun sichtbaren Ansicht setzen.
  confirmDeleteReturnFocus = null;
  closeConfirmDelete();
  if (job) {
    deleteJob(job);
    if (typeof after === "function") after();
    focusVisibleViewHeading();
  }
});

// Fokus nach einem Ansichtswechsel ohne stabilen Rueckkehrpunkt auf die
// Ueberschrift der gerade sichtbaren Ansicht legen (gaengiges Muster fuer
// Single-Page-Ansichten). tabindex -1 macht die Ueberschrift einmalig
// fokussierbar, ohne sie in die Tab-Reihenfolge aufzunehmen.
function focusVisibleViewHeading() {
  const visible = views.map((id) => $(id)).find((el) => el && !el.classList.contains("hidden"));
  const heading = visible && visible.querySelector("h2");
  if (heading) {
    heading.setAttribute("tabindex", "-1");
    heading.focus();
  }
}
$("btn-confirm-delete-cancel").addEventListener("click", closeConfirmDelete);

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
  // Immer bei der neuesten Version (oben) starten. Der Fokus auf den Schliessen-
  // Button darf das scrollbare Panel nicht nach unten ziehen (preventScroll),
  // sonst oeffnet das Fenster mitten in der aeltesten Version.
  const panel = $("changelog-modal").querySelector(".modal");
  if (panel) panel.scrollTop = 0;
  $("btn-changelog-close").focus({ preventScroll: true });
});

function closeChangelog() {
  $("changelog-modal").classList.add("hidden");
  $("link-changelog").focus();
}

$("btn-changelog-close").addEventListener("click", closeChangelog);
// Klick auf den abgedunkelten Hintergrund (nicht auf das Panel) schliesst
$("changelog-modal").addEventListener("click", (e) => {
  if (e.target === $("changelog-modal")) closeChangelog();
});

/* ---------- Datenschutzhinweis ---------- */
function openDatenschutz(e) {
  if (e) e.preventDefault();
  $("datenschutz-modal").classList.remove("hidden");
  const panel = $("datenschutz-modal").querySelector(".modal");
  if (panel) panel.scrollTop = 0;
  $("btn-datenschutz-close").focus({ preventScroll: true });
}
function closeDatenschutz() {
  $("datenschutz-modal").classList.add("hidden");
}
["link-datenschutz", "link-datenschutz-footer", "link-datenschutz-tier"].forEach((id) => {
  const el = $(id);
  if (el) el.addEventListener("click", openDatenschutz);
});
$("btn-datenschutz-close").addEventListener("click", closeDatenschutz);
$("datenschutz-modal").addEventListener("click", (e) => {
  if (e.target === $("datenschutz-modal")) closeDatenschutz();
});

/* ---------- Impressum ---------- */
function openImpressum(e) {
  if (e) e.preventDefault();
  $("impressum-modal").classList.remove("hidden");
  const panel = $("impressum-modal").querySelector(".modal");
  if (panel) panel.scrollTop = 0;
  $("btn-impressum-close").focus({ preventScroll: true });
}
function closeImpressum() {
  $("impressum-modal").classList.add("hidden");
}
$("link-impressum").addEventListener("click", openImpressum);
$("btn-impressum-close").addEventListener("click", closeImpressum);
$("impressum-modal").addEventListener("click", (e) => {
  if (e.target === $("impressum-modal")) closeImpressum();
});

$("btn-badge-close").addEventListener("click", closeBadgeModal);
// Klick auf den abgedunkelten Hintergrund (nicht auf die Karte) schliesst
$("badge-modal").addEventListener("click", (e) => {
  if (e.target === $("badge-modal")) closeBadgeModal();
});

$("levelup-close").addEventListener("click", closeLevelUp);
// Klick auf den abgedunkelten Hintergrund (nicht auf die Feier-Buehne) schliesst
$("levelup-overlay").addEventListener("click", (e) => {
  if (e.target === $("levelup-overlay")) closeLevelUp();
});
// Geht der Tab in den Hintergrund (App weggewischt, Tab gewechselt), waehrend
// die Feier noch offen ist, die Endlos-Animationen (Strahlenkranz, Funkeln,
// Schimmer, Glow) pausieren - sonst komponiert der Browser sie je nach Plattform
// weiter und kostet Akku. Beim Zurueckkehren laufen sie nahtlos weiter.
document.addEventListener("visibilitychange", () => {
  const overlay = $("levelup-overlay"), stage = $("levelup-stage");
  if (!overlay || !stage || overlay.classList.contains("hidden")) return;
  stage.classList.toggle("lu-paused", document.hidden);
});

// Escape schliesst das oberste offene Overlay. Reihenfolge = Prioritaet, falls
// je zwei gleichzeitig offen waeren; ein neues Overlay braucht nur einen Eintrag.
const ESCAPE_CLOSERS = [
  ["changelog-modal", closeChangelog],
  ["datenschutz-modal", closeDatenschutz],
  ["impressum-modal", closeImpressum],
  ["confirm-eval-modal", cancelConfirmEval],
  ["confirm-replace-learn-modal", closeConfirmReplaceLearn],
  ["badge-modal", closeBadgeModal],
  ["confirm-delete-modal", closeConfirmDelete],
  ["levelup-overlay", closeLevelUp],
];
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  const open = ESCAPE_CLOSERS.find(([id]) => !$(id).classList.contains("hidden"));
  if (open) open[1]();
});

// Zuletzt geladenen Eingabe-Stand wiederherstellen, damit URL und Anzeige ein
// Update/Reload ueberleben (und die Stelle ueber lastFetch wiedererkannt wird)
restoreDraft();

// Beim ersten Start zum Onboarding, sonst auf die Startliste der Stellen.
// Hosted ist der Default und braucht keinen Schluessel → sofort einsatzbereit, kein
// Onboarding-Wall. Lokaler Anbieter gilt mit gewaehltem Modell als eingerichtet,
// BYOK-Anbieter mit hinterlegtem Key.
const provider0 = settings.provider || "hosted";
const isConfigured = provider0 === "hosted" ? true
  : provider0 === "local" ? !!settings.model
  : !!settings.apiKey;
if (!isConfigured) {
  renderOnboardingSteps($("ob-provider").value);
  showView("view-onboarding");
} else {
  goHome();
}

// Offenen/fertigen Hintergrund-Job (Punkt 1) nach App-Start wieder aufnehmen.
resumeActiveJob();

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
