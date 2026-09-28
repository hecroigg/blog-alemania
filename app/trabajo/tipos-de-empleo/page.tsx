import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { EmploymentTypeTool } from "@/components/employment-type-tool";
import { JsonLd } from "@/components/json-ld";
import { calculateSalary, employmentFigures, employmentSources, midijobEmployeeContributionBase, type SalaryInputs } from "@/lib/employment-data";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Minijob, Midijob, Werkstudent and regular employment in Germany",
  description: "Compare German employment types with exact 2026 thresholds, social contributions, working-hour rules and real-number examples.",
  alternates: { canonical: absoluteUrl("/trabajo/tipos-de-empleo") },
  openGraph: { title: "Employment types in Germany — 2026 comparison", description: "Minijob, Midijob, Werkstudent and regular employment explained with real figures.", url: absoluteUrl("/trabajo/tipos-de-empleo"), type: "article" },
};

const faq = [
  { question: "Is €2,000 a German income-tax bracket?", answer: "No. It is the upper edge of the 2026 Midijob transition zone for social-insurance contributions. Income tax follows a separate progressive calculation." },
  { question: "Can a Werkstudent work more than 20 hours per week?", answer: "Sometimes. The official exception can cover qualifying evening, night, weekend or semester-break work, but the periods above 20 hours must stay within the 26-week framework and study must remain the main activity." },
  { question: "Does a Minijob include health insurance?", answer: "Not automatically. A Minijob label does not by itself provide full health-insurance coverage, so the worker must confirm their separate route." },
];

const baseInputs: SalaryInputs = {
  grossMonthly: 0,
  weeklyHours: 40,
  taxClass: "I",
  state: "Berlin",
  churchTax: false,
  insurance: "statutory",
  privateMonthlyPremium: 0,
  age: 30,
  children: 0,
  student: false,
  minijobPensionExempt: false,
};

const exampleInputs = [
  { label: "€13.90 × 10 hours per week", grossMonthly: 13.9 * 10 * 52 / 12, weeklyHours: 10, student: false },
  { label: "€13.90 × 20 hours per week", grossMonthly: 13.9 * 20 * 52 / 12, weeklyHours: 20, student: false },
  { label: "€15 × 15 hours per week", grossMonthly: 15 * 15 * 52 / 12, weeklyHours: 15, student: true },
  { label: "€15 × 20 hours per week", grossMonthly: 15 * 20 * 52 / 12, weeklyHours: 20, student: true },
  { label: "€16 × 20 hours per week", grossMonthly: 16 * 20 * 52 / 12, weeklyHours: 20, student: true },
  { label: "€18 × 20 hours per week", grossMonthly: 18 * 20 * 52 / 12, weeklyHours: 20, student: true },
  { label: "€2,000 per month", grossMonthly: 2_000, weeklyHours: 40, student: false },
  { label: "€3,000 per month", grossMonthly: 3_000, weeklyHours: 40, student: false },
  { label: "€4,000 per month", grossMonthly: 4_000, weeklyHours: 40, student: false },
  { label: "€40,000 per year", grossMonthly: 40_000 / 12, weeklyHours: 40, student: false },
  { label: "€50,000 per year", grossMonthly: 50_000 / 12, weeklyHours: 40, student: false },
  { label: "€60,000 per year", grossMonthly: 60_000 / 12, weeklyHours: 40, student: false },
] as const;

const examples = exampleInputs.map((item) => ({ ...item, result: calculateSalary({ ...baseInputs, grossMonthly: item.grossMonthly, weeklyHours: item.weeklyHours, student: item.student }) }));
const werkstudentExamples = examples.filter((item) => item.student && ["€15 × 15", "€16 × 20", "€18 × 20"].some((prefix) => item.label.startsWith(prefix)));
const regularExamples = examples.filter((item) => ["€3,000 per month", "€4,000 per month", "€50,000 per year", "€60,000 per year"].includes(item.label));

