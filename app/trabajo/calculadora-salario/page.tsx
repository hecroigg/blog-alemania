import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { SalaryCalculator } from "@/components/salary-calculator";
import { employmentFigures, employmentSources } from "@/lib/employment-data";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Germany gross-to-net salary calculator 2026",
  description: "Estimate German net salary from gross pay with tax class, state, church tax, health insurance, Midijob and Werkstudent settings.",
  alternates: { canonical: absoluteUrl("/trabajo/calculadora-salario") },
  openGraph: { title: "Germany gross-to-net salary calculator 2026", description: "A transparent planning estimate with every deduction shown.", url: absoluteUrl("/trabajo/calculadora-salario"), type: "website" },
};

const faq = [
  { question: "Is the result an official German payslip calculation?", answer: "No. It is a transparent planning estimate. Payroll tables, personal allowances, your health fund, bonuses, multiple jobs and private insurance can change the result." },
  { question: "Why does a Midijob show lower employee contributions?", answer: "In 2026, gross monthly pay from €603.01 to €2,000 is in the transition zone. The employee contribution base rises progressively rather than starting at the full gross amount." },
  { question: "Does a Werkstudent pay no health insurance?", answer: "The payroll job can be exempt from health, care and unemployment contributions when the official conditions are met, but the student normally still needs separate health insurance." },
  { question: "What is the German minimum wage in 2026?", answer: "The nationwide statutory minimum wage is €13.90 gross per hour from 1 January 2026. Legal exceptions and higher sector minimum wages can apply." },
];

export default function SalaryCalculatorPage() {
  const softwareSchema = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Germany gross-to-net salary calculator", applicationCategory: "FinanceApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: 0, priceCurrency: "EUR" }, url: absoluteUrl("/trabajo/calculadora-salario"), publisher: { "@type": "Organization", name: siteConfig.name } };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) };
  return <>
    <section className="page-hero salary-hero"><div className="shell"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Work", href: "/work" }, { label: "Salary calculator" }]}/><div className="page-hero-grid"><div className="page-hero-copy"><span className="eyebrow">Gross to net · 2026</span><h1>Germany salary calculator</h1><p>Turn gross pay into one transparent net-salary estimate. Adjust tax class, federal state, insurance, family details and student status, then inspect every monthly deduction.</p></div><div className="page-stat"><span>2026 minimum wage</span><strong>€13.90</strong><small>gross per hour · the calculator warns when salary and working hours fall below it</small></div></div></div></section>

    <section className="section shell"><SalaryCalculator/></section>

    <section className="section section-tint"><div className="shell"><div className="section-heading"><div><span className="eyebrow">Exact reference points</span><h2>Minimum wage, Minijob and Midijob</h2></div><p>These statutory rates and thresholds are exact. Your final net pay is still personal.</p></div><div className="employment-reference-grid"><article><span>Minimum wage · 2026</span><strong>€{employmentFigures.minimumWage[2026].toFixed(2)} / hour</strong><p>At 40 hours a week: about €2,409.33 gross per month and €28,912 gross per year.</p></article><article><span>Minimum wage · 2027</span><strong>€{employmentFigures.minimumWage[2027].toFixed(2)} / hour</strong><p>From 1 January: about €2,530.67 gross per month and €30,368 gross per year at 40 hours a week.</p></article><article><span>Minijob limit</span><strong>€{employmentFigures.minijobLimit[2026]} / month</strong><p>2026 limit. It rises to €{employmentFigures.minijobLimit[2027]} in 2027. Multiple jobs and irregular earnings need separate checks.</p></article><article><span>Midijob transition zone · 2026</span><strong>€{employmentFigures.midijobLower.toFixed(2)}–€{employmentFigures.midijobUpper.toLocaleString("en-DE")}</strong><p>Employee social contributions start reduced and rise progressively to the normal level.</p></article></div><p className="table-caption">The general statutory minimum is defined per hour actually worked. Some sectors have higher binding sector-specific minimum wages.</p></div></section>

    <section className="section shell"><div className="split-heading"><div><span className="eyebrow">How to read the result</span><h2>A useful estimate, not a false promise</h2></div><div><p>The calculator applies the official 2026 income-tax formula to an estimated taxable income after employee social contributions and the standard employee lump sum. It models tax classes II, III, V and VI with planning adjustments because an exact payroll result requires the full official wage-tax programme and all personal payroll data.</p><p>Statutory health insurance uses the 14.6% base rate plus the official 2.9% average additional rate, shared with the employer. Your fund&apos;s actual additional rate can differ. Private insurance uses the monthly premium you enter.</p><p><Link className="text-link" href="/trabajo/tipos-de-empleo">Compare Minijob, Midijob, Werkstudent and regular employment.</Link></p></div></div></section>

    <section className="section section-dark"><div className="shell"><div className="section-heading"><div><span className="eyebrow">Primary sources</span><h2>Rules behind the calculator</h2></div><p>Checked against official German sources on 27 September 2026.</p></div><div className="salary-source-grid">{employmentSources.map((source) => <a href={source.url} target="_blank" rel="noreferrer" key={source.url}><strong>{source.name}</strong><span>{source.note}</span><em>Open official source ↗</em></a>)}</div></div></section>

    <section className="section shell"><div className="section-heading"><div><span className="eyebrow">Questions</span><h2>Before you rely on the estimate</h2></div></div><div className="faq-section compact-faq">{faq.map((item) => <details className="faq-item" key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div></section>
    <JsonLd data={[softwareSchema, faqSchema]}/>
  </>;
}
