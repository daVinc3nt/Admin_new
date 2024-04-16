import React, { useRef, useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import LoadingSkeleton from "@/components/LoadingSkeleton/loadingSkeleton";
import { FormattedMessage, useIntl } from "react-intl";
import SubmitPopup from "@/components/Common/SubmitPopup";
import { UserContext } from "@/Context/InfoContext/UserContext";
import DemoPage from "./export";

interface AddNotificationProps {
    onClose: () => void;
    setVehicleID: (vehicleID: string) => void;
}

const AddNotification: React.FC<AddNotificationProps> = ({ onClose, setVehicleID }) => {
    const [isShaking, setIsShaking] = useState(false);
    const notificationRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(true);
    const [selectedID, setSelectedID] = useState<string>("");
    const [openConfirm, setOpenConfirm] = useState(false);
    const [message, setMessage] = useState("")
    const intl = useIntl()
    const [demoPage, setDemoPage] = useState(<LoadingSkeleton />);

    const fetchDemoPage = async () => {
        const result = await DemoPage((e) => setSelectedID(e));
        setDemoPage(result);
    };

    useEffect(() => {
        fetchDemoPage();
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setVehicleID(selectedID ? selectedID : "")
    };

    const handleAnimationComplete = () => {
        if (!isVisible) {
            onClose();
        }
    };

    const handleSubmit = () => {
        handleClose()
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
                className={`relative w-[98%] h-[95%] sm:w-11/12 bg-white dark:bg-[#14141a] text-black dark:text-white rounded-xl p-4 overflow-y-auto flex flex-col
          ${isShaking ? 'animate-shake' : ''}`}
                initial={{ scale: 0 }}
                animate={{ scale: isVisible ? 1 : 0 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className="relative items-center justify-center flex-col flex h-10 w-full border-b-2 border-[#545e7b]">
                    <div className="font-bold text-lg sm:text-2xl pb-2 dark:text-white w-full text-center">Danh sách phương tiện</div>
                    <Button className="absolute right-0 w-8 h-8 rounded-full mb-2 hover:bg-gray-300" onClick={handleClose}>
                        <IoMdClose className="w-5/6 h-5/6" />
                    </Button>
                </div>
                <div className="overflow-y-scroll grow border border-[#545e7b] mt-4 no-scrollbar flex flex-col dark:bg-[#14141a] p-2 rounded-md dark:text-white">
                    {demoPage}
                </div>
                <div className="w-full flex justify-center">
                    <Button
                        className={`w-1/2 px-2 rounded-lg mt-5 mb-1 py-3 border-green-700 hover:bg-green-700 text-green-500
                bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border 
                hover:shadow-md`}
                        onClick={handleSubmit}
                    >
                        <span className="hidden xs:block"><FormattedMessage id="Consignment.Add.Submit" /></span>
                    </Button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default AddNotification;
