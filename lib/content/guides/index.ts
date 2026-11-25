import { citiesGuides } from "./cities-guide";
import { lifeServicesGuides } from "./life-services";
import { moveAndAdminGuides } from "./move-and-admin";
import { newcomerReferenceGuides } from "./newcomer-reference";
import { workAndHousingGuides } from "./work-and-housing";
import { practicalSystemsGuides } from "./practical-systems";
import { authoredGuideForLocale } from "./authored-guide";
import { authoredGuides } from "./authored-guides";

export const guides = [
  ...Array.from(authoredGuides.values(), (article) => authoredGuideForLocale(article, "en")),
  ...moveAndAdminGuides,
  ...workAndHousingGuides,
  ...lifeServicesGuides,
  ...newcomerReferenceGuides,
  ...citiesGuides,
  ...practicalSystemsGuides,
];

export const guideMap = new Map(guides.map((guide) => [guide.slug, guide]));

export function getGuidesByCategory(category: string) {
  return guides.filter((guide) => guide.category === category);
}

export function getRelatedGuides(slugs: string[]) {
  return slugs.flatMap((slug) => {
    const guide = guideMap.get(slug);
    return guide ? [guide] : [];
  });
}
