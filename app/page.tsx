import { HomeContent } from "@/components/home-content";
import { JsonLd } from "@/components/json-ld";
import { audiences } from "@/lib/content/audiences";
import { categories } from "@/lib/content/categories";
import { cities } from "@/lib/content/cities";
import { guides } from "@/lib/content/guides";

export default function Home() {
  const toGuideCard = ({ slug, eyebrow, readingMinutes, title, description }: (typeof guides)[number]) => ({ slug, eyebrow, readingMinutes, title, description });
  const popular = guides.filter((guide) => guide.featured).slice(0, 6).map(toGuideCard);
  const latest = [...guides].slice(-4).reverse().map(toGuideCard);
  const categoryCards = categories.map(({ slug, name, description, icon, color }) => ({ slug, name, description, icon, color }));
  const cityCards = cities.filter((city) => city.featured).map(({ slug, name, region, description, bestFor }) => ({ slug, name, region, description, bestFor }));
  const audienceLinks = audiences.map(({ slug, name }) => ({ slug, name }));
  return <>
    <HomeContent popular={popular} latest={latest} categories={categoryCards} cities={cityCards} audiences={audienceLinks}/>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "ItemList", name: "Popular guides to living in Germany", itemListElement: popular.map((guide, index) => ({ "@type": "ListItem", position: index + 1, url: `/guides/${guide.slug}`, name: guide.title })) }}/>
  </>;
}
