import React from "react";

const LoaderCard = () => {
  return (
    <div className="shadow-xl w-[17rem] xl:w-[19%] gap-4 flex flex-col p-6 cursor-pointer justify-between rounded-2xl bg-zinc-300/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-25 animate-shimmer"></div>
      <div className="flex items-center justify-between h-12 gap-4 w-full">
        <div className="bg-zinc-300 rounded-lg h-12 w-1/2"></div>
        <div className="bg-zinc-300 rounded-full h-10 w-10"></div>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <div className="bg-zinc-300 rounded-lg h-8 w-full"></div>
        <div className="bg-zinc-300 rounded-lg h-8 w-full"></div>
        <div className="bg-zinc-300 rounded-lg h-8 w-full"></div>
        <div className="bg-zinc-300 rounded-lg h-8 w-full"></div>
      </div>
    </div>
  );
};

const LazyLoader = () => {
  return (
    <div className="flex flex-col w-full">
    <div className="flex flex-wrap items-center gap-8 mt-4 xl:gap-[1%]">
      <LoaderCard />
      <LoaderCard />
      <LoaderCard />
      <LoaderCard />
      <LoaderCard />
    </div>
     <div className="flex flex-wrap items-center gap-8 mt-4 xl:gap-[1%]">
     <LoaderCard />
     <LoaderCard />
     <LoaderCard />
     <LoaderCard />
     <LoaderCard />
   </div>
    <div className="flex flex-wrap items-center gap-8 mt-4 xl:gap-[1%]">
    <LoaderCard />
    <LoaderCard />
    <LoaderCard />
    <LoaderCard />
    <LoaderCard />
  </div>
  </div>
  );
};

export default LazyLoader;
