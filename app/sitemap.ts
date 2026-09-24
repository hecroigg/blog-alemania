import type { MetadataRoute } from "next";
import { audiences } from "@/lib/content/audiences";
import { categories } from "@/lib/content/categories";
import { cities } from "@/lib/content/cities";
import { guides } from "@/lib/content/guides";
import { trustPages } from "@/lib/content/trust";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const stable = ["", "/guides", "/cities", "/tools", "/plan", "/visas-residence", "/explore-germany", "/glossary", "/authorities", "/emergency", "/data-status", "/costs-deadlines", "/tools/cost-of-living", "/tools/compare-cities", "/tools/document-checklist", "/tools/rental-scam-checker", "/tools/first-30-days", ...categories.map((x) => `/${x.slug}`), ...audiences.map((x) => `/${x.slug}`), ...trustPages.map((x) => `/${x.slug}`)];
  return [
    ...stable.map((path) => ({ url: absoluteUrl(path || "/"), lastModified: new Date("2026-09-23"), changeFrequency: path === "" ? "weekly" as const : "monthly" as const, priority: path === "" ? 1 : .7 })),
    ...guides.map((guide) => ({ url: absoluteUrl(`/guides/${guide.slug}`), lastModified: new Date(guide.updated), changeFrequency: "monthly" as const, priority: guide.featured ? .9 : .8 })),
    ...cities.map((city) => ({ url: absoluteUrl(`/cities/${city.slug}`), lastModified: new Date("2026-09-23"), changeFrequency: "monthly" as const, priority: city.featured ? .8 : .7 })),
  ];
}
