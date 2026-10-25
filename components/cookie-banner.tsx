"use client";

import Link from "next/link";
import { GooglePrivacyButton } from "@/components/google-privacy-button";
import { useEffect, useState } from "react";

type Consent = { necessary: true; analytics: boolean };
const key = "living-germany-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [manage, setManage] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(!localStorage.getItem(key)));
    return () => cancelAnimationFrame(frame);
  }, []);
  function save(consent: Consent) {
    localStorage.setItem(key, JSON.stringify({ ...consent, savedAt: new Date().toISOString() }));
    window.dispatchEvent(new CustomEvent("consentchange", { detail: consent }));
    setVisible(false);
  }
  if (!visible) return <button type="button" className="button button-ghost" style={{ position: "fixed", bottom: 12, right: 12, zIndex: 95, background: "#fff", border: "1px solid #cbd5e1", boxShadow: "0 4px 16px #0002" }} onClick={() => { setManage(true); setVisible(true); }}>Cookie settings</button>;
  return <aside className="cookie-banner" aria-label="Cookie preferences"><div className="cookie-copy"><strong>Your privacy, your choice</strong><p>Necessary storage keeps your preferences. Optional analytics stays off unless you accept it. Google manages advertising permissions separately through its published European consent message.</p><span><Link href="/cookie-policy">Cookie policy</Link> · <Link href="/privacy-policy">Privacy policy</Link> · <GooglePrivacyButton/></span></div>{manage && <fieldset><legend>Manage preferences</legend><label><input type="checkbox" checked disabled/> Necessary <small>Always active</small></label><label><input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)}/> Analytics</label><GooglePrivacyButton/></fieldset>}<div className="cookie-actions"><button className="button button-ghost" onClick={() => save({ necessary: true, analytics: false })}>Reject</button><button className="button button-ghost" onClick={() => manage ? save({ necessary: true, analytics }) : setManage(true)}>{manage ? "Save choices" : "Manage"}</button><button className="button button-primary" onClick={() => save({ necessary: true, analytics: true })}>Accept</button></div></aside>;
}
