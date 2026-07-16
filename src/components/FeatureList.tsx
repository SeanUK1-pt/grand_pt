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
    <div className="grid gap-8 sm:grid-cols-3">
      {features.map((feature) => (
        <div key={feature.title} className="flex flex-col gap-4">
          {feature.image ? (
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-surface-tint">
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
            <div className={`h-0.5 w-8 ${accentRule[accent]}`} aria-hidden />
          )}

          <h3 className="text-base font-semibold text-ink">{feature.title}</h3>
          <p className="text-sm leading-relaxed text-ink-subtle">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
}
