import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { MovePlanner } from "@/components/move-planner";
import { SafetyNotice, SourceStamp } from "@/components/source-stamp";
import { coreSources } from "@/lib/platform-data";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = { title: "Plan your move to Germany", description: "Build a personalised route for moving to Germany based on nationality, purpose, destination, housing and insurance status.", alternates: { canonical: absoluteUrl("/plan") } };

export default function PlanPage() {
  return <><section className="page-hero planner-hero"><div className="shell"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Plan your move" }]}/><div className="page-hero-grid"><div className="page-hero-copy"><span className="eyebrow">Personalised onboarding</span><h1>Plan your move to Germany</h1><p>Answer nine practical questions. We will organise the likely work into before arrival, first days, first week, first month and later—without pretending one route fits everyone.</p></div><div className="page-stat"><span>Your data</span><strong>Local</strong><small>No account. Nothing is submitted to us.</small></div></div></div></section><section className="section shell"><MovePlanner/><div className="source-panel"><SafetyNotice/><div className="source-stamp-grid">{coreSources.map((source) => <SourceStamp key={source.url} source={source}/>)}</div></div></section></>;
}
