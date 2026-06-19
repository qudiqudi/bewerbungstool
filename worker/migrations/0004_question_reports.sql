-- Topic #2: "Fragen melden" erreicht jetzt den Betreiber. Reports werden weiterhin
-- lokal im Browser gespeichert (offline/optimistisch); zusaetzlich schickt der Client
-- sie fire-and-forget an POST /api/report, das hier landet. Spiegelt exakt die Form
-- des Client-Report-Objekts (app.js addReport). KEINE IP. user_id nur, wenn der
-- meldende Nutzer angemeldet war (sonst NULL). Alle Zeitstempel sind Unix-Sekunden.
--
-- Bewusst KEIN Foreign Key auf users(id): ein Report ist ein anonymisierbares
-- Qualitaetssignal und soll eine Konto-Loeschung als verwaiste user_id ueberleben
-- (statt mitgeloescht zu werden). korrekte_antwort kann leer sein, wenn die Frage
-- mitten in der Pruefung gemeldet wurde (answersSecret) — der Server rekonstruiert
-- sie NIE. optionen/gruende werden als JSON-Text abgelegt.

CREATE TABLE IF NOT EXISTS question_reports (
  id               TEXT PRIMARY KEY,
  created_at       INTEGER NOT NULL,
  fragen_key       TEXT NOT NULL,
  frage            TEXT NOT NULL,
  typ              TEXT NOT NULL,
  kategorie        TEXT,
  korrekte_antwort TEXT,
  optionen         TEXT,
  gruende          TEXT,
  notiz            TEXT,
  job_key          TEXT,
  stellen_titel    TEXT,
  provider         TEXT,
  tier             TEXT,
  model            TEXT,
  user_id          TEXT
);

-- Most-reported-Auswertung (Operator): GROUP BY fragen_key ORDER BY COUNT(*).
CREATE INDEX IF NOT EXISTS idx_reports_fragen_key ON question_reports(fragen_key);
-- Stundencap-Zaehlung (leichtes Rate-Limit) + zeitliche Auswertung.
CREATE INDEX IF NOT EXISTS idx_reports_created ON question_reports(created_at);
