import type { Spec } from "@/components/spec-strip"
import type { RangeKey } from "@/components/range-config"

export type Model = {
  range: RangeKey
  modelName: string
  heroImage: string
  positioning: string
  specs: Spec[]
  priceFrom: number
  priceLabel: string
}

/** Golden Line line-up (placeholder data for the layout previews). */
export const goldenModels: Model[] = [
  {
    range: "golden",
    modelName: "G420",
    heroImage: "/boats/golden-g420.png",
    positioning: "Compact luxury for day cruising with weekend comfort.",
    specs: [
      { value: "4.20 m", label: "LOA" },
      { value: "1.98 m", label: "Beam" },
      { value: "60 hp", label: "Max" },
    ],
    priceFrom: 52900,
    priceLabel: "Base specification, VAT included",
  },
  {
    range: "golden",
    modelName: "G540",
    heroImage: "/boats/golden-g540.png",
    positioning: "A wheelhouse cabin and sunpad for longer days afloat.",
    specs: [
      { value: "5.40 m", label: "LOA" },
      { value: "2.984 m", label: "Beam" },
      { value: "150 hp", label: "Max" },
    ],
    priceFrom: 68500,
    priceLabel: "Base specification, VAT included",
  },
  {
    range: "golden",
    modelName: "G680",
    heroImage: "/boats/golden.png",
    positioning:
      "The definitive Golden Line cruiser — an enclosed cabin and offshore poise without compromise.",
    specs: [
      { value: "6.80 m", label: "LOA" },
      { value: "2.55 m", label: "Beam" },
      { value: "300 hp", label: "Max" },
    ],
    priceFrom: 89400,
    priceLabel: "Base specification, VAT included",
  },
  {
    range: "golden",
    modelName: "G750",
    heroImage: "/boats/golden-g750.png",
    positioning: "The flagship — twin outboards and full liveaboard luxury.",
    specs: [
      { value: "7.50 m", label: "LOA" },
      { value: "2.80 m", label: "Beam" },
      { value: "500 hp", label: "Max" },
    ],
    priceFrom: 124000,
    priceLabel: "Base specification, VAT included",
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
