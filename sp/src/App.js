// App.js
import React, { useState, useEffect } from "react"; // Added missing imports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import ProtectedLayout from "./components/ProtectedLayout";
import Dashboard from "./components/pages/Dashboard";
import News from "./components/pages/News";
import NewsDetail from "./components/pages/NewsDetail"; // Added missing import
import Events from "./components/pages/Events";
import Calendar from "./components/pages/Calendar";
import Settings from "./components/pages/Settings";
import StudentClubs from "./components/pages/StudentClubs";
import SuggestNews from "./components/pages/SuggestNews";
import MyPage from "./components/pages/MyPage";
import Phonebook from "./components/pages/Phonebook";
import EventPlanning from "./components/pages/EventPlanning";
import "./styles/App.css";

const App = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch("/data/news.json")
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch((error) => console.error("Error fetching news:", error));
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route path="/" element={<ProtectedLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="news" element={<News />} />
          <Route path="news/:id" element={<NewsDetail news={news} />} />
          <Route path="events" element={<Events />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="settings" element={<Settings />} />
          <Route path="studentclubs" element={<StudentClubs />} />
          <Route path="suggest-news" element={<SuggestNews />} />
          <Route path="phonebook" element={<Phonebook />} />
          <Route path="event-planning" element={<EventPlanning />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
