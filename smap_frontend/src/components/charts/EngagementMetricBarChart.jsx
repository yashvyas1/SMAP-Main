import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const chartConfig = {
  viewCount: {
    label: "Views",
    color: "#3b82f6",
  },
  likeCount: {
    label: "Likes",
    color: "#22c55e",
  },
  commentCount: {
    label: "Comments",
    color: "#f97316",
  },
  favoriteCount: {
    label: "Favorites",
    color: "#22c55e",
  },
  dislikeCount: {
    label: "Dislikes",
    color: "#f97316",
  },
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 shadow-lg rounded">
        <p className="font-bold">{label}</p>
        {payload.map((item, index) => (
          <p key={index} style={{ color: item.fill }}>
            {item.name}: {item.value}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

const EngagementMetricBarChart = ({ data = [], metricLabel, publishedDate }) => {
  const isEmpty = data.length === 0 || data.every(item => item.value === 0);

  return (
    <div className="bg-white w-full rounded-lg shadow-md p-2 mr-2 relative">
      <div className="mb-8 p-2 border-b border-gray-200">
        <h2 className="text-3xl font-semibold">{metricLabel}</h2>
        <h2 className="text-sm font-semibold">{publishedDate}</h2>
      </div>
      <div className="w-full h-[22rem] relative">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid vertical={false} strokeDasharray="5 5" />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Bar
              dataKey="value"
              fill={chartConfig.viewCount.color}
              radius={16}
              barSize={100}
            />
          </BarChart>
        </ResponsiveContainer>
        {isEmpty && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/75">
            <p className="text-2xl font-bold text-zinc-300">No Data Available to show</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EngagementMetricBarChart;