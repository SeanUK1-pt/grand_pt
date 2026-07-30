import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import RangeBadge from "@/components/RangeBadge";
import SpecStrip from "@/components/SpecStrip";
import SpecSheet from "@/components/SpecSheet";
import FeatureList from "@/components/FeatureList";
import EquipmentList from "@/components/EquipmentList";
import Gallery from "@/components/Gallery";
import HeroImage from "@/components/HeroImage";
import PhotoLightboxProvider from "@/components/PhotoLightbox";
import LayoutTiles from "@/components/LayoutTiles";
import ModelCard from "@/components/ModelCard";
import { getRangeBySlug } from "@/data/ranges";
import { models, getModelBySlug, getModelsByRange } from "@/data/models";
import { resolveText } from "@/data/localized-text";
import { translatePriceLabel } from "@/data/spec-labels";
import type { Range } from "@/data/ranges";
import Image from "next/image";

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

  // Hero + gallery, in lightbox paging order — hero is always index 0.
  const galleryImages = model.gallery ?? [];
  const allPhotos = [model.image, ...galleryImages];
  const hasGallery = galleryImages.length > 0;

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

  const enquireHref = `/ranges/${rangeSlug}/enquire/?bm=${model.slug}`;
  const priceFormatted =
    model.priceFrom !== undefined
      ? new Intl.NumberFormat("en-PT", {
          style: "currency",
          currency: "EUR",
          maximumFractionDigits: 0,
        }).format(model.priceFrom)
      : null;

  // Content bands (everything between the intro and "More from the range")
  // alternate surface/surface-muted regardless of which sections actually
  // render for a given model — a running counter beats hardcoding per
  // section, since Layouts/Gallery/per-layout counts all vary.
  let bandIndex = 0;
  const nextBand = () => (bandIndex++ % 2 === 0 ? "bg-surface py-20" : "bg-surface-muted py-20");

  // Quick-jump nav — only lists sections that actually render for this model.
  const quickLinks = [
    hasLayouts && { href: "#layouts", label: t("chooseALayout") },
    { href: "#features", label: t("features") },
    { href: "#full-specification", label: t("fullSpecification") },
    { href: "#equipment", label: t("equipment") },
    hasGallery && { href: "#gallery", label: t("gallery") },
  ].filter((l): l is { href: string; label: string } => !!l);

  return (
    <PhotoLightboxProvider>
      {/* ── Quick-jump nav — sits between the fixed site nav and the hero,
            so it's visible before scrolling rather than buried below the
            intro. pt-20 clears the fixed Nav (~64-72px); plain in-page
            anchors, no scroll tracking. ── */}
      {quickLinks.length > 0 && (
        <nav aria-label="Page sections" className="bg-ink pb-3 pt-20">
          <div className="mx-auto max-w-7xl px-6">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-body-sm font-medium text-ink-text-muted transition-colors hover:text-ink-text"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}

      {/* ── Hero image — click to open the lightbox. Aspect-ratio driven
            height (not min-h) so the box never collapses even though the
            Image is `fill` and contributes no intrinsic height itself. ── */}
      <HeroImage images={allPhotos} alt={`${model.name} — ${positioning}`} />

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

      {/* ── Layouts — only rendered when the model has multiple deck layouts
            (currently Silver Line); LayoutTiles itself also no-ops on an
            empty array, this guard just avoids invoking it needlessly ── */}
      {model.layouts && model.layouts.length > 0 && (
        <section id="layouts" aria-label="Layouts" className={`scroll-mt-24 ${nextBand()}`}>
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
              one generic block that could only speak for one layout.
              Characteristics (Features) lead, then spec, then equipment. ── */
        layoutDetails.map((layout, i) => (
          <section
            key={layout.name}
            id={i === 0 ? "features" : undefined}
            aria-label={`${layout.name} details`}
            className={`scroll-mt-24 ${nextBand()}`}
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
                {t("features")}
              </h3>
              <FeatureList features={layout.features} accent={model.range} />

              <h3
                id={i === 0 ? "full-specification" : undefined}
                className="mb-8 mt-16 scroll-mt-24 text-caption font-semibold uppercase tracking-[0.16em] text-brand"
              >
                {t("fullSpecification")}
              </h3>
              <SpecSheet specs={layout.fullSpecs} accent={model.range} />

              <h3
                id={i === 0 ? "equipment" : undefined}
                className="mb-8 mt-16 scroll-mt-24 text-caption font-semibold uppercase tracking-[0.16em] text-brand"
              >
                {t("equipment")}
              </h3>
              <EquipmentList
                standard={layout.standardFeatures}
                optional={layout.optionalEquipment}
                standardLabel={t("standardFeatures")}
                optionalLabel={t("optionalEquipment")}
                accent={model.range}
              />
            </div>
          </section>
        ))
      ) : (
        <>
          {/* ── Features — characteristics/highlights, leads before the raw
                spec sheet ── */}
          <section id="features" aria-label="Features" className={`scroll-mt-24 ${nextBand()}`}>
            <div className="mx-auto max-w-7xl px-6">
              <h2 className="mb-12 text-caption font-semibold uppercase tracking-[0.16em] text-brand">
                {t("features")}
              </h2>
              <FeatureList features={features} accent={model.range} />
            </div>
          </section>

          {/* ── Full specification — comprehensive detail, distinct from the
                quick-glance SpecStrip above ── */}
          <section id="full-specification" aria-label="Full specification" className={`scroll-mt-24 ${nextBand()}`}>
            <div className="mx-auto max-w-7xl px-6">
              <h2 className="mb-12 text-caption font-semibold uppercase tracking-[0.16em] text-brand">
                {t("fullSpecification")}
              </h2>
              <SpecSheet specs={model.fullSpecs} accent={model.range} />
            </div>
          </section>

          {/* ── Equipment — literal standard/optional checklists from the
                manufacturer spec sheet, distinct from the curated Features
                above ── */}
          <section id="equipment" aria-label="Equipment" className={`scroll-mt-24 ${nextBand()}`}>
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
        </>
      )}

      {/* ── Gallery — extra photos beyond the hero, spot-checked same as
            `image` (see the gallery field's comment in models.ts). Last of
            the content sections, right before "More from the range". ── */}
      {hasGallery && (
        <section id="gallery" aria-label="Gallery" className={`scroll-mt-24 ${nextBand()}`}>
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="mb-12 text-caption font-semibold uppercase tracking-[0.16em] text-brand">
              {t("gallery")}
            </h2>
            <Gallery images={galleryImages} allImages={allPhotos} alt={model.name} />
          </div>
        </section>
      )}

      {/* ── More from the range ── */}
      {relatedModels.length > 0 && (
        <section
          aria-label={`More from ${range.name}`}
          className={nextBand()}
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
    </PhotoLightboxProvider>
  );
}
