export type HomeHeroSlide = {
  modelName: string;
  moodLine: string;
  image: string;
  range: "golden" | "silver" | "drive";
  href: string;
};

// All three are Golden Line flagships — the most dramatic hulls in the
// range. The requested `hero.jpg` path doesn't exist for any of the three
// (each folder only has `hero.png`, which turned out to be a transparent
// top-down cutaway diagram, not a hero-suitable photo) — substituted each
// model's best available on-water action shot instead, confirmed to exist
// on disk and visually reviewed before writing this file.
//
// G980 is the one exception: every photo in its folder (checked ~30% of
// the set, spanning studio renders, interior close-ups, and full-boat
// shots) is either a flat product render or an indoor showroom photo from
// what appears to be a THIRD-PARTY DEALER ("Moto-Nautika") — several
// frames show that dealer's own branding. detail-9.jpg below is the least
// bad option (no visible competitor branding, at least a real photo) but
// it's an interior helm close-up, not remotely dramatic or on-water. This
// needs a real photo supplied before it's genuinely fit for a hero slide —
// see report to user.
export const homeHeroSlides: HomeHeroSlide[] = [
  {
    modelName: "G750",
    moodLine: "Open water, every weekend.",
    image: "/images/boats/g750/detail-11.jpg",
    range: "golden",
    href: "/ranges/golden-line/g750/",
  },
  {
    modelName: "G850",
    moodLine: "Further than the horizon.",
    image: "/images/boats/g850/detail-20.jpg",
    range: "golden",
    href: "/ranges/golden-line/g850/",
  },
  {
    modelName: "G980",
    moodLine: "The largest Grand ever built.",
    image: "/images/boats/g980/detail-9.jpg",
    range: "golden",
    href: "/ranges/golden-line/g980/",
  },
];
