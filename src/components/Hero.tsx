"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Navbar from "./Navbar";
import ContactModal from "./ContactModal";

export default function Hero() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const craftingRef = useRef<HTMLParagraphElement>(null);
  const rememberingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const badgeMobileRef = useRef<HTMLSpanElement>(null);
  const craftingMobileRef = useRef<HTMLParagraphElement>(null);
  const rememberingMobileRef = useRef<HTMLParagraphElement>(null);
  const ctaMobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Text and CTAs rise up from behind the mountain/resort cutouts, which already
    // sit in front of these elements in the z-order. Starts once the preloader
    // (1s delay + 1.4s logo zoom + 0.4s fade, overlapping) has fully cleared at
    // ~2.5s, so this lands right after the homepage reveal. Mobile and desktop
    // nodes both exist in the DOM (only one set is visible per breakpoint), so
    // they're animated together and the hidden set is just a no-op visually.
    const desktopTargets = [
      badgeRef.current,
      craftingRef.current,
      rememberingRef.current,
      ctaRef.current,
    ];
    
    const mobileTargets = [
      badgeMobileRef.current,
      craftingMobileRef.current,
      rememberingMobileRef.current,
      ctaMobileRef.current,
    ];
    
    const hasSeen = sessionStorage.getItem("hasSeenPreloader");
    const delay = hasSeen ? 0 : 2.6;

    const animTo = {
      y: 0,
      opacity: 1,
      duration: 1.4,
      ease: "power3.out",
      delay,
      stagger: 0.15,
    };

    gsap.fromTo(desktopTargets, { y: 70, opacity: 0 }, animTo);
    gsap.fromTo(mobileTargets, { y: 70, opacity: 0 }, animTo);
  }, []);

  return (
    <section className="relative isolate w-full overflow-hidden bg-black">
      {/* Shared nav overlay: sits above whichever composition below is visible */}
      <div className="absolute inset-x-0 top-0 z-30">
        <Navbar />
      </div>

      {/* Accessible heading: visually hidden, mirrors the two styled lines in both compositions below for assistive tech and SEO */}
      <h1 className="sr-only">Crafting The Future Of Hospitality</h1>

      {/* Desktop composition (>= lg): wide-format artwork, occlusion math tuned for landscape aspect ratios */}
      <div className="relative isolate hidden h-250 max-h-screen min-h-180 w-full lg:block">
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

        {/* Badge + "Crafting Places Worth": sits behind the mountain cutout so it can occlude it a little. Font-size is pure vw because object-cover's pixel scale on this width-dominant container is exactly cw/imageNativeWidth, independent of height. But *position* is NOT pure vw: object-cover also crops the image top/bottom by (scaledHeight − containerHeight)/2, and that crop amount depends on containerHeight too — so a fixed point in the artwork (e.g. the mountain ridge) lands at top = (v−0.5)·(imageNativeHeight/imageNativeWidth)·vw + 0.5·vh for its normalized vertical fraction v. Solved against the 1440×900 reference point where the badge sits correctly, that's -14.25vw + 50vh. A pure-vw formula only happens to work when the window's aspect ratio matches the 1440:900 reference (as it does under simple browser-zoom testing, which scales width and height together) — on a wider/shorter real window (common on external monitors, or short browser chrome) it drifts the text down into the art, since the art crops more aggressively than pure vw accounts for. */}
        <div className="absolute inset-x-0 top-[calc(-14.25vw+50vh+6px)] z-5 mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
          <span ref={badgeRef} className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold tracking-[0.2em] text-white/90 backdrop-blur-sm opacity-0">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            DESTINATIONS IN THE MAKING
          </span>

          <p
            ref={craftingRef}
            aria-hidden="true"
            className="mt-10 font-opensans text-[4.375vw] font-extrabold leading-[1.111] tracking-normal text-white opacity-0"
          >
            Crafting The Future Of
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

        {/* "Remembering": in front of the mountains, behind the resort cutout so the roofline can occlude it a little. Same width+height-aware formula as the badge wrapper above, plus an offset of 4.86vw + 72px to perfectly match the dynamic height of the text above it (which includes a fixed mt-10 and fixed badge height) so the visual gap remains identically tight across all browser zoom levels. */}
        <p
          ref={rememberingRef}
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(-14.25vw+50vh+4.86vw+78px)] z-15 mx-auto max-w-5xl px-6 text-center font-serif text-[6.667vw] font-bold italic leading-[0.729] tracking-normal text-emerald-600 opacity-0"
        >
          Hospitality
        </p>

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
        <div
          ref={ctaRef}
          className="absolute inset-x-0 bottom-[16%] z-30 flex flex-wrap items-center justify-center gap-4 px-6 opacity-0"
        >
          <button
            type="button"
            onClick={() => setIsContactOpen(true)}
            className="font-opensans inline-flex h-12 items-center justify-center gap-2.5 whitespace-nowrap rounded-lg bg-emerald-600 px-7 py-3 text-base leading-6 font-semibold text-white transition-colors hover:bg-emerald-500"
          >
            Discuss Your Vision
          </button>

        </div>
      </div>

      {/* Mobile composition (< lg): dedicated portrait artwork from /heromobile, same occlusion trick as desktop.
      Full device height per spec; top-[%] offsets below are proportioned against a 375×812 reference frame. */}
      <div className="relative isolate block h-[100svh] min-h-140 w-full lg:hidden">
        {/* Base scene: sky, mountains, valley, resort (baked in) */}
        <Image
          src="/heromobile/Hero_.png"
          alt="Decofice destination at night, nestled in a mountain valley"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Subtle bottom scrim for button/nav legibility */}
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/40" />

        {/* Badge + "Crafting Places Worth": sits behind the hills cutout so it can occlude it a little */}
        <div className="absolute inset-x-0 top-[31%] z-5 mx-auto flex flex-col items-center px-6 text-center">
          <span ref={badgeMobileRef} className="flex h-4.5 w-34.5 items-center justify-center gap-1.5 whitespace-nowrap rounded-3xl border border-white/25 bg-white/10 pt-0.75 pr-1.75 pb-0.75 pl-1.75 text-[6px] font-semibold tracking-widest text-white/90 backdrop-blur-sm opacity-0">
            <span className="h-1 w-1 shrink-0 rounded-full bg-white" />
            DESTINATIONS IN THE MAKING
          </span>

          <p
            ref={craftingMobileRef}
            aria-hidden="true"
            className="mt-6 font-opensans text-[6.5vw] font-extrabold whitespace-nowrap leading-[1.2] tracking-normal text-white opacity-0"
          >
            Crafting The Future Of
          </p>
        </div>

        {/* Hills cutout: in front of "Crafting Places Worth", behind "Remembering" and the resort */}
        <Image
          src="/heromobile/Hills.png"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="pointer-events-none absolute inset-0 z-10 object-cover"
        />

        {/* "Remembering": in front of the hills, behind the resort cutout so the roofline can occlude it a little */}
        <p
          ref={rememberingMobileRef}
          aria-hidden="true"
          className="absolute inset-x-0 top-[41%] z-15 mx-auto px-6 text-center font-serif text-[9.5vw] font-bold italic leading-[1.05] tracking-normal text-emerald-600 opacity-0"
        >
          Hospitality
        </p>

        {/* Resort cutout, pinned to its exact position in the base scene, in front of the copy */}
        <Image
          src="/heromobile/Resort.png"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="pointer-events-none absolute inset-0 z-20 object-cover"
        />

        {/* CTAs: kept above the resort cutout so they always stay legible and clickable */}
        <div ref={ctaMobileRef} className="absolute inset-x-0 bottom-[17%] z-30 flex flex-col items-center gap-4 px-6 opacity-0">
          <button
            type="button"
            onClick={() => setIsContactOpen(true)}
            className="font-opensans flex h-9 w-37 items-center justify-center gap-2.5 whitespace-nowrap rounded-lg bg-emerald-600 px-3 py-2 text-xs leading-4 font-semibold text-white transition-colors hover:bg-emerald-500"
          >
            Discuss Your Vision
          </button>
          {/* <a
            href="#enter-the-experience"
            className="font-opensans flex h-9 w-37 items-center justify-center gap-2.5 whitespace-nowrap rounded-lg border border-white/70 px-3 py-2 text-xs leading-4 font-semibold text-white transition-colors hover:bg-white/10"
          >
            Enter The Experience
          </a> */}
        </div>
      </div>

      <ContactModal open={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
}
