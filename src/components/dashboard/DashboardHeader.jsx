import { useAuth } from "../../hooks/useAuth";

const DashboardHeader = ({ title, subtitle }) => {
  const { user } = useAuth();

  return (
    <div className="mb-8 flex flex-col gap-3 rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm">
      <div>
        <h1 className="text-3xl font-black tracking-tight">{title}</h1>
        <p className="mt-2 text-sm text-base-content/70">{subtitle}</p>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-sm text-base-content/70">
        <span className="badge badge-primary badge-outline px-4 py-3">
          {user?.displayName || "EWUCSC Member"}
        </span>
        <span className="badge badge-secondary badge-outline px-4 py-3">
          {user?.email}
        </span>
      </div>
    </div>
  );
};

export default DashboardHeader;