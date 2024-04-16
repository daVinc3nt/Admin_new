import React, { useRef, useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { FormattedMessage, useIntl } from "react-intl";
import { AdministrativeOperation, RoutesOperation, ScheduleOperation } from "@/TDLib/tdlogistics";
import ClockPicker from "react-time-picker";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from "@/Context/InfoContext/UserContext";
import { MdLocationSearching, MdTimelapse } from "react-icons/md";
import BasicPopover from "../Common/Popover";
import AddNotification from "./VehicleTable/vehiclePopup";

interface AddNotiProps {
    onClose: () => void;
    reloadData: (info: any) => void;
}

// interface CreatingNewTaskInfo {
//     task: string;
//     priority: number;
//     deadline: string;
// }


const AddNoti: React.FC<AddNotiProps> = ({ onClose, reloadData }) => {
    const notificationRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(true);
    const intl = useIntl();
    const routesOperation = new RoutesOperation()
    const [departureTime, setDepartureTime] = useState<string>("00:00:00");
    const adminOperation = new AdministrativeOperation();
    const [vehicleID, setVehicleID] = useState<string>("");
    const [provinces, setProvinces] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState<null | string>(null);
    const [selectedProvince2, setSelectedProvince2] = useState<null | string>(null);
    const { info } = useContext(UserContext)
    const [openModal, setModalOpen] = useState(false)
    const handleClose = () => {
        setIsVisible(false);
    };

    const handleAnimationComplete = () => {
        if (!isVisible) {
            onClose();
        }
    };

    const handleConfirm = async () => {
        const info2 = {
            vehicle_id: vehicleID,
            source: selectedProvince,
            destination: selectedProvince2,
            departure_time: departureTime,
        };

        const result = await routesOperation.create(info2);
        if (result.error == true) {
            alert("Error: " + result.message)
            return;
        }
        if (!result.error.error) {
            handleClose();
            reloadData(info);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await adminOperation.get({});
            setProvinces(response.data);
        };
        fetchData();
    }, []);

    const formatTime = (time: string): string => {
        const parts = time.split(":").map(part => parseInt(part));
        const formattedParts = parts.map(part => {
            if (isNaN(part)) return "00";
            return part < 10 ? `0${part}` : `${part}`;
        });
        return formattedParts.join(":");
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
            {openModal && <AddNotification onClose={() => setModalOpen(false)} setVehicleID={(vehicleid) => setVehicleID(vehicleid)} />}
            <motion.div
                ref={notificationRef}
                className={`relative w-[98%] sm:w-9/12 lg:w-1/2 bg-white dark:bg-[#14141a] rounded-xl p-4 overflow-y-auto`}
                initial={{ scale: 0 }}
                animate={{ scale: isVisible ? 1 : 0 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="relative items-center justify-center flex-col flex h-10 w-full border-b-2 border-[#545e7b]">
                    <div className="font-bold text-lg sm:text-2xl pb-2 text-black dark:text-white w-full text-center">
                        Thêm tuyến đường
                    </div>
                    <Button className="absolute right-0 w-8 h-8 rounded-full mb-2 hover:bg-gray-300" onClick={handleClose}>
                        <IoMdClose className="w-5/6 h-5/6" />
                    </Button>
                </div>
                <div className="overflow-y-scroll border-[#545e7b] mt-4 no-scrollbar flex flex-col bg-white dark:bg-[#14141a] p-2 rounded-md dark:text-white gap-2">
                    <div className="flex flex-col mt-4 dark:text-white">
                        <div className="flex gap-2">
                            <div className="w-full relative">
                                <input
                                    value={vehicleID}
                                    onChange={(e) => { setVehicleID(e.target.value) }}
                                    id="postSearch"
                                    type="text"
                                    className={`peer h-10 self-center w-full border border-gray-600 rounded focus:outline-none focus:border-blue-500 truncate bg-transparent
                    text-left placeholder-transparent pl-3 pt-2 pr-12 text-sm dark:text-white`}
                                    placeholder=""
                                />
                                <label
                                    htmlFor="postSearch"
                                    className={`absolute left-3 -top-0 text-xxs leading-5 text-gray-500 transition-all 
                    peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 
                    peer-focus:-top-0.5 peer-focus:leading-5 peer-focus:text-blue-500 peer-focus:text-xxs`}
                                >
                                    Nhập mã phương tiện
                                </label>
                            </div>
                            <Button
                                className={`h-10 rounded-lg p-3 px-6 border-green-700 hover:bg-green-700 text-green-500
                  bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border 
                  hover:shadow-md`}
                                onClick={() => setModalOpen(true)}
                            >
                                Chọn
                            </Button>
                        </div>

                        <div className="flex gap-2 mt-4" onMouseDown={(e) => e.stopPropagation()}>
                            <select
                                className={`text-xs md:text-sm border border-gray-600 rounded dark:bg-[#14141a] h-10 p-2 w-full dark:text-white`}
                                id="city"
                                aria-label=".form-select-sm"
                                value={selectedProvince}
                                onChange={(e) => setSelectedProvince(e.target.value)}
                                onMouseDown={(e) => e.stopPropagation()}
                            >
                                <option value={null}>Chọn điểm đi</option>
                                {provinces.map((city) => (
                                    <option key={city} value={city}>
                                        {city}
                                    </option>
                                ))}
                            </select>
                            <select
                                className={`text-xs md:text-sm border border-gray-600 rounded dark:bg-[#14141a] h-10 p-2 w-full dark:text-white`}
                                id="city"
                                aria-label=".form-select-sm"
                                value={selectedProvince2}
                                onChange={(e) => setSelectedProvince2(e.target.value)}
                                onMouseDown={(e) => e.stopPropagation()}
                            >
                                <option value={null}>Chọn điểm đến</option>
                                {provinces.map((city) => (
                                    <option key={city} value={city}>
                                        {city}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-4 mt-4">
                            <div className="flex flex-col">
                                <label htmlFor="departureTime" className="text-sm font-medium dark:text-white mb-2">
                                    Giờ khởi hành
                                </label>
                                <ClockPicker
                                    clearIcon={null}
                                    maxDetail="second"
                                    id="departureTime"
                                    value={departureTime}
                                    onChange={(value) => setDepartureTime(formatTime(value.toString()))}
                                    clockIcon={null}
                                    className={`border border-gray-600 rounded-md px-6 py-2 focus:outline-none focus:border-blue-500 dark:text-white flex justify-center`}
                                />
                            </div>

                        </div>

                    </div>
                </div>

                <Button
                    className="w-full rounded-lg mt-5 mb-1 py-3 border-green-700 hover:bg-green-700 text-green-500 bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border hover:shadow-md"
                    onClick={handleConfirm}
                >
                    <span>
                        <FormattedMessage id="Schedule.Add.Button" />
                    </span>
                </Button>
            </motion.div>
        </motion.div>
    );
};

export default AddNoti;
