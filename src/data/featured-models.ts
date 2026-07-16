// FeaturedModel type lives here (not models.ts) so models.ts's `Model = FeaturedModel & {...}`
// type-only import below has somewhere to point. This does NOT create a runtime
// circular dependency: the import below pulls only the `models` array and the
// `toFeaturedModel` function (values), while models.ts only imports the
// `FeaturedModel` *type* from this file — type-only imports are erased at
// compile time, so there's nothing left for the bundler to cycle on.
import { models, toFeaturedModel } from "./models";

export type FeaturedModel = {
  slug: string;
  name: string;
  range: "golden" | "silver" | "drive";
  tagline: string;
  image: string;
  href: string;
};

// Curated slugs — one per range, hand-picked for the home page. Edit this
// list to change which models are featured; name/tagline/image/href are
// derived from models.ts, not duplicated here.
const featuredSlugs = ["g680", "s470n", "d600"];

export const featuredModels: FeaturedModel[] = featuredSlugs.map((slug) => {
  const model = models.find((m) => m.slug === slug);
  if (!model) {
    throw new Error(`featuredSlugs references "${slug}", which doesn't exist in models.ts`);
  }
  return toFeaturedModel(model);
});
