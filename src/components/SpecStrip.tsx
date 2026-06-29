type ModelSpec = { value: string; label: string };

type Props = {
  specs: ModelSpec[];
  surface?: "light" | "dark";
};

export default function SpecStrip({ specs, surface = "light" }: Props) {
  const isDark = surface === "dark";

  return (
    <div
      className={`flex items-stretch divide-x ${
        isDark ? "divide-surface/15" : "divide-ink/10"
      }`}
    >
      {specs.map(({ value, label }) => (
        <div key={label} className="flex flex-col gap-0.5 px-6 first:pl-0 last:pr-0">
          <span
            className={`text-2xl font-semibold tabular-nums leading-none ${
              isDark ? "text-surface" : "text-ink"
            }`}
          >
            {value}
          </span>
          <span
            className={`text-xs uppercase tracking-wide ${
              isDark ? "text-surface/50" : "text-ink-subtle"
            }`}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
