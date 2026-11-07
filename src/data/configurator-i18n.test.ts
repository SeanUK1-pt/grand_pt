import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { __PT_FOR_TESTS, translateColourChoice, translateConfigurator } from "./configurator-i18n";

const root = path.join(process.cwd(), "public", "3d");
const synced = existsSync(root);

const clean = (v: unknown) => (typeof v === "string" && v.trim() && v.trim() !== "None" ? v.replace(/\s+/g, " ").trim() : null);

function allFeedStrings(): Set<string> {
  const out = new Set<string>();
  for (const dir of readdirSync(root)) {
    const apiDir = path.join(root, dir, "api", "cms", "boats");
    if (dir === "_shared" || !existsSync(apiDir)) continue;
    for (const file of readdirSync(apiDir)) {
      const d = JSON.parse(readFileSync(path.join(apiDir, file), "utf8"));
      for (const o of d.options ?? []) {
        const n = clean(o.name) ?? clean(o.title);
        if (n) out.add(n);
      }
      for (const [k, v] of Object.entries<unknown>(d)) {
        if (/^color-option-(\d+-)?title$/.test(k) || /^color-option-\d+-subtitle-\d+$/.test(k)) {
          const s = clean(v);
          if (s) out.add(s);
        }
        if (/^color-option-\d+-colors-\d+$/.test(k) && Array.isArray(v)) {
          for (const c of v) {
            const s = clean((c as Record<string, unknown>)["color-name"]);
            if (s) out.add(s);
          }
        }
      }
    }
  }
  return out;
}

describe("configurator Portuguese", () => {
  it("translates known strings and falls back to English for unknown ones", () => {
    expect(translateConfigurator("Ice White", "pt")).toBe("Branco Gelo");
    expect(translateConfigurator("Ice White", "en")).toBe("Ice White");
    expect(translateConfigurator("Something Grand adds later", "pt")).toBe("Something Grand adds later");
  });

  it("tolerates the feed's stray double spaces", () => {
    expect(translateConfigurator("Bow  sun-top extension to T-top", "pt")).toBe("Extensão do toldo de proa para T-top");
  });

  it("translates each part of a colour choice", () => {
    expect(translateColourChoice("Tube | Tube Color: Ice White", "pt")).toBe("Tubos | Cor dos tubos: Branco Gelo");
    expect(translateColourChoice("Upholstery: Taupe", "pt")).toBe("Estofos: Taupe");
    expect(translateColourChoice("Tube | Tube Color: Ice White", "en")).toBe("Tube | Tube Color: Ice White");
  });

  // Runs wherever the 3D files have been synced (locally, and on the server
  // after `npm run sync:3d`); skipped on a clean checkout without them.
  it.skipIf(!synced)("covers every string in the synced feed", () => {
    const missing = [...allFeedStrings()].filter((s) => !(s in __PT_FOR_TESTS));
    expect(missing).toEqual([]);
  });
});
