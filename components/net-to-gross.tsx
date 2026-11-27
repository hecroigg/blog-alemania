"use client";

import { useState } from "react";
import { euros } from "@/lib/budget-scenarios";
import { estimateGrossForNet, netTargetRange } from "@/lib/employment-data";
import type { SiteLocale } from "@/lib/locale-paths";

const copy = {
  es: {
    title: "¿Cuánto bruto necesitas para cobrar un neto concreto?",
    label: "Neto mensual deseado (€)",
    result: "Bruto mensual estimado",
    range: "Introduce un neto dentro del rango de este ejemplo a jornada completa.",
  },
  en: {
    title: "What gross salary gives you your target take-home pay?",
    label: "Target monthly take-home pay (€)",
    result: "Estimated monthly gross salary",
    range: "Enter a take-home amount within the range for this full-time example.",
  },
  de: {
    title: "Netto in brutto umrechnen: Wie viel Brutto brauchst du?",
    label: "Gewünschtes Monatsnetto (€)",
    result: "Geschätztes Monatsbrutto",
    range: "Gib ein Wunsch-Netto innerhalb des Bereichs für dieses Vollzeitbeispiel ein.",
  },
};

export function NetToGross({ locale }: { locale: SiteLocale }) {
  const [target, setTarget] = useState<number | null>(1800);
  const gross = target === null ? null : estimateGrossForNet(target);
  const t = copy[locale];

  return <section className="article-section editorial-budget" id="net-to-gross">
    <h2>{t.title}</h2>
    <div className="editorial-budget-fields">
      <label className="form-field">
        <span>{t.label}</span>
        <input type="number" inputMode="numeric" step="1" min={netTargetRange.min} max={netTargetRange.max}
          value={target ?? ""} onChange={(event) => {
            const value = event.currentTarget.valueAsNumber;
            setTarget(Number.isFinite(value) ? value : null);
          }} />
      </label>
    </div>
    <dl className="editorial-budget-results" aria-live="polite">
      <div><dt>{t.result}</dt><dd>{gross === null ? "—" : euros(locale, gross)}</dd></div>
    </dl>
    {gross === null && <p role="status">{t.range} ({euros(locale, netTargetRange.min)}–{euros(locale, netTargetRange.max)})</p>}
  </section>;
}
