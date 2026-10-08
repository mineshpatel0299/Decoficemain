"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const processStages = [
  "Architectural Concept",
  "Design Development",
  "Construction & Interiors",
  "Luxury Destination",
];

const experienceViews = {
  daylight: "/day-scrub.mp4",
  nightfall: "/ggg-scrub.mp4",
};

const experiencePosters = {
  daylight: "/day-scrub-poster.jpg",
  nightfall: "/night-scrub-poster.jpg",
};

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
      <path d="M20.5 14.2A8.8 8.8 0 0 1 9.8 3.5a8.9 8.9 0 1 0 10.7 10.7Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function VisionShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [activeStage, setActiveStage] = useState(0);
  const [nightMode, setNightMode] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const syncProgress = (progress: number) => {
      progressRef.current = progress;
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${progress * 100}%`;
      }

      const nextStage = Math.min(processStages.length - 1, Math.floor(progress * processStages.length));
      setActiveStage((current) => (current === nextStage ? current : nextStage));

      if (Number.isFinite(video.duration) && video.duration > 0) {
        const nextTime = progress * Math.max(0, video.duration - 0.05);
        if (Math.abs(video.currentTime - nextTime) > 0.04) {
          video.currentTime = nextTime;
        }
      }
    };

    const onMetadataLoaded = () => syncProgress(progressRef.current);
    const onFirstFrameReady = () => {
      video.pause();
      syncProgress(progressRef.current);
    };
    video.addEventListener("loadedmetadata", onMetadataLoaded);
    video.addEventListener("loadeddata", onFirstFrameReady, { once: true });

    const context = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        invalidateOnRefresh: true,
        onUpdate: (self) => syncProgress(self.progress),
      });
    }, section);

    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
      onMetadataLoaded();
    }

    return () => {
      video.removeEventListener("loadedmetadata", onMetadataLoaded);
      video.removeEventListener("loadeddata", onFirstFrameReady);
      context.revert();
    };
  }, []);

  const goToStage = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;

    const scrollDistance = Math.max(0, section.offsetHeight - window.innerHeight);
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const progress = (index + 0.5) / processStages.length;
    window.scrollTo({
      top: sectionTop + scrollDistance * progress,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };

  const switchLighting = (showNight: boolean) => {
    if (showNight === nightMode) return;
    setNightMode(showNight);

    const video = videoRef.current;
    if (!video) return;

    const onFirstFrameReady = () => {
      if (video.duration) {
        video.currentTime = progressRef.current * Math.max(0, video.duration - 0.05);
      }
      video.pause();
    };

    video.pause();
    video.addEventListener("loadeddata", onFirstFrameReady, { once: true });
    video.src = showNight ? experienceViews.nightfall : experienceViews.daylight;
    video.load();
  };

  return (
    <section
      ref={sectionRef}
      className="relative -mt-32 h-[400vh] bg-black max-[900px]:mt-0 max-[900px]:h-[320svh]"
      aria-label="Our resort development process"
    >
      <div className="sticky top-0 flex h-screen min-h-[640px] w-full p-0 max-[900px]:h-[100svh] max-[900px]:min-h-0">
        <div className="relative isolate flex-1 overflow-hidden bg-black">
          <video
            ref={videoRef}
            src={experienceViews.daylight}
            poster={nightMode ? experiencePosters.nightfall : experiencePosters.daylight}
            muted
            playsInline
            autoPlay
            preload="auto"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover max-[900px]:object-contain"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{
              background:
                "linear-gradient(180deg,rgba(0,0,0,.54) 0%,rgba(0,0,0,0) 30%,rgba(0,0,0,0) 56%,rgba(0,0,0,.74) 80%,rgba(0,0,0,.92) 100%),radial-gradient(120% 80% at 50% 50%,transparent 55%,rgba(0,0,0,.5))",
            }}
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[1] opacity-[0.07] [mask-image:linear-gradient(to_bottom,black,transparent_40%)]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />

          <div className="absolute top-11 left-12 z-10 max-w-[600px] isolate max-[900px]:top-6 max-[900px]:left-5 max-[900px]:right-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/45 px-4 py-2 text-[11px] font-semibold tracking-[0.2em] text-white uppercase backdrop-blur-md max-[900px]:px-3 max-[900px]:py-1.5 max-[900px]:text-[10px]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(37,151,91,.25)]" />
              Process Stages
            </span>
            <h2 className="mt-5 font-opensans text-[clamp(2.15rem,4.4vw,4rem)] leading-[1.08] font-bold text-white [text-shadow:0_2px_18px_rgba(0,0,0,.55)] max-[900px]:mt-4 max-[900px]:max-w-[calc(100%-72px)] max-[900px]:text-[clamp(1.9rem,7vw,2.5rem)]">
              Watch Your <span className="font-serif font-bold text-emerald-500 italic">Dream</span>
              <br />
              Taking Shape
            </h2>
            <p className="mt-3 max-w-[560px] text-[17px] leading-[1.6] text-white/90 [text-shadow:0_1px_10px_rgba(0,0,0,.7)] max-[900px]:hidden">
              Distinctive hospitality destinations that combine personalized experiences with unique architectural character.
            </p>
          </div>

          <div
            className="absolute top-11 right-12 z-10 flex rounded-full border border-white/15 bg-black/45 p-[5px] backdrop-blur-md max-[900px]:top-6 max-[900px]:right-5"
            role="group"
            aria-label="Choose lighting"
          >
            <span
              aria-hidden="true"
              className={`absolute top-[5px] left-[5px] h-[calc(100%-10px)] w-[132px] rounded-full transition-[transform,background-color] duration-500 max-[900px]:w-11 ${
                nightMode
                  ? "translate-x-[132px] bg-[#dfe6ff] max-[900px]:translate-x-11"
                  : "translate-x-0 bg-white"
              }`}
            />
            <button
              type="button"
              aria-pressed={!nightMode}
              onClick={() => switchLighting(false)}
              className={`relative z-[1] flex w-[132px] items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold transition-colors max-[900px]:h-11 max-[900px]:w-11 max-[900px]:p-0 ${
                nightMode ? "text-white/90" : "text-black"
              }`}
            >
              <SunIcon />
              <span className="max-[900px]:sr-only">Daylight</span>
            </button>
            <button
              type="button"
              aria-pressed={nightMode}
              onClick={() => switchLighting(true)}
              className={`relative z-[1] flex w-[132px] items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold transition-colors max-[900px]:h-11 max-[900px]:w-11 max-[900px]:p-0 ${
                nightMode ? "text-black" : "text-white/90"
              }`}
            >
              <MoonIcon />
              <span className="max-[900px]:sr-only">Nightfall</span>
            </button>
          </div>

          <div className="absolute bottom-[150px] left-12 z-10 max-[900px]:bottom-[170px] max-[900px]:left-5">
            <span className="text-[13px] tracking-[0.2em] text-white/85 [text-shadow:0_1px_8px_rgba(0,0,0,.8)]">
              <b className="text-emerald-400">{String(activeStage + 1).padStart(2, "0")}</b> / 04
            </span>
            <h3 className="mt-1.5 font-serif text-[clamp(1.9rem,3.6vw,3.25rem)] leading-tight font-bold text-white italic [text-shadow:0_2px_20px_rgba(0,0,0,.75)] max-[900px]:text-[clamp(1.75rem,6vw,2.5rem)]">
              {processStages[activeStage]}
            </h3>
          </div>

          <div className="absolute right-12 bottom-[150px] z-10 flex items-center gap-2.5 text-[11px] tracking-[0.14em] text-white/80 uppercase [text-shadow:0_1px_8px_rgba(0,0,0,.8)] max-[900px]:hidden">
            Scroll to follow the journey
            <span aria-hidden="true" className="h-7 w-px origin-top animate-pulse bg-gradient-to-b from-white/70 to-transparent" />
          </div>

          <div className="absolute right-12 bottom-10 left-12 z-10 max-[900px]:right-5 max-[900px]:bottom-6 max-[900px]:left-5">
            <div className="h-0.5 overflow-hidden rounded-full bg-white/30">
              <div
                ref={progressBarRef}
                className="h-full w-0 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300 shadow-[0_0_12px_rgba(37,151,91,.8)]"
              />
            </div>
            <ol className="mt-[-7px] grid grid-cols-4">
              {processStages.map((stage, index) => {
                const isComplete = index < activeStage;
                const isActive = index === activeStage;

                return (
                  <li key={stage}>
                    <button
                      type="button"
                      aria-current={isActive ? "step" : undefined}
                      aria-label={`Go to stage ${String(index + 1).padStart(2, "0")}: ${stage}`}
                      onClick={() => goToStage(index)}
                      className={`relative flex w-full flex-col items-start gap-1.5 px-3 pt-[22px] pr-2 text-left text-[15px] leading-tight font-semibold transition-colors max-[900px]:px-1.5 max-[900px]:pt-5 max-[900px]:text-[11px] ${
                        isActive ? "text-white" : "text-white/75 hover:text-white"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`absolute top-0 left-0 h-3 w-3 rounded-full border-2 transition-colors ${
                          isActive
                            ? "border-white bg-emerald-500 shadow-[0_0_0_6px_rgba(37,151,91,.3)]"
                            : isComplete
                              ? "border-emerald-500 bg-emerald-500"
                              : "border-white/45 bg-black"
                        }`}
                      />
                      <span className={`text-[11px] tracking-[0.18em] max-[900px]:text-[9px] ${isActive ? "text-emerald-400" : "text-white/65"}`}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {stage}
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
