import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  IconButton,
  Button,
} from "@mui/material";
import DensitySmallIcon from "@mui/icons-material/DensitySmall";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import YoutubeCard from "./YoutubeCard";
import image from "../../assets/picture/image1.png";
import { Link } from "react-router-dom";

const Bignner = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("");

  const videoData = [
    {
      videoUrl: "https://www.youtube.com/embed/video1",
      title: "Beginner Video",
      Vediotitle: "Beginner Video with background",
      description:
        "Advanced level video description Advanced level video description Advanced level video description",
      buttonText: "Beginner",
      videoDuration: "10:30",
      backgroundImage: "image1.jpg",
      level: "Beginner",
    },
    {
      videoUrl: "https://www.youtube.com/embed/video2",
      title: "Advanced Video",
      Vediotitle: "Advanced Video with background",
      description:
        "Advanced level video description Advanced level video description Advanced level video description",
      buttonText: "Advance",
      videoDuration: "15:45",
      backgroundImage: "image2.jpg",
      level: "Advanced",
    },
    {
      videoUrl: "https://www.youtube.com/embed/video3",
      title: "Early Intermediate Video",
      Vediotitle: "Early Intermediate Video with background",
      description:
        "Advanced level video description Advanced level video description Advanced level video description",
      buttonText: " Early Beginner",
      videoDuration: "12:14",
      backgroundImage: "image3.jpg",
      level: "Early Intermediate",
    },
  ];

  const handleSelectLevel = (level) => {
    setSelectedLevel(level);
  };

  const handleApplyFilters = () => {
    setShowFilters(true);
  };

  const filteredVideos = videoData.filter((video) => {
    if (selectedLevel) {
      return video.level === selectedLevel;
    }
    return true;
  });

  return (
    <Container>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        sx={{ padding: "7px" }}
      >
        <Grid item xs={6}>
          <Box display="flex" alignItems="center">
            <Link to="/" style={{ textDecoration: "none" }}>
              <Box display="flex" alignItems="center">
                <ArrowBackIcon />
                <Typography sx={{ color: "#0294D3", marginLeft: 1 }}>
                  Back
                </Typography>
              </Box>
            </Link>
            <Typography variant="h6" sx={{ marginLeft: 2 }}>
              Watch Videos
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={6}>
          <Box display="flex" justifyContent="flex-end">
            <Link to="/bignners">
              <IconButton color="primary">
                <DashboardIcon />
              </IconButton>
            </Link>
            <IconButton color="primary">
              <DensitySmallIcon />
            </IconButton>
          </Box>
        </Grid>

        <Grid
          container
          spacing={4}
          alignItems="center"
          sx={{ marginTop: "0px", marginBottom: "12px" }}
        >
          <Grid item xs={12}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              gap={2}
              flexWrap="nowrap"
              sx={{
                overflowX: "auto",
                "& > *": {
                  flexBasis: "150px",
                  flexGrow: 1,
                },
              }}
            >
              {[
                "Absolute Beginner",
                "Beginner",
                "Early Intermediate",
                "High Intermediate",
                "Advanced",
              ].map((level) => (
                <Button
                  key={level}
                  variant="contained"
                  sx={{
                    backgroundColor:
                      selectedLevel === level ? "#0294D3" : "#E3E3E3",
                    color: selectedLevel === level ? "#FFF" : "#000",
                    padding: "10px",
                    fontSize: "11px",
                  }}
                  onClick={() => handleSelectLevel(level)}
                >
                  {level}
                </Button>
              ))}

              <Button
                variant="contained"
                onClick={handleApplyFilters}
                sx={{ padding: "10px", fontSize: "11px" }}
              >
                <FilterAltIcon style={{ marginRight: "0.4rem" }} /> Apply
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {filteredVideos?.map((video, index) => (
            <Grid item xs={12} sm={12} md={6} key={index}>
              <YoutubeCard
                videoUrl={video.videoUrl}
                title={video.title}
                Vediotitle={video.Vediotitle}
                description={video.description}
                buttonText={video.buttonText}
                videoDuration={video.videoDuration}
                backgroundImage={image}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Bignner;
