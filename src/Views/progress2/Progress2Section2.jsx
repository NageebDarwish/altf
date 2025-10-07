import { Box, LinearProgress, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import React from "react";
import { MdOutlineModeEdit } from "react-icons/md";

const Progress2Section2 = ({ setOpenDialog, goalData, datatime }) => {
  console.log(goalData, "goalData");
  const getWeeklyData = () => {
    if (!datatime?.weekly_breakdown) return [];

    const daysOrder = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    return daysOrder.map((day) => {
      const dayData = datatime.weekly_breakdown[day] || { total_watch_time: 0 };
      const minutes = Math.floor(dayData.total_watch_time / 60);
      return {
        day: day.charAt(0),
        time: minutes,
      };
    });
  };

  const getMonthlyData = () => {
    if (!datatime?.monthly_breakdown) return [];

    const monthsOrder = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return monthsOrder.map((month) => {
      const monthData = datatime.monthly_breakdown[month] || {
        total_watch_time: 0,
      };
      const totalSeconds = monthData.total_watch_time || 0;
      const totalMinutes = Math.floor(totalSeconds / 60);
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      let label = "";
      if (hours >= 1) {
        label = `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
      } else {
        label = `${minutes}m`;
      }

      return {
        month: month.substring(0, 3),
        time: totalMinutes, // Used for bar height
        label: label, // Used for tooltip
      };
    });
  };

  const weeklyData = getWeeklyData();
  const monthlyData = getMonthlyData();

  return (
    <div className="w-full flex flex-col xl:flex-row items-stretch gap-6">
      {/* Left Card */}
      <div className="w-full xl:w-[470px] mt-4 rounded-[13px]  flex flex-col justify-between">
        <div className="bg-white px-3 py-6 rounded-[13px]">
          <div className="flex items-center justify-between gap-2">
            <div className="flex gap-1">
              <img
                src="/daily-minute-goal 1.png"
                alt="Daily Goal Icon"
                className="object-contain"
              />
              <p className="text-heading text-[32px] font-pally font-bold">
                Daily Goal
              </p>
            </div>
            <div>
              <button
                onClick={() => setOpenDialog(true)}
                className="flex px-4 py-1 font-HelveticaNeue text-[17px] bg-btnbackground text-white rounded-md"
              >
                <MdOutlineModeEdit className="mt-1" /> Edit
              </button>
            </div>
          </div>

          <Typography
            className="font-pally"
            variant="body2"
            sx={{
              fontWeight: "bold",
              mt: 0.5,
              fontSize: "21px",
              color: "#0C3373",
            }}
          >
            {goalData?.completed_minutes
              ? Math.floor(goalData.completed_minutes / 60)
              : 0}{" "}
            / {goalData?.target_minutes || 0} min
          </Typography>

          <Box sx={{ mt: 1 }}>
            <LinearProgress
              variant="determinate"
              value={
                goalData?.target_minutes > 0
                  ? Math.min(
                      100,
                      (goalData?.completed_minutes /
                        60 /
                        goalData?.target_minutes) *
                        100
                    )
                  : 0
              }
              sx={{
                height: 9,
                borderRadius: 3,
                width: 250,
                backgroundColor: "#ddd",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#F28327",
                },
              }}
            />
          </Box>
        </div>
        <div className="bg-white p-6 rounded-[13px] mt-4">
          <div className="flex items-center gap-2">
            <img src="/Clip path group.png" alt="Daily Goal Icon" />
            <p className="text-[#1CC932] font-pally text-[32px] font-bold">
              {datatime?.total_watched_video_count || 0}
            </p>
          </div>

          <p className="text-[#0C3373] font-pally text-[32px] font-bold">
            Videos Watched
          </p>
        </div>
      </div>

      {/* Right Card */}
      <div className="w-full mt-4 rounded-[13px]  flex font-HelveticaNeue flex-col md:flex-row gap-6">
        {/* Weekly Chart */}
        <div className="border rounded-[13px] w-full  p-4 bg-white">
          <p className="text-center text-[32px] font-bold text-[#0C3373]">
            {(() => {
              const totalSeconds = datatime?.weekly_total || 0;
              const totalMinutes = Math.floor(totalSeconds / 60);
              const hours = Math.floor(totalMinutes / 60);
              const minutes = totalMinutes % 60;
              return `${hours}h ${minutes}m`;
            })()}
          </p>
          <p className="text-center text-[15px] text-gray-500">
            Total input time this week
          </p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={weeklyData}>
              <XAxis dataKey="day" />
              <YAxis hide />
              <Tooltip
                formatter={(value) => [`${value} minutes`, "Watch Time"]}
              />
              <Bar dataKey="time" fill="#FECB00" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Chart */}
        <div className="border rounded-[13px] w-full p-4 bg-white">
          <p className="text-center text-[32px] font-bold text-[#0C3373]">
            {(() => {
              const totalSeconds = datatime?.monthly_total || 0;
              const totalMinutes = Math.floor(totalSeconds / 60);
              const hours = Math.floor(totalMinutes / 60);
              const minutes = totalMinutes % 60;
              return `${hours}h ${minutes}m`;
            })()}
          </p>
          <p className="text-center text-[15px] text-gray-500">
            Total input time this month
          </p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={monthlyData}>
              <XAxis dataKey="month" />
              <YAxis hide />
              <Tooltip
                formatter={(value, name, props) => {
                  return [props.payload.label, "Watch Time"];
                }}
              />

              <Bar dataKey="time" fill="#002B6B" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Progress2Section2;
