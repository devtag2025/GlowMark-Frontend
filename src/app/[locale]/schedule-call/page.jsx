"use client";

import React, { useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";

const CALENDLY_URL = "https://calendly.com/glowmarkagency-sales/30min";

export default function ScheduleCallPage() {
  const { t } = useLanguage();

  // Lightweight redirect page – no heavy widget script
  useEffect(() => {
    // Redirect user to hosted Calendly booking page
    window.location.href = CALENDLY_URL;
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 px-4">
      <div className="max-w-md text-center">
        <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {t("calendly.loading")}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          We&apos;re redirecting you to our secure booking page on Calendly.
        </p>
        <a
          href={CALENDLY_URL}
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-colors"
        >
          Open Calendly
        </a>
      </div>
    </div>
  );
}
