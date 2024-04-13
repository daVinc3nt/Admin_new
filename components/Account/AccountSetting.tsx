import React from "react";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import {
  StaffsOperation,
  AdministrativeInfo,
  UpdatingStaffCondition,
  AdministrativeOperation,
  FindingAvatarCondition,
  UpdatingAvatarStaffInfo,
} from "@/TDLib/tdlogistics";
import NotiPopup from "../Common/NotiPopup";
import { Person } from "@mui/icons-material";
import BackupIcon from "@mui/icons-material/Backup";
import { useIntl, FormattedMessage } from "react-intl";
import { set } from "date-fns";
interface UserData {
  agency_id: string;
  avatar: string;
  bank: string;
  bin: string;
  cccd: string;
  date_of_birth: string;
  detail_address: string;
  district: string;
  email: string;
  fullname: string;
  paid_salary: string;
  password: string;
  phone_number: string;
  position: string;
  privileges: string[];
  province: string;
  salary: number;
  staff_id: string;
  town: string;
  username: string;
}
const AccountSetting = (info) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  const [NotiIsOpen, setNotiIsOpen] = useState(false);

  function openNoti() {
    setNotiIsOpen(true);
  }

  function closeNoti() {
    setNotiIsOpen(false);
  }
  const [message, setMessage] = useState("");
  const intl = useIntl();
  const [staff_id, setStaff_id] = useState("");
  const userOp2 = new StaffsOperation();
  const [staffInfo, setStaffInfo] = useState<UserData>({
    agency_id: "",
    avatar: "",
    bank: "",
    bin: "",
    cccd: "",
    date_of_birth: "",
    detail_address: "",
    district: "",
    email: "",
    fullname: "",
    paid_salary: "",
    password: "",
    phone_number: "",
    position: "",
    privileges: [],
    province: "",
    salary: 0,
    staff_id: "",
    town: "",
    username: "",
  });

  const [avatar, setAvatar] = useState(null);
  const [Update, setUpdate] = useState({
    fullname: "",
    username: "",
    date_of_birth: "",
    email: "",
    phone_number: "",
    role: "",
    salary: 0,
    paid_salary: "",
    province: "",
    district: "",
    town: "",
    detail_address: "",
  });
  const reloadData = async () => {
    fetchData();
  };

  const fetchData = async () => {
    const res2 = await userOp2.getAuthenticatedStaffInfo();
    // console.log("res2", res2);
    setStaff_id(res2.data.staff_id);
    setStaffInfo({
      agency_id: res2.data.agency_id,
      avatar: res2.data.avatar,
      bank: res2.data.bank,
      bin: res2.data.bin,
      cccd: res2.data.cccd,
      date_of_birth: res2.data.date_of_birth,
      detail_address: res2.data.detail_address,
      district: res2.data.district,
      email: res2.data.email,
      fullname: res2.data.fullname,
      paid_salary: res2.data.paid_salary,
      password: res2.data.password,
      phone_number: res2.data.phone_number,
      position: res2.data.position,
      privileges: res2.data.privileges,
      province: res2.data.province,
      salary: res2.data.salary,
      staff_id: res2.data.staff_id,
      town: res2.data.town,
      username: res2.data.username,
    });
    setUpdate({
      fullname: res2.data.fullname,
      username: res2.data.username,
      date_of_birth: res2.data.date_of_birth,
      email: res2.data.email,
      phone_number: res2.data.phone_number,
      role: res2.data.role,
      salary: res2.data.salary,
      paid_salary: res2.data.paid_salary,
      province: res2.data.province,
      district: res2.data.district,
      town: res2.data.town,
      detail_address: res2.data.detail_address,
    });
    const get: FindingAvatarCondition = {
      staff_id: res2.data.staff_id,
    };
    // console.log("get", get);
    const url = await userOp2.getAvatar(get);
    // console.log("AVT", url);
    setAvatar(url);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const [isEditInfo, setIsEditInfo] = useState(true);
  const [passwordInfo, setPasswordInfo] = useState({
    new_password: "",
    confirm_password: "",
  });
  const adminOperation = new AdministrativeOperation();
  const a: AdministrativeInfo = {
    province: "",
  };
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  const handleInputChange = (key: string, value: any) => {
    setUpdate((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
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
    handleInputChange("province", e.target.value);
    // console.log(a);
    const response = await adminOperation.get(a);
    // console.log("Quận", response);
    setDistricts(response.data);
  };

  const handleDistrictChange = async (e) => {
    setSelectedDistrict(e.target.value);
    a.province = selectedProvince;
    a.district = e.target.value;
    handleInputChange("district", e.target.value);
    // console.log(a);
    const response = await adminOperation.get(a);
    // console.log("Xã", response);
    setWards(response.data);
  };
  const handleWardChange = (e) => {
    setSelectedWard(e.target.value);
    handleInputChange("town", e.target.value);
  };

  const handleEditInfo = () => {
    setIsEditInfo(!isEditInfo);
  };
  const handleUpdateInfo = async () => {
    // console.log("iddddd", staff_id);
    // console.log("update", Update);
    const Staffcondition: UpdatingStaffCondition = {
      staff_id: staff_id,
    };
    try {
      setUpdate((previous) => ({
        ...previous,
        fullname: previous.fullname.trim(),
        username: previous.username.trim(),
        date_of_birth: previous.date_of_birth.trim(),
        email: previous.email.trim(),
        phone_number: previous.phone_number.trim(),
        role: previous.role.trim(),
        province: previous.province.trim(),
        district: previous.district.trim(),
        town: previous.town.trim(),
        detail_address: previous.detail_address.trim(),
      }));
      const response = await userOp2.update(Update, Staffcondition);
      // console.log("response", response);

      if (response.error.error === false) {
        setMessage("Cập nhật thông tin thành công");
        openNoti();
        reloadData();
      } else {
        setMessage("Cập nhật thông tin thất bại  \n" + response.error.message);
        openNoti();
      }
    } catch (e) {
      setMessage("e");
      openNoti();
    }

    setIsEditInfo(!isEditInfo);
  };
  const handleChangePassword = async () => {
    const up: UpdatingStaffCondition = {
      staff_id: staff_id,
    };
    try {
      const reponse = await userOp2.updatePassword(passwordInfo, up);
      // console.log("reponse", reponse);
      if (reponse.error.error === false) {
        setMessage("Đổi mật khẩu thành công");
        openNoti();
        reloadData();
      } else {
        setMessage("Đổi mật khẩu thất bại \n" + reponse.error.message);
        openNoti();
      }
    } catch (e) {
      setMessage(e);
      openNoti();
    }
  };
  const [avaterUpload, setAvaterUpload] = useState(null);
  const handleUpdateAvatar = async () => {
    const staffInfo: UpdatingAvatarStaffInfo = {
      avatarFile: avaterUpload,
    };
    const id: UpdatingStaffCondition = {
      staff_id: staff_id,
    };
    const response = await userOp2.updateAvatar(staffInfo, id);
    // console.log("response", response);
    if (response.error === false) {
      setMessage("Cập nhật ảnh đại diện thành công");
      openNoti();
      reloadData();
      setAvaterUpload(null);
    } else {
      setMessage("Cập nhật ảnh đại diện thất bại");
      openNoti();
    }
  };
  return (
    <div className="flex flex-col gap-5  h-full bg-white dark:bg-[#1a1b23] pb-5">
      <div className="flex flex-col place-content-center mt-3">
        <div className="text-xl font-bold md:text-start text-center">
          <FormattedMessage id="Account.info" />
        </div>
        <div className="flex flex-col text-xs font-base gap-3 mt-3 ">
          <div>
            <div className="text-base font-light">
              <FormattedMessage id="Account.IMG" /> :
            </div>
            <div className=" flex flex-row place place-content-center justify-center items-center  border-2 h-20 border-blue-200  rounded-lg mt-3">
              {avatar && (
                <div className="pl-5 py-2 w-20 h-20 ">
                  <img
                    src={avatar}
                    alt="Avatar"
                    className="h-full bg-white border rounded"
                    onClick={openModal}
                  />
                </div>
              )}
              {!avatar && (
                <div className="pl-5 py-2 w-20 h-20 ">
                  <Person className=" h-16 bg-white border rounded-xl" />
                </div>
              )}

              <div className="flex-grow items-center justify-center ">
                <label className="flex place-content-center  py-6">
                  <BackupIcon className="ml-3 h-6 w-6" />

                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setAvaterUpload(file);
                    }}
                  />
                  {avaterUpload && (
                    <div className="ml-3 font-bold text-base">
                      {avaterUpload.name}
                    </div>
                  )}
                  {!avaterUpload && (
                    <div className="ml-3 font-bold text-base">
                      <FormattedMessage id="Account.UpdateImg" />
                    </div>
                  )}
                </label>
              </div>
              <button
                onClick={handleUpdateAvatar}
                className="text-white place-items-center h-full w-20 font-bold rounded-lg bg-blue-500 hover:bg-blue-400"
              >
                <FormattedMessage id="Account.Confirm" />
              </button>
            </div>
          </div>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          className={`fixed top-0 left-0 right-0 bg-black bottom-0 flex items-center justify-center bg-opacity-60 z-50 text-[#545e7b] rounded-md`}
        >
          <div className={`relative  h-168 rounded-xl p-4 overflow-y-auto`}>
            <button
              onClick={closeModal}
              className="absolute right-2 top-2 text-red-400 hover:text-red-600 rounded-sm font-bold text-lg bg-white hover:bg-gray-100 p-1 w-8 h-8 flex place-content-center place-items-center z"
            >
              X
            </button>
            <img src={avatar} alt="Avatar" className="h-full rounded-sm" />
          </div>
        </Modal>
        {NotiIsOpen && <NotiPopup onClose={closeNoti} message={message} />}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-3 mt-3">
          <div className="flex flex-col text-xs font-base gap-3 ">
            <div>
              <div className="text-base font-light">
                <FormattedMessage id="Account.fullname" /> :
              </div>
            </div>
            {!isEditInfo ? (
              <input
                type="text"
                className="flex place-content-center text-base h-8 font-normal border-b-blue-600  dark:border-b-indigo-800 dark:hover:bg-gray-600 dark:focus:bg-gray-700 rounded-md   border-b  hover:bg-blue-50 focus:bg-blue-100 shadow-sm w-full  py-2 hover:border-blue-500 hover:shadow-md focus:outline-none pl-2 "
                placeholder={intl.formatMessage({
                  id: "Account.inputfullname",
                })}
                value={Update.fullname}
                onChange={(e) => handleInputChange("fullname", e.target.value)}
              />
            ) : (
              <div className="flex text-base h-8 font-normal border-b-blue-600  dark:border-b-indigo-800 dark:hover:bg-gray-600 dark:focus:bg-gray-700 rounded-md  border-b  hover:bg-blue-50 focus:bg-blue-100 shadow-sm w-full  py-2 hover:border-blue-500 hover:shadow-md focus:outline-none pl-2">
                {Update.fullname}{" "}
              </div>
            )}
          </div>
          <div className="flex flex-col text-xs font-base gap-3">
            <div>
              <div className="text-base font-light">
                <FormattedMessage id="Account.phonenumber" /> :
              </div>
            </div>
            {!isEditInfo ? (
              <input
                type="text"
                className="flex place-content-center text-base h-8 font-normal border-b-blue-600  dark:border-b-indigo-800 dark:hover:bg-gray-600 dark:focus:bg-gray-700 rounded-md border-b  hover:bg-blue-50 focus:bg-blue-100 shadow-sm w-full  py-2 hover:border-blue-500 hover:shadow-md focus:outline-none pl-2"
                placeholder={intl.formatMessage({
                  id: "Account.inputphonenumber",
                })}
                value={Update.phone_number}
                onChange={(e) =>
                  handleInputChange("phone_number", e.target.value)
                }
              />
            ) : (
              <div className="flex  text-base h-8 font-normal border-b-blue-600  dark:border-b-indigo-800 dark:hover:bg-gray-600 dark:focus:bg-gray-700 rounded-md border-b  hover:bg-blue-50 focus:bg-blue-100 shadow-sm w-full  py-2 hover:border-blue-500 hover:shadow-md focus:outline-none pl-2">
                {Update.phone_number}
              </div>
            )}
          </div>
          <div className="flex flex-col text-xs font-base gap-3 ">
            <div>
              <div className="text-base font-light">
                <FormattedMessage id="Account.CCCD" /> :
              </div>
            </div>
            {!isEditInfo ? (
              <div>
                <input
                  type="text"
                  className="flex place-content-center text-base h-8 font-normal border-b-blue-600  dark:border-b-indigo-800 dark:hover:bg-gray-600 dark:focus:bg-gray-700 rounded-md border-b  hover:bg-blue-50 focus:bg-blue-100 shadow-sm w-full  py-2 hover:border-blue-500 hover:shadow-md focus:outline-none pl-2"
                  placeholder={intl.formatMessage({ id: "Account.inputCCCD" })}
                  value={staffInfo.cccd}
                  onChange={(e) => handleInputChange("cccd", e.target.value)}
                />
              </div>
            ) : (
              <div className="flex text-base h-8 font-normal border-b-blue-600  dark:border-b-indigo-800 dark:hover:bg-gray-600 dark:focus:bg-gray-700 rounded-md border-b  hover:bg-blue-50 focus:bg-blue-100 shadow-sm w-full  py-2 hover:border-blue-500 hover:shadow-md focus:outline-none pl-2 ">
                {staffInfo.cccd}
              </div>
            )}
          </div>

          <div className="flex flex-col text-xs font-base gap-3">
            <div>
              <div className="text-base font-light">
                <FormattedMessage id="Account.position" /> :
              </div>
            </div>
            <div className="flex  text-base h-8 font-normal border-b-blue-600  dark:border-b-indigo-800 dark:hover:bg-gray-600 dark:focus:bg-gray-700 rounded-md border-b  hover:bg-blue-50 focus:bg-blue-100 shadow-sm w-full  py-2 hover:border-blue-500 hover:shadow-md focus:outline-none pl-2">
              {Update.role}
            </div>
          </div>
          <div className="flex flex-col text-xs font-base gap-3">
            <div>
              <div className="text-base font-light">Email :</div>
            </div>
            {!isEditInfo ? (
              <input
                type="text"
                className="flex place-content-center text-base h-8 font-normal border-b-blue-600  dark:border-b-indigo-800 dark:hover:bg-gray-600 dark:focus:bg-gray-700 rounded-md border-b  hover:bg-blue-50 focus:bg-blue-100 shadow-sm w-full  py-2 hover:border-blue-500 hover:shadow-md focus:outline-none pl-2"
                placeholder={intl.formatMessage({ id: "Account.inputEmail" })}
                value={Update.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            ) : (
              <div className="flex  text-base h-8 font-normal border-b-blue-600  dark:border-b-indigo-800 dark:hover:bg-gray-600 dark:focus:bg-gray-700 rounded-md border-b  hover:bg-blue-50 focus:bg-blue-100 shadow-sm w-full  py-2 hover:border-blue-500 hover:shadow-md focus:outline-none pl-2">
                {Update.email}
              </div>
            )}
          </div>
          <div className="flex flex-col text-xs font-base gap-3">
            <div>
              <div className="text-base font-light">
                <FormattedMessage id="Account.dateofbirth" /> :
              </div>
            </div>

            <div className="flex text-base h-8 font-normal border-b-blue-600  dark:border-b-indigo-800 dark:hover:bg-gray-600 dark:focus:bg-gray-700 rounded-md border-b  hover:bg-blue-50 focus:bg-blue-100 shadow-sm w-full  py-2 hover:border-blue-500 hover:shadow-md focus:outline-none pl-2">
              {new Date(Update.date_of_birth).toLocaleDateString("vi-VN")}
            </div>
          </div>

          {/* <div className="flex flex-col text-xs font-base gap-3">
            <div>
              <div className="text-base font-light">Giới tính :</div>
            </div>
            {!isEditInfo ? (
              <input
                type="text"
                className="flex place-content-center h-8 border  hover:bg-gray-100 focus:bg-slate-200 rounded-md w-1/2 py-2 hover:border-gray-500 hover:shadow-md focus:outline-none pl-2 "
                placeholder="Nam"
              />
            ) : (
              <div className="text-xs font-base w-1/2 py-2 pl-2">Nam</div>
            )}
          </div>
          <div className="flex flex-col text-xs font-base gap-3">
            <div>
              <div className="text-base font-light">Địa chỉ :</div>
            </div>
            {!isEditInfo ? (
              <input
                type="text"
                className="flex place-content-center h-8 border  hover:bg-gray-100 focus:bg-slate-200 rounded-md w-1/2 py-2 hover:border-gray-500 hover:shadow-md focus:outline-none pl-2 "
                placeholder="123 Đường ABC, Quận 1, TP.HCM"
              />
            ) : (
              <div className="text-xs font-base w-1/2 py-2 pl-2">
                123 Đường ABC, Quận 1, TP.HCM
              </div>
            )}
          </div> */}
        </div>
        <div className="flex flex-row text-xs font-base h-10 mt-5 mb-3">
          <div className="text-base font-light w-20">
            <FormattedMessage id="Account.address" />:
          </div>

          {!isEditInfo ? (
            <div className="md:flex md:flex-row grid grid-cols-2 gap-3 w-full">
              <select
                className={` text-xs md:text-base  border border-gray-600 rounded  dark:bg-[#14141a] h-7  w-full
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
                className={` text-xs md:text-base  border border-gray-600 rounded  dark:bg-[#14141a] h-7  w-full
                
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
                className={` text-xs md:text-base  border border-gray-600 rounded  dark:bg-[#14141a] h-7  w-full
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
                className={` text-xs md:text-base  border border-gray-600 rounded  dark:bg-[#14141a] h-7  w-full
                `}
                placeholder={intl.formatMessage({
                  id: "Account.detailaddress",
                })}
                onChange={(e) =>
                  handleInputChange("user_detail_address", e.target.value)
                }
              />
            </div>
          ) : (
            <div className="text-base font-base w-full ">
              {Update.detail_address}
              {Update.town}
              {Update.district}
              {Update.province}
            </div>
          )}
        </div>
        {!isEditInfo ? (
          <div className="flex place-content-center mt-4 ">
            <button
              onClick={handleUpdateInfo}
              className="mt-3 flex place-content-center bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded w-1/2 md:w-1/6"
            >
              <FormattedMessage id="Account.Update" />
            </button>
            <button
              onClick={handleEditInfo}
              className="mt-3 flex place-content-center bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded w-1/2 md:w-1/6"
            >
              <FormattedMessage id="Account.Cantel" />
            </button>
          </div>
        ) : (
          <div className=" w-full  flex place-content-center mt-4">
            <button
              onClick={handleEditInfo}
              className="w-full md:w-1/3 mt-3 flex place-content-center bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            >
              <FormattedMessage id="Account.AdjustInfomation" />
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-col place-content-center">
        <div className="text-xl font-bold">
          <FormattedMessage id="Account.SettingAccount" />
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mt-3">
          <div>
            <div className="flex flex-col text-xs font-base gap-3">
              <div>
                <div className="text-base font-light">
                  <FormattedMessage id="Account.UserName" /> :
                </div>
              </div>
              <div className="text-base font-base w-1/2 pb-2 pl-2">
                {staffInfo.username}
              </div>
            </div>
            <div className="flex flex-col text-xs font-base gap-3">
              <div>
                <div className="text-base font-light">
                  <FormattedMessage id="Account.ChangePassword" /> :
                </div>
              </div>
              <div>
                <FormattedMessage id="Account.NewPassword" />
              </div>
              <input
                type="password"
                onChange={(e) =>
                  setPasswordInfo({
                    ...passwordInfo,
                    new_password: e.target.value,
                  })
                }
                className="w-full flex place-content-center h-8 border pl-2  hover:bg-gray-100 dark:hover:bg-gray-600 dark:focus:bg-gray-700 focus:bg-slate-200 rounded-md md:w-1/2 py-2 hover:border-gray-500 hover:shadow-md focus:outline-none "
              />
              <div>
                <FormattedMessage id="Account.ConfirmNewPassword" />
              </div>
              <input
                type="password"
                onChange={(e) =>
                  setPasswordInfo({
                    ...passwordInfo,
                    confirm_password: e.target.value,
                  })
                }
                className="w-full flex place-content-center h-8 border pl-2  hover:bg-gray-100 dark:hover:bg-gray-600 dark:focus:bg-gray-700 focus:bg-slate-200 rounded-md md:w-1/2 py-2 hover:border-gray-500 hover:shadow-md focus:outline-none "
              />
            </div>
            <div className="flex  mt-3 w-full md:w-1/2 place-content-center">
              <button
                onClick={handleChangePassword}
                className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
              >
                <FormattedMessage id="Account.ChangePassword" />
              </button>
            </div>
          </div>
          <div className="border p-3 rounded-md">
            <div className="font-bold text-red-600">
              <FormattedMessage id="Account.War" />:
            </div>
            <div className="font-extralight">
              <FormattedMessage id="Account.Warning" />
            </div>
            <div className="font-light">
              <ul>
                <li>
                  *<FormattedMessage id="Account.Warning.1" />
                </li>
                <li>
                  *<FormattedMessage id="Account.Warning.2" />{" "}
                </li>
                <li>
                  *<FormattedMessage id="Account.Warning.3" />
                </li>
                <li>
                  *<FormattedMessage id="Account.Warning.4" />{" "}
                </li>
                <li>
                  *<FormattedMessage id="Account.Warning.5" />
                </li>
                <li> VD: NTd123@123</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AccountSetting;
