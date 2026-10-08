import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/commercial";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Icon } from "@/components/icon";
import { JsonLd } from "@/components/json-ld";
import { EditorialNote } from "@/components/editorial-note";
import {
  getLocalizedPracticalGuide,
  practicalGuideKeyFromSlug,
  practicalGuidePath,
  practicalGuideSlugs,
  practicalGuideStaticParams,
  type PracticalGuideKey,
} from "@/lib/content/guides/practical-systems-localized";
import { localeLabels, searchLocales, type Locale } from "@/lib/platform-data";
import { absoluteUrl, siteConfig } from "@/lib/site";

type SearchLocale = "en"|"es"|"de"|"fr";
const toId=(value:string)=>value.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");

const ui: Record<SearchLocale,{home:string;guides:string;read:string;updated:string;reviewed:string;onPage:string;first:string;questions:string;sources:string;languages:string;note:string}> = {
  en:{home:"Home",guides:"Guides",read:"minute read",updated:"Last updated",reviewed:"Reviewed by",onPage:"On this page",first:"What to know first",questions:"Common questions",sources:"Official and primary sources",languages:"Read this guide in another language",note:"GermanyBase practical note"},
  es:{home:"Inicio",guides:"Guías",read:"min de lectura",updated:"Actualizado",reviewed:"Revisado por",onPage:"En esta página",first:"Lo que debes saber primero",questions:"Preguntas frecuentes",sources:"Fuentes oficiales y primarias",languages:"Leer esta guía en otro idioma",note:"Nota práctica de GermanyBase"},
  de:{home:"Startseite",guides:"Ratgeber",read:"Min. Lesezeit",updated:"Aktualisiert",reviewed:"Geprüft von",onPage:"Auf dieser Seite",first:"Das Wichtigste zuerst",questions:"Häufige Fragen",sources:"Offizielle und primäre Quellen",languages:"Diesen Ratgeber in einer anderen Sprache lesen",note:"GermanyBase Praxishinweis"},
  fr:{home:"Accueil",guides:"Guides",read:"min de lecture",updated:"Mis à jour",reviewed:"Relu par",onPage:"Sur cette page",first:"À retenir",questions:"Questions fréquentes",sources:"Sources officielles et primaires",languages:"Lire ce guide dans une autre langue",note:"Note pratique GermanyBase"},
};

function languageUrls(key: PracticalGuideKey) {
  return Object.fromEntries([...searchLocales.map(locale=>[locale,absoluteUrl(practicalGuidePath(locale,key))]),["x-default",absoluteUrl(practicalGuidePath("en",key))]]);
}

export function localizedPracticalGuideMetadata(locale: SearchLocale, slug:string): Metadata | null {
  const key=practicalGuideKeyFromSlug(locale,slug);
  if(!key) return null;
  const guide=getLocalizedPracticalGuide(locale,key);
  const canonical=absoluteUrl(practicalGuidePath(locale,key));
  return {title:guide.title,description:guide.description,alternates:{canonical,languages:languageUrls(key)},openGraph:{type:"article",title:guide.title,description:guide.description,url:canonical,locale,modifiedTime:guide.updated},twitter:{card:"summary",title:guide.title,description:guide.description}};
}

export { practicalGuideStaticParams };

