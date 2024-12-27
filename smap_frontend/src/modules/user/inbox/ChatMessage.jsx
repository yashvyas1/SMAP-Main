import React from "react";

const ChatMessage = ({ data }) => {
  const isUserMessage = data.sender === "user";

  return (
    <div
      className={`flex ${
        isUserMessage ? "justify-end" : "justify-start"
      } mb-4`}
    >
      <div
        className={`max-w-xs p-4 rounded-lg ${
          isUserMessage ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        <p>{data.message}</p>
        <span className="text-xs text-gray-500 mt-2 block">{data.time}</span>
      </div>
    </div>
  );
};

export default ChatMessage;
