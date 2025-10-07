import OfferingCard from "./OfferingCard";
import { useNavigate } from "react-router-dom";
import { Container } from "@components/common";

const Herosection2 = () => {
  const navigate = useNavigate();

  const allData = [
    {
      image: "/headphone.webp",
      heading: "Become fluent",
      desc: "Forget memorization and tedious grammar rules. Just press play and enjoy our comprehensible input content—the most effective and scientifically proven approach to building natural fluency.",
    },
    {
      image: "/mensofa.webp",
      heading: "Enjoy entertaining content",
      desc: "Explore the largest library of expertly crafted, natively shot Arabic comprehensible input videos, tailored to every level—from super beginner to advanced.",
    },
    {
      image: "/walk.webp",
      heading: "Immerse in culture",
      desc: "Gain a deeper understanding of Arabic by experiencing its culture and traditions—making your learning richer and more meaningful.",
    },
    {
      image: "/AdobeStock_1029622247 (1) (3).png",
      heading: "Track your progress",
      desc: "Stay focused, track your improvement, and know exactly how close you are to reaching your fluency goals.",
    },
    {
      image: "/offer.webp",
      heading: "Join our community",
      desc: "Stay inspired and supported by joining our vibrant community where we exchange insights and celebrate progress together.",
    },
  ];

  const handlenavigate = () => {
    navigate("/dashboard/videos");
  };
  return (
    <div className="font-helvetica">
      
        <div className="flex items-center justify-center flex-col gap-2 w-full">
          <div className="w-full flex mb-6">
            <h1 className="text-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl sm:px-8 text-center md:text-end font-pally text-bluetext font-bold bg-[#DFFFE5] py-4 md:py-6 rounded-r-[32px] md:w-[60%] w-[90%]">
              Our offerings
            </h1>
          </div>
        </div>
        <Container>
        <p className="text-lg sm:text-xl md:text-xl lg:text-2xl font-HelveticaNeue text-heading/70 md:flex justify-center w-full mt-2 mb-8 md:mb-12 text-center hidden">
          We create entertaining Arabic comprehensible input videos that immerse
          you in Arab culture and build lasting fluency.
        </p>
        <div className="grid grid-cols-1 items-center justify-center md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          {allData.map((item, index) => (
            <div key={index} className="flex items-stretch">
              <OfferingCard
                heading={item.heading}
                desc={item.desc}
                image={item.image}
              />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center mt-8 md:mt-12">
          <button
            onClick={handlenavigate}
            className="py-3 text-base md:text-lg lg:text-xl font-HelveticaNeue bg-[#F28327] text-white px-6 rounded-full hover:bg-hoverbtn transition md:w-fit w-full"
          >
            Start Watching Now
          </button>
        </div>
      </Container>
    </div>
  );
};

export default Herosection2;
