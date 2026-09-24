import Link from "next/link";
import { Icon } from "@/components/icon";
import type { Category, City, Guide } from "@/lib/types";

export function CategoryCard({ category }: { category: Category }) {
  return <Link href={`/${category.slug}`} className={`category-card tone-${category.color}`}><span className="card-icon"><Icon name={category.icon} /></span><span><strong>{category.name}</strong><small>{category.description}</small></span><Icon name="arrow" className="card-arrow" /></Link>;
}

export function GuideCard({ guide, compact = false }: { guide: Guide; compact?: boolean }) {
  return <article className={`guide-card ${compact ? "guide-card-compact" : ""}`}><div className="guide-card-top"><span className="eyebrow">{guide.eyebrow}</span><span className="read-time">{guide.readingMinutes} min</span></div><h3><Link href={`/guides/${guide.slug}`}>{guide.title}</Link></h3><p>{guide.description}</p><Link href={`/guides/${guide.slug}`} className="text-link">Read guide <Icon name="arrow" size={16} /></Link></article>;
}

export function CityCard({ city }: { city: City }) {
  return <Link href={`/cities/${city.slug}`} className="city-card"><span className="city-monogram" aria-hidden="true">{city.name.slice(0, 2).toUpperCase()}</span><span className="city-card-copy"><small>{city.region}</small><strong>{city.name}</strong><span>{city.description}</span><em>Best for: {city.bestFor}</em></span><Icon name="arrow" className="card-arrow" /></Link>;
}
