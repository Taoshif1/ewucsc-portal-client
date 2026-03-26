import PanelHero from "../components/members/PanelHero";
import PanelGallerySection from "../components/members/PanelGallerySection";
import MembersCTA from "../components/members/MembersCTA";
import { panel2425Data } from "../data/panel2425Data";

const ExecutivePanel2425 = () => {
  return (
    <div className="space-y-20 md:space-y-28">
      <PanelHero
        badge="Legacy Leadership Archive"
        title="Executive Panel 24–25"
        description="A tribute to the leadership team that contributed to the club’s growth, structure, and cybersecurity culture during the 2024–2025 session."
      />

      <PanelGallerySection members={panel2425Data} />

      <MembersCTA />
    </div>
  );
};

export default ExecutivePanel2425;