import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const OldCookingColombian = ({ series }) => {
  return (
    <div
      style={{ backgroundImage: "url('/colombian-background.webp')" }}
      className="h-[450px]  relative cover bg-cover bg-center rounded-xl"
    >
      {/* beginner text */}
      <span className="absolute top-0 left-0 rounded-tl-xl text-white font-bold bg-bluePrimary px-[16px] py-[15px] text-sm md:text-base lg:text-lg">
        {series[0]?.level}
      </span>

      <div className="pl-4 md:pl-9 h-full flex flex-col justify-center gap-4 md:gap-6 text-white">
        {/* Cooking Grids */}
        <div className="w-full md:w-[690px] flex flex-col justify-center mt-10 gap-1 md:gap-4">
          <h1 className="font-bold text-[16px] md:text-[20px] lg:text-[24px] font-poppins">
            {series[0]?.title}
          </h1>
          <div className="flex gap-10 w-full text-sm font-poppins font-normal text-white">
            <span>11 Episodes</span>
            <span>183 Minutes</span>
            <span>Actions</span>
            <span>Adventure</span>
            <span>Science Fiction</span>
          </div>
        </div>

        <p className="font-light text-xs md:text-sm lg:text-base">
          {series[0]?.description}
        </p>

        <div className="flex flex-col lg:flex-row items-start md:items-center gap-10 justify-between">
          {/* buttons flex */}
          <section className="flex items-center gap-2 mb-3 md:mb-0">
            <button className="flex items-center rounded-lg gap-2 px-2 py-2 bg-bluePrimary">
              <PlayCircleIcon />
              <span className="text-[12px] md:text-[12px] font-semibold">
                Watch Now
              </span>
            </button>
            <button className="flex items-center rounded-lg bg-transparentCooking gap-2 px-2 py-2">
              <LibraryBooksIcon />
              <span className="text-[12px] md:text-[14px] font-semibold">
                Add To List
              </span>
            </button>
          </section>

          {/* images section */}
          <div className=" md:w-[350px] grid grid-cols-2 mx-auto sm:grid-cols-4 gap-3 pr-4 md:pr-12">
            <div className="relative">
              <img
                src="/water.webp"
                className="rounded-lg object-cover w-20 h-20 md:w-full md:h-full"
                alt=""
              />
              <button className="bg-bluePrimary text-white absolute top-1 -left-3 sm:-left-5 w-7 h-7 sm:w-6 sm:h-6 rounded-full">
                <ArrowBackIosIcon fontSize="small" />
              </button>
            </div>

            <img
              src="/woman.webp"
              className="rounded-lg object-cover w-20 h-20 md:w-full md:h-full"
              alt=""
            />
            <img
              src="/food.webp"
              className="rounded-lg object-cover  w-20 h-20 md:w-full md:h-full"
              alt=""
            />
            <div className="relative">
              <img
                src="/groupcartoons.webp"
                className="rounded-lg object-cover w-20 h-20 md:w-full md:h-full"
                alt=""
              />
              <button className="bg-bluePrimary text-white absolute top-1 -right-3 sm:-right-5 w-7 h-7 sm:w-6 sm:h-6 rounded-full">
                <ArrowForwardIosIcon fontSize="small" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OldCookingColombian;
