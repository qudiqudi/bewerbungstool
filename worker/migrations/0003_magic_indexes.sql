-- Phase B – Schritt 2 (Härtung, Codex-Review R7): Indizes fuer die Magic-Link-Drossel.
-- /auth/magic/start zaehlt pro Empfaenger (email, created_at) und global (created_at) ueber
-- magic_tokens. Ohne created_at-Index degradiert das mit wachsender Tabelle zu einem
-- Full-Scan auf dem kritischen Auth-Pfad. Die Zeilen werden zusaetzlich im Code
-- opportunistisch geraeumt (created_at ausserhalb des Zaehlfensters).

DROP INDEX IF EXISTS idx_magic_email;
CREATE INDEX IF NOT EXISTS idx_magic_email_created ON magic_tokens(email, created_at);
CREATE INDEX IF NOT EXISTS idx_magic_created ON magic_tokens(created_at);
