import ContinueSlider from "../../components/ContinueSlider/ContinueSlider";

const ContinueSelect = () => {
  return (
    <div className="flex md:sm:flex-row flex-col items-center justify-around">
      <div className="flex items-center gap-3">
        <h1 className="text-black font-bold text-[20px] font-poppins">
          Continue Watching
        </h1>
        {/* <img src="/continue-bar.jpg" alt="" /> */}
        <ContinueSlider />
      </div>
      <select
        className="bg-selectBg p-3 rounded-lg text-black font-semibold"
        name=""
        id=""
      >
        <option value="1">SuperBeginner Series</option>
      </select>
    </div>
  );
};

export default ContinueSelect;
