import React from "react";
import { useState, useEffect, useCallback, useContext, useRef } from "react";
import { FormattedMessage } from "react-intl";
import { UserContext } from "@/Context/InfoContext/UserContext";
import DemoPage from "./Table/export";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import { IoMdClose } from "react-icons/io";
import { AdministrativeOperation } from "@/TDLib/tdlogistics";
import { MdLocationSearching, MdTimelapse, MdTimeline } from "react-icons/md";
import BasicPopover from "../Common/Popover";
import ClockPicker from "react-time-picker";
// import styles from "./TaskMenu.module.css"; // Import CSS file for styling

interface TaskProps {
  onClose: () => void;
  DataInitial: string[];
}

const TaskMenu: React.FC<TaskProps> = ({ onClose, DataInitial }) => {
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [demoPage, setDemoPage] = useState(<div>Hi</div>);
  const { info } = useContext(UserContext);
  const adminOperation = new AdministrativeOperation();
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState<null | string>(null);
  const [selectedProvince2, setSelectedProvince2] = useState<null | string>(null);
  const [departureTime, setDepartureTime] = useState<Date | string>("00:00:00");
  const [arrivalTime, setArrivalTime] = useState<Date | string>("00:00:00");
  const [vehicleID, setVehicleID] = useState<string>("");
  const reloadData = useCallback(() => {
    fetchDemoPage();
  }, [info, DataInitial]);

  const fetchDemoPage = async () => {
    const result = await DemoPage(
      reloadData,
      info,
      DataInitial,
      vehicleID != "" ? vehicleID : null,
      selectedProvince ? selectedProvince : null,
      selectedProvince2 ? selectedProvince2 : null,
      departureTime != "00:00:00" ? departureTime : null,
      arrivalTime != "00:00:00" ? arrivalTime : null,
    )
    setDemoPage(result);
  };

  useEffect(() => {
    fetchDemoPage();
  }, [info, DataInitial]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleAnimationComplete = () => {
    if (!isVisible) {
      onClose();
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
      style={{
        backdropFilter: "blur(12px)",
      }}
    >
      <motion.div
        ref={notificationRef}
        className={`relative w-[98%] sm:w-9/12 dark:bg-[#14141a] bg-white rounded-xl p-4 overflow-y-auto`}
        initial={{ scale: 0 }}
        animate={{ scale: isVisible ? 1 : 0 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={`flex items-center justify-between pb-2 border-b-2 border-[#545e7b]`}>
          <div className="font-bold text-lg sm:text-2xl dark:text-white">
            Danh sách phương tiện
          </div>
          <Button className="w-8 h-8 rounded-full hover:bg-gray-300" onClick={handleClose}>
            <IoMdClose className="w-5/6 h-5/6 " />
          </Button>
        </div>
        {info && (info?.role === "ADMIN" || info?.role === "MANAGER" || info?.role === "HUMAN_RESOURCE_MANAGER") && (
          <div className="flex flex-col lg:flex-row mt-4 gap-2 dark:text-white">
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
                Tìm kiếm theo mã phương tiện
              </label>
            </div>
            <div className="flex">
              <BasicPopover icon={<MdLocationSearching className="mx-1" />} className="ml-0" name="Tìm theo tuyến">
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
              </BasicPopover>
              <BasicPopover
                icon={<MdTimelapse className="mx-1" />}
                name="Tìm theo khung giờ"
              >
                <div className="flex flex-col gap-4 mt-4">
                  <div className="flex flex-col">
                    <label htmlFor="departureTime" className="text-sm font-medium dark:text-white">
                      Giờ khởi hành
                    </label>
                    <ClockPicker
                      clearIcon={null}
                      maxDetail="second"
                      id="departureTime"
                      value={departureTime}
                      onChange={(value) => setDepartureTime(formatTime(value.toString()))}
                      clockIcon={null}
                      className={`border border-gray-300 rounded-md px-6 py-2 focus:outline-none focus:border-blue-500 dark:text-white`}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="arrivalTime" className="text-sm font-medium dark:text-white">
                      Giờ cập bến
                    </label>
                    <ClockPicker
                      clearIcon={null}
                      maxDetail="second"
                      id="arrivalTime"
                      value={arrivalTime}
                      onChange={(value) => setArrivalTime(formatTime(value.toString()))}
                      clockIcon={null}
                      className={`border border-gray-300 rounded-md px-6 py-2 focus:outline-none focus:border-blue-500 dark:text-white`}
                    />
                  </div>
                </div>
              </BasicPopover>
              <Button
                onClick={fetchDemoPage}
                className={`h-10 ml-2 w-full rounded-md border-green-700 hover:bg-green-700 text-green-500
                  bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border 
                  hover:shadow-md`}
              >
                <span className="block px-6">
                  Áp dụng
                </span>
              </Button>
            </div>

          </div>
        )}
        <div className="h-screen_3/5 overflow-y-scroll border border-[#545e7b] mt-4 no-scrollbar  dark:bg-[#14141a] p-2 rounded-md dark:text-white ">
          {demoPage}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TaskMenu;
