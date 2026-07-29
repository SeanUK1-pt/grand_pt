import type { RangeAccent } from "@/data/ranges";

type Props = {
  standard: string[];
  optional: string[];
  standardLabel: string;
  optionalLabel: string;
  accent: RangeAccent;
};

const accentText: Record<RangeAccent, string> = {
  golden: "text-golden",
  silver: "text-silver",
  drive:  "text-drive",
};

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path d="M4 10.5L8 14.5L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function EquipmentList({ standard, optional, standardLabel, optionalLabel, accent }: Props) {
  return (
    <div className="grid gap-10 sm:grid-cols-2">
      <div>
        <h3 className="mb-4 text-caption font-semibold uppercase tracking-[0.12em] text-text-strong">
          {standardLabel}
        </h3>
        <ul className="flex flex-col gap-2.5">
          {standard.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-body-sm leading-relaxed text-text-muted">
              <CheckIcon className={`mt-0.5 h-4 w-4 shrink-0 ${accentText[accent]}`} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="mb-4 text-caption font-semibold uppercase tracking-[0.12em] text-text-strong">
          {optionalLabel}
        </h3>
        <ul className="flex flex-col gap-2.5">
          {optional.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-body-sm leading-relaxed text-text-subtle">
              <span className={`mt-0.5 w-4 shrink-0 text-center text-body-sm leading-4 ${accentText[accent]}`} aria-hidden="true">
                +
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
