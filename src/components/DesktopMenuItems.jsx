import { Box, Typography, LinearProgress } from "@mui/material";
import { MdOutlineModeEdit } from "react-icons/md";
import PropTypes from "prop-types";

const DesktopMenuItems = ({ 
  menuItems, 
  staticData, 
  progresscompletemin, 
  setOpenDialog 
}) => {
  return (
    <Box className="flex-wrap flex-1 md:justify-start justify-between md:gap-8 gap-2 flex">
      {menuItems.map((item, index) => (
        <Box
          key={index}
          display="flex"
          alignItems="center"
          sx={{ gap: 1 }}
        >
          {staticData[item]?.icon && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="w-6 h-6 lg:h-10 lg:w-10"
            >
              {staticData[item].icon}
            </Box>
          )}
          {item === "Min Circle" && (
            <Box className="font-pally flex-col flex justify-start items-start p-1 pr-2 md:border-0 relative after:content-[''] after:absolute after:md:hidden after:right-0 after:top-1/2 after:transform after:-translate-y-1/2 after:h-[30px] after:w-[1px] after:bg-[#E2DFDA]">
              <Typography
                variant="body2"
                className="font-pally gap-4 font-bold mt-1 md:text-lg text-md text-[#0c3373] whitespace-nowrap overflow-hidden text-ellipsis flex items-center "
              >
                {progresscompletemin?.completed_minutes
                  ? Math.floor(progresscompletemin.completed_minutes / 60)
                  : 0}
                / {progresscompletemin?.target_minutes || 0} min
                <h1 className="" onClick={() => setOpenDialog(true)}>
                  <MdOutlineModeEdit className="text-btnbackground cursor-pointer" />
                </h1>
              </Typography>

              <Box sx={{ mt: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={
                    progresscompletemin?.target_minutes > 0
                      ? Math.min(
                          100,
                          (progresscompletemin?.completed_minutes /
                            60 /
                            progresscompletemin?.target_minutes) *
                            100
                        )
                      : 0
                  }
                  className="h-2 rounded-lg w-20 md:w-44 bg-[#ddd]"
                  sx={{
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#F28327",
                    },
                  }}
                />
              </Box>
            </Box>
          )}

          {Object.keys(staticData[item])
            .filter((key) => key !== "icon")
            .map((key) => (
              <Typography
                key={key}
                variant="body2"
                sx={{
                  fontWeight: "bold",
                  color: "#0C3373",
                  fontSize: "24px",
                }}
                className="font-pally"
              >
                {staticData[item][key]}
              </Typography>
            ))}
        </Box>
      ))}
    </Box>
  );
};

DesktopMenuItems.propTypes = {
  menuItems: PropTypes.array.isRequired,
  staticData: PropTypes.object.isRequired,
  progresscompletemin: PropTypes.object,
  setOpenDialog: PropTypes.func.isRequired,
};

export default DesktopMenuItems;
