import Logo from "./Logo";

const companyLinks = [
  { label: "Real Estate Solution", href: "https://www.decofice.com/realestate-solution" },
  { label: "Projects", href: "https://www.decofice.com/project" },
  { label: "Start Your Project", href: "https://www.decofice.com/project-booking" },
  { label: "About Us", href: "https://www.decofice.com/about" },
  { label: "Contact Us", href: "#" }
];
const policyLinks = [
  { label: "Privacy Policy", href: "https://www.decofice.com/privacypolicy" },
  { label: "Onboarding Policy", href: "http://decofice.com/onboarding-policy" },
  { label: "Shipping & Delivery Policy", href: "https://www.decofice.com/shipping-delivery" },
  { label: "Pricing Policy", href: "https://www.decofice.com/pricingpolicy" },
  { label: "Copyright & Trademark Policy", href: "https://www.decofice.com/copyright-trademark" },
];
const termsLinks = [
  { label: "Terms & Conditions", href: "https://www.decofice.com/terms-conditions" },
  { label: "Terms of Use Agreement", href: "https://www.decofice.com/termsofuse" },
  { label: "Professional Payment", href: "https://www.decofice.com/professional-payment" },
  { label: "Refund/Return", href: "https://www.decofice.com/refund-return" }
];
const resourceLinks = [
  { label: "Blogs", href: "https://www.decofice.com/blog" }
];

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

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-sm lg:text-sm font-semibold text-white">{title}</h3>
      <ul className="mt-3 flex flex-col gap-2.5 lg:mt-4 lg:gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} className="text-xs lg:text-sm text-white/60 transition-colors hover:text-white">
              {link.label}
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

      <div className="relative mx-auto max-w-7xl px-6 pt-12 pb-8 lg:px-12 lg:pt-16 lg:pb-8">
        {/* Main Footer Links - Grid on Mobile, Flex on Desktop */}
        <div className="grid grid-cols-2 gap-y-10 gap-x-4 lg:flex lg:flex-row lg:justify-between lg:gap-12">
          
          {/* Logo & Company Info */}
          <div className="col-span-2 mb-2 lg:col-span-1 lg:mb-0 lg:min-w-[240px]">
            <Logo className="h-7 lg:h-9 w-auto text-white" />
            <p className="mt-4 text-sm lg:text-lg font-semibold text-white">Experience the dream</p>
            <p className="mt-1.5 text-xs lg:text-sm text-white/50">CIN: U72900KL2021PTC069994</p>
            <div className="mt-5 flex items-center gap-3 lg:mt-5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-8 w-8 lg:h-9 lg:w-9 items-center justify-center rounded-full bg-white text-black transition-opacity hover:opacity-80 shrink-0 [&>svg]:w-3.5 [&>svg]:h-3.5 lg:[&>svg]:w-4 lg:[&>svg]:h-4"
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

        {/* Bottom Section - Stacked on Mobile, Row on Desktop */}
        <div className="mt-12 border-t border-emerald-600/40 pt-6 lg:mt-14 lg:pt-6">
          <div className="flex flex-col-reverse items-center justify-between gap-6 lg:flex-row lg:gap-4">
            
            <p className="text-xs lg:text-sm text-white/50 text-center lg:text-left">
              Copyright © {new Date().getFullYear()} Decofice Technologies Private Limited | All rights reserved
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-4">
              <span className="rounded border border-white/15 bg-white/5 px-2 py-1 text-[10px] lg:px-2.5 lg:py-1 lg:text-xs font-bold tracking-wide text-white/70">
                UPI
              </span>
              <span className="relative flex h-4 w-7 lg:h-5 lg:w-9 items-center">
                <span className="absolute left-0 h-4 w-4 lg:h-5 lg:w-5 rounded-full bg-red-500" />
                <span className="absolute left-2.5 lg:left-3 h-4 w-4 lg:h-5 lg:w-5 rounded-full bg-amber-400 opacity-90" />
              </span>
              <span className="text-xs lg:text-sm font-black text-white/80 italic">VISA</span>
              <span className="text-xs lg:text-sm font-bold text-white/80 italic">RuPay</span>
              <span className="rounded bg-blue-600 px-1.5 py-0.5 text-[10px] lg:px-2 lg:py-1 font-bold text-white">AMEX</span>
            </div>
            
          </div>
        </div>
      </div>
    </footer>
  );
}
