const DashboardSectionCard = ({ title, subtitle, children, action }) => {
  return (
    <div className="rounded-3xl border border-base-content/10 bg-base-100/60 backdrop-blur-xl p-6 md:p-8 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          {subtitle && (
            <p className="text-sm text-base-content/70 mt-1">{subtitle}</p>
          )}
        </div>

        {action && <div>{action}</div>}
      </div>

      {children}
    </div>
  );
};

export default DashboardSectionCard;