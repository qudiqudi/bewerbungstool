![jobreif.de – Einstellungstest-Simulator](assets/social-preview.png)

# jobreif.de

Eine kleine PWA, die aus einer Stellenbeschreibung einen simulierten Einstellungstest erstellt. Sie läuft komplett im Browser, ohne Backend. Die Fragen erzeugt entweder ein Cloud-Modell über den eigenen API-Key oder ein lokal laufendes Modell. Erreichbar unter [jobreif.de](https://jobreif.de).

## Funktionsweise

1. Stellenbeschreibung einfügen oder per URL laden (über den Jina-Reader `r.jina.ai`)
2. Das Tool erstellt per LLM einen Fragenkatalog (Multiple-Choice und offene Fragen)
3. Fragen werden interaktiv beantwortet
4. Die Antworten werden ausgewertet: Punkte pro Frage, Feedback, Musterantworten und eine Gesamteinschätzung

## Modi

- **Lernmodus**: Jede Frage lässt sich direkt auflösen. Angezeigt werden die richtige Antwort (bei Multiple-Choice farblich markiert), eine Erklärung je Option, lernrelevanter Hintergrund und Quellen.
- **Prüfungsmodus**: Läuft auf einen Timer, dessen Limit das Modell aus Anzahl und Umfang der Fragen schätzt. Erklärungen und Quellen erscheinen erst in der Auswertung.

Vor dem Erstellen wählt man Schwierigkeit (Leicht/Mittel/Schwer steuert den Anteil realistischer Prüfungsfragen) und Fragenanzahl (4 bis 30, Standard 10).

## Anbieter und Modelle

Jeder Nutzer hinterlegt seinen eigenen API-Key in den Einstellungen. Er liegt nur im localStorage des Browsers und geht direkt an den Anbieter (CORS), nicht über einen eigenen Server.

- Claude (Anthropic): Opus 4.8 (empfohlen), Fable 5, Sonnet 4.6
- OpenAI: GPT-5.1 (empfohlen), GPT-5, GPT-4.1
- DeepSeek: V3 (empfohlen), R1

Kleine Modelle (Haiku, Mini-Varianten) eignen sich nicht: Sie liefern keine zuverlässig strukturierten Fragen und bewerten zu oberflächlich.

Alternativ läuft alles kostenlos und lokal über **Ollama** oder **LM Studio**. Statt eines API-Keys trägt man die Server-Adresse in den Einstellungen ein. Kleine lokale Modelle sind oberflächlicher als die Cloud-Modelle, und der Server muss Cross-Origin-Anfragen erlauben (LM Studio „Enable CORS", Ollama `OLLAMA_ORIGINS`).

## Stellen und Fortschritt

Jede Auswertung wird pro Stelle lokal gespeichert (localStorage); dieselbe Anzeige landet immer beim selben Eintrag. Die Startseite listet die Stellen mit Bestwert. Ein Versuch lässt sich wieder öffnen, im Lernmodus erneut durchgehen oder als neuer Test wiederholen, und Stellen lassen sich löschen.

Aus den Versuchen ergeben sich Erfahrungspunkte, Stufen, eine Übungsserie und Abzeichen. Ab Stufe 3 einer Stelle kommen Vertiefungen dazu: thematisch fokussierte, schwere Fragebögen (nur mit Cloud-Anbieter).

## Daten sichern

In den Einstellungen lassen sich alle Daten als `jobreif-backup-<datum>.json` exportieren und auf einem anderen Gerät importieren. Der Import ist nicht-destruktiv: Stellen und Versuche werden zusammengeführt, vorhandene Daten bleiben erhalten. Der Export enthält auch den API-Key, damit der Umzug ohne erneute Eingabe klappt.

## Lokal ausführen

Beliebigen statischen Server starten, z. B. `python3 -m http.server 8000`, dann http://localhost:8000 öffnen. Der Service Worker (Offline-Cache) ist nur über HTTPS aktiv. Zum Deployen genügt statisches Hosting (z. B. GitHub Pages), einen Build-Schritt gibt es nicht.

## Changelog

Die wichtigsten Neuerungen zeigt das „Was ist neu"-Fenster in der App; der vollständige Verlauf liegt in den [GitHub-Releases](https://github.com/qudiqudi/jobreif/releases).

## Lizenz

Copyright (C) 2026 qudiqudi

Freie Software unter der GNU Affero General Public License, Version 3 (AGPL-3.0). Nutzung, Änderung und Weiterverbreitung sind erlaubt, auch als gehosteter Dienst, solange Änderungen unter derselben Lizenz als Quellcode verfügbar bleiben. Details in [LICENSE](LICENSE). Ohne jede Gewährleistung.
