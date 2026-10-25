"use client";

import { useEffect, useState } from "react";

type GoogleFc = {
  callbackQueue?: { push: (callback: { CONSENT_API_READY: () => void }) => number };
  showRevocationMessage?: () => void;
};
type GoogleFcWindow = Window & { googlefc?: GoogleFc };

/**
 * Official Google Privacy & messaging API. Do not treat the site-local
 * analytics checkbox as an advertising consent signal.
 */
export function GooglePrivacyButton() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const host = window as GoogleFcWindow;
    host.googlefc ||= {};
    const queue = host.googlefc.callbackQueue ||= ([] as Array<{ CONSENT_API_READY: () => void }>);
    queue.push({ CONSENT_API_READY: () => setReady(true) });
  }, []);

  if (!ready) return null;

  return <button type="button" className="button button-ghost" style={{padding: "2px 6px",fontSize: "inherit"}} onClick={() => {
    (window as GoogleFcWindow).googlefc?.showRevocationMessage?.();
  }}>Google advertising preferences</button>;
}
