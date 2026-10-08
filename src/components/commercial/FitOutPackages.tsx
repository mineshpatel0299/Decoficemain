import SectionHeading, { Accent } from "./SectionHeading";

const packages = [
  { name: "Basic", enquiry: "Basic", tagline: "Cost-led fit-out", price: "₹1,600–₹1,800", color: "#2f6fd6", tint: "#adc2d7" },
  { name: "Enhanced", enquiry: "Enhanced", tagline: "Standard corporate", price: "₹1,900–₹2,200", color: "#e0662c", tint: "#d9bfad" },
  { name: "Professional", enquiry: "Professional", tagline: "Brand-visible office", price: "₹2,500+", color: "#6a3fc4", tint: "#bcb6d3" },
  { name: "Premium", enquiry: "Premium", tagline: "Turnkey, low-friction", price: "₹3,000+", color: "#c39410", tint: "#d2cba6" },
  { name: "Bespoke", enquiry: "Extra Premium", tagline: "Flagship", price: "₹4,000+", color: "#b3264e", tint: "#ceafb6" },
];

const steps = [
  { n: "01", title: "Submit your enquiry", body: "Tell us about your space and pick a package." },
  { n: "02", title: "We understand your requirement", body: "Our team contacts you to discuss your site, needs and budget." },
  { n: "03", title: "We present design and quotation", body: "You receive the design direction, package inclusions and a detailed quotation." },
];

