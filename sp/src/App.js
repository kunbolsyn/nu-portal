import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import ProtectedLayout from "./components/ProtectedLayout";
import News from "./components/pages/News";
import Events from "./components/pages/Events";
import Calendar from "./components/pages/Calendar";
import Settings from "./components/pages/Settings";
import StudentClubs from "./components/pages/StudentClubs";
import SuggestNews from "./components/pages/SuggestNews";
import Phonebook from "./components/pages/Phonebook";
import EventPlanning from "./components/pages/EventPlanning";
import DashboardStudent from "./components/pages/DashboardStudent";
import DashboardDSS from "./components/pages/DashboardDSS";
import DashboardStaff from "./components/pages/DashboardStaff";
import MyPageStudent from "./components/pages/MyPageStudent";
import MyPageDSS from "./components/pages/MyPageDSS";
import MyPageStaff from "./components/pages/MyPageStaff";
import Requests from "./components/pages/Requests";
import Payments from "./components/pages/Payments";
import Booking from "./components/pages/Booking";
import NewsPage from "./components/pages/NewsPage";
import "./styles/App.css";

const App = () => {
  const userRole = localStorage.getItem("userRole");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route path="/" element={<ProtectedLayout />}>
          <Route
            path="dashboard"
            element={
              userRole === "dss" ? (
                <DashboardDSS />
              ) : userRole === "staff" ? (
                <DashboardStaff />
              ) : (
                <DashboardStudent />
              )
            }
          />
          <Route
            path="mypage"
            element={
              userRole === "dss" ? (
                <MyPageDSS />
              ) : userRole === "staff" ? (
                <MyPageStaff />
              ) : (
                <MyPageStudent />
              )
            }
          />
          <Route path="news" element={<News />} />
          <Route path="events" element={<Events />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="settings" element={<Settings />} />
          <Route path="studentclubs" element={<StudentClubs />} />
          <Route path="suggest-news" element={<SuggestNews />} />
          <Route path="phonebook" element={<Phonebook />} />
          <Route path="event-planning" element={<EventPlanning />} />
          <Route path="requests" element={<Requests />} />
          <Route path="payments" element={<Payments />} />
          <Route path="booking" element={<Booking />} />
          <Route path="/news/:id" element={<NewsPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
