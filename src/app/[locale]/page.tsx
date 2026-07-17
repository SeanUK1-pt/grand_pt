import { setRequestLocale } from "next-intl/server";
import HomeHero from "@/components/HomeHero";
import RangeSelector from "@/components/RangeSelector";
import ModelCard from "@/components/ModelCard";
import YamahaPartner from "@/components/YamahaPartner";
import BrandStrip from "@/components/BrandStrip";
import { homeHeroSlides } from "@/data/home-hero-slides";
import { featuredModels } from "@/data/featured-models";
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
      <RangeSelector />

      <section aria-label="Featured models" className="bg-surface py-12">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-10 text-caption font-semibold uppercase tracking-[0.16em] text-brand">
            Featured models
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredModels.map((model) => (
              <ModelCard key={model.slug} model={model} />
            ))}
          </div>
        </div>
      </section>

      <YamahaPartner />
      <BrandStrip />
    </>
  );
}
