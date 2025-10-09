import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { MdAssignmentAdd, MdDashboardCustomize, MdTopic } from "react-icons/md";
import { FiLogOut, FiTag } from "react-icons/fi";
import { GiJusticeStar } from "react-icons/gi";
import { IoIosArrowDown } from "react-icons/io";
import { TbWindsock } from "react-icons/tb";
import { BsFillPersonFill } from "react-icons/bs";
import { RxCross1, RxCrosshair1 } from "react-icons/rx";
import { AiOutlineAppstore } from "react-icons/ai";
import { FaArrowLeft, FaRegStar } from "react-icons/fa";
import { FaBookBookmark } from "react-icons/fa6";
import { IoPersonOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const { pathname } = location;
  const sidebarRef = useRef(null);
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.token);
  const topicsPostCount = useSelector((state) => state.topicCounts);
  useEffect(() => {
    console.log("Topics Post Count:", topicsPostCount);
  }, [topicsPostCount]);
  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  const mainMenuItems = [
    {
      id: 1,
      title: "Home",
      link: "home",
      icon: "/app2.png",
      activeicon: "/app.png",
    },
    {
      id: 2,
      title: "Popular",
      link: "Popular",
      icon: "/popularicon.png",
      activeicon: "/star.png",
    },
    {
      id: 3,
      title: "Resources",
      link: "/dashboard/resources",
      icon: "/book.png",
      activeicon: "/bookmark2.png",
      activeicon: <FaBookBookmark size={22} />,
    },
    {
      id: 4,
      title: "Topics",
      link: "#",
      icon: "/tagg.png",
      subMenu: [
        {
          id: 1,
          title: "Language Learning",
          link: "languagelearning/language_learning",
          key: "language_learning",
        },
        {
          id: 2,
          title: "Travel & Tourism",
          link: "languagelearning/travel_and_tourism",
          key: "travel_and_tourism",
        },
        {
          id: 3,
          title: "Culture",
          link: "languagelearning/culture",
          key: "culture",
        },
        { id: 4, title: "Food", link: "languagelearning/food", key: "food" },
        {
          id: 5,
          title: "Places",
          link: "languagelearning/places",
          key: "places",
        },
        {
          id: 6,
          title: "History",
          link: "languagelearning/history",
          key: "history",
        },
        {
          id: 7,
          title: "Famous People",
          link: "languagelearning/famous_people",
          key: "famous_people",
        },
        {
          id: 8,
          title: "Personal Stories",
          link: "languagelearning/personal_stories",
          key: "personal_stories",
        },
        {
          id: 9,
          title: "Daily Life",
          link: "languagelearning/daily_life",
          key: "daily_life",
        },
      ],
    },
    {
      id: 5,
      title: "Challenges",
      link: "#",
      icon: "/Golf.png",
      subMenu: [
        {
          id: 1,
          title: "30-Day Streak",
          link: "languagelearning/30_day_streak",
          key: "30_day_streak",
        },
        {
          id: 2,
          title: "100-Day Streak",
          link: "languagelearning/100_day_streak",
          key: "100_day_streak",
        },
        {
          id: 3,
          title: "100 Input Hours",
          link: "languagelearning/100_input_hours",
          key: "100_input_hours",
        },
      ],
    },
    {
      id: 6,
      title: "Personal",
      link: "#",
      icon: "/chalenge.png",
      subMenu: [
        {
          id: 1,
          title: "My Questions",
          link: "questions",
          key: "questions",
        },
        {
          id: 2,
          title: "My Answers",
          link: "answers",
          key: "answers",
        },
        {
          id: 3,
          title: "Saved Posts",
          link: "saved",
          key: "saved",
        },
      ],
    },
  ];

  const toggleSubMenu = (menuId) => {
    setOpenSubMenu((prev) => (prev === menuId ? null : menuId));
  };

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [sidebarOpen]);

  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [sidebarOpen]);

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setSidebarOpen]);

  const getPostCount = (topicKey) => {
    if (!topicsPostCount || typeof topicsPostCount !== "object") return 0;
    return topicsPostCount[topicKey] || 0;
  };
  const handlelogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
    console.log("User logged out successfully");
  };
  return (
    <aside
      ref={sidebarRef}
      className={`fixed left-0 top-0 pt-28 lg:pt-0 bg-white w-[258px] h-screen md:h-[85vh] flex flex-col z-50 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear flex-grow">
        <nav className="py-4 pr-4 lg:mt-0 flex flex-col h-full">
          <div className="flex flex-col justify-start flex-grow">
            <ul className="flex flex-col gap-4">
              {mainMenuItems.map((menuItem) => (
                <li key={menuItem.id}>
                  <NavLink
                    to={menuItem.link}
                    className={`group relative flex font-pally items-center gap-2.5 px-4 py-2 font-bold text-dashboardparasize md:text-dashboardheadingsize duration-300 ease-in-out ${
                      pathname.includes(menuItem.link)
                        ? "bg-btnbackground rounded-r-2xl text-white"
                        : "text-heading"
                    }`}
                    onClick={() =>
                      menuItem.subMenu && toggleSubMenu(menuItem.id)
                    }
                  >
                    {pathname.includes(menuItem.link) ? (
                      <img
                        src={menuItem.activeicon}
                        alt=""
                        className="h-7 w-7 object-contain"
                      />
                    ) : (
                      <img
                        src={menuItem.icon}
                        alt=""
                        className="h-7 w-7 object-contain"
                      />
                    )}

                    {menuItem.title}

                    {menuItem.subMenu && (
                      <IoIosArrowDown
                        className={`ml-auto transform transition-transform duration-300 ${
                          openSubMenu === menuItem.id
                            ? "rotate-180"
                            : "rotate-0"
                        }`}
                      />
                    )}
                  </NavLink>

                  {menuItem.subMenu && openSubMenu === menuItem.id && (
                    <ul className="ml-4 max-h-96 font-HelveticaNeue font-bold overflow-hidden transition-all duration-300 ease-in-out">
                      {menuItem.subMenu.map((subMenuItem) => (
                        <li key={subMenuItem.id}>
                          <NavLink
                            to={subMenuItem.link}
                            className={`group relative border-l-2 flex items-center gap-2.5 rounded-sm px-4 py-2 font-bold text-dashboardparasize duration-300 ease-in-out ${
                              pathname.includes(subMenuItem.link)
                                ? "text-btnbackground border-l-2 border-btnbackground"
                                : "text-[#686868]"
                            }`}
                          >
                            {subMenuItem.title}
                            <span className="ml-auto text-sm text-gray-500">
                              (
                              {isAuthenticated
                                ? getPostCount(subMenuItem.key)
                                : 0}
                              )
                            </span>
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-shrink-0 ">
            <button
              onClick={handlelogout}
              className="group relative flex items-center gap-2.5 w-full text-red-500 hover:bg-red-500 hover:text-white rounded-r-2xl px-4 py-2 font-medium  duration-300 ease-in-out "
            >
              <FiLogOut size={20} />
              Log out
            </button>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
