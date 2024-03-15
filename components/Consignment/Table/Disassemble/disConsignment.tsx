import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoIosBarcode, IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import { FormattedMessage, useIntl } from "react-intl";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
import DiffCheck from "./diffCheck";
import AddOrders from "./addOrders";
import { ShipmentsOperation } from "@/TDLib/tdlogistics";

interface DisassembleConsignmentProps {
  onClose: () => void;
  reloadData: () => void;
}

const DisassembleConsignment: React.FC<DisassembleConsignmentProps> = ({ onClose, reloadData }) => {
  const [isShaking, setIsShaking] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [shipmentID, setShipmentID] = useState("");
  const [page, setPage] = useState(0);
  const intl = useIntl();
  const shipmentsOperation = new ShipmentsOperation();
  const [consignment1, setConsignment1] = useState({
    order_ids: [],
    shipment_id: "",
  });
  const [consignment2, setConsignment2] = useState({
    order_ids: []
  });

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

  const handleSubmitClick = async () => {
    if (page === 0) {
      let condition = { shipment_id: shipmentID };
      const result = await shipmentsOperation.get(condition);
      if (result.error) {
        alert("Error:" + result.message);
      } else if (!result.data[0]) {
        alert("Đơn hàng này chưa được khởi tạo.")
      }
      else {
        setConsignment1({
          shipment_id: result.data[0]?.shipment_id,
          order_ids: result.data[0]?.order_ids
        });
        setPage(1);
      }
    }
    if (page === 1) setPage(2)
    if (page === 2) {
      const condition = { shipment_id: consignment1.shipment_id };
      const info = { order_ids: consignment2.order_ids };
      const result = await shipmentsOperation.decompose(condition, info);
      if (result.error) {
        alert("Error:" + result.message);
      } else {
        handleClose();
        reloadData();
      }
    }
  };

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
        className={`relative w-[98%] sm:w-9/12 lg:w-1/2 bg-white dark:bg-[#14141a] rounded-xl p-4 overflow-y-auto ${isShaking ? 'animate-shake' : ''}`}
        initial={{ scale: 0 }} animate={{ scale: isVisible ? 1 : 0 }} exit={{ scale: 0 }} transition={{ duration: 0.5 }}
      >
        <div className="relative items-center justify-center flex-col flex h-10 w-full border-b-2 border-[#545e7b]">
          <div className="font-bold text-lg sm:text-2xl pb-2 text-black dark:text-white w-full text-center"><FormattedMessage id="Consignment.Decompose.Title" /></div>
          <Button className="absolute right-0 w-8 h-8 rounded-full mb-2 hover:bg-gray-300" onClick={handleClose}>
            <IoMdClose className="w-5/6 h-5/6" />
          </Button>
        </div>
        {page === 0 && <div className="overflow-y-scroll border-[#545e7b] mt-4 no-scrollbar flex flex-col items-center bg-white dark:bg-[#14141a] p-2 rounded-md dark:text-white gap-2">
          <div className="flex justify-center w-full font-bold"><FormattedMessage id="Consignment.Decompose.Input" /></div>
          <div className="flex justify-center w-full">
            <input
              value={shipmentID}
              onChange={(e) => { setShipmentID(e.target.value) }}
              className={`h-10 rounded-lg mt-2 mb-1 p-3 w-full border-green-700 text-black
                  bg-transparent drop-shadow-md hover:drop-shadow-xl border 
                  hover:shadow-md mr-2`}
              placeholder={intl.formatMessage({ id: "Consignment.Add.Add1" })}
            />
            <Button
              className={`h-10 rounded-lg mt-2 mb-1 p-3 w-36 border-green-700 hover:bg-green-700 text-green-500
                  bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border 
                  hover:shadow-md`}
              onClick={() => { }}
            >
              <IoIosBarcode className="hidden sm:block mr-2 h-5 w-5" />
              <span className="block"><FormattedMessage id="Consignment.Add.Add2" /></span>
            </Button>
          </div>

        </div>}
        {page === 1 && <AddOrders setConsignment2={setConsignment2} />}
        {page === 2 && <div className="h-screen_3/5 overflow-y-scroll border border-[#545e7b] mt-4 no-scrollbar flex flex-col bg-white dark:bg-[#14141a] p-2 rounded-md dark:text-white">
          <DiffCheck consignment1={consignment1} consignment2={consignment2} />
        </div>}
        <Button onClick={handleSubmitClick} className="w-full rounded-lg mt-5 mb-1 py-3 border-green-700 hover:bg-green-700 text-green-500
        bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border hover:shadow-md">
          <span className="hidden xs:block"><FormattedMessage id="Consignment.Decompose.Submit" /></span>
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default DisassembleConsignment;
