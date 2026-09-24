import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = { title: "German bureaucracy glossary", description: "Plain-language explanations of essential German immigration, registration, tax and insurance terms.", alternates: { canonical: absoluteUrl("/glossary") } };
const terms = [
  ["Visum", "Visa", "Permission associated with entry for a particular purpose. It is not the same document as every residence permit."],
  ["Aufenthaltstitel", "Residence title", "An umbrella term for legal forms of residence permission."],
  ["Aufenthaltserlaubnis", "Temporary residence permit", "A purpose-based, time-limited residence title with conditions shown on the document."],
  ["Niederlassungserlaubnis", "Settlement permit", "An indefinite residence title available only when the relevant conditions are met."],
  ["EU Blue Card", "EU Blue Card", "A residence title for qualifying highly skilled employment; current eligibility must be checked officially."],
  ["Chancenkarte", "Opportunity Card", "A route for eligible people seeking qualified employment, with specific conditions and limits."],
  ["Ausländerbehörde", "Immigration authority", "The local authority responsible for many residence matters after arrival."],
  ["Anmeldung", "Address registration", "Registering your residential address with the local municipality. It does not grant immigration status."],
  ["Bürgeramt / Bürgerbüro", "Citizens' office", "A local service office that commonly handles address registration and municipal documents."],
  ["Meldebescheinigung", "Registration certificate", "Evidence issued after address registration; store it safely."],
  ["Wohnungsgeberbestätigung", "Housing-provider confirmation", "Confirmation of move-in issued by the responsible housing provider for Anmeldung."],
  ["Fiktionsbescheinigung", "Temporary status certificate", "A document that can evidence a continuing or deemed residence position while an application is pending; its effect depends on the legal basis marked."],
  ["Einbürgerung", "Naturalisation", "The process of obtaining German citizenship when all applicable conditions are met."],
  ["Krankenkasse", "Health-insurance fund", "Usually refers to a statutory health-insurance fund, though context matters."],
  ["Steuer-ID", "Personal tax identification number", "A lifelong personal identifier used by tax administration and payroll. It is not the same as every tax number."],
  ["Rundfunkbeitrag", "Broadcasting contribution", "A household-based contribution for public broadcasting, subject to official exemption and reduction rules."],
] as const;
export default function GlossaryPage() { return <><section className="page-hero"><div className="shell"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Glossary" }]}/><div className="page-hero-copy"><span className="eyebrow">Plain German</span><h1>Immigration & bureaucracy glossary</h1><p>Learn the German word, its closest English translation and what it means in everyday use.</p></div></div></section><section className="section shell"><dl className="glossary-grid">{terms.map(([term, translation, explanation]) => <div key={term}><dt>{term}</dt><dd><strong>{translation}</strong><p>{explanation}</p></dd></div>)}</dl></section></> }
