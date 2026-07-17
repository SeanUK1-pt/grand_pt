import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import EnquireForm from "@/components/EnquireForm";
import { decodeBuilderLink } from "@/lib/decodeBuilderLink";
import { ranges, getRangeBySlug } from "@/data/ranges";
import { getModelBySlug } from "@/data/models";
import type { Range } from "@/data/ranges";

type Props = {
  params: Promise<{ locale: string; range: string }>;
  searchParams: Promise<{ bm?: string; builderLink?: string; layout?: string }>;
};

export async function generateStaticParams() {
  // Only the range slugs are static segments — bm/builderLink/layout are
  // runtime query params, not part of the route shape.
  return ranges.map((r) => ({ range: r.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { range: rangeSlug } = await params;
  const range = getRangeBySlug(rangeSlug as Range["slug"]);
  if (!range) return {};
  return {
    title: `Enquire — ${range.name} — Grand Boats Portugal`,
  };
}

export default async function EnquirePage({ params, searchParams }: Props) {
  const { locale, range: rangeSlug } = await params;
  setRequestLocale(locale);

  const range = getRangeBySlug(rangeSlug as Range["slug"]);
  if (!range) notFound();

  const { bm, builderLink, layout } = await searchParams;

  // A missing/invalid bm is not a 404 — the form must never be a dead end.
  // Fall back to the range name as the heading when no model resolves.
  const model = bm ? getModelBySlug(bm) : undefined;

  const { extrasDecoded, decodeSucceeded, builderLinkRaw } = decodeBuilderLink(
    builderLink ?? null
  );

  return (
    <div className="bg-surface-muted py-24">
      <div className="mx-auto max-w-2xl px-6">
        <EnquireForm
          range={range.accent}
          modelName={model ? model.name : range.name}
          layoutName={layout}
          decodedExtras={extrasDecoded}
          locale={locale}
          decodeSucceeded={decodeSucceeded}
          builderLinkRaw={builderLinkRaw}
        />
      </div>
    </div>
  );
}
