import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowDropdownCircle, IoIosArrowDropupCircle } from "react-icons/io";

const ChartDropdown = ({ options, selectedIndex, onSelect }) => {
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
    <div className="flex gap-4 ml-auto relative" ref={dropdownRef}>
      <div>
        <button
          onClick={toggleDropdown}
          className="flex items-center justify-between text-sm rounded-lg px-4 py-2 w-32 bg-zinc-100 border"
        >
          <div className="flex mr-4">{options[selectedIndex]}</div>
          {isOpen ? <IoIosArrowDropupCircle /> : <IoIosArrowDropdownCircle />}
        </button>
        {isOpen && (
          <div className="z-10 absolute mt-2 rounded-lg shadow-lg bg-white border">
            {options.map((option, index) =>
              index !== selectedIndex ? (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-zinc-100 cursor-pointer"
                  onClick={() => {
                    onSelect(index);
                    setIsOpen(false);
                  }}
                >
                  {option}
                </div>
              ) : null
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartDropdown;
