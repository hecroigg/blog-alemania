"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import {
  calculateSalary,
  defaultSalaryInputs,
  salaryComparisonAmounts,
  type InsuranceType,
  type SalaryInputs,
  type TaxClass,
} from "@/lib/employment-data";
import { germanStates } from "@/lib/platform-data";
import { toolUrl } from "@/lib/locale-paths";
import { localizedGeneralPath } from "@/lib/content/localized-general-guides";

function decimal(value: string) {
  return Number(value.replace(",", ".")) || 0;
}

export function SalaryCalculator() {
  const { locale, translate } = useLanguage();
  const lang = locale === "es" || locale === "de" ? locale : "en";
  const [period, setPeriod] = useState<"monthly" | "annual">("monthly");
  const [amount, setAmount] = useState(defaultSalaryInputs.grossMonthly);
  const [draft, setDraft] = useState(defaultSalaryInputs);
  const [applied, setApplied] = useState(defaultSalaryInputs);
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

  const calculate = (grossMonthly: number) => {
    setApplied({ ...draft, grossMonthly });
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
    <form className="salary-form" onSubmit={(event) => { event.preventDefault(); calculate(period === "monthly" ? amount : amount / 12); }}>
      <div className="salary-basic-grid">
        <label className="form-field salary-amount"><span>{translate("Gross salary", undefined, true)}</span><div className="salary-input"><span>€</span><input inputMode="decimal" min="0" step="0.01" type="number" value={amount} onChange={(event) => setAmount(decimal(event.target.value))}/></div></label>
        <fieldset className="segmented-control"><legend>{translate("Salary period", undefined, true)}</legend><label><input type="radio" name="period" value="monthly" checked={period === "monthly"} onChange={() => setPeriod("monthly")}/><span>{translate("Monthly", undefined, true)}</span></label><label><input type="radio" name="period" value="annual" checked={period === "annual"} onChange={() => setPeriod("annual")}/><span>{translate("Annual", undefined, true)}</span></label></fieldset>
        <label className="form-field"><span>{translate("Weekly hours (optional)", undefined, true)}</span><input min="0" max="80" step="0.5" type="number" value={draft.weeklyHours || ""} onChange={(event) => set("weeklyHours", decimal(event.target.value))}/><small>{translate("Used only for gross and net hourly estimates.")}</small></label>
      </div>

      <div className="salary-presets" role="group" aria-label={{ es: "Ejemplos de bruto mensual", en: "Sample gross monthly salaries", de: "Beispiele für Monatsbrutto" }[lang]}>
        {salaryComparisonAmounts.map((gross) => <button className="button button-secondary" type="button" key={gross}
          onClick={() => { setPeriod("monthly"); setAmount(gross); calculate(gross); }}>{money(gross)}</button>)}
      </div>

      <details className="advanced-panel">
        <summary>{translate("Get a more precise result", undefined, true)} <small>{translate("Open tax class, state, insurance and personal details")}</small></summary>
        <div className="advanced-grid">
          <label className="form-field"><span>{translate("Steuerklasse — Tax class", undefined, true)}</span><select value={draft.taxClass} onChange={(event) => setAdvanced("taxClass", event.target.value as TaxClass)}>{["I", "II", "III", "IV", "V", "VI"].map((item) => <option value={item} key={item}>{item}</option>)}</select></label>
          <label className="form-field"><span>{translate("Bundesland — Federal state", undefined, true)}</span><select value={draft.state} onChange={(event) => setAdvanced("state", event.target.value)}>{germanStates.map(([state]) => <option value={state} key={state}>{state}</option>)}</select></label>
          <label className="form-field"><span>{translate("Krankenversicherung — Health insurance", undefined, true)}</span><select value={draft.insurance} onChange={(event) => setAdvanced("insurance", event.target.value as InsuranceType)}><option value="statutory">{translate("Statutory", undefined, true)}</option><option value="private">{translate("Private", undefined, true)}</option></select></label>
          {draft.insurance === "private" && <label className="form-field"><span>{translate("Your monthly private premium after employer subsidy", undefined, true)}</span><input min="0" step="10" type="number" value={draft.privateMonthlyPremium} onChange={(event) => setAdvanced("privateMonthlyPremium", decimal(event.target.value))}/></label>}
          <label className="form-field"><span>{translate("Age", undefined, true)}</span><input min="15" max="100" type="number" value={draft.age} onChange={(event) => setAdvanced("age", decimal(event.target.value))}/></label>
          <label className="form-field"><span>{translate("Children", undefined, true)}</span><input min="0" max="10" type="number" value={draft.children} onChange={(event) => setAdvanced("children", decimal(event.target.value))}/></label>
          <label className="calculator-check compact-check"><input type="checkbox" checked={draft.churchTax} onChange={(event) => setAdvanced("churchTax", event.target.checked)}/><span><strong>{translate("Kirchensteuer — Church tax applies")}</strong><small>{translate("8% of wage tax in Bavaria and Baden-Württemberg; 9% elsewhere.")}</small></span></label>
          <label className="calculator-check compact-check"><input type="checkbox" checked={draft.student} onChange={(event) => setAdvanced("student", event.target.checked)}/><span><strong>{translate("Enrolled student", undefined, true)}</strong><small>{translate("The Werkstudent estimate applies only at 20 hours or less per week.")}</small></span></label>
          <label className="calculator-check compact-check"><input type="checkbox" checked={draft.minijobPensionExempt} onChange={(event) => setAdvanced("minijobPensionExempt", event.target.checked)}/><span><strong>{translate("Minijob pension exemption", undefined, true)}</strong><small>{translate("Use only if a valid exemption applies.")}</small></span></label>
        </div>
      </details>
      <button className="button button-primary salary-submit" type="submit">{translate("Calculate net salary", undefined, true)}</button>
    </form>

    <section className="salary-results" aria-live="polite">
      <div className="result-heading"><div><span className="eyebrow">{translate("2026 planning result", undefined, true)}</span><h2>{translate(result.employmentType)}</h2></div><span className="status-pill">{translate(appliedAdvanced ? "More precise estimate" : "Quick estimate based on standard assumptions")}</span></div>
      {result.belowMinimumWage && <div className="salary-warning"><strong>{translate("Below the 2026 statutory minimum wage")}</strong><p>{translate("Your entries equal", undefined, true)} {money(result.grossHourly, 2)} {translate("gross per hour, below €13.90. Check whether a legal exception applies or correct the salary and hours.")}</p></div>}
      <div className="salary-result-cards">
        <article><span>{translate("Monthly net", undefined, true)}</span><strong>{money(result.netMonthly, 2)}</strong><small>{translate("From", undefined, true)} {money(result.grossMonthly, 2)} {translate("Gross salary")}</small></article>
        <article><span>{translate("Annual net", undefined, true)}</span><strong>{money(result.netAnnual, 0)}</strong><small>{translate("From", undefined, true)} {money(result.grossAnnual, 0)} {translate("Gross salary")}</small></article>
        <article><span>{translate("Net per hour", undefined, true)}</span><strong>{applied.weeklyHours ? money(result.netHourly, 2) : "—"}</strong><small>{applied.weeklyHours ? <>{translate("Gross:", undefined, true)} {money(result.grossHourly, 2)} {translate("/ hour")} · {number(applied.weeklyHours, 1)} {translate("hours / week")}</>  : translate("Enter weekly hours to calculate")}</small></article>
        <article><span>{translate("Estimated total deductions", undefined, true)}</span><strong>{money(totalDeductions, 2)}</strong><small>{translate("Per month · tax and social insurance")}</small></article>
      </div>

      <div className="salary-meter"><div style={{ width: `${result.grossMonthly ? Math.max(0, Math.min(100, result.netMonthly / result.grossMonthly * 100)) : 0}%` }}/><span>{number(result.grossMonthly ? result.netMonthly / result.grossMonthly * 100 : 0, 1)}% {translate("estimated take-home")}</span></div>

      <details className="deduction-panel" open>
        <summary>{translate("Estimated deduction breakdown", undefined, true)}</summary>
        <div className="deduction-list">{deductions.map(([label, value]) => <div key={label}><span>{translate(label, undefined, true)}</span><strong>{money(value, 2)} {translate("/ month")}</strong></div>)}</div>
      </details>

      {result.employmentType === "Midijob" && <aside className="method-note"><strong>{translate("Reduced Midijob contribution base", undefined, true)}</strong><p>{translate("Your employee social contributions use an estimated base of", undefined, true)} {money(result.contributionBaseMonthly, 2)} {translate("instead of the full")} {money(result.grossMonthly, 2)} {translate("gross. The reduction fades progressively up to €2,000.")}</p></aside>}
      {result.employmentType === "Werkstudent" && <aside className="method-note"><strong>{translate("Werkstudent estimate", undefined, true)}</strong><p>{translate("The result deducts pension insurance but not payroll health, care or unemployment insurance. Your separate student health-insurance premium can still apply and is not included here.")}</p></aside>}
      <p className="salary-disclaimer">{translate("This is an educational planning estimate, not an official payroll statement or personal tax advice. Tax-class payroll tables, individual health-fund rates, allowances, bonuses, private insurance and multiple jobs can change the result. Confirm important decisions with payroll, your insurer or a qualified tax adviser.")}</p>
      <div className="salary-links"><Link href={toolUrl(lang,"employment-types")}>{translate("Compare employment types", undefined, true)}</Link><Link href={localizedGeneralPath(lang,"minijob-germany")!}>{translate("Read the Minijob guide", undefined, true)}</Link><Link href={localizedGeneralPath(lang,"werkstudent-germany")!}>{translate("Read the Werkstudent guide", undefined, true)}</Link></div>
    </section>
  </div>;
}
