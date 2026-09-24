"use client";

import { localeLabels, supportedLocales, type Locale } from "@/lib/platform-data";
import { useLanguage } from "@/components/language-provider";

export function LanguageSelector() {
  const { locale, setLocale, copy } = useLanguage();
  return <label className="language-selector">
    <span className="sr-only">{copy.language}</span>
    <span aria-hidden="true">{localeLabels[locale].flag}</span>
    <select value={locale} onChange={(event) => setLocale(event.target.value as Locale)} aria-label={copy.language}>
      {supportedLocales.map((item) => <option value={item} key={item}>{localeLabels[item].flag} {localeLabels[item].label}</option>)}
    </select>
  </label>;
}
