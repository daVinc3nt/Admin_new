import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import { FormattedMessage, useIntl } from "react-intl";
import {
  AdministrativeOperation,
  AdministrativeInfo,
  CreateBusinessByAdminInfo,
  CreateBusinessByAgencyInfo,
  BusinessOperation,
} from "@/TDLib/tdlogistics";
interface AddBusinessProps {
  onClose: () => void;
  reloadData: () => void;
  info?: any;
}

const AddBusiness: React.FC<AddBusinessProps> = ({
  onClose,
  reloadData,
  info,
}) => {
  const [BusinessData, setBusinessData] = useState(null);
  const [role, setRole] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      setRole(info.role);
      if (info?.role === "ADMIN") {
        setBusinessData({
          username: "",
          password: "",
          user_fullname: "",
          user_phone_number: "",
          user_email: "",
          user_date_of_birth: "",
          user_cccd: "",
          user_province: "",
          user_district: "",
          user_town: "",
          user_detail_address: "",
          user_bin: "",
          user_bank: "",

          // Business information
          agency_id: "",
          business_name: "",
          email: "",
          phone_number: "",
          tax_number: "",
          province: "",
          district: "",
          town: "",
          detail_address: "",
          bin: "",
          bank: "",
        });
      } else {
        setBusinessData({
          user_fullname: "",
          user_phone_number: "",
          user_email: "",
          user_date_of_birth: "",
          user_cccd: "",
          user_province: "",
          user_district: "",
          user_town: "",
          user_detail_address: "",
          user_bin: "",
          user_bank: "",

          // Business information
          username: "",
          password: "",
          business_name: "",
          email: "",
          phone_number: "",
          tax_number: "",
          province: "",
          district: "",
          town: "",
          detail_address: "",
          bin: "",
          bank: "",
        });
      }
    };

    fetchData();
  }, []);

  const [isShaking, setIsShaking] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [type, setType] = useState();
  const intl = useIntl();

  const openModal = (type) => {
    setType(type);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
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

  const handleInputChange = (key: string, value: string) => {
    setBusinessData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const [Showpassword, setShowpassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowpassword((prevState) => !prevState);
  };
  const [Showpassword2, setShowpassword2] = useState(false);
  const togglePasswordVisibility2 = () => {
    setShowpassword2((prevState) => !prevState);
  };

  // A state variable to store the confirm user_password value
  const [confirmPassword, setConfirmPassword] = useState("");

  // A state variable to store the validation message
  const [validation, setValidation] = useState("");

  // A function to handle the user_password input change

  // A function to handle the confirm user_password input change
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    // Check if the confirm user_password matches the user_password
    if (e.target.value !== "" && e.target.value !== BusinessData.password) {
      setValidation("Mật khẩu không khớp!");
    } else {
      setValidation("");
    }
  };

  const [checkmissing, setCheckmissing] = useState({
    user_fullname: false,
    user_phone_number: false,
    user_email: false,
    user_date_of_birth: false,
    user_cccd: false,
    user_province: false,
    user_district: false,
    user_town: false,
    user_detail_address: false,
    user_bin: false,
    user_bank: false,

    // Business information
    username: false,
    password: false,
    business_name: false,
    email: false,
    phone_number: false,
    tax_number: false,
    province: false,
    district: false,
    town: false,
    detail_address: false,
    bin: false,
    bank: false,
    ...(role === "ADMIN" ||
    role === "MANAGER" ||
    role === "HUMAN_RESOURCE_MANAGER"
      ? { agency_id: false }
      : {}),
  });

  const handleCheckMissing = (key: string, value: boolean) => {
    setCheckmissing((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const [error, setError] = useState("");

  const Business = new BusinessOperation();

  const handleSubmit = async () => {
    let check = true;
    for (let key in BusinessData) {
      if (role !== "ADMIN" && key === "agency_id") continue;
      if (BusinessData[key] === "") {
        handleCheckMissing(key, true);
        check = false;
      } else {
        handleCheckMissing(key, false);
      }
    }
    if (!check) {
      setError("Vui lòng nhập đầy đủ thông tin");
      console.log(BusinessData);
    } else {
      setError("");
      if (
        role === "ADMIN" ||
        role === "MANAGER" ||
        role === "HUMAN_RESOURCE_MANAGER"
      ) {
        const response = await Business.createByAdmin(BusinessData);
        if (response.error) {
          alert("Thêm đối tác thất bại" + response.error.message);
        } else {
          alert("Thêm đối tác thành công");
          reloadData();
          setBusinessData({
            username: "",
            password: "",
            user_fullname: "",
            user_phone_number: "",
            user_email: "",
            user_date_of_birth: "",
            user_cccd: "",
            user_province: "",
            user_district: "",
            user_town: "",
            user_detail_address: "",
            user_bin: "",
            user_bank: "",

            // Business information
            agency_id: "",
            business_name: "",
            email: "",
            phone_number: "",
            tax_number: "",
            province: "",
            district: "",
            town: "",
            detail_address: "",
            bin: "",
            bank: "",
          });
        }
      } else if (
        role === "AGENCY_MANAGER" ||
        role === "AGENCY_HUMAN_RESOURCE_MANAGER"
      ) {
        const response = await Business.createByAgency(BusinessData);
        console.log(response);
        if (response.error) {
          setError(response.message);
        } else {
          alert("Thêm đối tác thành công");
          reloadData();
          setBusinessData({
            user_fullname: "",
            user_phone_number: "",
            user_email: "",
            user_date_of_birth: "",
            user_cccd: "",
            user_province: "",
            user_district: "",
            user_town: "",
            user_detail_address: "",
            user_bin: "",
            user_bank: "",

            // Business information
            username: "",
            password: "",
            business_name: "",
            email: "",
            phone_number: "",
            tax_number: "",
            province: "",
            district: "",
            town: "",
            detail_address: "",
            bin: "",
            bank: "",
          });
        }
      }
    }
  };
  // console.log(BusinessData);
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

  const [provincesBusiness, setProvincesBusiness] = useState([]);
  const [districtsBusiness, setDistrictsBusiness] = useState([]);
  const [wardsBusiness, setWardsBusiness] = useState([]);

  const [selectedProvinceBusiness, setSelectedProvinceBusiness] = useState("");
  const [selectedDistrictBusiness, setSelectedDistrictBusiness] = useState("");
  const [selectedWardBusiness, setSelectedWardBusiness] = useState("");

  const adminOperation = new AdministrativeOperation();

  useEffect(() => {
    const fetchData = async () => {
      const response = await adminOperation.get({});
      console.log("Tỉnh", response);
      setProvinces(response.data);
      setProvincesBusiness(response.data);
    };
    fetchData();
  }, []);

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

  const handleCityChangeBusiness = async (e) => {
    setSelectedProvinceBusiness(e.target.value);
    b.province = e.target.value;
    handleInputChange("province", e.target.value);
    console.log(b);
    const response = await adminOperation.get(b);
    console.log("Quận", response);
    setDistrictsBusiness(response.data);
  };

  const handleDistrictChangeBusiness = async (e) => {
    setSelectedDistrictBusiness(e.target.value);
    b.province = selectedProvinceBusiness;
    b.district = e.target.value;
    handleInputChange("district", e.target.value);
    console.log(b);
    const response = await adminOperation.get(b);
    console.log("Xã", response);
    setWardsBusiness(response.data);
  };
  const handleWardChangeBusiness = (e) => {
    setSelectedWardBusiness(e.target.value);
    handleInputChange("town", e.target.value);
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
          <div className="font-bold text-lg sm:text-2xl pb-2 dark:text-white w-full text-center">
            Thêm doanh nghiệp
          </div>
          <Button
            className="absolute right-0 w-8 h-8 rounded-full mb-2 hover:bg-gray-300"
            onClick={handleClose}
          >
            <IoMdClose className="w-5/6 h-5/6" />
          </Button>
        </div>

        <div className="h-screen_3/5 overflow-y-scroll border border-[#545e7b] mt-4 no-scrollbar flex flex-col items-center bg-white dark:bg-[#14141a] p-2 rounded-md dark:text-white">
          <div className="w-[98%] sm:w-10/12">
            <h1 className="font-semibold pb-2 text-center dark:text-white">
              Thông tin người quản lý
            </h1>
            <div className="flex gap-3">
              <div className="w-full">
                <div className="text-center dark:text-white">Họ và tên</div>
                <input
                  type=""
                  className={`text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.user_fullname ? "border-red-500" : ""}`}
                  placeholder="VD: Nguyen Van A"
                  onChange={(e) =>
                    handleInputChange("user_fullname", e.target.value)
                  }
                />
              </div>
              <div className="w-full">
                <div className="text-center dark:text-white">Số điện thoại</div>
                <input
                  type=""
                  className={`text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.user_phone_number ? "border-red-500" : ""}`}
                  placeholder="VD: 0988888888"
                  onChange={(e) =>
                    handleInputChange("user_phone_number", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="flex gap-3 mt-3">
              <div className="w-full">
                <div className="text-center dark:text-white">Ngày sinh</div>
                <input
                  type="date"
                  className={`text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.user_date_of_birth ? "border-red-500" : ""}`}
                  placeholder="Ngày sinh"
                  onChange={(e) =>
                    handleInputChange("user_date_of_birth", e.target.value)
                  }
                />
              </div>
              <div className="w-full">
                <div className="text-center dark:text-white">Số CCCD</div>
                <input
                  type=""
                  className={`text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.user_cccd ? "border-red-500" : ""}`}
                  placeholder="VD: 052204009999"
                  onChange={(e) =>
                    handleInputChange("user_cccd", e.target.value)
                  }
                />
              </div>
              <div className="w-full">
                <div className="text-center dark:text-white">Email</div>
                <input
                  type=""
                  className={`text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.user_email ? "border-red-500" : ""}`}
                  placeholder="VD: tdlogistics@gmail.com"
                  onChange={(e) =>
                    handleInputChange("user_email", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="flex gap-3 mt-3">
              <div className="w-full">
                <div className="text-center dark:text-white">Ngân hàng</div>
                <input
                  type=""
                  className={`text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.user_bank ? "border-red-500" : ""}`}
                  onChange={(e) =>
                    handleInputChange("user_bank", e.target.value)
                  }
                />
              </div>
              <div className="w-full">
                <div className="text-center dark:text-white">Số tài khoản</div>
                <input
                  type=""
                  className={`text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.user_bin ? "border-red-500" : ""}`}
                  onChange={(e) =>
                    handleInputChange("user_bin", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="flex gap-3 mt-3">
              <select
                className={`text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full
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
                className={`text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.user_district ? "border-red-500" : ""}
                `}
                id="district"
                aria-label=".form-select-sm"
                value={selectedDistrict}
                onChange={handleDistrictChange}
              >
                <option value="Hoài Ân">
                  {intl.formatMessage({ id: "Choose District" })}
                </option>
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
              <select
                className={`text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full
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
                className={`text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.user_detail_address ? "border-red-500" : ""}`}
                placeholder={intl.formatMessage({ id: "Address" })}
                onChange={(e) =>
                  handleInputChange("user_detail_address", e.target.value)
                }
              />
            </div>
          </div>

          <div className="w-[98%] sm:w-10/12 mt-5">
            <h1 className="font-semibold pb-2 text-center">
              <FormattedMessage id="Create Account" />
            </h1>
            <div className="flex-row gap-3">
              <div>
                <input
                  type=""
                  className={`ext-xs md:text-sm border w-full border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2
                  ${checkmissing.username ? "border-red-500" : ""}`}
                  placeholder={intl.formatMessage({ id: "Username" })}
                  onChange={(e) =>
                    handleInputChange("username", e.target.value)
                  }
                />
                <p className="flex items-center gap-1 mt-2 font-sans text-sm antialiased font-normal leading-normal text-gray-700">
                  <FormattedMessage id="RegexUsername" />
                </p>
              </div>

              <div className="">
                <div className="">
                  <input
                    type="password"
                    placeholder={intl.formatMessage({ id: "Password" })}
                    id="user_password"
                    value={BusinessData?.password || ""}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className={`text-xs mt-3 md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 w-full p-2 focus:ring-blue-500 focus:border-blue-500 focus:ring-
                    ${checkmissing.password ? "border-red-500" : ""} `}
                  />
                </div>
                <p className="flex items-center gap-1 mt-2 font-sans text-sm antialiased font-normal leading-normal text-gray-700">
                  <FormattedMessage id="RegexPassword" />
                </p>
              </div>

              <div>
                <div className="relative">
                  <input
                    type="password"
                    placeholder={intl.formatMessage({ id: "ConfirmPassword" })}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    className=" text-xs mt-3 w-full md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                  />

                  <p
                    id="validation"
                    className="text-center text-orange-500 italic text-sm"
                  >
                    {validation}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[98%] sm:w-10/12 mt-5">
            <h1 className="font-semibold pb-2 text-center">
              Thông tin doanh nghiệp
            </h1>
            <div className="flex gap-3">
              {role === "ADMIN" ||
              role === "MANAGER" ||
              role === "HUMAN_RESOURCE_MANAGER" ? (
                <div className="w-full">
                  <div className="text-center dark:text-white">Agency ID</div>
                  <input
                    type=""
                    className={`text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full
                  ${checkmissing.agency_id ? "border-red-500" : ""}`}
                    placeholder="VD: BC_71000_077204005692"
                    onChange={(e) =>
                      handleInputChange("agency_id", e.target.value)
                    }
                  />
                </div>
              ) : null}
              <div className="w-full">
                <div className="text-center dark:text-white">Mã số thuế</div>
                <input
                  type=""
                  className={`text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.tax_number ? "border-red-500" : ""}`}
                  placeholder="VD: 1234567890"
                  onChange={(e) =>
                    handleInputChange("tax_number", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="flex gap-3 mt-3">
              <div className="w-full">
                <div className="text-center dark:text-white">Số điện thoại</div>
                <input
                  type="number"
                  className={`text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.phone_number ? "border-red-500" : ""}`}
                  placeholder="VD: 0988888888"
                  onChange={(e) =>
                    handleInputChange("phone_number", e.target.value)
                  }
                />
              </div>
              <div className="w-full">
                <div className="text-center dark:text-white">Email</div>
                <input
                  type=""
                  className={`text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.email ? "border-red-500" : ""}`}
                  placeholder="VD: tdlogistics@gmail.com"
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
              <div className="w-full">
                <div className="text-center dark:text-white">
                  Tên doanh nghiệp
                </div>
                <input
                  type=""
                  className={`text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.business_name ? "border-red-500" : ""}`}
                  placeholder="VD: Công ty TNHH ABC"
                  onChange={(e) =>
                    handleInputChange("business_name", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="flex gap-3 mt-3">
              <div className="w-full">
                <div className="text-center dark:text-white">Ngân hàng</div>
                <input
                  type=""
                  className={`text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.bank ? "border-red-500" : ""}`}
                  placeholder={intl.formatMessage({ id: "BankName" })}
                  onChange={(e) => handleInputChange("bank", e.target.value)}
                />
              </div>
              <div className="w-full">
                <div className="text-center dark:text-white">Số tài khoản</div>
                <input
                  type=""
                  className={`text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.bin ? "border-red-500" : ""}`}
                  placeholder={intl.formatMessage({ id: "BankNumber" })}
                  onChange={(e) => handleInputChange("bin", e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-3 mt-3">
              <select
                className={`text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.province ? "border-red-500" : ""}`}
                id="city"
                aria-label=".form-select-sm"
                value={selectedProvinceBusiness}
                onChange={handleCityChangeBusiness}
              >
                <option value="">
                  {intl.formatMessage({ id: "Choose Province" })}
                </option>
                {provincesBusiness.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <select
                className={`text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.district ? "border-red-500" : ""}
                `}
                id="district"
                aria-label=".form-select-sm"
                value={selectedDistrictBusiness}
                onChange={handleDistrictChangeBusiness}
              >
                <option value="">
                  {intl.formatMessage({ id: "Choose District" })}
                </option>
                {districtsBusiness.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
              <select
                className={`text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.town ? "border-red-500" : ""}`}
                id="ward"
                aria-label=".form-select-sm"
                value={selectedWardBusiness}
                onChange={(e) => handleWardChangeBusiness(e)}
              >
                <option value="">
                  {intl.formatMessage({ id: "Choose Ward" })}
                </option>
                {wardsBusiness.map((ward) => (
                  <option key={ward} value={ward}>
                    {ward}
                  </option>
                ))}
              </select>

              <input
                type=""
                className={`text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.detail_address ? "border-red-500" : ""}`}
                placeholder={intl.formatMessage({ id: "Address" })}
                onChange={(e) =>
                  handleInputChange("detail_address", e.target.value)
                }
              />
            </div>
          </div>
        </div>

        <Button
          className="w-full rounded-lg mt-5 mb-1 py-3 border-green-700 hover:bg-green-700 text-green-500
        bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border hover:shadow-md"
          onClick={handleSubmit}
        >
          <span className="hidden xs:block">Thêm doanh nghiệp</span>
        </Button>
        <div className=" flex place-content-center text-red-500 font-bold ">
          {error && <p>{error}</p>}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AddBusiness;
