import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import RangeBadge from "@/components/RangeBadge";
import SpecStrip from "@/components/SpecStrip";
import SpecSheet from "@/components/SpecSheet";
import FeatureList from "@/components/FeatureList";
import ModelCard from "@/components/ModelCard";
import { ranges, getRangeBySlug } from "@/data/ranges";
import { models, getModelBySlug, getModelsByRange } from "@/data/models";
import type { Range } from "@/data/ranges";

type Props = {
  params: Promise<{ range: string; model: string }>;
};

export async function generateStaticParams() {
  return models.map((m) => ({
    range: m.rangeSlug,
    model: m.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { range: rangeSlug, model: modelSlug } = await params;
  const model = getModelBySlug(modelSlug);
  if (!model || model.rangeSlug !== rangeSlug) return {};
  return {
    title: `${model.name} — Grand Boats Portugal`,
    description: model.positioning,
  };
}

export default async function ModelPage({ params }: Props) {
  const { range: rangeSlug, model: modelSlug } = await params;

  // Validate both slugs and that the model belongs to the stated range
  const range = getRangeBySlug(rangeSlug as Range["slug"]);
  const model = getModelBySlug(modelSlug);
  if (!range || !model || model.rangeSlug !== rangeSlug) notFound();

  const relatedModels = getModelsByRange(range.slug).filter(
    (m) => m.slug !== model.slug
  );

  const enquireHref = `/ranges/${rangeSlug}/enquire/?bm=${model.slug}`;
  const priceFormatted = new Intl.NumberFormat("en-PT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(model.priceFrom);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-[70vh] bg-grand-blue pt-24">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src={model.image}
            alt={`${model.name} — ${model.positioning}`}
            fill
            className="object-cover opacity-40"
            priority
            sizes="100vw"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-grand-blue via-grand-blue/60 to-transparent"
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-16">
          <RangeBadge accent={model.range} variant="soft">
            {range.name}
          </RangeBadge>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-surface md:text-6xl lg:text-7xl">
            {model.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-surface/70 md:text-xl">
            {model.positioning}
          </p>
        </div>
      </section>

      {/* ── Specs + price ── */}
      <section className="bg-grand-blue pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="border-t border-surface/10 pt-10">
            <SpecStrip specs={model.specs} surface="dark" />
          </div>

          {/* Price — same hierarchy as ModelCard name/tagline: xl semibold + sm subtle */}
          <div className="mt-10 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
            <span className="text-xl font-semibold text-surface">
              From {priceFormatted}
            </span>
            <span className="text-sm text-surface/50">{model.priceLabel}</span>
          </div>

          {/* Primary CTA */}
          <div className="mt-8">
            <Link
              href={enquireHref}
              className="inline-flex items-center rounded-full bg-lime px-6 py-3 text-sm font-semibold text-ink transition-opacity hover:opacity-90"
            >
              Enquire about the {model.name}
            </Link>
            {/* TODO: confirm bm param matches builder integration spec — exact param
                contract depends on the separate 3D-builder integration work */}
          </div>
        </div>
      </section>

      {/* ── Full specification — comprehensive detail, distinct from the
            quick-glance SpecStrip above ── */}
      <section aria-label="Full specification" className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 text-sm font-medium uppercase tracking-widest text-ink-subtle">
            Full specification
          </h2>
          <SpecSheet specs={model.fullSpecs} accent={model.range} />
        </div>
      </section>

      {/* ── Features — equipment/layout highlights, not specs ── */}
      <section aria-label="Features" className="bg-surface-muted py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 text-sm font-medium uppercase tracking-widest text-ink-subtle">
            Features
          </h2>
          <FeatureList features={model.features} accent={model.range} />
        </div>
      </section>

      {/* ── More from the range ── */}
      {relatedModels.length > 0 && (
        <section
          aria-label={`More from ${range.name}`}
          className="bg-surface py-20"
        >
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="mb-10 text-sm font-medium uppercase tracking-widest text-ink-subtle">
              More from the {range.name}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedModels.map((m) => (
                <ModelCard key={m.slug} model={m} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Closing CTA ── */}
      <section className="bg-grand-blue py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-2xl font-semibold text-surface md:text-3xl">
            Have a question? Talk to us about the {model.name}.
          </p>
          <p className="mt-4 text-base text-surface/60">
            The team at Algarve Boat Group can walk you through specifications,
            availability, and configuration options.
          </p>
          <Link
            href={enquireHref}
            className="mt-8 inline-flex items-center rounded-full bg-lime px-6 py-3 text-sm font-semibold text-ink transition-opacity hover:opacity-90"
          >
            Get in touch →
          </Link>
        </div>
      </section>
    </>
  );
}
