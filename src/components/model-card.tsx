import Image from "next/image"
import { rangeConfig, type RangeKey } from "./range-config"
import { RangeBadge } from "./range-badge"
import { SpecStrip, type Spec } from "./spec-strip"

type ModelCardProps = {
  range: RangeKey
  modelName: string
  heroImage: string
  specs: Spec[]
  /** Omit for build-to-order models shown as "Price on application". */
  priceFrom?: number
  priceLabel: string
  href: string
  /** CTA copy; defaults to "Explore range". */
  cta?: string
}

const priceFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
})

/**
 * Range model card: hero image + content with soft RangeBadge, model name,
 * SpecStrip, "from" price, and a range-accent CTA. Sits on --color-surface.
 */
export function ModelCard({
  range,
  modelName,
  heroImage,
  specs,
  priceFrom,
  priceLabel,
  href,
  cta = "Explore range",
}: ModelCardProps) {
  const style = rangeConfig[range]

  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-surface-line bg-surface shadow-sm">
      <div className="relative aspect-[4/3] w-full bg-surface-sunken">
        <Image
          src={heroImage || "/placeholder.svg"}
          alt={`${modelName} — ${style.label}`}
          fill
          sizes="(max-width: 640px) 100vw, 33vw"
          className="object-contain p-4"
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <RangeBadge range={range} variant="soft" />

        <h3 className="text-title font-semibold tracking-tight text-text-strong">
          {modelName}
        </h3>

        <SpecStrip specs={specs} surface="light" />

        <div className="mt-auto pt-2">
          <p className="text-caption font-medium uppercase tracking-[0.12em] text-text-subtle">
            {priceFrom != null ? "From" : "Pricing"}
          </p>
          <p className="text-lead font-bold tracking-tight text-text-strong">
            {priceFrom != null ? priceFormatter.format(priceFrom) : "Price on application"}
          </p>
          <p className="mt-1 text-caption text-text-muted">{priceLabel}</p>
        </div>

        <a
          href={href}
          className={`mt-2 inline-flex w-full items-center justify-center rounded-md px-5 py-3 text-body-sm font-semibold transition-colors ${style.solidBg} ${style.solidHoverBg} ${style.solidText} ${style.focusRing} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`}
        >
          {cta}
        </a>
      </div>
    </article>
  )
}
