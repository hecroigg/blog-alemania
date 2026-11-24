import Link from "next/link";
import { EditorialPhoto } from "@/components/editorial-photo";
import type { EditorialPhoto as Photo } from "@/lib/content/editorial-photos";
import { generalEnglishGuides, localizedGeneralGuide, localizedGeneralPath } from "@/lib/content/localized-general-guides";
import { exactGuidePath } from "@/lib/exact-guide-routes";
import { getLocalizedExactGuide } from "@/lib/content/localized-exact-guides";
import type { ExactGuideKey } from "@/lib/exact-guide-slugs";
import { hubUrl, toolUrl, type SiteLocale, type ToolId } from "@/lib/locale-paths";

type Topic = {
  guideSlugs: readonly string[];
  exactKeys?: readonly ExactGuideKey[];
  tool: ToolId;
  toolTitle: Record<SiteLocale, string>;
  hub: string;
  hubTitle: Record<SiteLocale, string>;
};

const topics: Record<string, Topic> = {
  "moving-to-germany": {
    guideSlugs: ["first-30-days-germany", "anmeldung-germany"],
    tool: "first-30-days",
    toolTitle: { en: "Plan your first 30 days", es: "Planifica tus primeros 30 días", de: "Die ersten 30 Tage planen" },
    hub: "moving-to-germany",
    hubTitle: { en: "Moving to Germany", es: "Mudarse a Alemania", de: "Umzug nach Deutschland" },
  },
  work: {
    guideSlugs: ["working-in-germany", "jobs-without-german"],
    exactKeys: ["midijob", "leave"],
    tool: "salary-calculator",
    toolTitle: { en: "Calculate your estimated net salary", es: "Calcula tu salario neto estimado", de: "Nettogehalt berechnen" },
    hub: "work",
    hubTitle: { en: "Working in Germany", es: "Trabajar en Alemania", de: "Arbeiten in Deutschland" },
  },
  housing: {
    guideSlugs: ["finding-housing-germany", "renting-in-germany"],
    tool: "rental-deposit",
    toolTitle: { en: "Check your rental deposit", es: "Calcula la fianza del alquiler", de: "Mietkaution berechnen" },
    hub: "housing",
    hubTitle: { en: "Housing in Germany", es: "Vivienda en Alemania", de: "Wohnen in Deutschland" },
  },
  bureaucracy: {
    guideSlugs: ["anmeldung-germany", "german-tax-id"],
    exactKeys: ["anmeldung"],
    tool: "anmeldung-finder",
    toolTitle: { en: "Find your local registration office", es: "Encuentra tu oficina de empadronamiento", de: "Zuständige Meldestelle finden" },
    hub: "bureaucracy",
    hubTitle: { en: "Paperwork and authorities", es: "Trámites y organismos oficiales", de: "Behörden und Unterlagen" },
  },
  money: {
    guideSlugs: ["child-benefits-germany", "cost-of-living-germany", "german-bank-account"],
    exactKeys: ["kindergeld", "allowance"],
    tool: "cost-of-living",
    toolTitle: { en: "Estimate your monthly living costs", es: "Calcula tus gastos mensuales", de: "Monatliche Lebenshaltungskosten berechnen" },
    hub: "money",
    hubTitle: { en: "Money and taxes", es: "Dinero e impuestos", de: "Geld und Steuern" },
  },
  healthcare: {
    guideSlugs: ["german-health-insurance", "first-30-days-germany"],
    exactKeys: ["health"],
    tool: "document-checklist",
    toolTitle: { en: "Check your documents", es: "Comprueba los documentos necesarios", de: "Erforderliche Dokumente prüfen" },
    hub: "healthcare",
    hubTitle: { en: "Health and insurance", es: "Salud y seguros", de: "Gesundheit und Versicherung" },
  },
  transport: {
    guideSlugs: ["deutschlandticket", "best-cities-germany"],
    exactKeys: ["deutschlandticket"],
    tool: "compare-cities",
    toolTitle: { en: "Compare transport and cities", es: "Compara ciudades y transporte", de: "Verkehr und Städte vergleichen" },
    hub: "transport",
    hubTitle: { en: "Transport in Germany", es: "Transporte en Alemania", de: "Verkehr in Deutschland" },
  },
  "daily-life": {
    guideSlugs: ["internet-germany", "german-supermarkets", "german-sim-cards"],
    tool: "cost-of-living",
    toolTitle: { en: "Plan your monthly expenses", es: "Planifica tus gastos mensuales", de: "Monatliche Ausgaben planen" },
    hub: "daily-life",
    hubTitle: { en: "Daily life in Germany", es: "Vida diaria en Alemania", de: "Alltag in Deutschland" },
  },
};

const ui: Record<SiteLocale, { heading: string; intro: string; section: string }> = {
  en: {
    heading: "Useful next steps",
    intro: "Find the next practical answer, compare figures in an interactive tool or explore the complete topic.",
    section: "Browse the complete topic",
  },
  es: {
    heading: "Siguientes pasos útiles",
    intro: "Resuelve la siguiente duda, compara cifras con una herramienta o consulta las guías del mismo tema.",
    section: "Explora todas las guías del tema",
  },
  de: {
    heading: "Sinnvolle nächste Schritte",
    intro: "Finden Sie die nächste praktische Antwort, vergleichen Sie Zahlen mit einem Rechner oder vertiefen Sie das Thema.",
    section: "Alle Ratgeber zum Thema",
  },
};

export function RelatedResources({
  locale, category, currentPath, photo,
}: {
  locale: SiteLocale;
  category: string;
  currentPath: string;
  photo?: Photo;
}) {
  const group = topics[category];
  if (!group) return null;
  const articles = group.guideSlugs.flatMap((slug) => {
    const source = generalEnglishGuides.find((guide) => guide.slug === slug);
    const href = source && localizedGeneralPath(locale, slug);
    if (!source || !href || href === currentPath) return [];
    return [{ href, label: localizedGeneralGuide(source, locale).title }];
  });
  const tool = toolUrl(locale, group.tool);
  const hub = hubUrl(locale, group.hub);
  const links = [
    ...articles,
    ...(group.exactKeys || []).flatMap(key => {
      const href = exactGuidePath(locale, key);
      return href === currentPath ? [] : [{ href, label: getLocalizedExactGuide(locale, key).title }];
    }),
    ...(tool !== currentPath ? [{ href: tool, label: group.toolTitle[locale] }] : []),
    ...(hub && hub !== currentPath ? [{ href: hub, label: ui[locale].section + ": " + group.hubTitle[locale] }] : []),
  ];
  if (!links.length) return null;

  const content = <>
    <h2>{ui[locale].heading}</h2>
    <p>{ui[locale].intro}</p>
    <ul className="related-grid">
      {links.map((item) => <li key={item.href}>
        <Link href={item.href}>{item.label}</Link>
      </li>)}
    </ul>
  </>;
  return <section
    className={photo ? "related-section seo-topic-navigation photo-layout related-with-photo" : "related-section seo-topic-navigation"}
    aria-label={ui[locale].heading} lang={locale} data-no-translate
  >
    {photo ? <div>{content}</div> : content}
    {photo && <EditorialPhoto photo={photo} locale={locale} />}
  </section>;
}
