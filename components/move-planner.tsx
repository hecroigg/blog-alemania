"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { cityProfiles, getCitizenshipGroup, movePurposes, nationalityOptions, stayLengths } from "@/lib/platform-data";

type Answers = { nationality: string; residence: string; purpose: string; stay: string; city: string; housing: string; status: string; insurance: string; household: string };
type Translate = (source: string, replacements?: Record<string, string>, capitalise?: boolean) => string;

const initial: Answers = { nationality: "Spain", residence: "Spain", purpose: "Employment", stay: "More than 12 months", city: "Berlin", housing: "No", status: "Employment contract", insurance: "No", household: "One person" };

function SelectField({ label, value, options, onChange, translate }: { label: string; value: string; options: readonly string[]; onChange: (value: string) => void; translate: Translate }) {
  return <label className="form-field"><span>{translate(label, undefined, true)}</span><select value={value} onChange={(event) => onChange(event.target.value)}>{options.map((option) => <option value={option} key={option}>{translate(option, undefined, true)}</option>)}</select></label>;
}

export function MovePlanner() {
  const { translate } = useLanguage();
  const [answers, setAnswers] = useState(initial);
  const [generated, setGenerated] = useState(false);
  const update = (key: keyof Answers, value: string) => setAnswers((current) => ({ ...current, [key]: value }));
  const group = getCitizenshipGroup(answers.nationality);
  const nonEu = group === "Non-EU";
  const city = cityProfiles.find((item) => item.name === answers.city) || cityProfiles[0];

  const plan = useMemo(() => {
    const before = [
      nonEu ? translate("Confirm the correct visa or residence route for your reason for moving before travel.") : translate("Prepare valid identity documents and evidence for your move."),
      answers.status === "Nothing yet" ? translate("Build a realistic route to employment or study before making non-refundable commitments.") : translate("Keep your employment or study evidence and related correspondence together."),
      answers.housing === "No" ? translate("Search for accommodation in {city} and confirm that address registration is possible.", { city: answers.city }) : translate("Confirm that your accommodation provider will issue the Wohnungsgeberbestätigung."),
      answers.insurance === "No" ? translate("Compare the health-insurance route that matches your work, study and residence status.") : translate("Request written evidence of your health coverage for Germany."),
    ];
    const firstDays = [
      translate("Move into the accommodation and put your name on the mailbox."),
      translate("Collect the Wohnungsgeberbestätigung from the responsible provider."),
      nonEu ? translate("Check the responsible Ausländerbehörde and any appointment or online-application process.") : translate("Keep your freedom-of-movement evidence and employment or study documents accessible."),
    ];
    const firstWeek = [
      translate("Check the municipality's current Anmeldung requirements and book or attend the appointment."),
      translate("Confirm health-insurance activation and give the required details to your employer or university."),
      translate("Set up a bank account, mobile connection and transport option based on actual needs."),
    ];
    const firstMonth = [
      translate("Store the registration certificate and check delivery of your personal Tax ID."),
      translate("Handle the Rundfunkbeitrag household account; in a shared home, check whether someone already pays."),
      nonEu ? translate("Complete the residence-permit steps that apply to your route and entry status.") : translate("Check whether any family-member or long-term residence steps apply to your household."),
      translate("Review your first real monthly costs in {city} and replace planning estimates with bills.", { city: city.name }),
    ];
    const later = [translate("Review contracts and cancellation dates."), translate("Keep immigration, employment, tax and insurance records organised."), translate("Recheck official guidance before any renewal, job change or long absence.")];
    return { before, firstDays, firstWeek, firstMonth, later };
  }, [answers, city.name, nonEu, translate]);

  return <div className="planner-shell">
    <div className="planner-form" aria-label={translate("Plan your move to Germany")}>
      <div className="planner-progress"><span>{translate("Personal profile", undefined, true)}</span><strong>{translate(group, undefined, true)}</strong></div>
      <div className="form-grid">
        <SelectField translate={translate} label="Nationality" value={answers.nationality} options={nationalityOptions} onChange={(value) => update("nationality", value)}/>
        <SelectField translate={translate} label="Current country of residence" value={answers.residence} options={nationalityOptions} onChange={(value) => update("residence", value)}/>
        <SelectField translate={translate} label="Reason for moving" value={answers.purpose} options={movePurposes} onChange={(value) => update("purpose", value)}/>
        <SelectField translate={translate} label="Length of stay" value={answers.stay} options={stayLengths} onChange={(value) => update("stay", value)}/>
        <SelectField translate={translate} label="Destination" value={answers.city} options={cityProfiles.map((item) => item.name)} onChange={(value) => update("city", value)}/>
        <SelectField translate={translate} label="Do you have accommodation?" value={answers.housing} options={["No", "Yes", "Temporary only"]} onChange={(value) => update("housing", value)}/>
        <SelectField translate={translate} label="Employment or study status" value={answers.status} options={["Employment contract", "University admission", "Erasmus confirmation", "Ausbildung contract", "Nothing yet"]} onChange={(value) => update("status", value)}/>
        <SelectField translate={translate} label="Health insurance for Germany" value={answers.insurance} options={["No", "Yes", "Not sure"]} onChange={(value) => update("insurance", value)}/>
        <SelectField translate={translate} label="Household" value={answers.household} options={["One person", "Couple", "Couple + children", "Student", "Shared apartment / WG"]} onChange={(value) => update("household", value)}/>
      </div>
      <button className="button button-primary button-large" type="button" onClick={() => setGenerated(true)}>{translate("Build my Germany plan", undefined, true)}</button>
    </div>

    {generated && <section className="plan-result" aria-live="polite">
      <div className="result-heading"><div><span className="eyebrow">{translate("Your personal Germany plan", undefined, true)}</span><h2>{translate(answers.nationality, undefined, true)} → {answers.city}</h2></div><div className="status-pill">{translate(group, undefined, true)} · {translate(answers.purpose, undefined, true)}</div></div>
      <div className="requirement-grid">
        <article><span>{translate("Visa", undefined, true)}</span><strong>{translate(nonEu ? "Route-specific check required" : "Normally not required", undefined, true)}</strong></article>
        <article><span>{translate("Work authorisation", undefined, true)}</span><strong>{translate(nonEu ? "Depends on route and permit" : "Normally no separate permit", undefined, true)}</strong></article>
        <article><span>Anmeldung</span><strong>{translate("Check local process after moving in", undefined, true)}</strong></article>
        <article><span>{translate("Health insurance", undefined, true)}</span><strong>{translate("Required; route depends on status", undefined, true)}</strong></article>
      </div>
      <div className="timeline-grid">
        {([ ["Before arriving", plan.before], ["First days", plan.firstDays], ["First week", plan.firstWeek], ["First month", plan.firstMonth], ["Later", plan.later] ] as const).map(([title, items], index) => <article className="timeline-stage" key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{translate(title, undefined, true)}</h3><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}
      </div>
      <div className="plan-next"><Link className="button button-primary" href="/tools/document-checklist">{translate("Build document checklist", undefined, true)}</Link><Link className="button button-secondary" href="/tools/cost-of-living">{translate("Calculate monthly costs", undefined, true)}</Link><a className="button button-secondary" href={city.officialUrl} target="_blank" rel="noreferrer">{translate("Open the official {city} portal", { city: city.name }, true)}</a></div>
    </section>}
  </div>;
}
