import React from "react";
import { AiFillLike } from "react-icons/ai";
import { BiGroup } from "react-icons/bi";
import { FaComments, FaRegFileAlt } from "react-icons/fa";
import { HiOutlinePaperAirplane } from "react-icons/hi";

export const platformMetricsIcons = {
  totalFollowers: { icon: <BiGroup className="h-6 w-6 text-[#01A9FC]" /> },
  totalFriends: { icon: <BiGroup className="h-6 w-6 text-[#01A9FC]" /> },
  totalPosts: { icon: <FaRegFileAlt className="h-6 w-6 text-[#01A9FC]" /> },
  totalReactions: { icon: <AiFillLike className="h-6 w-6 text-[#01A9FC]" /> },
  totalLikes: { icon: <AiFillLike className="h-6 w-6 text-[#01A9FC]" /> },
  totalComments: { icon: <FaComments className="h-6 w-6 text-[#01A9FC]" /> },
  totalShares: { icon: <HiOutlinePaperAirplane className="h-6 w-6 text-[#01A9FC]" /> },
  totalRetweets: { icon: <HiOutlinePaperAirplane className="h-6 w-6 text-[#01A9FC]" /> },
  totalConnections: { icon: <BiGroup className="h-6 w-6 text-[#01A9FC]" /> },
  totalVideos: { icon: <FaRegFileAlt className="h-6 w-6 text-[#01A9FC]" /> },
  totalViews: { icon: <AiFillLike className="h-6 w-6 text-[#01A9FC]" /> },
  totalSubscribers: { icon: <BiGroup className="h-6 w-6 text-[#01A9FC]" /> },
};
