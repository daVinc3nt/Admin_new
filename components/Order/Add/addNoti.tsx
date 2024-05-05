import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import CustomDropdown from "./dropdown";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FormattedMessage, useIntl } from "react-intl";
import axios from "axios";
import { AdministrativeOperation, CreatingOrderByAdminAndAgencyInformation, OrdersOperation } from "@/TDLib/tdlogistics";
import MapExport from "@/components/Maprender/Mapexport";
const fetch_city_ward_district = new AdministrativeOperation()
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
interface AddNotificationProps {
  onClose: () => void;
  socket: any;
}


const shipment = {
  name_sender: "Trần Vĩ Quang",
  phone_number_sender: "0908440828",
  name_receiver: "Lữ Xuân Minh",
  phone_number_receiver: "0908440838",
  mass: 10, // Khối lượng
  height: 10, // Chiều cao
  width: 10, // Chiều rộng
  length: 10, // Chiều dài
  province_source: "Thành phố Hồ Chí Minh",
  district_source: "Quận Bình Tân",
  ward_source: "Phường An Lạc",
  detail_source: "1234",
  province_dest: "Tỉnh Bà Rịa - Vũng Tàu",
  district_dest: "Huyện Đất Đỏ",
  ward_dest: "Thị trấn Đất Đỏ",
  detail_dest: "123",
  long_source: 50, // Kinh độ điểm gửi hàng
  lat_source: 50, // Vĩ độ điểm gửi hàng
  long_destination: 40, // Kinh độ điểm nhận hàng
  lat_destination: 40, // Vĩ độ điểm nhận hàng
  COD: 100, // Số tiền thu hộ (nếu có)
  service_type: "CPN"
};

