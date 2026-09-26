"use client";

import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { useLanguage } from "./LanguageProvider";
import {
  Bot,
  Zap,
  Mic,
  Database,
  Cpu,
  Sparkles,
  Layers,
  ArrowUpRight,
} from "lucide-react";

const serviceConfigs = [
  {
    icon: Bot,
    tech: ["OpenAI", "Claude", "Gemini", "n8n"],
    color: "#3b82f6",
    gradient: "from-blue-500/20 via-indigo-500/10 to-transparent",
    borderGlow: "group-hover:border-blue-500/50",
    badgeBg: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    shadow: "shadow-blue-500/10",
  },
  {
    icon: Zap,
    tech: ["n8n", "Make", "Zapier", "APIs"],
    color: "#f59e0b",
    gradient: "from-amber-500/20 via-yellow-500/10 to-transparent",
    borderGlow: "group-hover:border-amber-500/50",
    badgeBg: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    shadow: "shadow-amber-500/10",
  },
  {
    icon: Mic,
    tech: ["VAPI", "ElevenLabs", "Twilio", "OpenAI"],
    color: "#06b6d4",
    gradient: "from-cyan-500/20 via-teal-500/10 to-transparent",
    borderGlow: "group-hover:border-cyan-500/50",
    badgeBg: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
    shadow: "shadow-cyan-500/10",
  },
  {
    icon: Database,
    tech: ["Supabase", "Vector DB", "LangChain", "Flowise"],
    color: "#ec4899",
    gradient: "from-pink-500/20 via-rose-500/10 to-transparent",
    borderGlow: "group-hover:border-pink-500/50",
    badgeBg: "bg-pink-500/10 text-pink-500 border-pink-500/20",
    shadow: "shadow-pink-500/10",
  },
  {
    icon: Cpu,
    tech: ["HubSpot", "GoHighLevel", "Airtable", "Google Sheets"],
    color: "#8b5cf6",
    gradient: "from-purple-500/20 via-violet-500/10 to-transparent",
    borderGlow: "group-hover:border-purple-500/50",
    badgeBg: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    shadow: "shadow-purple-500/10",
  },
  {
    icon: Sparkles,
    tech: ["Python", "JavaScript", "Next.js", "PostgreSQL"],
    color: "#10b981",
    gradient: "from-emerald-500/20 via-green-500/10 to-transparent",
    borderGlow: "group-hover:border-emerald-500/50",
    badgeBg: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    shadow: "shadow-emerald-500/10",
  },
];

export default function Services() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === "dark";

  return (
    <section
      id="services"
      className="relative py-28 px-4 overflow-hidden transition-colors duration-500"
      style={{
        background: isDark ? "#090a0f" : "#f8faff",
      }}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-blue-600/15 via-purple-600/15 to-cyan-500/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center flex flex-col items-center"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase backdrop-blur-md border mb-4 ${
              isDark
                ? "bg-blue-500/10 border-blue-500/20 text-blue-400 shadow-lg shadow-blue-500/5"
                : "bg-blue-50 border-blue-200 text-blue-700 shadow-sm"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.services.badge}</span>
          </motion.div>

          <h2 className={`text-3xl md:text-5xl font-extrabold mb-4 tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
            {t.services.titleStart} <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500">{t.services.titleGradient}</span>
          </h2>
          <p className={`text-base md:text-lg max-w-2xl mx-auto leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            {t.services.subtitle}
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceConfigs.map((config, index) => {
            const item = t.services.items[index];
            const Icon = config.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
                className={`group relative p-7 rounded-2xl border backdrop-blur-xl ${config.borderGlow} transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                  isDark
                    ? `bg-[#0f111a]/80 border-slate-800/80 shadow-xl ${config.shadow}`
                    : `bg-white border-slate-200/90 shadow-lg shadow-slate-200/60`
                }`}
              >
                {/* Hover Background Gradient Radial */}
                <div
                  className={`absolute -top-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-br ${config.gradient} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                />

                <div>
                  {/* Top bar with Icon & Tag */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-3deg] shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${config.color}25 0%, ${config.color}10 100%)`,
                        border: `1px solid ${config.color}40`,
                        boxShadow: `0 4px 20px ${config.color}20`,
                      }}
                    >
                      <Icon className="w-6 h-6" style={{ color: config.color }} />
                    </div>

                    <span className={`text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-md border ${config.badgeBg}`}>
                      {item.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className={`text-xl font-bold mb-2.5 transition-colors flex items-center justify-between ${
                    isDark ? "text-white group-hover:text-blue-300" : "text-slate-900 group-hover:text-blue-600"
                  }`}>
                    <span>{item.title}</span>
                    <ArrowUpRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 ${
                      isDark ? "text-slate-400" : "text-slate-500"
                    }`} />
                  </h3>
                  
                  <p className={`text-sm leading-relaxed ${item.badges ? "mb-4" : "mb-6"} ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                    {item.description}
                  </p>

                  {/* Optional Feature Badges */}
                  {item.badges && (
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {item.badges.map((b, bIdx) => (
                        <span
                          key={bIdx}
                          className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border backdrop-blur-sm ${config.badgeBg}`}
                        >
                          • {b}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Tech Pills at bottom */}
                <div className={`pt-4 border-t flex flex-wrap gap-1.5 ${isDark ? "border-slate-800/60" : "border-slate-100"}`}>
                  {config.tech.map((techName, idx) => (
                    <span
                      key={idx}
                      className={`text-[11px] font-medium px-2 py-0.5 rounded-md border transition-colors ${
                        isDark
                          ? "bg-slate-900/90 text-slate-400 border-slate-800/80 group-hover:border-slate-700/80"
                          : "bg-slate-100 text-slate-700 border-slate-200"
                      }`}
                    >
                      {techName}
                    </span>
                  ))}
                </div>

                {/* Bottom Glowing Accent Line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${config.color}, transparent)`,
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


