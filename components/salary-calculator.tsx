"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import {
  calculateSalary,
  type InsuranceType,
  type SalaryInputs,
  type TaxClass,
} from "@/lib/employment-data";
import { germanStates } from "@/lib/platform-data";

const defaultInputs: SalaryInputs = {
  grossMonthly: 3_200,
  weeklyHours: 40,
  taxClass: "I",
  state: "Berlin",
  churchTax: false,
  insurance: "statutory",
  privateMonthlyPremium: 450,
  age: 30,
  children: 0,
  student: false,
  minijobPensionExempt: false,
};

function decimal(value: string) {
  return Number(value.replace(",", ".")) || 0;
}

export function SalaryCalculator() {
  const { locale, translate } = useLanguage();
  const [period, setPeriod] = useState<"monthly" | "annual">("monthly");
  const [amount, setAmount] = useState(3_200);
  const [draft, setDraft] = useState(defaultInputs);
  const [applied, setApplied] = useState(defaultInputs);
  const [advancedUsed, setAdvancedUsed] = useState(false);
  const [appliedAdvanced, setAppliedAdvanced] = useState(false);
  const result = useMemo(() => calculateSalary(applied), [applied]);
  const money = (value: number, digits = 0) => new Intl.NumberFormat(locale, { style: "currency", currency: "EUR", minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value);
  const number = (value: number, digits = 2) => new Intl.NumberFormat(locale, { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value);
  const set = <K extends keyof SalaryInputs>(key: K, value: SalaryInputs[K]) => setDraft((current) => ({ ...current, [key]: value }));
  const setAdvanced = <K extends keyof SalaryInputs>(key: K, value: SalaryInputs[K]) => {
    setAdvancedUsed(true);
    set(key, value);
  };

  const calculate = () => {
    setApplied({ ...draft, grossMonthly: period === "monthly" ? amount : amount / 12 });
    setAppliedAdvanced(advancedUsed);
  };

  const deductions = [
    ["Lohnsteuer — Wage tax", result.deductions.wageTax],
    ["Solidaritätszuschlag — Solidarity surcharge", result.deductions.solidarity],
    ["Kirchensteuer — Church tax", result.deductions.churchTax],
    ["Rentenversicherung — Pension insurance", result.deductions.pension],
    ["Krankenversicherung — Health insurance", result.deductions.health],
    ["Pflegeversicherung — Long-term care insurance", result.deductions.care],
    ["Arbeitslosenversicherung — Unemployment insurance", result.deductions.unemployment],
  ] as const;
  const totalDeductions = Object.values(result.deductions).reduce((sum, value) => sum + value, 0);

  return <div className="salary-tool">
    <form className="salary-form" onSubmit={(event) => { event.preventDefault(); calculate(); }}>
      <div className="salary-basic-grid">
        <label className="form-field salary-amount"><span>Gross salary</span><div className="salary-input"><span>€</span><input inputMode="decimal" min="0" step="50" type="number" value={amount} onChange={(event) => setAmount(decimal(event.target.value))}/></div></label>
        <fieldset className="segmented-control"><legend>Salary period</legend><label><input type="radio" name="period" value="monthly" checked={period === "monthly"} onChange={() => setPeriod("monthly")}/><span>Monthly</span></label><label><input type="radio" name="period" value="annual" checked={period === "annual"} onChange={() => setPeriod("annual")}/><span>Annual</span></label></fieldset>
        <label className="form-field"><span>Weekly hours (optional)</span><input min="0" max="80" step="0.5" type="number" value={draft.weeklyHours || ""} onChange={(event) => set("weeklyHours", decimal(event.target.value))}/><small>Used only for gross and net hourly estimates.</small></label>
      </div>

      <details className="advanced-panel">
        <summary>Get a more precise result <small>Open tax class, state, insurance and personal details</small></summary>
        <div className="advanced-grid">
          <label className="form-field"><span>Steuerklasse — Tax class</span><select value={draft.taxClass} onChange={(event) => setAdvanced("taxClass", event.target.value as TaxClass)}>{["I", "II", "III", "IV", "V", "VI"].map((item) => <option value={item} key={item}>{item}</option>)}</select></label>
          <label className="form-field"><span>Bundesland — Federal state</span><select value={draft.state} onChange={(event) => setAdvanced("state", event.target.value)}>{germanStates.map(([state]) => <option value={state} key={state}>{state}</option>)}</select></label>
          <label className="form-field"><span>Krankenversicherung — Health insurance</span><select value={draft.insurance} onChange={(event) => setAdvanced("insurance", event.target.value as InsuranceType)}><option value="statutory">Statutory</option><option value="private">Private</option></select></label>
          {draft.insurance === "private" && <label className="form-field"><span>Your monthly private premium after employer subsidy</span><input min="0" step="10" type="number" value={draft.privateMonthlyPremium} onChange={(event) => setAdvanced("privateMonthlyPremium", decimal(event.target.value))}/></label>}
          <label className="form-field"><span>Age</span><input min="15" max="100" type="number" value={draft.age} onChange={(event) => setAdvanced("age", decimal(event.target.value))}/></label>
          <label className="form-field"><span>Children</span><input min="0" max="10" type="number" value={draft.children} onChange={(event) => setAdvanced("children", decimal(event.target.value))}/></label>
          <label className="calculator-check compact-check"><input type="checkbox" checked={draft.churchTax} onChange={(event) => setAdvanced("churchTax", event.target.checked)}/><span><strong>Kirchensteuer — Church tax applies</strong><small>8% of wage tax in Bavaria and Baden-Württemberg; 9% elsewhere.</small></span></label>
          <label className="calculator-check compact-check"><input type="checkbox" checked={draft.student} onChange={(event) => setAdvanced("student", event.target.checked)}/><span><strong>Enrolled student</strong><small>The Werkstudent estimate applies only at 20 hours or less per week.</small></span></label>
          <label className="calculator-check compact-check"><input type="checkbox" checked={draft.minijobPensionExempt} onChange={(event) => setAdvanced("minijobPensionExempt", event.target.checked)}/><span><strong>Minijob pension exemption</strong><small>Use only if a valid exemption applies.</small></span></label>
        </div>
      </details>
      <button className="button button-primary salary-submit" type="submit">Calculate net salary</button>
    </form>

    <section className="salary-results" aria-live="polite">
      <div className="result-heading"><div><span className="eyebrow">2026 planning result</span><h2>{translate(result.employmentType)}</h2></div><span className="status-pill">{translate(appliedAdvanced ? "More precise estimate" : "Quick estimate based on standard assumptions")}</span></div>
      {result.belowMinimumWage && <div className="salary-warning"><strong>Below the 2026 statutory minimum wage</strong><p>Your entries equal {money(result.grossHourly, 2)} gross per hour, below €13.90. Check whether a legal exception applies or correct the salary and hours.</p></div>}
      <div className="salary-result-cards">
        <article><span>Monthly net</span><strong>{money(result.netMonthly, 2)}</strong><small>From {money(result.grossMonthly, 2)} gross</small></article>
        <article><span>Annual net</span><strong>{money(result.netAnnual, 0)}</strong><small>From {money(result.grossAnnual, 0)} gross</small></article>
        <article><span>Net per hour</span><strong>{applied.weeklyHours ? money(result.netHourly, 2) : "—"}</strong><small>{applied.weeklyHours ? <>Gross: {money(result.grossHourly, 2)} / hour · {number(applied.weeklyHours, 1)} hours / week</> : "Enter weekly hours to calculate"}</small></article>
        <article><span>Estimated total deductions</span><strong>{money(totalDeductions, 2)}</strong><small>Per month · tax and social insurance</small></article>
      </div>

      <div className="salary-meter"><div style={{ width: `${result.grossMonthly ? Math.max(0, Math.min(100, result.netMonthly / result.grossMonthly * 100)) : 0}%` }}/><span>{number(result.grossMonthly ? result.netMonthly / result.grossMonthly * 100 : 0, 1)}% estimated take-home</span></div>

      <details className="deduction-panel" open>
        <summary>Estimated deduction breakdown</summary>
        <div className="deduction-list">{deductions.map(([label, value]) => <div key={label}><span>{label}</span><strong>{money(value, 2)} / month</strong></div>)}</div>
      </details>

      {result.employmentType === "Midijob" && <aside className="method-note"><strong>Reduced Midijob contribution base</strong><p>Your employee social contributions use an estimated base of {money(result.contributionBaseMonthly, 2)} instead of the full {money(result.grossMonthly, 2)} gross. The reduction fades progressively up to €2,000.</p></aside>}
      {result.employmentType === "Werkstudent" && <aside className="method-note"><strong>Werkstudent estimate</strong><p>The result deducts pension insurance but not payroll health, care or unemployment insurance. Your separate student health-insurance premium can still apply and is not included here.</p></aside>}
      <p className="salary-disclaimer">This is an educational planning estimate, not an official payroll statement or personal tax advice. Tax-class payroll tables, individual health-fund rates, allowances, bonuses, private insurance and multiple jobs can change the result. Confirm important decisions with payroll, your insurer or a qualified tax adviser.</p>
      <div className="salary-links"><Link href="/trabajo/tipos-de-empleo">Compare employment types</Link><Link href="/guides/minijob-germany">Read the Minijob guide</Link><Link href="/guides/werkstudent-germany">Read the Werkstudent guide</Link></div>
    </section>
  </div>;
}
