"use client";

import Image from "next/image";
import { useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const stages = [
  { key: "Vision", image: "/3d/Vision.png" },
  { key: "Craft", image: "/3d/Craft.png" },
  { key: "Build", image: "/3d/Build.png" },
  { key: "Experience", image: "/3d/Experience.png" },
];

const resortTypes = ["Luxury Resort", "Hills Resort", "Eco Resort", "Wellness Retreat"];

const experienceViews: { label: string; icon: "daylight" | "sunset" | "nightfall" }[] = [
  { label: "Daylight", icon: "daylight" },
  { label: "Sunset", icon: "sunset" },
  { label: "Nightfall", icon: "nightfall" },
];

function CheckIcon({ active }: { active: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="shrink-0">
      <circle cx="10" cy="10" r="9" className={active ? "fill-emerald-500" : "fill-white"} />
      <path
        d="M6 10.2l2.4 2.4L14 7"
        stroke={active ? "#ffffff" : "#111827"}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ViewIcon({ type, active }: { type: "daylight" | "sunset" | "nightfall"; active: boolean }) {
  const color = active ? "#34d399" : "#ffffff";
  if (type === "daylight") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" className="shrink-0">
        <circle cx="12" cy="12" r="4" />
        <path
          d="M12 2v2M12 20v2M4 12H2M22 12h-2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (type === "sunset") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" className="shrink-0">
        <path d="M3 18h18M6 18a6 6 0 0112 0" strokeLinecap="round" />
        <path d="M12 4v6M8.5 7.5l2 2M15.5 7.5l-2 2" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" className="shrink-0">
      <path d="M20 14.5A8.5 8.5 0 019.5 4 8.5 8.5 0 1020 14.5z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const SmallGlowingDot = () => (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <g filter="url(#filter0_f_2305_90)">
      <circle cx="5.5" cy="5.5" r="2.5" transform="rotate(-90 5.5 5.5)" stroke="#EAEAEA"/>
    </g>
    <circle cx="5.5" cy="5.5" r="2" transform="rotate(-90 5.5 5.5)" fill="#EAEAEA"/>
    <defs>
      <filter id="filter0_f_2305_90" x="0" y="0" width="11" height="11" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feGaussianBlur stdDeviation="1.25" result="effect1_foregroundBlur_2305_90"/>
      </filter>
    </defs>
  </svg>
);

export default function VisionShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStage, setActiveStage] = useState(0);
  const [activeView, setActiveView] = useState(0);
  const nextDirection = useRef<"left" | "right">("left");
  const frameRefs = useRef<(HTMLDivElement | null)[]>([]);
  const parallaxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isAnimating = useRef(false);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Image Parallax: move images slightly up and down based on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        animation: gsap.fromTo(
          parallaxRefs.current,
          { yPercent: -10 },
          { yPercent: 10, ease: "none" }
        ),
        scrub: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const goTo = (index: number) => {
    if (index === activeStage || isAnimating.current) return;
    isAnimating.current = true;

    const direction = nextDirection.current;
    nextDirection.current = direction === "left" ? "right" : "left";

    const outgoing = frameRefs.current[activeStage];
    const incoming = frameRefs.current[index];
    const outAngle = direction === "left" ? -90 : 90;
    const inAngle = direction === "left" ? 90 : -90;

    gsap.set(incoming, { autoAlpha: 1, rotateY: inAngle, zIndex: 2 });
    gsap.set(outgoing, { zIndex: 1 });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(outgoing, { autoAlpha: 0 });
        isAnimating.current = false;
      },
    });
    tl.to(outgoing, { rotateY: outAngle, autoAlpha: 0, duration: 0.55, ease: "power2.inOut" }, 0);
    tl.to(incoming, { rotateY: 0, autoAlpha: 1, duration: 0.55, ease: "power2.inOut" }, 0);

    setActiveStage(index);
  };

  return (
    <section ref={sectionRef} className="relative bg-[#0F0F0F] py-24 lg:py-32">
      {/* Absolute Progress Line on Extreme Right */}
      <div 
        className="absolute z-10 hidden flex-col items-center lg:flex"
        style={{ 
          top: "180px", 
          right: "max(24px, calc(50% - 622px))" // Maps to left: 1342px on a 1440px screen
        }}
      >
        <div className="relative bg-white/15 w-[3px] h-[764px]">
          <div
            className="absolute top-0 left-0 w-full bg-emerald-500 transition-all duration-500"
            style={{ height: "191px", transform: `translateY(${activeStage * 191}px)` }}
          >
            <span
              className="absolute top-1/2 left-[-22px] flex min-w-[84px] h-[24px] -translate-x-1/2 -translate-y-1/2 -rotate-90 items-center justify-center gap-[10px] rounded-full border border-emerald-500/40 bg-[#0F0F0F] px-[14px] py-[6px] text-[11px] font-semibold tracking-widest text-emerald-600 whitespace-nowrap shadow-[0_0_15px_rgba(16,185,129,0.2)]"
            >
              <SmallGlowingDot />
              {stages[activeStage].key}
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="max-w-2xl">
          <h2 className="font-opensans text-[36px] leading-[1.1] font-bold text-white sm:text-[48px] lg:text-[56px]">
            Watch Your <span className="font-serif font-bold italic text-emerald-600">Dream</span>
            <br />
            Taking Shape
          </h2>
          <p className="mt-6 text-lg text-white/70">Distinctive hospitality destinations that combine</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[auto_1fr] lg:items-center">
          <div className="flex flex-col items-center lg:block">
            <div className="flex h-[227px] w-full max-w-[338px] flex-col gap-[6px] rounded-2xl border-[0.2px] border-white/10 bg-white/3 px-[14px] py-[10px] backdrop-blur-md lg:h-76.5 lg:w-60 lg:gap-3 lg:px-3.5 lg:py-2.5">
              <div className="flex items-center justify-center gap-3 pb-1 lg:pb-0 lg:justify-start">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/40">
                  <span className="h-2 w-2 rounded-full bg-white" />
                </span>
                <div>
                  <div className="text-[14px] font-semibold text-white lg:text-base">Resort Type</div>
                  <div className="text-[10px] text-white/50 lg:text-sm">Select your dream resort</div>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-2 overflow-y-auto lg:gap-3">
                {resortTypes.map((label, i) => {
                  const active = i === activeStage;
                  return (
                    <button
                      key={label}
                      onClick={() => goTo(i)}
                      className={`flex h-[36px] w-full items-center gap-[10px] rounded-lg border px-[12px] py-[6px] text-left text-sm backdrop-blur-md transition-colors lg:h-auto lg:gap-3 lg:rounded-xl lg:px-3 lg:py-2.5 ${
                        active
                          ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600"
                          : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
                      }`}
                    >
                      <CheckIcon active={active} />
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 flex h-[189px] w-full max-w-[337px] flex-col gap-[6px] rounded-2xl border-[0.2px] border-white/10 bg-white/3 px-[14px] py-[10px] backdrop-blur-md lg:h-62 lg:w-60 lg:gap-3 lg:px-3.5 lg:py-2.5">
              <div className="flex items-center justify-center gap-3 pb-1 lg:pb-0 lg:justify-start">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/40">
                  <span className="h-2 w-2 rounded-full bg-white" />
                </span>
                <div>
                  <div className="text-[14px] font-semibold text-white lg:text-base">The Experience</div>
                  <div className="text-[10px] text-white/50 lg:text-sm">Select your fav view</div>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-2 overflow-y-auto lg:gap-3">
                {experienceViews.map((view, i) => {
                  const active = i === activeView;
                  return (
                    <button
                      key={view.label}
                      onClick={() => setActiveView(i)}
                      className={`flex h-[36px] w-full items-center gap-[10px] rounded-lg border px-[12px] py-[6px] text-left text-sm backdrop-blur-md transition-colors lg:h-auto lg:gap-3 lg:rounded-xl lg:px-3 lg:py-2.5 ${
                        active
                          ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600"
                          : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
                      }`}
                    >
                      <ViewIcon type={view.icon} active={active} />
                      {view.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="flex items-center gap-5">
              <div
                className="relative aspect-[3/2] w-full flex-1 overflow-hidden rounded-3xl bg-black"
                style={{ perspective: "1600px" }}
              >
                {stages.map((stage, i) => (
                  <div
                    key={stage.key}
                    ref={(el) => {
                      frameRefs.current[i] = el;
                    }}
                    className="absolute inset-0"
                    style={{
                      opacity: i === activeStage ? 1 : 0,
                      visibility: i === activeStage ? "visible" : "hidden",
                      transformStyle: "preserve-3d",
                      zIndex: i === activeStage ? 2 : 1,
                    }}
                  >
                    {/* Inner wrapper for parallax effect to avoid transform conflicts with the flip animation */}
                    <div
                      ref={(el) => {
                        parallaxRefs.current[i] = el;
                      }}
                      className="absolute -inset-y-[15%] inset-x-0"
                    >
                      <Image
                        src={stage.image}
                        alt={stage.key}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover mix-blend-lighten"
                        priority={i === 0}
                      />
                    </div>
                  </div>
                ))}
              </div>


            </div>

            <p className="mt-4 flex items-center justify-center gap-2 text-sm text-white/50">
              <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
              Scroll to see the progress
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
