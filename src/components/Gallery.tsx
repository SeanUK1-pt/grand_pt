"use client";

import Image from "next/image";
import { useLightbox } from "./PhotoLightbox";

type Props = {
  images: string[];
  /** Full photo set (hero + gallery) the lightbox pages through — `images`
   *  is only the subset rendered as thumbnails here. */
  allImages: string[];
  alt: string;
};

export default function Gallery({ images, allImages, alt }: Props) {
  const { openAt } = useLightbox();

  if (images.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {images.map((src, i) => {
        const lightboxIndex = allImages.indexOf(src);
        return (
          <button
            key={src}
            type="button"
            onClick={() => openAt(allImages, lightboxIndex === -1 ? i : lightboxIndex, alt)}
            className="group relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-surface-sunken"
          >
            <Image
              src={src}
              alt={`${alt} — photo ${i + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            />
          </button>
        );
      })}
    </div>
  );
}
