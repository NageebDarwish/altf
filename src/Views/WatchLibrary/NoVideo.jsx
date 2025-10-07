import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Grid, CircularProgress } from "@mui/material";
import image from "../../assets/picture/item1.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { request } from "../../services/axios";
import ToastComp from "../../components/toast/ToastComp";
import YoutubeCard from "../WatchVideos/YoutubeCard";

const NoVideo = () => {
  const navigate = useNavigate();
  const [libraryVideo, setLibraryVideo] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchLibraryVideos = async () => {
      try {
        const response = await request({
          url: "api/download/list",
          method: "get",
        });

        if (response?.status === 200) {
          setLibraryVideo(response.data.payload);
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

    fetchLibraryVideos();
  }, []);

  console.log(libraryVideo, "Fetched Library Videos");

  return (
    <>
      {/* Loading Spinner or Video Cards */}
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
        ) : libraryVideo?.length > 0 ? (
          libraryVideo?.map((videoItem, index) => {
            const video = videoItem.downloadable; // Access the downloadable object
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
    </>
  );
};

export default NoVideo;
