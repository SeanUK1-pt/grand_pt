"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useLightbox } from "./PhotoLightbox";

type Props = {
  images: string[];
  alt: string;
};

export default function HeroImage({ images, alt }: Props) {
  const { openAt } = useLightbox();
  const tc = useTranslations("common");

  return (
    <button
      type="button"
      onClick={() => openAt(images, 0, alt)}
      aria-label={tc("viewPhotosOf", { name: alt })}
      className="relative flex aspect-[16/9] w-full cursor-zoom-in bg-ink md:aspect-[21/9]"
    >
      <Image
        src={images[0]}
        alt={alt}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      {/* Subtle scrim — just enough for legibility of anything crossing the
          bottom edge, not a colour wash over the photo */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"
      />
    </button>
  );
}
