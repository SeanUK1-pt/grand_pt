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
export const MIN_PACKAGE_PRICE_LABEL = "Minimum package price, ex VAT*";
// S275 is the one model whose price sheet lists no engine package at all —
// its "minimum total" is a bare hull price, so it gets its own label/footnote
// rather than the misleading "cheapest engine package" wording.
export const HULL_ONLY_PRICE_LABEL = "Hull price, ex VAT*";

const priceLabelPt: Record<string, string> = {
  "Guide price from, VAT included": "Preço indicativo a partir de, IVA incluído",
  [MIN_PACKAGE_PRICE_LABEL]: "Preço mínimo do pacote, sem IVA*",
  [HULL_ONLY_PRICE_LABEL]: "Preço do casco, sem IVA*",
};

export function translatePriceLabel(label: string, locale: string): string {
  return locale === "pt" && priceLabelPt[label] ? priceLabelPt[label] : label;
}

// Footnotes for the asterisk on the two price labels above.
const priceFootnotes: Record<string, { en: string; pt: string }> = {
  [MIN_PACKAGE_PRICE_LABEL]: {
    en: "Cheapest compatible engine package currently offered, not GRAND's recommended horsepower. Hull and engine only — excludes optional extras and VAT.",
    pt: "Pacote de motor compatível mais económico atualmente disponível, não a potência recomendada pela GRAND. Apenas casco e motor — exclui extras opcionais e IVA.",
  },
  [HULL_ONLY_PRICE_LABEL]: {
    en: "No engine package is currently offered for this model — price is for the hull alone. Excludes optional extras, engine, and VAT.",
    pt: "Não existe atualmente um pacote de motor disponível para este modelo — o preço refere-se apenas ao casco. Exclui extras opcionais, motor e IVA.",
  },
};

export function translatePriceFootnote(locale: string, label: string = MIN_PACKAGE_PRICE_LABEL): string {
  const entry = priceFootnotes[label] ?? priceFootnotes[MIN_PACKAGE_PRICE_LABEL];
  return locale === "pt" ? entry.pt : entry.en;
}
