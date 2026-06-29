import RangeBadge from "@/components/RangeBadge";
import SpecStrip from "@/components/SpecStrip";
import RangeHero from "@/components/RangeHero";
import { ranges } from "@/data/ranges";
import type { RangeAccent } from "@/data/ranges";

const accents: RangeAccent[] = ["golden", "silver", "drive"];

const demoSpecs = [
  { value: "6.80m", label: "LOA" },
  { value: "2.90m", label: "Beam" },
  { value: "200 hp", label: "Max power" },
];

export default function DevPreview() {
  return (
    <div className="bg-surface-muted">

      {/* ── RangeBadge ── */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="mb-8 text-xs font-semibold uppercase tracking-widest text-ink-subtle">
          RangeBadge
        </h2>
        <div className="flex flex-wrap gap-6 items-start">
          {accents.map((accent) => (
            <div key={accent} className="flex flex-col gap-3">
              <RangeBadge accent={accent} variant="soft">
                {accent.charAt(0).toUpperCase() + accent.slice(1)} Line — soft
              </RangeBadge>
              <RangeBadge accent={accent} variant="solid">
                {accent.charAt(0).toUpperCase() + accent.slice(1)} Line — solid
              </RangeBadge>
            </div>
          ))}
        </div>
      </section>

      {/* ── SpecStrip — light surface ── */}
      <section className="mx-auto max-w-5xl px-6 pb-16">
        <h2 className="mb-8 text-xs font-semibold uppercase tracking-widest text-ink-subtle">
          SpecStrip — light
        </h2>
        <div className="rounded-2xl bg-surface p-8 shadow-sm">
          <SpecStrip specs={demoSpecs} surface="light" />
        </div>
      </section>

      {/* ── SpecStrip — dark surface ── */}
      <section className="mx-auto max-w-5xl px-6 pb-16">
        <h2 className="mb-8 text-xs font-semibold uppercase tracking-widest text-ink-subtle">
          SpecStrip — dark
        </h2>
        <div className="rounded-2xl bg-grand-blue p-8">
          <SpecStrip specs={demoSpecs} surface="dark" />
        </div>
      </section>

      {/* ── RangeHero — all three accents ── */}
      <section className="pb-4">
        <h2 className="mx-auto max-w-5xl px-6 pb-8 pt-4 text-xs font-semibold uppercase tracking-widest text-ink-subtle">
          RangeHero
        </h2>
        {ranges.map((range) => (
          <div key={range.slug} className="mb-2">
            <RangeHero
              accent={range.accent}
              name={range.name}
              tagline={range.tagline}
              voiceLine={range.voiceLine}
            />
          </div>
        ))}
      </section>

    </div>
  );
}
