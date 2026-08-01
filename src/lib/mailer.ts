// Same SMTP transport pattern as algarveboatsales.com's src/app/api/enquire/route.ts
// (same AWS SES account/credentials, same env var names) — this site has no
// CMS/database to fall back on, so unlike that route, a send failure here
// is surfaced as an error rather than swallowed.
type MailInput = {
  subject: string;
  html: string;
  replyTo: { name: string; email: string };
};

export function mailerConfigured(): boolean {
  return !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.CONTACT_EMAIL);
}

export async function sendMail({ subject, html, replyTo }: MailInput): Promise<void> {
  if (!mailerConfigured()) {
    throw new Error("SMTP not configured (SMTP_HOST/SMTP_USER/CONTACT_EMAIL missing)");
  }

  const nodemailer = await import("nodemailer");
  const transporter = nodemailer.default.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  await transporter.sendMail({
    from: `Grand Boats Portugal <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    replyTo: `${replyTo.name} <${replyTo.email}>`,
    to: process.env.CONTACT_EMAIL,
    subject,
    html,
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function mailRow(label: string, value: string): string {
  return `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`;
}

export function mailParagraph(text: string): string {
  return `<p>${escapeHtml(text).replace(/\n/g, "<br/>")}</p>`;
}
