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

export function sectionPath(locale: SiteLocale, type: keyof typeof sections.en) {
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

export const hubSlugs = {
  "moving-to-germany": { en: "moving-to-germany", es: "mudarse-a-alemania", de: "umzug-nach-deutschland" },
  work: { en: "work", es: "trabajo", de: "arbeit" },
  housing: { en: "housing", es: "vivienda", de: "wohnen" },
  bureaucracy: { en: "bureaucracy", es: "tramites", de: "behoerden" },
  money: { en: "money", es: "dinero", de: "finanzen" },
  healthcare: { en: "healthcare", es: "salud", de: "gesundheit" },
  transport: { en: "transport", es: "transporte", de: "verkehr" },
  "daily-life": { en: "daily-life", es: "vida-diaria", de: "alltag" },
  students: { en: "students", es: "estudiantes", de: "studierende" },
  workers: { en: "workers", es: "trabajadores", de: "arbeitnehmer" },
  families: { en: "families", es: "familias", de: "familien" },
  freelancers: { en: "freelancers", es: "autonomos", de: "selbststaendige" },
  "eu-citizens": { en: "eu-citizens", es: "ciudadanos-ue", de: "eu-buerger" },
  "non-eu-citizens": { en: "non-eu-citizens", es: "ciudadanos-no-ue", de: "nicht-eu-buerger" },
  about: { en: "about", es: "quienes-somos", de: "ueber-uns" },
  "editorial-policy": { en: "editorial-policy", es: "politica-editorial", de: "redaktionelle-richtlinien" },
  "how-we-research": { en: "how-we-research", es: "como-investigamos", de: "unsere-recherche" },
  "corrections-policy": { en: "corrections-policy", es: "correcciones", de: "korrekturen" },
  "affiliate-disclosure": { en: "affiliate-disclosure", es: "aviso-afiliados", de: "affiliate-hinweis" },
  "advertiser-disclosure": { en: "advertiser-disclosure", es: "publicidad", de: "werbehinweis" },
  "privacy-policy": { en: "privacy-policy", es: "privacidad", de: "datenschutz" },
  "cookie-policy": { en: "cookie-policy", es: "cookies", de: "cookies" },
  terms: { en: "terms", es: "condiciones", de: "nutzungsbedingungen" },
  contact: { en: "contact", es: "contacto", de: "kontakt" },
} as const;
export type HubKey = keyof typeof hubSlugs;
export const hubPath = (locale: SiteLocale, slug: HubKey) => "/" + locale + "/" + hubSlugs[slug][locale];
export function matchHub(locale: SiteLocale, slug: string): HubKey | null {
  return (Object.keys(hubSlugs) as HubKey[]).find((key) => hubSlugs[key][locale] === slug) || null;
}

export const auxiliarySlugs = {
  plan: { en: "plan", es: "planificar-mudanza", de: "umzug-planen" },
  visas: { en: "visas-residence", es: "visados-residencia", de: "visa-aufenthalt" },
  costs: { en: "costs-deadlines", es: "costes-plazos", de: "kosten-fristen" },
  authorities: { en: "authorities", es: "organismos-oficiales", de: "behoerden-wegweiser" },
  emergency: { en: "emergency", es: "emergencias", de: "notfallnummern" },
  data: { en: "data-status", es: "estado-datos", de: "datenstatus" },
  glossary: { en: "glossary", es: "glosario", de: "glossar" },
  explore: { en: "explore-germany", es: "explorar-alemania", de: "deutschland-entdecken" },
  search: { en: "search", es: "buscar", de: "suche" },
} as const;
export type AuxiliaryKey = keyof typeof auxiliarySlugs;
export const auxiliaryPath = (locale: SiteLocale, key: AuxiliaryKey) => "/" + locale + "/" + auxiliarySlugs[key][locale];
export function matchAuxiliary(locale: SiteLocale, slug: string): AuxiliaryKey | null {
  return (Object.keys(auxiliarySlugs) as AuxiliaryKey[]).find((key) => auxiliarySlugs[key][locale] === slug) || null;
}
