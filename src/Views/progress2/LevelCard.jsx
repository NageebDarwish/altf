import React from "react";
import { FaBookOpen, FaRegClock } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const LevelCard = ({ level, isOpen, toggle }) => {
  return (
    <div className="bg-white text-black p-4 rounded-xl w-full mx-auto border md:border-none md:shadow">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={toggle}
      >
        <div className="flex items-center gap-3">
          <img src={level.image} alt={level.title} className="w-14 h-14 object-contain" />
          <div>
            <h2 className="text-[15px] md:text-[32px] text-[#0c3373] md:text-largeLight font-pally font-bold">{level.title}</h2>
            <p className="text-[10px] md:text-[15px] flex font-HelveticaNeue gap-2"><FaRegClock className="mt-1 text-orange-500"/> Hours of Input: {level.hours}</p>
            <p className="text-[10px] md:text-[15px] flex font-HelveticaNeue gap-2"><FaBookOpen className="mt-1 text-orange-500"/> Known Words: {level.words}</p>
          </div>
        </div>
        <span className="transition-transform duration-300">
          {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </span>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"
        }`}
      >
      <p className="text-[10px] md:text-[15px] leading-5 font-normal font-HelveticaNeue text-gray-600">{level.description}</p>
      </div>
    </div>
  );
};

export default LevelCard;
