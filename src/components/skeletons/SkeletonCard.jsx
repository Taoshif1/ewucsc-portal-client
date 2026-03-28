const SkeletonCard = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="rounded-3xl border border-base-content/10 bg-base-100/60 backdrop-blur-xl p-6 shadow-xl"
        >
          <div className="skeleton h-6 w-32 mb-4"></div>
          <div className="skeleton h-10 w-3/4 mb-4"></div>
          <div className="skeleton h-4 w-full mb-2"></div>
          <div className="skeleton h-4 w-5/6 mb-2"></div>
          <div className="skeleton h-4 w-2/3 mb-6"></div>
          <div className="skeleton h-10 w-28 rounded-full"></div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonCard;