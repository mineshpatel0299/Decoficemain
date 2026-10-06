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
    <section className="bg-[#0f0f0f] px-6 pt-[69px] lg:px-24">
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

        <div className="mx-auto mt-[47px] grid max-w-[1248px] gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {packages.map((p) => (
            // Wrapper holds the hover area and never moves, so the card lifting can't cause hover flicker
            <div key={p.name} className="group relative hover:z-10">
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

        <div className="mx-auto mt-[48px] flex max-w-[1248px] flex-col gap-[18px] rounded-lg border-[0.5px] border-emerald-600 bg-[#0b2c1b] p-[26px] lg:flex-row lg:items-center">
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
