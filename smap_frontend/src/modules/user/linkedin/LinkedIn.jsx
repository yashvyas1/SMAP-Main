import React, { useState } from "react";
import SocialMediaStatistics from "../../../components/cards/SocialMediaStatistics";
import { socialMediaStatistics } from "../../../constant/data";

const LinkedIn = () => {
  const [selectedTitle, setSelectedTitle] = useState("Total Followers");

  const handleCardClick = (title) => {
    setSelectedTitle(title);
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
    </div>
  );
};

export default LinkedIn;
