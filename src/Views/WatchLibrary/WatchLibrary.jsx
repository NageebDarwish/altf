import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Typography, IconButton, CircularProgress } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import SeriesIcon from "@mui/icons-material/PlaylistPlay";
import HistoryIcon from "@mui/icons-material/History";
import { useSelector } from "react-redux";
import CustomVideoSlider from "../../components/CustomVideoSlider";
import { BsDownload } from "react-icons/bs";
import { request } from "../../services/axios";
import ToastComp from "../../components/toast/ToastComp";
import { MdOutlineVideoLibrary, MdSlowMotionVideo } from "react-icons/md";
import SuperBeginnerSeriess from "../WatchSeries/SuperBeginnerSeriess";
import { RxVideo } from "react-icons/rx";
import { PiTimerThin } from "react-icons/pi";
import CustomVideoSliderHistory from "../../components/CustomVideoSliderHistory";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { API_ENDPOINTS } from "../../config/api";
const WatchLibrary = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.admin.isAuthenticated);

  // Use infinite scroll hooks for different data types
  const {
    data: list,
    loading: videosLoading,
    error: videosError,
  } = useInfiniteScroll(API_ENDPOINTS.videos.getUserList, {
    perPage: 15,
  });

  const {
    data: series,
    loading: seriesLoading,
    error: seriesError,
  } = useInfiniteScroll(API_ENDPOINTS.series.list, {
    perPage: 15,
  });

  const {
    data: HistoryVideo,
    loading: historyLoading,
    error: historyError,
  } = useInfiniteScroll(API_ENDPOINTS.videos.getUserHistory, {
    perPage: 15,
  });

  const loading = videosLoading || seriesLoading || historyLoading;
  console.log(HistoryVideo, 'HistoryVideo')

  const items = [
    {
      name: "My Download List",
      path: "/vedio-list",
      icon: <LogoutIcon fontSize="small" />,
    },
    {
      name: "My Video List",
      path: "/vedio-list",
      icon: <VideoLibraryIcon fontSize="small" />,
    },
    {
      name: "My Series Videos",
      path: "/series-list",
      icon: <SeriesIcon fontSize="small" />,
    },
    {
      name: "History of Video",
      path: "/watch-history",
      icon: <HistoryIcon fontSize="small" />,
    },
  ];


  const handleNavigation = (path) => {
    if (isAuthenticated) {
      navigate(path);
    } else {
      navigate("/Nodownload");
    }
  };



  // Handle errors from infinite scroll hooks
  useEffect(() => {
    if (videosError || seriesError || historyError) {
      ToastComp({
        variant: "error",
        message: "Please log in to see this data",
      });
    }
  }, [videosError, seriesError, historyError]);
  
  console.log(list, 'listlistlist12345')

  return (
    <Box>
      {/* Navigation List */}
      {/* {items.map((item) => (
        <Box
          key={item.name}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={2}
          sx={{
            fontWeight: "700",
            borderBottom: "1px solid #ddd",
            "&:last-child": { borderBottom: "none" },
          }}
        >
          <Typography
            variant="body1"
            sx={{ fontWeight: "600", display: "flex", alignItems: "center" }}
          >
            <span style={{ fontSize: "16px", marginRight: "8px", color: "#0294D3" }}>
              {item.icon}
            </span>
            {item.name}
          </Typography>
          <IconButton onClick={() => handleNavigation(item.path)}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      ))} */}

      {/* Video Slider */}
      <Box>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="300px">
            <CircularProgress color="secondary" />
          </Box>
        ) : (
          <>
            <div className="mt-10 md:mt-0 mb-20 md:mb-0 ">
              {/* <CustomVideoSlider title="Downloads" icon={<BsDownload />} data={list} /> */}
              <CustomVideoSlider title="Downloads" icon={<BsDownload />} data={""} />
              <CustomVideoSlider
                title="Favorite videos"
                icon={<MdOutlineVideoLibrary />}
                data={[
                  ...(list?.videos || []),
                  ...(list?.series_videos || [])
                ]}
              />
              <SuperBeginnerSeriess title="Favorite series" icon={<MdSlowMotionVideo />} images={series} />
              <CustomVideoSliderHistory title="Watch history" icon={<PiTimerThin />}  data={[
                  ...(HistoryVideo?.videos || []),
                  ...(HistoryVideo?.series_videos || [])
                ]} />
            </div>
          </>
        )}
      </Box>

    </Box>
  );
};

export default WatchLibrary;
