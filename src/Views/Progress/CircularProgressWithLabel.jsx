import React from "react";

const CircularProgressWithLabel = ({
  size = 150,
  strokeWidth = 8,
  primaryColor = "#0294D3",
  secondaryColor = "#CCCCCC",
  goal,
  goalDetails,
}) => {
  if (!goal?.target_minutes) {
    return (
      <div
        style={{
          textAlign: "center",
          fontSize: "16px",
          color: primaryColor,
          fontWeight: "bold",
        }}
      >
        Please select your daily goal
      </div>
    );
  }

  // Convert watched_minutes from seconds to minutes and calculate progress
  const watchedMinutes = (goalDetails?.completed_minutes || 0) / 60;
  const progress = Math.min((watchedMinutes / goal.target_minutes) * 100, 100);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        width: size,
        height: size,
      }}
    >
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={secondaryColor}
          strokeWidth={strokeWidth}
          fill="none"
        />

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={primaryColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />
      </svg>

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "16px",
          color: primaryColor,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {Math.round(watchedMinutes)} / {goal.target_minutes} minutes
      </div>
    </div>
  );
};

export default CircularProgressWithLabel;
