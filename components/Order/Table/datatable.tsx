"use client";
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
} from "./table";
import React from "react";
import { TbMinusVertical } from "react-icons/tb";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { FormattedMessage, useIntl } from "react-intl";
import { Input } from "./input";
import AddNoti from "../Add/addNoti";
import AddFile from "../Add/addNoti2";
import BasicPopover from "@/components/Common/Popover";
import Filter from "@/components/Common/Filters";
import { CancelingOrderCondition, OrdersOperation } from "@/TDLib/tdlogistics";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  done: number;
  cancel: number;
  pending: number;
  socket: any;
  reloadData: () => void;
}
const order = new OrdersOperation();
export function DataTable<TData, TValue>({
  columns,
  data,
  done,
  cancel,
  pending,
  socket,
  reloadData
}: DataTableProps<TData, TValue>) {
  const intl = useIntl();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const [modalIsOpen2, setModalIsOpen2] = React.useState(false);

  const openModal2 = () => {
    setModalIsOpen2(true);
  };

  const closeModal2 = () => {
    setModalIsOpen2(false);
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
  const handleDeleteRowsSelected = async () => {
    table.getFilteredSelectedRowModel().rows.forEach(async (row) => {
      const condition: CancelingOrderCondition = {
        order_id: (row.original as any).order_id,
      };
      const error = await order.cancel(condition);
      if (error) {
        alert(error.message);
      }
    });
  };
  const handleChange_statusRowsSelected = async () => {
    table.getFilteredSelectedRowModel().rows.forEach(async (row) => {
      const condition: CancelingOrderCondition = {
        order_id: (row.original as any).order_id,
      };
      const error = await order.update({status_code: 2},condition);
      if (error) {
        alert(error.message);
      }
    });
  };
  const confirmDelete = () => {
    return window.confirm("Are you sure you want to delete?");
  };
  const confirmChange_status = () => {
    return window.confirm("Are you sure you want to delete?");
  };

  const change_status_to_inprogress = () => {
    // Gọi hàm confirmChange_status và lưu kết quả vào biến result
    const result = confirmChange_status();
    // Nếu result là true, tức là người dùng nhấn yes
    if (result) {
      // Gọi hàm handleDeleteRowsSelected để xóa các hàng đã chọn
      handleChange_statusRowsSelected();
      reloadData()
    }
    // Nếu result là false, tức là người dùng nhấn no
    else {
      // Không làm gì cả
    }
  };
  const deleteRows = () => {
    // Gọi hàm confirmDelete và lưu kết quả vào biến result
    const result = confirmDelete();
    // Nếu result là true, tức là người dùng nhấn yes
    if (result) {
      // Gọi hàm handleDeleteRowsSelected để xóa các hàng đã chọn
      handleDeleteRowsSelected();
      reloadData();
    }
    // Nếu result là false, tức là người dùng nhấn no
    else {
      // Không làm gì cả
    }
  };

  return (
    <div>
      <div className="mt-10 uppercase sticky flex items-center justify-center font-extrabold gap-32 text-3xl">
        <div>
          <div className="text-lg">
            {<FormattedMessage id="order.status.done" />}
          </div>
          <div className="text-green-600 text-center">{done}</div>
        </div>
        <div>
          <div className="text-lg">
            {<FormattedMessage id="order.status.ongoing" />}
          </div>
          <div className="text-yellow-600 text-center">{pending}</div>
        </div>
        <div>
          <div className="text-lg">
            {<FormattedMessage id="order.status.cancel" />}
          </div>
          <div className="text-red-600 text-center">{cancel}</div>
        </div>
      </div>
      <div className="flex items-center py-4 px-4">
        <div className="w-full flex">
          <div className="relative w-full sm:w-1/2 lg:w-1/3">
            <input
              id="consSearch"
              type="text"
              value={
                (table.getColumn("order_id")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("order_id")?.setFilterValue(event.target.value)
              }
              className={`peer h-10 self-center w-full border border-gray-600 rounded focus:outline-none focus:border-blue-500 truncate bg-transparent
                    text-left placeholder-transparent pl-3 pt-2 pr-12 text-sm text-white`}
              placeholder=""
            />
            <label
              htmlFor="consSearch"
              className={`absolute left-3 -top-0 text-xxs leading-5 text-gray-500 transition-all 
                    peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 
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
              className="bg-[#1a1b23] border border-gray-300 rounded w-24"
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
                    className="text-center  text-white w-full"
                  >
                    Show {pageSize}
                  </Button>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <BasicPopover icon={<FilterAltIcon />}>
            <Filter
              type="range"
              column={table.getColumn("service_type")}
              table={table}
              title="Mass"
            />
            <Filter
              type="search"
              column={table.getColumn("pickupLocation")}
              table={table}
              title="Origin"
            />
            <Filter
              type="selection"
              options={{ Done: 3, OnGoing: 1, PickingUp: 2, Cancelled: 4 }}
              column={table.getColumn("status_code")}
              table={table}
              title="Status"
            />
          </BasicPopover>
        </div>
        <Dropdown className="z-30">
          <DropdownTrigger>
            <Button
              className="text-xs md:text-base border border-gray-600 rounded ml-2 w-36 h-10 text-center"
              aria-label="Show items per page"
            >
              Thêm đơn hàng
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            className="dark:bg-[#1a1b23] bg-white border border-gray-300 rounded w-26"
            aria-labelledby="dropdownMenuButton"
          >
            <DropdownItem>
              <Button
                className="text-center  dark:text-white w-36"
                onClick={openModal}
              >
                Thêm đơn lẻ
              </Button>
            </DropdownItem>
            <DropdownItem>
              <Button
                className="text-center  dark:text-white w-36"
                onClick={openModal2}
              >
                Thêm hàng loạt
              </Button>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      {modalIsOpen && <AddNoti onClose={closeModal}    socket={socket}/>}
      {modalIsOpen2 && <AddFile onClose={closeModal2} />}
      <div className="rounded-md border border-gray-700">
        <table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-gray-700">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : (
                        <>
                          <div>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </div>
                        </>
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
                    row.getIsSelected() ? "bg-gray-300 dark:bg-gray-700" : ""
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
        </table>
      </div>
      <div className="flex items-center justify-center space-x-2 py-4">
        <Button
          className={`text-xs md:text-sm justify-self-start rounded-lg border
           border-gray-600 px-4 py-2 bg-transparent hover:bg-gray-700 
           hover:text-white hover:shadow-md focus:outline-none font-normal text-black dark:text-white
          ${
            table.getFilteredSelectedRowModel().rows.length > 0
              ? "border-green-500"
              : "border-gray-600"
          }`}
          onClick={change_status_to_inprogress}
        >
          <FormattedMessage id="processing" />{" "}
          {table.getFilteredSelectedRowModel().rows.length}/
          {table.getFilteredRowModel().rows.length}
        </Button>
        <Button
          className={`text-xs md:text-sm justify-self-start rounded-lg border
           border-gray-600 px-4 py-2 bg-transparent hover:bg-gray-700 
           hover:text-white hover:shadow-md focus:outline-none font-normal text-black dark:text-white
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
        </Button>
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
          <span>{<FormattedMessage id="prev" />}</span>
        </Button>
        <span className="flex items-center gap-1">
          <div className="text-xs md:text-base">
            {<FormattedMessage id="page" />}
          </div>
          <strong className="text-xs md:text-base whitespace-nowrap">
            {table.getState().pagination.pageIndex + 1}{" "}
            <FormattedMessage id="of" /> {table.getPageCount()}
          </strong>
        </span>
        <TbMinusVertical className="text-xl text-gray-700" />
        <span className="flex items-center gap-1 text-xs md:text-base whitespace-nowrap">
          {<FormattedMessage id="gotopage" />}
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
          hover:shadow-md md:text-base focus:outline-none font-normal
          text-black dark:text-white rounded-md text-sm text-center me-2"
        >
          <span>{<FormattedMessage id="next" />}</span>
        </Button>
      </div>
    </div>
  );
}
