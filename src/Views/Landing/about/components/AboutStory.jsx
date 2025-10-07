import { useNavigate } from "react-router-dom";
import Container from "../../../../components/common/Container";

const AboutStory = ({
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
      <div className="grid grid-cols-1 md:grid-cols-12 items-center justify-center gap-6 md:gap-10 w-full border-b pb-8">
        {/* Text Section */}
        <div
          className={`col-span-1 md:col-span-6 flex flex-col items-center md:items-start justify-start text-center md:text-left max-w-full md:max-w-[90%]`}
        >
          <h2 className="text-textsmallheading font-pally text-heading md:text-textheading text-headingcolor font-bold mb-2">
            {title}
          </h2>

          <p className="text-start sm:text-xl text-heading font-HelveticaNeue text-[14px] leading-7 mb-2">
            {description1}
          </p>
          <br />
          <p className="text-start sm:text-xl text-heading font-HelveticaNeue text-[14px] leading-7 mb-2">
            {description2}
          </p>

          <button
            onClick={handleButtonClick}
            className="bg-dashboardPrimary md:text-btntextsize text-[14px] font-HelveticaNeue text-white px-6 py-4 mt-4 rounded-full hover:bg-hoverbtn transition"
          >
            {btnlabel}
          </button>
        </div>

        {/* Image Section */}
        <div className="col-span-1 md:col-span-6 flex justify-center">
          <img src={img} alt={title} className="w-full object-cover" />
        </div>
      </div>
    </Container>
  );
};

export default AboutStory;
