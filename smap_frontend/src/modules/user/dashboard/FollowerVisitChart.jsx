import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import moment from "moment";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ChartTooltipContent = ({ payload, percentageChange }) => {
  if (payload && payload.length) {
    const formattedDate = moment(payload[0].payload.end_time).format("DD MMM");

    return (
      <div className="bg-white flex flex-col p-2 rounded shadow">
        <div className="text-lg font-bold p-2">{`${payload[0].value}`}</div>
        <div>{`${formattedDate}`}</div>
      </div>
    );
  }
  return null;
};

const Dropdown = ({
  options,
  selectedIndex,
  onSelect,
  isOpen,
  toggleDropdown,
  ref,
}) => (
  <div className="flex gap-4 relative" ref={ref}>
    <div>
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between text-sm rounded-lg px-4 py-2 w-32 bg-zinc-100 border"
      >
        <div className="flex mr-4">
          {options[selectedIndex].charAt(0).toUpperCase() +
            options[selectedIndex].slice(1).toLowerCase()}
        </div>
        {isOpen ? <IoIosArrowDropup /> : <IoIosArrowDropdown />}
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
                {option.charAt(0).toUpperCase() + option.slice(1).toLowerCase()}
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  </div>
);

const BACKEND_URL = "http://localhost:8000";

const FollowerVisitChart = ({ status }) => {
  const options = ["weekly", "monthly", "3 months"];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dropdownRef = useRef(null);
  const [dataRange, setDataRange] = useState("weekly");
  const [followersData, setFollowersData] = useState([]);
  const [pageVisitsData, setPageVisitsData] = useState([]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const handleSelect = (index) => {
    setSelectedIndex(index);
    setDataRange(options[index]);
    setIsOpen(false);
  };

  const formatTicks = (value, index, dataRange, followersDataLength) => {
    const currentDate = moment(value);
    const isLastDate = moment(value).isSame(
      moment().subtract(1, "days"),
      "day"
    );
    const isFirstDate = index === 0;
    if (isFirstDate || isLastDate) {
      return currentDate.format("DD MMM");
    }
    if (dataRange === "weekly") {
      return currentDate.format("DD MMM");
    } else if (dataRange === "monthly") {
      if (index % 8 === 0) {
        return currentDate.format("DD MMM");
      }
    } else if (dataRange === "3 months") {
      if (index % 15 === 0) {
        return currentDate.format("DD MMM");
      }
    }
    return "";
  };

  const filterDataByRange = (data, range) => {
    const today = moment().startOf("day");
    const startDate =
      range === "weekly"
        ? moment(today).subtract(7, "days")
        : range === "monthly"
          ? moment(today).subtract(30, "days")
          : range === "3 months"
            ? moment(today).subtract(3, "months")
            : moment(today);

    const filteredData = data.filter((entry) => {
      const entryDate = moment(entry.end_time).startOf("day");
      return entryDate.isBetween(startDate, today, undefined, "[]");
    });

    return filteredData;
  };

  const getFollowersVisitsData = async () => {
    try {
      const res = await axios.get(
        `${BACKEND_URL}/users/facebookoverviewgraphs`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const data = res?.data;
      const followersFilteredData = filterDataByRange(
        data?.followersData,
        dataRange
      );

      const visitsFilteredData = filterDataByRange(
        data?.pageVisitsData,
        dataRange
      );

      setFollowersData(followersFilteredData || []);
      setPageVisitsData(visitsFilteredData || []);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    if (status) {
      getFollowersVisitsData();
    } else {
      setFollowersData(null);
      setPageVisitsData(null);
    }
  }, [status, dataRange]);

  const isFollowersDataEmpty =
    followersData === null || followersData === undefined;
  const isPageVisitsDataEmpty =
    pageVisitsData === null || pageVisitsData === undefined;

  return (
    <div className="flex flex-col w-full gap-8">
      <Dropdown
        options={options}
        selectedIndex={selectedIndex}
        onSelect={handleSelect}
        isOpen={isOpen}
        toggleDropdown={toggleDropdown}
        ref={dropdownRef}
      />
      <div className="flex w-full gap-4 flex-wrap xl:flex-nowrap">
        <div className="border rounded-lg shadow-md p-4 w-full">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Followers</h2>
          </div>
          <div className="h-64 relative pr-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={followersData}>
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1" >
                    <stop offset="0%" stopColor="#add8e6" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#add8e6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="end_time"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  padding={{ right: 20 }}
                  interval="preserveStartEnd"
                  tickFormatter={(value, index) =>
                    formatTicks(value, index, dataRange, followersData.length)
                  }
                />
                <YAxis
                  domain={[
                    (dataMin) => (dataMin <= 0 ? 0 : dataMin - 1),
                    "dataMax + 1",
                  ]}
                  tickCount={5}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <Tooltip content={<ChartTooltipContent />} />
                <Area
                  type="linear"
                  dataKey="value"
                  stroke="#0000FF"
                  fill="url(#colorGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
            {isFollowersDataEmpty && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/75">
                <p className="text-2xl font-bold text-zinc-300">
                  No Data Available to show
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="border rounded-lg shadow-md p-4 w-full">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Visits</h2>
          </div>
          <div className="h-64 relative pr-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={pageVisitsData}>
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#add8e6" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#add8e6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="end_time"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  padding={{ right: 20 }}
                  interval="preserveStartEnd"
                  tickFormatter={(value, index) =>
                    formatTicks(value, index, dataRange, pageVisitsData.length)
                  }
                />
                <YAxis
                  domain={[
                    (dataMin) => (dataMin <= 0 ? 0 : dataMin - 1),
                    "dataMax + 1",
                  ]}
                  tickCount={5}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <Tooltip content={<ChartTooltipContent />} />
                <Area
                  type="linear"
                  dataKey="value"
                  stroke="#0000FF"
                  fill="url(#colorGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
            {isPageVisitsDataEmpty && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/75">
                <p className="text-2xl font-bold text-zinc-300">
                  No Data Available to show
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowerVisitChart;
