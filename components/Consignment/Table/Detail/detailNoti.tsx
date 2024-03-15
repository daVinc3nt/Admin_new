import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose, IoIosBarcode } from "react-icons/io";
import { Button } from "@nextui-org/react";
import { FaTrash, FaPen } from "react-icons/fa";
import { FormattedMessage, useIntl } from "react-intl";
import { IoAddCircleOutline } from "react-icons/io5";
import AddOrders from "./AddOrders/addOrdersNoti";
import { ShipmentsOperation } from "@/TDLib/tdlogistics";

interface DetailNotificationProps {
  onClose: () => void;
  dataInitial: {
    address_destination: string;
    address_source: string;
    lat_destination: number;
    lat_source: number;
    long_destination: number;
    long_source: number;
    mass: number;
    order_ids: string[];
    parent: null;
    shipment_id: string;
    staff_id: string;
    status: number;
    transport_partner_id: string | null;
    vehicle_id: string | null;
  };
}

const DetailNotification: React.FC<DetailNotificationProps> = ({ onClose, dataInitial }) => {
  const [isShaking, setIsShaking] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [data, setData] = useState(dataInitial);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const intl = useIntl();
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    if (isVisible) {
      handleGetOrdersFromShipment();
    }
  }, [isVisible]);

  const handleClickOutside = (event: MouseEvent) => {
    if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
      }, 300);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleAnimationComplete = () => {
    if (!isVisible) {
      onClose();
    }
  };

  const handleDeleteSelectedOrders = async () => {
    try {
      if (selectedOrders.length > 0) {
        const condition = { shipment_id: data.shipment_id };
        const info = { order_ids: selectedOrders };
        const result = await shipmentsOperation.deleteOrderFromShipment(condition, info);
        if (result.error) {
          alert("Error deleting selected orders: " + result.error);
        } else {
          handleGetOrdersFromShipment();
          setSelectedOrders([]);
        }
      }
    } catch (error) {
      console.error("Error deleting selected orders: ", error);
    }
  };

  const handleCheckboxChange = (orderId: string) => {
    setSelectedOrders((prevSelected) => {
      if (prevSelected.includes(orderId)) {
        return prevSelected.filter((selectedId) => selectedId !== orderId);
      } else {
        return [...prevSelected, orderId];
      }
    });
  };

  const handleConfirm = async () => {
    const shipmentID = { shipment_id: dataInitial.shipment_id };
    const response = await shipmentsOperation.confirmCreate(shipmentID);
    handleClose();
  };

  const addOrders = async (newOrders) => {
    try {
      const orderIds = newOrders.map(order => order.order_id);

      const condition = { shipment_id: data.shipment_id };
      const info = { order_ids: orderIds };
      const result = await shipmentsOperation.addOrdersToShipment(condition, info);
      if (result.error) {
        console.error("Error adding orders to shipment: ", result.error);
      } else {
        handleGetOrdersFromShipment();
      }
    } catch (error) {
      console.error("Error adding orders to shipment: ", error);
    }
  };

  const shipmentsOperation = new ShipmentsOperation();

  const handleGetOrdersFromShipment = async () => {
    try {
      const condition = { shipment_id: data.shipment_id };
      const result = await shipmentsOperation.getOrdersFromShipment(condition);
      if (result.error) {
        console.error("Error getting orders from shipment: ", result.error);
      } else {
        setOrders(result.data)
      }
    } catch (error) {
      console.error("Error getting orders from shipment: ", error);
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
        backdropFilter: "blur(12px)"
      }}
    >
      {modalIsOpen && <AddOrders onClose={closeModal} addOrders={addOrders} />}
      <motion.div
        ref={notificationRef}
        className={`relative w-[98%] sm:w-9/12 bg-white dark:bg-[#14141a] rounded-xl p-4 overflow-y-auto
          ${isShaking ? 'animate-shake' : ''}`}
        initial={{ scale: 0 }}
        animate={{ scale: isVisible ? 1 : 0 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative items-center justify-center flex-col flex h-10 w-full border-b-2 border-[#545e7b]">
          <div className="font-bold text-lg sm:text-2xl pb-2 dark:text-white w-full text-center"><FormattedMessage id="Consignment.Info.Title" /></div>
          <Button className="absolute right-0 w-8 h-8 rounded-full mb-2 hover:bg-gray-300" onClick={handleClose}>
            <IoMdClose className="w-5/6 h-5/6" />
          </Button>
        </div>
        <div className="h-screen_3/5 overflow-y-scroll border border-[#545e7b] mt-4 no-scrollbar flex flex-col bg-white dark:bg-[#14141a] p-2 rounded-md dark:text-white">
          <div className="flex flex-col">
            <div className="text-center text-lg sm:text-xl font-semibold"><FormattedMessage id="Consignment.Info.Info1" />: {data.shipment_id}</div>
            <div className="pt-2 pl-2 w-full flex flex-col items-center">
              <div className="flex w-full lg:w-1/2">
                <span className="font-bold mr-2 whitespace-nowrap">+ <FormattedMessage id="Consignment.Info.Info2" />:</span>
              </div>
              <div className="flex w-full lg:w-1/2">
                <span className="font-bold mr-2 whitespace-nowrap">+ <FormattedMessage id="Consignment.Info.Info3" />:</span>
                <span>{data.mass}</span>
              </div>
              <div className="flex w-full lg:w-1/2">
                <span className="font-bold mr-2 whitespace-nowrap ư">+ <FormattedMessage id="Consignment.Info.Info5" />:</span>
                <span>{data.transport_partner_id}</span>
              </div>
            </div>

            <div className="text-center text-lg mt-2">
              <FormattedMessage id="Consignment.Info.Info8" />:{" "}
              {(() => {
                let statusLabel = "";
                let statusColor = "";
                const intl = useIntl();

                switch (data.status) {
                  case 1:
                    statusLabel = intl.formatMessage({ id: "Consignment.Status.Decomposed" });
                    statusColor = "text-green-500";
                    break;
                  default:
                    statusLabel = intl.formatMessage({ id: "Consignment.Status.NotDecomposed" });
                    statusColor = "text-black";
                }

                return <span className={`${statusColor} font-semibold text-xl`}>{statusLabel}</span>;
              })()}
            </div>
            <div className="w-full flex">
              {selectedOrders.length > 0 && <Button
                className={` self-start h-10 rounded-lg mt-5 mb-1 p-3 border-red-700 hover:bg-red-700 text-red-500
                  bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border 
                  hover:shadow-md mr-2`}
                onClick={handleDeleteSelectedOrders}
              >
                <FaTrash className="hidden sm:block mr-2" />
                <span className="block"><FormattedMessage id="Consignment.Info.Confirm" /></span>
              </Button>}
              <div className="grow flex justify-end">
                <Button
                  className={`h-10 rounded-lg mt-5 mb-1 p-3 border-green-700 hover:bg-green-700 text-green-500
                  bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border 
                  hover:shadow-md mr-2`}
                  onClick={openModal}
                >
                  <IoAddCircleOutline className="hidden sm:block mr-2 h-5 w-5" />
                  <span className="block"><FormattedMessage id="Consignment.Info.Add1" /></span>
                </Button>
                <Button
                  className={`h-10 rounded-lg mt-5 mb-1 p-3 border-green-700 hover:bg-green-700 text-green-500
                  bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border 
                  hover:shadow-md`}
                >
                  <IoIosBarcode className="hidden sm:block mr-2 h-5 w-5" />
                  <span className="block"><FormattedMessage id="Consignment.Info.Add2" /></span>
                </Button>
              </div>
            </div>
          </div>

          <div className="pt-2 grid lg:grid-cols-2 gap-2">
            <AnimatePresence initial={false}>
              {orders.map((order) => (
                <motion.div
                  key={order.order_id}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`border border-[#545e7b] rounded-lg p-2 dark:bg-[#1a1b23] flex flex-col ${selectedOrders.includes(order.order_id) ? 'dark:bg-gray-700 bg-gray-200' : ''}`}
                  onClick={() => { handleCheckboxChange(order.order_id) }}
                >
                  <div className="text-center font-semibold pb-2">ID: {order.order_id}</div>
                  <div className="pt-2 pl-2 w-full flex flex-col items-center">
                    <div className="flex w-full">
                      <span className="font-bold mr-2 whitespace-nowrap">+ <FormattedMessage id="Consignment.Info.Info9" />:</span>
                      <span>{order.mass}</span>
                    </div>
                    <div className="flex w-full gap-2">
                      <div>
                        <span className="font-bold mr-2 whitespace-nowrap">+ <FormattedMessage id="Consignment.Info.Info10" />:</span>
                        <span>{order.length}</span>
                      </div>
                      <div>
                        <span className="font-bold mr-2 whitespace-nowrap">+ <FormattedMessage id="Consignment.Info.Info11" />:</span>
                        <span>{order.width}</span>
                      </div>
                      <div>
                        <span className="font-bold mr-2 whitespace-nowrap">+ <FormattedMessage id="Consignment.Info.Info12" />:</span>
                        <span>{order.height}</span>
                      </div>
                    </div>
                    <div className="flex w-full">
                      <span className="font-bold mr-2 whitespace-nowrap">+ <FormattedMessage id="Consignment.Info.Info13" />:</span>
                      <span>{`${order.detail_source}, ${order.ward_source}, ${order.district_source}, ${order.province_source}`}</span>
                    </div>
                    <div className="flex w-full">
                      <span className="font-bold mr-2 whitespace-nowrap">+ <FormattedMessage id="Consignment.Info.Info14" />:</span>
                      <span>{`${order.detail_dest}, ${order.ward_dest}, ${order.district_dest}, ${order.province_dest}`}</span>
                    </div>
                    <div className="flex w-full">
                      <span className="font-bold mr-2 whitespace-nowrap">+ <FormattedMessage id="Consignment.Info.Info15" />:</span>
                      <span>{order.fee.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                    </div>
                    <div className="flex w-full">
                      <span className="font-bold mr-2 whitespace-nowrap">+ <FormattedMessage id="Consignment.Info.Info16" />:</span>
                      <span>{order.COD.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                    </div>
                  </div>


                  <div className="text-center text-lg mt-2">
                    <FormattedMessage id="Consignment.Info.Info17" />:{" "}
                    {(() => {
                      let statusLabel = "";
                      let statusColor = "";
                      const intl = useIntl();

                      switch (data.status) {
                        case 1:
                          statusLabel = intl.formatMessage({ id: 'Consignment.Status.DeliveredSuccess' });
                          statusColor = "text-green-500";
                          break;
                        case 2:
                          statusLabel = intl.formatMessage({ id: 'Consignment.Status.Processing' });
                          statusColor = "text-black";
                          break;
                        case 3:
                          statusLabel = intl.formatMessage({ id: 'Consignment.Status.Taking' });
                          statusColor = "text-black";
                          break;
                        case 4:
                          statusLabel = intl.formatMessage({ id: 'Consignment.Status.TakenSuccess' });
                          statusColor = "text-green-500";
                          break;
                        case 5:
                          statusLabel = intl.formatMessage({ id: 'Consignment.Status.TakenFail' });
                          statusColor = "text-red-500";
                          break;
                        case 6:
                          statusLabel = intl.formatMessage({ id: 'Consignment.Status.Delivering' });
                          statusColor = "text-black";
                          break;
                        case 7:
                          statusLabel = intl.formatMessage({ id: 'Consignment.Status.DeliveredCancel' });
                          statusColor = "text-red-500";
                          break;
                        case 8:
                          statusLabel = intl.formatMessage({ id: 'Consignment.Status.DeliveredFail' });
                          statusColor = "text-red-500";
                          break;
                        case 9:
                          statusLabel = intl.formatMessage({ id: 'Consignment.Status.Refunding' });
                          statusColor = "text-black";
                          break;
                        case 10:
                          statusLabel = intl.formatMessage({ id: 'Consignment.Status.RefundedSuccess' });
                          statusColor = "text-green-500";
                          break;
                        case 11:
                          statusLabel = intl.formatMessage({ id: 'Consignment.Status.RefundedFail' });
                          statusColor = "text-red-500";
                          break;
                        case 12:
                          statusLabel = intl.formatMessage({ id: 'Consignment.Status.EnterAgency' });
                          statusColor = "text-black";
                          break;
                        case 13:
                          statusLabel = intl.formatMessage({ id: 'Consignment.Status.LeaveAgency' });
                          statusColor = "text-black";
                          break;
                        case 14:
                          statusLabel = intl.formatMessage({ id: 'Consignment.Status.ThirdPartyDelivery' });
                          statusColor = "text-black";
                          break;
                        default:
                          statusLabel = "Unknown"
                          statusColor = "text-black";
                          break;
                      }
                      return <span className={`${statusColor} font-semibold text-xl`}>{statusLabel}</span>;
                    })()}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <Button
            className={`w-full px-2 rounded-lg mt-5 mb-1 py-3 border-green-700 hover:bg-green-700 text-green-500
              bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border 
              hover:shadow-md`}
            onClick={handleConfirm}
          >
            <>
              <FaPen className="xs:mr-2" />
              <span className="hidden xs:block"><FormattedMessage id="Consignment.Info.Submit" /></span>
            </>
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DetailNotification;
