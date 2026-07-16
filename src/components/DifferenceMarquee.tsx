"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const concerns = [
  {
    label: "Common Concern 1:",
    quote: "I just want to know what's happening with my project",
    headingWhite: "You'll Always Know",
    headingGreen: "What's Next.",
    body: "Clear milestones and regular updates keep your project moving with complete confidence.",
  },
  {
    label: "Common Concern 2:",
    quote: "I'm tired of coordinating multiple consultants and contractors",
    headingWhite: "One Team.",
    headingGreen: "One Responsibility.",
    body: "One integrated team manages every discipline, giving you a single point of accountability.",
  },
  {
    label: "Common Concern 3:",
    quote: "I'm worried costs will spiral out of control",
    headingWhite: "One Price.",
    headingGreen: "No Surprises.",
    body: "Transparent, fixed-scope pricing agreed upfront, with zero hidden costs along the way.",
  },
  {
    label: "Common Concern 4:",
    quote: "I don't know if my vision will actually get built the way I imagined",
    headingWhite: "Your Vision,",
    headingGreen: "Exactly Realized.",
    body: "From concept to handover, every detail is executed exactly as designed.",
  },
];

function QuoteIcon() {
  return (
    <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block align-middle mr-1 shrink-0 relative -top-2">
      <path d="M12.9297 0C12.6562 1.0026 12.3828 2.08984 12.1094 3.26172C11.849 4.42057 11.6081 5.56641 11.3867 6.69922C11.1654 7.83203 10.9896 8.86068 10.8594 9.78516H7.40234L7.10938 9.35547C7.34375 8.40495 7.64323 7.38932 8.00781 6.30859C8.38542 5.22786 8.78906 4.14714 9.21875 3.06641C9.66146 1.97266 10.1042 0.950521 10.5469 0H12.9297ZM5.74219 0C5.46875 1.0026 5.19531 2.08984 4.92188 3.26172C4.66146 4.42057 4.42057 5.56641 4.19922 6.69922C3.97786 7.83203 3.80208 8.86068 3.67188 9.78516H0.234375L0 9.35547C0.234375 8.40495 0.527344 7.38932 0.878906 6.30859C1.24349 5.22786 1.64062 4.14714 2.07031 3.06641C2.5 1.97266 2.9362 0.950521 3.37891 0H5.74219Z" fill="#EAEAEA"/>
    </svg>
  );
}

function ConcernCard({ concern }: { concern: (typeof concerns)[number] }) {
  return (
    <div className="font-opensans relative shrink-0 w-[495px] h-[380px] overflow-hidden rounded-3xl text-center">
      {/* glass.png only — no extra overlays */}
      <Image
        src="/stats/glass.png"
        alt=""
        aria-hidden="true"
        fill
        sizes="495px"
        className="object-cover"
      />

      {/* Inner content: exactly 447×242, centered in the 495×380 card, 54px gap between groups */}
      <div className="relative flex h-full items-center justify-center px-[56px]">
        <div className="flex w-[447px] h-[242px] flex-col justify-between gap-[54px] text-center items-center">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-bold text-emerald-500 uppercase tracking-widest">{concern.label}</p>
            <p className="text-base leading-relaxed text-white/60"><QuoteIcon />{concern.quote}</p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-2xl leading-tight font-bold">
              <span className="text-white">{concern.headingWhite}</span>
              <br />
              <span className="font-serif italic text-emerald-500">{concern.headingGreen}</span>
            </p>
            <p className="text-sm leading-relaxed text-white">{concern.body}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DifferenceMarquee() {
  // Duplicate cards so sweep never shows a gap
  const track = [...concerns, ...concerns, ...concerns];
  const outerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!trackRef.current || !outerRef.current) return;

      // Total distance to sweep = one full set of cards (concerns.length cards)
      const cardWidth = 495 + 24; // card width + gap
      const sweep = cardWidth * concerns.length;

      // Cards sweep right → left while the outer wrapper is pinned (sticky).
      // start: when the sticky top hits top of viewport
      // end: when the outer wrapper bottom exits viewport
      gsap.fromTo(
        trackRef.current,
        { x: 0 },
        {
          x: -sweep,
          ease: "none",
          scrollTrigger: {
            trigger: outerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    // outerRef is the tall scroll canvas that gives the sticky section room to breathe
    <div ref={outerRef} className="relative bg-[#0F0F0F]" style={{ height: "300vh" }}>
      {/* Sticky viewport-height panel */}
      <div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">

        {/* Background grid */}
        <div className="pointer-events-none absolute inset-0">
          <Image
            src="/grids.png"
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            className="object-cover mask-[linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] opacity-40"
          />
        </div>

        {/* Content above cards */}
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center lg:px-12 mb-14">
          <h2 className="font-opensans text-[32px] leading-tight font-bold text-white sm:text-[44px] lg:text-[52px]">
            The <span className="font-serif font-bold text-emerald-600 italic">Difference</span>{" "}
            You&apos;ll Feel
          </h2>
          <p className="mt-4 text-white/60">
            The right partner doesn&apos;t just build better. They make every stage of the journey better.
          </p>
        </div>

        {/* Scrolling card track */}
        <div className="relative z-10 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] overflow-hidden">
          <div ref={trackRef} className="flex gap-6 w-max">
            {track.map((concern, i) => (
              <ConcernCard key={`${concern.label}-${i}`} concern={concern} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="relative z-10 mt-14 flex justify-center px-6 lg:px-12">
          <a
            href="#feel-the-difference"
            className="font-opensans inline-flex h-11 items-center justify-center rounded-lg bg-emerald-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-emerald-500"
          >
            Feel The Difference Yourself
          </a>
        </div>
      </div>
    </div>
  );
}
