import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaCirclePause } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { PiBellSimpleRingingBold } from "react-icons/pi";
import { IoPlayCircleOutline, IoSearchOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const LanguageHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const gopost = () => {
    navigate("createpost");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const handlenavigate = () => {
    navigate("/dashboard/videos");
  };

  return (
    <nav className="text-black py-4 font-helvetica h-[80px] lg:h-[100px] w-full border-b">
      <div className="flex justify-between items-center px-4 lg:px-8">
        <div className="flex items-center gap-4 lg:gap-28 w-full">
          <Link to={"/"}>
            <img
              src="/logopic.png"
              alt="Logo"
              className="h-12 w-28 object-contain rounded-md"
            />
          </Link>
          <div className="hidden md:flex relative">
            <input
              type="search"
              className="w-80 bg-gray-100 pl-10 py-3 rounded-xl font-pally"
              placeholder="Search"
            />
            <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500" />
          </div>
        </div>

        <div className="hidden lg:flex gap-4 items-center">
          <button
            onClick={handlenavigate}
            className="flex gap-2 items-center justify-center w-44 border border-heading text-heading hover:border-btnbackground hover:text-white px-4 py-3 font-semibold font-HelveticaNeue hover:bg-btnbackground rounded-full transition"
          >
            <IoPlayCircleOutline className="text-2xl" /> Videos
          </button>
          <button
            onClick={gopost}
            className="flex  gap-2 items-center justify-center w-44 bg-btnbackground text-white px-4 py-3 font-semibold rounded-full font-HelveticaNeue hover:bg-hoverbtn transition"
          >
            <FaPlus /> Create Post
          </button>
          <PiBellSimpleRingingBold className="text-2xl" />
          <img
            src="/doggirl.webp"
            alt="User"
            className="h-10 w-10 object-center rounded-full"
          />
        </div>

        <div className="lg:hidden flex items-center">
          <button onClick={toggleMenu} className="text-2xl">
            {menuOpen ? <IoMdClose /> : <RxHamburgerMenu />}
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden absolute top-[70px] left-0 w-full z-[9999999999999999999999999999999999999999999999999999] bg-white shadow-md p-4 flex flex-col items-center gap-4 transition-transform duration-500 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex gap-4">
          <img
            src="/doggirl.webp"
            alt="User"
            className="h-14 w-14 object-center rounded-full"
          />
          <PiBellSimpleRingingBold className="text-4xl mt-2" />
        </div>
        <input
          type="search"
          className="w-full bg-gray-100 pl-10 py-3 rounded-xl"
          placeholder="Search"
        />
        <button
          onClick={handlenavigate}
          className="flex gap-2 items-center justify-center w-full border border-primary text-primary hover:border-btnbackground hover:text-white px-4 py-3 font-semibold hover:bg-btnbackground rounded-full transition"
        >
          <FaCirclePause /> Videos
        </button>
        <button
          onClick={gopost}
          className="flex gap-2 items-center justify-center w-full bg-btnbackground text-white px-4 py-3 font-semibold rounded-full hover:bg-hoverbtn transition"
        >
          <FaPlus /> Create Post
        </button>
      </div>
    </nav>
  );
};

export default LanguageHeader;
