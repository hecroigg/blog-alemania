import { refinePriorityGuide } from "@/lib/content/growth-guide-updates";
import { guides } from "@/lib/content/guides";
import { authoredGuideForLocale } from "@/lib/content/guides/authored-guide";
import { authoredGuides } from "@/lib/content/guides/authored-guides";
import type { Guide } from "@/lib/types";
import { enhanceGeneralGuide } from "@/lib/content/seo-guide-enhancements";
import { guideUrl } from "@/lib/locale-paths";
import esCatalog from "@/lib/translations/es.json";
import deCatalog from "@/lib/translations/de.json";

export type EditorialLocale = "en" | "es" | "de";
const catalog: Record<"es" | "de", Record<string, string>> = {
  es: esCatalog as Record<string, string>,
  de: deCatalog as Record<string, string>,
};

// Keep the public legacy URLs valid via permanent redirects, but give each
// translated article one self-canonical, search-friendly URL.
const slugs: Record<string, { es: string; de: string }> = {
  "moving-to-germany": { es: "mudarse-a-alemania", de: "umzug-nach-deutschland" },
  "first-30-days-germany": { es: "primeros-30-dias-alemania", de: "erste-30-tage-deutschland" },
  "anmeldung-germany": { es: "anmeldung-alemania-guia", de: "anmeldung-deutschland-ratgeber" },
  wohnungsgeberbestaetigung: { es: "wohnungsgeberbestaetigung-alemania", de: "wohnungsgeberbestaetigung-erklaert" },
  "german-tax-id": { es: "steuer-id-alemania", de: "steuer-id-deutschland" },
  "finding-housing-germany": { es: "buscar-vivienda-alemania", de: "wohnung-finden-deutschland" },
  "renting-in-germany": { es: "alquilar-piso-alemania", de: "wohnung-mieten-deutschland" },
  "schufa-germany": { es: "schufa-alemania", de: "schufa-deutschland" },
  "working-in-germany": { es: "trabajar-en-alemania", de: "arbeiten-in-deutschland" },
  "jobs-without-german": { es: "trabajar-alemania-sin-aleman", de: "jobs-ohne-deutschkenntnisse" },
  "minijob-germany": { es: "guia-minijob-alemania", de: "minijob-ratgeber-deutschland" },
  "werkstudent-germany": { es: "werkstudent-alemania", de: "werkstudent-deutschland" },
  "german-health-insurance": { es: "seguro-medico-alemania-guia", de: "krankenversicherung-deutschland-guide" },
  "german-bank-account": { es: "cuenta-bancaria-alemania", de: "bankkonto-eroeffnen-deutschland" },
  deutschlandticket: { es: "deutschlandticket-guia", de: "deutschlandticket-ratgeber" },
  "cost-of-living-germany": { es: "coste-de-vida-alemania", de: "lebenshaltungskosten-deutschland" },
  "german-sim-cards": { es: "tarjetas-sim-alemania", de: "sim-karte-deutschland" },
  "internet-germany": { es: "internet-casa-alemania", de: "internetanschluss-deutschland" },
  "german-supermarkets": { es: "supermercados-alemania", de: "supermarkt-deutschland" },
  "german-documents-explained": { es: "documentos-alemania-explicados", de: "dokumente-deutschland-erklaert" },
  "newcomer-faq-germany": { es: "preguntas-frecuentes-mudarse-alemania", de: "deutschland-neuankommlinge-faq" },
  "best-cities-germany": { es: "mejores-ciudades-alemania", de: "beste-staedte-deutschland" },
};

export const generalEnglishGuides = guides.filter((guide) => authoredGuides.has(guide.slug) || Object.hasOwn(slugs, guide.slug));

export function localizedGeneralSlug(locale: EditorialLocale, englishSlug: string) {
  const article = authoredGuides.get(englishSlug);
  if (article) return article.slugs[locale];
  if (!Object.hasOwn(slugs, englishSlug)) return null;
  return locale === "en" ? englishSlug : slugs[englishSlug][locale];
}
export function localizedGeneralPath(locale: EditorialLocale, englishSlug: string) {
  const slug = localizedGeneralSlug(locale, englishSlug);
  return slug ? guideUrl(locale, slug) : null;
}
export function generalGuideFromSlug(locale: EditorialLocale, slug: string) {
  return generalEnglishGuides.find((guide) => localizedGeneralSlug(locale, guide.slug) === slug) || null;
}
export function generalGuideStaticParams(locale: EditorialLocale) {
  return generalEnglishGuides.map((guide) => ({ slug: localizedGeneralSlug(locale, guide.slug)! }));
}
function translate(value: string, locale: EditorialLocale) {
  return locale === "en" ? value : catalog[locale][value] || value;
}
export function localizedGeneralGuide(guide: Guide, locale: EditorialLocale): Guide {
  return refinePriorityGuide(translateGuide(guide, locale), guide.slug, locale);
}

function translateGuide(guide: Guide, locale: EditorialLocale): Guide {
  const article = authoredGuides.get(guide.slug);
  if (article) return authoredGuideForLocale(article, locale);
  if (locale === "en") return enhanceGeneralGuide(guide, guide.slug, locale);
  const t = (value: string) => translate(value, locale);
  return enhanceGeneralGuide({
    ...guide,
    slug: localizedGeneralSlug(locale, guide.slug) || guide.slug,
    title: t(guide.title),
    description: t(guide.description),
    eyebrow: t(guide.eyebrow),
    summary: t(guide.summary),
    takeaways: guide.takeaways.map(t),
    sections: guide.sections.map((section) => ({
      ...section,
      heading: t(section.heading),
      paragraphs: section.paragraphs.map(t),
      bullets: section.bullets?.map(t),
      resources: section.resources?.map((resource) => ({
        ...resource, label: t(resource.label), note: t(resource.note),
      })),
      callout: section.callout && {
        ...section.callout, title: t(section.callout.title), text: t(section.callout.text),
      },
    })),
    faqs: guide.faqs.map((faq) => ({ question: t(faq.question), answer: t(faq.answer) })),
    sources: guide.sources.map((source) => ({
      ...source, name: t(source.name), note: source.note ? t(source.note) : undefined,
    })),
    // Relationship identifiers remain in the original language and are
    // converted to localized links by the page component.
    related: guide.related,
  }, guide.slug, locale);
}
