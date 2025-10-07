import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

const SeriesModalCard = ({ video, image, allvideoss, allseeingvideo, seriesData, data }) => {
  const navigate = useNavigate();
  console.log(video,'videoadcmsdkcmsdkl')
  const [showPremiumMessage, setShowPremiumMessage] = useState(false);
  const user = useSelector((state) => state.user.user);

  const isPremium = (user === null || user?.is_premium === "0") && video.plan === "premium";
  const isPrivate = video?.status === "private";
  
  if (isPrivate) {
    return null;
  }

  const handlePremiumClick = () => {
    setShowPremiumMessage(true);
  };

  const handlePlay = (videoId, item, selectedVideo) => {
    if (isPremium) {
      handlePremiumClick();
      return;
    }
    navigate(`/dashboard/watch/${videoId}`, {
      state: { 
        video: video, 
        videodata: item, 
        type: 'series', 
        allVideos: item.videos 
      },
    });
  };

  const thumbnailUrl = `https://img.youtube.com/vi/${video?.video}/hqdefault.jpg`;
  const userId = user?.id;
  const userTimeline = video?.timeline?.find(time => time.user_id === String(userId));
  const watchedSeconds = parseFloat(userTimeline?.progress_time || 0);
  const totalSeconds = parseFloat(video?.duration_seconds || 1); // Avoid division by zero
  const playedPercentage = totalSeconds > 0 ? (watchedSeconds / totalSeconds) * 100 : 0;

  return (
    <Card
      sx={{
        width: "100%",
        height: 'full',
        borderRadius: "8px",
        position: "relative",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        },
      }}
      onClick={() => handlePlay(video?.video, seriesData, seriesData.videos[0])}
    >
      {isPremium && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "20px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {showPremiumMessage ? (
            <Box sx={{ 
              bgcolor: '#FF7300', 
              p: 1.5,
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <FaLock />
              <Typography variant="body2" fontWeight="medium">
                Go Premium to Watch
              </Typography>
            </Box>
          ) : (
            <FaLock fontSize="large" />
          )}
        </Box>
      )}
     
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          sx={{
            height: 230,
            objectFit: 'cover',
            width: '100%'
          }}
          image={thumbnailUrl}
          alt={video.title}
        />
        
        {/* Progress Bar */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '4px',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
          }}
        >
          <Box
            sx={{
              width: `${playedPercentage}%`,
              height: '100%',
              backgroundColor: '#F28327',
            }}
          />
        </Box>
      </Box>

      {video?.locked && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
        >
          <LockIcon sx={{ color: "white", fontSize: "30px" }} />
        </Box>
      )}
    </Card>
  );
};

export default SeriesModalCard;