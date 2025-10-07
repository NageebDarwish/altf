import { useEffect, useState, useMemo, useCallback } from "react";
import {
  Box,
  Toolbar,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "@components/Button";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import { TbLogout2 } from "react-icons/tb";
import DialogComp from "@views/Progress/DialogComp";
import axios from "axios";
import { request } from "@services/axios";
import { IoIosArrowDown } from "react-icons/io";
import DesktopMenuItems from "@components/DesktopMenuItems";
import { useMenuContext } from "../../../../contexts/MenuContext";

const AuthenticatedHeader = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const user = useSelector((state) => state.user);
  const Showlevels = useSelector((state) => state.user.user);
  const [streaks, setStreaks] = useState([]);
  const progresscompletemin = useSelector((state) => state?.goal);
  const { updateMenuData } = useMenuContext();

  const tokken = useSelector((state) => state.user.token);
  const [datatime, setdatatime] = useState();
  const userStatus = useSelector((state) => state?.user?.user?.is_premium);
  useEffect(() => {
    try {
      const storedData = localStorage.getItem("userData");
      if (storedData) {
        JSON.parse(storedData);
      }
    } catch (error) {
      console.error("Error reading user data:", error);
    }
  }, []);

  const fetchDashboardStatics = useCallback(async () => {
    const token = tokken;

    try {
      const response = await fetch(
        "https://admin.arabicallthetime.com/api/user/dashboard/statics",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      setdatatime(data.payload);
    } catch (error) {
      console.error("Error fetching dashboard statics:", error);
    }
  }, [tokken]);

  useEffect(() => {
    fetchDashboardStatics();
  }, [fetchDashboardStatics]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("outsideAATTHours");

    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  const handleSetting = () => {
    navigate("/dashboard/profile");
  };

  const levelRanges = {
    1: { start: 0, end: 20 },
    2: { start: 20, end: 50 },
    3: { start: 50, end: 100 },
    4: { start: 100, end: 200 },
    5: { start: 200, end: 300 },
    6: { start: 300, end: 400 },
    7: { start: 400, end: 500 },
    8: { start: 500, end: 600 },
    9: { start: 600, end: 700 },
    10: { start: 700, end: Infinity },
  };

  const watchedHours = Math.floor(
    (Showlevels?.total_watching_hours || 0) / 3600
  );

  const determineLevelInfo = (hours) => {
    for (const [level, range] of Object.entries(levelRanges)) {
      if (hours >= range.start && hours < range.end) {
        const remaining = Math.ceil(range.end - hours);
        return {
          level: `Level ${level}`,
          levelNumber: parseInt(level), // Add this to get numeric level
          remainingHours: remaining === Infinity ? "Infinity" : remaining,
          progressPercent: Math.min(
            100,
            Math.max(
              0,
              ((hours - range.start) / (range.end - range.start)) * 100
            )
          ),
          rangeStart: range.start,
          rangeEnd: range.end === Infinity ? "∞" : range.end,
        };
      }
    }
    return {
      level: "Level 1",
      levelNumber: 1,
      remainingHours: 20,
      progressPercent: 0,
      rangeStart: 0,
      rangeEnd: 20,
    };
  };

  const { levelNumber, progressPercent } = determineLevelInfo(watchedHours);

  const menuItems = useMemo(() => ["Min Circle", "Day Streak", "Level", "Words"], []);

  const staticData = useMemo(() => {
    const levelImages = {
      "Level 1": "/one1.png",
      "Level 2": "/two2.png",
      "Level 3": "/three3.png",
      "Level 4": "/four4.png",
      "Level 5": "/five5.png",
      "Level 6": "/six6.png",
      "Level 7": "/seven7.png",
      "Level 8": "/eight8.png",
      "Level 9": "/nine9.png",
      "Level 10": "/ten10.png",
    };

    return {
    "Min Circle": {
      icon: <img src="/daily-minute-goal 1.png" alt="" />,
    },
    "Day Streak": {
      count: streaks.length,
      icon: <img src="/flame-icon 1svg 1.png" alt="" />,
    },
    Level: {
      level: `${Math.round(progressPercent)}%`,
      icon: (
        <img
          src={levelImages[`Level ${levelNumber}`]}
          alt={`Level ${levelNumber}`}
        />
      ),
    },
    Words: {
      wordCount: datatime?.total_watched_video_count || 0,
      icon: <img src="/Clip path group.png" alt="" />,
    },
    };
  }, [streaks.length, progressPercent, levelNumber, datatime?.total_watched_video_count]);

  // Update context with menu data
  useEffect(() => {
    updateMenuData({
      menuItems,
      staticData,
      progresscompletemin,
      setOpenDialog,
    });
  }, [menuItems, staticData, progresscompletemin, setOpenDialog, updateMenuData]);

  const fetchData = async (url, setter) => {
    try {
      const result = await request(
        {
          url: url,
          method: "get",
        },
        false
      );
      setter(result?.data?.payload);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData("api/all/streaks", setStreaks);
  }, []);

  const getGoalData = useCallback(async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_REACT_APP_URL}api/goal`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            Accept: "application/json",
          },
        }
      );
      const body = {
        target_minutes: res?.data?.payload?.target_minutes,
        completed_minutes: res?.data?.payload?.completed_minutes,
      };
      dispatch({
        type: "ADD_GOAL",
        payload: body,
      });
    } catch (error) {
      console.error(
        "Error saving goal:",
        error.response?.data || error.message
      );
    }
  }, [dispatch, user.token]);
  useEffect(() => {
    getGoalData();
  }, [getGoalData]);

  return (
    <Box
      component="header"
      className="flex-1"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#ffffff",
        padding: "6px 10px",
        position: "fixed",
        top: 0,
        width: { xs: "100%", md: "calc(100% - 280px)" },
        zIndex: 1200,
      }}
    >
      {/* Logo Section */}

      <div className="block md:flex flex-wrap justify-between w-full flex-1 items-center ">
        <div className="md:hidden flex items-center flex-1 justify-center">
          <div className="md:hidden flex w-full">
            {isAuthenticated ? (
              <>
                <Box
                  display="flex"
                  flex={1}
                  justifyContent={"space-between"}
                  alignItems="center"
                  gap={"20px"}
                  sx={{ cursor: "pointer" }}
                  onClick={handleClick}
                >
                  <Link to={"/"}>
                    <img
                      src="/logopic.png"
                      alt="Logo"
                      className="h-12 w-28 object-contain rounded-md"
                    />
                  </Link>
                  <div className="flex items-center gap-2 md:pt-2">
                    {userStatus === "0" && (
                      <button
                        onClick={() => navigate("/pricing-page")}
                        className="rounded-3xl gap-2 flex items-center justify-end bg-[#081F45] text-[#B99225] text-sm font-bold px-4 py-2"
                      >
                        <img src="/king.svg" alt="" />
                        Go Premium
                      </button>
                    )}
                    {user?.user?.profile_image !== "" ? (
                      <img
                        src={user?.user?.profile_image}
                        alt="Profile"
                        className="h-[40px] w-[40px] rounded-full object-cover"
                      />
                    ) : (
                      <img src="/user.svg" className="h-[40px] w-[40px]" />
                    )}
                  </div>
                </Box>
              </>
            ) : (
              <>
                <div className="flex justify-between gap-2 w-full mt-2">
                  <Link to={"/"}>
                    <img
                      src="/logopic.png"
                      alt="Logo"
                      className="h-12 w-28 object-contain rounded-md"
                    />
                  </Link>
                  <div className="flex items-center gap-2 md:pt-2">
                    <button
                      onClick={() => navigate("/sign-in")}
                      className="bg-btnbackground px-2 rounded-full py-1 hover:bg-btnbackground text-white"
                    >
                      Log in
                    </button>
                    <button
                      onClick={() => navigate("/sign-up")}
                      className="border border-btnbackground px-2 rounded-full py-1 hover:text-white hover:bg-btnbackground text-btnbackground"
                    >
                      Sign up
                    </button>
                  </div>
                </div>
              </>
            )}
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={handleSetting} className="flex gap-2">
                <IoSettingsOutline size={20} />
                Settings
              </MenuItem>
              <MenuItem
                onClick={() => navigate("/contact")}
                className="gap-2 flex"
              >
                <HiOutlineMail size={20} /> Contact
              </MenuItem>
              <MenuItem onClick={handleLogout} className="flex gap-2">
                <TbLogout2 size={20} /> Logout
              </MenuItem>
            </Menu>
          </div>
        </div>
        <Toolbar
          sx={{
            justifyContent: "space-between",
            gap: 2,
          }}
          className="px-0 flex-1 justify-between md:flex hidden flex-wrap"
        >
          <div className="hidden md:block">
            <DesktopMenuItems 
              menuItems={menuItems}
              staticData={staticData}
              progresscompletemin={progresscompletemin}
              setOpenDialog={setOpenDialog}
            />
          </div>

          <Box display="flex" alignItems="center" className="md:block hidden">
            {isAuthenticated ? (
              <>
                <Box
                  display="flex"
                  alignItems="center"
                  gap={"5px"}
                  sx={{ cursor: "pointer" }}
                  onClick={handleClick}
                >
                  {userStatus === "0" && (
                    <button
                      onClick={() => navigate("/pricing-page")}
                      className="rounded-3xl gap-2 flex items-center justify-end bg-[#081F45] text-[#B99225] text-sm font-bold px-6 py-3"
                    >
                      <img src="/material-symbols_crown.png" alt="" />
                      Premium
                    </button>
                  )}
                  {user?.user?.profile_image !== "" ? (
                    <img
                      src={user?.user?.profile_image}
                      alt="Profile"
                      className="h-[50px] w-[50px] rounded-full object-cover"
                    />
                  ) : (
                    <img src="/user.svg" className="h-[50px] w-[50px]" />
                  )}
                  <IoIosArrowDown className="text-xl" />
                </Box>
              </>
            ) : (
              <>
                <div className="flex items-center gap-4">
                  <CustomButton
                    className="bg-[#F28327] border text-white rounded-full px-7 py-3 transition-all duration-300 hover:opacity-80 text-lg font-bold font-HelveticaNeue"
                    onClick={() => navigate("/sign-up")}
                    label={"Sign Up"}
                  />
                  <CustomButton
                    onClick={() => navigate("/sign-in")}
                    label={"Log In"}
                    className="bg-transparent border border-dashboardPrimary text-dashboardPrimary rounded-full px-7 py-3 transition-all duration-300 hover:opacity-80 text-lg font-bold font-HelveticaNeue"
                  />
                </div>
              </>
            )}
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={handleSetting} className="flex gap-2">
                <IoSettingsOutline size={20} />
                Settings
              </MenuItem>
              <MenuItem
                onClick={() => navigate("/contact")}
                className="gap-2 flex"
              >
                <HiOutlineMail size={20} /> Contact
              </MenuItem>
              <MenuItem onClick={handleLogout} className="flex gap-2">
                <TbLogout2 size={20} /> Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </div>

      <DialogComp
        open={openDialog}
        close={() => setOpenDialog(false)}
        getGoalData={getGoalData}
      />
    </Box>
  );
};

export default AuthenticatedHeader;
