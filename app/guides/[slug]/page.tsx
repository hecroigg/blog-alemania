import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot, PartnerDisclosure } from "@/components/commercial";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Icon } from "@/components/icon";
import { JsonLd } from "@/components/json-ld";
import { SafetyNotice } from "@/components/source-stamp";
import { categoryMap } from "@/lib/content/categories";
import { getRelatedGuides, guideMap, guides } from "@/lib/content/guides";
import { absoluteUrl, siteConfig } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };
const toId = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export function generateStaticParams() { return guides.map((guide) => ({ slug: guide.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = guideMap.get(slug);
  if (!guide) return {};
  const url = absoluteUrl(`/guides/${guide.slug}`);
  return { title: guide.title, description: guide.description, alternates: { canonical: url }, openGraph: { type: "article", title: guide.title, description: guide.description, url, modifiedTime: guide.updated }, twitter: { card: "summary", title: guide.title, description: guide.description } };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = guideMap.get(slug);
  if (!guide) notFound();
  const category = categoryMap.get(guide.category);
  const related = getRelatedGuides(guide.related);
  const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: guide.title, description: guide.description, dateModified: guide.updated, datePublished: guide.updated, inLanguage: "en", author: { "@type": "Organization", name: siteConfig.name }, publisher: { "@type": "Organization", name: siteConfig.name }, mainEntityOfPage: absoluteUrl(`/guides/${guide.slug}`), articleSection: category?.name };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: guide.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) };
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") }, { "@type": "ListItem", position: 2, name: category?.name, item: absoluteUrl(`/${guide.category}`) }, { "@type": "ListItem", position: 3, name: guide.title, item: absoluteUrl(`/guides/${guide.slug}`) }] };
  return <>
    <article>
      <header className="article-hero"><div className="shell article-hero-inner"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: category?.name || "Guides", href: `/${guide.category}` }, { label: guide.title }]}/><span className="eyebrow">{guide.eyebrow}</span><h1>{guide.title}</h1><p className="article-summary">{guide.summary}</p><div className="article-meta"><span><Icon name="clock" size={16}/> {guide.readingMinutes} minute read</span><span><Icon name="check" size={16}/> Last updated: <time dateTime={guide.updated}>{new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${guide.updated}T12:00:00Z`))}</time></span></div></div></header>
      <div className="shell article-layout">
        <nav className="toc" aria-label="Table of contents"><strong>On this page</strong><ol>{guide.sections.map((section) => <li key={section.heading}><a href={`#${toId(section.heading)}`}>{section.heading}</a></li>)}<li><a href="#faqs">Questions</a></li><li><a href="#sources">Official sources</a></li></ol></nav>
        <div className="article-body">
          <section className="key-takeaways"><h2>What to know first</h2><ul>{guide.takeaways.map((item) => <li key={item}><Icon name="check" size={17}/><span>{item}</span></li>)}</ul></section>
          <AdSlot placement="article-intro"/>
          {guide.sections.map((section, index) => <section className="article-section" id={toId(section.heading)} key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}{section.resources && <div className="resource-grid">{section.resources.map((resource) => <a href={resource.url} target="_blank" rel="noreferrer" key={resource.url}><span><strong data-no-translate>{resource.label}</strong><small>{resource.note}</small></span><Icon name="external" size={17}/></a>)}</div>}{section.callout && <aside className={`callout callout-${section.callout.tone || "note"}`}><strong>{section.callout.title}</strong><p>{section.callout.text}</p></aside>}{index === 1 && <AdSlot placement="article-body"/>}</section>)}
          <PartnerDisclosure/>
          <section className="faq-section" id="faqs"><h2>Common questions</h2>{guide.faqs.map((faq) => <details className="faq-item" key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</section>
          <section className="sources-section" id="sources"><h2>Official and primary sources</h2><ul className="source-list">{guide.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer"><span><strong>{source.name}</strong>{source.note && <small>{source.note}</small>}</span><Icon name="external" size={17}/></a></li>)}</ul></section>
          {related.length > 0 && <section className="related-section"><h2>Continue with</h2><div className="related-grid">{related.map((item) => <Link href={`/guides/${item.slug}`} key={item.slug}><span>{item.title}</span><Icon name="arrow"/></Link>)}</div></section>}
        </div>
        <aside className="article-side"><SafetyNotice/><AdSlot placement="sidebar"/></aside>
      </div>
    </article>
    <JsonLd data={[articleSchema, faqSchema, breadcrumbSchema]}/>
  </>;
}
