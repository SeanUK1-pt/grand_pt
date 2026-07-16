import Image from "next/image"
import { goldenFeatures } from "@/app/golden-data"

/**
 * Craftsmanship feature row on a muted band. Neutral, brand-level section —
 * no per-range accent, so it reads as shared dealership storytelling.
 */
export function FeatureDetail() {
  return (
    <section className="w-full bg-surface-muted">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-caption font-semibold uppercase tracking-[0.16em] text-brand">
            Why Grand
          </p>
          <h2 className="mt-3 text-headline font-semibold tracking-tight text-balance text-text-strong">
            Engineered for the open water
          </h2>
          <p className="mt-4 text-lead text-text-muted text-pretty">
            The details that carry across every hull we sell — from the layup to
            the last cleat.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {goldenFeatures.map((feature) => (
            <article
              key={feature.title}
              className="flex flex-col overflow-hidden rounded-lg border border-surface-line bg-surface shadow-sm"
            >
              <div className="relative aspect-[4/3] w-full bg-surface-sunken">
                <Image
                  src={feature.image || "/placeholder.svg"}
                  alt={feature.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <h3 className="text-title font-semibold tracking-tight text-text-strong">
                  {feature.title}
                </h3>
                <p className="text-body leading-relaxed text-text-muted text-pretty">
                  {feature.copy}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
