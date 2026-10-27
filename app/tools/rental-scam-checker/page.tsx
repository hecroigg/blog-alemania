import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { RentalScamChecker } from "@/components/practical-tools";
import { DepositRuleChecker } from "@/components/deposit-rule-checker";
import Link from "next/link";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = { title: "Germany rental scam checklist", description: "Check German rental scam warning signs, residential deposit limits and instalments, with official police, consumer and legal references.", alternates: { canonical: absoluteUrl("/tools/rental-scam-checker") } };
export default function RentalScamPage() { return <><section className="page-hero"><div className="shell"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tools", href: "/tools" }, { label: "Rental scam checklist" }]}/><div className="page-hero-copy"><span className="eyebrow">Housing safety</span><h1>Rental scam checklist</h1><p>Identify warning signs before paying. The result is cautious guidance—not a definitive fraud verdict.</p></div></div></section><section className="section shell"><RentalScamChecker/><DepositRuleChecker/><section className="rental-safety-editorial">
<h2>Before you send a deposit: a practical verification sequence</h2>
<p>Scam listings often copy real photos and use believable contracts. An impressive PDF or a friendly video call is not proof that the advertiser may rent out the property. Compare the asking price with similar local homes, verify the address independently and try to arrange a real viewing.</p>
<h3>Three checks before you pay</h3>
<ol>
<li><strong>Inspect the home and identity.</strong> A supposed landlord abroad who asks you to pay before a viewing or offers to send keys by courier is a recognised warning sign.</li>
<li><strong>Check the payment timeline.</strong> A viewing reservation fee is suspicious. For ordinary residential contracts, the first third of an agreed cash deposit is due at the beginning of the tenancy—not merely when you receive an online offer.</li>
<li><strong>Minimise identity-data sharing.</strong> The German police warn against giving identity-card copies and extensive personal records to unverified advertisers. Confirm the recipient and redact unnecessary details when documents are legitimately requested.</li>
</ol>
<h3>If you already sent money or identity documents</h3>
<p>Contact your bank promptly about a possible transfer recall, retain the listing and correspondence, notify the housing platform and report the incident to the police. Tell the police if identity documents were also shared.</p>
<h3>Check whether the address can be registered</h3>
<p>Ask about the <Link href="/guides/wohnungsgeberbestaetigung">Wohnungsgeberbestätigung</Link> before accepting accommodation. That housing-provider confirmation is needed for normal residence registration and cannot simply be replaced by a lease. Use the <Link href="/tools/anmeldung-finder">Anmeldung Finder</Link> to locate municipal instructions.</p>
<h3>Sources checked 27 October 2026</h3>
<ul>
<li><a href="https://www.verbraucherzentrale.de/wissen/vertraege-reklamation/abzocke/fakewohnungen-im-internet-so-erkennen-sie-falsche-immobilienanzeigen-27576" target="_blank" rel="noopener noreferrer">Verbraucherzentrale: fake rental advertisements (August 2026)</a></li>
<li><a href="https://www.polizei-beratung.de/aktuelles/detailansicht/vorsicht-vor-betrug-bei-der-wohnungssuche/" target="_blank" rel="noopener noreferrer">German police: rental fraud prevention (October 2026)</a></li>
<li><a href="https://www.gesetze-im-internet.de/bgb/__551.html" target="_blank" rel="noopener noreferrer">§551 BGB: limits and instalments for security deposits</a></li>
<li><a href="https://verwaltung.bund.de/leistungsverzeichnis/DE/leistung/99115008000000/herausgeber/TH-208514604/region/16" target="_blank" rel="noopener noreferrer">Federal service portal: housing-provider confirmation</a></li>
</ul><p className="rental-deposit-disclaimer">This checklist reduces risk but cannot prove whether an individual listing is fraudulent or determine legal rights in a non-standard lease.</p>
</section></section></> }
