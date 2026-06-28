import { rangeConfig, type RangeKey } from "./range-config"

type RangeBadgeProps = {
  range: RangeKey
  variant?: "solid" | "soft"
  /** Override the label text; defaults to the range's full line name. */
  children?: React.ReactNode
  className?: string
}

/**
 * Small caption-size pill used inline beside model names and as a tag on cards.
 * - solid: accent base background + contrast text
 * - soft:  accent soft tint background + text-strong
 */
export function RangeBadge({
  range,
  variant = "solid",
  children,
  className = "",
}: RangeBadgeProps) {
  const style = rangeConfig[range]
  const skin =
    variant === "solid"
      ? `${style.solidBg} ${style.solidText}`
      : `${style.softBg} text-text-strong`

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-caption font-semibold uppercase tracking-[0.12em] ${skin} ${className}`}
    >
      {children ?? style.label}
    </span>
  )
}
