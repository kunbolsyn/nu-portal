import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import RightSidebar from "./RightSidebar";
import "../styles/App.css";

const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

const ProtectedLayout = () => {
  return isAuthenticated ? (
    <div className="app-layout">
      <Sidebar />
      <div className="page-container">
        <Header />
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
