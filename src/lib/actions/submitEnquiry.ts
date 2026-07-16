"use server";

export type EnquiryActionState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export type EnquiryContext = {
  range: "golden" | "silver" | "drive";
  modelName: string;
  layoutName?: string;
  decodedExtras: { partNumber: string; name: string }[];
  decodeSucceeded: boolean;
  builderLinkRaw: string | null;
};

// Bound via .bind(null, context) in EnquireForm before being passed to
// useActionState, so `context` arrives pre-filled and only `formData` comes
// from the actual <form> submission.
export async function submitEnquiryAction(
  context: EnquiryContext,
  _prevState: EnquiryActionState,
  formData: FormData
): Promise<EnquiryActionState> {
  const name = formData.get("name")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim() ?? "";
  const phone = formData.get("phone")?.toString().trim() ?? "";
  const notes = formData.get("notes")?.toString().trim() ?? "";

  if (!name || !email) {
    return { status: "error", message: "Please fill in your name and email before sending." };
  }

  const payload = {
    range: context.range,
    modelName: context.modelName,
    layoutName: context.layoutName,
    // Names only — the sales team doesn't need raw part numbers.
    extras: context.decodedExtras.map((e) => e.name),
    // False means the builderLink was absent/malformed, so `extras` above may
    // be an incomplete best-effort decode rather than the full configuration.
    decodeSucceeded: context.decodeSucceeded,
    // Logged for support/debugging only — never shown to the customer.
    builderLinkRaw: context.builderLinkRaw,
    customer: { name, email, phone, notes },
    timestamp: new Date().toISOString(),
  };

  console.log("[EnquireForm submission]", payload);

  // TODO: wire up email transport (Resend/SendGrid/nodemailer/etc). Payload
  // shape to send is exactly the `payload` object above:
  // {
  //   range: "golden" | "silver" | "drive",
  //   modelName: string,
  //   layoutName?: string,
  //   extras: string[],              // names only, not part numbers
  //   decodeSucceeded: boolean,      // false = builderLink absent/malformed;
  //                                  // extras[] may be an incomplete partial decode
  //   builderLinkRaw: string | null, // support/debugging only, not customer-facing
  //   customer: { name: string, email: string, phone: string, notes: string },
  //   timestamp: string,             // ISO 8601
  // }
  // No price/total appears anywhere in this payload — EnquireForm never
  // collects or displays pricing, by design.

  return { status: "success" };
}
