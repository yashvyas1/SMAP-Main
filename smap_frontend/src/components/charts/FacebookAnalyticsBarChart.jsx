import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const metrics = {
  weekly: {
    dateRange: "2024-08-22 to 2024-08-29",
    data: [
      { name: "Reactions", value: 94 },
      { name: "Comments", value: 29 },
      { name: "Shares", value: 11 },
    ],
  },
  monthly: {
    dateRange: "2024-08-01 to 2024-08-31",
    data: [
      { name: "Reactions", value: 380 },
      { name: "Comments", value: 235 },
      { name: "Shares", value: 125 },
    ],
  },
};

const timePeriods = [
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
];

const TimePeriodDropdown = ({
  isOpen,
  toggleDropdown,
  selectedPeriodIndex,
  onPeriodSelect,
}) => {
  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between text-md font-bold w-36 rounded-lg px-4 py-2 bg-zinc-100 border"
      >
        <div className="flex mr-4">
          {timePeriods[selectedPeriodIndex].label}
        </div>
        {isOpen ? <IoIosArrowDropupCircle /> : <IoIosArrowDropdownCircle />}
      </button>
      {isOpen && (
        <div className="z-10 absolute mt-2 rounded-lg shadow-lg bg-white border w-36">
          {timePeriods.map((period, index) =>
            index !== selectedPeriodIndex ? (
              <div
                key={period.value}
                className="px-4 py-2 hover:bg-zinc-100 cursor-pointer"
                onClick={() => onPeriodSelect(index)}
              >
                {period.label}
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  );
};

const FacebookAnalyticsBarChart = () => {
  const [selectedPeriodIndex, setSelectedPeriodIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handlePeriodSelect = (index) => {
    setSelectedPeriodIndex(index);
    setIsDropdownOpen(false);
  };

  const selectedPeriod = timePeriods[selectedPeriodIndex].value;
  const chartData = metrics[selectedPeriod].data;
  const isEmpty = chartData.every((item) => item.value === 0);

  const formatDateRange = (dateRange) => {
    const [startDate, endDate] = dateRange.split(" to ");
    return `${moment(startDate).format("DD MMM")} - ${moment(endDate).format(
      "DD MMM YYYY"
    )}`;
  };

  const displayedDateRange = formatDateRange(metrics[selectedPeriod].dateRange);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white w-full rounded-lg shadow-md p-4 relative">
      <div className="mb-8 p-2 border-b border-gray-200 flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold">Facebook Analytics</h1>
          <p className="font-semibold text-gray-500">{displayedDateRange}</p>
        </div>
        <div className="ml-auto relative" ref={dropdownRef}>
          <TimePeriodDropdown
            isOpen={isDropdownOpen}
            toggleDropdown={toggleDropdown}
            selectedPeriodIndex={selectedPeriodIndex}
            onPeriodSelect={handlePeriodSelect}
          />
        </div>
      </div>
      <div className="w-full h-[23rem] relative">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} strokeDasharray="5 5" />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis />
            <Tooltip cursor={false} />
            <Bar dataKey="value" fill="#3b82f6" radius={16} barSize={100} />
          </BarChart>
        </ResponsiveContainer>
        {isEmpty && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
            <p className="text-2xl font-bold text-zinc-300">
              No Data Available to show
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacebookAnalyticsBarChart;
