import { AiFillSchedule } from "react-icons/ai";
import { BiSolidReport } from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineCog, HiOutlineQuestionMarkCircle } from "react-icons/hi";
import { MdWorkspacePremium } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import {
  FaCalendarAlt,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaMailBulk,
  FaYoutube,
} from "react-icons/fa";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "dashboard",
    icon: <RxDashboard />,
  },
  {
    key: "facebook",
    label: "Facebook",
    path: "facebook",
    icon: <FaFacebook />,
  },
  {
    key: "twitter",
    label: "Twitter",
    path: "twitter",
    icon: <FaXTwitter />,
  },
  {
    key: "youtube",
    label: "Youtube",
    path: "youtube",
    icon: <FaYoutube />,
  },
  {
    key: "instagram",
    label: "Instagram",
    path: "instagram",
    icon: <FaInstagram />,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    path: "linkedin",
    icon: <FaLinkedin />,
  },
  {
    key: "calendar",
    label: "Calendar",
    path: "calendar",
    icon: <FaCalendarAlt />,
  },
  {
    key: "schedule",
    label: "Schedule",
    path: "schedule",
    icon: <AiFillSchedule />,
  },
  {
    key: "reports",
    label: "Reports",
    path: "reports",
    icon: <BiSolidReport />,
  },
  {
    key: "inbox",
    label: "Inbox",
    path: "inbox",
    icon: <FaMailBulk />,
  },
  {
    key: "subscription",
    label: "Subscription",
    path: "subscription",
    icon: <MdWorkspacePremium />,
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: "settings",
    label: "Settings",
    path: "settings",
    icon: <HiOutlineCog />,
  },
  {
    key: "support",
    label: "Support",
    path: "support",
    icon: <HiOutlineQuestionMarkCircle />,
  },
];
