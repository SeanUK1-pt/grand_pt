import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { RangeHero } from "@/components/range-hero"
import { ModelCard } from "@/components/model-card"
import { goldenModels } from "@/app/golden-data"

export default function RangePage() {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <SiteNav />

      <main className="flex-1">
        <RangeHero
          range="golden"
          title="The Golden Line"
          subtitle="Our flagship range — enclosed-cabin cruisers built for comfort, range and offshore confidence, from compact day boats to full liveaboard flagships."
          voiceLine="Go further, in comfort."
        />

        {/* Range philosophy */}
        <section className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-20">
          <p className="text-lead leading-relaxed text-text-muted text-pretty">
            The Golden Line is where Grand brings together craftsmanship and
            capability. Every hull is hand-laid for a precise deep-V entry,
            then paired with an insulated cabin and a deck that adapts to how
            you spend your days on the water. It is the range we reach for when
            comfort matters as much as performance.
          </p>
        </section>

        {/* Model grid — every model in the range */}
        <section className="bg-surface-muted">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
            <h2 className="text-title font-semibold tracking-tight text-text-strong sm:text-headline">
              The line-up
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {goldenModels.map((m) => (
                <ModelCard
                  key={m.modelName}
                  range={m.range}
                  modelName={m.modelName}
                  heroImage={m.heroImage}
                  specs={m.specs}
                  priceFrom={m.priceFrom}
                  priceLabel={m.priceLabel}
                  href="/model"
                  cta="View model →"
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
