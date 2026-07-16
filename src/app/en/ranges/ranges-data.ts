import type { RangeKey } from "@/components/range-config"
import { goldenModels, type Model } from "@/app/golden-data"

export type RangeSlug = "golden-line" | "silver-line" | "drive-line"

export type RangeInfo = {
  slug: RangeSlug
  range: RangeKey
  /** Hero title, e.g. "The Golden Line" */
  title: string
  /** Hero supporting sentence */
  subtitle: string
  /** Short punchy Geist Sans tagline used in RangeHero */
  voiceLine: string
  /** Positioning label above the philosophy heading */
  eyebrow: string
  /** Philosophy heading */
  philosophyHeading: string
  /** Philosophy body paragraphs */
  philosophy: string[]
  /** Line-up for this range. Empty = "coming soon" state. */
  models: Model[]
}

export const rangesData: Record<RangeSlug, RangeInfo> = {
  "golden-line": {
    slug: "golden-line",
    range: "golden",
    title: "The Golden Line",
    subtitle:
      "Enclosed cabins, offshore poise and liveaboard comfort — our flagship range, ready to configure your way.",
    voiceLine: "Built to be lived aboard.",
    eyebrow: "Flagship range",
    philosophyHeading: "Where craftsmanship meets the open water",
    philosophy: [
      "The Golden Line is where Grand brings together its most refined engineering and its most generous accommodation. Each hull is hand-laid as a deep-V, tuned to hold its line offshore and stay composed when the sea turns up.",
      "Above the waterline, insulated wheelhouses, upholstered helm seating and versatile cockpits make longer passages genuinely comfortable — a range designed to be lived aboard, not just driven.",
    ],
    models: goldenModels,
  },
  "silver-line": {
    slug: "silver-line",
    range: "silver",
    title: "The Silver Line",
    subtitle:
      "Practical, dependable day boats built around real family use — easy to own, easy to enjoy.",
    voiceLine: "The boat that says yes to a normal Tuesday.",
    eyebrow: "Everyday range",
    philosophyHeading: "Dependable boats for real days on the water",
    philosophy: [
      "The Silver Line strips things back to what a family actually needs: a stable, forgiving hull, sensible seating and a layout that makes a spontaneous afternoon afloat effortless.",
      "Built to the same standards as the rest of the Grand catalogue, it trades flagship extravagance for practical, low-fuss ownership — the range you reach for on an ordinary Tuesday.",
    ],
    models: [],
  },
  "drive-line": {
    slug: "drive-line",
    range: "drive",
    title: "The Drive Line",
    subtitle:
      "Deep-V performance hulls and raised tubes for those who measure a day out in spray and speed.",
    voiceLine: "Deep-V, raised tube, no apology.",
    eyebrow: "Performance range",
    philosophyHeading: "Engineered for pace and control",
    philosophy: [
      "The Drive Line is Grand at its most focused: a sharper deep-V, raised inflatable tubes and outboard power sized to make the most of it. This is a range built to carve, not to cruise.",
      "Every choice serves handling — weight distribution, running surface and helm ergonomics are tuned so the boat feels planted at speed and predictable through the turn.",
    ],
    models: [],
  },
}

export const rangeSlugs = Object.keys(rangesData) as RangeSlug[]
