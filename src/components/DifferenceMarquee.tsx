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
    quote: "I don't want the final resort to feel different from what I imagined.",
    headingWhite: "Your Vision Never",
    headingGreen: "Gets Lost.",
    body: "Every decision stays aligned with the vision you approved from day one.",
  },
  {
    label: "Common Concern 4:",
    quote: "I don't want expensive mistakes to appear once construction begins.",
    headingWhite: "Every Detail Has",
    headingGreen: "A Purpose.",
    body: "Every material, finish, and decision is chosen with long-term quality in mind.",
  },
  {
    label: "Common Concern 5:",
    quote: "I want guests to remember the experience, not just the building.",
    headingWhite: "Built Around The",
    headingGreen: "Guest Experience.",
    body: "Every space is designed to create comfort, emotion, and unforgettable stays.",
  },
  {
    label: "Common Concern 6:",
    quote: "I need a partner I can genuinely trust with this investment.",
    headingWhite: "Confidence At",
    headingGreen: "Every Stage.",
    body: "Expert guidance and complete transparency support every step of your journey.",
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
  // Use just the 4 concerns, no infinite duplication
  const track = concerns;
  const outerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!trackRef.current || !outerRef.current) return;

    // Calculate the exact distance to sweep so the last card aligns nicely
    // on the right side of the screen. We use 8vw padding to ensure it clears
    // the 8% edge fade mask but stays firmly on the right side.
    const getSweep = () => {
      const rightPadding = window.innerWidth * 0.08;
      return Math.max(0, trackRef.current!.scrollWidth - window.innerWidth + rightPadding);
    };

    // Scroll pace (scroll px per sweep px), tuned so the reveal always feels
    // equally unhurried regardless of how many concern cards there are — the
    // outer wrapper's pinned scroll distance scales with the sweep instead of
    // being a fixed "200vh" that only had enough room for 4 cards.
    const PACE = 1.2;

    const syncHeight = () => {
      if (outerRef.current) {
        outerRef.current.style.height = `${window.innerHeight + getSweep() * PACE}px`;
      }
    };

    syncHeight();

    const ctx = gsap.context(() => {
      // Cards sweep right → left while the outer wrapper is pinned (sticky).
      gsap.fromTo(
        trackRef.current,
        { x: 0 },
        {
          x: () => -getSweep(),
          ease: "none",
          scrollTrigger: {
            trigger: outerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        }
      );

      // Grid background parallax: moves down slightly while scrolling
      if (bgRef.current) {
        gsap.fromTo(
          bgRef.current,
          { y: 0 },
          {
            y: "40vh",
            ease: "none",
            scrollTrigger: {
              trigger: outerRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }
    });

    const handleResize = () => {
      syncHeight();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ctx.revert();
    };
  }, []);

  return (
    // outerRef is the tall scroll canvas that gives the sticky section room to breathe.
    // Height is computed in JS (syncHeight) to scale with however many concern
    // cards there are; this static value is just the pre-hydration fallback.
    <div ref={outerRef} className="hidden md:block relative bg-[#0F0F0F]" style={{ height: "300vh" }}>
      {/* Sticky viewport-height panel */}
      <div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">

        {/* Background grid */}
        <div ref={bgRef} className="pointer-events-none absolute inset-0">
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
        <div className="relative z-10 mx-auto max-w-3xl px-6 flex flex-col items-center text-center lg:px-12 mb-14 w-full">
          <h2 className="font-opensans text-[26px] leading-tight font-bold text-white sm:text-[44px] lg:text-heading flex items-center justify-center whitespace-nowrap gap-x-2 w-full">
            <span>The</span>
            <span className="font-serif font-bold text-emerald-600 italic">Difference</span>
            <span>You&apos;ll Feel</span>
          </h2>
          <p className="mt-4 text-white/60">
            The right partner doesn&apos;t just build better. They make every stage of the journey better.
          </p>
        </div>

        {/* Scrolling card track */}
        <div className="relative z-10 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] overflow-hidden">
          <div ref={trackRef} className="flex gap-6 w-max pl-[6vw] md:pl-[10vw]">
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
            Connect with our team
          </a>
        </div>
      </div>
    </div>
  );
}
