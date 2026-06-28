import Link from "next/link";

export default function BrandStrip() {
  return (
    <section aria-label="About Grand Boats" className="bg-surface-muted py-20">
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-sm font-medium uppercase tracking-widest text-ink-subtle">
          Craft &amp; provenance
        </p>
        <p className="mt-4 text-2xl font-medium leading-relaxed text-ink md:text-3xl">
          Grand boats are designed and manufactured in Ukraine, where a tradition
          of precision craftsmanship meets modern recreational design. Each hull
          is sold in Portugal exclusively through Algarve Boat Group.
        </p>
        <Link
          href="/our-story/"
          className="mt-8 inline-flex items-center gap-1 text-sm font-medium text-grand-blue underline-offset-4 hover:underline"
        >
          Our story →
        </Link>
      </div>
    </section>
  );
}
