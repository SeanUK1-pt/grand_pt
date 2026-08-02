import { setRequestLocale, getTranslations } from "next-intl/server";
import BoatForSaleCard from "@/components/BoatForSaleCard";
import { getGrandBoatsForSale } from "@/lib/boats-for-sale";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "forSale" });
  return {
    title: `${t("heading")} — Grand Boats Portugal`,
    description: t("intro"),
  };
}

export default async function ForSalePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("forSale");

  const boats = await getGrandBoatsForSale();

  return (
    <section className="bg-surface pb-24 pt-32">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="text-headline font-semibold tracking-tight text-text-strong">{t("heading")}</h1>
        <p className="mt-3 max-w-2xl text-lead leading-relaxed text-text-muted text-pretty">{t("intro")}</p>

        {boats.length === 0 ? (
          <p className="mt-12 text-body text-text-subtle">{t("empty")}</p>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {boats.map((boat) => (
              <BoatForSaleCard
                key={boat.slug}
                boat={boat}
                locale={locale}
                conditionLabel={boat.condition === "new" ? t("conditionNew") : t("conditionUsed")}
                viewListingLabel={t("viewListing")}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
