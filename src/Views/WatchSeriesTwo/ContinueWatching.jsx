import ContinueSelect from "./ContinueSelect";

const ContinueWatching = () => {
  const watchingArray = [
    { image: "/blond-girl.webp", title: "Trying Colombia's..." },
  { image: "/ice-cream.webp", title: "Lets try these tiny cocu..." },
  {
    image: "/pizza.webp",
      title: "Quiz Time with Andrés",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <ContinueSelect />
      <div className="grid grid-cols-3 gap-4">
        {watchingArray.map((watch, index) => (
          <div
            key={index}
            style={{ backgroundImage: `url(${watch.image})` }}
            className="h-[270px] relative contain bg-cover bg-center rounded-xl cursor-pointer transition-all duration-300"
          >
            <div className="absolute w-full rounded-xl bg-black/50 h-full flex flex-col justify-center pl-5 gap-9 text-white">
              <div>
                <h1 className=" font-bold text-md  font-poppins">
                  Cooking Colombian Dishes
                </h1>
                <div className="grid grid-cols-3 gap-4">
                  <span className="text-xs font-poppins font-normal ">
                    11 Episodes
                  </span>
                  <span className="text-xs font-poppins font-normal ">
                    183 Minutes
                  </span>
                  <span className="text-xs font-poppins font-normal ">
                    Actions
                  </span>
                </div>
              </div>

              {/* buttons  */}

              <div className="flex items-center justify-between pr-9">
                <button className="bg-bluePrimary rounded-3xl p-3 text-white">
                  Watch Now
                </button>

                <button className="bg-white/40 rounded-full w-12 h-12 text-[20px] font-semibold text-white flex items-center justify-center">
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContinueWatching;
