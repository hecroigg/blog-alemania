"use client";

import { useEffect, useState } from "react";

type GoogleFcCallback = { CONSENT_API_READY: () => void } | (() => void);
type GoogleFcQueue = { push: (callback: GoogleFcCallback) => unknown };
type GoogleFc = {
  callbackQueue?: GoogleFcQueue;
  showRevocationMessage?: () => void;
};
type GoogleFcWindow = Window & { googlefc?: GoogleFc };

/**
 * Google only exposes its revocation flow when the privacy messaging API
 * is usable. Consent API readiness alone is not proof that the method exists
 * (for example, the site may not yet be approved for advertising).
 */
export function GooglePrivacyButton() {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    let mounted = true;
    const host = window as GoogleFcWindow;
    host.googlefc ||= {};
    const queue = host.googlefc.callbackQueue ||= [] as GoogleFcCallback[];
    queue.push({
      CONSENT_API_READY: () => {
        if (!mounted) return;
        setAvailable(typeof (window as GoogleFcWindow).googlefc?.showRevocationMessage === "function");
      },
    });
    return () => { mounted = false; };
  }, []);

  // Never display a control that silently does nothing while AdSense is
  // awaiting site approval or Google's CMP revocation API is unavailable.
  if (!available) return null;

  return (
    <button type="button" className="button button-ghost" style={{padding: "2px 6px",fontSize: "inherit"}} onClick={() => {
      const googlefc = (window as GoogleFcWindow).googlefc;
      const action = googlefc?.showRevocationMessage;
      if (!googlefc?.callbackQueue || typeof action !== "function") {
        setAvailable(false);
        return;
      }
      // Official AdSense revocation pattern: push the API method to Google's queue.
      googlefc.callbackQueue.push(action);
    }}>
      Google advertising preferences
    </button>
  );
}
