import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getModelsByRange } from "@/data/models";
import { resolveText } from "@/data/localized-text";
import type { Range, RangeAccent } from "@/data/ranges";

const accentRule: Record<RangeAccent, string> = {
  golden: "bg-golden",
  silver: "bg-silver",
  drive: "bg-drive",
};

const accentText: Record<RangeAccent, string> = {
  golden: "text-golden",
  silver: "text-silver",
  drive: "text-drive",
};

// The identical white typographic header shown above each RangeBand — same
// structure for all three ranges, so no band ever butts directly into
// another without this consistent break.
export default async function RangeBandHeader({ range }: { range: Range }) {
  const locale = await getLocale();
  const count = getModelsByRange(range.slug).length;

  return (
    <div className="bg-surface py-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className={`h-0.5 w-12 rounded-none ${accentRule[range.accent]}`} aria-hidden />
        <h2 className="mt-4 text-headline font-semibold tracking-tight text-text-strong">
          {range.name}
        </h2>
        <p className="mt-2 max-w-lg text-body text-text-muted">
          {resolveText(range.voiceLine, locale)}
        </p>
        <div className="mt-4 flex items-center gap-6">
          <p className="font-mono text-caption uppercase tracking-widest text-text-subtle">
            {count} {locale === "pt" ? "MODELOS" : "MODELS"}
          </p>
          <Link
            href={`/ranges/${range.slug}/`}
            className={`font-mono text-caption font-semibold uppercase tracking-[0.14em] ${accentText[range.accent]}`}
          >
            {locale === "pt" ? "Explorar gama →" : "Explore range →"}
          </Link>
        </div>
      </div>
    </div>
  );
}
