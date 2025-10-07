import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

const DropdownBlog = ({ buttonText, options, onSelect, heading, selectedOptions = [] }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Determine button text based on selections
    const displayText = selectedOptions.length > 0 
        ? `${selectedOptions.length} selected` 
        : buttonText;

    return (
        <div className="relative inline-block text-left z-40" ref={dropdownRef}>
            <div className="flex items-center px-4 py-2 rounded-md focus:outline-none">
                {/* <span className="mr-2 text-sm font-semibold">{heading}</span> */}
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center bg-[#E5E5FF] text-[#615E83] px-3 py-2 rounded-lg gap-6 cursor-pointer"
                >
                    <span className="text-[18px] text-primary font-semibold">{displayText}</span>
                    <FaChevronDown className={`ml-2 text-primary transform transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`} />
                </div>
            </div>
            <div
                className={`absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md transition-opacity duration-300 transform ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                    }`}
            >
                <ul className="py-2">
                    {options.map((option, index) => {
                        const isSelected = selectedOptions.some(selected => selected.name === option.name);
                        return (
                            <li
                                key={index}
                                className="px-4 py-2 flex justify-between gap-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                    onSelect(option);
                                }}
                            >
                                <div className="flex items-center">
                                    <input 
                                        type="checkbox" 
                                        checked={isSelected}
                                        readOnly
                                        className="h-[14px] w-[14px] mt-1 mr-2" 
                                    /> 
                                    {option.name}
                                </div>
                                {/* You can add count here if available */}
                                {/* <span> ({option.count || 0})</span> */}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default DropdownBlog;