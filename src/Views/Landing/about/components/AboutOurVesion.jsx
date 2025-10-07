import { useNavigate } from "react-router-dom";
import Container from "../../../../components/common/Container";

const AboutOurVesion = ({
  title,
  description1,
  img,
  btnlabel,
  reverse,
  btnlink,
}) => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    if (btnlink) {
      navigate(btnlink);
    }
  };
  return (
    <>
      <Container className="py-8 md:py-12">
        <div
          className={`flex flex-col-reverse md:flex-row items-center justify-between gap-4 md:gap-8 bg-white w-full ${
            reverse ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* Image Section */}
          <img
            src="/Group 1261153797.webp"
            alt={title}
            className="w-full md:w-2/5 h-auto md:h-[430px] object-cover rounded-lg"
          />

          {/* Text Section */}
          <div className="text-center md:text-left max-w-full md:max-w-[45%]">
            <h2 className="text-textsmallheading font-pally text-heading md:text-textheading text-headingcolor font-bold mb-2">
              {title}
            </h2>

            <p className="text-start sm:text-xl text-heading font-HelveticaNeue text-[14px] leading-7 mb-2">
              {description1}
            </p>

            <button
              onClick={handleButtonClick}
              className="bg-dashboardPrimary md:text-btntextsize text-[14px] font-HelveticaNeue text-white px-6 py-4 my-4 rounded-full hover:bg-hoverbtn transition"
            >
              {btnlabel}
            </button>
          </div>
        </div>

        {/* Bottom Image */}
      </Container>
      <div>
        <img
          src="/angle.png"
          alt="img"
          className="h-[100px] w-full object-contain"
        />
      </div>
    </>
  );
};

export default AboutOurVesion;
