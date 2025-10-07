import React, { useState } from "react";
import { IoChevronDownCircleOutline } from "react-icons/io5";

const DropDown = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(data.title);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between px-4 py-2 text-gray-500 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 focus:outline-none min-w-[150px] w-auto"
      >
        <span>{selectedOption}</span>
        <IoChevronDownCircleOutline className="w-5 h-5 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 min-w-[150px] mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-auto">
          <ul>
            {data?.options?.map((val) => {
              return (
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleOptionClick(val)}
                  key={val}
                > 
                  {val}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropDown;
