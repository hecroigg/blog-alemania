import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { EditorialPhoto } from "@/components/editorial-photo";
import { RelatedResources } from "@/components/related-resources";
import { ExactGuideCard } from "@/components/exact-guide-card";
import { audienceMap, audiences } from "@/lib/content/audiences";
import { categories, categoryMap } from "@/lib/content/categories";
import { getGuidesByCategory } from "@/lib/content/guides";
import {
  generalEnglishGuides, localizedGeneralGuide, localizedGeneralPath, type EditorialLocale,
} from "@/lib/content/localized-general-guides";
import {
  getLocalizedPracticalGuide, practicalGuideKeyFromSlug, practicalGuidePath,
} from "@/lib/content/guides/practical-systems-localized";
import { exactGuideUi } from "@/lib/content/localized-exact-guides";
import { absoluteUrl } from "@/lib/site";
import { hubUrl, type HubId } from "@/lib/locale-paths";
import { editorialPhotos, hubPhotos } from "@/lib/content/editorial-photos";
import { allTrustPageSlugs, trustPageForLocale } from "@/lib/content/localized-trust";
import esCatalog from "@/lib/translations/es.json";
import deCatalog from "@/lib/translations/de.json";

const dictionaries = { es: esCatalog as Record<string, string>, de: deCatalog as Record<string, string> };
const t = (locale: EditorialLocale, value: string) => locale === "en" ? value : dictionaries[locale][value] || value;
const locales = ["en", "es", "de"] as const;

export function localizedHubStaticParams() {
  return [...categories, ...audiences].map((item) => ({ slug: item.slug })).concat(allTrustPageSlugs().map((slug) => ({ slug })));
}
export function localizedHubMetadata(locale: EditorialLocale, slug: string): Metadata {
  const item = categoryMap.get(slug) || audienceMap.get(slug);
  const trust = trustPageForLocale(locale, slug);
  if (!item && !trust) return {};
  const url = absoluteUrl(hubUrl(locale, slug)!);
  const title = trust ? trust.title : t(locale, item!.name);
  const description = trust ? trust.description : t(locale, item!.description);
  return {
    title, description,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(locales.map((lang) => [lang, absoluteUrl(hubUrl(lang, slug)!)])),
    },
    robots: { index: true, follow: true },
    openGraph: { title, description, url, locale },
  };
}

export function LocalizedHubPage({ locale, slug }: { locale: EditorialLocale; slug: HubId }) {
  const c = categoryMap.get(slug);
  const a = audienceMap.get(slug);
  const trust = trustPageForLocale(locale, slug);
  if (!c && !a && !trust) notFound();
  const ui = exactGuideUi[locale];
  const photo = editorialPhotos[hubPhotos[slug]];
  if (trust) return (
    <article className="shell trust-page" lang={locale} data-no-translate>
      <Breadcrumbs items={[{ label: ui.home, href: "/" + locale }, { label: trust.title }]}/>
      <span className="eyebrow">{trust.eyebrow}</span>
      <h1>{trust.title}</h1>
      <p className="lead">{trust.description}</p>
      {trust.sections.map((section) =>
        <section className="prose-section" key={section.heading}>
          <h2>{section.heading}</h2>
          {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {section.bullets && <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}
        </section>
      )}
      <EditorialPhoto photo={photo} locale={locale} />
    </article>
  );
  const pageTitle = t(locale, c?.name || a!.name);
  const description = t(locale, c?.intro || a!.description);
  const categoryGuides = c ? getGuidesByCategory(c.slug) : [];
  const selected = c ? categoryGuides : [];
  const audienceSlugs = a?.guideSlugs || [];
  const originalGuides = c ? selected : audienceSlugs.map((english) => {
    // Existing published source guides, mapped by stable English slug.
    return { slug: english };
  });
  const cards = originalGuides.flatMap((source) => {
    const slug = source.slug;
    const practical = practicalGuideKeyFromSlug("en", slug);
    if (practical) {
      const item = getLocalizedPracticalGuide(locale, practical);
      return [{ guide: item, href: practicalGuidePath(locale, practical) }];
    }
    const href = localizedGeneralPath(locale, slug);
    if (!href) return [];
    const match = categoryGuides.find((item) => item.slug === slug);
    // A guide from another category is still reachable for audience journeys.
    const lookup = match || allGeneralBySlug.get(slug);
    return lookup ? [{ guide: localizedGeneralGuide(lookup, locale), href }] : [];
  });
  const intro = ({
    en: "A practical route, with next steps and primary sources.",
    es: "Una ruta práctica con próximos pasos y fuentes oficiales.",
    de: "Ein praktischer Weg mit nächsten Schritten und amtlichen Quellen.",
  } as const)[locale];
  const stepsLabel = ({ en: "Priorities", es: "Prioridades", de: "Prioritäten" } as const)[locale];
  const topicsLabel = ({ en: "Topics", es: "Temas", de: "Themen" } as const)[locale];
  return <div lang={locale} data-no-translate>
    <section className="page-hero"><div className="shell">
      <Breadcrumbs items={[{ label: ui.home, href: "/" + locale }, { label: pageTitle }]}/>
      <div className="page-hero-grid"><div className="page-hero-copy">
        <span className="eyebrow">{intro}</span><h1>{pageTitle}</h1><p>{description}</p>
      </div><div className="page-stat"><span>{topicsLabel}</span><strong>{cards.length}</strong><small>{t(locale, c?.description || a!.description)}</small></div></div>
    </div></section>
    <div className="shell content-grid">
      <div className="content-main">
        {a && <section className="section-compact"><h2>{stepsLabel}</h2><ol className="priority-list">
          {a.priorities.map((priority) => <li key={priority}>{t(locale, priority)}</li>)}
        </ol></section>}
        {c && <div className="topic-list">
          {c.featuredTopics.map((topic) => <span key={topic}>{t(locale, topic)}</span>)}
        </div>}
        <div className="hub-guide-list">
          {cards.map((card) => <ExactGuideCard key={card.href} guide={card.guide} href={card.href} />)}
        </div>
        <EditorialPhoto photo={photo} locale={locale} />
        <RelatedResources locale={locale} category={c?.slug || "moving-to-germany"} currentPath={hubUrl(locale, slug)!}/>
      </div>
    </div>
  </div>;
}

const allGeneralBySlug = new Map(generalEnglishGuides.map((guide) => [guide.slug, guide]));
