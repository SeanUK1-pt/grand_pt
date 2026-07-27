import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import RangeHero from "@/components/RangeHero";
import ModelCard from "@/components/ModelCard";
import SpecStrip from "@/components/SpecStrip";
import LayoutTiles from "@/components/LayoutTiles";
import { Link } from "@/i18n/navigation";
import { ranges, getRangeBySlug } from "@/data/ranges";
import { getModelsByRange, getModelBySlug } from "@/data/models";
import { resolveText } from "@/data/localized-text";
import type { Model } from "@/data/models";
import type { Range } from "@/data/ranges";

type Props = {
  params: Promise<{ locale: string; range: string }>;
};

// Same hero images already vetted for the homepage RangeTiles — reused here
// so the homepage tile and range page hero show the same shot per range.
const heroImage: Record<Range["slug"], string> = {
  "golden-line": "/images/boats/g750/detail-11.jpg",
  "silver-line": "/images/boats/s470n/detail-12.jpg",
  "drive-line": "/images/boats/d950-drive/detail-22.jpg",
};

const accentRule: Record<Range["accent"], string> = {
  golden: "bg-golden",
  silver: "bg-silver",
  drive: "bg-drive",
};

// Golden Line gets three roughly-equal featured cards instead of one
// dominant flagship; the standard grid below shows the rest, in this
// explicit large-to-small order (ties like G380/G380N ordered base
// model before its "N" variant, not by authoring order).
const goldenFeaturedSlugs = ["g980", "g750", "g680"];
const goldenGridOrder = ["g850", "g580", "g500", "g420", "g380", "g380n", "g340", "g340n"];

