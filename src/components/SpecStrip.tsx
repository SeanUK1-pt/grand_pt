import { getLocale } from "next-intl/server";
import { translateSpecLabel } from "@/data/spec-labels";

type ModelSpec = { value: string; label: string };

type Props = {
  specs: ModelSpec[];
  surface?: "light" | "dark";
};

export default async function SpecStrip({ specs, surface = "light" }: Props) {
  const isDark = surface === "dark";
  const locale = await getLocale();

  return (
    <div
      className={`flex items-stretch divide-x ${
        isDark ? "divide-ink-line" : "divide-surface-line"
      }`}
    >
      {specs.map(({ value, label }) => (
        <div key={label} className="flex flex-col gap-1.5 px-6 first:pl-0 last:pr-0">
          <span
            className={`text-caption font-medium uppercase tracking-[0.1em] ${
              isDark ? "text-ink-text-muted" : "text-text-subtle"
            }`}
          >
            {translateSpecLabel(label, locale)}
          </span>
          <span
            className={`text-lead font-semibold tabular-nums leading-none tracking-tight ${
              isDark ? "text-ink-text" : "text-text-strong"
            }`}
          >
            {value}
          </span>
        </div>
      ))}
    </div>
  );
}
