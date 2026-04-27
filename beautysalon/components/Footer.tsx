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
            {["Instagram", "LINE", "TikTok"].map((s) => (
              <a
                key={s}
                href="#"
                className="w-9 h-9 border border-gold/20 flex items-center justify-center text-cream/30 text-xs hover:border-gold hover:text-gold transition-all duration-300"
              >
                {s[0]}
              </a>
            ))}
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
