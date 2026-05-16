"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "./SectionHeading";

const info = [
  { label: "サロン名", value: "LUMIÈRE（ルミエール）" },
  { label: "住所", value: "東京都渋谷区神宮前 3-XX-XX　○○ビル 4F" },
  { label: "最寄駅", value: "東京メトロ表参道駅 A2出口 徒歩3分" },
  { label: "営業時間", value: "10:00 〜 21:00（最終受付 19:00）" },
  { label: "定休日", value: "毎週火曜日・第3月曜日" },
  { label: "完全予約制", value: "当日予約可（要お電話確認）" },
  { label: "電話番号", value: "03-XXXX-XXXX" },
  { label: "SNS", value: "@lumiere.esthetic" },
];

export default function Access() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      ".access-inner > *",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#access",
          start: "top 75%",
        },
      }
    );
  }, []);

  return (
    <section
      id="access"
      className="py-28 px-6"
      style={{ background: "#0d0d0d" }}
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading en="Access" ja="アクセス・店舗情報" />

        <div className="access-inner grid md:grid-cols-2 gap-8 items-start">
          {/* Map embed */}
          <div
            className="relative w-full overflow-hidden border border-gold/20"
            style={{ paddingTop: "66%" }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.357!2d139.7100!3d35.6652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188ca1f9381f0b%3A0x337328d4851c2f0!2z6KW_5Y2X6aeF5qCh!5e0!3m2!1sja!2sjp!4v1700000000000"
              className="absolute inset-0 w-full h-full grayscale"
              style={{ filter: "grayscale(1) invert(0.9) sepia(0.3) saturate(0.5) hue-rotate(10deg)", border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="サロンの地図"
            />
            <a
              href="https://maps.google.com/?q=表参道駅"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 z-10 text-xs tracking-[0.2em] border border-gold/60 bg-obsidian/80 text-gold px-4 py-2 hover:border-gold hover:bg-obsidian transition-all duration-300 uppercase backdrop-blur-sm"
            >
              Google Map で開く
            </a>
          </div>

          {/* Info */}
          <div className="border border-gold/20 p-8" style={{ background: "rgba(255,255,255,0.02)" }}>
            <dl className="space-y-5">
              {info.map((item) => (
                <div
                  key={item.label}
                  className="flex gap-4 pb-5 border-b border-gold/10 last:border-b-0 last:pb-0"
                >
                  <dt className="text-gold/60 text-xs tracking-[0.2em] uppercase w-24 shrink-0 pt-0.5">
                    {item.label}
                  </dt>
                  <dd className="text-cream/70 text-sm leading-relaxed tracking-wide">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex gap-3">
              <a
                href="tel:03XXXXXXXX"
                className="flex-1 text-center py-3 border border-gold/30 text-gold/70 text-sm tracking-[0.2em] hover:border-gold hover:text-gold transition-all duration-300 uppercase"
              >
                電話で問い合わせ
              </a>
              <a
                href="#reservation"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#reservation")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex-1 text-center py-3 bg-gold text-obsidian text-sm tracking-[0.2em] hover:bg-gold-light transition-all duration-300 uppercase font-medium"
              >
                ネット予約
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
