import type { MetadataRoute } from "next";
import { cities } from "@/lib/content/cities";
import { exactGuides } from "@/lib/content/exact-guides";
import { generalEnglishGuides, localizedGeneralPath, localizedGeneralGuide } from "@/lib/content/localized-general-guides";
import { getLocalizedExactGuide } from "@/lib/content/localized-exact-guides";
import { exactGuidePath } from "@/lib/exact-guide-routes";
import { getLocalizedPracticalGuide, practicalGuidePath, practicalGuideSlugs, type PracticalGuideKey } from "@/lib/content/guides/practical-systems-localized";
import {
  locales, hubIds, hubUrl, cityUrl, sectionPath, toolIds, toolUrl,
  otherPages, otherUrl, type SiteLocale, type OtherPageId,
} from "@/lib/locale-paths";
import { absoluteUrl } from "@/lib/site";

const alternates = (path: (lang: SiteLocale) => string) => {
  const values = Object.fromEntries(locales.map((lang) => [lang, absoluteUrl(path(lang))]));
  return { ...values, "x-default": values.en as string };
};
const record = (url: string, date: string, priority: number, localized: (lang: SiteLocale) => string): MetadataRoute.Sitemap[number] => ({
  url: absoluteUrl(url), lastModified: new Date(date),
  changeFrequency: "monthly", priority, alternates: { languages: alternates(localized) },
});

/**
 * Only 200-OK, self-canonical URLs are allowed in the sitemap.
 * Excludes all redirect aliases (/guides, /es/guides, /de/cities etc).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...locales.map((lang) => record("/" + lang, "2026-11-17", 1, (x) => "/" + x)),
    ...hubIds.flatMap((id) => locales.map((lang) =>
      record(hubUrl(lang, id)!, "2026-11-17", .7, (x) => hubUrl(x, id)!)
    )),
    ...locales.map((lang) =>
      record(sectionPath(lang, "guides"), "2026-11-17", .9, (x) => sectionPath(x, "guides"))
    ),
    ...generalEnglishGuides.flatMap((guide) => locales.map((lang) =>
      record(localizedGeneralPath(lang, guide.slug)!, localizedGeneralGuide(guide, lang).updated, guide.featured ? .9 : .8, (x) => localizedGeneralPath(x,guide.slug)!)
    )),
    ...exactGuides.flatMap((guide) => locales.map((lang) =>
      record(exactGuidePath(lang, guide.key), getLocalizedExactGuide(lang, guide.key).updated, .9, (x) => exactGuidePath(x, guide.key))
    )),
    ...(Object.keys(practicalGuideSlugs) as PracticalGuideKey[]).flatMap((key) =>
      locales.map((lang) => record(practicalGuidePath(lang,key), getLocalizedPracticalGuide(lang,key).updated, .9, (x) => practicalGuidePath(x,key)))
    ),
    ...locales.map((lang) =>
      record(sectionPath(lang, "cities"), "2026-11-17", .8, (x) => sectionPath(x, "cities"))
    ),
    ...cities.flatMap((city) => locales.map((lang) =>
      record(cityUrl(lang, city.slug)!, city.updated || "2026-09-23", city.featured ? .8 : .7, (x) => cityUrl(x,city.slug)!)
    )),
    ...locales.map((lang) =>
      record(sectionPath(lang, "tools"), "2026-11-17", .8, (x) => sectionPath(x, "tools"))
    ),
    ...toolIds.flatMap((id) => locales.map((lang) =>
      record(toolUrl(lang,id), id === "salary-calculator" ? "2026-11-26" : "2026-11-17", .85, (x) => toolUrl(x,id))
    )),
    ...(Object.keys(otherPages) as OtherPageId[]).flatMap((id) => locales.map((lang) =>
      record(otherUrl(lang,id), "2026-11-17", .7, (x) => otherUrl(x,id))
    )),
  ];
}
