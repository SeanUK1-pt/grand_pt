import { beforeEach, describe, expect, it } from "vitest";
import {
  FIELD_LIMITS,
  MIN_FILL_MS,
  assessEnquiry,
  clientIpFromHeaders,
  isDuplicateSubmission,
  isRateLimited,
  resetSpamGuardState,
  type EnquirySpamInput,
} from "./spamGuard";

const NOW = 1_800_000_000_000;

function input(overrides: Partial<EnquirySpamInput> = {}): EnquirySpamInput {
  return {
    honeypot: "",
    renderedAt: String(NOW - 20_000),
    name: "Ana Silva",
    email: "ana@example.com",
    phone: "+351 912 345 678",
    notes: "Interested in the G580, can we arrange a viewing?",
    now: NOW,
    ...overrides,
  };
}

beforeEach(() => resetSpamGuardState());

describe("assessEnquiry", () => {
  it("accepts a normal enquiry", () => {
    expect(assessEnquiry(input())).toEqual({ ok: true });
  });

  it("rejects a filled honeypot", () => {
    expect(assessEnquiry(input({ honeypot: "http://spam.example" }))).toEqual({
      ok: false,
      reason: "honeypot",
    });
  });

  it("rejects a missing or invalid timestamp", () => {
    expect(assessEnquiry(input({ renderedAt: "" }))).toMatchObject({ reason: "no-timestamp" });
    expect(assessEnquiry(input({ renderedAt: "abc" }))).toMatchObject({ reason: "no-timestamp" });
  });

  it("rejects submissions faster than a human could fill the form", () => {
    expect(assessEnquiry(input({ renderedAt: String(NOW - (MIN_FILL_MS - 1)) }))).toMatchObject({
      reason: "too-fast",
    });
    expect(assessEnquiry(input({ renderedAt: String(NOW + 60_000) }))).toMatchObject({
      reason: "too-fast",
    });
    expect(assessEnquiry(input({ renderedAt: String(NOW - MIN_FILL_MS) }))).toEqual({ ok: true });
  });

  it("accepts a form left open for a long time", () => {
    expect(assessEnquiry(input({ renderedAt: String(NOW - 3 * 24 * 3600 * 1000) }))).toEqual({
      ok: true,
    });
  });

  it("allows up to two links in the notes but not three", () => {
    const two = "see https://a.example/x and www.b.example";
    expect(assessEnquiry(input({ notes: two }))).toEqual({ ok: true });
    expect(assessEnquiry(input({ notes: `${two} http://c.example` }))).toMatchObject({
      reason: "links",
    });
  });

  it("rejects links in the name or phone", () => {
    expect(assessEnquiry(input({ name: "Buy now http://spam.example" }))).toMatchObject({
      reason: "links",
    });
    expect(assessEnquiry(input({ phone: "www.spam.example" }))).toMatchObject({ reason: "links" });
  });

  it("rejects oversize fields", () => {
    expect(assessEnquiry(input({ notes: "x".repeat(FIELD_LIMITS.notes + 1) }))).toMatchObject({
      reason: "oversize",
    });
    expect(assessEnquiry(input({ name: "x".repeat(FIELD_LIMITS.name + 1) }))).toMatchObject({
      reason: "oversize",
    });
  });
});

describe("isDuplicateSubmission", () => {
  it("flags the same email + message inside the window, case-insensitively on email", () => {
    expect(isDuplicateSubmission("a@x.com", "hello", NOW)).toBe(false);
    expect(isDuplicateSubmission("A@X.com", "hello", NOW + 1000)).toBe(true);
  });

  it("allows a different message or a later resubmission", () => {
    expect(isDuplicateSubmission("a@x.com", "hello", NOW)).toBe(false);
    expect(isDuplicateSubmission("a@x.com", "different", NOW + 1000)).toBe(false);
    expect(isDuplicateSubmission("a@x.com", "hello", NOW + 11 * 60 * 1000)).toBe(false);
  });
});

describe("isRateLimited", () => {
  it("allows 5 per window per IP, then blocks", () => {
    for (let i = 0; i < 5; i++) expect(isRateLimited("1.2.3.4", NOW + i)).toBe(false);
    expect(isRateLimited("1.2.3.4", NOW + 10)).toBe(true);
  });

  it("tracks IPs independently", () => {
    for (let i = 0; i < 5; i++) isRateLimited("1.2.3.4", NOW + i);
    expect(isRateLimited("5.6.7.8", NOW + 10)).toBe(false);
  });

  it("frees the IP once the window has passed", () => {
    for (let i = 0; i < 5; i++) isRateLimited("1.2.3.4", NOW + i);
    expect(isRateLimited("1.2.3.4", NOW + 16 * 60 * 1000)).toBe(false);
  });

  it("does not extend the block while a client keeps hammering", () => {
    for (let i = 0; i < 5; i++) isRateLimited("1.2.3.4", NOW + i);
    for (let i = 0; i < 20; i++) isRateLimited("1.2.3.4", NOW + 60_000 + i);
    expect(isRateLimited("1.2.3.4", NOW + 16 * 60 * 1000)).toBe(false);
  });
});

describe("clientIpFromHeaders", () => {
  const from = (h: Record<string, string>) => (n: string) => h[n] ?? null;

  it("uses the left-most X-Forwarded-For entry", () => {
    expect(clientIpFromHeaders(from({ "x-forwarded-for": "9.9.9.9, 10.0.0.1" }))).toBe("9.9.9.9");
  });

  it("falls back to X-Real-IP, then null", () => {
    expect(clientIpFromHeaders(from({ "x-real-ip": "8.8.8.8" }))).toBe("8.8.8.8");
    expect(clientIpFromHeaders(from({}))).toBeNull();
  });
});
