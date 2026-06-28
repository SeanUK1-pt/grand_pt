import { rangeConfig, type RangeKey } from "./range-config"
import { RangeBadge } from "./range-badge"

type RangeHeroProps = {
  range: RangeKey
  title: string
  subtitle: string
  /** Short punchy tagline — Geist Sans bold, not a serif/italic voice line. */
  voiceLine: string
}

/**
 * Full-width premium band on --color-ink (used sparingly). The range accent
 * appears only as a small detail: a soft badge and a thin underline rule,
 * never as a full colour wash.
 */
export function RangeHero({ range, title, subtitle, voiceLine }: RangeHeroProps) {
  const style = rangeConfig[range]

  return (
    <section className="w-full bg-ink px-6 py-16 sm:px-10 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <RangeBadge range={range} variant="soft" />

        <h2 className="mt-5 text-headline font-semibold tracking-tight text-balance text-ink-text sm:text-display">
          {title}
        </h2>

        {/* Thin accent rule as the range detail */}
        <div className={`mt-5 h-1 w-16 rounded-full ${style.solidBg}`} />

        <p className="mt-6 max-w-2xl text-lead text-ink-text-muted text-pretty">
          {subtitle}
        </p>

        <p className={`mt-8 text-title font-bold tracking-tight text-balance ${style.text}`}>
          {voiceLine}
        </p>
      </div>
    </section>
  )
}
