import type { Metadata } from "next";
import { EditorialPhoto, photoOpenGraph } from "@/components/editorial-photo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Icon } from "@/components/icon";
import { JsonLd } from "@/components/json-ld";
import { RelatedResources } from "@/components/related-resources";
import { editorialPhotos, type EditorialPhoto as Photo } from "@/lib/content/editorial-photos";
import { cityMap, cities } from "@/lib/content/cities";
import { getLocalizedCity } from "@/lib/content/city-registration-i18n";
import { christmasMarkets } from "@/lib/content/guides/christmas-markets";
import type { EditorialLocale } from "@/lib/content/localized-general-guides";
import { absoluteUrl } from "@/lib/site";
import { cityFromSlug, cityUrl, guideUrl, sectionPath } from "@/lib/locale-paths";

const cityPhotos: Partial<Record<string, Photo>> = editorialPhotos;
const christmasMarketCities = new Set(["mannheim", "heidelberg", "frankfurt"]);

const i18n = {
  en: {
    home: "Home", cities: "Cities", heading: "Cities in Germany: choose your next home",
    intro: "Explore local housing, commuting, registration and everyday life through guides that link to official municipal information.",
    living: "Living in", best: "Best for", verified: "Local information last reviewed",
    check: "Check current municipal rules before making a booking or signing a contract.",
    sources: "Local and official sources", tools: "Tools and next steps",
    compare: "Compare cities", cost: "Plan your budget", read: "Explore this city",
  },
  es: {
    home: "Inicio", cities: "Ciudades", heading: "Ciudades de Alemania: elige dónde vivir",
    intro: "Compara vivienda, transporte, empadronamiento y vida cotidiana con guías que enlazan los servicios oficiales de cada municipio.",
    living: "Vivir en", best: "Ideal para", verified: "Información local revisada por última vez",
    check: "Comprueba los requisitos municipales vigentes antes de pedir cita o firmar un contrato.",
    sources: "Fuentes locales y oficiales", tools: "Herramientas y próximos pasos",
    compare: "Comparar ciudades", cost: "Calcular mi presupuesto", read: "Explorar esta ciudad",
  },
  de: {
    home: "Startseite", cities: "Städte", heading: "Städte in Deutschland: den richtigen Wohnort finden",
    intro: "Vergleichen Sie Wohnen, Pendeln, Anmeldung und Alltag anhand von Stadtführern mit Links zu amtlichen kommunalen Informationen.",
    living: "Leben in", best: "Geeignet für", verified: "Kommunale Informationen zuletzt geprüft",
    check: "Prüfen Sie aktuelle kommunale Regeln, bevor Sie Termine buchen oder Verträge unterschreiben.",
    sources: "Lokale und amtliche Quellen", tools: "Werkzeuge und nächste Schritte",
    compare: "Städte vergleichen", cost: "Budget planen", read: "Stadtführer öffnen",
  },
} as const;
const locales = ["en", "es", "de"] as const;
export function cityStaticParams(locale: EditorialLocale) { return cities.map((city) => ({ slug: cityUrl(locale, city.slug)!.split("/").at(-1)! })); }
const languageLinks = (pathSuffix: string) => Object.fromEntries(
  locales.map((lang) => [lang, absoluteUrl(pathSuffix ? cityUrl(lang, pathSuffix.slice(1))! : sectionPath(lang, "cities"))])
);

export function citiesIndexMetadata(locale: EditorialLocale): Metadata {
  const c = i18n[locale];
  return {
    title: c.heading, description: c.intro,
    alternates: { canonical: absoluteUrl(sectionPath(locale, "cities")), languages: languageLinks("") },
    robots: { index: true, follow: true },
    openGraph: { title: c.heading, description: c.intro, locale },
  };
}

export function cityDetailMetadata(locale: EditorialLocale, slug: string): Metadata {
  const raw = cityMap.get(cityFromSlug(locale, slug) || slug);
  if (!raw) return {};
  const city = getLocalizedCity(raw, locale);
  const title = i18n[locale].living + " " + city.name;
  const canonical = absoluteUrl(cityUrl(locale, city.slug)!);
  const photo = cityPhotos[city.slug];
  return {
    title, description: city.description,
    alternates: { canonical, languages: languageLinks("/" + city.slug) },
    robots: { index: true, follow: true },
    openGraph: {
      type: "article", title, description: city.description, url: canonical, locale,
      ...(photo && { images: [photoOpenGraph(photo, locale)] }),
    },
  };
}

