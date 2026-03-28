import { FaChartLine, FaCirclePlus, FaUsers, FaGear, FaBell } from "react-icons/fa6";
import DashboardShell from "../../components/dashboard/DashboardShell";
import DashboardStatCard from "../../components/dashboard/DashboardStatCard";
import DashboardSectionCard from "../../components/dashboard/DashboardSectionCard";
import SectionComingSoon from "../../components/common/SectionComingSoon";

const AdminDashboard = () => {
  return (
    <DashboardShell
      title="Admin Dashboard"
      subtitle="Control the entire EWUCSC ecosystem from one place."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <DashboardStatCard 
          title="Total Users" 
          value="--" 
          icon={<FaUsers />} 
          hint="User management system ready" 
        />
        <DashboardStatCard 
          title="Problems Created" 
          value="--" 
          icon={<FaCirclePlus />} 
          hint="CTF engine scalable" 
        />
        <DashboardStatCard 
          title="Analytics" 
          value="--" 
          icon={<FaChartLine />} 
          hint="Future insights dashboard" 
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <DashboardSectionCard 
          title="Admin Control Center" 
          icon={<FaGear className="text-primary" />}
        >
          <SectionComingSoon
            title="Admin Features Coming Soon"
            description="Manage users, assign roles, publish challenges, and monitor system-wide performance."
          />
        </DashboardSectionCard>

        <DashboardSectionCard 
          title="Quick Notes" 
          icon={<FaBell className="text-warning" />}
        >
          <div className="rounded-xl border border-base-300 bg-base-200/50 p-4">
            <p className="text-sm leading-relaxed text-base-content/70">
              This section will later hold moderation alerts, pending approvals, and system notices. 
              Stay tuned for real-time notifications.
            </p>
          </div>
        </DashboardSectionCard>
      </div>
    </DashboardShell>
  );
};

export default AdminDashboard;
