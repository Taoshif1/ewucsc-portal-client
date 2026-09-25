import HeroSection from "../components/home/HeroSection";
import ActivitiesSection from "../components/home/ActivitiesSection";
import WhyJoinSection from "../components/home/WhyJoinSection";
import CTASection from "../components/home/CTASection";
import FAQSection from "../components/home/FAQSection";
import MouseGlow from "../components/home/MouseGlow";
import ScrollProgress from "../components/home/ScrollProgress";
import PageLoader from "../components/home/PageLoader";

const Home = () => {
  return (
    <>
      <PageLoader />
      <ScrollProgress />
      <MouseGlow />

      <div className="relative z-10 space-y-24 lg:space-y-32">
        <HeroSection />
        <ActivitiesSection />
        <WhyJoinSection />
        <FAQSection />
        <CTASection />
      </div>
    </>
  );
};

export default Home;
