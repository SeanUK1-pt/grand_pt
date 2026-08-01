"use server";

import { mailRow, mailParagraph, sendMail } from "@/lib/mailer";

export type ContactActionState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitContactAction(
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

  return { status: "success" };
}
