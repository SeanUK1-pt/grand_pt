import { setRequestLocale, getTranslations } from "next-intl/server";
import ContactForm from "@/components/ContactForm";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: `${t("heading")} — Grand Boats Portugal`,
    description: t("intro"),
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-xl px-6">
        <h1 className="text-headline font-semibold tracking-tight text-balance text-text-strong">
          {t("heading")}
        </h1>
        <p className="mt-4 text-lead text-text-muted text-pretty">{t("intro")}</p>

        <div className="mt-10">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
