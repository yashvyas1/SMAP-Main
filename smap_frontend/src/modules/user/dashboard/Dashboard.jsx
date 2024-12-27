import React, { useEffect, useRef, useState } from "react";
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SocialMediaCard from "../../../components/cards/SocialMediaCard";
import SocialMediaStatistics from "../../../components/cards/SocialMediaStatistics";
import EngagementMetricBarChart from "../../../components/charts/EngagementMetricBarChart";
import StatisticsLineChart from "../../../components/charts/StatisticsLineChart";
import { socialMediaData, socialMediaStatistics } from "../../../constant/data";
import ScheduledPosts from "./ScheduledPosts";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import Cookies from "js-cookie";
import PlatformStatistic from "./PlatformStatistics";
import FollowerVisitChart from "./FollowerVisitChart";

const Dashboard = () => {
  const options = ["Weekly", "Monthly", "Last 3 Months"];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selected, setSelected] = useState(options[selectedIndex]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [facebook, setFacebook] = useState(null);
  const [youtube, setYoutube] = useState(null);
  const [linkedin, setLinkedin] = useState(null);
  const [twitter, setTwitter] = useState(null);
  const [instagram, setInstagram] = useState(null);
  const [isFacebookToggled, setIsFacebookToggled] = useState(false);
  const [isYoutubeToggled, setIsYoutubeToggled] = useState(false);
  const [isInstagramToggled, setIsInstagramToggled] = useState(false);
  const [isLinkedinToggled, setIsLinkedinToggled] = useState(false);
  const [isTwitterToggled, setIsTwitterToggled] = useState(false);

  const userDetailsCookie = Cookies.get("userDetails");
  const userDetails = userDetailsCookie ? JSON.parse(userDetailsCookie) : {};
  const facebookPageDetails = {
    username: userDetails.facebookUserName,
    userPicture: userDetails.facebookUserPicture,
  };

  useEffect(() => {
    setFacebook(userDetails?.facebook);
    setYoutube(userDetails?.youtube);
    setLinkedin(userDetails?.linkedin);
    setTwitter(userDetails?.twitter);
    setInstagram(userDetails?.instagram);

    setIsFacebookToggled(userDetails?.facebook ? true : false);
    setIsTwitterToggled(userDetails?.twitter ? true : false);
    setIsYoutubeToggled(userDetails?.youtube ? true : false);
    setIsInstagramToggled(userDetails?.instagram ? true : false);
    setIsLinkedinToggled(userDetails?.linkedin ? true : false);
  }, [userDetailsCookie, userDetails, facebookPageDetails]);

  const handleSelect = (option) => {
    setSelected(option);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (index) => {
    setSelectedIndex(index);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (location.state?.success) {
      toast.success(location.state?.success);
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate, location.pathname]);

  useEffect(() => {
    const handleExpiration = async () => {
      const jwtExpiryTimeInMilliseconds = await localStorage.getItem(
        "jwtExpiryTimeInMilliseconds"
      );
      if (jwtExpiryTimeInMilliseconds) {
        const timeoutId = setTimeout(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("jwtExpiryTimeInMilliseconds");
          navigate("/signin");
          toast.error("Session expired. Please sign in again.");
        }, jwtExpiryTimeInMilliseconds);
        return () => clearTimeout(timeoutId);
      }
    };
    handleExpiration();
  }, [navigate]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap w-full gap-8 xl:gap-[3%]">
        <ToastContainer
          position="top-right"
          closeOnClick
          theme="light"
          autoClose={3000}
          pauseOnFocusLoss={false}
          pauseOnHover={false}
        />
        <div className="flex flex-wrap gap-[2.9%] w-full items-center px-4">
          <SocialMediaCard
            platform="Facebook"
            icon={<FaFacebook className="h-8 w-8 text-[#1877F2]" />}
            status={facebook ? "connect" : "disconnect"}
            isToggled={isFacebookToggled}
            setIsToggled={setIsFacebookToggled}
            facebookPageData={facebookPageDetails}
          />
          <SocialMediaCard
            platform="Twitter"
            icon={<FaXTwitter className="h-8 w-8 text-[#120143]" />}
            status={twitter ? "connect" : "disconnect"}
          />
          <SocialMediaCard
            platform="YouTube"
            icon={<FaYoutube className="h-8 w-8 text-[#b50000]" />}
            status={youtube ? "connect" : "disconnect"}
          />
          <SocialMediaCard
            platform="Instagram"
            icon={<FaInstagram className="h-8 w-8 text-[#C13584]" />}
            status={instagram ? "connect" : "disconnect"}
          />
          <SocialMediaCard
            platform="Linkedin"
            icon={<FaLinkedin className="h-8 w-8 text-[#0077B5]" />}
            status={linkedin ? "connect" : "disconnect"}
          />
        </div>
      </div>
      <div className="flex flex-col gap-8 w-full px-4">
        <PlatformStatistic status={isFacebookToggled} />
        <FollowerVisitChart status={isFacebookToggled} />
        <ScheduledPosts />
      </div>
    </div>
  );
};

export default Dashboard;
