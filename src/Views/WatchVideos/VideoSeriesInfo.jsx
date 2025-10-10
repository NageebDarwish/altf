import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { FiDownload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const VideoSeriesInfo = ({ series, video, contentType }) => {
  const navigate = useNavigate();

  // Don't show series info if this is already a series video
  if (contentType === "series" || !series) {
    return null;
  }

  // Check if the video belongs to a series
  const videoSeries = series?.find(
    (s) => s.videos && s.videos.some((v) => v.id === video?.id)
  );

  if (!videoSeries) {
    return null;
  }

  const handleGoToSeries = () => {
    // Navigate to the series page
    navigate(`/dashboard/series/${videoSeries.id}`, {
      state: {
        series: videoSeries,
        type: "series",
      },
    });
  };

  const handleDownloadSeries = () => {
    // Handle series download
    console.log("Download series:", videoSeries.id);
  };

  return (
    <Box
      sx={{
        borderRadius: "10px",
        bgcolor: "white",
        padding: { xs: "16px", md: "20px" },
        mx: "auto",
        mt: 2,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: { xs: 2, md: 3 },
        alignItems: { xs: "flex-start", md: "center" },
        border: "1px solid #f0f0f0",
      }}
    >
      {/* Series Thumbnail */}
      <Box
        sx={{
          flexShrink: 0,
          width: { xs: "100%", md: "120px" },
          height: { xs: "80px", md: "80px" },
          borderRadius: "8px",
          overflow: "hidden",
          bgcolor: "#f5f5f5",
        }}
      >
        <img
          src={videoSeries.thumbnail || "/placeholder-series.png"}
          alt={videoSeries.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      </Box>

      {/* Series Information */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: "16px", md: "18px" },
            fontWeight: 600,
            mb: 1,
            color: "#333",
            lineHeight: 1.3,
          }}
          className="font-HelveticaNeue"
        >
          {videoSeries.title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            fontSize: { xs: "14px", md: "15px" },
            color: "#666",
            mb: 2,
            lineHeight: 1.4,
          }}
          className="font-HelveticaNeue"
        >
          This video is part of the "{videoSeries.title}" series
          {videoSeries.videos?.length && (
            <span> • {videoSeries.videos.length} videos</span>
          )}
        </Typography>

        {/* Action Buttons */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          sx={{ gap: { xs: "12px", sm: "16px" } }}
        >
          <Button
            variant="contained"
            onClick={handleGoToSeries}
            sx={{
              backgroundColor: "#0C3373",
              color: "white",
              textTransform: "none",
              fontSize: { xs: "14px", md: "15px" },
              fontWeight: 500,
              px: { xs: 2, md: 3 },
              py: 1,
              borderRadius: "6px",
              "&:hover": {
                backgroundColor: "#0a2a5c",
              },
            }}
            className="font-HelveticaNeue"
          >
            Go to Series
          </Button>

          <Button
            variant="outlined"
            onClick={handleDownloadSeries}
            startIcon={<FiDownload />}
            sx={{
              borderColor: "#0C3373",
              color: "#0C3373",
              textTransform: "none",
              fontSize: { xs: "14px", md: "15px" },
              fontWeight: 500,
              px: { xs: 2, md: 3 },
              py: 1,
              borderRadius: "6px",
              "&:hover": {
                borderColor: "#0a2a5c",
                backgroundColor: "#f8f9ff",
              },
            }}
            className="font-HelveticaNeue"
          >
            Download Series
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default VideoSeriesInfo;
