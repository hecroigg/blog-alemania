import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Icon } from "@/components/icon";
import { JsonLd } from "@/components/json-ld";
import { DepositRuleChecker } from "@/components/deposit-rule-checker";
import { translateTree } from "@/lib/localized-tree";
import { type SiteLocale, type ToolId, type OtherPageId, toolIds, toolUrl, sectionPath, otherUrl } from "@/lib/locale-paths";
import { absoluteUrl, siteConfig } from "@/lib/site";

import OldAnmeldung from "@/app/tools/anmeldung-finder/page";
import OldCosts from "@/app/tools/cost-of-living/page";
import OldCompare from "@/app/tools/compare-cities/page";
import OldDocuments from "@/app/tools/document-checklist/page";
import OldRentalScam from "@/app/tools/rental-scam-checker/page";
import OldArrival from "@/app/tools/first-30-days/page";
import OldApartment from "@/app/tools/apartment-affordability/page";
import OldSalary from "@/app/trabajo/calculadora-salario/page";
import OldEmployment from "@/app/trabajo/tipos-de-empleo/page";
import OldPlan from "@/app/plan/page";
import OldVisa from "@/app/visas-residence/page";
import OldGlossary from "@/app/glossary/page";
import OldAuthorities from "@/app/authorities/page";
import OldEmergency from "@/app/emergency/page";
import OldDataStatus from "@/app/data-status/page";
import OldDeadlines from "@/app/costs-deadlines/page";
import OldExplorer from "@/app/explore-germany/page";

type Phrase = { title: string; description: string };
const labels: Record<ToolId, Record<SiteLocale, Phrase>> = {
  "anmeldung-finder": {
    en: { title: "Anmeldung by city", description: "Official city-by-city registration routes, documents and online eligibility." },
    es: { title: "Buscador de Anmeldung por ciudad", description: "Encuentra la oficina, los documentos y el procedimiento de empadronamiento aplicable en cada ciudad." },
    de: { title: "Anmeldung nach Stadt", description: "Amtliche Meldewege, erforderliche Unterlagen und Online-Voraussetzungen im Städtevergleich." },
  },
  "cost-of-living": {
    en: { title: "Germany cost-of-living calculator", description: "Build a transparent monthly budget based on rent, household and travel." },
    es: { title: "Calculadora del coste de vida en Alemania", description: "Calcula tu presupuesto mensual según el alquiler, el hogar y el transporte." },
    de: { title: "Lebenshaltungskosten-Rechner für Deutschland", description: "Planen Sie Ihre monatlichen Kosten für Miete, Haushalt und Mobilität." },
  },
  "compare-cities": {
    en: { title: "Compare German cities", description: "Compare housing, commuting, jobs and universities in up to four cities." },
    es: { title: "Comparador de ciudades alemanas", description: "Compara vivienda, transporte, empleo y universidades de hasta cuatro ciudades." },
    de: { title: "Deutsche Städte vergleichen", description: "Vergleichen Sie Wohnen, Verkehr, Arbeitsmarkt und Hochschulen in bis zu vier Städten." },
  },
  "document-checklist": {
    en: { title: "Documents checklist for Germany", description: "An interactive checklist tailored to your nationality and travel purpose." },
    es: { title: "Lista de documentos para Alemania", description: "Lista interactiva según tu nacionalidad y el motivo de tu estancia." },
    de: { title: "Dokumenten-Checkliste für Deutschland", description: "Interaktive Unterlagenliste nach Staatsangehörigkeit und Aufenthaltszweck." },
  },
  "rental-scam-checker": {
    en: { title: "Rental scam checklist", description: "Identify warning signs before paying a landlord or sending documents." },
    es: { title: "Detector de estafas de alquiler", description: "Revisa las señales de alerta antes de pagar o enviar documentos." },
    de: { title: "Mietbetrug-Checkliste", description: "Erkennen Sie Warnsignale vor Zahlungen oder dem Versenden von Dokumenten." },
  },
  "first-30-days": {
    en: { title: "Your first 30 days in Germany", description: "Track practical arrival tasks with progress saved on your device." },
    es: { title: "Tus primeros 30 días en Alemania", description: "Organiza la llegada con una lista interactiva que guarda el progreso." },
    de: { title: "Die ersten 30 Tage in Deutschland", description: "Interaktive Checkliste für den Start mit lokal gespeichertem Fortschritt." },
  },
  "apartment-affordability": {
    en: { title: "Can I afford this apartment?", description: "Check rent, household income and recurring expenses." },
    es: { title: "¿Puedo permitirme este alquiler?", description: "Compara el alquiler con los ingresos del hogar y los gastos habituales." },
    de: { title: "Kann ich mir diese Wohnung leisten?", description: "Vergleichen Sie Mietkosten, Haushaltsnettoeinkommen und feste Ausgaben." },
  },
  "salary-calculator": {
    en: { title: "German gross-to-net salary calculator 2026", description: "Estimate German net pay and see taxes and social-insurance deductions." },
    es: { title: "Calculadora de sueldo bruto a neto en Alemania 2026", description: "Estima el salario neto y desglosa impuestos y cotizaciones en Alemania." },
    de: { title: "Brutto-Netto-Gehaltsrechner 2026", description: "Schätzen Sie Ihr Nettogehalt mit einer Aufschlüsselung von Steuern und Sozialabgaben." },
  },
  "employment-types": {
    en: { title: "Employment types in Germany", description: "Compare Minijob, Midijob, Werkstudent and regular employment." },
    es: { title: "Tipos de empleo en Alemania", description: "Compara Minijob, Midijob, Werkstudent y empleo ordinario." },
    de: { title: "Beschäftigungsarten in Deutschland", description: "Vergleichen Sie Minijob, Midijob, Werkstudent und reguläre Beschäftigung." },
  },
  "rental-deposit": {
    en: { title: "German rental deposit calculator", description: "Check the ordinary legal cap on a German residential rental deposit." },
    es: { title: "Calculadora de fianza del alquiler", description: "Comprueba el límite legal habitual para la fianza de una vivienda en Alemania." },
    de: { title: "Mietkaution berechnen", description: "Prüfen Sie die gesetzliche Obergrenze einer gewöhnlichen Wohnraummietkaution." },
  },
};
const common = {
  en: { home: "Home", tools: "Tools and calculators", heading: "Tools and calculators for Germany", explanation: "Interactive tools with clear assumptions and official references. No account needed.", open: "Open tool", free: "Free" },
  es: { home: "Inicio", tools: "Herramientas y calculadoras", heading: "Herramientas y calculadoras para Alemania", explanation: "Herramientas interactivas con supuestos claros y referencias oficiales. No necesitas crear una cuenta.", open: "Abrir herramienta", free: "Gratis" },
  de: { home: "Startseite", tools: "Werkzeuge und Rechner", heading: "Werkzeuge und Rechner für Deutschland", explanation: "Interaktive Werkzeuge mit nachvollziehbaren Annahmen und amtlichen Quellen. Ohne Benutzerkonto.", open: "Werkzeug öffnen", free: "Kostenlos" },
} as const;

