import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaCirclePause } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { PiBellSimpleRingingBold } from "react-icons/pi";
import { IoPlayCircleOutline, IoSearchOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Menu, MenuItem } from "@mui/material";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import { TbLogout2 } from "react-icons/tb";

const LanguageHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const open = Boolean(anchorEl);

  const gopost = () => {
    navigate("createpost");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  const handlenavigate = () => {
    navigate("/dashboard/videos");
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    dispatch({ type: "LOGOUT" });
    navigate("/sign-in");
    handleClose();
  };

  return (
    <nav className="text-black py-4 font-helvetica h-[80px] lg:h-[100px] w-full border-b">
      <div className="flex justify-between items-center px-4 lg:px-8">
        <div className="flex items-center gap-4 lg:gap-28 w-full">
          <Link to={"/"}>
            <img
              src="/logopic.png"
              alt="Logo"
              className="h-[64px] object-contain rounded-md"
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
          <PiBellSimpleRingingBold className="text-2xl cursor-pointer" />
          {user?.user?.profile_image ? (
            <img
              src={user?.user?.profile_image}
              alt="Profile"
              className="h-10 w-10 rounded-full object-cover cursor-pointer"
              onClick={handleClick}
            />
          ) : (
            <img
              src="/user.svg"
              alt="User"
              className="h-10 w-10 rounded-full cursor-pointer"
              onClick={handleClick}
            />
          )}
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
          {user?.user?.profile_image ? (
            <img
              src={user?.user?.profile_image}
              alt="Profile"
              className="h-14 w-14 rounded-full object-cover cursor-pointer"
              onClick={() => {
                navigate("/dashboard/profile");
                setMenuOpen(false);
              }}
            />
          ) : (
            <img
              src="/user.svg"
              alt="User"
              className="h-14 w-14 rounded-full cursor-pointer"
              onClick={() => {
                navigate("/dashboard/profile");
                setMenuOpen(false);
              }}
            />
          )}
          <PiBellSimpleRingingBold className="text-4xl mt-2 cursor-pointer" />
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

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={() => { navigate("/dashboard/profile"); handleClose(); }} className="flex gap-2">
          <IoSettingsOutline size={20} />
          Settings
        </MenuItem>
        <MenuItem
          onClick={() => { navigate("/contact"); handleClose(); }}
          className="gap-2 flex"
        >
          <HiOutlineMail size={20} /> Contact
        </MenuItem>
        <MenuItem onClick={handleLogout} className="flex gap-2">
          <TbLogout2 size={20} /> Logout
        </MenuItem>
      </Menu>
    </nav>
  );
};

export default LanguageHeader;
