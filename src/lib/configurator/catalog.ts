// Turns Grand's boat JSON (the same feed their own configurator uses, synced to
// public/3d/<scene>/api/cms/boats/<id>.json) into the structure our interface
// renders. Pure functions only — the engine itself (Grand's hidden page) owns
// all the rules (mutual exclusions, dependent colours), we just read its state.

export type Swatch = {
  /** Grand's colour id, e.g. "tube_color_ice_white_hypalon" — matches an engine button id (minus d_/e_). */
  id: string;
  /** English name from the feed, e.g. "Ice White". Translated at render time. */
  name: string;
  /** CSS colour (hex or hsla) */
  color: string;
  /** Second colour for two-tone swatches (e.g. SeaDek) */
  color2?: string;
  /** Material tag printed on the swatch, e.g. "HYPALON" / "PVC" */
  material?: string;
};

export type ColourGroup = {
  /** e.g. "Tube Color" — empty when the tab has a single unnamed group */
  title: string;
  swatches: Swatch[];
};

export type ColourTab = {
  key: string;
  /** e.g. "Tube", "Fiberglass", "Upholstery" */
  title: string;
  groups: ColourGroup[];
};

export type OptionItem = {
  /** Grand's button id, e.g. "swimming_platforms" */
  id: string;
  title: string;
  /** Grand part numbers (primary + optional second code), as they appear in `options=` */
  codes: string[];
};

export type Catalog = {
  title: string;
  tabs: ColourTab[];
  options: OptionItem[];
};

type Raw = Record<string, unknown>;

const clean = (v: unknown): string | undefined => {
  if (typeof v !== "string") return undefined;
  const t = v.trim();
  return !t || t === "None" ? undefined : t;
};

export function parseCatalog(raw: Raw): Catalog {
  const tabNumbers = new Set<number>();
  for (const key of Object.keys(raw)) {
    const m = key.match(/^color-option-(\d+)-/);
    if (m) tabNumbers.add(Number(m[1]));
  }

  const tabs: ColourTab[] = [...tabNumbers]
    .sort((a, b) => a - b)
    .map((n) => {
      const groups: ColourGroup[] = [];
      for (const g of [1, 2, 3, 4, 5, 6]) {
        const list = raw[`color-option-${n}-colors-${g}`];
        if (!Array.isArray(list) || list.length === 0) continue;
        groups.push({
          title: clean(raw[`color-option-${n}-subtitle-${g}`]) ?? "",
          swatches: (list as Raw[]).flatMap((c): Swatch[] => {
            const id = clean(c["color-id"]);
            const color = clean(c["color-1"]);
            if (!id || !color) return [];
            return [
              {
                id,
                name: clean(c["color-name"]) ?? id,
                color,
                color2: clean(c["color-2"]),
                material: clean(c["text-on-color"]),
              },
            ];
          }),
        });
      }
      return { key: `colour-${n}`, // Grand's feed names tab 1 "color-option-title" and the rest "color-option-N-title".
        title: clean(raw[`color-option-${n}-title`]) ?? (n === 1 ? clean(raw["color-option-title"]) : undefined) ?? `Colours ${n}`, groups };
    })
    .filter((t) => t.groups.some((g) => g.swatches.length > 0));

  const options: OptionItem[] = ((raw.options as Raw[] | undefined) ?? []).flatMap((o): OptionItem[] => {
    const id = clean(o["button-id"]);
    if (!id) return [];
    const codes = [clean(o["option-code"]), clean(o["option-code-second"])].filter((c): c is string => !!c);
    return [{ id, title: clean(o.name) ?? clean(o.title) ?? id, codes }];
  });

  return { title: clean(raw.title) ?? "", tabs, options };
}

// --- Engine state ---------------------------------------------------------
// Grand's engine toggles a button's id between "d_<id>" (off) and "e_<id>" (on),
// and some buttons keep a bare "<id>". "is-active" / "is-disabled" classes carry
// the real state. Selector must tolerate all three id shapes.

export function engineSelector(id: string): string {
  const esc = id.replace(/["\\]/g, "\\$&");
  return `[id="d_${esc}"],[id="e_${esc}"],[id="${esc}"]`;
}

// The "show features" switch (hotspot labels on the 3D model) is a button whose
// id Grand's engine rewrites to d_/e_toggle_features at start-up, and whose
// "is-active" class says whether the labels are showing.
export const FEATURES_TOGGLE_ID = "toggle_features";

export function isFeaturesOn(doc: { querySelector(sel: string): { classList: { contains(c: string): boolean } } | null }): boolean {
  return doc.querySelector(engineSelector(FEATURES_TOGGLE_ID))?.classList.contains("is-active") ?? false;
}

export type EngineState = {
  active: Set<string>;
  disabled: Set<string>;
};

const idOf = (domId: string) => domId.replace(/^[de]_/, "");

// Reads state for every id we render, in one pass over the engine's buttons.
export type ButtonLike = { id: string; classList: { contains(c: string): boolean } };
export function readEngineState(doc: { querySelectorAll(sel: string): Iterable<ButtonLike> }): EngineState {
  const active = new Set<string>();
  const disabled = new Set<string>();
  for (const el of doc.querySelectorAll("[data-option-btn]")) {
    const id = idOf(el.id);
    if (el.classList.contains("is-active")) active.add(id);
    if (el.classList.contains("is-disabled")) disabled.add(id);
  }
  return { active, disabled };
}
