// Invisible spam protection for the enquiry form: no CAPTCHA, nothing the
// visitor sees. Layers (cheapest first):
//   1. honeypot field   — hidden input that humans never fill in
//   2. fill-time check  — a human can't complete the form in under a few seconds
//   3. link stuffing    — spam is nearly always "check out http://..."
//   4. duplicate check  — same email + message twice in a row (double-click,
//                         or a bot replaying a submission)
//   5. per-IP rate limit — caps how much a single address can send
//
// State is in-memory, which is fine for the single long-lived pm2 process; a
// restart just resets the counters.

export const HONEYPOT_FIELD = "company_website";
export const RENDERED_AT_FIELD = "rendered_at";

export const MIN_FILL_MS = 3000;
export const MAX_LINKS_IN_NOTES = 2;
export const FIELD_LIMITS = { name: 200, email: 254, phone: 50, notes: 4000 } as const;

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const DUPLICATE_WINDOW_MS = 10 * 60 * 1000;
const MAP_PRUNE_THRESHOLD = 1000;

export type SpamReason =
  | "honeypot"
  | "no-timestamp"
  | "too-fast"
  | "links"
  | "oversize"
  | "duplicate";

export type SpamVerdict = { ok: true } | { ok: false; reason: SpamReason };

export type EnquirySpamInput = {
  honeypot: string;
  renderedAt: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
  now: number;
};

const URL_PATTERN = /(?:https?:\/\/|www\.)\S+/gi;

function countLinks(text: string): number {
  return text.match(URL_PATTERN)?.length ?? 0;
}

// Pure content/behaviour checks (no state), so they're easy to unit test.
export function assessEnquiry(input: EnquirySpamInput): SpamVerdict {
  if (input.honeypot.trim() !== "") return { ok: false, reason: "honeypot" };

  const renderedAt = Number(input.renderedAt);
  if (!input.renderedAt || !Number.isFinite(renderedAt)) {
    return { ok: false, reason: "no-timestamp" };
  }
  // Also catches a timestamp from the "future" (clock-skew games).
  const elapsed = input.now - renderedAt;
  if (elapsed < MIN_FILL_MS) return { ok: false, reason: "too-fast" };

  if (
    input.name.length > FIELD_LIMITS.name ||
    input.email.length > FIELD_LIMITS.email ||
    input.phone.length > FIELD_LIMITS.phone ||
    input.notes.length > FIELD_LIMITS.notes
  ) {
    return { ok: false, reason: "oversize" };
  }

  if (
    countLinks(input.name) > 0 ||
    countLinks(input.phone) > 0 ||
    countLinks(input.notes) > MAX_LINKS_IN_NOTES
  ) {
    return { ok: false, reason: "links" };
  }

  return { ok: true };
}

const recentSubmissions = new Map<string, number>();

// Returns true if this exact email + message was already accepted recently.
// Records the submission when it is new.
export function isDuplicateSubmission(email: string, notes: string, now: number): boolean {
  if (recentSubmissions.size > MAP_PRUNE_THRESHOLD) {
    for (const [key, at] of recentSubmissions) {
      if (now - at > DUPLICATE_WINDOW_MS) recentSubmissions.delete(key);
    }
  }
  const key = `${email.toLowerCase()}|${notes}`;
  const seenAt = recentSubmissions.get(key);
  if (seenAt !== undefined && now - seenAt < DUPLICATE_WINDOW_MS) return true;
  recentSubmissions.set(key, now);
  return false;
}

const hitsByIp = new Map<string, number[]>();

// Sliding-window limiter. Returns true when `ip` is over the limit. A hit is
// only recorded when allowed, so a blocked client doesn't extend its own ban.
export function isRateLimited(ip: string, now: number): boolean {
  if (hitsByIp.size > MAP_PRUNE_THRESHOLD) {
    for (const [key, hits] of hitsByIp) {
      if (hits.every((t) => now - t > RATE_LIMIT_WINDOW_MS)) hitsByIp.delete(key);
    }
  }
  const recent = (hitsByIp.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) {
    hitsByIp.set(ip, recent);
    return true;
  }
  recent.push(now);
  hitsByIp.set(ip, recent);
  return false;
}

// The site sits behind a reverse proxy, so the client address arrives in
// X-Forwarded-For (left-most entry) or X-Real-IP. Returns null when neither is
// present — callers must then skip IP rate limiting rather than lump every
// visitor into one bucket.
export function clientIpFromHeaders(get: (name: string) => string | null): string | null {
  const forwarded = get("x-forwarded-for")?.split(",")[0]?.trim();
  if (forwarded) return forwarded;
  const real = get("x-real-ip")?.trim();
  return real || null;
}

// Test hook.
export function resetSpamGuardState(): void {
  recentSubmissions.clear();
  hitsByIp.clear();
}
