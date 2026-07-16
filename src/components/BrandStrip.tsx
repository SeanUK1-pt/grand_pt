import { Link } from "@/i18n/navigation";

export default function BrandStrip() {
  return (
    <section aria-label="About Grand Boats" className="bg-surface-muted py-20">
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-caption font-semibold uppercase tracking-[0.16em] text-brand">
          Craft &amp; provenance
        </p>
        <p className="mt-4 text-headline font-semibold leading-tight tracking-tight text-balance text-text-strong">
          Grand boats are designed and manufactured in Ukraine, where a tradition
          of precision craftsmanship meets modern recreational design. Each hull
          is sold in Portugal exclusively through Algarve Boat Group.
        </p>
        <Link
          href="/our-story/"
          className="mt-8 inline-flex items-center gap-1 text-body-sm font-medium text-brand underline-offset-4 hover:underline"
        >
          Our story →
        </Link>
      </div>
    </section>
  );
}
