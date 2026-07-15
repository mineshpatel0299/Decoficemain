import Logo from "./Logo";

const companyLinks = ["Real Estate Solution", "Projects", "Start Your Project", "About Us", "Contact Us"];
const policyLinks = [
  "Privacy Policy",
  "Onboarding Policy",
  "Shipping & Delivery Policy",
  "Pricing Policy",
  "Copyright & Trademark Policy",
];
const termsLinks = ["Terms & Conditions", "Terms of Use Agreement", "Professional Payment", "Refund/Return"];
const resourceLinks = ["Blogs"];

const socials = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.25-1.5 1.55-1.5H17V3.6c-.28-.04-1.25-.12-2.38-.12-2.36 0-3.97 1.44-3.97 4.08V9.9H8v3.1h2.65V21h2.85z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
        <path d="M18.9 3H21l-6.6 7.55L22 21h-6.4l-4.7-6.15L5.5 21H3.4l7.05-8.06L2 3h6.55l4.25 5.62L18.9 3zm-1.1 16h1.15L7.3 5H6.1l11.7 14z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M6.94 5.5a2 2 0 11-4 0 2 2 0 014 0zM3.5 8.75h3.4V21h-3.4V8.75zM9.7 8.75h3.26v1.68h.05c.45-.85 1.56-1.75 3.2-1.75 3.42 0 4.05 2.25 4.05 5.18V21h-3.4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.15 1.46-2.15 2.96V21H9.7V8.75z" />
      </svg>
    ),
  },
];

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div className="shrink-0">
      <h3 className="text-[10px] lg:text-sm font-semibold text-white">{title}</h3>
      <ul className="mt-2 flex flex-col gap-1.5 lg:mt-4 lg:gap-3">
        {links.map((label) => (
          <li key={label}>
            <a href="#" className="whitespace-nowrap text-[8px] lg:text-sm text-white/60 transition-colors hover:text-white">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(16,94,63,0.35) 0%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 pt-10 pb-6 lg:px-12 lg:pt-16 lg:pb-8">
        <div className="flex w-full items-start gap-4 overflow-x-auto pb-4 lg:gap-12 lg:pb-6 justify-between">
          <div className="shrink-0 min-w-[130px] lg:min-w-[240px]">
            <Logo className="h-5 lg:h-9 w-auto text-white" />
            <p className="mt-2 text-[10px] lg:text-lg font-semibold text-white whitespace-nowrap">Experience the dream</p>
            <p className="mt-1 text-[8px] lg:text-sm text-white/50 whitespace-nowrap">CIN: U72900KL2021PTC069994</p>
            <div className="mt-3 flex items-center gap-1.5 lg:mt-5 lg:gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-5 w-5 lg:h-9 lg:w-9 items-center justify-center rounded-full bg-white text-black transition-opacity hover:opacity-80 shrink-0 [&>svg]:w-2.5 [&>svg]:h-2.5 lg:[&>svg]:w-4 lg:[&>svg]:h-4"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Company" links={companyLinks} />
          <FooterColumn title="Policy" links={policyLinks} />
          <FooterColumn title="Terms" links={termsLinks} />
          <FooterColumn title="Resources" links={resourceLinks} />
        </div>

        <div className="mt-8 border-t border-emerald-600/40 pt-4 lg:mt-14 lg:pt-6">
          <div className="flex flex-row items-center justify-between gap-2 overflow-x-auto pb-2 lg:gap-4 lg:pb-4">
            <p className="shrink-0 text-[7px] lg:text-sm text-white/50 whitespace-nowrap">
              Copyright © {new Date().getFullYear()} Decofice Technologies Private Limited | All rights reserved
            </p>

            <div className="flex shrink-0 items-center justify-center gap-2 lg:gap-4">
              <span className="rounded border border-white/15 bg-white/5 px-1.5 py-0.5 text-[6px] lg:px-2.5 lg:py-1 lg:text-xs font-bold tracking-wide text-white/70">
                UPI
              </span>
              <span className="relative flex h-3 w-5 lg:h-5 lg:w-9 items-center">
                <span className="absolute left-0 h-3 w-3 lg:h-5 lg:w-5 rounded-full bg-red-500" />
                <span className="absolute left-1.5 lg:left-3 h-3 w-3 lg:h-5 lg:w-5 rounded-full bg-amber-400 opacity-90" />
              </span>
              <span className="text-[8px] lg:text-sm font-black text-white/80 italic">VISA</span>
              <span className="text-[8px] lg:text-sm font-bold text-white/80 italic">RuPay</span>
              <span className="rounded bg-blue-600 px-1 py-0.5 text-[5px] lg:px-2 lg:py-1 lg:text-[10px] font-bold text-white">AMEX</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
