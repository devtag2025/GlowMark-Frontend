import HeroSection from "@/components/Home/HeroSection";
import StatsSection from "@/components/Home/StatsSection";
import WhoWeAre from "@/components/Home/WhoAreWeSection";
import WorkflowSection from "@/components/Home/WorkflowSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <HeroSection />
      <StatsSection />
      <WhoWeAre />
      <WorkflowSection />
    </div>
  );
}
