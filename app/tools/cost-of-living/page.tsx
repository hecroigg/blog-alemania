import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CostOfLivingCalculator } from "@/components/practical-tools";
import Link from "next/link";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = { title: "Germany cost of living calculator", description: "Build a transparent monthly and annual Germany budget from your rent, household, lifestyle and transport choices.", alternates: { canonical: absoluteUrl("/tools/cost-of-living") } };
export default function CostPage() { return <><section className="page-hero"><div className="shell"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tools", href: "/tools" }, { label: "Cost of living" }]}/><div className="page-hero-copy"><span className="eyebrow">Interactive budget</span><h1>Germany cost of living calculator</h1><p>Use your own housing figure to get one practical monthly estimate. Official fixed costs are exact; variable household spending uses one visible central assumption.</p></div></div></section><section className="section shell"><CostOfLivingCalculator/><p className="calculator-source-link">Need the legal detail? <Link className="text-link" href="/costs-deadlines">See verified 2026 costs, tax rates and deadlines.</Link></p></section></> }
