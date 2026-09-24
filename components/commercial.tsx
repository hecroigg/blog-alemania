import type { ReactNode } from "react";

export function AdSlot({ placement }: { placement: "article-intro" | "article-body" | "sidebar" }) {
  if (!process.env.NEXT_PUBLIC_ADSENSE_ID) return null;
  return <div className={`ad-slot ad-${placement}`} aria-label="Advertisement"><small>Advertisement</small><div data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID}/></div>;
}

export function PartnerDisclosure() {
  return <p className="partner-disclosure">Commercial disclosure: if this page later includes a partner link, it will be labelled clearly. Partners will not control our editorial conclusions.</p>;
}

export function AffiliateCard({ title, description, children }: { title: string; description: string; children?: ReactNode }) {
  return <aside className="affiliate-card"><span>Optional service</span><h3>{title}</h3><p>{description}</p>{children}<PartnerDisclosure/></aside>;
}

export function ComparisonTable({ headings, rows }: { headings: string[]; rows: string[][] }) {
  return <div className="table-wrap"><table><thead><tr>{headings.map((heading) => <th key={heading}>{heading}</th>)}</tr></thead><tbody>{rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>)}</tbody></table></div>;
}
