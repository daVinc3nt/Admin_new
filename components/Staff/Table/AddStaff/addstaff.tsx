import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import CustomDropdown from "./dropdown";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FormattedMessage, useIntl } from "react-intl";
import PasswordToggle from "./PasswordToggle";
import axios from "axios";
import { CreatingStaffByAdminInfo, CreatingStaffByAgencyInfo, StaffsOperation } from "@/TDLib/tdlogistics";
interface AddStaffProps {
  onClose: () => void;
  info: any;
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
const validValue= ["ADMIN", "MANAGER", "HUMAN_RESOURCE_MANAGER"]
const AddStaff: React.FC<AddStaffProps> = ({ onClose, info }) => {
  const role = info.role
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const isAdmin = validValue.includes(role)
  useEffect(() => {
    const fetchCities = async () => {
      const response = await axios.get(
        "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
      );
      setCities(response.data);
    };

    fetchCities();
  }, []);
  const agency = validValue.includes(role);
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

  const [Staffdata, setStaffdata] = useState<CreatingStaffByAdminInfo>({
    agency_id: "",
    fullname: "",
    username: "",
    password: "",
    date_of_birth: "",
    cccd: "",
    email: "",
    phone_number: "",
    role: "",
    position: "",
    salary: 0, 
    paid_salary: 0,
    province: "",
    district: "",
    town: "",
    detail_address: "",
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
    setStaffdata((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
    setSelectedDistrict("");
    handleInputChange("province", event.target.value);
  };

  const handleDistrictChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedDistrict(event.target.value);
    handleInputChange("district", event.target.value);
  };

  const selectedCityObj = cities.find((city) => city.Id === selectedCity);
  const districts = selectedCityObj ? selectedCityObj.Districts : [];

  const selectedDistrictObj = districts.find(
    (district) => district.Id === selectedDistrict
  );
  const wards = selectedDistrictObj ? selectedDistrictObj.Wards : [];

  const roleSelectAgency = [
    "AGENCY_MANAGER",
    "AGENCY_HUMAN_RESOURCE_MANAGER",
    "AGENCY_TELLER",
    "AGENCY_COMPLAINTS_SOLVER",
    "AGENCY_DRIVER",
    "AGENCY_SHIPPER",
  ];

  const roleSelectAdmin = [
    "MANAGER",
    "HUMAN_RESOURCE_MANAGER",
    "TELLER",
    "COMPLAINTS_SOLVER",
    "AGENCY_MANAGER",
    "AGENCY_HUMAN_RESOURCE_MANAGER",
    "AGENCY_TELLER",
    "AGENCY_COMPLAINTS_SOLVER",
    "DRIVER",
    "SHIPPER",
    "AGENCY_DRIVER",
    "AGENCY_SHIPPER",
  ];

  const roleSelect = () => {
    if (Staffdata.role === "AGENCY_MANAGER") {
      return roleSelectAgency;
    } else {
      return roleSelectAdmin;
    }
  };

  const [Showpassword, setShowpassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowpassword((prevState) => !prevState);
  };
  const [Showpassword2, setShowpassword2] = useState(false);
  const togglePasswordVisibility2 = () => {
    setShowpassword2((prevState) => !prevState);
  };

  // A state variable to store the confirm password value
  const [confirmPassword, setConfirmPassword] = useState("");

  // A state variable to store the validation message
  const [validation, setValidation] = useState("");

  // A function to handle the password input change

  // A function to handle the confirm password input change
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    // Check if the confirm password matches the password
    if (e.target.value !== Staffdata.password && e.target.value !== "") {
      setValidation("Mật khẩu không khớp!");
    } else {
      setValidation("");
    }
  };
  const [checkmissing, setCheckmissing] = useState({
    agency_id: false,
    fullname: false,
    username: false,
    password: false,
    date_of_birth: false,
    cccd: false,
    phone_number: false,
    email: false,
    role: false,
    position: false,
    salary: false,
    province: false,
    district: false,
    town: false,
    detail_address: false,
    paid_salary: false
  });
  const handleCheckMissing = (key: string, value: boolean) => {
    setCheckmissing((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const [error, setError] = useState("");
  const handleSubmit = () => {
    console.log(Staffdata)
    console.log(role)
    console.log(isAdmin)
    const staff =new StaffsOperation()
    if (isAdmin)
    staff.createByAgency(Staffdata)
    else {
    staff.createByAdmin(Staffdata)
    }
    // if (
    //   Staffdata.age === "" ||
    //   Staffdata.cccd === "" ||
    //   Staffdata.date_of_birth === "" ||
    //   Staffdata.detail_address === "" ||
    //   Staffdata.district === "" ||
    //   Staffdata.email === "" ||
    //   Staffdata.fullname === "" ||
    //   Staffdata.password === "" ||
    //   Staffdata.phone_number === "" ||
    //   Staffdata.position === "" ||
    //   Staffdata.province === "" ||
    //   Staffdata.role === "" ||
    //   Staffdata.salary === "" ||
    //   Staffdata.town === "" ||
    //   Staffdata.username === ""
    // ) {
    //   setError("Vui lòng điền đầy đủ thông tin!");
    // } else {
    //   setError("");
    // }
    // if (Staffdata.cccd === "") {
    //   handleCheckMissing("cccd", true);
    // } else {
    //   handleCheckMissing("cccd", false);
    // }
    // if (Staffdata.date_of_birth === "") {
    //   handleCheckMissing("date_of_birth", true);
    // } else {
    //   handleCheckMissing("date_of_birth", false);
    // }
    // if (Staffdata.detail_address === "") {
    //   handleCheckMissing("detail_address", true);
    // } else {
    //   handleCheckMissing("detail_address", false);
    // }

    // if (Staffdata.district === "") {
    //   handleCheckMissing("district", true);
    // } else {
    //   handleCheckMissing("district", false);
    // }
    // if (Staffdata.email === "") {
    //   handleCheckMissing("email", true);
    // } else {
    //   handleCheckMissing("email", false);
    // }
    // if (Staffdata.fullname === "") {
    //   handleCheckMissing("fullname", true);
    // } else {
    //   handleCheckMissing("fullname", false);
    // }
    // if (Staffdata.password === "") {
    //   handleCheckMissing("password", true);
    // } else {
    //   handleCheckMissing("password", false);
    // }
    // if (Staffdata.phone_number === "") {
    //   handleCheckMissing("phone_number", true);
    // } else {
    //   handleCheckMissing("phone_number", false);
    // }
    // if (Staffdata.position === "") {
    //   handleCheckMissing("position", true);
    // } else {
    //   handleCheckMissing("position", false);
    // }
    // if (Staffdata.province === "") {
    //   handleCheckMissing("province", true);
    // } else {
    //   handleCheckMissing("province", false);
    // }
    // if (Staffdata.role === "") {
    //   handleCheckMissing("role", true);
    // } else {
    //   handleCheckMissing("role", false);
    // }
    // if (Staffdata.salary === "") {
    //   handleCheckMissing("salary", true);
    // } else {
    //   handleCheckMissing("salary", false);
    // }
    // if (Staffdata.town === "") {
    //   handleCheckMissing("town", true);
    // } else {
    //   handleCheckMissing("town", false);
    // }
    // if (Staffdata.username === "") {
    //   handleCheckMissing("username", true);
    // } else {
    //   handleCheckMissing("username", false);
    // }
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
        className={`relative w-[98%] sm:w-9/12 lg:w-1/2 bg-[#14141a] rounded-xl p-4 overflow-y-auto ${
          isShaking ? "animate-shake" : ""
        }`}
        initial={{ scale: 0 }}
        animate={{ scale: isVisible ? 1 : 0 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative items-center justify-center flex-col flex h-10 w-full border-b-2 border-[#545e7b]">
          <div className="font-bold text-lg sm:text-2xl pb-2 text-white w-full text-center">
            <FormattedMessage id="Staff.AddButton" />
          </div>
          <Button
            className="absolute right-0 w-8 h-8 rounded-full mb-2 hover:bg-gray-300"
            onClick={handleClose}
          >
            <IoMdClose className="w-5/6 h-5/6" />
          </Button>
        </div>
        <div>
          <div className="h-screen_3/5 overflow-y-scroll border border-[#545e7b] mt-4 no-scrollbar flex flex-col items-center bg-[#14141a] p-2 rounded-md text-white">
            <div className="w-[98%] sm:w-10/12">
              <h1 className="font-semibold pb-2 text-center">
                <FormattedMessage id="Staff.PersonalDetail" />
              </h1>
              <div className="flex gap-3">
                <input
                  type=""
                  className={`text-xs md:text-sm border border-gray-600 rounded  bg-[#14141a] h-10 p-2 w-full
                  ${checkmissing.fullname ? "border-red-500" : ""}`}
                  placeholder={intl.formatMessage({
                    id: "Staff.PersonalDetail.Fullname",
                  })}
                  onChange={(e) => handleInputChange("fullname", e.target.value)}
                />

                <input
                  type=""
                  className={`text-xs md:text-sm border border-gray-600 rounded  bg-[#14141a] h-10 p-2 w-full
                  ${checkmissing.phone_number ? "border-red-500" : ""}`}
                  placeholder={intl.formatMessage({
                    id: "Staff.PersonalDetail.Phone",
                  })}
                  onChange={(e) => handleInputChange("phone_number", e.target.value)}
                />
              </div>
              <div className="flex gap-3 mt-3">
                <input
                  type="date"
                  className={`text-xs md:text-sm border border-gray-600 rounded  bg-[#14141a] h-10 p-2 w-full
                  ${checkmissing.date_of_birth ? "border-red-500" : ""}`}
                  placeholder={intl.formatMessage({
                    id: "Staff.PersonalDetail.date_of_birth",
                  })}
                  onChange={(e) =>
                    handleInputChange("date_of_birth", e.target.value)
                  }
                />
                <input
                  type=""
                  className={`text-xs md:text-sm border border-gray-600 rounded  bg-[#14141a] h-10 p-2 w-full
                  ${checkmissing.cccd ? "border-red-500" : ""}`}
                  placeholder={intl.formatMessage({
                    id: "Staff.PersonalDetail.CCCD",
                  })}
                  onChange={(e) => handleInputChange("cccd", e.target.value)}
                />
                <input
                  type=""
                  className={`text-xs md:text-sm border border-gray-600 rounded  bg-[#14141a] h-10 p-2 w-full
                  ${checkmissing.email ? "border-red-500" : ""}`}
                  placeholder="Email"
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
              <div className="flex gap-3 mt-3">
                <select
                  className={`text-xs md:text-sm border border-gray-600 rounded  bg-[#14141a] h-10 p-2 w-full
                  ${checkmissing.province ? "border-red-500" : ""}`}
                  id="city"
                  aria-label=".form-select-sm"
                  value={selectedCity}
                  onChange={handleCityChange}
                >
                  <option value="">
                    <FormattedMessage id="Staff.PersonalDetail.SelectProvince" />
                  </option>
                  {cities.map((city) => (
                    <option key={city.Id} value={city.Id}>
                      {city.Name}
                    </option>
                  ))}
                </select>
                <select
                  className={`text-xs md:text-sm border border-gray-600 rounded  bg-[#14141a] h-10 p-2 w-full
                  ${checkmissing.district ? "border-red-500" : ""}
                  `}
                  id="district"
                  aria-label=".form-select-sm"
                  value={selectedDistrict}
                  onChange={handleDistrictChange}
                >
                  <option value="">
                    <FormattedMessage id="Staff.PersonalDetail.SelectDistrict" />
                  </option>
                  {districts.map((district) => (
                    <option key={district.Id} value={district.Id}>
                      {district.Name}
                    </option>
                  ))}
                </select>
                <select
                  className={`text-xs md:text-sm border border-gray-600 rounded  bg-[#14141a] h-10 p-2 w-full
                  ${checkmissing.town ? "border-red-500" : ""}`}
                  id="ward"
                  aria-label=".form-select-sm"
                  onChange={(e) => handleInputChange("town", e.target.value)}
                >
                  <option value="">
                    <FormattedMessage id="Staff.PersonalDetail.SelectWard" />
                  </option>
                  {wards.map((ward) => (
                    <option key={ward.Id} value={ward.Id}>
                      {ward.Name}
                    </option>
                  ))}
                </select>

                <input
                  type=""
                  className={`text-xs md:text-sm border border-gray-600 rounded  bg-[#14141a] h-10 p-2 w-full
                  ${checkmissing.detail_address ? "border-red-500" : ""}`}
                  placeholder={intl.formatMessage({
                    id: "Staff.PersonalDetail.Address",
                  })}
                  onChange={(e) =>
                    handleInputChange("detail_address", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="w-[98%] sm:w-10/12 mt-5">
              <h1 className="font-semibold pb-2 text-center">
                <FormattedMessage id="Staff.CreateAccount" />
              </h1>
              <div className="flex-row gap-">
                <div>
                  <input
                    type=""
                    className={`text-xs md:text-sm border w-full border-gray-600 rounded  bg-[#14141a] h-10 p-2 
                    ${checkmissing.username ? "border-red-500" : ""}`}
                    placeholder={intl.formatMessage({
                      id: "Staff.CreateAccount.Username",
                    })}
                    onChange={(e) =>
                      handleInputChange("username", e.target.value)
                    }
                  />
                  <p className="flex items-center gap-1 mt-2 font-sans text-sm antialiased font-normal leading-normal text-gray-700">
                    <FormattedMessage id="RegexUsername" />
                  </p>
                </div>

                <div className="">
                  <div className="relative">
                    <input
                      type={Showpassword ? "text" : "password"}
                      placeholder={intl.formatMessage({
                        id: "Staff.CreateAccount.Password",
                      })}
                      id="password"
                      value={Staffdata.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      className={`text-xs mt-3 md:text-sm border border-gray-600 rounded  bg-[#14141a] h-10 w-full p-2 focus:ring-blue-500 focus:border-blue-500 focus:ring-1
                      ${checkmissing.password ? "border-red-500" : ""}`}
                    />

                    <button onClick={togglePasswordVisibility}>
                      <PasswordToggle />
                    </button>
                  </div>
                  <p className="flex items-center gap-1 mt-2 font-sans text-sm antialiased font-normal leading-normal text-gray-700">
                    <FormattedMessage id="RegexPassword" />
                  </p>
                </div>

                <div>
                  <div className="relative">
                    <input
                      type={Showpassword2 ? "text" : "password"}
                      placeholder={intl.formatMessage({
                        id: "Staff.CreateAccount.ConfirmPassword",
                      })}
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      className={` text-xs mt-3 w-full md:text-sm border border-gray-600 rounded  bg-[#14141a] h-10 p-2 focus:ring-blue-500 focus:border-blue-500 focus:ring-1`}
                    />

                    <button onClick={togglePasswordVisibility2}>
                      <PasswordToggle />
                    </button>
                    <p
                      id="validation"
                      className="text-center text-orange-500 italic text-sm"
                    >
                      {validation}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-3">
                <div
                  className={`text-xs md:text-sm border border-gray-600 rounded  bg-[#14141a] h-10 p-2 w-full
                  ${checkmissing.role ? "border-red-500" : ""}`}
                >
                  <CustomDropdown
                    label={intl.formatMessage({ id: "Staff.Position" })}
                    options={roleSelect()}
                    selectedOption={Staffdata.role}
                    onSelectOption={(option) => handleInputChange("role", option)}
                  />
                </div>
                <input
                  type=""
                  className={`text-xs md:text-sm border border-gray-600 rounded  bg-[#14141a] h-10 p-2 w-full
                  ${checkmissing.position ? "border-red-500" : ""}`}
                  placeholder={intl.formatMessage({
                    id: "Staff.PersonalDetail.Role",
                  })}
                  onChange={(e) => handleInputChange("position", e.target.value)}
                />
                {isAdmin ? <input
                  type=""
                  className={`text-xs md:text-sm border border-gray-600 rounded  bg-[#14141a] h-10 p-2 w-full
                  ${checkmissing.position ? "border-red-500" : ""}`}
                  placeholder={"Mã bưu cục"}
                  onChange={(e) => handleInputChange("agency_id", e.target.value)}
                  /> : <></>}
                <input
                  type="number"
                  className={`text-xs md:text-sm border border-gray-600 rounded  bg-[#14141a] h-10 p-2 w-full
                  ${checkmissing.salary ? "border-red-500" : ""}`}
                  placeholder={"test"}
                  onChange={(e) => handleInputChange("salary", parseInt(e.target.value))}
                />
                
              </div>
            </div>
          </div>
          <Button
            className="w-full rounded-lg mt-5 mb-1 py-3 border-green-700 hover:bg-green-700 text-green-500
          bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border hover:shadow-md"
            onClick={handleSubmit}
          >
            <span className="hidden xs:block">
              <FormattedMessage id="Staff.AddButton" />
            </span>
          </Button>
        </div>
        <div className=" flex place-content-center text-red-500 font-bold ">
          {error && <p>{error}</p>}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AddStaff;
