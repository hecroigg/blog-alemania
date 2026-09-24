"use client";

import { useEffect, useMemo, useState } from "react";
import { cityProfiles, getCitizenshipGroup, nationalityOptions, trackedFacts } from "@/lib/platform-data";

function money(value: number) { return new Intl.NumberFormat("en-DE", { style: "currency", currency: "EUR", minimumFractionDigits: Number.isInteger(value) ? 0 : 2, maximumFractionDigits: 2 }).format(value); }

export function CostOfLivingCalculator() {
  const [city, setCity] = useState("Berlin");
  const [household, setHousehold] = useState("One person");
  const [lifestyle, setLifestyle] = useState("Normal");
  const [transport, setTransport] = useState("Deutschlandticket");
  const [broadcastPaid, setBroadcastPaid] = useState(true);
  const [rent, setRent] = useState(900);

  const result = useMemo(() => {
    const people = household === "Couple" ? 1.65 : household === "Couple + children" ? 2.55 : household === "WG" ? .9 : household === "Student" ? .82 : 1;
    const adultTravellers = household === "Couple" || household === "Couple + children" ? 2 : 1;
    const style = lifestyle === "Minimum" ? .72 : lifestyle === "Budget" ? .86 : lifestyle === "Comfortable" ? 1.35 : 1;
    const publicTicket = trackedFacts.deutschlandticketMonthly.value || 63;
    const semesterTicket = trackedFacts.deutschlandSemesterTicketMonthly.value || 37.8;
    const transportAmount = transport === "Bike" ? 30 : transport === "Car" ? 475 : transport === "Mixed" ? 205 : transport === "Deutschlandsemesterticket" ? semesterTicket : publicTicket;
    const broadcastFee = trackedFacts.rundfunkbeitragMonthly.value || 0;
    const rows = [
      ["Housing (your input)", rent],
      ["Utilities & electricity", 135 * people],
      ["Internet & mobile", 55],
      ["Groceries", 290 * people * style],
      ["Transport", transportAmount * (transport === "Deutschlandticket" ? adultTravellers : 1)],
      ["Rundfunkbeitrag household amount", broadcastPaid ? broadcastFee : 0],
      ["Eating out & leisure", 175 * people * style],
      ["Personal & household", 125 * people * style],
      ["Contingency", 130 * people],
    ] as const;
    const total = rows.reduce((sum, row) => sum + row[1], 0);
    return { rows, total };
  }, [broadcastPaid, household, lifestyle, rent, transport]);

  return <div className="calculator-layout">
    <form className="calculator-controls" onSubmit={(event) => event.preventDefault()}>
      <label className="form-field"><span>City or region</span><select value={city} onChange={(event) => setCity(event.target.value)}>{cityProfiles.map((item) => <option key={item.slug}>{item.name}</option>)}</select></label>
      <label className="form-field"><span>Household</span><select value={household} onChange={(event) => setHousehold(event.target.value)}>{["One person", "Couple", "Couple + children", "Student", "WG"].map((item) => <option key={item}>{item}</option>)}</select></label>
      <label className="form-field"><span>Lifestyle</span><select value={lifestyle} onChange={(event) => setLifestyle(event.target.value)}>{["Minimum", "Budget", "Normal", "Comfortable"].map((item) => <option key={item}>{item}</option>)}</select></label>
      <label className="form-field"><span>Transport</span><select value={transport} onChange={(event) => setTransport(event.target.value)}>{["Deutschlandticket", "Deutschlandsemesterticket", "Bike", "Car", "Mixed"].map((item) => <option key={item}>{item}</option>)}</select></label>
      <label className="calculator-check"><input type="checkbox" checked={broadcastPaid} onChange={(event) => setBroadcastPaid(event.target.checked)}/><span><strong>Add Rundfunkbeitrag (€18.36 per dwelling)</strong><small>Switch this off if another person in your dwelling already pays.</small></span></label>
      <label className="range-field"><span>Expected warm rent <strong>{money(rent)}</strong></span><input type="range" min="250" max="3000" step="25" value={rent} onChange={(event) => setRent(Number(event.target.value))}/><small>Use a current listing or offer. This is the largest source of variation.</small></label>
    </form>
    <section className="calculator-result" aria-live="polite">
      <span className="eyebrow">Planning estimate · {city}</span>
      <h2>≈ {money(result.total)}<small>/month</small></h2>
      <p>Approximate annual budget: {money(result.total * 12)}. Health-insurance contributions are excluded because they depend on status and may already be deducted from salary.</p>
      <div className="cost-bars">{result.rows.map(([label, amount]) => <div key={label}><span>{label}</span><div><i style={{ width: `${Math.min(100, (amount / result.total) * 180)}%` }}/></div><strong>{money(amount)}</strong></div>)}</div>
      <aside className="method-note"><strong>One useful estimate, with the assumptions visible</strong><p>Housing is your input. The Deutschlandticket (€63), eligible Deutschlandsemesterticket (€37.80) and Rundfunkbeitrag (€18.36 per dwelling) are official 2026 amounts. Food, utilities, car, leisure and other personal spending are central planning assumptions—not regulated prices or live quotes.</p></aside>
    </section>
  </div>;
}

