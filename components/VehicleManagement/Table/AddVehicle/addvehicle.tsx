import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import {
  StaffsOperation,
  VehicleOperation,
  CreatingVehicleByAdminInfo,
  CreatingVehicleByAgencyInfo,
} from "@/TDLib/tdlogistics";
import { set } from "date-fns";

interface AddVehicleProps {
  onClose: () => void;
  reloadData: () => void;
}

const AddVehicle: React.FC<AddVehicleProps> = ({ onClose, reloadData }) => {
  const staff = new StaffsOperation();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await staff.getAuthenticatedStaffInfo();
      setRole(res.data.role);
    };

    fetchData();
  }, []);

  const [isShaking, setIsShaking] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  const [Vehicledata, setVehicledata] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (role === "ADMIN") {
        setVehicledata({
          agency_id: "",
          transport_partner_id: "",
          staff_id: "",
          type: "",
          license_plate: "",
          max_load: 0,
        });
      } else {
        setVehicledata({
          transport_partner_id: "",
          staff_id: "",
          type: "",
          license_plate: "",
          max_load: 0,
        });
      }
    };
    fetchData();
  }, [role]);

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

  const handleInputChange = (key: string, value: any) => {
    setVehicledata((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const [checkmissing, setCheckmissing] = useState(
    role === "ADMIN"
      ? {
          agency_id: false,
          transport_partner_id: false,
          staff_id: false,
          type: false,
          license_plate: false,
          max_load: false,
        }
      : {
          transport_partner_id: false,
          staff_id: false,
          type: false,
          license_plate: false,
          max_load: false,
        }
  );
  const handleCheckMissing = (key: string, value: boolean) => {
    setCheckmissing((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const [error, setError] = useState("");
  const vehicle = new VehicleOperation();
  const handleSubmit = async () => {
    let check = true;
    console.log(Vehicledata);
    for (let key in Vehicledata) {
      if (key === "max_load" && Vehicledata[key] < 0) {
        handleCheckMissing(key, true);
        check = false;
      }

      if (Vehicledata[key] === "") {
        handleCheckMissing(key, true);
        check = false;
      } else {
        handleCheckMissing(key, false);
      }
    }
    if (!check) {
      setError("Vui lòng nhập đầy đủ thông tin");
    } else {
      setError("");
      if (role === "ADMIN") {
        const submit: CreatingVehicleByAdminInfo = {
          agency_id: Vehicledata.agency_id,
          transport_partner_id: Vehicledata.transport_partner_id,
          staff_id: Vehicledata.staff_id,
          type: Vehicledata.type,
          license_plate: Vehicledata.license_plate,
          max_load: parseInt(Vehicledata.max_load),
        };
        try {
          const response = await vehicle.createByAdmin(submit);
          if (response.error === true) {
            alert(response.message);
          } else {
            alert("Thêm phương tiện thành công");
            setVehicledata({
              agency_id: "",
              transport_partner_id: "",
              staff_id: "",
              type: "",
              license_plate: "",
              max_load: 0,
            });
            reloadData();
          }
        } catch (e) {
          alert("Đã xảy ra lỗi hệ thống, vui lòng thử lại sau!");
        }
      } else {
        const submit: CreatingVehicleByAgencyInfo = {
          transport_partner_id: Vehicledata.transport_partner_id,
          staff_id: Vehicledata.staff_id,
          type: Vehicledata.type,
          license_plate: Vehicledata.license_plate,
          max_load: parseInt(Vehicledata.max_load),
        };
        try {
          const response = await vehicle.createByAgency(submit);
          if (response.error === true) {
            setError(response.message);
          } else {
            alert("Thêm phương tiện thành công");
            setVehicledata({
              transport_partner_id: "",
              staff_id: "",
              type: "",
              license_plate: "",
              max_load: 0,
            });
            reloadData();
          }
        } catch (e) {
          alert("Đã xảy ra lỗi hệ thống, vui lòng thử lại sau!");
        }
      }
    }
  };

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-60 z-50 `}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={handleAnimationComplete}
      style={{ backdropFilter: "blur(12px)" }}
    >
      <motion.div
        ref={notificationRef}
        className={`relative w-[98%] sm:w-9/12 lg:w-1/2 dark:bg-[#14141a] bg-white rounded-xl p-4 overflow-y-auto ${
          isShaking ? "animate-shake" : ""
        }`}
        initial={{ scale: 0 }}
        animate={{ scale: isVisible ? 1 : 0 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative items-center justify-center flex-col flex h-10 w-full border-b-2 border-[#545e7b]">
          <div className="font-bold text-lg sm:text-2xl pb-2 text-black dark:text-white w-full text-center">
            Thêm phương tiện
          </div>
          <Button
            className="absolute right-0 w-8 h-8 rounded-full mb-2 hover:bg-gray-300"
            onClick={handleClose}
          >
            <IoMdClose className="w-5/6 h-5/6" />
          </Button>
        </div>
        <div className="h-screen_3/5 overflow-y-scroll border border-[#545e7b] mt-4 no-scrollbar flex flex-col items-center bg-white dark:bg-[#14141a] p-2 rounded-md text-black dark:text-white">
          <h1 className="font-semibold pb-2 text-center">
            Thông tin phương tiện
          </h1>
          <div className="w-[98%] sm:w-10/12 grid grid-rows-2 ">
            <div className="flex gap-3">
              {role === "ADMIN" && (
                <div className="w-full">
                  <div className="text-center dark:text-white">
                    Mã đại lý/bưu cục
                  </div>
                  <input
                    type=""
                    className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.agency_id ? "border-red-500" : ""}`}
                    placeholder="VD: TD_00000_077165007713"
                    onChange={(e) =>
                      handleInputChange("agency_id", e.target.value)
                    }
                  />
                </div>
              )}
              <div className="w-full">
                <div className="text-center dark:text-white">
                  Mã đối tác vận tải
                </div>
                <input
                  type=""
                  className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.transport_partner_id ? "border-red-500" : ""}`}
                  placeholder="VD: TD_00000_077165007713"
                  onChange={(e) =>
                    handleInputChange("transport_partner_id", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="flex gap-3 mt-3">
              <div className="w-full">
                <div className="text-center dark:text-white">Mã nhân viên</div>
                <input
                  type=""
                  className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.staff_id ? "border-red-500" : ""}`}
                  placeholder="VD: TD_00000_077204005682"
                  onChange={(e) =>
                    handleInputChange("staff_id", e.target.value)
                  }
                />
              </div>
              <div className="w-full">
                <div className="text-center dark:text-white">Biển số xe</div>
                <input
                  type=""
                  className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.license_plate ? "border-red-500" : ""}`}
                  placeholder="VD: Biển số xe"
                  onChange={(e) =>
                    handleInputChange("license_plate", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="flex gap-3 mt-3">
              <div className="w-full">
                <div className="text-center dark:text-white">Loại xe</div>
                <input
                  type=""
                  className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.type ? "border-red-500" : ""}`}
                  placeholder="VD: Loại xe"
                  onChange={(e) => handleInputChange("type", e.target.value)}
                />
              </div>
              <div className="w-full">
                <div className="text-center dark:text-white">
                  Tải trọng tối đa
                </div>
                <input
                  type="number"
                  className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${
                  checkmissing.max_load || Vehicledata.max_load === 0
                    ? "border-red-500"
                    : ""
                }`}
                  placeholder="VD: Kg"
                  onChange={(e) =>
                    handleInputChange("max_load", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <Button
          className="w-full rounded-lg mt-5 mb-1 py-3 border-green-700 hover:bg-green-700 text-green-500
        bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border hover:shadow-md"
          onClick={handleSubmit}
        >
          <span className="hidden xs:block">Thêm phương tiện</span>
        </Button>
        <div className=" flex place-content-center text-red-500 font-bold ">
          {<p>{error}</p>}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AddVehicle;
