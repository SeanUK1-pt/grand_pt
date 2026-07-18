import { setRequestLocale } from "next-intl/server";
import HomeHero from "@/components/HomeHero";
import RangeIndex from "@/components/RangeIndex";
import RangeBand from "@/components/RangeBand";
import YamahaPartner from "@/components/YamahaPartner";
import BrandStrip from "@/components/BrandStrip";
import { homeHeroSlides } from "@/data/home-hero-slides";
import { ranges } from "@/data/ranges";
import { driveLineIntro } from "@/data/drive-line-intro";
import { resolveText } from "@/data/localized-text";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const goldenLine = ranges.find((r) => r.slug === "golden-line")!;
  const silverLine = ranges.find((r) => r.slug === "silver-line")!;
  const driveLine = ranges.find((r) => r.slug === "drive-line")!;

  return (
    <>
      <HomeHero slides={homeHeroSlides} />
      <RangeIndex />

      <RangeBand range={goldenLine} priority />
      <RangeBand range={silverLine} />

      <div className="h-px bg-surface-line" aria-hidden />
      <div className="bg-surface py-10">
        <div className="mx-auto max-w-7xl px-6">
          <p className="font-mono text-caption uppercase tracking-widest text-text-subtle">
            {resolveText(driveLineIntro.eyebrow, locale)}
          </p>
          <h2 className="mt-2 text-headline font-semibold tracking-tight text-text-strong">
            {driveLine.name}
          </h2>
          <p className="mt-2 max-w-lg text-body text-text-muted">
            {resolveText(driveLineIntro.body, locale)}
          </p>
        </div>
      </div>

      <RangeBand range={driveLine} />

      <BrandStrip />
      <YamahaPartner />
    </>
  );
}
