import HomeHero from "@/components/HomeHero";
import RangeSelector from "@/components/RangeSelector";
import ModelCard from "@/components/ModelCard";
import BrandStrip from "@/components/BrandStrip";
import { homeHeroSlides } from "@/data/home-hero-slides";
import { featuredModels } from "@/data/featured-models";

export default function Home() {
  return (
    <>
      <HomeHero slides={homeHeroSlides} />
      <RangeSelector />

      <section aria-label="Featured models" className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-10 text-sm font-medium uppercase tracking-widest text-ink-subtle">
            Featured models
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredModels.map((model) => (
              <ModelCard key={model.slug} model={model} />
            ))}
          </div>
        </div>
      </section>

      <BrandStrip />
    </>
  );
}
