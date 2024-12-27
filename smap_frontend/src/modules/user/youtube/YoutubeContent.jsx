import React, { useEffect, useMemo, useRef, useState } from "react";
import { BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";
import { FaComments, FaShareAlt, FaYoutube } from "react-icons/fa";
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";
import { SiYoutubeshorts } from "react-icons/si";
import EngagementMetricCard from "../../../components/cards/EngagementMetricCard";
import EngagementMetricBarChart from "../../../components/charts/EngagementMetricBarChart";
import StatisticsLineChart from "../../../components/charts/StatisticsLineChart";
import YoutubeTile from "../../../components/tiles/YoutubeTile";
import { audienceData, sampleYoutubeData } from "../../../constant/data";

const getPostTypes = (posts) => {
  const types = posts.reduce((acc, post) => {
    acc.add(
      post.postType === "shorts" || post.postType === "video"
        ? post.postType.charAt(0).toUpperCase() + post.postType.slice(1)
        : "Others"
    );
    return acc;
  }, new Set());

  return ["All", ...Array.from(types)];
};

const Dropdown = ({
  isOpen,
  toggleDropdown,
  selectedIndex,
  handleItemClick,
  postTypes,
}) => (
  <div className="relative">
    <button
      onClick={toggleDropdown}
      className="flex items-center justify-between text-md font-bold w-36 rounded-lg px-4 py-2 bg-zinc-100 border"
    >
      <div className="flex">{postTypes[selectedIndex]}</div>
      {isOpen ? <IoIosArrowDropupCircle /> : <IoIosArrowDropdownCircle />}
    </button>
    {isOpen && (
      <div className="z-10 absolute mt-2 w-full rounded-lg shadow-lg bg-white border">
        {postTypes.map((type, index) =>
          index !== selectedIndex ? (
            <div
              key={index}
              className="px-4 py-2 hover:bg-zinc-100 cursor-pointer"
              onClick={() => handleItemClick(index)}
            >
              {type}
            </div>
          ) : null
        )}
      </div>
    )}
  </div>
);

const YoutubeContent = () => {
  const [filteredPosts, setFilteredPosts] = useState(sampleYoutubeData);
  const [selectedVideoData, setSelectedVideoData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [chartType, setChartType] = useState("line");
  const [selectedMetric, setSelectedMetric] = useState("views");
  const [metricLabel, setMetricLabel] = useState("Views");
  const [publishedDate, setPublishedDate] = useState("Views");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const postTypes = useMemo(
    () => getPostTypes(sampleYoutubeData),
    [sampleYoutubeData]
  );

  const filterPosts = (index) => {
    const selectedType = postTypes[index].toLowerCase();
    const filtered =
      selectedType === "all"
        ? sampleYoutubeData
        : selectedType === "others"
        ? sampleYoutubeData.filter(
            (post) => !["shorts", "video"].includes(post.postType)
          )
        : sampleYoutubeData.filter((post) => post.postType === selectedType);

    setFilteredPosts(filtered);
    if (filtered.length > 0) {
      const firstPost = filtered[0];
      const chartData = [
        { name: "Views", value: firstPost.statistics.viewCount },
        { name: "Likes", value: firstPost.statistics.likeCount },
        { name: "Dislikes", value: firstPost.statistics.dislikeCount },
        { name: "Comments", value: firstPost.statistics.commentCount },
        { name: "Favorites", value: firstPost.statistics.favoriteCount },
      ];
      setSelectedVideoData(chartData);
      setSelectedDate(firstPost.videoId);
      setMetricLabel("Views");
      setSelectedMetric("views");
      setChartType("bar");
    } else {
      setSelectedVideoData([]);
      setSelectedDate(null);
      setMetricLabel("");
    }
  };

  const handleItemClick = (index) => {
    setSelectedIndex(index);
    setIsOpen(false);
    filterPosts(index);
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleTileClick = (data) => {
    const chartData = [
      { name: "Views", value: data.statistics.viewCount },
      { name: "Likes", value: data.statistics.likeCount },
      { name: "Dislikes", value: data.statistics.dislikeCount },
      { name: "Comments", value: data.statistics.commentCount },
      { name: "Favorites", value: data.statistics.favoriteCount },
    ];

    const date = new Date(data.publishedAt);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-GB", options);

    setSelectedVideoData(chartData);
    setMetricLabel(data.title);
    setSelectedDate(data.videoId);
    setChartType("bar");
    setPublishedDate(formattedDate);
  };

  const handleMetricClick = (data, metric, label) => {
    setSelectedMetric(metric);
    setMetricLabel(label);
    setSelectedDate(data.Date);
    setChartType("line");
  };

  useEffect(() => {
    if (filteredPosts.length > 0) {
      const firstPost = filteredPosts[0];
      const initialData = [
        { name: "Views", value: firstPost.statistics.viewCount },
        { name: "Likes", value: firstPost.statistics.likeCount },
        { name: "Dislikes", value: firstPost.statistics.dislikeCount },
        { name: "Comments", value: firstPost.statistics.commentCount },
        { name: "Favorites", value: firstPost.statistics.favoriteCount },
      ];
      setSelectedVideoData(initialData);
      setSelectedDate(firstPost.videoId);
      setMetricLabel("Views");
      setSelectedMetric("views");
    }
  }, [filteredPosts]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex items-center justify-between mr-2 flex-wrap w-full gap-8 xl:gap-[1%]">
        <EngagementMetricCard
          title="Views"
          icon={<BsPeopleFill className="h-10 w-10 text-[#01A9FC]" />}
          count={audienceData.reduce((total, item) => total + item.views, 0)}
          percentage={0}
          isSelected={selectedMetric === "views" && chartType === "line"}
          onClick={() => handleMetricClick(audienceData[0], "views", "Views")}
        />
        <EngagementMetricCard
          title="Likes"
          icon={<BiSolidLike className="h-8 w-8 text-[#01A9FC]" />}
          count={audienceData.reduce((total, item) => total + item.likes, 0)}
          percentage={0}
          isSelected={selectedMetric === "likes" && chartType === "line"}
          onClick={() => handleMetricClick(audienceData[0], "likes", "Likes")}
        />
        <EngagementMetricCard
          title="Dislikes"
          icon={<BiSolidDislike className="h-8 w-8 text-[#01A9FC]" />}
          count={audienceData.reduce((total, item) => total + item.dislikes, 0)}
          percentage={0}
          isSelected={selectedMetric === "dislikes" && chartType === "line"}
          onClick={() =>
            handleMetricClick(audienceData[0], "dislikes", "Dislikes")
          }
        />
        <EngagementMetricCard
          title="Comments"
          icon={<FaComments className="h-8 w-8 text-[#01A9FC]" />}
          count={audienceData.reduce((total, item) => total + item.comments, 0)}
          percentage={0}
          isSelected={selectedMetric === "comments" && chartType === "line"}
          onClick={() =>
            handleMetricClick(audienceData[0], "comments", "Comments")
          }
        />
        <EngagementMetricCard
          title="Shares"
          icon={<FaShareAlt className="h-8 w-8 text-[#01A9FC]" />}
          count={audienceData.reduce((total, item) => total + item.shares, 0)}
          percentage={0}
          isSelected={selectedMetric === "shares" && chartType === "line"}
          onClick={() => handleMetricClick(audienceData[0], "shares", "Shares")}
        />
      </div>
      <div>
        {chartType === "line" ? (
          <StatisticsLineChart
            data={audienceData}
            selectedMetric={selectedMetric}
            metricLabel={metricLabel}
          />
        ) : (
          <EngagementMetricBarChart
            data={selectedVideoData}
            metricLabel={metricLabel}
            publishedDate={publishedDate}
          />
        )}
      </div>
      <div className="flex gap-4 ml-auto relative">
        <div ref={dropdownRef}>
          <Dropdown
            isOpen={isOpen}
            toggleDropdown={toggleDropdown}
            selectedIndex={selectedIndex}
            handleItemClick={handleItemClick}
            postTypes={postTypes}
          />
        </div>
      </div>
      <div className="flex items-center flex-wrap w-full gap-4">
        {filteredPosts.map((data, idx) => (
          <YoutubeTile
            key={idx}
            platform="Youtube"
            username="@Yash_YT_Channel"
            videoIcon={<FaYoutube className="h-6 w-6 text-[#FF0000]" />}
            shortsIcon={<SiYoutubeshorts className="h-5 w-5 text-[#FF0000]" />}
            postType={data.postType}
            title={data.title}
            description={data.description}
            publishedAt={data.publishedAt}
            thumbnailUrl={data.thumbnailUrl}
            viewCount={data.statistics.viewCount}
            likeCount={data.statistics.likeCount}
            dislikeCount={data.statistics.dislikeCount}
            favoriteCount={data.statistics.favoriteCount}
            commentCount={data.statistics.commentCount}
            isSelected={selectedDate === data.videoId && chartType === "bar"}
            onClick={() => handleTileClick(data)}
          />
        ))}
      </div>
    </div>
  );
};

export default YoutubeContent;