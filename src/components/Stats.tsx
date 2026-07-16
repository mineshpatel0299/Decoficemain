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
      // Slide the text content up over the first stretch of the pin, then hold
      // (nothing animates) for the remainder so the section ends on the hills
      // alone — sticky at the bottom the whole time — before releasing the pin
      // and letting the section scroll away with just the hills visible.
      const tl = gsap.timeline();
      tl.to(contentRef.current, { yPercent: -100, ease: "none", duration: 1 }).to({}, { duration: 0.6 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=160%", // Pin for the slide plus the hold at the end
        pin: true,
        // <main> is a flex container, which makes GSAP disable pin spacing by
        // default (it assumes flex layouts don't want the extra reserved
        // space) — force it back on so the next section can't ride up over
        // the still-pinned hills.
        pinSpacing: true,
        animation: tl,
        scrub: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[1150px] max-h-screen min-h-[860px] w-full overflow-hidden bg-black">
      <Image src="/stats/aurora.png" alt="Aurora over the mountains" fill priority sizes="100vw" className="object-cover" />

      <div ref={contentRef} className="absolute inset-0 z-10">
        <div className="absolute inset-x-0 top-[18%] mx-auto max-w-5xl px-6 text-center lg:px-12">
          <h2 className="font-opensans text-[24px] leading-tight font-bold text-white sm:text-[44px] lg:text-heading">
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

        <div className="absolute inset-x-0 top-[70%] mx-auto max-w-3xl px-6 text-center lg:top-[72%] lg:px-12">
          <h3 className="font-opensans text-[24px] leading-tight font-bold text-white sm:text-[42px] lg:text-heading">
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
        className="pointer-events-none absolute inset-0 z-20 translate-y-[8%] object-cover"
      />
    </section>
  );
}
