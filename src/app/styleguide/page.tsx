import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { RangeBadge } from "@/components/range-badge"
import { SpecStrip } from "@/components/spec-strip"
import { ModelCard } from "@/components/model-card"
import { RangeHero } from "@/components/range-hero"
import { EnquireForm } from "@/components/enquire-form"
import type { RangeKey } from "@/components/range-config"

const ranges: RangeKey[] = ["golden", "silver", "drive"]

const demoSpecs = [
  { value: "6.80m", label: "LOA" },
  { value: "2.55m", label: "Beam" },
  { value: "350hp", label: "Max" },
]

const modelPreviews: {
  range: RangeKey
  modelName: string
  heroImage: string
  cta: string
}[] = [
  { range: "golden", modelName: "G680", heroImage: "/boats/G680.png", cta: "Build yours →" },
  { range: "silver", modelName: "S470N", heroImage: "/boats/S470N.png", cta: "Explore range" },
  { range: "drive", modelName: "D950 Drive", heroImage: "/boats/D950DRIVE.png", cta: "Build yours →" },
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-caption font-semibold uppercase tracking-[0.16em] text-text-subtle">
      {children}
    </h2>
  )
}

function ContextTag({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-body-sm font-medium text-text-muted">{children}</p>
  )
}

export default function Page() {
  return (
    <div className="min-h-screen bg-surface font-sans text-text-strong">
      {/* 6 — Nav (neutral, brand-level) */}
      <SiteNav />

      <main>
        <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8">
          <header className="border-b border-surface-line pb-10">
            <p className="text-caption font-semibold uppercase tracking-[0.18em] text-brand">
              Grand dealer · Component library
            </p>
            <h1 className="mt-3 text-headline font-semibold tracking-tight text-balance sm:text-display">
              Components, built on the token set
            </h1>
            <p className="mt-5 max-w-2xl text-lead text-text-muted text-pretty">
              Each reusable piece shown on light and dark surfaces where relevant,
              so token behaviour can be checked in both contexts before composing
              real pages.
            </p>
          </header>

          {/* 1 — RangeBadge */}
          <section className="pt-12">
            <SectionLabel>1 · RangeBadge — solid &amp; soft</SectionLabel>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-surface-line bg-surface p-6">
                <ContextTag>On light surface</ContextTag>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    {ranges.map((r) => (
                      <RangeBadge key={r} range={r} variant="solid" />
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {ranges.map((r) => (
                      <RangeBadge key={r} range={r} variant="soft" />
                    ))}
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-ink-line bg-ink p-6">
                <p className="mb-4 text-body-sm font-medium text-ink-text-muted">On ink surface</p>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    {ranges.map((r) => (
                      <RangeBadge key={r} range={r} variant="solid" />
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {ranges.map((r) => (
                      <RangeBadge key={r} range={r} variant="soft" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 2 — SpecStrip */}
          <section className="pt-12">
            <SectionLabel>2 · SpecStrip — light &amp; dark</SectionLabel>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-surface-line bg-surface p-6">
                <ContextTag>surface=&quot;light&quot;</ContextTag>
                <SpecStrip specs={demoSpecs} surface="light" />
              </div>
              <div className="rounded-lg border border-ink-line bg-ink p-6">
                <p className="mb-4 text-body-sm font-medium text-ink-text-muted">surface=&quot;dark&quot;</p>
                <SpecStrip specs={demoSpecs} surface="dark" />
              </div>
            </div>
          </section>

          {/* 3 — ModelCard */}
          <section className="pt-12">
            <SectionLabel>3 · ModelCard — one per range</SectionLabel>
            <ContextTag>
              On surface (default). Golden preview uses the exact spec from the brief.
            </ContextTag>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {modelPreviews.map((m) => (
                <ModelCard
                  key={m.range}
                  range={m.range}
                  modelName={m.modelName}
                  heroImage={m.heroImage}
                  specs={demoSpecs}
                  priceFrom={89400}
                  priceLabel="Base specification, VAT included"
                  href="#"
                  cta={m.cta}
                />
              ))}
            </div>
            {/* Same card on a muted/dark band to verify it holds up */}
            <div className="mt-6 w-full max-w-sm rounded-xl bg-ink p-6">
              <p className="mb-4 text-body-sm font-medium text-ink-text-muted">
                ModelCard on an ink band (card keeps its own light surface)
              </p>
              <ModelCard
                range="golden"
                modelName="G680"
                heroImage="/boats/G680.png"
                specs={demoSpecs}
                priceFrom={89400}
                priceLabel="Base specification, VAT included"
                href="#"
                cta="Build yours →"
              />
            </div>
          </section>
        </div>

        {/* 4 — RangeHero (full-width, inherently dark) */}
        <section className="pt-4">
          <div className="mx-auto max-w-6xl px-6 sm:px-8">
            <SectionLabel>4 · RangeHero — three variants (full-width ink band)</SectionLabel>
          </div>
          <div className="mt-4 flex flex-col gap-px bg-ink-line">
            <RangeHero
              range="golden"
              title="Golden Line"
              subtitle="Premium liveaboard flagship — the top of the range."
              voiceLine="Built to be lived aboard."
            />
            <RangeHero
              range="silver"
              title="Silver Line"
              subtitle="Approachable family and day-boat range — clean and calm."
              voiceLine="The boat that says yes to a normal Tuesday."
            />
            <RangeHero
              range="drive"
              title="Drive Line"
              subtitle="Fastest performance hulls — the loudest of the three."
              voiceLine="Deep-V, raised tube, no apology."
            />
          </div>
        </section>

        {/* 5 — EnquireForm (three ranges side by side) */}
        <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8">
          <section>
            <SectionLabel>5 · EnquireForm — shared structure, range skin</SectionLabel>
            <ContextTag>
              Golden shows the decoded-config block; Silver and Drive omit it. No price anywhere.
            </ContextTag>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <EnquireForm
                range="golden"
                modelName="G680"
                decodedExtras={[
                  "Teak cockpit flooring",
                  "Twin 350hp configuration",
                  "Extended bow sunpad",
                ]}
              />
              <EnquireForm range="silver" modelName="S360" />
              <EnquireForm range="drive" modelName="D300" />
            </div>
          </section>
        </div>
      </main>

      {/* 6 — Footer (neutral, brand-level) */}
      <SiteFooter />
    </div>
  )
}
