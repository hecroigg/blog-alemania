import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { cityProfiles } from "@/lib/platform-data";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = { title: "Where do I have to go in Germany?", description: "Find the right German authority for address registration, immigration, tax, work, health insurance and university matters.", alternates: { canonical: absoluteUrl("/authorities") } };
const authorities = [
  ["Bürgeramt / Bürgerbüro", "Address registration, registration certificates and many local identity or municipal services.", "Use your municipality's official service portal."],
  ["Ausländerbehörde", "Residence permits, extensions and many immigration matters after arrival.", "The responsible office is normally linked to your place of residence."],
  ["German embassy or consulate", "Entry visas and consular matters before travel.", "Use the mission responsible for your current place of residence."],
  ["Bundesagentur für Arbeit", "Public employment services and roles in some work-authorisation procedures.", "Use its official portal or the route named by the immigration authority."],
  ["BAMF", "Federal immigration and integration information, including integration courses and asylum matters.", "BAMF does not replace the local authority handling an individual residence permit."],
  ["Finanzamt", "Local tax administration and tax-case matters.", "Your personal Tax ID is a separate federal identifier."],
  ["Krankenkasse", "Statutory health-insurance membership, certificates and contribution questions.", "Ask the insurer to confirm your individual status in writing."],
  ["University administration", "Admission, enrolment, semester contributions and university records.", "University enrolment does not replace residence or municipal formalities."],
] as const;
export default function AuthoritiesPage() { return <><section className="page-hero"><div className="shell"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Authority finder" }]}/><div className="page-hero-copy"><span className="eyebrow">Who handles what?</span><h1>Where do I have to go?</h1><p>German administration is easier once you separate municipal, immigration, tax, insurance and university responsibilities.</p></div></div></section><section className="section shell"><div className="authority-grid">{authorities.map(([name, task, note]) => <article key={name}><span>Authority</span><h2>{name}</h2><p>{task}</p><small>{note}</small></article>)}</div><div className="section-heading compact-heading"><div><span className="eyebrow">Official city portals</span><h2>Start locally</h2></div><p>Choose the municipality where you actually live; nearby cities can use different portals and appointment systems.</p></div><div className="explore-city-grid">{cityProfiles.map((city) => <a href={city.officialUrl} target="_blank" rel="noreferrer" key={city.slug}><span>{city.state}</span><strong>{city.name}</strong><small>Open official portal</small></a>)}</div></section></> }
