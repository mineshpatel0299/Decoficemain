"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SectionHeading, { Accent } from "./SectionHeading";

type SpaceId = "office" | "retail";

const spaces: Record<
  SpaceId,
  { label: string; title: string; body: string; cta: string; points: string[]; bodyWidth: string; alt: string; image: string }
> = {
  office: {
    label: "01. Office",
    title: "Offices & corporate workplaces",
    body: "Workplaces planned around how your team works: seat counts, meeting load, cabins and growth, with services engineered in from the start.",
    cta: "Discuss Your Office",
    points: [
      "Space planning for headcount and growth",
      "Brand identity carried through reception and common areas",
      "Meeting rooms with acoustics, AV and HVAC zoning",
      "Power, data and lighting for every workstation",
      "Vastu-aligned layouts where you want them",
    ],
    bodyWidth: "max-w-[520px]",
    alt: "Corporate office interior",
    image: "/commercial/work/office.png",
  },
  retail: {
    label: "02. Retail",
    title: "Retail stores & showrooms",
    body: "Stores planned around customer flow and display, delivered quickly so your launch date holds.",
    cta: "Discuss Your Store",
    points: [
      "Customer flow and display planning",
      "Storefront and signage zones",
      "Lighting for merchandise",
      "Fit-out with site supervision",
      "Vastu-aligned layouts where you want them",
    ],
    bodyWidth: "max-w-[480px]",
    alt: "Retail store interior",
    image: "/commercial/work/retail.png",
  },
};

// Exact Figma crops (px, relative to the card) for each card's resting state at 1440px+. They fade in over a cover-fit base image, so the card is always fully covered mid-transition.
const exactCrop: Record<SpaceId, { resting: boolean; className: string }> = {
  office: { resting: true, className: "-left-2 -top-[152px] h-[840px] w-[840px]" },
  retail: { resting: false, className: "-left-[97px] -top-[145px] h-[756px] w-[567px]" },
};

function Check() {
  return (
    <span className="flex size-12 shrink-0 items-center justify-center">
      <span className="flex size-[18px] items-center justify-center rounded-[2px] bg-emerald-600">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="m2.5 6.2 2.3 2.3 4.7-4.9" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </span>
  );
}

const labelClass =
  "font-opensans text-[12.5px] font-semibold uppercase leading-[19.97px] tracking-[1.498px] text-[#eaeaea]";

function SpaceCard({
  id,
  active,
  onActivate,
  onEnquire,
}: {
  id: SpaceId;
  active: boolean;
  onActivate: () => void;
  onEnquire: () => void;
}) {
  const space = spaces[id];
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clearHover = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
  };
  useEffect(() => clearHover, []);

  const fade = "transition-opacity duration-300 ease-out motion-reduce:transition-none";

  return (
    <article
      role={active ? undefined : "button"}
      tabIndex={active ? undefined : 0}
      aria-label={active ? undefined : `Show ${space.title}`}
      onClick={active ? undefined : onActivate}
      onKeyDown={
        active
          ? undefined
          : (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onActivate();
              }
            }
      }
      onMouseEnter={
        active
          ? undefined
          : () => {
              clearHover();
              hoverTimer.current = setTimeout(onActivate, 150);
            }
      }
      onMouseLeave={clearHover}
      className={`relative isolate flex min-w-0 flex-col justify-end overflow-hidden rounded-2xl bg-[#181818] transition-[min-height] duration-700 ease-in-out motion-reduce:transition-none lg:h-[599px] ${
        active ? "min-h-[599px]" : "min-h-[420px] cursor-pointer"
      }`}
    >
      <Image
        src={space.image}
        alt={space.alt}
        width={840}
        height={840}
        sizes="840px"
        className="absolute inset-0 -z-20 h-full w-full max-w-none object-cover"
      />
      <Image
        src={space.image}
        alt=""
        aria-hidden="true"
        width={840}
        height={840}
        sizes="840px"
        className={`absolute -z-20 hidden max-w-none object-cover transition-opacity duration-500 ease-in-out motion-reduce:transition-none min-[1440px]:block ${
          exactCrop[id].className
        } ${active === exactCrop[id].resting ? "opacity-100" : "opacity-0"}`}
      />
      <div className="absolute inset-0 -z-10 bg-[#181818]/40" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,transparent_10.518%,black_130.55%)]" />

      {/* Both states share one grid cell so they cross-fade in place, bottom-aligned */}
      <div className="grid">
        {/* Expanded */}
        <div
          inert={!active}
          aria-hidden={!active}
          className={`col-start-1 row-start-1 flex flex-col gap-8 self-end px-6 py-5 sm:px-10 lg:w-[824px] ${fade} ${
            active ? "opacity-100 delay-300" : "pointer-events-none opacity-0"
          }`}
        >
          <div className="flex flex-col gap-5">
            <p className={labelClass}>{space.label}</p>
            <div className="flex flex-col gap-3">
              <h3 className="font-opensans text-[26px] font-bold leading-8 tracking-[-0.256px] text-[#eaeaea] sm:text-[32px] sm:leading-[27.65px]">
                {space.title}
              </h3>
              <p className={`${space.bodyWidth} font-opensans text-base leading-[22px] text-[#eaeaea]`}>{space.body}</p>
              <button
                type="button"
                onClick={onEnquire}
                className="inline-flex h-12 w-fit items-center justify-center gap-2.5 rounded-lg bg-emerald-600 px-7 font-opensans text-base font-semibold leading-6 text-[#eaeaea] transition-colors hover:bg-emerald-500"
              >
                {space.cta}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
          <ul className="flex flex-col">
            {space.points.map((point, i) => (
              <li
                key={point}
                className={`flex items-center font-opensans text-base leading-5 text-[#eaeaea] ${i < space.points.length - 1 ? "-mb-2" : ""}`}
              >
                <Check />
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Collapsed */}
        <div
          aria-hidden={active}
          className={`col-start-1 row-start-1 flex flex-col gap-5 self-end px-6 py-5 sm:px-10 lg:w-[400px] ${fade} ${
            active ? "pointer-events-none opacity-0" : "opacity-100 delay-300"
          }`}
        >
          <p className={labelClass}>{space.label}</p>
          <p className="max-w-[236px] font-opensans text-[32px] font-bold leading-9 tracking-[-0.256px] text-[#eaeaea] lg:max-w-[330px]">
            {space.title}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function WhatWeBuild({ onEnquire }: { onEnquire: () => void }) {
  const [active, setActive] = useState<SpaceId>("office");

  return (
    <section className="bg-[#0f0f0f] px-6 pt-[90px] lg:px-24">
      <SectionHeading
        badge="What we build"
        titleClassName="max-w-[632px]"
        title={
          <>
            <Accent>Two</Accent> kinds of space. Built to{" "}
            <Accent>work</Accent> hard.
          </>
        }
        subtitle="Every project tells a story- and every story begins with the people who create it together."
      />

      <div
        className="mx-auto mt-8 grid max-w-[1248px] gap-6 transition-[grid-template-columns] duration-700 ease-in-out motion-reduce:transition-none lg:[grid-template-columns:var(--cols)]"
        style={
          { "--cols": active === "office" ? "824fr 400fr" : "400fr 824fr" } as React.CSSProperties
        }
      >
        {(Object.keys(spaces) as SpaceId[]).map((id) => (
          <SpaceCard key={id} id={id} active={active === id} onActivate={() => setActive(id)} onEnquire={onEnquire} />
        ))}
      </div>
    </section>
  );
}
