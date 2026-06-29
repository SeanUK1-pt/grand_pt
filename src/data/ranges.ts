export type RangeAccent = "golden" | "silver" | "drive";

export type Range = {
  slug: "golden-line" | "silver-line" | "drive-line";
  accent: RangeAccent;
  name: string;
  tagline: string;
  voiceLine: string;
  philosophy: string;
};

export const ranges: Range[] = [
  {
    slug: "golden-line",
    accent: "golden",
    name: "Golden Line",
    tagline: "The range built for living aboard.",
    voiceLine: "Built to be lived aboard.",
    philosophy:
      "The Golden Line is Grand's flagship range — larger hulls, superior fit-out, and the kind of space that makes a day on the water feel like a weekend. Built for owners who want a boat that keeps up with their ambitions, not one they have to compromise around.",
  },
  {
    slug: "silver-line",
    accent: "silver",
    name: "Silver Line",
    tagline: "The everyday boat that earns its berth.",
    voiceLine: "The boat that says yes to a normal Tuesday.",
    philosophy:
      "The Silver Line is the workhorse of the Grand range — versatile, well-specced, and sized for the kind of spontaneous trips that make boat ownership worthwhile. Not a statement piece; a tool you'll actually use.",
  },
  {
    slug: "drive-line",
    accent: "drive",
    name: "Drive Line",
    tagline: "Performance without the apology.",
    voiceLine: "Deep-V, raised tube, no apology.",
    philosophy:
      "The Drive Line is built for speed and open water. Deep-V hulls, raised inflatable tubes, and a no-compromise approach to performance. If you're buying a RIB because you want to go fast on the water, start here.",
  },
];

export function getRangeBySlug(slug: Range["slug"]): Range | undefined {
  return ranges.find((r) => r.slug === slug);
}