export function toolsIndexMetadata(locale: SiteLocale): Metadata {
  const c = common[locale];
  return {
    title: c.heading, description: c.explanation,
    alternates: {
      canonical: absoluteUrl(sectionPath(locale, "tools")),
      languages: Object.fromEntries((["en","es","de"] as const).map((lang) => [lang, absoluteUrl(sectionPath(lang,"tools"))])),
    },
    robots: { index: true, follow: true },
    openGraph: { title: c.heading, description: c.explanation, url: absoluteUrl(sectionPath(locale,"tools")), locale },
  };
}
export function toolMetadata(locale: SiteLocale, tool: ToolId): Metadata {
  const meta = labels[tool][locale];
  return {
    title: meta.title, description: meta.description,
    alternates: {
      canonical: absoluteUrl(toolUrl(locale, tool)),
      languages: Object.fromEntries((["en","es","de"] as const).map((lang) => [lang, absoluteUrl(toolUrl(lang,tool))])),
    },
    robots: { index: true, follow: true },
    openGraph: { title: meta.title, description: meta.description, url: absoluteUrl(toolUrl(locale, tool)), locale },
  };
}
export function LocalizedToolsIndex({locale}:{locale:SiteLocale}) {
  const c=common[locale];
  return <div lang={locale} data-no-translate>
    <section className="page-hero"><div className="shell">
      <Breadcrumbs items={[{label:c.home,href:"/"+locale},{label:c.tools}]}/>
      <div className="page-hero-grid"><div className="page-hero-copy"><span className="eyebrow">GermanyBase</span>
        <h1>{c.heading}</h1><p>{c.explanation}</p>
      </div><div className="page-stat"><span>{c.tools}</span><strong>{toolIds.length}</strong><small>{c.free}</small></div></div>
    </div></section>
    <section className="section shell"><div className="tools-grid">
      {toolIds.map((id)=><Link href={toolUrl(locale,id)} key={id} className="tool-card">
        <span>{c.free}</span><h2>{labels[id][locale].title}</h2>
        <p>{labels[id][locale].description}</p><em>{c.open} <Icon name="arrow" size={16}/></em>
      </Link>)}
    </div></section>
  </div>;
}

export async function LocalizedToolPage({locale,id,query}:{locale:SiteLocale;id:ToolId;query?:{city?:string}}) {
  let tree: React.ReactNode;
  switch(id) {
    case "anmeldung-finder": tree=await OldAnmeldung({searchParams:Promise.resolve(query||{})}); break;
    case "cost-of-living": tree=OldCosts(); break;
    case "compare-cities": tree=OldCompare(); break;
    case "document-checklist": tree=OldDocuments(); break;
    case "rental-scam-checker": tree=OldRentalScam(); break;
    case "first-30-days": tree=OldArrival(); break;
    case "apartment-affordability": tree=OldApartment(); break;
    case "salary-calculator": tree=OldSalary(); break;
    case "employment-types": tree=OldEmployment(); break;
    case "rental-deposit": tree=<section className="section shell"><DepositRuleChecker/></section>; break;
    default: notFound();
  }
  const url=absoluteUrl(toolUrl(locale,id));
  const meta=labels[id][locale];
  return <div lang={locale}>
    {id==="rental-deposit" && <section className="page-hero"><div className="shell"><h1>{meta.title}</h1><p>{meta.description}</p></div></section>}
    {translateTree(tree,locale)}
    <JsonLd data={{
      "@context":"https://schema.org","@type":"SoftwareApplication",
      name:meta.title,description:meta.description,inLanguage:locale,
      applicationCategory:"WebApplication",operatingSystem:"Web",
      url, publisher:{"@type":"Organization",name:siteConfig.name},
      offers:{"@type":"Offer",price:"0",priceCurrency:"EUR"},
    }}/>
  </div>;
}

