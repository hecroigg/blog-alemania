"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { employmentFigures } from "@/lib/employment-data";

const employmentAnswers = {
  minijob: { name: "Likely Minijob", note: "Regular average earnings are within the €603 monthly limit. Other jobs can change the classification.", href: "/guides/minijob-germany" },
  werkstudent: { name: "Possible Werkstudent", note: "Study may remain the main activity at 20 hours or less per week.", href: "/guides/werkstudent-germany" },
  werkstudentException: { name: "Possible Werkstudent", note: "An exception may apply only for qualifying evening, night, weekend or semester-break work within the 26-week framework.", href: "/guides/werkstudent-germany" },
  midijob: { name: "Likely Midijob", note: "Gross monthly pay is in the €603.01–€2,000 transition zone with progressively reduced employee social contributions.", href: "/trabajo/tipos-de-empleo#midijob" },
  regular: { name: "Regular employment", note: "Gross monthly pay is above the Midijob ceiling. Standard social-insurance rules normally apply up to the contribution ceilings.", href: "/trabajo/calculadora-salario" },
} as const;

export function EmploymentTypeTool() {
  const { translate } = useLanguage();
  const [gross, setGross] = useState(1_200);
  const [hours, setHours] = useState(16);
  const [student, setStudent] = useState(true);
  const [specialPattern, setSpecialPattern] = useState(false);
  const answer = useMemo(() => {
    if (gross <= employmentFigures.minijobLimit[2026]) return employmentAnswers.minijob;
    if (student && (hours <= 20 || specialPattern)) return hours <= 20 ? employmentAnswers.werkstudent : employmentAnswers.werkstudentException;
    if (gross <= employmentFigures.midijobUpper) return employmentAnswers.midijob;
    return employmentAnswers.regular;
  }, [gross, hours, specialPattern, student]);

  return <div className="employment-checker">
    <form onSubmit={(event) => event.preventDefault()}>
      <label className="form-field"><span>Gross pay per month</span><input type="number" min="0" step="25" value={gross} onChange={(event) => setGross(Number(event.target.value) || 0)}/></label>
      <label className="form-field"><span>Weekly working hours</span><input type="number" min="0" max="80" step="0.5" value={hours} onChange={(event) => setHours(Number(event.target.value) || 0)}/></label>
      <label className="calculator-check compact-check"><input type="checkbox" checked={student} onChange={(event) => setStudent(event.target.checked)}/><span><strong>Currently enrolled</strong><small>Your studies remain your main activity.</small></span></label>
      <label className="calculator-check compact-check"><input type="checkbox" checked={specialPattern} onChange={(event) => setSpecialPattern(event.target.checked)}/><span><strong>Qualifying special work pattern</strong><small>Mainly evening, night, weekend or semester-break work for no more than 26 weeks.</small></span></label>
    </form>
    <section aria-live="polite"><span className="eyebrow">Quick classification</span><h3>{translate(answer.name)}</h3><p>{translate(answer.note)}</p><Link className="button button-secondary" href={answer.href}>Check the detailed rules</Link><small>This tool cannot assess residence permission, multiple jobs or every insurance exception.</small></section>
  </div>;
}
