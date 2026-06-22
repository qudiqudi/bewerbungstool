![jobreif.de – Einstellungstest-Simulator](assets/social-preview.png)

# jobreif.de

Eine PWA, die aus jeder Stellenbeschreibung einen interaktiven, simulierten Einstellungstest erstellt – mit KI-Auswertung. Sie läuft im Browser, ohne Build-Schritt, und ist offline-fähig. Erreichbar unter [jobreif.de](https://jobreif.de).

## Jetzt auch ohne eigenen API-Key

Mit E-Mail oder Google anmelden und sofort loslegen – ein begrenztes Kontingent ist kostenlos. Wer mehr braucht, schaltet per Abrechnung frei. Der bisherige Weg bleibt: eigener API-Key, der nur im Browser liegt.

## So funktioniert's

1. Stellenbeschreibung einfügen oder per URL laden (über den Jina-Reader `r.jina.ai`)
2. Das Tool erstellt per LLM einen Fragenkatalog – Multiple-Choice und offene Fragen
3. Fragen werden interaktiv beantwortet – im Lern- oder Prüfungsmodus
4. Auswertung mit Punkten pro Frage, Feedback, Musterantworten und Gesamteinschätzung

## Zwei Modi

- **Lernmodus**: Jede Frage lässt sich direkt auflösen – richtige Antwort markiert, Erklärung je Option, lernrelevanter Hintergrund und Quellen. Aufgelöste Fragen werden in der Auswertung vermerkt.
- **Prüfungsmodus**: Läuft auf einen vom Modell geschätzten Timer. Nach Ablauf abgeben oder bewusst überziehen (wird vermerkt). Erklärungen und Quellen erst in der Endauswertung.

In beiden Modi zeigt die Auswertung die benötigte Zeit und lässt sich drucken bzw. als PDF speichern.

## Schwierigkeit

„Schwer" heißt: Fragen, wie sie im echten Auswahlverfahren am wahrscheinlichsten gestellt werden. Die Stufe steuert deren Anteil im Test (Leicht ~10 %, Mittel ~30 %, Schwer ~60 %). Die Fragenanzahl ist wählbar (4 bis 30, Standard 10).

## Historie

Jede Auswertung wird lokal gespeichert, pro Stelle gruppiert. Der Verlauf zeigt Verbesserungen als Balken; jeder Versuch lässt sich wieder öffnen, im Lernmodus erneut durchgehen oder als neuer Test wiederholen. Aus den Versuchen ergeben sich Erfahrungspunkte, Stufen, eine Übungsserie und Abzeichen. Ab Stufe 3 einer Stelle kommen Vertiefungen dazu: thematisch fokussierte, schwere Fragebögen (nur mit Cloud-Anbieter).

## Zugang und Modelle

- **Gehostet**: Mit E-Mail oder Google anmelden, kostenlos starten. Bei höherem Bedarf wird per Abrechnung freigeschaltet – kein eigener Key nötig.
- **Eigener API-Key**: Der Key liegt ausschließlich im `localStorage` und geht direkt an den Anbieter (CORS). Kein Server sieht ihn.

Unterstützte Modelle:

- Claude (Anthropic): Opus 4.8, Fable 5, Sonnet 4.6
- OpenAI: GPT-5.1, GPT-5, GPT-4.1
- DeepSeek: V3, R1

Bewusst auf leistungsstarke Modelle beschränkt – kleine Modelle erzeugen keine zuverlässig strukturierten Fragenkataloge und bewerten freie Antworten zu oberflächlich.

Alternativ läuft alles kostenlos und lokal über **Ollama** oder **LM Studio**. Statt eines API-Keys trägt man die Server-Adresse in den Einstellungen ein; der Server muss Cross-Origin-Anfragen erlauben (LM Studio „Enable CORS", Ollama `OLLAMA_ORIGINS`). Kleine lokale Modelle sind oberflächlicher als die Cloud-Modelle.

## Daten sichern

In den Einstellungen lassen sich alle Daten als `jobreif-backup-<datum>.json` exportieren und auf einem anderen Gerät importieren. Der Import ist nicht-destruktiv: Stellen und Versuche werden zusammengeführt, vorhandene Daten bleiben erhalten.

## Lokal ausführen und Deployment

Beliebigen statischen Server starten, kein Build-Schritt:

```
$ python3 -m http.server 8000
# → http://localhost:8000
```

Zum Deployen genügt statisches Hosting (z. B. GitHub Pages). Der Service-Worker-Cache ist nur über HTTPS aktiv; lokal läuft die App auch ohne.

## Changelog

Die wichtigsten Neuerungen zeigt das „Was ist neu"-Fenster in der App; der vollständige Verlauf liegt in den [GitHub-Releases](https://github.com/qudiqudi/jobreif/releases).

## Lizenz

Copyright (C) 2026 qudiqudi

Freie Software unter der GNU Affero General Public License, Version 3 (AGPL-3.0). Nutzung, Änderung und Weiterverbreitung sind erlaubt, auch als gehosteter Dienst, solange Änderungen unter derselben Lizenz als Quellcode verfügbar bleiben. Details in [LICENSE](LICENSE). Ohne jede Gewährleistung.
