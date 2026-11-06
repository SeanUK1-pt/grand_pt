import { describe, it, expect, vi, afterEach } from "vitest";
import { buildAbgLeadPayload, forwardEnquiryToAbg, type AbgLeadInput } from "./abgLeads";

const base: AbgLeadInput = {
  name: "Ana Silva",
  email: "ana@example.com",
  phone: "",
  notes: "",
  interest: "G850 — Cruiser (Golden Line)",
  extraNames: [],
  decodeSucceeded: true,
  builderLinkRaw: null,
  locale: "pt",
};

describe("buildAbgLeadPayload", () => {
  it("omits empty optional fields", () => {
    expect(buildAbgLeadPayload(base)).toEqual({
      name: "Ana Silva",
      email: "ana@example.com",
      interest: "G850 — Cruiser (Golden Line)",
      locale: "pt",
    });
  });

  it("maps notes, phone, extras, builder link and source URL", () => {
    const p = buildAbgLeadPayload({
      ...base,
      phone: "+351 900 000 000",
      notes: "Interested in a demo",
      extraNames: ["Teak deck inlay", "Bow thruster"],
      builderLinkRaw: "abc123",
      sourceUrl: "https://grandboats.pt/pt/enquire/",
    });
    expect(p.phone).toBe("+351 900 000 000");
    expect(p.message).toBe("Interested in a demo");
    expect(p.details).toBe("Configured extras: Teak deck inlay, Bow thruster\nbuilderLink: abc123");
    expect(p.sourceUrl).toBe("https://grandboats.pt/pt/enquire/");
  });

  it("adds the partial-decode note only when decoding failed", () => {
    const p = buildAbgLeadPayload({ ...base, decodeSucceeded: false, builderLinkRaw: "zzz" });
    expect(p.details).toContain("could not be fully decoded");
    expect(p.details).toContain("builderLink: zzz");
  });

  it("truncates to the tracker's length limits", () => {
    const p = buildAbgLeadPayload({ ...base, name: "n".repeat(300), notes: "m".repeat(5000) });
    expect(p.name).toHaveLength(200);
    expect(p.message).toHaveLength(4000);
  });
});

describe("forwardEnquiryToAbg", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("skips with a warning and no request when the key is unset", async () => {
    vi.stubEnv("ABG_PRICING_API_KEY", "");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    await forwardEnquiryToAbg(base);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(warn).toHaveBeenCalled();
  });

  it("never throws when the tracker is unreachable", async () => {
    vi.stubEnv("ABG_PRICING_API_KEY", "test-key");
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network down")));
    const err = vi.spyOn(console, "error").mockImplementation(() => {});
    await expect(forwardEnquiryToAbg(base)).resolves.toBeUndefined();
    expect(err).toHaveBeenCalled();
  });

  it("sends the key header and JSON body", async () => {
    vi.stubEnv("ABG_PRICING_API_KEY", "test-key");
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 201 });
    vi.stubGlobal("fetch", fetchMock);
    await forwardEnquiryToAbg(base);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://pricing.algarveboatgroup.com/api/inbound/enquiry");
    expect(init.headers["X-ABG-Api-Key"]).toBe("test-key");
    expect(JSON.parse(init.body).email).toBe("ana@example.com");
  });
});
