import PanelHero from "../components/members/PanelHero";
import PanelGallerySection from "../components/members/PanelGallerySection";
import MembersCTA from "../components/members/MembersCTA";
import { moderatorsData } from "../data/moderatorsData";

const Moderators = () => {
  return (
    <div className="space-y-20 md:space-y-28">
      <PanelHero
        badge="Faculty Advisory Board"
        title="EWUCSC Moderators"
        highlightedText="Moderators"
        description="Meet the faculty moderators guiding EWU Cyber Security Club with academic mentorship, strategic oversight, and institutional support."
      />

      <PanelGallerySection
        members={moderatorsData}
        panelLabel="Faculty Moderators"
      />

      <MembersCTA />
    </div>
  );
};

export default Moderators;