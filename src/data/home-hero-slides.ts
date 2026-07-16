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
    image: "/images/boats/g680/detail-18.jpg",
    range: "golden",
    href: "/ranges/golden-line/g680/",
  },
  {
    modelName: "S470N",
    moodLine: "The boat that says yes to a normal Tuesday.",
    image: "/images/boats/s470n/detail-12.jpg",
    range: "silver",
    href: "/ranges/silver-line/s470n/",
  },
  {
    modelName: "D950",
    moodLine: "Deep water, wide open. No apology required.",
    image: "/images/boats/d950-drive/detail-17.jpg",
    range: "drive",
    href: "/ranges/drive-line/d950-drive/",
  },
];
