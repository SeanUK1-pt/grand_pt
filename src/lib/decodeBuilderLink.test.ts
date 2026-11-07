import { describe, it, expect, vi } from "vitest";

// The extras module is mocked with synthetic part numbers so these tests don't
// depend on the generated catalog; the real vocabulary is covered by the
// "real catalog" test at the bottom.
vi.mock("@/data/extras", () => ({
  extras: [
    { partNumber: "3508", name: "Teak deck inlay" },
    { partNumber: "1200", name: "Bow thruster" },
  ],
}));

const { decodeBuilderLink } = await import("./decodeBuilderLink");

describe("decodeBuilderLink", () => {
  it("returns an empty, failed result for null input", () => {
    const result = decodeBuilderLink(null);
    expect(result).toEqual({
      extrasDecoded: [],
      coloursDecoded: [],
      decodeSucceeded: false,
      builderLinkRaw: null,
    });
  });

  it("returns an empty, failed result for a malformed URL", () => {
    const result = decodeBuilderLink("not a url at all");
    expect(result.extrasDecoded).toEqual([]);
    expect(result.decodeSucceeded).toBe(false);
    expect(result.builderLinkRaw).toBe("not a url at all");
  });

  it("returns an empty, failed result when the URL has no options param", () => {
    const result = decodeBuilderLink("https://builder.grandboats.example/g680");
    expect(result.extrasDecoded).toEqual([]);
    expect(result.decodeSucceeded).toBe(false);
    expect(result.builderLinkRaw).toBe("https://builder.grandboats.example/g680");
  });

  it("returns only the matched extras when some part numbers don't match", () => {
    const result = decodeBuilderLink(
      "https://builder.grandboats.example/g680?options=3508-9999"
    );
    expect(result.decodeSucceeded).toBe(true);
    expect(result.extrasDecoded).toEqual([{ partNumber: "3508", name: "Teak deck inlay" }]);
  });

  it("returns the full list when every part number matches", () => {
    const result = decodeBuilderLink(
      "https://builder.grandboats.example/g680?options=3508-1200"
    );
    expect(result.decodeSucceeded).toBe(true);
    expect(result.extrasDecoded).toEqual([
      { partNumber: "3508", name: "Teak deck inlay" },
      { partNumber: "1200", name: "Bow thruster" },
    ]);
  });

  it("decodes colour choices in tab/slot order and keeps Grand's wording", () => {
    const q = new URLSearchParams({
      "tab-2-color-1": "Fiberglass | Gelcoat: White",
      "tab-1-color-2": "Tube | Tube Decor: Black",
      "tab-1-color-1": "Tube | Tube Color: Ice White",
      options: "3508",
    });
    const result = decodeBuilderLink(`https://grandboats.pt/en/configurator/g680?${q.toString()}`);
    expect(result.decodeSucceeded).toBe(true);
    expect(result.coloursDecoded).toEqual([
      "Tube | Tube Color: Ice White",
      "Tube | Tube Decor: Black",
      "Fiberglass | Gelcoat: White",
    ]);
  });

  it("succeeds with no extras when only colours are present, or options is empty", () => {
    const onlyColours = decodeBuilderLink("https://grandboats.pt/en/configurator/g680?tab-1-color-1=Ice");
    expect(onlyColours.decodeSucceeded).toBe(true);
    expect(onlyColours.extrasDecoded).toEqual([]);
    const emptyOptions = decodeBuilderLink("https://grandboats.pt/en/configurator/g680?options=");
    expect(emptyOptions.decodeSucceeded).toBe(true);
  });
});

describe("real catalog", () => {
  it("resolves actual Grand part numbers to names", async () => {
    vi.doUnmock("@/data/extras");
    vi.resetModules();
    const { decodeBuilderLink: real } = await import("./decodeBuilderLink");
    const result = real("https://grandboats.pt/en/configurator/g680?options=2438-3517");
    expect(result.extrasDecoded.map((e) => e.partNumber)).toEqual(["2438", "3517"]);
    expect(result.extrasDecoded[0].name).toMatch(/swimming platforms/i);
  });
});
