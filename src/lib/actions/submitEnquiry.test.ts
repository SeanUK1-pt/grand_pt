import { beforeEach, describe, expect, it, vi } from "vitest";

const sendMail = vi.fn();
const forwardEnquiryToAbg = vi.fn();
let requestHeaders: Record<string, string> = {};

vi.mock("next/headers", () => ({
  headers: async () => ({ get: (n: string) => requestHeaders[n] ?? null }),
}));
vi.mock("@/lib/mailer", () => ({
  sendMail: (...a: unknown[]) => sendMail(...a),
  mailRow: (k: string, v: string) => `${k}:${v}`,
  mailParagraph: (v: string) => v,
}));
vi.mock("@/lib/abgLeads", () => ({
  forwardEnquiryToAbg: (...a: unknown[]) => forwardEnquiryToAbg(...a),
}));

import { submitEnquiryAction, type EnquiryContext } from "./submitEnquiry";
import { resetSpamGuardState } from "@/lib/spamGuard";

const context: EnquiryContext = {
  range: "golden",
  modelName: "Grand G580",
  decodedExtras: [],
  decodeSucceeded: false,
  builderLinkRaw: null,
  locale: "en",
};

function form(overrides: Record<string, string> = {}): FormData {
  const fd = new FormData();
  const base: Record<string, string> = {
    name: "Ana Silva",
    email: "ana@example.com",
    phone: "",
    notes: "Can we arrange a viewing?",
    company_website: "",
    rendered_at: String(Date.now() - 30_000),
    ...overrides,
  };
  for (const [k, v] of Object.entries(base)) fd.set(k, v);
  return fd;
}

const submit = (fd: FormData) => submitEnquiryAction(context, { status: "idle" }, fd);

beforeEach(() => {
  resetSpamGuardState();
  sendMail.mockReset().mockResolvedValue(undefined);
  forwardEnquiryToAbg.mockReset().mockResolvedValue(undefined);
  requestHeaders = { "x-forwarded-for": "203.0.113.7" };
});

describe("submitEnquiryAction spam protection", () => {
  it("delivers and forwards a legitimate enquiry", async () => {
    expect(await submit(form())).toEqual({ status: "success" });
    expect(sendMail).toHaveBeenCalledTimes(1);
    expect(forwardEnquiryToAbg).toHaveBeenCalledTimes(1);
  });

  it("fakes success but sends nothing when the honeypot is filled", async () => {
    expect(await submit(form({ company_website: "http://spam.example" }))).toEqual({
      status: "success",
    });
    expect(sendMail).not.toHaveBeenCalled();
    expect(forwardEnquiryToAbg).not.toHaveBeenCalled();
  });

  it("fakes success but sends nothing when submitted too fast or with no timestamp", async () => {
    expect(await submit(form({ rendered_at: String(Date.now()) }))).toEqual({ status: "success" });
    expect(await submit(form({ rendered_at: "", email: "b@example.com" }))).toEqual({
      status: "success",
    });
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("sends a double-submitted enquiry only once", async () => {
    await submit(form());
    expect(await submit(form())).toEqual({ status: "success" });
    expect(sendMail).toHaveBeenCalledTimes(1);
    expect(forwardEnquiryToAbg).toHaveBeenCalledTimes(1);
  });

  it("rate-limits a single IP with an honest error, but not other IPs", async () => {
    for (let i = 0; i < 5; i++) {
      expect(await submit(form({ email: `u${i}@example.com`, notes: `n${i}` }))).toEqual({
        status: "success",
      });
    }
    const blocked = await submit(form({ email: "u9@example.com", notes: "n9" }));
    expect(blocked.status).toBe("error");
    expect(sendMail).toHaveBeenCalledTimes(5);

    requestHeaders = { "x-forwarded-for": "198.51.100.9" };
    expect(await submit(form({ email: "other@example.com" }))).toEqual({ status: "success" });
  });

  it("does not rate-limit when no client IP is available", async () => {
    requestHeaders = {};
    for (let i = 0; i < 8; i++) {
      expect(await submit(form({ email: `u${i}@example.com`, notes: `n${i}` }))).toEqual({
        status: "success",
      });
    }
    expect(sendMail).toHaveBeenCalledTimes(8);
  });

  it("still reports validation and mail-send errors honestly", async () => {
    expect((await submit(form({ name: "" }))).status).toBe("error");
    sendMail.mockRejectedValueOnce(new Error("smtp down"));
    expect((await submit(form())).status).toBe("error");
  });
});
