import { useNavigate } from "react-router-dom";
import Container from "../../../../components/common/Container";
import DonorboxButton from "../../../../components/DonorboxButton";

const AboutMession = ({
  title,
  description1,
  img,
  btnlabel,
  reverse,
  description2,
  btnlink,
}) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (btnlink) {
      navigate(btnlink);
  }
  };

  return (
    <Container className="py-8 md:py-12">
      <div
        className={`flex flex-col-reverse ${
          reverse ? "md:flex-row-reverse" : "md:flex-row"
        } items-center gap-12 bg-white max-w-full border-b pb-8`}
      >
        {/* Image Section */}
        <div className="relative w-full md:w-1/2 lg:w-1/2 h-full md:h-[400px] lg:h-[496px]">
          <div className="absolute bottom-8 left-0 w-full h-full bg-[#F3FCF5] rounded-lg" />

          {/* Image */}
          <img
            src={img}
            alt={title}
            className="w-[90%] h-full object-cover rounded-2xl relative z-10 mx-auto"
          />
        </div>

        {/* Text Section */}
        <div className="text-center md:text-left max-w-[600px]">
          <h2 className="text-textsmallheading font-pally text-heading md:text-textheading text-headingcolor font-bold mb-4">
            {title}
          </h2>

          <p className="text-start sm:text-xl text-heading font-HelveticaNeue text-[14px] leading-7 mb-4">
            {description1}
          </p>
          <p className="text-start sm:text-xl text-heading font-HelveticaNeue text-[14px] leading-7 mb-4">
            {description2}
          </p>

          <button
            onClick={handleButtonClick}
            className="bg-dashboardPrimary md:text-btntextsize text-[14px] font-HelveticaNeue text-white px-6 py-4 rounded-full hover:bg-hoverbtn transition"
          >
            {btnlabel}
          </button>
        </div>
      </div>
      
    </Container>
  );
};

export default AboutMession;
