import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

const StatisticsLineChart = ({ data, selectedMetric, metricLabel }) => {

  const customTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-300 rounded shadow">
          <p>{label}</p>
          <p>{`${metricLabel} : ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white w-full rounded-lg shadow-md p-2">
      <div className="mb-8 p-2 border-b border-gray-200">
        <h2 className="text-3xl font-semibold">{metricLabel}</h2>
      </div>
      <div className="w-full h-[22rem]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="5 5" vertical={false} />
            <XAxis dataKey="Date" />
            <YAxis />
            <Tooltip content={customTooltip} />
            <Line
              type="monotone"
              dataKey={selectedMetric}
              stroke="#00BFFF"
              strokeWidth={4}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatisticsLineChart;
