import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { trackedFacts } from "@/lib/platform-data";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Germany costs, taxes and deadlines — verified 2026 figures",
  description: "Official 2026 figures for the Deutschlandticket, BahnCard, Anmeldung, Rundfunkbeitrag, visa fees, tax thresholds, insurance and minimum wage.",
  alternates: { canonical: absoluteUrl("/costs-deadlines") },
};

const groups = [
  {
    title: "Transport",
    intro: "National standard prices. Local concessions, temporary promotions and institutional arrangements can differ.",
    keys: ["deutschlandticketMonthly", "deutschlandSemesterTicketMonthly", "bahnCard25Annual", "bahnCard50Annual", "bahnCard100Annual", "myBahnCard25Annual"],
  },
  {
    title: "Registration and residence",
    intro: "The national rule or standard fee is shown; municipal procedures and personal exemptions still matter.",
    keys: ["anmeldungDeadline", "anmeldungFee", "rundfunkbeitragMonthly", "nationalVisaStandardFee", "firstResidencePermitMaximum"],
  },
  {
    title: "Tax, insurance and work",
    intro: "These are exact statutory rates or thresholds, not a promise of one person's net salary or final tax bill.",
    keys: ["incomeTaxBasicAllowance", "vatStandardRate", "vatReducedRate", "statutoryHealthBaseRate", "healthAverageAdditionalRate", "longTermCareBaseRate", "pensionInsuranceRate", "unemploymentInsuranceRate", "minimumWageHourly", "minijobMonthlyLimit", "childBenefitMonthly"],
  },
] as const;

function displayValue(value: number | null, unit: string) {
  if (value === null) return "Individual calculation required";
  const formatted = new Intl.NumberFormat("en-DE", { maximumFractionDigits: 2 }).format(value);
  return `${formatted} ${unit}`;
}

export default function CostsDeadlinesPage() {
  return <>
    <section className="page-hero"><div className="shell"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Costs & deadlines" }]}/><div className="page-hero-grid"><div className="page-hero-copy"><span className="eyebrow">Official figures · checked 24 September 2026</span><h1>Germany costs, taxes and deadlines</h1><p>Concrete numbers are useful only when their conditions are visible. This page distinguishes fixed national amounts from rates and fees that still depend on your income, status, provider or municipality.</p></div><div className="page-stat"><span>Standard Anmeldung deadline</span><strong>14</strong><small>days after moving into a dwelling, subject to the statutory temporary-stay exceptions explained below</small></div></div></div></section>

    <section className="section shell exact-facts">
      <div className="safety-notice"><strong>Exact does not mean universal</strong><p>A ticket price can be fixed while eligibility is conditional. A tax rate can be exact while your final bill depends on taxable income and personal circumstances. Each figure below states its scope and links to the official source.</p></div>
      {groups.map((group) => <section className="fact-group" key={group.title}><div className="section-heading"><div><span className="eyebrow">Verified values</span><h2>{group.title}</h2><p>{group.intro}</p></div></div><div className="fact-card-grid">{group.keys.map((key) => { const fact = trackedFacts[key]; return <article className="fact-card" key={fact.key}><span>{fact.geography}</span><h3>{fact.label}</h3><strong>{displayValue(fact.value, fact.unit)}</strong><p>{fact.notes}</p><a href={fact.sourceUrl} target="_blank" rel="noreferrer">Official source ↗</a><small>Last checked: {fact.lastVerified}</small></article>; })}</div></section>)}
    </section>

    <section className="section section-tint"><div className="shell split-heading"><div><span className="eyebrow">Income tax · 2026</span><h2>The exact formula, not a fake flat percentage</h2></div><div><p>German income tax is calculated from taxable income, not directly from gross salary. For a single assessment under §32a EStG, the 2026 basic allowance is €12,348. Above it, the statutory formula is progressive.</p><div className="tax-brackets"><div><strong>€0–€12,348</strong><span>€0 income tax</span></div><div><strong>€12,349–€17,799</strong><span>(914.51 × y + 1,400) × y</span></div><div><strong>€17,800–€69,878</strong><span>(173.10 × z + 2,397) × z + 1,034.87</span></div><div><strong>€69,879–€277,825</strong><span>42% × x − €11,135.63</span></div><div><strong>From €277,826</strong><span>45% × x − €19,470.38</span></div></div><p className="table-caption">Here x is taxable income rounded down to full euros; y and z are the statutory ten-thousand-euro scaling variables. Joint assessment and personal deductions change the result. <a className="text-link" href="https://ksth.bundesfinanzministerium.de/lsth/2026/A-Einkommensteuergesetz/IV-Tarif-31-34b/Paragraf-32a/inhalt.html" target="_blank" rel="noreferrer">Read the official §32a formula.</a></p></div></div></section>

    <section className="section shell"><div className="split-heading"><div><span className="eyebrow">Anmeldung</span><h2>What “within two weeks” means</h2></div><div><p>Under §17 of the Federal Registration Act, the standard duty is to register within two weeks after moving into a dwelling. The registration itself is free. You normally need the accommodation provider&apos;s Wohnungsgeberbestätigung.</p><p>There are statutory exceptions. If you are already registered in Germany and use another dwelling for no longer than six months, you generally do not register it. If you normally live abroad and are not registered in Germany, the duty generally arises after a stay exceeds three months; once it arises, the two-week period applies.</p><p><a className="text-link" href="https://www.gesetze-im-internet.de/bmg/__17.html" target="_blank" rel="noreferrer">Official §17 deadline</a> · <a className="text-link" href="https://www.gesetze-im-internet.de/englisch_bmg/englisch_bmg.html" target="_blank" rel="noreferrer">Federal Act including §27 exceptions</a></p></div></div></section>

    <section className="section section-dark"><div className="shell split-heading"><div><span className="eyebrow">Build your budget</span><h2>Use the verified fixed figures in one monthly estimate</h2></div><div><p>The calculator uses €63 for each selected Deutschlandticket, €37.80 for an eligible Deutschlandsemesterticket and €18.36 per dwelling for the Rundfunkbeitrag. It labels variable household spending as an estimate.</p><Link className="button button-primary" href="/tools/cost-of-living">Open the cost calculator</Link></div></div></section>
  </>;
}
