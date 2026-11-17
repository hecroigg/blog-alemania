import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { JsonLd } from "@/components/json-ld";
import { getLocalizedExactGuide } from "@/lib/content/localized-exact-guides";
import { exactGuidePath } from "@/lib/exact-guide-routes";
import type { ExactGuideKey } from "@/lib/exact-guide-slugs";
import { absoluteUrl } from "@/lib/site";

export type PublicLanguage = "en" | "de";
type Copy = {
  intro: string; title: string; description: string; start: string; all: string;
  topics: string; reminder: string; official: string;
  sections: { id: string; label: string; title: string; description: string; keys: readonly ExactGuideKey[] }[];
};

const copy: Record<PublicLanguage, Copy> = {
  en: {
    intro: "GermanyBase · English", title: "Living and working in Germany, made clearer",
    description: "Practical information on registration, employment, health cover and daily life in Germany. Start with the question you need to answer.",
    start: "Start with paperwork", all: "All English guides", topics: "Paperwork · Work · Everyday life",
    reminder: "GermanyBase is independent and is not a government service. Laws and requirements vary by situation and date. Check the responsible authority before making decisions.",
    official: "German administration portal",
    sections: [
      { id: "documents", label: "01 · Paperwork", title: "Registration and essential documents", description: "Find out which steps and official documents matter after arrival.", keys: ["anmeldung", "rundfunk", "health"] },
      { id: "work", label: "02 · Employment", title: "Contracts and pay", description: "Understand employment types and the rules affecting your pay.", keys: ["minijob", "midijob", "leave"] },
      { id: "everyday", label: "03 · Daily life", title: "Housing, travel and money", description: "Plan the practical details of your life in Germany.", keys: ["deposit", "deutschlandticket", "allowance"] },
    ],
  },
  de: {
    intro: "GermanyBase · Deutsch", title: "Leben und Arbeiten in Deutschland – einfach erklärt",
    description: "Praktische Informationen zu Anmeldung, Beschäftigung, Krankenversicherung und Alltag. Beginnen Sie bei der Frage, die Sie gerade beschäftigt.",
    start: "Mit den Behördengängen beginnen", all: "Alle deutschen Ratgeber", topics: "Behörden · Arbeit · Alltag",
    reminder: "GermanyBase ist unabhängig und keine Behörde. Gesetze und Anforderungen hängen von der persönlichen Situation ab und können sich ändern. Prüfen Sie die Angaben bei den zuständigen Stellen.",
    official: "Verwaltungsportal des Bundes",
    sections: [
      { id: "documents", label: "01 · Behörden", title: "Anmeldung und wichtige Unterlagen", description: "Orientierung zu Fristen, Registrierung und Krankenversicherung.", keys: ["anmeldung", "rundfunk", "health"] },
      { id: "work", label: "02 · Arbeit", title: "Beschäftigung und Gehalt", description: "Beschäftigungsformen und Ansprüche verständlich vergleichen.", keys: ["minijob", "midijob", "leave"] },
      { id: "everyday", label: "03 · Alltag", title: "Wohnen, Mobilität und Steuern", description: "Wichtige Fragen rund um Mietvertrag, Tickets und Einkommen.", keys: ["deposit", "deutschlandticket", "allowance"] },
    ],
  },
};

export const localizedHomeAlternates = {
  en: absoluteUrl("/en"), es: absoluteUrl("/es"),
  de: absoluteUrl("/de"),
  "x-default": absoluteUrl("/"),
};

export function localizedHomeMetadata(locale: PublicLanguage): Metadata {
  const page = copy[locale];
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: absoluteUrl("/" + locale), languages: localizedHomeAlternates },
    robots: { index: true, follow: true },
    openGraph: { type: "website", title: page.title, description: page.description, locale, url: absoluteUrl("/" + locale) },
  };
}

export function LocalizedHome({ locale }: { locale: PublicLanguage }) {
  const page = copy[locale];
  const allKeys = page.sections.flatMap((section) => section.keys);
  return (
    <div lang={locale} data-no-translate>
      <section className="page-hero">
        <div className="shell">
          <div className="page-hero-grid">
            <div className="page-hero-copy">
              <span className="eyebrow">{page.intro}</span>
              <h1>{page.title}</h1>
              <p>{page.description}</p>
              <div className="hero-actions">
                <Link className="button button-primary button-large" href={"/" + locale + "#documents"}>{page.start} <Icon name="arrow" /></Link>
                <Link className="button button-secondary button-large" href={"/" + locale + "/guides"}>{page.all}</Link>
              </div>
            </div>
            <div className="page-stat"><span>GermanyBase</span><strong>3</strong><small>{page.topics}</small></div>
          </div>
        </div>
      </section>
      {page.sections.map((section) => (
        <section className="section shell section-compact" key={section.id} id={section.id}>
          <div className="section-heading">
            <div><span className="eyebrow">{section.label}</span><h2>{section.title}</h2></div>
            <p>{section.description}</p>
          </div>
          <div className="action-card-grid">
            {section.keys.map((key) => {
              const guide = getLocalizedExactGuide(locale, key);
              return <Link key={key} href={exactGuidePath(locale, key)} className="action-card">
                <strong>{guide.title}</strong><small>{guide.description}</small><Icon name="arrow" />
              </Link>;
            })}
          </div>
        </section>
      ))}
      <section className="section shell section-compact">
        <div className="section-heading">
          <div><span className="eyebrow">GermanyBase</span><h2>{page.official}</h2></div>
          <p>{page.reminder}</p>
        </div>
        <div className="center-action">
          <a className="button button-secondary button-large" href="https://verwaltung.bund.de/" rel="noopener noreferrer" target="_blank">
            {page.official} <Icon name="external" />
          </a>
        </div>
      </section>
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "CollectionPage",
        name: page.title, description: page.description,
        url: absoluteUrl("/" + locale), inLanguage: locale,
        mainEntity: { "@type": "ItemList", itemListElement: allKeys.map((key, index) => ({
          "@type": "ListItem", position: index + 1,
          name: getLocalizedExactGuide(locale, key).title, url: absoluteUrl(exactGuidePath(locale, key)),
        })) },
      }} />
    </div>
  );
}
