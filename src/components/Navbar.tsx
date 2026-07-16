"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Logo from "./Logo";

const navLinks = [
  { label: "Projects", href: "https://www.decofice.com/project" },
  { label: "Real Estate Solution", href: "https://www.decofice.com/realestate-solution" },
  { label: "About Us", href: "https://www.decofice.com/about" },
  { label: "Start Your Project", href: "https://www.decofice.com/project-booking" },
  { label: "Blogs", href: "https://www.decofice.com/blog" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Slides down once the preloader (1s delay + 1.4s logo zoom + 0.4s fade,
    // overlapping) has fully cleared at ~2.5s — same cue Hero's copy uses.
    const hasSeen = sessionStorage.getItem("hasSeenPreloader");
    const delay = hasSeen ? 0 : 2.5;

    gsap.fromTo(
      headerRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay }
    );
  }, []);

  return (
    <header
      ref={headerRef}
      className="relative z-30 mx-auto max-w-[1800px] px-8 pt-8 opacity-0 sm:px-12"
    >
      <div className="flex items-center justify-between">
        <a href="/" className="shrink-0 text-white">
          <Logo className="w-[39px] h-[38px]" />
        </a>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-opensans text-[16px] font-normal leading-none tracking-normal text-white/90 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact-us"
          className="hidden shrink-0 items-center justify-center gap-[10px] rounded-full bg-white px-7 py-3 h-12 font-opensans text-[16px] font-normal leading-6 tracking-normal text-black transition-colors hover:bg-white/90 lg:inline-flex"
        >
          Contact Us
        </a>

        {/* Hamburger toggle: mobile/tablet only */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="relative z-30 flex h-9 w-9 shrink-0 items-center justify-center text-white lg:hidden"
        >
          <span className="relative block h-4 w-5.5">
            <span
              className={`absolute left-0 h-0.5 w-full rounded-full bg-current transition-all duration-300 ${
                menuOpen ? "top-1.75 rotate-45" : "top-0 rotate-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.75 h-0.5 w-full rounded-full bg-current transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 h-0.5 w-full rounded-full bg-current transition-all duration-300 ${
                menuOpen ? "top-1.75 -rotate-45" : "top-3.5 rotate-0"
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile/tablet menu panel */}
      <div
        id="mobile-nav-menu"
        className={`absolute inset-x-4 top-full z-20 origin-top overflow-hidden rounded-2xl border border-white/10 bg-black/95 backdrop-blur-sm transition-all duration-300 ease-out lg:hidden ${
          menuOpen ? "mt-3 max-h-100 opacity-100" : "mt-0 max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col items-center gap-6 px-6 py-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-opensans text-[16px] font-normal leading-none tracking-normal text-white/90 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact-us"
            onClick={() => setMenuOpen(false)}
            className="mt-2 flex w-full max-w-60 items-center justify-center gap-[10px] rounded-full bg-white px-7 py-3 h-12 font-opensans text-[16px] font-normal leading-6 tracking-normal text-black transition-colors hover:bg-white/90"
          >
            Contact Us
          </a>
        </nav>
      </div>
    </header>
  );
}
