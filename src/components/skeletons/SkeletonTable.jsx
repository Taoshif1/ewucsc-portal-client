const SkeletonTable = ({ rows = 5 }) => {
  return (
    <div className="overflow-x-auto rounded-3xl border border-base-content/10 bg-base-100/60 backdrop-blur-xl p-4 shadow-xl">
      <div className="space-y-4">
        <div className="grid grid-cols-4 gap-4 mb-2">
          <div className="skeleton h-5 w-full"></div>
          <div className="skeleton h-5 w-full"></div>
          <div className="skeleton h-5 w-full"></div>
          <div className="skeleton h-5 w-full"></div>
        </div>

        {Array.from({ length: rows }).map((_, index) => (
          <div key={index} className="grid grid-cols-4 gap-4">
            <div className="skeleton h-10 w-full"></div>
            <div className="skeleton h-10 w-full"></div>
            <div className="skeleton h-10 w-full"></div>
            <div className="skeleton h-10 w-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonTable;