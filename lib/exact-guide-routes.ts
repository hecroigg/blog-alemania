import { exactGuideSlugs, type ExactGuideKey } from "@/lib/exact-guide-slugs";
import { supportedLocales, type Locale } from "@/lib/platform-data";

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

export function switchLocalizedPath(pathname: string, locale: Locale) {
  if (pathname === "/guides" || pathname === "/guides/") return `/${locale}/guides`;
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 2 && parts[1] === "guides" && (supportedLocales as readonly string[]).includes(parts[0])) return `/${locale}/guides`;
  if (parts.length !== 3 || parts[1] !== "guides") return null;
  const match = findExactGuideRoute(parts[0], parts[2]);
  return match ? exactGuidePath(locale, match.key) : null;
}
