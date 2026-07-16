import Image from "next/image"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { RangeBadge } from "@/components/range-badge"
import { SpecStrip } from "@/components/spec-strip"
import { ModelCard } from "@/components/model-card"
import { rangeConfig } from "@/components/range-config"
import { goldenModels, goldenFeatures } from "@/app/golden-data"

const priceFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
})

export default function ModelPage() {
  const model = goldenModels.find((m) => m.modelName === "G680")!
  const related = goldenModels.filter((m) => m.modelName !== "G680").slice(0, 3)
  const style = rangeConfig[model.range]

  const ctaClass = `inline-flex items-center justify-center rounded-md px-6 py-3 text-body-sm font-semibold transition-colors ${style.solidBg} ${style.solidHoverBg} ${style.solidText} ${style.focusRing} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <SiteNav />

      <main className="flex-1">
        {/* Hero: large boat image, then identity on a light surface below */}
        <section className="border-b border-surface-line">
          <div className="relative aspect-[16/9] w-full bg-surface-sunken sm:aspect-[21/9]">
            <Image
              src={model.heroImage || "/placeholder.svg"}
              alt={`${model.modelName} — ${style.label}`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="mx-auto max-w-6xl px-6 py-10 sm:px-8 sm:py-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <RangeBadge range={model.range} variant="soft" />
                <h1 className="mt-4 text-headline font-semibold tracking-tight text-balance text-text-strong sm:text-display">
                  {model.modelName}
                </h1>
                <p className="mt-4 text-lead text-text-muted text-pretty">
                  {model.positioning}
                </p>
              </div>

              {/* Price block — same style as ModelCard */}
              <div className="shrink-0">
                <p className="text-caption font-medium uppercase tracking-[0.12em] text-text-subtle">
                  {model.priceFrom != null ? "From" : "Pricing"}
                </p>
                <p className="text-headline font-bold tracking-tight text-text-strong">
                  {model.priceFrom != null
                    ? priceFormatter.format(model.priceFrom)
                    : "On application"}
                </p>
                <p className="mt-1 text-caption text-text-muted">
                  {model.priceLabel}
                </p>
                <a href="#" className={`mt-4 w-full sm:w-auto ${ctaClass}`}>
                  Build yours in 3D →
                </a>
              </div>
            </div>

            <div className="mt-10 border-t border-surface-line pt-8">
              <SpecStrip specs={model.specs} surface="light" />
            </div>
          </div>
        </section>

        {/* Feature / detail blocks */}
        <section className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
          <h2 className="text-title font-semibold tracking-tight text-text-strong sm:text-headline">
            Designed around the water
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {goldenFeatures.map((feature) => (
              <article key={feature.title} className="flex flex-col">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-surface-sunken">
                  <Image
                    src={feature.image || "/placeholder.svg"}
                    alt={feature.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-5 text-lead font-semibold tracking-tight text-text-strong">
                  {feature.title}
                </h3>
                <p className="mt-2 text-body leading-relaxed text-text-muted text-pretty">
                  {feature.copy}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Related models from the same range */}
        <section className="bg-surface-muted">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-title font-semibold tracking-tight text-text-strong sm:text-headline">
                More from the {style.label}
              </h2>
              <a
                href="/en/ranges/golden-line"
                className="hidden shrink-0 text-body-sm font-semibold text-brand transition-colors hover:text-brand-hover sm:inline"
              >
                View the full range →
              </a>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((m) => (
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

        {/* Closing CTA → EnquireForm page */}
        <section className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
          <div className="flex flex-col items-start gap-6 rounded-xl bg-surface-muted p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div className="max-w-xl">
              <h2 className="text-title font-semibold tracking-tight text-text-strong">
                Have a question? Talk to us about the {model.modelName}
              </h2>
              <p className="mt-3 text-body leading-relaxed text-text-muted text-pretty">
                Our team can walk you through specifications, options and
                lead times — no obligation.
              </p>
            </div>
            <a href="#" className={`shrink-0 ${ctaClass}`}>
              Enquire about the {model.modelName} →
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
