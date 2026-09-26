"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Language, translations } from "@/lib/translations";

interface LanguageContextValue {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
  t: typeof translations["en"];
}

const LanguageContext = createContext<LanguageContextValue>({
  language: "en",
  toggleLanguage: () => {},
  setLanguage: () => {},
  isRTL: false,
  t: translations.en,
});

export function useLanguage() {
  return useContext(LanguageContext);
}

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Language | null;
    const initial = saved === "ar" ? "ar" : "en";
    setLanguageState(initial);
    document.documentElement.setAttribute("dir", initial === "ar" ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", initial);
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("lang", lang);
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", lang);
  };

  const toggleLanguage = () => {
    const next: Language = language === "en" ? "ar" : "en";
    setLanguage(next);
  };

  const isRTL = language === "ar";
  const t = translations[language];

  if (!mounted) return null;

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage, isRTL, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
