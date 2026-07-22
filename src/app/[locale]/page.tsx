import { Fragment } from "react";
import { setRequestLocale } from "next-intl/server";
import HomeHero from "@/components/HomeHero";
import RangeBandHeader from "@/components/RangeBandHeader";
import RangeBand from "@/components/RangeBand";
import YamahaPartner from "@/components/YamahaPartner";
import BrandStrip from "@/components/BrandStrip";
import { homeHeroSlides } from "@/data/home-hero-slides";
import { ranges } from "@/data/ranges";
import { rangesIntro } from "@/data/ranges-intro";
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

  return (
    <>
      <HomeHero slides={homeHeroSlides} />

      <section aria-label="Ranges intro" className="bg-surface py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-headline font-semibold tracking-tight text-text-strong">
            {resolveText(rangesIntro, locale)}
          </h2>
        </div>
      </section>

      {ranges.map((range, i) => (
        <Fragment key={range.slug}>
          <RangeBandHeader range={range} />
          <RangeBand range={range} priority={i === 0} />
        </Fragment>
      ))}

      <BrandStrip />
      <YamahaPartner />
    </>
  );
}
