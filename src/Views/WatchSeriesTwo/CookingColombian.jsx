import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const CookingColombian = () => {
  return (
    <div
      style={{ backgroundImage: "url('/colombian-background.webp')" }}
      className="h-[430px] relative cover bg-cover bg-center rounded-xl"
    >
      {/* beginner text */}
      <span className="absolute top-0 left-0 rounded-tl-xl text-white font-bold bg-bluePrimary px-[16px] py-[15px]">
        Beginner
      </span>

      <div className="pl-9 h-full flex flex-col  justify-center gap-6 text-white">
        {/* Cooking Grids */}
        <div className="w-[690px]  flex flex-col justify-center gap-2 ">
          <h1 className=" font-bold text-[20px] font-poppins">
            Cooking Colombian Dishes
          </h1>
          <div className="grid grid-cols-5">
            <span className="text-sm font-poppins font-normal text-white">
              11 Episodes
            </span>
            <span className="text-sm font-poppins font-normal text-white">
              183 Minutes
            </span>
            <span className="text-sm font-poppins font-normal text-white">
              Actions
            </span>
            <span className="text-sm font-poppins font-normal text-white">
              Adventure
            </span>
            <span className="text-sm font-poppins font-normal text-white">
              Science Fiction
            </span>
          </div>
        </div>

        <p className="font-light text-sm">
          Lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet
          connsectetur lorem ipsum dolor sit amet consectetur lorem ipsum dolor
          sit amet consectetur lorem ipsum dolor sit amet connsectetur lorem
          ipsum dolor sit amet consectetur lorem ipsum dolor sit amet
          consectetur lorem ipsum dolor sit amet connsectetur lorem ipsum dolor
          sit amet consectetur lorem ipsum sit amet consectetur lorem ipsum
          dolor sit amet connsectetur lorem ipsum dolor sit amet consectetur
          lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet
          connsectetur lorem ipsum dolor sit amet consectetur sit amet
          consectetur lorem ipsum dolor sit amet consectetur lorem ipsum dolor
          sit amet connsectetur lorem ipsum dolor sit amet consectetur lorem
          ipsum sit amet consectetur lorem ipsum dolor sit .
        </p>

        <div className="flex items-center justify-between">
          {/* buttons flex */}
          <section className="flex items-center gap-5">
            <button className="flex items-center rounded-lg gap-2 px-5 py-3 bg-bluePrimary">
              <PlayCircleIcon />
              <span className="text-[14px] font-semibold">Watch Now</span>
            </button>
            <button className="flex items-center rounded-lg bg-transparentCooking gap-2 px-5 py-3">
              <LibraryBooksIcon />
              <span className="text-[14px] font-semibold">Add To List</span>
            </button>
          </section>

          {/* images section */}
          <div className="w-[350px] grid grid-cols-4 gap-3 pr-12">
            <div className="relative">
              <img src="/water.webp" className="rounded-lg cover" alt="" />
              <button className="bg-bluePrimary text-white absolute top-1 -left-5 w-9 h-9 rounded-full">
                <ArrowBackIosIcon size={17} />
              </button>
            </div>

            <img src="/woman.webp" className="rounded-lg cover" alt="" />
            <img src="/food.webp" className="rounded-lg cover" alt="" />
            <div className="relative">
              <img
                src="/groupcartoons.webp"
                className="rounded-lg cover"
                alt=""
              />
              <button className="bg-bluePrimary text-white absolute top-1 -right-5 w-9 h-9 rounded-full">
                <ArrowForwardIosIcon className="" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookingColombian;
