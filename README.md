![jobreif.de – Einstellungstest-Simulator](assets/social-preview.png)

# jobreif.de

Eine kleine PWA, die aus einer Stellenbeschreibung einen interaktiven, simulierten Einstellungstest erstellt. Läuft komplett im Browser, ohne Backend – wahlweise mit dem eigenen Cloud-API-Key oder einem lokal laufenden Modell. Erreichbar unter [jobreif.de](https://jobreif.de).

## Funktionsweise

1. Stellenbeschreibung einfügen oder per URL laden (über den Jina-Reader `r.jina.ai`)
2. Das Tool erstellt per LLM einen Fragenkatalog (Multiple-Choice und offene Fragen)
3. Fragen werden interaktiv beantwortet
4. Die Antworten werden ausgewertet: Punkte pro Frage, Feedback, Musterantworten und eine Gesamteinschätzung

## Modi

- **Lernmodus**: Jede Frage lässt sich direkt auflösen – mit richtiger Antwort (bei Multiple-Choice farblich markiert), Erklärung je Option, lernrelevantem Hintergrund und Quellen.
- **Prüfungsmodus**: Läuft auf einen Timer, dessen Limit das Modell aus Anzahl und Umfang der Fragen schätzt. Erklärungen und Quellen erscheinen erst in der Auswertung.

Vor dem Erstellen lässt sich Schwierigkeit (Leicht/Mittel/Schwer steuert den Anteil realistischer Prüfungsfragen) und Fragenanzahl (4 bis 30, Standard 10) wählen.

## Anbieter und Modelle

Jeder Nutzer hinterlegt seinen eigenen API-Key in den Einstellungen. Er wird nur im localStorage des Browsers gespeichert und direkt an den Anbieter gesendet (CORS); es gibt keinen Server, der ihn sieht.

- Claude (Anthropic): Opus 4.8 (empfohlen), Fable 5, Sonnet 4.6
- OpenAI: GPT-5.1 (empfohlen), GPT-5, GPT-4.1
- DeepSeek: V3 (empfohlen), R1

Kleine Modelle (Haiku, Mini-Varianten) sind bewusst nicht dabei – sie liefern keine zuverlässig strukturierten Fragen und bewerten zu oberflächlich.

Alternativ läuft alles kostenlos und lokal über **Ollama** oder **LM Studio**: kein API-Key, stattdessen die Server-Adresse in den Einstellungen. Kleine lokale Modelle sind oberflächlicher als die Cloud-Modelle; der Server muss Cross-Origin-Anfragen erlauben (LM Studio „Enable CORS", Ollama `OLLAMA_ORIGINS`).

## Stellen und Fortschritt

Jede Auswertung wird lokal gespeichert (localStorage), gruppiert pro Stelle – dieselbe Anzeige landet immer beim selben Eintrag. Die Startseite listet die Stellen mit Bestwert; ein Versuch lässt sich wieder öffnen, im Lernmodus erneut durchgehen oder als neuer Test wiederholen, und Stellen lassen sich löschen.

Aus den Versuchen ergeben sich Erfahrungspunkte, Stufen, eine Übungsserie und Abzeichen. Ab Stufe 3 einer Stelle lassen sich zusätzlich Vertiefungen erstellen: thematisch fokussierte, schwere Fragebögen (nur mit Cloud-Anbieter).

## Daten sichern

In den Einstellungen lassen sich alle Daten als `jobreif-backup-<datum>.json` exportieren und auf einem anderen Gerät importieren. Der Import ist nicht-destruktiv (Stellen und Versuche werden zusammengeführt, vorhandene Daten gehen nie verloren); der Export enthält bewusst auch den API-Key für einen nahtlosen Umzug.

## Lokal ausführen

Beliebigen statischen Server starten, z. B. `python3 -m http.server 8000`, dann http://localhost:8000 öffnen. Der Service Worker (Offline-Cache) ist nur über HTTPS aktiv. Statisches Hosting (z. B. GitHub Pages) genügt zum Deployen, es gibt keinen Build-Schritt.

## Changelog

Die wichtigsten Neuerungen zeigt das „Was ist neu"-Fenster in der App; der vollständige Verlauf liegt in den [GitHub-Releases](https://github.com/qudiqudi/bewerbungstool/releases).

## Lizenz

Copyright (C) 2026 qudiqudi

Freie Software unter der GNU Affero General Public License, Version 3 (AGPL-3.0) &ndash; Nutzung, Änderung und Weiterverbreitung erlaubt, auch als gehosteter Dienst, solange Änderungen unter derselben Lizenz als Quellcode verfügbar bleiben. Details in [LICENSE](LICENSE). Ohne jede Gewährleistung.
