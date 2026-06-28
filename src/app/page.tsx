const neutrals = [
  { token: "--color-surface", cls: "bg-surface", hex: "#FFFFFF", role: "Page canvas" },
  { token: "--color-surface-muted", cls: "bg-surface-muted", hex: "#F2F5F7", role: "Muted band" },
  { token: "--color-surface-sunken", cls: "bg-surface-sunken", hex: "#E8EDF1", role: "Insets / wells" },
  { token: "--color-surface-line", cls: "bg-surface-line", hex: "#D8E0E6", role: "Borders on light" },
  { token: "--color-ink", cls: "bg-ink", hex: "#0C2336", role: "Dark feature canvas" },
  { token: "--color-ink-raised", cls: "bg-ink-raised", hex: "#122E45", role: "Cards on ink" },
  { token: "--color-ink-overlay", cls: "bg-ink-overlay", hex: "#1B3C57", role: "Hover on ink" },
  { token: "--color-ink-line", cls: "bg-ink-line", hex: "#2A475F", role: "Borders on ink" },
] as const

const brandSwatches = [
  { token: "--color-brand", cls: "bg-brand", hex: "#01539D", role: "Grand blue — primary", contrast: "text-brand-contrast" },
  { token: "--color-brand-hover", cls: "bg-brand-hover", hex: "#0468BF", role: "Brand hover", contrast: "text-brand-contrast" },
  { token: "--color-brand-active", cls: "bg-brand-active", hex: "#013F78", role: "Brand pressed", contrast: "text-brand-contrast" },
  { token: "--color-pop", cls: "bg-pop", hex: "#A6CC0F", role: "Grand lime — pop", contrast: "text-pop-contrast" },
] as const

const typeScale = [
  { token: "--text-display", px: "64px", cls: "text-display", weight: "font-semibold tracking-tight" },
  { token: "--text-headline", px: "40px", cls: "text-headline", weight: "font-semibold tracking-tight" },
  { token: "--text-title", px: "28px", cls: "text-title", weight: "font-semibold tracking-tight" },
  { token: "--text-lead", px: "20px", cls: "text-lead", weight: "font-normal" },
  { token: "--text-body", px: "16px", cls: "text-body", weight: "font-normal" },
  { token: "--text-body-sm", px: "14px", cls: "text-body-sm", weight: "font-normal" },
  { token: "--text-caption", px: "12px", cls: "text-caption", weight: "font-medium uppercase tracking-[0.14em]" },
] as const

type Range = {
  label: string
  model: string
  desc: string
  solid: string
  solidContrast: string
  soft: string
  pillToken: string
  softToken: string
}

const ranges: Range[] = [
  {
    label: "Golden Line",
    model: "Golden Line 580",
    desc: "Premium liveaboard flagship — the top of the range.",
    solid: "bg-golden",
    solidContrast: "text-golden-contrast",
    soft: "bg-golden-soft",
    pillToken: "golden / golden-contrast",
    softToken: "golden-soft",
  },
  {
    label: "Silver Line",
    model: "Silver Line 360",
    desc: "Approachable family and day-boat range — clean and calm.",
    solid: "bg-silver",
    solidContrast: "text-silver-contrast",
    soft: "bg-silver-soft",
    pillToken: "silver / silver-contrast",
    softToken: "silver-soft",
  },
  {
    label: "Drive Line",
    model: "Drive Line 300",
    desc: "Fastest performance hulls — the loudest of the three.",
    solid: "bg-drive",
    solidContrast: "text-drive-contrast",
    soft: "bg-drive-soft",
    pillToken: "drive / drive-contrast",
    softToken: "drive-soft",
  },
]

const radii = [
  { token: "--radius-sm", cls: "rounded-sm", label: "sm · 4px" },
  { token: "--radius-md", cls: "rounded-md", label: "md · 8px" },
  { token: "--radius-lg", cls: "rounded-lg", label: "lg · 14px" },
  { token: "--radius-xl", cls: "rounded-xl", label: "xl · 20px" },
]

const gaps = [
  { cls: "gap-2", label: "gap-2 · 8px" },
  { cls: "gap-4", label: "gap-4 · 16px" },
  { cls: "gap-6", label: "gap-6 · 24px" },
  { cls: "gap-8", label: "gap-8 · 32px" },
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-caption font-semibold uppercase tracking-[0.16em] text-text-subtle">
      {children}
    </h2>
  )
}

