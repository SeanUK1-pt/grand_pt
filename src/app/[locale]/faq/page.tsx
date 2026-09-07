import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { faq } from "@/data/faq";
import { resolveText } from "@/data/localized-text";
import { buildAlternates, buildOpenGraph, SITE_URL } from "@/lib/seo";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faq" });
  const title = locale === "pt" ? "Perguntas Frequentes sobre RHIBs e RIBs" : "RHIB & RIB Boat FAQ";
  const description = t("intro");
  return {
    title,
    description,
    alternates: buildAlternates("/faq/", locale),
    ...buildOpenGraph(title, description),
  };
}

export default async function FaqPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("faq");
  const tc = await getTranslations("common");

  // FAQPage schema — this page's entire reason for existing is to catch
  // brand-agnostic "what is a RHIB" / "RHIB vs RIB" style searches, so the
  // structured data needs to mirror the visible Q&A exactly.
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((entry) => ({
      "@type": "Question",
      name: resolveText(entry.question, locale),
      acceptedAnswer: {
        "@type": "Answer",
        text: resolveText(entry.answer, locale),
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: tc("home"), item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: t("heading"), item: `${SITE_URL}/${locale}/faq/` },
    ],
  };

  return (
    <section className="bg-surface py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="text-headline font-semibold tracking-tight text-balance text-text-strong">
          {t("heading")}
        </h1>
        <p className="mt-4 text-lead text-text-muted text-pretty">{t("intro")}</p>

        <div className="mt-12 flex flex-col divide-y divide-surface-line border-t border-b border-surface-line">
          {faq.map((entry, i) => (
            <details key={i} className="group py-5 open:pb-5" {...(i === 0 ? { open: true } : {})}>
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-title font-semibold text-text-strong marker:content-none">
                {resolveText(entry.question, locale)}
                <span
                  aria-hidden
                  className="mt-1 shrink-0 text-lead text-text-subtle transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-body leading-relaxed text-text-muted text-pretty">
                {resolveText(entry.answer, locale)}
              </p>
            </details>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-body text-text-muted">{t("stillHaveQuestions")}</p>
          <Link
            href="/contact/"
            className="mt-2 inline-flex items-center gap-1 text-body-sm font-medium text-brand underline-offset-4 hover:underline"
          >
            {t("getInTouch")}
          </Link>
        </div>
      </div>
    </section>
  );
}
