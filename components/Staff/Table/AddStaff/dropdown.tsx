import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

interface CustomDropdownProps {
  label: string;
  options: string[];
  selectedOption: string;
  onSelectOption: (option: string) => void;
  classname?: string
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  options,
  selectedOption,
  onSelectOption,
  classname
}) => {
  return (
    <Dropdown className="z-30">
      <DropdownTrigger>
        <Button className={`${classname}`} aria-label={label}>{selectedOption || label}</Button>
      </DropdownTrigger>
      <DropdownMenu
        className="dark:bg-[#1a1b23] bg-white text-black dark:text-white border border-gray-300 no-scrollbar rounded w-full max-h-80 overflow-y-auto"
        aria-labelledby="dropdownMenuButton"
      >
        {options.map((option, index) => (
          <DropdownItem key={index} textValue={option}>
            <Button
              onClick={() => onSelectOption(option)}
              aria-label={option}
              className="text-center text-black dark:text-white w-full"
            >
              {option}
            </Button>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default CustomDropdown;
