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
  {
    quote: "The team turned our brief into a refined office with thoughtful details, premium finishes, and a smooth handover.",
    name: "Ananya M.",
    role: "Operations Director · Dubai",
    avatar: "https://images.unsplash.com/photo-1773254214740-9fbc8d92688a?auto=format&fit=crop&crop=faces&w=96&h=96&q=80",
  },
  {
    quote: "From the reception to the meeting rooms, every space feels considered. The lighting and finish quality are excellent.",
    name: "Rohan K.",
    role: "Founder · Technology company",
    avatar: "https://images.unsplash.com/photo-1649433658557-54cf58577c68?auto=format&fit=crop&crop=faces&w=96&h=96&q=80",
  },
  {
    quote: "Design and execution felt seamless. Our new office looks elevated and works beautifully for the entire team.",
    name: "Nisha K.",
    role: "Managing Partner · Consulting",
    avatar: "https://images.unsplash.com/photo-1768803968211-a7f04e1effd2?auto=format&fit=crop&crop=faces&w=96&h=96&q=80",
  },
  {
    quote: "We had clear updates throughout, and the final workspace reflects our brand with a genuinely premium finish.",
    name: "Arjun R.",
    role: "Regional Director · Finance",
    avatar: "https://images.unsplash.com/photo-1590473159791-1d514fd3656e?auto=format&fit=crop&crop=faces&w=96&h=96&q=80",
  },
  {
    quote: "Our office feels brighter, calmer, and more functional. The team paid attention to the details we use every day.",
    name: "Kavita S.",
    role: "People Lead · Enterprise",
    avatar: "https://images.unsplash.com/photo-1603370928866-e15805756740?auto=format&fit=crop&crop=faces&w=96&h=96&q=80",
  },
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
    <section className="bg-[#0f0f0f] pt-12 lg:pt-[90px]">
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
        <h2 className="mt-5 max-w-[612px] font-opensans text-[30px] font-bold leading-[1.125] text-[#eaeaea] sm:mt-8 sm:text-5xl lg:text-(length:--text-heading) lg:leading-[72px]">
          What Our Office Clients Say
        </h2>
        <p className="mt-3 text-xs text-white/45">Sample reviews · Portraits are illustrative</p>
      </div>

      <div className="relative mx-auto mt-8 max-w-[1248px] px-5 sm:mt-12 sm:px-6 min-[1280px]:mt-[83px] min-[1280px]:px-0">
        <button type="button" onClick={() => scroll(-1)} aria-label="Previous reviews" className={`${arrow} absolute left-0 top-[37px] hidden min-[1280px]:flex`}>
          <Chevron dir="left" />
        </button>
        <div className="min-[1280px]:mx-[68px]">
          <ul
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth [scrollbar-width:none] min-[1280px]:justify-start min-[1280px]:gap-[100px] [&::-webkit-scrollbar]:hidden"
          >
            {reviews.map((r) => (
              <li key={r.name} className="flex w-[min(84vw,360px)] shrink-0 snap-start flex-col gap-4 rounded-2xl border border-white/10 bg-[#181818] p-5 font-opensans leading-[normal] text-[#eaeaea] min-[1280px]:w-[271px] min-[1280px]:rounded-none min-[1280px]:border-0 min-[1280px]:bg-transparent min-[1280px]:p-0">
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
                  <Image src={r.avatar} alt="" width={40} height={40} className="size-10 shrink-0 rounded-full object-cover ring-1 ring-white/15" />
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-bold leading-[normal]">{r.name}</p>
                    <p className="text-xs leading-[normal]">{r.role}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <button type="button" onClick={() => scroll(1)} aria-label="Next reviews" className={`${arrow} absolute right-0 top-[37px] hidden min-[1280px]:flex`}>
          <Chevron dir="right" />
        </button>
      </div>
    </section>
  );
}
