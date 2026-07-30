import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import RangeBadge from "@/components/RangeBadge";
import SpecStrip from "@/components/SpecStrip";
import SpecSheet from "@/components/SpecSheet";
import FeatureList from "@/components/FeatureList";
import EquipmentList from "@/components/EquipmentList";
import Gallery from "@/components/Gallery";
import LayoutTiles from "@/components/LayoutTiles";
import ModelCard from "@/components/ModelCard";
import { getRangeBySlug } from "@/data/ranges";
import { models, getModelBySlug, getModelsByRange } from "@/data/models";
import { resolveText } from "@/data/localized-text";
import { translatePriceLabel } from "@/data/spec-labels";
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
    title: `${model.name} — Grand Boats Portugal`,
    description: resolveText(model.positioning, locale),
  };
}

export default async function ModelPage({ params }: Props) {
  const { locale, range: rangeSlug, model: modelSlug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "modelPage" });
  const tLayout = await getTranslations({ locale, namespace: "layoutTiles" });

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
  const standardFeatures = model.standardFeatures.map((f) => resolveText(f, locale));
  const optionalEquipment = model.optionalEquipment.map((f) => resolveText(f, locale));

  // Layouted models (currently D600) get each layout's own full detail
  // section further down the page instead of one generic spec/equipment/
  // features block — see the `hasLayouts` render branch below.
  const layoutDetails = (model.layouts ?? [])
    .filter((l) => l.positioning && l.fullSpecs && l.features)
    .map((l) => ({
      name: l.name,
      image: l.image,
      positioning: resolveText(l.positioning!, locale),
      fullSpecs: l.fullSpecs!,
      standardFeatures: (l.standardFeatures ?? []).map((f) => resolveText(f, locale)),
      optionalEquipment: (l.optionalEquipment ?? []).map((f) => resolveText(f, locale)),
      features: l.features!.map((f) => ({
        title: resolveText(f.title, locale),
        description: resolveText(f.description, locale),
        image: f.image,
      })),
      enquireHref: `/ranges/${rangeSlug}/enquire/?bm=${model.slug}&layout=${encodeURIComponent(l.name)}`,
    }));

  // Both branches above alternate surface/surface-muted per section; whichever
  // one renders, "More from the range" needs to continue that alternation
  // rather than assume a fixed background.
  const lastSectionWasMuted =
    hasLayouts && layoutDetails.length > 0 ? layoutDetails.length % 2 === 0 : true;

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
                {priceFormatted}
              </span>
              {model.priceLabel && (
                <span className="text-caption text-ink-text-muted">{translatePriceLabel(model.priceLabel, locale)}</span>
              )}
            </div>
          )}

          {/* Primary CTA */}
          <div className={showPrice ? "mt-8" : "mt-10"}>
            <Link
              href={enquireHref}
              className="inline-flex items-center rounded-md bg-pop px-6 py-3 text-body-sm font-semibold text-pop-contrast transition-opacity hover:opacity-90"
            >
              {t("enquireAboutModel", { name: model.name })}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Gallery — extra photos beyond the hero, spot-checked same as
            `image` (see the gallery field's comment in models.ts) ── */}
      {model.gallery && model.gallery.length > 0 && (
        <section aria-label="Gallery" className="bg-surface py-20">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="mb-12 text-caption font-semibold uppercase tracking-[0.16em] text-brand">
              {t("gallery")}
            </h2>
            <Gallery images={model.gallery} alt={model.name} />
          </div>
        </section>
      )}

      {/* ── Layouts — only rendered when the model has multiple deck layouts
            (currently Silver Line); LayoutTiles itself also no-ops on an
            empty array, this guard just avoids invoking it needlessly ── */}
      {model.layouts && model.layouts.length > 0 && (
        <section aria-label="Layouts" className="bg-surface-muted py-20">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="mb-12 text-caption font-semibold uppercase tracking-[0.16em] text-brand">
              {t("chooseALayout")}
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

      {hasLayouts && layoutDetails.length > 0 ? (
        /* ── Per-layout detail — each layout gets its own full spec/
              equipment/features section, one after another, rather than
              one generic block that could only speak for one layout. ── */
        layoutDetails.map((layout, i) => (
          <section
            key={layout.name}
            aria-label={`${layout.name} details`}
            className={i % 2 === 0 ? "bg-surface py-20" : "bg-surface-muted py-20"}
          >
            <div className="mx-auto max-w-7xl px-6">
              <div className="mb-10 flex flex-col gap-8 lg:flex-row lg:items-center">
                {layout.image && (
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-surface-sunken lg:w-2/5 lg:shrink-0">
                    <Image
                      src={layout.image}
                      alt={`${model.name} ${layout.name} — ${layout.positioning}`}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 40vw, 100vw"
                    />
                  </div>
                )}
                <div>
                  <h2 className="text-headline font-semibold tracking-tight text-text-strong">
                    {model.name} {layout.name}
                  </h2>
                  <p className="mt-4 max-w-xl text-lead leading-relaxed text-text-muted text-pretty">
                    {layout.positioning}
                  </p>
                  <div className="mt-6">
                    <Link
                      href={layout.enquireHref}
                      className="inline-flex items-center rounded-md bg-pop px-6 py-3 text-body-sm font-semibold text-pop-contrast transition-opacity hover:opacity-90"
                    >
                      {tLayout("enquireAbout", { name: layout.name })}
                    </Link>
                  </div>
                </div>
              </div>

              <h3 className="mb-8 text-caption font-semibold uppercase tracking-[0.16em] text-brand">
                {t("fullSpecification")}
              </h3>
              <SpecSheet specs={layout.fullSpecs} accent={model.range} />

              <h3 className="mb-8 mt-16 text-caption font-semibold uppercase tracking-[0.16em] text-brand">
                {t("equipment")}
              </h3>
              <EquipmentList
                standard={layout.standardFeatures}
                optional={layout.optionalEquipment}
                standardLabel={t("standardFeatures")}
                optionalLabel={t("optionalEquipment")}
                accent={model.range}
              />

              <h3 className="mb-8 mt-16 text-caption font-semibold uppercase tracking-[0.16em] text-brand">
                {t("features")}
              </h3>
              <FeatureList features={layout.features} accent={model.range} />
            </div>
          </section>
        ))
      ) : (
        <>
          {/* ── Full specification — comprehensive detail, distinct from the
                quick-glance SpecStrip above ── */}
          <section aria-label="Full specification" className="bg-surface-muted py-20">
            <div className="mx-auto max-w-7xl px-6">
              <h2 className="mb-12 text-caption font-semibold uppercase tracking-[0.16em] text-brand">
                {t("fullSpecification")}
              </h2>
              <SpecSheet specs={model.fullSpecs} accent={model.range} />
            </div>
          </section>

          {/* ── Equipment — literal standard/optional checklists from the
                manufacturer spec sheet, distinct from the curated Features
                below ── */}
          <section aria-label="Equipment" className="bg-surface py-20">
            <div className="mx-auto max-w-7xl px-6">
              <h2 className="mb-12 text-caption font-semibold uppercase tracking-[0.16em] text-brand">
                {t("equipment")}
              </h2>
              <EquipmentList
                standard={standardFeatures}
                optional={optionalEquipment}
                standardLabel={t("standardFeatures")}
                optionalLabel={t("optionalEquipment")}
                accent={model.range}
              />
            </div>
          </section>

          {/* ── Features — equipment/layout highlights, not specs ── */}
          <section aria-label="Features" className="bg-surface-muted py-20">
            <div className="mx-auto max-w-7xl px-6">
              <h2 className="mb-12 text-caption font-semibold uppercase tracking-[0.16em] text-brand">
                {t("features")}
              </h2>
              <FeatureList features={features} accent={model.range} />
            </div>
          </section>
        </>
      )}

      {/* ── More from the range ── */}
      {relatedModels.length > 0 && (
        <section
          aria-label={`More from ${range.name}`}
          className={lastSectionWasMuted ? "bg-surface py-20" : "bg-surface-muted py-20"}
        >
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="mb-10 text-caption font-semibold uppercase tracking-[0.16em] text-brand">
              {t("moreFromRange", { range: range.name })}
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
            {t("closingQuestion", { name: model.name })}
          </p>
          <p className="mt-4 text-body text-ink-text-muted">
            {t("closingBody")}
          </p>
          <Link
            href={enquireHref}
            className="mt-8 inline-flex items-center rounded-md bg-pop px-6 py-3 text-body-sm font-semibold text-pop-contrast transition-opacity hover:opacity-90"
          >
            {t("getInTouch")}
          </Link>
        </div>
      </section>
    </>
  );
}
