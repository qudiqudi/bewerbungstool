// Fail-closed Dev-Erkennung. Die Dev-Bypässe (SKIP_TURNSTILE, MOCK_UPSTREAM) dürfen NUR
// greifen, wenn ENV explizit eine Dev-Umgebung markiert. Fehlendes oder falsch geschriebenes
// ENV → false → Bypässe AUS. In Prod ist ENV bewusst NICHT gesetzt (wrangler.toml); lokal
// kommt ENV=development aus .dev.vars. Ein versehentlich in Prod gesetztes Flag würde den
// Worker sonst zu einem offenen, kostenpflichtigen LLM-Proxy machen bzw. den Bot-Schutz auf
// dem Login-Pfad abschalten. Eine einzige Quelle, damit die Erkennung nicht über mehrere
// Dateien driftet (index.js, auth.js, job-do.js teilen sie).
export function devEnabled(env) {
  return env.ENV === "development" || env.ENV === "dev" || env.ENV === "local";
}
