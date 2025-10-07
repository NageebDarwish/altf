const RecommendedVideos = () => {
  const recommended = [
    { image: "/blond-girl.webp", title: "Trying Colombia's..." },
  { image: "candy-snack.webp", title: "Quiz Time with Andres" },
  { image: "ice-cream.webp", title: "Lets try these tiny coconuts" },
  ];
  return (
    <div className="flex flex-col items-start gap-3">
      <h1 className="font-bold text-bluePrimary text-[20px]">
        Recommended Videos
      </h1>
      <div className="grid grid-cols-3 gap-6 w-full">
        {recommended.map((video, index) => (
          <div
            key={index}
            className="flex flex-col bg-recommendedVideo rounded-[10px]"
          >
            <img
              src={video.image}
              className="h-[155px] w-full object-cover rounded-t-[10px]"
              alt=""
            />
            <div className="px-4 py-4 flex flex-col gap-1">
              <h1 className="font-semibold text-[16px] text-black">
                {video.title}
              </h1>
              <div className="flex items-center gap-2">
                <span>4 months .</span>
                <span>550k views</span>
              </div>
              <button className="bg-bluePrimary text-white mt-3 py-2 w-full  rounded-md">
                Watch Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedVideos;
