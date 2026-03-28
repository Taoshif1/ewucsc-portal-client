const DashboardSectionCard = ({ title, children }) => {
  return (
    <div className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">
      <h3 className="mb-4 text-xl font-bold">{title}</h3>
      {children}
    </div>
  );
};

export default DashboardSectionCard;