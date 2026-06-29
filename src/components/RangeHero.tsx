import type { RangeAccent } from "@/data/ranges";

type Props = {
  accent: RangeAccent;
  name: string;
  tagline: string;
  voiceLine: string;
};

// Thin rule in the range accent colour — detail, not wash
const accentRule: Record<RangeAccent, string> = {
  golden: "bg-golden",
  silver: "bg-silver",
  drive:  "bg-drive",
};

const accentText: Record<RangeAccent, string> = {
  golden: "text-golden",
  silver: "text-silver",
  drive:  "text-drive",
};

export default function RangeHero({ accent, name, tagline, voiceLine }: Props) {
  return (
    <section className="bg-grand-blue pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Thin accent rule above the name */}
        <div className={`h-0.5 w-12 mb-8 ${accentRule[accent]}`} aria-hidden />

        <h1 className="text-5xl font-semibold leading-tight tracking-tight text-surface md:text-6xl lg:text-7xl">
          {name}
        </h1>

        {/* voiceLine — short bold standout in accent colour */}
        <p className={`mt-6 text-xl font-semibold leading-snug ${accentText[accent]} md:text-2xl`}>
          {voiceLine}
        </p>

        {/* tagline — quieter, below */}
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-surface/60 md:text-lg">
          {tagline}
        </p>
      </div>
    </section>
  );
}