export function LocalizedCitiesIndex({ locale }: { locale: EditorialLocale }) {
  const c = i18n[locale];
  return <div lang={locale} data-no-translate>
    <section className="page-hero"><div className="shell">
      <Breadcrumbs items={[{ label: c.home, href: "/" + locale }, { label: c.cities }]}/>
      <div className="photo-layout"><div className="page-hero-copy">
        <span className="eyebrow">GermanyBase · {c.cities}</span>
        <h1>{c.heading}</h1><p>{c.intro}</p>
      </div><EditorialPhoto photo={editorialPhotos.heidelberg} locale={locale} aboveFold /></div>
    </div></section>
    <section className="section shell">
      <div className="action-card-grid">
      {cities.map((raw) => {
        const city = getLocalizedCity(raw, locale);
        return <Link key={city.slug} href={cityUrl(locale, city.slug)!} className="action-card">
          <strong>{city.name} · {city.region}</strong>
          <small>{city.description}</small><Icon name="arrow" />
        </Link>;
      })}
    </div></section>
  </div>;
}

const headingId = (value: string) => value.toLowerCase().normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export function LocalizedCityPage({ locale, slug }: { locale: EditorialLocale; slug: string }) {
  const source = cityMap.get(cityFromSlug(locale, slug) || slug);
  if (!source) notFound();
  const city = getLocalizedCity(source, locale);
  const c = i18n[locale];
  const title = c.living + " " + city.name;
  const url = absoluteUrl(cityUrl(locale, city.slug)!);
  const photo = cityPhotos[city.slug];
  return <article lang={locale} data-no-translate>
    <section className="page-hero city-detail-hero"><div className="shell">
      <Breadcrumbs items={[
        { label: c.home, href: "/" + locale },
        { label: c.cities, href: sectionPath(locale, "cities") },
        { label: city.name },
      ]}/>
      <div className="photo-layout"><div className="page-hero-copy">
        <span className="eyebrow">{city.region}</span>
        <h1>{title}</h1><p>{city.description}</p>
      </div>{photo && <EditorialPhoto photo={photo} locale={locale} aboveFold />}</div>
    </div></section>
    <div className="shell content-grid">
      <div className="content-main">
        <p className="lead">{c.best}: {city.bestFor}</p>
        <p>{city.character}</p>
        {city.updated && <p>{c.verified}: <time dateTime={city.updated}>{city.updated}</time>. {c.check}</p>}
        {christmasMarketCities.has(city.slug) && <div className="related-grid">
          <Link href={guideUrl(locale, christmasMarkets.slugs[locale])}>
            <span>{christmasMarkets.copy[locale].title}</span><Icon name="arrow" />
          </Link>
        </div>}
        {city.sections.map((section) => <section className="article-section" key={section.heading} id={headingId(section.heading)}>
          <h2>{section.heading}</h2>
          {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
          {section.resources && <div className="resource-grid">{section.resources.map((resource) =>
            <a href={resource.url} target="_blank" rel="noopener noreferrer" key={resource.url}>
              <span><strong>{resource.label}</strong><small>{resource.note}</small></span><Icon name="external" />
            </a>)}</div>}
          {section.callout && <aside className={"callout callout-" + (section.callout.tone || "note")}>
            <strong>{section.callout.title}</strong><p>{section.callout.text}</p>
          </aside>}
        </section>)}
        <section className="sources-section">
          <h2>{c.sources}</h2><ul className="source-list">
            {city.sources.map((source) =>
              <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">
                <span><strong>{source.name}</strong>{source.note && <small>{source.note}</small>}</span>
                <Icon name="external" />
              </a></li>
            )}
          </ul>
        </section>
        <RelatedResources locale={locale} category="bureaucracy" currentPath={cityUrl(locale,city.slug)!}/>
        <nav className="locale-alternates" aria-label={c.cities}>
          {locales.map((lang) =>
            <Link href={cityUrl(lang, city.slug)!} lang={lang} hrefLang={lang} key={lang}
              aria-current={locale === lang ? "page" : undefined}>{({ en: "🇬🇧 English", es: "🇪🇸 Español", de: "🇩🇪 Deutsch" } as const)[lang]}</Link>
          )}
        </nav>
      </div>
      <aside className="sidebar-card">
        <h2>{c.tools}</h2>
        <Link href={sectionPath(locale, "cities")}>{c.compare} <Icon name="arrow" /></Link>
        <Link href={"/" + locale + "/guides"}>{c.cost} <Icon name="arrow" /></Link>
      </aside>
    </div>
    <JsonLd data={{
      "@context": "https://schema.org", "@type": "Article",
      headline: title, description: city.description, inLanguage: locale,
      dateModified: city.updated, mainEntityOfPage: url,
      ...(photo && { image: absoluteUrl(photo.src) }),
      about: { "@type": "City", name: city.name, containedInPlace: { "@type": "AdministrativeArea", name: city.region } },
    }}/>
  </article>;
}
