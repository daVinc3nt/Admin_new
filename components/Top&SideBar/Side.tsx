import classNames from "classnames";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useMemo } from "react";
import { motion, Variants } from "framer-motion";
import { FormattedMessage, useIntl } from "react-intl";
import Item from "./ForSideBar/Item";
import SubItems from "./ForSideBar/SubItems"; 
import { LogoutOutlined, KeyboardDoubleArrowLeft }from '@mui/icons-material';
import Cookies from "js-cookie";
import { Logout } from "./ForSideBar/Logout";
interface MyComponentProps {
  toggleCollapseMobile: boolean;
}
interface MenuItem {
  id:number;
  title: string;
  url: string;
  icon: JSX.Element;
  submenus?: MenuItem[];
}

interface Props {
  menuItems: MenuItem[];
  toggleCollapseMobile: boolean;
}
export default function Side({menuItems, toggleCollapseMobile }) {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);
  const router = useRouter();
  const intl = useIntl();

  const activeMenu = useMemo(
    () => menuItems.find((menu) => menu.url === router.pathname),
    [router.pathname]
  );

  const leftSideVariant: Variants = {
    initial: { x: 20, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    exit: { x: -20, opacity: 0 }
  }

  const leftSideVariantMobile: Variants = {
    initial: { x: 5, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    exit: { x: -5, opacity: 0 }
  }

  const wrapperClasses = classNames(
    "h-screen hidden lg:px-4 lg:flex pt-8 pb-4 bg-white dark:bg-[#1a1b23] justify-between flex-col border-r border-gray-700",
    {
      ["lg:w-80"]: !toggleCollapse,
      ["lg:w-20"]: toggleCollapse,
    }
  );
  const wrapperClassesMobile = classNames(
    "h-screen flex z-50 fixed bg-white dark:bg-[#1a1b23] lg:hidden px-4 pt-8 pb-4 justify-between flex-col border-r border-gray-700",
    {
      ["w-52"]: !toggleCollapseMobile,
      ["w-0 px-0"]: toggleCollapseMobile,
    }
  );

  const collapseIconClasses = classNames(
    "p-3 rounded bg-gray-400 dark:bg-[#373839] absolute right-0 hidden lg:block",
    {
      "rotate-180": toggleCollapse,
    }
  );

  const getNavItemClasses = (menu : any) => {
    return classNames(
      "flex items-center jutify-center cursor-pointer rounded w-full overflow-hidden whitespace-nowrap",
      {
        ["bg-red-200 dark:bg-black text-[#e1201c]"]: activeMenu?.id === menu.id,
      }
    );
  };

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };
  // const handleSidebarToggleMobile = () => {
  //   setToggleCollapseMobile(!toggleCollapseMobile);
  // };

  return (
    <>
    <div
      className={wrapperClasses}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
      style={{ transition: "width 200ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
    >
      <div className="flex flex-col">
        <div className="flex whitespace-nowrap items-center justify-between relative">
          <div className="flex items-center pl-1 gap-4">
            <Image
              src="/Logo.png"
              alt="/"
              width="40"
              height="40"
              style={{objectFit: "cover"}}
            />
            {!toggleCollapse && <motion.span
              variants={leftSideVariant} initial="initial" animate="enter"
              transition={{ duration: 0.5, delay: 0.2 }}
              className={classNames("mt-2 text-3xl font-bold")}
            >
              TDLogistics
            </motion.span>}
          </div>
          {isCollapsible && (
            <button
              className={collapseIconClasses}
              onClick={handleSidebarToggle}
            >
              <KeyboardDoubleArrowLeft/>
            </button>
          )}
        </div>
        <div className={`flex flex-col items-start mt-10 text-[#545e7b] `}>
           {menuItems.map((menu, index) => {
            const classes = getNavItemClasses(menu);
            return (
              <div key={menu.id} className={classes}>
                {menu.submenus? (
                <SubItems title={menu.title} url={menu.url} submenus={menu.submenus} icon={menu.icon} key={index} />
              ) : (
                <Item  title={menu.title} url={menu.url} icon={menu.icon} key={index} />
              )}
              </div>
            );
          })}
        </div>
      </div>

      <div className={`${getNavItemClasses({})}`}>
        <button
        onClick={Logout}
        className="flex py-4 px-3 items-center w-full h-full text-[#545e7b] hover:bg-red-200 dark:hover:bg-black hover:text-[#e1201c]">
          <div style={ !toggleCollapse? { width: "2.5rem" }: { width: "0rem" }}>
            <LogoutOutlined />
          </div>
          {!toggleCollapse && (
            <span
              className={classNames(
                "text-lg font-medium "
              )}
            >
              <FormattedMessage id="Sidebar.option11"/>
            </span>
          )}
        </button>
      </div>
    </div>
    
    <div
      className={wrapperClassesMobile}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
      style={{ transition: "width 200ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between relative">
          <div className="flex items-center pl-1 gap-2">
            <Image
              src="/Logo.png"
              alt="/"
              width="40"
              height="40"
              style={{objectFit: "cover"}}
            />
            {!toggleCollapseMobile && <motion.span
              variants={leftSideVariantMobile} initial="initial" animate="enter"
              transition={{ duration: 0.5, delay: 0.2 }}
              className={classNames("mt-2 text-xl font-bold ", {
              hidden: toggleCollapseMobile,
              })}
            >
              TDLogistics
            </motion.span>}
          </div>
          {isCollapsible && (
            <button
              className={collapseIconClasses}
              onClick={handleSidebarToggle}
            >
              <KeyboardDoubleArrowLeft/>
            </button>
          )}
        </div>

        <div className={`flex flex-col items-start mt-10 text-[#545e7b] `}>
           {menuItems.map((menu, index) => {
            const classes = getNavItemClasses(menu);
            return (
              <div key={menu.id} className={classes}>
                {menu.submenus? (
                <SubItems title={menu.title} url={menu.url} submenus={menu.submenus} icon={menu.icon} key={index} />
              ) : (
                <Item  title={menu.title} url={menu.url} icon={menu.icon} key={index} />
              )}
              </div>
            );
          })}
        </div>
      </div>

      <div className={`${getNavItemClasses({})}`}>
        <button 
        onClick={Logout}
        className="flex py-4 px-3 items-center w-full h-full text-[#545e7b] hover:bg-black hover:text-[#e1201c]">
          {!toggleCollapseMobile && <div style={ { width: "2.5rem" }}>
            <LogoutOutlined />
          </div>}
          {!toggleCollapseMobile && (
              <span
                className={classNames(
                  "text-md font-medium"
                )}
              >
              <FormattedMessage id="Sidebar.option11"/>
              </span>
          )}
        </button>
      </div>
    </div>
    </>
  );
};
