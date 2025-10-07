import Container from "../../../components/common/Container";

const ApprochHeroSections = () => {
  return (
    <div className="bg-[#E4EFFF80]">
      <Container className="py-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center justify-start rounded-lg flex-wrap text-center md:text-left">
        <div className="col-span-12 md:col-span-5">
          <h1 className="font-pally py-4 text-2xl md:text-6xl text-[#0C3373] font-bold">
            Our approach
          </h1>
          <p className="font-HelveticaNeue text-lg md:text-[20px] font-[500] text-[#0C3373] mt-5 w-full md:w-[85%] text-left">
            Learn Arabic with comprehensible input videos designed to optimize
            natural language acquisition.
          </p>
        </div>

        <div className="col-span-12 md:col-span-7 flex flex-col lg:flex-row items-center justify-center gap-5">
          <div className="grid grid-cols-2 gap-2">
            {[
              {
                label: "Easy",
                color: "text-[#1CC932]",
                borderColor: "border-[#C6FFCD]",
              },
              {
                label: "Fun",
                color: "text-[#FF7300]",
                borderColor: "border-[#FDC9A0]",
              },
              {
                label: "Fast",
                color: "text-[#09BBE9]",
                borderColor: "border-[#B3D1FF]",
              },
              {
                label: "Effective",
                color: "text-[#0C3373]",
                borderColor: "border-[#B3D1FF]",
              },
            ].map((btn, index) => (
              <div key={index}>
                <button
                  className={`border ${btn.borderColor} ${btn.color} bg-white font-bold w-40 text-2xl rounded-xl px-4 py-2 font-pally`}
                >
                  {btn.label}
                </button>
              </div>
            ))}
          </div>
          <div className="col-span-12">
            <div className="relative flex justify-start items-center">
              <div className="absolute -right-32 w-3/5 md:w-[400px] h-full md:h-[260px] bg-[#CDE1FF] rounded-tl-[70%] rounded-bl-[50%] z-0"></div>
              <img
                src="/mat.png"
                alt="Learning"
                className="w-[350px] h-[200px] shadow-[5px_5px_20px_rgba(0,0,0,0.1)] mt-5 md:mt-0 relative z-10"
              />
            </div>
          </div>
        </div>
      </div>
      </Container>
    </div>
  );
};

export default ApprochHeroSections;
