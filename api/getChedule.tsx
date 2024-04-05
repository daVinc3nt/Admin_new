import { ScheduleOperation } from "@/TDLib/tdlogistics";
import { DataTable } from "@/components/Schedule/TableInfo/datatable";
import DetailNoti from "@/components/Schedule/detailTask";
import { Checkbox } from "@/components/TableUI/checkbox";
import { Button } from "@nextui-org/react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";
import { MdOutlineRadioButtonChecked, MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { FormattedMessage } from "react-intl";
async function getData() {
    const schedules = new ScheduleOperation();
    const data = await schedules.get({});
    return data;
}

const createTime = (time: string) => {
    const moment = require('moment-timezone');
    const standardDatetime = moment(time).tz(moment.tz.guess()).format('DD/MM/YYYY HH:mm:ss');
    return standardDatetime;
}

export default async function DemoPage(reloadData, setOpenError, setMessage) {
    const data = await getData();
    const columns: ColumnDef<any>[] = [
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
            accessorKey: "task",
            header: ({ column }) => {
                return (
                    <Button
                        className="rounded"
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        <FormattedMessage id="Schedule.Info1" />
                        <ArrowUpDown className="ml-2 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => {
                return <div className="whitespace-nowrap w-40 truncate">
                    {row.original.task}
                </div>
            },
        },
        {
            accessorKey: "priority",

            header: ({ column }) => {
                return (
                    <Button
                        className="rounded flex justify-center w-full"
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        <FormattedMessage id="Schedule.Info4" />
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => {
                return <div className="flex justify-center">
                    {row.original.priority}
                </div>
            },
        },
        {
            accessorKey: "created_at",

            header: ({ column }) => {
                return (
                    <Button
                        className="rounded flex justify-center w-full"
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        <FormattedMessage id="Schedule.Info6" />
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => {
                return <div className="flex justify-center">{createTime(row.original.created_at)}</div>;
            },
        },
        {
            accessorKey: "completed_at",

            header: ({ column }) => {
                return (
                    <Button
                        className="rounded flex justify-center w-full"
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        <FormattedMessage id="Schedule.Info5" />
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => {
                return <div className="flex justify-center">{row.original.completed ? createTime(row.original.completed_at) : ""}</div>;
            },
        },
        {
            accessorKey: "completed",
            header: ({ column }) => {
                return (
                    <Button
                        className="rounded w-full flex justify-center"
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        <FormattedMessage id="Schedule.Info3" />
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => {
                return <div className="w-full flex justify-center">
                    {row.original.completed === 1 ? <MdOutlineRadioButtonChecked /> : <MdOutlineRadioButtonUnchecked />}
                </div>
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
                            className="bg-transparent hover:bg-white font-bold hover:text-black py-1 px-[0.65rem] border border-gray-600 hover:border-transparent rounded-full "
                        >
                            +
                        </Button>
                        {modalIsOpen && (
                            <DetailNoti onClose={closeModal} dataInitial={row.original} reloadData={reloadData} />
                        )}
                    </div>
                );
            },
        },
    ];
    try {
        const data = await getData();
        if (!data.error.error) return <DataTable columns={columns} data={data.data} reloadData={reloadData} />;
        else {
            setMessage(data.message);
            setOpenError(true)
            return (
                <div className="flex place-content-center h-screen justify-center place-items-center">
                    {data.message}
                </div>
            );
        }
    } catch (error) {
        return <div className="flex place-content-center h-screen justify-center place-items-center">
            "Error! Please contact admin."
        </div>
    }
}
