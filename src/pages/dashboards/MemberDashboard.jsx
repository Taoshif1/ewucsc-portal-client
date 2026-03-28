import { FaCode, FaTrophy, FaUser } from "react-icons/fa6";
import DashboardShell from "../../components/dashboard/DashboardShell";
import DashboardStatCard from "../../components/dashboard/DashboardStatCard";
import DashboardSectionCard from "../../components/dashboard/DashboardSectionCard";
import SectionComingSoon from "../../components/common/SectionComingSoon";

const MemberDashboard = () => {
  return (
    <DashboardShell
      title="Member Dashboard"
      subtitle="Your learning, CTF, and competitive growth hub."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <DashboardStatCard title="Solved Problems" value="0" icon={<FaCode />} hint="Track your consistency" />
        <DashboardStatCard title="CTF Score" value="0" icon={<FaTrophy />} hint="Competitive growth starts here" />
        <DashboardStatCard title="Profile Status" value="Active" icon={<FaUser />} hint="Account synced successfully" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <DashboardSectionCard title="My Journey">
          <SectionComingSoon
            title="Your Progress Hub Coming Soon"
            description="Your score, problem-solving stats, and learning roadmap will appear here."
          />
        </DashboardSectionCard>

        <DashboardSectionCard title="Member Notes">
          <p className="text-base-content/70">
            This area can later show homework deadlines, CTF reminders, and leaderboard snapshots.
          </p>
        </DashboardSectionCard>
      </div>
    </DashboardShell>
  );
};

export default MemberDashboard;