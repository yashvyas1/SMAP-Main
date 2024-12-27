import React, { useState } from "react";
import { FaInstagram } from "react-icons/fa";
import SocialMediaStatistics from "../../../components/cards/SocialMediaStatistics";
import InstaPieChart from "../../../components/charts/InstaPieChart";
import StatisticsLineChart from "../../../components/charts/StatisticsLineChart";
import PostsTile from "../../../components/tiles/PostsTile";
import { cardData, socialMediaStatistics } from "../../../constant/data";

const Instagram = () => {
  const [selectedTitle, setSelectedTitle] = useState("Total Followers");
  const [selectedType, setSelectedType] = useState("Subscribers");

  const handleCardClick = (title) => {
    setSelectedTitle(title);
  };

  const handleType = (type) => {
    setSelectedType(type);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap w-full gap-8 xl:gap-[1%] p-4">
        {socialMediaStatistics.map((data, idx) => (
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

      <div className="flex items-center flex-wrap lg:flex-nowrap p-4 gap-8 lg:gap-[3%]">
        <div className="w-full lg:w-1/2 xl:w-3/4">
          <StatisticsLineChart />
        </div>
        <div className="flex flex-col w-full lg:w-1/2 xl:w-1/4">
          <div className="ml-auto mb-4">
            <button
              className={`px-4 py-1 rounded-l-xl border border-[#00ABFF] font-bold ${
                selectedType === "Subscribers"
                  ? "bg-[#00ABFF] text-white"
                  : "bg-white"
              }`}
              onClick={() => handleType("Subscribers")}
            >
              Subscribers
            </button>
            <button
              className={`px-4 py-1 rounded-r-xl border border-[#00ABFF] font-bold ${
                selectedType === "Average Views"
                  ? "bg-[#00ABFF] text-white"
                  : "bg-white"
              }`}
              onClick={() => handleType("Average Views")}
            >
              Average Views
            </button>
          </div>
          <InstaPieChart selectedType={selectedType} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 px-4 py-2 md:grid-cols-4">
        {cardData.map((data, idx) => (
          <PostsTile
            key={idx}
            platform="Facebook"
            icon={<FaInstagram className="h-6 w-6 text-[#C13584]" />}
            username={data.username}
            message={data.message}
            imageUrl={data.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default Instagram;
