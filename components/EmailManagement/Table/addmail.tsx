import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FormattedMessage, useIntl } from "react-intl";
import axios from "axios";
interface AddMailProps {
  onClose: () => void;
}

const AddMail: React.FC<AddMailProps> = ({ onClose }) => {
  const [isShaking, setIsShaking] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  const [Staffdata, setStaffdata] = useState({
    fullname: "",
    username: "",
    password: "",
    dateofbirth: "",
    cccd: "",
    age: "",
    phone: "",
    email: "",
    role: "",
    position: "",
    salary: "",
    paid_salary: "",
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

  const handleInputChange = (key: string, value: string) => {
    setStaffdata((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const error = "";
  const handleSubmit = () => {};
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
            <FormattedMessage id="Email.AddButton" />
          </div>
          <Button
            className="absolute right-0 w-8 h-8 rounded-full mb-2 hover:bg-gray-300"
            onClick={handleClose}
          >
            <IoMdClose className="w-5/6 h-5/6" />
          </Button>
        </div>
        <div className="h-screen_3/5 overflow-y-scroll border border-[#545e7b] mt-4 no-scrollbar flex flex-col items-center bg-[#14141a] p-2 rounded-md text-white">
          <div className="w-[98%] sm:w-10/12">
            <h1 className="font-semibold pb-2 text-center">
              <FormattedMessage id="Email.Infomation" />
            </h1>
          </div>
        </div>
        <Button
          className="w-full rounded-lg mt-5 mb-1 py-3 border-green-700 hover:bg-green-700 text-green-500
        bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border hover:shadow-md"
          onClick={handleSubmit}
        >
          <span className="hidden xs:block">
            <FormattedMessage id="Email.AddButton" />
          </span>
        </Button>
        <div className=" flex place-content-center text-red-500 font-bold ">
          {error && <p>{error}</p>}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AddMail;
