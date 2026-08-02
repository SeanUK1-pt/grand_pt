import Image from "next/image";
import type { BoatForSale } from "@/lib/boats-for-sale";

function formatPrice(amount: number, currency: string, locale: string) {
  return new Intl.NumberFormat(locale === "pt" ? "pt-PT" : "en-IE", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function BoatForSaleCard({
  boat,
  locale,
  conditionLabel,
  viewListingLabel,
}: {
  boat: BoatForSale;
  locale: string;
  conditionLabel: string;
  viewListingLabel: string;
}) {
  const displayPrice = boat.salePrice ?? boat.price;

  return (
    <a
      href={boat.listingUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-lg border border-surface-line bg-surface shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-sunken">
        {boat.image && (
          <Image
            src={boat.image}
            alt={boat.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            unoptimized
          />
        )}
        <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-2.5 py-1 text-caption font-semibold uppercase tracking-[0.08em] text-ink-text">
          {conditionLabel}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="text-title font-semibold tracking-tight text-text-strong">{boat.title}</p>
        {(boat.year || boat.engineMake) && (
          <p className="text-body-sm text-text-subtle">
            {[boat.year, boat.engineMake && `${boat.engineMake} ${boat.engineModel ?? ""}`.trim()]
              .filter(Boolean)
              .join(" · ")}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between pt-2">
          <p className="text-title font-semibold text-brand">{formatPrice(displayPrice, boat.currency, locale)}</p>
          <span className="text-body-sm font-semibold text-brand">{viewListingLabel}</span>
        </div>
      </div>
    </a>
  );
}
