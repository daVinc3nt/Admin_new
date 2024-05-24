import React, { useRef, useEffect, useState } from "react";
import { m, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import { FormattedMessage, useIntl } from "react-intl";
import axios from "axios";
import MapExport from "@/components/Maprender/Mapexport";
import {
  StaffsOperation,
  CreatingAgencyInfo,
  AgencyOperation,
  AdministrativeOperation,
  AdministrativeInfo,
} from "@/TDLib/tdlogistics";
import { Input } from "postcss";
// import { info } from "console";

interface AddOfficeProps {
  onClose: () => void;
  reloadData?: () => void;
  info?: any;
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
const AddOffice2: React.FC<AddOfficeProps> = ({
  onClose,
  reloadData,
  info,
}) => {
  // const [PaperUpload, setPaperUpload] = useState(null);
  const [isShaking, setIsShaking] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const intl = useIntl();

  const [OfficeData, setOfficeData] = useState({
    user_fullname: "",
    user_date_of_birth: "",
    user_cccd: "",
    user_phone_number: "",
    user_email: "",
    user_position: "ADMIN",
    user_bank: "",
    user_bin: "",
    user_salary: 0,
    user_province: "",
    user_district: "",
    user_town: "",
    user_detail_address: "",

    individual_company: true,
    company_name: "",
    tax_number: "",
    type: "",
    level: 0,
    postal_code: "",
    phone_number: "",
    email: "",
    province: "",
    district: "",
    town: "",
    detail_address: "",
    bank: "",
    bin: "",
    commission_rate: 0,
    latitude: 0,
    longitude: 0,
    managed_wards: [],
    agency_name: "",
    // revenue: 0,
  });

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
    setOfficeData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const a: AdministrativeInfo = {
    province: "",
  };
  const b: AdministrativeInfo = {
    province: "",
  };

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  const [provincesPartner, setProvincesPartner] = useState([]);
  const [districtsPartner, setDistrictsPartner] = useState([]);
  const [wardsPartner, setWardsPartner] = useState([]);

  const [selectedProvincePartner, setSelectedProvincePartner] = useState("");
  const [selectedDistrictPartner, setSelectedDistrictPartner] = useState("");
  const [selectedWardPartner, setSelectedWardPartner] = useState("");

  const adminOperation = new AdministrativeOperation();

  useEffect(() => {
    const fetchData = async () => {
      const response = await adminOperation.get({});
      // console.log("Tỉnh", response);
      setProvinces(response.data);
      setProvincesPartner(response.data);
    };
    fetchData();
  }, []);

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

  const handleCityChangePartner = async (e) => {
    setSelectedProvincePartner(e.target.value);
    b.province = e.target.value;
    handleInputChange("province", e.target.value);
    // console.log(b);
    const response = await adminOperation.get(b);
    // console.log("Quận", response);
    setDistrictsPartner(response.data);
  };

  const handleDistrictChangePartner = async (e) => {
    setSelectedDistrictPartner(e.target.value);
    b.province = selectedProvincePartner;
    b.district = e.target.value;
    handleInputChange("district", e.target.value);
    // console.log(b);
    const response = await adminOperation.get(b);
    // console.log("Xã", response);
    setWardsPartner(response.data);
  };
  const handleWardChangePartner = (e) => {
    setSelectedWardPartner(e.target.value);
    handleInputChange("town", e.target.value);
  };

  // A state variable to store the confirm user_password value
  const [confirmPassword, setConfirmPassword] = useState("");

  // A state variable to store the validation message
  const [validation, setValidation] = useState("");

  // A function to handle the user_password input change

  // A function to handle the confirm user_password input change

  const [checkmissing, setCheckmissing] = useState({
    user_fullname: false,
    user_date_of_birth: false,
    user_cccd: false,
    user_phone_number: false,
    user_email: false,
    user_bank: false,
    user_bin: false,
    user_salary: false,
    user_province: false,
    user_district: false,
    user_town: false,
    user_detail_address: false,

    individual_company: false,
    company_name: false,
    tax_number: false,
    type: false,
    level: false,
    postal_code: false,
    phone_number: false,
    email: false,
    province: false,
    district: false,
    town: false,
    detail_address: false,
    bank: false,
    bin: false,
    commission_rate: false,
    latitude: false,
    longitude: false,
    managed_wards: false,
    agency_name: false,
    // revenue: false,
  });

  const checkvalidaddress = () => {
    if (
      OfficeData.province &&
      OfficeData.district &&
      OfficeData.town &&
      OfficeData.detail_address
    ) {
      return true;
    }
    return false;
  }; //dung de render map

  const handleCheckMissing = (key: string, value: boolean) => {
    setCheckmissing((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const [error, setError] = useState("");

  const agency = new AgencyOperation();
  const handleSubmit = async () => {
    let check = true;
    for (let key in OfficeData) {
      if (OfficeData[key] === "") {
        handleCheckMissing(key, true);
        check = false;
      } else {
        handleCheckMissing(key, false);
      }
    }
    // console.log(checkmissing);
    if (!check) {
      setError("Vui lòng nhập đầy đủ thông tin");
      // console.log(OfficeData);
    } else {
      setError("");
      try {
        // console.log(OfficeData);
        const response = await agency.create(OfficeData);
        // console.log(response);
        if (response.error.error) {
          setError(response.error.message);
        } else {
          reloadData();
          alert("Tạo thành công");
          setOfficeData({
            user_fullname: "",
            user_date_of_birth: "",
            user_cccd: "",
            user_phone_number: "",
            user_email: "",
            user_position: "ADMIN",
            user_bank: "",
            user_bin: "",
            user_salary: 0,
            user_province: "",
            user_district: "",
            user_town: "",
            user_detail_address: "",

            individual_company: true,
            company_name: "",
            tax_number: "",
            type: "",
            level: 0,
            postal_code: "",
            phone_number: "",
            email: "",
            province: "",
            district: "",
            town: "",
            detail_address: "",
            bank: "",
            bin: "",
            commission_rate: 0,
            latitude: 0,
            longitude: 0,
            managed_wards: [],
            agency_name: "",
            // revenue: 0,
          });
        }
      } catch (error) {
        // console.log(error);
        alert("Tạo thất bại");
      }
    }
  };
  const handleUpdateLocation = (lat: number, lng: number) => {
    setOfficeData((prevAddressInfo) => ({
      ...prevAddressInfo,
      latitude: lat,
      longitude: lng,
    }));
    handleInputChange("latitude", lat);
    handleInputChange("longitude", lng);
  };
  const [inputValue, setInputValue] = useState("");

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
          <div className="font-bold text-lg sm:text-2xl pb-2 dark:text-white w-full text-center">
            Thêm bưu cục-đại lý (Tập thể)
          </div>
          <Button
            className="absolute right-0 w-8 h-8 rounded-full mb-2 hover:bg-gray-300"
            onClick={handleClose}
          >
            <IoMdClose className="w-5/6 h-5/6" />
          </Button>
        </div>
        <div className="h-screen_3/5 overflow-y-scroll border border-[#545e7b] mt-4 no-scrollbar flex flex-col items-center dark:bg-[#14141a] p-2 rounded-md dark:text-white">
          <div className="w-[98%] sm:w-10/12">
            <h1 className="font-semibold pb-2 text-center">
              <FormattedMessage id="PostOffice.Leader" />
            </h1>
            <div className="flex gap-3">
              <input
                type=""
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.user_fullname ? "border-red-500" : ""}`}
                placeholder={intl.formatMessage({ id: "Fullname" })}
                onChange={(e) =>
                  handleInputChange("user_fullname", e.target.value)
                }
              />

              <input
                type=""
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.user_phone_number ? "border-red-500" : ""}`}
                placeholder={intl.formatMessage({ id: "Phone" })}
                onChange={(e) =>
                  handleInputChange("user_phone_number", e.target.value)
                }
              />
            </div>
            <div className="flex gap-3 mt-3">
              <input
                type="date"
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.user_date_of_birth ? "border-red-500" : ""}`}
                placeholder="Ngày sinh"
                onChange={(e) =>
                  handleInputChange("user_date_of_birth", e.target.value)
                }
              />
              <input
                type=""
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.user_cccd ? "border-red-500" : ""}`}
                placeholder={intl.formatMessage({ id: "CCCD" })}
                onChange={(e) => handleInputChange("user_cccd", e.target.value)}
              />
              <input
                type=""
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.user_email ? "border-red-500" : ""}`}
                placeholder="Email"
                onChange={(e) =>
                  handleInputChange("user_email", e.target.value)
                }
              />
            </div>
            <div className="flex gap-3 mt-3">
              <input
                type=""
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.bank ? "border-red-500" : ""}`}
                placeholder={intl.formatMessage({ id: "BankName" })}
                onChange={(e) => handleInputChange("user_bank", e.target.value)}
              />
              <input
                type=""
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.bin ? "border-red-500" : ""}`}
                placeholder={intl.formatMessage({ id: "BankNumber" })}
                onChange={(e) => handleInputChange("user_bin", e.target.value)}
              />
            </div>
            <div className="flex gap-3 mt-3">
              <select
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.user_province ? "border-red-500" : ""}`}
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
                ${checkmissing.user_district ? "border-red-500" : ""}
                `}
                id="user_district"
                aria-label=".form-select-sm"
                value={selectedDistrict}
                onChange={handleDistrictChange}
              >
                <option value="Hoài Ân">
                  {intl.formatMessage({ id: "Choose District" })}
                </option>
                {districts.map((user_district) => (
                  <option key={user_district} value={user_district}>
                    {user_district}
                  </option>
                ))}
              </select>
              <select
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.user_town ? "border-red-500" : ""}`}
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
                ${checkmissing.user_detail_address ? "border-red-500" : ""}`}
                placeholder="Số nhà- tên đường"
                onChange={(e) =>
                  handleInputChange("user_detail_address", e.target.value)
                }
              />
            </div>
          </div>

          <div className="w-[98%] sm:w-10/12 mt-5">
            <h1 className="font-semibold pb-2 text-center">
              <FormattedMessage id="PostOffice.Infomation" />
            </h1>
            <div className="flex gap-3 mt-3 ">
              <input
                type=""
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.tax_number ? "border-red-500" : ""}`}
                placeholder="Mã số thuế"
                onChange={(e) =>
                  handleInputChange("tax_number", e.target.value)
                }
              />
              <input
                type=""
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.company_name ? "border-red-500" : ""}`}
                placeholder="Tên công ty"
                onChange={(e) =>
                  handleInputChange("company_name", e.target.value)
                }
              />
            </div>
            {/* <div className="flex gap-3 mt-3 ">
              <label className="flex flex-row place-content-between text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full">
                <p className="">Giấy chứng nhận doanh nghiệp</p>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) =>
                    handleInputChange("license", e.target.files[0])
                  }
                ></input>
                {OfficeData.license && (
                  <div className=" font-bold ">{OfficeData.license.name}</div>
                )}
                {!OfficeData.license && (
                  <div className=" font-bold ">Tải ảnh lên</div>
                )}
              </label>
            </div> */}
            <div className="flex gap-3 mt-3">
              <input
                type=""
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.agency_name ? "border-red-500" : ""}`}
                placeholder={intl.formatMessage({ id: "PostOffice.Name" })}
                onChange={(e) =>
                  handleInputChange("agency_name", e.target.value)
                }
              />
            </div>

            <div className="flex gap-3 mt-3">
              <input
                type=""
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.type ? "border-red-500" : ""}`}
                placeholder={intl.formatMessage({ id: "PostOffice.Info.Type" })}
                onChange={(e) => handleInputChange("type", e.target.value)}
              />
              <input
                type="number"
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.level ? "border-red-500" : ""}`}
                placeholder={intl.formatMessage({
                  id: "PostOffice.Info.Level",
                })}
                onChange={(e) =>
                  handleInputChange("level", parseInt(e.target.value))
                }
              />
              <input
                type=""
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.postal_code ? "border-red-500" : ""}`}
                placeholder={intl.formatMessage({
                  id: "PostOffice.Info.PostalCode",
                })}
                onChange={(e) =>
                  handleInputChange("postal_code", e.target.value)
                }
              />
            </div>
            <div className="flex gap-3 mt-3">
              <input
                type="number"
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.phone_number ? "border-red-500" : ""}`}
                placeholder={intl.formatMessage({ id: "Phone" })}
                onChange={(e) =>
                  handleInputChange("phone_number", e.target.value)
                }
              />
              <input
                type="number"
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.commission_rate ? "border-red-500" : ""}`}
                placeholder={intl.formatMessage({ id: "PostOffice.Rate" })}
                onChange={(e) =>
                  handleInputChange(
                    "commission_rate",
                    parseFloat(e.target.value)
                  )
                }
              />
              <input
                type=""
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.email ? "border-red-500" : ""}`}
                placeholder="Email"
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
              
            </div>
            <div className="flex gap-3 mt-3">
              <input
                type=""
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.bank ? "border-red-500" : ""}`}
                placeholder={intl.formatMessage({ id: "BankName" })}
                onChange={(e) => handleInputChange("bank", e.target.value)}
              />
              <input
                type=""
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.bin ? "border-red-500" : ""}`}
                placeholder={intl.formatMessage({ id: "BankNumber" })}
                onChange={(e) => handleInputChange("bin", e.target.value)}
              />
            </div>
            <div className="flex gap-3 my-3">
              <select
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.province ? "border-red-500" : ""}`}
                id="city"
                aria-label=".form-select-sm"
                value={selectedProvincePartner}
                onChange={handleCityChangePartner}
              >
                <option value="">
                  {intl.formatMessage({ id: "Choose Province" })}
                </option>
                {provincesPartner.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <select
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.district ? "border-red-500" : ""}
                `}
                id="user_district"
                aria-label=".form-select-sm"
                value={selectedDistrictPartner}
                onChange={handleDistrictChangePartner}
              >
                <option value="">
                  {intl.formatMessage({ id: "Choose District" })}
                </option>
                {districtsPartner.map((user_district) => (
                  <option key={user_district} value={user_district}>
                    {user_district}
                  </option>
                ))}
              </select>
              <select
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.town ? "border-red-500" : ""}`}
                id="ward"
                aria-label=".form-select-sm"
                onChange={(e) => handleWardChangePartner(e)}
              >
                <option value="">
                  {intl.formatMessage({ id: "Choose Ward" })}
                </option>
                {wardsPartner.map((ward) => (
                  <option key={ward} value={ward}>
                    {ward}
                  </option>
                ))}
              </select>

              <input
                type=""
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.detail_address ? "border-red-500" : ""}`}
                placeholder={intl.formatMessage({ id: "Address" })}
                onChange={(e) =>
                  handleInputChange("detail_address", e.target.value)
                }
              />
            </div>
            {checkvalidaddress() && (
              <MapExport
                province={OfficeData.province}
                district={OfficeData.district}
                town={OfficeData.town}
                detailadress={OfficeData.detail_address}
                latitude={OfficeData.latitude}
                longitude={OfficeData.longitude}
                onUpdateLocation={handleUpdateLocation}
              />
            )}
            

            <button
              className="text-xs mt-3 md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-1/4 bg-green-500 text-white"
              onClick={() => {
                if (inputValue.trim() !== "") {
                  setOfficeData((prevState) => ({
                    ...prevState,
                    managed_wards: [...prevState.managed_wards, inputValue],
                  }));
                  setInputValue("");
                  // console.log(OfficeData.managed_wards);
                }
              }}
            >
              Thêm
            </button>
            <div className="mt-4">
              Danh sách đã thêm:
              {OfficeData.managed_wards.map((ward, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between mt-2"
                >
                  <p className="mr-2">{ward}</p>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => {
                      setOfficeData((prevState) => ({
                        ...prevState,
                        managed_wards: prevState.managed_wards.filter(
                          (_, i) => i !== index
                        ),
                      }));
                    }}
                  >
                    Xóa
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Button
          className="w-full rounded-lg mt-5 mb-1 py-3 border-green-700 hover:bg-green-700 text-green-500
        bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border hover:shadow-md"
          onClick={handleSubmit}
        >
          <span className="hidden xs:block">
            <FormattedMessage id="PostOffice.AddButton" />
          </span>
        </Button>
        <div className=" flex place-content-center text-red-500 font-bold ">
          {error && <p>{error}</p>}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AddOffice2;
