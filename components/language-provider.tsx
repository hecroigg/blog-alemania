"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { supportedLocales, type Locale, uiCopy } from "@/lib/platform-data";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  copy: (typeof uiCopy)[Locale];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const storageKey = "living-germany-language";
type TranslationCatalog = Record<string, string>;

const catalogLoaders: Record<Exclude<Locale, "en">, () => Promise<{ default: TranslationCatalog }>> = {
  es: () => import("@/lib/translations/es.json"),
  de: () => import("@/lib/translations/de.json"),
  fr: () => import("@/lib/translations/fr.json"),
  it: () => import("@/lib/translations/it.json"),
  pt: () => import("@/lib/translations/pt.json"),
  pl: () => import("@/lib/translations/pl.json"),
  uk: () => import("@/lib/translations/uk.json"),
};

const originalText = new WeakMap<Text, string>();
const translatedText = new WeakMap<Text, string>();
const attributeState = new WeakMap<Element, Map<string, { source: string; translated: string }>>();
const translatableAttributes = ["aria-label", "placeholder", "title"] as const;

function replaceKeepingWhitespace(value: string, replacement: string) {
  const leading = value.match(/^\s*/)?.[0] || "";
  const trailing = value.match(/\s*$/)?.[0] || "";
  return `${leading}${replacement}${trailing}`;
}

function translateRoot(root: Node, catalog: TranslationCatalog | null, locale: Locale) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);

  for (const node of nodes) {
    const parent = node.parentElement;
    if (!parent || parent.closest("script, style, noscript, code, pre, [data-no-translate]")) continue;
    const current = node.nodeValue || "";
    const previousTranslation = translatedText.get(node);
    if (!originalText.has(node) || (previousTranslation !== undefined && current !== previousTranslation)) {
      originalText.set(node, current);
    }
    const source = originalText.get(node) || current;
    const key = source.replace(/\s+/g, " ").trim();
    if (parent.tagName === "OPTION" && !parent.hasAttribute("value")) parent.setAttribute("value", key);
    const next = key !== "Living Germany" && catalog?.[key] ? replaceKeepingWhitespace(source, catalog[key]) : source;
    if (current !== next) node.nodeValue = next;
    translatedText.set(node, next);
  }

  const descendants = root instanceof Element || root instanceof Document || root instanceof DocumentFragment ? [...root.querySelectorAll("*")] : [];
  const elements = root instanceof Element ? [root, ...descendants] : descendants;
  for (const element of elements) {
    for (const attribute of translatableAttributes) {
      const current = element.getAttribute(attribute);
      if (!current) continue;
      const state = attributeState.get(element) || new Map<string, { source: string; translated: string }>();
      const previous = state.get(attribute);
      const source = previous && current === previous.translated ? previous.source : current;
      const translated = catalog?.[source] || source;
      element.setAttribute(attribute, translated);
      state.set(attribute, { source, translated });
      attributeState.set(element, state);
    }
    if (element instanceof HTMLTimeElement && element.dateTime) {
      const date = new Date(`${element.dateTime}T12:00:00Z`);
      if (!Number.isNaN(date.valueOf())) element.textContent = new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric" }).format(date);
    }
  }
}

function isLocale(value: string | null): value is Locale {
  return Boolean(value && (supportedLocales as readonly string[]).includes(value));
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, updateLocale] = useState<Locale>("en");
  const observerRef = useRef<MutationObserver | null>(null);
  const originalTitleRef = useRef<string | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    const browser = navigator.language.split("-")[0];
    const next = isLocale(saved) ? saved : isLocale(browser) ? browser : "en";
    document.documentElement.lang = next;
    queueMicrotask(() => updateLocale(next));
  }, []);

  useEffect(() => {
    let cancelled = false;
    observerRef.current?.disconnect();

    const apply = async () => {
      const baseCatalog = locale === "en" ? null : (await catalogLoaders[locale]()).default;
      const navigationCatalog = locale === "en" ? null : Object.fromEntries([
        ...Object.entries(uiCopy.en.navigation).map(([path, label]) => [label, uiCopy[locale].navigation[path]]),
        ["Plan", uiCopy[locale].plan], ["Visas", uiCopy[locale].visa], ["Tools", uiCopy[locale].tools], ["Cities", uiCopy[locale].cities],
      ]);
      const catalog = baseCatalog && navigationCatalog ? { ...baseCatalog, ...navigationCatalog } : null;
      if (cancelled) return;
      if (!originalTitleRef.current) originalTitleRef.current = document.title;
      document.title = catalog?.[originalTitleRef.current] || originalTitleRef.current;
      translateRoot(document.body, catalog, locale);
      document.documentElement.lang = locale;
      observerRef.current = new MutationObserver((mutations) => {
        observerRef.current?.disconnect();
        for (const mutation of mutations) {
          if (mutation.type === "characterData" && mutation.target.parentNode) translateRoot(mutation.target.parentNode, catalog, locale);
          for (const node of mutation.addedNodes) if (node instanceof Element) translateRoot(node, catalog, locale);
        }
        observerRef.current?.observe(document.body, { childList: true, subtree: true, characterData: true });
      });
      observerRef.current.observe(document.body, { childList: true, subtree: true, characterData: true });
    };

    void apply();
    return () => { cancelled = true; observerRef.current?.disconnect(); };
  }, [locale]);

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
