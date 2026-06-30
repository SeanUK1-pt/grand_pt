import type { FeaturedModel } from "./featured-models";
import type { Range } from "./ranges";

export type ModelSpec = { value: string; label: string };

export type SpecCategory = {
  category: string;
  items: { label: string; value: string }[];
};

export type Feature = {
  title: string;
  description: string;
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
  positioning: string;
  specs: ModelSpec[];
  priceFrom: number;
  priceLabel: string;
  fullSpecs: SpecCategory[];
  features: Feature[];
  /** Only set for models with multiple deck layouts (currently Silver Line). */
  layouts?: ModelLayout[];
};

// PLACEHOLDER — structural scaffold only. Every value below is "TBC" pending
// real spec sheets and feature copy. Do not treat any number/description here
// as accurate; nothing here should be invented or guessed at.
function placeholderFullSpecs(): SpecCategory[] {
  return [
    {
      category: "Dimensions",
      items: [
        { label: "LOA", value: "TBC" },
        { label: "Beam", value: "TBC" },
        { label: "Tube diameter", value: "TBC" },
        { label: "Dry weight", value: "TBC" },
        { label: "Draft", value: "TBC" },
      ],
    },
    {
      category: "Performance",
      items: [
        { label: "Max power", value: "TBC" },
        { label: "Recommended power", value: "TBC" },
        { label: "Max speed", value: "TBC" },
        { label: "Cruising speed", value: "TBC" },
        { label: "Fuel capacity", value: "TBC" },
      ],
    },
    {
      category: "Capacity",
      items: [
        { label: "Max persons", value: "TBC" },
        { label: "Max load", value: "TBC" },
        { label: "CE category", value: "TBC" },
      ],
    },
    {
      category: "Construction",
      items: [
        { label: "Hull material", value: "TBC" },
        { label: "Tube material", value: "TBC" },
        { label: "Tube chambers", value: "TBC" },
        { label: "Deck material", value: "TBC" },
      ],
    },
  ];
}

// PLACEHOLDER — feature titles describe the standard category set; descriptions
// are generic placeholders pending real equipment/layout copy per model.
function placeholderFeatures(): Feature[] {
  return [
    {
      title: "Helm & console",
      description: "PLACEHOLDER — description of console layout and instrumentation pending.",
    },
    {
      title: "Deck layout",
      description: "PLACEHOLDER — description of seating and deck arrangement pending.",
    },
    {
      title: "Storage",
      description: "PLACEHOLDER — description of stowage and locker provision pending.",
    },
    {
      title: "Standard equipment",
      description: "PLACEHOLDER — list of standard-fit equipment pending.",
    },
  ];
}

// PLACEHOLDER — layout names, useCaseLine framing, and specs are all
// structural placeholders. "TBC" values and generic framing lines stand in
// for real layout content pending copy/spec sheets; nothing here is a real
// number. Only specs that DIFFER per layout belong here — shared specs
// (LOA, beam, etc.) live in the model's fullSpecs, not repeated per layout.
function placeholderLayoutsThreeWay(): ModelLayout[] {
  return [
    {
      name: "Open",
      useCaseLine: "PLACEHOLDER — light and simple framing for the Open layout pending.",
      specs: [
        { label: "Seating", value: "TBC" },
        { label: "Dry weight", value: "TBC" },
      ],
    },
    {
      name: "Sport",
      useCaseLine: "PLACEHOLDER — performance-oriented framing for the Sport layout pending.",
      specs: [
        { label: "Seating", value: "TBC" },
        { label: "Dry weight", value: "TBC" },
        { label: "Max HP", value: "TBC" },
      ],
    },
    {
      name: "Lux",
      useCaseLine: "PLACEHOLDER — comfort-oriented framing for the Lux layout pending.",
      specs: [
        { label: "Seating", value: "TBC" },
        { label: "Dry weight", value: "TBC" },
      ],
    },
  ];
}

// Smallest Silver Line hull — only one layout offered. A single-entry array,
// not a special case the layout-tile UI needs to handle differently.
function placeholderLayoutsOpenOnly(): ModelLayout[] {
  return [
    {
      name: "Open",
      useCaseLine: "PLACEHOLDER — light and simple framing for the Open layout pending.",
      specs: [
        { label: "Seating", value: "TBC" },
        { label: "Dry weight", value: "TBC" },
      ],
    },
  ];
}