const AddNotification: React.FC<AddNotificationProps> = ({ onClose, socket }) => {

  const [isShaking, setIsShaking] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [type, setType] = useState();
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity_src, setselectedCity_src] = useState("");
  const [selectedDistrict_src, setselectedDistrict_src] = useState("");
  const [selectedCity_dest, setselectedCity_dest] = useState("");
  const [selectedDistrict_dest, setselectedDistrict_dest] = useState("");
  const intl = useIntl();
  const action = new OrdersOperation()
  const [price, setPrice] = useState();
  const [checkmissing, setCheckmissing] = useState({
    user_fullname: false,
    username: false,
    user_password: false,
    user_date_of_birth: false,
    user_cccd: false,
    user_phone_number: false,
    user_email: false,
    user_position: false,
    user_bank: false,
    user_bin: false,
    user_salary: false,
    user_province: false,
    user_district: false,
    user_town: false,
    user_detail_address: false,

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
  const [orderData, setOrderData] = useState({
    name_sender: "",
    phone_number_sender: "",
    name_receiver: "",
    phone_number_receiver: "",
    mass: 0,
    height: 0,
    width: 0,
    length: 0,
    province_source: "",
    district_source: "",
    ward_source: "",
    detail_source: "",
    province_dest: "",
    district_dest: "",
    ward_dest: "",
    detail_dest: "",
    long_source: 0,
    lat_source: 0,
    long_destination: 0,
    lat_destination: 0,
    COD: 0,
    service_type: "",
  });

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server.");
    });
    socket.on("notifyError", message => {
      alert(message)
      // showing custome notification on UI
    });

    socket.on("notifySuccessCreatedNewOrder", message => {
      alert(message)
      // showing custome notification on UI
    });

    socket.on("notifyFailCreatedNewOrder", message => {
      alert(message)
      // showing custome notification on UI
    });
    socket.on("notifyNewOrderToAgency", (order) => { console.log(order) });
    // Dọn dẹp khi component bị hủy
    return () => {
      socket.off("connect");
      socket.off("notifyError");
      socket.off("notifySuccessCreatedNewOrder");
      socket.off("notifyFailCreatedNewOrder");
    };
  }, []);


  const handleUpdateLocation_d = (lat: number, lng: number) => {
    setOrderData((prevAddressInfo) => ({
      ...prevAddressInfo,
      lat_destination: lat,
      long_destination: lng,
    }));
  };

  const handleUpdateLocation_s = (lat: number, lng: number) => {
    setOrderData((prevAddressInfo) => ({
      ...prevAddressInfo,
      lat_source: lat,
      long_source: lng,
    }));
  };

  // chỗ này dùng để trích xuất thành phố đã được chọn để đưa ra quận huyện tương ứng
  const selectedCity_srcObj = cities.find((city) => city.Id === selectedCity_src);
  const districts = selectedCity_srcObj ? selectedCity_srcObj.Districts : [];
  const selectedDistrict_srcObj = districts.find(
    (user_district) => user_district.Id === selectedDistrict_src
  );
  const wards = selectedDistrict_srcObj ? selectedDistrict_srcObj.Wards : [];

  const selectedCity_destObj = cities.find((city) => city.Id === selectedCity_dest);
  const districts_dest = selectedCity_destObj ? selectedCity_destObj.Districts : [];
  const selectedDistrict_destObj = districts_dest.find(
    (user_district) => user_district.Id === selectedDistrict_dest
  );
  const wards_dest = selectedDistrict_destObj ? selectedDistrict_destObj.Wards : [];


  // chỗ này là hàm dùng để xử lý input sau khi chọn city và district
  const handleCityChange = (type: string, event: React.ChangeEvent<HTMLSelectElement>, name: string) => {
    if (type == "source") {
      setselectedCity_src(event.target.value);
      setselectedDistrict_src("");
    }
    else if (type == "destination") {
      setselectedCity_dest(event.target.value);
      setselectedDistrict_dest("");
    }
    if (event.target.value)
      handleInputChange(
        name,
        cities.find((city) => city.Id === event.target.value).Name
      );
  };
  const handleDistrictChange = (type: string, event: React.ChangeEvent<HTMLSelectElement>, name: string) => {
    if (type == "source") {
      setselectedDistrict_src(event.target.value);
      if (event.target.value)
        handleInputChange(
          name,
          districts.find((district) => district.Id === event.target.value).Name
        );
    }
    else if (type == "destination") {
      setselectedDistrict_dest(event.target.value);
      if (event.target.value)
        handleInputChange(
          name,
          districts_dest.find((district) => district.Id === event.target.value).Name
        );
    }
  };

  //chỗ này dùng để lấy số tỉnh thành về
  useEffect(() => {
    const fetchCities = async () => {
      const response = await axios.get(
        "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
      );
      setCities(response.data);
    };

    fetchCities();
  }, []);
  useEffect(() => {
    const calculate = async () => {
      if (orderData.province_source &&
        orderData.district_source &&
        orderData.ward_source &&
        orderData.detail_source &&
        orderData.province_dest &&
        orderData.district_dest &&
        orderData.ward_dest &&
        orderData.detail_dest &&
        orderData.service_type &&
        orderData.length &&
        orderData.width &&
        orderData.height && orderData.mass
      ) {
        const res = await action.calculateFee(orderData);
        setPrice(res.data);
      }
    }
    calculate();
  }, [orderData])
  const handleSubmit = () => {
    console.log(orderData)
    action.createByAdminAndAgency(socket, orderData)
  }
  const handleClickOutside = (event: MouseEvent) => {
    if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
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
  const handleInputChange = (key: string, value: any, type: string = "string") => {

    if (type == "number")
      setOrderData(prevState => ({
        ...prevState,
        [key]: parseFloat(value)
      }));
    else {
      setOrderData(prevState => ({
        ...prevState,
        [key]: value
      }));
    }
  };
  const checkvalidaddress1 = () => {
    if (
      orderData.province_source &&
      orderData.district_source &&
      orderData.ward_source &&
      orderData.detail_source
    ) {
      return true;
    }
    return false;
  };
  const checkvalidaddress = () => {
    if (
      orderData.province_dest &&
      orderData.district_dest &&
      orderData.ward_dest &&
      orderData.detail_dest
    ) {
      return true;
    }
    return false;
  }; //dung de render map
  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-60 z-50 text-[#545e7b]`}
      initial={{ opacity: 0 }} animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
      onAnimationComplete={handleAnimationComplete}
      style={{ backdropFilter: "blur(12px)" }}
    >
      <motion.div
        ref={notificationRef}
        className={`relative w-[98%] sm:w-9/12 lg:w-1/2 bg-white
        dark:bg-[#14141a] rounded-xl p-4 overflow-y-auto ${isShaking ? 'animate-shake' : ''}`}
        initial={{ scale: 0 }} animate={{ scale: isVisible ? 1 : 0 }} exit={{ scale: 0 }} transition={{ duration: 0.5 }}
      >
        <div className="relative items-center justify-center flex-col flex h-10 w-full border-b-2 border-[#545e7b]">
          <div className="font-bold text-lg sm:text-2xl pb-2 text-black dark:text-white w-full text-center"><FormattedMessage id="order.add" /></div>
          <Button className="absolute right-0 w-8 h-8 rounded-full mb-2 hover:bg-gray-300" onClick={handleClose}>
            <IoMdClose className="w-5/6 h-5/6" />
          </Button>
        </div>
        <div className="h-screen_4/5 overflow-y-scroll border border-[#545e7b] mt-4 
        no-scrollbar flex flex-col items-center bg-white
        dark:bg-[#14141a] p-2 rounded-md text-black
        dark:text-white">
          <div className="w-2/3 sm:w-10/12 mt-6">
            <h1 className="font-semibold pb-2 text-center"><FormattedMessage id="order.general" /></h1>
            <div className="flex flex-col gap-3 mt-3">
              <div className="flex gap-3">
                <input
                  type="length"
                  className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                      ${checkmissing.bank ? "border-red-500" : ""}`}
                  placeholder="Dài"
                  onChange={(e) => handleInputChange("length", e.target.value, "number")}
                />
                <input
                  type="width"
                  className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                      ${checkmissing.bank ? "border-red-500" : ""}`}
                  placeholder="Rộng"
                  onChange={(e) => handleInputChange("width", e.target.value, "number")}
                />
                <input
                  type="height"
                  className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                      ${checkmissing.bank ? "border-red-500" : ""}`}
                  placeholder="Cao"
                  onChange={(e) => handleInputChange("height", e.target.value, "number")}
                />
                <input
                  type="mass"
                  className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                    ${checkmissing.bin ? "border-red-500" : ""}`}
                  placeholder="khối lượng"
                  onChange={(e) => handleInputChange("mass", e.target.value, "number")}
                />
              </div>

              <div className="flex gap-3">
                <input
                  type="COD"
                  className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                    ${checkmissing.bin ? "border-red-500" : ""}`}
                  placeholder="COD"
                  onChange={(e) => handleInputChange("COD", e.target.value, "number")}
                />
                <select
                  name="service_type"
                  className={`text-xs text-center md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                    ${checkmissing.bin ? "border-red-500" : ""}`}
                  onChange={(e) => handleInputChange("service_type", e.target.value)}
                  value={orderData.service_type}
                >
                  <option value="">Chọn</option>
                  <option value="CPN">CPN</option>
                  <option value="TTK">TTK</option>
                  <option value="HHT">HHT</option>
                  <option value="T60">T60</option>
                </select>
              </div>
            </div>
          </div>


          <div className="w-2/3 sm:w-10/12 mt-6">
            <h1 className="font-semibold pb-2 text-center"><FormattedMessage id="order.send" /></h1>

            <div className="flex gap-3 mt-3">
              <input
                type="name_sender"
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.bank ? "border-red-500" : ""}`}
                placeholder="Tên người gửi"
                onChange={(e) => handleInputChange("name_sender", e.target.value)}
              />
              <input
                type="phone_number_sender"
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.bank ? "border-red-500" : ""}`}
                placeholder="Số điện thoại người gửi"
                onChange={(e) => handleInputChange("phone_number_sender", e.target.value)}
              />
            </div>

            <div className="flex gap-3 mt-3">

              <select id="city"
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.user_province ? "border-red-500" : ""}`}
                aria-label=".form-select-sm"
                value={selectedCity_src}
                onChange={e => handleCityChange("source", e, "province_source")}
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

              <select id="user_district"
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.user_district ? "border-red-500" : ""}
                `}
                aria-label=".form-select-sm"
                value={selectedDistrict_src}
                onChange={e => handleDistrictChange("source", e, "district_source")}
              >
                <option value="">
                  {intl.formatMessage({ id: "Choose District" })}
                </option>
                {districts.map((user_district) => (
                  <option key={user_district.Id} value={user_district.Id}>
                    {user_district.Name}
                  </option>
                ))}
              </select>

              <select id="ward"
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.user_town ? "border-red-500" : ""}`}
                aria-label=".form-select-sm"
                onChange={(e) =>
                  handleInputChange(
                    "ward_source",
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

              <input id="detail_source"
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.user_detail_address ? "border-red-500" : ""}`}
                placeholder="Số nhà-tên đường"
                onChange={(e) =>
                  handleInputChange("detail_source", e.target.value)
                }
              />
              <input
                type="lat_s"
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.bank ? "border-red-500" : ""}`}
                placeholder="Lat_s"
                onChange={(e) => handleInputChange("lat_source", e.target.value, "number")}
              />
              <input
                type="long_s"
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.bank ? "border-red-500" : ""}`}
                placeholder="Long_s"
                onChange={(e) => handleInputChange("long_source", e.target.value, "number")}
              />
            </div>
          </div>

          <div className="w-2/3 sm:w-10/12 my-6">
            <h1 className="font-semibold pb-2 text-center"><FormattedMessage id="order.to" /></h1>
            <div className="flex gap-3 mt-3">
              <input
                type="name_receiver"
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.bank ? "border-red-500" : ""}`}
                placeholder="Tên người nhận"
                onChange={(e) => handleInputChange("name_receiver", e.target.value)}
              />
              <input
                type="phone_number_receiver"
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.bank ? "border-red-500" : ""}`}
                placeholder="Số điện thoại người nhận"
                onChange={(e) => handleInputChange("phone_number_receiver", e.target.value)}
              />
            </div>
            <div className="flex gap-3 mt-3">
              <select
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.user_province ? "border-red-500" : ""}`}
                id="city"
                aria-label=".form-select-sm"
                value={selectedCity_dest}
                onChange={e => handleCityChange("destination", e, "province_dest")}
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
                ${checkmissing.user_district ? "border-red-500" : ""}
                `}
                id="user_district"
                aria-label=".form-select-sm"
                value={selectedDistrict_dest}
                onChange={e => handleDistrictChange("destination", e, "district_dest")}
              >
                <option value="">
                  {intl.formatMessage({ id: "Choose District" })}
                </option>
                {districts_dest.map((user_district) => (
                  <option key={user_district.Id} value={user_district.Id}>
                    {user_district.Name}
                  </option>
                ))}
              </select>

              <select
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.user_town ? "border-red-500" : ""}`}
                id="ward"
                aria-label=".form-select-sm"
                onChange={(e) =>
                  handleInputChange(
                    "ward_dest",
                    wards_dest.find((ward) => ward.Id === e.target.value).Name
                  )
                }
              >
                <option value="">
                  {intl.formatMessage({ id: "Choose Ward" })}
                </option>
                {wards_dest.map((ward) => (
                  <option key={ward.Id} value={ward.Id}>
                    {ward.Name}
                  </option>
                ))}
              </select>
              <input
                type=""
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.user_detail_address ? "border-red-500" : ""}`}
                placeholder="Số nhà- tên đường"
                onChange={(e) =>
                  handleInputChange("detail_dest", e.target.value)
                }
              />
            </div>
          </div>
          {checkvalidaddress() && (
            <MapExport
              province={orderData.province_dest}
              district={orderData.district_dest}
              town={orderData.ward_dest}
              detailadress={orderData.detail_dest}
              latitude={orderData.lat_destination}
              longitude={orderData.long_destination}
              onUpdateLocation={handleUpdateLocation_d}
            />
          )}
        </div>
        <div className="flex items-center gap-10">
          <div className="my-3 text-xl w-2/3 bg-inherit">
            Thành tiền (vnd): {price}
          </div>
          <Button
            onClick={handleSubmit}
            className="w-full rounded-lg mt-5 mb-1 py-3 border-green-700 hover:bg-green-700 text-green-500
        bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border hover:shadow-md">
            <span className="hidden xs:block"><FormattedMessage id="order.add" /></span>
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AddNotification;
