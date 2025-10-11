// import CookingColombian from "./CookingColombian";
// import { useEffect, useState } from "react";
// import { request } from "../../services/axios";
// import ToastComp from "../../components/toast/ToastComp";
// import { Box, CircularProgress } from "@mui/material";
// import SuperBeginnerSeries from "./SuperBeginnerSeries";
// const TrendingSeries = () => {
//   const [series, setSeries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   console.log(series,"seriresData")
//   useEffect(() => {
//     const fetchSeries = async () => {
//       try {
//         const response = await request({
//           url: "api/series",
//           method: "get",
//         });

//         if (response?.status === 200) {
//           setSeries(response.data.payload);
//         }
//       } catch (error) {
//         console.log("Error fetching video data:", error);
//         ToastComp({
//           variant: "error",
//           message: "Failed to fetch videos. Please try again later.",
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSeries();
//   }, []);

//   return (
//     <div className="grid grid-cols-12 gap-3">
//       <div className=" col-span-12 p-3 ">
//         {loading ? (
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               width: "100%",
//               height: "300px",
//             }}
//           >
//             <CircularProgress color="secondary" />
//           </Box>
//         ) : (
//           <div className="flex flex-col gap-6 px-5">
//             <CookingColombian series={series} />
//             <SuperBeginnerSeries series={series} />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TrendingSeries;

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Box, CircularProgress } from "@mui/material";
import CookingColombian from "./CookingColombian";
import SuperBeginnerSeries from "./SuperBeginnerSeries";
import { request } from "../../services/axios";
import ToastComp from "../../components/toast/ToastComp";
import SuperBeginnerSeriess from "./SuperBeginnerSeriess";
import { setSeriesList } from "../../store/SeriesSlice/seriesSlice";
import SeriesSlider from "./SeriesSlider";

const TrendingSeries = () => {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await request({
          url: "api/series",
          method: "get",
        });
        if (response?.status === 200) {
          setSeries(response.data.payload);
          dispatch(setSeriesList(response.data.payload));
        }
      } catch (error) {
        console.log("Error fetching video data:", error);
        ToastComp({
          variant: "error",
          message: "Failed to fetch videos. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSeries();
  }, [dispatch]);

  const beginnerSeries = series.filter(
    (item) => item?.level?.name === "Beginner"
  );
  const intermediateSeries = series.filter(
    (item) => item?.level?.name === "Intermediate"
  );
  const advancedSeries = series.filter(
    (item) => item?.level?.name === "Advanced"
  );
  console.log(series, "seriesseriesseries12344");
  return (
    <div className="grid grid-cols-12 items-start justify-start">
      <div className="col-span-12 md:p-3">
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
          <div className="flex flex-col md:px-5  mt-10 md:mt-0 mb-10 md:mb-0">
            <CookingColombian series={series} />
            <SuperBeginnerSeries series={series} />
            {beginnerSeries.length > 0 && (
              <SeriesSlider title="Beginner series" series={beginnerSeries} />
            )}

            {/* <SeriesSlider title={"Beginner series"} videos={[
              { id: 1, src: "/Rectangle 9594.png", title: "Stylish Show" },
              { id: 2, src: "/Rectangle 9595.png", title: "Disney Character" },
              { id: 3, src: "/Rectangle 9596.png", title: "Woolly Friend" },
              { id: 4, src: "/bignner7.png", title: "Fruitful Discoveries" },
              { id: 5, src: "/beginner5.png", title: "Spot The Differences" },
            ]} /> */}

            {intermediateSeries.length > 0 && (
              <SeriesSlider
                title="Intermediate series"
                series={intermediateSeries}
              />
            )}
            {/* <SeriesSlider title={"Upper Intermdiate series"} videos={[
              { id: 1, src: "", title: "Stylish Show" },
              { id: 2, src: "", title: "Disney Character" },
              { id: 3, src: "", title: "Woolly Friend" },
              { id: 4, src: "", title: "Fruitful Discoveries" },
              { id: 5, src: "", title: "Spot The Differences" },
            ]} /> */}

            {advancedSeries.length > 0 && (
              <SeriesSlider title="Advanced series" series={advancedSeries} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendingSeries;
