import { directions, type Direction } from "./palette-data"

export default function Page() {
  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] font-sans text-[#15202B]">
      <header className="mx-auto max-w-5xl px-6 pt-16 pb-10 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7A8893]">
          RIB Dealer · Brand colour study
        </p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-balance sm:text-5xl">
          Two palette directions for a sporty, semi-luxury RIB dealer
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#4A5A66] text-pretty">
          Both directions share one base system with three differentiated
          range accents — Golden Line, Silver Line and Drive Line. Compare a
          dark, performance-led base against a light, lifestyle-led base, then
          judge whether the three accents read as one family.
        </p>
      </header>

      <main className="mx-auto max-w-5xl space-y-20 px-6 pb-28 sm:px-8">
        {directions.map((d) => (
          <DirectionBlock key={d.id} direction={d} />
        ))}

        <section className="rounded-2xl border border-[#E4E8E7] bg-white p-6 sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight">My recommendation</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-[#4A5A66] text-pretty">
            I&apos;d lead with <strong>Slipstream</strong> (the dark ink base).
            For &quot;sporty semi-luxury&quot; it carries more confidence and
            energy, makes on-water photography pop, and reads premium without
            slipping into the navy-and-gold yacht cliché. Coastline is the
            safer, more approachable fallback if the dealer wants an airy,
            lifestyle feel — and the two share the same accent logic, so the
            sub-brand identities survive either way.
          </p>
        </section>
      </main>
    </div>
  )
}

function DirectionBlock({ direction: d }: { direction: Direction }) {
  return (
    <section>
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {d.name}
        </h2>
        <span className="rounded-full border border-[#D8DDDC] px-3 py-1 text-xs font-medium uppercase tracking-wider text-[#5C6E7A]">
          {d.baseType}
        </span>
        {d.recommended && (
          <span className="rounded-full bg-[#15202B] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
            Recommended
          </span>
        )}
      </div>
      <p className="mt-2 text-lg font-medium text-[#15202B]">{d.summary}</p>
      <p className="mt-3 max-w-2xl leading-relaxed text-[#4A5A66] text-pretty">
        {d.rationale}
      </p>

      {/* Base neutrals */}
      <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.14em] text-[#7A8893]">
        Base &amp; neutrals
      </h3>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {d.neutrals.map((s) => (
          <div
            key={s.name}
            className="overflow-hidden rounded-xl border border-[#E4E8E7]"
          >
            <div
              className="flex h-24 items-end p-3"
              style={{ backgroundColor: s.hex, color: s.on }}
            >
              <span className="text-xs font-medium opacity-90">{s.role}</span>
            </div>
            <div className="bg-white px-3 py-2">
              <p className="text-sm font-semibold leading-tight">{s.name}</p>
              <p className="font-mono text-xs uppercase text-[#7A8893]">
                {s.hex}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Range accents */}
      <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.14em] text-[#7A8893]">
        Range accents
      </h3>
      <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-3">
        {d.accents.map((a) => (
          <div
            key={a.range}
            className="flex flex-col overflow-hidden rounded-xl border border-[#E4E8E7] bg-white"
          >
            <div
              className="flex h-32 flex-col justify-between p-4"
              style={{ backgroundColor: a.swatch.hex, color: a.swatch.on }}
            >
              <span className="text-xs font-medium uppercase tracking-wider opacity-90">
                {a.range}
              </span>
              <div>
                <p className="text-lg font-semibold leading-tight">
                  {a.swatch.name}
                </p>
                <p className="font-mono text-xs uppercase opacity-80">
                  {a.swatch.hex}
                </p>
              </div>
            </div>
            <div className="flex flex-1 flex-col p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-[#7A8893]">
                {a.tag}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#4A5A66] text-pretty">
                {a.rationale}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Family preview on base */}
      <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.14em] text-[#7A8893]">
        All three accents on the {d.name} base
      </h3>
      <div
        className="mt-3 rounded-2xl border p-6 sm:p-8"
        style={{ backgroundColor: d.pageBg, borderColor: d.hairline }}
      >
        <p className="text-sm font-medium" style={{ color: d.mutedOn }}>
          Our ranges
        </p>
        <h4
          className="mt-1 text-2xl font-semibold tracking-tight"
          style={{ color: d.textOn }}
        >
          One family, three characters
        </h4>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {d.accents.map((a) => (
            <div
              key={a.range}
              className="rounded-xl p-5"
              style={{ backgroundColor: d.surface, border: `1px solid ${d.hairline}` }}
            >
              <span
                className="inline-block h-2.5 w-2.5 rounded-full align-middle"
                style={{ backgroundColor: a.swatch.hex }}
                aria-hidden="true"
              />
              <span
                className="ml-2 align-middle text-sm font-semibold"
                style={{ color: d.textOn }}
              >
                {a.range}
              </span>
              <p className="mt-3 text-sm" style={{ color: d.mutedOn }}>
                From €{a.range === "Golden Line" ? "150,000" : a.range === "Drive Line" ? "95,000" : "60,000"}
              </p>
              <button
                type="button"
                className="mt-4 w-full rounded-lg py-2.5 text-sm font-semibold"
                style={{ backgroundColor: a.swatch.hex, color: a.swatch.on }}
              >
                Explore range
              </button>
            </div>
          ))}
        </div>

        {/* solid accent bar to judge the family together */}
        <div className="mt-6 flex h-12 overflow-hidden rounded-lg">
          {d.accents.map((a) => (
            <div
              key={a.range}
              className="flex-1"
              style={{ backgroundColor: a.swatch.hex }}
              title={`${a.range} — ${a.swatch.hex}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
