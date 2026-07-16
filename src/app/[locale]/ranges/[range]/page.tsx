import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import RangeHero from "@/components/RangeHero";
import ModelCard from "@/components/ModelCard";
import { ranges, getRangeBySlug } from "@/data/ranges";
import { getModelsByRange } from "@/data/models";
import { resolveText } from "@/data/localized-text";
import type { Range } from "@/data/ranges";

type Props = {
  params: Promise<{ locale: string; range: string }>;
};

export async function generateStaticParams() {
  return ranges.map((r) => ({ range: r.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, range: rangeSlug } = await params;
  const range = getRangeBySlug(rangeSlug as Range["slug"]);
  if (!range) return {};
  return {
    title: `${range.name} — Algarve Boat Group`,
    description: resolveText(range.tagline, locale),
  };
}

export default async function RangePage({ params }: Props) {
  const { locale, range: rangeSlug } = await params;
  setRequestLocale(locale);

  const range = getRangeBySlug(rangeSlug as Range["slug"]);

  if (!range) notFound();

  const models = getModelsByRange(range.slug);

  return (
    <>
      <RangeHero
        accent={range.accent}
        name={range.name}
        tagline={resolveText(range.tagline, locale)}
        voiceLine={resolveText(range.voiceLine, locale)}
      />

      {/* Philosophy */}
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-lead leading-relaxed text-text-muted text-pretty">
            {resolveText(range.philosophy, locale)}
          </p>
        </div>
      </section>

      {/* Model grid */}
      <section aria-label={`${range.name} models`} className="bg-surface pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-10 text-caption font-semibold uppercase tracking-[0.16em] text-brand">
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
