export type FeaturedModel = {
  slug: string;
  name: string;
  range: "golden" | "silver" | "drive";
  tagline: string;
  image: string;
  href: string;
};

export const featuredModels: FeaturedModel[] = [
  {
    slug: "g680",
    name: "G680",
    range: "golden",
    tagline: "Built to be lived aboard.",
    image: "/images/lifestyle/g680-morning.jpg",
    href: "/ranges/golden-line/g680/",
  },
  {
    slug: "s520",
    name: "S520",
    range: "silver",
    tagline: "The boat that says yes to a normal Tuesday.",
    image: "/images/lifestyle/s520-afternoon.jpg",
    href: "/ranges/silver-line/s520/",
  },
  {
    slug: "d400",
    name: "D400",
    range: "drive",
    tagline: "Deep-V, raised tube, no apology.",
    image: "/images/lifestyle/d400-open-sea.jpg",
    href: "/ranges/drive-line/d400/",
  },
];
