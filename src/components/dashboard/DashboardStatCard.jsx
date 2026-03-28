const DashboardStatCard = ({ title, value, icon, hint }) => {
  return (
    <div className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-base-content/70">{title}</h3>
        <span className="text-2xl text-primary">{icon}</span>
      </div>

      <h2 className="text-3xl font-black">{value}</h2>

      {hint && <p className="mt-2 text-sm text-base-content/60">{hint}</p>}
    </div>
  );
};

export default DashboardStatCard;