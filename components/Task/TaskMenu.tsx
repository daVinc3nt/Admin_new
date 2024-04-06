import React from "react";
import { useState, useEffect, useCallback, useContext, useRef } from "react";
import { FormattedMessage } from "react-intl";
import { UserContext } from "@/Context/InfoContext/UserContext";
import DemoPage from "./Table/export";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import { IoMdClose } from "react-icons/io";

interface TaskProps {
  onClose: () => void;
  DataInitial: string[];
}

const TaskMenu: React.FC<TaskProps> = ({ onClose, DataInitial }) => {
  const [isShaking, setIsShaking] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [demoPage, setDemoPage] = useState(<div>Hi</div>);
  const { info } = useContext(UserContext);
  const reloadData = useCallback(() => {
    fetchDemoPage();
  }, [info, DataInitial]);

  const fetchDemoPage = async () => {
    const result = await DemoPage(reloadData, info, DataInitial);
    setDemoPage(result);
  };

  useEffect(() => {
    fetchDemoPage();
  }, [info, DataInitial]);

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
            Danh sách phương tiện
          </div>
          <Button
            className="absolute right-0 w-8 h-8 rounded-full mb-2 hover:bg-gray-300"
            onClick={handleClose}
          >
            <IoMdClose className="w-5/6 h-5/6 " />
          </Button>
        </div>
        <div className="h-screen_3/5 overflow-y-scroll border border-[#545e7b] mt-4 no-scrollbar  dark:bg-[#14141a] p-2 rounded-md dark:text-white ">
          {demoPage}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TaskMenu;
