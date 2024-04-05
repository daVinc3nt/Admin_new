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
    accessorKey: "agency_id",
    header: ({ column }) => {
      return (
        <Button
          className="rounded"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Mã bưu cục
          <ArrowUpDown className="ml-2 w-4" />
        </Button>
      );
    },
  },
  //pickuplocation
  {
    accessorKey: "agency_name",

    header: ({ column }) => {
      return (
        <Button
          className="rounded"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tên bưu cục
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  //deliveryLocation
  {
    accessorKey: "address",
    header: ({ column }) => {
      return (
        <Button
          className="rounded"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Địa chỉ bưu cục
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {

      return (
        <p >{row.original.detail_address}, {row.original.town}, {row.original.district}, {row.original.province}</p>
      );
    },
  }
];
