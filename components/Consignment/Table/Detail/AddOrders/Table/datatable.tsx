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
import BasicPopover from "@/components/Common/Popover";
import Filter from "@/components/Common/Filters";
import FilterAltIcon from '@mui/icons-material/FilterAlt';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  selectedOrders: TData[];
  setSelectedOrders
}

export function DataTable<TData, TValue>({
  columns,
  data,
  selectedOrders,
  setSelectedOrders,
}: DataTableProps<TData, TValue>) {
  const intl = useIntl();
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const options = {
    [intl.formatMessage({ id: 'Consignment.Status.DeliveredSuccess' })]: 1,
    [intl.formatMessage({ id: 'Consignment.Status.Processing' })]: 2,
    [intl.formatMessage({ id: 'Consignment.Status.Taking' })]: 3,
    [intl.formatMessage({ id: 'Consignment.Status.TakenSuccess' })]: 4,
    [intl.formatMessage({ id: 'Consignment.Status.TakenFail' })]: 5,
    [intl.formatMessage({ id: 'Consignment.Status.Delivering' })]: 6,
    [intl.formatMessage({ id: 'Consignment.Status.DeliveredCancel' })]: 7,
    [intl.formatMessage({ id: 'Consignment.Status.DeliveredFail' })]: 8,
    [intl.formatMessage({ id: 'Consignment.Status.Refunding' })]: 9,
    [intl.formatMessage({ id: 'Consignment.Status.RefundedSuccess' })]: 10,
    [intl.formatMessage({ id: 'Consignment.Status.RefundedFail' })]: 11,
    [intl.formatMessage({ id: 'Consignment.Status.EnterAgency' })]: 12,
    [intl.formatMessage({ id: 'Consignment.Status.LeaveAgency' })]: 13,
    [intl.formatMessage({ id: 'Consignment.Status.ThirdPartyDelivery' })]: 14
  };

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
    setSelectedOrders(table.getFilteredSelectedRowModel().flatRows.map(row => row.original));
  }, [table.getFilteredSelectedRowModel()]);

  return (
    <div>
      <div className="flex items-center py-4">
        <div className="w-full flex">
          <div className="relative w-full sm:w-1/2 lg:w-1/3">
            <input
              id="order_id"
              type="text"
              value={(table.getColumn("order_id")?.getFilterValue() as string) ?? ""}
              onChange={(event) => table.getColumn("order_id")?.setFilterValue(event.target.value)}
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
              {<FormattedMessage id="order.searchbyid" />}
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
          <BasicPopover icon={<FilterAltIcon />}>
            <Filter type="range" column={table.getColumn("mass")} table={table} title="Mass" />
            <Filter type="search" column={table.getColumn("province_source")} table={table} title="Origin" />
            <Filter type="selection" options={options} column={table.getColumn("status_code")} table={table} title="Status" />
          </BasicPopover>
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
