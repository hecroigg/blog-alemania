import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/commercial";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Icon } from "@/components/icon";
import { JsonLd } from "@/components/json-ld";
import { RelatedResources } from "@/components/related-resources";
import { exactGuideUi } from "@/lib/content/localized-exact-guides";
import {
  generalGuideFromSlug, generalGuideStaticParams, localizedGeneralGuide,
  localizedGeneralPath, type EditorialLocale,
} from "@/lib/content/localized-general-guides";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { sectionPath } from "@/lib/locale-paths";

export { generalGuideStaticParams };

const headingId = (value: string) => value.toLowerCase().normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export function generalGuideMetadata(locale: EditorialLocale, slug: string): Metadata | null {
  const original = generalGuideFromSlug(locale, slug);
  if (!original) return null;
  const guide = localizedGeneralGuide(original, locale);
  const canonical = absoluteUrl(localizedGeneralPath(locale, original.slug)!);
  const languages = Object.fromEntries(
    (["en", "es", "de"] as const).map((item) =>
      [item, absoluteUrl(localizedGeneralPath(item, original.slug)!)]
    )
  );
  return {
    title: guide.title, description: guide.description,
    alternates: { canonical, languages: { ...languages, "x-default": languages.en } },
    robots: { index: true, follow: true },
    openGraph: { type: "article", title: guide.title, description: guide.description, url: canonical, locale, modifiedTime: guide.updated },
    twitter: { card: "summary", title: guide.title, description: guide.description },
  };
}

export function LocalizedGeneralGuidePage({ locale, slug }: { locale: EditorialLocale; slug: string }) {
  const original = generalGuideFromSlug(locale, slug);
  if (!original) notFound();
  const guide = localizedGeneralGuide(original, locale);
  const copy = exactGuideUi[locale];
  const canonical = absoluteUrl(localizedGeneralPath(locale, original.slug)!);
  const related = original.related
    .map((relatedSlug) => {
      const path = localizedGeneralPath(locale, relatedSlug);
      if (!path) return null;
      const target = generalGuideFromSlug("en", relatedSlug);
      return target ? { path, title: localizedGeneralGuide(target, locale).title } : null;
    })
    .filter((item): item is { path: string; title: string } => item !== null);
  const relatedHeading = { en: "Continue reading", es: "Sigue leyendo", de: "Weiterlesen" }[locale];
  const articleSchema = {
    "@context": "https://schema.org", "@type": "Article",
    headline: guide.title, description: guide.description,
    datePublished: guide.updated, dateModified: guide.updated,
    mainEntityOfPage: canonical, inLanguage: locale,
    author: { "@type": "Organization", name: "GermanyBase Editorial", url: absoluteUrl("/about") },
    publisher: { "@type": "Organization", name: siteConfig.name },
    citation: guide.sources.map((source) => source.url),
  };
  return (
    <article lang={locale} data-no-translate>
      <header className="article-hero">
        <div className="shell article-hero-inner">
          <Breadcrumbs items={[
            { label: copy.home, href: "/" + locale },
            { label: copy.guides, href: sectionPath(locale, "guides") },
            { label: guide.title },
          ]} />
          <span className="eyebrow">{guide.eyebrow}</span>
          <h1>{guide.title}</h1>
          <p className="article-summary">{guide.summary}</p>
          <div className="article-meta">
            <span><Icon name="clock" size={16} /> {guide.readingMinutes} {copy.read}</span>
            <span><Icon name="check" size={16} /> {copy.updated}: <time dateTime={guide.updated}>{new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(guide.updated + "T12:00:00Z"))}</time></span>
            <span>GermanyBase Editorial</span>
          </div>
        </div>
      </header>
      <div className="shell article-layout">
        <nav className="toc" aria-label={copy.onPage}>
          <strong>{copy.onPage}</strong>
          <ol>
            {guide.sections.map((section) =>
              <li key={section.heading}><a href={"#" + headingId(section.heading)}>{section.heading}</a></li>
            )}
            <li><a href="#faqs">{copy.questions}</a></li>
            <li><a href="#sources">{copy.sources}</a></li>
          </ol>
        </nav>
        <div className="article-body">
          <section className="key-takeaways">
            <h2>{copy.first}</h2>
            <ul>{guide.takeaways.map((item) =>
              <li key={item}><Icon name="check" size={17} /><span>{item}</span></li>
            )}</ul>
          </section>
          <AdSlot placement="article-intro" />
          {guide.sections.map((section, index) => (
            <section className="article-section" id={headingId(section.heading)} key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
              {section.resources && <div className="resource-grid">{section.resources.map((resource) =>
                <a href={resource.url} key={resource.url} target="_blank" rel="noopener noreferrer">
                  <span><strong>{resource.label}</strong><small>{resource.note}</small></span>
                  <Icon name="external" size={17} />
                </a>
              )}</div>}
              {section.callout && <aside className={"callout callout-" + (section.callout.tone || "note")}>
                <strong>{section.callout.title}</strong><p>{section.callout.text}</p>
              </aside>}
              {index === 1 && <AdSlot placement="article-body" />}
            </section>
          ))}
          <section className="faq-section" id="faqs">
            <h2>{copy.questions}</h2>
            {guide.faqs.map((faq) =>
              <details className="faq-item" key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>
            )}
          </section>
          <section className="sources-section" id="sources">
            <h2>{copy.sources}</h2>
            <ul className="source-list">{guide.sources.map((source) =>
              <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">
                <span><strong>{source.name}</strong>{source.note && <small>{source.note}</small>}</span><Icon name="external" size={17} />
              </a></li>
            )}</ul>
          </section>
          {related.length > 0 && <section className="related-section">
            <h2>{relatedHeading}</h2>
            <div className="related-grid">{related.map((item) =>
              <Link href={item.path} key={item.path}><span>{item.title}</span><Icon name="arrow" /></Link>
            )}</div>
          </section>}
          <RelatedResources locale={locale} category={guide.category} currentPath={localizedGeneralPath(locale, original.slug)!}/>
          <nav className="locale-alternates" aria-label={copy.otherLanguages}>
            <strong>{copy.otherLanguages}</strong>
            <div>{(["en", "es", "de"] as const).map((item) =>
              <Link href={localizedGeneralPath(item, original.slug)!} hrefLang={item} lang={item} key={item}
                aria-current={locale === item ? "page" : undefined}>
                {({ en: "🇬🇧 English", es: "🇪🇸 Español", de: "🇩🇪 Deutsch" } as const)[item]}
              </Link>
            )}</div>
          </nav>
        </div>
        <aside className="article-side">
          <div className="source-stamp"><Icon name="shield" size={20} />
            <strong>{copy.official}</strong><p>{guide.sources[0]?.note}</p>
          </div>
          <AdSlot placement="sidebar" />
        </aside>
      </div>
      <JsonLd data={[articleSchema, {
        "@context": "https://schema.org", "@type": "FAQPage", inLanguage: locale,
        mainEntity: guide.faqs.map((faq) => ({
          "@type": "Question", name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }]} />
    </article>
  );
}
