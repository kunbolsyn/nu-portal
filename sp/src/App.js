// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import ProtectedLayout from "./components/ProtectedLayout";
import Dashboard from "./components/pages/Dashboard";
import News from "./components/pages/News";
import Events from "./components/pages/Events";
import Calendar from "./components/pages/Calendar";
import Settings from "./components/pages/Settings";
import "./styles/App.css";

const App = () => (
  <Router>
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<LoginPage />} />

      {/* Protected Routes */}
      <Route path="/" element={<ProtectedLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="news" element={<News />} />
        <Route path="events" element={<Events />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="settings" element={<Settings />} />
        {/* Add more nested routes as needed */}
      </Route>
    </Routes>
  </Router>
);

export default App;
