import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import DemoPage from "api/getConsignment";
import LoadingSkeleton from "@/components/LoadingSkeleton/loadingSkeleton";
import { FormattedMessage } from "react-intl";
import NotiPopup from "../Common/NotiPopup";

const ConsignmentMenu = () => {
  const [demoPage, setDemoPage] = useState(<LoadingSkeleton />);
  const [openError, setOpenError] = useState(false);
  const [message, setMessage] = useState("")
  useEffect(() => {
    fetchDemoPage();
  }, []);

  const reloadData = useCallback(() => {
    fetchDemoPage();
  }, []);

  const fetchDemoPage = async () => {
    const result = await DemoPage(reloadData, setOpenError, setMessage);
    setDemoPage(result);
  };

  return (
    <div className="h-[calc(100vh-3rem)] content-center overflow-y-hidden flex flex-col ">
      {openError && <NotiPopup onClose={() => setOpenError(false)} message={message} />}
      <div className="h-full items-center w-full left-0 right-0 overflow-y-scroll no-scrollbar">
        <section className="p-2 flex justify-center">
          <div className="container shadow-sm rounded-xl px-3 bg-white dark:text-white dark:bg-[#1a1b23]">
            <div className="relative text-3xl font-bold border-b-[1px] border-gray-600">
              <div className=" font-bold text-xl sm:text-3xl pt-3 pb-2 text-center">
                - <FormattedMessage id="Consignment.Title" /> -
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5">
              {demoPage}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ConsignmentMenu;
