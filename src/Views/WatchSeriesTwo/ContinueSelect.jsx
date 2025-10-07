const ContinueSelect = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <h1 className="text-black font-bold text-[20px] font-poppins">
          Continue Watching
        </h1>
        <img src="/continue-bar.webp" alt="" />
      </div>
      <select
        className="bg-selectBg p-3 rounded-lg text-transparentCooking font-semibold"
        name=""
        id=""
      >
        <option value="1">SuperBeginner Series</option>
      </select>
    </div>
  );
};

export default ContinueSelect;
