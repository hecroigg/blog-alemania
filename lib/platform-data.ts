export const supportedLocales = ["en", "es", "de", "fr", "it", "pt", "pl", "uk"] as const;
export type Locale = (typeof supportedLocales)[number];

export const localeLabels: Record<Locale, { label: string; flag: string }> = {
  en: { label: "English", flag: "🇬🇧" },
  es: { label: "Español", flag: "🇪🇸" },
  de: { label: "Deutsch", flag: "🇩🇪" },
  fr: { label: "Français", flag: "🇫🇷" },
  it: { label: "Italiano", flag: "🇮🇹" },
  pt: { label: "Português", flag: "🇵🇹" },
  pl: { label: "Polski", flag: "🇵🇱" },
  uk: { label: "Українська", flag: "🇺🇦" },
};

export const uiCopy: Record<Locale, {
  search: string;
  language: string;
  menu: string;
  plan: string;
  tools: string;
  guides: string;
  visa: string;
  cities: string;
  more: string;
  about: string;
  navigation: Record<string, string>;
}> = {
  en: { search: "Search", language: "Language", menu: "Open menu", plan: "Plan your move", tools: "Tools", guides: "All guides", visa: "Visas & residence", cities: "Cities", more: "More", about: "About", navigation: { "/moving-to-germany": "Move", "/work": "Work", "/housing": "Housing", "/bureaucracy": "Bureaucracy", "/money": "Money", "/healthcare": "Healthcare", "/transport": "Transport", "/daily-life": "Daily life", "/cities": "Cities", "/tools": "Tools", "/authorities": "Authorities", "/emergency": "Emergency", "/data-status": "Data status" } },
  es: { search: "Buscar", language: "Idioma", menu: "Abrir menú", plan: "Planifica tu mudanza", tools: "Herramientas", guides: "Todas las guías", visa: "Visados y residencia", cities: "Ciudades", more: "Más", about: "Quiénes somos", navigation: { "/moving-to-germany": "Mudanza", "/work": "Trabajo", "/housing": "Vivienda", "/bureaucracy": "Trámites", "/money": "Dinero", "/healthcare": "Salud", "/transport": "Transporte", "/daily-life": "Vida diaria", "/cities": "Ciudades", "/tools": "Herramientas", "/authorities": "Autoridades", "/emergency": "Emergencias", "/data-status": "Estado de los datos" } },
  de: { search: "Suchen", language: "Sprache", menu: "Menü öffnen", plan: "Umzug planen", tools: "Tools", guides: "Alle Ratgeber", visa: "Visa & Aufenthalt", cities: "Städte", more: "Mehr", about: "Über uns", navigation: { "/moving-to-germany": "Umzug", "/work": "Arbeit", "/housing": "Wohnen", "/bureaucracy": "Behörden", "/money": "Finanzen", "/healthcare": "Gesundheit", "/transport": "Verkehr", "/daily-life": "Alltag", "/cities": "Städte", "/tools": "Tools", "/authorities": "Ämter", "/emergency": "Notfall", "/data-status": "Datenstatus" } },
  fr: { search: "Rechercher", language: "Langue", menu: "Ouvrir le menu", plan: "Planifier mon départ", tools: "Outils", guides: "Tous les guides", visa: "Visas et séjour", cities: "Villes", more: "Plus", about: "À propos", navigation: { "/moving-to-germany": "S'installer", "/work": "Travail", "/housing": "Logement", "/bureaucracy": "Démarches", "/money": "Finances", "/healthcare": "Santé", "/transport": "Transport", "/daily-life": "Vie quotidienne", "/cities": "Villes", "/tools": "Outils", "/authorities": "Autorités", "/emergency": "Urgences", "/data-status": "État des données" } },
  it: { search: "Cerca", language: "Lingua", menu: "Apri menu", plan: "Pianifica il trasferimento", tools: "Strumenti", guides: "Tutte le guide", visa: "Visti e soggiorno", cities: "Città", more: "Altro", about: "Chi siamo", navigation: { "/moving-to-germany": "Trasferimento", "/work": "Lavoro", "/housing": "Casa", "/bureaucracy": "Burocrazia", "/money": "Finanze", "/healthcare": "Salute", "/transport": "Trasporti", "/daily-life": "Vita quotidiana", "/cities": "Città", "/tools": "Strumenti", "/authorities": "Autorità", "/emergency": "Emergenze", "/data-status": "Stato dei dati" } },
  pt: { search: "Pesquisar", language: "Idioma", menu: "Abrir menu", plan: "Planeie a mudança", tools: "Ferramentas", guides: "Todos os guias", visa: "Vistos e residência", cities: "Cidades", more: "Mais", about: "Sobre", navigation: { "/moving-to-germany": "Mudança", "/work": "Trabalho", "/housing": "Habitação", "/bureaucracy": "Burocracia", "/money": "Finanças", "/healthcare": "Saúde", "/transport": "Transportes", "/daily-life": "Vida diária", "/cities": "Cidades", "/tools": "Ferramentas", "/authorities": "Autoridades", "/emergency": "Emergências", "/data-status": "Estado dos dados" } },
  pl: { search: "Szukaj", language: "Język", menu: "Otwórz menu", plan: "Zaplanuj przeprowadzkę", tools: "Narzędzia", guides: "Wszystkie poradniki", visa: "Wizy i pobyt", cities: "Miasta", more: "Więcej", about: "O nas", navigation: { "/moving-to-germany": "Przeprowadzka", "/work": "Praca", "/housing": "Mieszkanie", "/bureaucracy": "Formalności", "/money": "Finanse", "/healthcare": "Zdrowie", "/transport": "Transport", "/daily-life": "Codzienność", "/cities": "Miasta", "/tools": "Narzędzia", "/authorities": "Urzędy", "/emergency": "Nagłe wypadki", "/data-status": "Stan danych" } },
  uk: { search: "Пошук", language: "Мова", menu: "Відкрити меню", plan: "Спланувати переїзд", tools: "Інструменти", guides: "Усі матеріали", visa: "Візи та проживання", cities: "Міста", more: "Більше", about: "Про нас", navigation: { "/moving-to-germany": "Переїзд", "/work": "Робота", "/housing": "Житло", "/bureaucracy": "Документи", "/money": "Фінанси", "/healthcare": "Здоров’я", "/transport": "Транспорт", "/daily-life": "Щоденне життя", "/cities": "Міста", "/tools": "Інструменти", "/authorities": "Установи", "/emergency": "Екстрені ситуації", "/data-status": "Стан даних" } },
};

