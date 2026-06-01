import Image from "next/image";
import Link from "next/link";

const quickLinks = [
  { label: "Shipping And Returns", href: "#" },
  { label: "Terms & Conditions", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Wholesale Enquiry", href: "#" },
  { label: "Terms Of Service", href: "#" },
];

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/share/1HUGTQ482y/?mibextid=wwXIfr" },
  { label: "Instagram", href: "https://www.instagram.com/rochelle.de.maya?igsh=MWg1bnEyczg0N29ubQ%3D%3D&utm_source=qr" },
  { label: "Linkedin", href: "https://www.linkedin.com/company/rochelle-de-maya/" },
];

export default function Footer() {
  return (
    <>
      <footer className="bg-[#1A1A1A] text-white pt-16 pb-6 px-6">
        <div className="max-w-[1200px] mx-auto">
          {/* 3-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-white/15">
            {/* Brand */}
            <div className="flex flex-col gap-5">
              <Link href="/">
                <Image
                  src="/images/logo.png"
                  alt="Rochelle de Maya"
                  width={120}
                  height={45}
                  className="h-[45px] w-auto brightness-0 invert"
                />
              </Link>
              <Image
                src="/images/footer-tagline.png"
                alt="Rochelle de Maya"
                width={200}
                height={60}
                className="max-w-[200px] w-full opacity-90 brightness-0 invert"
              />
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-[13px] font-semibold uppercase tracking-[0.1em] mb-5">
                Quick Links
              </h4>
              <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[13px] text-white/65 no-underline transition-colors duration-200 hover:text-[#CEAC7E]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-[13px] font-semibold uppercase tracking-[0.1em] mb-5">
                Contact
              </h4>
              <div className="flex flex-col gap-2 text-[13px] text-white/65 leading-[1.8]">
                <a
                  href="mailto:hello@rochelledemaya.co.uk"
                  className="text-white/65 no-underline hover:text-[#CEAC7E] transition-colors"
                >
                  hello@rochelledemaya.co.uk
                </a>
                <address className="not-italic">
                  Cotton Court Business Centre
                  <br />
                  Church St
                  <br />
                  Preston
                  <br />
                  Lancashire PR1 3BY
                </address>
                <p className="m-0">
                  <strong className="text-white/80">Tel</strong>: 01772 281985
                </p>
                <button className="mt-2 self-start border border-white/50 text-white text-[12px] px-5 py-2.5 bg-transparent cursor-pointer transition-all duration-200 hover:border-[#CEAC7E] hover:text-[#CEAC7E]">
                  Subscribe for VIP
                </button>
              </div>
            </div>
          </div>

          {/* Social row */}
          <div className="flex gap-5 py-8 border-b border-white/15">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-white/65 no-underline uppercase tracking-[0.05em] transition-colors duration-200 hover:text-[#CEAC7E]"
              >
                {s.label}
              </a>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="pt-6 text-center text-[12px] text-white/40">
            © 2026 Rochelle de Maya. All right reserved.
          </div>
        </div>
      </footer>

      {/* Floating email icon */}
      <a
        href="mailto:hello@rochelledemaya.co.uk"
        className="fixed bottom-6 right-6 w-12 h-12 bg-[#CEAC7E] rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.2)] z-50 transition-colors duration-200 hover:bg-[#b8975f]"
        aria-label="Email us"
      >
        <Image
          src="/images/icons/email.svg"
          alt="Email"
          width={20}
          height={20}
          className="brightness-0 invert"
        />
      </a>
    </>
  );
}
