import { NextResponse } from "next/server";
import { models } from "@/data/models";
import { contentVersion } from "@/lib/content-version";

/**
 * Public, read-only catalog listing for the showroom kiosk app — marketing
 * content only (name, positioning, image), never pricing. All real pricing
 * lives on pricing.algarveboatgroup.com (abg_pricing); this site has never
 * had real pricing data (see the priceFrom/priceLabel comment on the Model
 * type in src/data/models.ts) and deliberately never exposes those
 * placeholder fields here.
 *
 * `version` is a content hash so the kiosk can poll cheaply and only fetch
 * a model's full content (GET /api/kiosk-content/[slug]) when it changed.
 */
export async function GET() {
  const list = models.map((m) => ({
    slug: m.slug,
    name: m.name,
    range: m.range,
    rangeSlug: m.rangeSlug,
    image: m.image,
  }));

  return NextResponse.json({ version: contentVersion(list), models: list });
}
