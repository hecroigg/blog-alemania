"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { GooglePrivacyButton } from "@/components/google-privacy-button";
import { useEffect, useState } from "react";

type Consent = { necessary: true; analytics: boolean };
const key = "living-germany-consent";
const localizedText = {"en":{"title":"Your privacy, your choice","description":"Necessary storage remembers your preferences. Optional analytics stays off unless you accept it. Google manages advertising permission separately.","cookie":"Cookie policy","privacy":"Privacy policy","manageTitle":"Manage preferences","necessary":"Necessary","active":"Always active","analytics":"Analytics","reject":"Reject","manage":"Manage","save":"Save choices","accept":"Accept","settings":"Cookie settings","google":"Google advertising preferences"},"es":{"title":"Tu privacidad, tú decides","description":"Guardamos tus preferencias necesarias. Las analíticas opcionales están desactivadas hasta que las aceptes. Google gestiona el consentimiento publicitario por separado.","cookie":"Política de cookies","privacy":"Política de privacidad","manageTitle":"Gestionar preferencias","necessary":"Necesarias","active":"Siempre activas","analytics":"Analíticas","reject":"Rechazar","manage":"Administrar","save":"Guardar","accept":"Aceptar","settings":"Configurar cookies","google":"Preferencias publicitarias de Google"},"de":{"title":"Deine Privatsphäre, deine Wahl","description":"Notwendige Speicherung merkt sich deine Auswahl. Optionale Analysen sind ohne Zustimmung deaktiviert. Google verwaltet die Werbeeinwilligung separat.","cookie":"Cookie-Richtlinie","privacy":"Datenschutz","manageTitle":"Einstellungen verwalten","necessary":"Notwendig","active":"Immer aktiv","analytics":"Analyse","reject":"Ablehnen","manage":"Verwalten","save":"Auswahl speichern","accept":"Akzeptieren","settings":"Cookie-Einstellungen","google":"Google-Werbeeinstellungen"},"fr":{"title":"Votre vie privée, votre choix","description":"Le stockage nécessaire conserve votre choix. Les statistiques facultatives sont désactivées sans accord. Google gère séparément le consentement publicitaire.","cookie":"Politique des cookies","privacy":"Confidentialité","manageTitle":"Gérer les préférences","necessary":"Nécessaire","active":"Toujours actif","analytics":"Statistiques","reject":"Refuser","manage":"Gérer","save":"Enregistrer","accept":"Accepter","settings":"Paramètres des cookies","google":"Préférences publicitaires Google"}} as const;

export function CookieBanner() {
  const { locale } = useLanguage();
  const t = locale === "es" || locale === "de" || locale === "fr" ? localizedText[locale] : localizedText.en;
  const [visible, setVisible] = useState(false);
  const [manage, setManage] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => { const stored = localStorage.getItem(key); if(stored) { try {setAnalytics(Boolean(JSON.parse(stored).analytics));} catch { setAnalytics(false); } } setVisible(!stored); });
    return () => cancelAnimationFrame(frame);
  }, []);
  function save(consent: Consent) {
    localStorage.setItem(key, JSON.stringify({ ...consent, savedAt: new Date().toISOString() }));
    window.dispatchEvent(new CustomEvent("consentchange", { detail: consent }));
    setVisible(false);
  }
  if (!visible) return <button type="button" className="button button-ghost" style={{ position: "fixed", bottom: 12, right: 12, zIndex: 95, background: "#fff", border: "1px solid #cbd5e1", boxShadow: "0 4px 16px #0002" }} onClick={() => { setManage(true); setVisible(true); }}>{t.settings}</button>;
  return <aside className="cookie-banner" aria-label={t.manageTitle} data-no-translate><div className="cookie-copy"><strong>{t.title}</strong><p>{t.description}</p><span><Link href="/cookie-policy">{t.cookie}</Link> · <Link href="/privacy-policy">{t.privacy}</Link> · <GooglePrivacyButton label={t.google}/></span></div>{manage && <fieldset><legend>{t.manageTitle}</legend><label><input type="checkbox" checked disabled/> {t.necessary} <small>{t.active}</small></label><label><input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)}/> {t.analytics}</label><GooglePrivacyButton label={t.google}/></fieldset>}<div className="cookie-actions"><button className="button button-ghost" onClick={() => save({ necessary: true, analytics: false })}>{t.reject}</button><button className="button button-ghost" onClick={() => manage ? save({ necessary: true, analytics }) : setManage(true)}>{manage ? t.save : t.manage}</button><button className="button button-primary" onClick={() => save({ necessary: true, analytics: true })}>{t.accept}</button></div></aside>;
}
