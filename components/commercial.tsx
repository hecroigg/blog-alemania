"use client";

import type { ReactNode } from "react";

// Google AdSense's publisher tag is loaded once from the document head so the
// published Google-certified EU consent message can display BEFORE a choice.
// Google CMP (not this site's analytics preference) controls advertising consent.

export function AdSlot({ placement }: { placement: "article-intro" | "article-body" | "sidebar" }) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_ID;
  const slots = { "article-intro": process.env.NEXT_PUBLIC_ADSENSE_SLOT_INTRO, "article-body": process.env.NEXT_PUBLIC_ADSENSE_SLOT_BODY, sidebar: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR };
  if (!client || !slots[placement]) return null;
  return <div className={`ad-slot ad-${placement}`} aria-label="Advertisement"><small>Advertisement</small><ins className="adsbygoogle" style={{ display: "block" }} data-ad-client={client} data-ad-slot={slots[placement]} data-ad-format="auto" data-full-width-responsive="true"/></div>;
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
