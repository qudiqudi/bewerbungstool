# Plan – Topic #2: Observability, Analytics, Report-Routing

Drei Empfehlungen aus der Vorab-Untersuchung. Umgesetzt als EIN PR (alle drei
hängen am Worker + Datenschutztext und sind klein), saubere Commits getrennt.
Kein Deploy, nur PR. CLAUDE.md: keine Breaking Changes, localStorage nur additiv,
Umlaute, CI grün.

## 1) Budget-Alert-Webhook (höchste Prio – aktuell blinder Fleck)

Problem: `BudgetDO.stats().alert` (budget-do.js ~182) wird nur über `/debug/stats`
gelesen, das hinter `MOCK_UPSTREAM` (Dev) hängt. In Prod liest es niemand → das
5-USD-Tagesbudget kann alle Hosted-Nutzer still per 503 sperren bis UTC-Mitternacht.

Lösung: One-shot-Webhook direkt im DO, ausgelöst beim ÜBERSCHREITEN von ALERT_AT.

- Neues DO-Storage-Feld `alertedDay` (persistiert). Latch: pro UTC-Tag höchstens
  eine Benachrichtigung. Beim Rollover wird gegen `this.day` geprüft → automatisch
  zurückgesetzt (kein explizites Leeren nötig).
- Zentrale Prüfung im `fetch()`-Handler NACH dem jeweiligen op (reserve/settle/
  reconcile/release), vor `persist()`: wenn committed (dayReserved+daySpent) >=
  ALERT_AT*DAY_BUDGET_USD UND `alertedDay !== this.day` → Webhook planen und
  `alertedDay = this.day`. Eine Codestelle deckt alle Ops ab.
