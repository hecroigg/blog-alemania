import { citiesGuides } from "./cities-guide";
import { lifeServicesGuides } from "./life-services";
import { moveAndAdminGuides } from "./move-and-admin";
import { workAndHousingGuides } from "./work-and-housing";

export const guides = [
  ...moveAndAdminGuides,
  ...workAndHousingGuides,
  ...lifeServicesGuides,
  ...citiesGuides,
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
