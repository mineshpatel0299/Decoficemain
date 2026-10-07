"use client";

import Image from "next/image";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const stats = [
  { label: "YEARS OF EXPERIENCE", value: "10+" },
  { label: "HAPPY CLIENTS", value: "8+" },
  { label: "ACTIVE LOCATIONS", value: "5+" },
  { label: "CERTIFIED ARCHITECTS", value: "25+" },
];

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        contentRef.current,
        { y: "45vh" },
        { y: "22vh", ease: "none", duration: 0.9 }
      ).to(contentRef.current, { y: "22vh", ease: "none", duration: 0.1 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=120%",
        pin: true,
        pinSpacing: true,
        animation: tl,
        scrub: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen min-h-[700px] w-full overflow-hidden bg-black">
      <Image
        src="/stats/aurora.png"
        alt="Aurora over the mountains"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div ref={contentRef} className="absolute inset-0 z-10">
        <div className="absolute inset-x-0 top-[10%] mx-auto max-w-5xl px-6 text-center lg:top-[12%] lg:px-12">
          <h2 className="font-opensans text-[24px] leading-tight font-bold text-white sm:text-[44px] lg:text-heading">
            Beyond The <span className="font-serif font-bold text-emerald-600 italic">Blueprint</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[12px] text-white/70 sm:text-base">
            Measured by the spaces we&apos;ve shaped, the partnerships we&apos;ve built, and the trust we&apos;ve
            earned.
          </p>

          <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-x-6 gap-y-10 sm:mt-16 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-opensans whitespace-nowrap text-[12px] font-semibold leading-none tracking-normal text-white/70 uppercase sm:text-[13px] sm:tracking-[0.15em]">
                  {stat.label}
                </p>
                <p className="font-serif mt-0 leading-none text-[36px] font-bold text-white sm:text-[44px] lg:text-[56px]">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hills overlay — anchored to the bottom so it aligns with the hill silhouette in the aurora bg */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[45%]">
        <Image
          src="/stats/hills.png"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover object-top"
        />
      </div>
    </section>
  );
}
