import { useState, useEffect } from "react";
import { Box, Typography, IconButton, CircularProgress } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SeriesModalCard from "./SeriesModalCard";
import axios from "axios";
import { useSelector } from "react-redux";

const SuperBeginnerSeries = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [series, setSeries] = useState([]);
  const [detailedSeries, setDetailedSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCards, setVisibleCards] = useState(5);

  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 768) {
        setVisibleCards(3);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(4);
      } else {
        setVisibleCards(5);
      }
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  const fetchDetailedSeries = async (seriesList) => {
    try {
      const detailedPromises = seriesList.map((item) =>
        axios
          .get(
            `https://admin.arabicallthetime.com/api/series/show/${item.series_id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => response.data.payload)
      );

      const results = await Promise.allSettled(detailedPromises);
      const fulfilledData = results
        .filter((result) => result.status === "fulfilled")
        .map((result) => result.value);

      const rejectedErrors = results
        .filter((result) => result.status === "rejected")
        .map((result) => result.reason);

      if (rejectedErrors.length > 0) {
        console.warn("Some series detail fetches failed:", rejectedErrors);
      }

      setDetailedSeries(fulfilledData);
    } catch (err) {
      console.error("Error fetching detailed series:", err);
    }
  };

  useEffect(() => {
    const fetchSeries = async () => {
      if (!token) {
        setError("Authentication required to see series.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "https://admin.arabicallthetime.com/api/user/series/timeline/videos",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const seriesList = response.data.payload;
        setSeries(seriesList);
        fetchDetailedSeries(seriesList);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error("Error fetching series:", err);
      }
    };

    fetchSeries();
  }, [token]);

  const handleNext = () => {
    if (currentIndex + visibleCards < detailedSeries.length) {
      setCurrentIndex(currentIndex + visibleCards);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(Math.max(0, currentIndex - visibleCards));
    }
  };

  if (loading) {
    return (
      <Box sx={{ padding: "16px" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ position: "relative", padding: "16px 16px 0px 16px" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography className="text-[20px] sm:text-[25px] md:text-[32px] font-bold text-[#0C3373] font-pally">
          Continue watching
        </Typography>

        <Box sx={{ display: "flex" }}>
          <IconButton
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            sx={{
              color: currentIndex === 0 ? "rgba(0, 0, 0, 0.3)" : "#ff6d00",
            }}
          >
            <ChevronLeftIcon sx={{ fontSize: "36px" }} />
          </IconButton>

          <IconButton
            onClick={handleNext}
            disabled={currentIndex + visibleCards >= detailedSeries.length}
            sx={{
              color:
                currentIndex + visibleCards >= detailedSeries.length
                  ? "rgba(0, 0, 0, 0.3)"
                  : "#ff6d00",
            }}
          >
            <ChevronRightIcon sx={{ fontSize: "36px" }} />
          </IconButton>
        </Box>
      </Box>

      <Box
        sx={{
          overflow: "hidden",
          width: "100%",
          padding: "8px 0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            transition: "transform 0.3s ease-out",
            transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
            willChange: "transform",
            gap: { xs: "5px", md: "10px" },
          }}
        >
          {series
            .filter((item) => item.series_video?.status !== "private")
            .map((item, index) => {
              const detailedItem =
                detailedSeries.find((ds) => String(ds.id) === item.series_id) ||
                {};

              return (
                <Box
                  key={index}
                  sx={{
                    flex: `0 0 calc(${100 / visibleCards}% - ${
                      (20 * (visibleCards - 1)) / visibleCards
                    }px)`,
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "scale(1.02)",
                    },
                  }}
                >
                  <SeriesModalCard
                    id={item.series_id}
                    video={item.series_video}
                    seriesData={detailedItem}
                  />
                </Box>
              );
            })}
        </Box>
      </Box>
    </Box>
  );
};

export default SuperBeginnerSeries;
