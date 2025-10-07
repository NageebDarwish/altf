const TeamAboutCustom = ({ image, postion, description, name }) => {
  return (
    <div className="relative w-full  shadow-lg bg-white rounded-lg">
      <div className="px-6 py-4 text-left rounded-[16px]">
        <img className="object-cover text-left w-full" src={image} alt="" />
      </div>
      <div className="flex flex-col px-4">
        <h3 className="flex items-center justify-left font-pally text-xl md:text-3xl ml-2 mt-4 font-bold text-[#0C3373] ">
          {name}
        </h3>
        <h5 className="flex items-center justify-left font-poppins text-md text-md ml-2 font-bold text-[#F28327] ">
          {postion}
        </h5>
        <h3 className="flex items-center text-left leading-[20px] md:leading-[28px] font-HelveticaNeue justify-center text-sm md:text-lg ml-2 mt-4 pb-3 text-opacity-70  text-[#0C3373] ">
          {description}
        </h3>
      </div>
    </div>
  );
};
export default TeamAboutCustom;
