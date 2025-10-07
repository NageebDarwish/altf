import {
    Box,
    Typography,
    Switch,
    Divider,
    Stack,
    IconButton,
  } from "@mui/material";
  import PlayArrowIcon from "@mui/icons-material/PlayArrow";
  import DownloadIcon from "@mui/icons-material/Download";
  import MoreVertIcon from "@mui/icons-material/MoreVert";
  import LockIcon from "@mui/icons-material/Lock";
  import StarIcon from "@mui/icons-material/Star";
  import BarChartIcon from "@mui/icons-material/BarChart";
  import { useEffect, useState } from "react";
  import axios from "axios";
  import YT_THUMBNAIL from "../../components/VideoCard/Thumbnail";
  
  const VideoSeriesCard = ({ title, starred, state, vedio }) => {
    console.log(vedio,"vedio")
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 2,
          border: "1px solid #e0e0e0",
          borderRadius: 2,
          boxShadow: "none",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* <YT_THUMBNAIL
          videoUrl={videoUrl}
          title={title}
          played={played}
          video={video}
        /> */}
        <img
          style={{
            flex: 1,
            width: 120,
            height: 115,
  
            borderRadius: 1,
            p: 0,
          }}
          src="https://images.unsplash.com/photo-1731432245325-d820144afe4a"
          alt={title}
        />
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
          <Stack
            direction="row"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                size="small"
                sx={{
                  color: "#fff",
                  backgroundColor: "#239fe3",
                  borderRadius: 2,
                  height: "24px",
                  width: "24px",
                }}
              >
                <BarChartIcon fontSize="6" />
              </IconButton>
              {starred && (
                <IconButton
                  size="small"
                  sx={{
                    color: "#fff",
                    backgroundColor: "#6354b1",
                    borderRadius: 2,
                    height: "24px",
                    width: "24px",
                  }}
                >
                  <StarIcon fontSize="8" />
                </IconButton>
              )}
            </Box>
  
            <Box>
              <IconButton size="small">
                <DownloadIcon fontSize="8" />
              </IconButton>
              <IconButton size="small">
                <MoreVertIcon fontSize="8" />
              </IconButton>
            </Box>
          </Stack>
  
          <Typography
            sx={{ p: 0, pt: 1 }}
            fontSize={{ xs: "12px", sm: "13px", md: "15px" }}
          >
            {title}
          </Typography>
        </Box>
      </Box>
    );
  };
  
  const WatchVediosSeriesCards = ({ state , series}) => {
    const [videoData, setVideoData] = useState([]);
    const [loading, setLoading] = useState(false);
    const allVideos = series.flatMap((playlist) => playlist.videos);
     console.log(allVideos,"allVideos")
    const getVideoData = async () => {
      setLoading(true);
      await axios
        .get(
          `${import.meta.env.VITE_REACT_APP_URL}api/videos?topic=${
            state?.video?.topic?.name
          }`
        )
        .then((result) => {
          setLoading(false);
          setVideoData(result?.data?.payload);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    };
    useEffect(() => {
      getVideoData();
    }, []);
    return (
      <Box flex={2}>
        <Box
          sx={{
            width: "100%",
            bgcolor: "#fff",
            borderRadius: 2,
            p: 2,
            minHeight: "100vh",
          }}
        >
          <Typography variant="h6" gutterBottom>
            More videos like this
          </Typography>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body2">Autoplay</Typography>
              <Switch size="small" defaultChecked />
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body2">Skip watched</Typography>
              <Switch size="small" />
            </Stack>
          </Stack>
          <Divider sx={{ mb: 2 }} />
      <Box sx={{ maxHeight: 500, overflowY: "auto" }}>
    {loading
      ? "Please wait.."
      : allVideos?.length > 0
      ? allVideos?.map((video, index) => (
          <VideoSeriesCard
            key={index}
            video={video}  // Pass the current video object
            state={state} // Pass additional state if needed
            series={series} // Pass the entire series as a prop
          />
        ))
      : "No Related Videos found "}
  </Box>
  
        </Box>
      </Box>
    );
  };
  
  export default WatchVediosSeriesCards;
  