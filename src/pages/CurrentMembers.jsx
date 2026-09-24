import PanelHero from "../components/members/PanelHero";
import PanelGallerySection from "../components/members/PanelGallerySection";
import MembersCTA from "../components/members/MembersCTA";
import { panel2526Data } from "../data/panel2526Data";

const CurrentMembers = () => {
  return (
    <div className="space-y-20 md:space-y-28">
      <PanelHero
        badge="Current Leadership"
        title="Executive Panel 25–26"
        description="Meet the current EWUCSC executive leadership team leading club operations, technical activities, events and community growth."
      />

      <PanelGallerySection members={panel2526Data} panelLabel="Current Executive" />

      <MembersCTA />
    </div>
  );
};

export default CurrentMembers;
