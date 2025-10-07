import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Container } from "@components/common";

const Team = () => {
  const navigate = useNavigate();

  const handlenavigate = () => {
    navigate("/about");
  };

  return (
    <Box
      sx={{
        backgroundImage:
          window.innerWidth <= 1050 ? "none" : `url('/aboutback.webp')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
      className="sm:flex hidden items-center justify-center "
    >
      <Container className="flex flex-col lg:flex-row items-center lg:justify-between gap-8 md:gap-12 lg:gap-16 xl:gap-24">
        {/* Text Section - Appears First on Small Screens */}
        <div className="text-center lg:text-left lg:w-1/2 space-y-6 md:space-y-8 order-1 lg:order-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-heading font-pally">
            Our team
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-heading/70 font-medium">
            We are a team of language enthusiasts dedicated to creating
            comprehensible input videos to help you master Arabic naturally,
            just like you mastered your first language.
          </p>
          <button
            onClick={handlenavigate}
            className="mt-6 text-lg md:text-xl font-[500] bg-dashboardPrimary text-white px-6 py-3 rounded-full hover:bg-orange-600 transition"
          >
            Learn More About Us
          </button>
        </div>

        {/* Left Side - Images */}
        <div className="flex flex-col gap-4 md:gap-6 order-2 lg:order-1">
          <div className="relative w-[200px] sm:w-[220px] md:w-[250px] lg:w-[270px] h-[250px] sm:h-[280px] md:h-[300px]">
            <img
              src="/image (1).png"
              alt="Hasan"
              className="w-full h-full object-cover rounded-[15px]"
            />
            <span className="absolute bottom-[-6%] left-1/2 z-50 transform -translate-x-1/2 bg-yellow-400/90 text-white px-6 md:px-8 py-2 text-sm md:text-base font-semibold rounded-lg shadow-lg">
              Hasan
            </span>
          </div>

          <div className="relative w-[200px] sm:w-[220px] md:w-[250px] lg:w-[270px] h-[250px] sm:h-[280px] md:h-[300px]">
            <img
              src="/image (2).png"
              alt="Aya"
              className="w-full h-full object-cover rounded-[15px]"
            />
            <span className="absolute bottom-[-6%] left-1/2 z-50 transform -translate-x-1/2 bg-yellow-400/90 text-white px-6 md:px-8 py-2 text-sm md:text-base font-semibold rounded-lg shadow-lg">
              Aya
            </span>
          </div>
        </div>

        {/* Right Side - Single Image */}
        <div className="relative w-[200px] sm:w-[220px] md:w-[250px] lg:w-[300px] h-[350px] sm:h-[380px] md:h-[400px] rounded-lg shadow-lg xl:-top-6 xl:-left-16 order-3 lg:order-1">
          <img
            src="/image.png"
            alt="Batoul"
            className="w-full h-full object-cover rounded-[15px]"
          />
          <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-yellow-400/80 text-white px-6 md:px-8 py-2 text-sm md:text-base font-semibold rounded-lg">
            Batoul
          </span>
        </div>
      </Container>
    </Box>
  );
};

export default Team;
