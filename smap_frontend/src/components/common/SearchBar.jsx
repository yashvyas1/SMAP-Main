import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ placeholder }) => {
  return (
    <div className="flex items-center w-[30%] md:w-full sm:w-full ml-4">
      <div className="relative w-full">
        <input
          type="text"
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-2 rounded-lg border border-gray-300 focus:border-gray-400 focus:ring-gray-400 focus:ring-2 focus:outline-none transition duration-300 ease-in-out shadow-sm"
        />
        <FaSearch className="absolute left-4 top-2/4 transform -translate-y-2/4 text-gray-400" />
      </div>
    </div>
  );
};

export default SearchBar;
