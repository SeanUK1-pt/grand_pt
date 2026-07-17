import type { LocalizedText } from "./localized-text";

// "Ranges" and "Models" counts are NOT hardcoded here — they're computed
// live from ranges.ts/models.ts in BrandStrip.tsx so they can't go stale.
export const brandStory = {
  eyebrow: {
    en: "Craft & provenance",
    pt: "Ofício e origem",
  } satisfies LocalizedText,

  founded: {
    label: { en: "Founded", pt: "Fundada em" } satisfies LocalizedText,
    value: { en: "2001", pt: "2001" } satisfies LocalizedText,
  },
  manufacturing: {
    label: { en: "Manufacturing", pt: "Fabrico" } satisfies LocalizedText,
    value: { en: "Ukraine", pt: "Ucrânia" } satisfies LocalizedText,
  },

  columns: [
    {
      heading: { en: "Hand-laid in Ukraine", pt: "Laminado à mão na Ucrânia" } satisfies LocalizedText,
      body: {
        en: "Grand Boats has manufactured every hull by hand in its Ukrainian yard since 2001. The same fiberglass lay-up process, the same quality control, the same attention to tube specification and hardware detail — across every model from the S275 to the G980.",
        pt: "A Grand Boats fabrica cada casco à mão no seu estaleiro ucraniano desde 2001. O mesmo processo de laminação em fibra de vidro, o mesmo controlo de qualidade, a mesma atenção à especificação dos tubos e aos detalhes das ferragens — em todos os modelos, do S275 ao G980.",
      } satisfies LocalizedText,
    },
    {
      heading: {
        en: "Sold exclusively in Portugal through Algarve Boat Group",
        pt: "Vendido exclusivamente em Portugal pela Algarve Boat Group",
      } satisfies LocalizedText,
      body: {
        en: "We carry stock of the most popular models at our Portimão base, and can order any model in the range. Our team knows these boats — we've rigged them, launched them, and used them on this coast.",
        pt: "Temos em stock os modelos mais populares na nossa base em Portimão e podemos encomendar qualquer modelo da gama. A nossa equipa conhece estas embarcações — equipámo-las, lançámo-las à água e utilizámo-las nesta costa.",
      } satisfies LocalizedText,
    },
  ],
};
