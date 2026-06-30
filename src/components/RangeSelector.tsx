import { Link } from "@/i18n/navigation";
import { ranges } from "@/data/ranges";
import type { RangeAccent } from "@/data/ranges";

// Card border/text + background classes per accent — same visual values as
// before, now keyed by RangeAccent instead of duplicated per range entry.
const accentStyles: Record<RangeAccent, { border: string; bg: string }> = {
  golden: { border: "border-golden/40 text-golden", bg: "bg-golden-muted" },
  silver: { border: "border-silver/40 text-silver", bg: "bg-silver-muted" },
  drive:  { border: "border-drive/40 text-drive",   bg: "bg-drive-muted" },
};

export default function RangeSelector() {
  return (
    <section aria-label="Our ranges" className="bg-surface py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-10 text-sm font-medium uppercase tracking-widest text-ink-subtle">
          Three ranges
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {ranges.map((r) => {
            const { border, bg } = accentStyles[r.accent];
            return (
              <Link
                key={r.slug}
                href={`/ranges/${r.slug}/`}
                className={`group flex flex-col gap-4 rounded-2xl border p-8 transition-shadow hover:shadow-md ${bg} ${border}`}
              >
                <span className={`text-xs font-semibold uppercase tracking-widest ${border}`}>
                  {r.name}
                </span>
                <p className="text-xl font-medium leading-snug text-ink">
                  {r.voiceLine}
                </p>
                <span className="mt-auto text-sm font-medium text-ink-muted transition-colors group-hover:text-ink">
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
