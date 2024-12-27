import React, { useState, useRef } from "react";
import { FaThumbsUp, FaThumbsDown, FaShareAlt, FaSave, FaPlay } from "react-icons/fa";
import { TiArrowSync } from "react-icons/ti";
import { AiFillLike } from "react-icons/ai";
import { BiSolidDislike } from "react-icons/bi";
import { MdComment } from "react-icons/md";
import { PiShareFatFill } from "react-icons/pi";
import { SiApplemusic } from "react-icons/si";

const YoutubePreview = ({ selectedVideo, details, postType, time }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Handle video play/pause when clicked
  const handleVideoClick = () => {
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  if (postType === "reels" && details.video) {
    return (
      <div className="relative bg-black w-full h-[80vh] rounded-lg text-white overflow-hidden">
        <div className="flex justify-center items-center h-full">
          <div className="relative w-full h-full cursor-pointer" onClick={handleVideoClick}>
            <video
              ref={videoRef}
              src={selectedVideo}
              className="object-cover w-full h-full"
              onClick={handleVideoClick}
              muted
              controls={false}
            />
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
                <FaPlay size={44} />
              </div>
            )}
          </div>
        </div>

        <div className="absolute right-4 top-[280px] space-y-6">
          <button className="flex flex-col items-center">
            <AiFillLike size={24} />
            <span className="text-xs mt-1">Like</span>
          </button>
          <button className="flex flex-col items-center">
            <BiSolidDislike size={24} />
            <span className="text-xs mt-1">Dislike</span>
          </button>
          <button className="flex flex-col items-center">
            <MdComment size={24} />
            <span className="text-xs mt-1">0</span>
          </button>
          <button className="flex flex-col items-center">
            <PiShareFatFill size={24} />
            <span className="text-xs mt-1">Share</span>
          </button>
          <button className="flex flex-col items-center">
            <TiArrowSync size={24} />
            <span className="text-xs mt-1">Remix</span>
          </button>
        </div>

        <div className="absolute bottom-12 left-4">
          <div className="flex items-center mt-2">
            <img
              src="https://via.placeholder.com/32"
              alt="Profile"
              className="rounded-full w-8 h-8 mr-2"
            />
            <span className="text-sm">@profilename</span>
          </div>
          <p className="text-sm ml-1 pt-1">{details.caption}</p>
        </div>

        <div className="absolute bottom-4 left-4 flex items-center">
          <div className="relative w-[330px] ml-2 overflow-hidden px-2 py-1">
            <div className="whitespace-nowrap animate-slide text-sm text-white">
              <span>@profilename · Original audio</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-2 right-4 flex items-center">
          <div className="border-2 border-white rounded-md p-2">
            <button className="flex items-center justify-center">
              <SiApplemusic size={20} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (postType === "video" && details.video) {
    return (
      <div className="bg-white w-full shadow-md rounded-lg">
        <div className="relative bg-black w-full h-64 flex items-center justify-center">
          <video className="w-full h-full object-cover" controls>
            <source src={details.video} type="video/mp4" />
          </video>
        </div>

        <div className="p-4">
          <h2 className="font-bold text-lg mb-2">
            {details.caption}
          </h2>
          <div className="text-sm text-gray-600">
            0 views • date   
          </div>
        </div>

        <div className="px-4 py-2 border-t border-gray-200 flex items-center justify-between text-gray-600 text-sm">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2">
              <FaThumbsUp />
              <span>1.7K</span>
            </button>
            <button className="flex items-center space-x-2">
              <FaThumbsDown />
              <span>632</span>
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2">
              <FaShareAlt />
              <span>SHARE</span>
            </button>
            <button className="flex items-center space-x-2">
              <FaSave />
              <span>SAVE</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default YoutubePreview;