const otherMeta: Record<OtherPageId, Record<SiteLocale, Phrase>> = {
  plan: {
    en:{title:"Plan your move to Germany",description:"A personal arrival and relocation planner."},
    es:{title:"Planifica tu mudanza a Alemania",description:"Plan personalizado de llegada y trámites para Alemania."},
    de:{title:"Umzug nach Deutschland planen",description:"Persönlicher Umzugsplan mit den wichtigsten Schritten."},
  },
  visa: {
    en:{title:"Visas and residence in Germany",description:"Understand residence routes and official application sources."},
    es:{title:"Visados y residencia en Alemania",description:"Entiende los permisos de residencia y las vías oficiales."},
    de:{title:"Visum und Aufenthalt in Deutschland",description:"Aufenthaltswege und amtliche Informationen verstehen."},
  },
  glossary: {
    en:{title:"German bureaucracy glossary",description:"Essential German administration and immigration terms."},
    es:{title:"Glosario de trámites alemanes",description:"Términos esenciales de administración e inmigración alemana."},
    de:{title:"Glossar zur deutschen Bürokratie",description:"Wichtige Begriffe aus Verwaltung und Aufenthaltsrecht."},
  },
  authorities: {
    en:{title:"German authorities: who does what?",description:"Find the right office for registration, taxes, work or immigration."},
    es:{title:"Organismos oficiales en Alemania",description:"Encuentra la administración competente para trámites, impuestos y empleo."},
    de:{title:"Zuständige Behörden in Deutschland",description:"Finden Sie das richtige Amt für Anmeldung, Steuern, Arbeit und Aufenthalt."},
  },
  emergency: {
    en:{title:"Emergency numbers in Germany",description:"Official emergency, police and medical contact numbers."},
    es:{title:"Teléfonos de emergencia en Alemania",description:"Números oficiales de emergencias, policía y asistencia médica."},
    de:{title:"Notrufnummern in Deutschland",description:"Amtliche Nummern für Notfälle, Polizei und ärztlichen Bereitschaftsdienst."},
  },
  "data-status": {
    en:{title:"Data status and update log",description:"Sources and review dates for GermanyBase figures."},
    es:{title:"Estado y actualización de los datos",description:"Fuentes y fechas de revisión de las cifras de GermanyBase."},
    de:{title:"Datenstand und Aktualisierungen",description:"Quellen und Prüfdaten der Zahlen von GermanyBase."},
  },
  "costs-deadlines": {
    en:{title:"Germany costs and deadlines",description:"Verified rates, deadlines and reference amounts."},
    es:{title:"Precios y plazos en Alemania",description:"Importes, tarifas y plazos oficiales verificados."},
    de:{title:"Kosten und Fristen in Deutschland",description:"Geprüfte Beiträge, Fristen und Beträge."},
  },
  "explore-germany": {
    en:{title:"Explore German cities and states",description:"Explore states, city choices, jobs, housing and transport."},
    es:{title:"Explora Alemania: ciudades y estados federados",description:"Compara ciudades, trabajo, vivienda y transporte."},
    de:{title:"Deutschland entdecken: Städte und Bundesländer",description:"Städte, Arbeitsmarkt, Wohnen und Verkehr vergleichen."},
  },
};
export function otherMetadata(locale:SiteLocale,id:OtherPageId):Metadata{
  const page=otherMeta[id][locale];
  return {title:page.title,description:page.description,
    alternates:{canonical:absoluteUrl(otherUrl(locale,id)),languages:Object.fromEntries((["en","es","de"]as const).map(lang=>[lang,absoluteUrl(otherUrl(lang,id))]))},
    robots:{index:true,follow:true},openGraph:{title:page.title,description:page.description,locale,url:absoluteUrl(otherUrl(locale,id))},
  };
}
export function LocalizedOtherPage({locale,id}:{locale:SiteLocale;id:OtherPageId}) {
  const content = id==="plan" ? OldPlan() :
    id==="visa" ? OldVisa() : id==="glossary" ? OldGlossary() :
    id==="authorities" ? OldAuthorities() : id==="emergency" ? OldEmergency() :
    id==="data-status" ? OldDataStatus() : id==="costs-deadlines" ? OldDeadlines() :
    OldExplorer();
  return <div lang={locale}>{translateTree(content,locale)}</div>;
}
