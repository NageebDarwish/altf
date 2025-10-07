import { IoCheckmark } from "react-icons/io5";
const SubscriptionYearly = () => {
  return (
    <div className="flex flex-col lg:flex-row  items-center justify-center gap-10 w-full pt-9">
      {/* first flex */}
      <div className="flex flex-col border-[1px] border-offBorder rounded-[10px] w-[40%]">
        {/* Free & Basic Text */}
        <div className="flex justify-between items-center border-b-[1px] p-5 border-offBorder">
          <div className="flex flex-col gap-6">
            <h1 className="text-black font-semibold text-sm md:text-lg lg:text-[32px]">
              Starter
            </h1>
            <hr className="border-[5px] border-black" />
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-bluePrimary font-semibold text-sm md:text-lg lg:text-[38px]">
              $1000
            </h1>
            <h1 className="text-sm md:text-[16px] font-semibold text-lightBrown">
              Very Basic
            </h1>
          </div>
        </div>
        {/* Plan includes */}
        <div className="flex flex-col gap-6 p-5">
          <h1 className="text-black font-semibold text-sm md:text-md lg:text-lg ">
            Plan includes :
          </h1>

          <div className="flex flex-col gap-2">
            {[...Array(7)].map((_, index) => (
              <div key={index} className="flex items-center  gap-2">
                <IoCheckmark className="w-6 h-6 object-cover text-bluePrimary font-bold" />

                <p className="text-lightBrowText sm:text-[10px] md:text-sm  lg:text-[17px]">
                  Lorem ipsum dolor sit amt elit lorem lorem ipsum dolor sit
                  amet consectetur.
                </p>
              </div>
            ))}
          </div>

          {/* button */}
          <div className="w-full px-1 mt-2">
            <button className="rounded-md bg-bluePrimary text-white font-bold text-sm md:text-[16px] w-full py-3">
              Try For Free
            </button>
          </div>
        </div>
      </div>
      {/* second flex */}
      <div className="flex flex-col border-[1px] border-bluePrimary bg-offBackground rounded-[10px] w-[40%]">
        {/* Free & Basic Text */}
        <div className="flex justify-between items-center border-b-[1px] p-5 border-offBorder">
          <div className="flex flex-col gap-6">
            <h1 className="text-black font-semibold text-sm md:text-lg lg:text-[32px]">
              Pro
            </h1>
            <hr className="border-[5px] border-black" />
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-bluePrimary font-semibold text-sm md:text-lg lg:text-[38px]">
              $10000
            </h1>
            <h1 className="text-sm md:text-[16px] font-semibold text-lightBrown">
              For Organization
            </h1>
          </div>
        </div>
        {/* Plan includes */}
        <div className="flex flex-col gap-6 p-5">
          <h1 className="text-black font-semibold text-sm md:text-md lg:text-lg ">
            Plan includes :
          </h1>

          <div className="flex flex-col gap-2">
            {[...Array(7)].map((_, index) => (
              <div key={index} className="flex items-center  gap-2">
                <IoCheckmark className="w-6 h-6 object-cover text-bluePrimary font-bold" />
                <p className="text-lightBrowText sm:text-[10px] md:text-sm  lg:text-[17px]">
                  Lorem ipsum dolor sit amt elit lorem lorem ipsum dolor sit
                  amet consectetur.
                </p>
              </div>
            ))}
          </div>

          {/* button */}
          <div className="w-full px-1 mt-2">
            <button className="rounded-md bg-bluePrimary text-white font-bold text-sm md:text-[16px] w-full py-3">
              Try For Free
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionYearly;
