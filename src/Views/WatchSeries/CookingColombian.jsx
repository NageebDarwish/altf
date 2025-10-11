import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import VideoSeriesModal from "./VideoSeriesModal";
import { useSelector, useDispatch } from "react-redux";
import { GiNetworkBars } from "react-icons/gi";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { PiTimerBold } from "react-icons/pi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  FaArrowLeft,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const CookingColombian = ({ series }) => {
  const [isOpenVideoModal, setIsOpenVideoModal] = useState(false);
  const [selectedSeries, setSelectedSeries] = useState(null);
  const [showPremiumMessage, setShowPremiumMessage] = useState(false);
  const location = useLocation();
  const images = ["/teamm3.webp", "/teamm1.webp", "/team2.webp", "/pizza.webp"];
  const navigate = useNavigate();
  const [sliderHeight, setSliderHeight] = useState("h-[470px]");
  console.log(series, "seriesseries");
  const handleOpen = (seriesItem) => {
    setSelectedSeries(seriesItem);
    setIsOpenVideoModal(true);
  };

  const handleClose = () => {
    setIsOpenVideoModal(false);
    setSelectedSeries(null);
  };

  useEffect(() => {
    if (location.pathname === "/dashboard/profile") {
      setSliderHeight("h-[270px]");
    } else {
      setSliderHeight("h-[470px]");
    }
  }, [location.pathname]);

  const PrevArrow = ({ onClick }) => (
    <div
      className="custom-arrow left-0 md:left-[-18px] top-1/3 md:top-1/2 md:bg-btnbackground text-white w-10 h-10 flex items-center justify-center rounded-full absolute z-10 cursor-pointer"
      onClick={onClick}
    >
      <FaChevronLeft />
    </div>
  );

  const NextArrow = ({ onClick }) => (
    <div
      className="custom-arrow right-0 md:right-[-18px] top-1/3 md:top-1/2 md:bg-btnbackground text-white w-10 h-10 flex items-center justify-center rounded-full absolute z-10 cursor-pointer"
      onClick={onClick}
    >
      <FaChevronRight />
    </div>
  );

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    fade: true,
  };

  const isVideoPlayable = (video) => {
    return video.status === "public" && video.plan !== "premium";
  };

  const handlenavigateplay = (videoId, item, selectedVideo) => {
    const playableVideos = item.videos.filter((video) =>
      isVideoPlayable(video)
    );
    navigate(`/dashboard/watch/${videoId}`, {
      state: {
        video: selectedVideo,
        videodata: item,
        type: "series",
        allVideos: playableVideos,
      },
    });
  };

  const calculateTotalDuration = (videos) => {
    // Filter only playable videos for duration calculation
    const playableVideos = videos.filter((video) => isVideoPlayable(video));
    // const totalSeconds = playableVideos.reduce((sum, video) => sum + (video.duration_seconds || 0), 0);
    const totalSeconds = playableVideos.reduce(
      (sum, video) => sum + Number(video.duration_seconds || 0),
      0
    );

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  return (
    <div className="relative">
      <Slider {...settings}>
        {series.map((item, index) => {
          // Find first playable video
          const firstPlayableVideo = item.videos?.find((video) =>
            isVideoPlayable(video)
          );
          // Count only playable videos
          const playableVideos = item.videos?.filter((video) =>
            isVideoPlayable(video)
          );
          return (
            <div key={index}>
              <div
                style={{
                  backgroundImage: `url(${item.thumbnail || "/teamm3.png"})`,
                }}
                className={`${sliderHeight} relative cover ${
                  location.pathname == "/dashboard/profile"
                    ? "h-[20vh] md:h-[40vh]"
                    : "h-[50vh] md:h-[55vh]"
                }  p-2 bg-cover bg-center md:rounded-[10px]`}
              >
                <div className="absolute inset-0 bg-black/30 md:rounded-xl"></div>

                <div
                  className={`h-full flex flex-col justify-end  text-white relative z-10 pl-4 md:pl-9 pb-6 ${
                    location.pathname == "/dashboard/profile"
                      ? "gap-1 md:gap-2"
                      : "gap-4 md:gap-6"
                  }`}
                >
                  <h1 className="font-bold text-[20px] md:text-[34px] font-poppins">
                    {item.title}
                  </h1>

                  <Box
                    display="flex"
                    gap={1}
                    sx={{
                      flexDirection: "row",
                      alignItems: { xs: "start", md: "center" },
                    }}
                  >
                    <Button
                      startIcon={
                        <img
                          src={
                            item.level.name === "Super Beginner"
                              ? "/begginer.svg"
                              : item.level.name === "Beginner"
                              ? "/begginer.svg"
                              : item.level.name === "Advanced"
                              ? "/advanced.svg"
                              : item.level.name === "Intermediate"
                              ? "/intermidate.svg"
                              : ""
                          }
                          alt="Level"
                          className="h-4 w-4"
                        />
                      }
                      variant="contained"
                      sx={{
                        backgroundColor:
                          item.level.name === "Super Beginner"
                            ? "#08BBE8"
                            : item.level.name === "Beginner"
                            ? "#1CC932"
                            : item.level.name === "Advanced"
                            ? "#0C3373"
                            : item.level.name === "Intermediate"
                            ? "#F2CC08"
                            : "#ccc",
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "12px",
                        textTransform: "capitalize",
                        paddingY: "4px",
                      }}
                    >
                      {item.level.name}
                    </Button>

                    <Typography
                      variant="body2"
                      sx={{
                        color: "#fff",
                        fontSize: { xs: "10px", md: "16px" },
                        display: "flex",
                        alignItems: "end",
                        gap: "px",
                      }}
                    >
                      <MdOutlineVideoLibrary className="h-4 w-4 md:w-6 md:h-6" />
                      {playableVideos?.length || 0} Episode(s) •{" "}
                      <PiTimerBold className="h-4 w-4 md:w-6 md:h-6" />
                      {calculateTotalDuration(item.videos)}
                    </Typography>
                  </Box>

                  <p className="text-md">{item.description}</p>

                  <div className="flex items-center gap-4">
                    {firstPlayableVideo ? (
                      <button
                        onClick={() =>
                          handlenavigateplay(
                            firstPlayableVideo.video,
                            item,
                            firstPlayableVideo
                          )
                        }
                        className={`flex items-center  gap-2  text-white bg-dashboardPrimary ${
                          location.pathname == "/dashboard/profile"
                            ? "px-3 py-1.5 rounded-3xl"
                            : "px-6 py-3 rounded-lg"
                        }`}
                      >
                        <PlayCircleIcon />
                        <span className="font-semibold text-md">Play Now</span>
                      </button>
                    ) : (
                      <button
                        className={`flex items-center gap-2  text-gray-400 bg-gray-200 cursor-not-allowed ${
                          location.pathname == "/dashboard/profile" ? "" : ""
                        }`}
                        disabled
                      >
                        <PlayCircleIcon />
                        <span className="font-semibold text-md">
                          No Available Videos
                        </span>
                      </button>
                    )}

                    <button
                      className={`font-semibold text-md bg-[#fff5e7] text-dashboardPrimary ${
                        location.pathname == "/dashboard/profile"
                          ? "px-3 py-1.5 rounded-3xl"
                          : "px-6 py-3 rounded-lg"
                      }`}
                      onClick={() => handleOpen(item)}
                    >
                      More Info
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>

      <VideoSeriesModal
        open={isOpenVideoModal}
        onClose={handleClose}
        series={[selectedSeries]}
        showPremiumMessage={showPremiumMessage}
        setShowPremiumMessage={setShowPremiumMessage}
      />
    </div>
  );
};

export default CookingColombian;
