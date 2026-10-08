import { exactGuideSlugs, type ExactGuideKey } from "@/lib/exact-guide-slugs";
import { supportedLocales, type Locale } from "@/lib/platform-data";
import { practicalGuideKeyFromSlug, practicalGuidePath } from "@/lib/content/guides/practical-systems-localized";

export function exactGuidePath(locale: Locale, key: ExactGuideKey) {
  return `/${locale}/guides/${exactGuideSlugs[key][locale]}`;
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

export function switchLocalizedPath(pathname: string, locale: Locale) {
  if (pathname === "/guides" || pathname === "/guides/") return `/${locale}/guides`;
  if (partsForPath(pathname).length === 2 && partsForPath(pathname)[0] === "guides") {
    const slug = partsForPath(pathname)[1];
    const practical = practicalGuideKeyFromSlug("en", slug);
    if (practical && ["en","es","de","fr"].includes(locale)) return practicalGuidePath(locale as "en"|"es"|"de"|"fr", practical);
  }
  const parts = partsForPath(pathname);
  if (parts.length === 2 && parts[1] === "guides" && (supportedLocales as readonly string[]).includes(parts[0])) return `/${locale}/guides`;
  if (parts.length === 3 && parts[1] === "guides" && ["en","es","de","fr"].includes(parts[0]) && ["en","es","de","fr"].includes(locale)) {
    const practical = practicalGuideKeyFromSlug(parts[0] as "en"|"es"|"de"|"fr", parts[2]);
    if (practical) return practicalGuidePath(locale as "en"|"es"|"de"|"fr", practical);
  }
  if (parts.length !== 3 || parts[1] !== "guides") return null;
  const match = findExactGuideRoute(parts[0], parts[2]);
  return match ? exactGuidePath(locale, match.key) : null;
}
