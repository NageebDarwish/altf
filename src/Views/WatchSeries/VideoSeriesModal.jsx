import { Dialog, DialogContent, Box, Typography, Button } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { useState, useEffect } from "react";
import SuperBeginnerSeriesInModal from "./SuperBeginnerSeriesInModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import ProgressComponent from "./ProgressComponent";
import { RxCross1 } from "react-icons/rx";
import LockIcon from "@mui/icons-material/Lock";

const VideoSeriesModal = ({ open, onClose, series, showPremiumMessage, setShowPremiumMessage }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const seriesData = series[0];
  const videos = seriesData?.videos;
  const [isAddingToList, setIsAddingToList] = useState(false);
  const token = useSelector((state) => state.user.token);
  console.log(series,'series567567')

  // Function to check if video is playable (public and not premium)
  const isVideoPlayable = (video) => {
    return video.status === "public" && video.plan !== "premium";
  };

  // Get first playable video
  const firstPlayableVideo = videos?.find(video => isVideoPlayable(video));

  const calculateTotalDurationInSeconds = (videos) => {
    if (!videos || videos.length === 0) return 0;
    // Filter only playable videos for duration calculation
    const playableVideos = videos.filter(video => isVideoPlayable(video));
    return playableVideos.reduce((sum, video) => sum + (video.duration_seconds || 0), 0);
  };

  const calculateTotalDuration = (videos) => {
    const totalSeconds = calculateTotalDurationInSeconds(videos);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  // Count only playable videos
  const playableVideosCount = videos?.filter(video => isVideoPlayable(video)).length;

  useEffect(() => {
    if (seriesData?.videos) {
      const totalWatchedSeconds = seriesData.videos.reduce((sum, video) => {
        const watchedTime = video.timeline?.watched_time;
        if (watchedTime) {
          return sum + parseFloat(watchedTime);
        }
        return sum;
      }, 0);

      const totalDuration = calculateTotalDurationInSeconds(seriesData.videos);

      const calculatedProgress = totalDuration > 0
        ? Math.min(Math.round((totalWatchedSeconds / totalDuration) * 100), 100)
        : 0;

      setProgress(calculatedProgress);
    }
  }, [seriesData]);

  const handleAddToList = async () => {
    try {
      setIsAddingToList(true);
      const seriesId = series[0]?.id;

      if (!seriesId) {
        console.error("No series ID found");
        return;
      }

      const response = await axios.post(
        "https://admin.arabicallthetime.com/api/series/list",
        { series_id: seriesId },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      console.log("Added to list successfully:", response.data);
    } catch (error) {
      console.error("Error adding to list:", error);
    } finally {
      setIsAddingToList(false);
    }
  };

  const handleNext = () => {
    if (currentIndex + 6 < series.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleplaybutton = (videoId,seriesallsidevideo, item) => {
    if (!isVideoPlayable(item)) {
      setShowPremiumMessage(true);
      return;
      
    }
    const playableVideos = series[0].videos.filter(video => isVideoPlayable(video));
    navigate(`/dashboard/watch/${videoId}`, {
      state: {
        video: seriesallsidevideo,
        type: 'series',
        allVideos: playableVideos,
        newvideo:seriesallsidevideo,
        videodata:item
        
      }
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen
      sx={{
        "& .MuiDialog-container": {
          padding: 0,
          margin: 0,
        },
        "& .MuiDialog-paper": {
          margin: 0,
          padding: 0,
          height: { xs: "100%", md: "90%" },
          width: { xs: "100%", md: '70%' },
          maxWidth: '100%',
          overflow: 'auto',
          scrollbarWidth: "none"
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          backgroundImage: `url(${series[0]?.thumbnail})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: { xs: "450px", md: "300px" },
          color: "white",
        }}
      >
        {/* Black Transparent Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: 1,
          }}
        />

        {/* Content Over Background */}
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            height: "100%",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "center", md: "end" },
            justifyContent: { xs: "flex-end", md: "space-between" },
            pb: 3,
            px: { xs: 1, md: 3 },
            gap: 2,
          }}
        >
          <div onClick={onClose} className="absolute top-3 right-3">
            <RxCross1 className="text-3xl rounded-full cursor-pointer bg-white p-2 text-btnbackground" />
          </div>
          {/* Title and Buttons */}
          <Box sx={{ paddingLeft: { xs: "0px", md: "16px" }, width: "100%" }}>
            <Typography sx={{ fontWeight: "bold", fontSize: { xs: "22px", md: "40px" } }}>
              {series[0]?.title || "Default Title"}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: { xs: 3, md: 1 },
                alignItems: { xs: "start", md: "center" },
                marginTop: 1,
              }}
            >
              <Button
                startIcon={<img src={series[0]?.level?.name === "Super Beginner" ? "/begginer.svg" : series[0]?.level?.name === "Beginner" ? "/begginer.svg" : series[0]?.level?.name === "Advanced" ? "/advanced.svg" : series[0]?.level?.name === "Intermediate" ? "/intermidate.svg" : ""} alt="Level" className="h-4 w-4" />}
                sx={{
                  backgroundColor:
                    series[0]?.level.name === "Super Beginner"
                      ? "#08BBE8"
                      : series[0]?.level.name === "Beginner"
                        ? "#1CC932"
                        : series[0]?.level.name === "Advanced"
                          ? "#0C3373"
                          : series[0]?.level.name === "Intermediate"
                            ? "#F2CC08"
                            : "#ccc",
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "12px",
                  height: "24px",
                  textTransform: "capitalize",
                }}
              >
                {series[0]?.level?.name}
              </Button>
              <Typography
                variant="body2"
                sx={{ fontWeight: "bold", color: "#fff" }}
              >
                {playableVideosCount} Episode(s) • {calculateTotalDuration(series[0]?.videos)}
              </Typography>
            </Box>
            <Typography
              sx={{
                marginTop: 2,
                display: { xs: 'none', md: 'block' }
              }}
            >
              {series[0]?.description || "Default description about the series."}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", width: "100%", gap: 2, marginTop: 2 }}>
              {firstPlayableVideo ? (
                <Button
                  onClick={() => handleplaybutton(firstPlayableVideo.video, series[0], firstPlayableVideo)}
                  startIcon={<PlayCircleIcon />}
                  sx={{
                    backgroundColor: "#ff6d00",
                    color: "#fff",
                    padding: "8px 36px",
                    fontWeight: "bold",
                    textTransform: "none",
                  }}
                >
                  Play
                </Button>
              ) : (
                <Button
                  startIcon={<LockIcon />}
                  sx={{
                    backgroundColor: "#cccccc",
                    color: "#666666",
                    padding: "8px 36px",
                    fontWeight: "bold",
                    textTransform: "none",
                    cursor: "not-allowed"
                  }}
                  disabled
                >
                  No Available Videos
                </Button>
              )}
              <Button
                startIcon={<PlaylistAddIcon />}
                sx={{
                  backgroundColor: "#ffffff",
                  color: "black",
                  padding: "8px 16px",
                  fontWeight: "bold",
                  textTransform: "none",
                  width: { xs: "100%", md: "auto" }
                }}
                onClick={handleAddToList}
                disabled={isAddingToList}
              >
                {isAddingToList ? "Adding..." : "Add to my list"}
              </Button>
            </Box>
          </Box>
          <div className="md:block hidden">
            <ProgressComponent progress={progress} />
          </div>
        </Box>
        <div className="md:hidden block">
          <ProgressComponent progress={progress} />
        </div>

        <DialogContent>
          <SuperBeginnerSeriesInModal
            description={seriesData?.title}
            videos={videos}
            seriesData={seriesData}
            data={series}
            showPremiumMessage={showPremiumMessage}
            setShowPremiumMessage={setShowPremiumMessage}
          />
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default VideoSeriesModal;