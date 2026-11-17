import { toolSlugs, type ToolKey, type SiteLocale } from "@/lib/localized-paths";

type ToolText = { title: string; description: string; eyebrow: string };
type ToolMap = Record<ToolKey, ToolText>;
const en: ToolMap = {
  anmeldung: { title: "Find your Anmeldung office", description: "Check official registration options for 16 German cities. The right office depends on where you live and whether you arrived from abroad.", eyebrow: "Municipal registration" },
  costs: { title: "Cost-of-living calculator", description: "Build a monthly budget using your actual rent, household size, transport and spending choices.", eyebrow: "Interactive budget" },
  compare: { title: "Compare German cities", description: "Compare housing pressure, transport, employment and universities before deciding where to live.", eyebrow: "City comparison" },
  documents: { title: "Moving-document checklist", description: "Create a personalised list of documents and save your progress on this device.", eyebrow: "Document checklist" },
  scams: { title: "Rental scam checklist", description: "Assess warning signs before sharing documents or making payments for a German rental.", eyebrow: "Housing safety" },
  arrival: { title: "Your first 30 days in Germany", description: "Follow a practical arrival sequence. The groups are planning aids, not universal legal deadlines.", eyebrow: "Arrival plan" },
  apartment: { title: "Can you afford this apartment?", description: "Compare warm rent and other housing costs with your net household income.", eyebrow: "Rent and budget" },
  salary: { title: "Germany gross-to-net salary calculator", description: "Estimate net salary in Germany using your gross pay, tax class and insurance settings.", eyebrow: "Salary calculator" },
  employment: { title: "Compare employment types", description: "Understand Minijob, Midijob, Werkstudent and standard jobs before accepting an offer.", eyebrow: "Employment rules" },
};
const es: ToolMap = {
  anmeldung: { title: "Busca tu oficina de empadronamiento", description: "Consulta los trámites oficiales en 16 ciudades. El municipio, el país de procedencia y el tipo de vivienda determinan el procedimiento.", eyebrow: "Empadronamiento" },
  costs: { title: "Calculadora del coste de vida en Alemania", description: "Crea tu presupuesto mensual a partir del alquiler, las personas del hogar, el transporte y tus hábitos de gasto.", eyebrow: "Presupuesto interactivo" },
  compare: { title: "Comparador de ciudades alemanas", description: "Compara la vivienda, el transporte, el trabajo y las universidades antes de elegir dónde vivir.", eyebrow: "Comparador de ciudades" },
  documents: { title: "Lista de documentos para mudarte a Alemania", description: "Genera una lista adaptada a tu situación y guarda tu progreso en el dispositivo.", eyebrow: "Lista de documentos" },
  scams: { title: "Cómo detectar estafas al alquilar en Alemania", description: "Revisa las señales de alerta antes de compartir documentos o pagar por una vivienda.", eyebrow: "Seguridad al alquilar" },
  arrival: { title: "Tus primeros 30 días en Alemania", description: "Organiza los trámites de llegada. Las etapas orientan tu planificación, no representan plazos legales universales.", eyebrow: "Plan de llegada" },
  apartment: { title: "¿Puedes permitirte este alquiler?", description: "Compara el alquiler con gastos y otros costes con los ingresos netos de tu hogar.", eyebrow: "Alquiler y presupuesto" },
  salary: { title: "Calculadora de sueldo neto en Alemania", description: "Estima tu salario neto a partir del bruto, la clase fiscal y el seguro médico.", eyebrow: "Calculadora de salario" },
  employment: { title: "Compara los tipos de empleo en Alemania", description: "Conoce las diferencias entre Minijob, Midijob, Werkstudent y empleo ordinario.", eyebrow: "Tipos de empleo" },
};
const de: ToolMap = {
  anmeldung: { title: "Die zuständige Meldestelle finden", description: "Prüfen Sie die amtlichen Anmeldewege für 16 Städte. Wohnort, Herkunft und Wohnsitzart beeinflussen das Verfahren.", eyebrow: "Wohnsitzanmeldung" },
  costs: { title: "Lebenshaltungskosten in Deutschland berechnen", description: "Planen Sie Ihr monatliches Budget anhand von Miete, Haushaltsgröße, Verkehrsmitteln und Ausgaben.", eyebrow: "Budgetrechner" },
  compare: { title: "Deutsche Städte vergleichen", description: "Vergleichen Sie Wohnungsmarkt, Verkehr, Arbeitsplätze und Hochschulen vor der Wohnortwahl.", eyebrow: "Städtevergleich" },
  documents: { title: "Dokumenten-Checkliste für den Umzug", description: "Erstellen Sie eine Liste der notwendigen Unterlagen und speichern Sie Ihren Fortschritt auf diesem Gerät.", eyebrow: "Dokumenten-Checkliste" },
  scams: { title: "Mietbetrug erkennen: Checkliste", description: "Prüfen Sie Warnsignale, bevor Sie Unterlagen weitergeben oder für eine Wohnung bezahlen.", eyebrow: "Sicher mieten" },
  arrival: { title: "Die ersten 30 Tage in Deutschland", description: "Organisieren Sie Ihre Ankunft. Die Etappen sind Planungshilfen, keine allgemeingültigen gesetzlichen Fristen.", eyebrow: "Ankunftsplan" },
  apartment: { title: "Kann ich mir diese Wohnung leisten?", description: "Vergleichen Sie Warmmiete und weitere Wohnkosten mit dem Nettoeinkommen Ihres Haushalts.", eyebrow: "Mietkosten und Budget" },
  salary: { title: "Brutto-Netto-Rechner für Deutschland", description: "Schätzen Sie Ihr Nettogehalt anhand von Bruttolohn, Steuerklasse und Krankenversicherung.", eyebrow: "Gehaltsrechner" },
  employment: { title: "Beschäftigungsarten in Deutschland vergleichen", description: "Verstehen Sie Minijob, Midijob, Werkstudentenjob und reguläre Beschäftigung vor der Vertragsunterzeichnung.", eyebrow: "Beschäftigungsformen" },
};
export const toolText: Record<SiteLocale, ToolMap> = { en, es, de };
export const toolKeys = Object.keys(toolSlugs) as ToolKey[];
export const toolIndexCopy = {
  en: { home: "Home", tools: "Tools and calculators", eyebrow: "Practical tools", intro: "Free interactive tools for planning life in Germany. Check key legal assumptions against official sources.", open: "Open tool", source: "This tool is an estimate, not official legal or financial advice." },
  es: { home: "Inicio", tools: "Herramientas y calculadoras", eyebrow: "Herramientas prácticas", intro: "Calculadoras gratuitas para organizar tu vida en Alemania. Comprueba las normas vigentes en las fuentes oficiales.", open: "Abrir herramienta", source: "Esta herramienta ofrece una estimación, no asesoramiento jurídico o financiero oficial." },
  de: { home: "Startseite", tools: "Werkzeuge und Rechner", eyebrow: "Praktische Werkzeuge", intro: "Kostenlose interaktive Rechner für die Planung des Lebens in Deutschland. Prüfen Sie geltende Vorschriften anhand amtlicher Quellen.", open: "Werkzeug öffnen", source: "Dieses Werkzeug liefert eine Schätzung und ersetzt keine amtliche Rechts- oder Finanzberatung." },
} as const;
