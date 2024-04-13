import React, { useRef, useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import { FaTrash, FaPen } from "react-icons/fa";
import { FormattedMessage, useIntl } from "react-intl";
import {
  UpdatingTransportPartnerInfo,
  UpdatingTransportPartnerCondition,
  TransportPartnersOperation,
  AdministrativeOperation,
  AdministrativeInfo,
} from "@/TDLib/tdlogistics";
import NotiPopup from "@/components/Common/NotiPopup";
import { set } from "date-fns";

interface FindingTransportPartnerByAdminConditions {
  transport_partner_id: string;
  tax_code: string;
  transport_partner_name: string;
  province: string;
  district: string;
  town: string;
  detail_address: string;
  phone_number: string;
  email: string;
  bin: string;
  bank: string;
  debit: string;
}

interface DetailPartnerProps {
  onClose: () => void;
  dataInitial: FindingTransportPartnerByAdminConditions;
  reloadData?: () => void;
  info?: any;
}

const DetailPartner: React.FC<DetailPartnerProps> = ({
  onClose,
  dataInitial,
  reloadData,
  info,
}) => {
  const [NotiIsOpen, setNotiIsOpen] = useState(false);

  const openNoti = () => {
    setNotiIsOpen(true);
  };

  const closeNoti = () => {
    setNotiIsOpen(false);
  };
  const [message, setMessage] = useState("");

  const intl = useIntl();
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

  const [PartnerData, setPartnerData] = useState(null);

  const fetchData = async () => {
    if (info?.role === "ADMIN") {
      setPartnerData({
        transport_partner_id: dataInitial.transport_partner_id,
        transport_partner_name: dataInitial.transport_partner_name,
        phone_number: dataInitial.phone_number,
        email: dataInitial.email,
        bank: dataInitial.bank,
        bin: dataInitial.bin,
        province: dataInitial.province,
        district: dataInitial.district,
        town: dataInitial.town,
        detail_address: dataInitial.detail_address,
        tax_code: dataInitial.tax_code,
        debit: dataInitial.debit,
      });
    } else {
      setPartnerData({
        transport_partner_name: dataInitial.transport_partner_name,
        phone_number: dataInitial.phone_number,
        email: dataInitial.email,
        bank: dataInitial.bank,
        bin: dataInitial.bin,
        province: dataInitial.province,
        district: dataInitial.district,
        town: dataInitial.town,
        detail_address: dataInitial.detail_address,
        tax_code: dataInitial.tax_code,
        debit: dataInitial.debit,
      });
    }
  };
  useEffect(() => {
    fetchData();
  }, [dataInitial, info]);

  const handleInputChange = (key: string, value: string) => {
    setPartnerData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
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
    const editPartner = new TransportPartnersOperation();

    const info2: UpdatingTransportPartnerInfo = {
      transport_partner_name: PartnerData.transport_partner_name,
      phone_number: PartnerData.phone_number,
      email: PartnerData.email,
      bank: PartnerData.bank,
      bin: PartnerData.bin,
      province: PartnerData.province,
      district: PartnerData.district,
      town: PartnerData.town,
      detail_address: PartnerData.detail_address,
      tax_code: PartnerData.tax_code,
      debit: PartnerData.debit,
    };
    if (info?.role === "ADMIN") {
      const roleAdmin: UpdatingTransportPartnerCondition = {
        transport_partner_id: PartnerData.transport_partner_id,
      };
      try {
        const response = await editPartner.update(info2, roleAdmin);
        // console.log("res", response);
        if (response.error === true) {
          setMessage("Cập nhật thông tin không thành công" + response.message);
          openNoti();
        } else {
          setMessage("Cập nhật thông tin thành công");
          openNoti();
          reloadData();
        }
      } catch (e) {
        setMessage("Cập nhật thông tin không thành công" + e.message);
        openNoti();
      }

      setIsEditing(false);
    } else {
      const roleAdmin: UpdatingTransportPartnerCondition = {
        transport_partner_id: dataInitial.transport_partner_id,
      };
      const response = await editPartner.update(info2, roleAdmin);
      if (response.error) {
        // console.log("error");
      }

      setIsEditing(false);
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
            <FormattedMessage id="TransportPartner.Add.PartnerInfo" />
          </div>
          <Button
            className="absolute right-0 w-8 h-8 rounded-full mb-2 hover:bg-gray-300"
            onClick={handleClose}
          >
            <IoMdClose className="w-5/6 h-5/6 " />
          </Button>
        </div>
        <div className="h-screen_3/5 overflow-y-scroll border border-[#545e7b] mt-4 no-scrollbar  dark:bg-[#14141a] p-2 rounded-md dark:text-white place-content-start">
          {NotiIsOpen && <NotiPopup message={message} onClose={closeNoti} />}
          <div className="grid grid-cols ">
            {info?.role === "ADMIN" && (
              <div className="flex gap-5">
                <div className="font-bold text-base">
                  <FormattedMessage id="TransportPartner.PartnerCode" />:
                </div>
                {isEditing ? (
                  <input
                    className="w-1/2 bg-transparent border-b-2 border-[#545e7b] dark:text-white"
                    type="text"
                    value={PartnerData?.transport_partner_id}
                    onChange={(e) =>
                      setPartnerData({
                        ...PartnerData,
                        transport_partner_id: e.target.value,
                      })
                    }
                  />
                ) : (
                  <div>{PartnerData?.transport_partner_id}</div>
                )}
              </div>
            )}

            <div className="flex gap-5">
              <div className="font-bold text-base">
                <FormattedMessage id="TransportPartner.Name" />:
              </div>
              {isEditing ? (
                <input
                  className="w-1/2 bg-transparent border-b-2 border-[#545e7b] dark:text-white"
                  type="text"
                  value={PartnerData.transport_partner_name}
                  onChange={(e) =>
                    setPartnerData({
                      ...PartnerData,
                      transport_partner_name: e.target.value,
                    })
                  }
                />
              ) : (
                <div>{PartnerData?.transport_partner_name}</div>
              )}
            </div>

            <div className="flex gap-5">
              <div className="font-bold text-base">
                <FormattedMessage id="PostOffice.Phone" />:
              </div>
              {isEditing ? (
                <input
                  className="w-1/2 bg-transparent border-b-2 border-[#545e7b] dark:text-white"
                  type="text"
                  value={PartnerData.phone_number}
                  onChange={(e) =>
                    setPartnerData({
                      ...PartnerData,
                      phone_number: e.target.value,
                    })
                  }
                />
              ) : (
                <div>{PartnerData?.phone_number}</div>
              )}
            </div>
            <div className="flex gap-5">
              <div className="font-bold text-base">Email:</div>
              {isEditing ? (
                <input
                  className="w-1/2 bg-transparent border-b-2 border-[#545e7b] dark:text-white"
                  type="text"
                  value={PartnerData?.email}
                  onChange={(e) =>
                    setPartnerData({ ...PartnerData, email: e.target.value })
                  }
                />
              ) : (
                <div>{PartnerData?.email}</div>
              )}
            </div>

            <div className="flex gap-5">
              <div className="font-bold text-base">
                <FormattedMessage id="PostOffice.BankName" />:
              </div>
              {isEditing ? (
                <input
                  className="w-1/2 bg-transparent border-b-2 border-[#545e7b] dark:text-white"
                  type="text"
                  value={PartnerData?.bank}
                  onChange={(e) =>
                    setPartnerData({ ...PartnerData, bank: e.target.value })
                  }
                />
              ) : (
                <div>{PartnerData?.bank}</div>
              )}
            </div>
            <div className="flex gap-5">
              <div className="font-bold text-base">
                <FormattedMessage id="PostOffice.BankNumber" />:
              </div>
              {isEditing ? (
                <input
                  className="w-1/2 bg-transparent border-b-2 border-[#545e7b] dark:text-white"
                  type="text"
                  value={PartnerData?.bin}
                  onChange={(e) =>
                    setPartnerData({ ...PartnerData, bin: e.target.value })
                  }
                />
              ) : (
                <div>{PartnerData?.bin}</div>
              )}
            </div>

            <div className="flex gap-5">
              <div className="font-bold text-base">
                <FormattedMessage id="TransportPartner.TaxCode" />:
              </div>
              {isEditing ? (
                <input
                  className="w-1/2 bg-transparent border-b-2 border-[#545e7b] dark:text-white"
                  type="text"
                  value={PartnerData?.tax_code}
                  onChange={(e) =>
                    setPartnerData({ ...PartnerData, tax_code: e.target.value })
                  }
                />
              ) : (
                <div>{PartnerData?.tax_code}</div>
              )}
            </div>
            <div className="flex gap-5">
              <div className="font-bold text-base">
                <FormattedMessage id="TransportPartner.Debit" />:
              </div>
              {isEditing ? (
                <input
                  className="w-1/2 bg-transparent border-b-2 border-[#545e7b] dark:text-white"
                  type="text"
                  value={PartnerData?.debit}
                  onChange={(e) =>
                    setPartnerData({ ...PartnerData, debit: e.target.value })
                  }
                />
              ) : (
                <div>{PartnerData?.debit || 0} vnđ</div>
              )}
            </div>

            <div className="flex gap-3 mt-3">
              {!isEditing ? (
                <div className="flex gap-3">
                  <div className="font-bold text-base">
                    <FormattedMessage id="TransportPartner.Adress" />:
                  </div>
                  <div>{PartnerData?.detail_address}/</div>
                  <div>{PartnerData?.town}/</div>
                  <div>{PartnerData?.district}/</div>
                  <div>{PartnerData?.province}</div>
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
                    placeholder="Số nhà- tên đường"
                    onChange={(e) =>
                      handleInputChange("detail_address", e.target.value)
                    }
                  />
                </>
              )}
            </div>
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

export default DetailPartner;
