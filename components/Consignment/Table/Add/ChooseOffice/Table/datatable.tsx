import React, { useEffect } from "react";
import { TbMinusVertical } from "react-icons/tb";
import {
  ColumnDef,
  SortingState,
  flexRender,
  ColumnFiltersState,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  VisibilityState,
} from "@tanstack/react-table";
import { Input } from "./input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { FormattedMessage, useIntl } from "react-intl";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  setAgencyID
}

export function DataTable<TData, TValue>({
  columns,
  data,
  setAgencyID,
}: DataTableProps<TData, TValue>) {
  const intl = useIntl();
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    enableMultiRowSelection: false,
  });

  const paginationButtons = [];
  for (let i = 0; i < table.getPageCount(); i++) {
    paginationButtons.push(
      <Button key={i} onClick={() => table.setPageIndex(i)}>
        {i + 1}
      </Button>
    );
  }

  useEffect(() => {
    const selectedRow = table.getFilteredSelectedRowModel().flatRows[0];
    if (selectedRow) {
      setAgencyID(selectedRow.original.agency_id);
    }
  }, [rowSelection]);

  return (
    <div>
      <div className="flex items-center py-4">
        <div className="w-full flex">
          <div className="relative w-full sm:w-1/2 lg:w-1/3">
            <input
              id="order_id"
              type="text"
              value={(table.getColumn("agency_name")?.getFilterValue() as string) ?? ""}
              onChange={(event) => table.getColumn("agency_name")?.setFilterValue(event.target.value)}
              className={`peer h-10 self-center w-full border border-gray-600 rounded focus:outline-none focus:border-blue-500 truncate bg-transparent
              text-left placeholder-transparent pl-3 pt-2 pr-12 text-sm dark:text-white`}
              placeholder=""
            />
            <label
              htmlFor="order_id"
              className={`absolute left-3 -top-0 text-xxs leading-5 text-gray-500 transition-all peer-placeholder-shown:hidden peer-placeholder-shown:sm:block
                peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 peer-focus:block
                peer-focus:-top-0.5 peer-focus:leading-5 peer-focus:text-blue-500 peer-focus:text-xxs`}
            >
              Tìm kiếm theo tên bưu cục
            </label>
          </div>
          <Dropdown className="z-30">
            <DropdownTrigger>
              <Button
                className="text-xs md:text-base border border-gray-600 rounded ml-2 w-24 text-center"
                aria-label="Show items per page"
              >
                Show {table.getState().pagination.pageSize}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              className="bg-white dark:bg-[#1a1b23] border border-gray-300 rounded w-24"
              aria-labelledby="dropdownMenuButton"
            >
              {[10, 20, 30, 40, 50].map((pageSize, index) => (
                <DropdownItem key={pageSize} textValue={`Show ${pageSize} items per page`}>
                  <Button
                    onClick={() => table.setPageSize(pageSize)}
                    variant="bordered"
                    aria-label={`Show ${pageSize}`}
                    className="text-center  dark:text-white w-full"
                  >
                    Show {pageSize}
                  </Button>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className="rounded-md border border-gray-700">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-gray-700">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className={`border-gray-700 ${row.getIsSelected() ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-2 justify-between py-2 sm:py-4">
        <div className="flex place-items-center">
          <span className="flex items-center gap-1">
            <div className="text-xs md:text-base">
              <FormattedMessage id="page" />
            </div>
            <strong className="text-xs md:text-base whitespace-nowrap">
              {table.getState().pagination.pageIndex + 1}{" "}
              <FormattedMessage id="of" /> {table.getPageCount()}
            </strong>
          </span>

          <TbMinusVertical className="text-xl text-gray-700" />

          <span className="flex items-center gap-1 text-xs md:text-base whitespace-nowrap">
            <FormattedMessage id="gotopage" />:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="border border-gray-500 px-1 py-0.5 rounded w-8 sm:w-16 bg-transparent"
            />
          </span>
        </div>

        <div className="flex gap-2">
          <Button
            variant="light"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-2 py-[0.15rem] mb-0.5 w-16 bg-transparent dark:border-white dark:text-white
    drop-shadow-md hover:drop-shadow-xl hover:bg-opacity-20 hover:text-white border border-black hover:bg-black
    hover:shadow-md md:text-base focus:outline-none font-normal hover:border-white
    text-black rounded-md text-sm text-center me-2"
          >
            <span>
              <FormattedMessage id="prev" />
            </span>
          </Button>
          <Button
            variant="light"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-2 py-[0.15rem] mb-0.5 w-16 bg-transparent dark:border-white dark:text-white
    drop-shadow-md hover:drop-shadow-xl hover:bg-opacity-20 hover:text-white border border-black hover:bg-black
    hover:shadow-md md:text-base focus:outline-none font-normal hover:border-white
    text-black rounded-md text-sm text-center me-2"
          >
            <span>
              <FormattedMessage id="next" />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}