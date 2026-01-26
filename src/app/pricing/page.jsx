"use client";

import React from "react";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import Header from "@/components/Header";
import PricingContent from "@/components/Pricing/PricingContent";

const Page = () => {
  return (
    <LanguageProvider initialLang="en">
      <Header />
      <PricingContent />
    </LanguageProvider>
  );
};

export default Page;
