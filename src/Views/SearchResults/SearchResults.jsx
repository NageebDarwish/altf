import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import YoutubeCard from "../WatchVideos/YoutubeCard";
import { request } from "../../services/axios";

const SearchResults = () => {
  const { state } = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  console.log(query);
  const [downloadingVideos, setDownloadingVideos] = useState({});
  const handleDownloadClick = async (video_id) => {
    setDownloadingVideos((prev) => ({ ...prev, [video_id]: true }));
    try {
      await request({
        method: "post",
        url: "api/video/list",
        data: {
          video_id,
          type: "video",
        },
      });
    } catch (error) {
      console.error("Error downloading video:", error);
    } finally {
      setDownloadingVideos((prev) => ({ ...prev, [video_id]: false }));
    }
  };
  return (
    <Box sx={{ p: 5 }}>
      <Typography variant="h5" sx={{ textAlign: "center", mb: 3 }}>
        Search Results related to
        <Typography
          variant="h5"
          sx={{ display: "inline", ml: 1, fontWeight: "bold" }}
        >{`"${query}"`}</Typography>
      </Typography>
      <Grid container spacing={2}>
        {state?.length > 0
          ? state?.map((video, index) => (
              <Grid item xs={12} sm={12} md={4} key={index}>
                <YoutubeCard
                  video={video}
                  Vediotitle={video?.title}
                  videoUrl={video?.video}
                  title={video?.title}
                  onPlay={() => handleVideoPlay(video.id)}
                  description={video?.description}
                  buttonText={video?.level}
                  videoDuration={video?.videoDuration}
                  backgroundImage={video?.backgroundImage}
                  showDownloadIcon={true}
                  onDownloadClick={() => handleDownloadClick(video.id)}
                  isDownloading={downloadingVideos[video.id]}
                  menuItems={["Add to list"]}
                  handleAdd={() => handleAddToList(video.id)}
                  type="video"
                />
              </Grid>
            ))
          : "No Videos"}
      </Grid>
    </Box>
  );
};

export default SearchResults;
