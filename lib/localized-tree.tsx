import { cloneElement, isValidElement, type ReactNode, type ReactElement } from "react";
import { JsonLd } from "@/components/json-ld";
import { SafetyNotice, SourceStamp } from "@/components/source-stamp";
import { exactGuideSlugs, type ExactGuideKey } from "@/lib/exact-guide-slugs";
import { generalEnglishGuides, localizedGeneralPath } from "@/lib/content/localized-general-guides";
import { practicalGuideKeyFromSlug, practicalGuidePath } from "@/lib/content/guides/practical-systems-localized";
import { exactGuidePath } from "@/lib/exact-guide-routes";
import {
  type SiteLocale, hubUrl, cityUrl, sectionPath, toolUrl, otherUrl,
  type ToolId, type OtherPageId, toolIds, toolFromSlug, cityFromSlug,
} from "@/lib/locale-paths";
import esCatalog from "@/lib/translations/es.json";
import deCatalog from "@/lib/translations/de.json";
const catalogs = { es: esCatalog as Record<string, string>, de: deCatalog as Record<string, string> };
const existingGeneral = new Set(generalEnglishGuides.map((guide) => guide.slug));

export function translatedString(locale: SiteLocale, value: string, supplemental?: Partial<Record<SiteLocale, Record<string, string>>>): string {
  if (locale === "en" || !value.trim()) return value;
  const clean = value.trim();
  const translate = supplemental?.[locale]?.[clean] || catalogs[locale][clean];
  if (!translate) return value;
  return value.replace(clean, translate);
}

/** Resolves internal links into the destination's true native-language URL. */
export function localizedInternalHref(href: string, locale: SiteLocale): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const match = href.match(/^([^?#]*)(.*)$/);
  if (!match) return href;
  const [, path, rest] = match;
  const parts = path.split("/").filter(Boolean);
  if (!parts.length) return "/" + locale + rest;
  const oldLang = ["en", "es", "de"].includes(parts[0]) ? parts.shift() as SiteLocale : "en";
  const [head, slug] = parts;
  if (["guides", "guias", "ratgeber"].includes(head) && slug) {
    if (oldLang === "en" && existingGeneral.has(slug)) {
      return localizedGeneralPath(locale, slug)! + rest;
    }
    const originalSlug = generalEnglishGuides.find((guide) => localizedGeneralPath(oldLang, guide.slug)?.endsWith("/" + slug))?.slug;
    if (originalSlug) return localizedGeneralPath(locale, originalSlug)! + rest;
    const key = (Object.keys(exactGuideSlugs) as ExactGuideKey[]).find((id) => exactGuideSlugs[id][oldLang] === slug);
    if (key) return exactGuidePath(locale, key) + rest;
    const practical = practicalGuideKeyFromSlug(oldLang, slug);
    if (practical) return practicalGuidePath(locale, practical) + rest;
  }
  if (["cities", "ciudades", "staedte"].includes(head)) {
    return slug ? (cityUrl(locale, cityFromSlug(oldLang, slug) || slug) || sectionPath(locale, "cities")) + rest : sectionPath(locale, "cities") + rest;
  }
  if (["tools", "herramientas", "werkzeuge"].includes(head)) {
    const id = slug ? (toolFromSlug(oldLang, slug) || (toolIds.includes(slug as ToolId) ? slug as ToolId : null)) : null;
    return id ? toolUrl(locale, id) + rest : sectionPath(locale, "tools") + rest;
  }
  if (path === "/trabajo/calculadora-salario") return toolUrl(locale, "salary-calculator") + rest;
  if (path === "/trabajo/tipos-de-empleo") return toolUrl(locale, "employment-types") + rest;
  const id = ({
    plan: "plan", "visas-residence": "visa", glossary: "glossary",
    authorities: "authorities", emergency: "emergency", "data-status": "data-status",
    "costs-deadlines": "costs-deadlines", "explore-germany": "explore-germany",
  } as Record<string, OtherPageId>)[head];
  if (id) return otherUrl(locale, id) + rest;
  const hub = hubUrl(locale, head);
  if (hub) return hub + rest;
  if (head === "guides") return sectionPath(locale, "guides") + rest;
  if (head === "cities") return sectionPath(locale, "cities") + rest;
  if (head === "search") return sectionPath(locale, "search") + rest;
  return href;
}

const translateKeys = new Set(["title", "description", "label", "name", "note", "intro", "heading", "eyebrow", "text", "alt", "placeholder", "aria-label"]);
function translateProps(
  properties: Record<string, unknown>, locale: SiteLocale,
  supplementary?: Partial<Record<SiteLocale, Record<string, string>>>,
): Record<string, unknown> {
  return Object.fromEntries(Object.entries(properties).map(([key, value]) => {
    if (key === "href" && typeof value === "string") return [key, localizedInternalHref(value, locale)];
    if (key === "children") return [key, translateTree(value as ReactNode, locale, supplementary)];
    if (translateKeys.has(key) && typeof value === "string") return [key, translatedString(locale, value, supplementary)];
    if (key === "items" && Array.isArray(value)) return [key, value.map((item) =>
      typeof item === "object" && item !== null ? translateProps(item as Record<string, unknown>, locale, supplementary) : item
    )];
    return [key, value];
  }));
}

export function translateTree(
  node: ReactNode, locale: SiteLocale,
  supplemental?: Partial<Record<SiteLocale, Record<string, string>>>,
): ReactNode {
  if (typeof node === "string") return translatedString(locale, node, supplemental);
  if (node === null || node === undefined || typeof node === "number" || typeof node === "boolean") return node;
  if (Array.isArray(node)) return node.map((item) => translateTree(item, locale, supplemental));
  if (isValidElement(node)) {
    if (node.type === JsonLd) return null; // The new localized page supplies a canonical schema.
    if (node.type === SafetyNotice || node.type === SourceStamp) {
      const old=node as ReactElement<Record<string, unknown>>;
      return cloneElement(old, { ...old.props, locale });
    }
    const element = node as ReactElement<Record<string, unknown>>;
    return cloneElement(element, translateProps(element.props, locale, supplemental));
  }
  return node;
}
