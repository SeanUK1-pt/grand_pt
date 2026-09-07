import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /dev-preview is also noindex'd at the page level — belt and
      // suspenders so crawlers never even fetch it. /enquire is a
      // transactional, query-param-driven page with no content of its own.
      disallow: ["/dev-preview", "/*/enquire"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
