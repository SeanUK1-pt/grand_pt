import type { RangeAccent } from "@/data/ranges";

type Props = {
  accent: RangeAccent;
  variant: "solid" | "soft";
  children: React.ReactNode;
};

// Soft: matches ModelCard's existing badge pattern exactly
const soft: Record<RangeAccent, string> = {
  golden: "bg-golden-soft text-golden border-golden/30",
  silver: "bg-silver-soft text-silver border-silver/30",
  drive:  "bg-drive-soft  text-drive  border-drive/30",
};

// Solid: accent background with the accent's own -contrast token, so the
// text colour always matches whatever contrast that accent's hex requires.
const solid: Record<RangeAccent, string> = {
  golden: "bg-golden text-golden-contrast border-golden",
  silver: "bg-silver text-silver-contrast border-silver",
  drive:  "bg-drive  text-drive-contrast  border-drive",
};

export default function RangeBadge({ accent, variant, children }: Props) {
  const colours = variant === "solid" ? solid[accent] : soft[accent];
  return (
    <span
      className={`inline-flex w-fit items-center rounded-full border px-2.5 py-1 text-caption font-semibold uppercase tracking-[0.12em] ${colours}`}
    >
      {children}
    </span>
  );
}
