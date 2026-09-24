import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SafetyNotice, SourceStamp } from "@/components/source-stamp";
import { coreSources } from "@/lib/platform-data";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = { title: "Visas and residence in Germany", description: "Start with citizenship group and purpose to understand the correct official route for moving to Germany.", alternates: { canonical: absoluteUrl("/visas-residence") } };

const routes = [
  ["Employment", "For a specific job or job offer. The relevant route can depend on the role, qualification, salary and recognition requirements."],
  ["EU Blue Card", "A residence route for qualifying higher-education graduates and comparable professionals with eligible employment. Verify current conditions officially."],
  ["Opportunity Card", "A job-search route with its own eligibility, financial and work conditions. It is not a general permission for every non-EU job seeker."],
  ["University", "For admission to a recognised course of study. Evidence can include admission, funding and accepted health coverage."],
  ["Ausbildung", "For eligible vocational training. The contract, language ability and funding can matter."],
  ["Research", "Research hosting and employment arrangements can lead to specific routes; the institution should help identify the correct one."],
  ["Self-employment / freelance", "Business and freelance routes require an individual assessment and do not apply identically across occupations."],
  ["Family reunification", "Requirements depend on the sponsor, family relationship, nationality and residence status."],
] as const;

export default function VisasResidencePage() {
  return <><section className="page-hero visa-hero"><div className="shell"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Visas & residence" }]}/><div className="page-hero-grid"><div className="page-hero-copy"><span className="eyebrow">Immigration routes</span><h1>Visas & residence</h1><p>Start with citizenship, purpose and length of stay. “Non-EU” is not one visa category, and address registration is not a residence permit.</p></div><div className="page-stat"><span>Best starting point</span><strong>3 facts</strong><small>Nationality · purpose · planned stay</small></div></div></div></section>
  <section className="section shell"><div className="status-route-grid"><article><span>EU citizens</span><h2>Freedom of movement</h2><p>EU citizens normally do not need a visa or separate work permit to move and work in Germany. Registration, insurance and tax setup still matter.</p></article><article><span>EEA citizens</span><h2>Closely aligned route</h2><p>Citizens of Iceland, Liechtenstein and Norway generally use EEA free-movement rights. Confirm family-member cases separately.</p></article><article><span>Swiss citizens</span><h2>Separate agreement</h2><p>Swiss citizens benefit from mobility arrangements but should check the specific residence-document process that applies.</p></article><article><span>Non-EU citizens</span><h2>Purpose-specific route</h2><p>Check whether permission is required before travel and what work or study is allowed. Nationality-specific entry rules may alter the sequence.</p></article></div>
  <div className="flow-card"><span className="eyebrow">EU / EEA route at a glance</span><ol>{["Prepare identity and status documents", "Find registrable accommodation", "Move", "Collect Wohnungsgeberbestätigung", "Complete Anmeldung", "Confirm health insurance", "Set up employment and tax records", "Handle household obligations"].map((item) => <li key={item}>{item}</li>)}</ol></div>
  <div className="section-heading compact-heading"><div><span className="eyebrow">Non-EU routes</span><h2>Match the route to the real purpose</h2></div><p>Eligibility and documents can differ even when two routes sound similar.</p></div><div className="route-grid">{routes.map(([name, description]) => <article key={name}><h3>{name}</h3><p>{description}</p><a href="https://www.make-it-in-germany.com/en/visa-residence" target="_blank" rel="noreferrer">Check official route</a></article>)}</div>
  <div className="plan-next"><Link className="button button-primary" href="/plan">Build my personal plan</Link><Link className="button button-secondary" href="/tools/document-checklist">Generate document checklist</Link><Link className="button button-secondary" href="/glossary">Open bureaucracy glossary</Link></div>
  <div className="source-panel"><SafetyNotice/><div className="source-stamp-grid">{coreSources.map((source) => <SourceStamp key={source.url} source={source}/>)}</div></div></section></>;
}
