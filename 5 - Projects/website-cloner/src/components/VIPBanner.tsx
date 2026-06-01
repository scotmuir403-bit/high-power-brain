"use client";

import { useState } from "react";

export default function VIPBanner() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setOpen(false);
    setName("");
    setEmail("");
  }

  return (
    <>
      <section
        className="relative py-24 px-6 text-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/vip-background.png')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 max-w-[700px] mx-auto flex flex-col items-center gap-5">
          <h2
            className="text-white tracking-[0.04em]"
            style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 300 }}
          >
            Join Our VIP List
          </h2>
          <p className="text-white/85 text-[16px] leading-[1.7] max-w-[520px]">
            Add your name and email to be added to our exclusive list and get
            notified of future drops and special offers.
          </p>
          <button
            onClick={() => setOpen(true)}
            className="border border-white text-white text-[13px] font-medium px-10 py-4 uppercase tracking-[0.1em] bg-transparent cursor-pointer transition-all duration-200 hover:bg-white hover:text-[#333333] mt-2"
          >
            Join Us
          </button>
        </div>
      </section>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-[1000] flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white p-10 max-w-[440px] w-full rounded-sm relative flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-[#333333] text-xl leading-none bg-transparent border-0 cursor-pointer"
              aria-label="Close"
            >
              ×
            </button>

            <h3
              className="text-[#333333] text-center"
              style={{ fontSize: "24px", fontWeight: 300 }}
            >
              Join us
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-[#DDDDDD] rounded-sm text-[14px] font-[family-name:var(--font-inter)] outline-none focus:border-[#CEAC7E] transition-colors"
              />
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-[#DDDDDD] rounded-sm text-[14px] font-[family-name:var(--font-inter)] outline-none focus:border-[#CEAC7E] transition-colors"
              />
              <button
                type="submit"
                className="w-full bg-[#CEAC7E] text-white text-[13px] font-medium py-4 uppercase tracking-[0.08em] border-0 cursor-pointer rounded-sm transition-colors duration-200 hover:bg-[#b8975f] mt-1"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
