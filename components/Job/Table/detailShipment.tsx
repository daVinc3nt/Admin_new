import React, { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import { FaTrash, FaPen } from "react-icons/fa";
import { FormattedMessage, useIntl } from "react-intl";
interface DetailShipmentProps {
  agency_id: string;
  created_at: string;
  order_ids: string[];
  last_update: string;
  journey_id: string;
  mass: number;
  staff_id: string;
  transport_partner_id: string;
  vehicle_id: string;
  current_agency_id: string;
  current_lat: string;
  current_long: string;
}
interface DetailDriverProps {
  onClose: () => void;
  dataInitial: DetailShipmentProps;
}

const DetailShipment: React.FC<DetailDriverProps> = ({
  onClose,
  dataInitial,
}) => {
  const intl = useIntl();
  const [isShaking, setIsShaking] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  // console.log("III", dataInitial);
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
        className={`relative w-[98%] sm:w-9/12 dark:bg-[#14141a] bg-white rounded-xl p-4 overflow-y-auto
            ${isShaking ? "animate-shake" : ""}`}
        initial={{ scale: 0 }}
        animate={{ scale: isVisible ? 1 : 0 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative items-center justify-center flex-col flex h-10 w-full border-b-2 border-[#545e7b]">
          <div className="font-bold text-lg sm:text-2xl pb-2 dark:text-white w-full text-center">
            Thông tin chi tiết
          </div>
          <Button
            className="absolute right-0 w-8 h-8 rounded-full mb-2 hover:bg-gray-300"
            onClick={handleClose}
          >
            <IoMdClose className="w-5/6 h-5/6 " />
          </Button>
        </div>
        <div className="h-screen_3/5 overflow-y-scroll border border-[#545e7b] mt-4 no-scrollbar  dark:bg-[#14141a] p-2 rounded-md dark:text-white ">
          <div className="grid md:grid-cols-2 gap-4 w-full">
            <div className="flex flex-col">
              <div className="flex flex-col">
                <div className="font-bold text-lg dark:text-white">
                  Ngày tạo
                </div>
                <div className="text-sm dark:text-white">
                  {dataInitial.created_at}
                </div>
              </div>

              <div className="flex flex-col">
                <div className="font-bold text-lg dark:text-white">
                  Mã đối tác vận chuyển
                </div>
                <div className="text-sm dark:text-white">
                  {dataInitial.transport_partner_id}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="font-bold text-lg dark:text-white">
                  Đối tác vận chuyển hiện tại
                </div>
                <div className="text-sm dark:text-white">
                  {dataInitial.current_agency_id}
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col">
                <div className="font-bold text-lg dark:text-white">
                  Ngày cập nhật cuối
                </div>
                <div className="text-sm dark:text-white">
                  {dataInitial.last_update}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="font-bold text-lg dark:text-white">
                  Trọng lượng
                </div>
                <div className="text-sm dark:text-white">
                  {dataInitial.mass}kg
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DetailShipment;
