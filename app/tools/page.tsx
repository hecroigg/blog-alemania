import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Icon } from "@/components/icon";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = { title: "Tools and calculators", description: "Personalised, transparent tools for moving documents, living costs, city choices and safer renting in Germany.", alternates: { canonical: absoluteUrl("/tools") } };

const tools = [
  ["Personal Germany plan", "Turn your nationality, purpose, housing and insurance status into an ordered arrival plan.", "/plan", "Live"],
  ["Cost-of-living calculator", "Build a monthly and annual budget from your own rent and transparent planning assumptions.", "/tools/cost-of-living", "Live"],
  ["Verified costs & deadlines", "Check official 2026 ticket prices, registration deadlines, fees, tax thresholds and insurance rates.", "/costs-deadlines", "Live"],
  ["Compare cities", "Compare two to four cities by housing pressure, transport, sectors, study, access and nature.", "/tools/compare-cities", "Live"],
  ["Document checklist", "Generate a route-aware checklist, tick documents off and save progress locally.", "/tools/document-checklist", "Live"],
  ["Rental scam checklist", "Review common warning signs before sharing sensitive information or transferring money.", "/tools/rental-scam-checker", "Live"],
  ["First 30 days checklist", "Track a careful arrival sequence across day one, week one and the first three months.", "/tools/first-30-days", "Live"],
  ["Can I afford this apartment?", "Compare total housing cost with net income and fixed commitments before you apply.", "/tools/apartment-affordability", "Live"],
  ["Gross-to-net salary", "Reserved until reliable, maintainable tax rules can support a trustworthy result.", "/guides/cost-of-living-germany", "Researching"],
];

export default function ToolsPage() { return <><section className="page-hero"><div className="shell"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tools" }]}/><div className="page-hero-grid"><div className="page-hero-copy"><span className="eyebrow">Practical applications</span><h1>Turn information into a plan</h1><p>Use interactive tools without creating an account. Assumptions are visible, progress stays on your device, and high-risk answers point back to official sources.</p></div><div className="page-stat"><span>Available now</span><strong>8</strong><small>Planning · costs · deadlines · cities · documents · arrival · housing</small></div></div></div></section><section className="section shell"><div className="tools-grid">{tools.map(([name, description, href, status]) => <Link className="tool-card" href={href} key={name}><span>{status}</span><h2>{name}</h2><p>{description}</p><em>Open tool <Icon name="arrow" size={16}/></em></Link>)}</div></section></> }
