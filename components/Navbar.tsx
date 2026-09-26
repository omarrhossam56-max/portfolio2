"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Layers,
  User,
  Mail,
  Globe,
} from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { smoothScrollTo } from "./SmoothScroll";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  const navLinks = [
    { href: "#workflows", label: t.nav.workflows, id: "workflows", icon: Layers },
    { href: "#about", label: t.nav.about, id: "about", icon: User },
    { href: "#contact", label: t.nav.contact, id: "contact", icon: Mail },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === "#") {
      smoothScrollTo("top", { duration: 1.2 });
      setActiveSection("");
      return;
    }
    if (href.startsWith("#")) {
      const targetId = href.substring(1);
      smoothScrollTo(href, { offset: -85, duration: 1.3 });
      setActiveSection(targetId);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sy = window.scrollY;
      setScrolled(sy > 30);

      // scroll progress 0..1
      const docH = document.body.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? sy / docH : 0);

      if (window.innerHeight + Math.round(sy) >= document.body.offsetHeight - 10) {
        setActiveSection("contact");
      }
    };

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        }),
      { rootMargin: "-40% 0px -60% 0px" }
    );

    document.querySelectorAll("section[id]").forEach((s) => observer.observe(s));
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* ── colour tokens (Locked to the reference image luxury cream palette) ── */
  const glassColor = "rgba(245, 237, 224, 0.92)";
  const borderColor = "rgba(139, 69, 19, 0.18)";
  const shadowColor = "0 8px 32px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(139, 69, 19, 0.10)";
  const textPrimary = "#1a0f08";
  const textMuted = "#5a3f2a";

  return (
    <>
      {/* ── Scroll-progress bar (top of page) ── */}
      <motion.div
        className="fixed top-0 left-0 z-[60] h-[2px] origin-left"
        style={{
          scaleX: scrollProgress,
          background: "linear-gradient(90deg, #6b1f1f, #b5804a, #d4a06a)",
          boxShadow: "0 0 10px rgba(181,128,74,0.8)",
        }}
      />

      {/* ── Main Nav ── */}
      <motion.header
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4"
      >
        <motion.nav
          animate={{
            boxShadow: scrolled ? shadowColor : "none",
            backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "blur(14px)",
            width: scrolled ? "min(1080px, 95vw)" : "min(1150px, 98vw)",
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{
            background: glassColor,
            border: `1px solid ${borderColor}`,
            borderRadius: "1.25rem",
          }}
          className="w-full"
        >
          <div className="flex items-center justify-between px-5 h-[64px]">
            {/* ── Logo ── */}
            <a
              href="#"
              onClick={(e) => handleNavClick(e, "#")}
              className="flex items-center gap-3 group shrink-0"
            >
              {/* Clean Transparent Arrow Logo Mark */}
              <div className="relative flex items-center justify-center bg-transparent">
                <img
                  src="/logo_perfect.png"
                  alt="Omar Hossam Logo"
                  className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <div className="flex flex-col leading-none">
                <span
                  className="font-black text-base tracking-tight transition-colors duration-200 font-sans"
                  style={{ color: textPrimary, fontFamily: "'Playfair Display', serif" }}
                >
                  Omar Hossam
                </span>
                <span
                  className="text-[9.5px] font-bold uppercase tracking-[0.22em] mt-[3px] flex items-center gap-1 transition-colors"
                  style={{ color: "#b5804a" }}
                >
                  AI&nbsp;Automation
                </span>
              </div>
            </a>

            {/* ── Desktop Links ── */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(({ href, label, id, icon: Icon }) => {
                const isActive = activeSection === id;
                return (
                  <a
                    key={id}
                    href={href}
                    onClick={(e) => handleNavClick(e, href)}
                    className="relative px-4 py-2 rounded-xl text-[13.5px] font-medium transition-colors duration-200 group flex items-center gap-1.5"
                    style={{ color: isActive ? "#d4a06a" : textMuted }}
                  >
                    {/* animated pill background */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-xl"
                        style={{
                          background: "rgba(181,128,74,0.12)",
                          border: "1px solid rgba(181,128,74,0.30)",
                        }}
                        transition={{ type: "spring", stiffness: 380, damping: 34 }}
                      />
                    )}
                    <Icon className={`w-3.5 h-3.5 relative z-10 transition-colors ${isActive ? "text-[#d4a06a]" : "opacity-60 group-hover:opacity-100 group-hover:text-[#d4a06a]"}`} />
                    <span className="relative z-10 group-hover:text-[#d4a06a] transition-colors duration-200 font-semibold">
                      {label}
                    </span>
                  </a>
                );
              })}
            </div>

            {/* ── Right Actions ── */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Language Toggle Button */}
              <button
                onClick={toggleLanguage}
                aria-label="Toggle Language"
                className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 hover:scale-105 active:scale-95 group relative overflow-hidden"
                style={{
                  background: "rgba(0, 0, 0, 0.05)",
                  border: `1px solid ${borderColor}`,
                  color: textPrimary,
                }}
              >
                <Globe className="w-4 h-4 group-hover:rotate-45 transition-transform" style={{ color: "#b5804a" }} />
                <span>{language === "en" ? "عربي" : "EN"}</span>
              </button>

              {/* Mobile hamburger */}
              <button
                className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200 hover:scale-105"
                style={{
                  background: "rgba(0, 0, 0, 0.05)",
                  border: `1px solid ${borderColor}`,
                  color: textMuted,
                }}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={menuOpen ? "x" : "menu"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    {menuOpen ? <X className="w-5 h-5 text-[#1a0f08]" /> : <Menu className="w-5 h-5 text-[#1a0f08]" />}
                  </motion.div>
                </AnimatePresence>
              </button>
            </div>
          </div>

          {/* ── Mobile Menu ── */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.28, ease: "easeInOut" }}
                className="overflow-hidden md:hidden"
              >
                <div
                  className="px-5 pb-5 pt-2 flex flex-col gap-1 border-t"
                  style={{ borderColor }}
                >
                  {navLinks.map(({ href, label, id, icon: Icon }, i) => (
                    <motion.a
                      key={id}
                      href={href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      onClick={(e) => {
                        handleNavClick(e, href);
                        setMenuOpen(false);
                      }}
                      className="px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-3"
                      style={{
                        color: activeSection === id ? "#b5804a" : textMuted,
                        background: activeSection === id ? "rgba(181,128,74,0.10)" : "transparent",
                      }}
                    >
                      <Icon className="w-4 h-4" style={{ color: "#b5804a" }} />
                      <span>{label}</span>
                    </motion.a>
                  ))}

                  <div className="flex flex-col gap-2 mt-3 pt-2 border-t" style={{ borderColor }}>
                    <button
                      onClick={toggleLanguage}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                      style={{
                        background: "rgba(0, 0, 0, 0.05)",
                        border: `1px solid ${borderColor}`,
                        color: textPrimary,
                      }}
                    >
                      <Globe className="w-4 h-4 text-[#b5804a]" />
                      <span>{language === "en" ? "التحويل للعربية" : "Switch to English"}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </motion.header>
    </>
  );
}

