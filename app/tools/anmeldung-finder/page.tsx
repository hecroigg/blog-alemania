import type { Metadata } from "next";
import Link from "next/link";
import { AnmeldungFinder } from "@/components/anmeldung-finder";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SafetyNotice } from "@/components/source-stamp";
import { registrationCities } from "@/lib/content/city-registration";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Anmeldung by city: official registration steps in Germany",
  description: "Compare address-registration options for 16 German cities, arriving from abroad or moving within Germany. Verified city-specific sources, documents and steps in English, Spanish and German.",
  alternates: {canonical: absoluteUrl("/tools/anmeldung-finder")},
  openGraph: {title:"Anmeldung by city: 16 official municipal routes",description:"Find the responsible city service, learn the limits of online registration and prepare the right documents.",url:absoluteUrl("/tools/anmeldung-finder")}
};

export default async function AnmeldungFinderPage({searchParams}:{searchParams:Promise<{city?:string}>}) {
  const query=await searchParams;
  const initialCity=registrationCities.some(item=>item.slug===query.city)?query.city:"mannheim";
  return <>
    <section className="page-hero"><div className="shell">
      <Breadcrumbs items={[{label:"Home",href:"/"},{label:"Tools",href:"/tools"},{label:"Anmeldung by city"}]}/>
      <div className="page-hero-copy">
        <span className="eyebrow">Municipal-source decision helper · 16 cities</span>
        <h1>Which Anmeldung office and process do you need?</h1>
        <p>Germany has a national registration framework, but booking, online identity requirements and arrival-from-abroad rules differ by municipality. Pick your city and situation to see the relevant official service, not a guessed appointment.</p>
      </div>
    </div></section>
    <div className="shell"><AnmeldungFinder initialCity={initialCity}/></div>
    <section className="section shell registration-editorial">
      <div className="section-heading"><div><span className="eyebrow">Before you book</span><h2>Four decisions that change your Anmeldung route</h2></div></div>
      <div className="registration-guide-grid">
        <article><h3>1. Where is the flat actually located?</h3><p>Your registration municipality is determined by the real address of your dwelling, not your office or university. Renting across a municipal boundary can mean a different Bürgeramt even when the postcode area looks similar.</p></article>
        <article><h3>2. Did you move from outside Germany?</h3><p>Do not assume the digital change-of-address service can process your first arrival. Bremen expressly requires in-person registration for arrivals from abroad; Karlsruhe also directs first-time international arrivals to a Bürgerbüro rather than its electronic or virtual route.</p></article>
        <article><h3>3. Main or secondary residence?</h3><p>Online services often cover only a main or sole residence. For instance, Nuremberg&#39;s service says a secondary residence needs an in-person appointment. Your address status can also affect local requirements.</p></article>
        <article><h3>4. Do you have the landlord&#39;s confirmation?</h3><p>The Wohnungsgeberbestätigung confirms actual occupancy. A rental contract alone is not the same document. Ask the landlord or primary tenant early and carry the confirmation along with identification and your move-in date.</p></article>
      </div>
      <h2>Official sources and further reading</h2>
      <p>Each selection above links directly to its municipality&#39;s service. These administrative portals can change their eligibility rules, so treat them as authoritative for current booking and documentation.</p>
      <p>For a broader overview, read our <Link href="/guides/anmeldung-germany">Anmeldung in Germany guide</Link> and the <Link href="/guides/wohnungsgeberbestaetigung">housing-provider confirmation guide</Link>. The <Link href="/tools/document-checklist">document checklist</Link> helps prepare the next steps.</p>
      <SafetyNotice/>
    </section>
  </>;
}
