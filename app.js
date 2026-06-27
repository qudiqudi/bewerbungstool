"use strict";

/* ---------- Version und Changelog ---------- */

// Muss mit der VERSION-Datei im Repo übereinstimmen (der CI-Check erzwingt
// das). Bei jedem Release: VERSION hochzählen und hier einen Eintrag ergänzen.
const APP_VERSION = "1.18.0";

const CHANGELOG = [
  {
    version: "1.18.0",
    date: "27.06.2026",
    items: [
      "Neu: Übungen wiederholen. Zahlenreihen- und Sprachlogik-Aufgaben aus deinen Tests landen in einem kleinen Wiederholungs-Stapel und werden dir im sinnvollen Abstand erneut vorgelegt – so bleiben diese übertragbaren Fähigkeiten im Kopf. Auf der Startseite erscheint „Fällige Übungen“, sobald welche dran sind. Alles passiert lokal auf deinem Gerät.",
    ],
  },
  {
    version: "1.17.0",
    date: "27.06.2026",
    items: [
      "Tests können jetzt auch Sprachlogik-Aufgaben enthalten – verbale Denkaufgaben wie Analogien, Wortbeziehungen und logische Schlussfolgerungen, wie sie in vielen Einstellungstests vorkommen. Sie funktionieren wie eine Multiple-Choice-Frage.",
    ],
  },
  {
    version: "1.16.0",
    date: "27.06.2026",
    items: [
      "Neu: Tests enthalten jetzt eine Zahlenreihen-Aufgabe – ein Klassiker echter Einstellungstests. Du tippst die gesuchte Zahl in ein eigenes Eingabefeld; ausgewertet wird sofort und exakt auf deinem Gerät (keine KI nötig). Im gehosteten Modus.",
    ],
  },
  {
    version: "1.15.0",
    date: "27.06.2026",
    items: [
      "Bei der Gesprächsstufe haben wir die Auswahl „Leitungsrunde“ vorerst entfernt – sie hat in der Praxis keine treffsicheren Fragen erzeugt. Telefoninterview, Fachgespräch und Assessment-Center bleiben und schneiden den Test zuverlässig auf die jeweilige Runde zu.",
    ],
  },
  {
    version: "1.14.0",
    date: "26.06.2026",
    items: [
      "Neu: Du kannst beim Erstellen eines Tests eine Gesprächsstufe wählen – Telefoninterview, Fachgespräch, Assessment-Center oder Leitungsrunde. Der Test schneidet die Fragen dann auf genau diese Runde zu (z. B. breiteres Screening am Telefon, mehr Verhalten und Szenarien im Assessment-Center). Optional und im gehosteten Modus.",
    ],
  },
  {
    version: "1.13.0",
    date: "26.06.2026",
    items: [
      "Deine Stellen werden zur Bewerbungs-Übersicht: Du kannst pro Stelle einen Status setzen (Verfolgt, Beworben, Gespräch, Zusage, Absage) und einen Gesprächstermin hinterlegen. Beides erscheint als kleine Markierung in „Meine Stellen“, ein anstehender Termin wird hervorgehoben – so behältst du den Überblick über deine ganze Suche. Alles optional und nur in deinem Browser.",
    ],
  },
  {
    version: "1.12.0",
    date: "26.06.2026",
    items: [
      "Der Fortschritt einer Stelle zeigt jetzt, wie bereit du fürs nächste Gespräch bist – statt dich auf eine tägliche Übungsserie festzunageln. Die „Tage in Folge“-Anzeige und der damit verbundene Druck sind weg. Das Abzeichen fürs Dranbleiben gibt es jetzt schon, wenn du an drei verschiedenen Tagen geübt hast (egal ob am Stück) – niemand verliert dadurch ein bereits erreichtes Abzeichen.",
    ],
  },
  {
    version: "1.11.0",
    date: "26.06.2026",
    items: [
      "Neu: „Womit du im Gespräch rechnen solltest“ – zu jeder Stelle zeigt das Tool jetzt die wahrscheinlichsten Knackpunkte deiner Bewerbung (z. B. die Glaubwürdigkeitslücke beim Quereinstieg) mit einem konkreten Übungsfokus. Abgeleitet aus der Anzeige und – falls hinterlegt – deinem Profil. Erscheint im gehosteten Modus nach dem ersten Test einer Stelle.",
    ],
  },
  {
    version: "1.10.0",
    date: "26.06.2026",
    items: [
      "Neu: ein optionales Profil in den Einstellungen. Mit ein paar groben Angaben – Quereinstieg oder Fachwechsel, wie viel Berufserfahrung, Ausbildungsstand – passen die Fragen besser zu deiner Ausgangslage und treffen die typischen Knackpunkte deiner Bewerbung. Alles freiwillig, ohne persönliche Daten, und es bleibt in deinem Browser. Wirkt im gehosteten Modus.",
    ],
  },
  {
    version: "1.9.1",
    date: "25.06.2026",
    items: [
      "Fragenanzahl: In der günstigen Qualitätsstufe liegt die Obergrenze jetzt bei 15 Fragen, in den übrigen Stufen bei 20 (Standard bleibt 10). Die günstige Stufe liefert bei sehr vielen Fragen spürbar schwächer – mit der niedrigeren Grenze bleiben die Tests zuverlässig und schnell. Brauchst du mehr Fragen, erstelle einfach einen weiteren Fragebogen.",
    ],
  },
  {
    version: "1.9.0",
    date: "23.06.2026",
    items: [
      "Der Zurück-Knopf von Browser und Handy blättert jetzt innerhalb der App eine Ansicht zurück, statt die App zu verlassen.",
    ],
  },
  {
    version: "1.8.12",
    date: "22.06.2026",
    items: [
      "Datenschutzhinweis ergänzt: Der Import einer Stellenanzeige per URL (über Jina AI) und der Bot-Schutz beim Anmelden sind jetzt ausdrücklich beschrieben; dazu Hinweise zu deinen Datenschutzrechten.",
    ],
  },
  {
    version: "1.8.11",
    date: "22.06.2026",
    items: [
      "Stellen-Kernpunkte: Lange Listen zeigen jetzt zunächst die wichtigsten Punkte; den Rest blendest du je Karte mit einem Tippen ein – deutlich weniger Scrollen, vor allem am Handy.",
    ],
  },
  {
    version: "1.8.10",
    date: "22.06.2026",
    items: [
      "Sicherheit: Die Bot-Schutz-Prüfung beim Anmelden und Test-Erstellen ist jetzt fest an die jeweilige Anfrage gebunden.",
    ],
  },
  {
    version: "1.8.9",
    date: "22.06.2026",
    items: [
      "Belege zu den Stellen-Kernpunkten werden wieder zuverlässig angezeigt.",
    ],
  },
  {
    version: "1.8.8",
    date: "19.06.2026",
    items: [
      "Stellenanzeigen per Link werden jetzt zuverlässiger und sauberer übernommen: Viele Jobbörsen liefern die Anzeige in einem maschinenlesbaren Format mit, das wir nun bevorzugt auslesen – das ergibt weniger Navigations- und Seitenrauschen im übernommenen Text. Klappt das bei einer Seite nicht, greift wie bisher der bewährte Weg, und du kannst die Anzeige im Zweifel weiterhin manuell einfügen.",
    ],
  },
  {
    version: "1.8.7",
    date: "19.06.2026",
    items: [
      "Gemeldete Fragen erreichen jetzt auch uns: Wenn du eine Frage meldest, wird die Meldung weiterhin lokal gespeichert und zusätzlich an den Betreiber übermittelt (ohne IP-Adresse), damit wir schwache Fragen verbessern können.",
      "Anonyme Nutzungsstatistik: Im gehosteten Modus zählen wir cookielos und ohne persönliche Daten mit, welche Funktionen genutzt werden (z. B. Lern- oder Prüfungsmodus), um das Tool zu verbessern.",
    ],
  },
  {
    version: "1.8.6",
    date: "19.06.2026",
    items: [
      "Die Kernpunkte-Übersicht („Das Wichtigste auf einen Blick“) erscheint bei bestehenden Stellen jetzt schon, sobald ein neuer Test fertig erstellt ist – du musst den Test nicht mehr erst komplett durchspielen.",
    ],
  },
  {
    version: "1.8.5",
    date: "19.06.2026",
    items: [
      "Stellenseite: Die Kernpunkte-Übersicht („Das Wichtigste auf einen Blick“) führt jetzt direkt zur Original-Anzeige (sofern die Stelle per Link angelegt wurde) und zeigt den gespeicherten Anzeigentext auf Wunsch in einem Fenster – so lässt sich der extrahierte Inhalt schnell im Original gegenprüfen.",
    ],
  },
  {
    version: "1.8.4",
    date: "18.06.2026",
    items: [
      "Stellenseite: Die wichtigsten Kernpunkte einer Anzeige – Aufgaben, Anforderungen und Besonderheiten – erscheinen jetzt als übersichtliche Karten oben auf der Stelle. Sie werden beim Erstellen eines Tests automatisch aus der Anzeige gelesen (ohne Zusatzkosten) und sind als Anhaltspunkt gedacht – im Zweifel die Originalanzeige prüfen. Ältere Stellen bekommen die Übersicht beim nächsten Test.",
    ],
  },
  {
    version: "1.8.3",
    date: "18.06.2026",
    items: [
      "Neu: Du kannst unpassende Fragen jetzt direkt melden – im Lern- und Prüfungsmodus sowie beim Durchsehen einer Auswertung. Wähle, was nicht stimmt (z. B. fachlich falsch oder thematisch irrelevant), optional mit einer kurzen Anmerkung. Die Meldung wird nur lokal in deinem Browser gespeichert.",
    ],
  },
  {
    version: "1.8.2",
    date: "18.06.2026",
    items: [
      "Die obere Leiste führt jetzt mit „Meine Stellen“ direkt zu deiner Stellenliste (statt zu „Historie“). Die bisherigen Tests einer einzelnen Stelle erreichst du wie gewohnt, indem du die Stelle in der Liste antippst.",
    ],
  },
  {
    version: "1.8.1",
    date: "18.06.2026",
    items: [
      "Reihenfolge-Aufgaben: Ein nach unten gezogenes Element landet jetzt genau an der angezeigten Position. Vorher rutschte es eine Stelle zu weit nach oben oder blieb liegen.",
    ],
  },
  {
    version: "1.8.0",
    date: "18.06.2026",
    items: [
      "Der kostenlose gehostete Modus erfordert jetzt eine Anmeldung – per Anmeldelink an deine E-Mail oder über Google. So können wir den Dienst fair und zuverlässig für alle bereitstellen. Wer lieber ohne Konto arbeitet, kann in den Einstellungen weiterhin einen eigenen API-Schlüssel hinterlegen oder ein lokales Modell nutzen – dafür ist keine Anmeldung nötig.",
    ],
  },
  {
    version: "1.7.1",
    date: "18.06.2026",
    items: [
      "Das E-Mail-Feld bei der Anmeldung war zu schmal dargestellt – es ist jetzt korrekt über die volle Breite und prüft die eingegebene Adresse direkt im Browser.",
    ],
  },
  {
    version: "1.7.0",
    date: "18.06.2026",
    items: [
      "Neu: In den Einstellungen kannst du dich jetzt freiwillig anmelden – per Anmeldelink an deine E-Mail oder über Google. Das ist optional und bereitet kommende Funktionen vor; ohne Anmeldung funktioniert weiterhin alles wie bisher.",
    ],
  },
  {
    version: "1.6.2",
    date: "18.06.2026",
    items: [
      "Wenn der Bot-Schutz im gehosteten Modus ausnahmsweise eine Bestätigung verlangt, erscheint sie jetzt zentral im Bildschirm (mit abgedunkeltem Hintergrund) statt unten in der Ecke. So übersiehst du sie nicht und der Ablauf stockt nicht. Im Normalfall – ohne nötige Bestätigung – bleibt weiterhin alles unsichtbar.",
    ],
  },
  {
    version: "1.6.1",
    date: "18.06.2026",
    items: [
      "Fehler behoben: Im Lernmodus konnte das Auflösen von Multiple-Choice-Fragen fehlschlagen. Auflösung und Erklärungen werden jetzt wieder zuverlässig angezeigt.",
    ],
  },
  {
    version: "1.6.0",
    date: "18.06.2026",
    items: [
      "Die Test-Erstellung und Auswertung halten den Bildschirm jetzt wach und brechen seltener ab, wenn das Display von selbst ausgeht. Das gilt auch mit eigenem API-Schlüssel oder lokalem Modell. Hinweis: Wechselst du aktiv zu einer anderen App oder schließt den Tab, kann der Vorgang trotzdem stoppen – nur im gehosteten Modus läuft die Erstellung wirklich auf dem Server weiter.",
    ],
  },
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

/* ---------- Profil (eigener Key, NICHT in settings) ---------- */
// Nicht-identifizierendes, optionales Bewerber-Profil (Plan 2026, 3.1). Eigener
// localStorage-Key, bewusst getrennt von settings (dort liegen provider/apiKey/model/
// tier/authToken). Geschlossene Enums, defensiv gelesen: unbekannte/zukuenftige Werte
// werden ignoriert, damit ein alter Client oder manipulierter Speicher nie freien Text
// in den Prompt traegt. Wirkt im ersten Slice NUR im Hosted-Pfad (BYOK/local lesen es nicht).
const PROFILE_KEY = "bewerbungstool.profile";
const PROFILE_ENUMS = {
  erfahrung: ["einsteiger", "berufserfahren", "senior"],
  trajectory: ["fach", "quer", "aufstieg"],
  ausbildung: ["keine_angabe", "schule", "ausbildung_laufend", "ausbildung_abgeschlossen",
    "studium_laufend", "studium_abgeschlossen", "fortbildung", "umschulung_anerkennung"],
};
const PROFILE_BRANCHE_MAX = 80;

// Validiert ein rohes Profil feldweise. Gibt immer ein Objekt (ggf. leer); ungueltige/
// leere Felder werden weggelassen, nie uebernommen. Spiegelt validateProfile im Worker.
function sanitizeProfile(raw) {
  const out = {};
  if (!raw || typeof raw !== "object") return out;
  for (const k of ["erfahrung", "trajectory", "ausbildung"]) {
    if (PROFILE_ENUMS[k].includes(raw[k])) out[k] = raw[k];
  }
  // branche: Freitext mit hartem Limit. Ein zu langer Wert wird VERWORFEN (nicht
  // gekuerzt) — konsistent mit dem Worker (validateProfile lehnt >Limit mit 400 ab)
  // und mit den Enums (unbekannt → verworfen). So ueberschreibt ein praeparierter
  // Import nie eine vorhandene gueltige branche mit einer gekuerzten Fassung.
  if (typeof raw.branche === "string") {
    const b = raw.branche.trim();
    if (b && b.length <= PROFILE_BRANCHE_MAX) out.branche = b;
  }
  return out;
}
function loadProfile() {
  let raw;
  try { raw = JSON.parse(localStorage.getItem(PROFILE_KEY)); } catch { raw = null; }
  return sanitizeProfile(raw);
}
function saveProfile(p) {
  const clean = sanitizeProfile(p);
  try {
    if (Object.keys(clean).length) localStorage.setItem(PROFILE_KEY, JSON.stringify(clean));
    else localStorage.removeItem(PROFILE_KEY); // komplett leer → Key entfernen statt {}
  } catch { /* voll/blockiert: Profil ist optional, kein harter Fehler */ }
  profile = clean;
  return clean;
}
// Payload fuer den Hosted-Request: das validierte Profil oder undefined (Feld dann
// weggelassen → abwaertskompatibel, Worker sieht kein profile).
function profilePayload() {
  const p = loadProfile();
  return Object.keys(p).length ? p : undefined;
}

// Gespraechsstufe (Plan 2026, 3.6): per-Test gewaehlte Interviewrunde aus dem Auswahlfeld.
// Geschlossenes Enum, defensiv gelesen - nur ein bekannter Wert wird gesendet, sonst
// undefined (Feld weggelassen → abwaertskompatibel, nur Hosted nutzt es).
// "leitung" bewusst NICHT mehr angeboten: die Stufe lieferte in der Live-Validierung keine
// treffsicheren Finalrunden-Fragen (Modell fiel auf operative Stellen-Pflichten zurueck).
// Das Backend-Enum behaelt "leitung" (Abwaertskompat), der Client bietet/sendet es nicht mehr.
const GESPRAECHSSTUFEN = ["telefon", "fachgespraech", "assessment"];
function gespraechsstufePayload() {
  const el = document.getElementById("gespraechsstufe");
  const v = el && typeof el.value === "string" ? el.value : "";
  return GESPRAECHSSTUFEN.includes(v) ? v : undefined;
}

let profile = loadProfile();

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

const views = ["view-login", "view-onboarding", "view-settings", "view-home", "view-input", "view-job", "view-quiz", "view-result", "view-history", "view-sr"];

function showView(id) {
  views.forEach((v) => $(v).classList.toggle("hidden", v !== id));
  // Eingabe-Bildschirm: Fragen-Stepper an die aktuelle Stufe anpassen (guenstig deckelt
  // niedriger). Ein evtl. unter "standard" gesetzter hoeherer Wert wird heruntergeklemmt.
  if (id === "view-input") { const ni = $("num-questions"); if (ni && ni.refreshMax) ni.refreshMax(); }
  syncHistory(id);
}

function currentView() {
  return views.find((v) => !$(v).classList.contains("hidden")) || "view-input";
}

// ---------- Browser-/Geraete-Zurueck ("popstate") ----------
// Die App ist eine SPA, die Views nur ein-/ausblendet. Ohne History-Anbindung
// verlaesst der Zurueck-Knopf (Browser-Pfeil, Android-Geste) die ganze PWA statt
// eine View zurueckzublaettern. Darum spiegeln wir jeden View-Wechsel in die
// History: die erste Ansicht ersetzt den Startzustand, jede weitere haengt einen
// Eintrag an. "Zurueck" loest dann popstate aus und wir zeigen die Zielview an.
let _historyReady = false;
let _poppingHistory = false;

// Identitaet des Datensatzes, der in einer daten-getragenen View gerade gezeigt
// wird - damit Zurueck NICHT den falschen (inzwischen gewechselten) Datensatz
// zeigt. view-job haengt an der aktiven Stelle, view-quiz/-result am Fragebogen.
function viewRecordKey(id) {
  if (id === "view-job") return activeJob ? (activeJob.key || activeJob.urlKey || null) : null;
  if (id === "view-quiz" || id === "view-result") {
    if (!quiz) return null;
    return quiz.urlKey || (quiz.jobText ? jobKey(quiz.jobText) : null);
  }
  return null;
}

function syncHistory(id) {
  // Aufruf stammt aus dem popstate-Handler selbst: nichts in die History schreiben,
  // sonst wuerde Zurueck einen neuen Vorwaerts-Eintrag erzeugen.
  if (_poppingHistory) return;
  const st = { view: id, key: viewRecordKey(id) };
  try {
    if (!_historyReady) {
      history.replaceState(st, "");
      _historyReady = true;
    } else if (!history.state || history.state.view !== id) {
      // Gleiche View nicht doppelt stapeln (mehrfaches showView fuer dieselbe Ansicht).
      history.pushState(st, "");
    } else if (history.state.key !== st.key) {
      // Gleiche View, aber anderer Datensatz (z. B. direkt von Stelle A zu B):
      // den aktuellen Eintrag aktualisieren statt einen neuen anzuhaengen.
      history.replaceState(st, "");
    }
  } catch { /* History-API nicht verfuegbar: dann eben ohne Zurueck-Anbindung */ }
}

// Eine Zielview beim Zurueckblaettern wiederherstellen. Home und die Stellen-
// Subpage haengen an dynamischem Zustand und werden neu gerendert; der Rest ist
// noch im DOM und wird nur wieder eingeblendet. Waehrend dieses Aufrufs schreibt
// showView NICHT in die History (Flag).
function restoreView(state) {
  const id = (state && state.view) || "view-home";
  const key = state && state.key;
  _poppingHistory = true;
  try {
    // Daten-getragene Ansichten beim Zurueckblaettern neu aufbauen, sonst zeigen
    // sie veralteten Stand (z. B. eine inzwischen geloeschte Stelle).
    if (id === "view-home") goHome();
    else if (id === "view-job") {
      // Die zum Eintrag gehoerende Stelle anhand ihres gespeicherten Keys wieder
      // oeffnen - nicht blind die aktuell aktive (die kann inzwischen eine andere
      // sein). Nicht mehr vorhanden (geloescht) -> Startliste.
      const job = key ? loadHistory().jobs.find((j) => j.key === key || j.urlKey === key) : null;
      if (job) openJob(job); else goHome();
    }
    else if (id === "view-history") { renderHistory(); showView("view-history"); }
    else if (id === "view-sr") { if (srDueCards().length) openSrReview(); else goHome(); }
    else if (id === "view-quiz" || id === "view-result") {
      // Nur zeigen, wenn der aktuell geladene Fragebogen noch der des Eintrags ist
      // (Live-Test oder eben angesehener Versuch). Sonst nicht den falschen Versuch
      // zeigen, sondern auf die Startliste.
      if (key && viewRecordKey(id) === key) showView(id); else goHome();
    }
    // Einrichtungs-Gates (Login/Onboarding) nicht per Zurueck erneut zeigen, wenn
    // der Anbieter inzwischen nutzbar eingerichtet ist - dann auf die Startliste.
    else if ((id === "view-login" || id === "view-onboarding") && isProviderConfigured()) goHome();
    else showView(id);
  } finally {
    _poppingHistory = false;
  }
}

// Ist der aktuelle Anbieter nutzbar eingerichtet? (lokal: Modell, hosted: Token,
// BYOK: API-Schluessel) - genutzt vom Speichern der Einstellungen und vom
// Zurueck-Handler, um nicht aufs Einrichtungs-Gate zurueckzufallen.
function isProviderConfigured() {
  const p = settings.provider || "hosted";
  return p === "local" ? !!settings.model : p === "hosted" ? !!settings.authToken : !!settings.apiKey;
}

// Woher die Einstellungen geoeffnet wurden: aus einem Einrichtungs-"Gate"
// (Login/Onboarding) oder regulaer aus der laufenden App (Kopfzeile). Steuert,
// wohin Speichern fuehrt - nach dem Einrichten in die App statt zurueck aufs Gate.
let settingsOrigin = "app";

window.addEventListener("popstate", (e) => {
  restoreView(e.state);
});

let loadingTicker = null;

// Screen Wake Lock: haelt den Bildschirm waehrend langer Operationen (Fragen-
// erstellung, Auswertung) wach. Greift fuer ALLE Modi - im Gegensatz zur echten
// Server-Hintergrundarbeit des Hosted-Modus laeuft die Generierung bei BYOK und
// lokal im Browser-Tab, der bei ausgeschaltetem Bildschirm sonst eingefroren und
// der Lauf abgebrochen wuerde. Schuetzt NICHT vor echtem App-Wechsel/Tab-Schliessen
// (dann gibt das OS den Lock frei) - das ist clientseitig nicht abfangbar.
let _wakeLock = null;
async function acquireWakeLock() {
  // API fehlt (aelterer/Desktop-Browser) oder Seite nicht sichtbar: stillschweigend
  // ueberspringen. Ein fehlender Wake Lock ist nie ein Fehler fuer den Nutzer.
  if (!("wakeLock" in navigator) || document.visibilityState !== "visible") return;
  try {
    _wakeLock = await navigator.wakeLock.request("screen");
    // Vom System wieder freigegeben (z. B. Tab versteckt): Referenz loeschen, damit
    // visibilitychange ihn bei Rueckkehr neu anfordern kann, solange noch geladen wird.
    _wakeLock.addEventListener("release", () => { _wakeLock = null; });
  } catch { _wakeLock = null; }
}
function releaseWakeLock() {
  if (_wakeLock) { try { _wakeLock.release(); } catch {} _wakeLock = null; }
}
// Wird der Tab wieder sichtbar und laeuft noch eine Operation, den vom System
// freigegebenen Lock erneut anfordern.
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && loadingTicker && !_wakeLock) acquireWakeLock();
});

