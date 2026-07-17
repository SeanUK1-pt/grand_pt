import { setRequestLocale } from "next-intl/server";
import { ourStory } from "@/data/our-story";
import { resolveText } from "@/data/localized-text";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return {
    title: `${resolveText(ourStory.heading, locale)} — Grand Boats Portugal`,
    description: resolveText(ourStory.lead, locale),
  };
}

export default async function OurStoryPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <h1 className="text-headline font-semibold tracking-tight text-balance text-text-strong">
          {resolveText(ourStory.heading, locale)}
        </h1>
        <p className="mt-4 text-lead text-text-muted text-pretty">
          {resolveText(ourStory.lead, locale)}
        </p>

        <div className="mt-12 flex flex-col gap-6 text-left">
          {ourStory.paragraphs.map((paragraph, i) => (
            <p key={i} className="text-body leading-relaxed text-text-muted text-pretty">
              {resolveText(paragraph, locale)}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
