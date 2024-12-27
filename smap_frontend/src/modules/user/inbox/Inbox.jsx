import React, { useState } from "react";
import ChatBox from "./ChatBox";
import ChatList from "./ChatList";

const Inbox = () => {
  const [selectedMessage, setSelectedMessage] = useState();

  return (
    <div className="flex items-start gap-4">
      <ChatList setSelectedMessage={setSelectedMessage} />
      <div className="w-2/3">
        <ChatBox chatData={selectedMessage} />
      </div>
    </div>
  );
};

export default Inbox;
