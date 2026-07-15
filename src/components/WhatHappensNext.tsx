import Image from "next/image";

// Placeholder photos — swap each `image` for the real project photo once
// it's dropped into /public.
const steps = [
  { title: "Walking The Land With New Perspective", image: "/temp/3.png" },
  { title: "Discovering The Potential Beneath The Surface", image: "/temp/5.png" },
  { title: "The First Glimpse Of What's Possible", image: "/3d/Vision.png" },
];

const GlowingDot = () => (
  <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 -ml-2">
    <g filter="url(#filter0_f_1309_360)">
      <circle cx="14.5" cy="14.5" r="9.5" stroke="#EAEAEA"/>
    </g>
    <circle cx="14.4987" cy="14.4997" r="6.66667" fill="#EAEAEA"/>
    <defs>
      <filter id="filter0_f_1309_360" x="0" y="0" width="29" height="29" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feGaussianBlur stdDeviation="2.25" result="effect1_foregroundBlur_1309_360"/>
      </filter>
    </defs>
  </svg>
);

export default function WhatHappensNext() {
  return (
    <section className="relative bg-[#0F0F0F] py-16 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="text-center">
          <h2 className="font-opensans text-[28px] leading-tight font-bold text-white sm:text-[44px] lg:text-[52px]">
            Here&apos;s What Happens <span className="font-serif font-bold text-emerald-600 italic">Next</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[14px] leading-relaxed text-white/70 lg:mt-5 lg:text-base">
            From site visits and planning to concepts and execution, here&apos;s what your journey with Decofice
            could look like.
          </p>
        </div>

        {/* MOBILE LAYOUT (hidden on lg) */}
        <div className="mt-8 flex flex-col gap-3 lg:hidden">
          {/* Card 1 */}
          <div className="relative mx-auto h-[188px] w-full max-w-[338px] overflow-hidden rounded-[8px] border border-black/20">
            <Image src="/temp/6.png" alt="It All Starts With A Conversation" fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-x-0 bottom-0 border-t border-black/20 bg-black/20 p-3 backdrop-blur-md">
              <p className="text-[10px] font-bold text-white">It All Starts With A Conversation</p>
            </div>
          </div>

          {/* 3 Steps */}
          <div className="mx-auto grid w-full max-w-[338px] grid-cols-3 gap-2">
            {steps.map((step) => (
              <div key={step.title} className="relative h-[99px] w-full overflow-hidden rounded-[8px] border border-black/20">
                <Image src={step.image} alt={step.title} fill sizes="33vw" className="object-cover" />
                <div className="absolute inset-x-0 bottom-0 border-t border-black/20 bg-black/20 px-1.5 py-1.5 backdrop-blur-md">
                  <p className="text-[7px] tracking-tight font-bold leading-[1.2] text-white">{step.title}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Card 3 */}
          <div className="relative mx-auto h-[188px] w-full max-w-[338px] overflow-hidden rounded-[8px] border border-black/20">
            <Image src="/temp/4.png" alt="Turning vision into something real" fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-x-0 bottom-0 border-t border-black/20 bg-black/20 p-3 backdrop-blur-md">
              <p className="text-[10px] font-bold text-white">Turning Vision Into Something Real</p>
            </div>
          </div>

          {/* Mobile Button */}
          <div className="mx-auto w-full max-w-[338px]">
            <a
              href="#schedule-a-meet"
              className="mt-3 flex h-12 w-full items-center justify-center rounded-[8px] bg-emerald-600 text-[15px] font-medium text-white transition-colors hover:bg-emerald-600/90"
            >
              Schedule A Meet
            </a>
          </div>
        </div>

        {/* DESKTOP LAYOUT (hidden on mobile) */}
        <div className="mt-14 hidden grid-cols-[294px_1fr] gap-6 lg:grid">
          <div className="flex h-[558px] w-full max-w-[294px] flex-col overflow-hidden rounded-lg border border-black/20 bg-black/20 backdrop-blur-md">
            <div className="relative flex-1">
              <Image src="/temp/6.png" alt="" fill sizes="294px" className="object-cover" />
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-white">It All Starts With A Conversation</h3>
              <a
                href="#schedule-a-meet"
                className="font-opensans mt-4 inline-flex h-11 w-full items-center justify-center rounded-lg bg-emerald-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-emerald-500"
              >
                Schedule A Meet
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.title}
                className="relative h-[253px] w-full overflow-hidden rounded-lg border border-black/20"
              >
                <Image src={step.image} alt={step.title} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
                <div className="absolute inset-x-0 bottom-0 flex items-center gap-4 border-t border-black/20 bg-black/20 p-4 backdrop-blur-md">
                  <GlowingDot />
                  <p className="text-sm font-bold text-white">{step.title}</p>
                </div>
              </div>
            ))}

            <div className="relative col-span-full h-[281px] w-full overflow-hidden rounded-lg border border-black/20">
              <Image src="/temp/4.png" alt="Turning vision into something real" fill sizes="100vw" className="object-cover" />
              <div className="absolute inset-x-0 bottom-0 flex items-center gap-5 border-t border-black/20 bg-black/20 p-5 backdrop-blur-md">
                <GlowingDot />
                <p className="text-base font-bold text-white">Turning Vision Into Something Real</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
