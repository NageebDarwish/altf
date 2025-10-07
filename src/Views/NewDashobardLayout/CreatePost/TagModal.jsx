import React, { useEffect, useState } from "react";
import { request } from "../../../services/axios";

const TagModal = ({
  closeModal,
  tags,
  heading,
  setTags,
  selectedTags,
  setSelectedTags,
}) => {
  const [loading, setLoading] = useState(true);

  const getTags = async () => {
    try {
      setLoading(true);
      const res = await request({
        method: "get",
        url: "api/get/post/tags",
      });
      setTags(res.data.payload);
      console.log(res,'res12345')
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Function to format tag names - remove underscores and capitalize
  const formatTagName = (name) => {
    return name
      ?.split("_")
      ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      ?.join(" ");
  };

  // Handle tag selection (for multiple selection)
  const handleTagSelection = (tagId) => {
    setSelectedTags((prev) => {
      if (prev?.includes(tagId)) {
        // Remove if already selected
        return prev.filter((id) => id !== tagId);
      } else {
        // Add if not selected
        return [...prev, tagId];
      }
    });
  };

  // Handle confirm - just close modal, selected tags are already updated
  const handleConfirm = () => {
    console.log("Selected Tag IDs:", selectedTags);
    closeModal();
  };

  useEffect(() => {
    getTags();
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg m-2 max-w-md w-full max-h-[80vh] overflow-hidden">
        <div className="flex justify-between items-center px-6 py-3">
          <h2 className="text-2xl font-semibold">{heading}</h2>
          <button
            onClick={closeModal}
            className="text-2xl text-gray-500 hover:text-gray-700 transition-colors"
          >
            ×
          </button>
        </div>
        <hr />
        <div className="max-h-96 overflow-y-auto">
          <div className="grid grid-cols-2 px-6 py-3 gap-3 mb-5">
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              tags.map((tag, index) => (
                <label
                  key={index}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded"
                    checked={selectedTags?.includes(tag.id)}
                    onChange={() => handleTagSelection(tag.id)}
                  />
                  <span className="text-sm font-HelveticaNeue font-semibold">
                    {formatTagName(tag.name)}
                  </span>
                </label>
              ))
            )}
          </div>
        </div>

        <hr />
        <div className="flex gap-2 px-6 py-3">
          <button
            className="px-6 font-semibold font-plusJakarta py-2 text-primary border border-primary rounded-full"
            onClick={closeModal}
          >
            Close
          </button>
          <button
            className="px-6 font-semibold font-plusJakarta py-2 bg-btnbackground border border-btnbackground text-white rounded-full"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default TagModal;
