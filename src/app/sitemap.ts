import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { ranges } from "@/data/ranges";
import { models } from "@/data/models";
import { SITE_URL } from "@/lib/seo";

// Every static path in the site, locale-agnostic — each gets prefixed with
// /en and /pt below. Keep this in sync with the real route tree by hand;
// there's no single source of truth to derive it from automatically.
// priority/changeFrequency are crawl-budget hints, not ranking factors —
// homepage and category pages (ranges) are the pages most worth Google
// recrawling often, models are the actual long-tail search targets, and
// the rest change rarely.
const staticPaths: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/faq/", priority: 0.6, changeFrequency: "monthly" },
  { path: "/for-sale/", priority: 0.8, changeFrequency: "daily" },
  { path: "/our-story/", priority: 0.4, changeFrequency: "yearly" },
  { path: "/contact/", priority: 0.5, changeFrequency: "yearly" },
];
const rangePaths = ranges.map((r) => ({ path: `/ranges/${r.slug}/`, priority: 0.9, changeFrequency: "weekly" as const }));
const modelPaths = models.map((m) => ({ path: m.href, priority: 0.8, changeFrequency: "monthly" as const }));

const allPaths = [...staticPaths, ...rangePaths, ...modelPaths];

export default function sitemap(): MetadataRoute.Sitemap {
  return allPaths.flatMap(({ path, priority, changeFrequency }) =>
    routing.locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${path === "/" ? "" : path}`,
      priority,
      changeFrequency,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${SITE_URL}/${l}${path === "/" ? "" : path}`])
        ),
      },
    }))
  );
}
