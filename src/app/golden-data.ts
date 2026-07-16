import type { Spec } from "@/components/spec-strip"
import type { RangeKey } from "@/components/range-config"

export type Model = {
  range: RangeKey
  modelName: string
  heroImage: string
  positioning: string
  specs: Spec[]
  /** Grand builds to order; pricing is on application rather than published. */
  priceFrom?: number
  priceLabel: string
}

const POA_LABEL = "Built to order · price on application"

/**
 * Golden Line line-up — the full 12-model range.
 * Specs are the manufacturer's published figures (overall length, overall
 * width, max power, passenger capacity). Grand builds to order, so no list
 * price is published; cards show "price on application".
 */
export const goldenModels: Model[] = [
  {
    range: "golden",
    modelName: "G340",
    heroImage: "/boats/G340.png",
    positioning:
      "Classic and fair — our all-time best-selling compact yacht tender.",
    specs: [
      { value: "3.30 m", label: "LOA" },
      { value: "1.76 m", label: "Beam" },
      { value: "30 hp", label: "Max" },
      { value: "4", label: "Persons" },
    ],
    priceLabel: POA_LABEL,
  },
  {
    range: "golden",
    modelName: "G340N",
    heroImage: "/boats/G340N.png",
    positioning:
      "Small and mighty — the remastered 340 with modern upgrades.",
    specs: [
      { value: "3.25 m", label: "LOA" },
      { value: "1.75 m", label: "Beam" },
      { value: "40 hp", label: "Max" },
      { value: "4", label: "Persons" },
    ],
    priceLabel: POA_LABEL,
  },
  {
    range: "golden",
    modelName: "G380",
    heroImage: "/boats/G380.png",
    positioning:
      "Timeless and valued — a lightweight, elegant yacht tender.",
    specs: [
      { value: "3.60 m", label: "LOA" },
      { value: "1.86 m", label: "Beam" },
      { value: "40 hp", label: "Max" },
      { value: "5", label: "Persons" },
    ],
    priceLabel: POA_LABEL,
  },
  {
    range: "golden",
    modelName: "G380N",
    heroImage: "/boats/G380N.png",
    positioning:
      "Updated and neat — the mid-size tender, rebuilt and refined.",
    specs: [
      { value: "3.60 m", label: "LOA" },
      { value: "1.85 m", label: "Beam" },
      { value: "50 hp", label: "Max" },
      { value: "5", label: "Persons" },
    ],
    priceLabel: POA_LABEL,
  },
  {
    range: "golden",
    modelName: "G420",
    heroImage: "/boats/G420.png",
    positioning:
      "Transfer and more — an agile tender that also rides the waves.",
    specs: [
      { value: "4.20 m", label: "LOA" },
      { value: "1.98 m", label: "Beam" },
      { value: "60 hp", label: "Max" },
      { value: "6", label: "Persons" },
    ],
    priceLabel: POA_LABEL,
  },
  {
    range: "golden",
    modelName: "G500",
    heroImage: "/boats/G500.png",
    positioning:
      "Versatile and luxury — a spacious super-yacht tender for family cruising.",
    specs: [
      { value: "4.95 m", label: "LOA" },
      { value: "2.30 m", label: "Beam" },
      { value: "115 hp", label: "Max" },
      { value: "9", label: "Persons" },
    ],
    priceLabel: POA_LABEL,
  },
  {
    range: "golden",
    modelName: "G580",
    heroImage: "/boats/G580.png",
    positioning:
      "Smart and cozy — a compact centre console for solo and small-family use.",
    specs: [
      { value: "5.85 m", label: "LOA" },
      { value: "2.45 m", label: "Beam" },
      { value: "150 hp", label: "Max" },
      { value: "11", label: "Persons" },
    ],
    priceLabel: POA_LABEL,
  },
  {
    range: "golden",
    modelName: "G650",
    heroImage: "/boats/G650.png",
    positioning:
      "Famous and finest — our legendary midsize recreational cruiser.",
    specs: [
      { value: "6.50 m", label: "LOA" },
      { value: "2.65 m", label: "Beam" },
      { value: "200 hp", label: "Max" },
      { value: "12", label: "Persons" },
    ],
    priceLabel: POA_LABEL,
  },
  {
    range: "golden",
    modelName: "G680",
    heroImage: "/boats/G680.png",
    positioning:
      "Fresh and clever — a modern midsize centre-console day cruiser.",
    specs: [
      { value: "6.80 m", label: "LOA" },
      { value: "2.64 m", label: "Beam" },
      { value: "200 hp", label: "Max" },
      { value: "12", label: "Persons" },
    ],
    priceLabel: POA_LABEL,
  },
  {
    range: "golden",
    modelName: "G750",
    heroImage: "/boats/G750.png",
    positioning:
      "Style and comfort — a large offshore centre-console cruiser.",
    specs: [
      { value: "7.30 m", label: "LOA" },
      { value: "2.85 m", label: "Beam" },
      { value: "300 hp", label: "Max" },
      { value: "10 / 14", label: "Persons" },
    ],
    priceLabel: POA_LABEL,
  },
  {
    range: "golden",
    modelName: "G850",
    heroImage: "/boats/G850.png",
    positioning:
      "Size and power — an offshore cruiser with optional twin engines.",
    specs: [
      { value: "8.50 m", label: "LOA" },
      { value: "2.95 m", label: "Beam" },
      { value: "400 hp", label: "Max" },
      { value: "12 / 16", label: "Persons" },
    ],
    priceLabel: POA_LABEL,
  },
  {
    range: "golden",
    modelName: "G980",
    heroImage: "/boats/G980.png",
    positioning:
      "Crisp and major — our flagship 10m cabin RIB for overnighting.",
    specs: [
      { value: "10.00 m", label: "LOA" },
      { value: "3.40 m", label: "Beam" },
      { value: "700 hp", label: "Max" },
      { value: "12 / 18", label: "Persons" },
    ],
    priceLabel: POA_LABEL,
  },
]

export const goldenFeatures = [
  {
    image: "/details/hull.png",
    title: "Deep-V hull construction",
    copy: "A hand-laid deep-V hull cuts cleanly through chop and holds its line offshore, with grey hypalon tubes for reassuring stability at rest.",
  },
  {
    image: "/details/cabin.png",
    title: "Enclosed cabin comfort",
    copy: "An insulated wheelhouse with upholstered seating and a modern glass helm keeps the crew comfortable whatever the conditions.",
  },
  {
    image: "/details/deck.png",
    title: "Versatile deck layout",
    copy: "A teak-style cockpit converts from sociable seating to an open sunpad, with stowage worked in throughout.",
  },
]
