import React, { useState } from "react";
import { MdError } from "react-icons/md";

const YoutubeTile = ({
  username,
  videoIcon,
  shortsIcon,
  title,
  thumbnailUrl,
  isSelected,
  postType,
  onClick,
}) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  const renderTitle = () => {
    if (isTruncated) {
      return title.length > 90 ? `${title.slice(0, 90)}...` : title;
    }
    return title;
  };

  return (
    <div
      className={`flex w-[26.3rem] p-4 rounded-lg shadow-md hover:shadow-lg cursor-pointer ${
        isSelected ? "bg-[#559cee]/30" : "bg-white"
      }`}
      onClick={onClick}
    >
      {thumbnailUrl ? (
        <img
          src={thumbnailUrl}
          alt={title || "YouTube Video"}
          className="min-w-16 h-24 object-cover rounded-lg"
        />
      ) : (
        <div className="min-w-16 h-24 flex items-center justify-center bg-gray-200 rounded-lg">
          <MdError className="min-w-8 h-12" />
        </div>
      )}
      <div className="flex flex-col w-full ml-4">
        <div className="flex items-center mb-2">
          {postType === "video" ? videoIcon : shortsIcon}
          <p className="ml-2 font-semibold">{username}</p>
        </div>

        <p className="mt-1 text-gray-900">
          {renderTitle()}
          {title && title.length > 90 && (
            <span
              onClick={toggleTruncate}
              className="text-blue-500 cursor-pointer ml-1"
            ></span>
          )}
        </p>
      </div>
    </div>
  );
};

export default YoutubeTile;