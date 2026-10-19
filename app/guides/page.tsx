import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { GuideCard } from "@/components/cards";
import { ExactGuideCard } from "@/components/exact-guide-card";
import { categories } from "@/lib/content/categories";
import { exactGuides } from "@/lib/content/exact-guides";
import { guides } from "@/lib/content/guides";
import { exactGuidePath } from "@/lib/exact-guide-routes";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = { title: "Practical guides", description: "Source-led guides to moving, working, renting, healthcare, transport, money, and daily life in Germany.", alternates: { canonical: absoluteUrl("/guides") } };

export default function GuidesPage() {
  return <><section className="page-hero"><div className="shell"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Guides" }]}/><div className="page-hero-grid"><div className="page-hero-copy"><span className="eyebrow">Knowledge library</span><h1>Practical guides for life in Germany</h1><p>Clear next steps, careful context, and official sources. Every guide is structured to answer a real decision—not to fill a search-results page.</p></div><div className="page-stat"><span>Published guides</span><strong>{guides.length + exactGuides.length}</strong><small>Across {categories.length} essential topics</small></div></div></div></section><nav aria-label="Guides in other languages" className="shell" style={{ display: "flex", flexWrap: "wrap", gap: 12, paddingTop: 24 }}>
  <span style={{ fontWeight: 700 }}>Explore guides in your language:</span>
  <Link href="/es/guides" hrefLang="es" lang="es">Español</Link>
  <Link href="/de/guides" hrefLang="de" lang="de">Deutsch</Link>
  <Link href="/fr/guides" hrefLang="fr" lang="fr">Français</Link>
</nav><section className="section shell"><div className="section-heading"><div><span className="eyebrow">2026 figures</span><h2>Exact numbers, worked examples</h2></div></div><div className="guide-grid">{exactGuides.map((guide) => <ExactGuideCard key={guide.slug} guide={guide} href={exactGuidePath("en", guide.key)}/>)}</div></section><section className="section shell"><div className="section-heading"><div><span className="eyebrow">Step-by-step</span><h2>All practical guides</h2></div></div><div className="guide-grid">{guides.map((guide) => <GuideCard key={guide.slug} guide={guide}/>)}</div></section></>;
}
