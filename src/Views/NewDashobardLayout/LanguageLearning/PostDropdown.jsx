import { useEffect, useRef, useState } from "react";


const PostDropdown = ({ options, buttonLabel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        type="button"
        className="inline-flex justify-center w-full rounded-md px-2 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none border-none"
        onClick={toggleDropdown}
      >
        {buttonLabel}
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-4 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {options.map((option, index) => (
              <button
                key={index}
                className="flex gap-2 w-full px-4 py-2 text-xl text-primary hover:bg-gray-100"
                onClick={() => {
                  option.onClick();
                  setIsOpen(false);
                }}
              >
                {option.icon} {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDropdown; 