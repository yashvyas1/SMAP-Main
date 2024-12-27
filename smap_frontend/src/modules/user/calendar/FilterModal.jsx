import React, { useState } from "react";

const FilterModal = ({ showFilterModal, handleCloseFilter, applyFilters }) => {
  const [filters, setFilters] = useState({
    facebook: true,
    twitter: true,
    instagram: true,
    linkedin: true,
    youtube: true,
  });

  const handleFilterChange = (platform) => {
    setFilters({ ...filters, [platform]: !filters[platform] });
  };

  const handleApplyFilters = () => {
    applyFilters(filters);
    handleCloseFilter();
  };

  return (
    <>
      {showFilterModal ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div
            className="bg-white p-8 rounded-lg shadow-lg w-96 relative z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl mb-6">Filter Events</h2>
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.facebook}
                  onChange={() => handleFilterChange("facebook")}
                  className="mr-2"
                />
                Facebook
              </label>
            </div>
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.twitter}
                  onChange={() => handleFilterChange("twitter")}
                  className="mr-2"
                />
                Twitter
              </label>
            </div>
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.instagram}
                  onChange={() => handleFilterChange("instagram")}
                  className="mr-2"
                />
                Instagram
              </label>
            </div>
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.linkedin}
                  onChange={() => handleFilterChange("linkedin")}
                  className="mr-2"
                />
                LinkedIn
              </label>
            </div>
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.youtube}
                  onChange={() => handleFilterChange("youtube")}
                  className="mr-2"
                />
                YouTube
              </label>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
                onClick={handleCloseFilter}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={handleApplyFilters}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default FilterModal;