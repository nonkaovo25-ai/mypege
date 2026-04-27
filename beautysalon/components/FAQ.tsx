"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "./SectionHeading";

const faqs = [
  {
    q: "初めてエステに行くのですが、不安です。",
    a: "ご安心ください。初回は肌診断カウンセリングからスタートします。お悩みや体調を詳しくお聞きした上で最適なメニューをご提案しますので、お気軽にご来店ください。",
  },
  {
    q: "施術中に痛みはありますか？",
    a: "基本的に痛みのない施術を心がけています。機器使用時の感覚には個人差がありますが、担当スタッフに随時お伝えいただければ強度を調整いたします。",
  },
  {
    q: "何歳から受けられますか？",
    a: "18歳以上の方からお受けしています。学生の方も多くご来店いただいており、肌トラブルのご相談も承っております。",
  },
  {
    q: "施術後に日焼け止めは必要ですか？",
    a: "はい、フェイシャルメニュー後はお肌が敏感になっているため、紫外線対策をしっかり行っていただくことをお勧めしています。施術後のケアについてもスタッフが丁寧にご説明します。",
  },
  {
    q: "キャンセルポリシーを教えてください。",
    a: "前日までのキャンセルは無料です。当日キャンセルはメニュー料金の50%、無連絡不来は100%のキャンセル料が発生します。ご予定の変更はお早めにご連絡ください。",
  },
  {
    q: "コース購入はできますか？",
    a: "はい、全メニューで5回・10回コースをご用意しています。コース購入で最大20%OFFとなります。詳しくはカウンセリング時にご案内いたします。",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bodyRef.current || !innerRef.current) return;
    if (open) {
      gsap.to(bodyRef.current, {
        height: innerRef.current.offsetHeight,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      gsap.to(bodyRef.current, {
        height: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [open]);

  return (
    <div
      className="border-b border-gold/15 last:border-b-0"
    >
      <button
        className="w-full flex items-center justify-between py-5 text-left group"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-start gap-4">
          <span
            className="text-gold text-sm font-light shrink-0 mt-0.5"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Q
          </span>
          <span className="text-cream/80 text-sm leading-relaxed tracking-wide group-hover:text-cream transition-colors duration-300">
            {q}
          </span>
        </div>
        <span
          className={`text-gold ml-4 shrink-0 text-lg transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>

      <div ref={bodyRef} style={{ height: 0, overflow: "hidden" }}>
        <div ref={innerRef} className="pb-5 pl-8">
          <div className="flex gap-4">
            <span
              className="text-gold/60 text-sm font-light shrink-0"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              A
            </span>
            <p className="text-cream/50 text-sm leading-relaxed tracking-wide">{a}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      ".faq-inner",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#faq",
          start: "top 75%",
        },
      }
    );
  }, []);

  return (
    <section
      id="faq"
      className="py-28 px-6"
      style={{ background: "#0a0a0a" }}
    >
      <div className="max-w-3xl mx-auto">
        <SectionHeading en="FAQ" ja="よくあるご質問" />

        <div
          className="faq-inner border border-gold/20 p-8 md:p-12"
          style={{ background: "rgba(255,255,255,0.015)" }}
        >
          {faqs.map((item, i) => (
            <FAQItem key={i} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
