import Image from "next/image";
import { Link } from "@/i18n/navigation";
import RangeBadge from "./RangeBadge";
import type { FeaturedModel } from "@/data/featured-models";

const rangeLabel: Record<FeaturedModel["range"], string> = {
  golden: "Golden Line",
  silver: "Silver Line",
  drive: "Drive Line",
};

export default function ModelCard({ model }: { model: FeaturedModel }) {
  return (
    <Link
      href={model.href}
      className="group flex flex-col overflow-hidden rounded-lg border border-surface-line bg-surface shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-sunken">
        <Image
          src={model.image}
          alt={`${model.name} — ${model.tagline}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <RangeBadge accent={model.range} variant="soft">
          {rangeLabel[model.range]}
        </RangeBadge>
        <div>
          <p className="text-title font-semibold tracking-tight text-text-strong">{model.name}</p>
          <p className="mt-1 text-body-sm leading-relaxed text-text-subtle">{model.tagline}</p>
        </div>
      </div>
    </Link>
  );
}
