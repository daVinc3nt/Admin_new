import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { FormattedMessage, useIntl } from "react-intl";
import { ScheduleOperation } from "@/TDLib/tdlogistics";
import { resourceLimits } from "worker_threads";

interface DetailNotiProps {
    onClose: () => void;
    dataInitial: any;
    reloadData: () => void;
}

const createTime = (time: string) => {
    const moment = require('moment-timezone');
    const standardDatetime = moment(time).tz(moment.tz.guess()).format('DD/MM/YYYY HH:mm:ss');
    return standardDatetime;
}

const priorityOptions = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
];

const DetailNoti: React.FC<DetailNotiProps> = ({ onClose, dataInitial, reloadData }) => {
    const [isShaking, setIsShaking] = useState(false);
    const notificationRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(true);
    const intl = useIntl();
    const [updatedTask, setUpdatedTask] = useState(dataInitial.task);
    const [updatedPriority, setUpdatedPriority] = useState<number>(dataInitial.priority);
    const [updatedCompleted, setUpdatedCompleted] = useState(dataInitial.completed);
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

    const handleConfirm = async () => {
        const updatedTaskInfo: any = {
            task: updatedTask,
            priority: updatedPriority,
            completed: updatedCompleted ? true : false,
        };

        const taskId: any = {
            id: dataInitial.id,
        };

        const result = await scheduleOperation.update(updatedTaskInfo, taskId);
        if (result.error == true) {
            alert("Error: " + result.message)
            return;
        }
        if (!result.error.error) {
            handleClose();
            reloadData()
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
                        <FormattedMessage id="Schedule.Detail.Title" />
                    </div>
                    <Button className="absolute right-0 w-8 h-8 rounded-full mb-2 hover:bg-gray-300" onClick={handleClose}>
                        <IoMdClose className="w-5/6 h-5/6" />
                    </Button>
                </div>
                <div className="max-h-96 overflow-y-scroll border-[#545e7b] mt-4 no-scrollbar flex flex-col bg-white dark:bg-[#14141a] p-2 rounded-md dark:text-white gap-2">
                    <div className="font-semibold"><FormattedMessage id="Schedule.Info2" />: {createTime(dataInitial.deadline)}</div>
                    <div className="flex items-center gap-2">
                        <div className="font-semibold"><FormattedMessage id="Schedule.Info3" />:</div>
                        <input
                            id="completedInput"
                            type="checkbox"
                            defaultChecked={dataInitial.completed}
                            onChange={(e) => setUpdatedCompleted(e.target.checked)}
                        />
                    </div>
                    {dataInitial.completed ? <div className="font-semibold"><FormattedMessage id="Schedule.Info5" />: {createTime(dataInitial.completed_at)}</div> : <></>}
                    <div className="flex">
                        <label htmlFor="priorityInput" className="font-semibold">
                            <FormattedMessage id="Schedule.Info4" />:
                        </label>
                        <Dropdown className="z-30">
                            <DropdownTrigger>
                                <Button
                                    className="text-xs md:text-sm border border-gray-600 rounded ml-2 w-12 text-center"
                                    aria-label="Show items per page"
                                >
                                    {updatedPriority}
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
                                            onClick={() => setUpdatedPriority(option.value)}
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
                    <div className="flex flex-col gap-2">
                        <label htmlFor="taskInput" className="font-semibold">
                            <FormattedMessage id="Schedule.Info1" />:
                        </label>
                        <textarea
                            cols={30}
                            rows={10}
                            id="taskInput"
                            defaultValue={dataInitial.task}
                            onChange={(e) => setUpdatedTask(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-left"
                        />
                    </div>
                </div>
                <Button
                    className="w-full rounded-lg mt-5 mb-1 py-3 border-green-700 hover:bg-green-700 text-green-500 bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border hover:shadow-md"
                    onClick={handleConfirm}
                >
                    <span >
                        <FormattedMessage id="Schedule.Detail.Button" />
                    </span>
                </Button>
            </motion.div>
        </motion.div>
    );
};

export default DetailNoti;
