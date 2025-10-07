import React, { useState } from 'react';
import { FaChevronDown, FaPlus } from 'react-icons/fa';
const FilterCustom = ({ heading, options, icon }) => {
    const [selected, setSelected] = useState(options[0]);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <div className='flex flex-col sm:flex-row justify-between px-4 py-2'>
                <h1 className='flex gap-2 text-dashboardparasize font-HelveticaNeue font-bold mt-3 text-heading sm:text-dashboardheadingsize'>
                    {icon} {heading}
                </h1>

                <div className='flex gap-2'>
                    <div className="relative rounded-full">
                        <div
                            className="flex gap-2 items-center justify-between border border-heading px-4 py-1 text-heading font-semibold rounded-full bg-white sm:text-lg cursor-pointer"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <div className="flex items-center gap-2">
                                {selected.icon}
                                <span>{selected.option}</span>
                            </div>
                            <FaChevronDown />
                        </div>

                        {isOpen && (
                            <div className="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                                {options.slice(1).map((option, index) => (
                                    <div
                                        key={index}
                                        className="flex gap-2 items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                                        onClick={() => {
                                            setSelected(option);
                                            setIsOpen(false);
                                        }}
                                    >
                                        {option.icon}
                                        <span>{option.option}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button className='flex gap-2 font-HelveticaNeue items-center justify-center bg-btnbackground text-white px-4 h-10 font-semibold rounded-full hover:bg-hoverbtn transition sm:text-lg'>
                        <FaPlus /> Post
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterCustom;