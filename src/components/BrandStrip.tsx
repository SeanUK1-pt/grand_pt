import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ranges } from "@/data/ranges";
import { models } from "@/data/models";
import { brandStory } from "@/data/brand-story";
import { resolveText } from "@/data/localized-text";

export default async function BrandStrip() {
  const locale = await getLocale();

  const stats = [
    { label: resolveText(brandStory.founded.label, locale), value: resolveText(brandStory.founded.value, locale) },
    { label: resolveText(brandStory.manufacturing.label, locale), value: resolveText(brandStory.manufacturing.value, locale) },
    { label: locale === "pt" ? "Gamas" : "Ranges", value: String(ranges.length) },
    { label: locale === "pt" ? "Modelos" : "Models", value: String(models.length) },
  ];

  return (
    <section aria-label="About Grand Boats" className="bg-brand-soft py-16">
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-caption font-semibold uppercase tracking-[0.16em] text-brand">
          {resolveText(brandStory.eyebrow, locale)}
        </p>
        <p className="mt-4 max-w-3xl text-headline font-semibold leading-tight tracking-tight text-balance text-text-strong">
          {resolveText(brandStory.headline, locale)}
        </p>

        <div className="mt-12 grid grid-cols-2 gap-6 border-y border-brand/15 py-8 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <span className="text-headline font-semibold tracking-tight text-text-strong">
                {stat.value}
              </span>
              <span className="text-caption font-medium uppercase tracking-[0.1em] text-text-subtle">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-10 sm:grid-cols-2">
          {brandStory.columns.map((column) => (
            <div key={resolveText(column.heading, locale)}>
              <h3 className="text-title font-semibold tracking-tight text-text-strong">
                {resolveText(column.heading, locale)}
              </h3>
              <p className="mt-3 text-body leading-relaxed text-text-muted text-pretty">
                {resolveText(column.body, locale)}
              </p>
            </div>
          ))}
        </div>

        <Link
          href="/our-story/"
          className="mt-10 inline-flex items-center gap-1 text-body-sm font-medium text-brand underline-offset-4 hover:underline"
        >
          {locale === "pt" ? "A nossa história →" : "Our story →"}
        </Link>
      </div>
    </section>
  );
}
