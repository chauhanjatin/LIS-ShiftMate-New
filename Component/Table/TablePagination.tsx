"use client";

import { useState } from "react";
import { cn } from "@/_helper/cn";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/Component/Icons/SystemIcons";
import TableSelect from "@/Component/Table/TableSelect";

type TablePaginationProps = Readonly<{
  className?: string;
  dark?: boolean;
  totalItems?: number;
}>;

export default function TablePagination({
  className,
  dark = false,
  totalItems = 12,
}: TablePaginationProps) {
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const startItem = (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, totalItems);

  function updatePageSize(nextValue: string) {
    const nextSize = Number(nextValue);

    setPageSize(nextSize);
    setPage(1);
  }

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-end gap-6 px-6 py-4",
        dark ? "bg-neutral-900 text-white" : "bg-white text-neutral-900",
        className,
      )}
    >
      <span className={cn("text-base font-medium", dark ? "text-white" : "text-neutral-800")}>
        Rows per page:
      </span>
      <div className="w-[4.5rem]">
        <TableSelect
          dark={dark}
          options={["5", "10", "15"]}
          value={String(pageSize)}
          onValueChange={updatePageSize}
        />
      </div>
      <span className={cn("text-base font-medium", dark ? "text-white" : "text-neutral-900")}>
        {startItem}-{endItem} of {totalItems}
      </span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          className={dark ? "text-white disabled:text-neutral-600" : "text-neutral-400 disabled:text-neutral-200"}
          disabled={page === 1}
          onClick={() => setPage((currentPage) => Math.max(1, currentPage - 1))}
        >
          <ChevronLeftIcon />
        </button>
        <button
          type="button"
          className={dark ? "text-white disabled:text-neutral-600" : "text-neutral-400 disabled:text-neutral-200"}
          disabled={page === totalPages}
          onClick={() =>
            setPage((currentPage) => Math.min(totalPages, currentPage + 1))
          }
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
}
