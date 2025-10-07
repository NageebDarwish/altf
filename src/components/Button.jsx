import React from "react";

const CustomButton = ({ label, className = "rounded-full bg-dashboardPrimary text-white px-4 py-2",onClick }) => {
  return (
    <button onClick={onClick} className={` ${className} transition-all duration-300 hover:opacity-80 text-lg font-bold font-HelveticaNeue`}>
      {label}
    </button>
  );
};

export default CustomButton;
