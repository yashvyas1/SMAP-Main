import React, { useState } from "react";
import SocialMediaStatistics from "../../../components/cards/SocialMediaStatistics";
import StatisticsLineChart from "../../../components/charts/StatisticsLineChart";
import { youtubeOverviewStats } from "../../../constant/data";

const YoutubeOverview = () => {
  const [selectedTitle, setSelectedTitle] = useState("Total Views");

  const handleCardClick = (title) => {
    setSelectedTitle(title);
  };

  const selectedData = youtubeOverviewStats.find(
    (state) => state.title === selectedTitle
  );

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-wrap w-full gap-8 xl:gap-[1%]">
        {youtubeOverviewStats.map((data, idx) => (
          <SocialMediaStatistics
            key={idx}
            title={data.title}
            icon={data.icon}
            count={data.count}
            percentage={data.percentage}
            isSelected={selectedTitle === data.title}
            onClick={() => handleCardClick(data.title)}
          />
        ))}
      </div>

      <div className="w-full">
        {selectedData && (
          <StatisticsLineChart
            data={selectedData.chartData}
            selectedMetric="value"
            metricLabel={selectedData.title}
          />
        )}
      </div>
    </div>
  );
};

export default YoutubeOverview;