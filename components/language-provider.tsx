"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supportedLocales, type Locale, uiCopy } from "@/lib/platform-data";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  copy: (typeof uiCopy)[Locale];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const storageKey = "living-germany-language";

function isLocale(value: string | null): value is Locale {
  return Boolean(value && (supportedLocales as readonly string[]).includes(value));
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, updateLocale] = useState<Locale>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    const browser = navigator.language.split("-")[0];
    const next = isLocale(saved) ? saved : isLocale(browser) ? browser : "en";
    document.documentElement.lang = next;
    queueMicrotask(() => updateLocale(next));
  }, []);

  const value = useMemo<LanguageContextValue>(() => ({
    locale,
    setLocale: (next) => {
      updateLocale(next);
      window.localStorage.setItem(storageKey, next);
      document.documentElement.lang = next;
    },
    copy: uiCopy[locale],
  }), [locale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
