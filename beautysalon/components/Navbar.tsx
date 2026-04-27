"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const navLinks = [
  { label: "Campaign", href: "#campaign" },
  { label: "Menu", href: "#menu" },
  { label: "Voice", href: "#voice" },
  { label: "FAQ", href: "#faq" },
  { label: "Access", href: "#access" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 2.2 }
    );

    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-obsidian/95 backdrop-blur-md border-b border-gold/20 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-2xl font-light tracking-[0.4em] text-shine cursor-pointer select-none"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            LUMIÈRE
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleLinkClick(link.href)}
                  className="text-sm tracking-[0.2em] text-cream/70 hover:text-gold transition-colors duration-300 uppercase cursor-pointer"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href="#reservation"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick("#reservation");
            }}
            className="hidden md:block text-sm tracking-[0.2em] uppercase border border-gold text-gold px-5 py-2 hover:bg-gold hover:text-obsidian transition-all duration-300"
          >
            Reserve
          </a>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="メニュー"
          >
            <span
              className={`block w-6 h-px bg-gold transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2.5" : ""}`}
            />
            <span
              className={`block w-6 h-px bg-gold transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-6 h-px bg-gold transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2.5" : ""}`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-obsidian/98 flex flex-col items-center justify-center gap-10 transition-all duration-500 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {navLinks.map((link) => (
          <button
            key={link.href}
            onClick={() => handleLinkClick(link.href)}
            className="text-2xl tracking-[0.3em] text-cream/80 hover:text-gold transition-colors uppercase"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {link.label}
          </button>
        ))}
        <a
          href="#reservation"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#reservation");
          }}
          className="mt-4 text-sm tracking-[0.3em] uppercase border border-gold text-gold px-8 py-3 hover:bg-gold hover:text-obsidian transition-all duration-300"
        >
          Reserve
        </a>
      </div>
    </>
  );
}
