import { Link } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";
import { ranges } from "@/data/ranges";
import { resolveText } from "@/data/localized-text";
import type { RangeAccent } from "@/data/ranges";

// Card border/text + background classes per accent — same visual values as
// before, now keyed by RangeAccent instead of duplicated per range entry.
const accentStyles: Record<RangeAccent, { border: string; bg: string }> = {
  golden: { border: "border-golden/40 text-golden", bg: "bg-golden-soft" },
  silver: { border: "border-silver/40 text-silver", bg: "bg-silver-soft" },
  drive:  { border: "border-drive/40 text-drive",   bg: "bg-drive-soft" },
};

export default async function RangeSelector() {
  const locale = await getLocale();

  return (
    <section aria-label="Our ranges" className="bg-surface py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-10 text-caption font-semibold uppercase tracking-[0.16em] text-brand">
          Three ranges
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {ranges.map((r) => {
            const { border, bg } = accentStyles[r.accent];
            return (
              <Link
                key={r.slug}
                href={`/ranges/${r.slug}/`}
                className={`group flex flex-col gap-4 rounded-lg border p-8 transition-shadow hover:shadow-md ${bg} ${border}`}
              >
                <span className={`text-caption font-semibold uppercase tracking-[0.12em] ${border}`}>
                  {r.name}
                </span>
                <p className="text-title font-semibold tracking-tight text-text-strong">
                  {resolveText(r.voiceLine, locale)}
                </p>
                <span className="mt-auto text-body-sm font-medium text-text-muted transition-colors group-hover:text-text-strong">
                  Explore →
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
