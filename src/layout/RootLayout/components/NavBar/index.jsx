import clsx from "clsx";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const AUTH_KEY = "isAuthenticated";
import WelcomePopup from "@components/WellcomPopup/WelcomePopup";

const Navbar = ({ open, onCloseNav }) => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(1);
  const [selectedSubItem, setSelectedSubItem] = useState(0);
  const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);
  const primumData = "0";
  const isAuthenticated = useSelector((state) => state.admin.isAuthenticated);
  const isAuthenticatedUser = localStorage.getItem(AUTH_KEY);
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);
  const handleTutorialClick = () => {
    setShowPopup((prevState) => !prevState);
  };

  useEffect(() => {
  }, [showPopup]);

  useEffect(() => {
    const matchingItem = ListData.find((item) => item.to === location.pathname);
    if (matchingItem) {
      setSelectedId(matchingItem.id);
    }
  }, [location.pathname]);

  const authenticatedListData = [
    {
      id: 1,
      title: "Videos",
      icon: "/Play2.png",
      activeicon: "/Play.png",
      to: "/dashboard/videos",
    },
    {
      id: 10,
      title: "Series",
      icon: "/library.png",
      activeicon: "/library2.png",
      to: "/dashboard/series",
    },
    {
      id: 22,
      title: "Library",
      icon: "/Album.png",
      activeicon: "/Album2.png",
      to: "/dashboard/library",
    },
    {
      id: 23,
      title: "Progress",
      icon: "/progress.png",
      activeicon: "/progress2.png",
      to: "/dashboard/progress",
    },
    {
      id: 24,
      title: "Resources",
      icon: "/bookmark.png",
      activeicon: "/bookmark2.png",
      to: "/dashboard/resources",
    },
  ].filter((item) => item.show === undefined || item.show);

  const unauthenticatedListData = [
    {
      id: 1,
      title: "Videos",
      icon: "/Play2.png",
      activeicon: "/Play.png",
      to: "/dashboard/videos",
    },
    {
      id: 11,
      title: "Series",
      icon: "/library.png",
      activeicon: "/library2.png",
      to: "/dashboard/series",
    },
    {
      id: 22,
      title: "Library",
      icon: "/Album.png",
      activeicon: "/Album2.png",
      to: "/dashboard/library",
    },
    {
      id: 23,
      title: "Progress",
      icon: "/progress.png",
      activeicon: "/progress2.png",
      to: "/dashboard/progress",
    },
    {
      id: 24,
      title: "Resources",
      icon: "/bookmark.png",
      activeicon: "/bookmark2.png",
      to: "/dashboard/resources",
    },
  ].filter((item) => item.show === undefined || item.show);

  const PrimumVedioData = [
    {
      id: 1,
      title: "Videos",
      icon: "/Play2.png",
      activeicon: "/Play.png",
      to: "/dashboard/videos",
    },
    {
      id: 10,
      title: "Series",
      icon: "/library.png",
      activeicon: "/library2.png",
      to: "/dashboard/series",
    },
    {
      id: 22,
      title: "Library",
      icon: "/Album.png",
      activeicon: "/Album2.png",
      to: "/dashboard/library",
    },
    {
      id: 23,
      title: "Progress",
      icon: "/progress.png",
      activeicon: "/progress2.png",
      to: "/dashboard/progress",
    },
    {
      id: 24,
      title: "Resources",
      icon: "/bookmark.png",
      activeicon: "/bookmark2.png",
      to: "/dashboard/resources",
    },
  ];

  const ListData = isAuthenticatedUser
    ? authenticatedListData
    : primumData === "1"
    ? PrimumVedioData
    : unauthenticatedListData;

  const handleItemClick = (item) => {
    setSelectedId(item.id);
    setSelectedSubItem(0);
    if (item.subItems) {
      setIsSubMenuVisible(!isSubMenuVisible);
    }
  };

  const renderSubMenu = (list) => {
    if (!list.subItems) return null;

    return (
      <div
        className={clsx("relative mt-2 flex flex-col gap-2 w-full", {
          "opacity-100  flex flex-col": isSubMenuVisible,
          "opacity-0 hidden": !isSubMenuVisible,
        })}
      >
        {list.subItems.map((subItem) => (
          <div key={subItem.id} className="flex justify-end pr-6 text-center">
            <Link
              to={subItem.to}
              onClick={() => {
                setSelectedSubItem(subItem.id);
                if (subItem.onClick) subItem.onClick();
              }}
              className={clsx(
                " p-2 w-[70%] text-[#0C3373] text-[18px] rounded-full font-bold duration-300 cursor-pointer",
                {
                  "bg-[#F28327] text-white ": selectedSubItem === subItem.id,
                  "bg-transparent text-[#0C3373]":
                    selectedSubItem !== subItem.id,
                }
              )}
            >
              {subItem.title}
            </Link>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="pt-4 pl-8">
        <img
          onClick={() => navigate("/")}
          src="/logopic.png"
          alt="logo"
          className="h-[64px] md:block hidden cursor-pointer  object"
        />
      </div>
      <div
        className={clsx(
          "left-0 w-[full] md:w-[258px] px-3 flex flex-row md:flex-col md:pt-10 md:mt-8 md:gap-4 justify-between md:justify-start bg-white  z-20 duration-300 overflow-x-hidden overflow-y-auto",
          {
            "absolute left-0 w-full md:w-[258px] bottom-0 md:top-[40px]": open,
            "absolute left-0 w-full md:w-[258px] bottom-0 md:top-[40px]": !open,
          }
        )}
      >
        {/* <button
        className="absolute -top-0 left-0 px-4  md:hidden"
        onClick={onCloseNav}
      >
        <FaArrowLeft className="text-3xl border p-1 border-black bg-gray-800 text-white rounded-lg" />
      </button> */}

        {ListData.map((list, index) => (
          <div key={index}>
            <Link
              to={list.to}
              // style={{ fontFamily: '"Pally", sans-serif' }}

              onClick={() => handleItemClick(list)}
              className={clsx(
                " md:px-3 md:py-3 px-2 py-1 md:w-[] relative text-[#0C3373] text-[24px] font-pally font-bold flex md:flex-row flex-col items-center md:pl-10 gap-2 md:gap-2 duration-300 cursor-pointer",
                {
                  "md:bg-[#F28327] text-[#0C3373] border-t-4 border-btnbackground bg-white md:text-white md:rounded-full":
                    selectedId === list.id ||
                    selectedSubItem?.parentId === list.id,
                  "md:bg-white text-[#0C3373]":
                    selectedId !== list.id &&
                    selectedSubItem?.parentId !== list.id,
                }
              )}
            >
              {list.subItems &&
                (isSubMenuVisible ? (
                  <MdOutlineKeyboardArrowUp
                    size={19}
                    className="absolute top-1/2 -translate-y-1/2 right-3"
                  />
                ) : (
                  <MdOutlineKeyboardArrowDown
                    size={19}
                    className="absolute top-1/2 -translate-y-1/2 right-3"
                  />
                ))}
              <img
                src={
                  window.innerWidth >= 847
                    ? selectedId === list.id ||
                      selectedSubItem?.parentId === list.id
                      ? list.activeicon
                      : list.icon
                    : list.icon
                }
                alt=""
                className="h-6 w-6 md:h-6 md:w-6"
              />

              {/* {list.icon} */}
              <h1 className="text-[10px] md:font-pally font-HelveticaNeue md:text-[24px]">
                {list.title}
              </h1>
            </Link>
            {renderSubMenu(list)}
          </div>
        ))}

        {showPopup && <WelcomePopup onClose={() => setShowPopup(false)} />}
      </div>
    </>
  );
};

export default Navbar;
