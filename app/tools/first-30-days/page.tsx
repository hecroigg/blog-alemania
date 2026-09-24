import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ArrivalChecklist } from "@/components/practical-tools";
import { SafetyNotice } from "@/components/source-stamp";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = { title: "First 30 days in Germany checklist", description: "Track the practical setup tasks for your first days, weeks and months in Germany without creating an account.", alternates: { canonical: absoluteUrl("/tools/first-30-days") } };
export default function ArrivalChecklistPage() { return <><section className="page-hero"><div className="shell"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tools", href: "/tools" }, { label: "First 30 days" }]}/><div className="page-hero-copy"><span className="eyebrow">Interactive arrival timeline</span><h1>Your first 30 days in Germany</h1><p>Track the setup sequence locally. The periods are planning groups, not universal legal deadlines.</p></div></div></section><section className="section shell narrow-tool"><ArrivalChecklist/><SafetyNotice/></section></> }
