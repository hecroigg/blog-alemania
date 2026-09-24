"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Consent = { necessary: true; analytics: boolean; advertising: boolean };
const key = "living-germany-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [manage, setManage] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [advertising, setAdvertising] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(!localStorage.getItem(key)));
    return () => cancelAnimationFrame(frame);
  }, []);
  function save(consent: Consent) {
    localStorage.setItem(key, JSON.stringify({ ...consent, savedAt: new Date().toISOString() }));
    window.dispatchEvent(new CustomEvent("consentchange", { detail: consent }));
    setVisible(false);
  }
  if (!visible) return null;
  return <aside className="cookie-banner" aria-label="Cookie preferences"><div className="cookie-copy"><strong>Your privacy, your choice</strong><p>Necessary storage keeps your preferences. Optional analytics and advertising stay off unless you accept them.</p><span><Link href="/cookie-policy">Cookie policy</Link> · <Link href="/privacy-policy">Privacy policy</Link></span></div>{manage && <fieldset><legend>Manage preferences</legend><label><input type="checkbox" checked disabled/> Necessary <small>Always active</small></label><label><input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)}/> Analytics</label><label><input type="checkbox" checked={advertising} onChange={(e) => setAdvertising(e.target.checked)}/> Advertising</label></fieldset>}<div className="cookie-actions"><button className="button button-ghost" onClick={() => save({ necessary: true, analytics: false, advertising: false })}>Reject</button><button className="button button-ghost" onClick={() => manage ? save({ necessary: true, analytics, advertising }) : setManage(true)}>{manage ? "Save choices" : "Manage"}</button><button className="button button-primary" onClick={() => save({ necessary: true, analytics: true, advertising: true })}>Accept</button></div></aside>;
}