export function CityComparison() {
  const [selected, setSelected] = useState(["Berlin", "Munich", "Mannheim"]);
  const toggle = (name: string) => setSelected((current) => current.includes(name) ? current.filter((item) => item !== name) : current.length < 4 ? [...current, name] : current);
  const items = cityProfiles.filter((city) => selected.includes(city.name));
  return <div>
    <fieldset className="city-picker"><legend>Choose 2–4 cities</legend>{cityProfiles.map((city) => <label key={city.slug}><input type="checkbox" checked={selected.includes(city.name)} onChange={() => toggle(city.name)} disabled={!selected.includes(city.name) && selected.length >= 4}/><span>{city.name}</span></label>)}</fieldset>
    <div className="comparison-wrap"><table className="comparison-table"><thead><tr><th>Trade-off</th>{items.map((city) => <th key={city.slug}>{city.name}<small>{city.state}</small></th>)}</tr></thead><tbody>
      <tr><th>Housing pressure</th>{items.map((city) => <td key={city.slug}><span className={`pressure pressure-${city.housingPressure.toLowerCase().replace(" ", "-")}`}>{city.housingPressure}</span></td>)}</tr>
      <tr><th>Transport</th>{items.map((city) => <td key={city.slug}>{city.transport}</td>)}</tr>
      <tr><th>Employment sectors</th>{items.map((city) => <td key={city.slug}>{city.sectors.join(" · ")}</td>)}</tr>
      <tr><th>Universities</th>{items.map((city) => <td key={city.slug}>{city.universities}</td>)}</tr>
      <tr><th>Airport/access</th>{items.map((city) => <td key={city.slug}>{city.airport}</td>)}</tr>
      <tr><th>Nature</th>{items.map((city) => <td key={city.slug}>{city.nature}</td>)}</tr>
      <tr><th>Official information</th>{items.map((city) => <td key={city.slug}><a className="text-link" href={city.officialUrl} target="_blank" rel="noreferrer">City portal</a></td>)}</tr>
    </tbody></table></div>
    <p className="table-caption">No overall ranking: compare the trade-offs against your actual work, study, housing and commute options.</p>
  </div>;
}

type ChecklistItem = { id: string; title: string; note: string; when: string };

