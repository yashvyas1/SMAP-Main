import React, { useEffect, useRef, useState } from "react";
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";
import { Link } from "react-router-dom";
import ScheduleCard from "../../../components/cards/ScheduleCard";
import { cardData } from "../../../constant/data";

const Dropdown = ({
  options,
  selectedIndex,
  onSelect,
  isOpen,
  toggleDropdown,
  ref,
}) => (
  <div className="flex gap-4 ml-auto relative" ref={ref}>
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
                onClick={() => onSelect(index)}
              >
                {option}
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
    <div>
      <Link to="/user/schedule">
        <button className="flex items-center justify-between text-sm rounded-lg px-4 py-2 bg-blue-500 text-white">
          View All
        </button>
      </Link>
    </div>
  </div>
);

const FilterTabs = ({ selectedType, setSelectedType }) => (
  <div className="flex items-center mt-2">
    {["All", "Scheduled", "Published", "Cancelled"].map((type) => (
      <div
        key={type}
        className={`flex justify-center w-full items-center ${
          type === "Published" ? "gap-2" : ""
        } text-lg font-bold cursor-pointer ${
          selectedType === type
            ? "border-b-2 border-blue-500"
            : "border-b-2 border-gray-400/25"
        }`}
        onClick={() => setSelectedType(type)}
      >
        {type}
        {type === "Published" && (
          <span className="bg-red-500 rounded-full text-white px-2 py-1 text-xs -mt-2">
            2
          </span>
        )}
      </div>
    ))}
  </div>
);

const ScheduledPosts = () => {
  const options = ["Weekly", "Monthly", "3 Months"];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedType, setSelectedType] = useState("All");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleItemClick = (index) => {
    setSelectedIndex(index);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const filterPosts = (type) => {
    if (type === "All") return cardData;
    return cardData.filter((card) => card.type === type);
  };

  return (
    <div className="w-full flex flex-col border-2 border-gray-500/25 rounded-lg gap-2 p-4">
      <div className="flex items-center">
        <h1 className="font-extrabold text-2xl">Schedule Post</h1>
        <Dropdown
          options={options}
          selectedIndex={selectedIndex}
          onSelect={handleItemClick}
          isOpen={isOpen}
          toggleDropdown={toggleDropdown}
          ref={dropdownRef}
        />
      </div>
      <FilterTabs
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />
      {filterPosts(selectedType).map((card, index) => (
        <div
          key={index}
          className="rounded-xl flex bg-white border-b-2 gap-2 py-2"
        >
          <ScheduleCard key={index} {...card} />
        </div>
      ))}
    </div>
  );
};

export default ScheduledPosts;
