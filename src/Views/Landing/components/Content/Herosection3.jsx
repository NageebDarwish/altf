import React from 'react';
import CustomLanding from './CustomLanding';

const Herosection3 = () => {
  const data = [
    {
      imageSrc: "/headphone.png",
      title: "Effortless Fluency",
      description:
        "Forget memorization and tedious grammar rules. Just press play and enjoy our comprehensible input content—the most effective and scientifically proven approach to building natural fluency.",
    },
    {
      imageSrc: "/pic5.png",
      title: "Engaging Content",
      description:
        "Explore the largest library of expertly crafted, natively shot Arabic comprehensible input videos, tailored to every level—from superbeginner to advanced.",
    },
    {
      imageSrc: "/morning.png",
      title: "Progress Tracking ",
      description:
        "Stay focused, track your improvement, and know exactly how close you are to reaching your fluency goals.",
    },
    {
      imageSrc: "/walk.png",
      title: "Cultural Immersion",
      description:
        "Gain a deeper understanding of Arabic by experiencing its culture and traditions—making your learning richer and more meaningful.",
    },
    {
      imageSrc: "/group.png",
      title: "Community",
      description:
        "Stay inspired and supported by joining our vibrant community where we exchange insights and celebrate progress together.",
    },
  ];

  return (
    <div className="p-6 bg-white sm:p-8 lg:p-12 font-helvetica">
      {data.map((item, index) => (
        <CustomLanding
          key={index}
          imageSrc={item.imageSrc}
          title={item.title}
          description={item.description}
          isImageRight={index % 2 !== 1}
        />
      ))}
    </div>
  );
};

export default Herosection3;
