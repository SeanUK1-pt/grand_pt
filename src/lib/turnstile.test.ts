import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { verifyTurnstile } from "./turnstile";

const fetchMock = vi.fn();

beforeEach(() => {
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
  vi.spyOn(console, "warn").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
  process.env.TURNSTILE_SECRET_KEY = "test-secret";
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  delete process.env.TURNSTILE_SECRET_KEY;
});

const reply = (body: unknown, ok = true, status = 200) =>
  fetchMock.mockResolvedValue({ ok, status, json: async () => body });

describe("verifyTurnstile", () => {
  it("skips (and never calls Cloudflare) when no secret is configured", async () => {
    delete process.env.TURNSTILE_SECRET_KEY;
    expect(await verifyTurnstile("tok", "1.2.3.4")).toBe("skipped");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("fails a missing token without calling Cloudflare", async () => {
    expect(await verifyTurnstile("", "1.2.3.4")).toBe("failed");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns ok when Cloudflare says success, sending secret, token and IP", async () => {
    reply({ success: true });
    expect(await verifyTurnstile("tok", "1.2.3.4")).toBe("ok");
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://challenges.cloudflare.com/turnstile/v0/siteverify");
    const body = init.body as URLSearchParams;
    expect(body.get("secret")).toBe("test-secret");
    expect(body.get("response")).toBe("tok");
    expect(body.get("remoteip")).toBe("1.2.3.4");
  });

  it("omits remoteip when the client IP is unknown", async () => {
    reply({ success: true });
    await verifyTurnstile("tok", null);
    expect((fetchMock.mock.calls[0][1].body as URLSearchParams).has("remoteip")).toBe(false);
  });

  it("returns failed when Cloudflare rejects the token", async () => {
    reply({ success: false, "error-codes": ["invalid-input-response"] });
    expect(await verifyTurnstile("bad", "1.2.3.4")).toBe("failed");
  });

  it("fails open when Cloudflare errors or is unreachable", async () => {
    reply({}, false, 500);
    expect(await verifyTurnstile("tok", null)).toBe("skipped");
    fetchMock.mockRejectedValue(new Error("network down"));
    expect(await verifyTurnstile("tok", null)).toBe("skipped");
  });
});
