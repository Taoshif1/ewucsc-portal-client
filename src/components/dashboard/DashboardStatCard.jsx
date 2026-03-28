const DashboardStatCard = ({
  title,
  value,
  subtitle,
  icon,
  badge = "Live",
}) => {
  return (
    <div className="rounded-3xl border border-base-content/10 bg-base-100/60 backdrop-blur-xl p-6 shadow-xl relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.12),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(34,211,238,0.12),_transparent_35%)]"></div>

      <div className="relative z-10 flex items-start justify-between mb-6">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-2xl">
          {icon}
        </div>

        <span className="badge badge-outline border-primary/30 text-primary">
          {badge}
        </span>
      </div>

      <div className="relative z-10">
        <p className="text-sm text-base-content/60 mb-2">{title}</p>
        <h3 className="text-3xl md:text-4xl font-black mb-2">{value}</h3>
        {subtitle && <p className="text-sm text-base-content/70">{subtitle}</p>}
      </div>
    </div>
  );
};

export default DashboardStatCard;