export const euCountries = [
  "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czechia", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg", "Malta", "Netherlands", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden",
] as const;

export const eeaCountries = ["Iceland", "Liechtenstein", "Norway"] as const;

export const nationalityOptions = [
  ...euCountries,
  ...eeaCountries,
  "Switzerland", "United Kingdom", "Ukraine", "Türkiye", "India", "China", "United States", "Canada", "Australia", "New Zealand", "Brazil", "Argentina", "Mexico", "Colombia", "Morocco", "Tunisia", "Egypt", "South Africa", "Nigeria", "Pakistan", "Bangladesh", "Japan", "South Korea", "Other",
] as const;

export type CitizenshipGroup = "EU" | "EEA" | "Switzerland" | "Non-EU";

export function getCitizenshipGroup(nationality: string): CitizenshipGroup {
  if ((euCountries as readonly string[]).includes(nationality)) return "EU";
  if ((eeaCountries as readonly string[]).includes(nationality)) return "EEA";
  if (nationality === "Switzerland") return "Switzerland";
  return "Non-EU";
}

export const movePurposes = [
  "Employment", "Looking for work", "University", "Erasmus / exchange", "Ausbildung", "Internship", "Research", "Freelancer", "Self-employed / business", "Family reunification", "Moving with partner", "Other",
] as const;

export const stayLengths = ["Less than 90 days", "3–6 months", "6–12 months", "More than 12 months", "Permanently", "Unknown"] as const;

export type CityProfile = {
  slug: string;
  name: string;
  state: string;
  housingPressure: "Very high" | "High" | "Moderate";
  transport: string;
  airport: string;
  sectors: string[];
  universities: string;
  nature: string;
  officialUrl: string;
};

