"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type Particle = {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      alpha: number;
      da: number;
    };

    const particles: Particle[] = Array.from({ length: 80 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.4 - 0.1,
      alpha: Math.random(),
      da: (Math.random() - 0.5) * 0.005,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.da;
        if (p.alpha <= 0 || p.alpha >= 1) p.da *= -1;
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,175,55,${p.alpha * 0.6})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // GSAP entrance
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.4 });

    tl.fromTo(
      taglineRef.current,
      { opacity: 0, letterSpacing: "0.6em" },
      { opacity: 1, letterSpacing: "0.3em", duration: 1.4, ease: "power3.out" }
    )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 60, skewY: 4 },
        { opacity: 1, y: 0, skewY: 0, duration: 1.4, ease: "expo.out" },
        "-=0.8"
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        "-=0.6"
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(
        scrollHintRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        "-=0.2"
      );
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 60%, #1a1400 0%, #0a0a0a 70%)",
      }}
    >
      {/* Gold vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.8) 100%)",
        }}
      />

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Horizontal gold line */}
      <div
        className="absolute top-1/2 left-0 right-0 pointer-events-none"
        style={{
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(212,175,55,0.15), transparent)",
          transform: "translateY(-120px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p
          ref={taglineRef}
          className="text-gold text-xs tracking-[0.3em] uppercase mb-8 opacity-0"
        >
          Premium Esthetic Salon
        </p>

        <h1
          ref={titleRef}
          className="opacity-0 mb-6"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          <span
            className="block text-shine"
            style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)", lineHeight: 1, letterSpacing: "0.15em", fontWeight: 300 }}
          >
            LUMIÈRE
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="opacity-0 text-cream/50 text-sm md:text-base tracking-[0.15em] leading-loose mb-12 max-w-lg mx-auto"
        >
          光のように、あなたの素肌を輝かせる。
          <br />
          完全予約制のプレミアムフェイシャル＆ボディケア
        </p>

        <div ref={ctaRef} className="opacity-0 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#reservation"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#reservation")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative inline-flex items-center justify-center px-10 py-4 overflow-hidden border border-gold text-gold text-sm tracking-[0.3em] uppercase transition-all duration-500 hover:text-obsidian"
          >
            <span className="absolute inset-0 bg-gold transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            <span className="relative">無料体験予約</span>
          </a>
          <a
            href="#campaign"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#campaign")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center justify-center px-10 py-4 text-sm tracking-[0.3em] uppercase text-cream/50 hover:text-gold transition-colors duration-300"
          >
            初回キャンペーン →
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-0"
      >
        <span className="text-xs tracking-[0.3em] text-cream/30 uppercase">Scroll</span>
        <div className="w-px h-12 overflow-hidden">
          <div
            className="w-full h-full bg-gradient-to-b from-gold to-transparent"
            style={{ animation: "scrollLine 2s ease-in-out infinite" }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </section>
  );
}
