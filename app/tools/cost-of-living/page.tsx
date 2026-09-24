import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CostOfLivingCalculator } from "@/components/practical-tools";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = { title: "Germany cost of living calculator", description: "Build a transparent monthly and annual Germany budget from your rent, household, lifestyle and transport choices.", alternates: { canonical: absoluteUrl("/tools/cost-of-living") } };
export default function CostPage() { return <><section className="page-hero"><div className="shell"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tools", href: "/tools" }, { label: "Cost of living" }]}/><div className="page-hero-copy"><span className="eyebrow">Interactive budget</span><h1>Germany cost of living calculator</h1><p>Use your own housing figure and transparent planning ranges. The output is a decision aid, not a promise or a live price quote.</p></div></div></section><section className="section shell"><CostOfLivingCalculator/></section></> }
