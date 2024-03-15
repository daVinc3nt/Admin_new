import { ListItemButton } from "@mui/material";
import Link from 'next/link'

interface MenuItem {
  title: string;
  url: string;
  icon: JSX.Element;
}

const Item: React.FC<MenuItem>  = (menuItems) => {
  return (
    <div className="w-full">
    <Link href={menuItems.url}>
    <div
    className="p-2.5 mt-1 flex items-center rounded-md duration-300 cursor-pointer "
  >
    {menuItems.icon}
    <span className="text-xs lg:text-lg ml-4 font-medium">{menuItems.title}</span>
  </div>
  </Link>
  </div>
  );
};

export default Item;