import { Switch } from "@mui/material";
import { useState } from "react";

const CustomSwitch = () => {
  const [checked, setChecked] = useState(false);
  const handleChange = async (event) => {
    setChecked(event.target.checked);
    // if (event.target.checked) {
    //   set_loading(true);
    //   try {
    //     const res = await request({
    //       method: "get",
    //       url: "api/video/hide?type=video",
    //     });
    //     setVideoData(res?.data?.payload?.all_videos);
    //   } catch (error) {
    //     console.error("Error:", error);
    //   } finally {
    //     set_loading(false);
    //   }
    // } else {
    //   fetchVideos();
    // }
  };
  return (
    <>
    <Switch
            checked={checked}
            onChange={handleChange}
            sx={{
              transform: "scale(1.5)",
              "& .MuiSwitch-switchBase.Mui-checked": {
                color: "white",
              },
              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                backgroundColor: "green",
              },
              "& .MuiSwitch-track": {
                backgroundColor: "#ccc",
              },
            }}
          />
    </>
  )
};

export default CustomSwitch;
