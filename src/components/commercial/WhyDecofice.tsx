import Image from "next/image";
import SectionHeading, { Accent } from "./SectionHeading";

// Image placement (px) inside the 264px-tall image slot, taken from the Figma crops
type Img = { src: string; alt: string; w: number; h: number; left: number; top: number };
type Card = { title: string; body: string; image?: Img };

const columns: Card[][] = [
  [
    {
      title: "One warranty after handover",
      body: "Snags closed, systems tested and as-built drawings handed over, with defect cover after handover.",
      image: { src: "warranty", alt: "Handshake over site plans", w: 352, h: 352, left: 0, top: -39 },
    },
    { title: "Price lock protection", body: "Agreed pricing is protected once your project is locked in." },
  ],
  [
    { title: "Site surveillance", body: "Site monitoring systems so you can check work without travelling." },
    {
      title: "Dedicated support manager",
      body: "One named person who answers for your project end to end.",
      image: { src: "support", alt: "Support team on a call", w: 353.4, h: 530, left: -1.7, top: -154 },
    },
  ],
  [
    {
      title: "Budget monitoring",
      body: "Spend is tracked against budget throughout the project.",
      image: { src: "budget", alt: "Budget notebook, calculator and phone", w: 352, h: 628, left: 0, top: -158.5 },
    },
    { title: "Milestone payments", body: "Pay in phases tied to project milestones, not large lump sums upfront." },
  ],
];

export default function WhyDecofice() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0f0f0f] px-6 pb-[27px] pt-[111px] lg:px-24">
      {/* Green glow: radial falloff centred below the section, sampled from the design */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle 900px at 50% calc(111px + 1340px), rgba(37,151,91,0.6) 0, rgba(37,151,91,0.5) 240px, rgba(37,151,91,0.33) 405px, rgba(37,151,91,0.25) 504px, rgba(37,151,91,0.15) 600px, rgba(37,151,91,0.065) 690px, rgba(37,151,91,0.027) 800px, rgba(37,151,91,0) 900px)",
        }}
      />
      <SectionHeading
        badge="Why work at Decofice"
        titleClassName="max-w-[1046px]"
        title={
          <>
            You always know where your money and your site{" "}
            <Accent>stand</Accent>
          </>
        }
      />

      <div className="mx-auto mt-12 grid max-w-[1248px] gap-6 md:grid-cols-3 lg:mt-[76px] lg:-translate-x-px">
        {columns.map((col, i) => (
          <div key={i} className="flex flex-col gap-6">
            {col.map((card) => (
              <article
                key={card.title}
                className={`glass-card flex flex-col justify-end gap-4 rounded-3xl px-6 py-3.5 ${
                  card.image ? "min-h-[424px] lg:h-[424px]" : "min-h-[284px] lg:h-[284px]"
                }`}
              >
                {card.image && (
                  <div className="relative aspect-[352/264] w-full shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={`/commercial/why/${card.image.src}.png`}
                      alt={card.image.alt}
                      width={Math.round(card.image.w)}
                      height={Math.round(card.image.h)}
                      sizes="353px"
                      className="absolute max-w-none"
                      style={{ left: card.image.left, top: card.image.top, width: card.image.w, height: card.image.h }}
                    />
                  </div>
                )}
                <div
                  className={`flex flex-col justify-center gap-4 font-opensans leading-[normal] ${
                    card.image ? "" : "lg:h-[116px]"
                  }`}
                >
                  <h3 className="text-2xl font-bold leading-[normal] text-emerald-600 lg:whitespace-nowrap">
                    {card.title}
                  </h3>
                  <p className={`text-base leading-[normal] text-[#eaeaea] ${card.image ? "lg:h-[67px]" : ""}`}>
                    {card.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
