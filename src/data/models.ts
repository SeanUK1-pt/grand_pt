import type { FeaturedModel } from "./featured-models";
import type { Range } from "./ranges";
import type { LocalizedText } from "./localized-text";

export type ModelSpec = { value: string; label: string };

export type SpecCategory = {
  category: string;
  items: { label: string; value: string }[];
};

export type Feature = {
  title: LocalizedText;
  description: LocalizedText;
  image?: string;
};

export type ModelLayout = {
  name: string;
  useCaseLine: string;
  priceFrom?: number;
  priceLabel?: string;
  specs?: { label: string; value: string }[];
  image?: string;
};

export type Model = FeaturedModel & {
  rangeSlug: Range["slug"];
  positioning: LocalizedText;
  specs: ModelSpec[];
  // No real pricing was ever available (not scraped, not supplied) — kept
  // optional so the UI can omit the price block entirely rather than show
  // an invented number. See ModelPage's `model.priceFrom !== undefined` guard.
  priceFrom?: number;
  priceLabel?: string;
  fullSpecs: SpecCategory[];
  features: Feature[];
  /** Only set for models with multiple deck layouts (currently D600). */
  layouts?: ModelLayout[];
};

// PLACEHOLDER — feature titles describe the standard category set; descriptions
// are generic placeholders pending real equipment/layout copy per model. Not
// covered by the grandboats.com scrape (spec tables + photos only).
function placeholderFeatures(): Feature[] {
  return [
    {
      title: { en: "Helm & console" },
      description: { en: "PLACEHOLDER — description of console layout and instrumentation pending." },
    },
    {
      title: { en: "Deck layout" },
      description: { en: "PLACEHOLDER — description of seating and deck arrangement pending." },
    },
    {
      title: { en: "Storage" },
      description: { en: "PLACEHOLDER — description of stowage and locker provision pending." },
    },
    {
      title: { en: "Standard equipment" },
      description: { en: "PLACEHOLDER — list of standard-fit equipment pending." },
    },
  ];
}

