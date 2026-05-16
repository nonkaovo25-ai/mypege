"use client";

export default function Footer() {
  const links = [
    { label: "Campaign", href: "#campaign" },
    { label: "Menu", href: "#menu" },
    { label: "Voice", href: "#voice" },
    { label: "FAQ", href: "#faq" },
    { label: "Access", href: "#access" },
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="py-16 px-6 border-t"
      style={{ background: "#080808", borderColor: "rgba(212,175,55,0.15)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          {/* Logo */}
          <div className="text-center md:text-left">
            <p
              className="text-3xl font-light tracking-[0.4em] text-shine"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              LUMIÈRE
            </p>
            <p className="text-cream/25 text-xs tracking-[0.3em] mt-1">
              Premium Esthetic Salon
            </p>
          </div>

          {/* Links */}
          <nav>
            <ul className="flex flex-wrap justify-center gap-6">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={(e) => handleClick(e, l.href)}
                    className="text-cream/30 text-xs tracking-[0.2em] uppercase hover:text-gold transition-colors duration-300"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* SNS */}
          <div className="flex gap-4">
            <a href="#" aria-label="Instagram" className="w-9 h-9 border border-gold/20 flex items-center justify-center text-cream/30 hover:border-gold hover:text-gold transition-all duration-300">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            <a href="#" aria-label="LINE" className="w-9 h-9 border border-gold/20 flex items-center justify-center text-cream/30 hover:border-gold hover:text-gold transition-all duration-300">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
              </svg>
            </a>
            <a href="#" aria-label="TikTok" className="w-9 h-9 border border-gold/20 flex items-center justify-center text-cream/30 hover:border-gold hover:text-gold transition-all duration-300">
              <svg width="14" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="border-t border-gold/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-cream/20 text-xs tracking-widest">
            © 2024 LUMIÈRE All rights reserved.
          </p>
          <p className="text-cream/15 text-xs tracking-widest">
            東京都渋谷区神宮前　表参道駅 徒歩3分
          </p>
        </div>
      </div>
    </footer>
  );
}
