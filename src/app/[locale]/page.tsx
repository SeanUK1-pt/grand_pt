import { setRequestLocale } from "next-intl/server";
import HomeHero from "@/components/HomeHero";
import RangeTiles from "@/components/RangeTiles";
import YamahaPartner from "@/components/YamahaPartner";
import BrandStrip from "@/components/BrandStrip";
import { homeHeroSlides } from "@/data/home-hero-slides";
import { routing } from "@/i18n/routing";
import { resolveText } from "@/data/localized-text";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  params: Promise<{ locale: string }>;
};

const homeMeta = {
  title: {
    en: "Grand Boats Portugal — Golden, Silver & Drive Line RIBs",
    pt: "Grand Boats Portugal — RIBs Golden, Silver e Drive Line",
  },
  description: {
    en: "Authorised Grand Boats dealer for Portugal. Hand-laid RIBs from the Golden, Silver and Drive Line ranges, sold and serviced by Algarve Boat Group in Portimão.",
    pt: "Representante autorizado da Grand Boats em Portugal. RIBs laminados à mão das gamas Golden, Silver e Drive Line, vendidos e assistidos pela Algarve Boat Group em Portimão.",
  },
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return {
    title: resolveText(homeMeta.title, locale),
    description: resolveText(homeMeta.description, locale),
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HomeHero slides={homeHeroSlides} />
      <RangeTiles />
      <BrandStrip />
      <YamahaPartner />
    </>
  );
}
