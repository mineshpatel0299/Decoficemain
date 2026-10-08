import Image from "next/image";
import SectionHeading, { Accent } from "./SectionHeading";

const services = [
  { n: "01", title: "Interiors & 3D", body: "Space planning, interior design and 3D visualisations before anything is built." },
  { n: "02", title: "MEP, HVAC & structure", body: "Mechanical, electrical, plumbing, HVAC and structural consultancy coordinated with the design." },
  { n: "03", title: "Fit-out & civil work", body: "Interior execution and civil work with site supervision throughout." },
  { n: "04", title: "Vastu consultation", body: "Vastu guidance built into layouts from the first drawing." },
];

export default function OneTeam() {
  return (
    <section className="bg-[#0f0f0f] px-6 pt-12 lg:px-24 lg:pt-[90px]">
      <SectionHeading
        badge="One team, full scope"
        titleClassName="max-w-[1024px]"
        subtitleClassName="max-w-[1000px]"
        title={
          <>
            <Accent>
              No <span className="font-opensans">J</span>uggling
            </Accent>{" "}
            Designers, Contractors &amp; Consultants
          </>
        }
        subtitle="We believe great projects are built by great teams that value integrity, innovation, and continuous learning."
      />

      <div className="mx-auto mt-8 max-w-[1248px] sm:hidden">
        <div role="list" className="relative flex flex-col">
          <span aria-hidden="true" className="absolute bottom-6 left-[21px] top-6 w-px bg-gradient-to-b from-emerald-600/80 via-emerald-600/30 to-transparent" />
          {services.map((s) => (
            <div key={s.n} role="listitem" className="relative flex gap-4 pb-6 last:pb-0">
              <span className="z-10 flex size-11 shrink-0 items-center justify-center rounded-full border border-emerald-600/30 bg-[#171a18] font-manrope text-lg font-bold text-emerald-500 shadow-[0_0_20px_rgba(37,151,91,0.12)]">
                {s.n}
              </span>
              <div className="min-w-0 flex-1 border-b border-white/10 pb-5">
                <h3 className="font-opensans text-lg font-semibold leading-tight text-[#eaeaea]">{s.title}</h3>
                <p className="mt-1.5 font-opensans text-sm leading-[21px] text-white/60">{s.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative mt-2 aspect-[4/3] overflow-hidden rounded-[24px] border border-white/10 bg-[#181818] shadow-[0_18px_48px_rgba(0,0,0,0.35)]">
          <Image
            src="/commercial/one-team.png"
            alt="Designer and contractor reviewing plans together"
            width={514}
            height={642}
            sizes="100vw"
            className="absolute inset-0 h-full w-full object-cover object-[center_35%]"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
        </div>
      </div>

      <div className="mx-auto mt-8 hidden max-w-[1248px] sm:max-[1023px]:block">
        <div className="relative aspect-[2.15/1] overflow-hidden rounded-3xl border border-white/10 bg-[#181818] shadow-[0_24px_60px_rgba(0,0,0,0.35)] sm:max-[767px]:aspect-[2.4/1]">
          <Image
            src="/commercial/one-team.png"
            alt="Designer and contractor reviewing plans together"
            width={514}
            height={642}
            sizes="(max-width: 1023px) 100vw, 1px"
            className="absolute inset-0 h-full w-full object-cover object-[center_40%]"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
          <span className="absolute bottom-5 left-5 rounded-full border border-white/20 bg-black/35 px-4 py-2 font-mono text-[10px] tracking-[0.18em] text-white/85 uppercase backdrop-blur-md">
            Design · Build · Deliver
          </span>
        </div>
        <ul className="mt-5 grid grid-cols-2 gap-4 sm:max-[767px]:mt-4 sm:max-[767px]:gap-3">
          {services.map((s) => (
            <li key={s.n} className="min-h-[150px] rounded-2xl border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.015))] p-5 shadow-[0_16px_36px_rgba(0,0,0,0.16)] sm:max-[767px]:min-h-[138px] sm:max-[767px]:rounded-xl sm:max-[767px]:p-4">
              <div className="flex items-start gap-3.5 sm:max-[767px]:gap-3">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/[0.08] font-manrope text-lg font-bold text-emerald-400 sm:max-[767px]:size-9 sm:max-[767px]:rounded-lg sm:max-[767px]:text-base">
                {s.n}
                </span>
                <div>
                  <h3 className="font-opensans text-lg font-semibold leading-snug text-[#eaeaea] sm:max-[767px]:text-base">{s.title}</h3>
                  <p className="mt-2 font-opensans text-sm leading-[1.55] text-white/60 sm:max-[767px]:mt-1.5 sm:max-[767px]:text-[13px]">{s.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto mt-[33px] hidden max-w-[1248px] items-start gap-6 sm:grid sm:max-[1023px]:hidden lg:gap-12 lg:max-[1439px]:grid-cols-2 lg:max-[1439px]:gap-x-20 min-[1440px]:grid-cols-[494px_1fr] min-[1440px]:gap-x-[140px]">
        <div className="relative order-2 aspect-[4/3] w-full max-w-[494px] overflow-hidden rounded-2xl lg:order-1 lg:aspect-square">
          <Image
            src="/commercial/one-team.png"
            alt="Designer and contractor reviewing plans together"
            width={514}
            height={642}
            sizes="514px"
            className="absolute inset-0 h-full w-full object-cover object-[center_35%] min-[1440px]:inset-auto min-[1440px]:-left-[9px] min-[1440px]:-top-[60px] min-[1440px]:h-[642px] min-[1440px]:w-[514px] min-[1440px]:max-w-none"
          />
        </div>
        <ul className="order-1 grid gap-x-6 gap-y-6 sm:max-[1439px]:grid-cols-2 lg:order-2 lg:translate-x-8 lg:gap-x-12 lg:gap-y-12 min-[1440px]:grid-cols-[221px_221px] min-[1440px]:gap-x-[101px] min-[1440px]:gap-y-[75px] min-[1440px]:pt-[47px]">
          {services.map((s) => (
            <li key={s.n} className="flex max-w-[221px] flex-col gap-3 font-opensans leading-[normal] text-[#eaeaea]">
              <span className="flex size-11 items-center justify-center rounded-full bg-[#1f1f1f] font-manrope text-2xl font-bold leading-[30px] text-emerald-600">
                {s.n}
              </span>
              <h3 className="text-xl font-semibold leading-[normal]">{s.title}</h3>
              <p className="text-base leading-[normal]">{s.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
