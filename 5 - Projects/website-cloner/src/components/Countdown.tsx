"use client";

import { useEffect, useState } from "react";

const TARGET_DATE = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function getTimeLeft() {
  const diff = Math.max(0, TARGET_DATE.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const units = ["days", "hours", "minutes", "seconds"] as const;

export default function Countdown() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setTime(getTimeLeft());
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="bg-[#F9F4EE] py-20 px-6 text-center">
      <div className="max-w-[800px] mx-auto flex flex-col items-center gap-6">
        <h2
          className="text-[#333333] tracking-[0.04em]"
          style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 300 }}
        >
          Next Drop In
        </h2>

        <p className="text-[#777777] text-[15px] leading-[1.7] max-w-[560px]">
          Enjoy pieces from our collection at 20–40% off retail prices during
          our limited drop sales. Click the link below to join our VIP list
        </p>

        {/* Timer */}
        <div className="flex items-start gap-10 my-6">
          {units.map((unit) => (
            <div key={unit} className="flex flex-col items-center gap-2">
              <span
                className="text-[#333333] leading-none"
                style={{ fontSize: "clamp(40px, 5vw, 60px)", fontWeight: 300 }}
                suppressHydrationWarning
              >
                {pad(time[unit])}
              </span>
              <span className="text-[#999999] text-[11px] uppercase tracking-[0.12em]">
                {unit.charAt(0).toUpperCase() + unit.slice(1)}
              </span>
            </div>
          ))}
        </div>

        <a
          href="#"
          className="inline-block bg-[#333333] text-white text-[12px] font-medium px-10 py-4 tracking-[0.1em] uppercase no-underline transition-colors duration-200 hover:bg-[#CEAC7E] rounded-sm"
        >
          Visit drop page
        </a>
      </div>
    </section>
  );
}
