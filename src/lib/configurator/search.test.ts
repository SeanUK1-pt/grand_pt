import { describe, expect, it } from "vitest";
import { sanitizeConfigSearch } from "./search";

describe("sanitizeConfigSearch", () => {
  it("keeps the options list and colour choices the engine writes", () => {
    const q = sanitizeConfigSearch({
      options: "3517-2438-2553",
      "tab-1-color-1": "Tube | Tube Color: Ice White",
      "tab-4-color-2": "Other colors | SeaDek: Mocha / Black",
    });
    const p = new URLSearchParams(q);
    expect(p.get("options")).toBe("3517-2438-2553");
    expect(p.get("tab-1-color-1")).toBe("Tube | Tube Color: Ice White");
    expect(p.get("tab-4-color-2")).toBe("Other colors | SeaDek: Mocha / Black");
  });

  it("drops the boat id, unknown params and malformed values", () => {
    const q = sanitizeConfigSearch({
      id: "6926d17ccf27d75e5775452f",
      utm_source: "x",
      options: "12;DROP",
      "tab-1-color-1": "x".repeat(500),
      "tab-x-color-1": "bad",
      "tab-2-color-1": "",
    });
    expect(q).toBe("");
  });

  it("takes the first value of a repeated param", () => {
    expect(sanitizeConfigSearch({ options: ["1111", "2222"] })).toBe("options=1111");
  });
});
