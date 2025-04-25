import { Routes, Route } from "react-router-dom";
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
import MyPage from "./components/pages/MyPage";
import Requests from "./components/pages/Requests";
import Payments from "./components/pages/Payments";
import Booking from "./components/pages/Booking";
import Infocenter from "./components/pages/Infocenter";
import NewsPage from "./components/pages/NewsPage";
import EventManagement from "./components/pages/EventManagement";
import NewsModeration from "./components/pages/NewsModeration";
import UniversityHistory from "./components/infocenter/UniversityHistory";
import ArticleContent from "./components/infocenter/ArticleContent";
import "./styles/App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/" element={<ProtectedLayout />}>
        <Route path="dashboard" element={<DashboardStudent />} />
        <Route path="mypage" element={<MyPage />} />
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
        <Route path="event-management" element={<EventManagement />} />
        <Route path="news-moderation" element={<NewsModeration />} />

        <Route path="infocenter" element={<Infocenter />} />
        <Route path="university-history" element={<UniversityHistory />} />
        <Route path="mission-values" element={<ArticleContent />} />
        <Route path="campus-map" element={<ArticleContent />} />
        <Route path="leadership" element={<ArticleContent />} />
        <Route path="accreditation" element={<ArticleContent />} />
        <Route path="schools" element={<ArticleContent />} />
        <Route path="library" element={<ArticleContent />} />
        <Route path="registrar" element={<ArticleContent />} />
        <Route path="career-center" element={<ArticleContent />} />
        <Route path="academic-advising" element={<ArticleContent />} />
        <Route path="student-organizations" element={<ArticleContent />} />
        <Route path="sports-complex" element={<ArticleContent />} />
        <Route
          path="department-of-student-services"
          element={<ArticleContent />}
        />
        <Route path="health-wellness" element={<ArticleContent />} />
        <Route path="student-government" element={<ArticleContent />} />
        <Route path="residence-halls" element={<ArticleContent />} />
        <Route path="housing-policies" element={<ArticleContent />} />
        <Route path="housing-application" element={<ArticleContent />} />
        <Route path="residential-life" element={<ArticleContent />} />
      </Route>
    </Routes>
  );
};

export default App;
