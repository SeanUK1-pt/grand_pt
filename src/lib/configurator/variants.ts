import manifest from "@/data/configurator.manifest.json";

export type RangeSlug = "golden-line" | "silver-line" | "drive-line";

export type ConfiguratorVariant = {
  /** URL key and Grand's own slug, e.g. "g680", "s300l", "d950-dive" */
  key: string;
  /** Scene folder under /3d/, e.g. "s300" (several variants share one scene) */
  dir: string;
  /** Grand's boat record id (selects initial options for the scene) */
  id: string;
  /** Grand's title, e.g. "S300L", "D600 Active" */
  title: string;
  range: RangeSlug;
  /** Our model page slug this belongs to, e.g. "g340n", "s300" */
  modelSlug: string;
};

// Grand's feed names some models differently to our site (G340N → our g340n)
// and splits others into layouts that share one of our model pages.
const MODEL_OVERRIDES: Record<string, string> = {
  g340: "g340n",
  g380: "g380n",
  d600a: "d600",
  d600d: "d600",
  d600l: "d600",
  "d950-adventure": "d950-drive",
  "d950-dive": "d950-drive",
  "d950-explorer": "d950-drive",
  "s420ns-2": "s420n",
};

export function modelSlugForVariant(key: string): string {
  if (MODEL_OVERRIDES[key]) return MODEL_OVERRIDES[key];
  // S300L / S300S -> s300, S370NL / S370NS -> s370n
  const layout = key.match(/^(s\d{3}n?)[ls]$/);
  return layout ? layout[1] : key;
}

export const variants: ConfiguratorVariant[] = (
  manifest.variants as { key: string; dir: string; id: string; title: string; range: string | null }[]
).map((v) => ({
  key: v.key,
  dir: v.dir,
  id: v.id,
  title: v.title,
  range: (v.range ?? "golden-line") as RangeSlug,
  modelSlug: modelSlugForVariant(v.key),
}));

export function getVariant(key: string): ConfiguratorVariant | undefined {
  return variants.find((v) => v.key === key);
}

export function variantsForModel(modelSlug: string): ConfiguratorVariant[] {
  return variants.filter((v) => v.modelSlug === modelSlug);
}

/** True when a model page has several Grand layouts (S300 → S300 / S300S / S300L). */
export function hasLayouts(v: ConfiguratorVariant): boolean {
  return variantsForModel(v.modelSlug).length > 1;
}

export const RANGE_ORDER: RangeSlug[] = ["golden-line", "silver-line", "drive-line"];

/** Engine page URL for the iframe — same-origin, so we can drive its buttons. */
export function engineUrl(v: ConfiguratorVariant, search = ""): string {
  const extra = search.replace(/^\?/, "");
  return `/3d/${v.dir}/index.html?id=${v.id}${extra ? `&${extra}` : ""}`;
}
