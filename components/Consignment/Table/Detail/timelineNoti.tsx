import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose, IoIosBarcode } from "react-icons/io";
import { Button } from "@nextui-org/react";
import { FaTrash, FaPen } from "react-icons/fa";
import { FormattedMessage, useIntl } from "react-intl";
import { IoAddCircleOutline } from "react-icons/io5";
import AddOrders from "./AddOrders/addOrdersNoti";
import { ShipmentsOperation } from "@/TDLib/tdlogistics";
import CustomTimeline from "@/components/Common/Timeline2";


const timelineNoti = ({ onClose, dataInitial }) => {
    const [isShaking, setIsShaking] = useState(false);
    const notificationRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(true);
    const [data, setData] = useState(dataInitial);
    const [modalIsOpen, setModalIsOpen] = useState(false);
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
        console.log(dataInitial.journey)
    }, []);

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
                    <Button className="absolute right-0 w-8 h-8 rounded-full mb-2 hover:bg-gray-300" onClick={handleClose}>
                        <IoMdClose className="w-5/6 h-5/6" />
                    </Button>
                </div>
                <div className="h-screen_3/5 overflow-y-scroll border border-[#545e7b] mt-4 no-scrollbar bg-white dark:bg-[#14141a] p-2 rounded-md dark:text-white">
                    <div className="flex w-full">
                        <CustomTimeline data={dataInitial.journey} />
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default timelineNoti;
