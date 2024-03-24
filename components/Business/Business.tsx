import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import DemoPage from "./Table/exportBusiness";
import LoadingSkeleton from "../LoadingSkeleton/loadingSkeleton";
import { FormattedMessage } from "react-intl";
const BusinessMenu = () => {
  const [demoPage, setDemoPage] = useState(<LoadingSkeleton />);
  const router = useRouter();
  const reloadData = useCallback(() => {
    fetchDemoPage();
  }, []);

  const fetchDemoPage = async () => {
    const result = await DemoPage(reloadData);
    setDemoPage(result);
  };

  useEffect(() => {
    fetchDemoPage();
  }, [router.pathname]);

  return (
    <div className="h-[calc(100vh-3rem)] content-center overflow-y-hidden flex flex-col ">
      <div className="h-full items-center w-full left-0 right-0 overflow-y-scroll no-scrollbar">
        <section className="p-2 flex justify-center">
          <div className="container shadow-sm rounded-xl px-3 bg-white dark:text-white dark:bg-[#1a1b23]">
            <div className="relative text-3xl font-bold border-b-[1px] border-gray-600">
              <div className=" font-bold text-xl sm:text-3xl pt-3 pb-2 text-center">
                Doanh nghiệp
              </div>
            </div>
            <div className="w-full">{demoPage}</div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BusinessMenu;
