import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { FormattedMessage, useIntl } from "react-intl";
import { ScheduleOperation } from "@/TDLib/tdlogistics";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface AddNotiProps {
    onClose: () => void;
    reloadData: () => void;
}

interface CreatingNewTaskInfo {
    task: string;
    priority: number;
    deadline: string;
}

const priorityOptions = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
];

const AddNoti: React.FC<AddNotiProps> = ({ onClose, reloadData }) => {
    const [isShaking, setIsShaking] = useState(false);
    const notificationRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(true);
    const intl = useIntl();
    const [task, setTask] = useState("");
    const [priority, setPriority] = useState(1);
    const [deadline, setDeadline] = useState<Date | null>(null);
    const scheduleOperation = new ScheduleOperation();

    const handleClickOutside = (event: MouseEvent) => {
        if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
            setIsShaking(true);
            setTimeout(() => {
                setIsShaking(false);
            }, 300);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    const handleClose = () => {
        setIsVisible(false);
    };

    const handleAnimationComplete = () => {
        if (!isVisible) {
            onClose();
        }
    };

    const formatDateToString = (date: Date): string => {
        const year = date.getFullYear();
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        const hours = ("0" + date.getHours()).slice(-2);
        const minutes = ("0" + date.getMinutes()).slice(-2);
        const seconds = ("0" + date.getSeconds()).slice(-2);

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const handleConfirm = async () => {
        const info: CreatingNewTaskInfo = {
            task: task,
            priority: priority,
            deadline: formatDateToString(deadline),
        };

        const result = await scheduleOperation.create(info);
        if (result.error == true) {
            alert("Error: " + result.message)
            return;
        }
        if (!result.error.error) {
            handleClose();
            reloadData();
        }
    };

    return (
        <motion.div
            className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-60 z-50 text-[#545e7b]`}
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onAnimationComplete={handleAnimationComplete}
            style={{ backdropFilter: "blur(12px)" }}
        >
            <motion.div
                ref={notificationRef}
                className={`relative w-[98%] sm:w-9/12 lg:w-1/2 bg-white dark:bg-[#14141a] rounded-xl p-4 overflow-y-auto ${isShaking ? "animate-shake" : ""
                    }`}
                initial={{ scale: 0 }}
                animate={{ scale: isVisible ? 1 : 0 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="relative items-center justify-center flex-col flex h-10 w-full border-b-2 border-[#545e7b]">
                    <div className="font-bold text-lg sm:text-2xl pb-2 text-black dark:text-white w-full text-center">
                        <FormattedMessage id="Schedule.Add.Title" />
                    </div>
                    <Button className="absolute right-0 w-8 h-8 rounded-full mb-2 hover:bg-gray-300" onClick={handleClose}>
                        <IoMdClose className="w-5/6 h-5/6" />
                    </Button>
                </div>
                <div className="overflow-y-scroll border-[#545e7b] mt-4 no-scrollbar flex flex-col bg-white dark:bg-[#14141a] p-2 rounded-md dark:text-white gap-2">
                    <div className="flex items-center gap-2">
                        <label htmlFor="priorityInput" className="font-semibold">
                            <FormattedMessage id="Schedule.Info4" />:
                        </label>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    className="text-xs md:text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 ml-2 w-20 text-center p-2"
                                    aria-label="Show items per page"
                                >
                                    {priority}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                className="bg-white dark:bg-[#1a1b23] text-black dark:text-white border border-gray-300 rounded w-20"
                                aria-labelledby="dropdownMenuButton"
                            >
                                {priorityOptions.map((option) => (
                                    <DropdownItem
                                        key={option.value}
                                        textValue={`Set priority to ${option.label}`}
                                    >
                                        <Button
                                            onClick={() => setPriority(option.value)}
                                            variant="bordered"
                                            aria-label={`Set priority to ${option.label}`}
                                            className="text-center w-full"
                                        >
                                            {option.label}
                                        </Button>
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div className="flex items-center gap-2">
                        <label htmlFor="deadlineInput" className="font-semibold">
                            <FormattedMessage id="Schedule.Info2" />:
                        </label>
                        <DatePicker
                            minDate={new Date()}
                            id="deadlineInput"
                            selected={deadline}
                            onChange={(date: Date) => setDeadline(date)}
                            showTimeSelect
                            dateFormat="yyyy-MM-dd HH:mm:ss"
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-left z-50"
                            popperPlacement="top-0 left-0"
                        />
                    </div>
                    <div className="flex gap-2 flex-col">
                        <label htmlFor="taskInput" className="font-semibold">
                            <FormattedMessage id="Schedule.Info1" />:
                        </label>
                        <textarea
                            id="taskInput"
                            value={task}
                            cols={30}
                            rows={10}
                            onChange={(e) => setTask(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-left"
                        />
                    </div>
                </div>
                <Button
                    className="w-full rounded-lg mt-5 mb-1 py-3 border-green-700 hover:bg-green-700 text-green-500 bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border hover:shadow-md"
                    onClick={handleConfirm}
                >
                    <span className="hidden xs:block">
                        <FormattedMessage id="Schedule.Add.Button" />
                    </span>
                </Button>
            </motion.div>
        </motion.div>
    );
};

export default AddNoti;
