// Turnstile-Siteverify (Plan A.2.5/A.3.4). Token kurzlebig, einmalig (Cloudflare
// invalidiert jedes Token nach dem ersten erfolgreichen Siteverify → Replay-Schutz),
// an die Action gebunden.
//
// reqHash-Bindung (Token ↔ konkreter Request) ist als cData vorgesehen: der Client
// setzt cData = Hash(Body) im Widget, hier gegen den neu berechneten Hash prüfen.
// Als TODO markiert, weil es Client-Mitarbeit braucht.

export async function verifyTurnstile(token, { action, secret, ip, reqHash }) {
  if (!token || !secret) return { ok: false, reason: "missing" };
  const form = new FormData();
  form.append("secret", secret);
  form.append("response", token);
  if (ip) form.append("remoteip", ip);
  let data = {};
  try {
    const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: form });
    data = await r.json();
  } catch (e) {
    return { ok: false, reason: "siteverify-failed" };
  }
  if (!data.success) return { ok: false, reason: "rejected", data };
  if (action && data.action && data.action !== action) return { ok: false, reason: "action-mismatch", data };
  // TODO: if (reqHash && data.cdata && data.cdata !== reqHash) return { ok:false, reason:"hash-mismatch" };
  return { ok: true, data };
}
