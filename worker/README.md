# jobreif Hosted-Worker (Phase A-P)

Cloudflare Worker, der den Hosted-Modus des Tools bedient (Plan `.local/plan-hosted-credits-v1.md`,
Abschnitt A). App-spezifische Endpoints zu OpenRouter mit serverseitigen Prompts +
Schema, atomarem Budget-Gate (Durable Object) und Turnstile. Eigenständig deploybar,
unabhängig vom GitHub-Pages-Deploy der PWA.

## Endpoints

- `POST /api/generate-quiz` — Body: `{ jobText, numQuestions?, tier? }`
- `POST /api/evaluate` — Body: `{ quiz, answers, jobText, tier? }`
- Header `CF-Turnstile-Token` (in Produktion Pflicht).
- Antwort: SSE-Stream im OpenAI-Format (wie heute), `readSSEText`/`parseJsonLoose` im
  Client bleiben nutzbar.
- `GET /debug/stats` — nur wenn `MOCK_UPSTREAM=1` (Dev), für den Last-Test.
- `POST /api/event` — anonyme Nutzungsstatistik. Body `{ flow, provider, tier }` aus
  einer Allowlist; schreibt EINEN Datenpunkt in die Analytics Engine (`AE`-Binding).
  Kein Auth/Turnstile/Budget, kein LLM. KEINE IP/Texte/E-Mail/IDs. Antwort immer 204;
  ohne `AE`-Binding ein No-op.
- `POST /api/report` — „Fragen melden“ an den Betreiber. Body = das vom Client
  sanitisierte Report-Objekt (`fragenKey`, `frage`, `typ`, `gruende`, `notiz` …).
  Speichert in D1 (`question_reports`). `user_id` nur bei gültiger Session (Bearer),
  sonst anonym; NIE eine IP. `korrekte_antwort` kommt 1:1 vom Client (bei einer Meldung
  mitten in der Prüfung leer — der Server rekonstruiert sie nie). Kein Budget-Reserve;
  leichtes globales Stundencap als bedingter INSERT. Antwort immer 202 (auch bei Müll
  oder fehlender Tabelle) — der Client meldet fire-and-forget.

### Budget-Alert-Webhook

Erreicht das committed Tagesbudget (Reserven + Ist) erstmals `ALERT_AT` (70 %), feuert
das `BudgetDO` einen einmaligen Alert pro UTC-Tag. Zustellung läuft durable über einen
DO-Alarm (at-least-once mit Backoff, max. 5 Versuche), nicht über einen verlierbaren
fire-and-forget-fetch. Secret setzen:

    wrangler secret put BUDGET_ALERT_WEBHOOK

Eine generische Webhook-URL (Discord/Slack/Telegram-Bridge). Der Body enthält die
Felder `content` und `text` (beide mit derselben Meldung) und NUR aggregierte Zahlen
(Prozent, committed/Budget, UTC-Tag) — keine PII. Ohne dieses Secret passiert nichts
(fail-safe).

### Gemeldete Fragen auswerten (Operator)

Meistgemeldete Fragen listen:

    wrangler d1 execute jobreif-auth --remote --command \
      "SELECT fragen_key, COUNT(*) AS c FROM question_reports GROUP BY fragen_key ORDER BY c DESC LIMIT 30"

Einen Report im Detail ansehen (z. B. mit Begründungen/Notiz):

    wrangler d1 execute jobreif-auth --remote --command \
      "SELECT frage, gruende, notiz, provider, tier, model, created_at FROM question_reports ORDER BY created_at DESC LIMIT 20"

## Schutzschichten (Plan A.2.6 / A.7)

1. DO-Vorab-Reserve (Worst-Case) gegen `DAY_BUDGET_USD` — primäre, schnelle Kostengrenze.
2. Globaler In-flight-Cap (`MAX_INFLIGHT`).
3. Verfügbarkeits-Budget: Pro-Subjekt-Anteil (`PER_SUBJECT_SHARE`) + hartes Pro-IP-
   Tageslimit (`PER_IP_DAY`).
4. TTL-Reconcile (`RESERVE_TTL_S`): Reserven ohne Settle werden konservativ
   runtergebucht statt auf Worst-Case eingefroren (kein Selbst-DoS).
5. Provider-Hardlimit am OpenRouter-Key = Last-Resort-Backstop (außerhalb dieses Repos
   im Dashboard setzen, VOR Go-Live).

Kein stilles Modell-Downgrade: bei 100 % Tagesbudget Hard-Stop (503). Stufe bleibt
konstant; Ausweg ist der BYOK-Fallback im Client (Plan A.0/A.7).

## Lokal entwickeln & Last-Test (ohne echte Kosten)

    npm install
    cp .dev.vars.example .dev.vars     # MOCK_UPSTREAM=1, SKIP_TURNSTILE=1
    npm run dev                        # wrangler dev → http://127.0.0.1:8787

In einem zweiten Terminal:

    N=80 npm run loadtest

Erwartung: `committed` überschreitet `dayBudget` nicht; akzeptierte Calls > einfache
Budget/Reserve-Rechnung (weil Settle die Reserve auf den Ist-Wert senkt und Budget
freigibt). Das ist der Verifikations-Blocker aus Plan A.6.

## Deploy (wenn so weit)

    wrangler secret put OPENROUTER_KEY      # gedeckelter Key mit hartem Monatslimit!
    wrangler secret put TURNSTILE_SECRET
    wrangler deploy

`HOSTED_BASE` im Client auf die Worker-Domain zeigen (z. B. https://api.jobreif.de).

## Turnstile (Bot-/Missbrauchsschutz)

Client und Worker sind bereits verdrahtet (Widget in index.html/app.js, Siteverify in
`src/turnstile.js`). Vor Go-Live noch:

1. Im Cloudflare-Dashboard ein Turnstile-Widget anlegen (Domain `jobreif.de`), Sitekey +
   Secret notieren.
2. Sitekey im Client setzen: Konstante `TURNSTILE_SITEKEY` in `app.js` (oder zum Testen
   per `localStorage["bewerbungstool.turnstileSitekey"]`).
3. Secret im Worker setzen: `wrangler secret put TURNSTILE_SECRET`.
4. In Produktion KEIN `SKIP_TURNSTILE` setzen (nur lokal). Verifiziert wurde der ganze
   Round-Trip lokal mit den Cloudflare-Testkeys (Sitekey `1x…AA`, Secret `1x…AA`).

## Offen / vor Go-Live

- Provider-Hardlimit am Key setzen + unter parallelen Streams empirisch messen (Plan A.2.2).
- reqHash-Bindung des Turnstile-Tokens (s. `src/turnstile.js`, TODO) — optionaler Härtungsschritt.
- Pro-Minute-Rate-Limit / WAF-Regeln vor dem Worker (Cloudflare-Dashboard).
- Prompts mit app.js abgleichen (Dual-Maintenance, Plan A.3.1).
- Datenschutz: sicherstellen, dass nichts mit Inhalten geloggt wird (Plan A.4).
