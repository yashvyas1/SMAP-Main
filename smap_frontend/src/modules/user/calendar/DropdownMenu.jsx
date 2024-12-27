import React, { useState, useCallback, useRef, useEffect } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaChevronDown } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const socialPlatforms = [
  { name: "Facebook", icon: <FaFacebook className="mr-2 text-[#3b5998]" /> },
  { name: "Twitter", icon: <FaXTwitter className="mr-2 text-[#000000]" /> },
  { name: "Instagram", icon: <FaInstagram className="mr-2 text-[#E4405F]" /> },
  { name: "LinkedIn", icon: <FaLinkedin className="mr-2 text-[#0077b5]" /> },
  { name: "YouTube", icon: <FaYoutube className="mr-2 text-[#FF0000]" /> },
];

const DropdownMenu = ({ selectedPlatforms, setSelectedPlatforms, applyFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle platform selection and update the selected platforms
  const handlePlatformSelect = (platform) => {
    const updatedPlatforms = selectedPlatforms.includes(platform)
      ? selectedPlatforms.filter((p) => p !== platform)
      : [...selectedPlatforms, platform];

    setSelectedPlatforms(updatedPlatforms);
    applyFilters(updatedPlatforms);
  };

  // Close the dropdown if clicked outside the menu
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Add event listener to close dropdown when clicked outside
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
        onClick={toggleDropdown}
      >
        All Platforms
        <FaChevronDown className="ml-2" />
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            {socialPlatforms.map((platform) => (
              <div
                key={platform.name}
                className={`flex items-center px-4 py-2 text-sm cursor-pointer ${
                  selectedPlatforms.includes(platform.name) ? "bg-gray-100" : ""
                }`}
                onClick={() => handlePlatformSelect(platform.name)}
              >
                {platform.icon}
                {platform.name}
                {selectedPlatforms.includes(platform.name) && (
                  <span className="ml-auto text-green-600">&#10003;</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;