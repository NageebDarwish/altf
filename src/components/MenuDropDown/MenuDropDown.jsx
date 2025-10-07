import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CircularProgress from "@mui/material/CircularProgress";
import { request } from "../../services/axios";

const options = [
  { label: "Download Video", title: "video" },
  { label: "Add to my list", title: "list" },
  { label: "Mark as watched", title: "watched" },
];

const ITEM_HEIGHT = 40;

export default function MenuDropDown({ video }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loadingOption, setLoadingOption] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionClick = async (option) => {
    if (option.title === "list") {
      setLoadingOption(option.title); // Start loader for the specific option
      const data = {
        series_id: video?.id,
      };

      try {
        await request({
          url: "api/series/list",
          method: "post",
          data: data,
        });
      } catch (error) {
        console.error("Error fetching video data:", error);
      } finally {
        setLoadingOption(null); // Stop loader
        setAnchorEl(null); // Close menu
      }
    } else {
      setAnchorEl(null); // Close menu for other options
    }
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "20ch",
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.title}
            onClick={() => handleOptionClick(option)}
            disabled={loadingOption === option.title} // Disable while loading
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              {option.label}
              {loadingOption === option.title && (
                <CircularProgress
                  size={16}
                  style={{ marginLeft: 8 }} 
                />
              )}
            </div>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
