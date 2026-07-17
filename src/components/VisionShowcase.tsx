"use client";

import { useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

const stages = ["Vision", "Craft", "Build", "Experience"];

const resortTypes = ["Luxury Resort", "Hills Resort", "Eco Resort", "Wellness Retreat"];

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const progressRef = useRef(0);
  const [activeStage, setActiveStage] = useState(0);
  const [activeView, setActiveView] = useState(0);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const section = sectionRef.current;
    const grid = gridRef.current;
    const video = videoRef.current;
    if (!section || !grid || !video) return;

    let ctx: ReturnType<typeof gsap.context> | null = null;
    let cancelled = false;

    // `loadedmetadata` fires asynchronously (whenever the video finishes
    // fetching), so this runs after the effect's own synchronous setup has
    // already returned. Creating the gsap.context() here — at the moment the
    // ScrollTrigger is actually built, instead of wrapping the whole effect
    // in one up front — means ctx.revert() in cleanup reliably tears down
    // whatever got created, even if that happened later, asynchronously.
    // Without this, a duplicate effect run (React Strict Mode in dev, or any
    // remount before metadata loads) can leave two competing pins on the same
    // section, which breaks the pin's reserved scroll space and lets the next
    // section bleed up over the video mid-scroll.
    const startScrub = () => {
      if (cancelled) return;
      if (!video.duration) return;

      video.pause();

      ctx = gsap.context(() => {
        // Scrub the video's currentTime directly off scroll progress. A numeric
        // `scrub` value (instead of `true`) makes ScrollTrigger ease its own
        // progress toward the scroll position every tick, so the video glides
        // instead of snapping frame-to-frame on fast/jittery scroll input.
        // Duration is read live (not captured once) so switching the video
        // source (Daylight/Nightfall) keeps scrubbing correctly afterward.
        const updateProgress = (self: ScrollTrigger) => {
          progressRef.current = self.progress;
          video.currentTime = self.progress * (video.duration || 0);
          const idx = Math.min(stages.length - 1, Math.floor(self.progress * stages.length));
          setActiveStage((prev) => (prev === idx ? prev : idx));
        };

        // Desktop: pin just the cards/video row (not the heading above it), so
        // the heading scrolls past normally and the pinned view starts right
        // at the row — the video is always fully visible without needing to
        // shrink it, whatever the viewport height. Mobile content is too tall
        // to pin without clipping, so it just scrubs the video as the section
        // naturally passes through the viewport.
        ScrollTrigger.matchMedia({
          "(min-width: 1024px)": () => {
            const st = ScrollTrigger.create({
              trigger: grid,
              start: "top 120px",
              end: () => "+=" + window.innerHeight * 1.6,
              pin: true,
              // GSAP silently disables pin spacing by default when the pinned
              // element's parent is a flex container (`<main>`, the section's
              // ultimate ancestor in app/page.tsx, is). Force it on explicitly
              // regardless of the current DOM chain, or the pin can end up
              // never reserving scroll runway and later sections bleed up
              // over the pinned video.
              pinSpacing: true,
              anticipatePin: 1,
              scrub: 0.5,
              onUpdate: updateProgress,
              // The scrub above eases toward the scroll position, which can
              // lag behind on a fast/flung scroll. Snap hard to the first or
              // last frame right as the pin engages/releases so the section
              // never hands off to the next one mid-video.
              onEnter: () => {
                video.currentTime = 0;
              },
              onLeave: () => {
                video.currentTime = video.duration || 0;
              },
              onEnterBack: () => {
                video.currentTime = video.duration || 0;
              },
              onLeaveBack: () => {
                video.currentTime = 0;
              },
            });
            scrollTriggerRef.current = st;
            return () => {
              if (scrollTriggerRef.current === st) scrollTriggerRef.current = null;
            };
          },
          "(max-width: 1023.98px)": () => {
            const st = ScrollTrigger.create({
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
              onUpdate: updateProgress,
            });
            scrollTriggerRef.current = st;
            return () => {
              if (scrollTriggerRef.current === st) scrollTriggerRef.current = null;
            };
          },
        });
      }, section);
    };

    if (video.readyState >= 1 && video.duration) {
      startScrub();
    } else {
      video.addEventListener("loadedmetadata", startScrub, { once: true });
    }

    return () => {
      cancelled = true;
      video.removeEventListener("loadedmetadata", startScrub);
      ctx?.revert();
    };
  }, []);

  // Smooth-scrolls to wherever stage `index` lives in the pinned scroll
  // runway, so the actual scroll position stays in sync with activeStage —
  // otherwise the next scroll tick would just recompute activeStage from the
  // real (unchanged) scroll position and undo the jump.
  const scrollToStage = (index: number) => {
    const st = scrollTriggerRef.current;
    if (!st) return false;

    const progress = (index + 0.5) / stages.length;
    gsap.to(window, {
      scrollTo: st.start + (st.end - st.start) * progress,
      duration: 1,
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
    setActiveStage(0);

    const video = videoRef.current;
    if (video) {
      // Swap the video file (Daylight vs Nightfall) and reset to the start,
      // matching the "Vision" stage the rail is about to jump back to.
      const onLoaded = () => {
        video.currentTime = 0;
        video.pause();
      };
      video.addEventListener("loadedmetadata", onLoaded, { once: true });
      video.src = experienceViews[index].src;
      video.load();
    }

    if (!scrollToStage(0)) setActiveStage(0);
  };

  return (
    <section ref={sectionRef} className="relative bg-[#0F0F0F] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="max-w-2xl">
          <h2 className="font-opensans text-[36px] leading-[1.1] font-bold text-white sm:text-[48px] lg:text-heading">
            Watch Your <span className="font-serif font-bold italic text-emerald-600">Dream</span>
            <br />
            Taking Shape
          </h2>
          <p className="mt-6 text-lg text-white/70">Distinctive hospitality destinations that combine</p>
        </div>

        <div ref={gridRef} className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[auto_1fr_auto] lg:items-center">
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
                      className={`flex h-[36px] w-full items-center gap-[10px] rounded-lg border px-[12px] py-[6px] text-left text-sm backdrop-blur-md transition-colors lg:h-auto lg:gap-3 lg:rounded-xl lg:px-3 lg:py-2.5 ${active
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
                      onClick={() => switchView(i)}
                      className={`flex h-[36px] w-full items-center gap-[10px] rounded-lg border px-[12px] py-[6px] text-left text-sm backdrop-blur-md transition-colors lg:h-auto lg:gap-3 lg:rounded-xl lg:px-3 lg:py-2.5 ${active
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
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-3xl bg-[#0F0F0F]">
              <video
                ref={videoRef}
                // Only the initial src — Daylight/Nightfall switches after
                // this happen imperatively in switchView(), not via React
                // state, so a src swap doesn't fight with a re-render.
                src={experienceViews[0].src}
                className="absolute inset-0 h-full w-full object-cover"
                muted
                playsInline
                preload="auto"
                aria-hidden="true"
              />
            </div>


          </div>

          {/* Progress rail — stretches to match the row height set by the
              cards/video, instead of a hand-tuned pixel offset. */}
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
