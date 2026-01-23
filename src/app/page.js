"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import BlogSection from "@/components/Home/BlogSection";
import ContactSection from "@/components/Home/ContactSection";
import FAQSection from "@/components/Home/FAQSection";
import HeroSection from "@/components/Home/HeroSection";
import StatsSection from "@/components/Home/StatsSection";
import WhoWeAre from "@/components/Home/WhoAreWeSection";
import WorkflowSection from "@/components/Home/WorkflowSection";
import PriceSection from "@/components/Home/PriceSection";

export default function RootPage() {
  return (
    <LanguageProvider initialLang="en">
      <Header />
      <div className="min-h-screen overflow-hidden">
        <HeroSection />
        <StatsSection />
        <WhoWeAre />
        <WorkflowSection />
        <PriceSection />
        <FAQSection />
        <BlogSection />
        <ContactSection />
      </div>
      <Footer />
    </LanguageProvider>
  );
}
