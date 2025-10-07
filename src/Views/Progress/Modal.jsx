import React, { useState } from "react";
import { request } from "../../services/axios";

const Modal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    date: "",
    duration: "",
    description: "",
    activity: "watching",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async () => {
    try {
      const result = await request(
        {
          url: "api/outside/platform/store",
          method: "post",
          data: formData,
        },
        true
      );
      onClose();
    } catch (err) {
      onClose();
      console.log(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center mt-10 justify-center">
      <div className="bg-white rounded-lg p-6 w-[60%] max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold mb-4">
            Add time outside the platform
          </h2>
          <h1 onClick={onClose} className="cursor-pointer text-2xl">
            x
          </h1>
        </div>
        <hr />
        <div className="mb-4 mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date *
          </label>
          <input
            type="date"
            name="date"
            className="border w-full p-2 rounded"
            required
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duration *
          </label>
          <input
            type="number"
            name="duration"
            className="border w-full p-2 rounded"
            placeholder="Enter duration"
            required
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description (optional)
          </label>
          <textarea
            name="description"
            className="border w-full p-2 rounded"
            rows="4"
            placeholder="Add any additional details..."
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="flex justify-between gap-4 mt-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-[#ff9301] text-white rounded"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
