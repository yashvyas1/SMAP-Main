import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdEmojiEmotions, MdSend } from "react-icons/md";
import ChatMessage from "./ChatMessage";

const ChatBox = ({ chatData }) => {
  if (!chatData || !chatData.messages || chatData.messages.length === 0)
    return null;

  return (
    <div className="w-full h-[84vh] flex flex-col border rounded-lg p-4">
      <div className="flex items-center font-bold text-xl mb-4">
        <img
          src={chatData.avatar || "default-avatar-url.jpg"}
          alt={chatData.name || "User"}
          className="w-10 h-10 rounded-full mr-3"
        />
        <span>{chatData.name || "Unknown User"}</span>
        <HiOutlineDotsVertical className="h-6 w-6 text-gray-700 ml-auto cursor-pointer" />
      </div>
      <div className="flex-1 overflow-y-auto mb-4">
        {chatData.messages?.map((data, idx) => (
          <ChatMessage key={idx} data={data} />
        ))}
      </div>
      <div className="flex items-center mt-4 border-t pt-4">
        <MdEmojiEmotions className="w-8 h-8 text-blue-500 cursor-pointer" />
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 border rounded-full p-2 mx-4 focus:outline-none"
        />
        <MdSend className="w-8 h-8 text-blue-500 cursor-pointer" />
      </div>
    </div>
  );
};

export default ChatBox;
