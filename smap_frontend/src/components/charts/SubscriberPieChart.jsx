import React, { useState } from "react";
import {
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
} from "recharts";

const chartData = [
  { name: "Gained", value: 80, fill: "#59A7FF" },
  { name: "Lost", value: 20, fill: "#2CDDC7" },
];

const ChartTooltipContent = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border rounded shadow-lg flex flex-col items-center justify-center">
        <p className="text-2xl font-extrabold">{`${payload[0].value}%`}</p>
        <p className="text-sm items-center font-extrabold">{`${payload[0].name}`}</p>
      </div>
    );
  }
  return null;
};

const SubscriberPieChart = () => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(-1);
  };

  return (
    <div className="bg-white w-full rounded-lg shadow-md p-2">
      <div className="text-3xl font-bold p-2">Subscribers</div>
      <div className="w-full h-[30rem]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius="50%"
              outerRadius="80%"
              stroke="var(--color-bg)"
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({ outerRadius = 0, ...props }) => (
                <Sector {...props} outerRadius={outerRadius + 10} />
              )}
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
            />
            <Tooltip content={<ChartTooltipContent />} />
            <Legend iconType="circle" verticalAlign="bottom" align="center" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SubscriberPieChart;