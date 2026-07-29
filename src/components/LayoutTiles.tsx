import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { resolveText } from "@/data/localized-text";
import { translateSpecLabel, translatePriceLabel } from "@/data/spec-labels";
import type { ModelLayout } from "@/data/models";
import type { RangeAccent } from "@/data/ranges";

type Props = {
  layouts: ModelLayout[];
  accent: RangeAccent;
  modelSlug: string;
  rangeSlug: string;
};

const accentRule: Record<RangeAccent, string> = {
  golden: "bg-golden",
  silver: "bg-silver",
  drive:  "bg-drive",
};

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-PT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default async function LayoutTiles({ layouts, accent, modelSlug, rangeSlug }: Props) {
  if (layouts.length === 0) return null;

  const locale = await getLocale();
  const t = await getTranslations("layoutTiles");

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {layouts.map((layout) => {
        const enquireHref = `/ranges/${rangeSlug}/enquire/?bm=${modelSlug}&layout=${encodeURIComponent(layout.name)}`;

        return (
          <div
            key={layout.name}
            className="flex flex-col overflow-hidden rounded-lg border border-surface-line bg-surface shadow-sm"
          >
            {layout.image && (
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-sunken">
                <Image
                  src={layout.image}
                  alt={`${layout.name} layout`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col gap-3 p-5">
              <div className={`h-0.5 w-8 ${accentRule[accent]}`} aria-hidden />
              <p className="text-title font-semibold tracking-tight text-text-strong">{layout.name}</p>
              <p className="text-body leading-relaxed text-text-muted text-pretty">
                {resolveText(layout.useCaseLine, locale)}
              </p>

              {layout.specs && layout.specs.length > 0 && (
                <dl className="mt-1 flex flex-col gap-1 border-t border-surface-line pt-3">
                  {layout.specs.map(({ label, value }) => (
                    <div key={label} className="flex items-baseline justify-between gap-4">
                      <dt className="text-caption text-text-subtle">{translateSpecLabel(label, locale)}</dt>
                      <dd className="text-caption font-medium text-text-strong">{value}</dd>
                    </div>
                  ))}
                </dl>
              )}

              {layout.priceFrom !== undefined && (
                <div className="mt-1 flex flex-col gap-0.5">
                  <span className="text-lead font-semibold tracking-tight text-text-strong">
                    {formatPrice(layout.priceFrom)}
                  </span>
                  {layout.priceLabel && (
                    <span className="text-caption text-text-subtle">{translatePriceLabel(layout.priceLabel, locale)}</span>
                  )}
                </div>
              )}

              <div className="mt-2">
                <Link
                  href={enquireHref}
                  className="inline-flex items-center rounded-md bg-pop px-6 py-3 text-body-sm font-semibold text-pop-contrast transition-opacity hover:opacity-90"
                >
                  {t("enquireAbout", { name: layout.name })}
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
