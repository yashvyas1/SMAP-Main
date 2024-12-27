import React from "react";

const ChatItem = ({ id, name, avatar, message, time, onClick }) => {
  return (
    <div
      className="flex items-center p-4 gap-4 cursor-pointer hover:bg-gray-100 transition-colors"
      onClick={onClick}
    >
      <img
        src={avatar || "default-avatar-url.jpg"}
        className="w-12 h-12 rounded-full"
        alt="profile"
      />
      <div className="flex-1">
        <p className="font-semibold text-xl">{name}</p>
        <p className="text-sm text-gray-500">
          {message.length > 50 ? `${message.slice(0, 50)}...` : message}
        </p>
      </div>
      <div className="text-sm text-gray-500">{time}</div>
    </div>
  );
};

export default ChatItem;
