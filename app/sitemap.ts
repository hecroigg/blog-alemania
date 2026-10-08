import type { MetadataRoute } from "next";
import { audiences } from "@/lib/content/audiences";
import { categories } from "@/lib/content/categories";
import { cities } from "@/lib/content/cities";
import { guides } from "@/lib/content/guides";
import { exactGuides } from "@/lib/content/exact-guides";
import { exactGuidePath } from "@/lib/exact-guide-routes";
import { trustPages } from "@/lib/content/trust";
import { searchLocales } from "@/lib/platform-data";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const stable = ["", "/guides", "/cities", "/tools", "/plan", "/visas-residence", "/explore-germany", "/glossary", "/authorities", "/emergency", "/data-status", "/costs-deadlines", "/trabajo/calculadora-salario", "/trabajo/tipos-de-empleo", "/tools/cost-of-living", "/tools/compare-cities", "/tools/document-checklist", "/tools/rental-scam-checker", "/tools/first-30-days", "/tools/apartment-affordability", ...categories.map((x) => `/${x.slug}`), ...audiences.map((x) => `/${x.slug}`), ...trustPages.map((x) => `/${x.slug}`)];
  return [
    ...stable.map((path) => ({ url: absoluteUrl(path || "/"), lastModified: new Date("2026-09-23"), changeFrequency: path === "" ? "weekly" as const : "monthly" as const, priority: path === "" ? 1 : .7 })),
    ...guides.map((guide) => ({ url: absoluteUrl(`/guides/${guide.slug}`), lastModified: new Date(guide.updated), changeFrequency: "monthly" as const, priority: guide.featured ? .9 : .8 })),
    ...searchLocales.map((locale) => ({ url: absoluteUrl(`/${locale}/guides`), lastModified: new Date("2026-10-06"), changeFrequency: "monthly" as const, priority: .8, alternates: { languages: Object.fromEntries(searchLocales.map((item) => [item, absoluteUrl(`/${item}/guides`)])) } })),
    ...exactGuides.flatMap((guide) => searchLocales.map((locale) => ({ url: absoluteUrl(exactGuidePath(locale, guide.key)), lastModified: new Date(guide.updated), changeFrequency: "monthly" as const, priority: .9, alternates: { languages: Object.fromEntries(searchLocales.map((item) => [item, absoluteUrl(exactGuidePath(item, guide.key))])) } }))),
    ...cities.map((city) => ({ url: absoluteUrl(`/cities/${city.slug}`), lastModified: new Date("2026-09-23"), changeFrequency: "monthly" as const, priority: city.featured ? .8 : .7 })),
  ];
}
