import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FormattedMessage } from "react-intl";

interface SubmitPopupProps {
    onClose: () => void;
    message: string;
    submit: () => void;
}

const SubmitPopup: React.FC<SubmitPopupProps> = ({ onClose, message, submit }) => {
    const notificationRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                handleClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    const handleAnimationComplete = () => {
        if (!isVisible) {
            onClose();
        }
    };

    const handleClose = () => {
        setIsVisible(false);
    };

    const handleSubmitClick = () => {
        submit();
        handleClose();
    };

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 bottom-0 flex backdrop-blur items-center justify-center bg-black bg-opacity-50 z-50 inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onAnimationComplete={handleAnimationComplete}
        >
            <motion.div
                ref={notificationRef}
                className="relative max-w-full sm:min-w-[300px] sm:max-w-screen-sm max-h-44 xs:max-h-64 bg-white rounded-xl p-4 flex flex-col"
                initial={{ scale: 0 }}
                animate={{ scale: isVisible ? 1 : 0 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-gray-600 text-xl font-bold mb-2 text-center"><FormattedMessage id="SubmitPopup.Notification" /></h2>
                <div className="overflow-scroll max-h-full w-full no-scrollbar"><p className="text-gray-600 w-full text-center">{message}</p></div>

                <div className="flex w-full justify-between gap-2">
                    <motion.button
                        onClick={handleClose}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-300 text-black rounded truncate"
                    >
                        <FormattedMessage id="SubmitPopup.CancelButton" />
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className=" mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded truncate"
                        onClick={handleSubmitClick}
                    >
                        <FormattedMessage id="SubmitPopup.ConfirmButton" />
                    </motion.button>
                </div>

            </motion.div>
        </motion.div>
    );
};

export default SubmitPopup;
