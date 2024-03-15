import React, { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import { FaTrash, FaPen } from "react-icons/fa";
import { User, Pencil } from "lucide-react";
import { FormattedMessage } from "react-intl";
import { StaffsOperation, UpdatingStaffCondition, UpdatingStaffInfo } from "@/TDLib/tdlogistics";
import { Staff } from "./column";

const Admin = "Admin";

interface DetailStaffProps {
  onClose: () => void;
  dataInitial: Staff;
}

const DetailStaff: React.FC<DetailStaffProps> = ({ onClose, dataInitial }) => {
  const [admin, setAdmin] = useState(Admin);
  const [isShaking, setIsShaking] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [data, setData] = useState(dataInitial);
  const [updateData, setupdateData] = useState<any>({});

  const handleUpdateData =(e, key:string, input:string = "string") => {
    if (input == "number")
      setupdateData({...updateData, [key]: parseInt(e.target.value)});
    else 
      setupdateData({...updateData, [key]: e.target.value});
  }

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
  const handleSaveClick = () => {
    // Gửi API về server để cập nhật dữ liệu
    // Sau khi hoàn thành, có thể tắt chế độ chỉnh sửa
    const x ="staff_id"
    console.log("click",updateData)
    console.log(dataInitial)
    const condition: UpdatingStaffCondition = {staff_id: dataInitial.staff_id }
    const staff =new StaffsOperation()
    staff.update(updateData, condition)
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
        className={`relative w-[98%] sm:w-9/12 bg-[#14141a] h-168 rounded-xl p-4 overflow-y-auto
          ${isShaking ? "animate-shake" : ""}`}
        initial={{ scale: 0 }}
        animate={{ scale: isVisible ? 1 : 0 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative items-center justify-center flex-col flex h-10 w-full border-b-2 border-[#545e7b]">
          <div className="font-bold text-lg sm:text-2xl pb-2 text-white w-full text-center">
            <FormattedMessage id="Staff.Infomation" />
          </div>
          <Button
            className="absolute right-0 w-8 h-8 rounded-full mb-2 hover:bg-gray-300"
            onClick={handleClose}
          >
            <IoMdClose className="w-5/6 h-5/6 " />
          </Button>
        </div>
        <div className="h-screen_4/6 overflow-y-scroll border border-[#545e7b] mt-4 no-scrollbar flex flex-col bg-[#14141a] p-2 rounded-md text-white place-content-center">
          <div className="grid grid-cols-2 ">
            <div>
              <div className="flex flex-col gap-5">
                <div>
                  <div className="font-bold text-base">
                    <FormattedMessage id="Staff.Image" />
                  </div>
                  <div>
                    <User className="w-20 h-20  md:w-80 md:h-80" />
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className=" font-bold text-base ">
                    <FormattedMessage id="Staff.Name" />
                  </div>
                  {isEditing ? (
                    <input
                      className="w-1/2 bg-transparent border-b-2 border-[#545e7b] text-white"
                      type="text"
                      value={data.fullname}
                      onChange={(e) =>
                        {
                          setData({ ...data, fullname: e.target.value });
                          handleUpdateData(e, "fullname");
                        }
                      }
                    />
                  ) : (
                    <div>{data.fullname}</div>
                  )}
                </div>
                <div className="flex gap-5">
                  <div className=" font-bold text-base ">
                    Email
                  </div>
                  {isEditing ? (
                    <input
                      className="w-1/2 bg-transparent border-b-2 border-[#545e7b] text-white"
                      type="text"
                      value={data.email}
                      onChange={(e) =>
                        {
                          setData({ ...data, email: e.target.value });
                          handleUpdateData(e, "email");
                        }
                      }
                    />
                  ) : (
                    <div>{data.email}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="">
              <div className="flex flex-col gap-5">
                <div className="flex">
                  <div className="w-1/2 font-bold text-base">
                    <FormattedMessage id="Staff.Account" />
                  </div>
                  {isEditing ? (
                    <input
                      className="w-1/2 bg-transparent border-b-2 border-[#545e7b] text-white"
                      type="text"
                      value={data.username}
                      onChange={(e) =>
                        {
                          setData({ ...data, username: e.target.value });
                          handleUpdateData(e, "username");
                        }
                      }
                    />
                  ) : (
                    <div>{data.username}</div>
                  )}
                </div>
                <div className="flex">
                  <div className="w-1/2 font-bold text-base">
                    <FormattedMessage id="Staff.DateOfBirth" />
                  </div>
                  {isEditing ? (
                    <input
                      className="w-1/2 bg-transparent border-b-2 border-[#545e7b] text-white"
                      type="date"
                      value={data.date_of_birth} // Convert the date to a string
                      onChange={(e) =>
                        {
                          setData({ ...data, date_of_birth: e.target.value });
                          handleUpdateData(e, "date_of_birth");
                        }
                      }
                    />
                  ) : (
                    <div>{data.date_of_birth}</div>
                  )}
                </div>
                <div className="flex">
                  <div className="w-1/2 font-bold text-base">
                    <FormattedMessage id="Staff.Position" />
                  </div>
                  {isEditing ? (
                    <input
                      className="w-1/2 bg-transparent border-b-2 border-[#545e7b] text-white"
                      type="text"
                      value={data.role}
                      onChange={(e) =>
                        {
                          setData({ ...data, role: e.target.value });
                          handleUpdateData(e, "role");
                        }
                      }
                    />
                  ) : (
                    <div>{data.role}</div>
                  )}
                </div>
                <div className="flex">
                  <div className="w-1/2 font-bold text-base">
                    <FormattedMessage id="Staff.Phone" />
                  </div>
                  {isEditing ? (
                    <input
                      className="w-1/2 bg-transparent border-b-2 border-[#545e7b] text-white"
                      type="text"
                      value={data.phone_number}
                      onChange={(e) =>
                        {
                          setData({ ...data, phone_number: e.target.value });
                          handleUpdateData(e, "phone_number");
                        }
                      }
                    />
                  ) : (
                    <div>{data.phone_number}</div>
                  )}
                </div>
                <div className="flex">
                  <div className="w-1/2 font-bold text-base">
                    <FormattedMessage id="Staff.Address" />
                  </div>
                  {isEditing ? (
                    <input
                      className="w-1/2 bg-transparent border-b-2 border-[#545e7b] text-white"
                      type="text"
                      value={data.detail_address}
                      onChange={(e) =>
                        {
                          setData({ ...data, detail_address: e.target.value });
                          handleUpdateData(e, "detail_address");
                        }
                      }
                    />
                  ) : (
                    <div>{data.detail_address}</div>
                  )}
                </div>
                <div className="flex">
                  <div className="w-1/2 font-bold text-base">
                    <FormattedMessage id="Staff.District" />
                  </div>
                  {isEditing ? (
                    <input
                      className="w-1/2 bg-transparent border-b-2 border-[#545e7b] text-white"
                      type="text"
                      value={data.district}
                      onChange={(e) =>
                        {
                          setData({ ...data, district: e.target.value });
                          handleUpdateData(e, "district");
                        }
                      }
                    />
                  ) : (
                    <div>{data.district}</div>
                  )}
                </div>
                <div className="flex">
                  <div className="w-1/2 font-bold text-base">
                    <FormattedMessage id="Staff.Province" />
                  </div>
                  {isEditing ? (
                    <input
                      className="w-1/2 bg-transparent border-b-2 border-[#545e7b] text-white"
                      type="text"
                      value={data.province}
                      onChange={(e) =>
                        {
                          setData({ ...data, province: e.target.value });
                          handleUpdateData(e, "province");
                        }
                      }
                    />
                  ) : (
                    <div>{data.province}</div>
                  )}
                </div>
                {/* <div className="flex">
                  <div className="w-1/2 font-bold text-base">Ngân hàng</div>
                  {isEditing ? (
                    <input
                      className="w-1/2 bg-transparent border-b-2 border-[#545e7b] text-white"
                      type="text"
                      value={data.phone_number}
                      onChange={(e) =>
                        setData({ ...data, phone_number: e.target.value })
                      }
                    />
                  ) : (
                    <div>{data.phone_number}</div>
                  )}
                </div> */}

                {/* <div className="flex">
                  <div className="w-1/2 font-bold text-base">KPI</div>
                  {isEditing ? (
                    <input
                      className="w-1/2 bg-transparent border-b-2 border-[#545e7b] text-white"
                      type="number"
                      value={data.staffKPI}
                      onChange={(e) =>
                        setData({
                          ...data,
                          staffKPI: parseFloat(e.target.value),
                        })
                      }
                    />
                  ) : (
                    <div>{data.staffKPI}</div>
                  )}
                </div> */}
                <div className="flex">
                  <div className="w-1/2 font-bold text-base">
                    <FormattedMessage id="Staff.Salary" />
                  </div>
                  {isEditing ? (
                    <input
                      className="w-1/2 bg-transparent border-b-2 border-[#545e7b] text-white"
                      type="number"
                      value={data.salary}
                      onChange={(e) =>
                        {
                          setData({ ...data, salary: parseInt(e.target.value) });
                          handleUpdateData(e, "salary", "number");
                        }
                      }
                    />
                  ) : (
                    <div>{data.salary} vnđ</div>
                  )}
                </div>
                <div className="flex">
                  <div className="w-1/2 font-bold text-base">
                    <FormattedMessage id="Staff.Paid" />
                  </div>
                  {isEditing ? (
                    <input
                      className="w-1/2 bg-transparent border-b-2 border-[#545e7b] text-white"
                      type="number"
                      value={data.paid_salary}
                      onChange={(e) =>
                        {
                          setData({ ...data, paid_salary: parseInt(e.target.value) });
                          handleUpdateData(e, "paid_salary", "number");
                        }
                      }
                    />
                  ) : (
                    <div>{data.paid_salary} vnđ</div>
                  )}
                </div>
                {/* <div className="flex">
                  <div className="w-1/2 font-bold text-base">
                    <FormattedMessage id="Staff Deposit" />
                  </div>
                  {isEditing ? (
                    <input
                      className="w-1/2 bg-transparent border-b-2 border-[#545e7b] text-white"
                      type="number"
                      value={data.staffDeposit}
                      onChange={(e) =>
                        setData({ ...data, staffDeposit: +e.target.value })
                      }
                    />
                  ) : (
                    <div>{data.staffDeposit} vnđ</div>
                  )}
                </div> */}
              </div>
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

export default DetailStaff;
