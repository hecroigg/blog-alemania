"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import Script from "next/script";

export function AdSlot({ placement }: { placement: "article-intro" | "article-body" | "sidebar" }) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_ID;
  const slots = { "article-intro": process.env.NEXT_PUBLIC_ADSENSE_SLOT_INTRO, "article-body": process.env.NEXT_PUBLIC_ADSENSE_SLOT_BODY, sidebar: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR };
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    const read = () => { try { setAllowed(Boolean(JSON.parse(localStorage.getItem("living-germany-consent") || "{}").advertising)); } catch { setAllowed(false); } };
    read(); window.addEventListener("consentchange", read); return () => window.removeEventListener("consentchange", read);
  }, []);
  if (!client || !slots[placement] || !allowed) return null;
  return <><Script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`} crossOrigin="anonymous" strategy="afterInteractive"/><div className={`ad-slot ad-${placement}`} aria-label="Advertisement"><small>Advertisement</small><ins className="adsbygoogle" style={{ display: "block" }} data-ad-client={client} data-ad-slot={slots[placement]} data-ad-format="auto" data-full-width-responsive="true"/></div></>;
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
