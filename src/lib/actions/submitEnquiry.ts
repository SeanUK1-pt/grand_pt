"use server";

import { mailRow, mailParagraph, sendMail } from "@/lib/mailer";

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

const rangeLabel: Record<EnquiryContext["range"], string> = {
  golden: "Golden Line",
  silver: "Silver Line",
  drive: "Drive Line",
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

  // Names only — the sales team doesn't need raw part numbers.
  const extraNames = context.decodedExtras.map((e) => e.name);
  const modelHeading = context.layoutName
    ? `${context.modelName} — ${context.layoutName}`
    : context.modelName;

  const html = `
    <h2>New Grand Boats Portugal Enquiry</h2>
    ${mailRow("Model", `${modelHeading} (${rangeLabel[context.range]})`)}
    ${mailRow("Name", name)}
    ${mailRow("Email", email)}
    ${mailRow("Phone", phone || "Not provided")}
    ${
      extraNames.length > 0
        ? mailRow("Configured extras", extraNames.join(", "))
        : ""
    }
    ${
      !context.decodeSucceeded && context.builderLinkRaw
        ? mailRow("Note", "Builder link present but could not be fully decoded — extras above may be incomplete.")
        : ""
    }
    <hr/>
    <p><strong>Notes:</strong></p>
    ${notes ? mailParagraph(notes) : "<p><em>None provided</em></p>"}
    <hr/>
    <p style="color:#888;font-size:12px;">Submitted ${new Date().toISOString()}${
      context.builderLinkRaw ? ` · builderLink: ${context.builderLinkRaw}` : ""
    }</p>
  `;

  try {
    await sendMail({
      subject: `New Enquiry: ${modelHeading}`,
      html,
      replyTo: { name, email },
    });
  } catch (err) {
    console.error("[EnquireForm] email send failed:", err);
    return {
      status: "error",
      message: "Something went wrong sending your enquiry. Please try again or contact us directly.",
    };
  }

  return { status: "success" };
}
