import React, { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import { FaTrash, FaPen } from "react-icons/fa";
import { FormattedMessage, useIntl } from "react-intl";
import DetailShipment from "./detailShipment";
import NotiPopup from "@/components/Common/NotiPopup";
import {
  ShipmentsOperation,
  ShippersOperation,
  CreatingNewShipperTasksInfo,
  GettingTasksCondition,
} from "@/TDLib/tdlogistics";
import { set } from "date-fns";
import { on } from "events";

interface ShipperDetail {
  agency_id: string;
  agency_name: string;
  busy: number;
  created_at: string;
  fullname: string;
  last_update: string;
  license_plate: string;
  mass: number;
  max_load: number;
  staff_id: string;
  transport_partner_id: string;
  transport_partner_name: string;
  type: string;
  vehicle_id: string;
}
interface DetailShipmentProps {
  agency_id: string;
  created_at: string;
  order_ids: string[];
  last_update: string;
  journey_id: string;
  mass: number;
  staff_id: string;
  transport_partner_id: string;
  vehicle_id: string;
  current_agency_id: string;
  current_lat: string;
  current_long: string;
}

interface DetailDriverProps {
  onClose: () => void;
  dataInitial: ShipperDetail;
  reloadData: () => void;
  info: any;
}

const DetailShipper: React.FC<DetailDriverProps> = ({
  onClose,
  dataInitial,
  reloadData,
  info,
}) => {
  const intl = useIntl();
  const [isShaking, setIsShaking] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [dataShipments, setDataShipments] = useState<any>([]);
  const [dataShipmentsUpdate, setDataShipmentsUpdate] = useState<any>([]);
  const [shipmentcurrent, setShipmentcurrent] = useState<any>([]);
  const [openModalId, setOpenModalId] = useState(null);
  const [openNoti, setOpenNoti] = useState(false);
  const [notiMessage, setNotiMessage] = useState("");
  const onClickNoti = (message: string) => {
    setNotiMessage(message);
    setOpenNoti(true);
  };
  onClose = () => {
    setOpenNoti(false);
  };

  const fetchData = async () => {
    const OJ = new ShipmentsOperation();
    try {
      const response = await OJ.get({});
      if (response.error) {
        onClickNoti(response.message);
        return;
      }
      // console.log("Response Shipment", response);
      setDataShipments(response.data);
    } catch (e) {
      onClickNoti("Error: " + e);
    }
    const OJ2 = new ShippersOperation();
    try {
      const IDfind: GettingTasksCondition = {
        staff_id: dataInitial.staff_id,
        option: 0,
      };
      // console.log("IDfind", IDfind);
      const response = await OJ2.getTask(IDfind);
      if (response.error) {
        alert(response.message);
        return;
      }
      // console.log("Response Task", response);
      setShipmentcurrent(response.data);
    } catch (e) {
      onClickNoti("Error: " + e);
    }
  };
  const handleChangeOption = async (e: any) => {
    const OJ2 = new ShippersOperation();
    try {
      const IDfind: GettingTasksCondition = {
        staff_id: dataInitial.staff_id,
        option: parseInt(e),
      };
      // console.log("IDfind", IDfind);
      const response = await OJ2.getTask(IDfind);
      if (response.error) {
        onClickNoti(response.message);
        return;
      }
      setShipmentcurrent(response.data);
    } catch (e) {
      onClickNoti("Error: " + e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target as Node)
    ) {
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
  const [isEditing, setIsEditing] = useState(false);
  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleSaveClick = async () => {
    try {
      setIsEditing(false);
      fetchData();
    } catch (e) {
      onClickNoti("Error: " + e);
      setIsEditing(false);
    }
  };

  const handleDeleteShipment = async (id: number) => {};

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
        className={`relative w-[98%] sm:w-9/12 dark:bg-[#14141a] bg-white rounded-xl p-4 overflow-y-auto
          ${isShaking ? "animate-shake" : ""}`}
        initial={{ scale: 0 }}
        animate={{ scale: isVisible ? 1 : 0 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative items-center justify-center flex-col flex h-10 w-full border-b-2 border-[#545e7b]">
          <div className="font-bold text-lg sm:text-2xl pb-2 dark:text-white w-full text-center">
            Thông tin chi tiết
          </div>
          <Button
            className="absolute right-0 w-8 h-8 rounded-full mb-2 hover:bg-gray-300"
            onClick={handleClose}
          >
            <IoMdClose className="w-5/6 h-5/6 " />
          </Button>
        </div>
        <div className="h-screen_3/5 overflow-y-scroll border border-[#545e7b] mt-4 no-scrollbar  dark:bg-[#14141a] p-2 rounded-md dark:text-white ">
          <div className="grid md:grid-cols-2 gap-4 w-full">
            <div className="flex flex-col">
              <div className="font-bold text-lg dark:text-white">
                <FormattedMessage id="Full Name" />
              </div>
              <input
                className="border border-gray-600 rounded-lg p-2 dark:bg-[#14141a] dark:text-white"
                type="text"
                value={dataInitial.fullname}
                disabled={!isEditing}
              />
            </div>
            <div className="flex flex-col">
              <div className="font-bold text-lg dark:text-white">
                <FormattedMessage id="License Plate" />
              </div>
              <input
                className="border border-gray-600 rounded-lg p-2 dark:bg-[#14141a] dark:text-white"
                type="text"
                value={dataInitial.license_plate}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <div className="text-center flex place-items-center justify-center items-center place-content-center  font-bold text-xl ">
              Lô hàng{" "}
              <div className="ml-2">
                <select
                  className="border w-28 border-gray-600 text-base rounded-lg p-2 dark:bg-[#14141a] dark:text-white"
                  onChange={(e) => handleChangeOption(e.target.value)}
                >
                  <option value="0">Tất cả</option>
                  <option value="1">Hôm nay</option>
                  <option value="2">Tuần này</option>
                </select>
              </div>
            </div>
            <table className="table-auto w-full border border-gray-200">
              <thead>
                <tr>
                  <th className="border border-gray-200">ID </th>
                  <th className="border border-gray-200">Trạng thái </th>
                  <th className="border border-gray-200">Khối lượng </th>
                  <th className="border border-gray-200">Chi tiết </th>
                  {isEditing ? (
                    <th className="border border-gray-200">Xóa</th>
                  ) : (
                    ""
                  )}
                </tr>
              </thead>
              <tbody>
                {shipmentcurrent.map((item: any, index) => (
                  <tr key={item.id} className="border border-gray-200">
                    <td className="text-center border border-gray-200">
                      {item.shipment_id}
                    </td>
                    <td className="text-center border border-gray-200">
                      {item.parent === null ? "Chưa tiếp nhận" : "Đã tiếp nhận"}
                    </td>
                    <td className="text-center border border-gray-200">
                      {item.shipment.mass} kg
                    </td>

                    <td className="text-center border border-gray-200">
                      <Button
                        className="delay-50  w-10 rounded-lg  bg-blue-500
      py-1   text-white  drop-shadow-md
      transition duration-200
      ease-in-out hover:translate-x-px hover:scale-110
      hover:bg-blue-400 hover:shadow-md
      hover:drop-shadow-xl "
                        onClick={() => setOpenModalId(item.shipment_id)}
                      >
                        ...
                      </Button>
                    </td>
                    {isEditing ? (
                      <td className="flex items-center place-content-center border border-gray-200">
                        <Button
                          className="delay-50  w-10 rounded-lg  bg-red-500
        py-1   text-white  drop-shadow-md
        transition duration-200
        ease-in-out hover:translate-x-px hover:scale-110
        hover:bg-red-400 hover:shadow-md
        hover:drop-shadow-xl "
                          onClick={async () => handleDeleteShipment(item.id)}
                        >
                          -
                        </Button>
                      </td>
                    ) : (
                      ""
                    )}
                    {openModalId === item.shipment_id && (
                      <DetailShipment
                        onClose={() => setOpenModalId(null)}
                        dataInitial={item.shipment}
                      />
                    )}
                    {openNoti ? (
                      <NotiPopup message={notiMessage} onClose={onClose} />
                    ) : (
                      ""
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="w-full flex">
          {!isEditing ? (
            <Button
              className="w-full rounded-lg mt-5 mb-1 py-3 border-yellow-700 hover:bg-yellow-700 text-yellow-500
    bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border
    hover:shadow-md"
              onClick={handleEditClick}
            >
              <FaPen className="xs:mr-2" />
              <span className="hidden xs:block">Thêm lô hàng</span>
            </Button>
          ) : (
            ""
          )}
          {isEditing ? (
            <Button
              className="w-full rounded-lg mt-5 mb-1 py-3 border-green-700 hover:bg-green-700 text-green-500
    bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border 
    hover:shadow-md"
              onClick={handleSaveClick}
            >
              <FaPen className="xs:mr-2" />
              <span className="hidden xs:block">
                <FormattedMessage id="Save" />
              </span>
            </Button>
          ) : (
            ""
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DetailShipper;
