import BlogSection from "@/components/Home/BlogSection";
import ContactSection from "@/components/Home/ContactSection";
import FAQSection from "@/components/Home/FAQSection";
import HeroSection from "@/components/Home/HeroSection";
import StatsSection from "@/components/Home/StatsSection";
import WhoWeAre from "@/components/Home/WhoAreWeSection";
import WorkflowSection from "@/components/Home/WorkflowSection";
import PriceSection from "@/components/Home/PriceSection";
import CTASection from "@/components/Home/CTASection";
import CalendlySection from "@/components/Calendly/CalendlySection";
import SerpixaSection from "@/components/Home/SerpixaSection";
import { getAllPosts } from "@/lib/wordpress";

export default async function Home({ params }) {
  const { locale } = await params;
  const blogs = await getAllPosts(locale || "en");

  return (
    <div className="min-h-screen overflow-hidden">
      <HeroSection />
      <StatsSection />
      <WhoWeAre />
      <WorkflowSection />
      <CTASection />
      <PriceSection />
      <CalendlySection />
      <SerpixaSection />
      <FAQSection />
      <BlogSection blogs={blogs} />
      <ContactSection />
    </div>
  );
}
