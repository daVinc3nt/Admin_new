import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FormattedMessage } from "react-intl";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import { OrdersOperation } from "@/TDLib/tdlogistics";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
export interface UploadingOrderFileCondition {
  file: File;
}
interface AddNotificationProps {
  onClose: () => void;
  reloadData: () => void;
}

const AddFile: React.FC<AddNotificationProps> = ({ onClose, reloadData }) => {
  const [isShaking, setIsShaking] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

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
  const [selectedFile, setSelectedFile] = useState<File>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files[0]);
    setSelectedFile(e.target.files[0]);
  };

  const handleConfirm = async () => {
    const Order = new OrdersOperation();
    const condition: UploadingOrderFileCondition = {
      file: selectedFile,
    };
    console.log(condition);
    try {
      const checkfile = await Order.checkFileFormat(condition);
      console.log(checkfile);
      if (checkfile.error.error) {
        alert(checkfile.error.message);
        setSelectedFile(null);
        return;
      }
      if (checkfile.valid === false) {
        alert(checkfile.message);
        setSelectedFile(null);
        return;
      }
      const response = await Order.createByFile(condition);
      console.log(response);
      alert(response.message);
      setSelectedFile(null);
      reloadData();
    } catch (e) {
      console.log(e);
      alert("Đã xảy ra lỗi hệ thống, vui lòng thử lại sau!");
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
      style={{ backdropFilter: "blur(12px)" }}
    >
      <motion.div
        ref={notificationRef}
        className={`relative  lg:w-1/4 bg-white
        dark:bg-[#14141a] rounded-xl p-5 overflow-y-auto ${
          isShaking ? "animate-shake" : ""
        }`}
        initial={{ scale: 0 }}
        animate={{ scale: isVisible ? 1 : 0 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative items-center justify-center flex-col flex h-10 w-full border-b-2 border-[#545e7b]">
          <div className="font-bold text-lg sm:text-2xl pb-2 text-black dark:text-white w-3/5 text-center">
            <FormattedMessage id="order.bulk"/>
          </div>
          <Button
            className="absolute right-0 w-8 h-8 rounded-full mb-2 hover:bg-gray-300"
            onClick={handleClose}
          >
            <IoMdClose className="w-5/6 h-5/6" />
          </Button>
        </div>
        <div className="text-center py-5">
          <FormattedMessage id="order.chooseexcel"/>
        </div>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                {!selectedFile && (
                  <>
                    {" "}
                    <span className="font-semibold">Nhấn vào đây </span> hoặc
                    kéo thả file{" "}
                  </>
                )}
                {selectedFile && (
                  <span className="font-semibold">Đã thêm </span>
                )}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {selectedFile ? selectedFile.name : "Chưa chọn file"}
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={setSelectedFile ? (e) => handleFileChange(e) : () => {}}
            />
          </label>
        </div>
        <div className="text-center py-5">
        <FormattedMessage id="order.downloadsample" />
        </div>
        <a 
          className='ring ring-gray-500  rounded-xl p-2'
          href="/SampleFile/Ex.xlsx" 
          download='Sample.xlsx'> 
          <FileDownloadIcon/> Download
        </a>

        <Button
          onClick={handleConfirm}
          className="w-full rounded-lg mt-5 mb-1 py-3 border-green-700 hover:bg-green-700 text-green-500
        bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border hover:shadow-md"
        >
          <span className="hidden xs:block">
            <FormattedMessage id="order.add" />
          </span>
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default AddFile;
