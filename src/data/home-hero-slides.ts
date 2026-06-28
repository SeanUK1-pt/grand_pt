export type HomeHeroSlide = {
  modelName: string;
  moodLine: string;
  image: string;
  range: "golden" | "silver" | "drive";
  href: string;
};

export const homeHeroSlides: HomeHeroSlide[] = [
  {
    modelName: "G680",
    moodLine: "Mornings on the water, exactly as you imagined them.",
    image: "/images/lifestyle/g680-morning.jpg",
    range: "golden",
    href: "/ranges/golden-line/g680/",
  },
  {
    modelName: "S520",
    moodLine: "The boat that says yes to a normal Tuesday.",
    image: "/images/lifestyle/s520-afternoon.jpg",
    range: "silver",
    href: "/ranges/silver-line/s520/",
  },
  {
    modelName: "D400",
    moodLine: "Deep water, wide open. No apology required.",
    image: "/images/lifestyle/d400-open-sea.jpg",
    range: "drive",
    href: "/ranges/drive-line/d400/",
  },
];
