import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import RangeBadge from "@/components/RangeBadge";
import { resolveText } from "@/data/localized-text";
import { getModelBySlug, type Model } from "@/data/models";
import { RANGE_ORDER, variants, variantsForModel } from "@/lib/configurator/variants";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

const rangeLabel: Record<Model["range"], string> = { golden: "Golden Line", silver: "Silver Line", drive: "Drive Line" };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "configurator" });
  const title = t("metaIndexTitle");
  const description = t("indexIntro");
  return { title, description, alternates: buildAlternates("/configurator/", locale), ...buildOpenGraph(title, description) };
}

export default async function ConfiguratorIndexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("configurator");

  // One card per model of ours that Grand has a 3D scene for, in range order.
  const slugs = [...new Set(variants.map((v) => v.modelSlug))];
  const cards = slugs
    .map((slug) => ({ model: getModelBySlug(slug), options: variantsForModel(slug) }))
    .filter((c): c is { model: Model; options: ReturnType<typeof variantsForModel> } => !!c.model)
    .sort((a, b) => RANGE_ORDER.indexOf(a.options[0].range) - RANGE_ORDER.indexOf(b.options[0].range));

  return (
    <section className="bg-surface py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-caption font-semibold uppercase tracking-[0.14em] text-text-subtle">{t("eyebrow")}</p>
        <h1 className="mt-2 text-headline font-semibold tracking-tight text-balance text-text-strong">
          {t("indexTitle")}
        </h1>
        <p className="mt-3 max-w-2xl text-lead text-text-muted text-pretty">{t("indexIntro")}</p>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ model, options }) => {
            const multi = options.length > 1;
            return (
              <li
                key={model.slug}
                className="flex flex-col overflow-hidden rounded-lg border border-surface-line bg-surface shadow-sm"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-sunken">
                  <Image
                    src={model.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-4 p-5">
                  <RangeBadge accent={model.range} variant="soft">
                    {rangeLabel[model.range]}
                  </RangeBadge>
                  <div>
                    <p className="text-title font-semibold tracking-tight text-text-strong">{model.name}</p>
                    <p className="mt-1 text-body-sm leading-relaxed text-text-subtle">
                      {resolveText(model.positioning, locale)}
                    </p>
                  </div>
                  <div className="mt-auto">
                    {multi && (
                      <p className="mb-2 text-caption font-semibold uppercase tracking-[0.12em] text-text-subtle">
                        {t("layouts")}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {options.map((v) => (
                        <Link
                          key={v.key}
                          href={`/configurator/${v.key}/`}
                          className="inline-flex items-center rounded-md border border-brand px-3 py-2 text-body-sm font-semibold text-brand transition-colors hover:bg-brand hover:text-brand-contrast"
                        >
                          {multi ? v.title : t("configure")}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
