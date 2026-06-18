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
          typ: { type: "string", enum: ["multiple_choice", "offen", "reihenfolge"] },
          kategorie: { type: "string" },
          schwierigkeit: { type: "string", enum: ["leicht", "mittel", "schwer"] },
          frage: { type: "string" },
          optionen: { type: "array", items: { type: "string" } },
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
          erklaerungen: { type: "array", items: { type: "string" } },
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
        required: ["id", "typ", "kategorie", "schwierigkeit", "frage", "optionen", "korrekte_antwort", "korrekte_indizes", "erklaerungen", "elemente", "korrekte_reihenfolge", "lerninfo", "quellen"],
        additionalProperties: false,
      },
    },
    kernpunkte: {
      type: "object",
      description:
        "Die wichtigsten Kernpunkte der Stelle, ausschliesslich aus dem Anzeigentext " +
        "extrahiert. Nichts erfinden: was nicht im Text steht, bleibt leerer String " +
        "bzw. leeres Array.",
      properties: {
        aufgaben: {
          type: "array",
          items: { type: "string" },
          description: "Wichtigste Aufgaben/Taetigkeiten, je ein knapper Punkt; leer wenn nicht genannt",
        },
        anforderungen_muss: {
          type: "array",
          items: { type: "string" },
          description: "Zwingende Anforderungen / Muss-Skills; leer wenn nicht genannt",
        },
        anforderungen_optional: {
          type: "array",
          items: { type: "string" },
          description: "Nice-to-have / wuenschenswerte Anforderungen; leer wenn nicht genannt",
        },
        arbeitsmodell: {
          type: "string",
          description: "Arbeitszeit/Modell (Vollzeit/Teilzeit, Schicht, Remote/Hybrid, Befristung); leerer String wenn nicht genannt",
        },
        gehalt: {
          type: "string",
          description: "Gehalt/Verguetung wortgetreu wie genannt (Spanne, Tarif); leerer String wenn nicht genannt",
        },
        benefits: {
          type: "array",
          items: { type: "string" },
          description: "Benefits/Zusatzleistungen; leer wenn nicht genannt",
        },
        besonderheiten: {
          type: "array",
          items: { type: "string" },
          description: "Sonstige relevante Besonderheiten der Stelle; leer wenn nicht genannt",
        },
      },
      required: ["aufgaben", "anforderungen_muss", "anforderungen_optional", "arbeitsmodell", "gehalt", "benefits", "besonderheiten"],
      additionalProperties: false,
    },
  },
  required: ["titel", "arbeitgeber", "arbeitsort", "empfohlene_zeit_minuten", "fragen", "kernpunkte"],
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
    "Gib zu jeder Frage die korrekte Antwort an (bei Multiple-Choice den Wortlaut mindestens einer richtigen Option, " +
    "bei offenen Fragen eine knappe Musterantwort). Gib bei Multiple-Choice zusätzlich in korrekte_indizes alle " +
    "richtigen Options-Indizes (0-basiert) an; bei offenen Fragen ein leeres Array. Gib bei Multiple-Choice zu JEDER " +
    "Option (richtig wie falsch) eine kurze Erklärung, warum sie richtig oder falsch ist - bei mehreren richtigen " +
    "Optionen ist entsprechend jede davon als richtig zu begründen. Liefere ausserdem " +
    "einen lernrelevanten Hintergrund (lerninfo) sowie 1 bis 3 Quellen zur Vertiefung. " +
    "Bei Reihenfolge-Aufgaben enthaelt korrekte_antwort die korrekte Reihenfolge als lesbaren Text (Elemente durch ' -> ' getrennt). " +
    "Nenne nur real existierende Quellen (Gesetze, Normen, Standardwerke, offizielle Dokumentation, etablierte Fachseiten). " +
    "Gib die URL einer Quelle nur an, wenn du dir sicher bist, dass sie existiert - bevorzugt Startseiten oder bekannte, " +
    "stabile Adressen, keine tief verschachtelten Links. Sonst lasse die URL leer und waehle einen praegnanten Titel, " +
    "der sich gut als Suchbegriff eignet. " +
    "Extrahiere zusätzlich die wichtigsten Kernpunkte der Stelle (Aufgaben, zwingende und optionale Anforderungen, " +
    "Arbeitsmodell, Gehalt, Benefits, Besonderheiten) ausschliesslich aus dem Anzeigentext. Erfinde nichts und leite " +
    "nichts her - was nicht ausdrücklich im Text steht, lässt du leer (leerer String bzw. leeres Array). Formuliere " +
    "jeden Punkt knapp; Gehalt möglichst wortgetreu. ";

  // Hosted nutzt starke Cloud-Modelle -> Reihenfolge-Aufgaben werden hier (anders
  // als im App-local-Pfad) NICHT unterdrueckt.
  const reihenfolgeHinweis =
    "Wenn sich ein Thema natuerlich als Abfolge, Ablauf, Verfahren, Prozesskette, " +
    "Rangfolge oder Hierarchie darstellen laesst (z. B. Schritte eines Vorgangs, " +
    "Eskalationsstufen, Phasen eines Projekts), erstelle gelegentlich statt einer " +
    "Multiple-Choice- oder offenen Frage eine Reihenfolge-Aufgabe (typ='reihenfolge'): " +
    "Gib 3 bis 6 Elemente in 'elemente' an und in 'korrekte_reihenfolge' die Indizes " +
    "dieser Elemente in der fachlich korrekten Reihenfolge. Hoechstens etwa jede " +
    "sechste Frage soll eine Reihenfolge-Aufgabe sein, und nur wenn es fachlich " +
    "wirklich eine eindeutige korrekte Reihenfolge gibt. Bei allen anderen Fragen " +
    "bleiben 'elemente' und 'korrekte_reihenfolge' leere Arrays. ";

  const mcMix = isVertiefung
    ? "Etwa ein Drittel der Fragen soll Multiple-Choice sein (4 Optionen, genau eine ist die beste; " +
      "alle uebrigen Optionen muessen plausibel sein - typische Fehlannahmen oder haeufige Verwechslungen, " +
      "keine offensichtlich falschen Optionen), der Rest offene Fragen. " +
      "Markiere bei jeder Multiple-Choice-Frage die richtigen Optionen ueber korrekte_indizes (0-basiert). "
    : "Etwa die Hälfte der Fragen soll Multiple-Choice sein (4 plausible Optionen). " +
      "Die meisten Multiple-Choice-Fragen haben genau eine richtige Option. Bei einigen wenigen " +
      "(hoechstens etwa ein Drittel der Multiple-Choice-Fragen) duerfen mehrere Optionen gleichzeitig richtig sein - " +
      "dann gib in korrekte_indizes alle richtigen Indizes an. Markiere bei jeder Multiple-Choice-Frage die richtigen " +
      "Optionen ueber korrekte_indizes (0-basiert). Der Rest sind offene Fragen. ";

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
    reihenfolgeHinweis +
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
  // Mehrfach-MC- und Reihenfolge-Fragen werden clientseitig deterministisch
  // gescort und nicht im payload mitgeschickt. Damit die Gesamtbewertung sie
  // trotzdem beruecksichtigt, nennt der Client sie kompakt in kontext.mcLokal
  // ([{ frage, punkte }]). Gleicher Wortlaut wie der Client-Pfad in app.js
  // (runEvaluation). Defensiv begrenzen, obwohl validateEval mcLokal bereits
  // prueft: hoechstens 60 Eintraege, punkte hart auf 0-10 geklemmt, Fragetext gekuerzt.
  const mcLokal = (kontext && Array.isArray(kontext.mcLokal) ? kontext.mcLokal : []).slice(0, 60);
  const mcLokalHinweis = mcLokal.length
    ? "\n\nZusätzlich wurden " + mcLokal.length + " Fragen (Mehrfachauswahl bzw. Reihenfolge) " +
      "bereits separat und deterministisch bewertet. Bewerte sie NICHT erneut und gib fuer sie KEINE " +
      "eigenen Ergebnis-Eintraege aus; beziehe ihre Ergebnisse aber in die Gesamteinschätzung " +
      "(Zusammenfassung, Stärken, Verbesserungen) mit ein:\n" +
      mcLokal
        .map((m) => {
          const pkt = Math.max(0, Math.min(10, Math.round(Number((m && m.punkte) || 0)) || 0));
          return `- ${String((m && m.frage) || "").slice(0, 160)}: ${pkt}/10`;
        })
        .join("\n")
    : "";
  const user =
    "Stellenausschreibung:\n" + String(jobText).slice(0, 15000) +
    "\n\nRahmen: " + rahmen +
    "\n\nBewerte diese Antworten des Kandidaten:\n" + JSON.stringify(payload, null, 2) +
    mcLokalHinweis;

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
