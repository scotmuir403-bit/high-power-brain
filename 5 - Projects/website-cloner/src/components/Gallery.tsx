import Image from "next/image";
import type { GalleryImage } from "@/types";

const images: GalleryImage[] = [
  { src: "/images/gallery/necklace.png", alt: "Necklace" },
  { src: "/images/gallery/model.png", alt: "Model wearing jewellery" },
  { src: "/images/gallery/bracelet-1.png", alt: "Bracelet" },
  { src: "/images/gallery/earrings.png", alt: "Earrings" },
  { src: "/images/gallery/ring-87120.png", alt: "Gold ring" },
  { src: "/images/gallery/bracelet-87722.png", alt: "Gold bracelet" },
  { src: "/images/gallery/bracelet-87312.png", alt: "Bracelet" },
  { src: "/images/gallery/bracelet-87638.png", alt: "Bracelet" },
];

const allImages = [...images, ...images];

export default function Gallery() {
  return (
    <section className="bg-white py-20">
      {/* Section header */}
      <div className="text-center px-6 mb-12">
        <h2
          className="text-[#333333] tracking-[0.04em] mb-3"
          style={{ fontSize: "clamp(24px, 2.5vw, 34px)", fontWeight: 300 }}
        >
          Rochelle de Maya Gallery
        </h2>
        <p className="text-[#888888] text-[15px] leading-[1.7]">
          A glimpse of our elegant creations crafted to shine in every moment.
        </p>
      </div>

      {/* Marquee */}
      <div className="overflow-hidden">
        <div className="marquee-track gap-4 px-2">
          {allImages.map((img, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[280px] h-[280px] rounded-sm overflow-hidden"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={280}
                height={280}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
