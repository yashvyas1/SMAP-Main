import React, { useEffect, useRef, useState } from "react";
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";
import { cardData, platformData } from "../../../constant/data";

const options = ["Weekly", "Monthly", "3 Months"];

const Dropdown = ({
  isOpen,
  toggleDropdown,
  selectedIndex,
  handleItemClick,
}) => (
  <div className="relative">
    <button
      onClick={toggleDropdown}
      className="flex items-center justify-between text-md font-bold w-36 rounded-lg px-4 py-2 bg-zinc-100 border"
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
              onClick={() => handleItemClick(index)}
            >
              {option}
            </div>
          ) : null
        )}
      </div>
    )}
  </div>
);

const PlatformDropdown = ({
  isActive,
  platformDropdown,
  platformIndex,
  handlePlatformClick,
}) => (
  <div className="relative">
    <button
      onClick={platformDropdown}
      className="flex items-center justify-between w-56 shadow-xl rounded-lg px-4 py-[6px] bg-white"
    >
      <div className="flex gap-4">
        {platformData[platformIndex].icon}
        <h1 className="font-extrabold text-lg">
          {platformData[platformIndex].label}
        </h1>
      </div>
      {isActive ? <IoIosArrowDropupCircle /> : <IoIosArrowDropdownCircle />}
    </button>
    {isActive && (
      <div className="z-10 mt-2 w-56 border rounded-lg bg-white shadow-lg absolute">
        {platformData.map((data, index) =>
          index !== platformIndex ? (
            <div
              key={index}
              className="flex items-center px-4 py-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handlePlatformClick(index)}
            >
              {data.icon}
              <h1 className="font-extrabold text-lg px-4">{data.label}</h1>
            </div>
          ) : null
        )}
      </div>
    )}
  </div>
);

const FilterTabs = ({ selectedType, setSelectedType }) => (
  <div className="flex items-center mt-4">
    {["All", "Scheduled", "Published", "Cancelled"].map((type) => (
      <div
        key={type}
        className={`flex justify-center w-full items-center text-lg font-bold cursor-pointer ${
          selectedType === type
            ? "border-b-2 border-blue-500"
            : "border-b-2 border-gray-400/25"
        }`}
        onClick={() => setSelectedType(type)}
      >
        {type}
      </div>
    ))}
  </div>
);

const PostCard = ({
  platform,
  username,
  message,
  type,
  date,
  time,
  icon,
  imageUrl,
}) => (
  <div className="rounded-xl h-18 flex bg-white border-b-2 gap-2 py-2">
    <div
      className={`rounded-lg w-1 mr-2 h-full ${
        type === "Scheduled"
          ? "bg-blue-500"
          : type === "Published"
          ? "bg-green-500"
          : type === "Cancelled"
          ? "bg-red-500"
          : ""
      }`}
    ></div>
    <div className="w-full">
      <div className="w-full">
        <div className="flex justify-between pr-4 h-20">
          <div className="flex flex-col mr-2">
            <div className="flex items-center">
              {icon}
              <p className="text-sm ml-2 text-gray-600">
                {platform}: @{username}
              </p>
            </div>
            <div>
              <p className="mt-1 text-gray-900 text-lg">{message}</p>
            </div>
          </div>
          <div>
            <img
              src={imageUrl}
              className="min-w-16 h-20 rounded-lg"
              alt={platform}
            />
          </div>
        </div>
        <div className="mt-1 flex items-center justify-between pr-4 mb-1">
          <div
            className={`px-2 rounded-md font-semibold text-md ${
              type === "Scheduled"
                ? "bg-blue-100 text-blue-500"
                : type === "Published"
                ? "bg-green-100 text-green-500"
                : type === "Cancelled"
                ? "bg-red-100 text-red-500"
                : ""
            }`}
          >
            {type}
          </div>
          <div className="flex gap-4">
            {type === "Scheduled" && (
              <button className="bg-red-400 text-white px-2 rounded-md font-semibold text-md">
                Cancel
              </button>
            )}
            <div className="text-gray-600 text-md">
              <span>{date}</span> <span>{time}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Schedule = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [platformIndex, setPlatformIndex] = useState(0);
  const [selectedType, setSelectedType] = useState("All");
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const dropdownRef = useRef(null);
  const platformDropdownRef = useRef(null);

  const handleItemClick = (index) => {
    setSelectedIndex(index);
    setIsOpen(false);
  };

  const handlePlatformClick = (index) => {
    setPlatformIndex(index);
    setIsActive(false);
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const platformDropdown = () => {
    setIsActive((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      platformDropdownRef.current &&
      !platformDropdownRef.current.contains(event.target)
    ) {
      setIsOpen(false);
      setIsActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filterPosts = (type) => {
    if (type === "All") return cardData;
    return cardData.filter((card) => card.type === type);
  };

  return (
    <div className="w-full grid border-2 border-gray-500/25 rounded-lg gap-2 p-4">
      <div className="flex items-center">
        <div>
          <h1 className="font-extrabold text-2xl">Schedule</h1>
        </div>
        <div className="flex gap-4 ml-auto relative">
          <div ref={dropdownRef}>
            <Dropdown
              isOpen={isOpen}
              toggleDropdown={toggleDropdown}
              selectedIndex={selectedIndex}
              handleItemClick={handleItemClick}
            />
          </div>
          <div ref={platformDropdownRef}>
            <PlatformDropdown
              isActive={isActive}
              platformDropdown={platformDropdown}
              platformIndex={platformIndex}
              handlePlatformClick={handlePlatformClick}
            />
          </div>
        </div>
      </div>
      <FilterTabs
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />
      {filterPosts(selectedType).map((card, index) => (
        <PostCard key={index} {...card} />
      ))}
    </div>
  );
};

export default Schedule;
