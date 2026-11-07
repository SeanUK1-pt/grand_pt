import { headers } from "next/headers";
import {
  HONEYPOT_FIELD,
  RENDERED_AT_FIELD,
  assessEnquiry,
  clientIpFromHeaders,
  isDuplicateSubmission,
  isRateLimited,
} from "@/lib/spamGuard";

export type ScreenResult =
  // Looks like a bot or a repeat: report success to the sender, send nothing.
  // Bots get no signal to adapt to.
  | "drop"
  // Real-looking but over the per-IP limit: tell the sender.
  | "rate-limited"
  | "ok";

// Server-side half of the spam guard, shared by the enquiry and contact
// actions. `message` is the free-text body (notes / message).
export async function screenSubmission(
  formData: FormData,
  fields: { name: string; email: string; phone: string; message: string },
  label: string
): Promise<ScreenResult> {
  let clientIp: string | null = null;
  try {
    const h = await headers();
    clientIp = clientIpFromHeaders((n) => h.get(n));
  } catch {}

  const now = Date.now();
  const verdict = assessEnquiry({
    honeypot: formData.get(HONEYPOT_FIELD)?.toString() ?? "",
    renderedAt: formData.get(RENDERED_AT_FIELD)?.toString() ?? "",
    name: fields.name,
    email: fields.email,
    phone: fields.phone,
    notes: fields.message,
    now,
  });
  if (!verdict.ok) {
    console.warn(`[spamGuard] ${label} dropped (${verdict.reason})`);
    return "drop";
  }
  if (isDuplicateSubmission(fields.email, fields.message, now)) {
    console.warn(`[spamGuard] duplicate ${label} ignored`);
    return "drop";
  }
  if (clientIp && isRateLimited(clientIp, now)) {
    console.warn(`[spamGuard] ${label} rate-limited`);
    return "rate-limited";
  }
  return "ok";
}
