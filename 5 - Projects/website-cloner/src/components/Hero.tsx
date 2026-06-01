import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-white min-h-[80vh] flex items-center overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
        {/* Left — text */}
        <div className="flex flex-col gap-6 order-2 md:order-1">
          <h1
            className="text-[#333333] leading-[1.2] tracking-[0.03em]"
            style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 300 }}
          >
            Timeless Elegance
          </h1>
          <p className="text-[#666666] text-[16px] leading-[1.7] max-w-[420px]">
            Hand Crafted Luxury Jewellery collection. We don&apos;t compromise
            because you shouldn&apos;t have to
          </p>
        </div>

        {/* Right — imagery */}
        <div className="relative flex items-center justify-center order-1 md:order-2">
          <div className="relative">
            <Image
              src="/images/hero-product.jpeg"
              alt="Luxury jewellery"
              width={380}
              height={560}
              className="rounded-lg object-cover"
              priority
            />
            <div className="absolute -bottom-4 -left-8 md:-left-12">
              <Image
                src="/images/hero-decorative.png"
                alt=""
                width={180}
                height={120}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
