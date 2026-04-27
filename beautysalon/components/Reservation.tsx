"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "./SectionHeading";

const menuOptions = [
  "初回体験フェイシャル（¥5,500）",
  "初回体験ボディスリミング（¥7,700）",
  "トータルビューティープラン（¥11,000）",
  "ディープクレンジングフェイシャル",
  "美白ホワイトニングケア",
  "エイジングリフトアップ",
  "プレミアムルミエールフェイシャル",
  "リンパドレナージュ",
  "セルライトスリミング",
  "ボディラップ痩身",
];

const timeSlots = [
  "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00",
];

export default function Reservation() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    kana: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    menu: "",
    message: "",
  });

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(
      ".reservation-inner",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#reservation",
          start: "top 70%",
        },
      }
    );
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    gsap.to(formRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.4,
      onComplete: () => setSubmitted(true),
    });
  };

  const inputClass =
    "w-full bg-transparent border-b border-gold/25 py-3 text-cream/80 text-sm tracking-wide placeholder:text-cream/20 focus:outline-none focus:border-gold transition-colors duration-300";

  const labelClass = "block text-xs tracking-[0.2em] text-cream/40 uppercase mb-2";

  return (
    <section
      id="reservation"
      className="py-28 px-6"
      style={{
        background: "linear-gradient(180deg, #0a0a0a 0%, #0e0c07 60%, #0a0a0a 100%)",
      }}
    >
      <div className="max-w-2xl mx-auto">
        <SectionHeading en="Reservation" ja="ご予約" />

        <div className="reservation-inner">
          {submitted ? (
            <div className="text-center py-16 border border-gold/20">
              <div className="text-gold text-4xl mb-6" style={{ fontFamily: "var(--font-serif)" }}>
                ✦
              </div>
              <h3
                className="text-cream text-2xl font-light tracking-[0.1em] mb-4"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                ご予約ありがとうございます
              </h3>
              <p className="text-cream/50 text-sm leading-relaxed tracking-wide">
                24時間以内に確認のご連絡をさせていただきます。
                <br />
                ご不明な点はお電話にてお問い合わせください。
              </p>
            </div>
          ) : (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="border border-gold/20 p-8 md:p-12 space-y-8"
              style={{ background: "rgba(255,255,255,0.015)" }}
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className={labelClass}>お名前 *</label>
                  <input
                    name="name"
                    required
                    placeholder="山田 花子"
                    value={form.name}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>フリガナ *</label>
                  <input
                    name="kana"
                    required
                    placeholder="ヤマダ ハナコ"
                    value={form.kana}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className={labelClass}>電話番号 *</label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    placeholder="090-0000-0000"
                    value={form.phone}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>メールアドレス *</label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="example@email.com"
                    value={form.email}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>ご希望メニュー *</label>
                <select
                  name="menu"
                  required
                  value={form.menu}
                  onChange={handleChange}
                  className={`${inputClass} cursor-pointer`}
                  style={{ WebkitAppearance: "none" }}
                >
                  <option value="" className="bg-charcoal">
                    メニューを選択してください
                  </option>
                  {menuOptions.map((m) => (
                    <option key={m} value={m} className="bg-charcoal">
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className={labelClass}>ご希望日 *</label>
                  <input
                    name="date"
                    type="date"
                    required
                    value={form.date}
                    onChange={handleChange}
                    className={inputClass}
                    style={{ colorScheme: "dark" }}
                  />
                </div>
                <div>
                  <label className={labelClass}>ご希望時間 *</label>
                  <select
                    name="time"
                    required
                    value={form.time}
                    onChange={handleChange}
                    className={`${inputClass} cursor-pointer`}
                    style={{ WebkitAppearance: "none" }}
                  >
                    <option value="" className="bg-charcoal">
                      時間を選択
                    </option>
                    {timeSlots.map((t) => (
                      <option key={t} value={t} className="bg-charcoal">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClass}>ご要望・ご質問（任意）</label>
                <textarea
                  name="message"
                  rows={3}
                  placeholder="気になるお悩みや質問があればお気軽にどうぞ..."
                  value={form.message}
                  onChange={handleChange}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div className="pt-4 text-center">
                <button
                  type="submit"
                  className="group relative inline-flex items-center justify-center w-full sm:w-auto px-16 py-4 overflow-hidden border border-gold text-gold text-sm tracking-[0.3em] uppercase transition-all duration-500 hover:text-obsidian"
                >
                  <span className="absolute inset-0 bg-gold transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                  <span className="relative">予約を申し込む</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
