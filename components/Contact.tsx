"use client";

import { motion } from "framer-motion";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useLanguage } from "./LanguageProvider";

export default function Contact() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === "dark";

  const contactMethods = [
    {
      title: t.contact.methods[0].title,
      subtitle: t.contact.methods[0].subtitle,
      cta: t.contact.methods[0].cta,
      href: "mailto:OMAR7OSSAM1212@gmail.com",
      icon: <Mail className="w-6 h-6" />,
      accent: "#b5804a",
    },
    {
      title: t.contact.methods[1].title,
      subtitle: t.contact.methods[1].subtitle,
      cta: t.contact.methods[1].cta,
      href: "https://wa.me/201023262320",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className="w-6 h-6">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      accent: "#25D366",
    },
    {
      title: t.contact.methods[2].title,
      subtitle: t.contact.methods[2].subtitle,
      cta: t.contact.methods[2].cta,
      href: "https://www.linkedin.com/in/omar-hossam-b985a7387/",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className="w-6 h-6">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      accent: "#0A66C2",
    },
  ];

  return (
    <section id="contact" className="relative py-32 px-4 overflow-hidden scroll-mt-12">
      {/* Background matching Hero/Section 1 */}
      <div
        className="absolute inset-0 transition-colors duration-500"
        style={{
          background: isDark
            ? "linear-gradient(180deg, #0d0905 0%, #100c08 100%)"
            : "linear-gradient(180deg, #fdf8f3 0%, #f5ede0 100%)",
        }}
      />
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: isDark ? "rgba(181,128,74,0.07)" : "rgba(181,128,74,0.1)" }}
      />

      <div className="relative max-w-5xl mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          {/* Eyebrow badge — matching Hero style */}
          <span
            className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.28em] uppercase mb-4"
            style={{ color: "#b5804a" }}
          >
            {t.contact.eyebrow}
          </span>

          <h2
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
            style={{ color: isDark ? "#f0e6d6" : "#1a0f00" }}
          >
            {t.contact.titleStart}{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(to right, #d4a06a, #b5804a)" }}
            >
              {t.contact.titleGradient}
            </span>
          </h2>

          <p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8"
            style={{ color: isDark ? "#a89076" : "#6b4c2a" }}
          >
            {t.contact.subtitle}
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center items-center gap-3">
            {t.contact.trustBadges.map((badge, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, y: 15, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.15 + idx * 0.1 }}
                whileHover={{ scale: 1.06, y: -2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold backdrop-blur-md border cursor-default transition-colors duration-300 relative overflow-hidden group"
                style={{
                  background: isDark ? "rgba(181,128,74,0.1)" : "rgba(181,128,74,0.08)",
                  borderColor: isDark ? "rgba(181,128,74,0.25)" : "rgba(181,128,74,0.3)",
                  color: isDark ? "#f0e6d6" : "#7a4f1e",
                }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: idx * 0.5 }}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: "#b5804a" }} />
                </motion.div>
                <span>{badge}</span>
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {contactMethods.map((method, index) => (
            <motion.a
              key={index}
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative p-6 rounded-2xl flex flex-col items-center text-center border transition-all duration-300 overflow-hidden"
              style={{
                background: isDark ? "rgba(20,14,10,0.9)" : "rgba(255,250,245,0.95)",
                borderColor: isDark ? "rgba(181,128,74,0.2)" : "rgba(181,128,74,0.25)",
                boxShadow: isDark ? "0 4px 24px rgba(0,0,0,0.3)" : "0 4px 24px rgba(181,128,74,0.08)",
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(ellipse at top, ${method.accent}10 0%, transparent 70%)` }}
              />

              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-5 border group-hover:scale-110 transition-transform duration-300"
                style={{
                  background: isDark ? "rgba(181,128,74,0.08)" : "rgba(181,128,74,0.06)",
                  borderColor: isDark ? "rgba(181,128,74,0.2)" : "rgba(181,128,74,0.2)",
                  color: method.accent,
                }}
              >
                {method.icon}
              </div>

              <h3
                className="text-xl font-bold mb-1"
                style={{ color: isDark ? "#f0e6d6" : "#1a0f00" }}
              >
                {method.title}
              </h3>
              <p
                className="text-sm mb-6"
                style={{ color: isDark ? "#a89076" : "#6b4c2a" }}
              >
                {method.subtitle}
              </p>

              <div
                className="mt-auto flex items-center space-x-2 text-sm font-semibold transition-colors"
                style={{ color: "#b5804a" }}
              >
                <span>{method.cta}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
