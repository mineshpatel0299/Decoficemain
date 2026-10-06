"use client";

import Image from "next/image";
import { useRef } from "react";
import SectionBadge from "./SectionBadge";

// Decorative photo collage, positions (px) taken from the Figma frame. Photos come from /public/client.
const tiles = [
  { left: 0, top: 24, h: 215, src: "Advisory 6.jpg" },
  { left: 0, top: 257, h: 215, src: "Centrix 5.jpg" },
  { left: 213, top: 50, h: 300, src: "Cybrosys 6.jpg" },
  { left: 427, top: 0, h: 300, src: "Elemental 9.jpg" },
  { left: 640, top: 0, h: 300, src: "Naik 5.jpg" },
  { left: 854, top: 50, h: 300, src: "Confidential 1.jpg" },
  { left: 1067, top: 24, h: 215, src: "Pramukh 2.jpg" },
  { left: 1067, top: 257, h: 215, src: "Chrys 4.jpg" },
];

const reviews = [
  { quote: "Pay in phases tied to project milestones, not large lump sums upfront.", name: "Raju S.", role: "Founder - Spyne" },
  { quote: "Pay in phases tied to project milestones, not large lump sums upfront.", name: "Raju S.", role: "Founder - Spyne" },
  { quote: "Pay in phases tied to project milestones, not large lump sums upfront.", name: "Raju S.", role: "Founder - Spyne" },
];

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true" className={dir === "right" ? "rotate-180" : ""}>
      <path d="m20 6-10 10 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ClientReviews() {
  const trackRef = useRef<HTMLUListElement>(null);
  const scroll = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const arrow =
    "flex size-[52px] shrink-0 items-center justify-center rounded-full border border-emerald-600 text-emerald-600 transition-colors hover:bg-emerald-600 hover:text-white";

  return (
    <section className="bg-[#0f0f0f] pt-[90px]">
      {/* Decorative tile collage (desktop) */}
      <div aria-hidden="true" className="relative mx-auto hidden h-[472px] max-w-[1248px] min-[1280px]:block">
        {tiles.map((t) => (
          <div
            key={t.src}
            className="absolute overflow-hidden rounded-2xl bg-[#d9d9d9]"
            style={{ left: t.left, top: t.top, width: 181, height: t.h }}
          >
            <Image src={`/client/${t.src}`} alt="" fill sizes="181px" className="object-cover" />
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center px-6 text-center min-[1280px]:-mt-[122px]">
        <SectionBadge>Client reviews</SectionBadge>
        <h2 className="mt-8 max-w-[612px] font-opensans text-4xl font-bold leading-[1.125] text-[#eaeaea] sm:text-5xl lg:text-(length:--text-heading) lg:leading-[72px]">
          What Our Office Clients Say
        </h2>
      </div>

      <div className="relative mx-auto mt-12 max-w-[1248px] px-6 min-[1280px]:mt-[83px] min-[1280px]:px-0">
        <button type="button" onClick={() => scroll(-1)} aria-label="Previous reviews" className={`${arrow} absolute left-0 top-[37px] hidden min-[1280px]:flex`}>
          <Chevron dir="left" />
        </button>
        <ul
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-8 overflow-x-auto scroll-smooth [scrollbar-width:none] min-[1280px]:justify-start min-[1280px]:gap-[100px] min-[1280px]:overflow-visible min-[1280px]:pl-[117px] [&::-webkit-scrollbar]:hidden"
        >
          {reviews.map((r, i) => (
            <li key={i} className="flex w-[271px] shrink-0 snap-start flex-col gap-4 font-opensans leading-[normal] text-[#eaeaea]">
              <div className="relative h-[15.692px] w-[73px] shrink-0 overflow-hidden">
                <Image
                  src="/commercial/reviews/stars.png"
                  alt="5 out of 5 stars"
                  width={73}
                  height={23}
                  className="absolute left-0 top-[-31.15%] h-[149.26%] w-full max-w-none"
                />
              </div>
              <p className="text-sm leading-[normal]">{r.quote}</p>
              <div className="flex items-end gap-3">
                <Image src="/commercial/reviews/avatar.svg" alt="" width={40} height={40} className="shrink-0" />
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-bold leading-[normal]">{r.name}</p>
                  <p className="text-xs leading-[normal]">{r.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <button type="button" onClick={() => scroll(1)} aria-label="Next reviews" className={`${arrow} absolute right-0 top-[37px] hidden min-[1280px]:flex`}>
          <Chevron dir="right" />
        </button>
      </div>
    </section>
  );
}
