import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoIosBarcode, IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import { FormattedMessage, useIntl } from "react-intl";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
import { ShipmentsOperation } from "@/TDLib/tdlogistics";
import SubmitPopup from "@/components/Common/SubmitPopup";
import NotiPopup from "@/components/Common/NotiPopup";

interface AddNotificationProps {
  onClose: () => void;
  reloadData: () => void;
}

const AddNotification: React.FC<AddNotificationProps> = ({ onClose, reloadData }) => {
  const [isShaking, setIsShaking] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [option, setOption] = useState(0);
  const [shipmentIdInput, setShipmentIdInput] = useState('');
  const [transportPartnerId, setTransportPartnerId] = useState('');
  const intl = useIntl();
  const shipmentsOperation = new ShipmentsOperation();
  const [openError, setOpenError] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [message, setMessage] = useState("")

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleAnimationComplete = () => {
    if (!isVisible) {
      onClose();
    }
  };

  const handleConfirm = async () => {
    try {
      if (option === 1) {
        const shipmentID = { shipment_id: shipmentIdInput };
        const response = await shipmentsOperation.receive(shipmentID);
        console.log(response)

        if (response.error) {
          setOpenConfirm(false)
          setMessage(response.message)
          setOpenError(true)
        } else {
          setOpenConfirm(false)
          setMessage(response.message)
          setOpenError(true)
          reloadData();
        }
      } else {
        const response = await shipmentsOperation.create(transportPartnerId ? { transport_partner_id: transportPartnerId } : {});
        console.log(response)
        if (response.error) {
          setOpenConfirm(false)
          setMessage(response.message)
          setOpenError(true)
        } else {
          setOpenConfirm(false)
          setMessage(response.message)
          setOpenError(true)
          reloadData();
        }
      }
    } catch (error) {
      setMessage("Error! Please contact admin.")
      setOpenError(true)
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
      {openError && <NotiPopup onClose={() => setOpenError(false)} message={message} ref={notificationRef} />}
      {openConfirm && <SubmitPopup onClose={() => setOpenConfirm(false)} message={message} submit={handleConfirm} ref={notificationRef} />}
      <motion.div
        ref={notificationRef}
        className={`relative w-[98%] sm:w-9/12 lg:w-1/2 bg-white dark:bg-[#14141a] rounded-xl p-4 overflow-y-auto ${isShaking ? 'animate-shake' : ''}`}
        initial={{ scale: 0 }} animate={{ scale: isVisible ? 1 : 0 }} exit={{ scale: 0 }} transition={{ duration: 0.5 }}
      >
        <div className="relative items-center justify-center flex-col flex h-10 w-full border-b-2 border-[#545e7b]">
          <div className="font-bold text-lg sm:text-2xl pb-2 text-black dark:text-white w-full text-center"><FormattedMessage id="Consignment.Add.Title" /></div>
          <Button className="absolute right-0 w-8 h-8 rounded-full mb-2 hover:bg-gray-300" onClick={handleClose}>
            <IoMdClose className="w-5/6 h-5/6" />
          </Button>
        </div>
        <div className="overflow-y-scroll border-[#545e7b] mt-4 no-scrollbar flex flex-col items-center bg-white dark:bg-[#14141a] p-2 rounded-md dark:text-white gap-2">
          <Button className="flex items-center rounded-xl p-2 w-full" onClick={() => setOption(0)}>
            {option === 0 ? <MdRadioButtonChecked /> : <MdRadioButtonUnchecked />}
            <span className="pl-1 whitespace-pre-line"><FormattedMessage id="Consignment.Add.Option1" /></span>
          </Button>
          {option === 0 &&
            <div className="flex flex-col justify-center w-full">
              <span className="w-full text-center font-bold"><FormattedMessage id="Consignment.Add.InputPartnerID" /></span>
              <input
                className={`h-10 rounded-lg mt-2 mb-1 p-3 w-full border-green-700 text-black
                  bg-transparent drop-shadow-md hover:drop-shadow-xl border 
                  hover:shadow-md mr-2`}
                placeholder={intl.formatMessage({ id: "Consignment.Add.Add1" })}
                value={transportPartnerId}
                onChange={(e) => setTransportPartnerId(e.target.value)}
              />
            </div>
          }
          <span className="text-sm">&#8212; <FormattedMessage id="Consignment.Add.Or" /> &#8212;</span>
          <div className="w-full">
            <Button className="flex items-center rounded-xl w-full p-2" onClick={() => setOption(1)}>
              {option === 1 ? <MdRadioButtonChecked /> : <MdRadioButtonUnchecked />}
              <span className="pl-1 whitespace-pre-line"><FormattedMessage id="Consignment.Add.Option2" /></span>
            </Button>
            {option === 1 &&
              <div className="flex justify-center w-full">
                <input
                  className={`h-10 rounded-lg mt-2 mb-1 p-3 w-full border-green-700 text-black
                  bg-transparent drop-shadow-md hover:drop-shadow-xl border 
                  hover:shadow-md mr-2`}
                  placeholder={intl.formatMessage({ id: "Consignment.Add.Add1" })}
                  value={shipmentIdInput}
                  onChange={(e) => setShipmentIdInput(e.target.value)}
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
            }
          </div>
        </div>
        <Button className="w-full rounded-lg mt-5 mb-1 py-2 sm:py-3 border-green-700 hover:bg-green-700 text-green-500
        bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border hover:shadow-md"
          onClick={() => {
            setMessage("Xác nhận tạo lô hàng?")
            setOpenConfirm(true)
          }}>
          <span ><FormattedMessage id="Consignment.Add.Button" /></span>
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default AddNotification;