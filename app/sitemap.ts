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
  const stable = [
    "", "/en", "/es", "/de", "/guides", "/cities", "/tools", "/plan",
    "/visas-residence", "/explore-germany", "/glossary", "/authorities",
    "/emergency", "/data-status", "/costs-deadlines",
    "/trabajo/calculadora-salario", "/trabajo/tipos-de-empleo",
    "/tools/cost-of-living", "/tools/compare-cities",
    "/tools/document-checklist", "/tools/anmeldung-finder",
    "/tools/rental-scam-checker", "/tools/first-30-days",
    "/tools/apartment-affordability",
  ].filter((value) => value !== "/guides"); // /guides redirects to /en/guides.

  return [
    ...stable.map((path) => ({
      url: absoluteUrl(path || "/"),
      lastModified: new Date(["/en", "/es", "/de"].includes(path) ? "2026-11-17" : path === "/tools/anmeldung-finder" ? "2026-10-20" : "2026-10-08"),
      changeFrequency: path === "" ? "weekly" as const : "monthly" as const,
      priority: path === "" ? 1 : ["/en", "/es", "/de"].includes(path) ? .9 : .7,
      ...(["/en", "/es", "/de"].includes(path) ? { alternates: { languages: localizedAlternates((locale) => "/" + locale) } } : {}),
    })),
    ...[...categories, ...audiences, ...trustPages].flatMap((item) =>
      searchLocales.map((locale) => ({
        url: absoluteUrl("/" + locale + "/" + item.slug),
        lastModified: new Date("2026-11-17"),
        changeFrequency: "monthly" as const,
        priority: .7,
        alternates: { languages: localizedAlternates((lang) => "/" + lang + "/" + item.slug) },
      }))
    ),
    ...searchLocales.map((locale) => ({
      url: absoluteUrl("/" + locale + "/guides"),
      lastModified: new Date("2026-11-17"),
      changeFrequency: "monthly" as const,
      priority: .9,
      alternates: { languages: localizedAlternates((item) => "/" + item + "/guides") },
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
    // City pages are still only fully published in English. Do not claim
    // hreflang equivalents until each full translation has been verified.
    ...cities.map((city) => ({
      url: absoluteUrl("/cities/" + city.slug),
      lastModified: new Date(city.updated || "2026-09-23"),
      changeFrequency: "monthly" as const,
      priority: city.featured ? .8 : .7,
    })),
  ];
}
