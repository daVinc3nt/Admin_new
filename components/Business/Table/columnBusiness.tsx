"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { LogoIcon, UsersIcon } from "@/components/Icons";
import DetailBusiness from "./detailBusiness";
import { Checkbox } from "@/components/TableUI/checkbox";
import { FormattedMessage, useIntl } from "react-intl";
import { TransportPartnersOperation } from "@/TDLib/tdlogistics";
interface FindingBusinessByAdminCondition {
  agency_id: string;
  bank: string;
  bin: string;
  business_id: string;
  business_name: string;
  contract: File;
  created_at: string;
  debit: number;
  detail_address: string;
  district: string;
  email: string;
  phone_number: string;
  province: string;
  tax_number: string;
  town: string;
  username: string;
}

type MyColumnDef<T> = ColumnDef<T> & {
  reloadData?: () => void;
};

export async function createColumns(
  reloadData: () => void
): Promise<MyColumnDef<FindingBusinessByAdminCondition>[]> {
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
      accessorKey: "tax_number",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <FormattedMessage id="TransportPartner.TaxCode" />
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "business_name",

      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <FormattedMessage id="TransportPartner.Name" />
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
            <FormattedMessage id="Phone" />
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "Chi tiết/Sửa đổi",
      header: () => {
        return <FormattedMessage id="TransportPartner.Detail" />;
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
          <div className="relative flex  mr-2">
            <Button
              onClick={openModal}
              className="bg-transparent hover:bg-white font-bold hover:text-black py-1 px-[0.65rem] border border-gray-600 hover:border-transparent rounded-full"
            >
              +
            </Button>
            {modalIsOpen && (
              <DetailBusiness
                onClose={closeModal}
                dataInitial={row.original}
                reloadData={reloadData}
              />
            )}
          </div>
        );
      },
    },
  ];
}
