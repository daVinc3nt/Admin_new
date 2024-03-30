import React, { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import { FaTrash, FaPen } from "react-icons/fa";
import { FormattedMessage, useIntl } from "react-intl";
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
import axios from "axios";
import { set } from "date-fns";
interface Postdetail2 {
  individual_company: number;
  company_name: string;
  tax_number: string;
  bussiness_number: string;
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

interface City {
  Id: string;
  Name: string;
  Districts: District[];
}

interface District {
  Id: string;
  Name: string;
  Wards: Ward[];
}

interface Ward {
  Id: string;
  Name: string;
}
const staff = new StaffsOperation();

interface DetailAgencyProps {
  onClose: () => void;
  dataInitial: Postdetail;
}

const DetailPost: React.FC<DetailAgencyProps> = ({ onClose, dataInitial }) => {
  const intl = useIntl();
  const [isShaking, setIsShaking] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [fileContract, setFileContract] = useState(null);
  const [fileContractUpdate, setFileContractUpdate] = useState(null);
  const [role, setRole] = useState(null);
  const a: AdministrativeInfo = {
    province: "",
  };
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const res = await staff.getAuthenticatedStaffInfo();
      setRole(res.data.role);
    };

    fetchData();
  }, []);

  const adminOperation = new AdministrativeOperation();

  useEffect(() => {
    const fetchData = async () => {
      const response = await adminOperation.get({});
      console.log("Tỉnh", response);
      setProvinces(response.data);
    };
    fetchData();
  }, []);
  const handleUpdateContract = async () => {
    const a = new AgencyOperation();
    const FindByID: UpdatingAgencyCondition = {
      agency_id: dataInitial.agency_id,
    };
    try {
      // Check if the file is a PDF

      const File: UpdatingLicenseInfo = {
        licenseFiles: fileContractUpdate,
      };
      const response = await a.updateLicense(File, FindByID);
      if (response.error) {
        alert(response.message);
      } else {
        alert("Cập nhật hợp đồng thành công");
      }
    } catch (error) {
      console.error("Error updating contract", error);
      alert(error.message || "Có lỗi xảy ra khi cập nhật hợp đồng");
    }
  };

  const handleProvinceChange = async (e) => {
    setSelectedProvince(e.target.value);
    a.province = e.target.value;
    handleInputChange("user_province", e.target.value);
    console.log(a);
    const response = await adminOperation.get(a);
    console.log("Quận", response);
    setDistricts(response.data);
  };

  const handleDistrictChange = async (e) => {
    setSelectedDistrict(e.target.value);
    a.province = selectedProvince;
    a.district = e.target.value;
    handleInputChange("user_district", e.target.value);
    console.log(a);
    const response = await adminOperation.get(a);
    console.log("Xã", response);
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
      role === "ADMIN" ||
      role === "MANAGER" ||
      role === "HUMAN_RESOURCE_MANAGER"
    ) {
      const condition: UpdatingAgencyCondition = {
        agency_id: dataInitial.agency_id,
      };
      try {
        const response = await updateAgency.update(data, condition);
        console.log(response);
        if (response.error) {
          setError(response.message);
        } else {
          alert("Cập nhật thành công");
        }
      } catch (e) {
        console.log(e);
        alert("Cập nhật thất bại");
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
        <div className="h-screen_3/5 overflow-y-scroll border border-[#545e7b] mt-4 no-scrollbar  dark:bg-[#14141a] p-2 rounded-md dark:text-white ">
          <div className="grid md:grid-cols-2 gap-4 w-full">
            {role === "ADMIN" && (
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
              <div className="font-bold text-base">Postalcode:</div>
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
              <div className="font-bold text-base">Commission_rate</div>
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
              <div className="font-bold text-base">Doanh thu :</div>
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
            <div className="flex gap-3 mt-3">
              {!isEditing ? (
                <div className="flex gap-3">
                  <div className="font-bold text-base">
                    <FormattedMessage id="TransportPartner.Adress" />:
                  </div>
                  <div>{Agencydata?.detail_address}/</div>
                  <div>{Agencydata?.town}/</div>
                  <div>{Agencydata?.district}/</div>
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
                    <option value="">
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
                    placeholder="Số nhà- tên đường"
                    onChange={(e) =>
                      handleInputChange("detail_address", e.target.value)
                    }
                  />
                </>
              )}
            </div>
            <div className="mt-5 flex flex-col place-content-center">
              <div className="text-base font-bold text-center">
                Hợp đồng doanh nghiệp
              </div>
              {isEditing ? (
                <div className="flex flex-col place-content-center">
                  <div className="flex place-content-center">
                    <label className="flex py-6">
                      <BackupIcon className="h-6 w-6" />

                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          setFileContractUpdate(file);
                        }}
                      />
                      {fileContractUpdate && (
                        <div className=" font-bold text-base ">
                          {fileContractUpdate.name}
                        </div>
                      )}
                      {!fileContractUpdate && (
                        <div className=" font-bold text-base ">Tải ảnh lên</div>
                      )}
                    </label>
                  </div>
                  <div className="flex place-content-center">
                    <button
                      onClick={handleUpdateContract}
                      className=" text-white place-items-center h-full w-20 font-bold rounded-lg bg-blue-500 hover:bg-blue-400"
                    >
                      Xác nhận
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex place-content-center py-6">
                  <a href={fileContract} download>
                    <div className="border-b-blue-500 border-b-2 text-blue-500 text-base font-bold">
                      Tải hợp đồng
                    </div>
                  </a>
                </div>
              )}
            </div>
          </div>
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
