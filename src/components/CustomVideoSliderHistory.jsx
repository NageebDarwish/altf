import React, { useState } from "react";
import Slider from "react-slick";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import YoutubeCard from "../Views/WatchVideos/YoutubeCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaAngleRight } from "react-icons/fa6";

const CustomVideoSliderHistory = ({ title = "Custom Video Slider", icon, data }) => {
  const [loading, setLoading] = useState(false);
  console.log(data, 'datadatasdklmcd')
  const PrevArrow = ({ onClick }) => (
    <>
      <div
        className="custom-arrow left-[-18px] hidden top-1/2 bg-btnbackground text-white w-8 h-8 md:flex items-center justify-center rounded-full absolute z-10 cursor-pointer"
        onClick={onClick}
      >
        <FaArrowLeft />
      </div>
    </>
  );

  const NextArrow = ({ onClick }) => (
    <>
      <div
        className="custom-arrow right-[-18px] top-1/2 bg-btnbackground text-white w-8 h-8 hidden md:flex items-center justify-center rounded-full absolute z-10 cursor-pointer"
        onClick={onClick}
      >
        <FaArrowRight />
      </div>
    </>
  );

  const slidesToShow = data?.length >= 3 ? 3 : data?.length || 3;
  const settings = {
    dots: false,
    infinite: data?.length > 1,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    autoplay: data?.length > 1,
    autoplaySpeed: 2000,
    // arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: Math.min(data?.length, 2) } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
    ],
  };




  return (
    <div className="w-full pt-5 px-1">

      <div className="flex justify-between">
        <div className="flex items-center gap-2 mb-5">
          {icon && <span className="text-2xl text-heading">{icon}</span>}
          <h1 className="text-[15px] sm:text-[25px] md:text-[32px] font-bold text-[#0C3373] font-pally">
            {title}
          </h1>
        </div>
        <div>
          <a href="#" className="flex gap-1 text-orange-500 font-semibold">View All <FaAngleRight className="mt-1" /></a>
        </div>
      </div>


      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" width="100%" height="300px">
          <CircularProgress color="secondary" />
        </Box>
      ) : data?.length > 0 ? (
        <Slider {...settings}>
          {data.map((video, index) => (
            <div key={index} className="px-1">
              <YoutubeCard
                video={video}
                Vediotitle={video.title || title}
                videoUrl={video?.video?.video || video?.video}
                title={video?.title}
                description={video?.description}
                buttonText={video?.level}
                videoDuration={video?.videoDuration}
                backgroundImage={video?.backgroundImage}
                showDownloadIcon={true}
                isPremium={video?.video?.plan === "premium"}
                menuItems={["Add to list"]}
                type="video"
              />
            </div>
          ))}
        </Slider>
      ) : (
        <Box display="flex" alignItems="center" textAlign="center" p={2}>
          {/* <img src="/E-Commerce 02.png" alt="" className="h-[250px] w-[250px]"/> */}
          <p className="text-[15px] md:text-[25px] text-[#737f8a] font-HelveticaNeue font-bold">Your {title} has no videos.</p>
        </Box>
      )}
    </div>
  );
};

export default CustomVideoSliderHistory;