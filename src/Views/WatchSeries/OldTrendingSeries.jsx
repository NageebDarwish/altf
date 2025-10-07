import CookingColombian from "./CookingColombian";
import ContinueWatching from "./ContinueWatching";
import RecentDownloadWatch from "./RecentDownload&Watch";
import { useEffect, useState } from "react";
import { request } from "../../services/axios";
import ToastComp from "../../components/toast/ToastComp";
import { Box, CircularProgress } from "@mui/material"; // Import Box and CircularProgress from MUI

const OldTrendingSeries = () => {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await request({
          url: "api/series",
          method: "get",
        });

        if (response?.status === 200) {
          setSeries(response.data.payload);
        }
      } catch (error) {
        console.log("Error fetching video data:", error);
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

  return (
    <div className="grid grid-cols-12 gap-3">
      <div className=" col-span-12 sm:col-span-11 lg:col-span-9 md:p-3 p-2 sm:px-10">
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
        ) : (
          <div className="flex flex-col gap-6 ">
            <CookingColombian series={series} />
            <ContinueWatching series={series} />
          </div>
        )}
      </div>
      <div className="col-span-3">
        <div className="hidden lg:block">
          <RecentDownloadWatch series={series} />
        </div>
      </div>
    </div>
  );
};

export default OldTrendingSeries;
