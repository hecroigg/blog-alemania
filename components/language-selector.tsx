"use client";

import { useRef } from "react";
import { localeLabels, supportedLocales, type Locale } from "@/lib/platform-data";
import { useLanguage } from "@/components/language-provider";

export function LanguageSelector() {
  const { locale, setLocale, copy } = useLanguage();
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const choose = (next: Locale) => {
    setLocale(next);
    detailsRef.current?.removeAttribute("open");
  };

  return <details className="language-selector" ref={detailsRef}>
    <summary aria-label={`${copy.language}: ${localeLabels[locale].label}`}>
      <span className="language-globe" aria-hidden="true">◎</span>
      <span className="language-code">{locale.toUpperCase()}</span>
      <span className="language-chevron" aria-hidden="true">⌄</span>
    </summary>
    <div className="language-menu" role="listbox" aria-label={copy.language}>
      <span className="language-menu-title">{copy.language}</span>
      {supportedLocales.map((item) => <button
        type="button"
        role="option"
        aria-selected={locale === item}
        className={locale === item ? "is-active" : ""}
        onClick={() => choose(item)}
        key={item}
      >
        <span aria-hidden="true">{localeLabels[item].flag}</span>
        <span>{localeLabels[item].label}</span>
        <small>{item.toUpperCase()}</small>
      </button>)}
    </div>
  </details>;
}
