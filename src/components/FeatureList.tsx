import Image from "next/image";
import type { RangeAccent } from "@/data/ranges";

type ResolvedFeature = {
  title: string;
  description: string;
  image?: string;
};

type Props = {
  features: ResolvedFeature[];
  accent: RangeAccent;
};

const accentRule: Record<RangeAccent, string> = {
  golden: "bg-golden",
  silver: "bg-silver",
  drive:  "bg-drive",
};

export default function FeatureList({ features, accent }: Props) {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {features.map((feature) => (
        <article
          key={feature.title}
          className="flex flex-col overflow-hidden rounded-lg border border-surface-line bg-surface shadow-sm"
        >
          {feature.image ? (
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-sunken">
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                className="object-cover"
                sizes="(min-width: 640px) 33vw, 100vw"
              />
            </div>
          ) : (
            // No image — a thin accent rule stands in for the image block so the
            // card still reads as a deliberate layout, not a missing asset.
            <div className={`h-0.5 w-8 ${accentRule[accent]} mx-6 mt-6`} aria-hidden />
          )}

          <div className="flex flex-1 flex-col gap-3 p-6">
            <h3 className="text-title font-semibold tracking-tight text-text-strong">{feature.title}</h3>
            <p className="text-body leading-relaxed text-text-muted text-pretty">
              {feature.description}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
