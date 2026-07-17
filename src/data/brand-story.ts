import type { LocalizedText } from "./localized-text";

// DRAFT / PLACEHOLDER copy — written by Claude, not approved marketing copy.
// The "Founded" year in particular is an unverified placeholder (1996) and
// must be checked against Grand's actual company history before launch.
// "Ranges" and "Models" counts are NOT hardcoded here — they're computed
// live from ranges.ts/models.ts in BrandStrip.tsx so they can't go stale.
export const brandStory = {
  eyebrow: {
    en: "Craft & provenance",
    pt: "Ofício e origem",
  } satisfies LocalizedText,

  headline: {
    en: "A Ukrainian boatbuilder, sold in Portugal by people who use them.",
    pt: "Um construtor naval ucraniano, vendido em Portugal por quem os utiliza.",
  } satisfies LocalizedText,

  founded: {
    label: { en: "Founded", pt: "Fundada em" } satisfies LocalizedText,
    value: { en: "1996", pt: "1996" } satisfies LocalizedText,
  },
  manufacturing: {
    label: { en: "Manufacturing", pt: "Fabrico" } satisfies LocalizedText,
    value: { en: "Ukraine", pt: "Ucrânia" } satisfies LocalizedText,
  },

  columns: [
    {
      heading: { en: "Built in Ukraine", pt: "Construído na Ucrânia" } satisfies LocalizedText,
      body: {
        en: "Every Grand hull is hand-laid by the same yard, chamber by chamber — hypalon tubes, hand-finished consoles, and a level of fit and finish that doesn't change whether it's a 3.4-metre tender or a 10-metre flagship. It's a slower way to build a boat, and it's why Grand hulls hold their shape and finish years after cheaper RIBs have started to sag.",
        pt: "Cada casco Grand é laminado à mão no mesmo estaleiro, câmara a câmara — tubos em Hypalon, consolas acabadas à mão e um nível de acabamento que não muda, seja num tender de 3,4 metros ou numa embarcação insignia de 10 metros. É uma forma mais lenta de construir um barco, e é por isso que os cascos Grand mantêm a forma e o acabamento anos depois de RIBs mais baratos já terem começado a ceder.",
      } satisfies LocalizedText,
    },
    {
      heading: { en: "Sold through Algarve Boat Group", pt: "Vendido pela Algarve Boat Group" } satisfies LocalizedText,
      body: {
        en: "We're the authorised Grand dealer for Portugal, based in Portimão and working with owners along the whole coast. That means every boat that reaches you has been checked, prepped, and handed over by people who know the range — not a container drop-off with a manual in the wrong language.",
        pt: "Somos o representante autorizado da Grand em Portugal, sediados em Portimão e a trabalhar com proprietários em toda a costa. Isso significa que cada barco que chega até si foi verificado, preparado e entregue por quem conhece a gama — não uma entrega de contentor com um manual na língua errada.",
      } satisfies LocalizedText,
    },
  ],
};
