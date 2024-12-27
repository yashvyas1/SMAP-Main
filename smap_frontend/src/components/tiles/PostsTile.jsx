import React from 'react';

const PostsTile = ({ platform, icon, username, imageUrl, message }) => {
  return (
    <div className="max-w-md mx-auto flex bg-white p-2 shadow-lg rounded-lg overflow-hidden cursor-pointer">
      <img src={imageUrl} alt={`${platform} post`} className="min-w-16 h-24 object-cover rounded-lg" />
      <div className="ml-4">
        <div className="flex items-center">
          {icon}
          <p className="font-semibold text-gray-800 ml-2">@{username}</p>
        </div>
        <p className="text-gray-600 text-sm mt-1">{message}</p>
      </div>
    </div>
  );
};

export default PostsTile;
