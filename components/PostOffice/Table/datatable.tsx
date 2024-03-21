"use client";
import React from "react";
import { TbMinusVertical } from "react-icons/tb";
import { useState } from "react";
import AddOffice from "./AddOffice/addoffice";
import AddOffice2 from "./AddOffice/addoffice2";
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
import { FormattedMessage } from "react-intl";
import Filter from "@/components/Common/Filters";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import BasicPopover from "@/components/Common/Popover";
import { AgencyOperation, DeletingAgencyCondition } from "@/TDLib/tdlogistics";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  reloadData?: () => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  reloadData,
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

  const [modal2IsOpen, setModal2IsOpen] = useState(false);

  const openModal2 = () => {
    setModal2IsOpen(true);
  };

  const closeModal2 = () => {
    setModal2IsOpen(false);
  };

  const deleteAgency = new AgencyOperation();
  const handleDeleteRowsSelected = async () => {
    table.getFilteredSelectedRowModel().rows.forEach(async (row) => {
      console.log();
      const condition: DeletingAgencyCondition = {
        agency_id: (row.original as any).agency_id,
      };
      const error = await deleteAgency.delete(condition);
      if (error) {
        alert(error.message);
      }
    });
    reloadData();
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
  const paginationButtons = [];
  for (let i = 0; i < table.getPageCount(); i++) {
    paginationButtons.push(
      <Button key={i} onClick={() => table.setPageIndex(i)}>
        {i + 1}
      </Button>
    );
  }

  return (
    <div>
      <div className="flex items-center py-4">
        <div className="w-full flex flex-col sm:flex-row">
          <div className="relative w-full sm:w-1/2 lg:w-1/3 flex">
            <input
              id="postSearch"
              type="text"
              value={
                (table.getColumn("agency_name")?.getFilterValue() as string) ??
                ""
              }
              onChange={(event) =>
                table
                  .getColumn("agency_name")
                  ?.setFilterValue(event.target.value)
              }
              className={`peer h-10 self-center w-full border border-gray-600 rounded focus:outline-none focus:border-blue-500 truncate bg-transparent
                    text-left placeholder-transparent pl-3 pt-2 pr-12 text-sm text-white`}
              placeholder=""
            />
            <label
              htmlFor="postSearch"
              className={`absolute left-3 -top-0 text-xxs leading-5 text-gray-500 transition-all 
                    peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 
                    peer-focus:-top-0.5 peer-focus:leading-5 peer-focus:text-blue-500 peer-focus:text-xxs`}
            >
              <FormattedMessage id="PostOffice.SearchBox" />
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
                className="dark:bg-[#1a1b23] bg-white border border-black dark:border-gray-300 rounded w-24"
                aria-labelledby="dropdownMenuButton"
              >
                {[10, 20, 30, 40, 50].map((pageSize, index) => (
                  <DropdownItem
                    key={pageSize}
                    textValue={`Show ${pageSize} items per page`}
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
              title="Phone Number"
            />
            <Filter
              type="search"
              column={table.getColumn("email")}
              table={table}
              title="Email"
            />
            <Filter
              type="search"
              column={table.getColumn("postal_code")}
              table={table}
              title="Postal Code"
            />
          </BasicPopover>
          <div className="flex-grow h-10 flex mt-4 sm:mt-0 justify-center sm:justify-end">
            <Dropdown className="z-30">
              <DropdownTrigger>
                <button
                  className="text-xs md:text-base border border-gray-600 rounded w-48 text-center"
                  aria-label="Show items per page"
                >
                  Thêm Bưu cục-Đại lý
                </button>
              </DropdownTrigger>
              <DropdownMenu
                className="dark:bg-[#1a1b23] bg-white border border-black dark:border-gray-300 rounded w-48"
                aria-labelledby="dropdownMenuButton"
              >
                <DropdownItem textValue="Add Office">
                  <Button
                    onClick={openModal}
                    variant="bordered"
                    aria-label="Add Office"
                    className="text-center dark:text-white w-full"
                  >
                    Cá nhân
                  </Button>
                </DropdownItem>
                <DropdownItem textValue="Add Office2">
                  <Button
                    onClick={openModal2}
                    variant="bordered"
                    aria-label="Add Office2"
                    className="text-center dark:text-white w-full"
                  >
                    Tập thể
                  </Button>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            {modalIsOpen ? (
              <AddOffice onClose={closeModal} reloadData={reloadData} />
            ) : null}
            {modal2IsOpen ? (
              <AddOffice2 onClose={closeModal2} reloadData={reloadData} />
            ) : null}
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
                  className={`border-gray-900 ${
                    row.getIsSelected() ? "dark:bg-gray-700 bg-slate-300" : ""
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
