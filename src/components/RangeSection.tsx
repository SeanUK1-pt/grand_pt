import Image from "next/image";
import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ranges } from "@/data/ranges";
import { getRangeModelTiles, type RangeModelTile } from "@/data/models";
import { resolveText } from "@/data/localized-text";
import type { Range, RangeAccent } from "@/data/ranges";

// Explicit per-range background, NOT accent-tinted — this section
// deliberately differentiates panels by neutral surface colour alone.
// Drive Line uses `surface-sunken` as the closest existing token to the
// requested #EEF3F8 — this codebase's v0 Coastline palette has no
// `surface-tint` token (that name existed pre-v0 and was dropped).
const panelBg: Record<Range["slug"], string> = {
  "golden-line": "bg-surface-muted",
  "silver-line": "bg-surface",
  "drive-line": "bg-surface-sunken",
};

const accentRule: Record<RangeAccent, string> = {
  golden: "bg-golden",
  silver: "bg-silver",
  drive: "bg-drive",
};

const desktopCols: Record<number, string> = {
  4: "sm:grid-cols-4",
  6: "sm:grid-cols-6",
  9: "sm:grid-cols-9",
  11: "sm:grid-cols-11",
};

// Explicit grid placement so the DOM stays in natural reading order
// (panel, strip, panel, strip, panel, strip — matching mobile's stacked
// flow) while desktop still lays the 3 panels out as one row, with each
// strip breaking to its own full-width row underneath.
const panelColStart: Record<number, string> = {
  0: "sm:col-start-1",
  1: "sm:col-start-2",
  2: "sm:col-start-3",
};
const stripRowStart: Record<number, string> = {
  0: "sm:row-start-2",
  1: "sm:row-start-3",
  2: "sm:row-start-4",
};

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-PT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function RangeModelTileCard({ tile }: { tile: RangeModelTile }) {
  return (
    <Link
      href={tile.href}
      className="flex w-[200px] shrink-0 flex-col border-b border-surface-line sm:w-auto"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-none bg-surface-sunken">
        <Image
          src={tile.image}
          alt={tile.name}
          fill
          className="rounded-none object-cover"
          sizes="(min-width: 640px) 15vw, 200px"
        />
      </div>
      <div className="flex flex-col gap-1 px-1 py-3">
        <h3 className="text-body-sm font-bold text-text-strong">{tile.name}</h3>
        <p className="text-caption text-text-subtle">{tile.loa}</p>
        {tile.priceFrom !== undefined && (
          <p className="text-caption text-text-subtle">From {formatPrice(tile.priceFrom)}</p>
        )}
      </div>
    </Link>
  );
}

export default async function RangeSection() {
  const locale = await getLocale();

  return (
    <section aria-label="Our ranges" className="flex w-full flex-col sm:grid sm:grid-cols-3">
      {ranges.map((range, i) => {
        const tiles = getRangeModelTiles(range.slug);
        const colsClass = desktopCols[tiles.length] ?? "sm:grid-cols-6";

        return (
          <div key={range.slug} className="contents">
            <div
              className={`flex min-h-[320px] flex-col justify-between rounded-none border-t border-surface-line px-6 py-10 first:border-t-0 sm:border-t-0 sm:border-l sm:px-8 sm:first:border-l-0 ${panelColStart[i]} sm:row-start-1 ${panelBg[range.slug]}`}
            >
              <div>
                <p className="font-mono text-caption text-text-subtle">
                  {tiles.length} {locale === "pt" ? "MODELOS" : "MODELS"}
                </p>
                <h2 className="mt-3 text-display font-semibold tracking-tight text-text-strong">
                  {range.name}
                </h2>
                <div className={`mt-4 h-0.5 w-8 rounded-none ${accentRule[range.accent]}`} aria-hidden />
                <p className="mt-4 text-body text-text-muted">
                  {resolveText(range.voiceLine, locale)}
                </p>
              </div>

              <Link
                href={`/ranges/${range.slug}/`}
                className="mt-8 font-mono text-caption font-semibold uppercase tracking-[0.14em] text-text-strong"
              >
                {locale === "pt" ? "Explorar gama →" : "Explore range →"}
              </Link>
            </div>

            <div
              className={`flex overflow-x-auto sm:col-span-3 sm:grid sm:overflow-visible ${colsClass} ${stripRowStart[i]} ${panelBg[range.slug]}`}
            >
              {tiles.map((tile) => (
                <RangeModelTileCard key={tile.key} tile={tile} />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
