import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CityCard } from "@/components/cards";
import { cities } from "@/lib/content/cities";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = { title: "Cities in Germany", description: "Practical city guides for choosing where to live in Germany, with local context for housing, work, transport, and administration.", alternates: { canonical: absoluteUrl("/cities") } };
export default function CitiesPage() { return <><section className="page-hero"><div className="shell"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cities" }]}/><div className="page-hero-grid"><div className="page-hero-copy"><span className="eyebrow">City guides</span><h1>Find the Germany that fits your life</h1><p>Compare cities through the things that shape an ordinary week: housing, work, travel, administration, study, and the wider region.</p></div><div className="page-stat"><span>City guides</span><strong>{cities.length}</strong><small>Each with a distinct, useful starting point</small></div></div></div></section><section className="section shell"><div className="city-grid">{cities.map((city) => <CityCard key={city.slug} city={city}/>)}</div></section></> }
