import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { GuideCard } from "@/components/cards";
import { categories } from "@/lib/content/categories";
import { guides } from "@/lib/content/guides";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = { title: "Practical guides", description: "Source-led guides to moving, working, renting, healthcare, transport, money, and daily life in Germany.", alternates: { canonical: absoluteUrl("/guides") } };

export default function GuidesPage() {
  return <><section className="page-hero"><div className="shell"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Guides" }]}/><div className="page-hero-grid"><div className="page-hero-copy"><span className="eyebrow">Knowledge library</span><h1>Practical guides for life in Germany</h1><p>Clear next steps, careful context, and official sources. Every guide is structured to answer a real decision—not to fill a search-results page.</p></div><div className="page-stat"><span>Published guides</span><strong>{guides.length}</strong><small>Across {categories.length} essential topics</small></div></div></div></section><section className="section shell"><div className="guide-grid">{guides.map((guide) => <GuideCard key={guide.slug} guide={guide}/>)}</div></section></>;
}
