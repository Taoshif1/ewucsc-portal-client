import { FaBarsProgress, FaTrophy, FaClipboardCheck, FaLayerGroup } from "react-icons/fa6";
import DashboardShell from "../../components/dashboard/DashboardShell";
import DashboardStatCard from "../../components/dashboard/DashboardStatCard";
import DashboardSectionCard from "../../components/dashboard/DashboardSectionCard";
import SectionComingSoon from "../../components/common/SectionComingSoon";

const SubExecutiveDashboard = () => {
  return (
    <DashboardShell
      title="Sub Executive Dashboard"
      subtitle="Support reviews, submissions, and smooth challenge operations."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <DashboardStatCard 
          title="Pending Reviews" 
          value="--" 
          icon={<FaClipboardCheck />} 
          hint="Submission workflow ready" 
        />
        <DashboardStatCard 
          title="Challenge Queue" 
          value="--" 
          icon={<FaBarsProgress />} 
          hint="Operational support tools" 
        />
        <DashboardStatCard 
          title="Leaderboard View" 
          value="--" 
          icon={<FaTrophy />} 
          hint="Performance tracking" 
        />
      </div>

      <div className="mt-6">
        <DashboardSectionCard 
          title="Sub Executive Workspace"
          icon={<FaLayerGroup className="text-accent" />}
        >
          <SectionComingSoon
            title="Review System Coming Soon"
            description="Submission review, problem assistance, and event support features will be added here."
          />
        </DashboardSectionCard>
      </div>
    </DashboardShell>
  );
};

export default SubExecutiveDashboard;
