"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

interface PaginationProps {
  totalPages: number;
  //   onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");

  const handlePageChange = useCallback(
    (page: number) => {
      // Clone the current search parameters and update the "page" parameter
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());

      // Update the URL with the new page parameter, preserving other parameters
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        className={`px-3 py-1 rounded ${
          currentPage === 1
            ? "bg-gray-300"
            : "bg-blue-500 text-white disabled:bg-blue-200 disabled:cursor-not-allowed"
        }`}
        disabled={currentPage === 1}
      >
        <FiChevronsLeft />
      </button>

      {/* Show first page, dots if needed, and last page */}
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 rounded ${
              page === currentPage
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className={`px-3 py-1 rounded ${
          currentPage === totalPages
            ? "bg-gray-300"
            : "bg-blue-500 text-white disabled:bg-blue-200 disabled:cursor-not-allowed"
        }`}
        disabled={currentPage === totalPages}
      >
        <FiChevronsRight />
      </button>
    </div>
  );
};

export default Pagination;
