import Image from "next/image"

/**
 * Full-bleed homepage hero. A large flagship photo with a left-anchored ink
 * scrim so the headline stays legible — the scrim is a functional overlay for
 * contrast, not decoration. Copy and CTAs use brand + ink tokens only.
 */
export function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <Image
        src="/boats/golden-g750.png"
        alt="Grand Golden Line flagship RIB cruising on open water"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Functional legibility scrim: opaque ink on the left, clearing to the right */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-transparent"
      />

      <div className="relative mx-auto flex min-h-[560px] max-w-6xl flex-col justify-center px-6 py-20 sm:px-8 sm:py-28">
        <div className="max-w-2xl">
          <p className="text-caption font-semibold uppercase tracking-[0.18em] text-ink-text-muted">
            Your local Grand dealership
          </p>
          <h1 className="mt-4 text-headline font-semibold tracking-tight text-balance text-ink-text sm:text-display">
            Rigid inflatables, built to be lived aboard.
          </h1>
          <p className="mt-6 max-w-xl text-lead text-ink-text-muted text-pretty">
            Explore the Golden, Silver and Drive ranges — sales, servicing and
            ownership, all from one place on the water.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#ranges"
              className="inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-body-sm font-semibold text-brand-contrast transition-colors hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              Explore the ranges
            </a>
            <a
              href="#enquire"
              className="inline-flex items-center justify-center rounded-md border border-ink-line bg-ink-raised px-6 py-3 text-body-sm font-semibold text-ink-text transition-colors hover:bg-ink-overlay focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              Book a viewing
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
