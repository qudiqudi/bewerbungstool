# Bewerbungstool – Regeln für Änderungen

Das Tool ist öffentlich auf GitHub Pages deployt und hat aktive Nutzer. Ab jetzt gilt: keine Breaking Changes. Bei Änderungen, die UX oder Bedienbarkeit betreffen, besonders vorsichtig vorgehen.

## Gespeicherte Nutzerdaten (localStorage) sind Produktivdaten

- `bewerbungstool.settings`: { provider, apiKey, model }
- `bewerbungstool.history`: { jobs: [{ key, titel, jobText, attempts: [...] }] }

Regeln:
- Formate nur abwärtskompatibel erweitern: neue Felder optional, nie bestehende Felder umbenennen oder entfernen, nie die Storage-Keys ändern.
- Rendering muss alte Einträge tolerieren (Felder können fehlen, z. B. Versuche aus älteren Versionen ohne neuere Eigenschaften). Immer defensiv lesen, nie blind auf neue Felder zugreifen.
- Wenn ein Formatwechsel unvermeidbar ist: Migration beim Laden einbauen, alte Daten nie verwerfen.

## UI und Flows

- Etablierte Bedienflüsse (Onboarding, URL/Text-Tabs, Lern-/Prüfungsmodus, Auflösen, Historie, Review ohne erneute Bewertung) nicht entfernen oder grundlegend umbauen, ohne dass der Nutzer das ausdrücklich verlangt.
- Aktionen, die API-Kosten verursachen, dürfen nie unbeabsichtigt auslösbar sein (Vorbild: Review-Modus bewertet nicht erneut).
- Mobile-Tauglichkeit (≤ 600px) bei jeder UI-Änderung mitprüfen.

## Deployment-Ritual

- Bei jeder Änderung an ausgelieferten Dateien die `CACHE`-Konstante in `sw.js` hochzählen.
- Vor dem Push lokal testen (`python3 -m http.server`, UI-Flows per Browser durchklicken; Zustand lässt sich über die globalen Variablen quiz/answers/mode/revealed in der Konsole injizieren).
- Deploy verifizieren mit Cache-Buster: `curl "https://qudiqudi.github.io/bewerbungstool/app.js?t=$RANDOM" | grep <neues Symbol>`.

## API-Aufrufe

- Schema-Erweiterungen für die Fragengenerierung sind unkritisch (serverseitig, kein Nutzerdatenbestand), aber: gespeicherte Versuche enthalten Quiz-Objekte im alten Schema — Anzeige-Code muss damit umgehen.
- Provider-Defaults und Modellkatalog nicht ohne Messung/Begründung ändern; Sonnet läuft bewusst mit effort medium, Opus auf Default.
