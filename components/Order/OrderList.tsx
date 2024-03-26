import React, { useCallback, useContext } from "react";
import { useState, useEffect } from "react";
import DemoPage from "./Table/export";
import LoadingSkeleton from "../LoadingSkeleton/loadingSkeleton";
import { useIntl } from "react-intl"
import { FormattedMessage } from "react-intl";
import { SocketContext } from "@/Context/SocketContext/SocketContext";
const OrderList = () => {
  const { socket } = useContext(SocketContext)
  const intl = useIntl();
  const [demoPage, setDemoPage] = useState(<LoadingSkeleton />);
  const fetchDemoPage = async () => {
    const result = await DemoPage(socket, reloadData);
    setDemoPage(result);
  };
  const reloadData = useCallback(() => {
    fetchDemoPage();
  }, []);
  useEffect(() => {
    fetchDemoPage();
  }, []);
  return (
    <div className="h-[calc(100vh-3rem)] content-center overflow-y-hidden flex flex-col w-full bg-gray-200">
      <div className="h-full items-center w-full left-0 right-0 overflow-y-scroll no-scrollbar">
        <section className="p-1 sm:p-2 flex justify-center">
          <div className="container shadow-sm rounded-xl px-2 sm:px-3 text-black bg-white">
            <div className="relative text-3xl font-bold border-b-[1px] border-gray-600">
              <div className=" font-bold text-xl sm:text-3xl pt-3 pb-2 text-center">
                <FormattedMessage id="order" />
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

export default OrderList;
