"use client";

import { useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

const stages = ["Vision", "Craft", "Build", "Experience"];

const resortTypes = ["Architectural Concept", "Design Development", "Construction & Interiors", "Luxury Destination"];

const experienceViews: { label: string; icon: "daylight" | "nightfall"; src: string }[] = [
  { label: "Daylight", icon: "daylight", src: "/day-scrub.mp4" },
  { label: "Nightfall", icon: "nightfall", src: "/ggg-scrub.mp4" },
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

function ViewIcon({ type, active }: { type: "daylight" | "nightfall"; active: boolean }) {
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
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" className="shrink-0">
      <path d="M20 14.5A8.5 8.5 0 019.5 4 8.5 8.5 0 1020 14.5z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const SmallGlowingDot = () => (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <g filter="url(#filter0_f_2305_90)">
      <circle cx="5.5" cy="5.5" r="2.5" transform="rotate(-90 5.5 5.5)" stroke="#EAEAEA" />
    </g>
    <circle cx="5.5" cy="5.5" r="2" transform="rotate(-90 5.5 5.5)" fill="#EAEAEA" />
    <defs>
      <filter id="filter0_f_2305_90" x="0" y="0" width="11" height="11" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="1.25" result="effect1_foregroundBlur_2305_90" />
      </filter>
    </defs>
  </svg>
);

export default function VisionShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const progressRef = useRef(0);
  const [activeStage, setActiveStage] = useState(0);
  const [activeView, setActiveView] = useState(0);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const section = sectionRef.current;
    const grid = gridRef.current;
    const videoWrap = videoWrapRef.current;
    const video = videoRef.current;
    if (!section || !grid || !videoWrap || !video) return;

    video.pause();

    const mm = gsap.matchMedia();

    const updateProgress = (self: ScrollTrigger) => {
      progressRef.current = self.progress;
      if (video.duration) video.currentTime = self.progress * video.duration;
      const idx = Math.min(stages.length - 1, Math.floor(self.progress * stages.length));
      setActiveStage((prev) => (prev === idx ? prev : idx));
    };

    const snapBoundaries = {
      onEnter: () => { if (video.duration) video.currentTime = 0; },
      onLeave: () => { if (video.duration) video.currentTime = video.duration; },
      onEnterBack: () => { if (video.duration) video.currentTime = video.duration; },
      onLeaveBack: () => { if (video.duration) video.currentTime = 0; },
    };

    mm.add("(min-width: 1024px)", () => {
      const st = ScrollTrigger.create({
        trigger: grid,
        start: "top 64px",
        end: () => "+=" + window.innerHeight * 1.6,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.5,
        onUpdate: updateProgress,
        ...snapBoundaries,
      });
      scrollTriggerRef.current = st;
      return () => {
        if (scrollTriggerRef.current === st) scrollTriggerRef.current = null;
      };
    }, section);

    mm.add("(max-width: 1023.98px)", () => {
      const st = ScrollTrigger.create({
        trigger: grid,
        start: "top 64px",
        end: () => "+=" + window.innerHeight * 1.6,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.5,
        onUpdate: updateProgress,
        ...snapBoundaries,
      });
      scrollTriggerRef.current = st;
      return () => {
        if (scrollTriggerRef.current === st) scrollTriggerRef.current = null;
      };
    }, section);

    const syncToScrollProgress = () => {
      if (!video.duration) return;
      video.currentTime = (scrollTriggerRef.current?.progress ?? 0) * video.duration;
    };
    if (video.readyState >= 1) {
      syncToScrollProgress();
    } else {
      video.addEventListener("loadedmetadata", syncToScrollProgress, { once: true });
    }

    return () => {
      video.removeEventListener("loadedmetadata", syncToScrollProgress);
      mm.revert();
    };
  }, []);

  const scrollToStage = (index: number, instant = false) => {
    const st = scrollTriggerRef.current;
    if (!st) return false;

    const progress = (index + 0.5) / stages.length;
    gsap.to(window, {
      scrollTo: st.start + (st.end - st.start) * progress,
      duration: instant ? 0 : 1,
      ease: "power2.inOut",
    });
    return true;
  };

  const goTo = (index: number) => {
    if (index === activeStage) return;
    if (!scrollToStage(index)) setActiveStage(index);
  };

  const switchView = (index: number) => {
    if (index === activeView) return;
    setActiveView(index);

    const video = videoRef.current;
    if (video) {
      const onLoaded = () => {
        video.currentTime = progressRef.current * video.duration;
        video.pause();
      };
      video.addEventListener("loadedmetadata", onLoaded, { once: true });
      video.src = experienceViews[index].src;
      video.load();
    }
  };

  return (
    <section ref={sectionRef} className="relative bg-[#0F0F0F] pt-24 pb-12 lg:pt-32 lg:pb-16">
      <div
        ref={gridRef}
        className="mx-auto flex h-177 max-w-7xl 2xl:max-w-[1440px] 2xl:h-[800px] flex-col px-6 lg:px-12"
      >
        <div className="max-w-2xl 2xl:max-w-3xl shrink-0">
          <h2 className="font-opensans text-[36px] leading-[1.1] font-bold text-white sm:text-[48px] lg:text-heading 2xl:text-[68px]">
            Watch Your <span className="font-serif font-bold italic text-emerald-600">Dream</span>
            <br />
            Taking Shape
          </h2>
          <p className="mt-6 text-lg 2xl:text-xl text-white/70">Distinctive hospitality destinations that combine</p>
        </div>

        <div className="mt-10 flex min-h-0 flex-1 flex-col gap-10 lg:grid lg:grid-cols-[auto_1fr_auto] lg:items-stretch 2xl:gap-12">
          <div className="flex shrink-0 flex-col items-center lg:block lg:self-start">
            <div className="flex h-[227px] w-full max-w-[338px] flex-col gap-[6px] rounded-2xl border-[0.2px] border-white/10 bg-white/3 px-[14px] py-[10px] backdrop-blur-md lg:h-76.5 lg:w-60 lg:gap-3 lg:px-3.5 lg:py-2.5 2xl:h-[370px] 2xl:w-[290px] 2xl:px-5 2xl:py-4">
              <div className="flex items-center justify-center gap-3 pb-1 lg:pb-0 lg:justify-start">
                <div>
                  <div className="text-[14px] font-semibold text-white lg:text-base 2xl:text-lg">Process Stages</div>
                  <div className="text-[10px] text-white/50 lg:text-sm 2xl:text-base">Follow the Journey</div>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-2 overflow-y-auto lg:gap-3 2xl:gap-3.5">
                {resortTypes.map((label, i) => {
                  const active = i === activeStage;
                  return (
                    <button
                      key={label}
                      onClick={() => goTo(i)}
                      className={`flex h-[36px] w-full items-center gap-[10px] rounded-lg border px-[12px] py-[6px] text-left text-sm backdrop-blur-md transition-colors lg:h-auto lg:gap-3 lg:rounded-xl lg:px-3 lg:py-2.5 2xl:px-4 2xl:py-3 2xl:text-base ${active
                          ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 font-medium"
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
          </div>

          <div ref={videoWrapRef} className="relative mt-8 flex min-h-0 flex-1 flex-col lg:mt-0 lg:h-full">
            <div className="relative min-h-0 w-full flex-1 overflow-hidden rounded-3xl bg-[#0F0F0F]">
              <video
                ref={videoRef}
                src={experienceViews[0].src}
                className="absolute inset-0 h-full w-full object-cover"
                muted
                playsInline
                preload="auto"
                aria-hidden="true"
              />
            </div>

            <div className="mt-6 flex shrink-0 justify-center">
              <div className="flex w-full max-w-[337px] 2xl:max-w-[400px] items-center justify-center gap-1.5 rounded-lg border-[0.2px] border-white/10 bg-white/5 p-1.5 backdrop-blur-md">
                {experienceViews.map((view, i) => {
                  const active = i === activeView;
                  return (
                    <button
                      key={view.label}
                      onClick={() => switchView(i)}
                      className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-xs 2xl:text-sm font-medium whitespace-nowrap transition-colors ${active
                          ? "border-white/15 bg-white/15 text-white shadow-[0_0_12px_rgba(255,255,255,0.08)]"
                          : "border-transparent text-white/60 hover:bg-white/5 hover:text-white/90"
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

          {/* Progress rail */}
          <div className="hidden lg:flex lg:h-full lg:flex-col lg:items-center lg:self-stretch">
            <div className="relative h-full w-[3px] bg-white/15">
              <div
                className="absolute top-0 left-0 w-full bg-emerald-500 transition-transform duration-500"
                style={{
                  height: `${100 / stages.length}%`,
                  transform: `translateY(${activeStage * 100}%)`,
                }}
              >
                <span className="absolute top-1/2 left-[-22px] flex h-[24px] min-w-[84px] -translate-x-1/2 -translate-y-1/2 -rotate-90 items-center justify-center gap-[10px] rounded-full border border-emerald-500/40 bg-[#0F0F0F] px-[14px] py-[6px] text-[11px] font-semibold tracking-widest whitespace-nowrap text-emerald-600 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                  <SmallGlowingDot />
                  {stages[activeStage]}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
