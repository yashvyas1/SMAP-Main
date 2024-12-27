import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Sector
} from "recharts";

const chartDataSubscribers = [
  { age: "13-25", users: 50, fill: "#59A7FF" },
  { age: "25-40", users: 25, fill: "#2CDDC7" },
  { age: "Above 40", users: 25, fill: "#849AA9" },
];

const chartDataAverageViews = [
  { name: "Men", value: 63, fill: "#59A7FF" },
  { name: "Women", value: 33, fill: "#2CDDC7" },
  { name: "Others", value: 4, fill: "#849AA9" },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 shadow-md rounded-md flex flex-col items-center justify-center">
        <p className="text-2xl font-extrabold">{`${payload[0].value}%`}</p>
        <p className="text-sm items-center font-extrabold">{`${payload[0].name || payload[0].age}`}</p>
      </div>
    );
  }
  return null;
};

const InstaPieChart = ({ selectedType }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const chartData =
    selectedType === "Subscribers" ? chartDataSubscribers : chartDataAverageViews;

  const isHollowChart = selectedType === "Subscribers";

  return (
    <div className="bg-white w-full rounded-lg shadow-md p-2">
      <div className="w-full h-[30rem]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey={isHollowChart ? "users" : "value"}
              nameKey={isHollowChart ? "age" : "name"}
              innerRadius={isHollowChart ? "50%" : "0%"}
              outerRadius="80%"
              stroke={isHollowChart ? "var(--color-bg)" : "none"}
              strokeWidth={isHollowChart ? 5 : 0}
              activeIndex={activeIndex}
              activeShape={
                isHollowChart
                  ? ({ outerRadius = 0, ...props }) => (
                      <Sector {...props} outerRadius={outerRadius + 10} />
                    )
                  : undefined
              }
              onMouseEnter={onPieEnter}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.fill}
                  stroke={activeIndex === index ? entry.fill : "none"}
                  strokeWidth={activeIndex === index ? 24 : 0}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend iconType="circle" verticalAlign="bottom" align="center" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default InstaPieChart;
