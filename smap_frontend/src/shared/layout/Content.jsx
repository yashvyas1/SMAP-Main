import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Modal from "../../components/common/Modal";
import Cookies from "js-cookie";

const Content = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    const userDetailsCookie = Cookies.get('userDetails');
    if (userDetailsCookie) {
      const userDetails = JSON.parse(userDetailsCookie);
      setFirstName(userDetails?.first_name);
    }
  }, []);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="bg-white h-screen w-screen overflow-hidden flex flex-row">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-col flex-1 w-full">
        <Header toggleSidebar={toggleSidebar} name={firstName} />
        <div className="flex-1 p-4 min-h-0 overflow-auto">
          <Outlet />
        </div>
        <Modal />
      </div>
    </div>
  );
};

export default Content;
