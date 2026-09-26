"use client";

import { motion } from "framer-motion";
import { useLanguage } from "./LanguageProvider";
import {
  Sparkles,
} from "lucide-react";

export default function About() {
  const { t } = useLanguage();
  const isDark = false;

  return (
    <section
      id="about"
      className="relative py-28 px-4 overflow-hidden transition-colors duration-500 scroll-mt-12"
      style={{
        background: isDark ? "#0d0905" : "#f8faff",
      }}
    >
      {/* Ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-blue-600/10 to-indigo-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* ══ Main About Overview ════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase backdrop-blur-md border ${
              isDark
                ? "bg-[#b5804a]/10 border-[#b5804a]/25 text-[#f0e6d6]"
                : "bg-amber-50 border-amber-200 text-amber-800 shadow-sm"
            }`}>
              <Sparkles className="w-3.5 h-3.5 text-[#b5804a]" />
              <span>{t.about.badge}</span>
            </div>

            <h2 className={`font-serif text-3xl md:text-5xl font-bold tracking-tight leading-tight ${
              isDark ? "text-[#f0e6d6]" : "text-slate-900"
            }`}>
              {t.about.titleStart} <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#d4a06a] to-[#b5804a]">{t.about.titleGradient}</span> {t.about.titleEnd}
            </h2>

            <p className={`text-base md:text-lg leading-relaxed ${isDark ? "text-slate-300" : "text-slate-700"}`}>
              {t.about.paragraph1}
            </p>

            <p className={`text-sm md:text-base leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
              {t.about.paragraph2}
            </p>

            <div className={`pt-2 flex flex-wrap gap-6 text-sm font-semibold ${isDark ? "text-slate-300" : "text-slate-700"}`}>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#b5804a" }} />
                <span>{t.about.bullets[0]}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#b5804a" }} />
                <span>{t.about.bullets[1]}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#b5804a" }} />
                <span>{t.about.bullets[2]}</span>
              </div>
            </div>
          </motion.div>

          {/* Right Highlight Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`lg:col-span-5 p-8 rounded-2xl border backdrop-blur-2xl relative overflow-hidden ${
              isDark
                ? "bg-[#140e0a]/90 border-[#b5804a]/25 shadow-2xl"
                : "bg-white border-slate-200 shadow-xl shadow-slate-200/50"
            }`}
          >
            <div className="space-y-6">
              <div className={`text-xs font-mono uppercase tracking-widest border-b pb-3 ${
                isDark ? "text-[#b5804a] border-[#b5804a]/20" : "text-amber-700 border-slate-200"
              }`}>
                // Engineering Principle
              </div>

              <blockquote className={`font-serif text-lg italic leading-relaxed ${isDark ? "text-[#f0e6d6]" : "text-slate-800"}`}>
                &ldquo;{t.about.quote}&rdquo;
              </blockquote>

              <div className="space-y-3 pt-2">
                <div className={`flex items-center justify-between text-xs border-b pb-2 ${
                  isDark ? "text-[#a89076] border-[#b5804a]/15" : "text-slate-600 border-slate-200"
                }`}>
                  <span>{t.about.standardLabel}</span>
                  <span className="font-bold text-[#f0e6d6]">{t.about.standardVal}</span>
                </div>
                <div className={`flex items-center justify-between text-xs border-b pb-2 ${
                  isDark ? "text-[#a89076] border-[#b5804a]/15" : "text-slate-600 border-slate-200"
                }`}>
                  <span>{t.about.capLabel}</span>
                  <span className="font-bold text-[#b5804a]">{t.about.capVal}</span>
                </div>
                <div className={`flex items-center justify-between text-xs ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}>
                  <span>{t.about.delLabel}</span>
                  <span className="font-bold text-amber-500">{t.about.delVal}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}


