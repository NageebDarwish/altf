import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";

const cardData = [
  {
    title: "How did the hearing method work for me to speak Arabic?",
    user: "User Name",
    level: 5,
    bgImage: "/popular1.webp",
    levelColor: "bg-yellow-500",
    profileimage: "/doggirl.webp",
  },
  {
    title: "How Learning new Language can change your life?",
    user: "User Name",
    level: 8,
    bgImage: "/popular2.webp",
    levelColor: "bg-orange-500",
    profileimage: "/doggirl.webp",
  },
  {
    title: "How do I make this method of learning effective? by watching sports",
    user: "User Name",
    level: 2,
    bgImage: "/popular3.webp",
    levelColor: "bg-yellow-400",
    profileimage: "/doggirl.webp",
  },
  {
    title: "How do I make this method of learning effective? by watching sports",
    user: "User Name",
    level: 6,
    bgImage: "/popular3.webp",
    levelColor: "bg-blue-600",
    profileimage: "/doggirl.webp",
  },
  {
    title: "Benefits of learning through immersion",
    user: "User Name",
    level: 4,
    bgImage: "/popular2.webp",
    levelColor: "bg-green-500",
    profileimage: "/doggirl.webp",
  },
];

const NextArrow = ({ onClick }) => (
  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full cursor-pointer z-10" onClick={onClick}>
    <CiCircleChevRight size={25} />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full cursor-pointer z-10" onClick={onClick}>
    <CiCircleChevLeft size={25} />
  </div>
);

const Cards = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />, 
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1536,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 1030,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 900,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 800,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
      {
        breakpoint: 475,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="w-full md:max-w-4xl lg:max-w-5xl xl:max-w-7xl bg-gray-100 p-2">
      <Slider {...settings}>
        {cardData.map((card, index) => (
          <div key={index} className="px-2">
            <div className="relative w-full h-48 bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${card.bgImage})`, opacity: 0.6 }}
              ></div>
              <div className="absolute inset-0 flex flex-col justify-between p-4">
                <h3 className="text-[10px] xl:text-sm font-HelveticaNeue font-semibold">{card.title}</h3>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <img
                      src={card.profileimage}
                      alt="User"
                      className="w-7 h-7 rounded-full"
                    />
                    <span className="text-sm font-HelveticaNeue">{card.user}</span>
                  </div>
                  <span className={`px-2 py-1 font-HelveticaNeue lg:py-0 lg:px-1 rounded-full md:text-[8px] lg:text-sm text-white ${card.levelColor}`}>
                    Level {card.level}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Cards;
