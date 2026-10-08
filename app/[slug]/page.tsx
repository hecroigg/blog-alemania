import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { GuideCard } from "@/components/cards";
import { Icon } from "@/components/icon";
import { audienceMap, audiences } from "@/lib/content/audiences";
import { categories, categoryMap } from "@/lib/content/categories";
import { getGuidesByCategory, guideMap } from "@/lib/content/guides";
import { trustPageMap, trustPages } from "@/lib/content/trust";
import { absoluteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };
const stripCrawlerSuffix = (slug: string) => slug.split(":")[0];
const isKnownTopLevelSlug = (slug: string) => categoryMap.has(slug) || audienceMap.has(slug) || trustPageMap.has(slug);
export function generateStaticParams() { return [...categories.map((x) => x.slug), ...audiences.map((x) => x.slug), ...trustPages.map((x) => x.slug)].map((slug) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cleanSlug = stripCrawlerSuffix(slug);
  const metadataSlug = isKnownTopLevelSlug(cleanSlug) ? cleanSlug : slug;
  const category = categoryMap.get(metadataSlug);
  if (category) return { title: category.name, description: category.description, alternates: { canonical: absoluteUrl(`/${metadataSlug}`) } };
  const audience = audienceMap.get(metadataSlug);
  if (audience) return { title: audience.name, description: audience.description, alternates: { canonical: absoluteUrl(`/${metadataSlug}`) } };
  const trust = trustPageMap.get(metadataSlug);
  if (trust) return { title: trust.title, description: trust.description, alternates: { canonical: absoluteUrl(`/${metadataSlug}`) } };
  return {};
}

export default async function HubPage({ params }: Props) {
  const { slug } = await params;
  if (slug === "&") permanentRedirect("/");
  const cleanSlug = stripCrawlerSuffix(slug);
  if (cleanSlug !== slug && isKnownTopLevelSlug(cleanSlug)) permanentRedirect(`/${cleanSlug}`);
  const category = categoryMap.get(slug);
  if (category) {
    const items = getGuidesByCategory(category.slug);
    return <><section className="page-hero"><div className="shell"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: category.name }]}/><div className="page-hero-grid"><div className="page-hero-copy"><span className="eyebrow">Topic hub</span><h1>{category.name}</h1><p>{category.intro}</p></div><div className="page-stat"><span>Published guides</span><strong>{items.length}</strong><small>{category.featuredTopics.join(" · ")}</small></div></div></div></section>{category.slug === "work" && <section className="section shell work-feature-section"><div className="section-heading"><div><span className="eyebrow">Salary and employment</span><h2>Start with your real numbers</h2></div><p>Estimate take-home pay, identify your employment type and then read the detailed rule that applies.</p></div><div className="work-feature-grid"><Link href="/trabajo/calculadora-salario"><span>Interactive tool</span><h3>Gross-to-net salary calculator</h3><p>Adjust tax class, insurance, state and student status, then inspect every deduction.</p><em>Calculate salary <Icon name="arrow" size={16}/></em></Link><Link href="/trabajo/tipos-de-empleo"><span>2026 comparison</span><h3>Compare employment types</h3><p>Minijob, Midijob, Werkstudent and regular employment side by side.</p><em>Compare types <Icon name="arrow" size={16}/></em></Link><Link href="/guides/minijob-germany"><span>Up to €603</span><h3>Minijob guide</h3><p>Threshold, working hours, pension and employment rights without duplication.</p><em>Read guide <Icon name="arrow" size={16}/></em></Link><Link href="/guides/werkstudent-germany"><span>Student employment</span><h3>Werkstudent guide</h3><p>The 20-hour rule, 26-week framework and real-number examples.</p><em>Read guide <Icon name="arrow" size={16}/></em></Link></div></section>}<div className="shell content-grid"><div className="content-main"><h2>Guides in {category.shortName.toLowerCase()}</h2><div className="topic-list">{category.featuredTopics.map((topic) => <span key={topic}>{topic}</span>)}</div>{items.length ? <div className="hub-guide-list">{items.map((guide) => <GuideCard key={guide.slug} guide={guide}/>)}</div> : <div className="empty-guides"><p>This hub is ready for carefully researched guides. We do not publish empty pages to manufacture search coverage.</p></div>}</div><aside className="sidebar-card"><h2>Start with the essentials</h2>{category.slug === "work" && <><Link href="/trabajo/calculadora-salario">Salary calculator <Icon name="arrow" size={16}/></Link><Link href="/trabajo/tipos-de-empleo">Employment types <Icon name="arrow" size={16}/></Link></>}<Link href="/guides/first-30-days-germany">First 30 days <Icon name="arrow" size={16}/></Link><Link href="/guides/anmeldung-germany">Anmeldung <Icon name="arrow" size={16}/></Link><Link href="/guides/finding-housing-germany">Finding housing <Icon name="arrow" size={16}/></Link><Link href="/guides/german-health-insurance">Health insurance <Icon name="arrow" size={16}/></Link></aside></div></>;
  }
  const audience = audienceMap.get(slug);
  if (audience) {
    const items = audience.guideSlugs.flatMap((item) => { const guide = guideMap.get(item); return guide ? [guide] : []; });
    return <><section className="page-hero"><div className="shell"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: audience.name }]}/><div className="page-hero-grid"><div className="page-hero-copy"><span className="eyebrow">A route built for you</span><h1>Germany for {audience.name.toLowerCase()}</h1><p>{audience.description}</p></div><div className="page-stat"><span>Curated pathway</span><strong>{items.length}</strong><small>Guides selected around your likely priorities</small></div></div></div></section><div className="shell content-grid"><div className="content-main"><h2>Start in this order</h2><ol className="priority-list">{audience.priorities.map((priority) => <li key={priority}>{priority}</li>)}</ol><h2>Recommended guides</h2><div className="hub-guide-list">{items.map((guide) => <GuideCard key={guide.slug} guide={guide}/>)}</div></div><aside className="sidebar-card"><h2>Useful for everyone</h2><Link href="/guides/moving-to-germany">Plan your move <Icon name="arrow" size={16}/></Link><Link href="/cities">Compare cities <Icon name="arrow" size={16}/></Link><Link href="/guides/cost-of-living-germany">Build a budget <Icon name="arrow" size={16}/></Link><Link href="/tools">Tools roadmap <Icon name="arrow" size={16}/></Link></aside></div></>;
  }
  const trust = trustPageMap.get(slug);
  if (trust) return <article className="shell trust-page"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: trust.title }]}/><span className="eyebrow">{trust.eyebrow}</span><h1>{trust.title}</h1><p className="lead">{trust.description}</p>{trust.sections.map((section) => <section className="prose-section" key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}</section>)}</article>;
  notFound();
}
