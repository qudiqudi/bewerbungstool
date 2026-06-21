# Bewerbungstool – Regeln für Änderungen

Das Tool ist öffentlich auf GitHub Pages deployt und hat aktive Nutzer. Ab jetzt gilt: keine Breaking Changes. Bei Änderungen, die UX oder Bedienbarkeit betreffen, besonders vorsichtig vorgehen.

## Gespeicherte Nutzerdaten (localStorage) sind Produktivdaten

- `bewerbungstool.settings`: { provider, apiKey, model, tier }
- `bewerbungstool.history`: { jobs: [{ key, titel, jobText, attempts: [...] }] }

Seit 1.1.0 ist `provider: "hosted"` der Default: das Tool läuft über einen eigenen
Cloudflare Worker und braucht keinen Nutzer-Key. BYOK (anthropic/openai/deepseek) und `local`
bleiben als Fallback erhalten (in den Einstellungen unter „Anbieter"), also KEIN Bruch
der keine-Breaking-Changes-Regel. `tier` ist die im Hosted-Modus gewählte Qualitätsstufe
(standard/guenstig; „beste"/Opus hinter der Paywall). Alte Keys nie löschen — sie sind
die Credentials des BYOK-Fallbacks.

Der Hosted-Worker (Endpoints, Premium-Prompts, Budget-Gate, Turnstile, Golden-Set) lebt seit
dem Repo-Split im PRIVATEN Repo `qudiqudi/jobreif-backend` und deployt von dort. Die
Client-Prompts in `app.js` sind die bewusst eingefrorene öffentliche BYOK-Basis und werden
NICHT mehr mit den Server-Prompts synchronisiert (die Premium-Prompts dürfen privat divergieren).
Der API-Vertrag (`/api/generate-quiz`, `/api/jobs`, `/api/evaluate`, `/api/themenfelder`,
`/api/event`, `/api/report`, `/auth/*`) muss abwärtskompatibel bleiben — die ausgelieferte PWA
hängt daran.

Regeln:
- Formate nur abwärtskompatibel erweitern: neue Felder optional, nie bestehende Felder umbenennen oder entfernen, nie die Storage-Keys ändern.
- Rendering muss alte Einträge tolerieren (Felder können fehlen, z. B. Versuche aus älteren Versionen ohne neuere Eigenschaften). Immer defensiv lesen, nie blind auf neue Felder zugreifen.
- Wenn ein Formatwechsel unvermeidbar ist: Migration beim Laden einbauen, alte Daten nie verwerfen.

## UI und Flows

- Etablierte Bedienflüsse (Onboarding, URL/Text-Tabs, Lern-/Prüfungsmodus, Auflösen, Historie, Review ohne erneute Bewertung) nicht entfernen oder grundlegend umbauen, ohne dass der Nutzer das ausdrücklich verlangt.
- Aktionen, die API-Kosten verursachen, dürfen nie unbeabsichtigt auslösbar sein (Vorbild: Review-Modus bewertet nicht erneut).
- Mobile-Tauglichkeit (≤ 600px) bei jeder UI-Änderung mitprüfen.

## Deployment-Ritual

- Bei nutzersichtbaren Änderungen: Version in der `VERSION`-Datei hochzählen und in `app.js` `APP_VERSION` plus einen neuen `CHANGELOG`-Eintrag (oben anfügen) pflegen — der CI-Check erzwingt, dass alle drei übereinstimmen.
- Changelog-Trennung: Der In-App-`CHANGELOG` (Fenster „Was ist neu“) führt nur Highlights, die für nicht-technische Nutzer eine gute Info sind — Features und sichtbare Fixes. Iterative Interna (Local-Model-Tuning, reines Robustheits-/Barrierefreiheits-Plumbing) gehören NICHT hinein. Der vollständige Verlauf liegt in den GitHub-Releases (Link unten im Fenster). Pro Version daher zusätzlich ein GitHub-Release mit den ausführlichen Notizen anlegen: `gh release create vX.Y.Z --target <commit> --title "Version X.Y.Z (TT.MM.JJJJ)" --notes-file <datei>`. Tag-Schema `vX.Y.Z`, das jüngste Release ist automatisch „Latest“.
- main ist per Ruleset geschützt: Änderungen laufen über Feature-Branch und PR, der CI-Check (`.github/workflows/ci.yml`: JS-Syntax, Asset-/Manifest-Integrität, `__BUILD__`-Platzhalter) muss grün sein, dann mergen. Direkte Pushes auf main sind blockiert.
- Deploy läuft über GitHub Actions (`.github/workflows/deploy.yml`): Merge auf main genügt, die CI-Checks laufen vor dem Deploy erneut. Die Action ersetzt den Platzhalter `__BUILD__` in `sw.js` durch den Commit-Hash — kein manuelles Hochzählen der Cache-Version mehr, den Platzhalter nie entfernen.
- Nur die PWA wird aus diesem Repo deployt. Der Hosted-Worker/das Backend lebt im privaten Repo `qudiqudi/jobreif-backend` und deployt von dort über eigene GitHub Actions — Backend-/Prompt-Änderungen also dort, nicht hier.
- Vor dem Push lokal testen (`python3 -m http.server`, UI-Flows per Browser durchklicken; Zustand lässt sich über die globalen Variablen quiz/answers/mode/revealed in der Konsole injizieren).
- Deploy verifizieren: `gh run watch` bzw. mit Cache-Buster `curl -s "https://jobreif.de/sw.js?t=$RANDOM" | grep bewerbungstool-` (muss den Commit-Hash zeigen, nicht `__BUILD__`). Die alte github.io-Adresse leitet nur noch per 301 auf die Custom Domain um.

## API-Aufrufe

- Schema-Erweiterungen für die Fragengenerierung passieren serverseitig (privates Backend-Repo), aber: gespeicherte Versuche enthalten Quiz-Objekte im alten Schema — der Anzeige-Code hier muss damit umgehen (defensiv lesen).
- BYOK-Provider-Defaults im UI (Anbieterauswahl/Modelle) nicht ohne Begründung ändern. Modellkatalog und -Tuning des Hosted-Modus liegen im privaten Backend-Repo.
