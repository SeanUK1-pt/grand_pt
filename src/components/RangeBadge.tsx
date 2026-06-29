import type { RangeAccent } from "@/data/ranges";

type Props = {
  accent: RangeAccent;
  variant: "solid" | "soft";
  children: React.ReactNode;
};

// Soft: matches ModelCard's existing badge pattern exactly
const soft: Record<RangeAccent, string> = {
  golden: "bg-golden-muted text-golden border-golden/30",
  silver: "bg-silver-muted text-silver border-silver/30",
  drive:  "bg-drive-muted  text-drive  border-drive/30",
};

// Solid: accent background. golden (#C49A2A) is mid-tone — text-ink passes
// contrast; silver (#8FA3AE) and drive (#D94F1E) are dark enough for text-surface.
const solid: Record<RangeAccent, string> = {
  golden: "bg-golden  text-ink     border-golden",
  silver: "bg-silver  text-surface border-silver",
  drive:  "bg-drive   text-surface border-drive",
};

export default function RangeBadge({ accent, variant, children }: Props) {
  const colours = variant === "solid" ? solid[accent] : soft[accent];
  return (
    <span
      className={`inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide ${colours}`}
    >
      {children}
    </span>
  );
}