export function DocumentChecklist() {
  const [nationality, setNationality] = useState("Spain");
  const [purpose, setPurpose] = useState("Employment");
  const [completed, setCompleted] = useState<string[]>([]);
  const group = getCitizenshipGroup(nationality);
  const storageKey = `lg-document-checklist-${group}-${purpose}`;
  useEffect(() => { let saved: string[] = []; try { saved = JSON.parse(window.localStorage.getItem(storageKey) || "[]"); } catch { saved = []; } queueMicrotask(() => setCompleted(saved)); }, [storageKey]);
  const toggle = (id: string) => setCompleted((current) => { const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id]; window.localStorage.setItem(storageKey, JSON.stringify(next)); return next; });
  const universal: ChecklistItem[] = [
    { id: "identity", title: group === "EU" || group === "EEA" ? "Passport or national ID" : "Valid passport", note: "Identity and travel document. Check validity before booking.", when: "Before travel" },
    { id: "housing", title: "Rental agreement or accommodation evidence", note: "Keep the signed agreement and payment evidence.", when: "Housing and registration" },
    { id: "provider", title: "Wohnungsgeberbestätigung", note: "Move-in confirmation issued by the responsible accommodation provider.", when: "Anmeldung" },
    { id: "insurance", title: "Health-insurance evidence", note: "The accepted format depends on work, study and residence route.", when: "Before or immediately after arrival" },
    { id: "civil", title: "Relevant civil-status records", note: "Birth or marriage certificates may be needed for family procedures. Translation, apostille or legalisation depends on issuing country and procedure—confirm officially.", when: "Only when relevant" },
  ];
  const routeItems: ChecklistItem[] = group === "Non-EU" ? [
    { id: "visa", title: "Visa or entry-route evidence", note: "Use the German mission responsible for your residence and the route matching your purpose.", when: "Before travel, where required" },
    { id: "funds", title: "Proof of financial resources", note: "Format and amount are route-specific. Do not rely on a generic checklist.", when: "Application" },
    { id: "photo", title: "Biometric photograph", note: "Confirm the current biometric and submission requirements for the application channel.", when: "Residence application" },
  ] : [];
  const purposeItems: ChecklistItem[] = purpose === "University" ? [{ id: "admission", title: "University admission and enrolment records", note: "Keep the official admission letter and later enrolment certificate.", when: "Visa, enrolment and insurance" }] : purpose === "Employment" ? [{ id: "contract", title: "Employment contract or binding offer", note: "Keep the signed contract, job details and employer contact information.", when: "Visa, insurance and payroll" }] : purpose === "Ausbildung" ? [{ id: "ausbildung", title: "Ausbildung contract", note: "Keep the complete signed agreement and training details.", when: "Application and onboarding" }] : [{ id: "route", title: `${purpose} evidence`, note: "Keep the official confirmation and check what the relevant authority accepts.", when: "Route-specific" }];
  const items = [...universal, ...routeItems, ...purposeItems];
  const progress = Math.round((completed.filter((id) => items.some((item) => item.id === id)).length / items.length) * 100);
  return <div className="checklist-tool">
    <div className="checklist-settings"><label className="form-field"><span>Nationality</span><select value={nationality} onChange={(event) => setNationality(event.target.value)}>{nationalityOptions.map((item) => <option key={item}>{item}</option>)}</select></label><label className="form-field"><span>Purpose</span><select value={purpose} onChange={(event) => setPurpose(event.target.value)}>{["Employment", "University", "Erasmus / exchange", "Ausbildung", "Family reunification", "Freelancer"].map((item) => <option key={item}>{item}</option>)}</select></label></div>
    <div className="progress-card"><div><span>Document readiness</span><strong>{progress}%</strong></div><progress max="100" value={progress}>{progress}%</progress><small>Saved on this device. No account required.</small></div>
    <div className="document-list">{items.map((item) => <label className={completed.includes(item.id) ? "is-complete" : ""} key={item.id}><input type="checkbox" checked={completed.includes(item.id)} onChange={() => toggle(item.id)}/><span><strong>{item.title}</strong><small>{item.note}</small><em>{item.when}</em></span></label>)}</div>
  </div>;
}

