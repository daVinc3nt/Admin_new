"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { LogoIcon, UsersIcon } from "@/components/Icons";
import DetailPost from "./detailPost";
import { Checkbox } from "@/components/TableUI/checkbox";
import { FormattedMessage } from "react-intl";
import { FindingAgencyByAdminInfo } from "@/TDLib/tdlogistics";
import DetailPost2 from "./detailPost2";
import { info } from "console";

interface Postdetail2 {
  individual_company: number;
  company_name: string;
  tax_number: string;
  business_number: string;
  agency_id: string;
  agency_name: string;
  bank: string;
  bin: string;
  commission_rate: string;
  contract: string;
  detail_address: string;
  district: string;
  email: string;
  latitude: string;
  level: string;
  longitude: string;
  managed_wards: string[];
  phone_number: string;
  postal_code: string;
  province: string;
  town: string;
  revenue: string;
}
interface Postdetail1 {
  individual_company: number;
  company_name: string;
  tax_number: string;
  business_number: string;
  agency_id: string;
  agency_name: string;
  bank: string;
  bin: string;
  commission_rate: string;
  contract: string;
  detail_address: string;
  district: string;
  email: string;
  latitude: string;
  level: string;
  longitude: string;
  managed_wards: string[];
  phone_number: string;
  postal_code: string;
  province: string;
  town: string;
  revenue: string;
}

type MyColumnDef<T> = ColumnDef<T> & {
  reloadData?: () => void;
  info?: any;
};

export async function createColumns(
  reloadData: () => void,
  info: any
): Promise<MyColumnDef<Postdetail1>[]> {
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
      accessorKey: "agency_id",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            ID
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
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "phone_number",

      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            SDT
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "postal_code",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Mã bưu cục
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "Chi tiết/Sửa đổi",
      header: () => {
        return <FormattedMessage id="PostOffice.Detail" />;
      },
      cell: ({ row }) => {
        const [modalIsOpen, setModalIsOpen] = useState(false);

        const openModal = () => {
          setModalIsOpen(true);
          console.log(row.original);
          console.log(row.original.individual_company);
        };

        const closeModal = () => {
          setModalIsOpen(false);
        };

        return (
          <div className="relative flex  mr-2">
            <Button
              onClick={openModal}
              className="bg-transparent hover:bg-white font-bold hover:text-black py-1 px-[0.65rem] border border-gray-600 hover:border-transparent rounded-full"
            >
              +
            </Button>
            {modalIsOpen && row.original.individual_company === 1 ? (
              <DetailPost2
                onClose={closeModal}
                dataInitial={row.original}
                reloadData={reloadData}
                info={info}
              />
            ) : (
              ""
            )}
            {modalIsOpen && row.original.individual_company === 0 ? (
              <DetailPost
                onClose={closeModal}
                dataInitial={row.original}
                reloadData={reloadData}
                info={info}
              />
            ) : (
              ""
            )}
          </div>
        );
      },
    },
  ];
}
