// Qualitätsstufen (Plan A.2.3). Client schickt nur den Stufen-NAMEN (Enum), der Worker
// mappt auf Modell + Schema-Modus + Preis. "beste"/Opus liegt hinter der Paywall
// (Phase B) → im Gratis-Tier nicht wählbar (ALLOW_PAID=0 → 402).

export const TIERS = {
  standard: { model: "openai/gpt-5.1", reasoning: { effort: "medium" }, strictSchema: true, outUsdPerMtok: 10, free: true },
  guenstig: { model: "deepseek/deepseek-v3.2", reasoning: false, strictSchema: false, outUsdPerMtok: 1, free: true },
  beste: { model: "anthropic/claude-opus-4.8", reasoning: null, strictSchema: true, outUsdPerMtok: 25, free: false },
};

export const DEFAULT_TIER = "standard";

// Liefert { key, tier } oder { error: 400|402 }. Unbekannte Stufe → 400, gesperrte → 402.
export function resolveTier(name, { allowPaid }) {
  const key = String(name || DEFAULT_TIER).toLowerCase();
  const tier = TIERS[key];
  if (!tier) return { error: 400 };
  if (!tier.free && !allowPaid) return { error: 402 };
  return { key, tier };
}

// Konservative Worst-Case-Kosten für das DO-Gate: Output-Cap × Preis + 15 % Puffer (Input).
// Das DO reserviert diesen Betrag vorab und korrigiert nach Stream-Ende auf den Ist-usage.cost.
export function worstCaseCost(tier, hardCapTokens) {
  const out = (hardCapTokens / 1e6) * tier.outUsdPerMtok;
  return Math.ceil(out * 1.15 * 1e6) / 1e6;
}
