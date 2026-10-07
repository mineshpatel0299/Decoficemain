"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Navbar from "./Navbar";

const commercialNavLinks = [
  { label: "Projects", href: "https://www.decofice.com/project" },
  { label: "Real Estate Solution", href: "https://www.decofice.com/realestate-solution" },
  { label: "About Us", href: "https://www.decofice.com/about" },
  { label: "Start Your Project", href: "https://www.decofice.com/project-booking" },
  { label: "Blog", href: "https://www.decofice.com/blog" },
];

const segments = [
  "Corporate offices",
  "SME & branch offices",
  "Retail stores",
  "Showrooms",
  "Experience centres",
];

export default function CommercialHero({ onEnquire }: { onEnquire: () => void }) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const targets = contentRef.current?.children;
    if (!targets) return;

    gsap.fromTo(
      targets,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, ease: "power3.out", stagger: 0.12 }
    );
  }, []);

  return (
    <section className="relative isolate flex min-h-[760px] w-full flex-col overflow-hidden bg-neutral-900 lg:h-[920px]">
      {/* Hero artwork lives at public/commercial/hero.png */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -z-20 h-[1060px] w-[1550px] min-w-full -translate-x-1/2 -translate-y-[calc(50%-38px)] bg-[url('/commercial/hero.png')] bg-cover bg-center"
      />
      {/* Flat 55% scrim, as in the design */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/55" />

      <div className="relative z-30">
        <Navbar
          links={commercialNavLinks}
          className="px-6 pt-4 lg:px-24"
          contactClassName="bg-[#eaeaea] text-[#0f0f0f] hover:bg-[#eaeaea]/90"
        />
      </div>

      <div className="flex flex-1 items-center justify-center px-6 pb-16">
        <div
          ref={contentRef}
          className="mx-auto flex w-full max-w-[988px] flex-col items-center gap-8 text-center"
        >
          <span className="inline-flex h-6 items-center justify-center gap-2.5 rounded-full bg-[#eaeaea]/20 px-3.5 font-opensans text-xs uppercase tracking-[0.12px] text-[#eaeaea] opacity-0">
            <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_0_3px_rgba(255,255,255,0.3)]" />
            design, build, deliver
          </span>

          <h1 className="font-opensans text-[clamp(2.25rem,8vw,3rem)] font-bold leading-[1.08] text-[#eaeaea] opacity-0 md:text-[62.4px] md:leading-[67.39px]">
            <span className="font-serif italic text-emerald-600">Commercial</span>{" "}
            Interiors &amp; Fit-Outs
          </h1>

          <p className="max-w-[988px] font-opensans text-base leading-[26px] text-[#eaeaea] opacity-0 sm:text-xl">
            Decofice designs and builds workplaces and stores. Design, 3D, construction and MEP, HVAC,
            structural and vastu consultancy sit with one team, under one contract.
          </p>

          <ul className="flex flex-wrap justify-center gap-3 opacity-0">
            {segments.map((segment) => (
              <li
                key={segment}
                className="flex h-8 items-center rounded-full border-[0.5px] border-[#eaeaea] bg-[#eaeaea]/20 px-2.5 font-opensans text-xs text-[#eaeaea]"
              >
                {segment}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center justify-center gap-8 opacity-0">
            <button
              type="button"
              onClick={onEnquire}
              className="inline-flex h-12 items-center justify-center gap-2.5 whitespace-nowrap rounded-lg bg-emerald-600 px-7 font-opensans text-base font-semibold leading-6 text-[#eaeaea] transition-colors hover:bg-emerald-500"
            >
              Submit Your Enquiry
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M5 12h14m0 0-6-6m6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <a
              href="#fit-out-packages"
              onClick={(e) => {
                const target = document.getElementById("fit-out-packages");
                if (!target) return;
                e.preventDefault();
                const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
                history.replaceState(null, "", "#fit-out-packages");
              }}
              className="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-lg border-[0.5px] border-[#eaeaea] px-7 font-opensans text-base font-semibold leading-6 text-[#eaeaea] transition-colors hover:bg-white/10"
            >
              See Fit-out Packages
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
