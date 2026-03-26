import PanelHero from "../components/members/PanelHero";
import PanelGallerySection from "../components/members/PanelGallerySection";
import MembersCTA from "../components/members/MembersCTA";
import { panel2526Data } from "../data/panel2526Data";

const ExecutivePanel2526 = () => {
  return (
    <div className="space-y-20 md:space-y-28">
      <PanelHero
        badge="Legacy Leadership Archive"
        title="Executive Panel 25–26"
        description="Recognizing the executive leadership team of the 2025–2026 session for their role in building momentum, engagement, and technical excellence."
      />

      <PanelGallerySection members={panel2526Data} />

      <MembersCTA />
    </div>
  );
};

export default ExecutivePanel2526;