import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { RangeHero } from "@/components/range-hero"
import { ModelCard } from "@/components/model-card"
import { EnquireForm } from "@/components/enquire-form"
import { rangeConfig } from "@/components/range-config"
import { rangesData, rangeSlugs, type RangeSlug } from "../ranges-data"

type PageProps = { params: Promise<{ line: string }> }

/** Build a "min m to max m" caption from each model's LOA spec (first spec). */
function sizeRange(models: { specs: { value: string }[] }[]): string {
  const lengths = models
    .map((m) => Number.parseFloat(m.specs[0]?.value ?? ""))
    .filter((n) => !Number.isNaN(n))
  if (lengths.length === 0) return ""
  const min = Math.min(...lengths)
  const max = Math.max(...lengths)
  return min === max ? `${min.toFixed(2)} m` : `${min.toFixed(2)} m to ${max.toFixed(2)} m`
}

export function generateStaticParams() {
  return rangeSlugs.map((line) => ({ line }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { line } = await params
  const info = rangesData[line as RangeSlug]
  if (!info) return {}
  return {
    title: `${info.title} — Grand Dealer`,
    description: info.subtitle,
  }
}

export default async function RangePage({ params }: PageProps) {
  const { line } = await params
  const info = rangesData[line as RangeSlug]
  if (!info) notFound()

  const style = rangeConfig[info.range]
  const hasModels = info.models.length > 0

  return (
    <div className="flex min-h-dvh flex-col bg-surface">
      <SiteNav />

      <main className="flex-1">
        <RangeHero
          range={info.range}
          title={info.title}
          subtitle={info.subtitle}
          voiceLine={info.voiceLine}
        />

        {/* Philosophy */}
        <section className="w-full bg-surface">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <p className={`text-caption font-semibold uppercase tracking-[0.16em] ${style.text}`}>
                  {info.eyebrow}
                </p>
                <h2 className="mt-3 text-headline font-semibold tracking-tight text-balance text-text-strong">
                  {info.philosophyHeading}
                </h2>
              </div>
              <div className="flex flex-col gap-5 lg:col-span-8">
                {info.philosophy.map((para) => (
                  <p key={para} className="text-lead text-text-muted text-pretty">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Line-up */}
        <section className="w-full bg-surface-muted">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="text-headline font-semibold tracking-tight text-balance text-text-strong">
                The line-up
              </h2>
              <p className="text-body-sm text-text-muted">
                {hasModels
                  ? `${info.models.length} models · ${sizeRange(info.models)} · built to order`
                  : "Models are being added — enquire for current availability"}
              </p>
            </div>

            {hasModels ? (
              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {info.models.map((model) => (
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
            ) : (
              <div className={`mt-10 rounded-xl border border-dashed border-surface-line bg-surface p-12 text-center`}>
                <div className={`mx-auto h-1 w-16 rounded-full ${style.solidBg}`} />
                <h3 className="mt-6 text-title font-semibold tracking-tight text-text-strong">
                  Line-up coming soon
                </h3>
                <p className="mx-auto mt-3 max-w-md text-body text-text-muted text-pretty">
                  {`We're finalising the ${info.title.replace("The ", "")} models for our showroom. Register your interest and we'll be in touch as soon as they arrive.`}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Enquire */}
        <section id="enquire" className="w-full bg-brand">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-20 sm:px-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-headline font-semibold tracking-tight text-balance text-brand-contrast">
                Talk to us about the {info.title.replace("The ", "")}
              </h2>
              <p className="mt-4 max-w-md text-lead text-brand-contrast/85 text-pretty">
                Book a viewing, arrange a sea trial, or ask us anything about
                specification and availability.
              </p>
            </div>
            <div className="rounded-xl bg-surface p-6 sm:p-8">
              <EnquireForm range={info.range} modelName={info.title.replace("The ", "")} />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
