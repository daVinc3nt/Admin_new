import React, { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import { FaTrash, FaPen } from "react-icons/fa";
import { FormattedMessage, useIntl } from "react-intl";
import axios from "axios";
import {
  UpdatingTransportPartnerInfo,
  UpdatingTransportPartnerCondition,
  TransportPartnersOperation,
  StaffsOperation,
} from "@/TDLib/tdlogistics";
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

interface DetailPartnerProps {
  onClose: () => void;
  dataInitial: FindingTransportPartnerByAdminConditions;
}

const DetailPartner: React.FC<DetailPartnerProps> = ({
  onClose,
  dataInitial,
}) => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await staff.getAuthenticatedStaffInfo();
      setRole(res.data.role);
    };

    fetchData();
  }, []);
  const intl = useIntl();
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  useEffect(() => {
    const fetchCities = async () => {
      const response = await axios.get(
        "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
      );
      setCities(response.data);
    };

    fetchCities();
  }, []);
  const [PartnerData, setPartnerData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await staff.getAuthenticatedStaffInfo();
      if (res.data.role === "ADMIN") {
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
    fetchData();
  }, [dataInitial]);

  const handleInputChange = (key: string, value: string) => {
    setPartnerData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
    setSelectedDistrict("");
    handleInputChange(
      "province",
      cities.find((city) => city.Id === event.target.value).Name
    );
  };

  const handleDistrictChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedDistrict(event.target.value);
    handleInputChange(
      "district",
      districts.find((district) => district.Id === event.target.value).Name
    );
  };

  const selectedCityObj = cities.find((city) => city.Id === selectedCity);
  const districts = selectedCityObj ? selectedCityObj.Districts : [];

  const selectedDistrictObj = districts.find(
    (district) => district.Id === selectedDistrict
  );
  const wards = selectedDistrictObj ? selectedDistrictObj.Wards : [];
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

    const info: UpdatingTransportPartnerInfo = {
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
    if (role === "ADMIN") {
      const roleAdmin: UpdatingTransportPartnerCondition = {
        transport_partner_id: PartnerData.transport_partner_id,
      };
      const response = await editPartner.update(info, roleAdmin);
      if (response.error) {
        console.log("error");
      }

      setIsEditing(false);
    } else {
      const roleAdmin: UpdatingTransportPartnerCondition = {
        transport_partner_id: dataInitial.transport_partner_id,
      };
      const response = await editPartner.update(info, roleAdmin);
      if (response.error) {
        console.log("error");
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
        <div className="h-screen_3/5 overflow-y-scroll border border-[#545e7b] mt-4 no-scrollbar  dark:bg-[#14141a] p-2 rounded-md dark:text-white place-content-center">
          <div className="grid grid-cols ">
            {role === "ADMIN" && (
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
                    value={selectedCity}
                    onChange={handleCityChange}
                  >
                    <option value="">
                      {intl.formatMessage({ id: "Choose Province" })}
                    </option>
                    {cities.map((city) => (
                      <option key={city.Id} value={city.Id}>
                        {city.Name}
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
                      <option key={district.Id} value={district.Id}>
                        {district.Name}
                      </option>
                    ))}
                  </select>
                  <select
                    className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                `}
                    id="ward"
                    aria-label=".form-select-sm"
                    onChange={(e) =>
                      handleInputChange(
                        "town",
                        wards.find((ward) => ward.Id === e.target.value).Name
                      )
                    }
                  >
                    <option value="">
                      {intl.formatMessage({ id: "Choose Ward" })}
                    </option>
                    {wards.map((ward) => (
                      <option key={ward.Id} value={ward.Id}>
                        {ward.Name}
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
