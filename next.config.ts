import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // The synced 3D configurator (public/3d, ~240 MB of scenes and textures) —
  // cache for an hour, revalidating in the background, so repeat visitors don't
  // re-download models but a re-sync still reaches everyone within a day.
  async headers() {
    return [
      {
        source: "/3d/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" }],
      },
    ];
  },
  images: {
    // Next.js 16 requires custom quality values to be explicitly allow-listed
    // (default is [75] only) — 90 is used for full-bleed hero backgrounds
    // (RangeBand) where the default looked visibly soft.
    qualities: [75, 90],
  },
};

export default withNextIntl(nextConfig);
