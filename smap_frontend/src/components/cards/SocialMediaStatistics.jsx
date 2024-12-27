import React from "react";

const SocialMediaStatistics = ({
  title,
  icon,
  count,
  percentage,
  isSelected,
  onClick,
}) => {
  return (
    <div
      className={`shadow-xl w-[17rem] xl:w-[19%] gap-8 flex flex-col p-6 cursor-pointer justify-between rounded-2xl ${
        isSelected ? "bg-[#86BAF4]/20" : "bg-white"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between w-full gap-4">
        <div className="text-xl font-bold">{title} </div>
        <div className="rounded-full">{icon}</div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-2xl lg:text-4xl font-extrabold">{count}</div>
        {percentage > 0 ? (
          <div className="text-md lg:text-xl text-[#59A7FF] font-extrabold">
            +{percentage}%
          </div>
        ) : (
          <div className="text-md lg:text-xl text-red-500 font-extrabold">
            {percentage}%
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialMediaStatistics;
