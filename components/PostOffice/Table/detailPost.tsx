import React, { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import { FaTrash, FaPen } from "react-icons/fa";
import { FormattedMessage, useIntl } from "react-intl";
import Dropzone from "./Dropzone";
import Image from "next/image";
import BackupIcon from "@mui/icons-material/Backup";
import {
  StaffsOperation,
  AgencyOperation,
  UpdatingAgencyCondition,
  UpdatingAgencyInfo,
  AdministrativeOperation,
  AdministrativeInfo,
  UpdatingLicenseInfo,
} from "@/TDLib/tdlogistics";
import NotiPopup from "@/components/Common/NotiPopup";

interface Postdetail {
  agency_id: string;
  agency_name: string;
  bank: string;
  bin: string;
  commission_rate: string;
  contract: string;
  detail_address: string;
  district: string;
  email: string;
  latitude: string;
  level: string;
  longitude: string;
  managed_wards: string[];
  phone_number: string;
  postal_code: string;
  province: string;
  town: string;
  revenue: string;
}

interface DetailAgencyProps {
  onClose: () => void;
  dataInitial: Postdetail;
  reloadData: () => void;
  info: any;
}

const DetailPost: React.FC<DetailAgencyProps> = ({
  onClose,
  dataInitial,
  reloadData,
  info,
}) => {
  const intl = useIntl();
  const [isShaking, setIsShaking] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  const [message, setMessage] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const onClick = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  // const [fileLicense, setFileLicense] = useState([]);
  // const [fileLicenseUpdate, setFileLicenseUpdate] = useState([]);
  const a: AdministrativeInfo = {
    province: "",
  };
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  const adminOperation = new AdministrativeOperation();

  useEffect(() => {
    const fetchData = async () => {
      const response = await adminOperation.get({});
      // console.log("Tỉnh", response);
      setProvinces(response.data);
    };
    fetchData();
  }, []);
  // const handleSubmit = async () => {
  // console.log("File", fileLicenseUpdate);
  //   const orders = new AgencyOperation();
  //   if (!fileLicenseUpdate) {
  //     alert("Please select at least one file.");
  //     return;
  //   }
  //   let condition: UpdatingAgencyCondition = {
  //     agency_id: dataInitial.agency_id,
  //   };

  //   let updatingOrderInfo: UpdatingLicenseInfo = {
  //     licenseFiles: fileLicenseUpdate as unknown as FileList,
  //   };

  //   try {
  //     const result = await orders.updateLicense(updatingOrderInfo, condition);
  // console.log("Result", result);
  //     if (result.error) {
  //       alert(result.message);
  //     }
  //     reloadIMG();
  //     alert("Cập nhật thành công");
  //     setFileLicenseUpdate([]);
  //   } catch (error) {
  // console.error("Error:", error);
  //   }
  // };
  // const fetchIMG = async () => {
  //   const a = new AgencyOperation();
  //   const findID: UpdatingAgencyCondition = {
  //     agency_id: dataInitial.agency_id,
  //   };
  // console.log("ID", findID);
  //   try {
  //     const response = await a.findLicense(findID);
  //     setFileLicense(response);
  // console.log("Agency", response);
  //   } catch (error) {
  // console.log(error);
  //   }
  // };
  // const reloadIMG = async () => {
  //   fetchIMG();
  // };
  // useEffect(() => {
  //   fetchIMG();
  // }, [dataInitial]);

  const handleProvinceChange = async (e) => {
    setSelectedProvince(e.target.value);
    a.province = e.target.value;
    handleInputChange("user_province", e.target.value);
    // console.log(a);
    const response = await adminOperation.get(a);
    // console.log("Quận", response);
    setDistricts(response.data);
  };

  const handleDistrictChange = async (e) => {
    setSelectedDistrict(e.target.value);
    a.province = selectedProvince;
    a.district = e.target.value;
    handleInputChange("user_district", e.target.value);
    // console.log(a);
    const response = await adminOperation.get(a);
    // console.log("Xã", response);
    setWards(response.data);
  };
  const handleWardChange = (e) => {
    setSelectedWard(e.target.value);
    handleInputChange("user_town", e.target.value);
  };
  const [Agencydata, setAgencydata] = useState({
    agency_id: dataInitial.agency_id,
    agency_name: dataInitial.agency_name,
    bank: dataInitial.bank,
    bin: dataInitial.bin,
    commission_rate: dataInitial.commission_rate,
    contract: dataInitial.contract,
    detail_address: dataInitial.detail_address,
    district: dataInitial.district,
    email: dataInitial.email,
    latitude: dataInitial.latitude,
    level: dataInitial.level,
    longitude: dataInitial.longitude,
    managed_wards: dataInitial.managed_wards,
    phone_number: dataInitial.phone_number,
    postal_code: dataInitial.postal_code,
    province: dataInitial.province,
    town: dataInitial.town,
    revenue: dataInitial.revenue,
  });

  const handleInputChange = (key: string, value: string) => {
    setAgencydata((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

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
  const [error, setError] = useState("");
  const handleSaveClick = async () => {
    const updateAgency = new AgencyOperation();

    const data: UpdatingAgencyInfo = {
      agency_name: Agencydata.agency_name,
      province: Agencydata.province,
      district: Agencydata.district,
      town: Agencydata.town,
      detail_address: Agencydata.detail_address,
      latitude: Agencydata.latitude,
      longitude: Agencydata.longitude,
      email: Agencydata.email,
      phone_number: Agencydata.phone_number,
      revenue: Agencydata.revenue,
      commission_rate: Agencydata.commission_rate,
      bin: Agencydata.bin,
      bank: Agencydata.bank,
    };
    if (
      info.role === "ADMIN" ||
      info.role === "MANAGER" ||
      info.role === "HUMAN_RESOURCE_MANAGER"
    ) {
      const condition: UpdatingAgencyCondition = {
        agency_id: dataInitial.agency_id,
      };
      try {
        const response = await updateAgency.update(data, condition);
        console.log("hi", response);
        if (response.error.error) {
          setMessage(response.error.message);
          onClick();
        } else {
          setMessage(response.error.message);
          onClick();
          reloadData();
        }
      } catch (e) {
        setMessage("Có lỗi xảy ra");
        onClick();
      }
    }

    setIsEditing(false);
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
        className={`relative w-[98%] sm:w-9/12 dark:bg-[#14141a] bg-white rounded-xl p-4 overflow-y-auto
          ${isShaking ? "animate-shake" : ""}`}
        initial={{ scale: 0 }}
        animate={{ scale: isVisible ? 1 : 0 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative items-center justify-center flex-col flex h-10 w-full border-b-2 border-[#545e7b]">
          <div className="font-bold text-lg sm:text-2xl pb-2 dark:text-white w-full text-center">
            <FormattedMessage id="PostOffice.Infomation" />
          </div>
          <Button
            className="absolute right-0 w-8 h-8 rounded-full mb-2 hover:bg-gray-300"
            onClick={handleClose}
          >
            <IoMdClose className="w-5/6 h-5/6 " />
          </Button>
        </div>
        {modalIsOpen && <NotiPopup message={message} onClose={closeModal} />}
        <div className="h-screen_3/5 overflow-y-scroll border border-[#545e7b] mt-4 no-scrollbar  dark:bg-[#14141a] p-2 rounded-md dark:text-white ">
          <div className="grid md:grid-cols-2 gap-2 w-full">
            {info.role === "ADMIN" && (
              <div className="flex gap-5 w-full">
                <div className="font-bold text-base">
                  <FormattedMessage id="Agency.ID" />:
                </div>
                <div>{Agencydata.agency_id}</div>
              </div>
            )}

            <div className="flex gap-5 w-full">
              <div className="font-bold text-base">
                <FormattedMessage id="PostOffice.Name" />:
              </div>
              {isEditing ? (
                <input
                  className="w-1/2 bg-transparent border-b-2 border-[#545e7b] dark:text-white"
                  type="text"
                  value={Agencydata.agency_name}
                  onChange={(e) =>
                    setAgencydata({
                      ...Agencydata,
                      agency_name: e.target.value,
                    })
                  }
                />
              ) : (
                <div>{Agencydata.agency_name}</div>
              )}
            </div>
            <div className="flex gap-5 w-full">
              <div className="font-bold text-base">
                <FormattedMessage id="PostOffice.Info.PostalCode" />:
              </div>
              <div>{Agencydata.postal_code}</div>
            </div>
            <div className="flex gap-5 w-full">
              <div className="font-bold text-base">
                <FormattedMessage id="PostOffice.Phone" />:
              </div>
              {isEditing ? (
                <input
                  className="w-1/2 bg-transparent border-b-2 border-[#545e7b] dark:text-white"
                  type="text"
                  value={Agencydata.phone_number}
                  onChange={(e) =>
                    setAgencydata({
                      ...Agencydata,
                      phone_number: e.target.value,
                    })
                  }
                />
              ) : (
                <div>{Agencydata.phone_number}</div>
              )}
            </div>
            <div className="flex gap-5 w-full">
              <div className="font-bold text-base">Email:</div>
              {isEditing ? (
                <input
                  className="w-1/2 bg-transparent border-b-2 border-[#545e7b] dark:text-white"
                  type="text"
                  value={Agencydata.email}
                  onChange={(e) =>
                    setAgencydata({ ...Agencydata, email: e.target.value })
                  }
                />
              ) : (
                <div>{Agencydata.email}</div>
              )}
            </div>

            <div className="flex gap-5 w-full">
              <div className="font-bold text-base">
                <FormattedMessage id="PostOffice.BankName" />:
              </div>
              {isEditing ? (
                <input
                  className="w-1/2 bg-transparent border-b-2 border-[#545e7b] dark:text-white"
                  type="text"
                  value={Agencydata.bank}
                  onChange={(e) =>
                    setAgencydata({ ...Agencydata, bank: e.target.value })
                  }
                />
              ) : (
                <div>{Agencydata.bank}</div>
              )}
            </div>
            <div className="flex gap-5 w-full">
              <div className="font-bold text-base">
                <FormattedMessage id="PostOffice.BankNumber" />:
              </div>
              {isEditing ? (
                <input
                  className="w-1/2 bg-transparent border-b-2 border-[#545e7b] dark:text-white"
                  type="text"
                  value={Agencydata.bin}
                  onChange={(e) =>
                    setAgencydata({ ...Agencydata, bin: e.target.value })
                  }
                />
              ) : (
                <div>{Agencydata.bin}</div>
              )}
            </div>
            <div className="flex gap-5 w-full">
              <div className="font-bold text-base">
                <FormattedMessage id="PostOffice.Info.CommissionRate" />:
              </div>
              {isEditing ? (
                <input
                  className="w-1/2 bg-transparent border-b-2 border-[#545e7b] dark:text-white"
                  type="text"
                  value={Agencydata.commission_rate}
                  onChange={(e) =>
                    setAgencydata({
                      ...Agencydata,
                      commission_rate: e.target.value,
                    })
                  }
                />
              ) : (
                <div>{Agencydata.commission_rate}</div>
              )}
            </div>
            <div className="flex gap-5 w-full">
              <div className="font-bold text-base">
                <FormattedMessage id="PostOffice.Income" />:
              </div>
              {isEditing ? (
                <input
                  className="w-1/2 bg-transparent border-b-2 border-[#545e7b] dark:text-white"
                  type="text"
                  value={Agencydata.revenue}
                  onChange={(e) =>
                    setAgencydata({ ...Agencydata, revenue: e.target.value })
                  }
                />
              ) : (
                <div>{Agencydata.revenue}</div>
              )}
            </div>
            <div className="flex gap-3 ">
              {!isEditing ? (
                <div className="flex">
                  <div className="font-bold text-base">
                    <FormattedMessage id="TransportPartner.Adress" />:
                  </div>
                  <div>{Agencydata?.detail_address} /</div>
                  <div>{Agencydata?.town} /</div>
                  <div>{Agencydata?.district} /</div>
                  <div>{Agencydata?.province}</div>
                </div>
              ) : (
                <>
                  <div className="font-bold text-base">
                    <FormattedMessage id="TransportPartner.Adress" />:{" "}
                  </div>
                  <select
                    className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                `}
                    id="city"
                    aria-label=".form-select-sm"
                    value={selectedProvince}
                    onChange={handleProvinceChange}
                  >
                    <option value="Bình Định">
                      {intl.formatMessage({ id: "Choose Province" })}
                    </option>
                    {provinces.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  <select
                    className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                }
                `}
                    id="district"
                    aria-label=".form-select-sm"
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                  >
                    <option value="Huyện Hoài Ân">
                      {intl.formatMessage({ id: "Choose District" })}
                    </option>
                    {districts.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                  <select
                    className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                `}
                    id="ward"
                    aria-label=".form-select-sm"
                    value={selectedWard}
                    onChange={(e) => handleWardChange(e)}
                  >
                    <option value="Tăng Bạt Hổ">
                      {intl.formatMessage({ id: "Choose Ward" })}
                    </option>
                    {wards.map((ward) => (
                      <option key={ward} value={ward}>
                        {ward}
                      </option>
                    ))}
                  </select>

                  <input
                    type=""
                    className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                `}
                    placeholder={intl.formatMessage({
                      id: "PostOffice.Address",
                    })}
                    onChange={(e) =>
                      handleInputChange("detail_address", e.target.value)
                    }
                  />
                </>
              )}
            </div>
          </div>
          {/* <div className="mt-5 flex flex-col place-content-center">
            <div className="text-base font-bold text-center">
              Hợp đồng doanh nghiệp
            </div>
            {isEditing ? (
              <Dropzone
                className="h-32 w-full bg-white rounded-xl flex justify-center outline-gray-400 outline-dashed"
                files={fileLicenseUpdate}
                setFiles={setFileLicenseUpdate}
                submit={handleSubmit}
              />
            ) : (
              <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 min-h-[130px]">
                {fileLicense?.map((file) => (
                  <li
                    key={file}
                    className="relative h-32 rounded-md px-2 border border-gray-300"
                  >
                    <Image
                      src={file}
                      alt={file.name}
                      width={100}
                      height={100}
                      onLoad={() => {
                        URL.revokeObjectURL(file);
                      }}
                      className="h-full w-full rounded-md object-contain"
                    />
                    <div className="mt-1 text-[12px] font-medium text-stone-500 text-center whitespace-nowrap truncate">
                      {file}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div> */}
          <div className="text-red-700 font-bold flex place-content-center text-base">
            {error}
          </div>
        </div>

        <div className="w-full flex">
          {!isEditing ? (
            <Button
              className="w-full rounded-lg mt-5 mb-1 py-3 border-green-700 hover:bg-green-700 text-green-500
              bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border 
              hover:shadow-md"
              onClick={handleEditClick}
            >
              <FaPen className="xs:mr-2" />
              <span className="hidden xs:block">
                <FormattedMessage id="Edit" />
              </span>
            </Button>
          ) : (
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
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DetailPost;
