// CORS ist KEINE Sicherheitskontrolle (Plan A.2.5): stoppt nur fremde Browserseiten,
// nicht curl/Server/Headless. Wird trotzdem auf die erlaubten Origins gesetzt, damit
// die PWA sauber spricht — nicht als Abuse-Schutz.

export function corsHeaders(env, origin) {
  const allowed = String(env.ALLOWED_ORIGINS || "")
    .split(",").map((s) => s.trim()).filter(Boolean);
  const h = {
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, CF-Turnstile-Token",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
  // Access-Control-Allow-Origin NUR fuer tatsaechlich erlaubte Origins spiegeln. Frueher
  // wurde fuer fremde Origins faelschlich allowed[0] zurueckgegeben — der Browser blockt
  // das zwar (Mismatch), aber korrekt ist, den Header fuer Nicht-erlaubte wegzulassen.
  if (origin && allowed.includes(origin)) h["Access-Control-Allow-Origin"] = origin;
  return h;
}

export function preflight(env, origin) {
  return new Response(null, { status: 204, headers: corsHeaders(env, origin) });
}
