import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import News from './pages/News';
import Events from './pages/Events';
import Calendar from './pages/Calendar';
import Settings from './pages/Settings';
import "../styles/Content.css";

const Content = () => (
  <div className="content">
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/news" element={<News />} />
      <Route path="/events" element={<Events />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  </div>
);

export default Content;
