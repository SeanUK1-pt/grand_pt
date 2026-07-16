import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import RangeBadge from "@/components/RangeBadge";
import SpecStrip from "@/components/SpecStrip";
import SpecSheet from "@/components/SpecSheet";
import FeatureList from "@/components/FeatureList";
import LayoutTiles from "@/components/LayoutTiles";
import ModelCard from "@/components/ModelCard";
import { getRangeBySlug } from "@/data/ranges";
import { models, getModelBySlug, getModelsByRange } from "@/data/models";
import { resolveText } from "@/data/localized-text";
import type { Range } from "@/data/ranges";

type Props = {
  params: Promise<{ locale: string; range: string; model: string }>;
};

export async function generateStaticParams() {
  return models.map((m) => ({
    range: m.rangeSlug,
    model: m.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, range: rangeSlug, model: modelSlug } = await params;
  const model = getModelBySlug(modelSlug);
  if (!model || model.rangeSlug !== rangeSlug) return {};
  return {
    title: `${model.name} — Algarve Boat Group`,
    description: resolveText(model.positioning, locale),
  };
}

export default async function ModelPage({ params }: Props) {
  const { locale, range: rangeSlug, model: modelSlug } = await params;
  setRequestLocale(locale);

  // Validate both slugs and that the model belongs to the stated range
  const range = getRangeBySlug(rangeSlug as Range["slug"]);
  const model = getModelBySlug(modelSlug);
  if (!range || !model || model.rangeSlug !== rangeSlug) notFound();

  const relatedModels = getModelsByRange(range.slug).filter(
    (m) => m.slug !== model.slug
  );

  // When a model has layouts, each layout carries its own price (once real
  // pricing data lands) — showing a single top-level "From €X" alongside
  // per-tile prices risks the two figures disagreeing. Suppress the hero
  // price for layouted models; price only appears per-tile, where it's
  // unambiguous which configuration it refers to.
  const hasLayouts = !!model.layouts && model.layouts.length > 0;

  // No real pricing exists for any model yet (not scraped, not supplied) —
  // priceFrom is optional and omitted throughout the data layer. Show the
  // price block only when a real number is actually present.
  const showPrice = !hasLayouts && model.priceFrom !== undefined;

  const positioning = resolveText(model.positioning, locale);
  const features = model.features.map((f) => ({
    title: resolveText(f.title, locale),
    description: resolveText(f.description, locale),
    image: f.image,
  }));

  const enquireHref = `/ranges/${rangeSlug}/enquire/?bm=${model.slug}`;
  const priceFormatted =
    model.priceFrom !== undefined
      ? new Intl.NumberFormat("en-PT", {
          style: "currency",
          currency: "EUR",
          maximumFractionDigits: 0,
        }).format(model.priceFrom)
      : null;

  return (
    <>
      {/* ── Hero image — purely visual, no text overlay. Aspect-ratio driven
            height (not min-h) so the box never collapses even though the
            Image is `fill` and contributes no intrinsic height itself. ── */}
      <section className="relative aspect-[16/9] w-full bg-ink md:aspect-[21/9]">
        <Image
          src={model.image}
          alt={`${model.name} — ${positioning}`}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Subtle scrim — just enough for legibility of anything crossing the
            bottom edge, not a colour wash over the photo */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"
        />
      </section>

      {/* ── Badge/name/positioning + specs + price — all in normal flow,
            below the photo, doing the information work the photo doesn't ── */}
      <section className="bg-ink pb-16 pt-12">
        <div className="mx-auto max-w-7xl px-6">
          <RangeBadge accent={model.range} variant="solid">
            {range.name}
          </RangeBadge>
          <h1 className="mt-4 text-headline font-semibold tracking-tight text-balance text-ink-text sm:text-display">
            {model.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lead leading-relaxed text-ink-text-muted text-pretty">
            {positioning}
          </p>

          <div className="mt-10 border-t border-ink-line pt-10">
            <SpecStrip specs={model.specs} surface="dark" />
          </div>

          {/* Price — same hierarchy as ModelCard name/tagline: xl semibold + sm subtle.
              Suppressed for layouted models and whenever no real price exists. */}
          {showPrice && (
            <div className="mt-10 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
              <span className="text-lead font-semibold tracking-tight text-ink-text">
                From {priceFormatted}
              </span>
              {model.priceLabel && (
                <span className="text-caption text-ink-text-muted">{model.priceLabel}</span>
              )}
            </div>
          )}

          {/* Primary CTA */}
          <div className={showPrice ? "mt-8" : "mt-10"}>
            <Link
              href={enquireHref}
              className="inline-flex items-center rounded-md bg-pop px-6 py-3 text-body-sm font-semibold text-pop-contrast transition-opacity hover:opacity-90"
            >
              Enquire about the {model.name}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Layouts — only rendered when the model has multiple deck layouts
            (currently Silver Line); LayoutTiles itself also no-ops on an
            empty array, this guard just avoids invoking it needlessly ── */}
      {model.layouts && model.layouts.length > 0 && (
        <section aria-label="Layouts" className="bg-surface-muted py-20">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="mb-12 text-caption font-semibold uppercase tracking-[0.16em] text-brand">
              Choose a layout
            </h2>
            <LayoutTiles
              layouts={model.layouts}
              accent={model.range}
              modelSlug={model.slug}
              rangeSlug={rangeSlug}
            />
          </div>
        </section>
      )}

      {/* ── Full specification — comprehensive detail, distinct from the
            quick-glance SpecStrip above ── */}
      <section aria-label="Full specification" className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 text-caption font-semibold uppercase tracking-[0.16em] text-brand">
            Full specification
          </h2>
          <SpecSheet specs={model.fullSpecs} accent={model.range} />
        </div>
      </section>

      {/* ── Features — equipment/layout highlights, not specs ── */}
      <section aria-label="Features" className="bg-surface-muted py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 text-caption font-semibold uppercase tracking-[0.16em] text-brand">
            Features
          </h2>
          <FeatureList features={features} accent={model.range} />
        </div>
      </section>

      {/* ── More from the range ── */}
      {relatedModels.length > 0 && (
        <section
          aria-label={`More from ${range.name}`}
          className="bg-surface py-20"
        >
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="mb-10 text-caption font-semibold uppercase tracking-[0.16em] text-brand">
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
      <section className="bg-ink py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-headline font-semibold leading-tight tracking-tight text-balance text-ink-text">
            Have a question? Talk to us about the {model.name}.
          </p>
          <p className="mt-4 text-body text-ink-text-muted">
            The team at Algarve Boat Group can walk you through specifications,
            availability, and configuration options.
          </p>
          <Link
            href={enquireHref}
            className="mt-8 inline-flex items-center rounded-md bg-pop px-6 py-3 text-body-sm font-semibold text-pop-contrast transition-opacity hover:opacity-90"
          >
            Get in touch →
          </Link>
        </div>
      </section>
    </>
  );
}
