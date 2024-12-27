import classNames from "classnames";
import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useLocation } from "react-router-dom";
import { DASHBOARD_SIDEBAR_BOTTOM_LINKS, DASHBOARD_SIDEBAR_LINKS } from "../../utils/navigations";
import useModal from "../../hooks/useModal";
import Logo from "../../assets/images/logo.png"

// Utility class for link styling
const linkClass =
  "flex items-center gap-2 font-light p-3.5 rounded-xl text-base hover:bg-[#0D4896] hover:text-white transition duration-300";

// Tooltip component for sidebar links
function Tooltip({ text, children, isFull }) {
  return (
    <div className="group relative">
      {children}
      {!isFull && (
        <div className="absolute top-1/2 left-full -translate-y-1/2 ml-2 hidden group-hover:block hover:z-20">
          <div className="text-white text-sm rounded py-1 px-2 whitespace-no-wrap shadow-lg">
            {text}
          </div>
        </div>
      )}
    </div>
  );
}

// SidebarLink component for rendering links
function SidebarLink({ link, isFull }) {
  const { pathname } = useLocation();
  const [hoverLink, setHoverLink] = useState(null);

  const isActive = pathname === link.path || pathname.includes(link.path);

  const handleMouseEnter = (key) => {
    setHoverLink(key);
  };
  const handleMouseLeave = () => {
    setHoverLink(null);
  };

  return (
    <div cclassName="relative flex flex-col group"
      onMouseEnter={() => handleMouseEnter(link.key)}
      onMouseLeave={handleMouseLeave}>
      <Link
        to={link.path}
        className={classNames(
          isActive ? "bg-[#0D4896] text-white h-8" : "text-white h-8",
          linkClass
        )}
        style={{
          textDecoration: 'none',
        }}
      >
        <span className="text-xl text-[#fff]">
          {link.icon}
        </span>
        {isFull && <span className="ml-4 font-inter font-medium text-[#fff] text-sm">{link.label}</span>}
      </Link>
      {!isFull && hoverLink === link.key && (
        <div className="fixed left-[4rem] transform -translate-y-[110%] bg-[#849AA9] font-inter font-medium text-[#fff] text-sm rounded px-2 py-1 group-hover:opacity-100 transition-opacity duration-300 z-40 whitespace-nowrap">
          {link.label}
        </div>
      )}
    </div>
  );
}

const Sidebar = () => {
  const [isFull, setIsFull] = useState(true);
  const [navOpen, setNavOpen] = useState(false);
  const { openModal } = useModal();

  const toggleSidebar = () => {
    setIsFull(!isFull);
  };

  return (
    <div className="min-h-screen mx-auto antialiased flex justify-between">
      <button onClick={() => setNavOpen(!navOpen)}>
        {navOpen ? (
          <IoClose
            fontSize={24}
            className="sm:hidden absolute top-7 right-5 focus:outline-none"
          />
        ) : (
          <RxHamburgerMenu
            fontSize={24}
            className="sm:hidden absolute top-7 left-3 focus:outline-none"
          />
        )}
      </button>
      <div
        className={`min-h-screen bg-[#6CA4F7] transition-all duration-300 space-y-2 fixed sm:relative flex flex-col justify-between ${isFull ? "w-48 z-10" : "w-16 z-10"
          } ${navOpen ? "top-0 left-0" : "top-0 -left-64 sm:left-0"}`}
      >
        <div>
          <div className={`flex items-center justify-center w-full gap-2 ${isFull ? "py-4" : "py-6"}`}>
            <img src={Logo} className={`${isFull ? "w-[70%] h-[70%]" : "w-14 h-8"}`} />
          </div>
          <button
            onClick={toggleSidebar}
            className="text-white text-sm p-1 bg-blue-700 rounded-full z-10 focus:outline-none absolute  right-[-0.68rem] top-[4.3rem]"
          >
            {isFull ? <FaChevronLeft /> : <FaChevronRight />}
          </button>
          <div className="flex-1 overflow-hidden">
            <div className="flex flex-col gap-2 p-2 overflow-y-auto hide-scrollbar h-full">
              {DASHBOARD_SIDEBAR_LINKS.map((link) => (
                <Tooltip key={link.key} text={link.label} isFull={isFull}>
                  <SidebarLink link={link} isFull={isFull} />
                </Tooltip>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-2 p-2 overflow-y-auto hide-scrollbar">
            {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
              <Tooltip key={link.key} text={link.label} isFull={isFull}>
                <SidebarLink link={link} isFull={isFull} />
              </Tooltip>
            ))}
            <button
              onClick={() => openModal("LogoutModal")}
              className="text-blue-500 hover:text-blue-700 transition duration-300"
            >
              <div
                className={classNames(
                  linkClass,
                  "cursor-pointer text-[#FF2F2F] h-8 flex items-center"
                )}
              >
                <span className="text-xl">
                  <HiOutlineLogout />
                </span>
                {isFull && <span className="ml-4 font-inter font-medium">Logout</span>}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
