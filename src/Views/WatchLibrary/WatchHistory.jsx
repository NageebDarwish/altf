import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  IconButton,
  FormControl,
  ListItemText,
  Checkbox,
  ListItem,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
} from "@mui/material";
import DensitySmallIcon from "@mui/icons-material/DensitySmall";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IoFilterSharp } from "react-icons/io5";
import YoutubeCard from "../WatchVideos/YoutubeCard";
import image from "../../assets/picture/image1.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { request } from "../../services/axios";
import ToastComp from "../../components/toast/ToastComp";
const WatchHistory = () => {
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();
  const [level, setLevel] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [guide, setGuide] = useState([]);
  const [topic, setTopic] = useState([]);
  const [sound, setSound] = useState([]);
  const [sortBy, setSortBy] = useState([]);
  const handleToggle = (value, setter, selectedItems) => {
    setter(
      selectedItems.includes(value)
        ? selectedItems.filter((item) => item !== value)
        : [...selectedItems, value]
    );
  };

  const handleApplyFilters = () => {
    setShowFilters(true);
  };

  const handleCancel = () => {
    setShowFilters(false);
    setSortBy("");
    setLevel("");
    setCountry("");
    setGuide("");
    setTopic("");
    setSound("");
  };

  const videoData = [
    {
      videoUrl: "https://www.youtube.com/embed/video2",
      title: "Video Title 2",
      Vediotitle: "Video Title 2 with a background image",

      buttonText: "Auto Beginner",
      videoDuration: "10:30",
      backgroundImage: "image2.jpg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vel turpis a odio fringilla egestas. Integer non justo sit amet nunc varius fermentum.",
    },
    {
      videoUrl: "https://www.youtube.com/embed/video2",
      title: "Video Title 2",
      Vediotitle: "Video Title 2 with a background image",

      buttonText: "Beginner",
      videoDuration: "10:30",
      backgroundImage: "image2.jpg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vel turpis a odio fringilla egestas. Integer non justo sit amet nunc varius fermentum.",
    },
    {
      videoUrl: "https://www.youtube.com/embed/video2",
      title: "Video Title 2",
      Vediotitle: "Video Title 2 with a background image",
      buttonText: "Premium",
      videoDuration: "10:30",
      backgroundImage: "image2.jpg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vel turpis a odio fringilla egestas. Integer non justo sit amet nunc varius fermentum.",
    },
    {
      videoUrl: "https://www.youtube.com/embed/video2",
      title: "Video Title 2",
      Vediotitle: "Video Title 2 with a background image",
      //   description: "Description for Video 2",
      buttonText: "Auto Beginner",
      videoDuration: "10:30",
      backgroundImage: "image2.jpg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vel turpis a odio fringilla egestas. Integer non justo sit amet nunc varius fermentum.",
    },
    {
      videoUrl: "https://www.youtube.com/embed/video2",
      title: "Video Title 2",
      Vediotitle: "Video Title 2 with a background image",
      // description: "Description for Video 2",
      buttonText: "Premium",
      videoDuration: "10:30",
      backgroundImage: "image2.jpg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vel turpis a odio fringilla egestas. Integer non justo sit amet nunc varius fermentum.",
    },
    {
      videoUrl: "https://www.youtube.com/embed/video2",
      title: "Video Title 2",
      Vediotitle: "Video Title 2 with a background image",
      //  description: "Description for Video 2",
      buttonText: "Beginner",
      videoDuration: "10:30",
      backgroundImage: "image2.jpg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vel turpis a odio fringilla egestas. Integer non justo sit amet nunc varius fermentum.",
    },
  ];

  const [HistoryVideo, setHistoryVideo] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchHistoryVideos = async () => {
      try {
        const response = await request({
          url: "api/video/history",
          method: "get",
        });

        if (response?.status === 200) {
          setHistoryVideo(response.data.payload);
        }
      } catch (error) {
        console.log("Error fetching video data:", error);
        ToastComp({
          variant: "error",
          message: "Failed to fetch videos. Please try again later.",
        });
      } finally {
        setLoading(false); // Stop loading after API response
      }
    };

    fetchHistoryVideos();
  }, []);

  return (
    <Container>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        sx={{ padding: "5px" }}
      >
        <Grid item xs={6}>
          <Box display="flex" alignItems="center" sx={{ marginBottom: "8px" }}>
            <Link to="/watch-library" style={{ textDecoration: "none" }}>
              <Box display="flex" alignItems="center">
                <ArrowBackIcon />
                <Typography sx={{ color: "#0294D3", marginLeft: 1 }}>
                  Back
                </Typography>
              </Box>
            </Link>
            <Typography variant="h6" sx={{ marginLeft: 2 }}>
              History of Videos
            </Typography>
          </Box>
        </Grid>

        <Grid container spacing={4} sx={{ padding: 2 }}>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "300px",
              }}
            >
              <CircularProgress color="secondary" />
            </Box>
          ) : HistoryVideo?.length > 0 ? (
            HistoryVideo?.map((videoItem, index) => {
              const video = videoItem.history; // Access the downloadable object
              return (
                <Grid item xs={12} sm={12} md={6} key={index}>
                  <YoutubeCard
                    Vediotitle={video.title}
                    videoUrl={video.video} // Correctly reference video URL
                    title={video.title}
                    description={video.description}
                    buttonText={video.level}
                    videoDuration={video.videoDuration || "N/A"}
                    backgroundImage={video.backgroundImage || ""}
                  />
                </Grid>
              );
            })
          ) : (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              minHeight="100vh"
              textAlign="center"
              p={2}
            >
              <img
                src={image}
                alt="No Video"
                style={{ maxWidth: "100%", height: "auto" }}
              />
              <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                You Don’t have Downloading Yet
              </Typography>
              <Box sx={{ width: "50%" }}>
                <Typography variant="body1" sx={{ mb: 4 }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Typography>
              </Box>
              <Button
                variant="contained"
                sx={{
                  color: "#fff",
                }}
                onClick={handleBack}
              >
                <ArrowBackIcon /> Go Back to Library
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default WatchHistory;
