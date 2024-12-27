import React, { lazy, Suspense, useState } from "react";
import LazyLoader from "../../../components/common/LazyLoader";
const YoutubeContent = lazy(() => import("./YoutubeContent"));
const YoutubeOverview = lazy(() => import("./YoutubeOverview"));
const YoutubeAudience = lazy(() => import("./YoutubeAudience"));

const Youtube = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const navbar = ["Overview", "Content", "Audience"];

  const renderContent = () => {
    return activeTab === "Overview" ? (
      <YoutubeOverview />
    ) : activeTab === "Content" ? (
      <YoutubeContent />
    ) : activeTab === "Audience" ? (
      <YoutubeAudience />
    ) : null;
  };

  return (
    <div className="px-8 w-full">
      <div className="flex items-center gap-16 border-b border-gray-300">
        {navbar.map((tab) => (
          <button
            key={tab}
            className={`py-2 font-bold text-2xl ${
              activeTab === tab
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-600 border-b-2 border-white"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <Suspense fallback={<LazyLoader />}>
        <div className="mt-4">{renderContent()}</div>
      </Suspense>
    </div>
  );
};

export default Youtube;
