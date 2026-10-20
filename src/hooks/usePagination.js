import { useMemo, useState } from "react";

const PAGE_SIZES = [20, 50, 100];

export const usePagination = (items = [], initialPageSize = 20) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const safeItems = Array.isArray(items) ? items : [];
  const totalItems = safeItems.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.min(page, totalPages);

  const pageItems = useMemo(
    () => safeItems.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [safeItems, currentPage, pageSize],
  );

  const changePageSize = (value) => {
    const nextSize = Number(value);
    if (PAGE_SIZES.includes(nextSize)) setPageSize(nextSize);
    setPage(1);
  };

  const changePage = (value) => {
    const nextPage = Number(value) || 1;
    setPage(Math.min(Math.max(1, nextPage), totalPages));
  };

  return {
    pageItems,
    page: currentPage,
    pageSize,
    totalItems,
    totalPages,
    startIndex: totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1,
    endIndex: Math.min(currentPage * pageSize, totalItems),
    setPage: changePage,
    changePageSize,
    resetPage: () => setPage(1),
  };
};
