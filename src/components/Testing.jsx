import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Menu,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { MoreHoriz } from "@mui/icons-material";
import { FaDownload } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import YouTube from "react-youtube";

const YoutubeCard = ({
  videoUrl,
  title,
  description,
  buttonText,
  videoDuration,
  onPlay,
  Vediotitle,
  showDownloadIcon,
  handleAdd,
  onDownloadClick,
  menuItems,
  isDownloading,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [progress, setProgress] = useState(0);
  const [player, setPlayer] = useState(null); // To store player instance
  const [intervalId, setIntervalId] = useState(null); // To manage interval
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.admin.isAuthenticated);
  const storedVideoType = localStorage.getItem("videoType");

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // YouTube options
  const opts = {
    height: "300",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  // Start tracking progress
  const startProgressTracking = () => {
    if (player) {
      const id = setInterval(() => {
        const duration = player.getDuration();
        const currentTime = player.getCurrentTime();
        const percentage = (currentTime / duration) * 100;
        setProgress(percentage);
      }, 500); // Update every 500ms
      setIntervalId(id);
    }
  };

  // Stop tracking progress
  const stopProgressTracking = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const handleStateChange = (event) => {
    const state = event.data;
    if (state === 1) {
      startProgressTracking(); // Video playing
    } else if (state === 0 || state === 2) {
      stopProgressTracking(); // Video ended or paused
    }
  };

  useEffect(() => {
    return () => stopProgressTracking(); // Cleanup on unmount
  }, [intervalId]);

  return (
    <Card
      sx={{
        height: "500px",
        width: "500px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: 3,
        position: "relative",
        overflow: "hidden",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box sx={{ position: "relative", width: "100%", height: "100%", margin: "0 auto" }}>
        {/* YouTube Video */}
        <YouTube
          videoId="RVh647FkPtA"
          opts={opts}
          onReady={(event) => setPlayer(event.target)}
          onStateChange={handleStateChange}
        />
      </Box>

      {/* Progress Bar */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "4px",
          backgroundColor: "red",
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: `${progress}%`,
            backgroundColor: "#0294D3",
            transition: "width 0.2s linear",
          }}
        />
      </Box>

      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", paddingTop: "200px" }}>
          <Box>
            <Typography
              gutterBottom
              component="div"
              noWrap
              sx={{
                fontSize: "16px",
                fontWeight: "700",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                WebkitLineClamp: 2,
                textOverflow: "ellipsis",
                whiteSpace: "normal",
                marginBottom: "0px",
              }}
            >
              {Vediotitle}
            </Typography>
          </Box>

          <Box onClick={handleMenuClick}>
            <MoreHoriz style={{ color: "#0294D3", cursor: "pointer" }} />
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            {menuItems?.map((item, index) => (
              <MenuItem key={index} onClick={handleMenuClose}>
                <p onClick={handleAdd}>{item}</p>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            WebkitLineClamp: 3,
            textOverflow: "ellipsis",
            whiteSpace: "normal",
            marginTop: "4px",
          }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default YoutubeCard;
