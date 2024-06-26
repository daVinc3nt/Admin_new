"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import DetailDriver from "./detailDriver";
import { Checkbox } from "@/components/TableUI/checkbox";
import { FormattedMessage } from "react-intl";
import DetailShipper from "./detailShipper";
import {
  DriversOperation,
  CreatingNewDriverTasksInfo,
  CreatingNewShipperTasksInfo,
  ShippersOperation,
} from "@/TDLib/tdlogistics";
import { set } from "date-fns";

interface DriverDetail {
  agency_id: string;
  agency_name: string;
  busy: number;
  created_at: string;
  fullname: string;
  last_update: string;
  license_plate: string;
  mass: number;
  max_load: number;
  staff_id: string;
  transport_partner_id: string;
  transport_partner_name: string;
  type: string;
  vehicle_id: string;
}

type MyColumnDef<T> = ColumnDef<T> & {
  reloadData?: () => void;
  info?: any;
  dataInitial?: any;
};

export async function createColumns(
  reloadData: () => void,
  info: any
): Promise<MyColumnDef<DriverDetail>[]> {
  return [
    // {
    //   id: "select",
    //   header: ({ table }) => (
    //     <Checkbox
    //       checked={
    //         table.getIsAllPageRowsSelected() ||
    //         (table.getIsSomePageRowsSelected() ? "indeterminate" : false)
    //       }
    //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //       aria-label="Select all"
    //       className="border border-black dark:border-white"
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       onCheckedChange={(value) => row.toggleSelected(!!value)}
    //       aria-label="Select row"
    //       className="border border-black dark:border-white"
    //     />
    //   ),
    //   enableSorting: false,
    //   enableHiding: false,
    // },
    {
      accessorKey: "fullname",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Họ và tên
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "agency_name",

      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <FormattedMessage id="PostOffice.Name" />
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
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Khối lượng
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "max_load",

      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tải trọng
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "type",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Loại xe
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "Detail",
      header: ({ column }) => {
        return "Chi tiết";
      },
      cell: ({ row }) => {
        const [modalIsOpen, setModalIsOpen] = useState(false);

        const openModal = () => {
          setModalIsOpen(true);
          // console.log(row.original);
          // console.log(row.original.individual_company);
        };

        const closeModal = () => {
          setModalIsOpen(false);
          console.log("Close");
        };

        return (
          <div className="relative flex  mr-2">
            <Button
              onClick={openModal}
              className="bg-transparent hover:bg-white font-bold hover:text-black py-1 px-[0.65rem] border border-gray-600 hover:border-transparent rounded-full"
            >
              +
            </Button>
            {modalIsOpen &&
              (info?.role === "ADMIN" ||
                info?.role === "MANAGER" ||
                info?.role === "HUMAN_RESOURCE_MANAGER") && (
                <DetailDriver
                  onClose={closeModal}
                  dataInitial={row.original}
                  reloadData={reloadData}
                  info={info}
                />
              )}
            {modalIsOpen &&
              (info?.role === "AGENCY_MANAGER" ||
                info?.role === "AGENCY_HUMAN_RESOURCE_MANAGER") && (
                <DetailShipper
                  onClose={closeModal}
                  dataInitial={row.original}
                  reloadData={reloadData}
                  info={info}
                />
              )}
          </div>
        );
      },
    },
  ];
}
