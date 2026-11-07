const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export const TURNSTILE_RESPONSE_FIELD = "cf-turnstile-response";

// "skipped" means we couldn't or didn't check (no secret configured, or
// Cloudflare unreachable). Callers treat it as a pass: a Cloudflare outage or a
// missing key must never cost the business a real enquiry. The honeypot, timing
// and rate-limit layers in spamGuard.ts still apply.
export type TurnstileResult = "ok" | "failed" | "skipped";

export async function verifyTurnstile(
  token: string,
  remoteIp: string | null
): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.warn("[turnstile] TURNSTILE_SECRET_KEY not set — Turnstile check skipped");
    return "skipped";
  }
  // A real browser with the widget loaded always sends a token; a missing one
  // means a bot posting directly, or a visitor whose browser blocked the widget.
  if (!token) return "failed";

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (remoteIp) body.set("remoteip", remoteIp);
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      body,
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) {
      console.error(`[turnstile] siteverify responded ${res.status} — check skipped`);
      return "skipped";
    }
    const data = (await res.json()) as { success?: boolean; "error-codes"?: string[] };
    if (data.success) return "ok";
    console.warn(`[turnstile] verification failed: ${(data["error-codes"] ?? []).join(", ")}`);
    return "failed";
  } catch (err) {
    console.error("[turnstile] siteverify request failed — check skipped:", err);
    return "skipped";
  }
}
