import SearchIcon from "@mui/icons-material/Search";

export default function SearchInput() {
  return (
    <div className="flex items-center bg-gray-100 rounded-lg w-full min-w-[420px] h-[47px] shadow-md overflow-hidden">
      <input
        type="text"
        placeholder="Search your specific videos..."
        className="px-4 py-2 h-full bg-headerInput focus:outline-none w-full text-secondary text-sm text-medium"
      />
      <button className="bg-black text-white px-4  h-full">
        <SearchIcon className="text-xl" />
      </button>
    </div>
  );
}
