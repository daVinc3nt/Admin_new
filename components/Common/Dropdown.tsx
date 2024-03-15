import React, { useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

interface CustomDropdownProps {
  label: string;
  options: any[];
  selectedOption: any;
  onSelectOption: (option: any) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  options,
  selectedOption,
  onSelectOption,
}) => {
  const [selected, setSelected] = useState(selectedOption);

  const handleOptionClick = (option: any) => {
    if (selected === option) {
      onSelectOption("");
      setSelected("");
    } else {
      onSelectOption(option);
      setSelected(option);
    }
  };

  return (
    <>
      <Dropdown className="z-50" shouldCloseOnInteractOutside={(e) => false}>
        <DropdownTrigger>
          <Button
            className="text-xs md:text-sm bg-black text-dark dark:text-white border border-gray-600 rounded h-10 w-32"
            aria-label={label}
          >
            {label}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          className="dark:bg-[#1a1b23] bg-white border border-gray-300 no-scrollbar rounded w-full max-h-80 overflow-y-auto"
          aria-labelledby="dropdownMenuButton"
        >
          {options.map((option, index) => (
            <DropdownItem key={index} textValue={option} >
              <Button
                onClick={() => handleOptionClick(option)}
                aria-label={option}
                className={`text-center text-black dark:text-white w-full px-2 ${selected === option ? 'bg-gray-400/50 rounded' : ''}`}
              >
                {option}
              </Button>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

export default CustomDropdown;
