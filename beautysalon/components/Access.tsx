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
          {/* Map placeholder */}
          <div
            className="relative w-full overflow-hidden border border-gold/20"
            style={{ paddingTop: "66%", background: "#111" }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div
                className="text-gold text-3xl"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                ✦
              </div>
              <p className="text-cream/30 text-sm tracking-widest">
                東京都渋谷区神宮前
              </p>
              <p className="text-cream/20 text-xs tracking-wide">
                表参道駅 徒歩3分
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-xs tracking-[0.2em] border border-gold/40 text-gold/70 px-5 py-2 hover:border-gold hover:text-gold transition-all duration-300 uppercase"
              >
                Google Map で開く
              </a>
            </div>
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
