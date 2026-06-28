export type Spec = {
  value: string
  label: string
}

type SpecStripProps = {
  specs: Spec[]
  /** Renders dividers and text colours appropriately for the underlying surface. */
  surface?: "light" | "dark"
  className?: string
}

/**
 * Horizontal row of 3–5 stat blocks separated by hairline dividers.
 * Value in title weight, label in muted caption. Works on light and dark.
 */
export function SpecStrip({
  specs,
  surface = "light",
  className = "",
}: SpecStripProps) {
  const divider = surface === "dark" ? "divide-ink-line" : "divide-surface-line"
  const valueColor = surface === "dark" ? "text-ink-text" : "text-text-strong"
  const labelColor = surface === "dark" ? "text-ink-text-muted" : "text-text-muted"

  return (
    <dl
      className={`flex divide-x ${divider} ${className}`}
    >
      {specs.map((spec) => (
        <div key={spec.label} className="flex flex-col gap-1 px-4 first:pl-0">
          <dt className="sr-only">{spec.label}</dt>
          <dd className={`text-lead font-semibold leading-none tracking-tight ${valueColor}`}>
            {spec.value}
          </dd>
          <span className={`text-caption font-medium uppercase tracking-[0.1em] ${labelColor}`}>
            {spec.label}
          </span>
        </div>
      ))}
    </dl>
  )
}
