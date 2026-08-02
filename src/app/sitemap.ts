import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { ranges } from "@/data/ranges";
import { models } from "@/data/models";

const SITE_URL = "https://grandboats.pt";

// Every static path in the site, locale-agnostic — each gets prefixed with
// /en and /pt below. Keep this in sync with the real route tree by hand;
// there's no single source of truth to derive it from automatically.
const staticPaths = ["/", "/our-story/", "/contact/"];
const rangePaths = ranges.map((r) => `/ranges/${r.slug}/`);
const modelPaths = models.map((m) => m.href);

const allPaths = [...staticPaths, ...rangePaths, ...modelPaths];

export default function sitemap(): MetadataRoute.Sitemap {
  return allPaths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${path === "/" ? "" : path}`,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${SITE_URL}/${l}${path === "/" ? "" : path}`])
        ),
      },
    }))
  );
}
