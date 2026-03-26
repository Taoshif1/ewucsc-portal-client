import MembersHero from "../components/members/MembersHero";
import MembersCTA from "../components/members/MembersCTA";
import MembersSection from "../components/members/MembersSection";
import { membersData } from "../data/membersData";

const Members = () => {
  const president = membersData.filter((member) => member.role === "President");
  const vicePresidents = membersData.filter(
    (member) => member.role === "Vice President"
  );
  const executives = membersData.filter((member) => member.role === "Executive");
  const subExecutives = membersData.filter(
    (member) => member.role === "Sub Executive"
  );

  return (
    <div className="space-y-20 md:space-y-28">
      <MembersHero />

      <MembersSection
        title="President"
        subtitle="The primary strategic leader driving the club’s vision, direction, and long-term cyber culture."
        members={president}
        spotlight
      />

      <MembersSection
        title="Vice Presidents"
        subtitle="The executive support layer helping lead operations, initiatives, and organizational execution."
        members={vicePresidents}
        gridCols="grid-cols-1 md:grid-cols-2"
      />

      <MembersSection
        title="Executives"
        subtitle="The core management team responsible for planning, administration, technical direction, and delivery."
        members={executives}
      />

      <MembersSection
        title="Sub Executives"
        subtitle="The operational force supporting training, events, engagement, content, and technical execution."
        members={subExecutives}
      />

      <MembersCTA />
    </div>
  );
};

export default Members;