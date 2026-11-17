import { sectionPath, hubPath, cityPath, toolPath, auxiliaryPath, auxiliarySlugs, toolSlugs, type HubKey, type ToolKey, type AuxiliaryKey } from "@/lib/localized-paths";
import type { MetadataRoute } from "next";
import { audiences } from "@/lib/content/audiences";
import { categories } from "@/lib/content/categories";
import { cities } from "@/lib/content/cities";
import { exactGuides } from "@/lib/content/exact-guides";
import { generalEnglishGuides, localizedGeneralPath } from "@/lib/content/localized-general-guides";
import { exactGuidePath } from "@/lib/exact-guide-routes";
import { practicalGuidePath, practicalGuideSlugs, type PracticalGuideKey } from "@/lib/content/guides/practical-systems-localized";
import { trustPages } from "@/lib/content/trust";
import { searchLocales } from "@/lib/platform-data";
import { absoluteUrl } from "@/lib/site";

const languages = ["en", "es", "de"] as const;
const localizedAlternates = (path: (locale: typeof languages[number]) => string) => {
  const mapped = Object.fromEntries(languages.map((locale) => [locale, absoluteUrl(path(locale))]));
  return { ...mapped, "x-default": mapped.en as string };
};

export default function sitemap(): MetadataRoute.Sitemap {
  const stable = ["/en", "/es", "/de"];

  return [
    ...stable.map((path) => ({
      url: absoluteUrl(path),
      lastModified: new Date("2026-11-17"),
      changeFrequency: path === "/en" ? "weekly" as const : "monthly" as const,
      priority: path === "/en" ? 1 : ["/es", "/de"].includes(path) ? .9 : .7,
      ...(["/en", "/es", "/de"].includes(path) ? { alternates: { languages: localizedAlternates((locale) => "/" + locale) } } : {}),
    })),
    ...[...categories, ...audiences, ...trustPages].flatMap((item) =>
      searchLocales.map((locale) => ({
        url: absoluteUrl(hubPath(locale, item.slug as HubKey)),
        lastModified: new Date("2026-11-17"),
        changeFrequency: "monthly" as const,
        priority: .7,
        alternates: { languages: localizedAlternates((lang) => hubPath(lang, item.slug as HubKey)) },
      }))
    ),
    ...searchLocales.map((locale) => ({
      url: absoluteUrl(sectionPath(locale, "guides")),
      lastModified: new Date("2026-11-17"),
      changeFrequency: "monthly" as const,
      priority: .9,
      alternates: { languages: localizedAlternates((item) => sectionPath(item, "guides")) },
    })),
    ...generalEnglishGuides.flatMap((guide) =>
      searchLocales.map((locale) => ({
        url: absoluteUrl(localizedGeneralPath(locale, guide.slug)!),
        lastModified: new Date(guide.updated),
        changeFrequency: "monthly" as const,
        priority: guide.featured ? .9 : .8,
        alternates: { languages: localizedAlternates((item) => localizedGeneralPath(item, guide.slug)!) },
      }))
    ),
    ...exactGuides.flatMap((guide) =>
      searchLocales.map((locale) => ({
        url: absoluteUrl(exactGuidePath(locale, guide.key)),
        lastModified: new Date(guide.updated),
        changeFrequency: "monthly" as const,
        priority: .9,
        alternates: { languages: localizedAlternates((item) => exactGuidePath(item, guide.key)) },
      }))
    ),
    ...(Object.keys(practicalGuideSlugs) as PracticalGuideKey[]).flatMap((key) =>
      searchLocales.map((locale) => ({
        url: absoluteUrl(practicalGuidePath(locale, key)),
        lastModified: new Date("2026-10-08"),
        changeFrequency: "monthly" as const,
        priority: .9,
        alternates: { languages: localizedAlternates((item) => practicalGuidePath(item, key)) },
      }))
    ),
    ...(Object.keys(auxiliarySlugs) as AuxiliaryKey[]).filter((key) => key !== "search").flatMap((key) =>
      searchLocales.map((locale) => ({
        url: absoluteUrl(auxiliaryPath(locale, key)),
        lastModified: new Date("2026-11-17"),
        changeFrequency: "monthly" as const,
        priority: .75,
        alternates: { languages: localizedAlternates((lang) => auxiliaryPath(lang, key)) },
      }))
    ),
    ...searchLocales.map((locale) => ({
      url: absoluteUrl(sectionPath(locale, "tools")),
      lastModified: new Date("2026-11-17"),
      changeFrequency: "monthly" as const,
      priority: .9,
      alternates: { languages: localizedAlternates((lang) => sectionPath(lang, "tools")) },
    })),
    ...(Object.keys(toolSlugs) as ToolKey[]).flatMap((key) =>
      searchLocales.map((locale) => ({
        url: absoluteUrl(toolPath(locale, key)),
        lastModified: new Date("2026-11-17"),
        changeFrequency: "monthly" as const,
        priority: .85,
        alternates: { languages: localizedAlternates((lang) => toolPath(lang, key)) },
      }))
    ),
    ...searchLocales.map((locale) => ({
      url: absoluteUrl(sectionPath(locale, "cities")),
      lastModified: new Date("2026-11-17"),
      changeFrequency: "monthly" as const,
      priority: .8,
      alternates: { languages: localizedAlternates((item) => sectionPath(item, "cities")) },
    })),
    ...cities.flatMap((city) =>
      searchLocales.map((locale) => ({
        url: absoluteUrl(cityPath(locale, city.slug)),
        lastModified: new Date(city.updated || "2026-09-23"),
        changeFrequency: "monthly" as const,
        priority: city.featured ? .8 : .7,
        alternates: { languages: localizedAlternates((lang) => cityPath(lang, city.slug)) },
      }))
    ),
  ];
}
