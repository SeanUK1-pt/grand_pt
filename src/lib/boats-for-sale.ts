// Fetches real Grand inventory (used + in-stock new units) from Algarve Boat
// Group's own Payload CMS, which already holds this data for
// algarveboatsales.com. The `boats` collection there exposes a public,
// read-only API scoped to available listings only — see
// abs-website/src/collections/Boats.ts `access.read`.
const ABS_SITE_URL = "https://algarveboatsales.com";

export type BoatForSale = {
  slug: string;
  title: string;
  condition: "new" | "used";
  price: number;
  salePrice: number | null;
  currency: string;
  ivaIncluded: boolean;
  location: string | null;
  year: number | null;
  lengthM: number | null;
  engineMake: string | null;
  engineModel: string | null;
  engineHp: number | null;
  modelName: string | null;
  image: string | null;
  listingUrl: string;
};

type RawBoat = {
  slug: string;
  title: string;
  condition: "new" | "used";
  price: number;
  sale_price: number | null;
  currency: string;
  iva_included: boolean;
  location: string | null;
  year: number | null;
  length_m: number | null;
  engine_make: string | null;
  engine_model: string | null;
  engine_hp: number | null;
  model: { name: string } | null;
  main_image: { url: string } | null;
};

function toBoatForSale(raw: RawBoat): BoatForSale {
  return {
    slug: raw.slug,
    title: raw.title,
    condition: raw.condition,
    price: raw.price,
    salePrice: raw.sale_price,
    currency: raw.currency,
    ivaIncluded: raw.iva_included,
    location: raw.location,
    year: raw.year,
    lengthM: raw.length_m,
    engineMake: raw.engine_make,
    engineModel: raw.engine_model,
    engineHp: raw.engine_hp,
    modelName: raw.model?.name ?? null,
    image: raw.main_image ? `${ABS_SITE_URL}${raw.main_image.url}` : null,
    listingUrl: `${ABS_SITE_URL}/boats/${raw.slug}`,
  };
}

export async function getGrandBoatsForSale(): Promise<BoatForSale[]> {
  const url = `${ABS_SITE_URL}/api/boats?where[make.slug][equals]=grand&depth=1&limit=50&sort=-createdAt`;

  try {
    const res = await fetch(url, { next: { revalidate: 1800 } });
    if (!res.ok) return [];
    const data: { docs: RawBoat[] } = await res.json();
    return data.docs.map(toBoatForSale);
  } catch {
    return [];
  }
}
