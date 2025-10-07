import { Box } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const VideoThumbnails = ({ videoUrls, video, type,newvideo, disableNavigation = false }) => {
  const navigate = useNavigate();

  // Ensure videoUrls is an array
  const urlsArray = Array.isArray(videoUrls) ? videoUrls : [videoUrls];

  return (
    <div className="thumbnails-container">
      {urlsArray.map((videoId, index) => {
        if (!videoId) return <p key={index}>Invalid Video ID</p>;

        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

        return (
          <div
          key={index}
          className="thumbnail"
          onClick={disableNavigation ? undefined : () =>
            navigate(`/dashboard/watch/${videoId}`, {
              state: { video, type,newvideo, allVideos: urlsArray }, 
            })
          }
        >
            <img
              src={thumbnailUrl}
              alt={`Thumbnail for video ${index + 1}`}
              // style={{ cursor: "pointer", width: "100%", height:'210px', objectFit:'cover'  }}
              className="w-full h-44 md:h-[210px] object-cover cursor-pointer"
            />
          </div>
        );
      })}
    </div>
  );
};

const YT_THUMBNAIL = ({ videoUrl, played, video, type, newvideo ,progress, disableNavigation = false }) => {
  return (
    <div>
      <VideoThumbnails videoUrls={videoUrl} video={video} type={type} newvideo={newvideo} disableNavigation={disableNavigation} />
      <Box
        sx={{
          top: 0,
          width: "100%",
          height: "5px",
          backgroundColor: "#f1f1f1",
        }}
      >
        <Box
          sx={{
            width: `${played * 100}%`,
            height: "100%",
            backgroundColor: "#F28327",
          }}
        />
      </Box>
    </div>
  );
};

export default YT_THUMBNAIL;
