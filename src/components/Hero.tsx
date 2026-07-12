"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Navbar from "./Navbar";

export default function Hero() {
  const craftingRef = useRef<HTMLParagraphElement>(null);
  const rememberingRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Text rises up from behind the mountain/resort cutouts, which already sit
    // in front of these lines in the z-order. Starts once the preloader (2s
    // delay + 1.2s slide) has fully cleared, so it lands after the homepage reveal.
    gsap.set([craftingRef.current, rememberingRef.current], { y: 70, opacity: 0 });
    gsap.to([craftingRef.current, rememberingRef.current], {
      y: 0,
      opacity: 1,
      duration: 1.4,
      ease: "power3.out",
      delay: 3.3,
      stagger: 0.15,
    });
  }, []);

  return (
    <section className="relative isolate h-250 max-h-screen min-h-180 w-full overflow-hidden bg-black">
      {/* Base scene: sky, mountains, valley, resort (baked in) */}
      <Image
        src="/Full view dark.png"
        alt="Decofice destination at night, nestled in a mountain valley"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Subtle bottom scrim for button/nav legibility */}
      <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/40" />

      <Navbar />

      {/* Badge + "Crafting Places Worth": sits behind the mountain cutout so it can occlude it a little. Positioned in vw (not %-of-height) so it tracks the background image's own width-driven scaling and stays proportionate across laptop/desktop sizes. */}
      <div className="absolute inset-x-0 top-[23%] z-5 mx-auto flex max-w-5xl translate-x-4 flex-col items-center px-6 text-center lg:top-[clamp(226px,17vw,271px)]">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold tracking-[0.2em] text-white/90 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          DESTINATIONS IN THE MAKING
        </span>

        <p
          ref={craftingRef}
          aria-hidden="true"
          className="mt-8 font-opensans text-[28px] font-extrabold leading-8.5 tracking-normal text-white sm:text-[42px] sm:leading-12 lg:text-[63px] lg:leading-17.5"
        >
          Crafting Places Worth
        </p>
      </div>

      {/* Mountain cutout: in front of "Crafting Places Worth", behind "Remembering" and the resort */}
      <Image
        src="/Mountains.png"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="pointer-events-none absolute inset-0 z-10 object-cover"
      />

      {/* "Remembering": in front of the mountains, behind the resort cutout so the roofline can occlude it a little. Also vw-based to stay proportionate across viewport widths. */}
      <p
        ref={rememberingRef}
        aria-hidden="true"
        className="absolute inset-x-0 top-[31%] z-15 mx-auto max-w-5xl px-6 text-center font-serif text-[38px] font-bold italic leading-8.5 tracking-normal text-emerald-500 sm:text-[60px] sm:leading-13.5 lg:text-[96px] lg:leading-17.5 lg:top-[clamp(305px,27.3vw,435px)]"
      >
        Remembering
      </p>

      {/* Accessible heading: visually hidden, mirrors the two styled lines above for assistive tech and SEO */}
      <h1 className="sr-only">Crafting Places Worth Remembering</h1>

      {/* Resort cutout, pinned to its exact position in the base scene, in front of the copy */}
      <Image
        src="/Resort.png"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="pointer-events-none absolute inset-0 z-20 object-cover"
      />

      {/* CTAs: kept above the resort cutout so they always stay legible and clickable */}
      <div className="absolute inset-x-0 bottom-[16%] z-30 flex flex-wrap items-center justify-center gap-4 px-6">
        <a
          href="#discuss-your-vision"
          className="font-opensans inline-flex h-12 items-center justify-center gap-2.5 whitespace-nowrap rounded-lg bg-emerald-600 px-7 py-3 text-base leading-6 font-semibold text-white transition-colors hover:bg-emerald-500"
        >
          Discuss Your Vision
        </a>
        <a
          href="#enter-the-experience"
          className="font-opensans inline-flex h-12 items-center justify-center gap-2.5 whitespace-nowrap rounded-lg border border-white/70 px-7 py-3 text-base leading-6 font-semibold text-white transition-colors hover:bg-white/10"
        >
          Enter The Experience
        </a>
      </div>
    </section>
  );
}
