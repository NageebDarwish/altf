import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
} from "@mui/material";
import image from "../../assets/picture/item2.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { request } from "../../services/axios";

const MySeriesList = () => {
  const navigate = useNavigate();
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await request({
          url: "api/series/list",
          method: "get",
        });

        if (response?.status === 200) {
          setSeries(response.data.payload);
        }
      } catch (error) {
        console.log("Error fetching video data:", error);
        // Assuming ToastComp is defined elsewhere for error handling
        ToastComp({
          variant: "error",
          message: "Failed to fetch videos. Please try again later.",
        });
      } finally {
        setLoading(false); // Set loading to false regardless of success or error
      }
    };

    fetchSeries();
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    ); 
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      textAlign="center"
      p={2}
    >
      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
        {series?.length > 0
          ? "My Video Series"
          : "You Don’t have Any Video Series List"}
      </Typography>

      {series?.length > 0 ? (
        <Grid container spacing={3} sx={{ width: "80%", mt: 4 }}>
          {series?.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              {" "}
              {/* 12 columns total; 4 per card */}
              <Card sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h5">{item.series.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.series.description}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle1">Videos:</Typography>
                    {item.series.videos.map((video) => (
                      <Box key={video.id} sx={{ mb: 2 }}>
                        <Typography variant="body2">{video.title}</Typography>
                        <Typography variant="caption">
                          {video.description}
                        </Typography>
                        <iframe
                          width="100%"
                          height="215"
                          src={`https://www.youtube.com/embed/${video.video}`} // Construct the embed link
                          title={video.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          style={{ marginTop: "10px" }} // Add some spacing
                        />
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
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
          <Box sx={{ width: "50%" }}>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet, lorem
              ipsum dolor sit amet, lorem ipsum dolor sit amet.
            </Typography>
          </Box>
        </Box>
      )}

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
  );
};

export default MySeriesList;
