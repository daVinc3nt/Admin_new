"use client";
import React from "react";
import { TbMinusVertical } from "react-icons/tb";
import { useState } from "react";
import AddBusiness from "./AddBusiness/addBusiness";
import ListApprove from "./ListApprove/listapprove";
import NotiPopup from "@/components/Common/NotiPopup";
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
  DeletingBusinessCondition,
} from "@/TDLib/tdlogistics";
import BasicPopover from "@/components/Common/Popover";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  reloadData?: () => void;
  info?: any;
}
export function DataTable<TData, TValue>({
  columns,
  data,
  reloadData,
  info,
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
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const [modalIsOpen2, setModalIsOpen2] = useState(false);

  const openModal2 = () => {
    setModalIsOpen2(true);
  };

  const closeModal2 = () => {
    setModalIsOpen2(false);
  };
  const [message, setMessage] = useState("");
  const [modalIsOpen3, setModalIsOpen3] = useState(false);

  const openModal3 = () => {
    setModalIsOpen3(true);
  };

  const closeModal3 = () => {
    setModalIsOpen3(false);
  };

  const paginationButtons = [];
  for (let i = 0; i < table.getPageCount(); i++) {
    paginationButtons.push(
      <Button key={i} onClick={() => table.setPageIndex(i)}>
        {i + 1}
      </Button>
    );
  }

  const deletepartner = new BusinessOperation();
  const handleDeleteRowsSelected = async () => {
    if (
      info?.role === "ADMIN" ||
      info?.role === "MANAGER" ||
      info?.role === "TELLER" ||
      info?.role === "AGENCY_MANAGER" ||
      info?.role === "AGENCY_TELLER"
    ) {
      table.getFilteredSelectedRowModel().rows.forEach(async (row) => {
        // console.log();
        const condition: DeletingBusinessCondition = {
          business_id: (row.original as any).business_id,
          agency_id: (row.original as any).agency_id,
        };
        // console.log(condition);
        try {
          const response = await deletepartner.removeBusiness(condition);
          if (response.error) {
            setMessage(response.message);
            openModal3();
          } else {
            setMessage(response.message);
            openModal3();
          }
        } catch (e) {
          setMessage("Lỗi kết nối");
          openModal3();
        }
        reloadData();
      });
    } else {
      setMessage(useIntl().formatMessage({ id: "Business.NoPermission" }));
      openModal3();
    }
  };
  const confirmDelete = () => {
    return window.confirm("Are you sure you want to delete?");
  };
  const deleteRows = () => {
    // Gọi hàm confirmDelete và lưu kết quả vào biến result
    const result = confirmDelete();
    // Nếu result là true, tức là người dùng nhấn yes
    if (result) {
      // Gọi hàm handleDeleteRowsSelected để xóa các hàng đã chọn
      handleDeleteRowsSelected();
    }
    // Nếu result là false, tức là người dùng nhấn no
    else {
      // Không làm gì cả
    }
  };

  return (
    <div>
      <div className="flex items-center py-4">
        <div className="w-full flex flex-col sm:flex-row">
          <div className="relative w-full sm:w-1/2 lg:w-1/3 flex">
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
              <FormattedMessage id="Business.SearchBar" />
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
          <div className="flex-grow h-10 flex mt-4 sm:mt-0 justify-center sm:justify-end">
            {info?.role === "ADMIN" ||
            info?.role === "MANAGER" ||
            info?.role === "TELLER" ? (
              <Button
                className="text-xs md:text-sm border border-gray-600 rounded sm:ml-2 w-full sm:w-44 text-center h-full"
                onClick={openModal2}
              >
                <FormattedMessage id="Business.ApproveList" />
              </Button>
            ) : null}
            {modalIsOpen2 && (
              <ListApprove
                onClose={closeModal2}
                reloadData={reloadData}
                info={info}
              />
            )}
            <Button
              className="text-xs md:text-sm border border-gray-600 rounded sm:ml-2 w-full sm:w-44 text-center h-full"
              onClick={openModal}
            >
              <FormattedMessage id="Business.AddBusiness" />
            </Button>
            {modalIsOpen && (
              <AddBusiness
                onClose={closeModal}
                reloadData={reloadData}
                info={info}
              />
            )}
            {modalIsOpen3 && (
              <NotiPopup onClose={closeModal3} message={message} />
            )}
          </div>
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

      <div className="flex items-center justify-center space-x-2 py-4">
        {info?.role === "ADMIN" ||
        info?.role === "MANAGER" ||
        info?.role === "TELLER" ||
        info?.role === "AGENCY_MANAGER" ||
        info?.role === "AGENCY_TELLER" ? (
          <button
            className={`text-xs md:text-md justify-self-start text-muted-foreground rounded-lg border border-gray-600 px-4 py-2 bg-transparent hover:bg-gray-700 hover:text-white hover:shadow-md focus:outline-none font-normal dark:text-white
          ${
            table.getFilteredSelectedRowModel().rows.length > 0
              ? "border-red-500"
              : "border-gray-600"
          }`}
            onClick={deleteRows}
          >
            <FormattedMessage id="Delete" />{" "}
            {table.getFilteredSelectedRowModel().rows.length}/
            {table.getFilteredRowModel().rows.length}
          </button>
        ) : null}
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
    </div>
  );
}
