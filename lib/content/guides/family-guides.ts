import type { SiteLocale } from "@/lib/locale-paths";
import type { Guide } from "@/lib/types";
import { familyBenefits } from "./family-benefits";
import { parentalAllowance } from "./elterngeld";
import { parentalAllowanceReform } from "./elterngeld-reform";
import { primarySchoolChildcare } from "./primary-school-childcare";
import type { FamilyGuide } from "./family-guide-types";

export const familyGuides = new Map<string, FamilyGuide>(
  [familyBenefits, parentalAllowance, parentalAllowanceReform, primarySchoolChildcare]
    .map((article) => [article.slugs.en, article]),
);

export function familyGuideForLocale(article: FamilyGuide, locale: SiteLocale): Guide {
  return {
    ...article.copy[locale],
    slug: article.slugs[locale],
    category: article.category,
    updated: "2026-11-20",
    readingMinutes: article.readingMinutes,
    related: article.related,
    featured: true,
  };
}
