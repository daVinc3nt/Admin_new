import React from "react";
import AccountSetting from "./AccountSetting";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "@/Context/InfoContext/UserContext";
import LoadingSkeleton from "../LoadingSkeleton/loadingSkeleton";
import { FormattedMessage } from "react-intl";
const AccountMenu = () => {
  const info = useContext(UserContext).info;
  return (
    <div className="h-[calc(100vh-3rem)] content-center overflow-y-hidden flex flex-col w-full">
      <div className="h-full items-center w-full left-0 right-0 overflow-y-scroll no-scrollbar">
        <section className="p-2 flex justify-center">
          <div className="container shadow-sm rounded-xl px-3 bg-white dark:text-white dark:bg-[#1a1b23]">
            <div className="relative text-3xl font-bold border-b-[1px] border-gray-600">
              <div className=" font-bold text-xl sm:text-3xl pt-3 pb-2 text-center">
                <FormattedMessage id="Account.title" />
              </div>
            </div>

            <div className="w-full">
              {info !== null ? <AccountSetting info={info} /> : ""}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AccountMenu;