export const cityProfiles: CityProfile[] = [
  { slug: "berlin", name: "Berlin", state: "Berlin", housingPressure: "Very high", transport: "Dense U-Bahn, S-Bahn, tram and bus network", airport: "BER", sectors: ["Technology", "Creative industries", "Public sector"], universities: "Several major universities", nature: "Lakes, forests and large parks", officialUrl: "https://www.berlin.de/en/" },
  { slug: "munich", name: "Munich", state: "Bavaria", housingPressure: "Very high", transport: "U-Bahn, S-Bahn, tram and bus network", airport: "MUC", sectors: ["Engineering", "Technology", "Finance"], universities: "Major research universities", nature: "Alpine access, lakes and parks", officialUrl: "https://stadt.muenchen.de/infos/languages.html" },
  { slug: "hamburg", name: "Hamburg", state: "Hamburg", housingPressure: "High", transport: "U-Bahn, S-Bahn, bus and ferries", airport: "HAM", sectors: ["Logistics", "Media", "Aviation"], universities: "Large university ecosystem", nature: "Waterfront, lakes and nearby coast", officialUrl: "https://www.hamburg.com/" },
  { slug: "frankfurt", name: "Frankfurt", state: "Hesse", housingPressure: "Very high", transport: "U-Bahn, S-Bahn, tram and regional rail", airport: "FRA", sectors: ["Finance", "Professional services", "Aviation"], universities: "Major university and applied sciences options", nature: "River paths and Taunus access", officialUrl: "https://frankfurt.de/english" },
  { slug: "cologne", name: "Cologne", state: "North Rhine-Westphalia", housingPressure: "High", transport: "Light rail, S-Bahn and regional network", airport: "CGN", sectors: ["Media", "Insurance", "Industry"], universities: "Large student population", nature: "Rhine and regional parks", officialUrl: "https://www.stadt-koeln.de/leben-in-koeln/soziales/internationales/english" },
  { slug: "dusseldorf", name: "Düsseldorf", state: "North Rhine-Westphalia", housingPressure: "High", transport: "U-Bahn, tram, S-Bahn and regional rail", airport: "DUS", sectors: ["Telecommunications", "Professional services", "Fashion"], universities: "University and applied sciences options", nature: "Rhine promenades and regional access", officialUrl: "https://www.duesseldorf.de/international" },
  { slug: "stuttgart", name: "Stuttgart", state: "Baden-Württemberg", housingPressure: "Very high", transport: "S-Bahn, Stadtbahn and regional rail", airport: "STR", sectors: ["Automotive", "Engineering", "Research"], universities: "Strong technical and applied study options", nature: "Hills, vineyards and Swabian Alps access", officialUrl: "https://www.stuttgart.de/en/" },
  { slug: "mannheim", name: "Mannheim", state: "Baden-Württemberg", housingPressure: "Moderate", transport: "Tram, bus and major rail interchange", airport: "FRA via rail", sectors: ["Industry", "Technology", "Life sciences"], universities: "University and regional research network", nature: "Rhine-Neckar and Odenwald access", officialUrl: "https://www.mannheim.de/en" },
  { slug: "heidelberg", name: "Heidelberg", state: "Baden-Württemberg", housingPressure: "High", transport: "Tram, bus and regional rail", airport: "FRA via rail", sectors: ["Research", "Life sciences", "Education"], universities: "International research university", nature: "Neckar valley and forested hills", officialUrl: "https://www.heidelberg.de/english/Home.html" },
  { slug: "freiburg", name: "Freiburg", state: "Baden-Württemberg", housingPressure: "High", transport: "Tram, bus and regional rail", airport: "Basel–Mulhouse nearby", sectors: ["Sustainability", "Research", "Healthcare"], universities: "Large university presence", nature: "Black Forest on the doorstep", officialUrl: "https://www.freiburg.de/pb/,Lde/225797.html" },
  { slug: "karlsruhe", name: "Karlsruhe", state: "Baden-Württemberg", housingPressure: "High", transport: "Integrated tram-train and bus network", airport: "FKB / FRA via rail", sectors: ["Technology", "Engineering", "Public institutions"], universities: "Major technical university", nature: "Rhine plain and Black Forest access", officialUrl: "https://www.karlsruhe.de/" },
  { slug: "leipzig", name: "Leipzig", state: "Saxony", housingPressure: "Moderate", transport: "Tram, S-Bahn and regional rail", airport: "LEJ", sectors: ["Logistics", "Manufacturing", "Creative industries"], universities: "Large university and arts ecosystem", nature: "Lakes and riparian forest", officialUrl: "https://english.leipzig.de/" },
  { slug: "dresden", name: "Dresden", state: "Saxony", housingPressure: "Moderate", transport: "Tram, bus and S-Bahn network", airport: "DRS", sectors: ["Semiconductors", "Research", "Engineering"], universities: "Major technical university", nature: "Elbe valley and Saxon Switzerland access", officialUrl: "https://www.dresden.de/en/" },
  { slug: "nuremberg", name: "Nuremberg", state: "Bavaria", housingPressure: "High", transport: "U-Bahn, tram, S-Bahn and regional rail", airport: "NUE", sectors: ["Industry", "Technology", "Services"], universities: "Regional university network", nature: "Franconian countryside access", officialUrl: "https://www.nuernberg.de/internet/stadtportal_e/" },
  { slug: "hannover", name: "Hannover", state: "Lower Saxony", housingPressure: "Moderate", transport: "Stadtbahn, S-Bahn and regional rail", airport: "HAJ", sectors: ["Industry", "Insurance", "Trade fairs"], universities: "Large university and applied sciences options", nature: "Eilenriede forest and nearby lakes", officialUrl: "https://www.hannover.de/en" },
  { slug: "bremen", name: "Bremen", state: "Bremen", housingPressure: "Moderate", transport: "Tram, bus and regional rail", airport: "BRE", sectors: ["Aerospace", "Logistics", "Manufacturing"], universities: "University and research institutes", nature: "River landscapes and North Sea access", officialUrl: "https://www.bremen.eu/" },
];

