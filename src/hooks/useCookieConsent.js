"use client";

import { useEffect, useState, useCallback } from "react";

const CONSENT_KEY = "cookie_consent_v1";
const EVENT_NAME = "cookie-consent-updated";

export function useCookieConsent() {
  const [consent, setConsentState] = useState(null);
  const [ready, setReady] = useState(false);

  const readConsent = useCallback(() => {
    try {
      const raw = localStorage.getItem(CONSENT_KEY);
      setConsentState(raw ? JSON.parse(raw) : null);
    } catch {
      setConsentState(null);
    } finally {
      setReady(true);
    }
  }, []);

  // Read on mount + listen for updates
  useEffect(() => {
    readConsent();

    const onUpdate = () => readConsent();
    window.addEventListener(EVENT_NAME, onUpdate);

    // (optional) storage event works across tabs
    const onStorage = (e) => {
      if (e.key === CONSENT_KEY) readConsent();
    };
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener(EVENT_NAME, onUpdate);
      window.removeEventListener("storage", onStorage);
    };
  }, [readConsent]);

  const saveConsent = useCallback((data) => {
    const payload = {
      necessary: true,
      analytics: !!data.analytics,
      marketing: !!data.marketing,
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(CONSENT_KEY, JSON.stringify(payload));
    setConsentState(payload);

    // 🔥 notify other components in same tab
    window.dispatchEvent(new Event(EVENT_NAME));
  }, []);

  const clearConsent = useCallback(() => {
    localStorage.removeItem(CONSENT_KEY);
    setConsentState(null);

    window.dispatchEvent(new Event(EVENT_NAME));
  }, []);

  return { consent, ready, saveConsent, clearConsent };
}
