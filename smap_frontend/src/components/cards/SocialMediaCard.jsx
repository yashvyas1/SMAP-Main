
import React, { useEffect } from "react";
import { IoMdDoneAll } from "react-icons/io";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import useModal from "../../hooks/useModal";
import { LoginSocialFacebook } from 'reactjs-social-login';
import axios from "axios";

const FB_APP_ID = process.env.REACT_APP_FB_APP_ID;
const FB_REDIRECT_URI = process.env.REACT_APP_FB_REDIRECT_URI;

const SocialMediaCard = ({ platform, icon, status, isToggled, setIsToggled, facebookPageData }) => {
  const { openModal } = useModal();

  useEffect(() => {
    if (status === "connect")
      setIsToggled(true);
  }, [status, setIsToggled, facebookPageData]);

  const handleToggle = () => {
    if (isToggled) {
      openModal("DisconnectModal", {
        data: {
          platform,
          status: "disconnect",
          isToggled,
          confirmDisconnect: () => {
            setIsToggled(false);
          },
        }
      });
    } else {
      setIsToggled(true);
    }
  };

  const handleFacebookLogin = (provider, data) => {
    const access_token = data?.accessToken;
    axios.get(`https://graph.facebook.com/me/accounts?access_token=${access_token}`)
      .then((response) => {
        const pages = response.data?.data;
        openModal("PageModal", { data: pages, provider, access_token, setIsToggled });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="bg-white drop-shadow-xl shadow-md rounded-2xl h-[12rem] w-full p-4 mb-6 sm:w-[47.5%] md:w-[47.5%] lg:w-[30.5%] xl:w-[17.5%] 2xl:w-[17.5%]">
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 rounded-full">
          {icon}
        </div>
        <div className="text-xl font-semibold text-[#131417]">
          {platform.charAt(0).toUpperCase() + platform.slice(1).toLowerCase()}
        </div>
      </div>
      <div className="text-base text-gray-500 pt-4">
        {isToggled ? (
          <div className="flex items-center space-x-2 pt-2">
            <img src={facebookPageData?.userPicture} alt={facebookPageData?.username} className="h-7 w-7 rounded-full" />
            <div className="font-nunito font-normal text-base text-[#000]">
              {facebookPageData?.username}
            </div>
          </div>
        ) : (
          <h1 className="text-base text-gray-500">
            Not Linked
          </h1>
        )}
      </div>
      <div className="flex pt-4 w-full">
        {platform === "Facebook" && !isToggled && (
          <LoginSocialFacebook
            appId={FB_APP_ID}
            redirectUri={FB_REDIRECT_URI}
            scope="email,public_profile,pages_show_list,pages_read_engagement,pages_manage_metadata"
            onLoginSuccess={handleFacebookLogin}
            onResolve={({ provider, data }) => {
              handleFacebookLogin(provider, data);
            }}
            onReject={(err) => {
              console.error(err);
            }}
            onLoginError={(error) => console.error("Login error:", error)}
            className="flex w-full"
          >
            <button
              className="flex items-center justify-between text-white text-sm px-2 bg-red-500 w-[16rem] h-[3rem] rounded-full"
            >
              <div><MdKeyboardDoubleArrowRight className="bg-white h-8 w-8 rounded-full text-black" /></div>
              <div className="font-nunito text-lg font-bold text-center flex justify-center w-full pr-2">Disconnected</div>
            </button>
          </LoginSocialFacebook>
        )}
        {isToggled && (
          <button
            onClick={handleToggle}
            className="flex items-center justify-between text-white text-sm px-2 bg-green-500 w-[16rem] h-[3rem] rounded-full"
          >
            <div className="font-nunito text-lg font-bold text-center flex justify-center w-full pl-6">Connected</div>
            <div><IoMdDoneAll className="bg-white h-8 w-8 rounded-full text-black" /></div>
          </button>
        )}
      </div>
    </div>
  );
};

export default SocialMediaCard;
