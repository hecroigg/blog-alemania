/**
 * Canonical, human-readable route segments for GermanyBase.
 * Keep IDs stable; localized URLs can change without changing business logic.
 * Never use translation of an arbitrary slug as a fallback to invent a URL.
 */
export const locales = ["en", "es", "de"] as const;
export type SiteLocale = (typeof locales)[number];

const sections = {
  en: { guides: "guides", cities: "cities", tools: "tools", search: "search" },
  es: { guides: "guias", cities: "ciudades", tools: "herramientas", search: "buscar" },
  de: { guides: "ratgeber", cities: "staedte", tools: "werkzeuge", search: "suche" },
} as const;
export type RouteSection = keyof (typeof sections)["en"];
export const sectionSlug = (locale: SiteLocale, section: RouteSection): string => sections[locale][section];
export const sectionPath = (locale: SiteLocale, section: RouteSection): string => `/${locale}/${sectionSlug(locale, section)}`;
export const guideUrl = (locale: SiteLocale, slug: string): string => `${sectionPath(locale, "guides")}/${slug}`;

const hubs = {
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
  "editorial-policy": { en: "editorial-policy", es: "politica-editorial", de: "redaktionsrichtlinien" },
  "how-we-research": { en: "how-we-research", es: "como-investigamos", de: "unsere-recherche" },
  "corrections-policy": { en: "corrections-policy", es: "correcciones", de: "korrekturen" },
  "affiliate-disclosure": { en: "affiliate-disclosure", es: "aviso-afiliados", de: "affiliate-hinweise" },
  "advertiser-disclosure": { en: "advertiser-disclosure", es: "aviso-publicidad", de: "werbehinweise" },
  "privacy-policy": { en: "privacy-policy", es: "privacidad", de: "datenschutz" },
  "cookie-policy": { en: "cookie-policy", es: "cookies", de: "cookies" },
  terms: { en: "terms", es: "condiciones-de-uso", de: "nutzungsbedingungen" },
  contact: { en: "contact", es: "contacto", de: "kontakt" },
} as const;
export type HubId = keyof typeof hubs;
export const hubIds = Object.keys(hubs) as HubId[];
export function hubUrl(locale: SiteLocale, id: string) {
  const route = hubs[id as HubId];
  return route ? `/${locale}/${route[locale]}` : null;
}
export function hubFromSlug(locale: SiteLocale, slug: string): HubId | null {
  return hubIds.find((id) => hubs[id][locale] === slug) || null;
}
export function anyHubFromSlug(locale: SiteLocale, slug: string): HubId | null {
  return hubFromSlug(locale, slug) || (hubIds.includes(slug as HubId) ? slug as HubId : null);
}

const citySlugs = {
  mannheim: { en: "mannheim", es: "mannheim", de: "mannheim" },
  berlin: { en: "berlin", es: "berlin", de: "berlin" },
  munich: { en: "munich", es: "munich", de: "muenchen" },
  hamburg: { en: "hamburg", es: "hamburgo", de: "hamburg" },
  frankfurt: { en: "frankfurt", es: "francfort", de: "frankfurt" },
  cologne: { en: "cologne", es: "colonia", de: "koeln" },
  dusseldorf: { en: "dusseldorf", es: "dusseldorf", de: "duesseldorf" },
  stuttgart: { en: "stuttgart", es: "stuttgart", de: "stuttgart" },
  heidelberg: { en: "heidelberg", es: "heidelberg", de: "heidelberg" },
  freiburg: { en: "freiburg", es: "friburgo", de: "freiburg" },
  karlsruhe: { en: "karlsruhe", es: "karlsruhe", de: "karlsruhe" },
  leipzig: { en: "leipzig", es: "leipzig", de: "leipzig" },
  dresden: { en: "dresden", es: "dresde", de: "dresden" },
  nuremberg: { en: "nuremberg", es: "nuremberg", de: "nuernberg" },
  hannover: { en: "hannover", es: "hannover", de: "hannover" },
  bremen: { en: "bremen", es: "bremen", de: "bremen" },
} as const;
export const cityIds = Object.keys(citySlugs) as (keyof typeof citySlugs)[];
export function cityUrl(locale: SiteLocale, id: string): string | null {
  const route = citySlugs[id as keyof typeof citySlugs];
  return route ? `${sectionPath(locale, "cities")}/${route[locale]}` : null;
}
export function cityFromSlug(locale: SiteLocale, slug: string): string | null {
  return cityIds.find((id) => citySlugs[id][locale] === slug) || null;
}

