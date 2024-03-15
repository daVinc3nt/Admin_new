"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@nextui-org/react";
import React from "react";
import { Checkbox } from "@/components/TableUI/checkbox"
import { FormattedMessage, useIntl } from "react-intl"
export const columns: ColumnDef<any>[] = [
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
      return (
        <>{index}</>
      );
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
    accessorKey: "province_source",

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
  },
  //deliveryLocation
  {
    accessorKey: "province_dest",

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
  },
  //mass
  {
    accessorKey: "mass",

    header: ({ column }) => {
      return (
        <Button
          className="rounded"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <FormattedMessage id="order.mass" />
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
          break;
        case 2:
          statusLabel = intl.formatMessage({ id: 'Consignment.Status.Processing' });
          break;
        case 3:
          statusLabel = intl.formatMessage({ id: 'Consignment.Status.Taking' });
          break;
        case 4:
          statusLabel = intl.formatMessage({ id: 'Consignment.Status.TakenSuccess' });
          break;
        case 5:
          statusLabel = intl.formatMessage({ id: 'Consignment.Status.TakenFail' });
          break;
        case 6:
          statusLabel = intl.formatMessage({ id: 'Consignment.Status.Delivering' });
          break;
        case 7:
          statusLabel = intl.formatMessage({ id: 'Consignment.Status.DeliveredCancel' });
          break;
        case 8:
          statusLabel = intl.formatMessage({ id: 'Consignment.Status.DeliveredFail' });
          break;
        case 9:
          statusLabel = intl.formatMessage({ id: 'Consignment.Status.Refunding' });
          break;
        case 10:
          statusLabel = intl.formatMessage({ id: 'Consignment.Status.RefundedSuccess' });
          break;
        case 11:
          statusLabel = intl.formatMessage({ id: 'Consignment.Status.RefundedFail' });
          break;
        case 12:
          statusLabel = intl.formatMessage({ id: 'Consignment.Status.EnterAgency' });
          break;
        case 13:
          statusLabel = intl.formatMessage({ id: 'Consignment.Status.LeaveAgency' });
          break;
        case 14:
          statusLabel = intl.formatMessage({ id: 'Consignment.Status.ThirdPartyDelivery' });
          break;
        default:
          statusLabel = statusLabel = "Unknown"
          break;
      }

      return (
        <span className={statusColor}>{statusLabel}</span>
      );
    },
  }
];