// Full-width featured card — image one side, copy + specs + CTA the
// other. Used for Silver's single flagship and Drive's D950 (Golden's
// three-across featured section has its own smaller card markup below,
// since three of these side by side would be too heavy).
function FeaturedCard({ model, positioning, badge }: { model: Model; positioning: string; badge?: React.ReactNode }) {
  return (
    <Link
      href={model.href}
      className="group flex flex-col overflow-hidden rounded-lg border border-surface-line bg-surface shadow-sm transition-shadow hover:shadow-md lg:flex-row"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-sunken lg:aspect-auto lg:w-1/2">
        <Image
          src={model.image}
          alt={`${model.name} — ${positioning}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority
        />
      </div>
      <div className="flex flex-1 flex-col justify-center gap-4 p-8">
        {badge}
        <p className="text-headline font-semibold tracking-tight text-text-strong">{model.name}</p>
        <p className="max-w-md text-body leading-relaxed text-text-subtle">{positioning}</p>
        <div className="pt-2">
          <SpecStrip specs={model.specs} />
        </div>
        <span className="mt-2 text-body-sm font-semibold text-brand">View model →</span>
      </div>
    </Link>
  );
}

export async function generateStaticParams() {
  return ranges.map((r) => ({ range: r.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, range: rangeSlug } = await params;
  const range = getRangeBySlug(rangeSlug as Range["slug"]);
  if (!range) return {};
  return {
    title: `${range.name} — Grand Boats Portugal`,
    description: resolveText(range.tagline, locale),
  };
}

export default async function RangePage({ params }: Props) {
  const { locale, range: rangeSlug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "rangePage" });

  const range = getRangeBySlug(rangeSlug as Range["slug"]);

  if (!range) notFound();

  const allModels = getModelsByRange(range.slug);

  return (
    <>
      <RangeHero
        accent={range.accent}
        name={range.name}
        tagline={resolveText(range.tagline, locale)}
        voiceLine={resolveText(range.voiceLine, locale)}
        image={heroImage[range.slug]}
      />

      {/* Philosophy — aligned to the same max-w-7xl/px-6 grid as the hero
          and model sections above/below, instead of a narrower centred
          column, so it reads as continuing the page rather than floating
          in its own detached block. */}
      <section className="bg-surface py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className={`h-0.5 w-12 mb-6 ${accentRule[range.accent]}`} aria-hidden />
          <p className="max-w-2xl text-lead leading-relaxed text-text-muted text-pretty">
            {resolveText(range.philosophy, locale)}
          </p>
        </div>
      </section>

      {/* Model grid */}
      <section aria-label={`${range.name} models`} className="bg-surface pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-10 text-title font-semibold tracking-tight text-text-strong">
            Models
          </h2>

          {range.slug === "golden-line" && (
            <>
              {/* Three featured models, each the same wide image+copy card
                  used for a single flagship elsewhere — stacked, not
                  squeezed into a 3-across row, so each keeps its full
                  double-width weight. G980 carries the new/limited badge;
                  G750 and G680 don't. */}
              <div className="mb-10 flex flex-col gap-6">
                {goldenFeaturedSlugs.map((slug) => {
                  const model = getModelBySlug(slug)!;
                  const positioning = resolveText(model.positioning, locale);
                  return (
                    <FeaturedCard
                      key={slug}
                      model={model}
                      positioning={positioning}
                      badge={
                        slug === "g980" ? (
                          <span className="inline-flex w-fit items-center rounded-full bg-golden-soft px-2.5 py-1 text-caption font-semibold uppercase tracking-[0.08em] text-golden">
                            {t("newLimitedAvailability")}
                          </span>
                        ) : undefined
                      }
                    />
                  );
                })}
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {goldenGridOrder.map((slug) => (
                  <ModelCard key={slug} model={getModelBySlug(slug)!} />
                ))}
              </div>
            </>
          )}

          {range.slug === "drive-line" && (
            <>
              {/* D600 — one hull, three layouts, sub-sectioned as a group
                  rather than three equal-weight grid entries. */}
              {(() => {
                const d600 = getModelBySlug("d600")!;
                return (
                  <div className="mb-16">
                    <div className="mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <h3 className="text-headline font-semibold tracking-tight text-text-strong">
                        {d600.name}
                      </h3>
                      <span className="text-lead text-text-subtle">{t("d600Tagline")}</span>
                    </div>
                    <LayoutTiles
                      layouts={d600.layouts!}
                      accent={range.accent}
                      modelSlug={d600.slug}
                      rangeSlug={range.slug}
                    />
                  </div>
                );
              })()}

              {/* D950 — comes second in reading order: it's the larger hull,
                  but D600 is the more commercially relevant entry point. */}
              {(() => {
                const d950 = getModelBySlug("d950-drive")!;
                const positioning = resolveText(d950.positioning, locale);
                return (
                  <div>
                    <div className="mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <h3 className="text-headline font-semibold tracking-tight text-text-strong">
                        {d950.name}
                      </h3>
                      <span className="text-lead text-text-subtle">{t("d950Tagline")}</span>
                    </div>
                    <FeaturedCard model={d950} positioning={positioning} />
                  </div>
                );
              })()}
            </>
          )}

          {range.slug === "silver-line" && (
            <>
              {/* Models are authored small-to-large; the flagship is the
                  last (largest) one, pulled out for the featured card. The
                  rest render below, reversed so the grid reads large-to-small. */}
              {(() => {
                const flagship = allModels[allModels.length - 1];
                const gridModels = allModels.slice(0, -1).reverse();
                const positioning = resolveText(flagship.positioning, locale);
                return (
                  <>
                    <div className="mb-6">
                      <FeaturedCard
                        model={flagship}
                        positioning={positioning}
                        badge={
                          <span className="text-caption font-semibold uppercase tracking-[0.16em] text-brand">
                            Flagship
                          </span>
                        }
                      />
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {gridModels.map((model) => (
                        <ModelCard key={model.slug} model={model} />
                      ))}
                    </div>
                  </>
                );
              })()}
            </>
          )}
        </div>
      </section>
    </>
  );
}
