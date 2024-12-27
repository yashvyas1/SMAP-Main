import React from "react";
import useModal from "../hooks/useModal";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const LogoutModal = () => {
  const { closeModal } = useModal();
  const navigate = useNavigate();
  const userDetailsCookie = Cookies.get('userDetails');
  const userDetails = userDetailsCookie ? JSON.parse(userDetailsCookie) : {};

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('jwtExpiryTimeInMilliseconds');
    if (!userDetails?.facebook) {
      Cookies.remove('userDetails');
    }
    navigate("/signin");
    closeModal();
  };

  return (
    <div className="w-[41rem] h-[24.9rem] px-10 pt-16">
      <p className="text-center text-[#333] font-inter font-medium text-4xl p-2 mt-6">
        Are you sure you want to logout?
      </p>
      <div className="px-10 flex items-center justify-between mt-10">
        <button
          type="button"
          onClick={closeModal}
          className="w-[15rem] h-20 p-2 text-[#0D4896] bg-[#FFF] border-2 border-[#0D4896] font-inter font-medium text-2xl rounded-lg focus:outline-none"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className="w-[15rem] h-20 p-2 text-white bg-[#0D4896] font-inter font-medium text-2xl rounded-lg focus:outline-none"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default LogoutModal;
