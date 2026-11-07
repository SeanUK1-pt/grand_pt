import { describe, expect, it } from "vitest";
import { models } from "@/data/models";
import { engineUrl, getVariant, modelSlugForVariant, variants, variantsForModel } from "./variants";

describe("configurator variants", () => {
  it("has unique keys and ids", () => {
    expect(new Set(variants.map((v) => v.key)).size).toBe(variants.length);
    expect(new Set(variants.map((v) => v.id)).size).toBe(variants.length);
  });

  it("maps every variant to one of our model pages, in the same range", () => {
    for (const v of variants) {
      const model = models.find((m) => m.slug === v.modelSlug);
      expect(model, `${v.key} -> ${v.modelSlug}`).toBeDefined();
      expect(model!.rangeSlug, v.key).toBe(v.range);
    }
  });

  it("maps Grand's naming onto ours", () => {
    expect(modelSlugForVariant("g340")).toBe("g340n");
    expect(modelSlugForVariant("s300l")).toBe("s300");
    expect(modelSlugForVariant("s370ns")).toBe("s370n");
    expect(modelSlugForVariant("s420ns-2")).toBe("s420n");
    expect(modelSlugForVariant("d950-dive")).toBe("d950-drive");
    expect(modelSlugForVariant("g680")).toBe("g680");
  });

  it("groups layouts under one model", () => {
    expect(variantsForModel("s300").map((v) => v.key).sort()).toEqual(["s300", "s300l", "s300s"]);
    expect(variantsForModel("g680")).toHaveLength(1);
  });

  it("builds the same-origin engine URL, appending a restored configuration", () => {
    const v = getVariant("g680")!;
    expect(engineUrl(v)).toBe("/3d/g680/index.html?id=685569e2da50c670bb2fc01d");
    expect(engineUrl(v, "options=2438")).toBe("/3d/g680/index.html?id=685569e2da50c670bb2fc01d&options=2438");
  });
});
