import React, { useState } from "react";
import { BiSolidLike } from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";
import EngagementMetricCard from "../../../components/cards/EngagementMetricCard";
import AverageViewPieChart from "../../../components/charts/AverageViewPieChart";
import StatisticsLineChart from "../../../components/charts/StatisticsLineChart";
import SubscriberPieChart from "../../../components/charts/SubscriberPieChart";
import { audienceData } from "../../../constant/data";

const YoutubeAudience = () => {
  const [selectedMetric, setSelectedMetric] = useState("Watch Time");
  const [metricLabel, setMetricLabel] = useState("Watch Time");

  const handleMetricClick = (metric, label) => {
    setSelectedMetric(metric);
    setMetricLabel(label);
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex items-center flex-wrap w-full gap-8 xl:gap-[1%]">
        <EngagementMetricCard
          title="Watch Time"
          icon={<BsPeopleFill className="h-10 w-10 text-[#01A9FC]" />}
          count={audienceData.reduce(
            (total, item) => total + item.estimatedMinutesWatched,
            0
          )}
          percentage={0}
          isSelected={selectedMetric === "Watch Time"}
          onClick={() => handleMetricClick("Watch Time", "Watch Time")}
        />
        <EngagementMetricCard
          title="Impressions"
          icon={<BiSolidLike className="h-8 w-8 text-[#01A9FC]" />}
          count={audienceData.reduce(
            (total, item) => total + item.cardTeaserImpressions,
            0
          )}
          percentage={0}
          isSelected={selectedMetric === "Impressions"}
          onClick={() => handleMetricClick("Impressions", "Impressions")}
        />
      </div>
      <div>
        <StatisticsLineChart
          data={audienceData}
          selectedMetric={
            selectedMetric === "Watch Time"
              ? "estimatedMinutesWatched"
              : "cardTeaserImpressions"
          }
          metricLabel={metricLabel}
        />
      </div>
      <div className="flex items-center justify-between gap-12">
        <SubscriberPieChart />
        <AverageViewPieChart />
      </div>
    </div>
  );
};

export default YoutubeAudience;
