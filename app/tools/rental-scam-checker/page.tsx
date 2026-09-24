import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { RentalScamChecker } from "@/components/practical-tools";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = { title: "Germany rental scam checklist", description: "Review common rental warning signs before sending money or sensitive documents for a German property.", alternates: { canonical: absoluteUrl("/tools/rental-scam-checker") } };
export default function RentalScamPage() { return <><section className="page-hero"><div className="shell"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tools", href: "/tools" }, { label: "Rental scam checklist" }]}/><div className="page-hero-copy"><span className="eyebrow">Housing safety</span><h1>Rental scam checklist</h1><p>Identify warning signs before paying. The result is cautious guidance—not a definitive fraud verdict.</p></div></div></section><section className="section shell"><RentalScamChecker/></section></> }
