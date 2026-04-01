"use client";

import { rankItem } from "@tanstack/match-sorter-utils";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  getSortedRowModel,
  SortingState,
  Header,
  SortDirection,
  PaginationState,
  getPaginationRowModel,
  FilterFn,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useState } from "react";

export interface TableRow {
  rank: number;
  name: string;
  marketCap: number;
  price: number;
  dayChange: number;
  weekChange: number;
}

export default function AssetTable({ data }: { data: TableRow[] }) {
  const columns = [
    { accessorKey: "rank", header: "Rank" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "marketCap", header: "Market Cap" },
    { accessorKey: "price", header: "Price" },
    { accessorKey: "dayChange", header: "24h" },
    { accessorKey: "weekChange", header: "7d" },
  ];

  const [sorting, setSorting] = useState<SortingState>([
    { id: "marketCap", desc: true },
  ]);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 100,
  });

  const [globalFilter, setGlobalFilter] = useState("");

  const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value);

    // Store the ranking info so we can use it for sorting later if needed
    addMeta({
      itemRank,
    });

    // Return if the item passed the ranking criteria
    return itemRank.passed;
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
      sorting,
      globalFilter,
    },
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    globalFilterFn: fuzzyFilter,
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  function getSortIcon(header: Header<TableRow, any>) {
    const sortDirection = header.column.getIsSorted();
    return sortDirection === false
      ? null
      : {
          asc: " 🔼",
          desc: " 🔽",
        }[sortDirection];
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: "0.5em",
        padding: "1em",
      }}
    >
      <input
        value={globalFilter ?? ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Find Assets"
        className="p-2 border mb-2"
        style={{ alignSelf: "end", borderRadius: "1em" }}
      />
      <table className="mt-0 mb-3 border">
        <thead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : "",
                        onClick: header.column.getToggleSortingHandler(), // Toggles sorting
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {getSortIcon(header)}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center gap-2">
        <button
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>

        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>

        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
