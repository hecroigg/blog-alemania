"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { cityProfiles, getCitizenshipGroup, movePurposes, nationalityOptions, stayLengths } from "@/lib/platform-data";

type Answers = {
  nationality: string;
  residence: string;
  purpose: string;
  stay: string;
  city: string;
  housing: string;
  status: string;
  insurance: string;
  household: string;
};

const initial: Answers = {
  nationality: "Spain",
  residence: "Spain",
  purpose: "Employment",
  stay: "More than 12 months",
  city: "Berlin",
  housing: "No",
  status: "Employment contract",
  insurance: "No",
  household: "One person",
};

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: readonly string[]; onChange: (value: string) => void }) {
  return <label className="form-field"><span>{label}</span><select value={value} onChange={(event) => onChange(event.target.value)}>{options.map((option) => <option key={option}>{option}</option>)}</select></label>;
}

export function MovePlanner() {
  const [answers, setAnswers] = useState(initial);
  const [generated, setGenerated] = useState(false);
  const update = (key: keyof Answers, value: string) => setAnswers((current) => ({ ...current, [key]: value }));
  const group = getCitizenshipGroup(answers.nationality);
  const nonEu = group === "Non-EU";
  const city = cityProfiles.find((item) => item.name === answers.city) || cityProfiles[0];

  const plan = useMemo(() => {
    const before = [
      nonEu ? `Confirm the correct ${answers.purpose.toLowerCase()} visa or residence route before travel.` : "Prepare valid identity documents and evidence for your move.",
      answers.status === "Nothing yet" ? "Build a realistic route to employment or study before making non-refundable commitments." : `Keep your ${answers.status.toLowerCase()} and related correspondence together.`,
      answers.housing === "No" ? `Search for accommodation in ${answers.city} and confirm that address registration is possible.` : "Confirm that your accommodation provider will issue the Wohnungsgeberbestätigung.",
      answers.insurance === "No" ? "Compare the health-insurance route that matches your work, study and residence status." : "Request written evidence of your health coverage for Germany.",
    ];
    const firstDays = [
      "Move into the accommodation and put your name on the mailbox.",
      "Collect the Wohnungsgeberbestätigung from the responsible provider.",
      nonEu ? "Check the responsible Ausländerbehörde and any appointment or online-application process." : "Keep your freedom-of-movement evidence and employment or study documents accessible.",
    ];
    const firstWeek = [
      "Check the municipality's current Anmeldung requirements and book or attend the appointment.",
      "Confirm health-insurance activation and give the required details to your employer or university.",
      "Set up a bank account, mobile connection and transport option based on actual needs.",
    ];
    const firstMonth = [
      "Store the registration certificate and check delivery of your personal Tax ID.",
      "Handle the Rundfunkbeitrag household account; in a shared home, check whether someone already pays.",
      nonEu ? "Complete the residence-permit steps that apply to your route and entry status." : "Check whether any family-member or long-term residence steps apply to your household.",
      `Review your first real monthly costs in ${city.name} and replace planning estimates with bills.`,
    ];
    const later = ["Review contracts and cancellation dates.", "Keep immigration, employment, tax and insurance records organised.", "Recheck official guidance before any renewal, job change or long absence."];
    return { before, firstDays, firstWeek, firstMonth, later };
  }, [answers, city.name, nonEu]);

  return <div className="planner-shell">
    <div className="planner-form" aria-label="Plan your move to Germany">
      <div className="planner-progress"><span>Personal profile</span><strong>{group}</strong></div>
      <div className="form-grid">
        <SelectField label="Nationality" value={answers.nationality} options={nationalityOptions} onChange={(value) => update("nationality", value)}/>
        <label className="form-field"><span>Current country of residence</span><input value={answers.residence} onChange={(event) => update("residence", event.target.value)} /></label>
        <SelectField label="Reason for moving" value={answers.purpose} options={movePurposes} onChange={(value) => update("purpose", value)}/>
        <SelectField label="Length of stay" value={answers.stay} options={stayLengths} onChange={(value) => update("stay", value)}/>
        <SelectField label="Destination" value={answers.city} options={cityProfiles.map((item) => item.name)} onChange={(value) => update("city", value)}/>
        <SelectField label="Do you have accommodation?" value={answers.housing} options={["No", "Yes", "Temporary only"]} onChange={(value) => update("housing", value)}/>
        <SelectField label="Employment or study status" value={answers.status} options={["Employment contract", "University admission", "Erasmus confirmation", "Ausbildung contract", "Nothing yet"]} onChange={(value) => update("status", value)}/>
        <SelectField label="Health insurance for Germany" value={answers.insurance} options={["No", "Yes", "Not sure"]} onChange={(value) => update("insurance", value)}/>
        <SelectField label="Household" value={answers.household} options={["One person", "Couple", "Couple + children", "Student", "Shared apartment / WG"]} onChange={(value) => update("household", value)}/>
      </div>
      <button className="button button-primary button-large" type="button" onClick={() => setGenerated(true)}>Build my Germany plan</button>
    </div>

    {generated && <section className="plan-result" aria-live="polite">
      <div className="result-heading"><div><span className="eyebrow">Your personal Germany plan</span><h2>{answers.nationality} → {answers.city}</h2></div><div className="status-pill">{group} · {answers.purpose}</div></div>
      <div className="requirement-grid">
        <article><span>Visa</span><strong>{nonEu ? "Route-specific check required" : "Normally not required"}</strong></article>
        <article><span>Work authorisation</span><strong>{nonEu ? "Depends on route and permit" : "Normally no separate permit"}</strong></article>
        <article><span>Anmeldung</span><strong>Check local process after moving in</strong></article>
        <article><span>Health insurance</span><strong>Required; route depends on status</strong></article>
      </div>
      <div className="timeline-grid">
        {([ ["Before arriving", plan.before], ["First days", plan.firstDays], ["First week", plan.firstWeek], ["First month", plan.firstMonth], ["Later", plan.later] ] as const).map(([title, items], index) => <article className="timeline-stage" key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}
      </div>
      <div className="plan-next"><Link className="button button-primary" href="/tools/document-checklist">Build document checklist</Link><Link className="button button-secondary" href="/tools/cost-of-living">Calculate monthly costs</Link><a className="button button-secondary" href={city.officialUrl} target="_blank" rel="noreferrer">Open {city.name} official portal</a></div>
    </section>}
  </div>;
}
