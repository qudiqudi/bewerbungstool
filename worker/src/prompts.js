// Serverseitig gebaute Prompts + Schemas (Plan A.2.5): der Client schickt nur
// strukturierte Daten/Parameter, der Worker baut Prompt + Schema. 1:1 aus app.js
// portiert (generateQuiz / runEvaluation / deriveThemenfelder), damit die Qualität
// dem heutigen Cloud-Pfad entspricht.
//
// WICHTIG (Dual-Maintenance, Plan A.3.1): Ändert sich ein Prompt in app.js, MUSS er
// hier mitgezogen werden. Vor Go-Live mit dem Golden-Set gegen den App-Pfad prüfen (A.6).

export const QUESTIONS_SCHEMA = {
  type: "object",
  properties: {
    titel: { type: "string" },
    arbeitgeber: { type: "string" },
    arbeitsort: { type: "string" },
    empfohlene_zeit_minuten: { type: "integer" },
    fragen: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "integer" },
          typ: { type: "string", enum: ["multiple_choice", "offen"] },
          kategorie: { type: "string" },
          schwierigkeit: { type: "string", enum: ["leicht", "mittel", "schwer"] },
          frage: { type: "string" },
          optionen: { type: "array", items: { type: "string" } },
          korrekte_antwort: { type: "string" },
          erklaerungen: { type: "array", items: { type: "string" } },
          lerninfo: { type: "string" },
          quellen: {
            type: "array",
            items: {
              type: "object",
              properties: { titel: { type: "string" }, url: { type: "string" } },
              required: ["titel", "url"],
              additionalProperties: false,
            },
          },
        },
        required: ["id", "typ", "kategorie", "schwierigkeit", "frage", "optionen", "korrekte_antwort", "erklaerungen", "lerninfo", "quellen"],
        additionalProperties: false,
      },
    },
  },
  required: ["titel", "arbeitgeber", "arbeitsort", "empfohlene_zeit_minuten", "fragen"],
  additionalProperties: false,
};

