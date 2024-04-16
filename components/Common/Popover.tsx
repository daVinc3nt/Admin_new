import React, { ReactNode } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Button } from "@nextui-org/react";
interface Props {
  children: ReactNode;
  icon: any;
  name?: string;
  className?: string
}
//reactNode is a dataType of react, its can be JSX,
//component or any fragment

export default function BasicPopover({ children, icon = null, name, className }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button
        className={`text-xs h-10 md:text-sm border border-gray-600 rounded ml-2 px-2 text-center ${className}`}
        aria-describedby={id}
        onClick={handleClick}
      >
        {icon}
        <span className='hidden sm:block'>{name ? name : 'Filter'}</span>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        className="mt-3"
      >
        <div className="dark:bg-[#1a1b23] border border-gray-300 rounded px-4 pb-4">
          {children}
        </div>
      </Popover>
    </div>
  );
}
