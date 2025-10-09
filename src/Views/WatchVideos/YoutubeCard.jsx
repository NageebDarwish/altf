import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  Button,
  Menu,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import YT_THMBNAIL from "../../components/VideoCard/Thumbnail";
import { request } from "../../services/axios";
import { FaLock } from "react-icons/fa";
import { PiListHeart } from "react-icons/pi";
import { useSnackbar } from "notistack";
import { MdOutlineFileDownload, MdOutlineRemoveRedEye } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { BsDownload } from "react-icons/bs";

const YoutubeCard = ({
  newvideo,
  video,
  videoUrl,
  title,
  showDownloadIcon,
  isDownloading,
  type,
  isPremium,
}) => {
  const user = useSelector((state) => state.user.user);
  const userId = user?.id;
  const userTimeline = video?.timelines?.find(
    (timeline) => timeline.user_id === String(userId)
  );
  const totalSeconds = parseFloat(video?.duration_seconds);
  const watchedSeconds = parseFloat(userTimeline?.progress_time || 0);
  const userVideoTimelines = useSelector(
    (state) => state.user.user?.video_timelines || []
  );
  const userVideoTimeline = userVideoTimelines?.find(
    (timeline) => timeline.video_id === video?.id
  );
  const dispatch = useDispatch();
  // const totalSeconds = parseFloat(userVideoTimeline?.video?.duration_seconds);
  // const watchedSeconds = parseFloat(userVideoTimeline?.watched_time || 0);
  // const totalSeconds = parseFloat(video?.duration_seconds);
  // const watchedSeconds = parseFloat(video?.timelines?.progress_time || 0);
  const played = totalSeconds > 0 ? watchedSeconds / totalSeconds : 0;
  const navigate = useNavigate();
  const [progress, setprogress] = useState();
  const [showPremiumMessage, setShowPremiumMessage] = useState(false);
  const isAuthenticated = useSelector((state) => state.admin.isAuthenticated);
  const storedVideoType = localStorage.getItem("videoType");
  const ITEM_HEIGHT = 40;

  const userVideoLists = useSelector(
    (state) => state.user.user?.video_lists || []
  );

  // Check if current video is in favorites using the latest state
  const isFavorite = userVideoLists.some(
    (item) => item.video_id === String(video?.id)
  );
  const isVideoAlreadyMarkedAsWatched = (videoId) => {
    const storageKey = "markedWatchedVideos";
    const alreadyWatched = JSON.parse(localStorage.getItem(storageKey)) || [];
    return alreadyWatched.includes(String(videoId));
  };

  const isVideoFullyWatched = (video) => {
    const userTimeline = video?.timelines?.find(
      (timeline) => timeline.user_id === String(userId)
    );

    if (!userTimeline || !video.duration_seconds) return false;

    const progressTime = parseFloat(userTimeline.progress_time) || 0;
    const duration = parseFloat(video.duration_seconds) || 1;
    const progressPercentage = (progressTime / duration) * 100;

    return progressPercentage >= 98;
  };
  const options = [
    {
      icon: <BsDownload className="text-orange-500 text-xl" />,
      label: "Download",
      title: "video",
    },
    {
      icon: <MdOutlineRemoveRedEye className="text-orange-500 text-xl" />,
      label: "Mark as Watched",
      title: "watched",
    },
    {
      icon: <PiListHeart className="text-orange-500 text-lg" />,
      label: isFavorite ? "Remove from Favourites" : "Add to Favourites",
      title: "list",
    },
  ];

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loadingOption, setLoadingOption] = React.useState(null);
  const open = Boolean(anchorEl);

  const markVideoAsWatched = async (videoId, isCompleted) => {
    const type = isCompleted ? "add" : "remove";

    try {
      const response = await request({
        url: "api/watched/video/store",
        method: "get",
        params: {
          video_id: videoId,
          type: type,
        },
      });
      console.log(
        `Video ${type === "add" ? "added to" : "removed from"} watched list:`,
        response.data
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error ${
          type === "add" ? "adding" : "removing"
        } video from watched list:`,
        error
      );
      throw error;
    }
  };
  const { enqueueSnackbar } = useSnackbar();
  const handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    // console.log('Video lists updated:', userVideoLists);
  }, [userVideoLists]);

  const handleOptionClick = async (option, video, event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log(option, video, "videovideooptionoption");
    if (option.title === "list") {
      setLoadingOption(option.title);
      const data = {
        video_id: video.id,
      };
      try {
        const response = await request({
          url: isFavorite ? "api/remove/video/list" : "api/video/list",
          method: "post",
          data: data,
        });

        if (isFavorite) {
          dispatch({
            type: "REMOVE_FROM_FAVORITES",
            payload: String(video.id),
          });
        } else {
          dispatch({
            type: "ADD_TO_FAVORITES",
            payload: { video_id: String(video.id) },
          });
        }

        enqueueSnackbar(
          isFavorite ? "Removed from favorites" : "Added to favorites",
          { variant: "success" }
        );
      } catch (error) {
        console.error("Error updating favorites:", error);
        enqueueSnackbar("Sign up to add to Favorites", { variant: "error" });
      } finally {
        setLoadingOption(null);
        setAnchorEl(null);
      }
    } else if (option.title === "watched") {
      setLoadingOption(option.title);
      try {
        const response = await request({
          url: `api/video/watched/${video.id}`,
          method: "get",
        });
        console.log(response, "response121212");
        setprogress(response?.data?.payload?.progress_time);
        const isCompleted = response?.data?.payload?.is_completed;
        await markVideoAsWatched(video.id, isCompleted);
      } catch (error) {
        console.error("Error updating marked watch:", error);
        enqueueSnackbar("Failed to update marked watch", { variant: "error" });
      } finally {
        setLoadingOption(null);
        setAnchorEl(null);
      }
    } else {
      setAnchorEl(null);
    }
  };

  const handlePremiumClick = () => {
    if (isPremium) {
      setShowPremiumMessage(true);
    }
  };
  const handlenavigatepremium = () => {
    navigate("/pricing-page");
  };
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        // boxShadow: 3,
        position: "relative",
        overflow: "hidden",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        borderRadius: { xs: "10px", md: "11px" },
        height: "100%",
      }}
      onClick={isPremium ? handlePremiumClick : undefined}
    >
      {(user === null || user?.is_premium === "0") &&
        video.plan === "premium" && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 2,
              display: "flex",
              flex: 1,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "20px",
              fontWeight: "bold",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            {!showPremiumMessage ? (
              <FaLock className="text-3xl" />
            ) : (
              <div className="flex gap-2 bg-btnbackground p-2 rounded-lg">
                <FaLock />
                <Typography
                  onClick={handlenavigatepremium}
                  className="font-semibold"
                >
                  Go Premium to Watch
                </Typography>
              </div>
            )}
          </Box>
        )}

      <YT_THMBNAIL
        videoUrl={videoUrl}
        title={title}
        played={
          progress && totalSeconds > 0
            ? parseFloat(progress) / totalSeconds
            : played
        }
        video={video}
        type={type}
        newvideo={newvideo}
      />
      <Box sx={{ p: 1 }} className="flex flex-col justify-between md:py-6 ">
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            className="font-HelveticaNeue text-[10px] md:text-description text-heading"
            sx={{
              fontWeight: "bold",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "90%",
            }}
            title={video?.title}
          >
            {video?.title}
          </Typography>

          <div className="flex gap-1 items-center">
            {storedVideoType === "1" ? (
              showDownloadIcon && (
                <Box>
                  {isDownloading ? (
                    <CircularProgress size={24} color="secondary" />
                  ) : (
                    <MdOutlineFileDownload
                      color="black"
                      size={20}
                      // onClick={() => {
                      //   if (isAuthenticated) {
                      //     onDownloadClick();
                      //   } else {
                      //     navigate("/Nodownload");
                      //   }
                      // }}
                      style={{ cursor: "pointer", marginLeft: "5px" }}
                    />
                  )}
                </Box>
              )
            ) : (
              <Box>
                <MdOutlineFileDownload
                  color="#ccc"
                  size={25}
                  style={{ cursor: "not-allowed" }}
                />
              </Box>
            )}
            <Box onClick={handleClick}>
              <HiDotsVertical style={{ color: "black", cursor: "pointer" }} />
            </Box>
          </div>
        </Box>
        {/* <Typography sx={{ fontSize: "13px", mt: 1, color: "#808080" }}>
            {video?.description}
          </Typography> */}
        <Box
          sx={{
            mt: { xs: 1, md: 2 },
            padding: { md: "6px" },
            display: "flex",
            flexDirection: { sm: "row", md: "row" },
            gap: "5px",
            justifyContent: "flex-start",
            alignItems: "center",
            height: "100%",
          }}
        >
          {video?.level?.name && (
            <Button
              sx={{
                textTransform: "none",
                backgroundColor:
                  video.level.name === "Super Beginner"
                    ? "#08BBE8"
                    : video.level.name === "Beginner"
                    ? "#1CC932"
                    : video.level.name === "Advanced"
                    ? "#0C3373"
                    : video.level.name === "Intermediate"
                    ? "#F2CC08"
                    : "#ccc", // Default color
              }}
              className="md:px-6 px-2 py-1 text-[8px] md:text-[12px] font-HelveticaNeue md:py-2 font-bold md:font-semibold rounded-xl md:rounded-full flex items-center justify-start gap-2 text-white"
            >
              <img
                src={
                  video.level.name === "Super Beginner"
                    ? "/begginer.svg"
                    : video.level.name === "Beginner"
                    ? "/begginer.svg"
                    : video.level.name === "Intermediate"
                    ? "/intermidate.svg"
                    : video.level.name === "Advanced"
                    ? "/advanced.svg"
                    : ""
                }
                alt=""
                className="md:h-4 md:w-4 object-contain h-2 w-2"
              />
              {video.level.name}
            </Button>
          )}
          {video?.plan === "premium" && (
            <button className="md:px-6 px-2 py-1 text-[8px] md:text-[15px] font-HelveticaNeue md:py-2 md:font-bold font-semibold rounded-xl md:rounded-full flex items-center gap-2 bg-[#081F45] text-[#B99225] ">
              <img
                src="/material-symbols_crown.png"
                alt=""
                className="h-3 w-3 md:h-5 md:w-5"
              />
              Premium
            </button>
          )}
        </Box>
      </Box>

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
              width: "25ch",
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.title}
            onClick={(event) => handleOptionClick(option, video, event)}
            disabled={loadingOption === option.title}
          >
            <div
              style={{
                display: "flex",
                gap: "8px",
                alignItems: "center",
                // fontWeight: "600",
              }}
            >
              {option.icon} {option.label}
              {loadingOption === option.title && (
                <CircularProgress size={16} style={{ marginLeft: 8 }} />
              )}
            </div>
          </MenuItem>
        ))}
      </Menu>
    </Card>
  );
};

export default YoutubeCard;
