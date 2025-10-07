import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Typography } from "@mui/material";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";

const SuperBeginnerSeriess = ({ title, images = [], icon }) => {
  const navigate=useNavigate()
  const PrevArrow = ({ onClick }) => (
    <>
    <div
      className="custom-arrow left-[-25px] bg-orange-500 text-white w-8 h-8 hidden ml-2 md:flex items-center justify-center rounded-full absolute z-10 cursor-pointer top-1/2 transform -translate-y-1/2"
      onClick={onClick}
      >
      <FaArrowLeft className="text-sm" />
    </div>
      </>
  );
  
  const NextArrow = ({ onClick }) => (
    <>
    <div
      className="custom-arrow right-[-25px] bg-orange-500 text-white w-8 h-8 hidden mr-2 md:flex items-center justify-center rounded-full absolute z-10 cursor-pointer top-1/2 transform -translate-y-1/2"
      onClick={onClick}
      >
      <FaArrowRight className="text-sm" />
    </div>
      </>
  );

  const slidesToShow = Math.min(4, images.length);

  const settings = {
    dots: false,
    infinite: images.length > 1,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: images.length > 1,
    autoplaySpeed: 2000,
    arrows: images.length > 1,
    nextArrow: images.length > 1 ? <NextArrow /> : null,
    prevArrow: images.length > 1 ? <PrevArrow /> : null,
    responsive: [
      {
        breakpoint: 1024,
        settings: { 
          slidesToShow: Math.min(3, images.length),
          arrows: images.length > 1,
          infinite: images.length > 1
        },
      },
      {
        breakpoint: 768,
        settings: { 
          slidesToShow: Math.min(2, images.length),
          arrows: false,
          infinite: images.length > 1
        },
      },
      {
        breakpoint: 480,
        settings: { 
          slidesToShow: 3,
          arrows: false,
          infinite: images.length > 1
        },
      },
    ],
  };

   const handlenavigateplay = (videoId, item) => {
    navigate(`/dashboard/watch/${videoId}`, { state: { video: item, type: 'series', allVideos: images[0].videos} });
  };


  return (
    <div className="w-full pt-5 relative px-1">
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
      
      {images.length > 0 ? (
        <Slider {...settings}>
          {images.map((img, index) => (
            <div key={index} className=" font-HelveticaNeue focus:outline-none">
              <div className="p-1">
                <img
                onClick={() => handlenavigateplay(img.series.videos[1].video, img.series)}
                  src={img.series.thumbnail}
                  alt={`Slide ${index}`}
                  className="w-full h-48 sm:h-80 object-cover rounded-[10px]  md:rounded-xl shadow-md hover:shadow-lg transition-shadow"
                />
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <Box 
          display="flex" 
          sx={{ flexDirection: { xs: "column", md: "row" } }} 
          p={2}
        >
          {/* <img src="/E-Commerce 02.png" alt="" className="h-[250px] w-[250px]" /> */}
         <p className="text-[15px] md:text-[25px] text-[#737f8a] font-HelveticaNeue font-bold">Your {title} has no videos.</p>
        </Box>
      )}
    </div>
  );
};

export default SuperBeginnerSeriess;