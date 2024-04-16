"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { Checkbox } from "@/components/TableUI/checkbox";
import { FindingAgencyByAdminInfo } from "@/TDLib/tdlogistics";
// Đảm bảo gọi hàm này ở đầu ứng dụng của bạn

export type VehicleData = {
  transport_partner_id: string;
  agency_id: string;
  staff_id: string;
  role: string;
  GPLX: File;
  max_load: string;
  license_plate: string;
  busy: boolean;
  shipment_ids: string[];
  type: string;
  vehicle_id: string;
  mass: string;
  agency_name: string;
  transport_partner_name: string;
  fullname: string;
};

type MyColumnDef<T> = ColumnDef<T> & {
};
export async function createColumns(
): Promise<MyColumnDef<VehicleData>[]> {
  return [
    {
      id: "select",
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="border border-black"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "stt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            STT
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const index = row.index;
        return <div>{index + 1}</div>;
      },
      enableSorting: false,
      enableHiding: false,
    },

    {
      accessorKey: "agency_name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Bưu cục quản lý
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        if (row.original.agency_name) {
          return <div>{row.original.agency_name}</div>;
        } else {
        }
      },
    },
    {
      accessorKey: "transport_partner_name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Đối tác quản lý
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        if (row.original.transport_partner_name) {
          return <div>{row.original.transport_partner_name}</div>;
        } else {
        }
      },
    },
    {
      accessorKey: "fullname",
      id: "fullname",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tên nhân viên
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.original.fullname}</div>,
    },

    {
      accessorKey: "busy",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <FormattedMessage id="Vehicle.Status" />
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div>
            {row.original.busy == false ? (
              <div className="text-green-500">Sẵn sàng</div>
            ) : (
              <div className="text-red-500">Đang bận</div>
            )}
          </div>
        );
      },
    },
  ];
}
