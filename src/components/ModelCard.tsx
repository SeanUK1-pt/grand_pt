import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { FeaturedModel } from "@/data/featured-models";

const rangeLabel: Record<FeaturedModel["range"], string> = {
  golden: "Golden Line",
  silver: "Silver Line",
  drive: "Drive Line",
};

const rangeAccent: Record<FeaturedModel["range"], string> = {
  golden: "text-golden border-golden/30 bg-golden-muted",
  silver: "text-silver border-silver/30 bg-silver-muted",
  drive:  "text-drive  border-drive/30  bg-drive-muted",
};

export default function ModelCard({ model }: { model: FeaturedModel }) {
  return (
    <Link
      href={model.href}
      className="group flex flex-col overflow-hidden rounded-2xl bg-surface-muted transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-tint">
        <Image
          src={model.image}
          alt={`${model.name} — ${model.tagline}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <span
          className={`inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${rangeAccent[model.range]}`}
        >
          {rangeLabel[model.range]}
        </span>
        <div>
          <p className="text-xl font-semibold text-ink">{model.name}</p>
          <p className="mt-1 text-sm leading-relaxed text-ink-subtle">{model.tagline}</p>
        </div>
      </div>
    </Link>
  );
}
