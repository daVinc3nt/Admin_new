import React, { useState, useEffect, useCallback, useContext } from "react";
import LoadingSkeleton from "../LoadingSkeleton/loadingSkeleton";
import DemoPage from "@/api/getRoute";
import NotiPopup from "../Common/NotiPopup";
import { UserContext } from "@/Context/InfoContext/UserContext";

const RouteList = () => {
  const [demoPage, setDemoPage] = useState(<LoadingSkeleton />);
  const [openError, setOpenError] = useState(false);
  const { info } = useContext(UserContext)
  const [message, setMessage] = useState("")
  useEffect(() => {
    fetchDemoPage(info);
  }, [info]);

  const reloadData = useCallback((info) => {
    fetchDemoPage(info);
  }, []);

  const fetchDemoPage = async (info) => {
    const result = await DemoPage(reloadData, setOpenError, setMessage, info);
    setDemoPage(result);
  };
  return (
    <div className="h-[calc(100vh-3rem)] content-center overflow-y-hidden flex flex-col ">
      {openError && <NotiPopup onClose={() => setOpenError(false)} message={message} />}
      <div className="h-full items-center w-full left-0 right-0 overflow-y-scroll no-scrollbar">
        <section className="p-2 flex justify-center">
          <div className="container shadow-sm rounded-xl px-3 bg-white dark:text-white dark:bg-[#1a1b23]">
            <div className="relative text-3xl font-bold border-b-[1px] border-gray-600">
              <div className=" font-bold text-xl sm:text-3xl pt-3 pb-2 text-center">- Tuyến đường -</div>
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

export default RouteList;
