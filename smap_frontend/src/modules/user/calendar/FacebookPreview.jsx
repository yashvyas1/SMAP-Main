import React, { useEffect, useRef, useState } from "react";
import { TiArrowSync } from "react-icons/ti";
import { AiFillLike } from "react-icons/ai";
import { BiSolidDislike } from "react-icons/bi";
import { MdComment, MdGraphicEq } from "react-icons/md";
import { PiShareFatFill, PiShareFatThin } from "react-icons/pi";
import { FaPlay, FaRegComment } from "react-icons/fa";
import { IoImagesOutline } from "react-icons/io5";
import { SlLike } from "react-icons/sl";
import { TbInfoCircle } from "react-icons/tb";

const FacebookPreview = ({ selectedVideo, selectedImages, details, postType }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  // Handle image click to navigate left or right in the image carousel
  const handleImageClick = (event) => {
    const boundingRect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - boundingRect.left;
    const clickRegion = boundingRect.width / 2;

    if (clickX < clickRegion) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : selectedImages.length - 1
      );
    } else {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < selectedImages.length - 1 ? prevIndex + 1 : 0
      );
    }
  };

  useEffect(() => {
  }, [selectedVideo]);

  if (postType === "reels") {
    return (
      <div className="relative bg-black text-white h-[45rem] overflow-hidden">
        <div className="flex justify-center items-center h-full">
          <div className="relative w-full h-full cursor-pointer">
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
                <FaPlay size={44} onClick={handleVideoClick}/>
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
          <p className="text-sm">{details.caption}</p>
          <div className="flex items-center mt-2">
            <img
              src="https://via.placeholder.com/32"
              alt="Profile"
              className="rounded-full w-8 h-8 mr-2"
            />
            <span className="text-sm">@profilename</span>
          </div>
        </div>

        <div className="absolute bottom-4 left-4 flex items-center">
          <div className="relative ml-2 overflow-hidden bg-white rounded-full px-2 py-1">
            <div className="whitespace-nowrap animate-slide text-sm text-black">
              <span>@profilename · Original audio</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 right-4 flex items-center">
          <div className="border-2 border-white rounded-md p-2">
            <button className="flex items-center justify-center">
              <MdGraphicEq size={20} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (postType === "post") {
    return (
      <div>
        <div className="p-4 bg-white shadow-md rounded-lg w-full">
          <div className="flex justify-between items-center p-2">
            <div className="flex items-center">
              <div className="bg-gray-200 rounded-full h-8 w-8">img</div>
              <div className="ml-2">
                <div className="font-bold text-sm">@username</div>
                <div className="text-xs text-gray-500">
                  Sunday at{" "}
                  {details.publishTime?.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          </div>

          {selectedVideo ? (
            <div className="relative w-full h-64 cursor-pointer">
              <video
                ref={videoRef}
                src={selectedVideo}
                className="object-cover w-full h-full rounded-md"
                controls
                onClick={handleVideoClick}
              />
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
                  <FaPlay size={44} />
                </div>
              )}
            </div>
          ) : selectedImages.length > 0 ? (
            <div
              className="bg-gray-200 w-full h-64 flex items-center justify-center relative"
              onClick={handleImageClick}
            >
              <img
                src={selectedImages[currentImageIndex]}
                alt={`Selected ${currentImageIndex + 1}`}
                className="w-full h-full object-cover rounded-md"
              />
              {selectedImages.length > 1 && (
                <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded-3xl shadow-lg">
                  {currentImageIndex + 1} / {selectedImages.length}
                </div>
              )}
            </div>
          ) : (
            <div
              className="bg-gray-200 w-full h-64 flex items-center justify-center relative"
              onClick={handleImageClick}
            >
              <IoImagesOutline size={64} className="text-gray-400" />
            </div>
          )}

          <div className="mt-2 text-sm whitespace-pre-wrap break-words max-h-[10vh] overflow-y-auto">
            {details.caption}
          </div>

          <div className="p-2">
            <div className="flex items-center space-x-4 mt-2 text-gray-500">
              <button className="flex items-center space-x-2">
                <SlLike />
                <span>Like</span>
              </button>
              <button className="flex items-center space-x-2 pl-20">
                <FaRegComment />
                <span>Comment</span>
              </button>
              <button className="flex items-center space-x-2 pl-12">
                <PiShareFatThin />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

        {selectedImages.length > 1 && (
          <div className="flex items-center w-full mt-12 bg-blue-50 rounded-md overflow-hidden">
            <TbInfoCircle className="text-black-600 mt-1 ml-5" size={20} />
            <p className="flex-grow text-center py-2 ml-1.25 text-sm text-black-500">
              Click on the image to view the next or previous image.
            </p>
          </div>
        )}
      </div>
    );
  }
};

export default FacebookPreview;