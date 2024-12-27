import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaFacebook } from "react-icons/fa";
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";
import EngagementMetricBarChart from "../../../components/charts/EngagementMetricBarChart";
import FacebookTile from "../../../components/tiles/FacebookTile";
import { facebookAllPost } from "../../../constant/data";

const getPostTypes = (posts) => {
  const types = posts.reduce((acc, post) => {
    acc.add(
      post.contentType === "image" ||
        post.contentType === "video" ||
        post.contentType === "text"
        ? post.contentType.charAt(0).toUpperCase() + post.contentType.slice(1)
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

const FacebookContent = () => {
  const postTypes = useMemo(
    () => getPostTypes(facebookAllPost),
    [facebookAllPost]
  );
  const [selectedPostData, setSelectedPostData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState(facebookAllPost);
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const updateSelectedPost = (data) => {
    const chartData = [
      { name: "Likes", value: data.statistics.likeCount },
      { name: "Comments", value: data.statistics.commentCount },
      { name: "Shares", value: data.statistics.shareCount },
    ];
    setSelectedPostData(chartData);
    setSelectedDate(data.postId);
  };

  const filterPosts = (index) => {
    const selectedType = postTypes[index].toLowerCase();
    const filtered =
      selectedType === "all"
        ? facebookAllPost
        : selectedType === "others"
        ? facebookAllPost.filter(
            (post) => !["image", "video", "text"].includes(post.contentType)
          )
        : facebookAllPost.filter((post) => post.contentType === selectedType);

    setFilteredPosts(filtered);
    filtered.length > 0 && updateSelectedPost(filtered[0]);
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
    updateSelectedPost(data);
  };

  useMemo(() => {
    updateSelectedPost(facebookAllPost[0]);
  }, []);

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
      <div className="flex items-center w-full">
        <EngagementMetricBarChart
          data={selectedPostData}
          metricLabel={"Post Analytics"}
        />
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
      <div className="flex items-center gap-4 w-full flex-wrap">
        {filteredPosts.map((data, idx) => (
          <FacebookTile
            key={idx}
            platform="Facebook"
            icon={<FaFacebook className="h-6 w-6 text-[#1877F2]" />}
            username="amanKurmi"
            description={data.description}
            postURL={data.postURL}
            likeCount={data.statistics.likeCount}
            commentCount={data.statistics.commentCount}
            shareCount={data.statistics.shareCount}
            isSelected={selectedDate === data.postId}
            onClick={() => handleTileClick(data)}
          />
        ))}
      </div>
    </div>
  );
};

export default FacebookContent;