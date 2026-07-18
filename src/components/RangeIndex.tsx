import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ranges } from "@/data/ranges";
import { getModelsByRange } from "@/data/models";
import { resolveText } from "@/data/localized-text";
import type { RangeAccent } from "@/data/ranges";

const accentText: Record<RangeAccent, string> = {
  golden: "text-golden",
  silver: "text-silver",
  drive: "text-drive",
};

const accentRule: Record<RangeAccent, string> = {
  golden: "bg-golden",
  silver: "bg-silver",
  drive: "bg-drive",
};

export default async function RangeIndex() {
  const locale = await getLocale();

  return (
    <section aria-label="Range index" className="bg-surface py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid divide-y divide-surface-line md:grid-cols-3 md:divide-x md:divide-y-0">
          {ranges.map((range) => {
            const count = getModelsByRange(range.slug).length;
            return (
              <div
                key={range.slug}
                className="flex flex-col gap-4 rounded-none py-8 first:pt-0 last:pb-0 md:px-8 md:py-0 md:first:pl-0 md:last:pr-0"
              >
                <p className="font-mono text-caption uppercase tracking-widest text-text-subtle">
                  {count} {locale === "pt" ? "MODELOS" : "MODELS"}
                </p>
                <h2 className="text-headline font-semibold tracking-tight text-text-strong">
                  {range.name}
                </h2>
                <div className={`h-0.5 w-12 rounded-none ${accentRule[range.accent]}`} aria-hidden />
                <p className="text-body text-text-muted">{resolveText(range.voiceLine, locale)}</p>
                <Link
                  href={`/ranges/${range.slug}/`}
                  className={`mt-auto font-mono text-caption font-semibold uppercase tracking-[0.14em] ${accentText[range.accent]}`}
                >
                  {locale === "pt" ? "Explorar gama →" : "Explore range →"}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
