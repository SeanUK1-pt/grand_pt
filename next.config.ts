import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    // Next.js 16 requires custom quality values to be explicitly allow-listed
    // (default is [75] only) — 90 is used for full-bleed hero backgrounds
    // (RangeBand) where the default looked visibly soft.
    qualities: [75, 90],
  },
};

export default withNextIntl(nextConfig);
