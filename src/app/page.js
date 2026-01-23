import BlogSection from "@/components/Home/BlogSection";
import ContactSection from "@/components/Home/ContactSection";
import FAQSection from "@/components/Home/FAQSection";
import HeroSection from "@/components/Home/HeroSection";
import StatsSection from "@/components/Home/StatsSection";
import WhoWeAre from "@/components/Home/WhoAreWeSection";
import WorkflowSection from "@/components/Home/WorkflowSection";

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden">
      <HeroSection />
      <StatsSection />
      <WhoWeAre />
      <WorkflowSection />
      <FAQSection />
      <BlogSection />
      <ContactSection />
    </div>
  );
}