const tools = {
  "anmeldung-finder": { en: "anmeldung-finder", es: "buscador-anmeldung", de: "anmeldung-finder" },
  "cost-of-living": { en: "cost-of-living", es: "coste-de-vida", de: "lebenshaltungskosten" },
  "compare-cities": { en: "compare-cities", es: "comparar-ciudades", de: "staedte-vergleichen" },
  "document-checklist": { en: "document-checklist", es: "lista-documentos", de: "dokumenten-checkliste" },
  "rental-scam-checker": { en: "rental-scam-checker", es: "detectar-estafas-alquiler", de: "mietbetrug-pruefen" },
  "first-30-days": { en: "first-30-days", es: "primeros-30-dias", de: "erste-30-tage" },
  "apartment-affordability": { en: "apartment-affordability", es: "puedo-pagar-este-alquiler", de: "wohnung-leistbar" },
  "salary-calculator": { en: "salary-calculator", es: "calculadora-salario", de: "gehaltsrechner" },
  "employment-types": { en: "employment-types", es: "tipos-de-empleo", de: "beschaeftigungsarten" },
  "rental-deposit": { en: "rental-deposit", es: "fianza-alquiler", de: "mietkaution" },
} as const;
export type ToolId = keyof typeof tools;
export const toolIds = Object.keys(tools) as ToolId[];
export function toolUrl(locale: SiteLocale, id: ToolId): string {
  return `${sectionPath(locale, "tools")}/${tools[id][locale]}`;
}
export function toolFromSlug(locale: SiteLocale, slug: string): ToolId | null {
  return toolIds.find((id) => tools[id][locale] === slug) || null;
}
export function anyToolFromSlug(locale: SiteLocale, slug: string): ToolId | null {
  return toolFromSlug(locale, slug) || (toolIds.includes(slug as ToolId) ? slug as ToolId : null);
}

export const otherPages = {
  plan: { en: "plan", es: "plan-de-mudanza", de: "umzugsplan" },
  visa: { en: "visas-residence", es: "visados-y-residencia", de: "visum-und-aufenthalt" },
  glossary: { en: "glossary", es: "glosario", de: "glossar" },
  authorities: { en: "authorities", es: "organismos-oficiales", de: "behoerdenverzeichnis" },
  emergency: { en: "emergency", es: "emergencias", de: "notfaelle" },
  "data-status": { en: "data-status", es: "estado-datos", de: "datenstatus" },
  "costs-deadlines": { en: "costs-deadlines", es: "precios-y-plazos", de: "kosten-und-fristen" },
  "explore-germany": { en: "explore-germany", es: "explorar-alemania", de: "deutschland-entdecken" },
} as const;
export type OtherPageId = keyof typeof otherPages;
export function otherUrl(locale: SiteLocale, id: OtherPageId) {
  return `/${locale}/${otherPages[id][locale]}`;
}
export function otherFromSlug(locale: SiteLocale, slug: string): OtherPageId | null {
  return (Object.keys(otherPages) as OtherPageId[]).find((id) => otherPages[id][locale] === slug) || null;
}
export function anyOtherFromSlug(locale: SiteLocale, slug: string): OtherPageId | null {
  return otherFromSlug(locale, slug) || ((Object.keys(otherPages) as string[]).includes(slug) ? slug as OtherPageId : null);
}

export function localeForPath(pathname: string): SiteLocale {
  const prefix = pathname.split("/").filter(Boolean)[0];
  return locales.includes(prefix as SiteLocale) ? prefix as SiteLocale : "en";
}
export function equivalentPath(source: string, targetLocale: SiteLocale): string | null {
  const segments = source.split("/").filter(Boolean);
  const src = localeForPath(source);
  const first = segments[0];
  const rest = locales.includes(first as SiteLocale) ? segments.slice(1) : segments;
  if (!rest.length) return "/" + targetLocale;
  const [part, slug] = rest;
  const langPart = (Object.keys(sections[src]) as RouteSection[]).find((kind) => sections[src][kind] === part);
  if (langPart === "guides" && slug) return null; // guide-slug switching handled by the guide route module
  if (langPart === "cities") return slug
    ? (cityUrl(targetLocale, cityFromSlug(src, slug) || slug) || null)
    : sectionPath(targetLocale, "cities");
  if (langPart === "tools") return slug
    ? toolUrl(targetLocale, toolFromSlug(src, slug) || slug as ToolId)
    : sectionPath(targetLocale, "tools");
  if (langPart === "search") return sectionPath(targetLocale, "search");
  const hub = anyHubFromSlug(src, part);
  if (hub && !slug) return hubUrl(targetLocale, hub);
  const other = anyOtherFromSlug(src, part);
  if (other && !slug) return otherUrl(targetLocale, other);
  return null;
}
