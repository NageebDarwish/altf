import CookingColombian from "./CookingColombian";
import ContinueWatching from "./ContinueWatching";
const TrendingSeries = () => {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-full">
        <div className="flex flex-col gap-6 w-full">
          <CookingColombian />
          <ContinueWatching />
        </div>
      </div>
    </div>
  );
};

export default TrendingSeries;
