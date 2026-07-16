import type { SpecCategory } from "@/data/models";
import type { RangeAccent } from "@/data/ranges";

type Props = {
  specs: SpecCategory[];
  accent: RangeAccent;
};

const accentRule: Record<RangeAccent, string> = {
  golden: "bg-golden",
  silver: "bg-silver",
  drive:  "bg-drive",
};

export default function SpecSheet({ specs, accent }: Props) {
  return (
    <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
      {specs.map(({ category, items }) => (
        <div key={category}>
          {/* Category heading — thin accent rule as detail, matching RangeHero */}
          <div className={`h-0.5 w-8 ${accentRule[accent]}`} aria-hidden />
          <h3 className="mt-3 text-caption font-semibold uppercase tracking-[0.12em] text-text-strong">
            {category}
          </h3>

          <dl className="mt-4 divide-y divide-surface-line">
            {items.map(({ label, value }) => (
              <div
                key={label}
                className="flex items-baseline justify-between gap-4 py-3"
              >
                <dt className="text-body-sm text-text-subtle">{label}</dt>
                <dd className="text-body-sm font-medium text-text-strong text-right">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}
