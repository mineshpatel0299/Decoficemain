"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type HeadingSegment = { text: string; italic?: boolean };

type Slide = {
  image: string;
  badge: string;
  heading: [HeadingSegment[], HeadingSegment[]];
  paragraph: string;
  cta: string;
};

const slides: Slide[] = [
  {
    image: "/temp/4.png",
    badge: "BOUTIQUE RESORTS",
    heading: [
      [{ text: "Small In Scale," }],
      [{ text: "Exceptional In " }, { text: "Experience", italic: true }],
    ],
    paragraph:
      "Distinctive hospitality destinations that combine personalized experiences with unique architectural character.",
    cta: "View Experience",
  },
  {
    image: "/temp/2.png",
    badge: "LUXURY RESORTS",
    heading: [
      [{ text: "Crafting Destinations" }],
      [{ text: "That Define " }, { text: "Luxury", italic: true }],
    ],
    paragraph:
      "Iconic architecture, premium experiences, and world-class amenities designed to create unforgettable stays.",
    cta: "View Experience",
  },
  {
    image: "/temp/3.png",
    badge: "ECO RESORTS",
    heading: [
      [{ text: "Where Nature Becomes" }],
      [{ text: "The " }, { text: "Experience", italic: true }],
    ],
    paragraph:
      "Sustainably designed retreats that blend seamlessly with the landscape while delivering modern comfort.",
    cta: "View Experience",
  },
  {
    image: "/temp/1.png",
    badge: "HILL RESORTS",
    heading: [
      [{ text: "Elevating " }, { text: "Hospitality", italic: true }],
      [{ text: "Above The Ordinary" }],
    ],
    paragraph:
      "Scenic retreats designed to embrace breathtaking views, challenging terrains, and memorable guest experiences.",
    cta: "View Experience",
  },
  {
    image: "/temp/6.png",
    badge: "WELLNESS RETREATS",
    heading: [
      [{ text: "Spaces " }, { text: "Designed", italic: true }, { text: " For" }],
      [{ text: "Mind, Body & Soul" }],
    ],
    paragraph:
      "Thoughtfully planned wellness environments focused on relaxation, rejuvenation, and holistic living.",
    cta: "View Experience",
  },
  {
    image: "/temp/5.png",
    badge: "VILLA RESORTS",
    heading: [
      [{ text: "Private", italic: true }, { text: " Luxury," }],
      [{ text: "Elevated Living" }],
    ],
    paragraph:
      "Exclusive villa communities offering privacy, comfort, and resort-style amenities in one seamless experience.",
    cta: "View Experience",
  },
];

export default function ExperienceScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const innerImageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const markerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const total = slides.length;

    const ctx = gsap.context(() => {
      const applyProgress = (progress: number) => {
        const raw = progress * (total - 1);

        // Images stay put — no vertical movement. Each incoming image is
        // revealed over the static one beneath it with a bottom-to-top
        // clip-path wipe, like a curtain rising up (scrolling back down
        // reverses it, so the wipe recedes from the top instead).
        gsap.set(imageRefs.current[0], { clipPath: "inset(0% 0% 0% 0%)" });
        for (let i = 1; i < total; i++) {
          const local = gsap.utils.clamp(0, 1, raw - (i - 1));
          gsap.set(imageRefs.current[i], { clipPath: `inset(${(1 - local) * 100}% 0% 0% 0%)` });
        }

        slides.forEach((_, i) => {
          const distance = Math.abs(raw - i);
          const opacity = gsap.utils.clamp(0, 1, 1 - distance * 2.2);
          gsap.set(textRefs.current[i], {
            autoAlpha: opacity,
            y: (1 - opacity) * 16,
          });

          // Parallax effect for the image
          const offset = raw - i;
          const clampedOffset = gsap.utils.clamp(-1, 1, offset);
          if (innerImageRefs.current[i]) {
            // As we scroll down (raw increases), offset increases, and the image
            // should travel upward. Coming into view (offset < 0) it starts at
            // yPercent: 10; fully in view (offset === 0) it's at yPercent: 0;
            // leaving view (offset > 0) it continues to yPercent: -10.
            gsap.set(innerImageRefs.current[i], {
              yPercent: clampedOffset * -10,
            });
          }
        });

        if (markerRef.current) {
          const markerWidth = 100 / total;
          const left = progress * (100 - markerWidth);
          gsap.set(markerRef.current, { left: `${left}%`, width: `${markerWidth}%` });
        }
      };

      gsap.set(
        textRefs.current.filter((_, i) => i > 0),
        { autoAlpha: 0 },
      );
      applyProgress(0);

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: pinRef.current,
        scrub: 0.4,
        onUpdate: (self) => applyProgress(self.progress),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${slides.length * 100}vh` }}
    >
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden bg-black">
        {slides.map((slide, i) => (
          <div
            key={slide.image + i}
            ref={(el) => {
              imageRefs.current[i] = el;
            }}
            className="absolute inset-0 overflow-hidden"
            style={{ zIndex: i + 1 }}
          >
            <div
              ref={(el) => {
                innerImageRefs.current[i] = el;
              }}
              className="absolute -top-[15%] -left-[5%] h-[130%] w-[110%]"
            >
              <Image
                src={slide.image}
                alt=""
                aria-hidden="true"
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black/35" />
          </div>
        ))}

        <div className="absolute inset-0 z-50 flex flex-col justify-end pb-28 sm:pb-32">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
            <div className="relative max-w-xl lg:max-w-5xl">
              {slides.map((slide, i) => (
                <div
                  key={slide.badge + i}
                  ref={(el) => {
                    textRefs.current[i] = el;
                  }}
                  className={i === 0 ? "relative" : "absolute inset-0"}
                >
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-emerald-700/60 px-4 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-white uppercase backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    {slide.badge}
                  </span>

                  <h2 className="font-opensans mt-5 text-[32px] leading-[1.15] font-bold text-white sm:text-[44px] lg:text-[64px] lg:leading-none">
                    {slide.heading.map((line, lineIdx) => (
                      <span key={lineIdx}>
                        {lineIdx > 0 && <br />}
                        {line.map((segment, segIdx) =>
                          segment.italic ? (
                            <span key={segIdx} className="font-serif font-bold italic">
                              {segment.text}
                            </span>
                          ) : (
                            <span key={segIdx}>{segment.text}</span>
                          ),
                        )}
                      </span>
                    ))}
                  </h2>

                  <p className="font-opensans mt-4 max-w-xl text-base leading-6 font-normal text-white/80 sm:text-lg sm:leading-7 lg:text-[20px] lg:leading-7.5">
                    {slide.paragraph}
                  </p>

                  <a
                    href="#view-experience"
                    className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-emerald-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-emerald-500"
                  >
                    {slide.cta}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-10 z-50 mx-auto max-w-7xl px-6 lg:px-12">
          <div className="relative h-px bg-white/25">
            <div ref={markerRef} className="absolute top-1/2 h-0.5 -translate-y-1/2 bg-white" style={{ width: `${100 / slides.length}%` }} />
          </div>
        </div>
      </div>
    </section>
  );
}
