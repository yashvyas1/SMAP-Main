import React, { useState } from "react";
import { IoImagesOutline } from "react-icons/io5";
import { FaRegComment, FaRetweet, FaRegHeart } from "react-icons/fa";
import { CgInsights } from "react-icons/cg";

const TwitterPreview = ({ selectedImages, details }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  return (
    <div className="p-4 bg-white shadow-md rounded-lg w-full">
      <div className="flex justify-between items-center p-2">
        <div className="flex items-center">
          <div className="bg-gray-200 rounded-full h-8 w-8">img</div>
          <div className="ml-2">
            <div className="font-bold text-sm">Your Name</div>
            <div className="text-xs text-gray-500">username</div>
          </div>
        </div>
      </div>
      <div
        className="w-full h-64 flex items-center justify-center relative"
        onClick={handleImageClick}
      >
        {selectedImages.length > 0 ? (
          <img
            src={selectedImages[currentImageIndex]}
            alt={`Selected ${currentImageIndex + 1}`}
            className="w-full h-full object-cover rounded-md"
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
      <div className="p-2 flex justify-between text-gray-500">
        <button className="flex items-center space-x-2">
          <FaRegComment />
          <span>{`0`}</span>
        </button>
        <button className="flex items-center space-x-2">
          <FaRetweet />
          <span>{`0`}</span>
        </button>
        <button className="flex items-center space-x-2">
          <FaRegHeart />
          <span>{`0`}</span>
        </button>
        <button className="flex items-center space-x-2">
          <CgInsights />
          <span>{`0`}</span>
        </button>
      </div>
    </div>
  );
};

export default TwitterPreview;