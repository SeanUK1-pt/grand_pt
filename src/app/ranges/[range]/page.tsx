import { notFound } from "next/navigation";
import RangeHero from "@/components/RangeHero";
import ModelCard from "@/components/ModelCard";
import { ranges, getRangeBySlug } from "@/data/ranges";
import { getModelsByRange } from "@/data/models";
import type { Range } from "@/data/ranges";

type Props = {
  params: Promise<{ range: string }>;
};

export async function generateStaticParams() {
  return ranges.map((r) => ({ range: r.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { range: rangeSlug } = await params;
  const range = getRangeBySlug(rangeSlug as Range["slug"]);
  if (!range) return {};
  return {
    title: `${range.name} — Grand Boats Portugal`,
    description: range.tagline,
  };
}

export default async function RangePage({ params }: Props) {
  const { range: rangeSlug } = await params;
  const range = getRangeBySlug(rangeSlug as Range["slug"]);

  if (!range) notFound();

  const models = getModelsByRange(range.slug);

  return (
    <>
      <RangeHero
        accent={range.accent}
        name={range.name}
        tagline={range.tagline}
        voiceLine={range.voiceLine}
      />

      {/* Philosophy */}
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-lg leading-relaxed text-ink-muted md:text-xl">
            {range.philosophy}
          </p>
        </div>
      </section>

      {/* Model grid */}
      <section aria-label={`${range.name} models`} className="bg-surface pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-10 text-sm font-medium uppercase tracking-widest text-ink-subtle">
            Models
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {models.map((model) => (
              <ModelCard key={model.slug} model={model} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
