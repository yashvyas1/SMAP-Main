import React, { useState } from "react";
import { MdError } from "react-icons/md";

const FacebookTile = ({
  icon,
  username,
  description,
  postURL,
  isSelected,
  onClick,
}) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  const renderDescription = () => {
    if (isTruncated) {
      return description && description.length > 90
        ? `${description.slice(0, 90)}...`
        : description || "No description available";
    }
    return (
      description || (
        <div className="flex items-center">
          <MdError className="w-8 h-12 mr-2" />
          <span>No description available</span>
        </div>
      )
    );
  };

  return (
    <div
      className={`flex w-[26rem] p-4 rounded-lg shadow-md hover:shadow-lg cursor-pointer ${
        isSelected ? "bg-[#559cee]/30" : "bg-white"
      }`}
      onClick={onClick}
    >
      {postURL ? (
        <img
          src={postURL}
          alt={description || "Facebook Post"}
          className="min-w-16 h-24 object-cover rounded-lg"
        />
      ) : (
        <div className="min-w-16 h-24 flex items-center justify-center bg-gray-200 rounded-lg">
          <MdError className="min-w-8 h-12" />
        </div>
      )}
      <div className="flex flex-col w-full ml-4">
        <div className="flex items-center mb-2">
          {icon}
          <p className="ml-2 font-semibold">{username}</p>
        </div>

        <p className="mt-1 text-gray-900 text-sm">
          {renderDescription()}
          {description && description.length > 90 && (
            <span
              onClick={toggleTruncate}
              className="text-blue-500 cursor-pointer ml-1"
            >
              {isTruncated ? "read more" : "show less"}
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default FacebookTile;
