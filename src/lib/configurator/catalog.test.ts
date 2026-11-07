import { describe, expect, it } from "vitest";
import raw from "./__fixtures__/g680.json";
import { engineSelector, parseCatalog, readEngineState } from "./catalog";

const catalog = parseCatalog(raw as Record<string, unknown>);

describe("parseCatalog (G680 feed)", () => {
  it("builds the colour tabs in order, with grouped swatches", () => {
    expect(catalog.title).toBe("G680");
    expect(catalog.tabs.map((t) => t.title)).toEqual(["Tube", "Fiberglass", "Upholstery", "Other colors"]);
    const tube = catalog.tabs[0];
    expect(tube.groups.map((g) => g.title)).toEqual(["Tube Color", "Tube Decor"]);
    const ice = tube.groups[0].swatches.find((s) => s.id === "tube_color_ice_white_hypalon");
    expect(ice).toMatchObject({ name: "Ice White", material: "HYPALON" });
  });

  it("keeps every swatch from the feed (55) and gives each a CSS colour", () => {
    const swatches = catalog.tabs.flatMap((t) => t.groups.flatMap((g) => g.swatches));
    expect(swatches).toHaveLength(55);
    expect(swatches.every((s) => s.color.length > 0)).toBe(true);
    const seadek = swatches.find((s) => s.id === "other_colors_seadek_mocha_black");
    expect(seadek?.color2).toBeTruthy();
  });

  it("lists the 26 options with their part numbers, including second codes", () => {
    expect(catalog.options).toHaveLength(26);
    expect(catalog.options.find((o) => o.id === "swimming_platforms")?.codes).toEqual(["2438"]);
    expect(catalog.options.find((o) => o.id === "el_pack")?.codes).toEqual(["2710", "2711"]);
  });
});

describe("engine state", () => {
  it("builds a selector that tolerates all three id shapes Grand's engine uses", () => {
    expect(engineSelector("swimming_platforms")).toBe(
      '[id="d_swimming_platforms"],[id="e_swimming_platforms"],[id="swimming_platforms"]'
    );
  });

  it("reads active and disabled sets from classes, ignoring the d_/e_ prefix", () => {
    const btn = (id: string, ...classes: string[]) => ({ id, classList: { contains: (c: string) => classes.includes(c) } });
    const s = readEngineState({
      querySelectorAll: () => [
        btn("e_swimming_platforms", "options_btn", "is-active"),
        btn("d_hydraulic_sys", "options_btn"),
        btn("bowrailing", "options_btn", "is-active"),
        btn("d_tube_decor_white", "options_color-btn", "is-disabled"),
      ],
    });
    expect([...s.active].sort()).toEqual(["bowrailing", "swimming_platforms"]);
    expect([...s.disabled]).toEqual(["tube_decor_white"]);
  });
});
