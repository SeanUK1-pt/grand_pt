const DEFAULT_URL = "https://pricing.algarveboatgroup.com/api/inbound/enquiry";

export type AbgLeadInput = {
  name: string;
  email: string;
  phone: string;
  notes: string;
  interest: string;
  extraNames: string[];
  decodeSucceeded: boolean;
  builderLinkRaw: string | null;
  locale: string;
  sourceUrl?: string | null;
};

export type AbgLeadPayload = {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  interest: string;
  details?: string;
  locale: string;
  sourceUrl?: string;
};

export function buildAbgLeadPayload(input: AbgLeadInput): AbgLeadPayload {
  const detailLines: string[] = [];
  if (input.extraNames.length > 0) {
    detailLines.push(`Configured extras: ${input.extraNames.join(", ")}`);
  }
  if (!input.decodeSucceeded && input.builderLinkRaw) {
    detailLines.push(
      "Builder link present but could not be fully decoded — extras above may be incomplete."
    );
  }
  if (input.builderLinkRaw) {
    detailLines.push(`builderLink: ${input.builderLinkRaw}`);
  }

  const payload: AbgLeadPayload = {
    name: input.name.slice(0, 200),
    email: input.email,
    interest: input.interest,
    locale: input.locale,
  };
  if (input.phone) payload.phone = input.phone;
  if (input.notes) payload.message = input.notes.slice(0, 4000);
  if (detailLines.length > 0) payload.details = detailLines.join("\n").slice(0, 4000);
  if (input.sourceUrl) payload.sourceUrl = input.sourceUrl;
  return payload;
}

// Additive and best-effort: never throws, so a tracker outage can't affect
// the visitor's form. Meant to be called as `void forwardEnquiryToAbg(...)`
// after the site's own email has been sent.
export async function forwardEnquiryToAbg(input: AbgLeadInput): Promise<void> {
  const apiKey = process.env.ABG_PRICING_API_KEY;
  if (!apiKey) {
    console.warn("[abgLeads] ABG_PRICING_API_KEY not set — enquiry not forwarded to the ABG tracker");
    return;
  }

  try {
    const res = await fetch(process.env.ABG_PRICING_URL || DEFAULT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-ABG-Api-Key": apiKey },
      body: JSON.stringify(buildAbgLeadPayload(input)),
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) {
      console.error(`[abgLeads] tracker responded ${res.status} ${res.statusText}`);
    }
  } catch (err) {
    console.error("[abgLeads] forwarding enquiry failed:", err);
  }
}
