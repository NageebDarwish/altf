import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import VideoSeriesModal from "./VideoSeriesModal";
import { Box, Typography } from "@mui/material";
import { FaLock } from "react-icons/fa6";

const SeriesSlider = ({ series, title }) => {

  console.log(series, 'kokokokkokk')
  const navigate = useNavigate()
  const [isOpenVideoModal, setIsOpenVideoModal] = useState(false);
  const [selectedSeries, setSelectedSeries] = useState(null);
  console.log(selectedSeries,'selectedSeries')
    const [showPremiumMessage, setShowPremiumMessage] = useState(false);


  const handleOpen = (seriesItem) => {
   if (seriesItem.plan === 'premium') {
      return;
    }
    setSelectedSeries(seriesItem);
    setIsOpenVideoModal(true);
  };

  const handleClose = () => {
    setIsOpenVideoModal(false);
    setSelectedSeries(null);
  };

    const handlePremiumClick = () => {
    setShowPremiumMessage(true);
    setTimeout(() => setShowPremiumMessage(false), 2000); // Hide message after 2 seconds
  };

  console.log(series, 'videosseriesss   slider');

  const slidesToShow = Math.min(5, series.length);

  const PrevArrow = ({ onClick }) => (
    <>
      <div
      className="custom-arrow -left-10 top-1/3 bg-btnbackground text-white w-10 h-10 hidden md:flex items-center justify-center rounded-full absolute z-10 cursor-pointer"
      onClick={onClick}
      >
      <FaAngleLeft className="text-2xl" />
    </div>
    </>
  );

  const NextArrow = ({ onClick }) => (
    <>
      <div
      className="custom-arrow -right-10 top-1/3 bg-btnbackground text-white w-10 h-10 hidden md:flex items-center justify-center rounded-full absolute z-10 cursor-pointer"
      onClick={onClick}
      >
      <FaAngleRight className="text-2xl" />
    </div>
    </>
  );

  const settings = {
    dots: false,
    infinite: series.length > slidesToShow,
    speed: 500,
  slidesToShow: Math.min(4, series.length),
    slidesToScroll: 1,
      initialSlide: 0, 
    autoplay: series.length > slidesToShow,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: Math.min(5, series.length) },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: Math.min(4, series.length) },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: Math.min(3, series.length) },
      },
    ],
  };

  //   const handleplay = (videoId, item) => {
  //   navigate(`/dashboard/watch/${videoId}`, { state: { video: item, type: 'series', allVideos: series[0].series} });
  // };


  return (
    <div className="w-full px-2  py-5">
      <div className="flex justify-between items-center">
        <h2 className="text-[20px] md:text-[32px] font-bold font-pally text-heading">{title}</h2>
        <a href="#" className="text-orange-500 font-semibold">View All</a>
      </div>

      <Slider {...settings} className="mt-5">
        {series.map((thumbnail) => (
          <div key={thumbnail.topic_id} className="px-1">
            <div className="relative w-full h-44 md:h-64 bg-[#D9D9D9] rounded-[10px] overflow-hidden">
              {thumbnail.thumbnail ? (
                <img
                  // onClick={() => handleplay(thumbnail.videos[0].video, thumbnail)}
                  onClick={() => thumbnail.plan === 'premium' ? handlePremiumClick() : handleOpen(thumbnail)}

                  src={thumbnail.vertical_thumbnail}
                  alt={thumbnail.title}
                  className="w-full h-44 md:h-64 object-cover"
                />
              ) : (
                <div className="w-full h-44 md:h-64 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
               {thumbnail.plan === 'premium' && (
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
                    cursor: "pointer",
                  }}
                  onClick={handlePremiumClick}
                >
                  {!showPremiumMessage ? (
                    <FaLock className="text-3xl" />
                  ) : (
                    <div className="flex gap-2 bg-btnbackground p-2 rounded-lg">
                      <FaLock />
                      <Typography className="font-semibold">
                        Go Premium to Watch
                      </Typography>
                    </div>
                  )}
                </Box>
              )}
            </div>
            {/* <p className="text-center mt-2 text-lg font-semibold">{thumbnail.title}</p> */}
          </div>
        ))}
      </Slider>
      {selectedSeries && (
        <VideoSeriesModal
          open={isOpenVideoModal}
          onClose={handleClose}
          series={[selectedSeries]}
        />
      )}
    </div>
  );
};

export default SeriesSlider;