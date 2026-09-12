import { setRequestLocale, getTranslations } from "next-intl/server";
import HomeHero from "@/components/HomeHero";
import RangeTiles from "@/components/RangeTiles";
import ConfiguratorPromo from "@/components/ConfiguratorPromo";
import YamahaPartner from "@/components/YamahaPartner";
import BrandStrip from "@/components/BrandStrip";
import { homeHeroSlides } from "@/data/home-hero-slides";
import { routing } from "@/i18n/routing";
import { resolveText } from "@/data/localized-text";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  params: Promise<{ locale: string }>;
};

const homeMeta = {
  title: {
    en: "Grand Boats Portugal — RHIBs & RIB Boats, Delivered Nationwide",
    pt: "Grand Boats Portugal — RHIBs e Barcos Insufláveis Rígidos",
  },
  description: {
    en: "RHIBs and rigid inflatable boats (RIBs) from Grand's Golden, Silver and Drive Line ranges. Hand-laid hulls, delivered anywhere in Portugal by Algarve Boat Group, based in the Algarve.",
    pt: "RHIBs e barcos insufláveis rígidos (RIBs) das gamas Golden, Silver e Drive Line da Grand. Cascos laminados à mão, entregues em todo o país pela Algarve Boat Group, sediada no Algarve.",
  },
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const title = resolveText(homeMeta.title, locale);
  const description = resolveText(homeMeta.description, locale);
  return {
    title: { absolute: title },
    description,
    alternates: buildAlternates("/", locale),
    ...buildOpenGraph(title, description),
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("homeHero");

  const resolvedSlides = homeHeroSlides.map((slide) => ({
    ...slide,
    moodLine: resolveText(slide.moodLine, locale),
  }));

  const heroLabels = {
    carousel: t("carousel"),
    slideNav: t("slideNav"),
    slideOf: homeHeroSlides.map((slide, i) =>
      t("slideOf", { index: i + 1, total: homeHeroSlides.length, name: slide.modelName })
    ),
    goToSlide: homeHeroSlides.map((slide, i) => t("goToSlide", { index: i + 1, name: slide.modelName })),
  };

  return (
    <>
      <HomeHero slides={resolvedSlides} labels={heroLabels} />
      <RangeTiles />
      <ConfiguratorPromo />
      <BrandStrip />
      <YamahaPartner />
    </>
  );
}
