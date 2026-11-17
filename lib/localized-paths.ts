export type SiteLocale = "es" | "en" | "de";
export const siteLocales: readonly SiteLocale[] = ["es", "en", "de"];
export const isSiteLocale = (value: string): value is SiteLocale => siteLocales.includes(value as SiteLocale);

export const sections = {
  en: { guides: "guides", cities: "cities", tools: "tools" },
  es: { guides: "guias", cities: "ciudades", tools: "herramientas" },
  de: { guides: "ratgeber", cities: "staedte", tools: "werkzeuge" },
} as const;

export const toolSlugs = {
  anmeldung: { en: "anmeldung-finder", es: "buscador-anmeldung", de: "anmeldung-finder" },
  costs: { en: "cost-of-living", es: "coste-de-vida", de: "lebenshaltungskosten" },
  compare: { en: "compare-cities", es: "comparar-ciudades", de: "staedte-vergleichen" },
  documents: { en: "document-checklist", es: "lista-documentos", de: "dokumenten-checkliste" },
  scams: { en: "rental-scam-checker", es: "detectar-estafas-alquiler", de: "mietbetrug-pruefen" },
  arrival: { en: "first-30-days", es: "primeros-30-dias", de: "erste-30-tage" },
  apartment: { en: "apartment-affordability", es: "puedo-pagar-alquiler", de: "wohnung-leisten" },
  salary: { en: "salary-calculator", es: "calculadora-salario", de: "gehaltsrechner" },
  employment: { en: "employment-types", es: "tipos-de-empleo", de: "beschaeftigungsarten" },
} as const;

export type ToolKey = keyof typeof toolSlugs;

export function sectionPath(locale: SiteLocale, type: keyof typeof sections) {
  return "/" + locale + "/" + sections[locale][type];
}
export const guidePath = (locale: SiteLocale, slug: string) => sectionPath(locale, "guides") + "/" + slug;
export const cityPath = (locale: SiteLocale, slug: string) => sectionPath(locale, "cities") + "/" + slug;
export const toolPath = (locale: SiteLocale, key: ToolKey) => sectionPath(locale, "tools") + "/" + toolSlugs[key][locale];
export function matchTool(locale: SiteLocale, slug: string): ToolKey | null {
  return (Object.keys(toolSlugs) as ToolKey[]).find((key) => toolSlugs[key][locale] === slug) || null;
}
export function matchSection(locale: SiteLocale, segment: string) {
  return (Object.keys(sections[locale]) as (keyof typeof sections.en)[]).find((key) => sections[locale][key] === segment) || null;
}
export function localizedTarget(from: SiteLocale, to: SiteLocale, pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  const section = parts[1] && matchSection(from, parts[1]);
  if (!section) return null;
  if (parts.length === 2) return sectionPath(to, section);
  if (section === "cities") return cityPath(to, parts[2]);
  if (section === "tools") {
    const key = matchTool(from, parts[2]);
    return key ? toolPath(to, key) : null;
  }
  return null; // Individual guide equivalents are matched by guide ID elsewhere.
}
