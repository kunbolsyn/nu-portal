import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import RightSidebar from "./components/RightSidebar";
import Dashboard from "./components/pages/Dashboard.js";
import Content from "./components/Content";
import LoginPage from "./components/LoginPage";
import "./styles/App.css";

const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            <div className={`app-layout ${Sidebar ? "" : "no-sidebar"}`}>
              {/* Sidebar is Visible */}
              <Sidebar />
              
              {/* Main Content Adjusts Based on Sidebar */}
              <div className="main-content">
                <Header />
                <Content />
              </div>
              
              {/* Right Sidebar (Upcoming Events) */}
              <RightSidebar />
            </div>
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
  </Router>
);

export default App;
