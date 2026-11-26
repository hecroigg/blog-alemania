import Link from "next/link";
import { EditorialTable } from "@/components/editorial-table";
import { euros } from "@/lib/budget-scenarios";
import { calculateSalary, defaultSalaryInputs, salaryComparisonAmounts } from "@/lib/employment-data";
import { localizedGeneralPath } from "@/lib/content/localized-general-guides";
import type { SiteLocale } from "@/lib/locale-paths";

const copy = {
  es: {
    title: "¿Cuánto queda neto con 2.500, 3.000 o 4.000 € brutos?",
    method: "Estimaciones de 2026 para una persona de 30 años, clase fiscal I, en Berlín, sin hijos ni impuesto religioso y con seguro público (recargo medio del 2,9 %). Se suponen doce nóminas iguales. La tabla redondea al euro.",
    caption: "Salarios brutos y netos estimados en Alemania en 2026",
    columns: ["Bruto mensual", "Neto mensual", "Neto anual"],
    office: "Calculadora oficial de retención del Ministerio de Finanzas",
    january: "Cambios de nómina en enero de 2027", budget: "Dónde vivir con 1.800 € netos",
  },
  en: {
    title: "How much is €2,500, €3,000 or €4,000 gross after tax?",
    method: "2026 estimates for a 30-year-old employee in Berlin, tax class I, with no children or church tax and statutory insurance (2.9% average supplementary contribution). The table assumes 12 equal payslips and rounds to the nearest euro.",
    caption: "Estimated gross and take-home pay in Germany in 2026",
    columns: ["Gross per month", "Net per month", "Net per year"],
    office: "Finance Ministry wage-tax calculator",
    january: "January 2027 payroll changes", budget: "Where to live on €1,800 after tax",
  },
  de: {
    title: "Wie viel netto bleibt bei 2.500, 3.000 oder 4.000 € brutto?",
    method: "Schätzwerte für 2026: 30 Jahre, Steuerklasse I, Berlin, kinderlos, ohne Kirchensteuer, gesetzlich versichert (2,9 % durchschnittlicher Zusatzbeitrag). Grundlage sind zwölf gleich hohe Monatsgehälter, gerundet auf volle Euro.",
    caption: "Brutto- und geschätzte Nettogehälter in Deutschland 2026",
    columns: ["Brutto im Monat", "Netto im Monat", "Netto im Jahr"],
    office: "Amtlicher Lohnsteuerrechner des Finanzministeriums",
    january: "Was sich auf der Gehaltsabrechnung im Januar 2027 ändert", budget: "Wohnen mit 1.800 € netto",
  },
};

export function SalaryComparison({ locale }: { locale: SiteLocale }) {
  const t = copy[locale];
  const rows = salaryComparisonAmounts.map((grossMonthly) => {
    const { netMonthly, netAnnual } = calculateSalary({ ...defaultSalaryInputs, grossMonthly });
    return [grossMonthly, netMonthly, netAnnual].map((value) => euros(locale, value));
  });
  return <section className="section shell" id="salary-examples">
    <div className="section-heading"><div><h2>{t.title}</h2><p>{t.method}</p></div></div>
    <EditorialTable caption={t.caption} columns={t.columns} rows={rows} />
    <ul className="source-list">
      <li><a href="https://www.bmf-steuerrechner.de/">{t.office}</a></li>
      <li><Link href={localizedGeneralPath(locale, "germany-changes-january-2027")!}>{t.january}</Link></li>
      <li><Link href={localizedGeneralPath(locale, "cities-germany-1800-euros")!}>{t.budget}</Link></li>
    </ul>
  </section>;
}
