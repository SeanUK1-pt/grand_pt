import { readFile } from "node:fs/promises";
import path from "node:path";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import ConfiguratorClient from "@/components/configurator/ConfiguratorClient";
import { CONFIGURATOR_URL } from "@/data/configurator";
import { getModelBySlug } from "@/data/models";
import { parseCatalog, type Catalog } from "@/lib/configurator/catalog";
import { sanitizeConfigSearch } from "@/lib/configurator/search";
import { getVariant, variants } from "@/lib/configurator/variants";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string; variant: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export function generateStaticParams() {
  return variants.map((v) => ({ variant: v.key }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, variant: key } = await params;
  const variant = getVariant(key);
  if (!variant) return {};
  const t = await getTranslations({ locale, namespace: "configurator" });
  const title = t("metaTitle", { model: variant.title });
  const description = t("intro", { model: variant.title });
  const model = getModelBySlug(variant.modelSlug);
  return {
    title,
    description,
    alternates: buildAlternates(`/configurator/${variant.key}/`, locale),
    ...buildOpenGraph(title, description, model?.image),
  };
}

// The boat feed is synced to disk by scripts/sync-3d.mjs and is the same data
// the engine page loads, so the interface and the 3D scene always agree.
async function loadCatalog(dir: string, id: string): Promise<Catalog | null> {
  try {
    const file = path.join(process.cwd(), "public", "3d", dir, "api", "cms", "boats", `${id}.json`);
    return parseCatalog(JSON.parse(await readFile(file, "utf8")));
  } catch {
    return null;
  }
}

export default async function ConfiguratorPage({ params, searchParams }: Props) {
  const { locale, variant: key } = await params;
  setRequestLocale(locale);

  const variant = getVariant(key);
  if (!variant) notFound();

  const t = await getTranslations("configurator");
  const model = getModelBySlug(variant.modelSlug);
  const accent = model?.range ?? (variant.range === "silver-line" ? "silver" : variant.range === "drive-line" ? "drive" : "golden");
  const catalog = await loadCatalog(variant.dir, variant.id);
  const initialSearch = sanitizeConfigSearch(await searchParams);

  return (
    <section className="bg-surface-muted py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-caption font-semibold uppercase tracking-[0.14em] text-text-subtle">{t("eyebrow")}</p>
        <h1 className="mt-2 text-headline font-semibold tracking-tight text-balance text-text-strong">
          {t("pageTitle", { model: variant.title })}
        </h1>
        <p className="mt-3 max-w-2xl text-lead text-text-muted text-pretty">{t("intro", { model: variant.title })}</p>
        {model && (
          <p className="mt-3">
            <Link href={model.href} className="text-body-sm font-medium text-brand hover:underline">
              {t("viewModel", { model: model.name })} →
            </Link>
          </p>
        )}

        <div className="mt-8">
          {catalog ? (
            <ConfiguratorClient
              variant={variant}
              catalog={catalog}
              modelName={variant.title}
              accent={accent}
              initialSearch={initialSearch}
            />
          ) : (
            <div className="rounded-lg border border-surface-line bg-surface p-8">
              <h2 className="text-title font-semibold text-text-strong">{t("unavailableTitle")}</h2>
              <p className="mt-2 text-body text-text-muted">{t("unavailableBody")}</p>
              <a
                href={CONFIGURATOR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-body-sm font-semibold text-brand hover:underline"
              >
                {t("unavailableCta")}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
