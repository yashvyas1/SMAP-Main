import React from "react";
import { useSelector } from "react-redux";
import ForgetPasswordModal from "../../modals/ForgetPasswordModal";
import OTPVerificationModal from "../../modals/OTPVerificationModal";
import ResetPasswordModal from "../../modals/ResetPasswordModal";
import SuccessfulModal from "../../modals/SuccessfulModal";
import CalendarModal from "../../modules/user/calendar/CalendarModal";
import LogoutModal from "../../modals/LogoutModal";
import useModal from "../../hooks/useModal";
import { IoIosCloseCircle } from "react-icons/io";
import DisconnectModal from "../../modals/DisconnectModal";
import PageModal from "../../modals/PageModal";

const Modal = () => {
  const { modal, isModalOpen } = useSelector((state) => state.modal);
  const { closeModal } = useModal();

  // Rendering the appropriate modal component based on the current modal name
  const renderModal =
    modal.name === "ForgetPasswordModal" ? (
      <ForgetPasswordModal data={modal?.data} />
    ) : modal.name === "OTPVerificationModal" ? (
      <OTPVerificationModal data={modal?.data} />
    ) : modal.name === "ResetPasswordModal" ? (
      <ResetPasswordModal data={modal?.data} />
    ) : modal.name === "SuccessfulModal" ? (
      <SuccessfulModal data={modal?.data} />
    ) : modal.name === "CalendarModal" ? (
      <CalendarModal data={modal?.data} />
    ) : modal.name === "DisconnectModal" ? (
      <DisconnectModal data={modal?.data} />
    ) : modal.name === "LogoutModal" ? (
      <LogoutModal data={modal?.data} />
    ) : modal.name === "PageModal" ? (
      <PageModal data={modal?.data} />
    ) : (
      ""
    );

  let positionOfCross = renderModal?.props?.data?.postionOfCross;
  let modalColor = modal.name === "CalendarModal" ? "bg-[#fff]" : "bg-[#CBD5E1]/100";

  return (
    <>
      {isModalOpen && (
        <div className="relative z-50">
          <div
            className={`fixed inset-0 bg-gray-500 bg-opacity-15 transition-opacity duration-300 backdrop-blur-sm ${isModalOpen ? "opacity-100" : "opacity-0"}`}
          />
          <div className="fixed inset-0 overflow-y-auto sm:p-2">
            <div className="flex min-h-full items-center justify-center text-center">
              <div
                className={`transform rounded-[20px] ${modalColor} text-left align-middle drop-shadow-lg transition-transform duration-300 relative ${isModalOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
              >
                <button
                  className={`z-20 text-black flex items-center gap-3 whitespace-nowrap rounded-lg focus-visible:outline-none sm:h-8 cursor-pointer ${positionOfCross ? "top-3 -right-2" : "top-8 right-8"
                    }`}
                  onClick={closeModal}
                >
                  <IoIosCloseCircle className=" absolute right-4 top-4 w-7 h-7 text-[#EA0000]" />
                </button>
                {renderModal}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;

