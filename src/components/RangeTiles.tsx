import Image from "next/image";
import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ranges } from "@/data/ranges";
import { getModelBySlug, getEffectiveModelCount } from "@/data/models";
import { resolveText } from "@/data/localized-text";
import type { Range, RangeAccent } from "@/data/ranges";

// Same real on-water action shots vetted for the previous full-bleed
// RangeBand — see that component's history for why hero.jpg/detail-1
// aren't usable (both are transparent studio cutaway renders).
const heroImage: Record<Range["slug"], string> = {
  "golden-line": "/images/boats/g750/detail-11.jpg",
  "silver-line": "/images/boats/s470n/detail-12.jpg",
  "drive-line": "/images/boats/d950-drive/detail-22.jpg",
};

const accentRule: Record<RangeAccent, string> = {
  golden: "bg-golden",
  silver: "bg-silver",
  drive: "bg-drive",
};

const colSpan: Record<Range["slug"], string> = {
  "golden-line": "md:col-[1]",
  "silver-line": "md:col-[2]",
  "drive-line": "md:col-[3]",
};

type Chip = { name: string; priceFrom?: number; href: string };

// Hardcoded per range, per spec — deliberately fewer/narrower than the old
// RangeBand's 3-tile row (Golden 2, Silver 1, Drive 2). D600 Lux shares
// D600's own href/model page — see the NOTE above the `d600` entry in
// models.ts for why it isn't a separate top-level Model.
function getChips(rangeSlug: Range["slug"]): Chip[] {
  if (rangeSlug === "golden-line") {
    return ["g980", "g750"].map((slug) => {
      const m = getModelBySlug(slug)!;
      return { name: m.name, priceFrom: m.priceFrom, href: m.href };
    });
  }
  if (rangeSlug === "silver-line") {
    const m = getModelBySlug("s470n")!;
    return [{ name: m.name, priceFrom: m.priceFrom, href: m.href }];
  }
  const d950 = getModelBySlug("d950-drive")!;
  const d600 = getModelBySlug("d600")!;
  const lux = d600.layouts!.find((l) => l.name === "Lux")!;
  return [
    { name: d950.name, priceFrom: d950.priceFrom, href: d950.href },
    { name: "D600 Lux", priceFrom: lux.priceFrom, href: d600.href },
  ];
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-PT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

async function RangeTile({ range, priority }: { range: Range; priority: boolean }) {
  const locale = await getLocale();
  const chips = getChips(range.slug);
  const count = getEffectiveModelCount(range.slug);
  const isGolden = range.slug === "golden-line";

  return (
    <div className={`group relative h-[340px] overflow-hidden rounded-none md:h-full ${colSpan[range.slug]}`}>
      <Image
        src={heroImage[range.slug]}
        alt={range.name}
        fill
        className="object-cover object-[center_60%] transition-transform duration-500 group-hover:scale-105"
        sizes="(min-width: 768px) 40vw, 100vw"
        quality={90}
        priority={priority}
      />
      {/* Bottom-to-top scrim. Mobile never fully clears (less horizontal
          room means text needs protection over more of the tile); desktop
          clears by ~55% height since narrower columns still leave room. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.4)_100%)] md:bg-[linear-gradient(to_top,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0)_55%)]"
      />

      {/* Whole-tile click target, sits beneath the content so chip links
          (rendered after, in normal flow) still capture their own clicks. */}
      <Link
        href={`/ranges/${range.slug}/`}
        aria-label={`Explore ${range.name}`}
        className="absolute inset-0 z-0"
      />

      {/* pointer-events-none so clicks on the image area (most of the tile,
          above this bottom-anchored text block's actual glyphs) fall through
          to the stretched tile-wide Link above. Re-enabled on the chip
          links specifically so they stay independently clickable. */}
      <div className="relative z-10 flex h-full flex-col justify-end gap-2 p-4 pointer-events-none md:p-6">
        <div className={`h-0.5 w-8 rounded-none ${accentRule[range.accent]}`} aria-hidden />
        <h2
          className={`font-semibold tracking-tight text-white ${isGolden ? "text-headline" : "text-title"}`}
        >
          {range.name}
        </h2>
        <p className="text-body-sm text-white/85">{resolveText(range.voiceLine, locale)}</p>
        <p className="text-caption text-white">
          {count} {locale === "pt" ? "modelos" : "models"} · {locale === "pt" ? "Explorar gama →" : "Explore range →"}
        </p>

        <ul className="mt-1 flex flex-col gap-1">
          {chips.map((chip) => (
            <li key={chip.name}>
              <Link
                href={chip.href}
                className="relative z-20 inline-block rounded-none bg-black/60 px-1.5 py-0.5 text-caption text-white transition-colors hover:bg-black/80 pointer-events-auto"
              >
                {chip.name}
                {chip.priceFrom !== undefined && ` · From ${formatPrice(chip.priceFrom)}`}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function RangeTiles() {
  return (
    <section aria-label="Our ranges" className="w-full bg-surface-line">
      <div className="flex flex-col gap-[2px] md:grid md:h-[600px] md:grid-cols-[2fr_1.3fr_1.3fr] md:gap-[2px]">
        {ranges.map((range, i) => (
          <RangeTile key={range.slug} range={range} priority={i === 0} />
        ))}
      </div>
    </section>
  );
}
