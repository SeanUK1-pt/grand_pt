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
    <section className="bg-ink pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Thin accent rule above the name */}
        <div className={`h-0.5 w-12 mb-8 ${accentRule[accent]}`} aria-hidden />

        <h1 className="text-headline font-semibold leading-tight tracking-tight text-balance text-ink-text sm:text-display">
          {name}
        </h1>

        {/* tagline — quieter description, sets up the voiceLine below */}
        <p className="mt-6 max-w-2xl text-lead leading-relaxed text-ink-text-muted text-pretty">
          {tagline}
        </p>

        {/* voiceLine — short bold standout in accent colour, closes the hero */}
        <p className={`mt-8 text-title font-bold leading-tight tracking-tight text-balance ${accentText[accent]}`}>
          {voiceLine}
        </p>
      </div>
    </section>
  );
}
