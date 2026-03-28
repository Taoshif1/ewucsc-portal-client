import DashboardHeader from "./DashboardHeader";

const DashboardShell = ({ title, subtitle, children }) => {
  return (
    <section className="min-h-screen bg-base-200/40 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <DashboardHeader title={title} subtitle={subtitle} />
        {children}
      </div>
    </section>
  );
};

export default DashboardShell;