export function LocalizedPracticalGuidePage({locale,slug}:{locale:SearchLocale;slug:string}) {
  const key=practicalGuideKeyFromSlug(locale,slug);
  if(!key) notFound();
  const guide=getLocalizedPracticalGuide(locale,key);
  const t=ui[locale];
  const canonical=absoluteUrl(practicalGuidePath(locale,key));
  const articleSchema={"@context":"https://schema.org","@type":"Article",headline:guide.title,description:guide.description,dateModified:guide.updated,datePublished:guide.updated,inLanguage:locale,author:{"@type":"Organization",name:"GermanyBase Editorial",url:absoluteUrl("/about")},publisher:{"@type":"Organization",name:siteConfig.name},mainEntityOfPage:canonical,citation:guide.sources.map(source=>source.url)};
  const faqSchema={"@context":"https://schema.org","@type":"FAQPage",inLanguage:locale,mainEntity:guide.faqs.map(faq=>({"@type":"Question",name:faq.question,acceptedAnswer:{"@type":"Answer",text:faq.answer}}))};
  return <article lang={locale}>
    <header className="article-hero"><div className="shell article-hero-inner">
      <Breadcrumbs items={[{label:t.home,href:"/"},{label:t.guides,href:`/${locale}/guides`},{label:guide.title}]}/>
      <span className="eyebrow">{guide.eyebrow}</span><h1>{guide.title}</h1><p className="article-summary">{guide.summary}</p>
      <div className="article-meta"><span><Icon name="clock" size={16}/> {guide.readingMinutes} {t.read}</span><span><Icon name="check" size={16}/> {t.updated}: <time dateTime={guide.updated}>{new Intl.DateTimeFormat(locale,{day:"numeric",month:"long",year:"numeric",timeZone:"UTC"}).format(new Date(`${guide.updated}T12:00:00Z`))}</time></span><span>{t.reviewed} <Link href="/about">GermanyBase Editorial</Link></span></div>
    </div></header>
    <div className="shell article-layout">
      <nav className="toc" aria-label={t.onPage}><strong>{t.onPage}</strong><ol>{guide.sections.map(section=><li key={section.heading}><a href={`#${toId(section.heading)}`}>{section.heading}</a></li>)}<li><a href="#faqs">{t.questions}</a></li><li><a href="#sources">{t.sources}</a></li></ol></nav>
      <div className="article-body">
        <section className="key-takeaways"><h2>{t.first}</h2><ul>{guide.takeaways.map(item=><li key={item}><Icon name="check" size={17}/><span>{item}</span></li>)}</ul></section>
        <EditorialNote slug={practicalGuideSlugs[key].en} updated={guide.updated} sourceCount={guide.sources.length}/>
        <AdSlot placement="article-intro"/>
        {guide.sections.map((section,index)=><section className="article-section" id={toId(section.heading)} key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map(p=><p key={p}>{p}</p>)}{section.bullets&&<ul>{section.bullets.map(b=><li key={b}>{b}</li>)}</ul>}{section.resources&&<div className="resource-grid">{section.resources.map(resource=><a href={resource.url} target="_blank" rel="noreferrer" key={resource.url}><span><strong data-no-translate>{resource.label}</strong><small>{resource.note}</small></span><Icon name="external" size={17}/></a>)}</div>}{section.callout&&<aside className={`callout callout-${section.callout.tone||"note"}`}><strong>{section.callout.title}</strong><p>{section.callout.text}</p></aside>}{index===1&&<AdSlot placement="article-body"/>}</section>)}
        <section className="faq-section" id="faqs"><h2>{t.questions}</h2>{guide.faqs.map(faq=><details className="faq-item" key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</section>
        <section className="sources-section" id="sources"><h2>{t.sources}</h2><ul className="source-list">{guide.sources.map(source=><li key={source.url}><a href={source.url} target="_blank" rel="noreferrer"><span><strong>{source.name}</strong>{source.note&&<small>{source.note}</small>}</span><Icon name="external" size={17}/></a></li>)}</ul></section>
        <nav className="locale-alternates" aria-label={t.languages}><strong>{t.languages}</strong><div>{searchLocales.map(item=><Link href={practicalGuidePath(item,key)} hrefLang={item} lang={item} aria-current={item===locale?"page":undefined} key={item}>{localeLabels[item].flag} {localeLabels[item].label}</Link>)}</div></nav>
      </div>
      <aside className="article-side"><div className="source-stamp"><Icon name="shield" size={20}/><strong>{t.note}</strong><p>{guide.sources[0]?.note}</p></div><AdSlot placement="sidebar"/></aside>
    </div>
    <JsonLd data={[articleSchema,faqSchema]}/>
  </article>;
}
