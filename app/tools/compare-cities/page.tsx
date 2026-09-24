import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CityComparison } from "@/components/practical-tools";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = { title: "Compare German cities", description: "Compare two to four German cities by housing pressure, transport, employment sectors, universities, access and nature.", alternates: { canonical: absoluteUrl("/tools/compare-cities") } };
export default function CompareCitiesPage() { return <><section className="page-hero"><div className="shell"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tools", href: "/tools" }, { label: "Compare cities" }]}/><div className="page-hero-copy"><span className="eyebrow">City decision tool</span><h1>Compare German cities</h1><p>Choose two to four cities and compare practical trade-offs. There is deliberately no arbitrary overall score.</p></div></div></section><section className="section shell"><CityComparison/></section></> }