export const models: Model[] = [
  // ── Golden Line ───────────────────────────────────────────────
  {
    slug: "g680",
    name: "G680",
    range: "golden",
    rangeSlug: "golden-line",
    tagline: "Built to be lived aboard.",
    positioning: "The flagship that sets the standard for serious RIB ownership.",
    image: "/images/lifestyle/g680-morning.jpg",
    href: "/ranges/golden-line/g680/",
    specs: [
      { value: "6.80m", label: "LOA" },
      { value: "2.90m", label: "Beam" },
      { value: "200 hp", label: "Max power" },
    ],
    priceFrom: 48000,
    priceLabel: "Base specification, VAT included",
    fullSpecs: placeholderFullSpecs(),
    features: placeholderFeatures(),
  },
  {
    slug: "g750",
    name: "G750",
    range: "golden",
    rangeSlug: "golden-line",
    tagline: "More space. Same conviction.",
    positioning: "The G750 gives you the room to stay out longer and go further.",
    image: "/images/lifestyle/g750-horizon.jpg",
    href: "/ranges/golden-line/g750/",
    specs: [
      { value: "7.50m", label: "LOA" },
      { value: "3.00m", label: "Beam" },
      { value: "250 hp", label: "Max power" },
    ],
    priceFrom: 58000,
    priceLabel: "Base specification, VAT included",
    fullSpecs: placeholderFullSpecs(),
    features: placeholderFeatures(),
  },
  {
    slug: "g580",
    name: "G580",
    range: "golden",
    rangeSlug: "golden-line",
    tagline: "The entry point to Golden Line quality.",
    positioning: "All the Golden Line DNA, in a hull that fits more harbours.",
    image: "/images/lifestyle/g580-dock.jpg",
    href: "/ranges/golden-line/g580/",
    specs: [
      { value: "5.80m", label: "LOA" },
      { value: "2.60m", label: "Beam" },
      { value: "150 hp", label: "Max power" },
    ],
    priceFrom: 36000,
    priceLabel: "Base specification, VAT included",
    fullSpecs: placeholderFullSpecs(),
    features: placeholderFeatures(),
  },

  // ── Silver Line ───────────────────────────────────────────────
  {
    slug: "s520",
    name: "S520",
    range: "silver",
    rangeSlug: "silver-line",
    tagline: "The boat that says yes to a normal Tuesday.",
    positioning: "Versatile, reliable, and sized for the trips you'll actually take.",
    image: "/images/lifestyle/s520-afternoon.jpg",
    href: "/ranges/silver-line/s520/",
    specs: [
      { value: "5.20m", label: "LOA" },
      { value: "2.40m", label: "Beam" },
      { value: "115 hp", label: "Max power" },
    ],
    priceFrom: 24000,
    priceLabel: "Base specification, VAT included",
    fullSpecs: placeholderFullSpecs(),
    features: placeholderFeatures(),
    layouts: placeholderLayoutsThreeWay(),
  },
  {
    slug: "s460",
    name: "S460",
    range: "silver",
    rangeSlug: "silver-line",
    tagline: "Compact, capable, ready.",
    positioning: "The Silver Line compact — nothing you don't need, everything you do.",
    image: "/images/lifestyle/s460-launch.jpg",
    href: "/ranges/silver-line/s460/",
    specs: [
      { value: "4.60m", label: "LOA" },
      { value: "2.20m", label: "Beam" },
      { value: "90 hp", label: "Max power" },
    ],
    priceFrom: 18000,
    priceLabel: "Base specification, VAT included",
    fullSpecs: placeholderFullSpecs(),
    features: placeholderFeatures(),
    layouts: placeholderLayoutsOpenOnly(),
  },
  {
    slug: "s600",
    name: "S600",
    range: "silver",
    rangeSlug: "silver-line",
    tagline: "Step up without stepping out of budget.",
    positioning: "More hull, same Silver Line practicality.",
    image: "/images/lifestyle/s600-coast.jpg",
    href: "/ranges/silver-line/s600/",
    specs: [
      { value: "6.00m", label: "LOA" },
      { value: "2.60m", label: "Beam" },
      { value: "150 hp", label: "Max power" },
    ],
    priceFrom: 30000,
    priceLabel: "Base specification, VAT included",
    fullSpecs: placeholderFullSpecs(),
    features: placeholderFeatures(),
    layouts: placeholderLayoutsThreeWay(),
  },

  // ── Drive Line ────────────────────────────────────────────────
  {
    slug: "d400",
    name: "D400",
    range: "drive",
    rangeSlug: "drive-line",
    tagline: "Deep-V, raised tube, no apology.",
    positioning: "Built for open water and the people who want to cross it fast.",
    image: "/images/lifestyle/d400-open-sea.jpg",
    href: "/ranges/drive-line/d400/",
    specs: [
      { value: "4.00m", label: "LOA" },
      { value: "1.85m", label: "Beam" },
      { value: "60 hp", label: "Max power" },
    ],
    priceFrom: 14000,
    priceLabel: "Base specification, VAT included",
    fullSpecs: placeholderFullSpecs(),
    features: placeholderFeatures(),
  },
  {
    slug: "d500",
    name: "D500",
    range: "drive",
    rangeSlug: "drive-line",
    tagline: "More speed. More range. Same attitude.",
    positioning: "The D500 is for days when you want to cover ground.",
    image: "/images/lifestyle/d500-wake.jpg",
    href: "/ranges/drive-line/d500/",
    specs: [
      { value: "5.00m", label: "LOA" },
      { value: "2.10m", label: "Beam" },
      { value: "100 hp", label: "Max power" },
    ],
    priceFrom: 20000,
    priceLabel: "Base specification, VAT included",
    fullSpecs: placeholderFullSpecs(),
    features: placeholderFeatures(),
  },
  {
    slug: "d330",
    name: "D330",
    range: "drive",
    rangeSlug: "drive-line",
    tagline: "Entry-level speed, full Drive Line character.",
    positioning: "The smallest hull in the Drive Line — not a compromise, a choice.",
    image: "/images/lifestyle/d330-spray.jpg",
    href: "/ranges/drive-line/d330/",
    specs: [
      { value: "3.30m", label: "LOA" },
      { value: "1.65m", label: "Beam" },
      { value: "40 hp", label: "Max power" },
    ],
    priceFrom: 9500,
    priceLabel: "Base specification, VAT included",
    fullSpecs: placeholderFullSpecs(),
    features: placeholderFeatures(),
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
