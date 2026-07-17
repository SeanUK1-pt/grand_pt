import { setRequestLocale } from "next-intl/server";
import HomeHero from "@/components/HomeHero";
import RangeSection from "@/components/RangeSection";
import YamahaPartner from "@/components/YamahaPartner";
import BrandStrip from "@/components/BrandStrip";
import { homeHeroSlides } from "@/data/home-hero-slides";
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
      <RangeSection />
      <YamahaPartner />
      <BrandStrip />
    </>
  );
}
