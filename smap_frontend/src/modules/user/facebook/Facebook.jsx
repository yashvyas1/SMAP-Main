import React, { lazy, Suspense, useState } from "react";
import LazyLoader from "../../../components/common/LazyLoader";
const FacebookContent = lazy(() => import("./FacebookContent"));
const FacebookOverview = lazy(() => import("./FacebookOverview"));

const Facebook = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const navbar = ["Overview", "Content","Page Summary"];

  const renderContent = () => {
    return activeTab === "Overview" ? (
      <FacebookOverview />
    ) : activeTab === "Content" ? (
      <FacebookContent />
    ) : null;
  };

  return (
    <div className="px-8 w-full">
      <div className="flex items-center gap-16 border-b pl-10 border-[#D8D7D7]">
        {navbar.map((tab) => (
          <button
            key={tab}
            className={`py-4 font-semibold font-nunito text-xl ${
              activeTab === tab
                ? "text-[#01A9FC] border-b-2 border-[#01A9FC]"
                : "text-[#000] border-b-2 border-[#fff]"
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

export default Facebook;
