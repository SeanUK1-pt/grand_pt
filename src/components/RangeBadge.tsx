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

const accentRule: Record<RangeAccent, string> = {
  golden: "bg-golden",
  silver: "bg-silver",
  drive:  "bg-drive",
};

export default function RangeBadge({ accent, variant, children }: Props) {
  const isSolid = variant === "solid";
  return (
    <span className="inline-flex flex-col items-start gap-2">
      <span className={`h-0.5 ${isSolid ? "w-10" : "w-6"} ${accentRule[accent]}`} aria-hidden />
      <span
        className={`uppercase ${accentText[accent]} ${
          isSolid
            ? "text-body font-bold tracking-[0.18em]"
            : "text-body-sm font-semibold tracking-[0.14em]"
        }`}
      >
        {children}
      </span>
    </span>
  );
}
