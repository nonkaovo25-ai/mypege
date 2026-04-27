"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "./SectionHeading";

type Category = "facial" | "body";

const menus: Record<Category, { name: string; time: string; price: string; desc: string }[]> = {
  facial: [
    {
      name: "ディープクレンジングフェイシャル",
      time: "60分",
      price: "¥13,200",
      desc: "毛穴の汚れを徹底除去し、透明感のある素肌へ導くベーシックコース。",
    },
    {
      name: "美白ホワイトニングケア",
      time: "75分",
      price: "¥18,700",
      desc: "高濃度ビタミンC導入＋イオン導入で、くすみ・シミにアプローチ。",
    },
    {
      name: "エイジングリフトアップ",
      time: "90分",
      price: "¥24,200",
      desc: "ラジオ波とEMSを組み合わせ、たるみ・ほうれい線にハリを与える。",
    },
    {
      name: "プレミアムルミエールフェイシャル",
      time: "120分",
      price: "¥38,500",
      desc: "当サロン最上位コース。全工程を最高素材で仕上げる究極のスキンケア。",
    },
  ],
  body: [
    {
      name: "リンパドレナージュ",
      time: "60分",
      price: "¥15,400",
      desc: "全身のリンパの流れを促進し、むくみ・疲労を解消するボディケア。",
    },
    {
      name: "セルライトスリミング",
      time: "90分",
      price: "¥22,000",
      desc: "キャビテーション＋ラジオ波で気になる部位を集中ケア。",
    },
    {
      name: "ボディラップ痩身",
      time: "90分",
      price: "¥25,300",
      desc: "専用クリームで全身をラップし、発汗を促しながら引き締める。",
    },
    {
      name: "プレミアムボディフルコース",
      time: "120分",
      price: "¥42,900",
      desc: "フルボディドレナージュ＋スリミング＋保湿仕上げの完全コース。",
    },
  ],
};

export default function Menu() {
  const [active, setActive] = useState<Category>("facial");
  const [displayed, setDisplayed] = useState<Category>("facial");
  const listRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(
      ".menu-tab",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: "#menu", start: "top 75%" },
      }
    );
  }, []);

  // 初回マウント時のアニメーション
  useEffect(() => {
    if (!listRef.current) return;
    const items = listRef.current.querySelectorAll(".menu-item");
    gsap.fromTo(
      items,
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, duration: 0.45, stagger: 0.07, ease: "power2.out" }
    );
  }, []);

  // タブ切り替え：スライドアウト → コンテンツ差し替え → スライドイン
  useEffect(() => {
    if (displayed === active) return;
    if (!listRef.current) return;
    isAnimating.current = true;
    const items = listRef.current.querySelectorAll(".menu-item");
    const toLeft = active === "body";

    gsap.to(items, {
      opacity: 0,
      x: toLeft ? -50 : 50,
      duration: 0.22,
      stagger: 0.03,
      ease: "power2.in",
      onComplete: () => {
        setDisplayed(active);
      },
    });
  }, [active, displayed]);

  useEffect(() => {
    if (!listRef.current) return;
    const items = listRef.current.querySelectorAll(".menu-item");
    if (!isAnimating.current) return;
    const fromLeft = displayed === "body";
    gsap.fromTo(
      items,
      { opacity: 0, x: fromLeft ? 50 : -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.38,
        stagger: 0.06,
        ease: "power2.out",
        onComplete: () => { isAnimating.current = false; },
      }
    );
  }, [displayed]);

  return (
    <section id="menu" className="py-28 px-6" style={{ background: "#0d0d0d" }}>
      <div className="max-w-4xl mx-auto">
        <SectionHeading en="Treatment Menu" ja="メニュー・料金" />

        {/* Tabs */}
        <div className="flex justify-center gap-0 mb-12">
          {(["facial", "body"] as Category[]).map((cat) => (
            <button
              key={cat}
              className={`menu-tab px-10 py-3 text-sm tracking-[0.2em] uppercase border transition-all duration-300 ${
                active === cat
                  ? "bg-gold text-obsidian border-gold"
                  : "bg-transparent text-cream/50 border-gold/30 hover:border-gold/60 hover:text-gold"
              }`}
              onClick={() => {
                if (cat !== active && !isAnimating.current) setActive(cat);
              }}
            >
              {cat === "facial" ? "Facial" : "Body"}
            </button>
          ))}
        </div>

        {/* List */}
        <div ref={listRef} className="space-y-4" style={{ overflow: "hidden" }}>
          {menus[displayed].map((item) => (
            <div
              key={item.name}
              className="menu-item group border border-gold/15 p-6 hover:border-gold/40 transition-all duration-400"
              style={{ background: "rgba(255,255,255,0.015)" }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3
                    className="text-cream text-lg font-light mb-1 group-hover:text-gold transition-colors duration-300"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {item.name}
                  </h3>
                  <p className="text-cream/40 text-sm leading-relaxed">{item.desc}</p>
                </div>
                <div className="flex sm:flex-col items-center sm:items-end gap-4 sm:gap-1 shrink-0">
                  <span className="text-cream/40 text-xs tracking-widest">{item.time}</span>
                  <span
                    className="text-gold text-xl font-light"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {item.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-cream/30 text-xs mt-8 tracking-wider">
          ※ 表示価格はすべて税込です。別途カウンセリング料はかかりません。
        </p>
      </div>
    </section>
  );
}
