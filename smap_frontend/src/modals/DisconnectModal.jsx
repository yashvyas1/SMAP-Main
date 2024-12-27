import React from 'react';
import useModal from '../hooks/useModal';
import axios from 'axios';
import Cookies from "js-cookie";

const DisconnectModal = ({ data }) => {
    const { closeModal } = useModal();
    const { isToggled, platform, status, confirmDisconnect } = data?.data || {};
    const provider = platform ? platform.toLowerCase() : "";

    const socialConnect = async (status, provider) => {
        try {
            const socialMediaConnection = await axios.post("http://localhost:8000/users/socialmediaconnection", {
                provider,
                status,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });
            const userDetails = socialMediaConnection?.data;
            const filteredUserDetails = {
                first_name: userDetails?.userDetails?.first_name,
                facebook: userDetails?.userDetails?.facebook,
                youtube: userDetails?.userDetails?.youtube,
                instagram: userDetails?.userDetails?.instagram,
                linkedin: userDetails?.userDetails?.linkedin,
                twitter: userDetails?.userDetails?.twitter,
            };
            Cookies.set('userDetails', JSON.stringify(filteredUserDetails));
            if (confirmDisconnect) {
                confirmDisconnect();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDisconnect = async () => {
        if (isToggled) {
            try {
                await socialConnect(status, provider);
            }
            catch (err) {
                console.error(err);
            }
        }
        closeModal();
    };

    return (
        <div className="w-[41rem] h-[24.9rem] px-10 pt-16">
            <p className="text-center text-[#333] font-inter font-medium text-4xl py-4 mt-6">
                Are you sure you want to disconnect {platform} account?
            </p>
            <div className="px-10 flex items-center justify-between mt-10">
                <button
                    type="button"
                    onClick={closeModal}
                    className="w-[15rem] h-20 p-2 text-[#0D4896] bg-[#FFF] border-2 border-[#0D4896] font-inter font-medium text-2xl rounded-lg focus:outline-none"
                >
                    No
                </button>
                <button
                    type="button"
                    onClick={handleDisconnect}
                    className="w-[15rem] h-20 p-2 text-white bg-[#0D4896] font-inter font-medium text-2xl rounded-lg focus:outline-none"
                >
                    Yes
                </button>
            </div>
        </div>
    )
}

export default DisconnectModal