export default function FitOutPackages({ onEnquire }: { onEnquire: (packageName?: string) => void }) {
  return (
    <section className="bg-[#0f0f0f] px-6 pt-12 lg:px-24 lg:pt-[69px]">
      {/* Anchor target sits below the section padding so the heading lands near the top of the screen */}
      <div id="fit-out-packages" className="scroll-mt-12">
        <SectionHeading
          badge="Fit-out packages"
          titleClassName="max-w-none"
          title={
            <>
              What will your space{" "}
              <Accent>cost?</Accent>
            </>
          }
          subtitle="Five fit-out packages, from cost-led workspaces to flagship offices and stores. Inclusions and your quotation are shared once our team understands your requirement."
        />

        <div className="mx-auto mt-3 flex h-7 max-w-[1248px] items-center justify-end sm:hidden">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 font-opensans text-[10px] font-medium tracking-[0.08em] text-white/65 uppercase">
            Swipe to explore
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5 animate-pulse text-emerald-400">
              <path d="M3.5 10h12m0 0-4.5-4.5M15.5 10 11 14.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        <div className="mx-auto mt-2 flex max-w-[1248px] snap-x snap-mandatory gap-3 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mt-[47px] sm:grid sm:grid-flow-row sm:grid-cols-2 sm:overflow-visible sm:pb-0">
          {packages.map((p) => (
            // Wrapper holds the hover area and never moves, so the card lifting can't cause hover flicker
            <div key={p.name} className="group relative w-[82vw] max-w-[300px] shrink-0 snap-start hover:z-10 sm:w-auto sm:max-w-none">
              <button
                type="button"
                onClick={() => onEnquire(p.enquiry)}
                aria-label={`Get a quotation for the ${p.name} package`}
                className="flex h-full w-full cursor-pointer flex-col gap-[7.7px] rounded-[6px] border border-t-4 bg-white p-4 text-left focus:outline-none focus-visible:shadow-[0_0_0_2px_var(--pkg)] transition-[translate,scale,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[translate,scale] group-hover:-translate-y-1.5 group-hover:scale-[1.04] group-hover:shadow-[0_0_0_2px_var(--pkg),0_18px_28px_-10px_rgba(0,0,0,0.55)] motion-reduce:transition-none"
                style={{ borderColor: p.color, "--pkg": p.color } as React.CSSProperties}
              >
                <p className="font-opensans text-[17.6px] font-extrabold leading-[28.16px]" style={{ color: p.color }}>
                  {p.name}
                </p>
                <p className="font-opensans text-[13.1px] leading-[20.99px] text-[#5b645e]">{p.tagline}</p>
                <div className="flex flex-col font-opensans">
                  <p className="text-[19.2px] font-extrabold leading-[22px] text-[#121613]">{p.price}</p>
                  <p className="text-[10.6px] uppercase leading-[16.9px] tracking-[0.528px] text-[#5b645e]">per sq ft</p>
                </div>
                <div className="flex min-h-[70px] flex-col gap-[7px] border-y border-dashed border-[#d7ddd8] py-2.5">
                  <p className="font-opensans text-[9.9px] uppercase leading-[15.87px] tracking-[0.794px] text-[#5b645e]">
                    Inclusions
                  </p>
                  {["w-full", "w-full", "w-[105.84px]"].map((w, i) => (
                    <div
                      key={i}
                      className={`h-[9px] rounded-[5px] blur-[0.5px] ${w}`}
                      style={{ backgroundImage: `linear-gradient(to right, #d7ddd8, ${p.tint})` }}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="flex h-[11px] w-[11.35px] shrink-0 flex-col justify-center rounded-[2px] border border-[#5b645e] py-[1.5px]">
                    <span className="h-[11px] w-full rounded-[2px] shadow-[0px_-4px_0px_-1.5px_white,0px_-5px_0px_-1.5px_#5b645e]" />
                  </span>
                  <p className="font-opensans text-[10.9px] leading-[17.41px] tracking-[0.326px] text-[#5b645e]">
                    Shared after
                    <br />
                    consultation
                  </p>
                </div>
              </button>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-[1248px] rounded-[26px] border border-emerald-600/40 bg-[linear-gradient(145deg,rgba(11,44,27,0.9),rgba(12,18,15,0.98)_58%)] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.25)] sm:hidden">
          <h3 className="px-1 font-opensans text-lg font-bold leading-6 tracking-[-0.184px] text-[#eaeaea]">
            How you get your quotation
          </h3>
          <ol className="mt-4 grid gap-2.5">
            {steps.map((s) => (
              <li key={s.n} className="flex items-start gap-3 rounded-2xl border border-white/[0.08] bg-black/20 p-3.5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-emerald-500/25 bg-emerald-500/10 font-manrope text-lg font-semibold text-emerald-500">
                  {s.n}
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-1.5 font-opensans text-[#eaeaea]">
                  <p className="text-sm font-semibold leading-5">{s.title}</p>
                  <p className="text-[13px] leading-[19px] text-white/60">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <button
            type="button"
            onClick={() => onEnquire()}
            className="mt-4 flex h-12 w-full items-center justify-center rounded-xl bg-emerald-600 px-5 font-archivo text-sm font-semibold text-white transition-colors hover:bg-emerald-500"
          >
            Submit your enquiry →
          </button>
        </div>

        <div className="mx-auto mt-[48px] hidden max-w-[1248px] flex-col gap-[18px] rounded-lg border-[0.5px] border-emerald-600 bg-[#0b2c1b] p-[26px] sm:flex lg:flex-row lg:items-center">
          <div className="flex flex-1 flex-col gap-4">
            <h3 className="font-opensans text-xl font-bold leading-6 tracking-[-0.184px] text-[#eaeaea]">
              How you get your quotation
            </h3>
            <ol className="grid gap-[14px] pt-[9.25px] md:grid-cols-3">
              {steps.map((s) => (
                <li key={s.n} className="flex items-start gap-2.5 px-3 py-2">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-emerald-600 font-manrope text-2xl font-medium leading-[30px] text-[#eaeaea]">
                    {s.n}
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col gap-2 font-opensans text-[#eaeaea]">
                    <p className="text-base font-semibold leading-[22px]">{s.title}</p>
                    <p className="text-sm leading-5">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <button
            type="button"
            onClick={() => onEnquire()}
            className="shrink-0 rounded-md border border-emerald-600 bg-emerald-600 pb-[14.5px] pl-[22.5px] pr-[22.5px] pt-[15.5px] font-archivo text-[15.7px] font-semibold leading-[normal] text-white transition-colors hover:bg-emerald-500"
          >
            Submit your enquiry →
          </button>
        </div>
      </div>
    </section>
  );
}
