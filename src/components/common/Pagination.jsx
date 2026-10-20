const Pagination = ({ pagination }) => {
  const {
    page,
    pageSize,
    totalItems,
    totalPages,
    startIndex,
    endIndex,
    setPage,
    changePageSize,
  } = pagination;

  if (totalItems <= 20) return null;

  const firstVisiblePage = Math.max(1, Math.min(page - 2, totalPages - 4));
  const lastVisiblePage = Math.min(totalPages, firstVisiblePage + 4);
  const pages = Array.from(
    { length: lastVisiblePage - firstVisiblePage + 1 },
    (_, index) => firstVisiblePage + index,
  );

  return (
    <nav
      aria-label="List pagination"
      className="mt-5 flex flex-col gap-3 border-t border-white/5 pt-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <p className="text-xs text-base-content/50" aria-live="polite">
        Showing <span className="font-bold text-base-content">{startIndex}–{endIndex}</span> of{" "}
        <span className="font-bold text-base-content">{totalItems}</span>
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <label className="flex items-center gap-2 text-xs text-base-content/50">
          Per page
          <select
            className="select select-bordered select-xs bg-base-100 text-base-content"
            value={pageSize}
            onChange={(event) => changePageSize(event.target.value)}
            aria-label="Items per page"
          >
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </label>

        <div className="join" aria-label="Pagination controls">
          <button
            type="button"
            className="btn btn-sm join-item btn-ghost"
            onClick={() => setPage(1)}
            disabled={page <= 1}
            aria-label="First page"
            title="First page"
          >
            «
          </button>
          <button
            type="button"
            className="btn btn-sm join-item btn-ghost"
            onClick={() => setPage(page - 1)}
            disabled={page <= 1}
            aria-label="Previous page"
            title="Previous page"
          >
            ‹
          </button>
          {pages.map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              className={`btn btn-sm join-item ${pageNumber === page ? "btn-primary" : "btn-ghost"}`}
              onClick={() => setPage(pageNumber)}
              aria-current={pageNumber === page ? "page" : undefined}
              aria-label={`Page ${pageNumber}`}
            >
              {pageNumber}
            </button>
          ))}
          <button
            type="button"
            className="btn btn-sm join-item btn-ghost"
            onClick={() => setPage(page + 1)}
            disabled={page >= totalPages}
            aria-label="Next page"
            title="Next page"
          >
            ›
          </button>
          <button
            type="button"
            className="btn btn-sm join-item btn-ghost"
            onClick={() => setPage(totalPages)}
            disabled={page >= totalPages}
            aria-label="Last page"
            title="Last page"
          >
            »
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Pagination;
