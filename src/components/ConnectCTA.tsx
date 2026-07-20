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
    <svg viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M11.5318 4.08333C12.3457 4.24214 13.0938 4.64021 13.6802 5.22661C14.2666 5.81301 14.6646 6.56105 14.8234 7.375M11.5318 0.75C13.2228 0.937864 14.7998 1.69515 16.0036 2.89751C17.2075 4.09987 17.9668 5.67584 18.1568 7.36667M17.3234 14.0167V16.5167C17.3244 16.7488 17.2768 16.9785 17.1839 17.1911C17.0909 17.4038 16.9545 17.5947 16.7835 17.7516C16.6125 17.9085 16.4106 18.0279 16.1907 18.1023C15.9709 18.1766 15.7379 18.2042 15.5068 18.1833C12.9425 17.9047 10.4793 17.0285 8.3151 15.625C6.30162 14.3456 4.59454 12.6385 3.3151 10.625C1.90675 8.451 1.0303 5.97583 0.756764 3.4C0.735939 3.16956 0.763326 2.9373 0.837181 2.71802C0.911035 2.49874 1.02974 2.29724 1.18574 2.12635C1.34173 1.95546 1.5316 1.81892 1.74326 1.72543C1.95491 1.63195 2.18371 1.58355 2.4151 1.58333H4.9151C5.31952 1.57935 5.71159 1.72257 6.01823 1.98628C6.32487 2.24999 6.52516 2.61621 6.58176 3.01667C6.68728 3.81672 6.88297 4.60227 7.1651 5.35833C7.27722 5.6566 7.30148 5.98076 7.23502 6.2924C7.16856 6.60404 7.01415 6.89009 6.7901 7.11667L5.73176 8.175C6.91806 10.2613 8.64548 11.9887 10.7318 13.175L11.7901 12.1167C12.0167 11.8926 12.3027 11.7382 12.6144 11.6717C12.926 11.6053 13.2502 11.6295 13.5484 11.7417C14.3045 12.0238 15.09 12.2195 15.8901 12.325C16.2949 12.3821 16.6646 12.586 16.9289 12.8979C17.1932 13.2098 17.3336 13.608 17.3234 14.0167Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function MailIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M3.33464 16.6663C2.8763 16.6663 2.48394 16.5031 2.15755 16.1768C1.83116 15.8504 1.66797 15.458 1.66797 14.9997V4.99967C1.66797 4.54134 1.83116 4.14898 2.15755 3.82259C2.48394 3.4962 2.8763 3.33301 3.33464 3.33301H16.668C17.1263 3.33301 17.5187 3.4962 17.8451 3.82259C18.1714 4.14898 18.3346 4.54134 18.3346 4.99967V14.9997C18.3346 15.458 18.1714 15.8504 17.8451 16.1768C17.5187 16.5031 17.1263 16.6663 16.668 16.6663H3.33464ZM10.0013 10.833L3.33464 6.66634V14.9997H16.668V6.66634L10.0013 10.833ZM10.0013 9.16634L16.668 4.99967H3.33464L10.0013 9.16634ZM3.33464 6.66634V4.99967V14.9997V6.66634Z" fill="currentColor"/>
    </svg>
  );
}

