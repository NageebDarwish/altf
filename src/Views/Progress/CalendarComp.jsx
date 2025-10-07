import React, { useState, useEffect } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isToday,
  isWeekend,
  addMonths,
  subMonths,
  getDay,
  parseISO,
} from "date-fns";

const CalenderComp = ({ allGoals }) => {
  console.log(allGoals, "ALL GOALSSSSSSSSSSSSSSSS")
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [goalData, setGoalData] = useState({}); // Map of dates and completed_minutes

  // Parse allGoals into a usable format
  useEffect(() => {
    const goalsMap = {};
    allGoals.forEach((goal) => {
      const goalDate = format(parseISO(goal.date), "yyyy-MM-dd"); // Format the date
      goalsMap[goalDate] = goal.completed_minutes;
    });
    setGoalData(goalsMap);
  }, [allGoals]);

  const startOfMonthDate = startOfMonth(currentDate);
  const endOfMonthDate = endOfMonth(currentDate);

  const daysInMonth = eachDayOfInterval({
    start: startOfMonthDate,
    end: endOfMonthDate,
  });

  const adjustSelectedDate = (newDate) => {
    if (selectedDate) {
      const dayOfWeek = getDay(selectedDate);

      let adjustedDate = new Date(newDate);
      adjustedDate.setDate(1);
      let daysInNewMonth = eachDayOfInterval({
        start: startOfMonth(adjustedDate),
        end: endOfMonth(adjustedDate),
      });

      let newSelectedDate = null;
      for (let i = 0; i < daysInNewMonth.length; i++) {
        if (getDay(daysInNewMonth[i]) === dayOfWeek) {
          newSelectedDate = daysInNewMonth[i];
          break;
        }
      }

      if (newSelectedDate) {
        return newSelectedDate;
      }
    }
    return newDate;
  };

  const handlePrevMonth = () => {
    const newDate = subMonths(currentDate, 1);
    setCurrentDate(newDate);
    setSelectedDate(adjustSelectedDate(newDate));
  };

  const handleNextMonth = () => {
    const newDate = addMonths(currentDate, 1);
    setCurrentDate(newDate);
    setSelectedDate(adjustSelectedDate(newDate));
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const startOfWeekDay = getDay(startOfMonthDate);
  return (
    <div className=" p-4 rounded-2xl mt-3 bg-white shadow-md">
      <header className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="text-xl text-gray-700">
          &lt;
        </button>
        <span className="font-bold text-lg">
          {format(currentDate, "MMMM - yyyy")}
        </span>
        <button onClick={handleNextMonth} className="text-xl text-gray-700">
          &gt;
        </button>
      </header>
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
          <div key={index} className="font-semibold text-gray-700">
            {day}
          </div>
        ))}

        {Array.from({ length: startOfWeekDay }).map((_, index) => (
          <div key={`empty-${index}`} className="h-10 w-10"></div>
        ))}

        {daysInMonth.map((day, index) => {
          const dayFormatted = format(day, "yyyy-MM-dd");
          const isHighlighted = goalData.hasOwnProperty(dayFormatted);
          const completedMinutes = goalData[dayFormatted];
          return (
            <div
              key={index}
              className={`h-10 w-10 flex items-center justify-center flex-col rounded-full cursor-pointer ${
                isToday(day)
                  ? "bg-dashboardPrimary text-white"
                  : isWeekend(day)
                  ? "text-gray-500"
                  : "text-gray-700"
              } ${isHighlighted ? "bg-dashboardPrimary text-white" : ""} ${
                selectedDate && selectedDate.getTime() === day.getTime()
                  ? "border-2 border-blue-500"
                  : ""
              }`}
              onClick={() => handleDateSelect(day)}
            >
              <div>{format(day, "d")}</div>
              {isHighlighted && (
                <div className="text-[10px] text-white">
                  {Math.floor(completedMinutes / 60)} m
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalenderComp;
