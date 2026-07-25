import Image from "next/image";
import type { RangeAccent } from "@/data/ranges";

type Props = {
  accent: RangeAccent;
  name: string;
  tagline: string;
  voiceLine: string;
  image: string;
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

export default function RangeHero({ accent, name, tagline, voiceLine, image }: Props) {
  return (
    <section className="relative flex min-h-[500px] items-end overflow-hidden bg-ink sm:min-h-[560px]">
      <Image
        src={image}
        alt={name}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      {/* Bottom-to-top scrim — same tuning as RangeTiles' text-over-photo
          pattern (proven for legibility of overlaid text, unlike the model
          page hero's edge-only scrim, which has no text over the photo) */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.35)_60%,rgba(0,0,0,0.1)_100%)]"
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 pt-32">
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
