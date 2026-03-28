import PageHero from "../PageHero";

const DashboardShell = ({
  title,
  subtitle,
  badge = "Dashboard",
  children,
}) => {
  return (
    <div className="space-y-10">
      <PageHero
        badge={badge}
        title={title}
        subtitle={subtitle}
      />

      <div className="space-y-8">{children}</div>
    </div>
  );
};

export default DashboardShell;