const EditOutsideHoursModal = ({ 
    tempOutsideHours, 
  setTempOutsideHours,
  setOutsideHours,
  setEditModalOpen,
  userId  
}) => {
 const storageKey = userId ? `outsideAATTHours_${userId}` : 'outsideAATTHours';

  const handleSave = () => {
    const hours = tempOutsideHours || "0"; // Default to 0 if empty
    setOutsideHours(hours);
    localStorage.setItem(storageKey, hours);
    setEditModalOpen(false);
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999]">
      <div className="bg-white p-6 rounded-lg w-96">
        <h3 className="text-xl font-bold mb-4">Edit Outside AATT Hours</h3>
        <input
          type="number"
          value={tempOutsideHours}
          onChange={(e) => setTempOutsideHours(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="Enter hours"
          min="0"
        />
        <div className="flex justify-end gap-2">
          <button 
            onClick={() => setEditModalOpen(false)}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="px-4 py-2 bg-dashboardPrimary text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditOutsideHoursModal;