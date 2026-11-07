import Image from "next/image";
import { getLocale } from "next-intl/server";
import { configuratorPromo, CONFIGURATOR_URL } from "@/data/configurator";
import { resolveText } from "@/data/localized-text";

export default async function ConfiguratorPromo() {
  const locale = await getLocale();

  return (
    <section aria-label={resolveText(configuratorPromo.heading, locale)} className="bg-brand">
      <div className="grid sm:grid-cols-2">
        <div className="order-2 flex flex-col justify-center gap-4 px-6 py-12 sm:order-1 sm:px-12 sm:py-16">
          <p className="text-caption font-semibold uppercase tracking-[0.18em] text-white/70">
            {resolveText(configuratorPromo.eyebrow, locale)}
          </p>
          <h2 className="text-headline font-semibold tracking-tight text-balance text-white">
            {resolveText(configuratorPromo.heading, locale)}
          </h2>
          <p className="text-body leading-relaxed text-white/80 text-pretty">
            {resolveText(configuratorPromo.body, locale)}
          </p>

          <a
            href={CONFIGURATOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex w-fit items-center rounded-md bg-pop px-6 py-3 text-body-sm font-semibold text-pop-contrast transition-opacity hover:opacity-90"
          >
            {resolveText(configuratorPromo.cta, locale)}
          </a>
        </div>

        <div className="relative order-1 h-64 sm:order-2 sm:h-auto">
          <Image
            src="/images/boats/g680/detail-18.jpg"
            alt="Grand G680"
            fill
            className="object-cover"
            sizes="(min-width: 640px) 50vw, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
