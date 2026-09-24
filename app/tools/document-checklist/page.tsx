import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { DocumentChecklist } from "@/components/practical-tools";
import { SafetyNotice } from "@/components/source-stamp";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = { title: "Germany document checklist", description: "Build and save a Germany moving-document checklist based on citizenship group and purpose.", alternates: { canonical: absoluteUrl("/tools/document-checklist") } };
export default function ChecklistPage() { return <><section className="page-hero"><div className="shell"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tools", href: "/tools" }, { label: "Document checklist" }]}/><div className="page-hero-copy"><span className="eyebrow">Saved locally</span><h1>Germany document checklist</h1><p>See only the core documents relevant to your citizenship group and purpose, tick them off and keep progress on your device.</p></div></div></section><section className="section shell narrow-tool"><DocumentChecklist/><SafetyNotice/></section></> }
