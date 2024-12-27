import React, { useEffect, useRef, useState } from "react";
import { MdGraphicEq } from "react-icons/md";
import { FaPlay, FaRegComment, FaPaperPlane, FaRegHeart } from "react-icons/fa";
import { IoImagesOutline, IoPaperPlaneOutline  } from "react-icons/io5";
import { LuHeart } from "react-icons/lu";
import { SlOptions } from "react-icons/sl";

const InstagramPreview = ({ selectedVideo, selectedImages, details, postType }) => {
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
      <div className="relative bg-black text-white h-[45rem] overflow-hidden justify-between">
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

        <div className="absolute right-4 top-[420px] space-y-6">
          <button className="flex flex-col items-center">
            <LuHeart size={24} />
            <span className="text-xs mt-1">0</span>
          </button>
          <button className="flex flex-col items-center">
            <FaRegComment size={24} />
            <span className="text-xs mt-1">0</span>
          </button>
          <button className="flex flex-col items-center">
            <IoPaperPlaneOutline size={24} />
            <span className="text-xs mt-1">0</span>
          </button>
          <button className="flex flex-col items-center">
            <SlOptions size={24} />
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
          <div className="mt-1 text-sm whitespace-pre-wrap break-words ml-2 pt-2">
            {details.caption}
          </div>
        </div>

        <div className="absolute bottom-4 left-4 flex items-center">
          <div className="relative overflow-hidden px-2 py-1">
            <div className="whitespace-nowrap text-sm text-white">
              <span>@profilename · Original audio</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-2 right-4 flex items-center">
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
      <div className="p-4 bg-white shadow-md rounded-lg w-full">
        <div className="flex justify-between items-center p-2">
          <div className="flex items-center">
            <div className="bg-gray-200 rounded-full h-8 w-8">img</div>
            <div className="ml-2">
              <div className="font-bold text-sm">Username</div>
              <div className="text-xs text-gray-500">Placehere</div>
            </div>
          </div>
        </div>
        <div
          className="bg-gray-200 w-full h-64 flex items-center justify-center relative"
          onClick={handleImageClick}
        >
          {selectedImages.length > 0 ? (
            <img
              src={selectedImages[currentImageIndex]}
              alt={`Selected ${currentImageIndex + 1}`}
              className="object-cover rounded-md w-full h-64"
            />
          ) : (
            <IoImagesOutline size={64} className="text-gray-400" />
          )}
          {selectedImages.length > 1 && (
            <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded-3xl shadow-lg">
              {currentImageIndex + 1} / {selectedImages.length}
            </div>
          )}
        </div>
        <div className="p-2">
          <div className="flex items-center space-x-4 pb-2">
            <FaRegHeart size={20} className="text-gray-500" />
            <FaRegComment size={20} className="text-gray-500" />
            <FaPaperPlane size={20} className="text-gray-500" />
          </div>
          <div className="mt-1 text-sm whitespace-pre-wrap break-words">
            <span className="font-bold">Username</span>
            {details.caption}
          </div>
        </div>
      </div>
    );
  }

  return <div className="text-gray-500 text-center">Please select a post type.</div>;
};

export default InstagramPreview;