const scamSignals = [
  "Payment requested before a viewing or verified handover",
  "The landlord says they are abroad and cannot arrange a normal viewing",
  "Pressure to transfer money immediately",
  "Rent is implausibly low for the location and property",
  "Payment requested through gift cards, cryptocurrency or unusual transfer services",
  "No viewing—physical or credible live video—is possible",
  "Identity or property documents appear inconsistent or altered",
  "There is no proper written rental agreement",
  "The bank-account holder does not match the verified contractual party",
];

export function RentalScamChecker() {
  const [checked, setChecked] = useState<number[]>([]);
  const level = checked.length >= 6 ? "Many warning signs" : checked.length >= 3 ? "Several warning signs" : checked.length ? "Some warning signs" : "No warning signs selected";
  return <div className="scam-checker"><div className="scam-list">{scamSignals.map((item, index) => <label key={item}><input type="checkbox" checked={checked.includes(index)} onChange={() => setChecked((current) => current.includes(index) ? current.filter((value) => value !== index) : [...current, index])}/><span>{item}</span></label>)}</div><aside className={`risk-result risk-${checked.length >= 6 ? "high" : checked.length >= 3 ? "medium" : "low"}`}><span>Checklist result</span><h2>{level}</h2><p>This does not prove that a listing is genuine or fraudulent. Pause before paying, independently verify the property and contractual party, and seek qualified help if documents or payment instructions do not make sense.</p></aside></div>;
}

const arrivalTasks = [
  ["Day 1", "mailbox", "Put your name on the mailbox and confirm how post is delivered."],
  ["Day 1", "provider-confirmation", "Collect the Wohnungsgeberbestätigung from the responsible provider."],
  ["Week 1", "registration", "Start the municipality's Anmeldung process; the standard deadline is 14 days after moving in."],
  ["Week 1", "insurance", "Confirm that your health-insurance coverage is active and correctly recorded."],
  ["Weeks 2–4", "bank", "Set up the bank account or payment access you actually need."],
  ["Weeks 2–4", "tax-id", "Store your Tax ID safely when it arrives or use the official retrieval route if needed."],
  ["Weeks 2–4", "employer", "Complete employer or university onboarding and keep copies of submitted records."],
  ["Weeks 2–4", "broadcast", "Clarify the household Rundfunkbeitrag account; in a WG, check whether someone already pays."],
  ["Months 1–3", "residence", "Complete route-specific residence steps before the applicable document expires."],
  ["Months 1–3", "utilities", "Review electricity, internet, mobile and transport contracts and cancellation dates."],
] as const;

export function ArrivalChecklist() {
  const storageKey = "living-germany-arrival-v1";
  const [completed, setCompleted] = useState<string[]>([]);
  useEffect(() => { let saved: string[] = []; try { saved = JSON.parse(window.localStorage.getItem(storageKey) || "[]"); } catch { saved = []; } queueMicrotask(() => setCompleted(saved)); }, []);
  const toggle = (id: string) => setCompleted((current) => { const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id]; window.localStorage.setItem(storageKey, JSON.stringify(next)); return next; });
  const progress = Math.round((completed.length / arrivalTasks.length) * 100);
  return <div className="checklist-tool"><div className="progress-card"><div><span>Germany setup</span><strong>{progress}%</strong></div><progress max="100" value={progress}>{progress}%</progress><small>Saved on this device. Deadlines vary; verify time-sensitive tasks with the responsible authority.</small></div><div className="arrival-checklist">{["Day 1", "Week 1", "Weeks 2–4", "Months 1–3"].map((period) => <section key={period}><h2>{period}</h2>{arrivalTasks.filter(([group]) => group === period).map(([, id, task]) => <label className={completed.includes(id) ? "is-complete" : ""} key={id}><input type="checkbox" checked={completed.includes(id)} onChange={() => toggle(id)}/><span>{task}</span></label>)}</section>)}</div></div>;
}
