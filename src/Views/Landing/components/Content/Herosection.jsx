import PropTypes from "prop-types";
import { Container } from "@components/common";

const Herosection = ({ scrollToInput }) => {
  Herosection.propTypes = {
    scrollToInput: PropTypes.func.isRequired,
  };
  return (
    <Container className="bg-white overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div className="flex flex-col justify-center py-8 md:py-12 lg:py-16">
          <h1 className="text-[32px] sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-extrabold font-pally text-[#0C3373] lg:leading-[80px]">
            Learn{" "}
            <span className="relative">
              Arabic
              <img
                src="/Vector 14.png"
                alt=""
                className="absolute left-0 -bottom-3"
              />
            </span>{" "}
            effortlessly{" "}
            <span className="text-[#3b73cc] lg:leading-[80px]">
              {" "}
              just by watching videos!
            </span>
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl lg:text-2xl text-[#0C3373]/70 font-HelveticaNeue font-[500]">
            We create comprehensible input videos that make mastering Arabic fun
            and effortless.
          </p>
          <button
            onClick={scrollToInput}
            className="mt-6 bg-[#F28327] text-sm sm:text-base md:text-lg lg:text-xl text-white font-HelveticaNeue px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-[#E66A00] transition md:w-fit w-full "
          >
            Get started
          </button>
        </div>
        <div className="relative w-full md:flex justify-center items-center hidden">
          <img
            src="/sheela.webp"
            alt="Happy Learning"
            className="w-auto h-[40vh] lg:h-[50vh] xl:h-[60vh] rounded-lg object-contain border-4 border-white"
          />
        </div>
      </div>
    </Container>
  );
};

export default Herosection;
