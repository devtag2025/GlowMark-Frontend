"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, Settings, Check, Shield } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import { buildPageUrl } from "@/utils/paths";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function CookieBanner() {
  const { t } = useLanguage();

  const { consent, ready, saveConsent } = useCookieConsent();
  const pathname = usePathname();
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    analytics: false,
    marketing: false,
  });

  // Wait until localStorage is read & user hasn't made choice
  if (!ready || consent) return null;

  const handleAcceptAll = () => {
    saveConsent({
      analytics: true,
      marketing: true,
    });
  };

  const handleRejectAll = () => {
    saveConsent({
      analytics: false,
      marketing: false,
    });
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
    setShowPreferences(false);
  };

  const togglePreference = (key) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <>
      <AnimatePresence>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998]"
          onClick={() => !showPreferences && handleRejectAll()}
        />

        {/* Cookie Banner */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6"
        >
          <div className="max-w-6xl mx-auto bg-[var(--card-bg-solid)] backdrop-blur-xl border border-[var(--border-color)] rounded-3xl shadow-2xl shadow-purple-900/20 overflow-hidden">
            {!showPreferences ? (
              // ========== MAIN BANNER ==========
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                  {/* Icon & Text */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                        <Cookie className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-theme">
                        {t("consent.title")}
                      </h3>
                    </div>
                    <p className="text-sm md:text-base text-theme-secondary leading-relaxed">
                      {t("consent.description")}
                    </p>
                    <button
                      onClick={() => setShowPreferences(true)}
                      className="mt-3 text-sm text-purple-500 hover:text-purple-600 font-medium flex items-center gap-1 transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      {t("consent.customize")}
                    </button>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <button
                      onClick={handleRejectAll}
                      className="px-6 py-3 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-theme-secondary font-medium hover:bg-[var(--background-secondary)] transition-all"
                    >
                      {t("consent.reject")}
                    </button>
                    <button
                      onClick={handleAcceptAll}
                      className="px-6 py-3 rounded-xl gradient-purple text-white font-bold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all"
                    >
                      {t("consent.accept")}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // ========== PREFERENCES PANEL ==========
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-purple-500" />
                    <h3 className="text-xl font-bold text-theme">
                      {t("consent.cookie")}
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowPreferences(false)}
                    className="w-8 h-8 rounded-lg bg-[var(--input-bg)] flex items-center justify-center text-theme-muted hover:text-theme transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  {/* Necessary Cookies - Always Active */}
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-[var(--background-secondary)] border border-[var(--border-color)]">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-theme">
                          {t("consent.necessaryCookies")}
                        </h4>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-600 font-medium">
                          {t("consent.cookieHighlight")}
                        </span>
                      </div>
                      <p className="text-sm text-theme-secondary">
                        {t("consent.cookieDesc")}
                      </p>
                    </div>
                    <div className="w-12 h-6 rounded-full bg-purple-500 flex items-center justify-end px-1 cursor-not-allowed">
                      <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
                    </div>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-[var(--background-secondary)] border border-[var(--border-color)] hover:border-purple-500/30 transition-colors">
                    <div className="flex-1">
                      <h4 className="font-semibold text-theme mb-1">
                        {t("consent.analytics")}
                      </h4>
                      <p className="text-sm text-theme-secondary">
                        {t("consent.analyticsDesc")}
                      </p>
                    </div>
                    <button
                      onClick={() => togglePreference("analytics")}
                      className={`w-12 h-6 rounded-full flex items-center transition-all ${
                        preferences.analytics
                          ? "bg-purple-500 justify-end"
                          : "bg-gray-300 justify-start"
                      } px-1`}
                      aria-label="Toggle analytics cookies"
                    >
                      <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
                    </button>
                  </div>

                  {/* Marketing Cookies */}
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-[var(--background-secondary)] border border-[var(--border-color)] hover:border-purple-500/30 transition-colors">
                    <div className="flex-1">
                      <h4 className="font-semibold text-theme mb-1">
                        {t("consent.marketing")}
                      </h4>
                      <p className="text-sm text-theme-secondary">
                        {t("consent.marketingDesc")}
                      </p>
                    </div>
                    <button
                      onClick={() => togglePreference("marketing")}
                      className={`w-12 h-6 rounded-full flex items-center transition-all ${
                        preferences.marketing
                          ? "bg-purple-500 justify-end"
                          : "bg-gray-300 justify-start"
                      } px-1`}
                      aria-label="Toggle marketing cookies"
                    >
                      <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
                    </button>
                  </div>
                </div>

                {/* Save Preferences Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleRejectAll}
                    className="flex-1 px-6 py-3 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-theme-secondary font-medium hover:bg-[var(--background-secondary)] transition-all"
                  >
                    {t("consent.reject")}
                  </button>
                  <button
                    onClick={handleSavePreferences}
                    className="flex-1 px-6 py-3 rounded-xl gradient-purple text-white font-bold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    {t("consent.save")}
                  </button>
                </div>

                {/* Privacy Policy Link */}
                <p className="text-xs text-theme-muted text-center mt-4">
                  {/*
                    Derive locale from the current URL instead of LanguageProvider,
                    since this component is rendered outside of it.
                  */}
                  {(() => {
                    const segments = pathname.split("/").filter(Boolean);
                    const localeSegment = segments[0];
                    const locale = ["en", "fr", "nl"].includes(localeSegment)
                      ? localeSegment
                      : "en";

                    return (
                      <>
                        {t("consent.privacyDesc")}
                        <a
                          href={buildPageUrl("privacyPolicy", locale)}
                          className="text-purple-500 hover:underline"
                        >
                          {t("consent.privacy")}
                        </a>{" "}
                        and{" "}
                        <a
                          href={buildPageUrl("cookiesPolicy", locale)}
                          className="text-purple-500 hover:underline"
                        >
                          {t("consent.cookiePolicy")}
                        </a>
                      </>
                    );
                  })()}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
