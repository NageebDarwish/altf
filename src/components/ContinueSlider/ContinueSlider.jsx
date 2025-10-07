import { useState } from "react";
import "./slider.css";
import { Slider } from "@mui/material";

const ContinueSlider = () => {
  const [value, setValue] = useState(50); // default value for the slider

  const handleSliderChange = (e) => {
    setValue(e.target.value);
  };

  return (
    // <div className="flex items-center justify-center ">
    //   <input
    //     type="range"
    //     min="0"
    //     max="100"
    //     value={value}
    //     onChange={handleSliderChange}
    //     className="slider w-64"
    //     style={{
    //       background: `linear-gradient(to right, #0284C7 ${value}%, #E5E7EB ${value}%)`,
    //     }}
    //   />
    // </div>
    <Slider
      defaultValue={30}
      aria-label="Disabled slider"
      disableSwap
      sx={{
        width: "160px",
        "& .MuiSlider-thumb": {
          height: "19px",
          width: "40px",
          borderRadius: "16px",
          backgroundColor: "#0284C7",
          "&:hover, &.Mui-focusVisible, &.Mui-active": {
            boxShadow: "none",
          },
        },
        " & .MuiSlider-track": {
          backgroundColor: "#D9D9D9",
          borderColor: "transparent",
          height: "3px",
        },
        "& .MuiSlider-rail": {
          backgroundColor: "#D9D9D9",
        },
      }}
    />
  );
};

export default ContinueSlider;
