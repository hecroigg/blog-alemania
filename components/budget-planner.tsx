"use client";

import { useState } from "react";
import type { SiteLocale } from "@/lib/locale-paths";
import { cityBudget, cityBudgetDefaults, cityRentExamples, euros, moveBudget, moveExamples } from "@/lib/budget-scenarios";

const labels = {
  es: {
    moveTitle: "Calcula cuánto ahorrar antes de mudarte", cityTitle: "Calcula qué alquiler puedes pagar",
    coldRent: "Alquiler sin gastos al mes", rent: "Alquiler con gastos al mes", setup: "Viaje y gastos iniciales",
    moveReserve: "Colchón para después del primer mes", income: "Ingresos netos al mes",
    expenses: "Otros gastos al mes", cityReserve: "Ahorro o margen al mes",
    full: "Objetivo con la fianza completa", first: "Con solo el primer plazo de fianza", maxRent: "Alquiler máximo con tu margen",
    remainder: "Saldo tras gastos y margen", moveNote: "La fianza se estima en el máximo legal ordinario, tres alquileres sin gastos. Con el primer plazo todavía debes pagar los dos siguientes.",
    cityNote: "Incluye por separado luz, internet, comida y transporte si no están en el alquiler. Un saldo negativo indica cuánto tendrías que recortar.",
  },
  en: {
    moveTitle: "Work out how much to save before you move", cityTitle: "Find your affordable rent",
    coldRent: "Monthly rent before charges", rent: "Monthly rent including charges", setup: "Travel and setup costs",
    moveReserve: "Buffer for after the first month", income: "Monthly take-home income",
    expenses: "Other monthly spending", cityReserve: "Monthly savings or buffer",
    full: "Savings target with full deposit", first: "With the first deposit installment only", maxRent: "Maximum rent within your budget",
    remainder: "Balance after spending and buffer", moveNote: "The deposit estimate uses the ordinary legal cap of three months’ rent before charges. With installments, the next two payments are still due.",
    cityNote: "Budget separately for electricity, internet, food and transport if your rent excludes them. A negative balance shows how much you need to cut.",
  },
  de: {
    moveTitle: "Sparziel für deinen Umzug berechnen", cityTitle: "Dein Mietbudget berechnen",
    coldRent: "Monatliche Nettokaltmiete", rent: "Monatliche Warmmiete", setup: "Anreise und Startkosten",
    moveReserve: "Rücklage für die Zeit nach dem ersten Monat", income: "Monatliches Nettoeinkommen",
    expenses: "Weitere monatliche Ausgaben", cityReserve: "Monatliche Sparrate oder Rücklage",
    full: "Sparziel mit voller Kaution", first: "Mit der ersten Kautionsrate", maxRent: "Maximale Warmmiete mit Rücklage",
    remainder: "Saldo nach Ausgaben und Rücklage", moveNote: "Die Rechnung nutzt den üblichen gesetzlichen Höchstbetrag von drei Nettokaltmieten. Bei Ratenzahlung bleiben die nächsten zwei Raten fällig.",
    cityNote: "Plane Strom, Internet, Lebensmittel und Verkehr separat ein, soweit sie nicht in der Miete enthalten sind. Ein negativer Saldo zeigt, wie viel du einsparen müsstest.",
  },
};

export function BudgetPlanner({ locale, mode }: { locale: SiteLocale; mode: "move" | "city" }) {
  const isMove = mode === "move";
  const t = labels[locale];
  const [inputs, setInputs] = useState({ ...moveExamples[0], ...cityBudgetDefaults, reserve: isMove ? moveExamples[0].reserve : cityBudgetDefaults.reserve, rent: isMove ? moveExamples[0].rent : cityRentExamples[0].rent });
  const fields = isMove
    ? [["coldRent", t.coldRent], ["rent", t.rent], ["setup", t.setup], ["reserve", t.moveReserve]] as const
    : [["income", t.income], ["rent", t.rent], ["expenses", t.expenses], ["reserve", t.cityReserve]] as const;
  const result = moveBudget(inputs.coldRent, inputs.rent, inputs.setup, inputs.reserve);
  const monthly = cityBudget(inputs.income, inputs.rent, inputs.expenses, inputs.reserve);
  const outputs = isMove ? [[t.full, result.full], [t.first, result.first]] as const : [[t.maxRent, Math.max(0, monthly.maxRent)], [t.remainder, monthly.remainder]] as const;

  return <section className="article-section editorial-budget" id={`${mode}-budget`}>
    <h2>{isMove ? t.moveTitle : t.cityTitle}</h2>
    <div className="editorial-budget-fields">
      {fields.map(([key, label]) => <label className="form-field" key={key}>
        <span>{label} (€)</span>
        <input type="number" min="0" step="any" inputMode="decimal" value={inputs[key] || ""}
          onChange={(event) => {
            const value = event.currentTarget.valueAsNumber;
            setInputs((current) => ({ ...current, [key]: Number.isFinite(value) ? Math.max(0, value) : 0 }));
          }}/>
      </label>)}
    </div>
    <dl aria-live="polite" className="editorial-budget-results">
      {outputs.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{euros(locale, value, Number.isInteger(value) ? 0 : 2)}</dd></div>)}
    </dl>
    <p>{isMove ? t.moveNote : t.cityNote}</p>
  </section>;
}
