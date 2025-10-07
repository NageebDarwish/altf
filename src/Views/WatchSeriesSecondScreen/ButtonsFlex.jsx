import React, { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { HiDocumentText } from "react-icons/hi";
import { FiDownload } from "react-icons/fi";
import { request } from "../../services/axios";
import { FaSpinner } from "react-icons/fa"; // Add Spinner icon for loading

const ButtonsFlex = ({ video }) => {
  // State to track loading for the "Add to My List" button
  const [loading, setLoading] = useState(false);

  // Function to handle adding a video (series) to the list
  const handleAddToList = async (series_id) => {
    setLoading(true); // Set loading state to true when the request starts
    try {
      await request({
        method: "post",
        url: "api/series/list",
        data: {
          series_id,
        },
      });
      console.log(`Series ${series_id} added to the list`);
      // Optionally, show user feedback like a Toast or Snackbar
    } catch (error) {
      console.error("Error adding series to the list:", error);
      // Optionally, show user feedback like a Toast or Snackbar
    } finally {
      setLoading(false); // Reset loading state when the request completes
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-black text-lg font-bold">{video.title}</h1>
        <div className="grid grid-cols-3 gap-3">
          {/* Mark as Watched Button */}
          <button className="bg-bluePrimary/30 p-3 rounded-md flex items-center gap-1 justify-center font-semibold text-sm">
            <IoMdEye className="w-5 h-5 object-cover" />
            <span>Marked as Watched</span>
          </button>

          {/* Add to My List Button */}
          <button
            onClick={() => handleAddToList(video.series_id)}
            className={`bg-bluePrimary/30 p-3 rounded-md flex items-center gap-1 justify-center font-semibold text-sm ${loading ? 'cursor-not-allowed' : ''}`}
            disabled={loading} // Disable button during loading
          >
            {loading ? (
              <FaSpinner className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <HiDocumentText className="w-5 h-5 object-cover" />
                <span>Add to My List</span>
              </>
            )}
          </button>

          {/* Download Button */}
          {/* <button className="bg-bluePrimary/30 p-3 rounded-md flex items-center gap-1 justify-center font-semibold text-sm">
            <FiDownload className="w-5 h-5 object-cover" />
            <span>Download</span>
          </button> */}
        </div>
      </div>

      <hr className="border-recommendationBorder border-[1px] w-full" />

      {/* Video description */}
      <p className="text-[12px] font-medium text-black/40">
        {video.description}
      </p>
    </div>
  );
};

export default ButtonsFlex;
