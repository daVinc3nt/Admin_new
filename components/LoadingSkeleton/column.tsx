"use client";

import { ColumnDef } from "@tanstack/react-table";
import React from "react";

export type Consignment = {
  consignmentCode: string;
  barcode: string;
  deliveryManName: string;
  licensePlate: string;
  container: string;
  consState: number;
  consCode: string;
  carrierName: string;
  mass: number;
  id: number;
};
export const columns: ColumnDef<Consignment>[] = [
  {
    accessorKey: "number",
    cell: () => {
      return (
        <div className="py-1">
          <span className={`bg-gray-600 text-gray-600 animate-pulse rounded`}>
            "aaaaaaaaaa"
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "consignmentCode",
    cell: () => {
      return (
        <span className={`bg-gray-600 text-gray-600 animate-pulse rounded`}>
          "aaaaaaaaaaaaaaaa"
        </span>
      );
    },
  },
  {
    accessorKey: "deliveryManName",

    cell: () => {
      return (
        <span className={`bg-gray-600 text-gray-600 animate-pulse rounded`}>
          "aaaaaaaaaaaa"
        </span>
      );
    },
  },
  {
    accessorKey: "carrierName",

    cell: () => {
      return (
        <span className={`bg-gray-600 text-gray-600 animate-pulse rounded`}>
          "aaaaaaaa"
        </span>
      );
    },
  },
  {
    accessorKey: "mass",

    cell: () => {
      return (
        <span className={`bg-gray-600 text-gray-600 animate-pulse rounded`}>
          "aaaaaaaaaaaaaaaa"
        </span>
      );
    },
  },
  {
    accessorKey: "consState",
    cell: () => {
      return (
        <span className={`bg-gray-600 text-gray-600 animate-pulse rounded`}>
          "aaaaaaaaaaaaaa"
        </span>
      );
    },
  },
  {
    accessorKey: "Chi tiết/Sửa đổi",
    cell: () => {
      return (
        <span className={`bg-gray-600 text-gray-600 animate-pulse rounded`}>
          "aaaaaaaaaaaa"
        </span>
      );
    },
  },
];
