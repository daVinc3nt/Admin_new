"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import DetailNoti from "./detailNoti";
import { Checkbox } from "@/components/TableUI/checkbox";
import { FormattedMessage, useIntl } from "react-intl";
export type Order = {
  // Địa chỉ nguồn
  service_type: number
  detail_source: string;
  district_source: string;
  province_source: string;
  ward_source: string;
  lat_source: number;
  long_source: number;
  
  // Địa chỉ đích
  detail_dest: string;
  district_dest: string;
  province_dest: string;
  ward_dest: string;
  lat_destination: number;
  long_destination: number;
  
  // Thông tin gói hàng
  order_id: string;
  order_time: string;
  container: string;
  name_sender: string;
  phone_number_sender: string;
  name_receiver: string;
  phone_number_receiver: string;
  mass: number;
  length: number;
  width: number;
  height: number;
  fee: number;
  
  // Các thông tin khác
  COD: number;
  agency_id: string;
  shipper: string;
  status_code: number;
  user_id: string;
  parent: string;
  miss: number;
  journey: Journey[];
}
interface Journey {
  date: string;
  managed_by: string;
  shipment_id: string;
}
export const columns: ColumnDef<Order>[] = [
  //select
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
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  //number
  {
    accessorKey: "number",
    header: ({ column }) => {
      return (
        <Button
          className="rounded"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <FormattedMessage id="order.ord" />
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const index = row.index + 1;
      return <>{index}</>;
    },
  },
  //orderid
  {
    accessorKey: "order_id",
    header: ({ column }) => {
      return (
        <Button
          className="rounded"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <FormattedMessage id="order.Id" />
          <ArrowUpDown className="ml-2 w-4" />
        </Button>
      );
    },
  },
  //pickuplocation
  {
    id: "pickupLocation",
    header: ({ column }) => {
      return (
        <Button
          className="rounded"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <FormattedMessage id="order.pickuplocation" />
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <>
        {`${row.original.detail_source}, ${row.original.ward_source},${row.original.district_source},${row.original.province_source}`}
        </>
      );
    },
  },
  //deliveryLocation
  {
    id: "deliveryLocation",

    header: ({ column }) => {
      return (
        <Button
          className="rounded"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <FormattedMessage id="order.receive" />
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <>
        {`${row.original.detail_dest}, ${row.original.ward_dest},${row.original.district_dest},${row.original.province_dest}`}
        </>
      );
    },
  },
  //type
  {
    accessorKey: "service_type",

    header: ({ column }) => {
      return (
        <Button
          className="rounded"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <FormattedMessage id="order.service_type" />
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  // status
  {
    accessorKey: "status_code",
    header: ({ column }) => {
      return (
        <Button
          className="rounded"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <FormattedMessage id="order.status" />
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const intl = useIntl();
      const consState = row.original.status_code;
      let statusLabel = "";
      let statusColor = "";

      switch (consState) {
        case 1:
          statusLabel = intl.formatMessage({ id: 'Consignment.Status.DeliveredSuccess' });
          statusColor="text-[#008000]"
          break;
        case 2:
          statusLabel = intl.formatMessage({ id: 'Consignment.Status.Processing' });
          statusColor="text-[#FF8C00]"
          break;
        case 3:
          statusLabel = intl.formatMessage({ id: 'Consignment.Status.Taking' });
          statusColor="text-[#FFFF00]"
          break;
        case 4:
          statusLabel = intl.formatMessage({ id: 'Consignment.Status.TakenSuccess' });
          statusColor="text-[#008000]"
          break;
        case 5:
          statusLabel = intl.formatMessage({ id: 'Consignment.Status.TakenFail' });
          statusColor="text-[#FF0000]"
          break;
        case 6:
          statusLabel = intl.formatMessage({ id: 'Consignment.Status.Delivering' });
          statusColor="text-[#0000FF]"
          break;
        case 7:
          statusLabel = intl.formatMessage({ id: 'Consignment.Status.DeliveredCancel' });
          statusColor="text-[#808080]"
          break;
        case 8:
          statusLabel = intl.formatMessage({ id: 'Consignment.Status.DeliveredFail' });
          statusColor="text-[#FF0000]"
          break;
        case 9:
          statusLabel = intl.formatMessage({ id: 'Consignment.Status.Refunding' });
          statusColor="text-[#800080]"
          break;
        case 10:
          statusLabel = intl.formatMessage({ id: 'Consignment.Status.RefundedSuccess' });
          statusColor="text-[#008000]"
          break;
        case 11:
          statusLabel = intl.formatMessage({ id: 'Consignment.Status.RefundedFail' });
          statusColor="text-[#FF0000]"
          break;
        case 12:
          statusLabel = intl.formatMessage({ id: 'Consignment.Status.EnterAgency' });
          statusColor="text-[#A52A2A]"
          break;
        case 13:
          statusLabel = intl.formatMessage({ id: 'Consignment.Status.LeaveAgency' });
          statusColor="text-[#0000FF]"
          break;
        case 14:
          statusLabel = intl.formatMessage({ id: 'Consignment.Status.ThirdPartyDelivery' });
          statusColor="text-[#FF4500]"
          break;
        case 15:
          statusLabel = intl.formatMessage({ id: 'Consignment.Status.DoneProcessing' });
          statusColor="text-[#008000]"
          break;
        default:
          statusLabel = statusLabel = "Unknown"
          break;
      }

      return (
        <span className={statusColor}>{statusLabel}</span>
      );
    },
  },
  //detail
  {
    accessorKey: "Chi tiết/Sửa đổi",
    header: () => {
      return (
        <div className="text-right whitespace-nowrap">
          <FormattedMessage id="order.detail" />
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
        <div className="relative flex justify-end mr-2">
          <Button
            onClick={openModal}
            className="bg-transparent hover:bg-white font-bold hover:text-black py-1 px-[0.65rem] border border-gray-600 hover:border-transparent rounded-full"
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
