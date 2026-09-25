import type { Metadata } from "next";
import { ApartmentAffordabilityCalculator } from "@/components/practical-tools";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SafetyNotice } from "@/components/source-stamp";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Can I afford this apartment in Germany?",
  description: "Compare warm rent, excluded utilities and fixed commitments with your household net income before applying for an apartment.",
  alternates: { canonical: absoluteUrl("/tools/apartment-affordability") },
};

export default function ApartmentAffordabilityPage() {
  return <><section className="page-hero"><div className="shell"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tools", href: "/tools" }, { label: "Apartment affordability" }]}/><div className="page-hero-copy"><span className="eyebrow">Housing decision tool</span><h1>Can I afford this apartment?</h1><p>Enter the household income you actually receive and the complete housing cost—not only the cold rent. You will see what remains before food, transport and everyday life.</p></div></div></section><section className="section shell narrow-tool"><ApartmentAffordabilityCalculator/><SafetyNotice/></section></>;
}
