import Image from "next/image";
import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { yamahaPartner } from "@/data/yamaha-partner";
import { resolveText } from "@/data/localized-text";

export default async function YamahaPartner() {
  const locale = await getLocale();

  return (
    <section aria-label="Our engine partner" className="bg-ink">
      <div className="grid sm:grid-cols-2">
        <div className="relative h-64 sm:h-auto">
          <Image
            src="/images/partners/yamaha-action.jpg"
            alt="Twin Yamaha outboard engines"
            fill
            className="object-cover"
            sizes="(min-width: 640px) 50vw, 100vw"
          />
        </div>

        <div className="flex flex-col justify-center gap-4 px-6 py-12 sm:px-12 sm:py-16">
          <p className="text-caption font-semibold uppercase tracking-[0.18em] text-ink-text-muted">
            {resolveText(yamahaPartner.eyebrow, locale)}
          </p>
          <h2 className="text-headline font-semibold tracking-tight text-balance text-ink-text">
            {resolveText(yamahaPartner.heading, locale)}
          </h2>
          <p className="text-body leading-relaxed text-ink-text-muted text-pretty">
            {resolveText(yamahaPartner.body, locale)}
          </p>

          <Image
            src="/images/partners/yamaha-empowered-by.svg"
            alt="Empowered by Yamaha"
            width={220}
            height={49}
            className="mt-2 h-auto w-[220px] rounded-sm"
          />

          <Link
            href="/contact/"
            className="mt-2 inline-flex w-fit items-center gap-1 text-body-sm font-medium text-ink-text underline-offset-4 hover:underline"
          >
            {resolveText(yamahaPartner.cta, locale)}
          </Link>
        </div>
      </div>
    </section>
  );
}
