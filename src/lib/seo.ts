import { routing } from "@/i18n/routing";

export const SITE_URL = "https://grandboats.pt";
export const SITE_NAME = "Grand Boats Portugal";
export const DEFAULT_OG_IMAGE = "/images/boats/g750/detail-11.jpg";

/**
 * Next.js merges metadata shallowly across layout/page segments, but a
 * *nested* object like `openGraph` is replaced wholesale the moment a page
 * defines its own — it does not merge individual openGraph fields with the
 * layout's. So any page that sets openGraph.title/description without also
 * re-specifying siteName/type/images loses those silently. Route every
 * page's openGraph (and twitter) through this helper instead of building
 * the object by hand.
 */
export function buildOpenGraph(title: string, description: string, image: string = DEFAULT_OG_IMAGE) {
  const url = image.startsWith("http") ? image : `${SITE_URL}${image}`;
  return {
    openGraph: {
      siteName: SITE_NAME,
      type: "website" as const,
      title,
      description,
      images: [{ url, width: 2160, height: 945 }],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [url],
    },
  };
}

/**
 * Canonical + hreflang alternates for a given locale-agnostic path (e.g.
 * "/ranges/golden-line/g750/", or "/" for the homepage). Every page's
 * generateMetadata should call this — without it, Next only emits the
 * per-locale <link rel="alternate"> entries in sitemap.xml, not in the
 * page's own <head>, which is what search engines actually key off when
 * deciding which locale's URL to show for a query.
 */
export function buildAlternates(path: string, locale: string) {
  const clean = path === "/" ? "" : path;
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${SITE_URL}/${l}${clean}`])
  );
  return {
    canonical: `${SITE_URL}/${locale}${clean}`,
    languages: {
      ...languages,
      // routing.defaultLocale is "en" — x-default should match whichever
      // locale unprefixed/unknown-language traffic resolves to.
      "x-default": languages[routing.defaultLocale],
    },
  };
}
