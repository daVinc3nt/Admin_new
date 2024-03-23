"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { LogoIcon, UsersIcon } from "@/components/Icons";
import DetailStaff from "./detailStaff";
import { Checkbox } from "@/components/TableUI/checkbox";
import { FormattedMessage } from "react-intl";
// Đảm bảo gọi hàm này ở đầu ứng dụng của bạn\

export type Staff = {
  active: boolean;
  agency_id: string;
  avatar: string;
  bank: string;
  bin: string;
  cccd: string;
  date_of_birth: string;
  deposit: number;
  detail_address: string;
  district: string;
  email: string;
  fullname: string;
  id: number;
  paid_salary: number;
  password: string;
  phone_number: string;
  position: string;
  privileges: string[];
  province: string;
  role: string;
  salary: number;
  staff_id: string;
  town: string;
  username: string;
};

export const columns: ColumnDef<Staff>[] = [
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
  {
    accessorKey: "staff_id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <FormattedMessage id="Staff.Number" />
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "fullname",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <FormattedMessage id="Staff.Name" />
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
          <FormattedMessage id="Staff.Phone" />
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "role",

    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <FormattedMessage id="Staff.Position" />
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "active",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <FormattedMessage id="Staff.Status" />
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          {row.original.active ? (
            <span className=" text-green-500">
              <FormattedMessage id="isActive" />
            </span>
          ) : (
            <span className=" text-red-500">
              <FormattedMessage id="isInActive" />
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "Chi tiết/Sửa đổi",
    header: () => {
      return <FormattedMessage id="Staff.Detail" />;
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
            <DetailStaff onClose={closeModal} dataInitial={row.original} />
          )}
        </div>
      );
    },
  },
];
