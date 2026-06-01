import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

const products: Product[] = [
  {
    id: "87116",
    name: "87116-0 18K Triple Layer Gold Ring",
    category: "Rings",
    price: 39,
    image: "/images/products/ring-87120.png",
    href: "#",
  },
  {
    id: "90680",
    name: "90680-0 18K Triple Layer Gold Necklace",
    category: "Necklaces",
    price: 39,
    image: "/images/products/necklace-90680.jpg",
    href: "#",
  },
  {
    id: "87722",
    name: "87722-0 18K Triple Layer Gold Bracelet",
    category: "Bracelets",
    price: 49,
    image: "/images/products/bracelet-87722.png",
    href: "#",
  },
  {
    id: "87638",
    name: "87638-0 18K Triple Layer Gold Bracelet",
    category: "Bracelets",
    price: 59,
    image: "/images/products/bracelet-87638.png",
    href: "#",
  },
];

function ProductCard({ product }: { product: Product }) {
  return (
    <li className="bg-white border border-[#EEEEEE] rounded-sm overflow-hidden group transition-shadow duration-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
      {/* Image wrapper */}
      <div className="relative aspect-square bg-[#F9F5F0] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 900px) 50vw, 25vw"
        />
        {/* Quick View overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-white/90 py-3 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <a
            href={product.href}
            className="text-[11px] font-medium text-[#333333] uppercase tracking-[0.1em] no-underline"
          >
            Quick View
          </a>
        </div>
      </div>

      {/* Card body */}
      <div className="p-4">
        <span className="block text-[11px] text-[#CEAC7E] uppercase tracking-[0.1em] mb-1.5">
          {product.category}
        </span>
        <a
          href={product.href}
          className="block text-[14px] font-medium text-[#333333] no-underline mb-2 hover:text-[#CEAC7E] transition-colors"
        >
          {product.name}
        </a>
        <span className="block text-[15px] font-semibold text-[#333333] mb-3">
          £{product.price.toFixed(2)}
        </span>
        <button
          className="w-full bg-[#333333] text-white text-[12px] font-medium py-2.5 rounded-sm uppercase tracking-[0.08em] transition-colors duration-200 hover:bg-[#CEAC7E] cursor-pointer border-0"
        >
          Add to cart
        </button>
      </div>
    </li>
  );
}

export default function ProductGrid() {
  return (
    <section className="bg-white py-20 px-6">
      {/* Section header */}
      <div className="text-center mb-12">
        <h2
          className="text-[#333333] tracking-[0.04em] mb-3"
          style={{ fontSize: "clamp(24px, 2.5vw, 34px)", fontWeight: 300 }}
        >
          Our Products
        </h2>
        <p className="text-[#888888] text-[15px] leading-[1.7] max-w-[500px] mx-auto">
          Timeless designs crafted for everyday elegance. Discover pieces that
          shine with every look.
        </p>
      </div>

      {/* Grid */}
      <ul
        className={cn(
          "grid gap-6 list-none p-0 m-0 max-w-[1200px] mx-auto",
          "grid-cols-2 sm:grid-cols-2 lg:grid-cols-4"
        )}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>

      {/* CTA */}
      <div className="text-center mt-12">
        <a
          href="#"
          className="inline-block border border-[#333333] text-[#333333] text-[13px] font-medium px-10 py-4 uppercase tracking-[0.1em] no-underline transition-all duration-200 hover:bg-[#333333] hover:text-white"
        >
          View All Products
        </a>
      </div>
    </section>
  );
}
