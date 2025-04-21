import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import LeftSidebar from "./LeftSidebar";
import Header from "./Header";
import RightSidebar from "./RightSidebar";
import "../styles/App.css";

const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

const ProtectedLayout = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  const closeSidebar = () => {
    setMobileSidebarOpen(false);
  };

  return isAuthenticated ? (
    <div className="app-layout">
      <LeftSidebar isOpen={mobileSidebarOpen} onClose={closeSidebar} />
      <div className="page-container">
        <Header onToggleSidebar={toggleSidebar} />
        <div className="main-content">
          <Outlet />
        </div>
      </div>
      <RightSidebar />
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedLayout;
