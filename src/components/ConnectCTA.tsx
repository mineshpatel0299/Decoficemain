import Image from "next/image";

const CONSULTANT = {
  name: "Dharmveer Singh",
  role: "Resort Consultant",
  phone: "+91 79052 89692",
  phoneHref: "tel:+917905289692",
  email: "dharmveersinghdps@gmail.com",
};

function PhoneIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path
        d="M5 4h3.5l1.5 4.5-2 1.5a12 12 0 006 6l1.5-2 4.5 1.5V19a2 2 0 01-2 2c-8 0-14-6-14-14a2 2 0 012-2z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M3.5 6.5L12 13l8.5-6.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ConnectCTA() {
  return (
    <section className="relative isolate min-h-[600px] w-full overflow-hidden bg-black lg:min-h-[700px]">
      <Image src="/cta.png" alt="Decofice villa nestled in misty mountains" fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-black/10" />

      <div className="relative mx-auto flex min-h-[600px] max-w-7xl flex-col justify-center px-6 py-20 lg:min-h-[700px] lg:px-12">
        <div className="max-w-xl">
          <h2 className="font-opensans text-[36px] leading-tight font-bold text-white sm:text-[48px] lg:text-[56px]">
            Connect <span className="font-serif italic text-white/90">Directly</span>
          </h2>
          <p className="mt-6 max-w-md text-lg text-white/80">
            Reach out directly to our dedicated resort consultant to guide you through every step of the process.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#learn-more"
              className="font-opensans inline-flex h-12 items-center justify-center rounded-lg bg-emerald-600 px-7 text-base font-semibold text-white transition-colors hover:bg-emerald-500"
            >
              Learn More About Decofice
            </a>
            <a
              href="#download-brochure"
              className="font-opensans inline-flex h-12 items-center justify-center rounded-lg bg-white px-7 text-base font-semibold text-emerald-700 transition-colors hover:bg-white/90"
            >
              Download Brochure
            </a>
          </div>
        </div>

        <div className="mt-12 flex justify-center lg:absolute lg:top-1/2 lg:right-0 lg:mt-0 lg:-translate-y-1/2 lg:justify-end">
          <div className="flex w-84 flex-col items-center gap-2.5 rounded-[18px] border border-white/25 bg-white/10 px-8 py-11.5 text-center shadow-2xl shadow-black/40 backdrop-blur-2xl lg:h-100.75">
            <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-white/70">
              <Image src="/dv.png" alt={CONSULTANT.name} fill sizes="80px" className="object-cover" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">{CONSULTANT.name}</h3>
              <p className="text-sm text-white/70">{CONSULTANT.role}</p>
            </div>

            <div className="flex flex-col items-center gap-2 text-sm text-white/90">
              <a href={CONSULTANT.phoneHref} className="inline-flex items-center gap-2 transition-colors hover:text-white">
                <PhoneIcon className="h-4 w-4" />
                {CONSULTANT.phone}
              </a>
              <a href={`mailto:${CONSULTANT.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-white">
                <MailIcon className="h-4 w-4" />
                {CONSULTANT.email}
              </a>
            </div>

            <div className="grid w-full grid-cols-2 gap-3">
              <a
                href={CONSULTANT.phoneHref}
                className="font-opensans inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-white text-sm font-semibold text-emerald-700 transition-colors hover:bg-white/90"
              >
                <PhoneIcon className="h-4 w-4" />
                Call
              </a>
              <a
                href={`mailto:${CONSULTANT.email}`}
                className="font-opensans inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-white/50 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <MailIcon className="h-4 w-4" />
                Mail
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
