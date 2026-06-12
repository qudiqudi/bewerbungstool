# <img src="icon.svg" alt="" width="28" height="28"> jobreif.de

Eine kleine PWA, die aus einer Stellenbeschreibung einen interaktiven, simulierten Einstellungstest erstellt. Läuft komplett im Browser, ohne Backend. Erreichbar unter [jobreif.de](https://jobreif.de).

## Funktionsweise

1. Stellenbeschreibung einfügen oder per URL laden (über den Jina-Reader `r.jina.ai`)
2. Das Tool erstellt per LLM-API einen Fragenkatalog (Multiple-Choice und offene Fragen)
3. Fragen werden interaktiv beantwortet
4. Die Antworten werden ausgewertet: Punkte pro Frage, Feedback, Musterantworten und eine Gesamteinschätzung

## Modi

- **Lernmodus**: Jede Frage lässt sich direkt auflösen. Angezeigt werden die richtige Antwort (bei Multiple-Choice farblich markiert), eine Erklärung zu jeder Antwortoption, lernrelevanter Hintergrund und Quellen zur Vertiefung. Aufgelöste Fragen werden in der Endauswertung entsprechend vermerkt.
- **Prüfungsmodus**: Läuft auf einen Timer. Das Zeitlimit schätzt das Modell anhand von Anzahl und Umfang der Fragen (mit Plausibilitätsprüfung per Faustregel). Nach Ablauf kann abgegeben oder bewusst überzogen werden; die Überziehung wird in der Auswertung vermerkt. Erklärungen und Quellen erscheinen erst in der Endauswertung.

In beiden Modi zeigt die Auswertung die benötigte Zeit und lässt sich drucken bzw. als PDF speichern.

## Schwierigkeitsgrad

Vor dem Erstellen lässt sich Leicht/Mittel/Schwer wählen. „Schwer" bedeutet: Fragen, wie sie im echten Auswahlverfahren für die Stelle am wahrscheinlichsten gestellt werden. Die Stufe steuert den Anteil dieser realistischen Fragen im Test (Leicht ca. 10 %, Mittel ca. 30 %, Schwer ca. 60 %). Die Schwierigkeit jeder einzelnen Frage ist nur im Lernmodus sichtbar (Badge neben der Kategorie und in der Auswertung).

## Eigener API-Key

Jeder Nutzer hinterlegt seinen eigenen API-Key in den Einstellungen. Der Key wird ausschließlich im localStorage des Browsers gespeichert und direkt an den jeweiligen Anbieter gesendet (Anthropic, OpenAI und DeepSeek erlauben Browser-Aufrufe per CORS). Es gibt keinen Server, der den Key sieht.

Unterstützte Anbieter und Modelle:

- Claude (Anthropic): Opus 4.8 (empfohlen), Fable 5, Sonnet 4.6
- OpenAI: GPT-5.1 (empfohlen), GPT-5, GPT-4.1
- DeepSeek: V3 (empfohlen), R1

Die Auswahl ist bewusst auf leistungsstarke Modelle beschränkt: Kleine Modelle (Haiku, Mini-Varianten) erzeugen keine zuverlässig strukturierten Fragenkataloge und bewerten freie Antworten zu oberflächlich. Zu jedem Modell zeigt das Dropdown eine kurze Einordnung, wofür es sich eignet.

## Daten sichern und übertragen

Über den Bereich „Daten sichern und übertragen" in den Einstellungen lassen sich alle lokal gespeicherten Daten exportieren und auf einem anderen Gerät oder einer anderen Domain importieren.

- Export legt eine Datei `jobreif-backup-<datum>.json` mit Einstellungen und Verlauf ab. Der API-Key ist bewusst enthalten, damit der Umzug nahtlos ist – die Datei ist als vertraulich gekennzeichnet.
- Import ist nicht-destruktiv: Einstellungen werden feldweise ergänzt, Stellen per Key und Versuche per Datum zusammengeführt. Vorhandene Daten gehen nie verloren; doppelte Versuche werden zusammengeführt. Ungültige oder fremde Dateien werden mit einer klaren Meldung abgewiesen.

## Historie

Jede Auswertung wird automatisch lokal gespeichert (localStorage), gruppiert pro Stelle &ndash; dieselbe Stellenanzeige landet immer beim selben Eintrag. Die Historie zeigt den Verlauf der Ergebnisse als Balken, sodass Verbesserungen sichtbar werden. Jeder Versuch lässt sich wieder öffnen: Auswertung ansehen, den beantworteten Fragebogen im Lernmodus erneut durchgehen oder über &bdquo;Weiter üben&ldquo; einen neuen Test zur selben Stelle erstellen. Bei vollem Speicher werden die ältesten Versuche automatisch verworfen.

## Lokal ausführen

Beliebigen statischen Server starten, z. B.:

```sh
python3 -m http.server 8000
```

Dann http://localhost:8000 öffnen. Der Service Worker (Offline-Cache) ist nur über HTTPS aktiv, die App funktioniert lokal aber auch ohne.

## Deployment

Statisches Hosting genügt (z. B. GitHub Pages). Einfach den Inhalt des Repos ausliefern, es gibt keinen Build-Schritt.

## Lizenz

Copyright (C) 2026 qudiqudi

Dieses Programm ist freie Software, lizenziert unter der GNU Affero General Public License, Version 3 (AGPL-3.0). Es darf genutzt, verändert und weiterverbreitet werden &ndash; auch als gehosteter Dienst &ndash;, solange Änderungen unter derselben Lizenz wieder als Quellcode verfügbar gemacht werden. Details in der Datei [LICENSE](LICENSE). Das Programm wird ohne jede Gewährleistung bereitgestellt.
