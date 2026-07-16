import type { RangeAccent } from "@/data/ranges";

type Props = {
  accent: RangeAccent;
  // "solid" reads bolder (heavier weight, wider tracking) for standalone use
  // above a hero title; "soft" is the quieter version for compact contexts
  // like a card. Neither renders a pill/chip — just a colour-coordinated
  // spaced-out label, no container.
  variant: "solid" | "soft";
  children: React.ReactNode;
};

const accentText: Record<RangeAccent, string> = {
  golden: "text-golden",
  silver: "text-silver",
  drive:  "text-drive",
};

export default function RangeBadge({ accent, variant, children }: Props) {
  const weight = variant === "solid" ? "font-bold tracking-[0.22em]" : "font-semibold tracking-[0.16em]";
  return (
    <span
      className={`inline-block text-caption uppercase ${weight} ${accentText[accent]}`}
    >
      {children}
    </span>
  );
}
