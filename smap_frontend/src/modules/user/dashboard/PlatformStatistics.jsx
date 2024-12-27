import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import FormatNumbers from "../../../components/common/FormatNumbers";
import LazyLoader from "../../../components/common/LazyLoader";
import { platformMetricsIcons } from "../../../components/common/PlatformMetricsIcons";
import PlatformSelectDropdown from "../../../components/common/PlatformSelectDropdown";

const BACKEND_URL = "http://localhost:8000";

const platforms = [
  {
    id: "facebook",
    icon: <FaFacebook className="h-[22px] w-[22px] text-[#1877F2]" />,
    miniIcon: <FaFacebook className="h-[16px] w-[16px] text-[#1877F2]" />,
    keysToShow: ["totalFollowers", "totalPosts", "totalLikes", "totalComments", "totalShares"],
  },
  {
    id: "instagram",
    icon: <FaInstagram className="h-6 w-6 text-[#C13584]" />,
    miniIcon: <FaInstagram className="h-[16px] w-[16px] text-[#1877F2]" />,
    keysToShow: ["totalFollowers", "totalPosts", "totalLikes", "totalComments"],
  },
  {
    id: "twitter",
    icon: <FaXTwitter className="h-6 w-6 text-[#120143]" />,
    miniIcon: <FaXTwitter className="h-[16px] w-[16px] text-[#1877F2]" />,
    keysToShow: ["totalFollowers", "totalTweets", "totalRetweets", "totalLikes"],
  },
  {
    id: "linkedin",
    icon: <FaLinkedin className="h-6 w-6 text-[#0077B5]" />,
    miniIcon: <FaLinkedin className="h-[16px] w-[16px] text-[#1877F2]" />,
    keysToShow: ["totalConnections", "totalPosts", "totalLikes", "totalComments"],
  },
  {
    id: "youtube",
    icon: <FaYoutube className="h-6 w-6 text-[#b50000]" />,
    miniIcon: <FaYoutube className="h-[16px] w-[16px] text-[#1877F2]" />,
    keysToShow: ["totalSubscribers", "totalVideos", "totalViews", "totalLikes"],
  },
];

const StatisticCard = ({ label, icon, value, growth }) => {
  return (
    <div className="shadow-xl w-full mb-6 sm:w-[49%] md:w-[49%] lg:w-[32%] xl:w-[24%] 2xl:w-[19%] flex flex-col h-36 p-6 cursor-pointer justify-between rounded-2xl bg-[#86BAF433]/20">
      <div className="flex items-center justify-between w-full gap-4">
        <div className="text-lg font-bold">{label}</div>
        <div className="rounded-full">{icon}</div>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-4xl font-extrabold">{FormatNumbers(value)}</div>
        <div
          className={`text-lg font-semibold ${growth >= 0 ? "text-blue-500" : "text-red-500"
            }`}
        >
          {growth > 0
            ? `+${growth.toFixed(2).replace(/\.00$/, "").replace(/\.0$/, "")}%`
            : growth.toFixed(2).replace(/\.00$/, "").replace(/\.0$/, "") + "%"}
        </div>
      </div>
    </div>
  );
};

const PlatformStatistic = (status) => {
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [platformIndex, setPlatformIndex] = useState(0);

  const getStatsData = async (id) => {
    try {
      const res = await axios.get(`${BACKEND_URL}/users/dashboard/overview`, {
        params: { filter: id },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = res?.data;
      setStatsData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setStatsData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const { id } = platforms[platformIndex];

    if (status.status) {
      getStatsData(id);
    } else {
      setStatsData(null);
    }
  }, [status, platformIndex])

  if (loading) {
    return <LazyLoader />;
  }

  const { keysToShow } = platforms[platformIndex];

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex w-full justify-between">
        <div>
          <PlatformSelectDropdown
            platformIndex={platformIndex}
            setPlatformIndex={setPlatformIndex}
            platforms={platforms}
          />
        </div>
        <div className="flex items-center gap-4 pr-4">
          <div className="flex relative">
            <div className="h-8 w-8 z-0">
              <img
                src={statsData?.pagePicture}
                alt="Page"
                className="w-8 h-8 rounded-full object-cover"
              />
            </div>
            <div className="absolute -right-2 z-10">
              {platforms[platformIndex].miniIcon}
            </div>
          </div>

          <div className="text-lg">{statsData?.pageName}</div>
        </div>
      </div>
      {!statsData ? (
        <div>No data available</div>
      ) : (
        <div className="flex items-center flex-wrap mt-4 gap-[1%] w-full">
          {keysToShow?.map((key) => {
            const { icon } = platformMetricsIcons?.[key] || {};
            const growthKey = `growth${key.replace("total", "")}`;
            const formattedKey = key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase());
            return (
              <StatisticCard
                key={key}
                label={formattedKey}
                icon={icon}
                value={statsData?.[key]}
                growth={statsData?.[growthKey]}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PlatformStatistic;
