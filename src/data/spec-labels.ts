// Spec labels/categories are a small, closed vocabulary reused across every
// model's specs/fullSpecs (values are units/numbers and don't need
// translation). A lookup map here is far cheaper than converting every
// ModelSpec/SpecCategory in models.ts to LocalizedText.
const labelPt: Record<string, string> = {
  // Categories
  Dimensions: "Dimensões",
  Performance: "Desempenho",
  Capacity: "Capacidade",
  Construction: "Construção",
  // Spec labels
  LOA: "Comprimento total",
  Beam: "Boca",
  "Max power": "Potência máx.",
  "Inside length": "Comprimento interior",
  "Inside width": "Largura interior",
  "Dry weight": "Peso seco",
  "Tube diameter": "Diâmetro do tubo",
  "Recommended power": "Potência recomendada",
  "Engine weight max": "Peso máx. do motor",
  "Engine shaft length": "Comprimento do pé do motor",
  "Midsection/aft deadrise": "Ângulo de V (meio/popa)",
  "Package weight": "Peso embalado",
  "Max load": "Carga máx.",
  "Max persons": "Pessoas máx.",
  "CE category": "Categoria CE",
  "Tube chambers": "Câmaras do tubo",
  "Tube material": "Material do tubo",
};

export function translateSpecLabel(label: string, locale: string): string {
  return locale === "pt" && labelPt[label] ? labelPt[label] : label;
}

// Most spec values are numbers/units (already language-neutral) but a
// handful of engine-shaft/power values embed English connector words —
// e.g. `15" (short)`, `1x700 or 2x350 HP`. Same closed-vocabulary approach
// as labels: substitute the connector words, leave the numbers alone.
// Longest phrases first so e.g. "extra long" doesn't get double-matched by "long".
const valueReplacements: [RegExp, string][] = [
  [/\butra long\b/gi, "ultra longo"],
  [/\bultra long\b/gi, "ultra longo"],
  [/\bextra long\b/gi, "extra longo"],
  [/\bshort\b/gi, "curto"],
  [/\blong\b/gi, "longo"],
  [/\bor\b/gi, "ou"],
];

export function translateSpecValue(value: string, locale: string): string {
  if (locale !== "pt") return value;
  return valueReplacements.reduce((acc, [pattern, replacement]) => acc.replace(pattern, replacement), value);
}

// priceLabel is the same fixed string on every model/layout (not real
// per-model data) — a lookup, not a schema change, is the proportionate fix.
const priceLabelPt: Record<string, string> = {
  "Guide price from, VAT included": "Preço indicativo a partir de, IVA incluído",
};

export function translatePriceLabel(label: string, locale: string): string {
  return locale === "pt" && priceLabelPt[label] ? priceLabelPt[label] : label;
}
