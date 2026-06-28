// Shared range-accent configuration.
//
// Tailwind v4 only generates utilities it can see as complete literal strings,
// so every accent class a component might use is written out in full here
// (no runtime string concatenation like `bg-${range}`). Components read the
// class names from this map by range key.

export type RangeKey = "golden" | "silver" | "drive"

export type RangeStyle = {
  /** Human-readable line name, e.g. "Golden Line" */
  label: string
  /** Solid accent background (token: --color-<range>) */
  solidBg: string
  /** Solid accent hover background (token: --color-<range>-hover) */
  solidHoverBg: string
  /** Readable text/icon colour on the solid accent (token: --color-<range>-contrast) */
  solidText: string
  /** Soft tint background for chips/headers (token: --color-<range>-soft) */
  softBg: string
  /** Accent as foreground colour (token: --color-<range>) */
  text: string
  /** Accent as border colour */
  border: string
  /** Accent top-border helper for header bars */
  borderTop: string
  /** Focus ring in the accent colour */
  focusRing: string
}

export const rangeConfig: Record<RangeKey, RangeStyle> = {
  golden: {
    label: "Golden Line",
    solidBg: "bg-golden",
    solidHoverBg: "hover:bg-golden-hover",
    solidText: "text-golden-contrast",
    softBg: "bg-golden-soft",
    text: "text-golden",
    border: "border-golden",
    borderTop: "border-t-golden",
    focusRing: "focus-visible:ring-golden",
  },
  silver: {
    label: "Silver Line",
    solidBg: "bg-silver",
    solidHoverBg: "hover:bg-silver-hover",
    solidText: "text-silver-contrast",
    softBg: "bg-silver-soft",
    text: "text-silver",
    border: "border-silver",
    borderTop: "border-t-silver",
    focusRing: "focus-visible:ring-silver",
  },
  drive: {
    label: "Drive Line",
    solidBg: "bg-drive",
    solidHoverBg: "hover:bg-drive-hover",
    solidText: "text-drive-contrast",
    softBg: "bg-drive-soft",
    text: "text-drive",
    border: "border-drive",
    borderTop: "border-t-drive",
    focusRing: "focus-visible:ring-drive",
  },
}
