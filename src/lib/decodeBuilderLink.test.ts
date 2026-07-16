import { describe, it, expect, vi } from "vitest";

// NOTE: extras module is mocked with synthetic part numbers. When
// src/data/extras.ts is populated with real kiosk data, add an integration
// test confirming the real vocabulary round-trips correctly through this
// utility.
//
// Mock the extras dataset so this test is independent of whatever placeholder
// or real data currently lives in src/data/extras.ts.
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
});
