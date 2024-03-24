"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { Checkbox } from "@/components/TableUI/checkbox";
import { FormattedMessage, useIntl } from "react-intl";
import {
  BusinessOperation,
  ApprovingBusinessInfo,
  UpdatingBusinessCondition,
} from "@/TDLib/tdlogistics";
interface ApproveBusinessCondition {
  business_id: string;
  agency_id: string;
  business_name: string;
  email: string;
  phone_number: string;
}

type MyColumnDef<T> = ColumnDef<T> & {
  reloadData?: () => void;
};

export async function createColumns(
  reloadData: () => void
): Promise<MyColumnDef<ApproveBusinessCondition>[]> {
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
      accessorKey: "Thao tác",
      header: () => {
        return "Thao tác";
      },
      cell: ({ row }) => {
        const a = new BusinessOperation();

        const handleApprove = async () => {
          try {
            const ApprovingInfo: ApprovingBusinessInfo = {
              agency_id: row.original.agency_id,
            };
            const UpdateCondition: UpdatingBusinessCondition = {
              business_id: row.original.business_id,
            };

            const response = await a.approve(ApprovingInfo, UpdateCondition);
            if (response.error.error) {
              alert(response.error.message);
              return;
            }
            alert("Phê duyệt thành công");
            reloadData();
          } catch (e) {
            console.log(e);
          }
        };

        // const handleReject = async () => {
        //   const data = row.original;
        //   const condition: UpdatingBusinessCondition = {
        //     business_name: data.business_name,
        //     email: data.email,
        //     phone_number: data.phone_number,
        //     status: "REJECTED",
        //   };
        //   await a.updateBusiness(condition);
        //   reloadData();
        // };

        return (
          <div className="relative flex  mr-2">
            <Button
              onClick={handleApprove}
              className="bg-transparent hover:bg-white font-bold hover:text-black py-1 px-[0.65rem] border border-gray-600 hover:border-green-500 rounded-full"
            >
              Chấp nhận
            </Button>
            {/* <Button
              onClick={handleReject}
              className="bg-transparent hover:bg-white font-bold hover:text-black py-1 px-[0.65rem] border border-gray-600 hover:border-transparent rounded-full"
            >
              Từ chối
            </Button> */}
          </div>
        );
      },
    },
  ];
}
