const PaginationButton = () => {
  return (
    <div className="flex items-center gap-3">
      <button className="border-paginationButtonBorder text-paginationButtonBorder border-[1px] w-[30px] h-[30px] rounded-lg">
        &lt 12321
      </button>
      <button className="border-bluePrimary text-bluePrimary border-[1px] w-[30px] h-[30px] rounded-lg">
        &gt
      </button>
    </div>
  );
};

export default PaginationButton;
