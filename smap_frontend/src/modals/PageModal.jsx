import React, { useState } from "react";
import useModal from "../hooks/useModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const PageModal = ({ data }) => {
  const { closeModal } = useModal();
  const navigate = useNavigate();
  const [selectedPage, setSelectedPage] = useState(null);
  const [pageStatus, setPageStatus] = useState({});

  const FB_APP_ID = process.env.REACT_APP_FB_APP_ID;
const FB_REDIRECT_URI = process.env.REACT_APP_FB_REDIRECT_URI;
const FB_APP_SECRET = process.env.REACT_APP_FACEBOOK_APP_SECRET;

  const jwtToken = localStorage.getItem("token");
  const provider = !jwtToken ? data.data?.provider : data?.provider;
  let access_token = !jwtToken ? data.data?.access_token : data?.access_token;
  const pages = !jwtToken ? data?.data?.pages : data?.data;
  const setIsToggled = !jwtToken
    ? data?.data?.setIsToggled
    : data?.setIsToggled;

    async function getLongLivedUserToken(shortLivedToken) {
        try {
          const response = await axios.get(
            "https://graph.facebook.com/v17.0/oauth/access_token",
            {
              params: {
                grant_type: "fb_exchange_token",
                client_id: FB_APP_ID,
                client_secret: FB_APP_SECRET,
                fb_exchange_token: shortLivedToken,
              },
            }
          );
          const longLivedToken = response.data.access_token;
          return longLivedToken;
        } catch (error) {
          console.error("Error exchanging token:", error.response.data);
          throw error;
        }
      }  

  async function getLongLivedPageToken(longLivedUserToken, pageId) {
    console.log("LONG LIVED TOKEN")
    try {
      const response = await axios.get(`https://graph.facebook.com/${pageId}`, {
        params: {
          fields: "access_token",
          access_token: longLivedUserToken,
        },
      });
      const longLivedPageToken = response.data.access_token;
      console.log("Long-Lived Page Token:", longLivedPageToken);
      return longLivedPageToken;
    } catch (error) {
      console.error("Error getting page token:", error.response.data);
      throw error;
    }
  }

  const fetchUserDetails = async () => {
    try {
      const userDetailsResponse = await axios.get(
        "http://localhost:8000/users/dashboard/userdetails",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(userDetailsResponse);
      const userDetails = userDetailsResponse?.data?.userDetails;
      const facebookData = userDetailsResponse?.data?.facebookDetails;
      const filteredUserDetails = {
        first_name: userDetails.first_name,
        loginType: userDetails?.loginType,
        facebook: userDetails?.facebook,
        youtube: userDetails?.youtube,
        instagram: userDetails?.instagram,
        linkedin: userDetails?.linkedin,
        twitter: userDetails?.twitter,
        facebookUserName: facebookData?.username,
        facebookUserPicture: facebookData?.user_picture,
      };
      Cookies.set("userDetails", JSON.stringify(filteredUserDetails));
    } catch (error) {
      console.error(error);
    }
  };

  const socialConnect = async (pageId, status) => {
    const selectedPageData = pages.find((page) => page.id === pageId);
    const page_id = selectedPageData.id;
    let page_access_token = selectedPageData.access_token;
    access_token = await getLongLivedUserToken(access_token);
    page_access_token = await getLongLivedPageToken(access_token, pageId);
    console.log("id", page_id)
    console.log("page_access_token in social", page_access_token);
    // console.log("user access token", access_token)
    try {
      const socialMediaConnection = await axios.post(
        "http://localhost:8000/users/socialmediaconnection",
        {
          provider,
          status,
          access_token,
          page_id,
          page_access_token,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const userDetails = socialMediaConnection?.data;
      const facebookData = socialMediaConnection?.data?.facebook;
      const filteredUserDetails = {
        first_name: userDetails?.userDetails?.first_name,
        facebook: userDetails?.userDetails?.facebook,
        youtube: userDetails?.userDetails?.youtube,
        instagram: userDetails?.userDetails?.instagram,
        linkedin: userDetails?.userDetails?.linkedin,
        twitter: userDetails?.userDetails?.twitter,
        facebookUserName: facebookData?.username,
        facebookPageName: facebookData?.page_name,
        facebookUserPicture: facebookData?.user_picture,
        facebookPagePicture: facebookData?.page_picture,
      };
      Cookies.set("userDetails", JSON.stringify(filteredUserDetails));
      setIsToggled(true);
      setPageStatus((prevState) => ({
        ...prevState,
        [pageId]: status,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelect = async (pageId) => {
    const selectedPageData = pages.find((page) => page.id === pageId);
    const page_id = selectedPageData.id;
    let page_access_token = selectedPageData.access_token;

    try {
      if (!jwtToken) {
        // console.log("access user", access_token)
        page_access_token = await getLongLivedPageToken(access_token, pageId);
        console.log("page_access_token in validate", page_access_token);
        const response = await axios.post(
          "http://localhost:8000/auth/tokenvalidate",
          {
            provider,
            access_token,
            page_id,
            page_access_token,
          }
        );

        const token = response.data?.jwtToken?.jwtToken;
        const tokenExpiry =
          response.data?.jwtToken?.jwtExpiryTimeInMilliseconds;
        localStorage.setItem("token", token);
        localStorage.setItem("jwtExpiryTimeInMilliseconds", tokenExpiry);
        await fetchUserDetails();
        closeModal();
        navigate("/user/dashboard");
        setSelectedPage(pageId);
      } else {
        const currentStatus = pageStatus[pageId] || "connect";
        await socialConnect(pageId, currentStatus);
        closeModal();
      }
    } catch (error) {
      console.error("Error sending page data to the backend:", error);
    }
  };

  const handleToggleStatus = (pageId) => {
    const currentStatus = pageStatus[pageId] || "connect";
    const newStatus = currentStatus === "connect" ? "disconnect" : "connect";
    setPageStatus((prevState) => ({
      ...prevState,
      [pageId]: newStatus,
    }));
    handleSelect(pageId);
  };

  return (
    <div className="w-[41rem] h-[31rem] px-10 pt-16 rounded-lg">
      <h2 className="text-3xl mb-4 text-center text-[#333] px-8 font-semibold">
        Select a Facebook page you would like to connect
      </h2>
      {pages?.length === 0 ? (
        <p>No pages available. Please add a page to connect.</p>
      ) : (
        <ul className="my-6 border rounded-xl p-2 shadow-2xl bg-[#fff]">
          {pages?.map((page) => (
            <div
              key={page.id}
              className="flex items-center justify-between py-2 px-4"
            >
              <li
                className={`cursor-pointer p-2 font-inter text-base font-medium ${
                  selectedPage === page.id ? "bg-blue-200" : ""
                }`}
              >
                {page.name}
              </li>
              <button
                className={`bg-[#0D4896] w-[7rem] text-white px-4 py-2 rounded-md font-inter text-base font-medium ${
                  selectedPage === page.id ? "bg-blue-500" : ""
                }`}
                onClick={() => handleToggleStatus(page.id)}
              >
                {pageStatus[page.id] === "connect" ? "Select" : "Select"}
              </button>
            </div>
          ))}
        </ul>
      )}
      <div className="flex justify-start">
        <button
          className="bg-[#B4BACC] px-4 py-2 rounded-md w-[6rem] font-inter text-lg font-medium text-[#000]"
          onClick={closeModal}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PageModal;