export default function ConnectCTA() {
  return (
    <section className="relative isolate min-h-[600px] w-full overflow-hidden bg-black lg:min-h-[700px]">
      <Image src="/cta.png" alt="Decofice villa nestled in misty mountains" fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-black/10" />

      {/* MOBILE LAYOUT */}
      <div className="relative mx-auto flex min-h-[600px] max-w-7xl flex-col justify-center px-6 py-20 lg:hidden">
        <div className="mx-auto flex max-w-xl flex-col items-center text-center">
          <h2 className="font-opensans text-[24px] leading-tight font-bold text-white sm:text-[48px]">
            Connect <span className="font-serif italic text-white/90">Directly</span>
          </h2>
          <p className="mt-4 max-w-md text-[12px] text-white/80">
            Reach out directly to our dedicated resort consultant to guide you through every step of the process.
          </p>
          <div className="mt-8 flex w-full flex-col items-center gap-4">
            <a
              href="https://www.decofice.com/about"
              className="font-opensans flex h-[36px] w-[182px] items-center justify-center whitespace-nowrap rounded-lg bg-emerald-600 px-[12px] py-[8px] text-[12px] font-semibold text-white transition-colors hover:bg-emerald-600/90"
            >
              Learn More About Decofice
            </a>
            {/* <a
              href="#download-brochure"
              className="font-opensans flex h-[36px] w-[182px] items-center justify-center whitespace-nowrap rounded-lg bg-[#EFEFEF] px-[12px] py-[8px] text-[12px] font-semibold text-emerald-600 transition-colors hover:bg-white"
            >
              Download Brochure
            </a> */}
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <div className="flex h-[327px] w-[272px] flex-col items-center justify-between rounded-[18px] border border-[#EAEAEA]/10 bg-[#EAEAEA]/10 px-[32px] py-[30px] text-center shadow-2xl shadow-black/40 backdrop-blur-md">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full shadow-lg">
              <Image src="/dv.png" alt={CONSULTANT.name} fill sizes="80px" className="object-cover scale-[1.20] -translate-x-1" />
            </div>

            <div className="flex flex-col items-center gap-1">
              <h3 className="text-sm font-bold text-white">{CONSULTANT.name}</h3>
              <p className="text-[11px] text-white/70">{CONSULTANT.role}</p>
            </div>

            <div className="flex flex-col items-start gap-2 text-[11px] text-white/90">
              <a href={CONSULTANT.phoneHref} className="flex items-center gap-2 transition-colors hover:text-white">
                <PhoneIcon className="h-4 w-4 shrink-0 opacity-80" />
                <span>{CONSULTANT.phone}</span>
              </a>
              <a href={`mailto:${CONSULTANT.email}`} className="flex items-center gap-2 transition-colors hover:text-white">
                <MailIcon className="h-4 w-4 shrink-0 opacity-80" />
                <span>{CONSULTANT.email}</span>
              </a>
            </div>

            <div className="grid w-full grid-cols-2 gap-3">
              <a
                href={CONSULTANT.phoneHref}
                className="font-opensans flex h-9 items-center justify-center gap-2 rounded-xl bg-[#EFEFEF] text-[11px] font-semibold text-emerald-600 transition-colors hover:bg-white"
              >
                <PhoneIcon className="h-3.5 w-3.5" />
                Call
              </a>
              <a
                href={`mailto:${CONSULTANT.email}`}
                className="font-opensans flex h-9 items-center justify-center gap-2 rounded-xl border border-white/50 text-[11px] font-semibold text-white transition-colors hover:bg-white/10"
              >
                <MailIcon className="h-3.5 w-3.5" />
                Mail
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP LAYOUT */}
      <div className="relative mx-auto hidden min-h-[700px] max-w-7xl flex-row items-center justify-between px-12 py-20 lg:flex">
        <div className="max-w-xl">
          <h2 className="font-opensans text-heading leading-tight font-bold text-white">
            Connect <span className="font-serif italic text-white/90">Directly</span>
          </h2>
          <p className="mt-6 max-w-md text-[20px] text-white/80">
            Reach out directly to our dedicated resort consultant to guide you through every step of the process.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="https://www.decofice.com/about"
              className="font-opensans inline-flex h-12 items-center justify-center rounded-lg bg-emerald-600 px-7 text-base font-semibold text-white transition-colors hover:bg-emerald-500"
            >
              Learn More About Decofice
            </a>
            {/* <a
              href="#download-brochure"
              className="font-opensans inline-flex h-12 items-center justify-center rounded-lg bg-white px-7 text-base font-semibold text-emerald-600 transition-colors hover:bg-white/90"
            >
              Download Brochure
            </a> */}
          </div>
        </div>

        <div className="flex justify-center">
          <div className="flex w-[340px] flex-col items-center rounded-[24px] border border-[#EAEAEA]/10 bg-[#EAEAEA]/10 px-8 py-10 text-center shadow-[0px_7px_8.6px_3px_#00000040] backdrop-blur-md">
            <div className="relative mb-6 h-[88px] w-[88px] shrink-0 overflow-hidden rounded-full">
              <Image src="/dv.png" alt={CONSULTANT.name} fill sizes="88px" className="object-cover scale-[1.20] -translate-x-1" />
            </div>

            <div className="mb-8 flex flex-col items-center gap-1.5">
              <h3 className="text-xl font-bold text-white">{CONSULTANT.name}</h3>
              <p className="text-sm text-white/70">{CONSULTANT.role}</p>
            </div>

            <div className="mb-10 flex flex-col items-center gap-4 text-[15px] text-white/90">
              <a href={CONSULTANT.phoneHref} className="flex items-center gap-3 transition-colors hover:text-white">
                <PhoneIcon className="h-5 w-5 shrink-0 opacity-80" />
                <span>{CONSULTANT.phone}</span>
              </a>
              <a href={`mailto:${CONSULTANT.email}`} className="flex items-center gap-3 transition-colors hover:text-white">
                <MailIcon className="h-5 w-5 shrink-0 opacity-80" />
                <span>{CONSULTANT.email}</span>
              </a>
            </div>

            <div className="flex w-full items-center justify-center gap-[10px]">
              <a
                href={CONSULTANT.phoneHref}
                className="font-opensans flex h-[40px] w-[131px] items-center justify-center gap-2 rounded-[8px] bg-[#EFEFEF] px-[36px] py-[10px] text-base font-semibold text-emerald-600 transition-colors hover:bg-white"
              >
                <PhoneIcon className="h-5 w-5" />
                Call
              </a>
              <a
                href={`mailto:${CONSULTANT.email}`}
                className="font-opensans flex h-[40px] w-[131px] items-center justify-center gap-2 rounded-[8px] border border-white/50 px-[36px] py-[10px] text-base font-semibold text-white transition-colors hover:bg-white/10"
              >
                <MailIcon className="h-5 w-5" />
                Mail
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
