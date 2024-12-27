import React from "react";
import { MdCheckCircleOutline } from "react-icons/md";
import useModal from "../hooks/useModal";

const SuccessfulModal = () => {
  const { closeModal } = useModal();

  return (
    <div className="w-[41rem] h-[31rem] px-10 pt-16">
      <div className="flex items-center justify-center px-10">
        <MdCheckCircleOutline className="h-[6.3rem] w-[6.3rem] text-[#0D4896]/70" />
      </div>
      <h2 className="text-4xl text-center font-inter font-medium text-[#333333] px-10 mt-6">
        Successfully
      </h2>
      <p className="text-center text-[#666666] font-inter font-normal text-lg pl-10 pr-24 py-4">
        Your password has been reset sucessfully
      </p>
      <div className="px-10">
        <button
          type="submit"
          onClick={closeModal}
          className="w-[30rem] h-20 px-4 py-2 text-white bg-[#0D4896] font-inter font-medium text-2xl rounded-lg focus:outline-none mt-10"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default SuccessfulModal;
