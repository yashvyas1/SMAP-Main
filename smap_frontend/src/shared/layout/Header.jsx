import React from "react";
import { BiMessageDetail } from "react-icons/bi";
import { CiCalendar } from "react-icons/ci";
import { FaRegBell } from "react-icons/fa6";
import { IoDiamondOutline } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import SearchBar from "../../components/common/SearchBar";

const Header = ({ name }) => {
  return (
    <div className="bg-white h-20 px-8 flex items-center justify-between shadow-md">
      <div className="hidden md:grid">
        <h1 className="text-xl font-extrabold">Overview</h1>
        <h1 className="text-sm font-semibold">Welcome, {name}</h1>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex items-center text-black">
          <SearchBar placeholder="Search" />
          <CiCalendar className="h-10 w-14 cursor-pointer ml-2 p-2" />
          <BiMessageDetail className="h-10 w-14 cursor-pointer p-2" />
          <FaRegBell className="h-10 w-14 cursor-pointer p-2" />
          <MdAccountCircle className="h-10 w-20 cursor-pointer" />
          <IoDiamondOutline className="text-yellow-300 rounded-full h-10 w-16 p-2 -ml-16 md:-ml-8 -mt-4" />
        </div>
      </div>
    </div>
  );
};

export default Header;
