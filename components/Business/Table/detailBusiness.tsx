import React, { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import { FaTrash, FaPen } from "react-icons/fa";
import { FormattedMessage, useIntl } from "react-intl";
import "react-datepicker/dist/react-datepicker.css";
import {
  UpdatingBusinessCondition,
  UpdatingBusinessInfo,
  BusinessOperation,
  UpdatingContractInfo,
  UpdatingBusinessRepresentorInfo,
  FindingRepresentorByAdminCondition,
  FindingRepresentorByBusinessCondition,
  AdministrativeOperation,
  AdministrativeInfo,
  FindingContractCondition,
} from "@/TDLib/tdlogistics";
import BackupIcon from "@mui/icons-material/Backup";

interface FindingBusinessByAdminCondition {
  agency_id: string;
  bank: string;
  bin: string;
  business_id: string;
  business_name: string;
  contract: File;
  created_at: string;
  debit: number;
  detail_address: string;
  district: string;
  email: string;
  phone_number: string;
  province: string;
  tax_number: string;
  town: string;
  username: string;
}

interface DetailBusinessProps {
  onClose: () => void;
  dataInitial: FindingBusinessByAdminCondition;
  reloadData: () => void;
  info?: any;
}

const DetailBusiness: React.FC<DetailBusinessProps> = ({
  onClose,
  dataInitial,
  reloadData,
  info,
}) => {
  const intl = useIntl();
  const [fileContract, setFileContract] = useState(null);
  const [fileContractUpdate, setFileContractUpdate] = useState(null);
  const [RepresentorData, setRepresentorData] = useState({
    bank: "",
    bin: "",
    cccd: "",
    date_of_birth: "",
    detail_address: "",
    district: "",
    email: "",
    fullname: "",
    phone_number: "",
    province: "",
    town: "",
  });
  const [checkchangeRepresentor, setCheckChangeRepresentor] = useState({
    bank: "",
    bin: "",
    cccd: "",
    date_of_birth: "",
    detail_address: "",
    district: "",
    email: "",
    fullname: "",
    phone_number: "",
    province: "",
    town: "",
  });
  const [BusinessData, setBusinessData] = useState({
    agency_id: "",
    business_id: "",
    business_name: "",
    username: "",
    phone_number: "",
    email: "",
    bank: "",
    bin: "",
    province: "",
    district: "",
    town: "",
    detail_address: "",
    tax_number: "",
    debit: 0,
  });

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

  const [provinceRepresentor, setProvincesRepresentor] = useState([]);
  const [districtsRepresentor, setDistrictsRepresentor] = useState([]);
  const [wardsRepresentor, setWardsRepresentor] = useState([]);

  const [selectedProvinceRepresentor, setSelectedProvinceRepresentor] =
    useState("");
  const [selectedDistrictRepresentor, setSelectedDistrictRepresentor] =
    useState("");
  const [selectedWardRepresentor, setSelectedWardRepresentor] = useState("");

  const adminOperation = new AdministrativeOperation();
  useEffect(() => {
    const fetchData = async () => {
      const response = await adminOperation.get({});
      console.log("Tỉnh", response);
      setProvinces(response.data);
      setProvincesRepresentor(response.data);
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

  const handleProvinceChangeRepresentor = async (e) => {
    setSelectedProvinceRepresentor(e.target.value);
    b.province = e.target.value;
    handleInputChange2("province", e.target.value);
    console.log(b);
    const response = await adminOperation.get(b);
    console.log("Quận", response);
    setDistrictsRepresentor(response.data);
  };
  const handleDistrictChangeRepresentor = async (e) => {
    setSelectedDistrictRepresentor(e.target.value);
    b.province = selectedProvinceRepresentor;
    b.district = e.target.value;
    handleInputChange2("district", e.target.value);
    console.log(b);
    const response = await adminOperation.get(b);
    console.log("Xã", response);
    setWardsRepresentor(response.data);
  };
  const handleWardChangeRepresentor = (e) => {
    setSelectedWardRepresentor(e.target.value);
    handleInputChange2("town", e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log("Base", dataInitial);
      if (
        info?.role === "ADMIN" ||
        info?.role === "MANAGER" ||
        info?.role === "TELLER" ||
        info?.role === "AGENCY_MANAGER" ||
        info?.role === "AGENCY_TELLER"
      ) {
        setBusinessData({
          agency_id: dataInitial.agency_id,
          business_id: dataInitial.business_id,
          business_name: dataInitial.business_name,
          username: dataInitial.username,
          phone_number: dataInitial.phone_number,
          email: dataInitial.email,
          bank: dataInitial.bank,
          bin: dataInitial.bin,
          province: dataInitial.province,
          district: dataInitial.district,
          town: dataInitial.town,
          detail_address: dataInitial.detail_address,
          tax_number: dataInitial.tax_number,
          debit: dataInitial.debit,
        });
      }
    };
    fetchData();
  }, [dataInitial, info]);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Base", dataInitial);
      if (
        info?.role === "ADMIN" ||
        info?.role === "MANAGER" ||
        info?.role === "TELLER" ||
        info?.role === "AGENCY_MANAGER" ||
        info?.role === "AGENCY_TELLER"
      ) {
        const a = new BusinessOperation();
        const FindByID: FindingRepresentorByBusinessCondition = {
          business_id: dataInitial.business_id,
        };
        try {
          const response = await a.findRepresentorByBusiness(FindByID);
          console.log("Response data before setting state", response.data);

          console.log("Response", response);
          setRepresentorData({
            bank: response.data[0].bank,
            bin: response.data[0].bin,
            cccd: response.data[0].cccd,
            date_of_birth: response.data[0].date_of_birth,
            detail_address: response.data[0].detail_address,
            district: response.data[0].district,
            email: response.data[0].email,
            fullname: response.data[0].fullname,
            phone_number: response.data[0].phone_number,
            province: response.data[0].province,
            town: response.data[0].town,
          });
          setCheckChangeRepresentor({
            bank: response.data[0].bank,
            bin: response.data[0].bin,
            cccd: response.data[0].cccd,
            date_of_birth: response.data[0].date_of_birth,
            detail_address: response.data[0].detail_address,
            district: response.data[0].district,
            email: response.data[0].email,
            fullname: response.data[0].fullname,
            phone_number: response.data[0].phone_number,
            province: response.data[0].province,
            town: response.data[0].town,
          });

          console.log("Data", BusinessData);
        } catch (error) {
          console.error("Error fetching representor data", error);
        }
        try {
          const response = await a.findContract(FindByID);
          setFileContract(response);
          console.log("Contract", response);
        } catch (error) {
          console.error("Error fetching contract data", error);
        }
      }
    };
    fetchData();
  }, [dataInitial, info]);

  const handleInputChange = (key: string, value: string) => {
    setBusinessData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const handleInputChange2 = (key: string, value: string) => {
    setRepresentorData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleUpdateContract = async () => {
    const a = new BusinessOperation();
    const FindByID: FindingRepresentorByBusinessCondition = {
      business_id: dataInitial.business_id,
    };
    try {
      // Check if the file is a PDF
      if (fileContractUpdate && fileContractUpdate.type !== "application/pdf") {
        alert("Invalid file type. Only PDF files are allowed.");
        return;
      }
      const File: UpdatingContractInfo = {
        contractFile: fileContractUpdate,
      };
      const response = await a.updateContract(File, FindByID);
      if (response.error) {
        alert(response.message);
      } else {
        alert("Cập nhật hợp đồng thành công");
        reloadData();
      }
    } catch (error) {
      console.error("Error updating contract", error);
      alert(error.message || "Có lỗi xảy ra khi cập nhật hợp đồng");
    }
  };

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
  }; //sample data
  const handleSaveClick = async () => {
    const editPartner = new BusinessOperation();

    const info2: UpdatingBusinessInfo = {
      business_name: BusinessData.business_name,
      bank: BusinessData.bank,
      debit: BusinessData.debit,
      province: BusinessData.province,
      district: BusinessData.district,
      town: BusinessData.town,
      detail_address: BusinessData.detail_address,
    };
    if (BusinessData.email !== dataInitial.email) {
      info2.email = BusinessData.email;
    }
    if (BusinessData.phone_number !== dataInitial.phone_number) {
      info2.phone_number = BusinessData.phone_number;
    }
    if (BusinessData.bin !== dataInitial.bin) {
      info2.bin = BusinessData.bin;
    }
    const date = new Date(RepresentorData.date_of_birth);
    const formattedDate = date.toISOString().split(".")[0].replace("T", " ");

    const Representor: UpdatingBusinessRepresentorInfo = {
      bank: RepresentorData.bank,
      // bin: RepresentorData.bin,
      // cccd: RepresentorData.cccd,
      date_of_birth: formattedDate,
      detail_address: RepresentorData.detail_address,
      district: RepresentorData.district,
      // email: RepresentorData.email,
      fullname: RepresentorData.fullname,
      // phone_number: RepresentorData.phone_number,
      province: RepresentorData.province,
      town: RepresentorData.town,
    };
    if (RepresentorData.email !== checkchangeRepresentor.email) {
      Representor.email = RepresentorData.email;
    }
    if (RepresentorData.phone_number !== checkchangeRepresentor.phone_number) {
      Representor.phone_number = RepresentorData.phone_number;
    }
    if (RepresentorData.bin !== checkchangeRepresentor.bin) {
      Representor.bin = RepresentorData.bin;
    }
    if (RepresentorData.cccd !== checkchangeRepresentor.cccd) {
      Representor.cccd = RepresentorData.cccd;
    }

    if (
      info?.role === "ADMIN" ||
      info?.role === "MANAGER" ||
      info?.role === "TELLER" ||
      info?.role === "AGENCY_MANAGER" ||
      info?.role === "AGENCY_TELLER"
    ) {
      const roleAdmin: UpdatingBusinessCondition = {
        business_id: BusinessData.business_id,
      };
      try {
        const response = await editPartner.updateBusiness(info2, roleAdmin);
        if (response.error) {
          alert(response.message);
        } else {
          alert("Cập nhật thông tin doanh nghiệp thành công");
          reloadData();
        }
      } catch (error) {
        console.log("error");
      }
      try {
        const response2 = await editPartner.updateBusinessRepresentor(
          Representor,
          roleAdmin
        );
        if (response2.error) {
          alert(response2.message);
        } else {
          alert("Cập nhật thông tin người đại diện thành công");
          reloadData();
        }
      } catch (error) {
        console.log("error");
      }
      setIsEditing(false);
    } else {
      alert("Bạn không có quyền chỉnh sửa thông tin");
    }
  };

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black  bg-opacity-60 z-50 text-[#545e7b]`}
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
            Thông tin
          </div>
          <Button
            className="absolute right-0 w-8 h-8 rounded-full mb-2 hover:bg-gray-300"
            onClick={handleClose}
          >
            <IoMdClose className="w-5/6 h-5/6 " />
          </Button>
        </div>
        <div className="h-screen_3/5 overflow-y-scroll border border-[#545e7b] mt-4 no-scrollbar  dark:bg-[#14141a] p-2 rounded-md dark:text-white place-content-start">
          <div className="font-bold text-base text-center">
            Thông tin Doanh nghiệp
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-5 mt-3">
            {(info?.role === "ADMIN" ||
              info?.role === "MANAGER" ||
              info?.role === "TELLER" ||
              info?.role === "AGENCY_MANAGER" ||
              info?.role === "AGENCY_TELLER") && (
              <div className="flex gap-5 w-full">
                <div className="font-bold text-base w-48">
                  <FormattedMessage id="TransportPartner.PartnerCode" />:
                </div>
                {isEditing ? (
                  <input
                    className="w-full bg-transparent border-b-2 border-[#545e7b] dark:text-white"
                    type="text"
                    value={BusinessData?.business_id}
                    onChange={(e) =>
                      setBusinessData({
                        ...BusinessData,
                        business_id: e.target.value,
                      })
                    }
                  />
                ) : (
                  <div>BusinessData?.business_id</div>
                )}
              </div>
            )}

            <div className="flex gap-5 w-full">
              <div className="font-bold text-base w-48">Tên doanh nghiệp</div>
              {isEditing ? (
                <input
                  className="w-full bg-transparent border-b-2 border-[#545e7b] dark:text-white"
                  type="text"
                  value={BusinessData.business_name}
                  onChange={(e) =>
                    setBusinessData({
                      ...BusinessData,
                      business_name: e.target.value,
                    })
                  }
                />
              ) : (
                <div>{BusinessData?.business_name}</div>
              )}
            </div>

            <div className="flex gap-5 w-full">
              <div className="font-bold text-base w-48">
                <FormattedMessage id="PostOffice.Phone" />:
              </div>
              {isEditing ? (
                <input
                  className="w-full bg-transparent border-b-2 border-[#545e7b] dark:text-white"
                  type="text"
                  value={BusinessData.phone_number}
                  onChange={(e) =>
                    setBusinessData({
                      ...BusinessData,
                      phone_number: e.target.value,
                    })
                  }
                />
              ) : (
                <div>{BusinessData?.phone_number}</div>
              )}
            </div>
            <div className="flex gap-5 w-full">
              <div className="font-bold text-base w-48">Email:</div>
              {isEditing ? (
                <input
                  className="w-full bg-transparent border-b-2 border-[#545e7b] dark:text-white"
                  type="text"
                  value={BusinessData?.email}
                  onChange={(e) =>
                    setBusinessData({
                      ...BusinessData,
                      email: e.target.value,
                    })
                  }
                />
              ) : (
                <div>{BusinessData?.email}</div>
              )}
            </div>

            <div className="flex gap-5 w-full">
              <div className="font-bold text-base w-48">
                <FormattedMessage id="PostOffice.BankName" />:
              </div>
              {isEditing ? (
                <input
                  className="w-full bg-transparent border-b-2 border-[#545e7b] dark:text-white"
                  type="text"
                  value={BusinessData?.bank}
                  onChange={(e) =>
                    setBusinessData({ ...BusinessData, bank: e.target.value })
                  }
                />
              ) : (
                <div>{BusinessData?.bank}</div>
              )}
            </div>
            <div className="flex gap-5 w-full">
              <div className="font-bold text-base w-48">
                <FormattedMessage id="PostOffice.BankNumber" />:
              </div>
              {isEditing ? (
                <input
                  className="w-full bg-transparent border-b-2 border-[#545e7b] dark:text-white"
                  type="text"
                  value={BusinessData?.bin}
                  onChange={(e) =>
                    setBusinessData({ ...BusinessData, bin: e.target.value })
                  }
                />
              ) : (
                <div>{BusinessData?.bin}</div>
              )}
            </div>

            <div className="flex gap-5 w-full">
              <div className="font-bold text-base w-48">
                <FormattedMessage id="TransportPartner.TaxCode" />:
              </div>
              {isEditing ? (
                <input
                  className="w-full bg-transparent border-b-2 border-[#545e7b] dark:text-white"
                  type=""
                  value={BusinessData?.tax_number}
                  onChange={(e) =>
                    setBusinessData({
                      ...BusinessData,
                      tax_number: e.target.value,
                    })
                  }
                />
              ) : (
                <div>{BusinessData?.tax_number}</div>
              )}
            </div>
            <div className="flex gap-5 w-full">
              <div className="font-bold text-base w-48">
                <FormattedMessage id="TransportPartner.Debit" />:
              </div>
              {isEditing ? (
                <input
                  className="w-full bg-transparent border-b-2 border-[#545e7b] dark:text-white"
                  type="number"
                  value={BusinessData?.debit}
                  onChange={(e) =>
                    setBusinessData({
                      ...BusinessData,
                      debit: parseInt(e.target.value),
                    })
                  }
                />
              ) : (
                <div>{BusinessData?.debit || 0} vnđ</div>
              )}
            </div>
          </div>
          <div className="flex gap-5 mt-3">
            <div className="font-bold text-base w-48">
              <FormattedMessage id="TransportPartner.Adress" />:
            </div>
            {!isEditing ? (
              <div className="flex">
                <div>{BusinessData?.detail_address}/</div>
                <div>{BusinessData?.town}/</div>
                <div>{BusinessData?.district}/</div>
                <div>{BusinessData?.province}</div>
              </div>
            ) : (
              <>
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
                  <option value="Bình Định">
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
                  onChange={(e) => handleInputChange("town", e.target.value)}
                >
                  <option value="Bình Định">
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
          <div className="font-bold text-base  text-center mt-3">
            Thông tin người đại diện
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-5 mt-3">
            <div className="flex gap-5 w-full">
              <div className="font-bold text-base w-48">Họ và tên:</div>
              {isEditing ? (
                <input
                  className="w-full bg-transparent border-b-2 border-[#545e7b] dark:text-white"
                  type="text"
                  value={RepresentorData?.fullname}
                  onChange={(e) =>
                    setRepresentorData({
                      ...RepresentorData,
                      fullname: e.target.value,
                    })
                  }
                />
              ) : (
                <div>{RepresentorData?.fullname}</div>
              )}
            </div>
            <div className="flex gap-5 w-full">
              <div className="font-bold text-base w-48">Số điện thoại:</div>
              {isEditing ? (
                <input
                  className="w-full bg-transparent border-b-2 border-[#545e7b] dark:text-white"
                  type="text"
                  value={RepresentorData?.phone_number}
                  onChange={(e) =>
                    setRepresentorData({
                      ...RepresentorData,
                      phone_number: e.target.value,
                    })
                  }
                />
              ) : (
                <div>{RepresentorData?.phone_number}</div>
              )}
            </div>
            <div className="flex gap-5 w-full">
              <div className="font-bold text-base w-48">Email:</div>
              {isEditing ? (
                <input
                  className="w-full bg-transparent border-b-2 border-[#545e7b] dark:text-white"
                  type="text"
                  value={RepresentorData?.email}
                  onChange={(e) =>
                    setRepresentorData({
                      ...RepresentorData,
                      email: e.target.value,
                    })
                  }
                />
              ) : (
                <div>{RepresentorData?.email}</div>
              )}
            </div>
            <div className="flex gap-5 w-full">
              <div className="font-bold text-base w-48">Số CMND/CCCD:</div>
              {isEditing ? (
                <input
                  className="w-full bg-transparent border-b-2 border-[#545e7b] dark:text-white"
                  type="text"
                  value={RepresentorData?.cccd}
                  onChange={(e) =>
                    setRepresentorData({
                      ...RepresentorData,
                      cccd: e.target.value,
                    })
                  }
                />
              ) : (
                <div>{RepresentorData?.cccd}</div>
              )}
            </div>
            <div className="flex gap-5 w-full">
              <div className="font-bold text-base w-48">Ngày sinh:</div>
              {isEditing ? (
                <input
                  className="w-full bg-transparent border-b-2 border-[#545e7b] dark:text-white"
                  type="date"
                  value={RepresentorData?.date_of_birth}
                  onChange={(e) => {
                    setRepresentorData({
                      ...RepresentorData,
                      date_of_birth: e.target.value,
                    });
                  }}
                />
              ) : (
                <div>
                  {RepresentorData?.date_of_birth &&
                    new Date(RepresentorData.date_of_birth).toLocaleDateString(
                      "en-GB"
                    )}
                </div>
              )}
            </div>

            <div className="flex gap-5 w-full">
              <div className="font-bold text-base w-48">Ngân hàng:</div>

              {isEditing ? (
                <input
                  className="w-full bg-transparent border-b-2 border-[#545e7b] dark:text-white"
                  type="text"
                  value={RepresentorData?.bank}
                  onChange={(e) =>
                    setRepresentorData({
                      ...RepresentorData,
                      bank: e.target.value,
                    })
                  }
                />
              ) : (
                <div>{RepresentorData?.bank}</div>
              )}
            </div>
            <div className="flex gap-5 w-full">
              <div className="font-bold text-base w-48">Số tài khoản:</div>

              {isEditing ? (
                <input
                  className="w-full bg-transparent border-b-2 border-[#545e7b] dark:text-white"
                  type="text"
                  value={RepresentorData?.bin}
                  onChange={(e) =>
                    setRepresentorData({
                      ...RepresentorData,
                      bin: e.target.value,
                    })
                  }
                />
              ) : (
                <div>{RepresentorData?.bin}</div>
              )}
            </div>
          </div>
          <div className="flex gap-5 w-full mt-3">
            <div className="font-bold text-base w-48">Địa chỉ:</div>
            {isEditing ? (
              <>
                <select
                  className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                `}
                  id="city"
                  aria-label=".form-select-sm"
                  value={selectedProvinceRepresentor}
                  onChange={handleProvinceChangeRepresentor}
                >
                  <option value="Bình Định">
                    {intl.formatMessage({ id: "Choose Province" })}
                  </option>
                  {provinceRepresentor.map((city) => (
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
                  value={selectedDistrictRepresentor}
                  onChange={handleDistrictChangeRepresentor}
                >
                  <option value="Bình Định">
                    {intl.formatMessage({ id: "Choose District" })}
                  </option>
                  {districtsRepresentor.map((district) => (
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
                  value={selectedWardRepresentor}
                  onChange={handleWardChangeRepresentor}
                >
                  <option value="Bình Định">
                    {intl.formatMessage({ id: "Choose Ward" })}
                  </option>
                  {wardsRepresentor.map((ward) => (
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
                    handleInputChange2("detail_address", e.target.value)
                  }
                />
              </>
            ) : (
              <div>
                {RepresentorData?.detail_address}/{RepresentorData?.town}/
                {RepresentorData?.district}/{RepresentorData?.province}
              </div>
            )}
          </div>
          <div className="mt-5 flex flex-col place-content-center ">
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

export default DetailBusiness;
