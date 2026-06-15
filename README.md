![jobreif.de – Einstellungstest-Simulator](assets/social-preview.png)

# jobreif.de

Eine kleine PWA, die aus einer Stellenbeschreibung einen interaktiven, simulierten Einstellungstest erstellt. Läuft komplett im Browser, ohne Backend – wahlweise mit dem eigenen Cloud-API-Key oder einem lokal laufenden Modell. Erreichbar unter [jobreif.de](https://jobreif.de).

## Funktionsweise

1. Stellenbeschreibung einfügen oder per URL laden (über den Jina-Reader `r.jina.ai`; Links von LinkedIn, Indeed und der Arbeitsagentur werden gezielt auf die Detailseite aufgelöst)
2. Das Tool erstellt per LLM einen Fragenkatalog (Multiple-Choice und offene Fragen)
3. Fragen werden interaktiv beantwortet
4. Die Antworten werden ausgewertet: Punkte pro Frage, Feedback, Musterantworten und eine Gesamteinschätzung

## Startseite „Meine Stellen"

Beim Öffnen erscheint zuerst eine Liste der bisherigen Stellen mit Bestwert und Fortschritt. Ein Tipp öffnet die Stelle; von dort lässt sich ein neuer Test im Lern- oder Prüfungsmodus mit den zuletzt genutzten Einstellungen per Klick starten. Stellen werden mit Arbeitgeber und Arbeitsort angezeigt, damit sich ähnliche Bezeichnungen (dieselbe Position bei verschiedenen Unternehmen) klar unterscheiden lassen. „Neue Stelle" führt zum Laden per URL oder Einfügen des Textes.

## Modi

- **Lernmodus**: Jede Frage lässt sich direkt auflösen. Angezeigt werden die richtige Antwort (bei Multiple-Choice farblich markiert), eine Erklärung zu jeder Antwortoption, lernrelevanter Hintergrund und Quellen zur Vertiefung. Aufgelöste Fragen werden in der Endauswertung entsprechend vermerkt.
- **Prüfungsmodus**: Läuft auf einen Timer. Das Zeitlimit schätzt das Modell anhand von Anzahl und Umfang der Fragen (mit Plausibilitätsprüfung per Faustregel). Nach Ablauf kann abgegeben oder bewusst überzogen werden; die Überziehung wird in der Auswertung vermerkt. Erklärungen und Quellen erscheinen erst in der Endauswertung.

In beiden Modi zeigt die Auswertung die benötigte Zeit und lässt sich drucken bzw. als PDF speichern.

## Schwierigkeitsgrad und Fragenanzahl

Vor dem Erstellen lässt sich Leicht/Mittel/Schwer wählen. „Schwer" bedeutet: Fragen, wie sie im echten Auswahlverfahren für die Stelle am wahrscheinlichsten gestellt werden. Die Stufe steuert den Anteil dieser realistischen Fragen im Test (Leicht ca. 10 %, Mittel ca. 30 %, Schwer ca. 60 %). Die Schwierigkeit jeder einzelnen Frage ist nur im Lernmodus sichtbar (Badge neben der Kategorie und in der Auswertung).

Die Fragenanzahl wird über einen Stepper gewählt (Standard 10, Bereich 4 bis 30).

## Vertiefungen

Ab Stufe 3 einer Stelle lassen sich thematisch fokussierte Fragebögen erstellen. Das Tool leitet beim ersten Mal passende Themenfelder aus der Anzeige ab – mit Schwerpunkt auf den Themen, in denen man bisher schwächer war. Man wählt bis zu drei Felder; die Mindest-Fragenzahl passt sich an (1 Feld ab 4, 2 ab 8, 3 ab 10 Fragen). Vertiefungen sind bewusst immer „schwer" und zielen auf das Niveau eines Fachgesprächs. Nur mit Cloud-Anbieter verfügbar, nicht mit lokalen Modellen.

## Fortschritt und Abzeichen

Aus den Versuchen je Stelle ergeben sich Erfahrungspunkte und Stufen, eine Übungsserie über mehrere Tage und Abzeichen für Meilensteine (erster Test, bestandene Prüfung, 90 % erreicht, drei Tage in Folge geübt u. a.). Der Fortschritt ist in der Auswertung und in der Historie sichtbar; frisch freigeschaltete Abzeichen und Stufenaufstiege werden direkt nach dem Test hervorgehoben. Leistungsabzeichen zählen bewusst nur aus dem Prüfungsmodus, Fleiß-Abzeichen aus beiden Modi.

## Anbieter und Modelle

Es gibt keinen Server, der die Anfragen sieht. Bei den Cloud-Anbietern hinterlegt jeder Nutzer seinen eigenen API-Key in den Einstellungen; der Key wird ausschließlich im localStorage des Browsers gespeichert und direkt an den Anbieter gesendet (Anthropic, OpenAI und DeepSeek erlauben Browser-Aufrufe per CORS).

Unterstützte Cloud-Anbieter und Modelle:

- Claude (Anthropic): Opus 4.8 (empfohlen), Fable 5, Sonnet 4.6
- OpenAI: GPT-5.1 (empfohlen), GPT-5, GPT-4.1
- DeepSeek: V3 (empfohlen), R1

Die Auswahl ist bewusst auf leistungsstarke Modelle beschränkt: Kleine Modelle (Haiku, Mini-Varianten) erzeugen keine zuverlässig strukturierten Fragenkataloge und bewerten freie Antworten zu oberflächlich. Zu jedem Modell zeigt das Dropdown eine kurze Einordnung, wofür es sich eignet, samt grober Kostenschätzung.

Alternativ ein lokales Modell: Über **Ollama** oder **LM Studio** lässt sich der Test kostenlos und datenschutzfreundlich mit einem auf dem eigenen Rechner laufenden Modell erstellen und auswerten – kein API-Key, stattdessen die Server-Adresse in den Einstellungen, die installierten Modelle werden direkt aus dem lokalen Server geladen. Kleine lokale Modelle liefern oberflächlichere Fragen und Bewertungen als die Cloud-Modelle; statt Kosten wird der Token-Verbrauch angezeigt, und Lernhintergrund samt Quellen werden erst beim Auflösen einer Frage nachgeladen, damit die Erstellung schnell bleibt. Der lokale Server muss Cross-Origin-Anfragen dieser Seite erlauben (in LM Studio „Enable CORS", bei Ollama `OLLAMA_ORIGINS`).

## Historie

Jede Auswertung wird automatisch lokal gespeichert (localStorage), gruppiert pro Stelle &ndash; dieselbe Stellenanzeige landet immer beim selben Eintrag, auch ohne URL anhand von Bezeichnung, Arbeitgeber und Arbeitsort. Die Historie zeigt den Verlauf der Ergebnisse als Balken, sodass Verbesserungen sichtbar werden. Jeder Versuch lässt sich wieder öffnen: Auswertung ansehen, den beantworteten Fragebogen im Lernmodus erneut durchgehen oder über &bdquo;Weiter üben&ldquo; einen neuen Test zur selben Stelle erstellen. Stellen lassen sich nach einer Sicherheitsabfrage löschen; bei vollem Speicher werden die ältesten Versuche automatisch verworfen.

## Daten sichern und übertragen

Über den Bereich „Daten sichern und übertragen" in den Einstellungen lassen sich alle lokal gespeicherten Daten exportieren und auf einem anderen Gerät oder einer anderen Domain importieren.

- Export legt eine Datei `jobreif-backup-<datum>.json` mit Einstellungen und Verlauf ab. Der API-Key ist bewusst enthalten, damit der Umzug nahtlos ist – die Datei ist als vertraulich gekennzeichnet.
- Import ist nicht-destruktiv: Einstellungen werden feldweise ergänzt, Stellen per Identität und Versuche per Datum zusammengeführt. Vorhandene Daten gehen nie verloren; doppelte Versuche werden zusammengeführt, beschädigte oder fremde Dateien mit einer klaren Meldung abgewiesen.

## Lokal ausführen

Beliebigen statischen Server starten, z. B.:

```sh
python3 -m http.server 8000
```

Dann http://localhost:8000 öffnen. Der Service Worker (Offline-Cache) ist nur über HTTPS aktiv, die App funktioniert lokal aber auch ohne. Installierbar als PWA, mit hellem und dunklem Farbschema.

## Deployment

Statisches Hosting genügt (z. B. GitHub Pages). Einfach den Inhalt des Repos ausliefern, es gibt keinen Build-Schritt.

## Changelog

Das „Was ist neu"-Fenster in der App führt die wichtigsten Neuerungen. Der vollständige Verlauf aller Versionen liegt in den [GitHub-Releases](https://github.com/qudiqudi/bewerbungstool/releases).

## Lizenz

Copyright (C) 2026 qudiqudi

Dieses Programm ist freie Software, lizenziert unter der GNU Affero General Public License, Version 3 (AGPL-3.0). Es darf genutzt, verändert und weiterverbreitet werden &ndash; auch als gehosteter Dienst &ndash;, solange Änderungen unter derselben Lizenz wieder als Quellcode verfügbar gemacht werden. Details in der Datei [LICENSE](LICENSE). Das Programm wird ohne jede Gewährleistung bereitgestellt.
