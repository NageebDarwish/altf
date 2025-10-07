import { useLocation } from "react-router-dom";
import ButtonsFlex from "./ButtonsFlex";
import ColombianImage from "./ColombianImage";
import Recommendations from "./Recommendations";
import RecommendedVideos from "./RecommendedVideos";

const WatchSeriesSecondScreen = () => {
  const location = useLocation();
  const { video } = location.state || {};
  console.log(video, 'hhhhh')
  return (
    <div className="grid grid-cols-12 gap-7 ml-4 mr-4 py-4">
      <div className="col-span-9">
        <div className="flex flex-col gap-6 w-full">
          <ColombianImage video={video} />
          <ButtonsFlex video={video} />
          <RecommendedVideos video={video} />
        </div>
      </div>
      <div className="col-span-3">
        <Recommendations video={video} />
      </div>
    </div>
  );
};

export default WatchSeriesSecondScreen;