- Versand DURABLE via DO-Alarm (Codex #1/#2): committed-Crossing setzt
  `alertedDay = this.day` + `alertPending = true` und schedult einen Alarm. Der
  `alarm()`-Handler liest `BUDGET_ALERT_WEBHOOK`, sendet (awaited), löscht bei Erfolg
  `alertPending`; bei Fehler bleibt `alertPending` und ein erneuter Alarm wird mit
  Backoff geplant (bounded: max ~5 Versuche, dann aufgeben). So at-least-once statt
  best-effort; kein stiller Verlust durch geschluckte fetch-Fehler.
- Reserve-Crossing (Codex #3): bewusst akzeptiert. Eine Reserve, die committed über
  70 % treibt, IST eine sinnvolle Frühwarnung; löst sie sich später auf, war es ein
  harmloser Früh-Alert (false positive), KEIN verpasster. daySpent (settle/reconcile)
  wächst monoton, daher kein verpasster späterer Alert. Trigger bleibt committed-basiert.
- Secret: `BUDGET_ALERT_WEBHOOK` (generische Webhook-URL). JSON-Body enthält BEIDE
  Felder `content` (Discord) und `text` (Slack/Telegram-Bridge) → für beide tolerant.
- Body nur aggregierte Zahlen (day, committed, budget, Prozent) — keine PII.
- Unset Secret → nichts tun (fail-safe).
- Doku: Secret-Name in wrangler.toml-Kommentar + worker/README.md.

Magic-Link-Send-Fehler-Alert: NICHT in diesem PR (jede Resend-4xx würde pingen →
Rauschen, zweiter Trigger-Pfad). Aufgabe erlaubt „only if low-risk and clean" — hier
nicht. Im PR-Text erwähnt.

Dateien: worker/src/budget-do.js, worker/wrangler.toml (Kommentar), worker/README.md.
Kein VERSION-Bump (rein serverseitig).

## 2) Datenschutzkonforme Produkt-Analytics (Analytics Engine)

- wrangler.toml: `[[analytics_engine_datasets]] binding = "AE" dataset = "jobreif_events"`.
- worker/src/index.js: `POST /api/event`. Body `{ flow, provider, tier }` aus harter
  Allowlist. `env.AE.writeDataPoint({ blobs:[flow,provider,tier], indexes:[flow] })`.
  KEINE IP, kein Jobtext, keine E-Mail, kein Identifier.
  - Kein Auth/Turnstile (kostenneutral, kein LLM, kein Budget-Reserve). Allowlist-
    Validierung hart (unbekannt → verworfen). Fehlt AE-Binding → 204 no-op.
  - Antwort immer 204 (kein Info-Leak, kein Retry-Sog). CORS via corsHeaders.
- app.js: `trackEvent(flow)` fire-and-forget `fetch(.../api/event, {keepalive:true})`.
  NUR im Hosted-Modus senden (provider==="hosted"), damit für BYOK/local kein neuer
  Datenfluss zu uns entsteht (Datenschutzversprechen „bleibt alles bei dir").
  Beacons an Flow-Branch-Punkten: exam-start, learn-start, resolve (themenfelder),
  history-open, quiz-generate.
- index.html: Datenschutz-Abschnitt „Speicherung" um Satz zu anonymen, person-
  unabhängigen, cookielosen Nutzungsstatistiken ergänzen.
- CSP: keine Änderung (api.jobreif.de bereits in connect-src, verifiziert Zeile 13).

## 3) „Fragen melden" an den Betreiber routen

- localStorage-Save BLEIBT unverändert (additiv).
- Zusätzlich `POST /api/report`, fire-and-forget nach lokalem Save. Gesendet wird das
  bereits sanitisierte Client-Objekt — Schema spiegelt exakt die Client-Report-Form
  (addReport speichert nur diese Felder; korrekte_indizes/elemente werden vom Client
  GAR NICHT erfasst, daher keine Spalten dafür — Codex #4 trifft hier nicht zu, das
  Spec verlangt das Spiegeln der Client-Form).
- Migration `0004_question_reports.sql`: Tabelle `question_reports` mit
  `id TEXT PRIMARY KEY`, `created_at INTEGER NOT NULL`, `fragen_key TEXT NOT NULL`,
  `frage TEXT NOT NULL`, `typ TEXT NOT NULL`, `kategorie TEXT`, `korrekte_antwort TEXT`,
  `optionen TEXT` (JSON), `gruende TEXT` (JSON), `notiz TEXT`, `job_key TEXT`,
  `stellen_titel TEXT`, `provider TEXT`, `tier TEXT`, `model TEXT`, `user_id TEXT`
  (nullable, KEIN FK absichtlich — Reports überleben Konto-Löschung als anonymisierte
  Qualitätsdaten; dokumentiert). KEINE IP. Indizes fragen_key, created_at (Codex #5/#6).
- Worker `handleReport` in index.js: user_id NUR wenn eingeloggt (getSessionUser
  touch:false, kein 401 bei anonym — auch BYOK/local dürfen melden). Kein harter
  Turnstile-Zwang. Leichtes Rate-Limit: globaler Stundencap als bedingter INSERT
  (COUNT created_at > now-3600 < CAP) — als reiner D1-Write-Volumen-Schutz verstanden,
  nicht als Fairness-Limiter (Codex #8). Kein IP gespeichert. Kein Budget-Reserve.
  Felder hart längenbegrenzt server-seitig. Antwort immer 202/204. D1-Zugriff in
  try/catch: fehlende Tabelle/Fehler → 204 no-op, Client-UX unberührt (Codex #7).
- KRITISCH (Codex #13): korrekte_antwort wird vom Client geliefert; bei answersSecret
  ist sie bereits "" (addReport hat sie geleert). Server fügt NICHTS hinzu. Dazu ein
  Regressionstest worker/test/report-secret.mjs, der prüft, dass eine leere
  korrekte_antwort leer bleibt und der Server keine Antwort rekonstruiert.
- app.js: nach erfolgreichem `addReport` → `postReport(saved)` fire-and-forget,
  in ALLEN Modi (Operator braucht Reports unabhängig vom Anbieter; nutzer-initiierte,
  explizite Aktion — anders als passive Analytics). Daher Report-Dialog-Hinweis ehrlich
  anpassen: „wird an den Betreiber gesendet" statt „nur lokal" (Codex #10).
- Operator-Read: README dokumentiert `wrangler d1 execute jobreif-auth --remote
  --command "SELECT fragen_key, COUNT(*) c FROM question_reports GROUP BY fragen_key
  ORDER BY c DESC LIMIT 30"`. GET /api/admin/reports WEGLASSEN (keine Admin-Rolle im
  Schema, Token-Gate wäre neue Angriffsfläche).
- Datenschutztext: Report-Speicherung serverseitig ergänzen (user_id nur eingeloggt,
  nie rohe IP).

## Versionierung

VERSION 1.8.4 → 1.8.5. app.js APP_VERSION + CHANGELOG-Eintrag oben. CI prüft Gleichheit.
Datum 19.06.2026. CHANGELOG-Highlight: gemeldete Fragen erreichen den Betreiber +
anonyme Nutzungsstatistik.

## Secrets / manuelle Schritte vor Deploy

- `wrangler secret put BUDGET_ALERT_WEBHOOK` (optional; ohne → kein Alert).
- Analytics Engine: nur Binding in wrangler.toml, kein Secret, Dataset auto-angelegt.
- `wrangler d1 migrations apply jobreif-auth` für 0004.

## Tests

- node --check app.js / sw.js / worker/src/*.js.
- node worker/test/budget-rollover.mjs (Alert-Latch darf Rollover nicht brechen).
- node .github/scripts/check-integrity.js.
- python3 -m http.server Smoke (Datenschutz-Modal, Report-Beacon 204).
</content>
