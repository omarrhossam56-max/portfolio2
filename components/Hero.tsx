"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin, Globe, Sparkles } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import gsap from "gsap";
import { smoothScrollTo } from "./SmoothScroll";

export default function Hero() {
  const { t, language, isRTL } = useLanguage();

  const isAr = language === "ar";

  const stats = [
    { val: t.hero.stat1Value, label: t.hero.stat1Label },
    { val: t.hero.stat2Value, label: t.hero.stat2Label },
    { val: t.hero.stat3Value, label: t.hero.stat3Label },
    { val: t.hero.stat4Value, label: t.hero.stat4Label },
  ];

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    const btn = e.currentTarget;
    gsap.fromTo(
      btn,
      { scale: 0.93 },
      { scale: 1, duration: 0.35, ease: "back.out(2)" }
    );
    smoothScrollTo(target, { offset: -85, duration: 1.4 });
  };

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: "#0d0905",
      }}
    >
      {/* ── Ambient luxury lighting glows ── */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 w-[650px] h-[650px] rounded-full opacity-35"
        style={{
          background:
            "radial-gradient(circle, rgba(107, 31, 31, 0.45) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute top-1/3 -right-32 w-[550px] h-[550px] rounded-full opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgba(181, 128, 74, 0.25) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 left-1/4 w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(139, 32, 32, 0.3) 0%, transparent 70%)",
        }}
      />

      {/* ── Subtle background grid pattern ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #f0e6d6 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-28 sm:pt-32 pb-12 sm:pb-16 flex flex-col gap-8 sm:gap-10">
        
        {/* ── Top Bar: Role badge + Locations ── */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between border-b pb-4"
          style={{ borderColor: "rgba(181, 128, 74, 0.18)" }}
        >
          <div className="flex items-center gap-2.5">
            <span
              className="inline-block w-2.5 h-2.5 rounded-full animate-pulse"
              style={{ background: "#b5804a", boxShadow: "0 0 10px #b5804a" }}
            />
            <span
              className="text-[11px] sm:text-xs font-bold tracking-[0.24em] uppercase"
              style={{ color: "#d4a06a" }}
            >
              {t.hero.role}
            </span>
          </div>

          <div
            className="flex items-center gap-4 text-xs font-semibold tracking-wider uppercase"
            style={{ color: "#a89076" }}
          >
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#b5804a]" />
              <span>{t.hero.basedIn}</span>
            </span>
            <span style={{ color: "rgba(181, 128, 74, 0.4)" }}>·</span>
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#b5804a]" />
              <span>{t.hero.workingWorldwide}</span>
            </span>
          </div>
        </motion.div>

        {/* ── Middle Editorial Row: Identity & Value Headline on Left / Detailed Bio Card on Right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column (7 cols): Name, Role, Value Headline, CTAs */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-7 flex flex-col items-start gap-5"
          >
            {/* Name & Role Badge */}
            <div className="space-y-2.5">
              <h1
                className="font-serif font-black tracking-tight leading-none"
                style={{
                  fontSize: "clamp(34px, 5vw, 62px)",
                  color: "#f0e6d6",
                  letterSpacing: isAr ? "0" : "-0.02em",
                }}
              >
                {t.hero.name}
              </h1>

              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-[0.2em] uppercase"
                style={{
                  background: "rgba(181, 128, 74, 0.1)",
                  border: "1px solid rgba(181, 128, 74, 0.28)",
                  color: "#d4a06a",
                }}
              >
                <Sparkles className="w-3 h-3 text-[#b5804a]" />
                <span>{t.hero.role}</span>
              </div>
            </div>

            {/* Headline */}
            <h2
              className="font-sans font-extrabold uppercase leading-[1.2] tracking-tight"
              style={{
                fontSize: "clamp(20px, 2.7vw, 32px)",
                color: "#f0e6d6",
              }}
            >
              {t.hero.headlineLine1}
              <br />
              <span
                style={{
                  background: "linear-gradient(90deg, #d4a06a 0%, #b5804a 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {t.hero.headlineGradient}
              </span>
            </h2>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <a
                href="#contact"
                onClick={(e) => handleCtaClick(e, "#contact")}
                className="inline-flex items-center gap-3 font-bold text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 group px-6 py-3.5 rounded-md hover:brightness-110 active:scale-95 cursor-pointer"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(181,128,74,0.22) 0%, rgba(107,31,31,0.25) 100%)",
                  border: "1px solid rgba(181, 128, 74, 0.5)",
                  color: "#f0e6d6",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                }}
              >
                <span>{t.hero.ctaSecondary}</span>
                <ArrowRight className="w-4 h-4 text-[#b5804a] transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <a
                href="#workflows"
                onClick={(e) => handleCtaClick(e, "#workflows")}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors px-5 py-3.5 rounded-md border hover:border-[#b5804a] cursor-pointer"
                style={{
                  borderColor: "rgba(181, 128, 74, 0.25)",
                  color: "#d4a06a",
                  background: "rgba(181, 128, 74, 0.05)",
                }}
              >
                <Sparkles className="w-4 h-4 text-[#b5804a]" />
                <span>{t.hero.ctaPrimary}</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column (5 cols): 2 Bio Paragraphs Card + Details */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <div
              className="p-6 sm:p-7 rounded-2xl relative overflow-hidden"
              style={{
                background: "rgba(22, 16, 12, 0.65)",
                border: "1px solid rgba(181, 128, 74, 0.22)",
                backdropFilter: "blur(16px)",
                boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
              }}
            >
              {/* Subtle accent corner glow */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none opacity-20"
                style={{ background: "radial-gradient(circle, #b5804a 0%, transparent 70%)" }}
              />

              <p
                className="font-sans leading-relaxed text-sm sm:text-base mb-4 text-[#e2d6c5]"
              >
                {t.hero.subheadline}
              </p>

              <p
                className="font-sans leading-relaxed text-xs sm:text-sm text-[#b5a391]"
              >
                {t.hero.subheadline2}
              </p>

              {/* Location & Status indicators inside card */}
              <div
                className="flex flex-wrap items-center gap-4 pt-4 mt-5 border-t text-xs font-semibold tracking-wider uppercase"
                style={{
                  borderColor: "rgba(181, 128, 74, 0.18)",
                  color: "#a89076",
                }}
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#b5804a] shrink-0" />
                  <span>{t.hero.basedIn}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#b5804a] shrink-0" />
                  <span>{t.hero.workingWorldwide}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Bottom Section: Divider + Stats (No big gap, no core tech block) ── */}
        <div className="pt-2">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
            className="origin-left w-full h-[1px] mb-6"
            style={{
              background:
                "linear-gradient(90deg, rgba(181,128,74,0.4) 0%, rgba(181,128,74,0.12) 60%, transparent 100%)",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {/* 4 Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
              {stats.map((s, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <span
                    className="font-serif font-bold leading-none"
                    style={{
                      fontSize: "clamp(26px, 3.2vw, 40px)",
                      color: "#f0e6d6",
                    }}
                  >
                    {s.val}
                  </span>
                  <span
                    className="font-sans text-[10px] sm:text-xs tracking-wider uppercase font-medium mt-1"
                    style={{ color: "#a89076" }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
