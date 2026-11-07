"use server";

import { headers } from "next/headers";
import { mailRow, mailParagraph, sendMail } from "@/lib/mailer";
import { forwardEnquiryToAbg } from "@/lib/abgLeads";
import { screenSubmission } from "@/lib/spamScreen";

export type ContactActionState = {
  status: "idle" | "success" | "error";
  message?: string;
};

// Bound via .bind(null, locale) in ContactForm, so `locale` arrives pre-filled.
export async function submitContactAction(
  locale: string,
  _prevState: ContactActionState,
  formData: FormData
): Promise<ContactActionState> {
  const name = formData.get("name")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim() ?? "";
  const phone = formData.get("phone")?.toString().trim() ?? "";
  const message = formData.get("message")?.toString().trim() ?? "";

  if (!name || !email) {
    return { status: "error", message: "Please fill in your name and email before sending." };
  }

  // Spam: bots get a fake success (nothing emailed); only the rate limit tells
  // the sender "no", since a real person could trip it.
  const screen = await screenSubmission(formData, { name, email, phone, message }, "contact message");
  if (screen === "drop") return { status: "success" };
  if (screen === "captcha-failed") {
    return {
      status: "error",
      message: "Verification failed. Please refresh the page and try again, or contact us directly.",
    };
  }
  if (screen === "rate-limited") {
    return {
      status: "error",
      message: "Too many messages from your connection. Please try again later or contact us directly.",
    };
  }

  // General, brand-level enquiry — no range/model/extras context, unlike
  // the model-specific EnquireForm.
  const html = `
    <h2>New Grand Boats Portugal Contact Message</h2>
    ${mailRow("Name", name)}
    ${mailRow("Email", email)}
    ${mailRow("Phone", phone || "Not provided")}
    <hr/>
    <p><strong>Message:</strong></p>
    ${mailParagraph(message)}
    <hr/>
    <p style="color:#888;font-size:12px;">Submitted ${new Date().toISOString()}</p>
  `;

  try {
    await sendMail({
      subject: `New Contact Message from ${name}`,
      html,
      replyTo: { name, email },
    });
  } catch (err) {
    console.error("[ContactForm] email send failed:", err);
    return {
      status: "error",
      message: "Something went wrong sending your message. Please try again or contact us directly.",
    };
  }

  // Same as the model enquiry form: only delivered messages are forwarded to
  // the ABG lead tracker, fire-and-forget (the helper never throws).
  let referer: string | null = null;
  try {
    referer = (await headers()).get("referer");
  } catch {}
  void forwardEnquiryToAbg({
    name,
    email,
    phone,
    notes: message,
    interest: "General enquiry — contact form",
    extraNames: [],
    decodeSucceeded: true,
    builderLinkRaw: null,
    locale,
    sourceUrl: referer && /^https?:\/\//.test(referer) ? referer : null,
  });

  return { status: "success" };
}
