"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about/" },
    { label: "Shop", href: "/shop/" },
    { label: "Drops", href: "/drops/" },
    { label: "PVD", href: "/pvd/" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/97 shadow-[0_2px_12px_rgba(0,0,0,0.08)]"
            : "bg-transparent"
        )}
      >
        <div className="max-w-[1200px] mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="Rochelle de Maya"
              width={120}
              height={50}
              className="h-[50px] w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[14px] font-medium text-[#333333] no-underline tracking-wide transition-colors duration-200 hover:text-[#CEAC7E]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            {/* Cart */}
            <button className="flex items-center gap-2 text-[14px] text-[#333333] cursor-pointer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <span>0</span>
            </button>

            {/* Hamburger */}
            <button
              className="md:hidden flex flex-col gap-[5px] cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span className={cn("block w-6 h-[1.5px] bg-[#333333] transition-all duration-300", mobileOpen && "rotate-45 translate-y-[6.5px]")} />
              <span className={cn("block w-6 h-[1.5px] bg-[#333333] transition-all duration-300", mobileOpen && "opacity-0")} />
              <span className={cn("block w-6 h-[1.5px] bg-[#333333] transition-all duration-300", mobileOpen && "-rotate-45 -translate-y-[6.5px]")} />
            </button>
          </div>
        </div>

        {/* Mobile nav drawer */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4">
            <ul className="list-none m-0 p-0 flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[14px] font-medium text-[#333333] no-underline tracking-wide hover:text-[#CEAC7E] transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      {/* Spacer to prevent content from hiding under fixed header */}
      <div className="h-[74px]" />
    </>
  );
}
