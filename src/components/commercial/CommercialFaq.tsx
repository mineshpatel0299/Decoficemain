"use client";

import { useState } from "react";
import SectionBadge from "./SectionBadge";

const faqs = [
  {
    q: "How long does an office or retail fit-out take?",
    a: "Interior fit-outs are handed over in 15 to 90 days, depending on the size and scale of the project.",
  },
  {
    q: "What happens after I submit the enquiry?",
    a: "Our team contacts you to understand your requirement: your site, headcount, timelines and budget. We then present the design direction and a detailed quotation for you to decide on.",
  },
  {
    q: "What do you need from me to get started?",
    a: "The floor plan of your space (CAD or PDF, with carpet area marked), your headcount and mix of workstations, cabins and meeting rooms, your budget band, the date you need the space, the building's fit-out guidelines and your brand assets.",
  },
  {
    q: "How soon will I receive a proposal?",
    a: "Send us a plan and a budget band, and you will have a costed proposal to decide on in two to three days.",
  },
  {
    q: "How much does a fit-out cost?",
    a: "Our packages range from ₹1,600 to ₹4,000+ per carpet sq ft, depending on the specification. Submit the enquiry form and our team will share the inclusions and a detailed quotation for your space.",
  },
  {
    q: "Can we mix packages?",
    a: "Yes. A common approach is a higher package for client-facing areas and a lower one for back-of-house. We price it as one BOQ either way.",
  },
  {
    q: "How are payments structured?",
    a: "You pay in phases aligned to project milestones. Price lock protection applies to agreed pricing.",
  },
  {
    q: "Are rates based on carpet area or built-up area?",
    a: "Package rates are per carpet sq ft, which is the usable area inside the walls.",
  },
  {
    q: "What if the scope changes during the project?",
    a: "Any change after scope freeze is written up with its own cost and effect on the timeline, and is built only after you approve it.",
  },
];

export default function CommercialFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-[#0f0f0f] px-6 py-[90px] lg:px-[156px]">
      <div className="flex flex-col items-center text-center">
        <SectionBadge>Questions before you sign</SectionBadge>
        <h2 className="mt-8 font-opensans text-4xl font-bold leading-[1.125] text-[#eaeaea] sm:text-5xl lg:text-(length:--text-heading) lg:leading-[72px]">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="mx-auto mt-8 flex max-w-[1128px] flex-col gap-2.5">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className="rounded-lg border-[0.5px] border-[#5e5e5e] bg-[#181818] px-5 sm:px-[30px]">
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-start justify-between gap-4 py-[17.5px] text-left font-archivo text-base font-semibold leading-[26px] text-[#eaeaea]"
                >
                  {f.q}
                  <span aria-hidden="true" className="font-plexmono text-[19.2px] font-medium leading-[19.2px] text-emerald-600">
                    {isOpen ? "–" : "+"}
                  </span>
                </button>
              </h3>
              {isOpen && (
                <p id={`faq-panel-${i}`} className="max-w-[623px] pb-[17.8px] font-archivo text-base leading-[25.6px] text-[#9e9e9e]">
                  {f.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
