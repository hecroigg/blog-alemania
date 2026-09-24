"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export function Analytics() {
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    const read = () => {
      try { setAllowed(Boolean(JSON.parse(localStorage.getItem("living-germany-consent") || "{}").analytics)); }
      catch { setAllowed(false); }
    };
    read();
    window.addEventListener("consentchange", read);
    return () => window.removeEventListener("consentchange", read);
  }, []);
  if (!gaId || !allowed) return null;
  return <><Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive"/><Script id="ga4" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}</Script></>;
}
