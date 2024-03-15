import React from "react";
import { useState, useEffect, useCallback } from "react";
import DemoPage from "./Table/export";
import LoadingSkeleton from "../LoadingSkeleton/loadingSkeleton";
import { FormattedMessage } from "react-intl";
const PostOfficeMenu = () => {
  const [demoPage, setDemoPage] = useState(<LoadingSkeleton />);

  const reloadData = useCallback(() => {
    fetchDemoPage();
  }, []);
  const fetchDemoPage = async () => {
    const result = await DemoPage(reloadData);
    setDemoPage(result);
  };

  useEffect(() => {
    fetchDemoPage();
  }, []);
  return (
    <div className="h-[calc(100vh-3rem)] content-center overflow-y-hidden flex flex-col w-full">
      <div className="h-full items-center w-full left-0 right-0 overflow-y-scroll no-scrollbar">
        <section className="p-2 flex justify-center">
          <div className="container shadow-sm rounded-xl px-3 bg-white dark:text-white dark:bg-[#1a1b23]">
            <div className="relative text-3xl font-bold border-b-[1px] border-gray-600">
              <div className=" font-bold text-xl sm:text-3xl pt-3 pb-2 text-center">
                <FormattedMessage id="PostOffice.Title" />
              </div>
            </div>
            <div className="w-full">{demoPage}</div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PostOfficeMenu;
