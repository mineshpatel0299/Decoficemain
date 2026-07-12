import Logo from "./Logo";

const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Real Estate Solution", href: "#real-estate-solution" },
  { label: "About Us", href: "#about-us" },
  { label: "Start Your Project", href: "#start-your-project" },
  { label: "Blog", href: "#blog" },
];

export default function Navbar() {
  return (
    <header className="relative z-30 mx-auto flex max-w-[1800px] items-center justify-between px-8 pt-8 sm:px-12">
      <a href="/" className="shrink-0 text-white">
        <Logo className="h-8 w-auto" />
      </a>

      <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 lg:flex">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-[15px] font-medium text-white/90 transition-colors hover:text-white"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <a
        href="#contact-us"
        className="shrink-0 rounded-full bg-white px-6 py-3 text-[15px] font-semibold text-black transition-colors hover:bg-white/90"
      >
        Contact Us
      </a>
    </header>
  );
}
