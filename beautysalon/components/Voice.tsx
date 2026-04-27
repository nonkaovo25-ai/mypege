"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "./SectionHeading";

const voices = [
  {
    name: "Y.K様",
    age: "26歳",
    service: "美白ホワイトニングケア",
    rating: 5,
    text: "施術後、友人から「肌が透き通ってる！」と言われました。毛穴も目立たなくなり、化粧のりが格段に上がりました。毎月通いたいです。",
  },
  {
    name: "M.T様",
    age: "29歳",
    service: "プレミアムルミエールフェイシャル",
    rating: 5,
    text: "高級感のある空間でリラックスでき、施術中は別世界のよう。終わった後の肌のもちもち感が忘れられません。大切な日の前に必ず来ます。",
  },
  {
    name: "A.S様",
    age: "24歳",
    service: "セルライトスリミング",
    rating: 5,
    text: "3回コースを終えて太ももが-4cm！担当の先生が丁寧に話を聞いてくれて、続けるモチベーションになっています。",
  },
  {
    name: "R.N様",
    age: "28歳",
    service: "エイジングリフトアップ",
    rating: 5,
    text: "初回キャンペーンで試してみたら、リフトアップ効果に驚いて即コース契約しました。プロの技術と空間の質が本当に高い。",
  },
];

const Star = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="#d4af37">
    <path d="M7 0l1.76 4.94H14l-4.18 3.04 1.6 4.93L7 10l-4.42 2.91 1.6-4.93L0 4.94h5.24z" />
  </svg>
);

export default function Voice() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      ".voice-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#voice",
          start: "top 70%",
        },
      }
    );
  }, []);

  return (
    <section
      id="voice"
      className="py-28 px-6"
      style={{
        background:
          "linear-gradient(180deg, #0d0d0d 0%, #0f0d08 50%, #0d0d0d 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading en="Customer Voice" ja="お客様の声" />

        <div className="grid md:grid-cols-2 gap-6">
          {voices.map((v, i) => (
            <div
              key={i}
              className="voice-card relative p-8 border border-gold/15 hover:border-gold/35 transition-all duration-400 group"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at bottom right, rgba(212,175,55,0.05), transparent 60%)",
                }}
              />

              {/* Quote mark */}
              <div
                className="text-gold/10 text-7xl font-serif leading-none mb-4 -mt-2"
                style={{ fontFamily: "Georgia, serif" }}
              >
                "
              </div>

              <p className="text-cream/70 text-sm leading-relaxed mb-6 -mt-4">{v.text}</p>

              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: v.rating }).map((_, j) => (
                  <Star key={j} />
                ))}
              </div>

              <div className="border-t border-gold/15 pt-4 flex items-center justify-between">
                <div>
                  <p className="text-cream font-light tracking-wide">{v.name}</p>
                  <p className="text-cream/30 text-xs mt-0.5">{v.age}</p>
                </div>
                <span className="text-gold/60 text-xs tracking-widest">{v.service}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-cream/30 text-sm tracking-widest">
            Google 口コミ平均 ★ 4.9 / 5.0　（138件）
          </p>
        </div>
      </div>
    </section>
  );
}
