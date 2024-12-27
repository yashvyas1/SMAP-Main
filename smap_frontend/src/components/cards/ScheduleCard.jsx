import React, { useState } from "react";

const ScheduleCard = ({
  platform,
  username,
  message,
  type,
  date,
  time,
  icon,
  imageUrl,
}) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  const renderMessage = () => {
    if (isTruncated) {
      return message.length > 160 ? `${message.slice(0, 160)}` : message;
    }
    return message;
  };

  return (
    <div className="flex gap-2 w-full">
      <div
        className={`rounded-lg w-1 mr-2 h-full ${
          type === "Scheduled"
            ? "bg-blue-500"
            : type === "Published"
            ? "bg-green-500"
            : type === "Cancelled"
            ? "bg-red-500"
            : ""
        }`}
      ></div>
      <div className="w-full">
        <div className="flex justify-between gap-4 pr-4">
          <div className="flex flex-col mr-2 w-full">
            <div className="flex items-center">
              {icon}
              <p className="text-sm ml-2 text-gray-600">
                {platform}: @{username}
              </p>
            </div>
            <div className="mt-1 text-gray-900 text-md text-wrap">
              {renderMessage()}
              {message.length > 160 && (
                <span
                  onClick={toggleTruncate}
                  className="text-blue-500 cursor-pointer"
                >
                  {isTruncated ? " ...read more" : " ...show less"}
                </span>
              )}
            </div>
          </div>
          <div className="min-w-20">
            <img
              src={imageUrl}
              className="w-20 h-20 rounded-lg object-cover"
              alt={`${platform} post`}
            />
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between pr-4">
          <div
            className={`px-2 rounded-md font-semibold text-md ${
              type === "Scheduled"
                ? "bg-blue-100 text-blue-500"
                : type === "Published"
                ? "bg-green-100 text-green-500"
                : type === "Cancelled"
                ? "bg-red-100 text-red-500"
                : ""
            }`}
          >
            {type}
          </div>
          <div className="text-gray-600 text-sm">
            <span>{date}</span> <span>{time}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleCard;
