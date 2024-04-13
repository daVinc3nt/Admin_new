"use client";
import React from "react";
import { useState } from "react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/TableUI/table";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { FormattedMessage, useIntl } from "react-intl";
import Filter from "@/components/Common/Filters";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
  BusinessOperation,
  StaffsOperation,
  DeletingBusinessCondition,
  ApprovingBusinessInfo,
  UpdatingBusinessCondition,
} from "@/TDLib/tdlogistics";
import { Modal } from "@nextui-org/react";
import BasicPopover from "@/components/Common/Popover";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  reloadData?: () => void;
  role?: string;
}
interface DeletingTransportPartnerCondition {
  transport_partner_id: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  reloadData,
  role,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,

      columnVisibility,
      rowSelection,
    },
  });

  const paginationButtons = [];
  try {
    for (let i = 0; i < table.getPageCount(); i++) {
      paginationButtons.push(
        <Button key={i} onClick={() => table.setPageIndex(i)}>
          {i + 1}
        </Button>
      );
    }
  } catch (e) {}

  const approveBus = new BusinessOperation();
  const handleApprovedselected = async (agency_id: string) => {
    table.getFilteredSelectedRowModel().rows.forEach(async (row) => {
      try {
        const ApprovingInfo: ApprovingBusinessInfo = {
          agency_id: (row.original as { agency_id: string }).agency_id,
        };
        const UpdateCondition: UpdatingBusinessCondition = {
          business_id: (row.original as { business_id: string }).business_id,
        };

        const response = await approveBus.approve(
          ApprovingInfo,
          UpdateCondition
        );
        if (response.error.error) {
          alert(response.error.message);
          return;
        }
        alert("Phê duyệt thành công");
        reloadData();
      } catch (e) {
        // console.log(e);
      }
    });
  };
  const confirm = () => {
    return window.confirm("Are you sure you want to approve?");
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [agencyId, setAgencyId] = useState("");

  const handleAgencyIdChange = (e) => {
    setAgencyId(e.target.value);
  };

  const handleModalSubmit = () => {
    setIsModalOpen(false);
    handleApprovedselected(agencyId);
  };

  const ApproveRows = () => {
    const result = confirm();
    // console.log(result);
    if (result) {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="flex flex-col place-content-between h-full">
      <div className="flex items-center py-4 top-0">
        <div className="w-full flex flex-col sm:flex-row">
          <div className="relative w-full  flex">
            <input
              id="postSearch"
              type="text"
              value={
                (table
                  .getColumn("business_name")
                  ?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table
                  .getColumn("business_name")
                  ?.setFilterValue(event.target.value)
              }
              className={`peer h-10 self-center w-full border border-gray-600 rounded focus:outline-none focus:border-blue-500 truncate bg-transparent
                    text-left placeholder-transparent pl-3 pt-2 pr-12 text-sm dark:text-white`}
              placeholder=""
            />
            <label
              htmlFor="postSearch"
              className={`absolute left-3 -top-0 text-xxs leading-5 text-gray-500 transition-all 
                    peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 
                    peer-focus:-top-0.5 peer-focus:leading-5 peer-focus:text-blue-500 peer-focus:text-xxs`}
            >
              Tìm kiếm theo tên doanh nghiệp
            </label>
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
                className="dark:bg-[#1a1b23] bg-white border dark:border-gray-300 border-black rounded w-24 text-black dark:text-white"
                aria-labelledby="dropdownMenuButton"
              >
                {[10, 20, 30, 40, 50].map((pageSize, index) => (
                  <DropdownItem
                    key={pageSize}
                    textValue={`Show ${pageSize} items per page`}
                    className="text-black"
                  >
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
          <BasicPopover icon={<FilterAltIcon />}>
            <Filter
              type="search"
              column={table.getColumn("phone_number")}
              table={table}
              title={useIntl().formatMessage({ id: "Phone" })}
            />
            <Filter
              type="search"
              column={table.getColumn("email")}
              table={table}
              title="Email"
            />
          </BasicPopover>
        </div>
      </div>
      <div className="rounded-md border border-gray-700">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-gray-700">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className={`border-gray-700 ${
                    row.getIsSelected() ? "dark:bg-gray-700 bg-slate-300 " : ""
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-center space-x-2 mt-5">
        <button
          className={`text-xs md:text-md justify-self-start text-muted-foreground rounded-lg border border-gray-600 px-4 py-2 bg-transparent hover:bg-gray-700 hover:text-white hover:shadow-md focus:outline-none font-normal dark:text-white
          ${
            table.getFilteredSelectedRowModel().rows.length > 0
              ? "border-green-500"
              : "border-gray-600"
          }`}
          onClick={ApproveRows}
        >
          Phê duyệt {table.getFilteredSelectedRowModel().rows.length}/
          {table.getFilteredRowModel().rows.length}
        </button>
        <Button
          variant="light"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-2 py-[0.15rem] mb-0.5 w-12 sm:w-16 bg-transparent 
          drop-shadow-md hover:drop-shadow-xl hover:bg-opacity-30 hover:text-white border border-black dark:border-white hover:bg-black
          hover:shadow-md md:text-base focus:outline-none font-normal
          text-black dark:text-white rounded-md text-sm text-center me-2"
        >
          <span>
            <FormattedMessage id="prev" />
          </span>
        </Button>
        <span className="flex items-center gap-1">
          <div className="text-xs md:text-base">
            <FormattedMessage id="page" />
          </div>
          <strong className="text-xs md:text-base whitespace-nowrap">
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <TbMinusVertical className="text-xl text-gray-700" />
        <span className="flex items-center gap-1 text-xs md:text-base whitespace-nowrap">
          <FormattedMessage id="gotopage" />
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
        <Button
          variant="light"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-2 py-[0.15rem] mb-0.5 w-12 sm:w-16 bg-transparent 
          drop-shadow-md hover:drop-shadow-xl hover:bg-opacity-30 hover:text-white border border-black dark:border-white hover:bg-black
          hover:shadow-md md:text-base focus:outline-none font-normal text-black
          dark:text-white rounded-md text-sm text-center me-2"
        >
          <span>
            <FormattedMessage id="next" />
          </span>
        </Button>
      </div>
      {isModalOpen && (
        <div className="h-20 py-7">
          <h1 className="text-center text-xl font-bold">Nhập mã đại lý</h1>
          <div className="flex h-10 mt-3 mb-3">
            <input
              type="text"
              id="agencyId"
              value={agencyId}
              placeholder="Vui lòng nhập mã đại lý"
              onChange={handleAgencyIdChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <button
              className="  text-xs bg-blue-500 ml-5 hover:bg-blue-700 text-white font-bold px-5 rounded-full"
              onClick={handleModalSubmit}
            >
              Xác nhận
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
