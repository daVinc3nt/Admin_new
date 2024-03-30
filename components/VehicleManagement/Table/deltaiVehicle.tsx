import React, { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import { FaTrash, FaPen } from "react-icons/fa";
import { User, Pencil } from "lucide-react";
import {
  StaffsOperation,
  VehicleOperation,
  UpdatingVehicleCondition,
  UpdatingVehicleInfo,
  GettingShipmentsContainedByVehicleCondition,
  AddingShipmentsToVehicleCondition,
  AddingShipmentsToVehicleInfo,
  DeletingShipmentsFromVehicleCondition,
  DeletingShipmentsFromVehicleInfo,
  CheckingExistVehicleCondition,
  FindingShipmentConditions,
  ShipmentsOperation,
  ShipmentID,
} from "@/TDLib/tdlogistics";
import { set } from "date-fns";
interface VehicleData {
  transport_partner_id: string;
  agency_id: string;
  staff_id: string;
  max_load: string;
  license_plate: string;
  busy: boolean;
  type: string;
  vehicle_id: string;
  mass: string;
  agency_name: string;
  transport_partner_name: string;
  fullname: string;
}

interface DetailVehicleProps {
  onClose: () => void;
  dataInitial: VehicleData;
}

const DetailVehicle: React.FC<DetailVehicleProps> = ({
  onClose,
  dataInitial,
}) => {
  const [isShaking, setIsShaking] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

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
  const [ShipmentData, setShipmentData] = useState([]); // [{}
  const [Shipment, setShipment] = useState([{}]);
  useEffect(() => {
    const fetchShipment = async () => {
      const temp = new ShipmentsOperation();
      try {
        const response = await temp.get({});
        if (response.error == true) {
        } else {
          console.log("Data Ma lo hang", response);
          response.data.map((item: any) => {
            ShipmentData.push(item.shipment_id);
          });
          console.log("Data Ma lo hang", ShipmentData);
        }
      } catch (e) {
        alert(
          "Đã xảy ra lỗi hệ thống khi lấy mã lô hàng, vui lòng thử lại sau!"
        );
      }
    };
    fetchShipment();
  }, []);
  const fetchShipment = async () => {
    const vehicle = new VehicleOperation();
    const condition: GettingShipmentsContainedByVehicleCondition = {
      vehicle_id: dataInitial.vehicle_id,
    };
    const response = await vehicle.getShipment(condition);
    console.log(response);
    if (response.error == true) {
      setShipment(response.data);
    }
  };

  useEffect(() => {
    fetchShipment();
  }, []);

  const [VehicleData, setVehicleData] = useState({
    transport_partner_id: dataInitial.transport_partner_id,
    agency_id: dataInitial.agency_id,
    staff_id: dataInitial.staff_id,
    max_load: dataInitial.max_load,
    license_plate: dataInitial.license_plate,
    busy: dataInitial.busy,
    type: dataInitial.type,
    vehicle_id: dataInitial.vehicle_id,
    mass: dataInitial.mass,
    agency_name: dataInitial.agency_name,
    transport_partner_name: dataInitial.transport_partner_name,
    fullname: dataInitial.fullname,
  });
  console.log(dataInitial);

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
    const vehicle = new VehicleOperation();
    const Info: UpdatingVehicleInfo = {
      transport_partner_id: VehicleData.transport_partner_id,
      staff_id: VehicleData.staff_id,
      type: VehicleData.type,
      max_load: parseInt(VehicleData.max_load),
    };
    const condition: UpdatingVehicleCondition = {
      vehicle_id: VehicleData.vehicle_id,
    };
    console.log(Info);
    console.log(condition);
    const response = await vehicle.update(Info, condition);
    console.log(response);
    alert(response.message);
    setIsEditing(false);
    fetchShipment();
  };

  const [shipmentValue, setshipmentValue] = useState("");

  const [Error2, setError2] = useState("");
  const handleAddShipment = async () => {
    const shipment = new ShipmentsOperation();
    const checkExist: ShipmentID = {
      shipment_id: shipmentValue,
    };
    try {
      const check = await shipment.check(checkExist);
      console.log("check", check);

      if (check.error == true) {
        setError2(check.message);
        alert(check.message);
        return;
      } else if (check.existed == true) {
        setError2("Lô hàng đã tồn tại trong phương tiện");
        alert("Lô hàng đã tồn tại trong phương tiện");
        return;
      }
    } catch (e) {
      console.log(e);
      alert("Đã xảy ra lỗi hệ thống, vui lòng thử lại sau!");
    }
    const vehicle = new VehicleOperation();
    const Info: AddingShipmentsToVehicleInfo = {
      shipment_ids: [shipmentValue],
    };
    const condition: AddingShipmentsToVehicleCondition = {
      vehicle_id: VehicleData.vehicle_id,
    };
    console.log(Info.shipment_ids);
    try {
      const response = await vehicle.addShipments(Info, condition);
      console.log(response);
      if (response.info.acceptedNumber == 0) {
        // setError2("Lô hàng đã tồn tại trong phương tiện");
        alert("Lô hàng đã tồn tại trong phương tiện");
        return;
      }
      if (response.error === true) {
        setError2(response.message);
        alert(response.message);
        return;
      }
      alert(response.message);
      setshipmentValue("");
      fetchShipment();
    } catch (e) {
      console.log(e);
      alert("Đã xảy ra lỗi hệ thống, vui lòng thử lại sau!");
    }
  };
  const handleDeleteShipment = async (shipment_id: string) => {
    const vehicle = new VehicleOperation();
    const condition: DeletingShipmentsFromVehicleCondition = {
      vehicle_id: VehicleData.vehicle_id,
    };
    const Info: DeletingShipmentsFromVehicleInfo = {
      shipment_ids: [shipment_id],
    };
    const response = await vehicle.deleteShipments(Info, condition);
    console.log(response);
    if (response.error == false) {
      alert(response.message);
      fetchShipment();
      return;
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
      style={{
        backdropFilter: "blur(12px)",
      }}
    >
      <motion.div
        ref={notificationRef}
        className={`relative w-[98%] sm:w-9/12 dark:bg-[#14141a] bg-white rounded-xl p-4 overflow-y-scroll
          ${isShaking ? "animate-shake" : ""}`}
        initial={{ scale: 0 }}
        animate={{ scale: isVisible ? 1 : 0 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative items-center justify-center flex-col flex h-10 w-full border-b-2 border-[#545e7b]">
          <div className="font-bold text-lg sm:text-2xl pb-2 text-black dark:text-white w-full text-center">
            Thông tin phương tiện
          </div>
          <Button
            className="absolute right-0 w-8 h-8 rounded-full mb-2 hover:bg-gray-300"
            onClick={handleClose}
          >
            <IoMdClose className="w-5/6 h-5/6 " />
          </Button>
        </div>
        <div className="h-screen_3/5 overflow-y-scroll border border-[#545e7b] mt-4 no-scrollbar  dark:bg-[#14141a] bg-white p-2 rounded-md text-black dark:text-white place-content-center">
          <div className=" grid grid-cols-2 place-content-around  gap-3 my-5 mx-5 ">
            <div className="flex gap-5 place-content-start">
              <div className="font-bold text-base">Mã đối tác vận tải</div>
              {isEditing ? (
                <input
                  className="w-1/2 bg-transparent border-b-2 border-[#545e7b] text-black dark:text-white"
                  type="text"
                  value={VehicleData.transport_partner_id}
                  onChange={(e) =>
                    setVehicleData({
                      ...VehicleData,
                      transport_partner_id: e.target.value,
                    })
                  }
                />
              ) : (
                <div>{VehicleData.transport_partner_id}</div>
              )}
            </div>
            <div className="flex gap-5 place-content-start ">
              <div className="font-bold text-base">Tên đối tác vận tải</div>
              <div>{VehicleData.transport_partner_name}</div>
            </div>
            <div className="flex gap-5 place-content-start">
              <div className="font-bold text-base">Mã đại lý</div>
              <div>{VehicleData.agency_id}</div>
            </div>
            <div className="flex gap-5 place-content-start">
              <div className="font-bold text-base">Tên đại lý</div>
              <div>{VehicleData.agency_name}</div>
            </div>
            <div className="flex gap-5 place-content-start">
              <div className="font-bold text-base">Mã nhân viên</div>
              {isEditing ? (
                <input
                  className="w-1/2 bg-transparent border-b-2 border-[#545e7b] text-black dark:text-white"
                  type="text"
                  value={VehicleData.staff_id}
                  onChange={(e) =>
                    setVehicleData({ ...VehicleData, staff_id: e.target.value })
                  }
                />
              ) : (
                <div>{VehicleData.staff_id}</div>
              )}
            </div>
            <div className="flex gap-5 place-content-start">
              <div className="font-bold text-base">Tên nhân viên</div>
              <div>{VehicleData.fullname}</div>
            </div>
            <div className="flex gap-5 place-content-start">
              <div className="font-bold text-base">Trọng tải tối đa</div>
              {isEditing ? (
                <input
                  className="w-1/2 bg-transparent border-b-2 border-[#545e7b] text-black dark:text-white"
                  type="text"
                  value={VehicleData.max_load}
                  onChange={(e) =>
                    setVehicleData({ ...VehicleData, max_load: e.target.value })
                  }
                />
              ) : (
                <div>{VehicleData.max_load}</div>
              )}
            </div>
            <div className="flex gap-5 place-content-start">
              <div className="font-bold text-base">Biển kiểm soát</div>
              <div>{VehicleData.license_plate}</div>
            </div>
            <div className="flex gap-5 place-content-start">
              <div className="font-bold text-base">Loại phương tiện</div>
              {isEditing ? (
                <input
                  className="w-1/2 bg-transparent border-b-2 border-[#545e7b] text-black dark:text-white"
                  type="text"
                  value={VehicleData.type}
                  onChange={(e) =>
                    setVehicleData({ ...VehicleData, type: e.target.value })
                  }
                />
              ) : (
                <div>{VehicleData.type}</div>
              )}
            </div>
            <div className="flex gap-5 place-content-start">
              <div className="font-bold text-base">Trạng thái</div>
              <div>{VehicleData.busy ? "Đang bận" : "Sẵn sàng"}</div>
            </div>
            <div className="flex gap-5 place-content-start">
              <div className="font-bold text-base">Tải trọng hiện tại</div>
              <div>{VehicleData.mass}</div>
            </div>
          </div>
          <div className="flex place-content-center text-xl font-bold ">
            Chi tiết phương tiện
          </div>
          <div className="grid grid-cols-2 h-60 overflow-y-scroll">
            <div className="overflow-y-scroll grid grid-cols gap-3 my-5 mx-5">
              <div className=" gap-5 place-content-center mt-2">
                <div className="font-bold text-base">Danh sách lô hàng :</div>
                <div className="relative flex flex-col w-full   text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
                  <table className="w-full text-left table-auto min-w-max">
                    <thead>
                      <tr>
                        <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                          <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Mã lô hàng
                          </p>
                        </th>
                        <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                          <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Thêm
                          </p>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {ShipmentData ? (
                        ShipmentData.map((item: any) => {
                          console.log(item);
                          return (
                            <tr className="">
                              <td className="p-4 border-b border-blue-gray-50">
                                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                  {item}
                                </p>
                              </td>
                              <td className="p-4 border-b border-blue-gray-50 text-xl">
                                <button
                                  onClick={() => {
                                    
                                    setshipmentValue(item);

                                    handleAddShipment();
                                  }}
                                >
                                  +
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <div>Không có lô hàng nào</div>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="overflow-y-scroll grid grid-cols  gap-3 my-5 mx-5">
              <div className=" gap-5 place-content-center">
                <div className="font-bold text-base">
                  Danh sách lô hàng đã thêm:
                </div>
                <div className="flex-col mt-2">
                  <div className="flex">
                    <input
                      type="string"
                      className="text-xs md:text-sm border border-gray-600 rounded dark:bg-[#14141a] h-10 p-2 w-full"
                      placeholder="Nhập mã lô hàng"
                      value={shipmentValue}
                      onChange={(e) => setshipmentValue(e.target.value)}
                    />
                    <button
                      className="text-xs md:text-sm border border-gray-600 rounded dark:bg-[#14141a] h-10 ml-2 w-1/3 bg-green-500 text-white hover:bg-green-700"
                      onClick={() => {
                        if (shipmentValue.trim() !== "") {
                          handleAddShipment();
                        }
                      }}
                    >
                      Thêm
                    </button>
                  </div>
                  <div className="text-red-500">{Error2}</div>
                </div>
                <div className="relative flex flex-col w-full   text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
                  <table className="w-full text-left table-auto min-w-max">
                    <thead>
                      <tr>
                        <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                          <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Mã lô hàng
                          </p>
                        </th>
                        <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                          <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Xóa
                          </p>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Shipment ? (
                        Shipment.map((item: any) => {
                          console.log(item);
                          return (
                            <tr className="">
                              <td className="p-4 border-b border-blue-gray-50">
                                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                  {item.shipment_id}
                                </p>
                              </td>
                              <td className="p-4 border-b border-blue-gray-50 ">
                                <button
                                  onClick={() => {
                                    handleDeleteShipment(item.shipment_id);
                                  }}
                                >
                                  <FaTrash className="w-5 h-5" />
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <div>Không có lô hàng nào</div>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex">
          {!isEditing ? (
            <Button
              className="w-full rounded-lg mt-5 mb-1 py-3 border-green-700 hover:bg-green-700 text-green-500
              bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white dark:text-white border 
              hover:shadow-md"
              onClick={handleEditClick}
            >
              <FaPen className="xs:mr-2" />
              <span className="hidden xs:block">Chỉnh sửa</span>
            </Button>
          ) : (
            <Button
              className="w-full rounded-lg mt-5 mb-1 py-3 border-green-700 hover:bg-green-700 text-green-500
    bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white dark:text-white border 
    hover:shadow-md"
              onClick={handleSaveClick}
            >
              <FaPen className="xs:mr-2" />
              <span className="hidden xs:block">Lưu</span>
            </Button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DetailVehicle;
