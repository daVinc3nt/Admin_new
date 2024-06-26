"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import DetailNoti from "../Detail/detailNoti";
import { Checkbox } from "@/components/TableUI/checkbox";
import { FormattedMessage, useIntl } from "react-intl";
import Consignment from "@/pages/dashboard/consignment";
import { approve } from "../../approved";
import {
  MdOutlineRadioButtonChecked,
  MdOutlineRadioButtonUnchecked,
} from "react-icons/md";
import { ShipmentsOperation, ShipmentID } from "@/TDLib/tdlogistics";
import TaskMenu from "@/components/Task/TaskMenu";
const createTime = (time: string) => {
  const moment = require("moment-timezone");
  const standardDatetime = moment(time)
    .tz(moment.tz.guess())
    .format("DD/MM/YYYY HH:mm:ss");
  return standardDatetime;
};

type MyColumnDef<T> = ColumnDef<T> & {
  reloadData?: () => void;
  info?: any;
};
export async function createColumns(
  reloadData: () => void,
  info: any
): Promise<MyColumnDef<any>[]> {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() ? "indeterminate" : false)
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="border border-black dark:border-white"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="border border-black dark:border-white"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "number",
      header: ({ column }) => {
        return (
          <Button
            className="rounded"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <FormattedMessage id="Consignment.Row1" />
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const index = row.index + 1;
        return <>{index}</>;
      },
    },
    {
      accessorKey: "shipment_id",
      header: ({ column }) => {
        return (
          <Button
            className="rounded"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <FormattedMessage id="Consignment.Row2" />
            <ArrowUpDown className="ml-2 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "transport_partner_id",

      header: ({ column }) => {
        return (
          <Button
            className="rounded"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <FormattedMessage id="Consignment.Row4" />
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "mass",

      header: ({ column }) => {
        return (
          <Button
            className="rounded"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <FormattedMessage id="Consignment.Row5" />
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "created_at",

      header: ({ column }) => {
        return (
          <Button
            className="rounded flex justify-center w-full"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <FormattedMessage id="Schedule.Info6" />
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex justify-center">
            {createTime(row.original.created_at)}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            className="rounded w-full flex justify-center"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Trạng thái
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="w-full flex justify-center">
            <div className="text-yellow-500">
              {row.original.status === 0 && "Chưa xác nhận"}
            </div>
            <div className="text-red-500">
              {row.original.status === 1 && "Chưa tiếp nhận"}
            </div>
            <div className="text-blue-500">
              {row.original.status === 2 && "Đã phê duyệt"}
            </div>
            <div className="text-orange-500">
              {row.original.status === 3 && "Đã tiếp nhận"}
            </div>
            <div className="text-stone-500">
              {row.original.status === 4 && "Đang vận chuyển"}
            </div>
            <div className="text-green-500">
              {row.original.status === 5 && "Đã tới bưu cục đích"}
            </div>
            <div className="text-neutral-500">
              {row.original.status === 6 && "Đã rã lô"}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "confirm",
      header: ({ column }) => {
        if (
          info?.role === "ADMIN" ||
          info?.role === "MANAGER" ||
          info?.role === "TELLER"
        ) {
          return (
            <Button
              className="rounded w-full flex justify-center"
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Phê duyệt
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        }
      },
      cell: ({ row }) => {
        return approve(row, info, reloadData);
      },
    },
    {
      accessorKey: "Chi tiết/Sửa đổi",
      header: () => {
        return (
          <div className="text-right whitespace-nowrap w-full flex justify-center">
            <FormattedMessage id="Consignment.Row7" />
          </div>
        );
      },
      cell: ({ row }) => {
        const [modalIsOpen, setModalIsOpen] = useState(false);
        const openModal = () => {
          setModalIsOpen(true);
        };

        const closeModal = () => {
          setModalIsOpen(false);
        };

        return (
          <div className="relative mr-2 w-full flex justify-center">
            <Button
              onClick={openModal}
              className="bg-transparent hover:bg-white font-bold hover:text-black py-1 px-2 border border-gray-600 hover:border-transparent rounded-full text-center"
            >
              ...
            </Button>
            {modalIsOpen && (
              <DetailNoti onClose={closeModal} dataInitial={row.original} />
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "Add",
      header: () => {
        return (
          <div className="text-right whitespace-nowrap w-full flex justify-center">
            Thêm vào phương tiện
          </div>
        );
      },
      cell: ({ row }) => {
        const [modalIsOpen, setModalIsOpen] = useState(false);
        const [shipment_id, setShipment_id] = useState<string[]>([]);
        const openModal = () => {
          shipment_id.push(row.original.shipment_id);
          setModalIsOpen(true);
        };

        const closeModal = () => {
          setModalIsOpen(false);
        };
        return (
          <div className="relative mr-2 w-full flex justify-center">
            <Button
              onClick={openModal}
              className="bg-transparent hover:bg-white font-bold hover:text-black py-1 px-[0.65rem] border border-gray-600 hover:border-transparent rounded-full "
            >
              +
            </Button>
            {modalIsOpen && (
              <TaskMenu onClose={closeModal} DataInitial={shipment_id} />
            )}
          </div>
        );
      },
    },
  ];
}
