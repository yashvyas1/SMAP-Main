import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const PlatformSelectDropdown = ({
  platformIndex,
  setPlatformIndex,
  platforms,
}) => {
  const [isActive, setIsActive] = useState(false);
  const platformDropdownRef = useRef(null);
  const handlePlatformClick = (index) => {
    setPlatformIndex(index);
    setIsActive(false);
  };

  const toggleDropdown = () => {
    setIsActive((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (!platformDropdownRef.current?.contains(event.target)) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={platformDropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between w-[180px] h-[42px] shadow-lg rounded-lg px-4 py-[6px] bg-white"
      >
        <div className="flex gap-4">
          {platforms[platformIndex].icon}
          <h1 className="font-bold text-base">
            {platforms[platformIndex].id.charAt(0).toUpperCase() +
              platforms[platformIndex].id.slice(1)}
          </h1>
        </div>
        {isActive ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </button>
      {isActive && (
        <div className="z-10 mt-2 w-56 border rounded-lg bg-white shadow-lg absolute">
          {platforms.map((data, index) =>
            index !== platformIndex ? (
              <div
                key={index}
                className="flex items-center px-4 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handlePlatformClick(index)}
              >
                {data.icon}
                <h1 className="font-bold text-base px-4">
                  {data.id.charAt(0).toUpperCase() + data.id.slice(1)}
                </h1>
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  );
};

export default PlatformSelectDropdown;
