import Image from "next/image"
import { rangeConfig, type RangeKey } from "./range-config"
import { RangeBadge } from "./range-badge"

type RangeOverviewItem = {
  range: RangeKey
  image: string
  tagline: string
  copy: string
  href: string
}

const items: RangeOverviewItem[] = [
  {
    range: "golden",
    image: "/boats/golden.png",
    tagline: "Built to be lived aboard.",
    copy: "Premium liveaboard cruisers with enclosed cabins and offshore poise — the top of the range.",
    href: "/en/ranges/golden-line",
  },
  {
    range: "silver",
    image: "/boats/silver.png",
    tagline: "Yes to a normal Tuesday.",
    copy: "Approachable family and day-boats — clean, calm and easy to own from the first outing.",
    href: "/en/ranges/silver-line",
  },
  {
    range: "drive",
    image: "/boats/drive.png",
    tagline: "Deep-V, raised tube, no apology.",
    copy: "The fastest performance hulls in the line-up — the loudest and most focused of the three.",
    href: "/en/ranges/drive-line",
  },
]

/**
 * Three range cards, one per line. Each carries only its own accent as a soft
 * badge, a thin rule and an accent text link — the shared card chrome stays
 * neutral so the ranges read as one family.
 */
export function RangeOverview() {
  return (
    <section id="ranges" className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
      <div className="max-w-2xl">
        <p className="text-caption font-semibold uppercase tracking-[0.16em] text-brand">
          Three ranges
        </p>
        <h2 className="mt-3 text-headline font-semibold tracking-tight text-balance text-text-strong">
          One family, three characters
        </h2>
        <p className="mt-4 text-lead text-text-muted text-pretty">
          Every Grand shares the same build quality — the range you choose is
          about how you use the water.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {items.map((item) => {
          const style = rangeConfig[item.range]
          return (
            <article
              key={item.range}
              className="flex flex-col overflow-hidden rounded-lg border border-surface-line bg-surface shadow-sm"
            >
              <div className="relative aspect-[4/3] w-full bg-surface-sunken">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={`${style.label} RIB`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col gap-4 p-6">
                <RangeBadge range={item.range} variant="soft" />
                <div className={`h-1 w-12 rounded-full ${style.solidBg}`} />
                <h3 className="text-title font-semibold tracking-tight text-text-strong">
                  {item.tagline}
                </h3>
                <p className="text-body leading-relaxed text-text-muted text-pretty">
                  {item.copy}
                </p>
                <a
                  href={item.href}
                  className={`mt-auto inline-flex items-center gap-1 pt-2 text-body-sm font-semibold ${style.text}`}
                >
                  Explore {style.label} →
                </a>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
