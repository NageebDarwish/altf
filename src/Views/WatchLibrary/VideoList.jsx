import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, CircularProgress, Grid } from "@mui/material";
import image from "../../assets/picture/Dataimage.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { request } from "../../services/axios";
import YoutubeCard from "../WatchVideos/YoutubeCard";
import ToastComp from "../../components/toast/ToastComp";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { API_ENDPOINTS } from "../../config/api";

const VideoList = () => {
  const navigate = useNavigate();
  
  // Use infinite scroll hook for user's video list
  const {
    data: list,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
    lastElementRef,
  } = useInfiniteScroll(API_ENDPOINTS.videos.getUserList, {
    perPage: 15,
  });

  console.log(list,'here is list of list')
  
  const handleBack = () => {
    navigate(-1);
  };

  return (
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
      ) : list?.length > 0 ? (
        <>
          {list?.map((item, index) => {
            const video = item.video || item; // Handle both formats
            return (
              <Grid item xs={12} sm={12} md={4} key={`${video.id}-${index}`}>
                <YoutubeCard
                  Vediotitle={video?.title}
                  videoUrl={video.video} // Correctly reference video URL
                  title={video.title}
                  description={video.description}
                  buttonText={video.level}
                  videoDuration={"N/A"} // Replace with actual duration if available
                  backgroundImage={""} // You can specify a default image if needed
                />
              </Grid> 
            );
          })}
          
          {/* Infinite scroll trigger */}
          {hasMore && (
            <Grid item xs={12} ref={lastElementRef}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "20px",
                }}
              >
                {loadingMore ? (
                  <CircularProgress color="secondary" />
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Scroll down to load more videos...
                  </Typography>
                )}
              </Box>
            </Grid>
          )}
          
          {/* Load more button */}
          {hasMore && !loadingMore && (
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "20px",
                }}
              >
                <Button
                  variant="contained"
                  onClick={loadMore}
                  sx={{ color: "#fff" }}
                >
                  Load More Videos
                </Button>
              </Box>
            </Grid>
          )}
          
          {error && (
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "20px",
                }}
              >
                <Typography variant="body2" color="error">
                  {error}
                </Typography>
              </Box>
            </Grid>
          )}
        </>
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
            There is No Video content
          </Typography>
          <Box sx={{ width: "50%" }}>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet, lorem
              ipsum dolor sit amet, lorem ipsum dolor sit amet.
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
  );
};

export default VideoList;
