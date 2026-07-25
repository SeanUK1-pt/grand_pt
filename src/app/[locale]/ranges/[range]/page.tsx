import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import RangeHero from "@/components/RangeHero";
import ModelCard from "@/components/ModelCard";
import SpecStrip from "@/components/SpecStrip";
import { Link } from "@/i18n/navigation";
import { ranges, getRangeBySlug } from "@/data/ranges";
import { getModelsByRange } from "@/data/models";
import { resolveText } from "@/data/localized-text";
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

  const range = getRangeBySlug(rangeSlug as Range["slug"]);

  if (!range) notFound();

  const allModels = getModelsByRange(range.slug);
  // Models are authored small-to-large per range; the flagship is the last
  // (largest) one, pulled out for the featured card. The rest render below,
  // reversed so the grid still reads large-to-small.
  const flagship = allModels[allModels.length - 1];
  const gridModels = allModels.slice(0, -1).reverse();
  const flagshipPositioning = resolveText(flagship.positioning, locale);

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

          {/* Flagship — featured, full-width */}
          <Link
            href={flagship.href}
            className="group mb-6 flex flex-col overflow-hidden rounded-lg border border-surface-line bg-surface shadow-sm transition-shadow hover:shadow-md lg:flex-row"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-sunken lg:aspect-auto lg:w-1/2">
              <Image
                src={flagship.image}
                alt={`${flagship.name} — ${flagshipPositioning}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
              />
            </div>
            <div className="flex flex-1 flex-col justify-center gap-4 p-8">
              <span className="text-caption font-semibold uppercase tracking-[0.16em] text-brand">
                Flagship
              </span>
              <p className="text-headline font-semibold tracking-tight text-text-strong">
                {flagship.name}
              </p>
              <p className="max-w-md text-body leading-relaxed text-text-subtle">
                {flagshipPositioning}
              </p>
              <div className="pt-2">
                <SpecStrip specs={flagship.specs} />
              </div>
              <span className="mt-2 text-body-sm font-semibold text-brand">
                View model →
              </span>
            </div>
          </Link>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gridModels.map((model) => (
              <ModelCard key={model.slug} model={model} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
