import { beforeEach, describe, expect, it, vi } from "vitest";

const sendMail = vi.fn();
const forwardEnquiryToAbg = vi.fn();

vi.mock("next/headers", () => ({
  headers: async () => ({
    get: (n: string) =>
      ({ "x-forwarded-for": "203.0.113.7", referer: "https://grandboats.pt/pt/contact" })[n] ?? null,
  }),
}));
vi.mock("@/lib/mailer", () => ({
  sendMail: (...a: unknown[]) => sendMail(...a),
  mailRow: (k: string, v: string) => `${k}:${v}`,
  mailParagraph: (v: string) => v,
}));
vi.mock("@/lib/abgLeads", () => ({
  forwardEnquiryToAbg: (...a: unknown[]) => forwardEnquiryToAbg(...a),
}));

import { submitContactAction } from "./submitContact";
import { resetSpamGuardState } from "@/lib/spamGuard";

function form(overrides: Record<string, string> = {}): FormData {
  const fd = new FormData();
  const base: Record<string, string> = {
    name: "Ana Silva",
    email: "ana@example.com",
    phone: "+351 912 345 678",
    message: "Do you have a G580 in stock?",
    company_website: "",
    rendered_at: String(Date.now() - 30_000),
    ...overrides,
  };
  for (const [k, v] of Object.entries(base)) fd.set(k, v);
  return fd;
}

beforeEach(() => {
  resetSpamGuardState();
  sendMail.mockReset().mockResolvedValue(undefined);
  forwardEnquiryToAbg.mockReset().mockResolvedValue(undefined);
});

describe("submitContactAction", () => {
  it("emails and forwards a contact message to the ABG tracker", async () => {
    const res = await submitContactAction("pt", { status: "idle" }, form());
    expect(res).toEqual({ status: "success" });
    expect(sendMail).toHaveBeenCalledTimes(1);
    expect(forwardEnquiryToAbg).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Ana Silva",
        email: "ana@example.com",
        phone: "+351 912 345 678",
        notes: "Do you have a G580 in stock?",
        interest: "General enquiry — contact form",
        locale: "pt",
        sourceUrl: "https://grandboats.pt/pt/contact",
      })
    );
  });

  it("does not forward when the email fails to send", async () => {
    sendMail.mockRejectedValueOnce(new Error("smtp down"));
    const res = await submitContactAction("en", { status: "idle" }, form());
    expect(res.status).toBe("error");
    expect(forwardEnquiryToAbg).not.toHaveBeenCalled();
  });

  it("neither emails nor forwards spam (honeypot filled)", async () => {
    const res = await submitContactAction(
      "en",
      { status: "idle" },
      form({ company_website: "http://spam.example" })
    );
    expect(res).toEqual({ status: "success" });
    expect(sendMail).not.toHaveBeenCalled();
    expect(forwardEnquiryToAbg).not.toHaveBeenCalled();
  });
});
