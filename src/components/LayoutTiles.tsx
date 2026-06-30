import { Link } from "@/i18n/navigation";
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

export default function LayoutTiles({ layouts, accent, modelSlug, rangeSlug }: Props) {
  if (layouts.length === 0) return null;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {layouts.map((layout) => {
        const enquireHref = `/ranges/${rangeSlug}/enquire/?bm=${modelSlug}&layout=${encodeURIComponent(layout.name)}`;

        return (
          <div
            key={layout.name}
            className="flex flex-col gap-3 overflow-hidden rounded-2xl bg-surface-muted p-5"
          >
            <div className={`h-0.5 w-8 ${accentRule[accent]}`} aria-hidden />
            <p className="text-xl font-semibold text-ink">{layout.name}</p>
            <p className="text-sm leading-relaxed text-ink-subtle">
              {layout.useCaseLine}
            </p>

            {layout.specs && layout.specs.length > 0 && (
              <dl className="mt-1 flex flex-col gap-1 border-t border-ink/10 pt-3">
                {layout.specs.map(({ label, value }) => (
                  <div key={label} className="flex items-baseline justify-between gap-4">
                    <dt className="text-xs text-ink-subtle">{label}</dt>
                    <dd className="text-xs font-medium text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {layout.priceFrom !== undefined && (
              <div className="mt-1 flex flex-col gap-0.5">
                <span className="text-base font-semibold text-ink">
                  From {formatPrice(layout.priceFrom)}
                </span>
                {layout.priceLabel && (
                  <span className="text-xs text-ink-subtle">{layout.priceLabel}</span>
                )}
              </div>
            )}

            <div className="mt-2">
              <Link
                href={enquireHref}
                className="inline-flex items-center rounded-full bg-lime px-6 py-3 text-sm font-semibold text-ink transition-opacity hover:opacity-90"
              >
                Enquire about {layout.name}
              </Link>
              {/* TODO: confirm layout param matches builder integration spec — exact param
                  contract depends on the separate 3D-builder integration work */}
            </div>
          </div>
        );
      })}
    </div>
  );
}