export const EVAL_SCHEMA = {
  type: "object",
  properties: {
    ergebnisse: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "integer" },
          punkte: { type: "integer" },
          feedback: { type: "string" },
          musterantwort: { type: "string" },
        },
        required: ["id", "punkte", "feedback", "musterantwort"],
        additionalProperties: false,
      },
    },
    gesamt: {
      type: "object",
      properties: {
        prozent: { type: "integer" },
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

export const THEMENFELDER_SCHEMA = {
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

const DIFFICULTY_MIX = {
  leicht: "etwa 60% leichte, 30% mittlere und 10% schwere Fragen",
  mittel: "etwa 25% leichte, 45% mittlere und 30% schwere Fragen",
  schwer: "etwa 10% leichte, 30% mittlere und 60% schwere Fragen",
};

// Hosted nutzt immer starke Cloud-Modelle → volles Schema (kein lokaler Lean-Pfad).
export function buildQuizMessages({ jobText, numQuestions, difficulty, vertiefung }) {
  const diff = DIFFICULTY_MIX[difficulty] ? difficulty : "mittel";
  const isVertiefung = !!(vertiefung && Array.isArray(vertiefung.felder) && vertiefung.felder.length);

  const antwortHinweis =
    "Gib zu jeder Frage die korrekte Antwort an (bei Multiple-Choice exakt den Wortlaut der besten Option, " +
    "bei offenen Fragen eine knappe Musterantwort), bei Multiple-Choice zu jeder Option eine kurze Erklärung, " +
    "warum sie richtig oder falsch ist, einen lernrelevanten Hintergrund (lerninfo) sowie 1 bis 3 Quellen zur Vertiefung. " +
    "Nenne nur real existierende Quellen (Gesetze, Normen, Standardwerke, offizielle Dokumentation, etablierte Fachseiten). " +
    "Gib die URL einer Quelle nur an, wenn du dir sicher bist, dass sie existiert - bevorzugt Startseiten oder bekannte, " +
    "stabile Adressen, keine tief verschachtelten Links. Sonst lasse die URL leer und waehle einen praegnanten Titel, " +
    "der sich gut als Suchbegriff eignet. ";

  const mcMix = isVertiefung
    ? "Etwa ein Drittel der Fragen soll Multiple-Choice sein (4 Optionen, genau eine ist die beste; " +
      "alle uebrigen Optionen muessen plausibel sein - typische Fehlannahmen oder haeufige Verwechslungen, " +
      "keine offensichtlich falschen Optionen), der Rest offene Fragen. "
    : "Etwa die Hälfte der Fragen soll Multiple-Choice sein (4 plausible Optionen, genau eine ist die beste), " +
      "der Rest offene Fragen. ";

  const vertiefungTiefe = isVertiefung
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
    "Ordne jeder Frage eine Schwierigkeit zu: 'schwer' sind Fragen, wie sie im echten Auswahlverfahren " +
    "oder Vorstellungsgespräch für genau diese Stelle am wahrscheinlichsten gestellt werden - realistisch, " +
    "spezifisch und anspruchsvoll. 'mittel' sind solide Fachfragen, 'leicht' sind Grundlagen- und Einstiegsfragen. " +
    `Stelle die Mischung so zusammen: ${DIFFICULTY_MIX[diff]}. ` +
    vertiefungTiefe +
    antwortHinweis +
    "Schätze ausserdem ein realistisches Zeitlimit in Minuten für den gesamten Test. " +
    "Lies zusätzlich den ausschreibenden Arbeitgeber (Unternehmensname) und den Arbeitsort (Stadt bzw. Region) " +
    "aus der Anzeige aus. Ist eines davon nicht erkennbar oder die Stelle rein remote, gib dafür einen leeren String zurück. " +
    "Der folgende Text stammt oft von einer Jobportal-Seite und kann Navigation, Cookie-Hinweise, " +
    "Unternehmens-Werbung, Fusszeilen und Teaser zu ähnlichen Stellen enthalten. Ignoriere all das " +
    "und beziehe dich ausschliesslich auf die eigentliche Stellenanzeige. Enthält der Text mehrere " +
    "Stellen, nimm die mit Abstand am ausführlichsten beschriebene. Antworte auf Deutsch.";

  // numQuestions ist im Body optional; fehlt/ungültig/≤0 → sicherer Default 10 (sonst
  // stünde "genau NaN Fragen" im Prompt und ein Call würde sinnlos verbrannt). Obergrenze 40.
  const nReq = Number(numQuestions);
  const n = Number.isFinite(nReq) && nReq >= 1 ? Math.min(40, Math.floor(nReq)) : 10;
  let niveauHinweis = "";
  if (isVertiefung && vertiefung.niveau) {
    const niv = vertiefung.niveau;
    niveauHinweis =
      `Der Bewerber uebt diese Stelle bereits laenger (Stufe ${niv.level} von 10` +
      (Number.isFinite(niv.bestPct) ? `, bisher bis zu ${niv.bestPct}% erreicht` : "") +
      `). Setze die Fragen bewusst etwas ueber diesem Stand an, ohne unrealistisch oder fachfremd zu werden. `;
  }
  const vertiefungHinweis = isVertiefung
    ? `Dies ist ein Vertiefungsbogen. Stelle ALLE Fragen ausschliesslich zu diesen Themenfeldern: ` +
      `${vertiefung.felder.map((f) => f.label).join("; ")}. Verteile die ${n} Fragen ` +
      `moeglichst gleichmaessig auf die ${vertiefung.felder.length} Felder und decke jedes Feld mehrfach ab. ` +
      `Stelle keine Fragen ausserhalb dieser Felder. ` + niveauHinweis + `\n\n`
    : "";

  const user =
    vertiefungHinweis +
    `Erstelle einen Einstellungstest mit genau ${n} Fragen zu dieser Stellenausschreibung:\n\n` +
    String(jobText).slice(0, 30000);

  return [
    { role: "system", content: system },
    { role: "user", content: user },
  ];
}

export function buildEvalMessages({ jobText, payload, kontext }) {
  const system =
    "Du bist ein fairer, aber kritischer Prüfer für Einstellungstests. " +
    "Bewerte jede Antwort mit 0 bis 10 Punkten, gib kurzes konkretes Feedback und eine knappe Musterantwort. " +
    "Unbeantwortete Fragen erhalten 0 Punkte. " +
    "Fragen, die im Lernmodus vor dem Antworten aufgelöst wurden (aufgeloest: true), bewerte normal, " +
    "erwähne den Umstand aber kurz im Feedback. Antworte auf Deutsch.";

  const rahmen = buildKontext(kontext);
  const user =
    "Stellenausschreibung:\n" + String(jobText).slice(0, 15000) +
    "\n\nRahmen: " + rahmen +
    "\n\nBewerte diese Antworten des Kandidaten:\n" + JSON.stringify(payload, null, 2);

  return [
    { role: "system", content: system },
    { role: "user", content: user },
  ];
}

function buildKontext(k) {
  if (k && k.mode === "pruefung") {
    return `Prüfungsmodus mit Zeitlimit ${Number(k.limitMin) || 0} Minuten, benötigt wurden ca. ${Number(k.minutesUsed) || 0} Minuten` +
      (k.overtime ? " (Limit wurde überschritten)." : ".");
  }
  return "Lernmodus ohne Zeitlimit.";
}

export function buildThemenfelderMessages({ jobText, schwaechen }) {
  const system =
    "Du bist ein erfahrener Recruiter und Fachexperte. Leite aus einer Stellenausschreibung " +
    "4 bis 6 trennscharfe, stellenspezifische Themenfelder ab, in denen sich ein Bewerber gezielt " +
    "vertiefen kann. Die Felder muessen sich klar voneinander abgrenzen und konkret zur Stelle passen " +
    "- keine generischen Floskeln. Markiere ein Feld als Schwerpunkt (schwerpunkt=true), wenn der " +
    "Bewerber laut der Schwachstellen-Liste dort bisher schwach war. Antworte auf Deutsch.";
  const user =
    `Stellenausschreibung:\n\n${String(jobText).slice(0, 30000)}\n\n` +
    `Bisherige Schwachstellen des Bewerbers (Punkte je Frage, 0-10, schwaechste zuerst):\n` +
    String(schwaechen || "Keine bewerteten Einzelfragen vorhanden.").slice(0, 4000);
  return [
    { role: "system", content: system },
    { role: "user", content: user },
  ];
}
