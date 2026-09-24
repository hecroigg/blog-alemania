import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Icon } from "@/components/icon";
import { JsonLd } from "@/components/json-ld";
import { cityMap, cities } from "@/lib/content/cities";
import { absoluteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };
const toId = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
export function generateStaticParams() { return cities.map((city) => ({ slug: city.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const city = cityMap.get(slug); if (!city) return {}; const title = `Living in ${city.name}`; const url = absoluteUrl(`/cities/${city.slug}`); return { title, description: city.description, alternates: { canonical: url }, openGraph: { title, description: city.description, url } }; }

export default async function CityPage({ params }: Props) {
  const { slug } = await params; const city = cityMap.get(slug); if (!city) notFound();
  const schema = { "@context": "https://schema.org", "@type": "Article", headline: `Living in ${city.name}`, description: city.description, about: { "@type": "City", name: city.name, containedInPlace: { "@type": "AdministrativeArea", name: city.region } }, inLanguage: "en", mainEntityOfPage: absoluteUrl(`/cities/${city.slug}`) };
  return <><section className="page-hero city-detail-hero"><div className="shell"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cities", href: "/cities" }, { label: city.name }]}/><div className="page-hero-grid"><div className="page-hero-copy"><span className="eyebrow">{city.region}</span><h1>Living in {city.name}</h1><p>{city.description}</p></div><div className="page-stat"><span>City character</span><strong>{city.name.slice(0, 2).toUpperCase()}</strong><small>{city.character}</small></div></div></div></section><div className="shell content-grid"><div className="content-main"><p className="lead">Best for: {city.bestFor}</p>{city.sections.map((section) => <section className="article-section" id={toId(section.heading)} key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((p) => <p key={p}>{p}</p>)}{section.bullets && <ul>{section.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}{section.callout && <aside className={`callout callout-${section.callout.tone || "note"}`}><strong>{section.callout.title}</strong><p>{section.callout.text}</p></aside>}</section>)}<section className="sources-section"><h2>Local and official sources</h2><ul className="source-list">{city.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer"><span><strong>{source.name}</strong><small>{source.note}</small></span><Icon name="external"/></a></li>)}</ul></section></div><aside className="sidebar-card"><h2>Plan the move</h2><Link href="/guides/finding-housing-germany">Finding housing <Icon name="arrow" size={16}/></Link><Link href="/guides/anmeldung-germany">Anmeldung <Icon name="arrow" size={16}/></Link><Link href="/guides/cost-of-living-germany">Cost of living <Icon name="arrow" size={16}/></Link><Link href="/guides/deutschlandticket">Deutschlandticket <Icon name="arrow" size={16}/></Link></aside></div><JsonLd data={schema}/></>;
}
