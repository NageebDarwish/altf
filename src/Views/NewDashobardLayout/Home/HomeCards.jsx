import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import { request } from '../../../services/axios';

const HomeCards = () => {

  const [cardData, setcardData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getAllPosts = async () => {
    try {
      setLoading(true);
      const res = await request({
        method: "get",
        url: "api/latest-posts",
      });
      setcardData(res.data.payload);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllPosts();
  }, []);
  const levelColorMap = {
    "Level 1": "bg-green-500",
    "Level 2": "bg-blue-500",
    "Level 3": "bg-yellow-500",
    "Level 4": "bg-purple-500",
    "Level 5": "bg-pink-500",
    "Level 6": 'bg-indigo-500',
    "Level 7": 'bg-teal-500',
    "Level 8": 'bg-orange-500',
    "Level 9": 'bg-cyan-500',
    "Level 10": 'bg-red-500',

  };

  const getLevelColor = (levelName) => {
    return levelColorMap[levelName] || "bg-gray-600";
  };

  const NextArrow = ({ onClick }) => (
    <div
      className="absolute right-3 top-28 transform -translate-y-1/2 text-white p-2 rounded-full cursor-pointer z-10"
      onClick={onClick}
    >
      <CiCircleChevRight size={25} />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div
      className="absolute left-3 top-28 transform -translate-y-1/2 text-white p-2 rounded-full cursor-pointer z-10"
      onClick={onClick}
    >
      <CiCircleChevLeft size={25} />
    </div>
  );


const settings = {
  infinite: cardData.length > 1,
  speed: 500,
  slidesToShow: Math.min(cardData.length, 2), // Show only how many cards exist
  slidesToScroll: 1,
  arrows: cardData.length > 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: Math.min(cardData.length, 3),
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: Math.min(cardData.length, 2),
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};


  const truncateText = (text, wordLimit) => {
  const words = text.split(" ");
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : text;
};


  return (
    <div className="w-full max-w-screen-sm lg:max-w-screen-sm  xxl:max-w-screen-md mx-auto ">
      <Slider {...settings}>
        {cardData.map((card, index) => (
          <div key={index} className="px-1">
            <div className="relative w-[] h-44 bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg">
              <div
                className="absolute inset-0 bg-contain bg-no-repeat bg-center"
                style={{ backgroundImage: `url(${card.file})`, opacity: 0.4 }}
              ></div>
              <div className="absolute inset-0 flex flex-col justify-between py-4 px-2">
                <div className='flex flex-col'>
                  <h3 className="text-dashboardparasize font-HelveticaNeue font-semibold">{card.subject}</h3>
                  {card.body && (
                    <div
                      className="text-[14px] font-HelveticaNeue text-white mt-2 sm:text-[14px] md:text-[14px]"
                      dangerouslySetInnerHTML={{ __html: truncateText(card.body, 8) }}
                    />

                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={card.user.profile_image || "/doggirl.png"}
                      alt="User"
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-[12px] font-HelveticaNeue">{card.user.name}</span>
                  </div>
                  <span className={`px-2 py-1 font-HelveticaNeue rounded-full text-[12px] text-white ${getLevelColor(card.user?.progress_level?.name)}`}>
                    {card.user?.progress_level?.name}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default HomeCards
