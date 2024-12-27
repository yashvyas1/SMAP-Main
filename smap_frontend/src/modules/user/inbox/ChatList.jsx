import React, { useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RiGalleryView2 } from "react-icons/ri";
import { sampleMessages } from "../../../constant/data";
import ChatItem from "./ChatItem";

const Header = ({ handlePlatform, selectedPlatform }) => {
  return (
    <div className="flex items-center justify-between px-4 py-2 border-b">
      <div className="flex gap-2 w-full">
        {platformData.map(({ platform, icon }) => (
          <div
            key={platform}
            onClick={() => handlePlatform(platform)}
            className={`relative cursor-pointer p-1 ${
              selectedPlatform === platform ? "border-blue-500 rounded-full"
                : "border-white rounded-full"
            }`}
          >
            <div
              className={`flex justify-center items-center p-1 rounded-full ${
                selectedPlatform === platform
                  ? "border-2 border-blue-500" : "border-4 border-white" 
              }`}
            >
              {icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ChatList = ({ setSelectedMessage }) => {
  const messageTypes = ["All Messages", "Unread"];
  const [platform, setPlatform] = useState("Instagram");
  const [messageType, setMessageType] = useState("All Messages");

  const handlePlatform = (platform) => {
    setPlatform(platform);
  };
  const handleMessageType = (type) => {
    setMessageType(type);
  };

  const filteredMessages = sampleMessages.filter(
    (message) => messageType === "All Messages" || message.type === "unread"
  );

  return (
    <div className="w-1/3 h-[84vh] flex flex-col border rounded-lg">
      <Header handlePlatform={handlePlatform} selectedPlatform={platform} />
      <div className="flex font-bold gap-6 p-4 text-lg">
        {messageTypes.map((type) => (
          <div
            key={type}
            onClick={() => handleMessageType(type)}
            className={`cursor-pointer ${
              messageType === type ? "border-b-2 border-blue-500" : ""
            }`}
          >
            {type}
          </div>
        ))}
      </div>
      <div className="px-4 flex-1 overflow-y-auto">
        {filteredMessages.map((message) => (
          <ChatItem
            key={message.id}
            id={message.id}
            name={message.name}
            avatar={message.avatar}
            message={message.message}
            time={message.time}
            onClick={() => setSelectedMessage(message)}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatList;

export const platformData = [
  {
    platform: "View All",
    icon: <RiGalleryView2 className="h-6 w-6 text-[#1877F2]" />,
    label: "View All",
  },
  {
    platform: "Facebook",
    icon: <FaFacebook className="h-6 w-6 text-[#1877F2]" />,
    label: "Facebook",
  },
  {
    platform: "Instagram",
    icon: <FaInstagram className="h-6 w-6 text-[#C13584]" />,
    label: "Instagram",
  },
  {
    platform: "Twitter",
    icon: <FaXTwitter className="h-6 w-6 text-[#120143]" />,
    label: "Twitter",
  },
  {
    platform: "LinkedIn",
    icon: <FaLinkedin className="h-6 w-6 text-[#0077B5]" />,
    label: "LinkedIn",
  },
];
