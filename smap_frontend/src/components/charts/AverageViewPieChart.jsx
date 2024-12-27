import React, { useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Label,
} from "recharts";

const chartData = [
  { name: "Duration", value: 65, fill: "#59A7FF" },
  { name: "Percentage", value: 35, fill: "#2CDDC7" },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 shadow-md rounded-md flex flex-col items-center justify-center">
        <p className="text-2xl font-extrabold">{`${payload[0].value}%`}</p>
        <p className="text-sm items-center font-extrabold">{`${payload[0].name}`}</p>
      </div>
    );
  }

  return null;
};

const AverageViewPieChart = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <div className="bg-white flex flex-col w-full rounded-lg shadow-md p-2">
      <div className="text-3xl font-bold p-2">Average View</div>
      <div className="w-full h-[30rem]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={activeIndex !== null ? "70%" : "70%"}
              dataKey="value"
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
}

export default AverageViewPieChart;
