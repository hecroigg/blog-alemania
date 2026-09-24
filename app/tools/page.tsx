import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = { title: "Tools and calculators", description: "A roadmap of transparent tools for moving costs, rent affordability, salary, and everyday decisions in Germany.", alternates: { canonical: absoluteUrl("/tools") } };

const tools = [
  ["Moving checklist", "A personal, local-first checklist with dependencies and progress. No account required."],
  ["Cost-of-living planner", "Build a dated budget from your rent, household, transport, and insurance inputs."],
  ["Rent affordability", "Compare warm-rent scenarios without presenting one ratio as universal advice."],
  ["Gross-to-net salary", "A future calculator only after reliable, maintainable tax data is connected."],
  ["Deutschlandticket comparison", "Compare a known set of local journeys against current transport products."],
  ["Move savings planner", "Estimate deposits, setup costs, overlapping housing, and a personal safety buffer."],
];

export default function ToolsPage() { return <><section className="page-hero"><div className="shell"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tools" }]}/><div className="page-hero-copy"><span className="eyebrow">Tools roadmap</span><h1>Useful calculations, built carefully</h1><p>These tools are intentionally marked as planned. We will not publish a tax, salary, or affordability result until its assumptions and data can be maintained responsibly.</p></div></div></section><section className="section shell"><div className="tools-grid">{tools.map(([name, description]) => <article className="tool-card" key={name}><span>Planned</span><h2>{name}</h2><p>{description}</p></article>)}</div></section></> }
