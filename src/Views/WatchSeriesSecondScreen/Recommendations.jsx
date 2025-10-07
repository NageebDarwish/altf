const Recommendations = () => {
  const recommendations = [
    {
      image: "/NaatBoy.webp",
      title: "New Naat",
      content: "ISLAMIC VIDEO",
      time: "05:58:00",
    },
    {
      image: "/QuettaVs.webp",
      title: "Quetta Vs Peshawar",
      content: "PSL Matches",
      time: "20:58:00",
    },
    {
      image: "/LahoreVs.webp",
      title: "Lahore Vs Karachi",
      content: "PSL Matches",
      time: "10:58:00",
    },
    {
      image: "/ChampionsTrophy.webp",
      title: "Story of Champioin...",
      content: "Champion Trophy",
      time: "44:58:00",
    },
    {
      image: "/NaatBoy.webp",
      title: "New Naat",
      content: "ISLAMIC VIDEO",
      time: "2:30",
    },
    {
      image: "/QuettaVs.webp",
      title: "Quetta Vs Peshawar",
      content: "PSL Matches",
      time: "2:30",
    },
    {
      image: "/LahoreVs.webp",
      title: "Lahore Vs Karachi",
      content: "PSL Matches",
      time: "2:30",
    },
    {
      image: "/ChampionsTrophy.webp",
      title: "Story of Champioin...",
      content: "Champion Trophy",
      time: "2:30",
    },
  ];

  return (
    <div className="flex flex-col items-center gap-4 bg-recent rounded-lg w-full p-2 pb-4">
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between p-2 ">
          <h1 className="text-black font-bold text-[16px]">Recommendations</h1>
          <span className="text-bluePrimary font-bold text-sm">See All</span>
        </div>
        <hr className="border-recommendationBorder border-[1px]" />
      </div>

      {recommendations.map((recommendation, index) => (
        <div key={index} className="flex flex-col gap-3">
          <div className="flex items-center justify-center gap-3">
            <img
              src={recommendation.image}
              alt=""
              className="w-[98px] h-[62px] cover"
            />
            <div className="flex flex-col gap-1">
              <h1 className="text-black font-semibold text-[13px]">
                {recommendation.title}
              </h1>
              <span className="text-black/40 text-sm">
                {recommendation.content}
              </span>
              <div className="flex items-center gap-3 text-black/40 text-sm">
                <span>05:58:0</span>
                <span>{" ."} 75,404 views</span>
              </div>
            </div>
          </div>
          <hr className="border-recommendationBorder border-[1px]" />
        </div>
      ))}

      {/* now Start new things */}
    </div>
  );
};

export default Recommendations;
