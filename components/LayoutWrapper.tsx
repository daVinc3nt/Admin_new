import React, { ReactNode, useState } from "react";
import SideBar from "./Top&SideBar/SideBar"
import MenuHambuger from "./Top&SideBar/MenuHambuger";
import ThemeSwitcher from "./Theme/ThemeSwitch";
import Provider from "./Theme/Provider";
import {
  NotifyIcon,
  GlobseIcon
} from "./Icons"
import LangSelector from "@/components/LangSelector/LangSelector";
import { FaCarSide } from "react-icons/fa";
interface LayoutProps {
  children: ReactNode;
} 
//reactNode is a dataType of react, its can be JSX, 
//component or any fragment

const Wrapper = ({ children }: LayoutProps) => {
  const [toggleCollapseMobile, setToggleCollapseMobile] = useState(false);
  const handleSidebarToggleMobile = () => {
    setToggleCollapseMobile(!toggleCollapseMobile);
  };
  return (
  <Provider>
   <div className="flex overflow-hidden">
      <SideBar toggleCollapseMobile={toggleCollapseMobile}/>
      <div className="flex-1 flex ring-2 flex-col h-screen ">
      <div className="flex flex-col">
        <header className="h-14 flex justify-end w-full bg-red-800 dark:bg-[#111319] items-center px-4 xl:px-2 border-b  dark:border-gray-700">
          <div className="flex items-center">
              <div className="flex items-center">
                <div className="flex flex-row gap-2 items-center">
                  <LangSelector/>
                  <NotifyIcon/>
                  <ThemeSwitcher/>
                </div>
                  <MenuHambuger toggle ={handleSidebarToggleMobile}/>
              </div>
          </div>
        </header>
      </div>
      {!toggleCollapseMobile && 
        <div className="lg:hidden flex-1 flex z-40 fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm">
        </div>}
      <div className="bg-gray-200 dark:bg-[#111319] flex flex-1 ">
          {children}
      </div>
      </div>
    </div>
  </Provider>
  );
};

export default Wrapper;