function euro(value: number, digits = 0) {
  return new Intl.NumberFormat("en-DE", { style: "currency", currency: "EUR", minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value);
}

export default function EmploymentTypesPage() {
  const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "Employment types in Germany", description: metadata.description, dateModified: "2026-09-28", inLanguage: "en", author: { "@type": "Organization", name: siteConfig.name }, publisher: { "@type": "Organization", name: siteConfig.name }, mainEntityOfPage: absoluteUrl("/trabajo/tipos-de-empleo") };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) };
  return <>
    <section className="page-hero employment-hero"><div className="shell"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Work", href: "/work" }, { label: "Employment types" }]}/><div className="page-hero-grid"><div className="page-hero-copy"><span className="eyebrow">Work structures · 2026</span><h1>Which type of employment do you have?</h1><p>Compare Minijob, Midijob, Werkstudent and regular employment using the exact thresholds, working-hour rules and social-insurance logic that change your payslip.</p></div><div className="page-stat"><span>Four practical routes</span><strong>€{employmentFigures.minijobLimit[2026]}</strong><small>Minijob ceiling · Midijob starts at €{employmentFigures.midijobLower.toFixed(2)} and ends at €{employmentFigures.midijobUpper.toLocaleString("en-DE")}</small></div></div></div></section>

    <section className="section shell employment-overview"><div className="employment-card-grid">
      <article><span>Minijob</span><h2>Up to €{employmentFigures.minijobLimit[2026]} in 2026</h2><p>From 2027 the monthly limit is €{employmentFigures.minijobLimit[2027]}. The worker normally pays 3.6% pension insurance unless a valid exemption applies.</p><strong>Example: €13.90 × 10 h/week ≈ €602.33/month</strong><Link href="/guides/minijob-germany">Complete Minijob guide →</Link></article>
      <article id="midijob"><span>€{employmentFigures.midijobLower.toFixed(2)}–€{employmentFigures.midijobUpper.toLocaleString("en-DE")}</span><h2>Midijob</h2><p>Full social-insurance coverage with a reduced employee contribution base that increases progressively. It is an income and contribution treatment, not a synonym for part-time work.</p><strong>Example: at €1,200 gross, the employee contribution base is about €854.69.</strong><a href="#midijob-detail">How the reduction works ↓</a></article>
      <article><span>Study stays primary</span><h2>Werkstudent</h2><p>A student social-insurance status, not another salary range. Pension normally applies; payroll health, care and unemployment contributions usually do not when the rules are met.</p><strong>Core rule: normally no more than 20 hours per week during lectures.</strong><Link href="/guides/werkstudent-germany">Complete Werkstudent guide →</Link></article>
      <article><span>Outside the Midijob reduction</span><h2>Regular employment</h2><p>This is descriptive, not a special legal category called a “normal job”. Above €2,000, the reduced Midijob employee-contribution mechanism ends.</p><strong>Tax and social deductions depend on the full payroll profile and contribution ceilings.</strong><Link href="/trabajo/calculadora-salario">Estimate the net salary →</Link></article>
    </div></section>

    <section className="section section-tint"><div className="shell"><div className="section-heading"><div><span className="eyebrow">Quick check</span><h2>What type of employment do I have?</h2></div><p>Use this as a route finder. Multiple jobs, residence conditions and insurance exceptions still require an individual check.</p></div><EmploymentTypeTool/></div></section>

    <section className="section shell"><div className="section-heading"><div><span className="eyebrow">Side-by-side</span><h2>What changes between the four types</h2></div></div><div className="employment-table-wrap"><table className="employment-table"><thead><tr><th>Question</th><th>Minijob</th><th>Midijob</th><th>Werkstudent</th><th>Regular employment</th></tr></thead><tbody>
      <tr><th>Income</th><td>Up to €603/month on average in 2026</td><td>€603.01–€2,000/month</td><td>No separate salary range</td><td>No category-specific income range</td></tr>
      <tr><th>Typical hours</th><td>About 10 h/week at the 2026 minimum wage</td><td>Depends on hourly wage and contract</td><td>Normally up to 20 h/week during lectures</td><td>Part-time or full-time contract</td></tr>
      <tr><th>Income tax</th><td>Often employer flat-taxed; other arrangements exist</td><td>Progressive personal calculation</td><td>Progressive personal calculation; not automatically tax-free</td><td>Progressive personal calculation</td></tr>
      <tr><th>Pension</th><td>Usually 3.6%; exemption can be requested</td><td>Reduced employee base, rising progressively</td><td>Usually payable; Midijob reduction can apply</td><td>9.3% employee share up to €8,450/month</td></tr>
      <tr><th>Health insurance through employment</th><td>Normally no full employee cover</td><td>Yes, on the reduced contribution base</td><td>Normally no payroll contribution if the privilege applies</td><td>Yes, up to €5,812.50/month for statutory insurance</td></tr>
      <tr><th>Unemployment insurance</th><td>Normally no employee contribution</td><td>Yes, on the reduced contribution base</td><td>Normally no if the privilege applies</td><td>1.3% employee share up to €8,450/month</td></tr>
      <tr><th>Care insurance</th><td>Normally no employee contribution</td><td>Yes, on the reduced contribution base</td><td>Normally no payroll contribution if the privilege applies</td><td>Usually 1.8% plus applicable surcharges or state differences</td></tr>
      <tr><th>Main requirement</th><td>Regular average earnings stay within the limit</td><td>Monthly gross stays inside the transition zone</td><td>Study remains the main activity</td><td>Employment contract and work authorisation where required</td></tr>
      <tr><th>Important limits</th><td>Other jobs and irregular earnings can change classification</td><td>Reduced contribution ends at €2,000</td><td>20-hour rule and 26-week exception framework</td><td>Contribution ceilings still limit social deductions</td></tr>
      <tr><th>Typical use case</th><td>Small recurring side job</td><td>Lower-paid part-time or entry role</td><td>Employment alongside full-time study</td><td>Part-time or full-time employee role</td></tr>
    </tbody></table></div></section>

    <section className="section section-dark" id="midijob-detail"><div className="shell split-heading"><div><span className="eyebrow">Midijob in numbers</span><h2>A transition, not a sudden deduction cliff</h2></div><div><p>In 2026 the employee contribution base is calculated with the official formula <strong>1.43163922691 × monthly gross − €863.2784538207</strong>. It begins near zero just above €603 and reaches the full gross amount at €2,000.</p><div className="midijob-examples">{[800, 1_000, 1_500, 2_000].map((gross) => <div key={gross}><strong>{euro(gross)} gross salary</strong><span>{euro(midijobEmployeeContributionBase(gross), 2)} employee contribution base</span></div>)}</div><p>The official German Pension Insurance examples show employee pension contributions of €26.23 at €800 gross, €52.86 at €1,000, €119.43 at €1,500 and €186 at €2,000. Health, care and unemployment contributions follow the same reduced-base principle but use their own rates.</p><Link className="button button-primary" href="/trabajo/calculadora-salario">Calculate my net salary</Link></div></div></section>

    <section className="section shell"><div className="split-heading"><div><span className="eyebrow">Werkstudent</span><h2>The 20-hour rule and the 26-week framework</h2></div><div><p>When studies remain the main activity, employment of no more than 20 hours per week can qualify for the Werkstudent privilege. The job is then normally exempt from payroll health, care and unemployment insurance, while pension insurance still applies.</p><p>More than 20 hours can still qualify when the extra work is mainly in the evening, at night, on weekends or during semester breaks and the periods above 20 hours do not exceed 26 weeks in a year. This is a test of the real working pattern, not permission to label any student job a Werkstudent role.</p></div></div><div className="werkstudent-example-grid">{werkstudentExamples.map((item) => <article key={item.label}><span>{item.label}</span><strong>{euro(item.grossMonthly, 2)} gross/month</strong><p>{euro(item.grossMonthly * 12, 0)} gross/year · {euro(item.result.deductions.pension, 2)} pension/month · {euro(item.result.deductions.wageTax, 2)} estimated wage tax/month.</p><em>≈ {euro(item.result.netMonthly, 2)} net/month before separate student health insurance</em></article>)}</div><div className="section-cta"><Link className="button button-primary" href="/trabajo/calculadora-salario">Calculate salary as a Werkstudent</Link><Link className="button button-secondary" href="/guides/werkstudent-germany">How Werkstudent works</Link></div></section>

    <section className="section section-dark"><div className="shell"><div className="section-heading"><div><span className="eyebrow">Regular employment examples</span><h2>After the Midijob reduction ends</h2></div><p>Standard assumptions: tax class I, Berlin, statutory health insurance, no church tax and no children. These are planning estimates, not official payslips.</p></div><div className="regular-example-grid">{regularExamples.map((item) => { const social = item.result.deductions.pension + item.result.deductions.health + item.result.deductions.care + item.result.deductions.unemployment; return <article key={item.label}><span>{item.label}</span><strong>≈ {euro(item.result.netMonthly, 2)} net/month</strong><p>{euro(item.result.grossHourly, 2)} gross/hour · {euro(item.result.deductions.wageTax + item.result.deductions.solidarity + item.result.deductions.churchTax, 2)} estimated tax/month · {euro(social, 2)} social insurance/month.</p></article>; })}</div><div className="section-cta"><Link className="button button-primary" href="/trabajo/calculadora-salario">Calculate my own salary</Link></div></div></section>

    <section className="section section-tint"><div className="shell"><div className="section-heading"><div><span className="eyebrow">Real numbers</span><h2>Hourly, monthly and annual examples</h2></div><p>All net figures use the calculator’s standard planning assumptions. Student examples exclude the separate student health-insurance premium.</p></div><div className="employment-table-wrap"><table className="employment-table example-table"><thead><tr><th>Starting point</th><th>Gross / hour</th><th>Gross / week</th><th>Gross / month</th><th>Gross / year</th><th>Estimated net / month</th></tr></thead><tbody>{examples.map((item) => <tr key={item.label}><th>{item.label}</th><td>{euro(item.result.grossHourly, 2)}</td><td>{euro(item.result.grossHourly * item.weeklyHours, 2)}</td><td>{euro(item.result.grossMonthly, 2)}</td><td>{euro(item.result.grossAnnual, 0)}</td><td>≈ {euro(item.result.netMonthly, 2)}</td></tr>)}</tbody></table></div><p className="table-caption">The €2,000/month example at 40 hours per week is below the 2026 general minimum wage; it is included to show why working hours matter. Legal exceptions can exist.</p></div></section>

    <section className="section shell"><div className="section-heading"><div><span className="eyebrow">Minimum wage</span><h2>2026 and 2027 reference card</h2></div></div><div className="wage-year-grid"><article><span>From 1 January 2026</span><strong>€{employmentFigures.minimumWage[2026].toFixed(2)} / hour</strong><p>40 h/week: about €2,409.33 gross/month · €28,912 gross/year.</p><small>Minijob limit: €{employmentFigures.minijobLimit[2026]} per month.</small></article><article><span>From 1 January 2027</span><strong>€{employmentFigures.minimumWage[2027].toFixed(2)} / hour</strong><p>40 h/week: about €2,530.67 gross/month · €30,368 gross/year.</p><small>Minijob limit: €{employmentFigures.minijobLimit[2027]} per month.</small></article></div><p className="table-caption">The statutory minimum is defined per hour actually worked, so exact monthly pay depends on hours. Legal exceptions and higher sector minimum wages can apply.</p></section>

    <section className="section section-tint"><div className="shell"><div className="section-heading"><div><span className="eyebrow">Official sources</span><h2>Check the rule that applies to you</h2></div></div><div className="resource-grid">{employmentSources.map((source) => <a href={source.url} target="_blank" rel="noreferrer" key={source.url}><span><strong>{source.name}</strong><small>{source.note}</small></span><span>↗</span></a>)}</div><div className="faq-section compact-faq">{faq.map((item) => <details className="faq-item" key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div><p className="salary-disclaimer">GermanyBase provides informational estimates only. Actual taxes, social-security contributions and employment classification depend on individual circumstances. This content does not constitute tax or legal advice.</p></div></section>
    <JsonLd data={[articleSchema, faqSchema]}/>
  </>;
}
