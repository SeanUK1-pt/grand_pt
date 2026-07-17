import { getLocale } from "next-intl/server";
import { yamahaSection } from "@/data/yamaha-section";
import { resolveText } from "@/data/localized-text";

// PLACEHOLDER LAYOUT — the real engine action photo and the official
// "Empowered by Yamaha" SVG lockup are not available in this repo or
// anywhere in the project's asset sources (checked public/images and
// ~/Downloads). Both need to be supplied as local files — see the request
// for a real photo (downloaded locally, not hotlinked) and the official
// trademarked logo asset — rather than fabricated or scraped here. Swap the
// placeholder block below for a <Image> once the photo lands, and replace
// the text wordmark with the real SVG.
export default async function YamahaSection() {
  const locale = await getLocale();

  return (
    <section aria-label="Powered by Yamaha" className="bg-ink py-12">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 sm:grid-cols-2 sm:items-center">
        <div className="flex aspect-[4/3] items-center justify-center rounded-lg border border-dashed border-ink-line bg-ink-raised">
          <p className="max-w-[220px] text-center text-caption text-ink-text-muted">
            Engine action photo pending — supply a local file to replace this
            placeholder
          </p>
        </div>

        <div>
          <p className="text-caption font-semibold uppercase tracking-[0.18em] text-ink-text-muted">
            {yamahaSection.wordmark}
          </p>
          <h2 className="mt-4 text-headline font-semibold tracking-tight text-balance text-ink-text">
            {resolveText(yamahaSection.heading, locale)}
          </h2>
          <p className="mt-4 text-body leading-relaxed text-ink-text-muted text-pretty">
            {resolveText(yamahaSection.body, locale)}
          </p>
        </div>
      </div>
    </section>
  );
}
