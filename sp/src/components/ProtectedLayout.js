// ProtectedLayout.js
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
      <div className="main-content">
        <Header />
        <Outlet />
      </div>
      <RightSidebar />
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedLayout;
