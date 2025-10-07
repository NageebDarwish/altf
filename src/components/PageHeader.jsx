import PropTypes from "prop-types";
import viewData from "../assets/picture/viewData.png";

const PageHeader = ({ title, description }) => {
  return (
    <div className="container">
      <div className="grid grid-cols-1 sm:grid-cols-12 font-helvetica">
        {/* Left Side (Text) */}
        <div className="col-span-12 sm:col-span-5 text-heading py-0  inline-block border-b">
          <div className="flex flex-col mt-4 gap-4">
            <h1 className="text-textsmallheading md:text-left text-center font-pally md:text-[72px] font-bold text-heading">
              {title}
            </h1>
            <p className="text-[14px] sm:text-xl font-[500] font-HelveticaNeue text-heading/90 mb-8 leading-7">
              {description}
            </p>
          </div>
        </div>

        {/* Right Side (Image with Background) */}
        <div className="col-span-12 sm:col-span-7 mt-4 inline-block border-b">
          <div className="flex items-center justify-center sm:justify-end gap-4 flex-wrap relative">
            <div className="relative w-full max-w-[366px]">
              {/* Background Box */}
              <div className="bg-[#ACFFB6]/50 w-full h-[220px] xs:h-[240px] sm:h-[280px] lg:h-[314px]"></div>

              <div className="absolute inset-0 sm:-left-10 lg:-left-20 flex items-center justify-center">
                <img
                  src={viewData}
                  alt=""
                  className="w-[90%] sm:w-[90%] md:w-[100%] lg:w-[384px] h-auto max-h-[252px] object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default PageHeader;
