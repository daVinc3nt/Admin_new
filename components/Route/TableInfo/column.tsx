"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { Checkbox } from "@/components/TableUI/checkbox";
import { FormattedMessage, useIntl } from "react-intl";
import Consignment from "@/pages/dashboard/consignment";
import {
    MdOutlineRadioButtonChecked,
    MdOutlineRadioButtonUnchecked,
} from "react-icons/md";
import { ShipmentsOperation, ShipmentID } from "@/TDLib/tdlogistics";
import TaskMenu from "@/components/Task/TaskMenu";
import DetailRoute from "../detailRoute";
const createTime = (time: string) => {
    const moment = require("moment-timezone");
    const standardDatetime = moment(time)
        .tz(moment.tz.guess())
        .format("DD/MM/YYYY HH:mm:ss");
    return standardDatetime;
};

type MyColumnDef<T> = ColumnDef<T> & {
    reloadData?: () => void;
    info?: any;
};
export async function createColumns(
    reloadData: () => void,
    info: any
): Promise<MyColumnDef<any>[]> {
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
            accessorKey: "number",
            header: ({ column }) => {
                return (
                    <Button
                        className="rounded"
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        <FormattedMessage id="Consignment.Row1" />
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => {
                const index = row.index + 1;
                return <>{index}</>;
            },
        },
        {
            accessorKey: "vehicle_id",
            header: ({ column }) => {
                return (
                    <Button
                        className="rounded"
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Mã phương tiện
                        <ArrowUpDown className="ml-2 w-4" />
                    </Button>
                );
            },
        },
        {
            accessorKey: "source",

            header: ({ column }) => {
                return (
                    <Button
                        className="rounded"
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Điểm đi
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },
        {
            accessorKey: "destination",

            header: ({ column }) => {
                return (
                    <Button
                        className="rounded"
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Điểm đến
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
                        className="rounded flex justify-center w-full"
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Loại phương tiện
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
                        className="rounded flex justify-center w-full"
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Tải trọng(T)
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },

        {
            accessorKey: "busy",
            header: ({ column }) => {
                return (
                    <Button
                        className="rounded w-full flex justify-center"
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Trạng thái
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => {
                return (
                    <div className="w-full flex justify-center">
                        <div className="text-yellow-500">
                            {row.original.busy === 1 && "Đang bận"}
                        </div>
                        <div className="text-green-500">
                            {row.original.busy === 0 && "Sẵn sàng"}
                        </div>
                    </div>
                );
            },
        },
        {
            accessorKey: "Chi tiết/Sửa đổi",
            header: () => {
                return (
                    <div className="text-right whitespace-nowrap w-full flex justify-center">
                        <FormattedMessage id="Consignment.Row7" />
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
                    <div className="relative mr-2 w-full flex justify-center">
                        <Button
                            onClick={openModal}
                            className="bg-transparent hover:bg-white font-bold hover:text-black py-1 px-2 border border-gray-600 hover:border-transparent rounded-full text-center"
                        >
                            ...
                        </Button>
                        {modalIsOpen && (
                            <DetailRoute onClose={closeModal} dataInitial={row.original} reloadData={reloadData} />
                        )}
                    </div>
                );
            },
        },
    ];
}