function showLoading(text) {
  $("loading-text").textContent = text;
  $("loading-progress").classList.add("hidden");
  $("loading-fill").style.width = "0%";
  hideAbortButton();
  $("loading").classList.remove("hidden");
  acquireWakeLock();

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
  releaseWakeLock();
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

// Marker: wird statt einer Fehlermeldung geworfen, wenn ein Hosted-Call abbricht, weil
// zur Anmeldung umgeleitet wurde. showError unterdrueckt ihn (keine doppelte Box).
const LOGIN_REDIRECT = "__login_redirect__";

function showError(msg) {
  if (msg === LOGIN_REDIRECT) return;
  $("error-text").textContent = msg;
  $("error-box").classList.remove("hidden");
}

// Hosted-Call ohne Anmeldung: zum Login fuehren und den Aufruf sauber abbrechen.
function requireHostedLoginOrThrow() {
  if (hostedNeedsLogin()) { promptHostedLogin(); throw new Error(LOGIN_REDIRECT); }
}

// Antwort 401 vom Worker: (abgelaufenes) Token verwerfen und zur Anmeldung fuehren.
function handleHostedUnauthorized() {
  clearAuthToken();
  promptHostedLogin("Deine Sitzung ist abgelaufen. Bitte melde dich erneut an.");
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

// Ein einzelner Kernpunkt: knapper text plus woertliches Beleg-Zitat aus dem
// Anzeigentext. Der beleg ist die Grundlage der Grounding-Pruefung in
// normalizeKernpunkte (Punkte ohne im Text auffindbares Zitat werden verworfen).
const KERNPUNKT_ITEM_SCHEMA = {
  type: "object",
  properties: {
    text: { type: "string", description: "Der knappe Kernpunkt" },
    beleg: { type: "string", description: "Woertliches, exakt aus dem Anzeigentext kopiertes Zitat, das den Punkt stuetzt" },
  },
  required: ["text", "beleg"],
  additionalProperties: false,
};

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
          typ: { type: "string", enum: ["multiple_choice", "offen", "reihenfolge", "zahlenreihe", "sprachlogik"] },
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
    kernpunkte: {
      type: "object",
      description:
        "Die wichtigsten Kernpunkte der Stelle, ausschliesslich aus dem Anzeigentext " +
        "extrahiert. Nichts erfinden: was nicht im Text steht, bleibt leer. Zu JEDEM " +
        "Kernpunkt gehoert ein beleg = ein woertliches, exakt aus dem Anzeigentext " +
        "kopiertes Zitat, das den Punkt stuetzt. Gibt es kein solches Zitat, bleibt die " +
        "Kategorie leer (leeres Array bzw. text und beleg leer).",
      properties: {
        aufgaben: {
          type: "array",
          items: KERNPUNKT_ITEM_SCHEMA,
          description: "Wichtigste Aufgaben/Taetigkeiten, je ein knapper Punkt mit Beleg-Zitat; leer wenn nicht genannt",
        },
        anforderungen_muss: {
          type: "array",
          items: KERNPUNKT_ITEM_SCHEMA,
          description: "Zwingende Anforderungen / Muss-Skills mit Beleg-Zitat; leer wenn nicht genannt",
        },
        anforderungen_optional: {
          type: "array",
          items: KERNPUNKT_ITEM_SCHEMA,
          description: "Nice-to-have / wuenschenswerte Anforderungen mit Beleg-Zitat; leer wenn nicht genannt",
        },
        besonderheiten: {
          type: "array",
          items: KERNPUNKT_ITEM_SCHEMA,
          description: "Sonstige relevante Besonderheiten der Stelle mit Beleg-Zitat; leer wenn nicht genannt",
        },
      },
      required: ["aufgaben", "anforderungen_muss", "anforderungen_optional", "besonderheiten"],
      additionalProperties: false,
    },
  },
  required: ["titel", "arbeitgeber", "arbeitsort", "empfohlene_zeit_minuten", "fragen", "kernpunkte"],
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
  // Kernpunkte fuer lokale Modelle ganz entfernen: lokale Modelle halluzinieren
  // gern und sollen pro Block moeglichst wenig erzeugen. Aus properties UND
  // required strippen, sonst gibt der strikte lokale Pfad (strict: true) HTTP 400.
  delete s.properties.kernpunkte;
  s.required = s.required.filter((k) => k !== "kernpunkte");
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

// Kernpunkte der Stelle defensiv aufbereiten und GEGEN DEN ANZEIGENTEXT
// VERIFIZIEREN. Jeder Kernpunkt liefert vom Modell { text, beleg }; der beleg
// muss ein woertliches Zitat aus dem Anzeigentext sein. Punkte, deren beleg sich
// nicht (normalisiert) im jobText finden laesst, werden verworfen - so wird ein
// halluziniertes Ergebnis nicht als "vertrauenswuerdige" Stellen-Info gespeichert
// oder angezeigt. Die Ausgabe bleibt absichtlich TEXT-ONLY (string[] bzw. string),
// damit Panel (buildKernpunktePanel) und Persistenz (saveAttempt) unveraendert
// bleiben. Gibt null zurueck, wenn nach der Pruefung keine Kategorie uebrig ist
// (nicht-extrahierende Provider/lokal sollen keinen leeren Block speichern).
// Tolerant gegen Fehlen und Teilbefuellung. Ohne jobText kann nichts verifiziert
// werden -> alles wird verworfen (sichere Default).
// Begrenzt den Anzeigentext auf die EIGENTLICHE Stellenausschreibung, indem ein
// abschliessender "aehnliche/weitere Stellen"-Block abgeschnitten wird, den
// Jobportale unter die Anzeige haengen. Damit lassen sich Kernpunkte nicht mehr
// gegen Fremd-Anzeigen (z. B. ein anderes Gehalt im Teaser) belegen. Greift den
// haeufigen Fall ab (Teaser am Ende); eine vollstaendige Struktur-Segmentierung
// (Navigation/Footer/Seitenleiste) waere ein groesserer, separater Schritt.
function mainAdSegment(text) {
  const s = typeof text === "string" ? text : "";
  const marker =
    /(^|\n)\s*(ähnliche?\s+(stellen|jobs|anzeigen|stellenangebote)|weitere\s+(stellen|jobs|stellenangebote|passende)|das könnte (dich|sie) auch interessieren|empfohlene\s+jobs|passende\s+jobs|similar\s+jobs|related\s+jobs|recommended\s+jobs|more\s+jobs)/i;
  const m = s.match(marker);
  // Nur abschneiden, wenn ein sinnvoller Haupttext davor steht (sonst Fehltreffer).
  if (m && m.index > 200) return s.slice(0, m.index);
  return s;
}

// Bereinigt einen Kernpunkt-String fuer die ANZEIGE (nicht fuer die Belegpruefung):
// entfernt eine fuehrende Listen-Markierung (Spiegelstrich, Bullet, Sternchen)
// samt folgendem Whitespace und kollabiert interne Whitespace-/Zeilenumbruch-Laeufe
// zu einem Leerzeichen. Bewusst konservativ: nur eine Markierung GANZ AM ANFANG,
// die von Whitespace gefolgt wird, wird entfernt - Bindestriche INNERHALB eines
// Worts (z. B. "5-Tage-Woche", "Nice-to-have", "m/w/d") bleiben unberuehrt.
// Mehrfach angewandt, damit auch kombinierte Marker ("- • Text") sauber wegfallen.
//
// Fuehrende ZAHLEN-Aufzaehlungen ("1." / "1)") werden BEWUSST NICHT entfernt: eine
// solche Zahl ist im Deutschen oft Teil eines echten Fakts (z. B. "2. Staatsexamen",
// "3. Lehrjahr", "13. Monatsgehalt"), und der Sinn wuerde durch Streichen der Zahl
// verfaelscht. Das gemeldete Problem (Spiegelstrich-/Bullet-Marker) deckt das nicht
// ab, daher wird hier nichts Zahlenartiges angetastet.
function cleanKernpunktText(s) {
  let out = String(s == null ? "" : s).replace(/\s+/g, " ").trim();
  // Nur ein UMSCHLIESSENDES Quote-Paar entfernen (Anfang UND Ende eine zusammengehoerige
  // Klammer), damit ein jetzt-groundender, gequoteter beleg im Highlight-Panel ohne „…“
  // erscheint. NICHT einseitig strippen — sonst verstuemmelt ein beleg wie
  // 'New Work und agile' mit nur EINEM inneren Quote die Anzeige. Quotes im Text bleiben.
  const QUOTE_PAIRS = [
    ['"', '"'], ["'", "'"], ['„', '“'], ['„', '"'], ['“', '”'],
    ['«', '»'], ['»', '«'], ['‹', '›'], ['‚', '‘'], ['‘', '’'],
  ];
  for (const [open, close] of QUOTE_PAIRS) {
    if (out.length >= 2 && out[0] === open && out[out.length - 1] === close) {
      out = out.slice(1, -1).trim();
      break;
    }
  }
  // Solange am Anfang ein Marker + Whitespace (oder Marker am Stringende) steht,
  // diesen abtrennen. Marker: nur Spiegelstriche/Bullets/Sternchen. Der nachfolgende
  // Whitespace ist Pflicht, damit Wort-interne Bindestriche nicht getroffen werden.
  const marker = /^[-–—•·*▪◦‣](?:\s+|$)/;
  let prev;
  do {
    prev = out;
    out = out.replace(marker, "").trim();
  } while (out !== prev && out.length);
  return out;
}

function normalizeKernpunkte(k, jobText) {
  if (!k || typeof k !== "object") return null;
  const norm = (s) => String(s || "").toLowerCase().replace(/\s+/g, " ").trim();
  // Entfernt umschliessende Anfuehrungszeichen (auch deutsche typografische „…“), in
  // die manche Modell-Laeufe den beleg rahmen, obwohl der Inhalt ein perfektes
  // woertliches Zitat ist. Ohne dieses Abstreifen scheiterte der Substring-Check nur
  // am fuehrenden/abschliessenden Quote-Zeichen und der kernpunkt galt faelschlich als
  // ungrounded. Muss verhaltensgleich zu quiz-quality.js (Backend) bleiben.
  // Gemeinsame Quote-Klasse fuer BEIDE Enden (ASCII + deutsche/franzoesische typografische
  // Quotes in beiden Richtungen, inkl. Guillemets «…» UND »…«). Symmetrisches Abstreifen ist
  // fuer den reinen Substring-Match unschaedlich. MUSS identisch zu quiz-quality.js sein.
  const stripWrapQuotes = (s) =>
    String(s || "")
      .replace(/^["'„“”‟«»‘’‚‹›″′]+/, "")
      .replace(/["'„“”‟«»‘’‚‹›″′]+$/, "")
      .trim();
  // Belege werden NUR gegen den Haupt-Anzeigentext geprueft (ohne nachgehaengte
  // Teaser fuer andere Stellen), nicht gegen die ganze gescrapte Seite.
  const hay = norm(mainAdSegment(jobText));
  // item ist { text, beleg }. Gibt den getrimmten text zurueck, wenn text nicht
  // leer ist UND der beleg ein hinreichend langes, im Anzeigentext woertlich
  // auffindbares Zitat ist; sonst "" (verwerfen). Die Mindestlaenge schliesst aus,
  // dass ein triviales Schnipsel ("und", "m/w/d") als Beleg durchgeht.
  const verified = (item) => {
    if (!item || typeof item !== "object") return "";
    const text = typeof item.text === "string" ? item.text.trim() : "";
    const beleg = typeof item.beleg === "string" ? item.beleg.trim() : "";
    // Das Modell muss den Punkt kategorisiert haben (text nicht leer) - sonst
    // verwerfen.
    if (!text) return "";
    // Der Beleg muss ein hinreichend langes, im Anzeigentext WOERTLICH auffindbares
    // Zitat sein (Mindestlaenge gegen triviale Schnipsel). Angezeigt wird IMMER das
    // verifizierte Zitat selbst (gekuerzt), NIE die kondensierte Modell-Formulierung
    // (`text`): ein Teilstring des Zitats koennte die Bedeutung kippen - etwa
    // "Homeoffice" aus dem Beleg "Kein Homeoffice vorgesehen". Das Zitat bewahrt den
    // Sinn (inkl. Verneinungen) und ist nachweislich aus der Anzeige.
    const nb = stripWrapQuotes(norm(beleg));
    // Mindestlaenge gegen triviale Schnipsel; Hoechstlaenge, damit ein FOKUSSIERTES
    // Zitat erzwungen wird, statt es mitten im Satz zu kuerzen: eine blinde Kuerzung
    // koennte einen nachgestellten Qualifier oder eine Verneinung abschneiden und
    // so die Aussage verfaelschen. Zu lange Belege werden verworfen (kein Card),
    // nie gekuerzt. Angezeigt wird das vollstaendige, verifizierte Zitat.
    if (nb.length < 8 || nb.length > 240 || !hay.includes(nb)) return "";
    // Verifiziert wird gegen den ROHEN Beleg (der Marker steht echt im Quelltext),
    // angezeigt/gespeichert wird die bereinigte Fassung ohne Listen-Marker.
    return cleanKernpunktText(beleg);
  };
  const verArr = (v) =>
    (Array.isArray(v) ? v.map(verified).filter(Boolean) : []);
  // BEWUSST entschaerft: die praezisen, faktischen und besonders fehl-info-
  // anfaelligen Felder Gehalt, Benefits und Arbeitsmodell werden NICHT mehr
  // generiert/angezeigt. Grund: eine robuste Trennung der eigentlichen Anzeige
  // von Teasern/Seiten-Chrome ist auf gescrapten Portalseiten deterministisch
  // nicht garantierbar - ein fremdes Gehalt/Remote/Benefit koennte sonst als Fakt
  // DIESER Stelle erscheinen. Diese Felder sind daher aus Schema und Prompt
  // entfernt; uebrig bleiben die beschreibenden Highlights (Aufgaben,
  // Anforderungen, Besonderheiten), die im Panel zudem als "bitte im Original
  // pruefen" gerahmt sind. normalizeKernpunkte haelt nur diese vier Kategorien.
  const out = dedupeKernpunkte({
    aufgaben: verArr(k.aufgaben),
    anforderungen_muss: verArr(k.anforderungen_muss),
    anforderungen_optional: verArr(k.anforderungen_optional),
    besonderheiten: verArr(k.besonderheiten),
  });
  const hasAny =
    out.aufgaben.length ||
    out.anforderungen_muss.length ||
    out.anforderungen_optional.length ||
    out.besonderheiten.length;
  return hasAny ? out : null;
}

// Entfernt Dubletten aus den vier Kernpunkt-Kategorien. Modelle wiederholen
// denselben Punkt gern mehrfach (mehrfach identisch in EINER Kategorie) und listen
// ihn zusaetzlich unter mehreren Kategorien.
//
// Verglichen wird der ANZEIGE-STRING (das bereinigte Beleg-Zitat), denn nur dieser
// wird gerendert UND nur dieser steht auf dem Import-/Render-Pfad ueberhaupt zur
// Verfuegung (item.text existiert dort nicht mehr):
//   1) INNERHALB einer Kategorie: exakte Dubletten raus - unzweideutig sicher und
//      genau der gemeldete Defekt ("dasselbe Zitat 3x unter Aufgaben").
//   2) UEBER Kategorien hinweg: ein WOERTLICH identisches Zitat erscheint nur in
//      EINER Kategorie. Das Panel zeigt ausschliesslich das Zitat (nicht die Modell-
//      Kategorisierung); zwei Karten mit exakt demselben Satz unter verschiedenen
//      Ueberschriften waeren fuer den Nutzer nicht unterscheidbares Rauschen - genau
//      der gemeldete Screenshot-Fall (dasselbe Zitat unter Aufgaben UND Muss-
//      Anforderung). Nur exakt deckungsgleiche Anzeige-Strings werden zusammengefasst.
//
// Welche Kategorie ein geteiltes Zitat behaelt, entscheidet eine PRIORITAET, NICHT
// die Render-Reihenfolge: anforderungen_muss > anforderungen_optional > aufgaben >
// besonderheiten. So kann eine Aufgabe NIE eine Muss-Anforderung verdraengen - eine
// Pflichtanforderung verschwindet also nicht zugunsten einer (weniger kritischen)
// Taetigkeitsbeschreibung. Innerhalb jeder Kategorie und die Sektions-Reihenfolge im
// Panel bleiben unveraendert; nur die Karte mit dem doppelten Zitat wandert in die
// hoeher priorisierte Kategorie. Die Strings selbst bleiben unveraendert (bereits
// bereinigt aus cleanKernpunktText).
const KERNPUNKT_CATEGORIES = ["aufgaben", "anforderungen_muss", "anforderungen_optional", "besonderheiten"];
const KERNPUNKT_DEDUP_PRIORITY = ["anforderungen_muss", "anforderungen_optional", "aufgaben", "besonderheiten"];
function dedupeKernpunkte(obj) {
  const o = obj && typeof obj === "object" ? obj : {};
  const norm = (item) => String(item == null ? "" : item).toLowerCase().replace(/\s+/g, " ").trim();
  // Pro normalisiertem Zitat die Kategorie mit der hoechsten Prioritaet bestimmen,
  // in der es vorkommt. Diese "Gewinner"-Kategorie behaelt das Zitat; in allen
  // anderen Kategorien faellt es als Dublette weg.
  const winner = new Map();
  KERNPUNKT_DEDUP_PRIORITY.forEach((cat) => {
    const arr = Array.isArray(o[cat]) ? o[cat] : [];
    arr.forEach((item) => {
      const key = norm(item);
      if (key && !winner.has(key)) winner.set(key, cat);
    });
  });
  // In Render-/Speicher-Reihenfolge ausgeben; je Kategorie nur die Eintraege, deren
  // Gewinner diese Kategorie ist, und dort auch nur das erste Vorkommen (Inner-
  // Kategorie-Dublette).
  const result = {};
  KERNPUNKT_CATEGORIES.forEach((cat) => {
    const arr = Array.isArray(o[cat]) ? o[cat] : [];
    const seenHere = new Set();
    const kept = [];
    arr.forEach((item) => {
      const key = norm(item);
      if (!key || seenHere.has(key)) return;
      if (winner.get(key) !== cat) return;
      seenHere.add(key);
      kept.push(item);
    });
    result[cat] = kept;
  });
  return result;
}

// Importierte Kernpunkte (aus einem Backup) erneut erden: nur die erlaubten,
// beschreibenden Kategorien als String-Arrays uebernehmen und jeden Eintrag gegen
// den Haupt-Anzeigentext DIESES Jobs pruefen. So koennen ein korruptes/editiertes
// Backup keine ungeprueften (z. B. falschen Gehalts-)Fakten unterschieben - dieselbe
// Erdung wie beim Generieren. Gibt das bereinigte data-Objekt zurueck oder null.
function regroundKernpunkteData(data, jobText) {
  if (!data || typeof data !== "object") return null;
  const norm = (s) => String(s || "").toLowerCase().replace(/\s+/g, " ").trim();
  const hay = norm(mainAdSegment(jobText));
  if (!hay) return null;
  // Gegen den ROHEN (getrimmten) String pruefen - ein importierter Eintrag kann
  // noch den Listen-Marker aus dem Original enthalten und muss sich so im
  // Anzeigentext belegen lassen. Erst nach bestandener Pruefung bereinigen.
  const keep = (arr) =>
    (Array.isArray(arr) ? arr : [])
      .filter((x) => typeof x === "string")
      .map((x) => x.trim())
      .filter((x) => { const n = norm(x); return n.length >= 8 && n.length <= 240 && hay.includes(n); })
      .map((x) => cleanKernpunktText(x));
  const out = dedupeKernpunkte({
    aufgaben: keep(data.aufgaben),
    anforderungen_muss: keep(data.anforderungen_muss),
    anforderungen_optional: keep(data.anforderungen_optional),
    besonderheiten: keep(data.besonderheiten),
  });
  return (out.aufgaben.length || out.anforderungen_muss.length ||
    out.anforderungen_optional.length || out.besonderheiten.length) ? out : null;
}

// Importierte Kernpunkte eines Jobs erneut erden (gegen dessen eigenen jobText)
// und in einen sauberen Versionswrapper packen; undefined, wenn nichts uebrig
// bleibt. So unterschiebt ein korruptes/editiertes Backup keine ungeprueften Fakten.
function regroundImportedKernpunkte(impJob) {
  const kp = impJob && impJob.kernpunkte;
  if (!kp || typeof kp !== "object") return undefined;
  const data = regroundKernpunkteData(kp.data, impJob.jobText);
  if (!data) return undefined;
  // Provenienz-URL aus dem Backup uebernehmen, damit der "Original-Anzeige"-Link
  // ein Export/Import (anderer Browser/Geraet) ueberlebt. ABER: ein editiertes/korruptes
  // Backup darf den Link nicht auf eine FREMDE Seite zeigen lassen (gleiche Bedrohung
  // wie bei den Fakten, s. regroundKernpunkteData). Daher die srcUrl nur uebernehmen,
  // wenn sie zur Stellen-Identitaet passt: echte http(s)-URL UND
  // urlKeyOf(srcUrl) === impJob.urlKey UND die Kernpunkte-Provenienz srcKey gehoert zum
  // Text dieser Stelle (jobKey(impJob.jobText)). Sonst kein Link (lieber keiner als ein
  // falscher).
  let impSrcUrl = "";
  if (typeof kp.srcUrl === "string" && /^https?:\/\//i.test(kp.srcUrl.trim())) {
    const u = kp.srcUrl.trim();
    let textKey = null;
    try { textKey = jobKey(impJob.jobText); } catch { /* egal */ }
    const srcKeyOk = typeof kp.srcKey === "string" && textKey && kp.srcKey === textKey;
    const urlOk = impJob.urlKey && urlKeyOf(u) === impJob.urlKey;
    if (srcKeyOk && urlOk) impSrcUrl = u;
  }
  return {
    v: 1,
    generatedAt: Number.isFinite(Number(kp.generatedAt)) ? Number(kp.generatedAt) : Date.now(),
    srcKey: typeof kp.srcKey === "string" ? kp.srcKey : null,
    srcUrl: impSrcUrl,
    data,
  };
}

// Druckpunkte (Plan 2026, 3.3): abgeleitete Knackpunkte aus Stelle x Profil. Defensiv
// normalisieren — nur Eintraege mit Titel zaehlen, Felder getrimmt, hart gedeckelt. Gibt
// null zurueck, wenn nichts Verwertbares da ist (Feld wird dann gar nicht gesetzt → das
// Panel erscheint nicht, alte/BYOK-Quizze ohne das Feld bleiben unveraendert).
const DRUCKPUNKTE_MAX = 6;
function normalizeDruckpunkte(d) {
  if (!Array.isArray(d)) return null;
  const out = [];
  for (const it of d) {
    if (!it || typeof it !== "object") continue;
    const titel = typeof it.titel === "string" ? it.titel.trim() : "";
    if (!titel) continue; // ohne Titel kein Druckpunkt
    out.push({
      titel,
      begruendung: typeof it.begruendung === "string" ? it.begruendung.trim() : "",
      uebungsfokus: typeof it.uebungsfokus === "string" ? it.uebungsfokus.trim() : "",
    });
    if (out.length >= DRUCKPUNKTE_MAX) break;
  }
  return out.length ? out : null;
}

// Importiertes Druckpunkte-Wrapper aus einem Backup defensiv pruefen: NUR die plausible
// Form { data: [...] } mit mindestens einem verwertbaren Eintrag uebernehmen, die data
// ueber normalizeDruckpunkte saeubern (titellose/krumme Eintraege raus, hart gedeckelt).
// Sonst undefined → das Feld wird nicht gesetzt. Schuetzt BEIDE Import-Pfade (neue Stelle
// wie Merge) davor, dass ein praepariertes Backup beliebige/krumme druckpunkte persistiert.
function sanitizeImportedDruckpunkte(impJob) {
  const w = impJob && impJob.druckpunkte;
  if (!w || typeof w !== "object" || !Array.isArray(w.data)) return undefined;
  const data = normalizeDruckpunkte(w.data);
  if (!data) return undefined;
  return {
    v: 1,
    generatedAt: Number.isFinite(Number(w.generatedAt)) ? Number(w.generatedAt) : Date.now(),
    data,
  };
}

function normalizeQuizData(result, jobText = "") {
  if (!result || typeof result !== "object" || !Array.isArray(result.fragen)) {
    throw new Error("Die Modellantwort hatte nicht die erwartete Form (keine Fragenliste).");
  }
  const validTyp = (t) => (t === "multiple_choice" || t === "offen" || t === "reihenfolge" || t === "zahlenreihe" || t === "sprachlogik" ? t : "offen");
  const validDiff = (d) => (d === "leicht" || d === "mittel" || d === "schwer" ? d : "");
  const fragen = [];
  result.fragen.forEach((q, i) => {
    if (!q || typeof q !== "object") return;
    const frage = typeof q.frage === "string" ? q.frage.trim() : "";
    if (!frage) return; // ohne Fragetext nicht darstellbar
    let typ = validTyp(q.typ);
    let optionen = Array.isArray(q.optionen) ? q.optionen.filter((o) => typeof o === "string") : [];
    // Multiple-Choice ohne brauchbare Optionen ist nicht bedienbar -> offene Frage
    if (mcLike(typ) && optionen.length < 2) { typ = "offen"; optionen = []; }
    // korrekte_indizes defensiv normalisieren: nur gueltige Optionsindizes,
    // ohne Duplikate. Additiv - alte Daten ohne das Feld bleiben [].
    let korrekte_antwort = typeof q.korrekte_antwort === "string" ? q.korrekte_antwort : "";
    let korrekte_indizes = [];
    let erklaerungen = Array.isArray(q.erklaerungen) ? q.erklaerungen.filter((e) => typeof e === "string") : [];
    if (mcLike(typ)) {
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
    // Zahlenreihe (Plan 3.7): nur als eigener Typ behalten, wenn die korrekte_antwort wirklich
    // eine Zahl ist (lokal/deterministisch bewertbar). Sonst defensiv auf "offen" zuruecksetzen
    // (Textarea-Render + LLM-Bewertung) - kein Absturz bei einer krummen Modellantwort.
    if (typ === "zahlenreihe" && !Number.isFinite(parseZahl(korrekte_antwort))) {
      typ = "offen";
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
  const kp = normalizeKernpunkte(result.kernpunkte, jobText);
  const dp = normalizeDruckpunkte(result.druckpunkte);
  return {
    titel: typeof result.titel === "string" && result.titel.trim() ? result.titel.trim() : "Einstellungstest",
    arbeitgeber: typeof result.arbeitgeber === "string" ? result.arbeitgeber.trim() : "",
    arbeitsort: typeof result.arbeitsort === "string" ? result.arbeitsort.trim() : "",
    empfohlene_zeit_minuten: Number.isFinite(zeit) && zeit > 0 ? zeit : 0,
    fragen,
    // Nur setzen, wenn wirklich etwas extrahiert wurde (sonst Feld weglassen).
    ...(kp ? { kernpunkte: kp } : {}),
    ...(dp ? { druckpunkte: dp } : {}),
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

// Zahlenreihe (Plan 3.7): tolerantes Parsen einer Zahl-Eingabe. Akzeptiert deutsches
// Dezimalkomma + Tausenderpunkte, ignoriert Leerzeichen/fuehrendes Plus. NaN, wenn der
// String keine reine Zahl ist. MUSS sich mit dem Backend (quiz-quality.js parseNumericAnswer)
// decken, damit "ist das eine Zahl?" client- und serverseitig gleich entschieden wird.
function parseZahl(v) {
  if (typeof v === "number") return Number.isFinite(v) ? v : NaN;
  if (typeof v !== "string") return NaN;
  let s = v.trim().replace(/\s/g, "").replace(/^\+/, "");
  if (!s) return NaN;
  const neg = s.startsWith("-");
  if (neg) s = s.slice(1);
  // Deutsche Konvention: Komma = Dezimaltrennzeichen, Punkt = Tausender.
  if (s.includes(",")) {
    s = s.replace(/\./g, "").replace(",", ".");          // "1.234,5" -> "1234.5"
  } else if (/^\d{1,3}(\.\d{3})+$/.test(s)) {
    s = s.replace(/\./g, "");                             // "1.024" / "1.234.567" -> Ganzzahl
  }
  // Sonst bleibt ein einzelner Punkt ein Dezimalpunkt ("1.5" -> 1.5).
  if (!/^\d+(\.\d+)?$/.test(s)) return NaN;
  const n = Number(s);
  if (!Number.isFinite(n)) return NaN;
  return neg ? -n : n;
}

// Deterministisches Scoring einer Zahlenreihe: exakte numerische Gleichheit (mit Epsilon
// gegen Float-Rauschen) -> 10 Punkte, sonst 0. Keine LLM-Bewertung noetig.
function scoreZahlenreihe(q, answerStr) {
  const soll = parseZahl(q.korrekte_antwort);
  const ist = parseZahl(answerStr);
  const ok = Number.isFinite(soll) && Number.isFinite(ist) && Math.abs(soll - ist) < 1e-9;
  return {
    id: q.id,
    punkte: ok ? 10 : 0,
    feedback: ok ? "Richtig." : "Leider nicht die gesuchte Zahl.",
    musterantwort: String(q.korrekte_antwort ?? ""),
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

// --- Anonyme Nutzungsstatistik (Topic #2) --------------------------------
// Cookieloses, personenunabhaengiges Mitzaehlen: NUR Flow-Name + Anbieter + Stufe,
// keine IP/Texte/E-Mail/IDs (die IP sieht der Server ohnehin technisch, speichert sie
// aber nicht). Bewusst NUR im gehosteten Modus — fuer BYOK/lokal bleibt das
// Datenschutzversprechen "es bleibt alles bei dir" unangetastet (kein neuer Datenfluss
// zu uns). Komplett fire-and-forget: niemals blockierend, Fehler werden verschluckt.
function trackEvent(flow) {
  try {
    const provider = settings.provider || "hosted";
    if (provider !== "hosted") return; // kein Beacon fuer BYOK/lokal
    const tier = effectiveTier();
    fetch(hostedBase() + "/api/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ flow, provider, tier }),
      keepalive: true,
    }).catch(() => { /* egal */ });
  } catch { /* egal */ }
}

// --- Konto / Auth (Phase B, Schritt 1) -----------------------------------
// Rein additiv: ohne Anmeldung laeuft alles wie bisher (anonymer Hosted-Modus). Das
// Session-Token liegt additiv in settings.authToken; es wird, wenn vorhanden, als Bearer
// an die Hosted-Endpoints mitgeschickt. Der Worker aendert damit AKTUELL nichts am Gate
// oder den Kosten — es ist nur die Vorbereitung fuer spaetere Per-Konto-Funktionen.
function authHeaders() {
  return settings.authToken ? { Authorization: "Bearer " + settings.authToken } : {};
}

// Gehosteter Modus erfordert seit Phase B eine Anmeldung. BYOK/lokal sind ausgenommen.
function hostedNeedsLogin() {
  return (settings.provider || "hosted") === "hosted" && !settings.authToken;
}

function setAuthToken(token) {
  settings = { ...settings, authToken: token };
  saveSettings(settings);
}

function clearAuthToken() {
  if (!settings.authToken) return;
  const { authToken, ...rest } = settings;
  settings = rest;
  saveSettings(settings);
}

// --- Credits / Guthaben (Phase B) ----------------------------------------
// Clientseitiger Cache des Guthaben-Signals. creditsEnabled gated die GESAMTE sichtbare
// Credits-UI (Guthaben-Zeile, Opus-Stufe, Aufladen): steht das Server-Flag auf 0 (oder ist
// der Nutzer nicht angemeldet), erscheint nichts Neues — kein Breaking Change. Defensive
// Defaults: nichts zeigen, bis der Server geantwortet hat.
// dirty = "der gecachte Stand koennte durch eine Abbuchung veraltet sein" (z. B. nach einem
// bezahlten Opus-Job). Die Opus-Vorpruefung frischt dann vor dem naechsten Dispatch frisch nach.
// opusTestCredits = vom Server gemeldete Kosten eines Opus-Tests (maßgeblich); der Client
// nutzt diesen Wert, sobald der Worker ihn liefert, und faellt sonst auf OPUS_TEST_CREDITS
// zurueck (forward-kompatibel, kein eigener Preis-Hoheitsanspruch des Clients).
// (Die user.id wird NICHT gecacht — die Paddle-Bindung laeuft serverseitig ueber den
// signierten Checkout-Intent, nicht ueber ein client-geliefertes customData.user_id.)
// freeRemaining = vom Server (/api/balance) gemeldete heute noch verfuegbaren GRATIS-Tests in
// den Gratis-Stufen (Overflow-Signal); null = unbekannt/Server liefert es (noch) nicht.
let creditsState = { credits: null, creditsEnabled: false, opusTestCredits: null, freeRemaining: null, loaded: false, dirty: false };

function resetCreditsState() {
  creditsState = { credits: null, creditsEnabled: false, opusTestCredits: null, freeRemaining: null, loaded: false, dirty: false };
}

// Festpreis je Test und Stufe (Credits). Forward-kompatible Fallback-Werte fuer den
// Kostenhinweis VOR dem Server-402; massgeblich bleibt der Server (er liefert priceCredits im
// 402 quota-exhausted-Body und bucht ohnehin selbst ab). beste nutzt den gemeldeten Server-Wert.
const TIER_TEST_CREDITS = { standard: 25, guenstig: 5, beste: 60 };
function tierPriceCredits(tier) {
  if (tier === "beste") return requiredOpusCredits();
  return Number.isFinite(TIER_TEST_CREDITS[tier]) ? TIER_TEST_CREDITS[tier] : 0;
}
function tierLabelFor(tier) {
  return tier === "beste" ? "Beste (Opus)" : tier === "guenstig" ? "Günstig" : "Standard";
}

// 1 Credit = 0,01 €. Euro ist die Leitwaehrung in der UI (fuer Laien verstaendlich),
// Credits laufen nur als transparente Klammer mit.
function formatGuthabenEuro(credits) {
  return (credits / 100).toLocaleString("de-DE", { style: "currency", currency: "EUR" });
}

// Fallback-Richtwert fuer die Opus-Testkosten, falls der Server (noch) keinen Wert liefert.
// Die Abrechnung macht serverseitig der Worker; maßgeblich ist creditsState.opusTestCredits.
const OPUS_TEST_CREDITS = 60;

// Maßgebliche Opus-Testkosten: Server-Wert, sonst Fallback-Konstante.
function requiredOpusCredits() {
  return Number.isFinite(creditsState.opusTestCredits) ? creditsState.opusTestCredits : OPUS_TEST_CREDITS;
}

// Ist die Opus-Stufe fuer das aktuelle Konto gedeckt? Bestaetigter Flag-an-Zustand UND
// mindestens die Testkosten (nicht nur > 0 — mit 1..59 Credits liefe der Nutzer sonst in ein
// Server-402). Der Server bleibt die letzte Instanz; das hier ist die ehrliche Vorpruefung.
function canAffordBeste() {
  return creditsState.loaded
    && creditsState.creditsEnabled
    && Number.isFinite(creditsState.credits)
    && creditsState.credits >= requiredOpusCredits();
}

// Tatsaechlich verwendbare Qualitaetsstufe. "beste" (Opus) wird auf "standard" heruntergestuft,
// solange der Client nicht bestaetigt berechtigt ist. So sendet ein importiertes oder veraltetes
// settings.tier="beste" NIE einen gesperrten Premium-Request — unabhaengig davon, ob das
// Einstellungsformular schon neu gespeichert wurde. Der Generierungs-Pfad prueft zusaetzlich
// fail-closed VOR dem Dispatch (Guard in generateQuiz), damit eine bewusst bezahlte Auswahl nie
// still als standard durchrutscht; effectiveTier ist die defensive Untergrenze.
function effectiveTier() {
  const t = settings.tier || "standard";
  if (t !== "beste") return t;
  return canAffordBeste() ? "beste" : "standard";
}

// Stufe fuer einen Hosted-Call. Ein Follow-up MIT jobId (Auswerten/Vertiefen eines bestimmten,
// ggf. bezahlten Tests) verwendet die Stufe DES TESTS (aus der Quiz-Provenienz) — NICHT das
// aktuelle Guthaben: sonst verloere ein bezahlter Opus-Test nach dem Verbrauch der Credits
// still seine Premium-Folgeschritte. Der Server leitet die Berechtigung ohnehin aus der jobId
// ab. Neue, abrechenbare Generierung (ohne jobId) bleibt guthabengegated (effectiveTier).
function tierForHostedCall(payload) {
  const jobId = payload && typeof payload.jobId === "string" ? payload.jobId : "";
  // Die Provenienz-Stufe NUR uebernehmen, wenn die jobId im Payload auch wirklich zum aktuellen
  // Quiz gehoert — sonst koennte die Premium-Stufe eines Opus-Quiz in einen Request fuer einen
  // ANDEREN Job durchsickern. Passt es nicht zusammen, normale (guthabengegated) Wahl.
  if (jobId && quiz && quiz.jobId === jobId && quiz.provenance) {
    return quiz.provenance.tier || "standard";
  }
  return effectiveTier();
}

// Schaltet die Opus-Stufe ("beste") im Qualitaets-Select frei: nur wenn das Server-Flag an
// ist. Ohne Guthaben bleibt die Option sichtbar, aber gesperrt (mit Aufladen-Hinweis) — so
// ist sie auffindbar und stupst zum Aufladen, ohne einen leeren Kauf auszuloesen.
function updateTierOptions() {
  const sel = $("tier");
  if (!sel) return;
  const beste = sel.querySelector('option[value="beste"]');
  if (!beste) return;
  // Entitlement noch unbekannt (kein bestaetigter Server-Stand): NICHTS erzwingen, sonst
  // fiele eine gespeicherte beste-Auswahl beim Oeffnen der Einstellungen still auf standard.
  // Bei gespeichertem Wunsch "beste" die Option sichtbar lassen, damit das Select sie weiter
  // anzeigt; die endgueltige Entscheidung faellt, sobald /auth/me bzw. /api/balance da ist.
  if (!creditsState.loaded) {
    if (settings.tier === "beste") { beste.hidden = false; beste.disabled = false; }
    updateTierHint();
    return;
  }
  if (!creditsState.creditsEnabled) {
    // Flag bestaetigt aus → Opus ist gar kein verfuegbares Feature. Option verbergen UND eine
    // gespeicherte (importierte/veraltete) beste-Absicht auf standard NORMALISIEREN, damit
    // Anzeige und gespeicherte Einstellung uebereinstimmen und die Generierung nicht an einem
    // unsichtbaren beste-Wert haengenbleibt (Quelle der Wahrheit konsistent halten).
    beste.hidden = true;
    beste.disabled = true;
    if (settings.tier === "beste") { settings = { ...settings, tier: "standard" }; saveSettings(settings); }
    if (sel.value === "beste") sel.value = "standard";
    updateTierHint();
    return;
  }
  // Flag an: Option zeigen. Waehlbar nur, wenn das Guthaben mindestens einen Opus-Test deckt
  // (nicht schon ab 1 Credit).
  beste.hidden = false;
  beste.disabled = !canAffordBeste();
  // Bei zu wenig Guthaben die beste-ABSICHT bewusst NICHT verwerfen (anders als beim Flag-aus):
  // die Option bleibt sichtbar und, falls gespeichert, ausgewaehlt (disabled, mit Aufladen-
  // Hinweis). Die Generierung weist dann klar aufs Aufladen hin, statt still auf standard zu
  // generieren — Anzeige und settings.tier bleiben konsistent (beide "beste").
  if (settings.tier === "beste" && sel.value !== "beste") sel.value = "beste";
  updateTierHint();
}

// Hinweistext unter dem Qualitaets-Select: Kostenhinweis bei aktiver Opus-Auswahl bzw.
// Aufladen-Aufforderung, wenn die Option mangels Guthaben gesperrt ist.
function updateTierHint() {
  const sel = $("tier");
  const hint = $("tier-beste-hint");
  if (!sel || !hint) return;
  const beste = sel.querySelector('option[value="beste"]');
  if (!beste || beste.hidden) { hint.classList.add("hidden"); hint.textContent = ""; return; }
  if (sel.value === "beste" && !beste.disabled) {
    // Ausgewaehlt und gedeckt → Kostenhinweis.
    hint.innerHTML = `Beste Qualität (Opus) kostet etwa <strong>${formatGuthabenEuro(requiredOpusCredits())} pro Test</strong>.`;
    hint.classList.remove("hidden");
  } else if (beste.disabled) {
    // Gesperrt (ausgewaehlt oder nur sichtbar) → Guthaben fehlt; Aufladen anbieten.
    hint.innerHTML = 'Beste Qualität (Opus) braucht mehr Guthaben. <a href="#" id="link-aufladen">Aufladen</a>';
    hint.classList.remove("hidden");
    const link = $("link-aufladen");
    if (link) link.onclick = (e) => { e.preventDefault(); openTopupDialog(); };
  } else {
    hint.classList.add("hidden");
    hint.textContent = "";
  }
}

// Hinweis fuer die Gratis-Stufen (standard/guenstig): wie viele kostenlose Tests heute noch
// uebrig sind bzw. — wenn aufgebraucht — dass weitere Tests Guthaben kosten (Overflow). Nur
// bei aktivem Flag und bekanntem freeRemaining; fuer "beste" zeigt updateTierHint den Opus-Preis.
function updateFreeTierHint() {
  const sel = $("tier");
  const hint = $("tier-free-hint");
  if (!hint) return;
  const tier = sel ? sel.value : (settings.tier || "standard");
  const remaining = creditsState.freeRemaining;
  if (!creditsState.creditsEnabled || tier === "beste" || !Number.isFinite(remaining)) {
    hint.classList.add("hidden"); hint.textContent = ""; return;
  }
  if (remaining > 0) {
    hint.textContent = remaining === 1
      ? "Heute noch 1 kostenloser Test in dieser Qualität."
      : `Heute noch ${remaining} kostenlose Tests in dieser Qualität.`;
  } else {
    // euro aus einer Zahl formatiert (keine Nutzereingabe) → kein XSS.
    const euro = formatGuthabenEuro(tierPriceCredits(tier));
    hint.innerHTML = settings.autoUseCredits
      ? `Dein kostenloses Tageskontingent ist aufgebraucht. Jeder weitere Test in dieser Qualität wird automatisch mit <strong>${euro}</strong> aus deinem Guthaben bezahlt.`
      : `Dein kostenloses Tageskontingent ist aufgebraucht. Jeder weitere Test in dieser Qualität kostet <strong>${euro}</strong> aus deinem Guthaben (mit Bestätigung).`;
  }
  hint.classList.remove("hidden");
}

// Balance-Zeile + Tier-Optionen + Aufladen-Bereich aus dem aktuellen creditsState zeichnen.
function renderCreditsUI() {
  renderBalanceLine();
  updateTierOptions();
  updateFreeTierHint();
  // Aufladen nur, wenn Credits live sind (Flag an). Sichtbarkeit haengt zusaetzlich am
  // Login-Zustand (Block liegt in #account-loggedin).
  const topup = $("topup");
  if (topup) topup.classList.toggle("hidden", !creditsState.creditsEnabled);
  // Opt-in "automatisch Guthaben verwenden": nur bei aktivem Flag sichtbar; Haken aus dem
  // gespeicherten settings.autoUseCredits spiegeln.
  const autoRow = $("auto-credits-row");
  if (autoRow) {
    autoRow.classList.toggle("hidden", !creditsState.creditsEnabled);
    const cb = $("auto-use-credits");
    if (cb) cb.checked = !!settings.autoUseCredits;
  }
}

// Nach einer (moeglichen) Guthaben-Aenderung durch einen bezahlten Opus-Job: Cache als
// veraltet markieren und im Hintergrund auffrischen (Anzeige + naechste Opus-Pruefung). Nur
// fuer "beste" relevant; standard/guenstig sind gratis und beruehren das Guthaben nicht.
function markCreditsDirtyIfPaid(tier) {
  if (tier === "beste") { creditsState.dirty = true; refreshBalance(); }
}

// Guthaben nach einem terminalen (asynchronen) Job nachziehen: Opus ueber markCreditsDirtyIfPaid,
// ein per Guthaben bezahlter Gratis-Stufen-Overflow direkt — sonst bliebe nach einem serverseitigen
// Refund eines fehlgeschlagenen standard/guenstig-Overflow-Jobs der angezeigte Stand veraltet.
function refreshCreditsAfterJob(ctx) {
  markCreditsDirtyIfPaid(ctx && ctx.tier);
  if (ctx && ctx.paidOverflow) refreshBalance();
}

// --- Aufladen via Paddle (Phase B, P4) -----------------------------------
// Der client-side Token ist bewusst oeffentlich (kein Secret). Sandbox vs. Produktion wird
// beim Go-Live umgestellt (paddleEnv) — prod-Token + prod-price-IDs dann hier eintragen.
const PADDLE_CONFIG = {
  sandbox: {
    token: "test_dd28942b6ba0973839ad31d6f08",
    prices: {
      3: "pri_01kvthe259wsnywgqbcvjfef0j",
      5: "pri_01kvthd4f8jb73j7905enkga59",
      10: "pri_01kvthefqea9v7p3qxhedj60d8",
    },
  },
  production: {
    token: "", // TODO Go-Live: live client-side Token eintragen
    prices: { 3: "", 5: "", 10: "" }, // TODO Go-Live: prod price-IDs eintragen
  },
};

// Umgebung: Default sandbox; beim Go-Live (prod-Token+price-IDs gesetzt) auf "production"
// stellen. localStorage-Override nur fuer Tests.
function paddleEnv() {
  try { const o = localStorage.getItem("bewerbungstool.paddleEnv"); if (o === "production" || o === "sandbox") return o; } catch {}
  return "sandbox";
}
function paddleConfig() { return PADDLE_CONFIG[paddleEnv()] || PADDLE_CONFIG.sandbox; }

function setTopupMsg(text) { const el = $("topup-msg"); if (el) el.textContent = text || ""; }

let _paddleReady = null; // Promise<Paddle>, einmal geladen/initialisiert
function loadPaddle() {
  if (_paddleReady) return _paddleReady;
  _paddleReady = new Promise((resolve, reject) => {
    const init = () => {
      const cfg = paddleConfig();
      if (!cfg.token) { reject(new Error("paddle-no-token")); return; }
      try {
        window.Paddle.Environment.set(paddleEnv());
        window.Paddle.Initialize({ token: cfg.token, eventCallback: onPaddleEvent });
        resolve(window.Paddle);
      } catch (e) { reject(e); }
    };
    if (window.Paddle) { init(); return; }
    const s = document.createElement("script");
    s.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
    s.async = true;
    s.onload = init;
    s.onerror = () => { _paddleReady = null; reject(new Error("paddle-load-failed")); };
    document.head.appendChild(s);
  }).catch((e) => { _paddleReady = null; throw e; }); // Fehlschlag nicht cachen → spaeter erneut moeglich
  return _paddleReady;
}

// Paddle-Events. Nach erfolgreichem Checkout das Guthaben nachziehen (die Gutschrift macht der
// Webhook serverseitig + asynchron → kurz pollen, bis der Stand steigt).
function onPaddleEvent(ev) {
  if (ev && ev.name === "checkout.completed") {
    setTopupMsg("Zahlung erhalten. Dein Guthaben wird aktualisiert …");
    pollBalanceAfterPurchase();
  }
}

// Pollt das Guthaben, bis ein gesicherter Anstieg sichtbar ist (Webhook async) oder das Limit
// erreicht ist. before nur als Basis nehmen, wenn es bekannt (finite) ist — sonst lässt sich
// kein Anstieg beweisen und wir behaupten KEINE Bestaetigung (zeigen am Ende nur den Stand).
async function pollBalanceAfterPurchase() {
  const tok = settings.authToken;
  const before = Number.isFinite(creditsState.credits) ? creditsState.credits : null;
  for (let i = 0; i < 10; i++) {
    await new Promise((r) => setTimeout(r, 2000)); // Webhook ist async → erst warten, dann lesen
    if (settings.authToken !== tok) return; // Konto gewechselt/Logout → nicht weiterschreiben
    await refreshBalance();
    if (Number.isFinite(creditsState.credits) && before !== null && creditsState.credits > before) {
      setTopupMsg(`Guthaben aktualisiert: ${formatGuthabenEuro(creditsState.credits)}.`);
      return;
    }
  }
  // Kein sicherer Anstieg bestaetigt (Webhook evtl. minimal verzoegert, oder Ausgangsstand war
  // unbekannt). Neutral formulieren — KEIN Fehler, und nie einen veralteten Stand als bestaetigt.
  if (Number.isFinite(creditsState.credits)) {
    setTopupMsg(`Zahlung erhalten. Aktuelles Guthaben: ${formatGuthabenEuro(creditsState.credits)}.`);
  } else {
    setTopupMsg("Zahlung erhalten. Dein Guthaben erscheint in Kürze.");
  }
}

// Startet den Kauf: erst den signierten Checkout-Intent (bindet serverseitig die user.id)
// holen, dann das Paddle-Overlay oeffnen. Ohne Login/Token/Konfiguration sauber abbrechen
// statt zu werfen. _topupBusy verhindert Doppelklicks (zwei Intents/Overlays).
let _topupBusy = false;
async function startTopup(euros) {
  if (_topupBusy) return;
  if (!settings.authToken) { promptHostedLogin(); return; }
  _topupBusy = true;
  try {
    setTopupMsg("Aufladen wird vorbereitet …");
    let ud;
    try {
      const r = await fetch(hostedBase() + "/api/checkout-intent", { method: "POST", headers: authHeaders() });
      if (r.status === 401) { handleHostedUnauthorized(); return; }
      if (!r.ok) { setTopupMsg("Aufladen ist gerade nicht möglich. Bitte später erneut versuchen."); return; }
      const d = await r.json();
      ud = d && typeof d.ud === "string" ? d.ud : "";
    } catch { setTopupMsg("Keine Verbindung. Bitte Internetverbindung prüfen und erneut versuchen."); return; }
    if (!ud) { setTopupMsg("Aufladen ist gerade nicht möglich. Bitte später erneut versuchen."); return; }

    const cfg = paddleConfig();
    const priceId = cfg.prices[euros];
    if (!priceId) { setTopupMsg("Dieses Paket ist gerade nicht verfügbar."); return; }

    let Paddle;
    try { Paddle = await loadPaddle(); }
    catch { setTopupMsg("Aufladen ist gerade nicht verfügbar. Bitte später erneut versuchen."); return; }

    setTopupMsg("");
    Paddle.Checkout.open({
      items: [{ priceId, quantity: 1 }],
      customData: { ud }, // signierter Intent — der Webhook entnimmt die uid daraus
      settings: { displayMode: "overlay", locale: "de" },
    });
  } finally {
    _topupBusy = false; // Vorbereitung beendet; ab hier ist das (modale) Overlay zustaendig
  }
}

// Aufladen-Bereich oeffnen (vom Opus-Aufladen-Hinweis aus): in die Einstellungen, Konto-
// Bereich sichtbar machen und zum Aufladen-Block scrollen.
function openTopupDialog() {
  if (!settings.authToken) { promptHostedLogin(); return; }
  showView("view-settings");
  const t = $("topup");
  if (t && !t.classList.contains("hidden")) { try { t.scrollIntoView({ behavior: "smooth", block: "center" }); } catch {} }
}

// Zeichnet die Guthaben-Zeile aus dem aktuellen creditsState. Nur sichtbar, wenn das Flag an
// ist UND ein Stand bekannt ist. Idempotent — von allen Auffrisch-Stellen aufrufbar.
function renderBalanceLine() {
  const el = $("account-balance");
  if (!el) return;
  if (creditsState.creditsEnabled && Number.isFinite(creditsState.credits)) {
    const euro = formatGuthabenEuro(creditsState.credits);
    const cr = creditsState.credits.toLocaleString("de-DE");
    // euro/cr sind aus Zahlen formatiert (keine Nutzereingabe) → kein XSS-Risiko.
    el.innerHTML = `Guthaben: <strong>${euro}</strong> <span class="balance-credits">(${cr} Credits)</span>`;
    el.classList.remove("hidden");
  } else {
    el.textContent = "";
    el.classList.add("hidden");
  }
}

// Holt den aktuellen Guthaben-/Flag-Stand vom Worker und zeichnet die Zeile neu. Fehler/
// Offline: alten Cache behalten, nie werfen. Fuer Auffrischen nach Generierung/Kauf.
async function refreshBalance() {
  const tok = settings.authToken;
  if (!tok) { resetCreditsState(); renderCreditsUI(); return creditsState; }
  try {
    const r = await fetch(hostedBase() + "/api/balance", { headers: authHeaders() });
    // Ueberholt? Token wechselte/Logout waehrend des (Hintergrund-)Requests → diese Antwort
    // darf den creditsState eines anderen Kontos NICHT anwenden (wie bei /auth/me).
    if (settings.authToken !== tok) return creditsState;
    if (r.status === 401) { clearAuthToken(); resetCreditsState(); renderCreditsUI(); return creditsState; }
    if (r.ok) {
      const d = await r.json();
      if (settings.authToken !== tok) return creditsState; // nach dem json()-await erneut pruefen
      creditsState = {
        ...creditsState,
        credits: Number.isFinite(d.credits) ? d.credits : null,
        creditsEnabled: d.creditsEnabled === true,
        opusTestCredits: Number.isFinite(d.opusTestCredits) ? d.opusTestCredits : null,
        freeRemaining: Number.isFinite(d.freeRemaining) ? d.freeRemaining : null,
        loaded: true,
        dirty: false, // frisch bestaetigt
      };
    } else {
      // Kein frischer Stand bestaetigt (5xx/…) → den alten Geldstand NICHT als aktuell stehen
      // lassen, sondern als unbekannt ausblenden (gerade nach einer Abbuchung/Kauf). Auch
      // freeRemaining leeren, sonst koennte der Hinweis ein veraltetes Gratis-Kontingent zeigen.
      creditsState = { ...creditsState, credits: null, freeRemaining: null };
    }
  } catch {
    if (settings.authToken !== tok) return creditsState;
    creditsState = { ...creditsState, credits: null, freeRemaining: null }; // offline: Stand unbekannt, nicht stale zeigen
  }
  renderCreditsUI();
  return creditsState;
}

// Meldung aus der Redirect-Aufnahme, die beim naechsten Oeffnen der Einstellungen
// im Konto-Bereich angezeigt wird.
let _authRedirectMsg = "";

// Entfernt ALLE Auth-Parameter aus der URL (kein Token/Code im Verlauf/teilbar).
// code = Google-Handoff (neu), session = Alt-Worker-Bearer (Kompatibilitaetsfenster),
// auth = Magic-Token, auth_error = Abbruch.
function cleanAuthParamsFromUrl(params) {
  params.delete("code"); params.delete("session"); params.delete("auth"); params.delete("auth_error");
  const qs = params.toString();
  const url = location.pathname + (qs ? "?" + qs : "") + location.hash;
  try { history.replaceState(null, "", url); } catch { /* egal */ }
}

// sessionStorage-Schluessel fuer den OAuth-Verifier (PKCE-artige Browser-Bindung).
const OAUTH_VERIFIER_KEY = "bewerbungstool.oauthVerifier";

// SHA-256 als Hex (fuer den Verifier-Hash). crypto.subtle ist auf https/localhost da.
async function sha256hex(str) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function randomVerifier() {
  const a = new Uint8Array(32);
  crypto.getRandomValues(a);
  return btoa(String.fromCharCode(...a)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

// Nimmt nach Magic-Link/Google-Redirect das Token entgegen: ?code=<handoff> (Google) wird
// per /auth/exchange MIT dem in sessionStorage gehaltenen Verifier gegen die Session
// getauscht (kein durables Token in der URL, Browser-gebunden); ?auth=<magic> via
// /auth/magic/verify; ?auth_error=1 als abgebrochene Anmeldung.
// Gibt true zurueck, wenn ein Anmeldeversuch verarbeitet wurde.
async function consumeAuthRedirect() {
  let params;
  try { params = new URLSearchParams(location.search); } catch { return false; }
  const code = params.get("code");
  const magic = params.get("auth");
  const sess = params.get("session"); // nur Kompatibilitaetsfenster (Alt-Worker)
  const err = params.get("auth_error");
  if (!code && !magic && !sess && !err) return false;
  cleanAuthParamsFromUrl(params); // IMMER zuerst scrubben, egal welcher Pfad
  // Den OAuth-Verifier-Marker auf JEDEM terminalen Pfad raeumen (auch Abbruch), damit kein
  // Marker zurueckbleibt, der spaeter einen untergeschobenen Link legitimieren koennte (R10).
  const clearOAuthVerifier = () => { try { sessionStorage.removeItem(OAUTH_VERIFIER_KEY); } catch { /* egal */ } };
  if (err) { clearOAuthVerifier(); _authRedirectMsg = "Die Anmeldung wurde abgebrochen."; return true; }
  if (sess && !code && !magic) {
    // ?session=<bearer> wird NIE als Token uebernommen (Session-Fixation, Codex-Review R10):
    // ein roher Bearer in der URL ist nicht an diese Session gebunden und ein zurueck-
    // gebliebener Verifier-Marker wuerde eine "verifier vorhanden"-Pruefung aushebeln. Der
    // neue Worker stellt ?session ohnehin nicht mehr aus (nur den server-getauschten ?code).
    // Hier nur scrubben + Marker raeumen.
    clearOAuthVerifier();
    _authRedirectMsg = "Bitte melde dich erneut an.";
    return true;
  }
  if (code) {
    let verifier = "";
    try { verifier = sessionStorage.getItem(OAUTH_VERIFIER_KEY) || ""; } catch { /* egal */ }
    try { sessionStorage.removeItem(OAUTH_VERIFIER_KEY); } catch { /* egal */ }
    if (!verifier) { _authRedirectMsg = "Anmeldung in diesem Browser nicht erkannt. Bitte erneut anmelden."; return true; }
    try {
      const r = await fetch(hostedBase() + "/auth/exchange", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, verifier }),
      });
      if (r.ok) { const d = await r.json(); setAuthToken(d.token); _authRedirectMsg = "Erfolgreich angemeldet."; }
      else _authRedirectMsg = "Die Anmeldung ist fehlgeschlagen oder abgelaufen. Bitte erneut versuchen.";
    } catch { _authRedirectMsg = "Anmeldung fehlgeschlagen. Bitte erneut versuchen."; }
    return true;
  }
  try {
    const r = await fetch(hostedBase() + "/auth/magic/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: magic }),
    });
    if (r.ok) { const d = await r.json(); setAuthToken(d.token); _authRedirectMsg = "Erfolgreich angemeldet."; }
    else _authRedirectMsg = "Der Anmeldelink ist ungültig oder abgelaufen.";
  } catch { _authRedirectMsg = "Anmeldung fehlgeschlagen. Bitte erneut versuchen."; }
  return true;
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
// Sichtbarkeit über eine Klasse (nicht inline-style), damit die zentrierte
// Challenge-Darstellung (.challenge) per CSS gewinnen kann. Beim Ausblenden auch
// den Challenge-Zustand zuruecksetzen. aria-hidden spiegelt die Sichtbarkeit, damit
// eine verlangte Interaktion fuer Screenreader erreichbar ist.
function setTurnstileVisible(v) {
  const el = document.getElementById("turnstile-container");
  if (!el) return;
  el.classList.toggle("is-visible", v);
  if (!v) el.classList.remove("challenge");
  el.setAttribute("aria-hidden", v ? "false" : "true");
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
      // Nur wenn Cloudflare eine echte Interaktion verlangt, die Challenge zentriert
      // und abgedunkelt in den Fokus holen - sonst bliebe sie unten in der Ecke leicht
      // uebersehen und der Flow wirkte haengend. Stiller Pass bleibt unsichtbar.
      "before-interactive-callback": () => {
        const el = document.getElementById("turnstile-container");
        if (el) el.classList.add("challenge");
      },
      "after-interactive-callback": () => {
        const el = document.getElementById("turnstile-container");
        if (el) el.classList.remove("challenge");
      },
    });
    return _tsWidgetId != null;
  } catch {
    _tsWidgetId = null;
    return false;
  }
}

// Frisches, einmaliges Token fuer genau diese Aktion. Leerer String, wenn Turnstile
// nicht konfiguriert/bereit ist (dann muss der Worker SKIP_TURNSTILE gesetzt haben).
// cData (optional) bindet das Token an genau diesen Request: der Aufrufer uebergibt den
// SHA-256-Hex des exakt geposteten Bodys (bzw. des vh-Werts bei google-start); der Worker
// prueft data.cdata gegen den serverseitig neu berechneten Hash. So laesst sich ein
// abgegriffenes Token nicht auf eine andere Payload umhaengen.
async function getTurnstileToken(action, cData) {
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
      const execOpts = { action };
      if (cData) execOpts.cData = cData;
      window.turnstile.execute(_tsWidgetId, execOpts);
    } catch {
      if (_tsPending === finish) _tsPending = null;
      finish("");
      return;
    }
    // Haengt das Widget, den Aufruf nicht ewig blockieren.
    setTimeout(() => { if (_tsPending === finish) _tsPending = null; finish(""); }, 20000);
  });
}

// Stabile, nutzerfreundliche Meldungen fuer die Hosted-Fehlercodes (Plan A.3.5). Der optionale
// code stammt aus dem Fehler-BODY (z. B. bei 402) und erlaubt eine praezisere Meldung als der
// reine Status. Unbekannte/fehlende codes fallen defensiv auf die Status-Meldung zurueck.
function hostedErrorMessage(status, code) {
  if (status === 402) {
    switch (code) {
      case "quota-exhausted":
        // Gratis-Tageskontingent aufgebraucht. Der Generierungs-Pfad (startHostedGeneration)
        // faengt das ab und bietet den bezahlten Overflow per Dialog an; diese Meldung ist nur
        // ein defensiver Fallback, falls der Code anderswo durchschlaegt.
        return "Dein kostenloses Tageskontingent ist für heute aufgebraucht. Du kannst mit Guthaben weitermachen (in den Einstellungen aufladen) oder morgen kostenlos weiterüben.";
      case "no-credits":
        // Guthaben deckt den Opus-Test nicht (Aufladen-Dialog folgt in P4).
        return "Dein Guthaben reicht für die beste Qualität (Opus) nicht aus. Du kannst in den Einstellungen aufladen oder eine andere Qualitätsstufe wählen.";
      case "needs-paid-test":
      case "no-entitlement":
        return "Auswerten und Vertiefen in bester Qualität (Opus) gehören zu einem in Opus erstellten Test. Bitte erstelle den Test zuerst in bester Qualität.";
      // tier-locked u. a.: Stufe im kostenlosen Modus gesperrt (tritt bei ausgeblendeter
      // Opus-Option normal nicht auf — defensiv).
      default:
        return "Diese Qualitätsstufe ist im kostenlosen Modus nicht verfügbar.";
    }
  }
  switch (status) {
    case 403:
      return "Sicherheitsprüfung fehlgeschlagen. Bitte die Seite neu laden und erneut versuchen.";
    case 429:
      return "Gerade sind viele Anfragen unterwegs (oder dein Tageskontingent ist erreicht). Bitte kurz warten und erneut versuchen.";
    case 503:
      return "Das kostenlose Tageskontingent ist für heute erschöpft – morgen ist es wieder verfügbar. Wenn du sofort weitermachen möchtest, kannst du in den Einstellungen unter „Anbieter“ einen eigenen API-Schlüssel hinterlegen.";
    case 400:
      return "Die Anfrage war ungültig. Bitte die Stellenanzeige prüfen.";
    default:
      return "Der Dienst ist momentan nicht erreichbar. Bitte später erneut versuchen.";
  }
}

// Liest den Fehlercode aus dem JSON-Body einer Nicht-OK-Antwort (Feld "error"); fehlt er oder
// ist der Body kein JSON, null. Defensiv — wirft nie. Nur fuer Fehlerantworten gedacht.
async function hostedErrorCode(res) {
  try { const d = await res.json(); return d && typeof d.error === "string" ? d.error : null; }
  catch { return null; }
}

// Hosted-Aufruf: schickt strukturierte DATEN (keine Prompts) an den app-spezifischen
// Worker-Endpoint; der Worker baut Prompt + Schema und streamt im OpenAI-SSE-Format
// zurueck, sodass readSSEText/parseJsonLoose unveraendert greifen. Kosten bleiben im
// Hosted-Modus verborgen (fuer den Nutzer gratis) → cost/tokens null.
async function callHosted(hosted, onProgress, opts = {}) {
  if (!hosted || !hosted.action) {
    throw new Error("Interner Fehler: Hosted-Aufruf ohne Aktion.");
  }
  requireHostedLoginOrThrow(); // Backstop: Anmeldung Pflicht
  const tier = tierForHostedCall(hosted.payload);
  const body = JSON.stringify({ ...hosted.payload, tier });
  const headers = { "Content-Type": "application/json", ...authHeaders() };
  // cData an genau diesen Body binden (Hash des exakt gesendeten Strings).
  const token = await getTurnstileToken(hosted.action, await sha256hex(body));
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

  if (res.status === 401) { handleHostedUnauthorized(); throw new Error(LOGIN_REDIRECT); }
  if (!res.ok) throw new Error(hostedErrorMessage(res.status, await hostedErrorCode(res)));

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

/* ---------- Layer 1: schema.org JobPosting (JSON-LD) ---------- */

// Fast jedes Jobportal bettet einen schema.org-JobPosting-Block als JSON-LD ein
// (Google Jobs verlangt ihn). Jinas Markdown-Modus verwirft ihn; im HTML-Modus
// (Header X-Return-Format: html, gleicher Endpoint, gleiches CORS - per OPTIONS
// gegen jobreif.de verifiziert) bleibt er erhalten. Aus diesem Block laesst sich
// portalunabhaengig sauberer Text bauen, ohne Navigations-Rauschen. Alles
// best-effort: schlaegt irgendetwas fehl, faellt fetchJobFromUrl still auf den
// bisherigen Markdown-Pfad zurueck.

// Sucht in einem geparsten JSON-LD-Wert (Objekt, Array, @graph, beliebig tief
// verschachtelt) alle Objekte, deren @type "JobPosting" ist oder enthaelt.
// Tiefe begrenzt, damit zirkulaere/uebergrosse Strukturen nicht haengenbleiben.
function collectJobPostings(node, out, depth) {
  if (!node || typeof node !== "object" || depth > 6) return out;
  if (Array.isArray(node)) {
    for (const item of node) collectJobPostings(item, out, depth + 1);
    return out;
  }
  const t = node["@type"];
  const types = Array.isArray(t) ? t : [t];
  if (types.some((x) => typeof x === "string" && x.toLowerCase() === "jobposting")) {
    out.push(node);
  }
  // @graph und andere verschachtelte Container ebenfalls durchsuchen
  for (const key of Object.keys(node)) {
    const v = node[key];
    if (v && typeof v === "object") collectJobPostings(v, out, depth + 1);
  }
  return out;
}

// Liest einen Namen defensiv: hiringOrganization kann String, Objekt mit name,
// oder ein Array davon sein.
function jsonLdName(v) {
  if (typeof v === "string") return v.trim();
  if (Array.isArray(v)) return v.map(jsonLdName).filter(Boolean).join(", ");
  if (v && typeof v === "object" && typeof v.name === "string") return v.name.trim();
  return "";
}

// Baut aus jobLocation einen lesbaren Ortsstring (Objekt oder Array von
// PostalAddress/Place). HTML-Strip via stripFn, damit auch hier keine Tags
// durchrutschen.
function jsonLdLocation(v, stripFn) {
  if (!v) return "";
  if (Array.isArray(v)) {
    return v.map((x) => jsonLdLocation(x, stripFn)).filter(Boolean).join(" / ");
  }
  if (typeof v === "string") return stripFn(v);
  if (typeof v !== "object") return "";
  const addr = v.address && typeof v.address === "object" ? v.address : v;
  const parts = [addr.addressLocality, addr.addressRegion, addr.postalCode, addr.addressCountry]
    .map((p) => (typeof p === "string" ? stripFn(p) : (jsonLdName(p) || "")))
    .filter(Boolean);
  // Place ohne Adressfelder, aber mit Name (z. B. nur "Berlin"): Name nutzen.
  if (!parts.length) return jsonLdName(v);
  return parts.join(", ");
}

// baseSalary defensiv: value kann MonetaryAmount mit value/minValue/maxValue sein.
function jsonLdSalary(v, stripFn) {
  if (!v || typeof v !== "object") return typeof v === "string" ? stripFn(v) : "";
  const cur = typeof v.currency === "string" ? v.currency : "";
  const val = v.value && typeof v.value === "object" ? v.value : v;
  const amount =
    val.value != null
      ? String(val.value)
      : [val.minValue, val.maxValue].filter((x) => x != null).join("-");
  if (!amount) return "";
  const unit = typeof val.unitText === "string" ? val.unitText : "";
  return [cur, amount, unit].filter(Boolean).join(" ").trim();
}

// Setzt aus einem JobPosting-Objekt sauberen Text zusammen. stripFn entfernt
// HTML (im Browser via DOMParser, im Test injizierbar). Gibt "" zurueck, wenn
// keine brauchbare Beschreibung vorhanden ist - dann greift der Fallback.
function jobPostingToText(job, stripFn) {
  if (!job || typeof job !== "object") return "";
  const description = stripFn(typeof job.description === "string" ? job.description : "");
  // Ohne substanzielle Beschreibung lieber den Markdown-Fallback nutzen, der
  // unter Umstaenden mehr Fliesstext findet.
  if (description.replace(/\s+/g, " ").trim().length < 200) return "";

  const empType = Array.isArray(job.employmentType)
    ? job.employmentType.filter((x) => typeof x === "string").join(", ")
    : (typeof job.employmentType === "string" ? job.employmentType : "");

  const lines = [];
  if (typeof job.title === "string" && job.title.trim()) lines.push(job.title.trim());
  const org = jsonLdName(job.hiringOrganization);
  if (org) lines.push("Arbeitgeber: " + org);
  const loc = jsonLdLocation(job.jobLocation, stripFn);
  if (loc) lines.push("Standort: " + loc);
  if (empType) lines.push("Beschäftigungsart: " + stripFn(empType));
  const sal = jsonLdSalary(job.baseSalary, stripFn);
  if (sal) lines.push("Gehalt: " + sal);
  lines.push("");
  lines.push(description.trim());
  return lines.join("\n").trim();
}

// Wandelt einen HTML-Fragmentstring in reinen Text (Entities aufgeloest,
// Whitespace normalisiert). Nutzt DOMParser -> totes Dokument, keine
// Skriptausfuehrung, kein XSS/CSP-Problem.
function stripHtmlToText(html) {
  if (!html) return "";
  if (typeof DOMParser === "undefined") {
    // Sehr defensiver Fallback (z. B. exotische Umgebung): grobes Tag-Entfernen
    return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  }
  const doc = new DOMParser().parseFromString(String(html), "text/html");
  return (doc.body ? doc.body.textContent : "").replace(/ /g, " ").replace(/[ \t]+/g, " ").trim();
}

// Holt das rohe HTML einer URL ueber Jina (HTML-Modus), parst alle
// JSON-LD-Bloecke tolerant und liefert bei Fund eines brauchbaren JobPosting
// den zusammengesetzten Text - sonst "".
// Obergrenze fuer das geparste HTML: schuetzt den DOMParser vor uebergrossen
// oder boesartigen Antworten, bevor der bewaehrte Markdown-Pfad greift.
const JSONLD_HTML_MAX = 4 * 1024 * 1024; // 4 MB
const JSONLD_FETCH_TIMEOUT_MS = 15000;

async function fetchJobPostingJsonLd(u) {
  if (typeof DOMParser === "undefined") return "";
  let html;
  // Timeout, damit ein haengender HTML-Abruf den Import nicht blockiert -
  // bei Abbruch faellt fetchJobFromUrl auf den Markdown-Pfad zurueck.
  const ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
  const timer = ctrl ? setTimeout(() => ctrl.abort(), JSONLD_FETCH_TIMEOUT_MS) : 0;
  try {
    const res = await fetch("https://r.jina.ai/" + u, {
      headers: { "X-Return-Format": "html" },
      signal: ctrl ? ctrl.signal : undefined,
    });
    if (!res.ok) return "";
    html = await res.text();
  } catch {
    return "";
  } finally {
    if (timer) clearTimeout(timer);
  }
  if (!html) return "";
  // Uebergrosses HTML gar nicht erst parsen - lieber der Markdown-Pfad.
  if (html.length > JSONLD_HTML_MAX) return "";
  let doc;
  try {
    doc = new DOMParser().parseFromString(html, "text/html");
  } catch {
    return "";
  }
  const blocks = doc.querySelectorAll('script[type="application/ld+json"]');
  const jobs = [];
  blocks.forEach((el) => {
    let parsed;
    try {
      // JSON-LD ist gelegentlich kaputt (z. B. nackte Zeilenumbrueche in
      // Strings). Ein fehlerhafter Block darf die anderen nicht killen.
      parsed = JSON.parse(el.textContent);
    } catch {
      return;
    }
    collectJobPostings(parsed, jobs, 0);
  });
  if (!jobs.length) return "";
  // Mehrere JobPostings (z. B. die Detailanzeige plus verwandte Stellen):
  // collectJobPostings liefert sie in Dokumentreihenfolge - die primaere
  // Anzeige (oft im ersten/mainEntity-Block) steht typischerweise vorn. Den
  // ERSTEN Block mit brauchbarer Beschreibung nehmen statt blind den laengsten
  // (eine ausfuehrliche "verwandte Stelle" wuerde sonst die eigentliche Anzeige
  // verdraengen). jobPostingToText gibt "" zurueck, wenn die Beschreibung zu
  // duenn ist, also ueberspringen wir solche Bloecke automatisch.
  for (const job of jobs) {
    const text = jobPostingToText(job, stripHtmlToText);
    if (text) return text;
  }
  return "";
}

async function fetchJobFromUrl(url) {
  // Layer 1 (primaer): portalunabhaengiges JobPosting-JSON-LD aus dem rohen
  // HTML. Best-effort - bei jedem Fehlschlag still weiter zum Markdown-Pfad.
  try {
    const jsonLd = await fetchJobPostingJsonLd(url);
    // Dieselbe Schwelle wie der Aufrufer (looksLikeRealContent): so faellt ein
    // duenner JSON-LD-Treffer auf den Markdown-Pfad zurueck, statt ihn als
    // unvollstaendigen Text zu uebernehmen (Konsistenz der Fallback-Kette).
    if (jsonLd && looksLikeRealContent(jsonLd)) return jsonLd;
  } catch {
    // egal was schiefgeht: unten der bewaehrte Markdown-Pfad
  }

  // Layer 2 (Fallback, unveraendert):
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

// Modul "sprachlogik" (Plan 3.7): verbale Logik-Aufgaben. Reiner MC-Alias - sie rendern,
// normalisieren, scoren und werden angezeigt EXAKT wie multiple_choice (eigene Kategorie/Typ
// nur fuer Generierung + spaetere SEO). mcLike() buendelt "verhaelt sich wie MC".
function mcLike(typ) {
  return typ === "multiple_choice" || typ === "sprachlogik";
}

// true, wenn die Frage als Mehrfachauswahl behandelt werden soll. Haengt an der
// Zahl der RICHTIGEN Optionen, nicht an einem Schema-Flag: liefert das Modell
// faelschlich nur eine richtige Option, faellt die Frage automatisch auf
// sauberes Single-Choice zurueck.
function mcIsMulti(q) {
  return mcLike(q.typ) && mcCorrectIndices(q).size > 1;
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

// Antwortfreier Identitaetsschluessel fuer Reports - bewusst OHNE korrekte_antwort
// (anders als fragenKey). Sonst koennte eine im aktiven Pruefungsmodus gemeldete
// Frage die Loesung ueber den persistierten/exportierten Report-Schluessel
// verraten. Frage + Typ + (sortierte) Optionen reichen zur Frage-Identitaet fuer
// das Dedup pro Stelle; Optionen sortiert = reihenfolge-unabhaengig.
function reportFrageKey(q) {
  const optionen = Array.isArray(q.optionen) ? q.optionen.map(normText).sort() : [];
  return [normText(q.frage), mcLike(q.typ) ? "mc" : "offen", ...optionen].join(" | ");
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
        norm = normalizeQuizData(out.data, jobText);
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
  if ((settings.provider || "hosted") !== "local" || reviewing) return;
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
  trackEvent("resolve");
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
    // Phase B: jobId des aktuellen (ggf. bezahlten) Tests mitschicken → Vertiefen laeuft bei
    // "beste" ueber das Follow-up-Entitlement statt eines erneuten Credit-Abzugs. Nur wenn vorhanden.
    hosted: { action: "themenfelder", payload: { jobText: job.jobText || "", schwaechen: buildSchwaechenSummary(job), ...(quiz && quiz.jobId ? { jobId: quiz.jobId } : {}) } },
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
async function saveThemenfelder(job, derived, level) {
  const themenfelder = {
    v: 1,
    generatedAt: Date.now(),
    generatedAtLevel: level,
    fields: derived.fields,
    cost: derived.cost,
    tokens: derived.tokens,
  };
  await mutateHistory((h) => {
    const target =
      (job.urlKey && h.jobs.find((j) => j.urlKey === job.urlKey)) ||
      (job.key && h.jobs.find((j) => j.key === job.key)) ||
      (job.identityKey && h.jobs.find((j) => j.identityKey === job.identityKey));
    // Nur schreiben, wenn es die Stelle gibt UND wir keine gleich neuen oder
    // neueren Themenfelder ueberschreiben. >= statt >: bei exakt gleichem
    // generatedAt (Same-Millisecond-Race zweier Tabs) ist der gespeicherte Stand
    // gleich frisch - dann nicht ueberschreiben. Sonst false zurueckliefern: kein
    // No-op-Write (s. mutateHistory), damit ein bloss abgeleiteter, aber nicht
    // uebernommener Stand unter Quota-Druck keine echten Versuche verdraengt.
    if (!target || (target.themenfelder && target.themenfelder.generatedAt >= themenfelder.generatedAt)) {
      return false;
    }
    target.themenfelder = themenfelder;
  });
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
  // Auf das Tier-Maximum klemmen (Sicherheitsnetz, falls der Stepper nach einem
  // Stufenwechsel noch einen hoeheren Wert traegt): guenstig nie ueber NUM_MAX_GUENSTIG.
  const numQuestions = clampNum(Number($("num-questions").value) || 10);
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
  const isLocal = (settings.provider || "hosted") === "local";
  const isHosted = (settings.provider || "hosted") === "hosted";

  // Stabile URL-Identitaet jetzt festhalten (lastFetch kann sich bis zur
  // Fertigstellung aendern, v. a. im asynchronen Hosted-Flow).
  let urlKey = null, jobUrl = null;
  if (lastFetch.url && jobText === lastFetch.text) {
    const uk = urlKeyOf(lastFetch.url);
    if (uk) { urlKey = uk; jobUrl = lastFetch.url; }
  }
  const vertiefungFelder = vertiefung ? vertiefung.felder.map((f) => ({ id: f.id, label: f.label })) : null;

  // Opus gewuenscht? Vor dem Dispatch FAIL-CLOSED pruefen: eine bewusst bezahlte Auswahl darf
  // nie still als standard durchrutschen. Nur weiter, wenn frisch bestaetigt ist, dass Opus
  // gedeckt ist; sonst mit klarer Meldung abbrechen (statt heimlich downzugraden).
  // Nur pruefen, wenn ueberhaupt ein Token da ist: ohne Anmeldung uebernimmt
  // startHostedGeneration den Login-Prompt — der Opus-Gate darf den NICHT mit einem
  // Guthaben-/Offline-Fehler verdecken.
  if (isHosted && settings.tier === "beste" && settings.authToken) {
    // Frisch nachladen, wenn unbekannt ODER moeglicherweise veraltet (nach einer Abbuchung) —
    // sonst koennte ein zweiter Opus-Test auf stale Guthaben gestartet werden.
    if (!creditsState.loaded || creditsState.dirty) await refreshBalance();
    // refreshBalance() kann (a) settings.tier ueber updateTierOptions auf standard normalisiert
    // haben (Flag bestaetigt aus) oder (b) bei 401 das Token verworfen haben. In beiden Faellen
    // hier NICHT blockieren: dann greift entweder normale standard-Generierung oder der
    // Login-Pfad in startHostedGeneration.
    if (settings.authToken && settings.tier === "beste") {
      if (!creditsState.loaded) {
        // Entitlement liess sich nicht bestaetigen (Balance-Abruf fehlgeschlagen/offline).
        showError("Die beste Qualität (Opus) konnte gerade nicht bestätigt werden. Bitte Verbindung prüfen und erneut versuchen, oder in den Einstellungen eine andere Qualitätsstufe wählen.");
        return;
      }
      if (!canAffordBeste()) {
        // Flag an, aber Guthaben deckt keinen Opus-Test → NICHT still downgraden, sondern
        // klar aufs Aufladen/eine andere Stufe hinweisen (die Absicht bleibt erhalten).
        showError(`Dein Guthaben reicht für die beste Qualität (Opus) nicht aus (etwa ${formatGuthabenEuro(requiredOpusCredits())} pro Test). Du kannst in den Einstellungen aufladen oder eine andere Qualitätsstufe wählen.`);
        return;
      }
    }
  }

  // Erst hier zaehlen: nach der Ersetzen-Rueckfrage und allen Vor-Checks, unmittelbar
  // vor dem tatsaechlichen Generierungs-Dispatch (kein Zaehlen fuer abgebrochene Laeufe).
  trackEvent("quiz-generate");

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
      profile: profilePayload(), // optionales, validiertes Bewerber-Profil (nur Hosted)
      gespraechsstufe: gespraechsstufePayload(), // optionale Interviewrunde (nur Hosted)
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
        "der sich gut als Suchbegriff eignet. " +
        "Extrahiere zusätzlich die wichtigsten Kernpunkte der Stelle (Aufgaben, zwingende und optionale Anforderungen, " +
        "Besonderheiten) ausschliesslich aus dem Anzeigentext. Erfinde nichts und leite " +
        "nichts her - was nicht ausdrücklich im Text steht, lässt du leer (leerer String bzw. leeres Array). Formuliere " +
        "jeden Punkt knapp. Zu JEDEM Kernpunkt gehört ein beleg = ein WÖRTLICHES, exakt " +
        "aus dem Anzeigentext kopiertes Zitat (kein paraphrasiertes), das die Aussage stützt. Nimm einen Kernpunkt NUR " +
        "auf, wenn es ein solches wörtliches Zitat im Text gibt; sonst lass die Kategorie leer. Anforderungen " +
        "nur bei wörtlicher Deckung. Beziehe dich AUSSCHLIESSLICH auf DIESE eine ausgeschriebene Stelle: " +
        "verwende KEINE Angaben aus Navigation, Cookie-/Footer-Hinweisen, Werbeblöcken oder Teasern für ANDERE bzw. " +
        "ähnliche Stellen, die im Seitentext mitkopiert sein können - auch wenn dort etwa ein Gehalt oder Benefit steht. " +
        "Im Zweifel die Kategorie leer lassen. ";

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
      provider: settings.provider || "hosted",
      // Dieser Pfad ist immer NICHT-hosted (hosted kehrt vorher ueber startHostedGeneration
      // zurueck) — die Stufe ist hier ein reines BYOK/lokal-Provenienzfeld; wie bisher
      // unveraendert uebernehmen (kein Opus-Clamp, der nur den Hosted-Pfad betrifft).
      tier: settings.tier || null,
      model: settings.model || null,
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
// Kernpunkte schon beim FERTIGSTELLEN der Generierung verfuegbar machen (nicht erst
// beim Abschluss via saveAttempt), damit die Uebersicht "Das Wichtigste auf einen
// Blick" erscheint, ohne dass man den Test erst komplett durchspielen muss.
//
// BEWUSST in einem GETRENNTEN Komfort-Cache (kpKernpunkteCache), NICHT in der
// Versuchs-Historie: dieser Schreibvorgang kann aus dem Hosted-Polling im Hintergrund
// laufen, waehrend in einem anderen Tab gerade ein echter Versuch gespeichert wird.
// Wuerden wir den gesamten Historie-Snapshot zurueckschreiben, koennte ein parallel
// gespeicherter Versuch verloren gehen (Cross-Tab-Lost-Update). Der Komfort-Cache ist
// von der Historie entkoppelt: sein Verlust ist harmlos (Panel erscheint dann erst nach
// Abschluss), und er kann NIE einen Versuch verdraengen. saveAttempt schreibt die
// Kernpunkte beim Abschluss in die Historie; job.kernpunkte hat beim Anzeigen Vorrang.
// Vertiefungsboegen werden uebersprungen (wie in saveAttempt) - ihr verengtes Quiz
// darf die Stellen-Kernpunkte nicht ueberschreiben.
function persistKernpunkteForActiveJob(q) {
  if (!q || !q.kernpunkte || typeof q.kernpunkte !== "object") return;
  if (Array.isArray(q.vertiefungFelder) && q.vertiefungFelder.length) return;
  let key;
  try { key = jobKey(q.jobText); } catch { return; }
  if (!key) return;
  // srcUrl-Provenienz: aktuelle Quell-URL, sonst eine bereits bekannte srcUrl desselben
  // Textes bewahren (kein Flackern des Original-Links).
  const prev = cachedKernpunkte(key);
  const prevSrcUrl = prev && prev.srcKey === key && typeof prev.srcUrl === "string" ? prev.srcUrl : "";
  const srcUrl = typeof q.jobUrl === "string" && q.jobUrl ? q.jobUrl : prevSrcUrl;
  cacheKernpunkte(key, { v: 1, generatedAt: Date.now(), srcKey: key, srcUrl, data: q.kernpunkte });
}

function finalizeQuiz(result, ctx) {
  quiz = normalizeQuizData(result, ctx.jobText);
  quiz.jobText = ctx.jobText;
  if (ctx.urlKey) { quiz.urlKey = ctx.urlKey; quiz.jobUrl = ctx.jobUrl; }
  quiz.schwierigkeitsgrad = ctx.difficulty;
  if (ctx.vertiefungFelder) quiz.vertiefungFelder = ctx.vertiefungFelder;
  quiz.genCost = ctx.genCost ?? null;
  quiz.genTokens = ctx.genTokens ?? null;
  // Generierungs-Provenienz festhalten (Anbieter/Tier/Modell, mit dem dieses
  // Quiz erstellt wurde). Reports nutzen sie statt der aktuellen Einstellungen,
  // damit eine spaeter geaenderte Anbieterwahl oder das Melden aus der Review die
  // Herkunft nicht verfaelscht. Alte/aktive Jobs ohne diese Felder -> null.
  quiz.provenance = {
    provider: ctx.provider || null,
    tier: ctx.tier || null,
    model: ctx.model || null,
  };
  // Phase B (Credits): die generierende jobId aufs Quiz durchreichen, damit Auswerten/
  // Vertiefen eines bezahlten (Opus-)Tests serverseitig dem Job zugeordnet werden koennen
  // (Follow-up-Entitlement). Additiv; alte/synchron erzeugte Quizze ohne jobId bleiben heil.
  if (ctx.jobId) quiz.jobId = ctx.jobId;
  // Kernpunkte sofort an eine bereits bestehende Stelle schreiben, damit die
  // Uebersicht ohne Test-Abschluss erscheint (saveAttempt schreibt sie beim
  // Abschluss ohnehin erneut - idempotent).
  persistKernpunkteForActiveJob(quiz);
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

// Sendet den Generierungs-Request an /api/jobs. payWithCredits=true nur fuer den bestaetigten
// Gratis-Overflow (Gratis-Kontingent aufgebraucht). Der Body wird je Aufruf frisch gebaut und
// der Turnstile-cData-Hash exakt daran gebunden — auch der Overflow-Retry braucht einen frischen
// Token (Turnstile-Tokens sind Einmal-Tokens). Liefert die rohe Response.
function postGenerationJob(ctx, tierSent, payWithCredits) {
  const jobBody = JSON.stringify({
    jobText: ctx.jobText,
    numQuestions: ctx.numQuestions,
    difficulty: ctx.difficulty,
    vertiefung: ctx.vertiefung,
    tier: tierSent,
    ...(ctx.profile ? { profile: ctx.profile } : {}), // nur senden, wenn gesetzt (abwaertskompatibel)
    ...(ctx.gespraechsstufe ? { gespraechsstufe: ctx.gespraechsstufe } : {}), // nur senden, wenn gewaehlt
    ...(payWithCredits ? { payWithCredits: true } : {}),
  });
  return (async () => {
    const token = await getTurnstileToken("generate-quiz", await sha256hex(jobBody));
    const headers = { "Content-Type": "application/json", ...authHeaders() };
    if (token) headers["CF-Turnstile-Token"] = token;
    return fetch(hostedBase() + "/api/jobs", { method: "POST", headers, body: jobBody });
  })();
}

// Startet einen serverseitigen Generierungsjob (Turnstile einmal beim Start) und kehrt
// sofort zurueck; die Erstellung laeuft im Hintergrund (Worker-DO), tab-unabhaengig.
async function startHostedGeneration(ctx) {
  if (actionRunning) return;
  if (hostedNeedsLogin()) { promptHostedLogin(); return; } // Backstop: Anmeldung Pflicht
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
    // Stufe einmal bestimmen und konsistent fuer Body UND Provenienz verwenden.
    const tierSent = effectiveTier();
    let paidOverflow = false; // wurde der Test per Gratis-Overflow (Kontingent aufgebraucht) bezahlt?
    let res = await postGenerationJob(ctx, tierSent, false);
    // 402 quota-exhausted = Gratis-Tageskontingent aufgebraucht. Erst NACH ausdruecklicher
    // Bestaetigung erneut senden (payWithCredits:true) — keine unbeabsichtigten Kosten.
    if (res.status === 402) {
      const body = await res.json().catch(() => ({}));
      if (body && body.error === "quota-exhausted") {
        hideLoading();
        const price = Number.isFinite(body.priceCredits) ? body.priceCredits : tierPriceCredits(tierSent);
        const have = Number.isFinite(body.credits) ? body.credits
          : (Number.isFinite(creditsState.credits) ? creditsState.credits : 0);
        if (have < price) {
          // Guthaben deckt keinen weiteren Test → Aufladen anbieten, NICHTS starten/abbuchen.
          refreshBalance();
          showError("Dein kostenloses Tageskontingent ist für heute aufgebraucht und dein Guthaben reicht für einen weiteren Test nicht aus. Du kannst in den Einstellungen aufladen.");
          openTopupDialog();
          return;
        }
        // Opt-in "automatisch Guthaben verwenden": der Nutzer hat dauerhaftes Einverstaendnis
        // gegeben (Einstellung, Default aus) UND sieht den Kostenhinweis an der Stufe → kein
        // Dialog. Sonst pro Test bestaetigen (keine unbeabsichtigten Kosten, CLAUDE.md).
        const ok = settings.autoUseCredits ? true
          : await openOverflowConfirm({ tier: body.tier || tierSent, priceCredits: price });
        if (!ok) { refreshBalance(); return; } // abgebrochen → kein Test, kein Charge
        showLoading("Test wird gestartet...");
        res = await postGenerationJob(ctx, tierSent, true);
        paidOverflow = true;
      } else {
        // Anderer 402 (z. B. no-credits bei Opus, tier-locked) → normale Fehlermeldung. Der Body
        // wurde bereits gelesen, daher hier direkt mappen statt erneut hostedErrorCode(res).
        markCreditsDirtyIfPaid(tierSent);
        throw new Error(hostedErrorMessage(402, body && typeof body.error === "string" ? body.error : null));
      }
    }
    if (res.status === 401) { handleHostedUnauthorized(); throw new Error(LOGIN_REDIRECT); }
    if (!res.ok) {
      // Request abgelehnt (z. B. Preisdrift/anderswo verbraucht): den Guthaben-Cache als
      // veraltet markieren+auffrischen, statt weiter auf stale Credits zu vertrauen.
      markCreditsDirtyIfPaid(tierSent);
      if (paidOverflow) refreshBalance(); // fehlgeschlagener Overflow → Stand neu holen
      throw new Error(hostedErrorMessage(res.status, await hostedErrorCode(res)));
    }
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
        // Provenienz fuer Reports (Hosted-Pfad): Modell baut der Server -> model null.
        provider: "hosted", tier: tierSent, model: null,
        // Gratis-Stufen-Overflow per Guthaben bezahlt? Dann auch bei spaeterem (asynchronem)
        // Job-Fehler+Refund das Guthaben auffrischen — markCreditsDirtyIfPaid greift sonst nur
        // fuer "beste". (additiv, alte Job-Eintraege ohne das Feld lesen defensiv als false.)
        paidOverflow,
      },
    });
    // Guthaben/Gratis-Kontingent haben sich durch den Start veraendert: ein bezahlter Opus-
    // ODER Overflow-Job hat Credits gekostet, ein Gratis-Job einen freien Test verbraucht.
    // markCreditsDirtyIfPaid deckt den Opus-Fall (dirty + Refresh) ab; refreshBalance holt
    // zusaetzlich freeRemaining (Gratis-Stufen) und das Guthaben nach dem Overflow nach.
    markCreditsDirtyIfPaid(tierSent);
    if (paidOverflow || creditsState.creditsEnabled) refreshBalance();
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
    r = await fetch(hostedBase() + "/api/jobs/" + encodeURIComponent(job.jobId), { headers: authHeaders() });
  } catch {
    scheduleJobPoll(5000); // Netzfehler/Offline: spaeter erneut versuchen, Job behalten
    return;
  }
  if (r.status === 401) {
    // Sitzung waehrend der Erstellung abgelaufen: Job NICHT verwerfen (laeuft serverseitig
    // weiter), zur Anmeldung fuehren, Poll pausieren. Nach erneutem Login laedt die Seite
    // neu und resumeActiveJob nimmt das Pollen wieder auf.
    handleHostedUnauthorized();
    return;
  }
  if (r.status === 403) {
    // Der gemerkte Job gehoert einem anderen Konto (z. B. Kontowechsel auf diesem Geraet):
    // lokalen Zeiger verwerfen, nicht weiter pollen (Job-Isolation, Codex-Review).
    clearActiveJob();
    renderActiveJobCard(null);
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
    // Kernpunkte schon JETZT (bei Fertigstellung, vor "Loslegen") an eine bestehende
    // Stelle schreiben, damit die Uebersicht ohne Durchspielen erscheint — der Hosted-
    // Pfad finalisiert sonst erst beim "Loslegen" (startReadyJob -> finalizeQuiz). Wir
    // verifizieren das rohe Server-Ergebnis gegen ctx.jobText (normalizeKernpunkte) und
    // nutzen denselben Helper/dieselben Garantien wie finalizeQuiz — OHNE die Quiz-
    // Session zu starten oder den aktiven Job zu loeschen.
    try {
      const c = job.ctx || {};
      const kpNorm = normalizeKernpunkte(data.quiz.kernpunkte, c.jobText);
      if (kpNorm) {
        persistKernpunkteForActiveJob({ kernpunkte: kpNorm, jobText: c.jobText, jobUrl: c.jobUrl, vertiefungFelder: c.vertiefungFelder });
      }
    } catch { /* reines Komfort-Update: Fehler ignorieren, saveAttempt schreibt spaeter */ }
    renderActiveJobCard("ready");
    // Bezahlter Opus-Job fertig → Guthaben-Cache nachziehen (Anzeige + naechste Opus-Pruefung).
    refreshCreditsAfterJob(job.ctx);
  } else if (data.status === "done") {
    // Defensiv: "done" ohne Quiz ist ein Serverfehler — nicht endlos weiter pollen.
    clearActiveJob();
    renderActiveJobCard("error");
    showError(jobErrorMessage("unknown"));
    // Wie der error-Zweig: ein bezahlter Opus-Job kann rueckerstattet werden → Guthaben nachziehen.
    refreshCreditsAfterJob(job.ctx);
  } else if (data.status === "error") {
    clearActiveJob();
    renderActiveJobCard("error");
    showError(jobErrorMessage(data.code));
    // Fehlgeschlagener Opus-Job wird serverseitig ggf. rueckerstattet → Guthaben nachziehen.
    refreshCreditsAfterJob(job.ctx);
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
  finalizeQuiz(job.quiz, { ...job.ctx, jobId: job.jobId, genCost: null, genTokens: null, isLocal: false });
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

  if (mcLike(q.typ) && mcIsMulti(q)) {
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
          saveLearnSession();
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
  } else if (mcLike(q.typ)) {
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
  } else if (q.typ === "zahlenreihe") {
    // Zahlenreihe (Plan 3.7): eigenes Numeric-Eingabefeld fuer die gesuchte Zahl. Antwort als
    // String in answers[current] (wie alle Typen); Bewertung laeuft lokal/deterministisch.
    const wrap = document.createElement("div");
    wrap.className = "zahlenreihe-input";
    const input = document.createElement("input");
    input.type = "text";
    input.inputMode = "decimal";
    input.autocomplete = "off";
    input.className = "zr-field";
    input.setAttribute("aria-label", "Deine Antwort als Zahl");
    input.placeholder = "Deine Antwort (Zahl)";
    input.value = answers[current] || "";
    if (locked) {
      input.readOnly = true;
      // Im aufgeloesten/Review-Zustand richtig/falsch einfaerben (defensiv: leere/krumme
      // Eingabe gilt als falsch).
      if (isRevealed) {
        const ist = parseZahl(answers[current]);
        const soll = parseZahl(q.korrekte_antwort);
        const ok = Number.isFinite(ist) && Number.isFinite(soll) && Math.abs(ist - soll) < 1e-9;
        input.classList.add(ok ? "zr-correct" : "zr-wrong");
      }
    } else {
      input.addEventListener("input", () => { answers[current] = input.value; saveLearnSessionDebounced(); });
      input.addEventListener("blur", saveLearnSession);
    }
    wrap.appendChild(input);
    area.appendChild(wrap);
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

  // "Frage melden" in einem eigenen, stets befuellten Slot - so erscheint der
  // Knopf in Lern- UND Pruefungsmodus (renderLearnArea steigt im Pruefungsmodus
  // frueh aus). Rein lokal, loest keinen API-Call aus.
  const reportArea = $("report-area");
  reportArea.innerHTML = "";
  // answersSecret: im aktiven Pruefungsmodus (vor der Auswertung) darf die
  // Meldung die korrekte Antwort NICHT mitspeichern - sonst koennte man eine Frage
  // melden und die Loesung ueber Export/localStorage vor der Bewertung auslesen.
  appendReportButton(reportArea, q, { ...reportKontextAktiv(), answersSecret: mode === "pruefung" && !reviewing });

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
    saveLearnSession();
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
      // targetIdx wird in onMove aus `others` bestimmt - der Liste OHNE das
      // gezogene Element. Nach dem o.splice(startIdx, 1) ist `o` exakt dasselbe
      // Koordinatensystem (gleiche Reihenfolge ohne moved), also ist targetIdx
      // direkt die Einfuegeposition. KEINE zusaetzliche -1-Korrektur (die wuerde
      // Abwaertsbewegungen falsch einfuegen: Drop nach unten landet eine Position
      // zu hoch oder wird zum No-op).
      let insertAt = targetIdx;
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

  // Richtige Optionen einmal bestimmen - sowohl die Antwortzeile (Mehrfach-MC)
  // als auch die Optionserklaerungen weiter unten greifen darauf zu. Muss daher
  // VOR dem reihenfolge/MC-Zweig stehen (fuer reihenfolge/offen leeres Set).
  const correct = mcCorrectIndices(q);

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
    const answerLine = document.createElement("p");
    answerLine.className = "learn-answer";
    if (mcIsMulti(q)) {
      answerLine.textContent =
        "Richtige Antworten: " +
        [...correct].sort((a, b) => a - b).map((i) => q.optionen[i]).filter((t) => t).join(", ");
    } else {
      answerLine.textContent =
        (mcLike(q.typ) || q.typ === "zahlenreihe" ? "Richtige Antwort: " : "Musterantwort: ") + (q.korrekte_antwort || "");
    }
    box.appendChild(answerLine);
  }

  const erklaerungen = Array.isArray(q.erklaerungen) ? q.erklaerungen : [];
  if (mcLike(q.typ) && erklaerungen.length) {
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
    // Zahlenreihe (Plan 3.7): lokal/deterministisch scorebar, wenn die Loesung eine Zahl ist.
    const istZahlenreihe = (q) => q && q.typ === "zahlenreihe" && Number.isFinite(parseZahl(q.korrekte_antwort));

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
      } else if (istZahlenreihe(q)) {
        const res = scoreZahlenreihe(q, answers[i]);
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
        // Phase B: jobId mitschicken → Auswerten eines bezahlten Tests laeuft serverseitig
        // ueber das Follow-up-Entitlement (kein erneuter Credit-Abzug). Nur wenn vorhanden.
        ...(quiz.jobId ? { jobId: quiz.jobId } : {}),
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

    const saved = await saveAttempt(result, durationMs, evalCost, evalTokens);
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
    // "Frage melden" auch beim Durchsehen eines (gespeicherten) Versuchs - rein
    // lokal, loest keine neue Bewertung/Generierung aus. Eigene Zeile im Detail.
    const reportRow = document.createElement("p");
    reportRow.className = "report-row";
    appendReportButton(reportRow, q, reportKontextAktiv());
    div.appendChild(reportRow);
    details.appendChild(div);
  });
}

/* ---------- Gamification (pro Stelle) ---------- */
// Bewusst rein abgeleitet aus den vorhandenen Versuchen einer Stelle: kein
// neuer localStorage-Key, keine Formataenderung. Alles laesst sich jederzeit
// aus job.attempts neu berechnen und bleibt damit abwaertskompatibel. Spielt
// absichtlich nur je Stelle, nicht stellenuebergreifend.

// Erreichtes Prozentergebnis eines Versuchs (0-100), defensiv normalisiert: zuerst
// das top-level Spiegel-Feld att.prozent, sonst der echte Score aus
// result.gesamt.prozent (dieselbe Quelle wie die Review-Ansicht), sonst 0; auf 0-100
// geklemmt. ZENTRAL fuer Anzeige UND Fortschritt/Badges/Freischaltungen, damit ein
// alter Versuch ohne att.prozent ueberall denselben Wert ergibt (kein 80 % in der
// Anzeige, aber 0 XP im Fortschritt).
// Strikter Prozent-Leser: nur echte endliche Zahlen oder nicht-leere numerische
// Strings zaehlen als vorhandener Score; null/undefined/""/Whitespace/NaN ergeben
// null ("nicht vorhanden"). WICHTIG gegen Number("")===0 / Number(null)===0: ein
// leeres/null top-level prozent darf NICHT als echte 0 durchgehen und so den echten
// Score aus result.gesamt.prozent maskieren.
function readPct(v) {
  if (typeof v === "number") return Number.isFinite(v) ? v : null;
  if (typeof v === "string" && v.trim() !== "") {
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

function attemptPct(att) {
  if (!att) return 0;
  let p = readPct(att.prozent);
  if (p === null) p = readPct(att.result && att.result.gesamt && att.result.gesamt.prozent);
  if (p === null) return 0;
  return Math.max(0, Math.min(100, p));
}

// XP eines Versuchs: das erreichte Prozentergebnis (0-100) als ganze Zahl.
function attemptXp(att) {
  return Math.round(attemptPct(att));
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

// Momentum-Reframe (Plan 2026, 3.4): bewusst KEINE Tages-Serie mehr - kein
// "heute-noch-ueben-sonst-reisst-die-Serie"-Druck (Streak-Schuldgefuehl raus).
// Stattdessen nur die Zahl der VERSCHIEDENEN Uebungstage als neutrales Dranbleiben-
// Signal: keine Strafe fuer Luecken, keine "aktive" Serie, die auf 0 faellt.
// dayOrdinal mappt einen Zeitpunkt auf den lokalen Kalendertag.
function distinctPracticeDays(attempts) {
  const days = new Set();
  for (const a of (Array.isArray(attempts) ? attempts : [])) {
    // Nur Versuche mit echtem positivem Zeitstempel zaehlen. Sonst koennte ein
    // krummes date das Abzeichen faelschlich verdienen: fehlend/"kaputt" ergibt
    // dayOrdinal=NaN (ein Set zaehlt ein NaN als Wert), und new Date(null) faellt
    // auf den Epoch-Tag 1970 zurueck (auch ein gueltiger, aber falscher "Tag").
    if (!a || typeof a.date !== "number" || !Number.isFinite(a.date) || a.date <= 0) continue;
    days.add(dayOrdinal(a.date));
  }
  return days.size;
}

// Abzeichen-Katalog. test(s) entscheidet aus den aggregierten Werten einer
// Stelle, ob das Abzeichen verdient ist.
// Leistungs-Abzeichen (Score/Aufwärtstrend) zählen bewusst nur aus dem
// Prüfungsmodus: im Lernmodus lässt sich durch Auflösen leicht ein hoher Wert
// erreichen. Dranbleiben-Abzeichen (erster Test, mehrere Tage, Hartnäckigkeit)
// bleiben modusunabhängig.
const BADGES = [
  { id: "erster-test", label: "Erster Schritt", desc: "Ersten Test zu dieser Stelle gemacht", test: (s) => s.count >= 1 },
  { id: "bestanden", label: "Bestanden", desc: "Im Prüfungsmodus mindestens 50 % erreicht", test: (s) => s.bestExamPct >= 50 },
  { id: "souveraen", label: "Souverän", desc: "Im Prüfungsmodus mindestens 70 % erreicht", test: (s) => s.bestExamPct >= 70 },
  { id: "spitze", label: "Spitzenreiter", desc: "Im Prüfungsmodus mindestens 90 % erreicht", test: (s) => s.bestExamPct >= 90 },
  { id: "aufwaerts", label: "Aufwärtstrend", desc: "Im Prüfungsmodus vom ersten zum letzten Versuch verbessert", test: (s) => s.examImproved },
  // Reframe (Plan 3.4): nicht mehr "3 Tage IN FOLGE" (Serien-Druck), sondern an 3
  // VERSCHIEDENEN Tagen geuebt. id bleibt stabil (kein Daten-/Migrationsbezug).
  { id: "drei-serie", label: "Drangeblieben", desc: "An 3 verschiedenen Tagen geübt", test: (s) => s.daysPracticed >= 3 },
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
  const daysPracticed = distinctPracticeDays(attempts);
  const stats = {
    count: attempts.length, bestPct, improved,
    examCount: examByDate.length, bestExamPct, examImproved,
    daysPracticed,
  };
  const badges = BADGES.map((b) => ({ id: b.id, label: b.label, desc: b.desc, earned: !!b.test(stats) }));
  return {
    totalXp, level: lvl.level, title: levelTitle(lvl.level),
    xpInLevel: lvl.xpInLevel, xpForNext: lvl.xpForNext,
    progressPct: lvl.xpForNext ? Math.round((lvl.xpInLevel / lvl.xpForNext) * 100) : 0,
    bestPct, count: attempts.length,
    daysPracticed,
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
  // Drangeblieben — Kalender mit Haken (kein Flammen-/Serien-Motiv mehr)
  "drei-serie": '<svg viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="12" width="30" height="28" rx="3"/><path d="M9 20 H39"/><path d="M17 8 V14"/><path d="M31 8 V14"/><polyline points="18 29 22 33 30 24"/></svg>',
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

  // Kein Tages-Serien-Zaehler mehr (Plan 3.4, Streak-Schuldgefuehl raus) - nur der
  // neutrale Abzeichen-Stand. Level/XP tragen die Readiness-Erzaehlung.
  const meta = document.createElement("p");
  meta.className = "hint gami-meta";
  meta.textContent = `${progress.earnedCount} von ${progress.badges.length} Abzeichen`;
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
  heading.textContent = "So bereit bist du für diese Stelle";
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
  // rev (additiv, optional) bei jedem Schreibvorgang hochzaehlen. Erlaubt der
  // serialisierten Schreibsektion (mutateHistory) und anderen Tabs, eine
  // Fremdaenderung zu erkennen. Defensiv: fehlt rev (Daten aus aelteren
  // Versionen), bei 0 beginnen. Nur eine Zahl - alte Leser ignorieren das Feld,
  // also abwaertskompatibel. Vor der Retry-Schleife, damit ein Quota-Retry rev
  // nicht mehrfach hochzaehlt.
  if (h && typeof h === "object") h.rev = (Number.isFinite(h.rev) ? h.rev : 0) + 1;
  // Bei vollem Speicher aelteste Versuche verwerfen und erneut versuchen
  for (let i = 0; i < 6; i++) {
    try {
      localStorage.setItem("bewerbungstool.history", JSON.stringify(h));
      return true;
    } catch {
      // ZUERST den entbehrlichen Komfort-Cache (Kernpunkte-Vorschau) opfern, BEVOR
      // echte Versuche verworfen werden - beide teilen sich dasselbe Origin-Quota, und
      // die autoritative Versuchs-Historie ist wichtiger als die nicht-autoritative
      // Vorschau. ALLE localStorage-Zugriffe hier selbst absichern: in storage-denied-
      // Umgebungen kann auch getItem/removeItem werfen, saveHistory muss aber ein
      // Soft-Fail-API bleiben (nie werfen). Scheitert die Cache-Probe, regulaer weiter
      // zum Versuch-Trimmen.
      let cacheDropped = false;
      try {
        if (localStorage.getItem(KP_CACHE_KEY) != null) {
          localStorage.removeItem(KP_CACHE_KEY);
          cacheDropped = true;
        }
      } catch { /* Cache-Probe/-Entfernung fehlgeschlagen: ignorieren */ }
      if (cacheDropped) continue; // erneut versuchen, ohne einen Versuch zu loeschen
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

// Serialisierter Schreibzugriff auf die History. Liest die History INNERHALB der
// kritischen Sektion frisch, laesst den mutator sie in place aendern und schreibt
// sie zurueck - das Ganze unter einem origin-weiten Web-Lock, sodass mehrere
// offene Browser-Tabs sich nicht gegenseitig ueberschreiben (lost update: zwei
// Tabs lesen denselben Stand, beide schreiben, der spaetere gewinnt). Der Lock
// serialisiert die read-modify-write-Sektion ueber alle Tabs desselben Origins.
//
// Ohne Web Locks (sehr alte Browser) faellt es auf einen synchronen
// read-modify-write zurueck: best effort, exakt das fruehere Verhalten, kein
// Regress gegenueber vorher. localStorage kennt kein atomares Compare-and-Swap;
// der Lock ist die einzige verlaessliche Serialisierung, das frueher angedachte
// rev-Feld allein wuerde Drift nur erkennen, nicht verhindern.
//
// Der mutator MUSS synchron sein - kein await zwischen Lesen und Schreiben, sonst
// reisst die Atomaritaet der Sektion auf. Rueckgabe: { ok, out } mit
// ok = saveHistory-Ergebnis (true = wirklich geschrieben) und out = Rueckgabewert
// des mutators.
async function mutateHistory(mutator) {
  let ran = false;
  const run = () => {
    ran = true;
    const h = loadHistory();
    const out = mutator(h);
    // Gibt der mutator explizit false zurueck, war nichts zu schreiben: dann KEIN
    // saveHistory. Ein No-op-Write wuerde sonst unter Quota-Druck die Bereinigung
    // (Cache/aelteste Versuche verwerfen) ausloesen und echte Daten verdraengen,
    // obwohl sich nichts geaendert hat. ok = true, da nichts fehlgeschlagen ist.
    if (out === false) return { ok: true, out };
    return { ok: saveHistory(h), out };
  };
  const locks = typeof navigator !== "undefined" && navigator.locks;
  if (locks && typeof locks.request === "function") {
    try {
      return await locks.request("bewerbungstool.history", run);
    } catch (e) {
      // Lief der mutator schon (Fehler kam aus mutator/saveHistory), NICHT erneut
      // ausfuehren - der Fehler propagiert wie bei direktem Aufruf. Scheitert die
      // Lock-Mechanik selbst (ran === false, z. B. SecurityError in restriktiven
      // Umgebungen), einmaliger best-effort-Write als Rueckfall.
      if (ran) throw e;
      return run();
    }
  }
  return run();
}

// Komfort-Cache fuer Kernpunkte, die schon BEI der Generierung feststehen (vor dem
// ersten Abschluss). BEWUSST getrennt von der Versuchs-Historie (s.
// persistKernpunkteForActiveJob): dieser Hintergrund-/Komfort-Schreibvorgang darf nie
// die Historie ueberschreiben. Ein Verlust dieses Caches ist harmlos. Eigener Key,
// per Stellen-key (jobKey) indiziert, mit Groessen-Cap (FIFO nach generatedAt).
const KP_CACHE_KEY = "bewerbungstool.kpcache";
const KP_CACHE_MAX = 20;
function loadKpCache() {
  try {
    const m = JSON.parse(localStorage.getItem(KP_CACHE_KEY));
    return m && typeof m === "object" && !Array.isArray(m) ? m : {};
  } catch { return {}; }
}
// Gibt den gespeicherten Wrapper ({v,generatedAt,srcKey,srcUrl,data}) fuer eine Stelle
// zurueck oder null. Defensiv: nur mit brauchbarem data-Objekt.
function cachedKernpunkte(key) {
  if (!key) return null;
  const w = loadKpCache()[key];
  return w && typeof w === "object" && w.data && typeof w.data === "object" ? w : null;
}
function cacheKernpunkte(key, wrapper) {
  if (!key) return;
  // Footprint begrenzen: pro Kategorie hoechstens so viele Eintraege speichern, wie das
  // Panel ohnehin rendert (KERNPUNKTE_LIST_MAX). Mehr waere verschwendetes Quota.
  if (wrapper && wrapper.data && typeof wrapper.data === "object") {
    const d = wrapper.data;
    for (const cat of ["aufgaben", "anforderungen_muss", "anforderungen_optional", "besonderheiten"]) {
      if (Array.isArray(d[cat]) && d[cat].length > KERNPUNKTE_LIST_MAX) d[cat] = d[cat].slice(0, KERNPUNKTE_LIST_MAX);
    }
  }
  const m = loadKpCache();
  m[key] = wrapper;
  // Groesse begrenzen: aelteste Eintraege (kleinste generatedAt) zuerst verwerfen.
  const keys = Object.keys(m);
  if (keys.length > KP_CACHE_MAX) {
    keys.sort((a, b) => (Number(m[a] && m[a].generatedAt) || 0) - (Number(m[b] && m[b].generatedAt) || 0));
    for (const k of keys.slice(0, keys.length - KP_CACHE_MAX)) delete m[k];
  }
  // Einzelner Schreibversuch; bei Quota-Fehler still auslassen (reiner Komfort, nie die
  // Historie anfassen).
  try { localStorage.setItem(KP_CACHE_KEY, JSON.stringify(m)); } catch { /* voll: auslassen */ }
}
function dropKpCache(key) {
  if (!key) return;
  const m = loadKpCache();
  if (key in m) {
    delete m[key];
    try { localStorage.setItem(KP_CACHE_KEY, JSON.stringify(m)); } catch { /* egal */ }
  }
}

/* ---------- Gemeldete Fragen (rein lokal) ---------- */
// Eigener, additiver localStorage-Key, bewusst getrennt von der Historie:
// Reports sollen das Verwerfen alter Versuche (Quota) und das Loeschen einer
// Stelle ueberleben. Rein lokal - keine Meldung loest je einen API-Call aus.
const REPORTS_KEY = "bewerbungstool.reports";
const REPORTS_MAX = 100;

function loadReports() {
  try {
    const r = JSON.parse(localStorage.getItem(REPORTS_KEY));
    // Defensiv: nur eine plausible Form akzeptieren, sonst Default. Alte
    // Daten/fehlender Key sind voellig in Ordnung.
    if (r && typeof r === "object" && Array.isArray(r.reports)) {
      return { version: 1, reports: r.reports };
    }
  } catch {
    /* ignorieren -> Default */
  }
  return { version: 1, reports: [] };
}

function saveReports(r) {
  // Reports sind klein, trotzdem capen (FIFO: aelteste zuerst verwerfen) und bei
  // vollem Speicher nicht crashen. Report-Speicherung ist von der Historie
  // getrennt und darf deren Speichern nie stoeren.
  if (r.reports.length > REPORTS_MAX) r.reports = r.reports.slice(-REPORTS_MAX);
  for (let i = 0; i < 5; i++) {
    try {
      localStorage.setItem(REPORTS_KEY, JSON.stringify(r));
      return true;
    } catch {
      if (!r.reports.length) return false;
      r.reports.shift(); // aeltesten Report verwerfen und erneut versuchen
    }
  }
  return false;
}

// Hilfstexte fuer Reports hart kuerzen, damit sie keinen Quota-Druck erzeugen.
function clip(str, max) {
  const s = typeof str === "string" ? str : "";
  return s.length > max ? s.slice(0, max) : s;
}

// Importierten Report auf die gebundene, erwartete Form bringen (gleiche Grenzen
// wie beim eigenen Melden). Verhindert, dass fremde/riesige Felder aus einem
// Backup den Speicher sprengen und beim Import bestehende Reports verdraengen.
// Gibt null bei unbrauchbarem Eintrag.
function sanitizeReport(rep) {
  if (!rep || typeof rep !== "object" || rep.id == null) return null;
  const orNull = (v, max) => (typeof v === "string" ? clip(v, max) : null);
  return {
    id: clip(String(rep.id), 64),
    date: Number.isFinite(Number(rep.date)) ? Number(rep.date) : Date.now(),
    fragenKey: typeof rep.fragenKey === "string" ? clip(rep.fragenKey, 2000) : "",
    frage: clip(rep.frage, 600),
    typ: mcLike(rep.typ) ? "multiple_choice" : "offen",
    kategorie_fachlich: clip(rep.kategorie_fachlich, 200),
    korrekte_antwort: clip(rep.korrekte_antwort, 300),
    optionen: Array.isArray(rep.optionen) ? rep.optionen.slice(0, 8).map((o) => clip(o, 200)) : [],
    gruende: Array.isArray(rep.gruende)
      ? rep.gruende.slice(0, 10).map((g) => clip(g, 40)).filter(Boolean)
      : [],
    notiz: clip(rep.notiz, 500),
    jobKey: orNull(rep.jobKey, 200),
    stellenTitel: orNull(rep.stellenTitel, 200),
    provider: orNull(rep.provider, 40),
    tier: orNull(rep.tier, 40),
    model: orNull(rep.model, 80),
  };
}

// Schreibt einen Report (fuellt id/date). Gibt das gespeicherte Objekt zurueck,
// oder null, wenn das Speichern fehlschlug (localStorage voll/gesperrt). Der
// Aufrufer darf eine Meldung nur dann als erfolgt ausgeben, wenn != null.
function addReport(partial) {
  const r = loadReports();
  const report = {
    id: (Date.now().toString(36) + Math.random().toString(36).slice(2, 8)),
    date: Date.now(),
    ...partial,
  };
  r.reports.push(report);
  if (!saveReports(r)) return null;
  // saveReports verwirft unter Speicherdruck FIFO-Eintraege - im Extremfall auch
  // den gerade angehaengten - und kann danach ein (leeres) Objekt erfolgreich
  // schreiben und true zurueckgeben. Erfolg daher daran festmachen, dass der neue
  // Report tatsaechlich persistiert wurde, sonst null (kein falsches "Gemeldet").
  const persisted = loadReports().reports.some((x) => x && x.id === report.id);
  return persisted ? report : null;
}

// Schickt einen bereits lokal gespeicherten Report zusaetzlich an den Betreiber
// (POST /api/report). Fire-and-forget: kein await, Fehler werden verschluckt, die
// UX haengt allein am lokalen Save. Gesendet wird das schon sanitisierte Objekt -
// insbesondere ist korrekte_antwort bei einer Meldung mitten in der Pruefung
// (answersSecret) bereits leer; der Server rekonstruiert sie nie. Auth-Token wird,
// falls vorhanden, mitgeschickt, damit der Server die Meldung optional einem Konto
// zuordnen kann (sonst anonym). Reports gehen aus ALLEN Modi raus (der Betreiber
// braucht sie anbieterunabhaengig) - daher der ehrliche Dialog-Hinweis im Modal.
function postReport(report) {
  if (!report) return;
  try {
    fetch(hostedBase() + "/api/report", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify(report),
      keepalive: true,
    }).catch(() => { /* egal - lokal ist gespeichert */ });
  } catch { /* egal */ }
}

// Wurde diese Frage in DIESEM Stellen-Kontext schon gemeldet? Der Status ist pro
// (fragenKey, jobKey)-Paar: dieselbe generische Frage kann in einer Stelle
// passen und in einer anderen unpassend sein ("thematisch irrelevant"), daher
// darf eine Meldung in Stelle A das Melden in Stelle B nicht sperren. Ohne
// jobKey (kein Stellenbezug) bildet null einen eigenen Bucket.
function reportStatusForFrage(key, jobKey) {
  if (!key) return false;
  const jk = jobKey || null;
  return loadReports().reports.some(
    (r) => r && r.fragenKey === key && (r.jobKey || null) === jk,
  );
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

async function saveAttempt(result, durationMs, evalCost, evalTokens) {
  // Schreiben unter dem History-Lock (mutateHistory), damit ein in einem anderen
  // Tab parallel laufender Schreibvorgang (z. B. eine Themenfeld-Ableitung)
  // diesen Versuch nicht ueberschreibt. Der gesamte Block liest/mutiert die
  // frische History h und laeuft synchron innerhalb der Sektion.
  const _srHarvestQuiz = quiz; // Referenz fuer den SR-Harvest nach dem Speichern festhalten
  const _saved = (await mutateHistory((h) => {
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
    // Kernpunkte der Stelle am Job auffrischen, sobald welche extrahiert wurden.
    // Nur bei normalen Tests (kein Vertiefungsbogen, dessen Quiz Teilthemen verengt)
    // und nur, wenn quiz.kernpunkte befuellt ist (normalizeQuizData setzt das Feld
    // nur dann). Ein spaeterer Test ohne Extraktion (lokal) darf bestehende
    // Kernpunkte NICHT loeschen - der Guard laesst sie unberuehrt. Versionswrapper
    // wie bei themenfelder, erleichtert spaetere Migrationen.
    if (quiz.kernpunkte && typeof quiz.kernpunkte === "object") {
      // Kernpunkte NUR schreiben, wenn dieser Test aus DERSELBEN Anzeige stammt wie
      // die gespeicherte Stelle: jobKey(quiz.jobText) === job.key. Dann passen die
      // angezeigten Kernpunkte immer zum job.jobText, aus dem auch Folge-Tests
      // erzeugt werden (Anzeige und Wiederholung konsistent) - OHNE die mutable,
      // text-hash-basierte Job-Identitaet anzufassen (kein key-Kollisions-/Loesch-
      // Risiko). Bei einem identityKey-Merge mit abweichendem Text (andere oder
      // aktualisierte Anzeige) bleiben die bestehenden, zum job.jobText passenden
      // Kernpunkte unveraendert, statt fremde Fakten unterzuschieben. job.key wird
      // nicht mehr mutiert, daher gilt weiterhin job.key === jobKey(job.jobText).
      let curKey = null;
      try { curKey = jobKey(quiz.jobText); } catch { /* egal */ }
      if (curKey && curKey === job.key) {
        // Quell-URL der Kernpunkte MIT in den Wrapper schreiben (Provenienz). Der
        // "Original-Anzeige"-Link im Panel wird hieraus gerendert, NICHT aus job.url:
        // job.url kann bei einem identityKey-Merge mit abweichendem Text nachgetragen
        // werden (s. oben), ohne dass jobText/kernpunkte wechseln - dann zeigte job.url
        // auf eine andere Anzeige als die angezeigten Kernpunkte. srcUrl = die URL, aus
        // deren Text DIESE Kernpunkte stammen. Fehlt quiz.jobUrl (Text eingefuegt), eine
        // bereits bekannte srcUrl desselben Texts bewahren, damit der Link nicht flackert.
        const prevSrcUrl =
          job.kernpunkte && job.kernpunkte.srcKey === curKey && typeof job.kernpunkte.srcUrl === "string"
            ? job.kernpunkte.srcUrl
            : "";
        const srcUrl = typeof quiz.jobUrl === "string" && quiz.jobUrl ? quiz.jobUrl : prevSrcUrl;
        job.kernpunkte = { v: 1, generatedAt: Date.now(), srcKey: curKey, srcUrl, data: quiz.kernpunkte };
        // Authoritative Kernpunkte stehen jetzt in der Historie -> Komfort-Cache-Eintrag
        // ist redundant, entfernen (job.kernpunkte hat beim Anzeigen ohnehin Vorrang).
        dropKpCache(curKey);
      }
    }
    // Druckpunkte (Plan 3.3) job-level auffrischen — wie kernpunkte nur fuer DIESE Anzeige
    // (curKey === job.key) und nur bei normalen Tests (kein Vertiefungsbogen, s. Guard oben).
    // Ein spaeterer Test ohne druckpunkte (BYOK/local) laesst bestehende unberuehrt.
    if (Array.isArray(quiz.druckpunkte) && quiz.druckpunkte.length) {
      let dKey = null;
      try { dKey = jobKey(quiz.jobText); } catch { /* egal */ }
      if (dKey && dKey === job.key) {
        job.druckpunkte = { v: 1, generatedAt: Date.now(), data: quiz.druckpunkte };
      }
    }
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
  delete quizCopy.kernpunkte; // liegt am Job (job.kernpunkte), nicht doppelt je Versuch
  delete quizCopy.druckpunkte; // liegt am Job (job.druckpunkte), nicht doppelt je Versuch

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
  })).ok; // true, wenn der Versuch wirklich gespeichert wurde
  // Spaced Repetition (Plan 3.8): uebertragbare Skill-Aufgaben (zahlenreihe/sprachlogik)
  // dieses Tests ins SR-Deck ernten - eigener Store, self-guard auf Vertiefungsboegen.
  harvestSrCards(_srHarvestQuiz);
  return _saved;
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

/* ---------- Bewerbungs-Cockpit (Plan 2026, 3.5) ---------- */
// Optionaler Bewerbungs-Status + Gespraechstermin pro Stelle - macht die Stellenliste
// zur Pipeline (Schaltzentrale der ganzen Suche). Neue OPTIONALE Job-Felder
// (job.status, job.gespraechAm), defensiv gelesen; alte Stellen ohne die Felder bleiben
// unveraendert. Reiner Client, keine neuen Storage-Keys (liegt am bestehenden Job-Objekt).
const JOB_STATUS = [
  { key: "verfolgt", label: "Verfolgt", cls: "st-verfolgt" },
  { key: "beworben", label: "Beworben", cls: "st-beworben" },
  { key: "gespraech", label: "Gespräch", cls: "st-gespraech" },
  { key: "zusage", label: "Zusage", cls: "st-zusage" },
  { key: "absage", label: "Absage", cls: "st-absage" },
];
const JOB_STATUS_DEFAULT = "verfolgt";
const JOB_STATUS_BY_KEY = Object.fromEntries(JOB_STATUS.map((s) => [s.key, s]));
function isValidStatus(k) { return typeof k === "string" && !!JOB_STATUS_BY_KEY[k]; }
// Der EXPLIZIT gesetzte Status einer Stelle oder null (nicht gesetzt). Anzeige zeigt nur
// bei gesetztem Status einen Chip - so bleibt die Liste fuer reine Uebungs-Stellen ruhig.
function storedStatus(job) { return (job && isValidStatus(job.status)) ? job.status : null; }
// Gespraechstermin (ms) defensiv: nur ein echter positiver Zeitstempel, sonst null.
function jobGespraechAm(job) {
  const t = job && job.gespraechAm;
  return (typeof t === "number" && Number.isFinite(t) && t > 0) ? t : null;
}
// Datum ohne Uhrzeit (Termin); <input type="date"> braucht YYYY-MM-DD in LOKALER Zeit.
function formatDay(ts) {
  return new Date(ts).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
}
function toDateInputValue(ts) {
  const d = new Date(ts), p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}
function dateInputToTs(v) {
  if (typeof v !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(v)) return null;
  const [y, m, d] = v.split("-").map(Number);
  const dt = new Date(y, m - 1, d); // lokale Mitternacht
  // Unmoegliche Daten abweisen: new Date(2026, 1, 31) rollt auf Maerz weiter. Nur
  // akzeptieren, wenn die Komponenten EXAKT zurueckkommen (kein stilles Verschieben).
  if (dt.getFullYear() !== y || dt.getMonth() !== m - 1 || dt.getDate() !== d) return null;
  return dt.getTime();
}

// Status/Termin einer Stelle persistieren (kleine, atomare Mutation ueber mutateHistory).
// Findet die Stelle ueber den stabilen key. patch.status: gueltiger Wert wird gesetzt,
// sonst Feld geloescht. patch.gespraechAm: positive Zahl setzt, falsy loescht (Termin weg).
async function updateJobCockpit(job, patch) {
  if (!job || !job.key) return;
  await mutateHistory((h) => {
    const j = h.jobs.find((x) => x && x.key === job.key);
    // Stelle nicht gefunden -> false: KEIN No-op-Write (sonst koennte saveHistory unter
    // Quota-Druck die Bereinigung ausloesen, obwohl sich nichts geaendert hat).
    if (!j) return false;
    if ("status" in patch) {
      if (isValidStatus(patch.status)) j.status = patch.status; else delete j.status;
    }
    if ("gespraechAm" in patch) {
      const g = patch.gespraechAm;
      // Nur ein echter positiver Zeitstempel wird persistiert (gleicher Vertrag wie
      // jobGespraechAm) - kein negativer Wert/String/NaN landet im Job-Objekt.
      if (typeof g === "number" && Number.isFinite(g) && g > 0) j.gespraechAm = g; else delete j.gespraechAm;
    }
  });
}

// Status-Chip fuer die Anzeige (Listen/Kopf). Nur bei explizit gesetztem Status.
function buildStatusChip(job) {
  const k = storedStatus(job);
  if (!k) return null;
  const s = JOB_STATUS_BY_KEY[k];
  const chip = document.createElement("span");
  chip.className = "status-chip " + s.cls;
  chip.textContent = s.label;
  return chip;
}
// Termin-Chip: "Gespräch am ..." (kuenftig hervorgehoben) bzw. "Gespräch war ..." (vorbei).
function buildTerminChip(job) {
  const t = jobGespraechAm(job);
  if (!t) return null;
  const upcoming = dayOrdinal(t) >= dayOrdinal(Date.now());
  const chip = document.createElement("span");
  chip.className = "termin-chip " + (upcoming ? "upcoming" : "past");
  chip.textContent = (upcoming ? "Gespräch am " : "Gespräch war ") + formatDay(t);
  return chip;
}
// Zeile aus Status- + Termin-Chip (oder null, wenn beide fehlen) - fuer Karten/Kopf.
function buildCockpitChips(job) {
  const chip = buildStatusChip(job), termin = buildTerminChip(job);
  if (!chip && !termin) return null;
  const row = document.createElement("div");
  row.className = "cockpit-chips";
  if (chip) row.appendChild(chip);
  if (termin) row.appendChild(termin);
  return row;
}

// Editor-Panel fuer die Stellen-Subpage: Status waehlen + Gespraechstermin setzen/loeschen.
function buildCockpitPanel(job) {
  const panel = document.createElement("div");
  panel.className = "cockpit-panel";
  const h = document.createElement("h3");
  h.textContent = "Status & Termin";
  panel.appendChild(h);

  const row = document.createElement("div");
  row.className = "cockpit-status-row";
  const current = storedStatus(job) || JOB_STATUS_DEFAULT;
  JOB_STATUS.forEach((s) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "chip status-pick " + s.cls + (s.key === current ? " active" : "");
    b.textContent = s.label;
    b.setAttribute("aria-pressed", s.key === current ? "true" : "false");
    b.addEventListener("click", async () => {
      // Aktiven Chip in der Reihe umschalten (kein Voll-Rerender -> kein Scroll-Sprung).
      row.querySelectorAll(".status-pick").forEach((el) => {
        const on = el === b;
        el.classList.toggle("active", on);
        el.setAttribute("aria-pressed", on ? "true" : "false");
      });
      job.status = s.key; // lokales Objekt mitziehen (Karte beim Zurueck konsistent)
      await updateJobCockpit(job, { status: s.key });
    });
    row.appendChild(b);
  });
  panel.appendChild(row);

  const dateRow = document.createElement("div");
  dateRow.className = "cockpit-date-row";
  const label = document.createElement("label");
  label.className = "cockpit-date-label";
  label.textContent = "Gesprächstermin";
  const input = document.createElement("input");
  input.type = "date";
  input.className = "cockpit-date";
  const t = jobGespraechAm(job);
  if (t) input.value = toDateInputValue(t);
  input.addEventListener("change", async () => {
    const ts = dateInputToTs(input.value);
    if (ts) job.gespraechAm = ts; else delete job.gespraechAm;
    await updateJobCockpit(job, { gespraechAm: ts });
  });
  label.appendChild(input);
  dateRow.appendChild(label);
  panel.appendChild(dateRow);
  return panel;
}

// Eine Stelle samt aller Versuche aus der Historie entfernen. Identifikation
// ueber den stabilen key (Hash des Stellentexts, liegt auf jedem gespeicherten
// Eintrag), zusaetzlich der urlKey als Rueckfall. Eine Referenzgleichheit
// hilft nicht: loadHistory parst frisch, das uebergebene job-Objekt ist nie
// dasselbe wie ein geladenes. Destruktiv und unwiderruflich.
async function deleteJob(job) {
  await mutateHistory((h) => {
    h.jobs = h.jobs.filter((j) =>
      !(job.key && j.key === job.key) &&
      !(job.urlKey && j.urlKey === job.urlKey));
  });
  // Komfort-Cache-Eintrag der Stelle mitloeschen, sonst bliebe er verwaist liegen.
  if (job.key) dropKpCache(job.key);
  // Zugehoerige Meldungen mitloeschen: Reports liegen in einem eigenen Key, der
  // Quota-Trimmung der Historie ueberlebt - aber beim EXPLIZITEN Loeschen einer
  // Stelle sollen ihre Meldungen (Fragetext, Notizen, ggf. Loesung) nicht als
  // verwaiste sensible Daten zurueckbleiben (kein anderer UI-Weg, sie zu
  // entfernen). Gegen alle moeglichen Stellen-Identitaeten matchen, unter denen
  // ein Report gespeichert sein kann (urlKey / identityKey / Textschluessel).
  const keys = new Set();
  if (job.urlKey) keys.add(job.urlKey);
  const iKey = identityKeyOf(job.titel, job.arbeitgeber, job.arbeitsort);
  if (iKey) keys.add(iKey);
  if (job.key) keys.add(job.key);
  if (job.jobText) { try { keys.add(jobKey(job.jobText)); } catch { /* egal */ } }
  if (keys.size) {
    const r = loadReports();
    const before = r.reports.length;
    r.reports = r.reports.filter((rep) => !(rep && keys.has(rep.jobKey)));
    if (r.reports.length !== before) saveReports(r);
  }
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
  btn.title = "Diese Stelle mit allen Versuchen und Meldungen aus der Historie entfernen";
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

  // Defensiv: eine gespeicherte Stelle koennte (theoretisch) keine Versuche
  // tragen - dann nicht ueber ein leeres Array Math.max (-> -Infinity) bilden.
  // Versuche aus aelteren Versionen koennen ohne top-level prozent kommen - ueber den
  // zentralen attemptPct normalisieren (Fallback auf result.gesamt.prozent, auf 0-100
  // geklemmt), damit Trend, Tooltip und Score nicht "undefined %" bzw. "NaNpx" zeigen
  // und Anzeige UND Fortschritt/Badges denselben Wert verwenden.
  const attempts = Array.isArray(job.attempts) ? job.attempts : [];
  const pctOf = attemptPct;
  const lastAtt = attempts[attempts.length - 1];
  const best = attempts.length ? Math.max(...attempts.map(pctOf)) : 0;
  const last = pctOf(lastAtt);

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
  sub.textContent = `${attempts.length} Versuch${attempts.length === 1 ? "" : "e"} · Bester: ${best} % · Letzter: ${last} %`;
  title.appendChild(sub);
  // Cockpit-Chips (Status/Termin) im Listen-/Verlaufskopf. Auf der Subpage NICHT, dort
  // traegt das Status&Termin-Panel diese Infos (sonst doppelt).
  if (!subpage) {
    const chips = buildCockpitChips(job);
    if (chips) title.appendChild(chips);
  }
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
  attempts.slice(-12).forEach((a) => {
    const pct = pctOf(a);
    const bar = document.createElement("div");
    bar.className = "trend-bar " + scoreClass(pct);
    bar.style.height = Math.max(4, Math.round(pct * 0.44)) + "px";
    bar.title = `${formatDate(a.date)}: ${pct} %`;
    trend.appendChild(bar);
  });
  block.appendChild(trend);

  // Spielfortschritt dieser Stelle (Level, XP, Abzeichen)
  block.appendChild(buildJobProgressPanel(computeJobProgress(job)));

  // Versuche, neueste zuerst
  const ul = document.createElement("ul");
  ul.className = "attempt-list";
  attempts.slice().reverse().forEach((att) => {
    const li = document.createElement("li");
    const info = document.createElement("span");
    info.textContent = `${formatDate(att.date)} · ${att.mode === "pruefung" ? "Prüfung" : "Lernen"}` +
      (att.schwierigkeitsgrad ? ` · ${difficultyLabel(att.schwierigkeitsgrad)}` : "") +
      // quiz/fragen koennen bei sehr alten Versuchen fehlen (defensiv lesen).
      ` · ${att.quiz && Array.isArray(att.quiz.fragen) ? att.quiz.fragen.length : 0} Fragen` +
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
    const attPct = pctOf(att);
    const score = document.createElement("span");
    score.className = "attempt-score " + scoreClass(attPct);
    score.textContent = attPct + " %";
    const openBtn = document.createElement("button");
    openBtn.textContent = "Ansehen";
    // openAttempt klont att.quiz (liest quiz.fragen) und reicht att.result an
    // renderResult, das result.gesamt liest. Fehlt eines davon bei sehr alten
    // Versuchen, wuerde "Ansehen" abstuerzen. Solche Versuche bleiben sichtbar,
    // aber der Knopf wird deaktiviert (degradierter Zustand statt Crash).
    const canReview = att.quiz && Array.isArray(att.quiz.fragen) &&
      att.result && typeof att.result === "object";
    if (canReview) {
      openBtn.addEventListener("click", () => openAttempt(job, att));
    } else {
      openBtn.disabled = true;
      openBtn.title = "Ansehen nicht möglich: Daten dieses Versuchs sind unvollständig.";
    }
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
  // Score/Trend ueber den zentralen attemptPct normalisieren (Fallback auf
  // result.gesamt.prozent, 0-100 geklemmt), damit die Startseite alte Versuche ohne
  // top-level prozent genauso anzeigt wie die Detailansicht (kein 0 % / NaNpx).
  const attempts = Array.isArray(job.attempts) ? job.attempts : [];
  const best = attempts.length ? Math.max(...attempts.map(attemptPct)) : 0;
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
  meta.textContent = `${attempts.length} Versuch${attempts.length === 1 ? "" : "e"} · Level ${prog.level}`;
  main.appendChild(meta);
  // Cockpit-Chips (Status/Termin), falls gesetzt - macht die Liste zur Pipeline.
  const chips = buildCockpitChips(job);
  if (chips) main.appendChild(chips);

  const side = document.createElement("div");
  side.className = "home-card-side";
  const score = document.createElement("span");
  score.className = "home-card-score " + scoreClass(best);
  score.textContent = best + " %";
  side.appendChild(score);
  const trend = document.createElement("div");
  trend.className = "trend mini";
  attempts.slice(-8).forEach((a) => {
    const p = attemptPct(a);
    const bar = document.createElement("div");
    bar.className = "trend-bar " + scoreClass(p);
    bar.style.height = Math.max(3, Math.round(p * 0.28)) + "px";
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

/* ---------- Spaced Repetition (Plan 2026, 3.8) ---------- */
// Lokale Wiederholung NUR der UEBERTRAGBAREN Skill-Aufgaben (zahlenreihe + sprachlogik) -
// beide deterministisch/LLM-frei bewertbar. KEIN job-spezifisches Trivia (verfaellt mit dem
// Gespraech). Eigener Store, eigener Renderer, eigene View - entkoppelt vom Quiz-Flow.
const SR_DECK_KEY = "bewerbungstool.srdeck";
const SR_DECK_MAX = 150;          // FIFO-Deckel (wie reports)
const SR_DAY = 86400000;
const SR_TYPES = ["zahlenreihe", "sprachlogik"];

function loadSrDeck() {
  try {
    const d = JSON.parse(localStorage.getItem(SR_DECK_KEY));
    if (d && typeof d === "object" && d.cards && typeof d.cards === "object") return { v: 1, cards: d.cards };
  } catch { /* ignorieren */ }
  return { v: 1, cards: {} };
}
function saveSrDeck(deck) {
  // FIFO bei Quota wie bei reports: aelteste Karten (kleinstes added) zuerst verwerfen.
  const trim = (d) => {
    const ids = Object.keys(d.cards);
    if (ids.length <= SR_DECK_MAX) return;
    ids.sort((a, b) => (Number(d.cards[a].added) || 0) - (Number(d.cards[b].added) || 0));
    for (const id of ids.slice(0, ids.length - SR_DECK_MAX)) delete d.cards[id];
  };
  trim(deck);
  for (let i = 0; i < 5; i++) {
    try { localStorage.setItem(SR_DECK_KEY, JSON.stringify(deck)); return true; }
    catch {
      const ids = Object.keys(deck.cards);
      if (!ids.length) return false;
      ids.sort((a, b) => (Number(deck.cards[a].added) || 0) - (Number(deck.cards[b].added) || 0));
      delete deck.cards[ids[0]];
    }
  }
  return false;
}
// Stabile Karten-id aus typ + normalisiertem Fragetext (dedupt gleiche Aufgabe ueber Tests).
function srCardId(q) {
  const base = (q.typ || "") + "|" + String(q.frage || "").toLowerCase().replace(/\s+/g, " ").trim();
  let h = 0;
  for (let i = 0; i < base.length; i++) { h = (h * 31 + base.charCodeAt(i)) | 0; }
  return (q.typ || "x") + "_" + (h >>> 0).toString(36);
}
// Nur die zum Rendern/Scoren noetigen Felder behalten (kompakt, kein jobText/Quellen-Ballast).
function srPickFields(q) {
  return {
    typ: q.typ, frage: q.frage,
    optionen: Array.isArray(q.optionen) ? q.optionen.slice(0, 8) : [],
    korrekte_indizes: Array.isArray(q.korrekte_indizes) ? q.korrekte_indizes.slice(0, 8) : [],
    korrekte_antwort: typeof q.korrekte_antwort === "string" ? q.korrekte_antwort : "",
    erklaerungen: Array.isArray(q.erklaerungen) ? q.erklaerungen.slice(0, 8) : [],
    lerninfo: typeof q.lerninfo === "string" ? q.lerninfo : "",
  };
}
// Eine Aufgabe ist SR-tauglich, wenn sie LOKAL deterministisch bewertbar ist.
function srEligible(q) {
  if (!q || !SR_TYPES.includes(q.typ) || typeof q.frage !== "string" || !q.frage.trim()) return false;
  if (q.typ === "zahlenreihe") return Number.isFinite(parseZahl(q.korrekte_antwort));
  // sprachlogik: braucht >=2 nicht-leere String-Optionen + genau eine bekannte richtige Option.
  // (String-Pruefung haelt fehlerhafte Import-Payloads draussen, die sonst beim Rendern
  // an opt.trim() crashen wuerden.)
  return Array.isArray(q.optionen) && q.optionen.length >= 2
    && q.optionen.every((o) => typeof o === "string" && o.trim())
    && mcCorrectIndices(q).size === 1;
}
// Beim Abschluss eines NORMALEN Tests (kein Vertiefungsbogen) die uebertragbaren Aufgaben
// ins Deck ernten. Neue Karte: erste Wiederholung morgen. Vorhandene behalten ihren Plan.
function harvestSrCards(quiz) {
  if (!quiz || !Array.isArray(quiz.fragen)) return;
  if (Array.isArray(quiz.vertiefungFelder) && quiz.vertiefungFelder.length) return;
  const deck = loadSrDeck();
  let added = false;
  for (const q of quiz.fragen) {
    if (!srEligible(q)) continue;
    const id = srCardId(q);
    if (deck.cards[id]) continue; // schon im Deck -> Plan unangetastet
    deck.cards[id] = { q: srPickFields(q), ease: 2.5, interval: 1, reps: 0, lapses: 0, added: Date.now(), due: Date.now() + SR_DAY };
    added = true;
  }
  if (added) saveSrDeck(deck);
}
// Faellige Karten (due <= jetzt), aelteste Faelligkeit zuerst.
function srDueCards(deck) {
  const now = Date.now();
  return Object.entries((deck || loadSrDeck()).cards)
    .filter(([, c]) => c && c.q && (Number(c.due) || 0) <= now)
    .sort((a, b) => (Number(a[1].due) || 0) - (Number(b[1].due) || 0))
    .map(([id, c]) => ({ id, ...c }));
}
// SM-2-leicht: richtig -> laengeres Intervall (1,3,7, dann *ease); falsch -> zurueck auf 1 Tag.
function scheduleSrCard(deck, id, correct) {
  const c = deck.cards[id];
  if (!c) return;
  // Defensive: vorhandene Werte in gueltige Bereiche zwingen, bevor wir rechnen
  // (ein manipuliertes/fehlerhaftes Import-Intervall darf nie ein negatives oder
  // nie wieder faelliges Intervall erzeugen).
  let ease = Math.min(2.8, Math.max(1.3, Number(c.ease) || 2.5));
  let interval = Math.max(1, Math.round(Number(c.interval) || 1));
  let reps = Math.max(0, Math.trunc(Number(c.reps) || 0));
  let lapses = Math.max(0, Math.trunc(Number(c.lapses) || 0));
  if (correct) {
    reps += 1;
    ease = Math.min(2.8, ease + 0.1);
    interval = reps <= 1 ? 1 : reps === 2 ? 3 : reps === 3 ? 7 : Math.max(1, Math.round(interval * ease));
  } else {
    lapses += 1;
    reps = 0;
    ease = Math.max(1.3, ease - 0.2);
    interval = 1;
  }
  c.ease = ease; c.interval = interval; c.reps = reps; c.lapses = lapses;
  c.due = Date.now() + interval * SR_DAY;
  c.lastReviewed = Date.now();
}
// Lokale, deterministische Bewertung einer SR-Karte (kein LLM): { correct, musterantwort }.
function scoreSrCard(q, answer) {
  if (q.typ === "zahlenreihe") {
    return { correct: scoreZahlenreihe(q, answer).punkte === 10, musterantwort: String(q.korrekte_antwort || "") };
  }
  const correctIdx = mcCorrectIndices(q);
  const chosen = (q.optionen || []).indexOf(answer);
  const richtig = [...correctIdx][0];
  return { correct: chosen >= 0 && correctIdx.has(chosen), musterantwort: q.optionen && q.optionen[richtig] != null ? q.optionen[richtig] : (q.korrekte_antwort || "") };
}

// --- SR-Review-Session (eigene Globals, NICHT die Quiz-Globals) ---
let srSession = null; // { cards:[{id,q}], i, answer, checked, result, richtig, geübt }

function renderSrHomeCard() {
  const card = $("sr-card");
  if (!card) return;
  const due = srDueCards().length;
  if (!due) { card.classList.add("hidden"); return; }
  card.classList.remove("hidden");
  $("sr-text").textContent = `Fällige Übungen: ${due} ${due === 1 ? "Aufgabe" : "Aufgaben"} (Zahlenreihen & Sprachlogik) warten auf Wiederholung.`;
}

function openSrReview() {
  const due = srDueCards();
  if (!due.length) { goHome(); return; }
  srSession = { cards: due, i: 0, answer: "", checked: false, result: null, richtig: 0, geübt: 0 };
  showView("view-sr");
  renderSrCardView();
}

function renderSrCardView() {
  const wrap = $("sr-cards-container");
  if (!wrap || !srSession) return;
  wrap.innerHTML = "";
  const s = srSession;
  if (s.i >= s.cards.length) { renderSrSummary(wrap); return; }
  const q = s.cards[s.i].q;

  const prog = document.createElement("p");
  prog.className = "hint sr-progress";
  prog.textContent = `Karte ${s.i + 1} von ${s.cards.length}`;
  wrap.appendChild(prog);

  const frage = document.createElement("p");
  frage.className = "sr-frage";
  frage.textContent = q.frage;
  wrap.appendChild(frage);

  const area = document.createElement("div");
  area.className = "sr-answer";
  if (q.typ === "zahlenreihe") {
    const input = document.createElement("input");
    input.type = "text"; input.inputMode = "decimal"; input.autocomplete = "off"; input.className = "zr-field";
    input.setAttribute("aria-label", "Deine Antwort als Zahl");
    input.placeholder = "Deine Antwort (Zahl)";
    input.value = s.answer || "";
    if (s.checked) {
      input.readOnly = true;
      input.classList.add(s.result.correct ? "zr-correct" : "zr-wrong");
    } else {
      input.addEventListener("input", () => {
        s.answer = input.value;
        const btn = wrap.querySelector("button.primary");
        if (btn) btn.disabled = !String(input.value).trim();
      });
    }
    area.appendChild(input);
  } else {
    (q.optionen || []).forEach((opt) => {
      const btn = document.createElement("button");
      let cls = "option";
      if (s.answer === opt) cls += " selected";
      if (s.checked) {
        if (String(opt).trim() === (s.result.musterantwort || "").trim()) cls += " correct";
        else if (s.answer === opt) cls += " wrong";
      }
      btn.className = cls; btn.type = "button"; btn.textContent = opt;
      btn.setAttribute("aria-pressed", s.answer === opt ? "true" : "false");
      if (s.checked) btn.disabled = true;
      else btn.addEventListener("click", () => { s.answer = opt; renderSrCardView(); });
      area.appendChild(btn);
    });
  }
  wrap.appendChild(area);

  if (s.checked) {
    const sol = document.createElement("p");
    sol.className = "sr-solution " + (s.result.correct ? "ok" : "no");
    sol.textContent = (s.result.correct ? "Richtig. " : "Leider falsch. ") + "Richtige Antwort: " + s.result.musterantwort;
    wrap.appendChild(sol);
    if (q.lerninfo) {
      const li = document.createElement("p");
      li.className = "hint sr-lerninfo";
      li.textContent = q.lerninfo;
      wrap.appendChild(li);
    }
    const next = document.createElement("button");
    next.className = "primary"; next.type = "button";
    next.textContent = s.i + 1 >= s.cards.length ? "Fertig" : "Weiter";
    next.addEventListener("click", () => {
      s.i++; s.answer = ""; s.checked = false; s.result = null;
      renderSrCardView();
    });
    wrap.appendChild(next);
  } else {
    const check = document.createElement("button");
    check.className = "primary"; check.type = "button"; check.textContent = "Prüfen";
    check.disabled = !String(s.answer || "").trim();
    check.addEventListener("click", () => {
      const res = scoreSrCard(q, s.answer);
      s.checked = true; s.result = res; s.geübt++;
      if (res.correct) s.richtig++;
      // sofort persistieren (Plan aktualisieren), unabhaengig vom Rest der Session.
      const deck = loadSrDeck();
      scheduleSrCard(deck, s.cards[s.i].id, res.correct);
      saveSrDeck(deck);
      renderSrCardView();
    });
    wrap.appendChild(check);
  }
}

function renderSrSummary(wrap) {
  const s = srSession;
  const h = document.createElement("p");
  h.className = "sr-frage";
  h.textContent = "Geschafft!";
  wrap.appendChild(h);
  const p = document.createElement("p");
  p.className = "hint";
  p.textContent = `${s.geübt} ${s.geübt === 1 ? "Aufgabe" : "Aufgaben"} wiederholt, ${s.richtig} richtig. Gut bewertete Aufgaben kommen erst spaeter wieder dran.`;
  wrap.appendChild(p);
  const btn = document.createElement("button");
  btn.className = "primary"; btn.type = "button"; btn.textContent = "Zurück zu Meine Stellen";
  btn.addEventListener("click", () => goHome());
  wrap.appendChild(btn);
  srSession = null;
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
  renderSrHomeCard(); // Spaced Repetition: "Faellige Uebungen"-Karte, wenn welche faellig sind
}

// Gueltiger Fragenzahl-Bereich - identisch zum Stepper im Eingabe-Bildschirm
// (#num-questions). Eine Stelle. Die Obergrenze haengt an der Qualitaetsstufe:
// die guenstige Stufe wird niedriger gedeckelt (NUM_MAX_GUENSTIG), weil das Modell
// bei vielen Fragen einbricht (liefert zu wenige/teils fehlerhafte Fragen) und es
// unnoetig Zeit/Kosten kostet. Standard/beste behalten die hoehere Grenze. Man kann
// jederzeit einen weiteren Fragebogen erstellen.
const NUM_MIN = 4, NUM_MAX = 20, NUM_MAX_GUENSTIG = 15;
// Tier-abhaengige Obergrenze. Der guenstig-Deckel gilt NUR im Hosted-Modus: settings.tier
// bleibt beim Wechsel auf BYOK/lokal als Altwert erhalten (wird nie geloescht), steuert dort
// aber kein Modell — solche Nutzer wuerden sonst faelschlich auf 15 gedeckelt. Ohne Hosted
// (oder ohne settings) greift die hoehere Standardgrenze.
function numMax() {
  const hosted = settings && (settings.provider || "hosted") === "hosted";
  return hosted && settings.tier === "guenstig" ? NUM_MAX_GUENSTIG : NUM_MAX;
}

// Test-Einstellungen defensiv lesen: aeltere Stellen haben kein lastTestConfig,
// dann Standard (Lernmodus, mittel, 10 Fragen). Die gespeicherte Fragenzahl ist
// die tatsaechlich erzeugte (quiz.fragen.length) und kann daneben liegen, wenn
// ein Modell mehr/weniger Fragen liefert - auf den gueltigen Bereich (4-20, guenstig 4-15)
// klemmen, damit Stepper und Eingabe-Bildschirm nicht auseinander laufen.
function clampNum(n) {
  return Math.min(numMax(), Math.max(NUM_MIN, Math.round(n)));
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
// gleiches Verhalten (Bereich 4-20 (guenstig 4-15)) wie der statische Stepper im Eingabe-
// Bildschirm; onChange meldet jeden gueltigen Wert zurueck. opts.min hebt die
// Untergrenze an (fuer die Vertiefung, deren Minimum mit der Feldauswahl
// floatet); ohne opts bleibt es bei NUM_MIN. setMin(n) verschiebt die Grenze
// live und zieht den Wert bei Bedarf hoch; getValue() liefert den Stand.
function buildNumStepper(initial, onChange, opts = {}) {
  const clampMin = (m) => Math.min(numMax(), Math.max(NUM_MIN, Math.round(Number(m) || NUM_MIN)));
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
    inc.disabled = value >= numMax();
  };
  const setValue = (n, notify) => {
    value = Math.min(numMax(), Math.max(min, clampNum(n)));
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

// Kernpunkte-Panel der Stellenseite: scanbare Karten mit den wichtigsten Punkten
// der Anzeige (Aufgaben, Muss-/Optional-Anforderungen, Besonderheiten).
// Defensiv: fehlen die Daten (alte Stellen, lokale Tests),
// gibt die Funktion null zurueck und renderJob haengt nichts ein. Modell-Output
// wird ausschliesslich ueber textContent gesetzt (kein innerHTML).
const KERNPUNKTE_LIST_MAX = 8; // sehr lange Listen kappen (geschwaetzige Modelle)
const KERNPUNKTE_PREVIEW = 3;  // pro Karte initial sichtbare Punkte; Rest per "mehr anzeigen"
function buildKernpunktePanel(job) {
  // Quelle der Kernpunkte: bevorzugt job.kernpunkte (beim Abschluss via saveAttempt
  // gespeichert, autoritativ). Fehlt das, der Komfort-Cache (kpcache): Kernpunkte, die
  // schon bei der Generierung feststanden, aber noch nicht in einem abgeschlossenen
  // Versuch persistiert wurden - so erscheint das Panel ohne Durchspielen. Cache-Key ist
  // die Stellen-key (jobKey(job.jobText) === job.key). Kein Abgleich gegen job.jobText:
  // ein solches Render-Gate koennte frische Kernpunkte nach einem Merge verbergen.
  const wrapper =
    job && job.kernpunkte && job.kernpunkte.data ? job.kernpunkte
      : (job ? cachedKernpunkte(job.key) : null);
  const rawKp = wrapper && wrapper.data ? wrapper.data : null;
  if (!rawKp) return null;
  // Bereits gespeicherte Eintraege koennen noch fuehrende Listen-Marker und
  // Dubletten enthalten (aus aelteren Versionen). Beim Rendern dieselbe Bereinigung
  // und Deduplizierung anwenden wie bei frischer Extraktion - rein zur Anzeige, der
  // gespeicherte Datenbestand bleibt unveraendert. Dedup laeuft VOR dem
  // KERNPUNKTE_LIST_MAX-Cap, damit die Kappung eindeutige Eintraege zaehlt.
  const kp = dedupeKernpunkte({
    aufgaben: (Array.isArray(rawKp.aufgaben) ? rawKp.aufgaben : []).map(cleanKernpunktText).filter(Boolean),
    anforderungen_muss: (Array.isArray(rawKp.anforderungen_muss) ? rawKp.anforderungen_muss : []).map(cleanKernpunktText).filter(Boolean),
    anforderungen_optional: (Array.isArray(rawKp.anforderungen_optional) ? rawKp.anforderungen_optional : []).map(cleanKernpunktText).filter(Boolean),
    besonderheiten: (Array.isArray(rawKp.besonderheiten) ? rawKp.besonderheiten : []).map(cleanKernpunktText).filter(Boolean),
  });
  // Bewusst nur beschreibende Highlights - Gehalt/Benefits/Arbeitsmodell werden
  // nicht als Fakten angezeigt (Teaser-/Fehl-Info-Risiko, s. normalizeKernpunkte).
  // Alle vier Kategorien sind String-Listen und werden gleich (als ul) gerendert.
  const sections = [
    { key: "aufgaben", label: "Aufgaben" },
    { key: "anforderungen_muss", label: "Muss-Anforderungen" },
    { key: "anforderungen_optional", label: "Nice-to-have" },
    { key: "besonderheiten", label: "Besonderheiten" },
  ];
  const present = sections.filter((s) => Array.isArray(kp[s.key]) && kp[s.key].length);
  if (!present.length) return null;

  const panel = document.createElement("div");
  panel.className = "kernpunkte-panel";
  const heading = document.createElement("h3");
  heading.textContent = "Das Wichtigste auf einen Blick";
  panel.appendChild(heading);

  const hint = document.createElement("p");
  hint.className = "kernpunkte-hint hint";
  hint.textContent = "Automatisch aus der Anzeige extrahiert - bitte im Original prüfen.";
  panel.appendChild(hint);

  // Aktionsleiste zum Gegenpruefen: Link zur Original-Anzeige (nur bei echter
  // http(s)-URL) und Knopf, der den gespeicherten Anzeigentext in einem Fenster
  // zeigt (nur wenn Text vorhanden). Beide optional - fehlt beides, kein Balken.
  const actions = document.createElement("div");
  actions.className = "kernpunkte-actions";
  // Link NUR aus der Kernpunkte-Provenienz (srcUrl), nicht aus job.url: nur so ist
  // garantiert, dass die verlinkte Anzeige genau die ist, aus der diese Kernpunkte
  // (und der Anzeigentext unten) extrahiert wurden. Aeltere Kernpunkte ohne srcUrl
  // bekommen den Link erst beim naechsten Test aus einer URL-Quelle - lieber kein
  // Link als ein moeglicherweise falscher.
  const srcUrl = wrapper && typeof wrapper.srcUrl === "string"
    ? wrapper.srcUrl.trim()
    : "";
  if (/^https?:\/\//i.test(srcUrl)) {
    const link = document.createElement("a");
    link.className = "kernpunkte-action";
    link.href = srcUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "↗ Original-Anzeige";
    actions.appendChild(link);
  }
  const srcText = job && typeof job.jobText === "string" ? job.jobText.trim() : "";
  if (srcText) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "kernpunkte-action";
    btn.textContent = "Anzeigentext ansehen";
    btn.addEventListener("click", () => openJobTextModal(job));
    actions.appendChild(btn);
  }
  if (actions.children.length) panel.appendChild(actions);

  const grid = document.createElement("div");
  grid.className = "kernpunkte-grid";

  present.forEach((s) => {
    const card = document.createElement("div");
    card.className = "kernpunkte-card";
    const title = document.createElement("div");
    title.className = "kernpunkte-card-title";
    title.textContent = s.label;
    card.appendChild(title);

    const items = kp[s.key].slice(0, KERNPUNKTE_LIST_MAX);
    const ul = document.createElement("ul");
    ul.className = "kernpunkte-list";
    items.forEach((item, i) => {
      const li = document.createElement("li");
      li.textContent = String(item);
      // Lange Listen: nur die ersten KERNPUNKTE_PREVIEW Punkte sofort zeigen, der Rest
      // bleibt im DOM (per CSS ausgeblendet) und wird mit dem Knopf eingeblendet - so
      // muss man pro Stelle nicht so weit scrollen (v.a. mobil), ohne Re-Render.
      if (i >= KERNPUNKTE_PREVIEW) li.classList.add("kp-extra");
      ul.appendChild(li);
    });
    card.appendChild(ul);

    const extra = items.length - KERNPUNKTE_PREVIEW;
    if (extra > 0) {
      ul.classList.add("is-collapsed");
      const more = document.createElement("button");
      more.type = "button";
      more.className = "kernpunkte-more";
      more.setAttribute("aria-expanded", "false");
      const collapsedLabel = `+ ${extra} weitere anzeigen`;
      more.textContent = collapsedLabel;
      more.addEventListener("click", () => {
        const expanded = !ul.classList.toggle("is-collapsed"); // toggle gibt true = jetzt collapsed
        more.setAttribute("aria-expanded", expanded ? "true" : "false");
        more.textContent = expanded ? "weniger anzeigen" : collapsedLabel;
      });
      card.appendChild(more);
    }
    grid.appendChild(card);
  });

  panel.appendChild(grid);
  return panel;
}

// Druckpunkte-Panel (Plan 3.3): abgeleitete Knackpunkte fuers Gespraech. Strukturierte
// Karten (Titel + Begruendung + Uebungsfokus), bewusst getrennt von den belegten
// Kernpunkten. Quelle ist job.druckpunkte (job-level, beim Abschluss gesetzt). Fehlt das
// Feld oder ist es leer -> null (nichts anzeigen); alte/BYOK-Stellen bleiben unveraendert.
function buildDruckpunktePanel(job) {
  const raw = job && job.druckpunkte && Array.isArray(job.druckpunkte.data) ? job.druckpunkte.data : null;
  if (!raw || !raw.length) return null;
  const items = raw
    .filter((it) => it && typeof it === "object" && typeof it.titel === "string" && it.titel.trim())
    .slice(0, DRUCKPUNKTE_MAX);
  if (!items.length) return null;

  const panel = document.createElement("div");
  panel.className = "druckpunkte-panel";
  const heading = document.createElement("h3");
  heading.textContent = "Womit du im Gespräch rechnen solltest";
  panel.appendChild(heading);

  const hint = document.createElement("p");
  hint.className = "druckpunkte-hint hint";
  hint.textContent = "Wahrscheinliche Knackpunkte, abgeleitet aus der Anzeige und deinem Profil – kein Faktencheck, sondern Vorbereitung.";
  panel.appendChild(hint);

  const list = document.createElement("div");
  list.className = "druckpunkte-list";
  items.forEach((it) => {
    const card = document.createElement("div");
    card.className = "druckpunkte-card";
    const title = document.createElement("div");
    title.className = "druckpunkte-card-title";
    title.textContent = it.titel.trim();
    card.appendChild(title);

    const beg = typeof it.begruendung === "string" ? it.begruendung.trim() : "";
    if (beg) {
      const p = document.createElement("p");
      p.className = "druckpunkte-begruendung";
      p.textContent = beg;
      card.appendChild(p);
    }
    const fok = typeof it.uebungsfokus === "string" ? it.uebungsfokus.trim() : "";
    if (fok) {
      const p = document.createElement("p");
      p.className = "druckpunkte-fokus";
      const label = document.createElement("span");
      label.className = "druckpunkte-fokus-label";
      label.textContent = "Übungsfokus: ";
      p.appendChild(label);
      p.appendChild(document.createTextNode(fok));
      card.appendChild(p);
    }
    list.appendChild(card);
  });
  panel.appendChild(list);
  return panel;
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

  // Anzahl Fragen (Stepper 4-20 / guenstig 4-15, ersetzt das frühere Dropdown)
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
  const provider = settings.provider || "hosted";
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
        await saveThemenfelder(job, derived, prog.level);
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
        await saveThemenfelder(job, derived, prog.level);
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
  // Reihenfolge (stabil ueber nextSibling, statt fragiler children[i]-Indizes):
  // Titel -> Startknoepfe -> Status&Termin (Cockpit) -> Kernpunkte -> Druckpunkte
  // -> Fortschritt/Verlauf. Alte Stellen ohne kernpunkte/druckpunkte liefern null.
  const startPanel = buildStartPanel(job);
  block.insertBefore(startPanel, block.children[1] || null);
  const cockpitPanel = buildCockpitPanel(job);
  block.insertBefore(cockpitPanel, startPanel.nextSibling);
  const kpPanel = buildKernpunktePanel(job);
  if (kpPanel) block.insertBefore(kpPanel, cockpitPanel.nextSibling);
  const dpPanel = buildDruckpunktePanel(job);
  if (dpPanel) block.insertBefore(dpPanel, (kpPanel || cockpitPanel).nextSibling);
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
  trackEvent(testMode === "pruefung" ? "exam-start" : "learn-start");
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
  // Stepper setzt den Wert geklemmt (4-20, guenstig 4-15) und zieht Anzeige/Buttons mit; aeltere
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
  settingsOrigin = "gate";
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
  // Konto nur im Hosted-Modus (Auth gehoert zum gehosteten Dienst).
  $("row-account").classList.toggle("hidden", !isHosted);
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
  // Die Opus-Option richtet renderAccountSection() unten ein: es setzt creditsState frisch
  // (erst "unbekannt", dann der bestaetigte Server-Stand) und ruft renderCreditsUI →
  // updateTierOptions. Hier NICHT mit einem evtl. veralteten Cache vorgreifen, sonst koennte
  // ein stale Flag-aus eine gueltige beste-Absicht faelschlich normalisieren.
  updateSettingsProviderUI();
  if ($("provider").value === "local") {
    populateLocalModelSelect([], settings.model);
    $("local-models-status").textContent = "";
  } else if ($("provider").value !== "hosted") {
    populateModelSelect($("provider").value, settings.model);
  }
  // Profil (eigener Key) in die Auswahlfelder spiegeln; fehlende Felder → "" (Keine Angabe).
  $("profile-trajectory").value = profile.trajectory || "";
  $("profile-erfahrung").value = profile.erfahrung || "";
  $("profile-ausbildung").value = profile.ausbildung || "";
  $("profile-branche").value = profile.branche || "";
  $("account-msg").textContent = "";
  renderAccountSection();
}

// Spiegelt den Anmeldezustand im Settings-Konto-Bereich (nur Status + Abmelden/Anmelden;
// die eigentlichen Login-Controls leben im view-login). Mit Token wird best-effort
// /auth/me abgefragt; ein 401 verwirft das (abgelaufene) Token still.
async function renderAccountSection() {
  const status = $("account-status");
  const showLoggedIn = (email) => {
    $("account-loggedout").classList.add("hidden");
    $("account-loggedin").classList.remove("hidden");
    status.textContent = email ? `Angemeldet als ${email}.` : "Angemeldet.";
  };
  const showLoggedOut = () => {
    $("account-loggedin").classList.add("hidden");
    $("account-loggedout").classList.remove("hidden");
    status.textContent = "Nicht angemeldet.";
    resetCreditsState();
    renderCreditsUI();
  };
  const tok = settings.authToken;
  if (!tok) { showLoggedOut(); return; }
  showLoggedIn(null); // optimistisch, bis /auth/me antwortet
  // Guthaben bis zur frischen Bestaetigung als "unbekannt" behandeln und ausblenden: bei
  // einer fehlschlagenden Auffrischung (5xx/Timeout/ungueltiges JSON) lieber kurz nichts
  // zeigen als einen veralteten Geldstand faelschlich als aktuell auszugeben.
  resetCreditsState();
  renderCreditsUI();
  try {
    const r = await fetch(hostedBase() + "/auth/me", { headers: authHeaders() });
    // Ueberholt? Wenn sich der Token waehrend des Requests geaendert hat (Logout oder
    // Konto-Wechsel), darf diese Antwort weder UI noch creditsState anfassen — sonst
    // repaintet sie den Stand des vorigen Kontos (z. B. fremdes Guthaben nach Logout).
    if (settings.authToken !== tok) return;
    if (r.status === 401) { clearAuthToken(); showLoggedOut(); return; }
    if (r.ok) {
      const d = await r.json();
      showLoggedIn(d.user && d.user.email);
      // /auth/me fuehrt seit dem Credits-Vertrag creditsEnabled + credits + opusTestCredits
      // (additiv, defensiv gelesen: aeltere Worker liefern die Felder evtl. nicht).
      creditsState = {
        credits: Number.isFinite(d.credits) ? d.credits : null,
        creditsEnabled: d.creditsEnabled === true,
        opusTestCredits: Number.isFinite(d.opusTestCredits) ? d.opusTestCredits : null,
        // /auth/me liefert freeRemaining (noch) nicht — defensiv lesen; den echten Stand holt
        // refreshBalance() unten von /api/balance nach (nur wenn Credits live sind).
        freeRemaining: Number.isFinite(d.freeRemaining) ? d.freeRemaining : null,
        loaded: true,
        dirty: false,
      };
      renderCreditsUI();
      if (creditsState.creditsEnabled) refreshBalance(); // freeRemaining (+ frisches Guthaben) holen
    }
  } catch { /* offline: optimistischer Zustand bleibt */ }
}

// --- Login-Screen (view-login) -------------------------------------------

// Fuehrt zum Anmelde-Screen und zeigt optional eine Meldung (z. B. "erneut anmelden").
function promptHostedLogin(msg) {
  $("login-email").value = "";
  $("login-msg").textContent = msg || "";
  showView("view-login");
}

$("login-magic-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const input = $("login-email");
  // Native Constraint-Validierung (type=email + required) → lokalisierte Browser-Meldung.
  if (!input.checkValidity()) { input.reportValidity(); return; }
  const email = input.value.trim().toLowerCase(); // Sanitisierung (Worker normalisiert ebenfalls)
  const btn = $("btn-login-magic");
  btn.disabled = true;
  $("login-msg").textContent = "Anmeldelink wird gesendet...";
  try {
    // Turnstile (Anti-Bot) wie bei der Generierung – an die Aktion und den Body gebunden.
    const magicBody = JSON.stringify({ email });
    const tkn = await getTurnstileToken("magic-link", await sha256hex(magicBody));
    const headers = { "Content-Type": "application/json" };
    if (tkn) headers["CF-Turnstile-Token"] = tkn;
    const res = await fetch(hostedBase() + "/auth/magic/start", {
      method: "POST",
      headers,
      body: magicBody,
    });
    // Auf den Status verzweigen (Codex-Review R6): nur 202 ist „gesendet". Sonst klare
    // Rueckmeldung, statt den Nutzer auf eine nie gesendete Mail warten zu lassen.
    if (res.status === 202) {
      // Bewusst neutrale Meldung (keine Auskunft, ob die Adresse existiert).
      $("login-msg").textContent = "Wenn alles passt, haben wir dir einen Anmeldelink geschickt. Bitte dein Postfach prüfen (auch Spam).";
    } else if (res.status === 403) {
      $("login-msg").textContent = "Sicherheitsprüfung fehlgeschlagen. Bitte die Seite neu laden und erneut versuchen.";
    } else if (res.status === 400) {
      $("login-msg").textContent = "Bitte eine gültige E-Mail-Adresse eingeben.";
    } else {
      $("login-msg").textContent = "Der Dienst ist momentan nicht erreichbar. Bitte später erneut versuchen.";
    }
  } catch {
    $("login-msg").textContent = "Senden fehlgeschlagen. Bitte Internetverbindung prüfen und erneut versuchen.";
  } finally {
    btn.disabled = false;
  }
});

$("btn-login-google").addEventListener("click", async () => {
  const btn = $("btn-login-google");
  btn.disabled = true;
  $("login-msg").textContent = "Weiterleitung zu Google...";
  try {
    // PKCE-artige Browser-Bindung: Verifier in sessionStorage, nur dessen Hash an den
    // Server. Nach dem Google-Redirect tauscht /auth/exchange den Code MIT dem Verifier.
    const verifier = randomVerifier();
    try { sessionStorage.setItem(OAUTH_VERIFIER_KEY, verifier); } catch { /* egal */ }
    const vh = await sha256hex(verifier);
    // Turnstile (Anti-Bot) wie bei Magic-Link/Generierung – an die Aktion und den vh-Wert
    // gebunden (google-start hat keinen Body; der Worker hasht den vh-Query-Wert).
    const tkn = await getTurnstileToken("google-start", await sha256hex(vh));
    const headers = { Accept: "application/json" };
    if (tkn) headers["CF-Turnstile-Token"] = tkn;
    const r = await fetch(hostedBase() + "/auth/google/start?vh=" + encodeURIComponent(vh), { headers });
    if (r.ok) {
      const d = await r.json();
      if (d.url) { window.location.href = d.url; return; }
    }
    $("login-msg").textContent = r.status === 503
      ? "Der Google-Login ist noch nicht eingerichtet."
      : "Google-Anmeldung momentan nicht möglich. Bitte später erneut versuchen.";
  } catch {
    $("login-msg").textContent = "Keine Verbindung. Bitte später erneut versuchen.";
  } finally {
    btn.disabled = false;
  }
});

// Escape-Pfad: ohne Konto weiter mit eigenem Schluessel / lokal.
$("link-login-settings").addEventListener("click", (e) => {
  e.preventDefault();
  settingsOrigin = "gate";
  initSettingsForm();
  showView("view-settings");
});

// Aus den Einstellungen zum Login-Screen.
$("btn-account-login").addEventListener("click", () => promptHostedLogin());

$("btn-account-logout").addEventListener("click", async () => {
  try {
    await fetch(hostedBase() + "/auth/logout", { method: "POST", headers: authHeaders() });
  } catch { /* egal: lokal abmelden reicht */ }
  clearAuthToken();
  // Beim Verlassen des Kontos den Hintergrund-Job-Zeiger verwerfen, damit eine fremde
  // jobId nicht ueber einen spaeteren Login eines anderen Kontos weiterverwendet wird
  // (Job-Isolation, Codex-Review). Der Job selbst laeuft/raeumt serverseitig.
  clearActiveJob();
  renderActiveJobCard(null);
  $("account-msg").textContent = "Abgemeldet.";
  renderAccountSection();
});

$("btn-settings").addEventListener("click", () => {
  settingsOrigin = "app";
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
  // Wechsel auf hosted in einem offenen Formular: Konto/Guthaben laden, damit Opus-Option und
  // Guthaben-Zeile sofort stimmen (sonst erst nach Schliessen/Oeffnen der Einstellungen).
  if ($("provider").value === "hosted") renderAccountSection();
});

$("model").addEventListener("change", updateModelDesc);

// Kostenhinweis der Qualitaetsstufe bei Auswahl aktualisieren (z. B. „≈ 0,60 € pro Test“)
// sowie den Gratis-Kontingent-/Overflow-Hinweis fuer die Gratis-Stufen.
$("tier").addEventListener("change", () => { updateTierHint(); updateFreeTierHint(); });

// Aufladen-Buttons (3/5/10 €) → Paddle-Checkout.
document.querySelectorAll(".btn-topup").forEach((b) => {
  b.addEventListener("click", () => startTopup(Number(b.dataset.eur)));
});

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
    // autoUseCredits (Opt-in: Overflow ohne jedes Mal nachzufragen) additiv mitspeichern;
    // der Haken existiert nur bei aktivem Credits-Flag, sonst bleibt der alte Wert erhalten.
    const autoCb = $("auto-use-credits");
    const autoUseCredits = creditsState.creditsEnabled && autoCb ? autoCb.checked : !!settings.autoUseCredits;
    settings = { ...settings, provider: "hosted", tier: $("tier").value || "standard", autoUseCredits };
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
  // Profil unabhaengig von settings in seinem eigenen Key sichern (leere Auswahl → entfernt).
  saveProfile({
    trajectory: $("profile-trajectory").value,
    erfahrung: $("profile-erfahrung").value,
    ausbildung: $("profile-ausbildung").value,
    branche: $("profile-branche").value,
  });
  // Wurde aus einem Einrichtungs-Gate (Login/Onboarding) gespeichert und ist der
  // Anbieter jetzt nutzbar, in die App (Startliste) statt per History zurueck aufs
  // Gate - sonst landet man nach dem Einrichten wieder davor. Sonst ueber die
  // History zurueck: so bleibt der Browser-/Geraete-Zurueck-Knopf konsistent (kein
  // doppelter Vorwaerts-Eintrag) und ein laufender Test (view-quiz/result) bleibt
  // erhalten - dieselbe Ansicht, die goReturn angesteuert haette.
  if (settingsOrigin === "gate" && isProviderConfigured()) goHome();
  else history.back();
});

$("btn-cancel-settings").addEventListener("click", () => history.back());

/* ---------- Daten-Export / -Import (Umzug zwischen Adressen/Browsern) ---------- */

// Sichert beide localStorage-Bestaende in eine versionierte JSON-Datei
function exportData() {
  // authToken (Live-Session-Bearer) NIE exportieren: er landet sonst im Backup-JSON und
  // koennte von jedem, der die Datei liest, bis zum Logout/Ablauf als Bearer replayt werden
  // (Codex-Review R8). Beim Import wird ein fremdes Token ohnehin nicht uebernommen.
  const { authToken, ...exportedSettings } = loadSettings();
  const data = {
    app: "bewerbungstool",
    version: 1,
    exportedAt: new Date().toISOString(),
    settings: exportedSettings,
    profile: loadProfile(), // nicht-identifizierendes Profil gehoert ins Backup (Plan 3.1)
    srDeck: loadSrDeck(), // Spaced-Repetition-Deck (Plan 3.8) gehoert ins Backup/den Umzug
    history: loadHistory(),
    reports: loadReports(),
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
async function importData(text) {
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("Die Datei ist kein gültiges JSON.");
  }
  if (!data || typeof data !== "object" || (!data.settings && !data.history && !data.reports && !data.profile)) {
    throw new Error("Die Datei enthält keine erkennbaren Bewerbungstool-Daten.");
  }

  // Profil additiv und feldweise uebernehmen: gueltige importierte Werte ueberschreiben,
  // leere/ungueltige werden ignoriert (sanitizeProfile). Nicht-destruktiv wie die uebrigen
  // Importpfade — ein vorhandenes Feld bleibt, wenn der Import dafuer nichts Gueltiges liefert.
  let profileImported = false;
  if (data.profile && typeof data.profile === "object") {
    const inc = sanitizeProfile(data.profile);
    if (Object.keys(inc).length) {
      saveProfile({ ...loadProfile(), ...inc });
      profileImported = true;
    }
  }

  // SR-Deck additiv mergen: importierte Karten nur uebernehmen, wenn lokal noch nicht
  // vorhanden (vorhandener Wiederhol-Plan bleibt unangetastet) und defensiv validiert.
  let srImported = 0;
  if (data.srDeck && typeof data.srDeck === "object" && data.srDeck.cards && typeof data.srDeck.cards === "object") {
    const deck = loadSrDeck();
    // Nur in die freie Kapazitaet importieren: ein Import darf den FIFO-Trim in
    // saveSrDeck nie dazu bringen, vorhandene LOKALE Karten zu verdraengen.
    let room = SR_DECK_MAX - Object.keys(deck.cards).length;
    for (const [id, c] of Object.entries(data.srDeck.cards)) {
      if (room <= 0) break;
      if (deck.cards[id] || !c || typeof c !== "object" || !c.q || !srEligible(c.q)) continue;
      deck.cards[id] = {
        q: srPickFields(c.q),
        ease: Math.min(2.8, Math.max(1.3, Number(c.ease) || 2.5)),
        interval: Math.max(1, Math.round(Number(c.interval) || 1)),
        reps: Number.isFinite(Number(c.reps)) ? Math.max(0, Math.trunc(Number(c.reps))) : 0,
        lapses: Number.isFinite(Number(c.lapses)) ? Math.max(0, Math.trunc(Number(c.lapses))) : 0,
        added: Number.isFinite(Number(c.added)) ? Number(c.added) : Date.now(),
        due: Number.isFinite(Number(c.due)) ? Number(c.due) : Date.now() + SR_DAY,
      };
      srImported++;
      room--;
    }
    if (srImported) saveSrDeck(deck);
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
    if (tierImp === "standard" || tierImp === "guenstig" || tierImp === "beste") merged.tier = tierImp;
    // autoUseCredits BEWUSST NICHT importieren: ein "automatisch Guthaben verwenden" darf nur
    // durch ausdrueckliches lokales Anhaken aktiviert werden, nie still durch ein Backup-File
    // (sonst koennte ein importiertes Backup unbemerkt Abbuchungen scharf schalten). Der lokale
    // Wert aus {...cur} bleibt erhalten.
    settings = merged;
    saveSettings(settings);
    settingsImported = true;
  }

  let newJobs = 0;
  let newAttempts = 0;
  if (data.history && Array.isArray(data.history.jobs)) {
    await mutateHistory((h) => {
    data.history.jobs.forEach((impJob) => {
      if (!impJob || !impJob.key || !Array.isArray(impJob.attempts)) return;
      // Nur Versuche mit verwertbarem Zeitstempel UND den tragenden Feldern
      // uebernehmen. Es reicht nicht, dass quiz/result irgendein Objekt sind:
      // der Verlauf liest att.quiz.fragen.length und den Score, die Detail-/
      // Review-Ansicht iteriert ueber quiz.fragen. Ein Versuch mit gueltigem
      // date, aber leerem quiz ({}) oder ohne brauchbaren Score wuerde die Historie
      // vergiften und Verlauf/openAttempt/Rendern zum Absturz bringen. result
      // selbst wird ueberall defensiv gelesen (gesamt/ergebnisse optional),
      // muss also nur ein Objekt sein. Stellen ohne brauchbare Versuche werden
      // uebersprungen - ein leeres attempts-Array wuerde sonst beim Rendern
      // abstuerzen.
      //
      // Score-Pruefung dieselbe Vertrags-Quelle wie Anzeige/Fortschritt (attemptPct):
      // ein brauchbarer Score ist top-level prozent ODER result.gesamt.prozent. Aelteren
      // Backups fehlt das top-level Spiegel-Feld - sie wuerden sonst beim Restore still
      // verworfen (Datenverlust). Nach der Pruefung das top-level prozent normalisieren,
      // damit der restaurierte Versuch ueberall denselben Score liefert wie ein frisch
      // gespeicherter.
      const incoming = impJob.attempts
        .filter(
          (a) =>
            a && typeof a === "object" && Number.isFinite(a.date) &&
            (readPct(a.prozent) !== null ||
              readPct(a.result && a.result.gesamt && a.result.gesamt.prozent) !== null) &&
            a.quiz && typeof a.quiz === "object" && Array.isArray(a.quiz.fragen) && a.quiz.fragen.length &&
            a.result && typeof a.result === "object"
        )
        // Immer ein normalisiertes numerisches top-level prozent schreiben (readPct +
        // Fallback auf result.gesamt.prozent, geklemmt). So wird ein leeres/null/krummes
        // Spiegel-Feld nicht als echte 0 uebernommen, sondern aus dem kanonischen
        // result-Score gefuellt; Versuche ohne jeden brauchbaren Score sind oben schon
        // herausgefiltert (kein stilles 0 %).
        .map((a) => ({ ...a, prozent: attemptPct(a) }));
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
        // Kernpunkte NICHT ungeprueft aus dem Backup uebernehmen, sondern gegen den
        // eigenen jobText des Imports neu erden (s. regroundImportedKernpunkte) -
        // sonst koennte ein korruptes/editiertes Backup falsche Fakten unterschieben.
        h.jobs.push({
          ...impJob,
          attempts: incoming,
          kernpunkte: regroundImportedKernpunkte(impJob),
          // Druckpunkte NICHT ungeprueft aus dem Spread uebernehmen: explizit auf die
          // gesaeuberte Wrapper-Form (oder undefined) ueberschreiben, analog kernpunkte.
          druckpunkte: sanitizeImportedDruckpunkte(impJob),
          // Cockpit-Felder (Status/Termin) ebenfalls explizit ueberschreiben statt roh aus
          // dem Spread: nur gueltige Werte, sonst undefined (Feld faellt weg).
          status: isValidStatus(impJob.status) ? impJob.status : undefined,
          gespraechAm: jobGespraechAm(impJob) || undefined,
          ...(impIKey ? { identityKey: impIKey } : {}),
        });
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
      // Kernpunkte aus dem Import additiv nachtragen, falls lokal noch keine
      // vorhanden sind (analog Arbeitgeber/Ort). Beim Neuanlegen oben uebernimmt
      // der Spread sie ohnehin.
      if (impJob.kernpunkte && !existing.kernpunkte) {
        const rk = regroundImportedKernpunkte(impJob);
        if (rk) existing.kernpunkte = rk;
      }
      // Druckpunkte additiv aus dem Import nachtragen, falls lokal noch keine vorhanden
      // sind. Dieselbe defensive Saeuberung wie auf dem Neu-Pfad (gepruefte Wrapper-Form,
      // saubere data) - ein praepariertes Backup kann nichts Krummes unterschieben.
      if (!existing.druckpunkte) {
        const dpImp = sanitizeImportedDruckpunkte(impJob);
        if (dpImp) existing.druckpunkte = dpImp;
      }
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
      // Cockpit-Felder additiv nachtragen, falls lokal noch nicht gesetzt (nicht-destruktiv,
      // nur gueltige Werte) - ein praepariertes Backup kann nichts Krummes unterschieben.
      if (!isValidStatus(existing.status) && isValidStatus(impJob.status)) existing.status = impJob.status;
      if (!jobGespraechAm(existing)) { const g = jobGespraechAm(impJob); if (g) existing.gespraechAm = g; }
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
    });
  }

  // Gemeldete Fragen defensiv und STRENG nicht-destruktiv mergen: importierte
  // Reports auf die gebundene Form kappen (sonst koennte ein einzelner riesiger
  // Eintrag ueber den FIFO-Retry in saveReports bestehende Reports verdraengen),
  // per id dedupen, nie bestehende Reports verlieren, den Import nie abbrechen.
  let newReports = 0;
  let reportsDropped = 0;
  if (data.reports && Array.isArray(data.reports.reports)) {
    const existing = loadReports();
    const ids = new Set(existing.reports.map((x) => x && x.id).filter(Boolean));
    const sanitizedNew = [];
    data.reports.reports.forEach((rep) => {
      const s = sanitizeReport(rep);
      if (!s || ids.has(s.id)) return;
      ids.add(s.id);
      sanitizedNew.push(s);
    });
    if (sanitizedNew.length) {
      // Nie bestehende Reports verdraengen: nur so viele neue uebernehmen, wie
      // unter REPORTS_MAX Platz ist (Rest gilt als verworfen).
      const available = Math.max(0, REPORTS_MAX - existing.reports.length);
      const toAdd = sanitizedNew.slice(0, available);
      reportsDropped = sanitizedNew.length - toAdd.length;
      if (toAdd.length) {
        saveReports({ version: 1, reports: existing.reports.concat(toAdd) });
        const after = new Set(loadReports().reports.map((x) => x && x.id).filter(Boolean));
        // Wurde unter Speicherdruck ein BESTEHENDER Report verdraengt, verletzt das
        // das nicht-destruktive Versprechen -> alten Stand wiederherstellen (er hat
        // vorher gepasst) und den Import komplett als verworfen ausweisen.
        const existingLost = existing.reports.some((x) => x && x.id && !after.has(x.id));
        if (existingLost) {
          saveReports({ version: 1, reports: existing.reports.slice() });
          newReports = 0;
          reportsDropped = sanitizedNew.length;
        } else {
          newReports = toAdd.filter((s) => after.has(s.id)).length;
          reportsDropped = sanitizedNew.length - newReports;
        }
      }
    }
  }

  const parts = [];
  if (settingsImported) parts.push("Einstellungen übernommen");
  if (profileImported) parts.push("Profil übernommen");
  if (srImported) parts.push(`${srImported} Übungskarte${srImported === 1 ? "" : "n"} übernommen`);
  parts.push(
    (newJobs === 1 ? "1 neue Stelle" : newJobs + " neue Stellen") +
      ", " +
      (newAttempts === 1 ? "1 neuer Versuch" : newAttempts + " neue Versuche")
  );
  if (newReports) {
    parts.push(newReports === 1 ? "1 neue Meldung" : newReports + " neue Meldungen");
  }
  if (reportsDropped) {
    parts.push(reportsDropped === 1
      ? "1 Meldung nicht gespeichert (Speicher voll)"
      : reportsDropped + " Meldungen nicht gespeichert (Speicher voll)");
  }
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
    const summary = await importData(await file.text());
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
// Keine Persistenz - wie zuvor ist der Standard bei jedem Laden 10. Die Obergrenze
// ist tier-abhaengig (numMax(): 20, guenstig 15); render() klemmt darauf.
function initNumStepper() {
  const NUM_DEFAULT = 10;
  const input = $("num-questions");
  const display = $("num-display");
  const dec = $("num-dec");
  const inc = $("num-inc");
  if (!input || !display || !dec || !inc) return;

  const clamp = (n) => Math.min(numMax(), Math.max(NUM_MIN, n));
  const render = () => {
    const n = clamp(Number(input.value) || NUM_DEFAULT);
    input.value = String(n);
    display.textContent = String(n);
    dec.disabled = n <= NUM_MIN;
    inc.disabled = n >= numMax();
  };
  const step = (delta) => {
    input.value = String(clamp((Number(input.value) || NUM_DEFAULT) + delta));
    render();
  };
  // Erlaubt es anderen Stellen (z. B. "Weiter ueben"), den Wert programmatisch
  // zu setzen und die Anzeige/Buttons mitzuziehen.
  input.setValue = (n) => { input.value = String(n); render(); };
  // Erlaubt es, die Obergrenze nach einem Stufenwechsel neu anzuwenden (render klemmt
  // den Wert ueber numMax() auf das Tier-Maximum) - showView ruft das beim Anzeigen des
  // Eingabe-Bildschirms auf, damit guenstig nie mehr als NUM_MAX_GUENSTIG zeigt.
  input.refreshMax = render;

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

// Top-Nav "Meine Stellen": fuehrt zur Startliste (Home, via goHome). Die Historie
// einer einzelnen Stelle ist von dort per Tippen auf die Stelle erreichbar; die
// Vollansicht aller Stellen ueber "Alle Stellen ansehen" auf der Startliste.
// (Anders als der fruehere Peek-Button "Historie" ist dies ein Ziel-Button - er
// kehrt bewusst zur Startliste zurueck statt per goReturn in einen laufenden Test;
// "Einstellungen" bewahrt den laufenden Test weiterhin.)
$("btn-home").addEventListener("click", goHome);

$("btn-history-back").addEventListener("click", () => history.back());
// Spaced Repetition (Plan 3.8)
$("sr-card-btn").addEventListener("click", openSrReview);
$("btn-sr-back").addEventListener("click", () => history.back());

// Startliste und Stellen-Subpage
$("btn-new-job").addEventListener("click", () => {
  // Neue Stelle = bewusster Frischstart (vom Nutzer so entschieden): Felder leeren
  // UND den Entwurf zuruecksetzen, damit kein zuvor geoeffneter Stellentext/-Link
  // und kein alter Entwurf mehr auftaucht - auch nicht nach einem Reload oder ueber
  // einen anderen Save-Pfad (z. B. Tab-Wechsel). Der Entwurf ist bewusst nur Komfort
  // (s. saveDraft), daher ist das Verwerfen hier vertretbar.
  // 1) ausstehenden debounced Save abbrechen, 2) Felder + lastFetch leeren,
  // 3) persistierten Entwurf entfernen.
  clearTimeout(draftSaveTimer);
  draftSaveTimer = 0;
  $("job-url").value = "";
  $("job-text").value = "";
  lastFetch = { url: "", text: "" };
  try { localStorage.removeItem(DRAFT_KEY); } catch { /* Entwurf ist nur Komfort */ }
  showView("view-input");
});
$("active-job-start").addEventListener("click", startReadyJob);
$("resume-continue").addEventListener("click", resumeLearnSession);
$("resume-discard").addEventListener("click", discardLearnSession);

// Lerntest sichern, wenn der Tab in den Hintergrund geht oder geschlossen wird —
// auf Mobilgeraeten der zuverlaessigste Zeitpunkt (pagehide feuert dort nicht immer).
document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") saveLearnSession(); });
window.addEventListener("pagehide", saveLearnSession);
$("btn-input-back").addEventListener("click", () => history.back());
$("btn-job-back").addEventListener("click", () => history.back());
$("btn-all-jobs").addEventListener("click", () => {
  renderHistory();
  showView("view-history");
  trackEvent("history-open");
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

// Rueckfrage vor dem bezahlten Overflow: ist das Gratis-Tageskontingent aufgebraucht, fragt
// der Server mit 402 quota-exhausted zurueck. Erst NACH ausdruecklicher Bestaetigung sendet der
// Client den Generierungs-Request erneut mit payWithCredits:true (keine unbeabsichtigten Kosten,
// CLAUDE.md-Leitplanke). Promise-basiert: resolve(true)=erstellen, resolve(false)=abbrechen.
let overflowConfirmResolve = null;
let overflowConfirmReturnFocus = null;
function openOverflowConfirm({ tier, priceCredits }) {
  const euro = formatGuthabenEuro(Number.isFinite(priceCredits) ? priceCredits : tierPriceCredits(tier));
  // euro/Label aus kontrollierten Werten (Zahl bzw. fester Stufenname) → kein XSS.
  $("overflow-text").innerHTML =
    `Dein kostenloses Tageskontingent für heute ist aufgebraucht. Diesen Test in Qualität ` +
    `<strong>${tierLabelFor(tier)}</strong> für <strong>${euro}</strong> aus deinem Guthaben erstellen?`;
  overflowConfirmReturnFocus = document.activeElement;
  $("overflow-modal").classList.remove("hidden");
  $("btn-overflow-confirm").focus();
  return new Promise((resolve) => { overflowConfirmResolve = resolve; });
}
function closeOverflowConfirm(result) {
  $("overflow-modal").classList.add("hidden");
  const resolve = overflowConfirmResolve;
  overflowConfirmResolve = null;
  if (overflowConfirmReturnFocus && typeof overflowConfirmReturnFocus.focus === "function") {
    overflowConfirmReturnFocus.focus();
  }
  overflowConfirmReturnFocus = null;
  if (resolve) resolve(result);
}
$("btn-overflow-confirm").addEventListener("click", () => closeOverflowConfirm(true));
$("btn-overflow-cancel").addEventListener("click", () => closeOverflowConfirm(false));

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
$("btn-confirm-delete").addEventListener("click", async () => {
  const job = confirmDeleteJob;
  const after = confirmDeleteAfter;
  // Beim Loeschen wird der ausloesende Knopf gleich aus dem DOM entfernt
  // (afterDelete baut die Ansicht neu auf). Den Fokus daher nicht dorthin
  // zuruecklegen - sonst landet er nach dem Neuaufbau am <body>. Stattdessen
  // unten gezielt auf die Ueberschrift der nun sichtbaren Ansicht setzen.
  confirmDeleteReturnFocus = null;
  closeConfirmDelete();
  if (job) {
    // Erst loeschen (await: Schreiben laeuft unter dem History-Lock), dann die
    // Ansicht neu aufbauen - sonst zeigte after() noch den alten Stand. Ein Lock-/
    // Schreibfehler ist sehr selten; die Ansicht trotzdem neu aufbauen, damit sie
    // konsistent bleibt (Rejection wird nicht unbehandelt).
    try {
      await deleteJob(job);
    } catch { /* Loeschen fehlgeschlagen: Ansicht dennoch konsistent aufbauen */ }
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

/* ---------- Frage melden (rein lokal, kein API-Call) ---------- */
// Auswahl-Modal nach dem confirm-delete-Muster: classList-Toggle, Fokus in den
// Dialog, beim Schliessen zurueck auf den ausloesenden Knopf. Escape und
// Overlay-Klick schliessen (siehe ESCAPE_CLOSERS und den Klick-Handler unten).
const REPORT_KATEGORIEN = [
  ["fachlich_falsch", "Antwort fachlich falsch"],
  ["irrelevant", "Thematisch irrelevant für die Stelle"],
  ["sprachliche_qualitaet", "Sprachliche Qualität / unverständlich"],
  ["dublette", "Wiederholung / schon gestellt"],
  ["sonstiges", "Sonstiges"],
];
let reportReturnFocus = null;
let reportCtx = null; // { q, kontext, button }

// Knopf an einen Container haengen: dezenter ghost-Link "Frage melden". Wurde
// die Frage schon gemeldet (aus den Reports abgeleitet), zeigt er "Gemeldet"
// und ist deaktiviert - keine Doppelmeldung. kontext traegt jobKey/Titel/
// provider/tier/model fuer den spaeteren Report.
function appendReportButton(container, q, kontext) {
  if (!container || !q) return;
  const key = reportFrageKey(q);
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "report-btn ghost";
  const gemeldet = reportStatusForFrage(key, kontext && kontext.jobKey);
  if (gemeldet) {
    btn.textContent = "Gemeldet";
    btn.disabled = true;
  } else {
    btn.textContent = "Frage melden";
    btn.addEventListener("click", () => openReportModal(q, kontext || {}, btn));
  }
  container.appendChild(btn);
}

function updateReportSubmitState() {
  const anyCat = REPORT_KATEGORIEN.some(([code]) => {
    const cb = $("report-cat-" + code);
    return cb && cb.checked;
  });
  const note = ($("report-note").value || "").trim();
  $("btn-report-submit").disabled = !(anyCat || note);
}

function openReportModal(q, kontext, button) {
  reportCtx = { q, kontext: kontext || {}, button: button || null };
  reportReturnFocus = document.activeElement;
  // Felder zuruecksetzen
  REPORT_KATEGORIEN.forEach(([code]) => {
    const cb = $("report-cat-" + code);
    if (cb) cb.checked = false;
  });
  $("report-note").value = "";
  $("report-question").textContent = clip(q.frage || "", 200);
  $("report-error").classList.add("hidden");
  updateReportSubmitState();
  $("report-modal").classList.remove("hidden");
  const first = $("report-cat-fachlich_falsch");
  if (first) first.focus();
}

function closeReportModal() {
  $("report-modal").classList.add("hidden");
  reportCtx = null;
  if (reportReturnFocus && typeof reportReturnFocus.focus === "function") {
    reportReturnFocus.focus();
  }
  reportReturnFocus = null;
}

REPORT_KATEGORIEN.forEach(([code]) => {
  const cb = $("report-cat-" + code);
  if (cb) cb.addEventListener("change", updateReportSubmitState);
});
$("report-note").addEventListener("input", updateReportSubmitState);

$("btn-report-submit").addEventListener("click", () => {
  if (!reportCtx) return;
  const { q, kontext, button } = reportCtx;
  const gruende = REPORT_KATEGORIEN
    .filter(([code]) => { const cb = $("report-cat-" + code); return cb && cb.checked; })
    .map(([code]) => code);
  const note = clip(($("report-note").value || "").trim(), 500);
  if (!gruende.length && !note) return; // Sicherheitsnetz: leeres Melden verhindern

  // Fragetext/Antworten koennen lang sein -> hart kuerzen (Quota). Optionen
  // limitiert. provider/tier/model defensiv aus dem Kontext (loadSettings()).
  const optionen = Array.isArray(q.optionen)
    ? q.optionen.slice(0, 8).map((o) => clip(o, 200))
    : [];
  const saved = addReport({
    fragenKey: reportFrageKey(q),
    frage: clip(q.frage || "", 600),
    typ: mcLike(q.typ) ? "multiple_choice" : "offen",
    kategorie_fachlich: clip(q.kategorie || "", 200),
    korrekte_antwort: kontext.answersSecret ? "" : clip(q.korrekte_antwort || "", 300),
    optionen,
    gruende,
    notiz: note,
    jobKey: kontext.jobKey || null,
    stellenTitel: kontext.stellenTitel ? clip(kontext.stellenTitel, 200) : null,
    provider: kontext.provider || null,
    tier: kontext.tier || null,
    model: kontext.model || null,
  });

  // Speichern fehlgeschlagen (localStorage voll/gesperrt): Meldung NICHT als
  // erfolgt ausgeben. Modal/Knopf bleiben nutzbar, Fehlerhinweis einblenden.
  if (!saved) {
    $("report-error").classList.remove("hidden");
    return;
  }

  // Zusaetzlich an den Betreiber schicken (fire-and-forget; lokal ist bereits
  // gespeichert, ein Fehler hier aendert nichts an "Gemeldet"). saved traegt das
  // sanitisierte Objekt inkl. ggf. geleerter korrekte_antwort (answersSecret).
  postReport(saved);
  trackEvent("report");

  // Knopf der gemeldeten Frage wird zu "Gemeldet" (disabled) - keine
  // Doppelmeldung. Bei erneutem Render leitet appendReportButton denselben
  // Zustand aus reportStatusForFrage ab.
  if (button) {
    button.textContent = "Gemeldet";
    button.disabled = true;
  }
  closeReportModal();
});

$("btn-report-cancel").addEventListener("click", closeReportModal);
$("report-modal").addEventListener("click", (e) => {
  if (e.target === $("report-modal")) closeReportModal();
});

// Anzeigentext-Fenster: zeigt den gespeicherten jobText einer Stelle (Grundlage
// der Kernpunkte) read-only. textContent statt innerHTML -> kein HTML aus dem
// (ggf. gescrapten) Text; Zeilenumbrueche bewahrt die CSS-Regel white-space.
let jobTextReturnFocus = null;
function openJobTextModal(job) {
  const text = job && typeof job.jobText === "string" ? job.jobText : "";
  $("jobtext-body").textContent = text;
  $("jobtext-body").scrollTop = 0;
  jobTextReturnFocus = document.activeElement;
  $("jobtext-modal").classList.remove("hidden");
  $("btn-jobtext-close").focus();
}
function closeJobTextModal() {
  $("jobtext-modal").classList.add("hidden");
  $("jobtext-body").textContent = ""; // Speicher freigeben, kein Reststand
  if (jobTextReturnFocus && typeof jobTextReturnFocus.focus === "function") {
    jobTextReturnFocus.focus();
  }
  jobTextReturnFocus = null;
}
$("btn-jobtext-close").addEventListener("click", closeJobTextModal);
$("jobtext-modal").addEventListener("click", (e) => {
  if (e.target === $("jobtext-modal")) closeJobTextModal();
});

// Kontext fuer einen Report aus der gerade aktiven Stelle ableiten (Settings +
// quiz). Hosted hat kein Nutzer-Modell -> model bleibt leer, provider/tier
// zaehlen. Defensiv: alle Felder optional.
function reportKontextAktiv() {
  // Provenienz aus dem QUIZ (zur Generierungszeit festgehalten), nicht aus den
  // aktuellen Einstellungen: der Nutzer kann den Anbieter nach der Generierung
  // gewechselt haben oder einen alten Versuch in der Review melden. Alte Quizze
  // ohne provenance bleiben unbekannt (null) statt faelschlich aktuelle Settings.
  const ctx = { provider: null, tier: null, model: null };
  if (quiz) {
    if (quiz.provenance) {
      ctx.provider = quiz.provenance.provider || null;
      ctx.tier = quiz.provenance.tier || null;
      ctx.model = quiz.provenance.model || null;
    }
    if (quiz.titel) ctx.stellenTitel = quiz.titel;
    // Kanonische Stellen-Identitaet wie in saveAttempt (urlKey -> identityKey ->
    // Textschluessel), damit Reports im selben Bucket landen wie die Versuche und
    // nicht ueber Textvarianten/Refetch derselben Stelle aufgesplittet werden.
    try {
      ctx.jobKey =
        quiz.urlKey ||
        identityKeyOf(quiz.titel, quiz.arbeitgeber, quiz.arbeitsort) ||
        (quiz.jobText ? jobKey(quiz.jobText) : null);
    } catch { /* egal */ }
  }
  return ctx;
}

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
["link-datenschutz", "link-datenschutz-footer", "link-datenschutz-tier", "link-datenschutz-account", "link-datenschutz-login"].forEach((id) => {
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
  ["overflow-modal", () => closeOverflowConfirm(false)], // Escape = abbrechen, Promise sauber aufloesen

  ["badge-modal", closeBadgeModal],
  ["confirm-delete-modal", closeConfirmDelete],
  ["report-modal", closeReportModal],
  ["jobtext-modal", closeJobTextModal],
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

// Waehlt die Startansicht. Reihenfolge: gehosteter Modus OHNE Anmeldung → Login-Gate
// (Phase B, harte Pflicht). Sonst BYOK/lokal nicht eingerichtet → Onboarding. Sonst Home.
// Lokaler Anbieter gilt mit gewaehltem Modell als eingerichtet, BYOK mit hinterlegtem Key.
function routeInitialView() {
  const provider0 = settings.provider || "hosted";
  if (provider0 === "hosted" && !settings.authToken) {
    promptHostedLogin(_authRedirectMsg || ""); // _authRedirectMsg: evtl. Fehler aus dem Redirect
    _authRedirectMsg = "";
    return;
  }
  _authRedirectMsg = "";
  const isConfigured = provider0 === "local" ? !!settings.model
    : provider0 === "hosted" ? true
    : !!settings.apiKey;
  if (!isConfigured) {
    renderOnboardingSteps($("ob-provider").value);
    showView("view-onboarding");
  } else {
    goHome();
  }
}

// Erst einen evtl. Login-Redirect (?auth/?session) verarbeiten (setzt das Token bei
// Erfolg), dann die Startansicht waehlen und einen offenen Hintergrund-Job aufnehmen.
consumeAuthRedirect().then(() => {
  routeInitialView();
  resumeActiveJob();
  // creditsState frueh laden (hosted + angemeldet), damit die Opus-Stufe nach einem Reload
  // sofort korrekt verfuegbar ist und effectiveTier sie nicht still auf standard herabstuft.
  if ((settings.provider || "hosted") === "hosted" && settings.authToken) refreshBalance();
});

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
