import { FaListCheck, FaTrophy, FaUsers, FaChartPie } from "react-icons/fa6";
import DashboardShell from "../../components/dashboard/DashboardShell";
import DashboardStatCard from "../../components/dashboard/DashboardStatCard";
import DashboardSectionCard from "../../components/dashboard/DashboardSectionCard";
import SectionComingSoon from "../../components/common/SectionComingSoon";

const ExecutiveDashboard = () => {
  return (
    <DashboardShell
      title="Executive Dashboard"
      subtitle="Oversee competition quality, performance, and learning momentum."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <DashboardStatCard 
          title="Problems Managed" 
          value="--" 
          icon={<FaListCheck />} 
          hint="Problem pipeline ready" 
        />
        <DashboardStatCard 
          title="Leaderboard Health" 
          value="--" 
          icon={<FaTrophy />} 
          hint="Competition visibility" 
        />
        <DashboardStatCard 
          title="Active Members" 
          value="--" 
          icon={<FaUsers />} 
          hint="Community participation" 
        />
      </div>

      <div className="mt-6">
        <DashboardSectionCard 
          title="Executive Workspace"
          icon={<FaChartPie className="text-secondary" />}
        >
          <SectionComingSoon
            title="Executive Tools Coming Soon"
            description="Manage challenges, review engagement, and track learning & CTF progress."
          />
        </DashboardSectionCard>
      </div>
    </DashboardShell>
  );
};

export default ExecutiveDashboard;
