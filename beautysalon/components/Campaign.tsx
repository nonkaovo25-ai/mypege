"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "./SectionHeading";

const campaigns = [
  {
    num: "01",
    title: "初回体験フェイシャル",
    original: "¥22,000",
    price: "¥5,500",
    duration: "90分",
    desc: "肌診断＋クレンジング＋スチーム＋導入美容液＋フェイシャルマッサージ＋パック",
  },
  {
    num: "02",
    title: "初回体験ボディスリミング",
    original: "¥28,000",
    price: "¥7,700",
    duration: "90分",
    desc: "カウンセリング＋ボディラップ＋リンパドレナージュ＋温熱トリートメント",
  },
  {
    num: "03",
    title: "トータルビューティープラン",
    original: "¥50,000",
    price: "¥11,000",
    duration: "120分",
    desc: "フェイシャル＋ボディのWケア。初めての方限定のフルコース体験。",
    badge: "人気No.1",
  },
];

export default function Campaign() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = cardsRef.current?.querySelectorAll(".campaign-card");
    if (!cards) return;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section
      id="campaign"
      ref={sectionRef}
      className="py-28 px-6 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0a0a0a 0%, #111008 50%, #0a0a0a 100%)",
      }}
    >
      {/* Background decoration */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading en="First Visit Campaign" ja="初回限定キャンペーン" />

        <p className="text-center text-cream/40 text-sm tracking-wider mb-12 -mt-8">
          ※ 初回ご来店の方のみ。各プラン1回限り。
        </p>

        <div
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-6"
        >
          {campaigns.map((c) => (
            <div
              key={c.num}
              className="campaign-card relative border border-gold/20 p-8 group hover:border-gold/60 transition-all duration-500 cursor-default"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at top, rgba(212,175,55,0.06), transparent 60%)" }}
              />

              {c.badge && (
                <span className="absolute -top-3 right-6 bg-gold text-obsidian text-xs px-3 py-1 tracking-widest font-medium">
                  {c.badge}
                </span>
              )}

              <p className="text-gold/30 text-4xl font-light mb-4" style={{ fontFamily: "var(--font-serif)" }}>
                {c.num}
              </p>

              <h3 className="text-cream text-lg font-light tracking-wide mb-2" style={{ fontFamily: "var(--font-serif)" }}>
                {c.title}
              </h3>

              <p className="text-cream/30 text-xs tracking-widest mb-6">{c.duration}</p>

              <p className="text-cream/40 text-sm leading-relaxed mb-6">{c.desc}</p>

              <div className="border-t border-gold/20 pt-5">
                <p className="text-cream/30 text-xs line-through mb-1">{c.original}</p>
                <p className="text-3xl font-light tracking-wider" style={{ fontFamily: "var(--font-serif)", color: "#d4af37" }}>
                  {c.price}
                  <span className="text-base ml-1 text-cream/50">（税込）</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#reservation"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#reservation")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative inline-flex items-center justify-center px-12 py-4 overflow-hidden border border-gold text-gold text-sm tracking-[0.3em] uppercase transition-all duration-500 hover:text-obsidian"
          >
            <span className="absolute inset-0 bg-gold transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            <span className="relative">今すぐ予約する</span>
          </a>
        </div>
      </div>
    </section>
  );
}
