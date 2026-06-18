-- Phase B – Schritt 2 (Härtung, Codex-Review R3): OAuth-Handoff absichern.
-- (1) Das durable Session-Token nicht mehr in der Redirect-URL ausliefern, sondern einen
--     kurzlebigen Einmal-Code, den die SPA per POST gegen die Session tauscht.
-- (2) Den OAuth-Flow per PKCE-artigem Verifier an den initiierenden Browser binden
--     (gegen Login-CSRF/Session-Fixation): der Client haelt den Verifier in sessionStorage,
--     schickt beim Start nur dessen Hash; der Tausch verlangt den Verifier zurueck.

-- Verifier-Hash zum jeweiligen OAuth-state (vom Client beim Start mitgegeben).
ALTER TABLE oauth_states ADD COLUMN verifier_hash TEXT;

-- Kurzlebiger Einmal-Code fuer die Session-Uebergabe nach erfolgreichem Google-Login.
-- Nur als SHA-256-Hash gespeichert; an den Verifier-Hash gebunden; einmal einloesbar.
CREATE TABLE IF NOT EXISTS handoff_codes (
  code_hash     TEXT PRIMARY KEY,
  user_id       TEXT NOT NULL REFERENCES users(id),
  verifier_hash TEXT NOT NULL,
  created_at    INTEGER NOT NULL,
  expires_at    INTEGER NOT NULL,
  consumed      INTEGER NOT NULL DEFAULT 0
);
