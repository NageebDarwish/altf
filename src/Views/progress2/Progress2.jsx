import React, { useEffect } from "react";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Levels, { levelsData } from "./Levels";
import Progress2Section2 from "./Progress2Section2";
import BatchProgress2 from "./BatchProgress2";
import { request } from "../../services/axios";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import CalenderComp from "../Progress/CalendarComp";
import DialogComp from "../Progress/DialogComp";
import BadgesPopup from "./BadgesPopup";
import EditOutsideHoursModal from "../../components/EditOutsideHoursModal";

const Progress2 = () => {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [userDetails, setUserDetails] = useState("");
  console.log(userDetails, "userDetails");
  const [latestBadge, setLatestBadge] = useState(null);
  const [goalDetails, setGoalDetails] = useState("");
  const [levelSetails, setLEvelDetails] = useState([]);
  const [streaks, setStreaks] = useState([]);
  const [allGoals, setAllGoals] = useState([]);
  const [outsideData, setOutsideData] = useState();
  const [watchedVideos, setWatchedVideos] = useState("");
  const user = useSelector((state) => state.user);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [goalData, setGoalData] = useState("");
  const goal = useSelector((state) => state.goal);
  const totaltime = useSelector((state) => state.user);
  const levels = useSelector((state) => state.user.user);
  const tokken = useSelector((state) => state.user.token);
  const [datatime, setdatatime] = useState();
  const [showBadgePopup, setShowBadgePopup] = useState(false);
  const [latestBadgeModal, setLatestBadgeModal] = useState(null);
  const [badgeModals, setBadgeModals] = useState([]);
  const userBadges = userDetails?.badges || [];
  const [outsideHours, setOutsideHours] = useState("0");
  const [tempOutsideHours, setTempOutsideHours] = useState("0");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const userId = user?.user?.id;
  const storageKey = userId ? `outsideAATTHours_${userId}` : "outsideAATTHours";

  useEffect(() => {
    if (userId) {
      const savedHours = localStorage.getItem(storageKey) || "0";
      setOutsideHours(savedHours);
      setTempOutsideHours(savedHours);
    }
  }, [userId, storageKey]);

  // In Progress2.jsx
  // In Progress2.jsx
  useEffect(() => {
    if (userDetails?.badges || userDetails?.badge_modals) {
      // First check for badges with null badge_modal (never shown before)
      const neverShownBadges =
        userDetails.badges?.filter(
          (badge) =>
            !userDetails.badge_modals?.some(
              (modal) => modal.badge_id === badge.id.toString()
            )
        ) || [];

      // Then check for unopened badges in badge_modals
      const unopenedModalBadges = (userDetails.badge_modals || [])
        .filter((modal) => modal.opened === "0")
        .map((modal) => {
          const badge = userDetails.badges?.find(
            (b) => b.id.toString() === modal.badge_id
          );
          return badge ? { ...badge, modalId: modal.id } : null;
        })
        .filter(Boolean);

      // Combine both sources
      const allUnopenedBadges = [...neverShownBadges, ...unopenedModalBadges];

      // Show the first unopened badge if any exist
      if (allUnopenedBadges.length > 0) {
        setLatestBadge(allUnopenedBadges[0]);
        setShowBadgePopup(true);
      }
    }
  }, [userDetails]);
  const handleBadgePopupClose = async () => {
    if (latestBadge) {
      try {
        if (latestBadge.id) {
          await request({
            url: `api/badge/modal/${latestBadge.id}`,
            method: "get",
          });
        }

        // Update local state
        setUserDetails((prev) => {
          const updatedModals = (prev.badge_modals || []).map((m) =>
            m.badge_id === latestBadge.id.toString() ? { ...m, opened: "1" } : m
          );

          // If modal didn't exist, add it
          if (
            !updatedModals.some((m) => m.badge_id === latestBadge.id.toString())
          ) {
            updatedModals.push({
              badge_id: latestBadge.id.toString(),
              opened: "1",
              user_id: userDetails.id,
            });
          }

          return {
            ...prev,
            badge_modals: updatedModals,
          };
        });
      } catch (error) {
        console.error("Error updating badge status:", error);
      }
    }
    setShowBadgePopup(false);
  };

  // const handleBadgePopupClose = () => {
  //   if (latestBadgeModal) {
  //     markBadgeModalAsOpened(latestBadgeModal.id);
  //   }
  //   setShowBadgePopup(false);
  // };

  const totalStreakMinutes = allGoals.reduce(
    (acc, goal) => acc + Number(goal.completed_minutes || 0),
    0
  );
  const totalStreakHours = Math.floor(totalStreakMinutes / 3600);

  const data = [
    {
      num: Math.floor(streaks.length / 7),
      title: "Weeks In a Row",
    },
    {
      num: Math.floor(
        parseInt(totaltime?.user?.total_watching_hours || 0) / 3600
      ),
      title: "Total hours watched on AATT",
    },
    {
      num: outsideHours,
      title: "Total hours watched outside AATT",
      editable: true,
    },
    {
      num: totalStreakHours,
      title: "Total hours during streak",
    },
  ];

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
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData("api/user/detail", setUserDetails);
    fetchData("api/goal", setGoalDetails);
    fetchData("api/progress/level/list", setLEvelDetails);
    fetchData("api/all/streaks", setStreaks);
    fetchData("api/all/goals", setAllGoals);
    fetchData("api/watched/video/count", setWatchedVideos);
    fetchData("api/outside/platform/all", setOutsideData);
  }, []);

  const getGoalData = async () => {
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
      setGoalData(res?.data?.payload);
    } catch (error) {
      console.error(
        "Error saving goal:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    getGoalData();
  }, []);

  const fetchDashboardStatics = async () => {
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
  };

  useEffect(() => {
    fetchDashboardStatics();
  }, []);

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
    (userDetails?.total_watching_hours || 0) / 3600
  );

  const determineLevelInfo = (hours) => {
    for (const [level, range] of Object.entries(levelRanges)) {
      if (hours >= range.start && hours < range.end) {
        const remaining = Math.ceil(range.end - hours);
        return {
          level: `Level ${level}`,
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
      remainingHours: 20,
      progressPercent: 0,
      rangeStart: 0,
      rangeEnd: 20,
    };
  };

  const { level, remainingHours, progressPercent, rangeStart, rangeEnd } =
    determineLevelInfo(watchedHours);

  console.log('Progress Debug:', {
    watchedHours,
    level,
    progressPercent,
    rangeStart,
    rangeEnd
  });

  // Get current level data from levelsData
  const getCurrentLevelData = (levelName) => {
    return levelsData.find(levelData => levelData.title === levelName) || levelsData[0];
  };

  const currentLevelData = getCurrentLevelData(level);

  // Level colors mapping
  const levelColors = {
    "Level 1": "#53D0EF",
    "Level 2": "#08BBE8", 
    "Level 3": "#47F15D",
    "Level 4": "#1CC932",
    "Level 5": "#F9DA38",
    "Level 6": "#F2CC08",
    "Level 7": "#F29142",
    "Level 8": "#FF7300",
    "Level 9": "#3B73CC",
    "Level 10": "#0C3373"
  };

  const currentLevelColor = levelColors[level] || "#0C3373";

  return (
    <>
      {editModalOpen && (
        <EditOutsideHoursModal
          tempOutsideHours={tempOutsideHours}
          setTempOutsideHours={setTempOutsideHours}
          setOutsideHours={setOutsideHours}
          setEditModalOpen={setEditModalOpen}
          userId={userId}
        />
      )}
      {showBadgePopup && latestBadge && (
        <BadgesPopup badge={latestBadge} onClose={handleBadgePopupClose} />
      )}
      <div className="w-full flex flex-col xl:flex-row justify-between gap-4 items-center md:mt-7 mb-10 px-3 md:mb-0">
        {/* Left Card */}
        <div className="w-full xl:w-[450px] bg-white rounded-[13px] flex flex-col justify-center px-8 py-12 shadow-lg">
          <div className="relative mx-auto w-48 h-32">
            <div className="absolute inset-0 flex items-center justify-center">
               {Array.from({ length: 10 }, (_, index) => {
                 const segmentAngle = 19.5;
                 const gapAngle = 4;
                  let startAngle;
                  if (index === 0) {
                    startAngle = -195; 
                  } else if (index === 9) {
                    startAngle = 15; 
                  } else {
                    startAngle = -195 + (index * (segmentAngle + gapAngle));
                  }
                 const radius = 90; 
                 // Ensure at least one segment is active (for beginners with 0% progress)
                 const segmentsToShow = Math.max(1, Math.ceil((progressPercent / 100) * 10));
                 const isActive = (index + 1) <= segmentsToShow;
                const angleInRadians = (startAngle * Math.PI) / 180;
                const x = Math.cos(angleInRadians) * radius;
                const y = Math.sin(angleInRadians) * radius;
                
                return (
                  <div
                    key={index}
                    className="absolute w-[18px] h-[55px] bg-gray-300 rounded-lg"
                    style={{
                      left: `calc(50% + ${x}px - 8px)`,
                      top: `calc(50% + ${y}px - 17.5px)`,
                      transform: `rotate(${index === 0 ? -85 : index === 9 ? 85 : index == 1 ? startAngle + 100: index == 8 ? startAngle - 100 : startAngle + 90}deg)`,
                      backgroundColor: isActive ? currentLevelColor : '#e5e7eb',
                      transition: 'background-color 0.3s ease-in-out'
                    }}
                  />
                );
              })}
            </div>
            
            {/* Level Image in center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <img
                  src={currentLevelData.image}
                  alt={`${currentLevelData.title} Icon`}
                  className="w-20 h-20 object-contain"
                />
              </div>
            </div>
          </div>
          
          <p className="text-xl font-HelveticaNeue text-center">
            Your current level is
          </p>
          <p 
            className="text-center font-pally font-bold text-[32px]"
            style={{ color: currentLevelColor }}
          >
            {currentLevelData.title === "Level 10" ? "Advanced" : 
             currentLevelData.title === "Level 1" ? "Beginner" :
             currentLevelData.title === "Level 2" ? "Novice" :
             currentLevelData.title === "Level 3" ? "Elementary" :
             currentLevelData.title === "Level 4" ? "Pre-Intermediate" :
             currentLevelData.title === "Level 5" ? "Intermediate" :
             currentLevelData.title === "Level 6" ? "Upper-Intermediate" :
             currentLevelData.title === "Level 7" ? "Advanced" :
             currentLevelData.title === "Level 8" ? "Proficient" :
             currentLevelData.title === "Level 9" ? "Expert" : "Beginner"}
          </p>

          <div className="flex justify-between font-HelveticaNeue mt-3">
            <p className="text-[16px] font-bold">Current Progress:</p>
            <p className="text-[16px] font-bold text-dashboardPrimary">
              {watchedHours} <span className="text-black">hrs</span>
            </p>
          </div>

          <div className="flex justify-between font-HelveticaNeue">
            <p className="text-[16px] font-bold">Next Level Target:</p>
            <p className="text-[16px] font-bold text-dashboardPrimary">
              {remainingHours || "N/L"} <span className="text-black">hrs</span>
            </p>
          </div>

          <div className="w-full bg-gray-300 rounded-full h-8 mt-4 overflow-hidden">
            <div
              className="bg-dashboardPrimary h-8 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between font-HelveticaNeue">
            <p className="text-[16px] text-[#828282] mt-2">
              {rangeStart}hrs
            </p>
            <p className="text-[16px] text-[#828282] mt-2">
              {rangeEnd === "∞" ? "∞" : `${rangeEnd}hrs`}
            </p>
          </div>
          
        </div>

        <div className="w-full  bg-white rounded-[13px] shadow-lg p-5 flex flex-col xl:flex-row gap-6">
          <div className="w-full xl:w-[50%]">
            <div className="flex gap-3 items-center justify-center">
              <img src="/flame-icon 1svg 1.png" alt="" />
              <p className="text-[32px] font-bold font-pally text-heading">
                <span className="text-dashboardPrimary">
                  {" "}
                  {streaks?.length}{" "}
                </span>{" "}
                Days in a row
              </p>
            </div>
            <div className="flex flex-col gap-10 py-5">
              {data.map((val, ind) => (
                <div
                  key={ind}
                  className={`flex items-center justify-between shadow-md p-2 rounded-2xl ${
                    val.editable ? "cursor-pointer hover:bg-gray-100" : ""
                  }`}
                  onClick={() => {
                    if (val.editable) {
                      setTempOutsideHours(outsideHours);
                      setEditModalOpen(true);
                    }
                  }}
                >
                  <div className="flex items-center gap-12">
                    <p className="text-dashboardPrimary font-pally text-[14px] font-bold">
                      {val.num}
                    </p>
                    <p className="text-[14px] font-HelveticaNeue text-black font-bold">
                      {val.title}
                    </p>
                  </div>
                  {val.editable && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-gray-500 hover:text-dashboardPrimary"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="w-full xl:w-[50%] flex flex-col items-center">
            {/* <p className="text-lg rounded-[24px] font-HelveticaNeue text-center text-white bg-heading p-3">
                Congratulations! You’ve earned your longest streak ever! 🎉
              </p> */}

            {/* Calendar Component */}
            {/* <div className='mt-5'>
                              <Calendar
                                  onChange={setSelectedDate}
                                  value={selectedDate}
                                  tileClassName={({ date, view }) =>
                                      view === "month" && date.toDateString() === selectedDate.toDateString()
                                          ? "selected-date"
                                          : ""
                                  }
                              />
                          </div> */}
            <div>
              <CalenderComp allGoals={allGoals} />
            </div>
          </div>
        </div>
      </div>
      <div className="px-3 mb-20 md:mb-4">
        <Progress2Section2
          datatime={datatime}
          goalData={goalData}
          setOpenDialog={setOpenDialog}
        />
        <div className="py-3 rounded-md">
          <BatchProgress2 userDetails={userDetails} />
        </div>
        <div className="">
          <div className="bg-white p-4 rounded-md">
            <h1 className="text-[25px] text-[#0c3373] md:text-[32px] py-4 font-bold font-pally md:text-largeLight">
              Levels
            </h1>
            <Levels />
          </div>
        </div>
        <DialogComp
          open={openDialog}
          close={() => setOpenDialog(false)}
          getGoalData={getGoalData}
        />
      </div>
    </>
  );
};

export default Progress2;
