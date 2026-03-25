import HeroSection from "../components/home/HeroSection";
import StatsSection from "../components/home/StatsSection";
import ActivitiesSection from "../components/home/ActivitiesSection";
import LearningTracksSection from "../components/home/LearningTracksSection";
import WhyJoinSection from "../components/home/WhyJoinSection";
import CTASection from "../components/home/CTASection";
import CyberBadgeStrip from "../components/home/CyberBadgeStrip";
import LiveRankingPreview from "../components/home/LiveRankingPreview";

const Home = () => {
  return (
    <div className="space-y-24 lg:space-y-32">
      <HeroSection />
      <CyberBadgeStrip />
      <StatsSection />
      <ActivitiesSection />
      <LearningTracksSection />
      <LiveRankingPreview />
      <WhyJoinSection />
      <CTASection />
    </div>
  );
};

export default Home;