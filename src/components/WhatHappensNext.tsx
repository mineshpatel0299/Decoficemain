import Image from "next/image";

// Placeholder photos — swap each `image` for the real project photo once
// it's dropped into /public.
const steps = [
  { title: "Walking The Land With New Perspective", image: "/temp/3.png" },
  { title: "Discovering The Potential Beneath The Surface", image: "/temp/5.png" },
  { title: "The First Glimpse Of What's Possible", image: "/3d/Vision.png" },
];

export default function WhatHappensNext() {
  return (
    <section className="relative bg-[#0F0F0F] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="text-center">
          <h2 className="font-opensans text-[32px] leading-tight font-bold text-white sm:text-[44px] lg:text-[52px]">
            Here&apos;s What Happens <span className="font-serif font-bold text-emerald-500 italic">Next</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-white/70">
            From site visits and planning to concepts and execution, here&apos;s what your journey with Decofice
            could look like.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
          <div className="flex flex-col overflow-hidden rounded-lg border border-white/10 bg-white/3 backdrop-blur-md">
            <div className="relative aspect-4/5 lg:aspect-auto lg:flex-1">
              <Image src="/temp/6.png" alt="" fill sizes="320px" className="object-cover" />
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
              <div key={step.title} className="relative aspect-4/5 overflow-hidden rounded-lg border border-white/10 sm:aspect-square">
                <Image src={step.image} alt={step.title} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
                <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 border-t border-white/15 bg-white/10 p-4 backdrop-blur-md">
                  <span className="h-2 w-2 shrink-0 rounded-full border border-white/80" />
                  <p className="text-sm font-bold text-white">{step.title}</p>
                </div>
              </div>
            ))}

            <div className="relative col-span-full aspect-16/7 overflow-hidden rounded-lg border border-white/10">
              <Image src="/temp/4.png" alt="Turning vision into something real" fill sizes="100vw" className="object-cover" />
              <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 border-t border-white/15 bg-white/10 p-5 backdrop-blur-md">
                <span className="h-2 w-2 shrink-0 rounded-full border border-white/80" />
                <p className="text-base font-bold text-white">Turning Vision Into Something Real</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
