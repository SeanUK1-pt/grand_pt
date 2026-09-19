import { NextResponse } from "next/server";
import { models } from "@/data/models";
import { translateSpecLabel, translateSpecValue } from "@/data/spec-labels";
import { contentVersion } from "@/lib/content-version";

/**
 * Full marketing content for one model, by slug — positioning, features,
 * standard/optional equipment, specs, images. Returns raw LocalizedText
 * ({en, pt}) objects rather than resolving to one language, since the
 * kiosk needs to live-toggle PT/EN without re-fetching.
 *
 * Deliberately omits priceFrom/priceLabel — see src/app/api/kiosk-content/route.ts.
 */
export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const model = models.find((m) => m.slug === slug);

  if (!model) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const payload = {
    slug: model.slug,
    name: model.name,
    range: model.range,
    rangeSlug: model.rangeSlug,
    image: model.image,
    gallery: model.gallery ?? [],
    positioning: model.positioning,
    // Spec labels/values are plain English strings in models.ts; the site
    // translates them via the closed vocabulary in spec-labels.ts, so ship
    // the Portuguese alongside instead of making the kiosk keep its own copy.
    specs: model.specs.map((s) => ({
      ...s,
      labelPt: translateSpecLabel(s.label, "pt"),
      valuePt: translateSpecValue(s.value, "pt"),
    })),
    fullSpecs: model.fullSpecs,
    standardFeatures: model.standardFeatures,
    optionalEquipment: model.optionalEquipment,
    features: model.features,
    layouts: model.layouts ?? [],
  };

  return NextResponse.json({ version: contentVersion(payload), ...payload });
}
