"use client";

import Image from "next/image";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const stats = [
  { label: "YEARS OF EXPERIENCE", value: "10+" },
  { label: "HAPPY CLIENTS", value: "50+" },
  { label: "ACTIVE LOCATIONS", value: "15+" },
  { label: "CERTIFIED ARCHITECTS", value: "25+" },
];

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=100%", // Pin for 100% of viewport height
        pin: true,
        animation: gsap.to(contentRef.current, {
          yPercent: -100, // Slide the text content up
          ease: "none",
        }),
        scrub: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[1150px] max-h-screen min-h-[860px] w-full overflow-hidden bg-black">
      <Image src="/stats/aurora.png" alt="Aurora over the mountains" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 z-1 bg-linear-to-b from-[#0F0F0F] from-25% via-transparent via-45% to-[#0F0F0F] to-95%" />

      <div ref={contentRef} className="absolute inset-0 z-10">
        <div className="absolute inset-x-0 top-[18%] mx-auto max-w-5xl px-6 text-center">
          <h2 className="font-opensans text-[24px] leading-tight font-bold text-white sm:text-[44px] lg:text-[56px]">
            Beyond The <span className="font-serif font-bold text-emerald-600 italic">Blueprint</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[12px] text-white/70 sm:text-base">
            Measured by the spaces we&apos;ve shaped, the partnerships we&apos;ve built, and the trust we&apos;ve
            earned.
          </p>

          <div className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
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

        <div className="absolute inset-x-0 top-[70%] mx-auto max-w-3xl px-6 text-center lg:top-[72%]">
          <h3 className="font-opensans text-[24px] leading-tight font-bold text-white sm:text-[42px] lg:text-[50px]">
            The <span className="font-serif font-bold text-emerald-600 italic">Company</span> We Keep
          </h3>
          <p className="mx-auto mt-5 max-w-xl text-[12px] text-white/70 sm:text-base">
            A reflection of the relationships we&apos;ve built and the trust our partners place in us.
          </p>
        </div>
      </div>

      <Image
        src="/stats/hills.png"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="pointer-events-none absolute inset-0 z-20 object-cover"
      />
    </section>
  );
}
