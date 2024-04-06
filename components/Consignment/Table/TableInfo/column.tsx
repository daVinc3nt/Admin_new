"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import DetailNoti from "../Detail/detailNoti";
import { Checkbox } from "@/components/TableUI/checkbox";
import { FormattedMessage, useIntl } from "react-intl";
import Consignment from "@/pages/dashboard/consignment";
import {
  MdOutlineRadioButtonChecked,
  MdOutlineRadioButtonUnchecked,
} from "react-icons/md";
const createTime = (time: string) => {
  const moment = require("moment-timezone");
  const standardDatetime = moment(time)
    .tz(moment.tz.guess())
    .format("DD/MM/YYYY HH:mm:ss");
  return standardDatetime;
};
export const columns: ColumnDef<any>[] = [
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
          <FormattedMessage id="Consignment.Row6" />
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="w-full flex justify-center">
          {row.original.status === 0 && "Đã tạo ở bưu cục"}
          {row.original.status === 1 && "Chưa được tổng cục tiếp nhận"}
          {row.original.status === 2 && "Đã được tổng cục phê duyệt"}
          {row.original.status === 3 &&
            "Đã được tiếp nhận bởi nhân viên vận tải"}
          {row.original.status === 4 && "Đang được vận chuyển"}
          {row.original.status === 5 && "Đã tới bưu cục đích"}
          {row.original.status === 6 && "Đã rã lô"}
        </div>
      );
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
            className="bg-transparent hover:bg-white font-bold hover:text-black py-1 px-[0.65rem] border border-gray-600 hover:border-transparent rounded-full "
          >
            +
          </Button>
          {modalIsOpen && (
            <DetailNoti onClose={closeModal} dataInitial={row.original} />
          )}
        </div>
      );
    },
  },
];
