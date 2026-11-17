import { exactGuideSlugs, type ExactGuideKey } from "@/lib/exact-guide-slugs";
import { supportedLocales, type Locale } from "@/lib/platform-data";
import { guideUrl, equivalentPath, sectionPath } from "@/lib/locale-paths";
import { practicalGuideKeyFromSlug, practicalGuidePath } from "@/lib/content/guides/practical-systems-localized";
import { generalGuideFromSlug, localizedGeneralPath, type EditorialLocale } from "@/lib/content/localized-general-guides";

export function exactGuidePath(locale: Locale, key: ExactGuideKey) {
  return (locale === "en" || locale === "es" || locale === "de") ? guideUrl(locale, exactGuideSlugs[key][locale]) : `/${locale}/guides/${exactGuideSlugs[key][locale]}`;
}

export function findExactGuideRoute(locale: string, slug: string) {
  if (!(supportedLocales as readonly string[]).includes(locale)) return null;
  const typedLocale = locale as Locale;
  for (const key of Object.keys(exactGuideSlugs) as ExactGuideKey[]) {
    if (exactGuideSlugs[key][typedLocale] === slug) return { key, locale: typedLocale };
  }
  return null;
}

function partsForPath(pathname: string) { return pathname.split("/").filter(Boolean); }

export function switchLocalizedPath(pathname: string, locale: Locale): string {
  const targetHome = "/" + locale;
  const parts = partsForPath(pathname);
  if (parts.length === 0 || (parts.length === 1 && (supportedLocales as readonly string[]).includes(parts[0]))) return targetHome;

  // The old unprefixed guide library remains available, but new language choices
  // always navigate to a distinct language-specific URL.
  if (pathname === "/guides" || pathname === "/guides/") return (locale === "es" || locale === "de" || locale === "en") ? sectionPath(locale, "guides") : targetHome;
  if (parts.length === 2 && ["guides", "guias", "ratgeber"].includes(parts[1]) &&
      (supportedLocales as readonly string[]).includes(parts[0])) return (locale === "es" || locale === "de" || locale === "en") ? sectionPath(locale, "guides") : targetHome;

  let sourceLocale: Locale | null = null;
  let sourceSlug: string | null = null;
  if (parts.length === 3 && (parts[1] === "guides" || parts[1] === "guias" || parts[1] === "ratgeber") &&
      (supportedLocales as readonly string[]).includes(parts[0])) {
    sourceLocale = parts[0] as Locale;
    sourceSlug = parts[2];
  } else if (parts.length === 2 && parts[0] === "guides") {
    sourceLocale = "en";
    sourceSlug = parts[1];
  }

  if (sourceLocale && sourceSlug) {
    if (["en", "es", "de"].includes(sourceLocale) && ["en", "es", "de"].includes(locale)) {
      const match = generalGuideFromSlug(sourceLocale as EditorialLocale, sourceSlug);
      if (match) return localizedGeneralPath(locale as EditorialLocale, match.slug)!;
    }
    if (["en", "es", "de", "fr"].includes(locale) && ["en", "es", "de", "fr"].includes(sourceLocale)) {
      const practical = practicalGuideKeyFromSlug(sourceLocale as "en" | "es" | "de" | "fr", sourceSlug);
      if (practical) return practicalGuidePath(locale as "en" | "es" | "de" | "fr", practical);
    }
    const exact = findExactGuideRoute(sourceLocale, sourceSlug);
    if (exact) return exactGuidePath(locale, exact.key);
  }

  if (locale === "en" || locale === "es" || locale === "de") {
    const equivalent = equivalentPath(pathname, locale);
    if (equivalent) return equivalent;
  }
  // Never pretend an untranslated tool or generic page is a translated page.
  // Take the visitor to the chosen language's real index instead.
  return targetHome;
}