export default function Page() {
  return (
    <div className="min-h-screen bg-surface font-sans text-text-strong">
      <main className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
        <header className="border-b border-surface-line pb-10">
          <p className="text-caption font-semibold uppercase tracking-[0.18em] text-brand">
            Coastline · Grand dealer token proof sheet
          </p>
          <h1 className="mt-3 text-headline font-semibold tracking-tight text-balance sm:text-display">
            Brand tokens, shown in full
          </h1>
          <p className="mt-5 max-w-2xl text-lead text-text-muted text-pretty">
            A light, Grand-blue-led token set for the dealer subsite — surfaces,
            the primary blue and lime pop, the type scale, three distinct range
            accents in solid and soft states, sample cards, and the radius and
            spacing rhythm.
          </p>
        </header>

        {/* Brand + pop swatches */}
        <section className="pt-12">
          <SectionLabel>Primary brand &amp; pop</SectionLabel>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {brandSwatches.map((b) => (
              <div
                key={b.token}
                className="overflow-hidden rounded-lg border border-surface-line"
              >
                <div className={`flex h-24 items-end p-3 ${b.cls}`}>
                  <span className={`font-mono text-caption ${b.contrast}`}>{b.hex}</span>
                </div>
                <div className="bg-surface px-3 py-3">
                  <p className="text-body-sm font-semibold leading-tight">{b.role}</p>
                  <p className="mt-1 font-mono text-caption text-text-muted">{b.token}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Neutral swatches */}
        <section className="pt-12">
          <SectionLabel>Neutrals &amp; surfaces</SectionLabel>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {neutrals.map((n) => (
              <div
                key={n.token}
                className="overflow-hidden rounded-lg border border-surface-line"
              >
                <div className={`h-24 ${n.cls}`} />
                <div className="bg-surface px-3 py-3">
                  <p className="text-body-sm font-semibold leading-tight">{n.role}</p>
                  <p className="mt-1 font-mono text-caption text-text-muted">{n.token}</p>
                  <p className="font-mono text-caption uppercase text-text-subtle">{n.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Type scale */}
        <section className="pt-14">
          <SectionLabel>Type scale — Geist Sans</SectionLabel>
          <div className="mt-4 divide-y divide-surface-line rounded-xl border border-surface-line bg-surface">
            {typeScale.map((t) => (
              <div
                key={t.token}
                className="flex flex-col gap-1 px-5 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <p className={`${t.cls} ${t.weight} text-text-strong text-pretty`}>
                  Grand Marine
                </p>
                <p className="shrink-0 font-mono text-caption text-text-muted">
                  {t.token} · {t.px}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Accent badges: solid + soft */}
        <section className="pt-14">
          <SectionLabel>Range accents — solid pill &amp; soft tag</SectionLabel>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {ranges.map((r) => (
              <div
                key={r.label}
                className="rounded-xl border border-surface-line bg-surface p-5"
              >
                <p className="text-body-sm font-semibold text-text-strong">{r.label}</p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-body-sm font-semibold ${r.solid} ${r.solidContrast}`}
                  >
                    Solid pill
                  </span>
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-body-sm font-medium text-text-strong ${r.soft}`}
                  >
                    Soft tag
                  </span>
                </div>
                <p className="mt-4 font-mono text-caption text-text-subtle">
                  pill: {r.pillToken}
                </p>
                <p className="font-mono text-caption text-text-subtle">
                  soft: {r.softToken} + text-strong
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Sample cards on surface */}
        <section className="pt-14">
          <SectionLabel>Sample range cards</SectionLabel>
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {ranges.map((r) => (
              <article
                key={r.label}
                className="rounded-xl border border-surface-line bg-surface p-6 shadow-sm"
              >
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-caption font-semibold uppercase tracking-wider ${r.soft} text-text-strong`}
                >
                  {r.label}
                </span>
                <h3 className="mt-4 text-title font-semibold tracking-tight text-text-strong">
                  {r.model}
                </h3>
                <p className="mt-2 text-body-sm leading-relaxed text-text-muted text-pretty">
                  {r.desc}
                </p>
                <button
                  type="button"
                  className={`mt-5 w-full rounded-md py-2.5 text-body-sm font-semibold ${r.solid} ${r.solidContrast}`}
                >
                  Explore range
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* Dark feature section (retained ink family) */}
        <section className="pt-14">
          <SectionLabel>Optional dark feature section</SectionLabel>
          <div className="mt-4 rounded-xl border border-ink-line bg-ink p-8">
            <span className="inline-flex items-center rounded-full bg-brand px-3 py-1 text-caption font-semibold uppercase tracking-wider text-brand-contrast">
              Showroom
            </span>
            <h3 className="mt-4 text-title font-semibold tracking-tight text-ink-text sm:text-headline">
              A premium band, used sparingly
            </h3>
            <p className="mt-3 max-w-xl text-body text-ink-text-muted text-pretty">
              The ink family keeps a dark, high-end option for hero or flagship
              moments — without making the whole site dark and off-brand.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                className="rounded-md bg-brand px-5 py-2.5 text-body-sm font-semibold text-brand-contrast"
              >
                Book a viewing
              </button>
              <button
                type="button"
                className="rounded-md bg-pop px-5 py-2.5 text-body-sm font-semibold text-pop-contrast"
              >
                Build your boat
              </button>
            </div>
          </div>
        </section>

        {/* Radius + spacing ruler */}
        <section className="pt-14 pb-8">
          <SectionLabel>Radius scale</SectionLabel>
          <div className="mt-4 flex flex-wrap gap-6">
            {radii.map((r) => (
              <div key={r.token} className="flex flex-col items-center gap-2">
                <div
                  className={`h-20 w-20 border border-brand bg-brand-soft ${r.cls}`}
                />
                <p className="font-mono text-caption text-text-muted">{r.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <SectionLabel>Spacing rhythm — 8px base</SectionLabel>
            <div className="mt-4 space-y-4">
              {gaps.map((g) => (
                <div key={g.cls} className="flex items-center gap-4">
                  <p className="w-28 shrink-0 font-mono text-caption text-text-muted">
                    {g.label}
                  </p>
                  <div className={`flex ${g.cls}`}>
                    {[0, 1, 2, 3].map((i) => (
                      <div key={i} className="h-8 w-8 rounded-sm bg-brand" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
