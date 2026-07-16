import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { HomeHero } from "@/components/home-hero"
import { RangeOverview } from "@/components/range-overview"
import { FeatureDetail } from "@/components/feature-detail"
import { RangeHero } from "@/components/range-hero"
import { ModelCard } from "@/components/model-card"
import { goldenModels } from "@/app/golden-data"

const featured = goldenModels.filter((m) =>
  ["G680", "G750", "G980"].includes(m.modelName),
)

export default function Page() {
  return (
    <div className="min-h-screen bg-surface font-sans text-text-strong">
      <SiteNav />

      <main>
        <HomeHero />

        <RangeOverview />

        {/* Premium range moment (inherently dark) */}
        <RangeHero
          range="golden"
          title="The Golden Line"
          subtitle="Enclosed cabins, offshore poise and liveaboard comfort — our flagship range, ready to configure your way."
          voiceLine="Built to be lived aboard."
        />

        <FeatureDetail />

        {/* Featured models — real Golden Line data. Placed just before the
            enquiry band so in-stock boats lead straight into booking a viewing. */}
        <section className="w-full bg-surface-muted">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="text-caption font-semibold uppercase tracking-[0.16em] text-golden">
                  Featured · Golden Line
                </p>
                <h2 className="mt-3 text-headline font-semibold tracking-tight text-balance text-text-strong">
                  In stock and ready to view
                </h2>
              </div>
              <a
                href="/en/ranges/golden-line"
                className="text-body-sm font-semibold text-brand transition-colors hover:text-brand-hover"
              >
                See the full line-up →
              </a>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((model) => (
                <ModelCard
                  key={model.modelName}
                  range={model.range}
                  modelName={model.modelName}
                  heroImage={model.heroImage}
                  specs={model.specs}
                  priceFrom={model.priceFrom}
                  priceLabel={model.priceLabel}
                  href="/model"
                  cta="Build yours →"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Enquire CTA — neutral brand band */}
        <section id="enquire" className="w-full bg-brand">
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-16 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div className="max-w-2xl">
              <h2 className="text-title font-semibold tracking-tight text-balance text-brand-contrast sm:text-headline">
                Come and see them on the water
              </h2>
              <p className="mt-3 text-lead text-brand-contrast/85 text-pretty">
                Book a viewing at the marina, or talk to us about specifying your
                next Grand.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-md bg-surface px-6 py-3 text-body-sm font-semibold text-brand transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface focus-visible:ring-offset-2 focus-visible:ring-offset-brand"
              >
                Book a viewing
              </a>
              <a
                href="/en/ranges/golden-line"
                className="inline-flex items-center justify-center rounded-md border border-brand-contrast/40 px-6 py-3 text-body-sm font-semibold text-brand-contrast transition-colors hover:bg-brand-active focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface focus-visible:ring-offset-2 focus-visible:ring-offset-brand"
              >
                Browse ranges
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
