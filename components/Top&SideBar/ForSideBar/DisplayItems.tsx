import { useState } from "react";
import Item from "./Item";
import SubItems from "./SubItems"; 
import { LogoutOutlined }from '@mui/icons-material';
interface MenuItem {
  title: string;
  url: string;
  icon: JSX.Element;
  submenus?: MenuItem[];
}

interface Props {
  menuItems: MenuItem[];
  toggleCollapseMobile: boolean;
}

export default function DisplayItems({menuItems}) {
  const [dropdown, Setdropdown] = useState(false)
  return (

  <div className="h-screen z-50 top-0 bottom-0 flex flex-col w-80 overflow-y-auto text-center bg-gray-900">
    {/* logo */}
      <div className="text-gray-100 text-xl">
        <div className="p-2.5 mt-1 flex items-center">
          <i className="bi bi-app-indicator px-2 py-1 rounded-md bg-blue-600"></i>
          <h1 className="font-bold hidden md:block text-gray-200 text-xl ml-3">TDLogistics</h1>
          <i
            className="bi bi-x cursor-pointer ml-28 lg:hidden"
          ></i>
        </div>
        <div className="my-2 bg-gray-600 h-[1px]"></div>
      </div>
      {menuItems.map((menu, index) => (
              menu.submenus? (
                <SubItems title={menu.title} url={menu.url} submenus={menu.submenus} icon={menu.icon} key={index} />
              ) : (
                <Item  title={menu.title} url={menu.url} icon={menu.icon} key={index} />
              )
          ))}
      <div
        className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-600 text-white"
      >
        <LogoutOutlined />
        <span className="text-xs lg:text-lg ml-4 text-gray-200 font-bold hidden md:block">Thoát</span>
      </div>
      
  </div>

  );
}