import Link from "next/link";

const ranges = [
  {
    name: "Golden Line",
    slug: "golden-line",
    voiceLine: "Built to be lived aboard.",
    accent: "border-golden/40 text-golden",
    bg: "bg-golden-muted",
    href: "/ranges/golden-line/",
  },
  {
    name: "Silver Line",
    slug: "silver-line",
    voiceLine: "The boat that says yes to a normal Tuesday.",
    accent: "border-silver/40 text-silver",
    bg: "bg-silver-muted",
    href: "/ranges/silver-line/",
  },
  {
    name: "Drive Line",
    slug: "drive-line",
    voiceLine: "Deep-V, raised tube, no apology.",
    accent: "border-drive/40 text-drive",
    bg: "bg-drive-muted",
    href: "/ranges/drive-line/",
  },
] as const;

export default function RangeSelector() {
  return (
    <section aria-label="Our ranges" className="bg-surface py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-10 text-sm font-medium uppercase tracking-widest text-ink-subtle">
          Three ranges
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {ranges.map((r) => (
            <Link
              key={r.slug}
              href={r.href}
              className={`group flex flex-col gap-4 rounded-2xl border p-8 transition-shadow hover:shadow-md ${r.bg} ${r.accent}`}
            >
              <span className={`text-xs font-semibold uppercase tracking-widest ${r.accent}`}>
                {r.name}
              </span>
              <p className="text-xl font-medium leading-snug text-ink">
                {r.voiceLine}
              </p>
              <span className="mt-auto text-sm font-medium text-ink-muted transition-colors group-hover:text-ink">
                Explore →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
