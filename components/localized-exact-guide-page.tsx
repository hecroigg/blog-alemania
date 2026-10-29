import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { AdSlot } from "@/components/commercial";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Icon } from "@/components/icon";
import { JsonLd } from "@/components/json-ld";
import { HolidayMinimumCalculator } from "@/components/holiday-minimum-calculator";
import { exactGuideUi, getLocalizedExactGuide } from "@/lib/content/localized-exact-guides";
import { exactGuideSlugs, type ExactGuideKey } from "@/lib/content/exact-guides";
import { exactGuidePath, findExactGuideRoute } from "@/lib/exact-guide-routes";
import { isSearchLocale, localeLabels, searchLocales, supportedLocales, type Locale } from "@/lib/platform-data";
import { absoluteUrl, siteConfig } from "@/lib/site";

const stripCrawlerSuffix = (slug: string) => slug.split(":")[0];
const toId = (value: string) => value.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export function exactGuideStaticParams(locale: Locale) {
  return (Object.keys(exactGuideSlugs) as ExactGuideKey[]).map((key) => ({ slug: exactGuideSlugs[key][locale] }));
}

function languageUrls(key: ExactGuideKey) {
  return Object.fromEntries([...searchLocales.map((locale) => [locale, absoluteUrl(exactGuidePath(locale, key))]), ["x-default", absoluteUrl(exactGuidePath("en", key))]]);
}

export function localizedExactGuideMetadata(locale: Locale, slug: string): Metadata {
  const cleanSlug = stripCrawlerSuffix(slug);
  const match = findExactGuideRoute(locale, cleanSlug) || findExactGuideRoute(locale, slug);
  if (!match) return {};
  const guide = getLocalizedExactGuide(locale, match.key);
  const canonical = absoluteUrl(exactGuidePath(locale, match.key));
  const topicalDescriptions: Partial<Record<ExactGuideKey, Partial<Record<Locale,string>>>> = {
    leave: {
      es: "¿Trabajas 2, 3, 4 o 5 días por semana en Alemania? Calcula el mínimo legal de vacaciones pagadas con el §3 BUrlG y descubre cuándo pueden corresponderte más días.",
      de: "Wie viele Urlaubstage bei 2 bis 6 Arbeitstagen pro Woche? Gesetzlichen Mindesturlaub berechnen, mit BUrlG-Quelle, Wartezeit und Tarifhinweisen.",
      en: "Calculate the German statutory holiday minimum for a 2–6-day workweek. Check four-week entitlement, part-time rules and official BUrlG sources.",
      fr: "Calculez les congés payés minimum en Allemagne pour 2 à 6 jours travaillés par semaine. Règles et sources légales incluses."
    },
    deutschlandticket: {
      de: "Deutschlandticket 2026: 63 € pro Monat. Welche Busse und Regionalzüge gelten, was ist mit ICE/IC und wann lohnt sich das Abo? Offizielle Quellen.",
      en: "Deutschlandticket 2026 costs €63 a month. Check included buses and regional trains, ICE exclusions, subscriptions and a practical break-even example."
    }
  };
  const description = topicalDescriptions[match.key]?.[locale] || guide.description;
  return { title: guide.title, description, alternates: { canonical, languages: languageUrls(match.key) }, robots: isSearchLocale(locale) ? undefined : { index: false, follow: true }, openGraph: { type: "article", title: guide.title, description, url: canonical, locale, modifiedTime: guide.updated }, twitter: { card: "summary", title: guide.title, description } };
}

export function LocalizedExactGuidePage({ locale, slug }: { locale: Locale; slug: string }) {
  const cleanSlug = stripCrawlerSuffix(slug);
  const cleanMatch = findExactGuideRoute(locale, cleanSlug);
  if (cleanSlug !== slug && cleanMatch) permanentRedirect(exactGuidePath(locale, cleanMatch.key));
  const match = findExactGuideRoute(locale, slug);
  if (!match) notFound();
  const guide = getLocalizedExactGuide(locale, match.key);
  const ui = exactGuideUi[locale];
  const canonical = absoluteUrl(exactGuidePath(locale, match.key));
  const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: guide.title, description: guide.description, dateModified: guide.updated, datePublished: guide.updated, inLanguage: locale, author: { "@type": "Organization", name: "GermanyBase Editorial", url: absoluteUrl("/about") }, publisher: { "@type": "Organization", name: siteConfig.name }, mainEntityOfPage: canonical, citation: guide.sources.map((source) => source.url) };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: locale, mainEntity: guide.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) };
  return <article lang={locale}>
    <header className="article-hero"><div className="shell article-hero-inner"><Breadcrumbs items={[{ label: ui.home, href: "/" }, { label: ui.guides, href: `/${locale}/guides` }, { label: guide.title }]}/><span className="eyebrow">{guide.eyebrow}</span><h1>{guide.title}</h1><p className="article-summary">{guide.summary}</p><div className="article-meta"><span><Icon name="clock" size={16}/> {guide.readingMinutes} {ui.read}</span><span><Icon name="check" size={16}/> {ui.updated}: <time dateTime={guide.updated}>{new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${guide.updated}T12:00:00Z`))}</time></span><span><Link href="/about">GermanyBase Editorial</Link></span></div></div></header>
    <div className="shell article-layout">
      <nav className="toc" aria-label={ui.onPage}><strong>{ui.onPage}</strong><ol>{guide.sections.map((section) => <li key={section.heading}><a href={`#${toId(section.heading)}`}>{section.heading}</a></li>)}<li><a href="#faqs">{ui.questions}</a></li><li><a href="#sources">{ui.sources}</a></li></ol></nav>
      <div className="article-body">
        <section className="key-takeaways"><h2>{ui.first}</h2><ul>{guide.takeaways.map((item) => <li key={item}><Icon name="check" size={17}/><span>{item}</span></li>)}</ul></section>
        {match.key==="leave" && <HolidayMinimumCalculator locale={locale}/>}
        <AdSlot placement="article-intro"/>
        {guide.sections.map((section) => <section className="article-section" id={toId(section.heading)} key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}{section.callout && <aside className={`callout callout-${section.callout.tone || "note"}`}><strong>{section.callout.title}</strong><p>{section.callout.text}</p></aside>}</section>)}
        <section className="faq-section" id="faqs"><h2>{ui.questions}</h2>{guide.faqs.map((faq) => <details className="faq-item" key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</section>
        <section className="sources-section" id="sources"><h2>{ui.sources}</h2><ul className="source-list">{guide.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer"><span><strong>{source.name}</strong>{source.note && <small>{source.note}</small>}</span><Icon name="external" size={17}/></a></li>)}</ul></section>
        <nav className="locale-alternates" aria-label={ui.otherLanguages}><strong>{ui.otherLanguages}</strong><div>{supportedLocales.map((item) => <Link href={exactGuidePath(item, match.key)} hrefLang={item} lang={item} aria-current={item === locale ? "page" : undefined} key={item}>{localeLabels[item].flag} {localeLabels[item].label}</Link>)}</div></nav>
      </div>
      <aside className="article-side"><div className="source-stamp"><Icon name="shield" size={20}/><strong>{ui.official}</strong><p>{guide.sources[0]?.note}</p></div><AdSlot placement="sidebar"/></aside>
    </div>
    <JsonLd data={[articleSchema, faqSchema]}/>
  </article>;
}
