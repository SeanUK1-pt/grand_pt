import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import RangeBadge from "@/components/RangeBadge";
import SpecStrip from "@/components/SpecStrip";
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

// Placeholder feature blocks — replace copy and images when real content is available
const featureBlocks = [
  {
    id: "hull",
    heading: "Hull & structure",
    body: "Precision-formed fibreglass hull with integrated keel protection. Built to Grand's standard construction tolerances across every unit — not a hand-built variation.",
    image: null,
  },
  {
    id: "console",
    heading: "Console & helm",
    body: "Centrally positioned helm with protected instrumentation bay. Ergonomics laid out for extended passages, not just marina departures.",
    image: null,
  },
  {
    id: "deck",
    heading: "Deck & fittings",
    body: "Teak-effect non-slip deck surface throughout. Stainless grab rails at all standing positions. Anchor locker forward with manual windlass ready fitting.",
    image: null,
  },
];

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

      {/* ── Feature blocks ── */}
      <section aria-label="Features" className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 text-sm font-medium uppercase tracking-widest text-ink-subtle">
            Detail
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {featureBlocks.map((block) => (
              <div key={block.id} className="flex flex-col gap-4">
                {/* Placeholder image area */}
                <div className="aspect-[4/3] w-full rounded-xl bg-surface-tint" />
                <h3 className="text-base font-semibold text-ink">
                  {block.heading}
                </h3>
                <p className="text-sm leading-relaxed text-ink-subtle">
                  {block.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── More from the range ── */}
      {relatedModels.length > 0 && (
        <section
          aria-label={`More from ${range.name}`}
          className="bg-surface-muted py-20"
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
