const OfferingCard = ({ desc, heading, image }) => {
  return (
    <div className=" flex flex-col gap-3 items-left box-border bg-white hover:shadow-lg hover:border-none hover:shadow-gray-200 border rounded-e-xl rounded-s-xl">
      <img
        src={image}
        alt="img"
        className="object-cover w-full"
        style={{ height: "250px" }}
      />
      <div className="p-6 space-y-4">
        <h1 className="text-[24px] font-bold text-pretty font-pally text-[#0C3373]">
          {heading}
        </h1>

        {/* <div className="relative opacity-[80%]"> */}

        <p className="text-left text-[16px] text-[#0C3373]/70 font-HelveticaNeue flex-grow">
          {desc}
        </p>
        {/* </div> */}
      </div>
    </div>
  );
};

export default OfferingCard;