// ── Real Grand Boats product lineup, scraped from grandboats.com (2026-07-05) ──
// specs/fullSpecs values are verbatim from the manufacturer's own spec tables
// (see /SCRAPED_SPECS.md for the raw source). tagline/positioning/features are
// NOT scraped — grandboats.com doesn't publish marketing copy in a reusable
// form, so those remain explicit placeholders except for g680/g750/g580,
// which already had hand-written copy from this project's initial build.
// Pricing was never available from any source — priceFrom/priceLabel are
// omitted throughout (see Model.priceFrom comment above).
export const models: Model[] = [
  // ── Golden Line ───────────────────────────────────────────────
  {
    slug: "g340",
    name: "G340",
    range: "golden",
    rangeSlug: "golden-line",
    tagline: "PLACEHOLDER — marketing tagline pending.",
    positioning: {
      en: "The entry point to the range, with the same attention to detail as everything above it.",
      pt: "O ponto de entrada na gama, com o mesmo cuidado nos detalhes que todos os modelos acima.",
    },
    image: "/images/boats/g340/detail-11.jpg",
    href: "/ranges/golden-line/g340/",
    specs: [
      { value: "3.30m", label: "LOA" },
      { value: "1.76m", label: "Beam" },
      { value: "30 hp", label: "Max power" },
    ],
    fullSpecs: [
      { category: "Dimensions", items: [
        { label: "LOA", value: "330 cm / 10'10\"" },
        { label: "Inside length", value: "240 cm / 7'10\"" },
        { label: "Beam", value: "176 cm / 5'9\"" },
        { label: "Inside width", value: "80 cm / 2'7\"" },
        { label: "Dry weight", value: "129 kg / 284 lbs" },
        { label: "Tube diameter", value: "43 cm / 17\"" },
      ] },
      { category: "Performance", items: [
        { label: "Recommended power", value: "20 HP / 14,7 kW" },
        { label: "Max power", value: "30 HP / 22,1 kW" },
        { label: "Engine weight max", value: "70 kg / 154 lbs" },
        { label: "Engine shaft length", value: "15\" (short)" },
        { label: "Midsection/aft deadrise", value: "17° / 14°" },
      ] },
      { category: "Capacity", items: [
        { label: "Package weight", value: "195 kg / 429 lbs" },
        { label: "Max load", value: "580 kg / 1276 lbs" },
        { label: "Max persons", value: "4" },
        { label: "CE category", value: "C" },
      ] },
      { category: "Construction", items: [
        { label: "Tube chambers", value: "3" },
        { label: "Tube material", value: "PVC / Hypalon" },
      ] },
    ],
    features: [
      {
        title: { en: "Hand-laid fiberglass construction", pt: "Construção em fibra de vidro laminada à mão" },
        description: {
          en: "The same hull-building process as the larger Golden Line models, scaled to 3.4 metres. Light enough to handle easily, rigid enough to feel like a proper boat rather than a dinghy.",
          pt: "O mesmo processo de construção do casco que os modelos maiores da Golden Line, adaptado a 3,4 metros. Leve o suficiente para manusear facilmente, rígido o suficiente para se sentir como uma embarcação a sério.",
        },
      },
      {
        title: { en: "Compact tender specification", pt: "Especificação de tender compacto" },
        description: {
          en: "Removable seating, clean deck, tow points, and the fittings you actually need. Nothing superfluous for a boat that spends its life getting people to and from a larger vessel.",
          pt: "Bancos amovíveis, convés limpo, pontos de reboque e os acessórios de que realmente necessita. Nada supérfluo para uma embarcação que passa a vida a transportar pessoas de e para um barco maior.",
        },
      },
      {
        title: { en: "Golden Line detail at entry level", pt: "Detalhe Golden Line no modelo de entrada" },
        description: {
          en: "Hypalon tubes, quality upholstery, and hardware that matches the rest of the range. The G340 is the smallest Grand, not the least considered.",
          pt: "Tubos em Hypalon, estofagem de qualidade e ferragens que correspondem ao restante da gama. O G340 é o menor Grand, não o menos cuidado.",
        },
      },
    ],
  },
  {
    slug: "g340n",
    name: "G340N",
    range: "golden",
    rangeSlug: "golden-line",
    tagline: "PLACEHOLDER — marketing tagline pending.",
    positioning: { en: "PLACEHOLDER — positioning line pending." },
    image: "/images/boats/g340n/detail-14.jpg",
    href: "/ranges/golden-line/g340n/",
    specs: [
      { value: "3.25m", label: "LOA" },
      { value: "1.75m", label: "Beam" },
      { value: "40 hp", label: "Max power" },
    ],
    fullSpecs: [
      { category: "Dimensions", items: [
        { label: "LOA", value: "325 cm / 10'8\"" },
        { label: "Inside length", value: "260 cm / 8'6\"" },
        { label: "Beam", value: "175 cm / 5'9\"" },
        { label: "Inside width", value: "80 cm / 2'7\"" },
        { label: "Dry weight", value: "146 kg / 322 lbs" },
        { label: "Tube diameter", value: "45 cm / 18\"" },
      ] },
      { category: "Performance", items: [
        { label: "Recommended power", value: "30 HP / 22,2 kW" },
        { label: "Max power", value: "40 HP / 29,4 kW" },
        { label: "Engine weight max", value: "105 kg / 232 lbs" },
        { label: "Engine shaft length", value: "20\" (long)" },
        { label: "Midsection/aft deadrise", value: "18° / 17°" },
      ] },
      { category: "Capacity", items: [
        { label: "Package weight", value: "204 kg / 450 lbs" },
        { label: "Max load", value: "480 kg / 1058 lbs" },
        { label: "Max persons", value: "4" },
        { label: "CE category", value: "C" },
      ] },
      { category: "Construction", items: [
        { label: "Tube chambers", value: "3" },
        { label: "Tube material", value: "PVC / Hypalon" },
      ] },
    ],
    features: placeholderFeatures(),
  },
  {
    slug: "g380",
    name: "G380",
    range: "golden",
    rangeSlug: "golden-line",
    tagline: "PLACEHOLDER — marketing tagline pending.",
    positioning: {
      en: "Lightweight, refined, and easy to handle. The ideal tender for a larger vessel, or a first step into the Golden Line.",
      pt: "Leve, refinado e fácil de manusear. O tender ideal para uma embarcação maior, ou um primeiro passo na Golden Line.",
    },
    image: "/images/boats/g380/detail-13.jpg",
    href: "/ranges/golden-line/g380/",
    specs: [
      { value: "3.60m", label: "LOA" },
      { value: "1.86m", label: "Beam" },
      { value: "40 hp", label: "Max power" },
    ],
    fullSpecs: [
      { category: "Dimensions", items: [
        { label: "LOA", value: "360 cm / 11'10\"" },
        { label: "Inside length", value: "270 cm / 8'10\"" },
        { label: "Beam", value: "186 cm / 6'1\"" },
        { label: "Inside width", value: "88 cm / 2'11\"" },
        { label: "Dry weight", value: "170 kg / 374 lbs" },
        { label: "Tube diameter", value: "46 cm /18\"" },
      ] },
      { category: "Performance", items: [
        { label: "Recommended power", value: "30 HP / 22,1 kW" },
        { label: "Max power", value: "40 HP / 29,4 kW" },
        { label: "Engine weight max", value: "95 kg / 209 lbs" },
        { label: "Engine shaft length", value: "20\" (long)" },
        { label: "Midsection/aft deadrise", value: "17° / 15°" },
      ] },
      { category: "Capacity", items: [
        { label: "Package weight", value: "235 kg / 518 lbs" },
        { label: "Max load", value: "650 kg / 1430 lbs" },
        { label: "Max persons", value: "5" },
        { label: "CE category", value: "C" },
      ] },
      { category: "Construction", items: [
        { label: "Tube chambers", value: "3" },
        { label: "Tube material", value: "PVC / Hypalon" },
      ] },
    ],
    features: [
      {
        title: { en: "Low-weight, high-rigidity hull", pt: "Casco leve e de alta rigidez" },
        description: {
          en: "At under 200kg bare, the G380 is genuinely easy to handle without sacrificing the hull stiffness that makes it feel composed at sea. Built for boats that need a tender that keeps up.",
          pt: "Com menos de 200kg em vazio, o G380 é genuinamente fácil de manusear sem sacrificar a rigidez do casco que o faz sentir equilibrado no mar. Concebido para barcos que precisam de um tender à altura.",
        },
      },
      {
        title: { en: "Clean console layout", pt: "Layout de consola limpo" },
        description: {
          en: "A simple, uncluttered helm with everything in the right place. No unnecessary complexity for a boat that needs to be ready at a moment's notice and operated by whoever is aboard.",
          pt: "Um leme simples e desimpedido, com tudo no lugar certo. Sem complexidade desnecessária para uma embarcação que precisa de estar pronta a qualquer momento e ser operada por quem estiver a bordo.",
        },
      },
      {
        title: { en: "Hypalon tubes, Golden Line standard", pt: "Tubos em Hypalon, padrão Golden Line" },
        description: {
          en: "The same tube specification as the larger models — diameter, material, and chamber layout chosen for stability and durability, not just aesthetics.",
          pt: "A mesma especificação de tubos que os modelos maiores — diâmetro, material e disposição das câmaras escolhidos para estabilidade e durabilidade, não apenas estética.",
        },
      },
    ],
  },
  {
    slug: "g380n",
    name: "G380N",
    range: "golden",
    rangeSlug: "golden-line",
    tagline: "PLACEHOLDER — marketing tagline pending.",
    positioning: { en: "PLACEHOLDER — positioning line pending." },
    image: "/images/boats/g380n/detail-17.jpg",
    href: "/ranges/golden-line/g380n/",
    specs: [
      { value: "3.60m", label: "LOA" },
      { value: "1.85m", label: "Beam" },
      { value: "50 hp", label: "Max power" },
    ],
    fullSpecs: [
      { category: "Dimensions", items: [
        { label: "LOA", value: "360 cm / 11'10\"" },
        { label: "Inside length", value: "240 cm / 7'10\"" },
        { label: "Beam", value: "185 cm / 6'1\"" },
        { label: "Inside width", value: "94 cm / 3'1\"" },
        { label: "Dry weight", value: "180 kg / 397 lbs" },
        { label: "Tube diameter", value: "45 cm / 18\"" },
      ] },
      { category: "Performance", items: [
        { label: "Recommended power", value: "40 HP / 29,4 kW" },
        { label: "Max power", value: "50 HP / 36,8 kW" },
        { label: "Engine weight max", value: "115 kg / 253 lbs" },
        { label: "Engine shaft length", value: "20\" (long)" },
        { label: "Midsection/aft deadrise", value: "17° / 15°" },
      ] },
      { category: "Capacity", items: [
        { label: "Package weight", value: "280 kg / 617 lbs" },
        { label: "Max load", value: "650 kg / 1430 lbs" },
        { label: "Max persons", value: "5" },
        { label: "CE category", value: "C" },
      ] },
      { category: "Construction", items: [
        { label: "Tube chambers", value: "3" },
        { label: "Tube material", value: "PVC / Hypalon" },
      ] },
    ],
    features: placeholderFeatures(),
  },
  {
    slug: "g420",
    name: "G420",
    range: "golden",
    rangeSlug: "golden-line",
    tagline: "PLACEHOLDER — marketing tagline pending.",
    positioning: {
      en: "A proper little cruiser — well-finished, well-thought-out, and surprisingly capable for its footprint.",
      pt: "Um verdadeiro pequeno cruzeiro — bem acabado, bem pensado e surpreendentemente capaz para o seu tamanho.",
    },
    image: "/images/boats/g420/detail-19.jpg",
    href: "/ranges/golden-line/g420/",
    specs: [
      { value: "4.20m", label: "LOA" },
      { value: "1.98m", label: "Beam" },
      { value: "60 hp", label: "Max power" },
    ],
    fullSpecs: [
      { category: "Dimensions", items: [
        { label: "LOA", value: "420 cm / 13’9”" },
        { label: "Inside length", value: "280 cm / 9’2”" },
        { label: "Beam", value: "198 cm / 6’6”" },
        { label: "Inside width", value: "100 cm / 3’3”" },
        { label: "Dry weight", value: "255 kg / 562 lbs" },
        { label: "Tube diameter", value: "48 cm / 19”" },
      ] },
      { category: "Performance", items: [
        { label: "Recommended power", value: "50 HP / 36,8 kW" },
        { label: "Max power", value: "60 HP / 44,1 kW" },
        { label: "Engine weight max", value: "120 kg  / 265 lbs" },
        { label: "Engine shaft length", value: "20\" (long)" },
        { label: "Midsection/aft deadrise", value: "20° / 17°" },
      ] },
      { category: "Capacity", items: [
        { label: "Package weight", value: "330 kg / 726 lbs" },
        { label: "Max load", value: "750 kg / 1653 lbs" },
        { label: "Max persons", value: "6" },
        { label: "CE category", value: "C" },
      ] },
      { category: "Construction", items: [
        { label: "Tube chambers", value: "4" },
        { label: "Tube material", value: "PVC / Hypalon" },
      ] },
    ],
    features: [
      {
        title: { en: "Lightweight fiberglass hull", pt: "Casco em fibra de vidro leve" },
        description: {
          en: "At 4.2 metres and under 300kg bare, the G420 is easy to launch, easy to recover, and sits well on davits or a swim platform. The hand-laid hull is stiff and responsive without unnecessary weight.",
          pt: "Com 4,2 metros e menos de 300kg em vazio, o G420 é fácil de lançar à água, fácil de recolher e adapta-se bem a davits ou plataformas de banho. O casco, laminado à mão, é rígido e responsivo sem peso desnecessário.",
        },
      },
      {
        title: { en: "Versatile deck layout", pt: "Layout de convés versátil" },
        description: {
          en: "A clean, uncluttered cockpit with removable seating works equally well as a yacht tender or a standalone day boat. Stowage is thoughtful for the size — nothing wasted, nothing missing.",
          pt: "Um cockpit limpo e desimpedido, com bancos amovíveis, funciona igualmente bem como tender de iate ou como embarcação de dia independente. O arrumo é bem pensado para o tamanho — nada desperdiçado, nada em falta.",
        },
      },
      {
        title: { en: "Golden Line finish", pt: "Acabamento Golden Line" },
        description: {
          en: "Same attention to upholstery, tube quality, and hardware detail as the larger models in the range. The G420 is a compact boat, not a compromised one.",
          pt: "O mesmo cuidado na estofagem, qualidade dos tubos e detalhes de ferragens que encontra nos modelos maiores da gama. O G420 é uma embarcação compacta, não uma embarcação de compromisso.",
        },
      },
    ],
  },
  {
    slug: "g500",
    name: "G500",
    range: "golden",
    rangeSlug: "golden-line",
    tagline: "PLACEHOLDER — marketing tagline pending.",
    positioning: {
      en: "Small enough to run as a tender, capable enough to stand alone. The compact pocket cruiser that punches well above its size.",
      pt: "Pequeno o suficiente para funcionar como tender, capaz o suficiente para ser independente. O pocket cruiser compacto que supera em muito o seu tamanho.",
    },
    image: "/images/boats/g500/detail-9.jpg",
    href: "/ranges/golden-line/g500/",
    specs: [
      { value: "4.95m", label: "LOA" },
      { value: "2.30m", label: "Beam" },
      { value: "115 hp", label: "Max power" },
    ],
    fullSpecs: [
      { category: "Dimensions", items: [
        { label: "LOA", value: "495 cm / 16’3”" },
        { label: "Inside length", value: "332 cm / 10’11”" },
        { label: "Beam", value: "230 cm / 7’7”" },
        { label: "Inside width", value: "128 cm / 4’2”" },
        { label: "Dry weight", value: "435 kg / 957 lbs" },
        { label: "Tube diameter", value: "50 cm / 20”" },
      ] },
      { category: "Performance", items: [
        { label: "Recommended power", value: "90 HP / 66.2 kW" },
        { label: "Max power", value: "115 HP / 84.6 kW" },
        { label: "Engine weight max", value: "210 kg / 462 lbs" },
        { label: "Engine shaft length", value: "20\" (long)" },
        { label: "Midsection/aft deadrise", value: "21° / 18°" },
      ] },
      { category: "Capacity", items: [
        { label: "Package weight", value: "550 kg / 1210 lbs" },
        { label: "Max load", value: "1000 kg / 2205 lbs" },
        { label: "Max persons", value: "9" },
        { label: "CE category", value: "C" },
      ] },
      { category: "Construction", items: [
        { label: "Tube chambers", value: "5" },
        { label: "Tube material", value: "PVC / Hypalon" },
      ] },
    ],
    features: [
      {
        title: { en: "Standalone pocket cruiser", pt: "Pocket cruiser autónomo" },
        description: {
          en: "At 5 metres, the G500 works as a yacht tender or as an independent day boat in its own right. Enough deck space for a small crew, enough hull to handle open water with confidence.",
          pt: "Com 5 metros, o G500 funciona como tender de iate ou como embarcação de dia independente por direito próprio. Espaço de convés suficiente para uma tripulação pequena, casco suficiente para navegar em mar aberto com confiança.",
        },
      },
      {
        title: { en: "Centre console helm with instrumentation", pt: "Leme em consola central com instrumentação" },
        description: {
          en: "A properly equipped helm station for a boat that may be used independently of a mother vessel. Space for a chart plotter, VHF, and the navigation instruments that make a day out genuinely safe.",
          pt: "Uma estação de pilotagem devidamente equipada para uma embarcação que pode ser utilizada independentemente de um barco-mãe. Espaço para plotter, VHF e os instrumentos de navegação que tornam um dia no mar genuinamente seguro.",
        },
      },
      {
        title: { en: "Bow seating and sunbed", pt: "Banco de proa e espreguiçadeira" },
        description: {
          en: "A convertible forward section that works as social seating at anchor and a sunbed when the engine is off. The G500 is equipped for the whole day, not just the journey.",
          pt: "Uma secção de proa convertível que funciona como área de estar social em ancoragem e como espreguiçadeira quando o motor está desligado. O G500 está equipado para o dia inteiro, não apenas para a viagem.",
        },
      },
    ],
  },
  {
    slug: "g580",
    name: "G580",
    range: "golden",
    rangeSlug: "golden-line",
    tagline: "The entry point to Golden Line quality.",
    positioning: {
      en: "The bridge between the compact tenders and the full cruisers. More boat than it looks, without the commitment of the bigger hulls.",
      pt: "A ponte entre os tenders compactos e os cruzeiros completos. Mais barco do que parece, sem o compromisso dos cascos maiores.",
    },
    image: "/images/boats/g580/detail-11.jpg",
    href: "/ranges/golden-line/g580/",
    specs: [
      { value: "5.85m", label: "LOA" },
      { value: "2.45m", label: "Beam" },
      { value: "150 hp", label: "Max power" },
    ],
    fullSpecs: [
      { category: "Dimensions", items: [
        { label: "LOA", value: "585 cm / 19’2”" },
        { label: "Inside length", value: "427 cm / 14’0”" },
        { label: "Beam", value: "245 cm / 8’0”" },
        { label: "Inside width", value: "145 cm / 4’9”" },
        { label: "Dry weight", value: "535 kg / 1177 lbs" },
        { label: "Tube diameter", value: "50 cm / 20”" },
      ] },
      { category: "Performance", items: [
        { label: "Recommended power", value: "130 HP / 95,6 kW" },
        { label: "Max power", value: "150 HP / 110,3 kW" },
        { label: "Engine weight max", value: "240 kg / 529 lbs" },
        { label: "Engine shaft length", value: "20\" (long)" },
        { label: "Midsection/aft deadrise", value: "20° / 17°" },
      ] },
      { category: "Capacity", items: [
        { label: "Package weight", value: "650 kg / 1430 lbs" },
        { label: "Max load", value: "1200 kg / 2646 lbs" },
        { label: "Max persons", value: "11" },
        { label: "CE category", value: "C" },
      ] },
      { category: "Construction", items: [
        { label: "Tube chambers", value: "5" },
        { label: "Tube material", value: "PVC / Hypalon" },
      ] },
    ],
    features: [
      {
        title: { en: "Full centre console with extended instrumentation", pt: "Consola central completa com instrumentação alargada" },
        description: {
          en: "The G580 helm is specced for serious use — chart plotter, VHF, and engine instrumentation all properly integrated, not afterthoughts. The starting point for longer passages.",
          pt: "O leme do G580 está especificado para uso a sério — plotter, VHF e instrumentação do motor devidamente integrados, não pensamentos tardios. O ponto de partida para travessias mais longas.",
        },
      },
      {
        title: { en: "Twin-step deep-V hull", pt: "Casco deep-V com duplo step" },
        description: {
          en: "The same hydrodynamic step geometry as the larger Golden Line hulls, delivering a drier, faster, more fuel-efficient ride than a conventional V hull at the same length.",
          pt: "A mesma geometria de step hidrodinâmico que os cascos maiores da Golden Line, proporcionando uma navegação mais seca, mais rápida e mais eficiente em combustível do que um casco em V convencional ao mesmo comprimento.",
        },
      },
      {
        title: { en: "Social seating fore and aft", pt: "Área social a vante e a ré" },
        description: {
          en: "Bow sunbed, aft bench, and a deck layout that works for a group rather than just a skipper and crew. The G580 is where the Golden Line starts feeling like a day out rather than a transfer.",
          pt: "Espreguiçadeira de proa, banco de popa e um layout de convés que funciona para um grupo, não apenas para o patrão e tripulação. No G580 é onde a Golden Line começa a sentir-se como um dia de lazer em vez de uma simples transferência.",
        },
      },
    ],
  },
  {
    slug: "g680",
    name: "G680",
    range: "golden",
    rangeSlug: "golden-line",
    tagline: "Built to be lived aboard.",
    positioning: {
      en: "The sweet spot. Cabin comfort, centre console simplicity, and enough hull to handle whatever the Atlantic sends.",
      pt: "O equilíbrio perfeito. Conforto de cabine, simplicidade de consola central e casco suficiente para o que o Atlântico trouxer.",
    },
    image: "/images/boats/g680/detail-18.jpg",
    href: "/ranges/golden-line/g680/",
    specs: [
      { value: "6.80m", label: "LOA" },
      { value: "2.64m", label: "Beam" },
      { value: "200 hp", label: "Max power" },
    ],
    fullSpecs: [
      { category: "Dimensions", items: [
        { label: "LOA", value: "680 cm / 22'3\"" },
        { label: "Inside length", value: "509 cm / 16'58\"" },
        { label: "Beam", value: "264 cm / 8'7\"" },
        { label: "Inside width", value: "150 cm / 4'11\"" },
        { label: "Dry weight", value: "740 kg / 1631 lbs" },
        { label: "Tube diameter", value: "55 cm / 21'7''" },
      ] },
      { category: "Performance", items: [
        { label: "Recommended power", value: "150 HP / 110,3 kW" },
        { label: "Max power", value: "200 HP / 147,1 kW" },
        { label: "Engine weight max", value: "280 kg / 617 lbs" },
        { label: "Engine shaft length", value: "25\" (extra long)" },
        { label: "Midsection/aft deadrise", value: "24° / 21°" },
      ] },
      { category: "Capacity", items: [
        { label: "Package weight", value: "860 kg / 1896 lbs" },
        { label: "Max load", value: "1150 kg / 2535 lbs" },
        { label: "Max persons", value: "12" },
        { label: "CE category", value: "С" },
      ] },
      { category: "Construction", items: [
        { label: "Tube chambers", value: "5" },
        { label: "Tube material", value: "PVC / Hypalon" },
      ] },
    ],
    features: [
      {
        title: { en: "Centre console helm", pt: "Leme em consola central" },
        description: {
          en: "A well-positioned, ergonomic helm station with clear sightlines in all conditions. Instrumentation, chart plotter, and VHF all sit within natural reach without cluttering the deck space behind it.",
          pt: "Uma estação de pilotagem bem posicionada e ergonómica, com linhas de visão claras em todas as condições. Instrumentação, plotter e VHF ficam ao alcance natural sem sobrecarregar o espaço de convés a ré.",
        },
      },
      {
        title: { en: "Deep-V twin-step hull", pt: "Casco deep-V com duplo step hidrodinâmico" },
        description: {
          en: "The G680's hull runs a 21° deadrise with twin hydrodynamic steps that reduce wetted surface at speed, cutting fuel consumption and softening the ride in chop. Built to handle open-water passages, not just sheltered anchorages.",
          pt: "O casco do G680 tem uma quilha de 21° com dois steps hidrodinâmicos que reduzem a superfície molhada em velocidade, diminuindo o consumo de combustível e suavizando a navegação em ondulação. Concebido para travessias em mar aberto, não apenas para ancoradouros abrigados.",
        },
      },
      {
        title: { en: "Convertible bow seating", pt: "Banco de proa convertível" },
        description: {
          en: "The forward section converts between a social seating area and a full sunbed, depending on how the day is going. Stowage beneath keeps the deck uncluttered when underway.",
          pt: "A secção de proa converte-se entre uma área de estar social e uma espreguiçadeira completa, conforme o momento. O arrumo por baixo mantém o convés desimpedido durante a navegação.",
        },
      },
    ],
  },
  {
    slug: "g750",
    name: "G750",
    range: "golden",
    rangeSlug: "golden-line",
    tagline: "More space. Same conviction.",
    positioning: {
      en: "The serious cruiser of the range — big enough for overnights, fast enough to make them count.",
      pt: "O cruzeiro a sério da gama — grande o suficiente para pernoitas, rápido o suficiente para que valham a pena.",
    },
    image: "/images/boats/g750/detail-11.jpg",
    href: "/ranges/golden-line/g750/",
    specs: [
      { value: "7.30m", label: "LOA" },
      { value: "2.85m", label: "Beam" },
      { value: "300 hp", label: "Max power" },
    ],
    fullSpecs: [
      { category: "Dimensions", items: [
        { label: "LOA", value: "730 cm / 23'11\"" },
        { label: "Inside length", value: "557 cm / 18'3\"" },
        { label: "Beam", value: "285 cm / 9'4\"" },
        { label: "Inside width", value: "170 cm / 5'7\"" },
        { label: "Dry weight", value: "950 kg / 2094 lbs" },
        { label: "Tube diameter", value: "58 cm / 22\"" },
      ] },
      { category: "Performance", items: [
        { label: "Recommended power", value: "200 HP / 150 kW" },
        { label: "Max power", value: "300 HP / 221 kW" },
        { label: "Engine weight max", value: "300 kg / 661 lbs" },
        { label: "Engine shaft length", value: "25\" (extra long)" },
        { label: "Midsection/aft deadrise", value: "25° / 20°" },
      ] },
      { category: "Capacity", items: [
        { label: "Package weight", value: "1250 kg / 2756 lbs" },
        { label: "Max load", value: "1160 kg / 2557 lbs" },
        { label: "Max persons", value: "10 / 14" },
        { label: "CE category", value: "B / C" },
      ] },
      { category: "Construction", items: [
        { label: "Tube chambers", value: "5" },
        { label: "Tube material", value: "PVC / Hypalon" },
      ] },
    ],
    features: [
      {
        title: { en: "Offshore-ready hull at 7.5 metres", pt: "Casco preparado para oceano a 7,5 metros" },
        description: {
          en: "Big enough to handle Atlantic swells with composure, fast enough to make offshore runs practical. The G750 is the point in the range where serious passage-making becomes genuinely comfortable.",
          pt: "Grande o suficiente para aguentar ondulação atlântica com compostura, rápido o suficiente para tornar as saídas oceânicas práticas. O G750 é o ponto da gama onde fazer travessias a sério se torna genuinamente confortável.",
        },
      },
      {
        title: { en: "Extended cockpit with full amenities", pt: "Cockpit amplo com comodidades completas" },
        description: {
          en: "Freshwater system, fridge, and head compartment as standard. A boat this size earns its keep as an extended-use vessel, not just a day tripper, and the specification reflects that.",
          pt: "Sistema de água doce, frigorífico e casa de banho de série. Uma embarcação desta dimensão justifica-se como barco de utilização prolongada, não apenas para passeios de dia, e a especificação reflete isso.",
        },
      },
      {
        title: { en: "Twin-engine option", pt: "Opção de dois motores" },
        description: {
          en: "The G750 transom supports twin outboard installation for passages where redundancy matters. Two engines also give the precise low-speed handling that larger RIBs benefit from in marina environments.",
          pt: "A popa do G750 suporta a instalação de dois motores fora de borda para travessias onde a redundância é importante. Dois motores proporcionam também a manobra precisa a baixa velocidade de que os RIBs maiores beneficiam em marinas.",
        },
      },
    ],
  },
  {
    slug: "g850",
    name: "G850",
    range: "golden",
    rangeSlug: "golden-line",
    tagline: "PLACEHOLDER — marketing tagline pending.",
    positioning: {
      en: "Eight and a half metres, up to 400HP, twin engines optional. For when the destination is further away than the horizon.",
      pt: "Oito metros e meio, até 400CV, dois motores opcional. Para quando o destino está mais longe do que o horizonte.",
    },
    image: "/images/boats/g850/detail-20.jpg",
    href: "/ranges/golden-line/g850/",
    specs: [
      { value: "8.50m", label: "LOA" },
      { value: "2.95m", label: "Beam" },
      { value: "200 hp", label: "Max power" },
    ],
    fullSpecs: [
      { category: "Dimensions", items: [
        { label: "LOA", value: "850 cm / 27'11\"" },
        { label: "Inside length", value: "640 cm / 21'0\"" },
        { label: "Beam", value: "295 cm / 9'8\"" },
        { label: "Inside width", value: "175 cm / 5'9\"" },
        { label: "Dry weight", value: "1200 kg / 2640 lbs" },
        { label: "Tube diameter", value: "60 cm / 24\"" },
      ] },
      { category: "Performance", items: [
        { label: "Recommended power", value: "300 HP / 220.6 kW" },
        { label: "Max power", value: "1x400 or 2x200 HP / 1x294 or 2x147.1 kW" },
        { label: "Engine weight max", value: "500 kg / 1102 lbs" },
        { label: "Engine shaft length", value: "30\" (utra long)" },
        { label: "Midsection/aft deadrise", value: "30° / 25°" },
      ] },
      { category: "Capacity", items: [
        { label: "Package weight", value: "1680 kg / 3704 lbs" },
        { label: "Max load", value: "1972 kg / 4348 lbs" },
        { label: "Max persons", value: "12 / 16" },
        { label: "CE category", value: "B / С" },
      ] },
      { category: "Construction", items: [
        { label: "Tube chambers", value: "5" },
        { label: "Tube material", value: "PVC / Hypalon" },
      ] },
    ],
    features: [
      {
        title: { en: "Twin-engine capable", pt: "Preparado para dois motores" },
        description: {
          en: "The G850's transom is built for single or twin outboard installation, with up to 400HP available. Twin engines add redundancy for longer passages and give precise handling in tight marina situations.",
          pt: "A popa do G850 está concebida para instalação de um ou dois motores fora de borda, com até 400CV disponíveis. Os dois motores acrescentam redundância em travessias longas e proporcionam uma manobra precisa em marinas.",
        },
      },
      {
        title: { en: "Offshore specification standard equipment", pt: "Equipamento de série para navegação oceânica" },
        description: {
          en: "Freshwater system, head compartment, fridge-freezer, and navigation electronics are part of the standard specification — not an options list to negotiate. The G850 is set up for extended time on the water from delivery.",
          pt: "Sistema de água doce, casa de banho, frigorífico-congelador e eletrónica de navegação fazem parte do equipamento de série — não de uma lista de opções a negociar. O G850 está preparado para longos períodos no mar desde a entrega.",
        },
      },
      {
        title: { en: "8.5 metre centre console deck", pt: "Convés de consola central de 8,5 metros" },
        description: {
          en: "A genuinely spacious working deck with clear separation between the helm, the social area, and the bow. Room for a serious day out with a full crew, without anyone feeling they're in the way.",
          pt: "Um convés de trabalho genuinamente espaçoso, com separação clara entre o leme, a área social e a proa. Espaço para um dia completo no mar com tripulação a bordo, sem que ninguém se sinta a mais.",
        },
      },
    ],
  },
  {
    slug: "g980",
    name: "G980",
    range: "golden",
    rangeSlug: "golden-line",
    tagline: "PLACEHOLDER — marketing tagline pending.",
    positioning: {
      en: "The largest Grand ever built. Offshore range, twin-engine power, and the signature hypalon tubes that handle whatever the Atlantic throws at it.",
      pt: "O maior Grand alguma vez construído. Autonomia oceânica, potência de dois motores e os icónicos tubos em Hypalon que aguentam o que o Atlântico lhes lançar.",
    },
    image: "/images/boats/g980/detail-17.jpg",
    href: "/ranges/golden-line/g980/",
    specs: [
      { value: "10.00m", label: "LOA" },
      { value: "3.40m", label: "Beam" },
      { value: "350 hp", label: "Max power" },
    ],
    fullSpecs: [
      { category: "Dimensions", items: [
        { label: "LOA", value: "1000 cm / 33'" },
        { label: "Inside length", value: "800 cm / 26'" },
        { label: "Beam", value: "340 cm / 11'15\"" },
        { label: "Inside width", value: "190 cm / 6'23\"" },
        { label: "Dry weight", value: "2350 kg / 5181 lbs" },
        { label: "Tube diameter", value: "60 cm / 24\"" },
      ] },
      { category: "Performance", items: [
        { label: "Recommended power", value: "2x300 HP / 2x220,6 kW" },
        { label: "Max power", value: "1x700 or 2x350 HP / 1x522 or 2x261 kW" },
        { label: "Engine weight max", value: "700 kg / 1543 lbs" },
        { label: "Engine shaft length", value: "1x30\" (utra long) / 2x25\" (extra long)" },
        { label: "Midsection/aft deadrise", value: "30° / 22°" },
      ] },
      { category: "Capacity", items: [
        { label: "Package weight", value: "2410 kg / 5313 lbs" },
        { label: "Max load", value: "2000 kg / 4409 lbs" },
        { label: "Max persons", value: "12 / 18" },
        { label: "CE category", value: "B / С" },
      ] },
      { category: "Construction", items: [
        { label: "Tube chambers", value: "7" },
        { label: "Tube material", value: "PVC / Hypalon" },
      ] },
    ],
    features: [
      {
        title: { en: "9.8 metres of offshore capability", pt: "9,8 metros de capacidade oceânica" },
        description: {
          en: "The largest hull Grand builds. Designed for extended passages, serious sea conditions, and the kind of days that need a proper boat underneath them. Twin-engine installation standard at this length.",
          pt: "O maior casco que a Grand constrói. Concebido para travessias longas, condições de mar exigentes e os dias que precisam de um barco a sério por baixo. Instalação de dois motores padrão a este comprimento.",
        },
      },
      {
        title: { en: "Full liveaboard specification", pt: "Especificação completa para viver a bordo" },
        description: {
          en: "Head, freshwater, fridge-freezer, and navigation electronics as standard. The G980 is equipped to stay out rather than come back — a genuine overnight-capable platform rather than a day boat with ambitions.",
          pt: "Casa de banho, água doce, frigorífico-congelador e eletrónica de navegação de série. O G980 está equipado para ficar no mar em vez de regressar — uma plataforma genuinamente capaz de pernoitar, não apenas um barco de dia com ambições.",
        },
      },
      {
        title: { en: "Hypalon tubes at flagship scale", pt: "Tubos em Hypalon à escala da embarcação insignia" },
        description: {
          en: "At this length, tube diameter, chamber count, and material specification matter as much as the hull. The G980's tubes are engineered for stability at anchor and safety at sea — the same Hypalon construction as the rest of the Golden Line, scaled to match the hull.",
          pt: "A este comprimento, o diâmetro dos tubos, o número de câmaras e a especificação do material são tão importantes como o casco. Os tubos do G980 são concebidos para estabilidade em ancoragem e segurança no mar — a mesma construção em Hypalon do resto da Golden Line, escalada para corresponder ao casco.",
        },
      },
    ],
  },

  // ── Silver Line ───────────────────────────────────────────────
  {
    slug: "s275",
    name: "S275",
    range: "silver",
    rangeSlug: "silver-line",
    tagline: "PLACEHOLDER — marketing tagline pending.",
    positioning: {
      en: "The lightest in the range — easy to launch, easy to handle, easy to stow.",
      pt: "O mais leve da gama — fácil de lançar, fácil de manusear, fácil de arrumar.",
    },
    image: "/images/boats/s275/detail-12.jpg",
    href: "/ranges/silver-line/s275/",
    specs: [
      { value: "2.75m", label: "LOA" },
      { value: "1.55m", label: "Beam" },
      { value: "10 hp", label: "Max power" },
    ],
    fullSpecs: [
      { category: "Dimensions", items: [
        { label: "LOA", value: "275 cm / 9'0\"" },
        { label: "Inside length", value: "182 cm / 6'0\"" },
        { label: "Beam", value: "155 cm / 5'1\"" },
        { label: "Inside width", value: "70 cm / 2'4\"" },
        { label: "Dry weight", value: "53 kg / 117 lbs" },
        { label: "Tube diameter", value: "40 cm / 16\"" },
      ] },
      { category: "Performance", items: [
        { label: "Recommended power", value: "6 HP / 4,4kW" },
        { label: "Max power", value: "10 HP / 7,4kW" },
        { label: "Engine weight max", value: "45 kg / 99 lbs" },
        { label: "Engine shaft length", value: "15\" (short)" },
        { label: "Midsection/aft deadrise", value: "17° / 15°" },
      ] },
      { category: "Capacity", items: [
        { label: "Package weight", value: "87 kg / 191 lbs" },
        { label: "Max load", value: "440 kg / 968 lbs" },
        { label: "Max persons", value: "3" },
        { label: "CE category", value: "D" },
      ] },
      { category: "Construction", items: [
        { label: "Tube chambers", value: "3" },
        { label: "Tube material", value: "PVC / Hypalon" },
      ] },
    ],
    features: [
      {
        title: { en: "Lightest in the range", pt: "O mais leve da gama" },
        description: {
          en: "Under 100kg bare, the S275 launches easily from a beach, stows on deck without drama, and handles comfortably with a small outboard. The right tool for short transfers in calm to moderate conditions.",
          pt: "Com menos de 100kg em vazio, o S275 é fácil de lançar de uma praia, arruma-se no convés sem complicações e manuseia-se confortavelmente com um pequeno motor. A ferramenta certa para transferências curtas em condições calmas a moderadas.",
        },
      },
      {
        title: { en: "Simple, durable construction", pt: "Construção simples e duradoura" },
        description: {
          en: "Fiberglass hull, Hypalon tubes, no unnecessary complexity. Built to be used hard, stored simply, and last.",
          pt: "Casco em fibra de vidro, tubos em Hypalon, sem complexidade desnecessária. Construído para uso intensivo, armazenamento simples e longa duração.",
        },
      },
    ],
  },
  {
    slug: "s300",
    name: "S300",
    range: "silver",
    rangeSlug: "silver-line",
    tagline: "PLACEHOLDER — marketing tagline pending.",
    positioning: {
      en: "Compact and capable. More tender than dinghy, without the footprint of the bigger hulls.",
      pt: "Compacto e capaz. Mais tender do que bote, sem a dimensão dos cascos maiores.",
    },
    image: "/images/boats/s300/detail-15.jpg",
    href: "/ranges/silver-line/s300/",
    specs: [
      { value: "3.00m", label: "LOA" },
      { value: "1.67m", label: "Beam" },
      { value: "15 hp", label: "Max power" },
    ],
    fullSpecs: [
      { category: "Dimensions", items: [
        { label: "LOA", value: "300 cm / 9'10\"" },
        { label: "Inside length", value: "200 cm / 6'7\"" },
        { label: "Beam", value: "167 cm / 5'6\"" },
        { label: "Inside width", value: "78 cm / 2'7\"" },
        { label: "Dry weight", value: "56-77 kg / 123-169 lbs" },
        { label: "Tube diameter", value: "43 cm / 17\"" },
      ] },
      { category: "Performance", items: [
        { label: "Recommended power", value: "10 HP / 7,4kW" },
        { label: "Max power", value: "15 HP / 11kW" },
        { label: "Engine weight max", value: "50 kg / 110 lbs" },
        { label: "Engine shaft length", value: "15\" (short)" },
        { label: "Midsection/aft deadrise", value: "19° / 15°" },
      ] },
      { category: "Capacity", items: [
        { label: "Package weight", value: "91-112 kg / 200-246 lbs" },
        { label: "Max load", value: "520 kg / 1144 lbs" },
        { label: "Max persons", value: "4" },
        { label: "CE category", value: "C" },
      ] },
      { category: "Construction", items: [
        { label: "Tube chambers", value: "3" },
        { label: "Tube material", value: "PVC / Hypalon" },
      ] },
    ],
    features: [
      {
        title: { en: "Compact tender with proper carrying capacity", pt: "Tender compacto com capacidade de carga real" },
        description: {
          en: "The S300 steps up from the S275 with noticeably more passenger and load capacity, while remaining small enough to handle without crew. A practical step up for yachts that need to move more people.",
          pt: "O S300 supera o S275 com uma capacidade notavelmente maior de passageiros e carga, mantendo-se pequeno o suficiente para manusear sem tripulação. Um passo prático para iates que precisam de transportar mais pessoas.",
        },
      },
      {
        title: { en: "Clean deck, clear layout", pt: "Convés limpo, layout claro" },
        description: {
          en: "Uncluttered working space that makes loading and unloading straightforward in any anchorage. No features that get in the way of the boat's actual job.",
          pt: "Espaço de trabalho desimpedido que torna o embarque e desembarque simples em qualquer ancoragem. Sem características que interfiram com a função real da embarcação.",
        },
      },
    ],
  },
  {
    slug: "s330",
    name: "S330",
    range: "silver",
    rangeSlug: "silver-line",
    tagline: "PLACEHOLDER — marketing tagline pending.",
    positioning: {
      en: "Clean, light, and honest. Does exactly what a good tender should do.",
      pt: "Limpo, leve e honesto. Faz exatamente o que um bom tender deve fazer.",
    },
    image: "/images/boats/s330/detail-13.jpg",
    href: "/ranges/silver-line/s330/",
    specs: [
      { value: "3.30m", label: "LOA" },
      { value: "1.69m", label: "Beam" },
      { value: "25 hp", label: "Max power" },
    ],
    fullSpecs: [
      { category: "Dimensions", items: [
        { label: "LOA", value: "330 cm / 10'10\"" },
        { label: "Inside length", value: "218 cm / 7'2\"" },
        { label: "Beam", value: "169 cm / 5'7\"" },
        { label: "Inside width", value: "78 cm / 2'7\"" },
        { label: "Dry weight", value: "63-85 kg / 139-187 lbs" },
        { label: "Tube diameter", value: "43 cm / 17\"" },
      ] },
      { category: "Performance", items: [
        { label: "Recommended power", value: "15 HP / 11 kW" },
        { label: "Max power", value: "25 HP / 18,4 kW" },
        { label: "Engine weight max", value: "70 kg / 154 lbs" },
        { label: "Engine shaft length", value: "15\" (short)" },
        { label: "Midsection/aft deadrise", value: "19° / 15°" },
      ] },
      { category: "Capacity", items: [
        { label: "Package weight", value: "99-126 kg / 218-277 lbs" },
        { label: "Max load", value: "580 kg / 1276 lbs" },
        { label: "Max persons", value: "4" },
        { label: "CE category", value: "C" },
      ] },
      { category: "Construction", items: [
        { label: "Tube chambers", value: "3" },
        { label: "Tube material", value: "PVC / Hypalon" },
      ] },
    ],
    features: [
      {
        title: { en: "Workhorse tender specification", pt: "Especificação de tender de trabalho" },
        description: {
          en: "The S330 is sized for yachts that need a tender that can genuinely carry guests, luggage, and provisions in one trip. Stable enough to load from a swim platform without drama.",
          pt: "O S330 está dimensionado para iates que precisam de um tender capaz de transportar genuinamente convidados, bagagem e provisões numa só viagem. Estável o suficiente para carregar a partir de uma plataforma de banho sem complicações.",
        },
      },
      {
        title: { en: "Multiple layout options", pt: "Várias opções de layout" },
        description: {
          en: "Open, Sport, and Lux deck configurations on the same proven hull. Choose the layout that suits the yacht and the use case, not the other way around.",
          pt: "Configurações de convés Open, Sport e Lux no mesmo casco comprovado. Escolha o layout que se adapta ao iate e à utilização, não ao contrário.",
        },
      },
    ],
  },
  {
    slug: "s370n",
    name: "S370N",
    range: "silver",
    rangeSlug: "silver-line",
    tagline: "PLACEHOLDER — marketing tagline pending.",
    positioning: {
      en: "A workhorse tender with enough polish to sit alongside premium vessels without apology.",
      pt: "Um tender de trabalho com acabamento suficiente para estar ao lado de embarcações premium sem necessitar de se desculpar.",
    },
    image: "/images/boats/s370n/detail-11.jpg",
    href: "/ranges/silver-line/s370n/",
    specs: [
      { value: "3.70m", label: "LOA" },
      { value: "1.85m", label: "Beam" },
      { value: "30 hp", label: "Max power" },
    ],
    fullSpecs: [
      { category: "Dimensions", items: [
        { label: "LOA", value: "370 cm / 12'2\"" },
        { label: "Inside length", value: "270 cm / 8'10\"" },
        { label: "Beam", value: "185 cm / 6'1\"" },
        { label: "Inside width", value: "92 cm / 3'0\"" },
        { label: "Dry weight", value: "95-124 kg / 209-273 lbs" },
        { label: "Tube diameter", value: "46 cm / 18\"" },
      ] },
      { category: "Performance", items: [
        { label: "Recommended power", value: "25 HP / 18,4 kW" },
        { label: "Max power", value: "30 HP / 22,1 kW" },
        { label: "Engine weight max", value: "80 kg / 176 lbs" },
        { label: "Engine shaft length", value: "15\" (short)" },
        { label: "Midsection/aft deadrise", value: "20° / 17°" },
      ] },
      { category: "Capacity", items: [
        { label: "Package weight", value: "158-185 kg / 347-407 lbs" },
        { label: "Max load", value: "600 kg / 1320 lbs" },
        { label: "Max persons", value: "5" },
        { label: "CE category", value: "C" },
      ] },
      { category: "Construction", items: [
        { label: "Tube chambers", value: "3" },
        { label: "Tube material", value: "PVC / Hypalon" },
      ] },
    ],
    features: [
      {
        title: { en: "Mid-range tender, full specification", pt: "Tender de gama média, especificação completa" },
        description: {
          en: "At 3.7 metres, the S370N has enough deck space to work as a genuine day boat in sheltered water while remaining practical as a yacht auxiliary. The Open/Sport/Lux layout options give it real versatility.",
          pt: "Com 3,7 metros, o S370N tem espaço de convés suficiente para funcionar como embarcação de dia genuína em águas abrigadas, mantendo-se prático como auxiliar de iate. As opções de layout Open/Sport/Lux conferem-lhe uma versatilidade real.",
        },
      },
      {
        title: { en: "Hypalon tubes, Silver Line build quality", pt: "Tubos em Hypalon, qualidade de construção Silver Line" },
        description: {
          en: "The same tube material and construction standards as the Golden Line, applied to a simpler, more practical hull. Quality where it matters, without the price of features you don't need.",
          pt: "O mesmo material e padrões de construção dos tubos da Golden Line, aplicados a um casco mais simples e prático. Qualidade onde é importante, sem o preço de características de que não necessita.",
        },
      },
    ],
  },
  {
    slug: "s420n",
    name: "S420N",
    range: "silver",
    rangeSlug: "silver-line",
    tagline: "PLACEHOLDER — marketing tagline pending.",
    positioning: {
      en: "Solid, reliable, well-sized for yacht work. Fits davits, takes a crowd, gets on with it.",
      pt: "Sólido, fiável, bem dimensionado para trabalho em iate. Adapta-se a davits, transporta muita gente, cumpre a sua função.",
    },
    image: "/images/boats/s420n/detail-14.jpg",
    href: "/ranges/silver-line/s420n/",
    specs: [
      { value: "4.20m", label: "LOA" },
      { value: "1.95m", label: "Beam" },
      { value: "50 hp", label: "Max power" },
    ],
    fullSpecs: [
      { category: "Dimensions", items: [
        { label: "LOA", value: "420 cm / 13'9\"" },
        { label: "Inside length", value: "310 cm / 10'2\"" },
        { label: "Beam", value: "195 cm / 6'5\"" },
        { label: "Inside width", value: "101 cm / 3'4\"" },
        { label: "Dry weight", value: "115-145 kg / 253-319 lbs" },
        { label: "Tube diameter", value: "46 cm / 18\"" },
      ] },
      { category: "Performance", items: [
        { label: "Recommended power", value: "40 HP / 29,4 kW" },
        { label: "Max power", value: "50 HP / 36,8 kW" },
        { label: "Engine weight max", value: "115 kg / 253 lbs" },
        { label: "Engine shaft length", value: "20\" (long)" },
        { label: "Midsection/aft deadrise", value: "20° / 17°" },
      ] },
      { category: "Capacity", items: [
        { label: "Package weight", value: "178-209 kg / 392-460 lbs" },
        { label: "Max load", value: "650 / 1430" },
        { label: "Max persons", value: "8" },
        { label: "CE category", value: "C" },
      ] },
      { category: "Construction", items: [
        { label: "Tube chambers", value: "3" },
        { label: "Tube material", value: "PVC / Hypalon" },
      ] },
    ],
    features: [
      {
        title: { en: "Capable coastal tender", pt: "Tender costeiro capaz" },
        description: {
          en: "The largest of the Silver Line's practical tender range. At 4.2 metres, the S420N handles coastal chop confidently and carries a full complement of passengers and kit without feeling overloaded.",
          pt: "O maior da gama de tenders práticos da Silver Line. Com 4,2 metros, o S420N lida com a ondulação costeira com confiança e transporta um complemento completo de passageiros e equipamento sem se sentir sobrecarregado.",
        },
      },
      {
        title: { en: "Three deck layouts on one hull", pt: "Três layouts de convés num único casco" },
        description: {
          en: "Open for simplicity, Sport for the helm-forward configuration, Lux for days when comfort matters as much as function. The S420N adapts to how you actually use it.",
          pt: "Open para simplicidade, Sport para a configuração com leme avançado, Lux para os dias em que o conforto é tão importante como a função. O S420N adapta-se à forma como realmente o utiliza.",
        },
      },
    ],
  },
  {
    slug: "s470n",
    name: "S470N",
    range: "silver",
    rangeSlug: "silver-line",
    tagline: "The most capable tender in the range — handles serious loads and real coastal conditions without fuss.",
    positioning: {
      en: "The most capable tender in the range — handles serious loads and real coastal conditions without fuss.",
      pt: "O tender mais capaz da gama — lida com cargas a sério e condições costeiras reais sem complicações.",
    },
    image: "/images/boats/s470n/detail-12.jpg",
    href: "/ranges/silver-line/s470n/",
    specs: [
      { value: "4.70m", label: "LOA" },
      { value: "2.05m", label: "Beam" },
      { value: "70 hp", label: "Max power" },
    ],
    fullSpecs: [
      { category: "Dimensions", items: [
        { label: "LOA", value: "470 cm / 15'5\"" },
        { label: "Inside length", value: "340 cm / 11'2\"" },
        { label: "Beam", value: "205 cm / 6'9\"" },
        { label: "Inside width", value: "105 cm / 3'4\"" },
        { label: "Dry weight", value: "170-208 kg / 374-458 lbs" },
        { label: "Tube diameter", value: "50 cm / 20\"" },
      ] },
      { category: "Performance", items: [
        { label: "Recommended power", value: "50 HP / 36,8 kW" },
        { label: "Max power", value: "70 HP / 51,5 kW" },
        { label: "Engine weight max", value: "150 kg / 330 lbs" },
        { label: "Engine shaft length", value: "20\" (long)" },
        { label: "Midsection/aft deadrise", value: "20° / 15°" },
      ] },
      { category: "Capacity", items: [
        { label: "Package weight", value: "226-265 kg / 497-583 lbs" },
        { label: "Max load", value: "900 kg / 1980 lbs" },
        { label: "Max persons", value: "8" },
        { label: "CE category", value: "C" },
      ] },
      { category: "Construction", items: [
        { label: "Tube chambers", value: "5" },
        { label: "Tube material", value: "PVC / Hypalon" },
      ] },
    ],
    features: [
      {
        title: { en: "The Silver Line's most capable hull", pt: "O casco mais capaz da Silver Line" },
        description: {
          en: "At 4.7 metres, the S470N is the tender that earns its place on serious cruising yachts. Enough carrying capacity for a full crew with gear, enough hull to handle the passage back from an exposed anchorage.",
          pt: "Com 4,7 metros, o S470N é o tender que merece o seu lugar em iates de cruzeiro a sério. Capacidade de carga suficiente para uma tripulação completa com equipamento, casco suficiente para aguentar o regresso de uma ancoragem exposta.",
        },
      },
      {
        title: { en: "Full layout choice — Open, Sport, Lux", pt: "Escolha completa de layout — Open, Sport, Lux" },
        description: {
          en: "At this size, the Lux configuration in particular becomes a genuinely comfortable day boat in its own right, not just a tender with aspirations. The hull is capable enough to justify whichever layout suits the mission.",
          pt: "Nesta dimensão, a configuração Lux em particular torna-se uma embarcação de dia genuinamente confortável por direito próprio, não apenas um tender com ambições. O casco é suficientemente capaz para justificar qualquer layout que se adapte à missão.",
        },
      },
    ],
  },

  // ── Drive Line ────────────────────────────────────────────────
  // d600 is modeled as ONE model with three layouts (Active/Drive/Lux)
  // rather than three separate models — the scraped d600-active/d600-drive/
  // d600-lux pages share identical hull dimensions and differ only in the
  // two weight fields, confirming they're trim/layout variants of one hull,
  // not distinct products. This maps directly onto the layouts mechanism
  // already used elsewhere in this data layer.
  {
    slug: "d600",
    name: "D600",
    range: "drive",
    rangeSlug: "drive-line",
    tagline: "The performance hull with a lifestyle fit-out. Fast when you want it, comfortable when you don't.",
    // NOTE: the approved copy batch provided separate positioning/features for
    // d600-active/d600-drive/d600-lux (as if they were three distinct models),
    // but this data layer models them as ONE d600 Model with a `layouts` array.
    // The "Drive" copy is used here as the model-level positioning/features
    // since d600's default image is the Drive layout; the Active/Lux copy has
    // no home in the current shape (ModelLayout has no positioning/features
    // fields) and was not applied — see report to user.
    positioning: {
      en: "The purist's D600 — stripped back to what matters, set up for performance.",
      pt: "O D600 do purista — reduzido ao essencial, configurado para a performance.",
    },
    image: "/images/boats/d600-drive/detail-12.jpg",
    href: "/ranges/drive-line/d600/",
    specs: [
      { value: "6.12m", label: "LOA" },
      { value: "2.50m", label: "Beam" },
      { value: "150 hp", label: "Max power" },
    ],
    fullSpecs: [
      { category: "Dimensions", items: [
        { label: "LOA", value: "612 cm / 20'1\"" },
        { label: "Inside length", value: "440 cm / 14'5\"" },
        { label: "Beam", value: "250 cm / 8'2\"" },
        { label: "Inside width", value: "154 cm / 5'1\"" },
        { label: "Tube diameter", value: "50 cm / 20\"" },
      ] },
      { category: "Performance", items: [
        { label: "Recommended power", value: "130 HP / 95,6 kW" },
        { label: "Max power", value: "150 HP / 110,3 kW" },
        { label: "Engine weight max", value: "250 kg / 550 lbs" },
        { label: "Engine shaft length", value: "25\" (extra long)" },
        { label: "Midsection/aft deadrise", value: "22° / 22°" },
      ] },
      { category: "Capacity", items: [
        { label: "Max load", value: "1100 kg / 2425 lbs" },
        { label: "Max persons", value: "12" },
        { label: "CE category", value: "C" },
      ] },
      { category: "Construction", items: [
        { label: "Tube chambers", value: "5" },
        { label: "Tube material", value: "PVC / Hypalon" },
      ] },
    ],
    features: [
      {
        title: { en: "The purist's D600", pt: "O D600 do purista" },
        description: {
          en: "Same deep-V hull as the rest of the D600 range, with a layout focused entirely on the driving experience. Helm positioned for visibility and control, deck cleared for movement, nothing added that isn't needed.",
          pt: "O mesmo casco deep-V do resto da gama D600, com um layout totalmente focado na experiência de condução. Leme posicionado para visibilidade e controlo, convés desimpedido para movimento, nada acrescentado que não seja necessário.",
        },
      },
      {
        title: { en: "Practical storage, clean lines", pt: "Arrumo prático, linhas limpas" },
        description: {
          en: "Stowage integrated without cluttering the working deck. The D600 Drive is set up for people who want to go fast and come back with everything they brought.",
          pt: "Arrumo integrado sem sobrecarregar o convés de trabalho. O D600 Drive está preparado para quem quer ir rápido e regressar com tudo o que trouxe.",
        },
      },
      {
        title: { en: "Raised tube profile", pt: "Perfil de tubo elevado" },
        description: {
          en: "Higher tube placement than a conventional RIB for better spray management at speed, and a visual presence that makes clear this is a performance hull before the engine starts.",
          pt: "Colocação de tubo mais alta do que num RIB convencional para melhor gestão de borrifo em velocidade, e uma presença visual que deixa claro que este é um casco de performance antes de o motor arrancar.",
        },
      },
    ],
    layouts: [
      {
        name: "Active",
        useCaseLine: "PLACEHOLDER — framing for the Active layout pending.",
        image: "/images/boats/d600-active/detail-13.jpg",
        specs: [
          { label: "Dry weight", value: "596 kg / 1314 lbs" },
          { label: "Package weight", value: "706 kg / 1556 lbs" },
        ],
      },
      {
        name: "Drive",
        useCaseLine: "PLACEHOLDER — framing for the Drive layout pending.",
        image: "/images/boats/d600-drive/detail-12.jpg",
        specs: [
          { label: "Dry weight", value: "626 kg / 1380 lbs" },
          { label: "Package weight", value: "746 kg / 1645 lbs" },
        ],
      },
      {
        name: "Lux",
        useCaseLine: "PLACEHOLDER — framing for the Lux layout pending.",
        image: "/images/boats/d600-lux/detail-11.jpg",
        specs: [
          { label: "Dry weight", value: "597 kg / 1316 lbs" },
          { label: "Package weight", value: "707 kg / 1559 lbs" },
        ],
      },
    ],
  },
  {
    slug: "d950-drive",
    name: "D950",
    range: "drive",
    rangeSlug: "drive-line",
    tagline: "PLACEHOLDER — marketing tagline pending.",
    positioning: {
      en: "Commercial-grade build, professional payload, serious offshore capability. Built to work.",
      pt: "Construção de grau comercial, carga útil profissional, capacidade oceânica a sério. Construído para trabalhar.",
    },
    image: "/images/boats/d950-drive/detail-17.jpg",
    href: "/ranges/drive-line/d950-drive/",
    specs: [
      { value: "9.54m", label: "LOA" },
      { value: "3.19m", label: "Beam" },
      { value: "350 hp", label: "Max power" },
    ],
    fullSpecs: [
      { category: "Dimensions", items: [
        { label: "LOA", value: "954 cm / 31’4”" },
        { label: "Inside length", value: "594 cm / 19’6”" },
        { label: "Beam", value: "319 cm / 10’6”" },
        { label: "Inside width", value: "195 cm / 6’5”" },
        { label: "Dry weight", value: "2160 kg / 4761 lbs" },
        { label: "Tube diameter", value: "40-60 cm / 16”-24”" },
      ] },
      { category: "Performance", items: [
        { label: "Recommended power", value: "1x500 or 2x250 HP / 1x372.8 or 2x186.4 kW" },
        { label: "Max power", value: "1x700 or 2x350 HP / 1x514.7 or 2x257.4 kW" },
        { label: "Engine weight max", value: "700 kg / 1543 lbs" },
        { label: "Engine shaft length", value: "1х30’’ (ultra long) or 2x25’’ (extra long)" },
        { label: "Midsection/aft deadrise", value: "30° / 22°" },
      ] },
      { category: "Capacity", items: [
        { label: "Package weight", value: "2310 kg / 5093 lbs" },
        { label: "Max load", value: "2000 kg / 4410 lbs" },
        { label: "Max persons", value: "14" },
        { label: "CE category", value: "B" },
      ] },
      { category: "Construction", items: [
        { label: "Tube chambers", value: "7" },
        { label: "Tube material", value: "PVC / Hypalon" },
      ] },
    ],
    features: [
      {
        title: { en: "Commercial-grade offshore hull", pt: "Casco oceânico de grau comercial" },
        description: {
          en: "The D950 is built to professional specification — payload capacity, build quality, and hull engineering designed for working use, not recreational hours. Used by coast guards, charter operators, and professional marine users across Europe.",
          pt: "O D950 é construído segundo especificação profissional — capacidade de carga, qualidade de construção e engenharia do casco concebidos para uso profissional, não para horas de lazer. Utilizado por guardas costeiros, operadores de charter e utilizadores profissionais marítimos em toda a Europa.",
        },
      },
      {
        title: { en: "Heavy-duty construction throughout", pt: "Construção reforçada em todos os aspetos" },
        description: {
          en: "Reinforced hull, heavy-gauge fittings, and a build standard that reflects what happens when a working boat has to perform in conditions that recreational hulls would avoid. Built to last under load.",
          pt: "Casco reforçado, ferragens de calibre pesado e um padrão de construção que reflete o que acontece quando um barco de trabalho tem de operar em condições que os cascos recreativos evitariam. Construído para durar sob carga.",
        },
      },
      {
        title: { en: "Raised tube specification for working conditions", pt: "Especificação de tubo elevada para condições de trabalho" },
        description: {
          en: "Higher tubes, greater diameter, and a chamber layout engineered for stability under load and rough-water operation rather than aesthetics. The D950 looks the way it does because it works the way it does.",
          pt: "Tubos mais altos, maior diâmetro e uma disposição de câmaras concebida para estabilidade sob carga e operação em mar agitado, não para estética. O D950 tem o aspeto que tem porque funciona da forma como funciona.",
        },
      },
    ],
  },
];

export function getModelsByRange(rangeSlug: Range["slug"]): Model[] {
  return models.filter((m) => m.rangeSlug === rangeSlug);
}

export function getModelBySlug(slug: string): Model | undefined {
  return models.find((m) => m.slug === slug);
}

/** Narrow a Model down to the FeaturedModel shape ModelCard expects */
export function toFeaturedModel(model: Model): FeaturedModel {
  return {
    slug: model.slug,
    name: model.name,
    range: model.range,
    tagline: model.tagline,
    image: model.image,
    href: model.href,
  };
}
