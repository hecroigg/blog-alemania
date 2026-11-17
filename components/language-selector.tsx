"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { localeLabels, searchLocales, type Locale } from "@/lib/platform-data";
import { useLanguage } from "@/components/language-provider";
import { switchLocalizedPath } from "@/lib/exact-guide-routes";

export function LanguageSelector() {
  const { locale, copy } = useLanguage();
  const pathname = usePathname();
  const routeLanguage = pathname.split("/").filter(Boolean)[0];
  const activeLanguage = searchLocales.find((item) => item === routeLanguage) || (pathname === "/" ? "en" : locale);
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const choose = (next: Locale) => {
    const localizedPath = switchLocalizedPath(pathname, next);
    window.localStorage.setItem("living-germany-language", next);
    detailsRef.current?.removeAttribute("open");
    if (localizedPath !== pathname) window.location.assign(localizedPath);
  };
  useEffect(() => {
    const close = (event: PointerEvent) => {
      if (detailsRef.current?.open && !detailsRef.current.contains(event.target as Node)) detailsRef.current.open = false;
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && detailsRef.current) detailsRef.current.open = false;
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return <details className="language-selector" ref={detailsRef}>
    <summary aria-label={`${copy.language}: ${localeLabels[activeLanguage].label}`}>
      <span className="language-globe" aria-hidden="true">◎</span>
      <span className="language-code">{activeLanguage.toUpperCase()}</span>
      <span className="language-chevron" aria-hidden="true">⌄</span>
    </summary>
    <div className="language-menu" role="listbox" aria-label={copy.language}>
      <span className="language-menu-title">{copy.language}</span>
      {searchLocales.map((item) => <button
        type="button"
        role="option"
        aria-selected={activeLanguage === item}
        className={locale === item ? "is-active" : ""}
        onClick={() => choose(item)}
        key={item}
      >
        <span aria-hidden="true">{localeLabels[item].flag}</span>
        <span data-no-translate>{localeLabels[item].label}</span>
        <small>{item.toUpperCase()}</small>
      </button>)}
    </div>
  </details>;
}
