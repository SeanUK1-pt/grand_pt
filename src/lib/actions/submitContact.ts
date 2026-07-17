"use server";

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

  const payload = {
    customer: { name, email, phone, message },
    timestamp: new Date().toISOString(),
  };

  console.log("[ContactForm submission]", payload);

  // TODO: wire up email transport (Resend/SendGrid/nodemailer/etc). Payload
  // shape to send is exactly the `payload` object above. Unlike the
  // model-specific EnquireForm, there's no range/model/extras context here —
  // this is a general, brand-level enquiry.

  return { status: "success" };
}
