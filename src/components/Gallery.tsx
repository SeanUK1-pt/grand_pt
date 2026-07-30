import Image from "next/image";

type Props = {
  images: string[];
  alt: string;
};

export default function Gallery({ images, alt }: Props) {
  if (images.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {images.map((src, i) => (
        <div
          key={src}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-surface-sunken"
        >
          <Image
            src={src}
            alt={`${alt} — photo ${i + 1}`}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          />
        </div>
      ))}
    </div>
  );
}
