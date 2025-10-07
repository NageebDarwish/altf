import { useRef, useState } from "react";
import clsx from "clsx";

const RecentDownloadWatch = () => {
  const [isFocused, setIsFocused] = useState(false);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  

  return (
    <div className="flex flex-col gap-4 bg-recent rounded-lg w-full p-2">
      {/* recent download */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between p-2">
          <h1 className="text-black font-bold text-[16px]">Recent Download</h1>
          <span className="text-bluePrimary font-bold text-sm">See All</span>
        </div>
        <hr className="border-recentBorder border-[1px]" />
      </div>
      <div className="h-[320px] relative contain bg-cover bg-center rounded-xl cursor-pointer transition-all duration-300">
        {/* Background video */}
        <video
          ref={videoRef}
          onFocus={handleFocus}
          onBlur={handleBlur}
          controls
          tabIndex="0"
          className="absolute inset-0 w-full h-full object-cover rounded-xl"
          src="https://www.w3schools.com/html/mov_bbb.mp4"
        ></video>
        <div
          className={clsx(
            "absolute w-full rounded-xl bg-black/50 h-full flex flex-col justify-end pl-5 pb-10 gap-2 text-white transition-opacity duration-300",
            {
              "opacity-0": isFocused,
              "opacity-100": !isFocused,
            }
          )}
        >
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
            <span className="text-xs font-poppins font-normal ">Actions</span>
          </div>
        </div>
      </div>

      {/* recent watched series */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between p-2">
          <h1 className="text-black font-bold text-[16px]">
            Recent Watched Series
          </h1>
          <span className="text-bluePrimary font-bold text-sm">See All</span>
        </div>
        <hr className="border-recentBorder border-[1px]" />
      </div>
      <div
        style={{ backgroundImage: "url('/blond-girl.webp')" }}
        className="h-[320px] relative contain bg-cover bg-center rounded-xl cursor-pointer transition-all duration-300"
      >
        <div className="absolute w-full rounded-xl bg-black/50 h-full flex flex-col justify-center pl-5 gap-2 text-white">
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
            <span className="text-xs font-poppins font-normal ">Actions</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentDownloadWatch;
