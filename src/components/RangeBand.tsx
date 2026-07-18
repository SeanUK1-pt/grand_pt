import Image from "next/image";
import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getModelBySlug } from "@/data/models";
import { resolveText } from "@/data/localized-text";
import type { Range, RangeAccent } from "@/data/ranges";

// Neither `hero.jpg` (doesn't exist — only `hero.png`) nor its fallback
// `detail-1` are usable here: both turned out to be transparent top-down
// studio cutaway renders (confirmed by opening them), not photos — unusable
// as a full-bleed background. Using each model's confirmed real on-water
// action shot instead (already vetted earlier in this project: g750's and
// d950-drive's were used as home-hero-carousel slides, s470n's is that
// model's own official `image`).
const heroImage: Record<Range["slug"], string> = {
  "golden-line": "/images/boats/g750/detail-11.jpg",
  "silver-line": "/images/boats/s470n/detail-12.jpg",
  "drive-line": "/images/boats/d950-drive/detail-17.jpg",
};

const accentRule: Record<RangeAccent, string> = {
  golden: "bg-golden",
  silver: "bg-silver",
  drive: "bg-drive",
};

type BandCard = { name: string; loa: string; priceFrom?: number; href: string };

// Hardcoded per range, per spec — not dynamically selected. D600 Lux/Active
// aren't top-level Models (D600 is one Model with a `layouts` array — see
// the NOTE above the `d600` entry in models.ts), so both share D600's own
// LOA/href and pull their price from the matching layout.
function getBandCards(rangeSlug: Range["slug"]): BandCard[] {
  if (rangeSlug === "golden-line") {
    return ["g980", "g680", "g420"].map((slug) => {
      const m = getModelBySlug(slug)!;
      return { name: m.name, loa: m.specs[0].value, priceFrom: m.priceFrom, href: m.href };
    });
  }
  if (rangeSlug === "silver-line") {
    return ["s470n", "s330", "s275"].map((slug) => {
      const m = getModelBySlug(slug)!;
      return { name: m.name, loa: m.specs[0].value, priceFrom: m.priceFrom, href: m.href };
    });
  }

  const d950 = getModelBySlug("d950-drive")!;
  const d600 = getModelBySlug("d600")!;
  const lux = d600.layouts!.find((l) => l.name === "Lux")!;
  const active = d600.layouts!.find((l) => l.name === "Active")!;
  return [
    { name: d950.name, loa: d950.specs[0].value, priceFrom: d950.priceFrom, href: d950.href },
    { name: "D600 Lux", loa: d600.specs[0].value, priceFrom: lux.priceFrom, href: d600.href },
    { name: "D600 Active", loa: d600.specs[0].value, priceFrom: active.priceFrom, href: d600.href },
  ];
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-PT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function BandCardLink({ card }: { card: BandCard }) {
  return (
    <Link
      href={card.href}
      className="flex w-[160px] shrink-0 flex-col justify-between gap-3 rounded-none border border-white/15 bg-black/55 p-3 transition-colors hover:border-white/40 hover:bg-black/65 md:w-[200px]"
    >
      <h3 className="text-body-sm font-bold text-white">{card.name}</h3>
      <div className="flex flex-col gap-0.5">
        <p className="font-mono text-caption text-white/70">{card.loa}</p>
        {card.priceFrom !== undefined && (
          <p className="font-mono text-caption text-white/70">From {formatPrice(card.priceFrom)}</p>
        )}
      </div>
    </Link>
  );
}

export default async function RangeBand({ range }: { range: Range }) {
  const locale = await getLocale();
  const cards = getBandCards(range.slug);

  return (
    <section
      aria-label={`${range.name} range`}
      className="relative w-full overflow-hidden rounded-none md:min-h-[70vh]"
    >
      <Image
        src={heroImage[range.slug]}
        alt={range.name}
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(160deg,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0.35)_45%,rgba(0,0,0,0.25)_100%)] md:bg-[linear-gradient(to_right,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0)_50%)]"
      />

      <div className="relative z-10 flex flex-col gap-8 px-6 py-12 md:min-h-[70vh] md:flex-row md:items-end md:justify-between md:px-12 md:py-16">
        <div className="md:w-[45%]">
          <div className={`h-0.5 w-10 rounded-none ${accentRule[range.accent]}`} aria-hidden />
          <h2 className="mt-4 text-display font-semibold tracking-tight text-white">
            {range.name}
          </h2>
          <p className="mt-3 text-lead text-white/80">{resolveText(range.voiceLine, locale)}</p>
          <Link
            href={`/ranges/${range.slug}/`}
            className="mt-6 inline-block font-mono text-caption font-semibold uppercase tracking-[0.14em] text-white"
          >
            {locale === "pt" ? "Explorar gama →" : "Explore range →"}
          </Link>
        </div>

        <div className="flex gap-4 overflow-x-auto md:w-[55%] md:justify-end md:overflow-visible">
          {cards.map((card) => (
            <BandCardLink key={card.name} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
