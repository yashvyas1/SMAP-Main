import React from "react";
import { AiFillLike } from "react-icons/ai";
import { BsFillFileTextFill } from "react-icons/bs";
import { FaComments, FaUserFriends } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";
import SocialMediaStatistics from "../../../components/cards/SocialMediaStatistics";
import FacebookAnalyticsBarChart from "../../../components/charts/FacebookAnalyticsBarChart";
import PostTypePieChart from "../../../components/charts/PostTypePieChart";
import { facebookProfileData } from "../../../constant/data";

const FacebookOverview = () => {
  const statisticsArray = [
    {
      title: "Total Friends",
      icon: <FaUserFriends className="h-10 w-10 text-[#01A9FC]" />,
      count: facebookProfileData.totalFriends,
      percentage: "5",
    },
    {
      title: "Total Posts",
      icon: <BsFillFileTextFill className="h-6 w-6 text-[#01A9FC]" />,
      count: facebookProfileData.totalPosts,
      percentage: "2",
    },
    {
      title: "Total Reactions",
      icon: <AiFillLike className="h-8 w-8 text-[#01A9FC]" />,
      count: facebookProfileData.totalReactions,
      percentage: "8",
    },
    {
      title: "Total Comments",
      icon: <FaComments className="h-8 w-8 text-[#01A9FC]" />,
      count: facebookProfileData.totalComments,
      percentage: "-3",
    },
    {
      title: "Total Shares",
      icon: <RiSendPlaneFill className="h-8 w-8 text-[#01A9FC]" />,
      count: facebookProfileData.totalShares,
      percentage: "-1",
    },
  ];

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-wrap w-full gap-8 xl:gap-[1%]">
        {statisticsArray.map((data, idx) => (
          <SocialMediaStatistics
            key={idx}
            title={data.title}
            icon={data.icon}
            count={data.count}
            percentage={data.percentage}
          />
        ))}
      </div>

      <div className="flex flex-wrap lg:flex-nowrap items-center gap-8 lg:gap-[1%]">
        <div className="w-full lg:w-1/2 xl:w-3/4">
          <FacebookAnalyticsBarChart />
        </div>
        <div className="flex flex-col w-full lg:w-1/2 xl:w-1/4 xl:mr-2">
          <PostTypePieChart />
        </div>
      </div>
    </div>
  );
};

export default FacebookOverview;