import {
  Box,
  Typography,
  Switch,
  Divider,
  Stack,
  IconButton,
  MenuItem,
  CircularProgress,
  Menu,
} from "@mui/material";
import { useEffect, useRef, useState, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaLock, FaSignal } from "react-icons/fa";
import { request } from "../../services/axios";
import { HiDotsVertical } from "react-icons/hi";
import { BsDownload } from "react-icons/bs";
import { MdOutlineFileDownload, MdOutlineRemoveRedEye } from "react-icons/md";
import { PiListHeart } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";

const WatchPlayListSeries = ({
  state,
  playlistname,
  series,
  onAutoplayChange,
  currentVideoId,
  ModalGetVedio,
  onSelectVideo,
  firstselectedvideo,
  videoProgress,
  contentType,
  checked, // Add checked prop
}) => {
  const data = state;

  const seriesid = series?.video?.id;
  const { id } = useParams();
  const location = useLocation();
  const [videoData, setVideoData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hideWatched, setHideWatched] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const navigate = useNavigate();
  const [showPremiumMessage, setShowPremiumMessage] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [loadingOption, setLoadingOption] = useState(null);
  const open = Boolean(anchorEl);
  const [currentVideo, setCurrentVideo] = useState(null);
  const showDownloadIcon = true;
  const storedVideoType = localStorage.getItem("videoType");
  const isAuthenticated = useSelector((state) => state.admin.isAuthenticated);
  const [downloadingVideos, setDownloadingVideos] = useState({});
  const videoRefs = useRef([]);
  const scrollContainerRef = useRef(null);
  const hasInitiallyScrolled = useRef(false);
  const isUserScrolling = useRef(false);
  const lastScrollTime = useRef(0);
  const userHasManuallyScrolled = useRef(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [videoProgresses, setVideoProgresses] = useState({});



  // State for watched videos
  const [watchedVideoIds, setWatchedVideoIds] = useState([]);
  const [hasFetchedWatchedVideos, setHasFetchedWatchedVideos] = useState(false);
  const [loadingHideWatched, setLoadingHideWatched] = useState(false);
  const [payloadVideos, setPayloadVideos] = useState([]);

  const isVideoAlreadyMarkedAsWatched = (videoId) => {
    const storageKey = "markedWatchedVideos";
    const alreadyWatched = JSON.parse(localStorage.getItem(storageKey)) || [];
    return alreadyWatched.includes(String(videoId));
  };

  // Helper function to check if video is fully watched (progress >= 98%)
  const isVideoFullyWatched = (video) => {
    if (!video) return false;

    const userId = user?.id;
    // Check both possible timeline locations (for video and series)
    const userTimeline = video?.timelines?.find?.(
      timeline => timeline.user_id === String(userId)
    ) || video?.timeline?.find?.(
      timeline => timeline.user_id === String(userId)
    );

    if (!userTimeline || !video.duration_seconds) return false;

    const progressTime = parseFloat(userTimeline.progress_time) || 0;
    const duration = parseFloat(video.duration_seconds) || 1;
    const progressPercentage = (progressTime / duration) * 100;

    return progressPercentage >= 98 || userTimeline?.is_completed;
  };
  // Get the next video in the playlist
  const getNextVideo = useCallback((currentVideoId) => {
    if (!data || data.length === 0) return null;

    const publicVideos = data.filter(video => video.status === "public") || [];

    // Find current video index
    const currentVideoIndex = publicVideos.findIndex(video =>
      selectedVideo ? video.id === selectedVideo.id : video.video === currentVideoId
    );

    // Get next video
    const nextIndex = currentVideoIndex + 1;
    if (nextIndex < publicVideos.length) {
      return publicVideos[nextIndex];
    }

    return null; // No more videos
  }, [data, selectedVideo]);

  const handleClick = (event, video) => {
    setAnchorEl(event.currentTarget);
    setCurrentVideo(video);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCurrentVideo(null);
  };

  const markVideoAsWatched = async (videoId, isCompleted) => {
    const type = isCompleted ? "add" : "remove";

    try {
      const response = await request({
        url: "api/watched/video/store",
        method: "get",
        params: {
          video_id: videoId,
          type: type
        },
      });
      console.log(`Video ${type === 'add' ? 'added to' : 'removed from'} watched list:`, response.data);
      return response.data;
    } catch (error) {
      console.error(`Error ${type === 'add' ? 'adding' : 'removing'} video from watched list:`, error);
      throw error;
    }
  };

  const userVideoLists = useSelector((state) => state.user.user?.video_lists || []);
  const isFavorite = userVideoLists.some(item => currentVideo ? item.video_id === String(currentVideo.id) : item.video_id === String(firstselectedvideo?.id));

  const handleOptionClick = async (option) => {
    if (!currentVideo) return;

    if (option.title === "list") {
      setLoadingOption(option.title);
      const seriesdata = {
        series_video_id: currentVideo.id
      };
      const data = {
        video_id: currentVideo.id,
      };
      try {
        if (contentType === "series") {
          const response = await request({
            url: isFavorite ? "api/remove/series/video/list" : "api/series/video/list",
            method: "post",
            data: seriesdata,
          });
        } else {
          const response = await request({
            url: isFavorite ? "api/remove/video/list" : "api/video/list",
            method: "post",
            data: data,
          });
        }

        dispatch({
          type: isFavorite ? 'REMOVE_FROM_FAVORITES' : 'ADD_TO_FAVORITES',
          payload: isFavorite ? String(currentVideo.id) : { video_id: String(currentVideo.id) }
        });

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
    }
    else if (option.title === "watched") {
      setLoadingOption(option.title);
      try {
        const videoId = currentVideo.id;

        let response;

        if (contentType === "series") {
          response = await request({
            url: `api/series/video/watched/${videoId}`,
            method: "get",
          });
        } else {
          response = await request({
            url: `api/video/watched/${videoId}`,
            method: "get",
          });
        }
        console.log(response, 'smdkcsmdklsc')
        setVideoProgresses(prev => ({
          ...prev,
          [videoId]: response?.data?.payload?.progress_time
        }));

        const isCompleted = response?.data?.payload?.is_completed;
        await markVideoAsWatched(videoId, isCompleted);

        enqueueSnackbar("Video marked as watched", { variant: "success" });

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

  const ITEM_HEIGHT = 40;

  const options = [
    {
      icon: <BsDownload className="text-orange-500 text-xl" />,
      label: "Download",
      title: "video",
    },
    {
      icon: isVideoFullyWatched(currentVideo) ?
        <MdOutlineRemoveRedEye className="text-green-500 text-xl" /> :
        <MdOutlineRemoveRedEye className="text-orange-500 text-xl" />,
      label: isVideoFullyWatched(currentVideo) ?
        "Mark as Unwatched" : "Mark as Watched",
      title: "watched",
    },
    {
      icon: <PiListHeart className="text-orange-500 text-xl" />,
      label: isFavorite ? "Remove from Favourites" : "Add to Favourites",
      title: "list",
    },
  ];

  const handleChange = () => {
    const newValue = !checked;
    onAutoplayChange(newValue);
  };

  const fetchWatchedVideos = async () => {
    setLoadingHideWatched(true);
    try {
      const apiUrl = contentType === "series"
        ? `api/hide/watched/series/video/${seriesid}`
        : `api/hide/watched/video`;

      const response = await request({
        url: apiUrl,
        method: "get",
      });
      console.log(response, 'responseadkc')
      if (contentType === "series") {
        setWatchedVideoIds(response.data.payload.videos.map(video => video.id));
        setPayloadVideos(response.data.payload.videos);
      } else {
        setWatchedVideoIds(response.data.payload.map(video => video.id));
        setPayloadVideos(response.data.payload);
      }

      setHasFetchedWatchedVideos(true);

    } catch (error) {
      console.error("Error fetching watched videos:", error);
      enqueueSnackbar("Error fetching watched videos", { variant: "error" });
      setWatchedVideoIds([]);
      setPayloadVideos([]);
    } finally {
      setLoadingHideWatched(false);
    }
  };

  const handleChanges = () => {
    const newValue = !hideWatched;
    setHideWatched(newValue);

    if (newValue) {
      fetchWatchedVideos();
    }
  };

  const getFilteredVideos = () => {
    if (hideWatched && hasFetchedWatchedVideos) {
      return payloadVideos.filter(video => video.status === "public");
    } else {
      return [...(Array.isArray(data) ? data : [])].filter(video => video.status === "public");
    }
  };

  const videosToDisplay = getFilteredVideos();
  const usersss = useSelector((state) => state.user.user);
  const userId = usersss?.id;
  const scrollToVideo = (index) => {
    // Check if user has manually scrolled at any point
    if (userHasManuallyScrolled.current) {
      return; // Don't auto-scroll if user has ever manually scrolled
    }
    
    // Check if user recently scrolled (within last 2 seconds)
    const timeSinceLastScroll = Date.now() - lastScrollTime.current;
    if (timeSinceLastScroll < 2000) {
      return; // Don't auto-scroll if user recently scrolled
    }

    // Detect mobile devices
    const isMobile = window.innerWidth <= 768;
    
    // Use longer timeout for mobile to ensure DOM is fully rendered
    const timeout = isMobile ? 600 : 300;
    
    setTimeout(() => {
      if (videoRefs.current[index] && scrollContainerRef.current && !isUserScrolling.current) {
        const container = scrollContainerRef.current;
        const element = videoRefs.current[index];

        if (element && container) {
          // Get accurate positioning
          const containerRect = container.getBoundingClientRect();
          const elementRect = element.getBoundingClientRect();
          
          // Calculate relative position within the scroll container
          const elementTop = element.offsetTop;
          const containerScrollTop = container.scrollTop;
          const containerHeight = container.clientHeight;
          const elementHeight = element.offsetHeight;
          
          // Same scroll behavior for both mobile and desktop - show video at top
          let desiredScrollTop;
          // Both mobile and desktop: scroll so the element appears near the top with padding
          desiredScrollTop = elementTop - 40; // 40px padding from top

          // Ensure we don't scroll beyond the container bounds
          const maxScroll = container.scrollHeight - containerHeight;
          const finalScrollTop = Math.max(0, Math.min(desiredScrollTop, maxScroll));

          console.log('Scroll Debug:', {
            index,
            isMobile,
            elementTop,
            containerScrollTop,
            desiredScrollTop,
            finalScrollTop,
            containerHeight,
            elementHeight,
            calculation: `${elementTop} - 40 = ${desiredScrollTop} (same for both mobile and desktop)`
          });

          // Use manual scroll for both mobile and desktop to ensure consistent behavior
          container.scrollTo({
            top: finalScrollTop,
            behavior: 'smooth'
          });
        }
      }
    }, timeout);
  };

  useEffect(() => {
    if (firstselectedvideo && videosToDisplay.length > 0 && !isUserScrolling.current && !userHasManuallyScrolled.current) {
      // Use the filtered videos instead of just public videos
      const firstVideoIndex = videosToDisplay.findIndex(video => video.id === firstselectedvideo);

      if (firstVideoIndex !== -1) {
        // Detect mobile and use longer delay for better mobile experience
        const isMobile = window.innerWidth <= 768;
        const delay = isMobile ? 800 : 500;
        
        setTimeout(() => {
          scrollToVideo(firstVideoIndex);
        }, delay);
      }
    }
  }, [firstselectedvideo, videosToDisplay]);

   const handleSelectVideo = useCallback((video) => {
  if ((user === null || user?.is_premium === "0") && video.plan === "premium") {
    setShowPremiumMessage(true);
    return;
  }

  // Reset manual scroll flag when opening a new video
  userHasManuallyScrolled.current = false;
  
  // Navigate to the new video URL to change the URL
  navigate(`/dashboard/watch/${video.video}`, {
    state: {
      video: video,
      type: contentType,
      allVideos: data,
      newvideo: data
    },
    replace: true // Replace current history entry instead of adding new one
  });

}, [navigate, contentType, data, user]);

  // Handle autoplay when video ends
  const handleVideoEnded = useCallback(() => {
    if (checked) {
      const nextVideo = getNextVideo(currentVideoId);
      if (nextVideo) {
        // Find the index of the next video in the displayed videos
        const nextIndex = videosToDisplay.findIndex(v => v.id === nextVideo.id);
        if (nextIndex !== -1) {
          setTimeout(() => {
            handleSelectVideo(nextVideo, nextIndex);
          }, 1500); // Increased delay for better UX
        }
      }
    }
  }, [checked, currentVideoId, getNextVideo, handleSelectVideo, videosToDisplay]);

  // Add scroll event listeners to detect manual scrolling
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let scrollTimeout;
    const handleScroll = () => {
      const now = Date.now();
      lastScrollTime.current = now;
      isUserScrolling.current = true;
      userHasManuallyScrolled.current = true; // Permanently mark that user has scrolled
      clearTimeout(scrollTimeout);
      
      // Reset the active scrolling flag after user stops scrolling
      scrollTimeout = setTimeout(() => {
        isUserScrolling.current = false;
      }, 1000); // This only resets the "currently scrolling" flag, not the "has scrolled" flag
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // This effect is now handled by the firstselectedvideo effect above
  // Keeping this as a backup for edge cases
  useEffect(() => {
    if (currentVideoId && videosToDisplay.length > 0 && !isUserScrolling.current && !userHasManuallyScrolled.current) {
      const currentVideoIndex = videosToDisplay.findIndex(video => 
        video.video === currentVideoId || video.id === currentVideoId
      );
      
      if (currentVideoIndex !== -1 && !hasInitiallyScrolled.current) {
        setTimeout(() => {
          scrollToVideo(currentVideoIndex);
          hasInitiallyScrolled.current = true;
        }, 300);
      }
    }
  }, [currentVideoId, videosToDisplay]);

  const getLevelColor = (levelName) => {
    if (levelName === "Intermediate") return "bg-[#f2cc08]";
    if (levelName === "Advanced") return "bg-[#0C3373]";
    if (levelName === "beginner") return "bg-[#3b73cc]";
    return "";
  };

  const findSelectedVideoIndex = () => {
    if (!selectedVideo) return 1;
    return data.findIndex((item) => item.id === selectedVideo.id) + 1;
  };

  return (
    <>
      <Box flex={2} className='font-HelveticaNeue mb-14 md:mb-0'>
        <Box
          sx={{
            width: '100%',
            bgcolor: "#fff",
            borderRadius: { xs: 0, md: 4 },
            p: { xs: 1, md: 3 },
            height: "100%"
          }}
        >
          <div className="flex items-center justify-between">
            {data ? (
              <p>{findSelectedVideoIndex()}/{data.length}</p>
            ) : (
              <p>1/1</p>
            )}
          </div>
          {contentType === "series" && (
            <h2 className="text-[20px] font-bold font-HelveticaNeue py-3">
              {playlistname || ""}
            </h2>
          )}

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            mb={2}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Switch
                checked={checked}
                onChange={handleChange}
                sx={{
                  transform: "scale(1.4)",
                  width: '55px',
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "white",
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "#34C659",
                  },
                }}
              />
              <Typography variant="body2" sx={{ whiteSpace: "nowrap", fontSize: '16px', paddingLeft: "10px" }}>
                Autoplay
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Switch
                checked={hideWatched}
                onChange={handleChanges}
                disabled={loadingHideWatched}
                sx={{
                  transform: "scale(1.4)",
                  width: '55px',
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "white",
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "#34C659",
                  },
                }}
              />
              <Typography variant="body2" sx={{ whiteSpace: "nowrap", fontSize: '16px', paddingLeft: "10px" }}>
                Skip Watched
                {loadingHideWatched && (
                  <CircularProgress size={16} style={{ marginLeft: 8 }} />
                )}
              </Typography>
            </Box>
          </Stack>

          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto"
            style={{
              maxHeight: contentType === "series"
                ? 'calc(100vh - -80px)'
                : 'calc(100vh - 100px)',
              minHeight: '100px',
              // Improve mobile scrolling
              WebkitOverflowScrolling: 'touch',
              scrollBehavior: 'smooth',
              // Better mobile touch handling
              touchAction: 'pan-y',
              // Prevent page scroll interference
              position: 'relative',
              contain: 'layout style paint',
            }}
          >
            {videosToDisplay.map((item, index) => {
              // console.log(item, 'mskdcnksdcnsdjkn')
              // const currentProgress = videoProgress[item.video] || 0;
              // let userTimeline;
              // if (contentType === "video") {
              //   const userTimeline = item?.timelines?.find(
              //     timeline => timeline.user_id === String(userId)
              //   );
              // } else {
              //   const userTimeline = item?.timeline?.find(
              //     timeline => timeline.user_id === String(userId)
              //   );
              // }
              // const duration = item.duration_seconds || 1;
              // const savedProgressTime = userTimeline?.progress_time || 0;
              // const savedProgress = Math.min(savedProgressTime / duration, 0.99);
              // const isCurrentVideo = selectedVideo?.id === item.id ||
              //   selectedVideo?.video === item.video ||
              //   firstselectedvideo === item.id;
              // const displayProgress = isCurrentVideo ? currentProgress : savedProgress;
              // const thumbnailUrl = `https://i.ytimg.com/vi/${item.video}/hqdefault.jpg`;
              // const isPremium = (user === null || user?.is_premium === "0") && item.plan === "premium";



              // Get current progress from parent component
              const currentProgress = videoProgress[item.video] || 0;
              // Get user timeline based on content type
              let userTimeline;
              if (contentType === "video") {
                userTimeline = item?.timelines?.find(
                  timeline => timeline.user_id === String(userId)
                );
              } else {
                userTimeline = item?.timeline?.find(
                  timeline => timeline.user_id === String(userId)
                );
              }

              const duration = item.duration_seconds || 1;
              const savedProgressTime = userTimeline?.progress_time || 0;
              const savedProgress = savedProgressTime > 0 ? Math.min(savedProgressTime / duration, 0.99) : 0;

              // Determine if this is the currently playing video
              const isCurrentVideo = selectedVideo?.id === item.id ||
                selectedVideo?.video === item.video ||
                firstselectedvideo === item.id;

              // Use current progress for playing video, saved progress for others
              const displayProgress = isCurrentVideo ? currentProgress : savedProgress;

              const thumbnailUrl = `https://i.ytimg.com/vi/${item.video}/hqdefault.jpg`;
              const isPremium = (user === null || user?.is_premium === "0") && item.plan === "premium";

              const isSelected = selectedVideo
                ? selectedVideo?.id === item.id || selectedVideo?.video === item.video
                : item.video === currentVideoId;
              // const played = Math.min(displayProgress * 100, 100);
              const progressPercentage = Math.min(displayProgress * 100, 100);

              const finalProgressPercentage = videoProgress[item.id] !== undefined
                ? (parseFloat(videoProgress[item.id]) / duration) * 100
                : progressPercentage;
              return (
                <div
                  key={index}
                  ref={el => videoRefs.current[index] = el}
                  className={`relative flex items-center border border-[#EEF2F6] rounded-[5px] mb-3 space-x-4 bg-white 
                  ${isSelected ? "border-orange-500 border-2 rounded-[5px]" : ""}`}
                >
                  <div
                    onClick={() => {
                      handleSelectVideo(item);
                    }}
                    className="relative"
                  >
                    {isPremium && (
                      <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center rounded-l-[5px] z-10">
                        {showPremiumMessage ? (
                          <div className="flex gap-2 bg-btnbackground text-white p-2 rounded-md items-center">
                            <FaLock className="text-sm" />
                            <Typography onClick={() => navigate('/pricing-page')} className="font-semibold text-[10px]">Go Premium to Watch</Typography>
                          </div>
                        ) : (
                          <FaLock className="text-3xl text-white" />
                        )}
                      </div>
                    )}
                    <img
                      src={thumbnailUrl}
                      alt="Thumbnail"
                      className={`h-[104px] w-[154px] object-cover rounded-l-[5px] ${isPremium ? "opacity-70" : ""}`}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        width: '100%',
                        height: '4px',
                        backgroundColor: '#f1f1f1',
                      }}
                    >
                      <Box
                        sx={{
                          width: `${finalProgressPercentage}%`,
                          height: '100%',
                          backgroundColor: '#F28327',
                          transition: isCurrentVideo ? 'width 0.3s ease' : 'none',
                        }}
                      />
                    </Box>
                  </div>

                  <div className="flex-1 flex flex-col justify-between gap-4">
                    <div className="flex justify-between w-full">
                      <div className="flex space-x-2">
                        <div className={`rounded h-6 w-6 flex items-center justify-center ${getLevelColor(item?.level?.name)}`}>
                          <img src={item?.level?.name === "Super Beginner" ? "/begginer.svg" : item?.level?.name === "Beginner" ? "/begginer.svg" : item?.level?.name === "Advanced" ? "/advanced.svg" : item?.level?.name === "Intermediate" ? "/intermidate.svg" : ""} alt="Level" className="h-4 w-4" />
                        </div>
                        {isPremium && (
                          <img
                            onClick={() => navigate('/pricing-page')}
                            src="/Frame 1984077994.svg"
                            alt="Premium"
                            className="h-6 w-6 cursor-pointer"
                          />
                        )}
                      </div>
                      <div className="flex items-center space-x-3">
                        {storedVideoType === "1" ? (
                          showDownloadIcon && (
                            <Box>
                              {downloadingVideos[item.id] ? (
                                <CircularProgress size={24} color="secondary" />
                              ) : (
                                <IconButton
                                  disabled={downloadingVideos[item.id]}
                                >
                                  <MdOutlineFileDownload
                                    color={isAuthenticated ? "black" : "#ccc"}
                                    size={20}
                                    style={{
                                      cursor: isAuthenticated ? "pointer" : "not-allowed",
                                    }}
                                  />
                                </IconButton>
                              )}
                            </Box>
                          )
                        ) : (
                          <IconButton disabled>
                            <MdOutlineFileDownload color="#ccc" size={20} />
                          </IconButton>
                        )}
                        <HiDotsVertical
                          onClick={(e) => handleClick(e, item)}
                          size={20}
                          className="text-black cursor-pointer hover:text-black transition-all"
                        />
                      </div>
                    </div>
                    <p className="font- overflow-hidden text-[14px]">
                      {item.title.split(" ").length > 3
                        ? item.title.split(" ").slice(0, 3).join(" ") + "..."
                        : item.title}
                    </p>
                  </div>
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
                        onClick={() => handleOptionClick(option)}
                        disabled={loadingOption === option.title}
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            alignItems: "center",
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
                </div>
              );
            })}
          </div>
        </Box>
      </Box>
    </>
  );
};

export default WatchPlayListSeries;