import React, { useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { facebookAllPost } from "../../constant/data";

const processPostData = (data) => {
  const counts = {
    image: 0,
    video: 0,
    text: 0,
    other: 0,
  };

  data.forEach((post) => {
    if (counts[post.contentType] !== undefined) {
      counts[post.contentType] += 1;
    } else {
      counts.other += 1;
    }
  });

  return [
    { name: "Image", value: counts.image, fill: "#59A7FF" },
    { name: "Video", value: counts.video, fill: "#2CDDC7" },
    { name: "Text", value: counts.text, fill: "#849AA9" },
    { name: "Other", value: counts.other, fill: "#7ADD2C" },
  ];
};

const chartData = processPostData(facebookAllPost);

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 shadow-md rounded-md flex flex-col items-center justify-center">
        <p className="text-2xl font-extrabold">{`${payload[0].value}`}</p>
        <p className="text-sm items-center font-extrabold">{`${payload[0].name}s`}</p>
      </div>
    );
  }

  return null;
};

const PostTypePieChart = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <div className="bg-white flex flex-col w-full rounded-lg shadow-md p-4">
      <div className="text-3xl rounded-xl font-bold">Post Types</div>
      <div className="w-full h-[27rem]">
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
            <Legend
              className="flex justify-center items-end"
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PostTypePieChart;