export const germanStates = [
  ["Baden-Württemberg", "Stuttgart"], ["Bavaria", "Munich"], ["Berlin", "Berlin"], ["Brandenburg", "Potsdam"], ["Bremen", "Bremen"], ["Hamburg", "Hamburg"], ["Hesse", "Wiesbaden"], ["Lower Saxony", "Hannover"], ["Mecklenburg-Vorpommern", "Schwerin"], ["North Rhine-Westphalia", "Düsseldorf"], ["Rhineland-Palatinate", "Mainz"], ["Saarland", "Saarbrücken"], ["Saxony", "Dresden"], ["Saxony-Anhalt", "Magdeburg"], ["Schleswig-Holstein", "Kiel"], ["Thuringia", "Erfurt"],
] as const;

export type VerifiedSource = {
  name: string;
  url: string;
  geography: string;
  type: "Official" | "Planning estimate" | "Market context";
  lastVerified: string;
};

export type TrackedFact = {
  key: string;
  label: string;
  value: number | null;
  unit: string;
  geography: string;
  source: string;
  sourceUrl: string;
  lastVerified: string;
  status: "verified" | "local-data-required" | "route-specific";
  notes: string;
};

export const trackedFacts: Record<string, TrackedFact> = {
  rundfunkbeitragMonthly: { key: "rundfunkbeitragMonthly", label: "Rundfunkbeitrag", value: 18.36, unit: "EUR per household/month", geography: "Germany", source: "ARD ZDF Deutschlandradio Beitragsservice", sourceUrl: "https://www.rundfunkbeitrag.de/", lastVerified: "2026-09-24", status: "verified", notes: "One contribution per dwelling in the standard case; exemptions and reductions must be checked separately." },
  deutschlandticketMonthly: { key: "deutschlandticketMonthly", label: "Deutschlandticket", value: 63, unit: "EUR/month", geography: "Germany", source: "German Federal Government", sourceUrl: "https://www.bundesregierung.de/breg-de/service/fragen-und-anworten/deutschlandticket-2134074", lastVerified: "2026-09-24", status: "verified", notes: "Subscription for participating local and regional public transport; provider terms and discounts can differ." },
  nationalVisaStandardFee: { key: "nationalVisaStandardFee", label: "Standard national visa fee", value: 75, unit: "EUR", geography: "Germany", source: "Make it in Germany", sourceUrl: "https://www.make-it-in-germany.com/en/visa-residence/procedure/entry-process", lastVerified: "2026-09-24", status: "route-specific", notes: "Exemptions, reductions and special cases exist; confirm with the responsible German mission." },
  healthInsuranceLimits: { key: "healthInsuranceLimits", label: "Health-insurance limits", value: null, unit: "status-specific", geography: "Germany", source: "Federal Ministry of Health / responsible insurer", sourceUrl: "https://www.bundesgesundheitsministerium.de/en/topics/health-insurance", lastVerified: "2026-09-24", status: "route-specific", notes: "No universal value is shown because employment, study, self-employment and insurance system change the result." },
  cityRentEstimate: { key: "cityRentEstimate", label: "City rent estimate", value: null, unit: "local current offer", geography: "Municipality/neighbourhood", source: "User-provided current listing or official local Mietspiegel", sourceUrl: "https://www.bmwsb.bund.de/", lastVerified: "2026-09-24", status: "local-data-required", notes: "The calculator asks the user for a current warm-rent figure instead of inventing a city average." },
};

export const coreSources: VerifiedSource[] = [
  { name: "Make it in Germany", url: "https://www.make-it-in-germany.com/en/", geography: "Germany", type: "Official", lastVerified: "2026-09-24" },
  { name: "German Federal Foreign Office", url: "https://www.auswaertiges-amt.de/en/visa-service", geography: "Germany", type: "Official", lastVerified: "2026-09-24" },
  { name: "BAMF", url: "https://www.bamf.de/EN/Startseite/startseite_node.html", geography: "Germany", type: "Official", lastVerified: "2026-09-24" },
  { name: "EU Your Europe", url: "https://europa.eu/youreurope/citizens/residence/index_en.htm", geography: "European Union", type: "Official", lastVerified: "2026-09-24" },
];
